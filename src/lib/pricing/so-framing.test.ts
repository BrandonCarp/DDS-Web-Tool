import { describe, expect, it } from "vitest";
import {
  splitSize, sizeKey, feetOptions, inchOptions, glassTypeOptions, framingOptions, insertDesigns, windowChoice, GLAZED_SECTIONS,
} from "./data/so-framing";
import { specialDoorQuote } from "./data/special-door-pricing";

// The special order configurator's window choices, shaped like the stock tab's
// (Brandon, 12/10/2026): Glass type with Solid first, Section glazed, Framing
// with the plain windows then Inserts, then the insert design.
describe("special order sizes as feet and inches", () => {
  it("splits and joins grid keys", () => {
    expect(splitSize("8.2")).toEqual(["8", "2"]);
    expect(splitSize("7")).toEqual(["7", "0"]);
    expect(sizeKey("8", "2")).toBe("8.2");
    expect(sizeKey("7", "0")).toBe("7");
    expect(sizeKey("", "0")).toBe("");
  });

  it("offers the feet a grid carries, then the inches at that foot", () => {
    const widths = ["6.2", "6.4", "7", "7.2", "7.6", "7.8", "8", "8.2", "8.6", "9"];
    expect(feetOptions(widths)).toEqual(["6", "7", "8", "9"]);
    expect(inchOptions(widths, "7")).toEqual(["0", "2", "6", "8"]);
    expect(inchOptions(widths, "9")).toEqual(["0"]);
    expect(inchOptions(["6", "6.3", "6.6", "6.9", "7", "7.6"], "7")).toEqual(["0", "6"]);
  });
});

describe("glass type", () => {
  it("is Solid, single strength, then the named types on the 4050 family", () => {
    const ids = glassTypeOptions("4050/4051/4053", "8", true).map((g) => g.id);
    expect(ids.slice(0, 3)).toEqual(["solid", "ssb", "dsb"]);
    expect(ids).toHaveLength(11);
  });

  it("is Solid then the sheet's types on a sheet-priced door, double strength first", () => {
    const ids = glassTypeOptions("GD1LP/GD1SP", "8", true).map((g) => g.id);
    expect(ids.slice(0, 2)).toEqual(["solid", "dsb"]);
    expect(ids).not.toContain("ssb");
    expect(ids).toHaveLength(16);
    expect(glassTypeOptions("CD", "8", true).map((g) => g.id)).toEqual(["solid", "dsb", "obscure", "frosted", "rain", "seeded"]);
  });

  it("is Solid and single strength on a door with no glass tables, and Solid alone where windows are not built", () => {
    expect(glassTypeOptions("T50S/T50L", "8", true).map((g) => g.id)).toEqual(["solid", "ssb"]);
    expect(glassTypeOptions("GD1LP/GD1SP", "14.10", false).map((g) => g.id)).toEqual(["solid"]);
  });
});

describe("framing", () => {
  it("is empty on a solid door", () => {
    expect(framingOptions("4050/4051/4053", "4050", "8", "solid")).toEqual([]);
  });

  it("lists the 4050's plain windows by their order names, then inserts for short and long windows", () => {
    const f = framingOptions("4050/4051/4053", "4050", "8", "ssb");
    expect(f.map((o) => o.label)).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"', "Inserts — short windows", "Inserts — long windows"]);
    expect(f[0]).toMatchObject({ kind: "plain", panel: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' });
    expect(f[3]).toMatchObject({ kind: "insert", panel: "long" });
    // Under 8'0" there are no long windows, so only the short pair.
    expect(framingOptions("4050/4051/4053", "4050", "7", "ssb").map((o) => o.label)).toEqual(['PLAIN SHORT 19-1/2" X 12"', "Inserts"]);
  });

  it("lists the Gallery's named long windows and a plain short, then inserts either way", () => {
    const f = framingOptions("GD1LP/GD1SP", "GD1SP", "8", "dsb");
    expect(f.map((o) => o.label)).toEqual(["Plain short windows", 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Inserts — short windows", "Inserts — long windows"]);
    expect(f[2]).toMatchObject({ kind: "plain", panel: "long", plainWindow: "PLAIN ARCH 1" });
    // Acrylic takes no inserts on a sheet-priced door.
    expect(framingOptions("GD1LP/GD1SP", "GD1SP", "8", "acrylic").map((o) => o.kind)).toEqual(["plain", "plain", "plain"]);
    // A Bridgeport design has no named plain windows: the generic pair.
    expect(framingOptions("BD1CU", "BD1CU", "8", "dsb").map((o) => o.label)).toEqual(["Plain short windows", "Plain long windows", "Inserts — short windows", "Inserts — long windows"]);
  });

  it("lists the T50S's one plain window and Inserts, with no panel to choose", () => {
    const f = framingOptions("T50S/T50L", "T50S", "8", "ssb");
    expect(f.map((o) => o.label)).toEqual(['PLAIN SHORT 19-1/2" X 12"', "Inserts"]);
    expect(f[0].panel).toBeUndefined();
    expect(framingOptions("9200/9203", "9200", "8", "ssb").map((o) => o.label)).toEqual(["Plain (no insert)", "Inserts"]);
  });

  it("lists the Coachman's ten window designs, and its arch sections where the sheet prices them", () => {
    const at8 = framingOptions("CD", "CD", "8", "dsb");
    expect(at8.map((o) => o.label)).toEqual(["ARCH1", "ARCH3", "ARCH4", "ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24"]);
    const at16 = framingOptions("CD", "CD", "16", "dsb");
    expect(at16.slice(10).map((o) => o.label)).toEqual(["ARC13A arch section", "ARC14A arch section", "ARC1A arch section", "ARC3A arch section", "ARC4A arch section"]);
    expect(at16[10]).toMatchObject({ kind: "arch", design: "ARC13A" });
    // An arch section goes with the plain glass top section, not a special glass.
    expect(framingOptions("CD", "CD", "16", "rain")).toHaveLength(10);
  });
});

describe("insert designs under an Inserts framing", () => {
  it("narrows the 4050's designs to the panel: long inserts on long windows, the rest on short", () => {
    expect(insertDesigns("4050", "8", "long").map((d) => d.id)).toEqual(["608", "610", "612", "611", "613"]);
    expect(insertDesigns("4050", "8", "short").every((d) => d.cat !== "long")).toBe(true);
    expect(insertDesigns("4050", "8", "short").map((d) => d.id)).toContain("509");
  });

  it("offers the Gallery's architectural inserts on either panel", () => {
    expect(insertDesigns("GD1SP", "8", "short").map((d) => d.id)).toContain("SQ24");
    expect(insertDesigns("GD1SP", "8", "long")).toEqual(insertDesigns("GD1SP", "8", "short"));
  });
});

describe("what the quote is asked for", () => {
  const f = (group: string, member: string, width: string, glass: string, label: string) =>
    framingOptions(group, member, width, glass).find((o) => o.label === label);

  it("maps the choices to style, glass, panel, design and plain window", () => {
    expect(windowChoice("solid", undefined, "")).toEqual({ style: "solid" });
    expect(windowChoice("ssb", f("4050/4051/4053", "4050", "8", "ssb", 'PLAIN SHORT 19-1/2" X 12"'), ""))
      .toEqual({ style: "glass", glassType: undefined, panelStyle: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' });
    expect(windowChoice("insulated", f("4050/4051/4053", "4050", "8", "insulated", "Inserts — long windows"), "608"))
      .toEqual({ style: "inserts", glassType: "insulated", panelStyle: "long", windesign: "608" });
    expect(windowChoice("dsb", f("GD1LP/GD1SP", "GD1SP", "8", "dsb", "PLAIN ARCH 1"), ""))
      .toEqual({ style: "glass", glassType: "dsb", panelStyle: "long", plainWindow: "PLAIN ARCH 1" });
    expect(windowChoice("dsb", f("CD", "CD", "8", "dsb", "REC13"), "")).toEqual({ style: "glass", glassType: "dsb", windesign: "REC13" });
    expect(windowChoice("dsb", f("CD", "CD", "16", "dsb", "ARC1A arch section"), "")).toEqual({ style: "inserts", glassType: "dsb", windesign: "ARC1A" });
    // Rain with a framing not yet chosen is plain rain glass.
    expect(windowChoice("rain", undefined, "")).toEqual({ style: "glass", glassType: "rain" });
  });

  it("names the plain window on the line, as the stock tab does", () => {
    const q = (o: Record<string, unknown>) => specialDoorQuote({
      model: "4050/4051/4053", variant: "4050", width: "8", height: "7", color: "White",
      track: "r12", spring: "extension", lock: "none", ...o,
    } as never);
    expect(q({ style: "glass", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' }).quote?.description)
      .toContain('single strength b grade windows in the top section, plain short 19-1/2" x 12", no inserts');
    expect(q({ style: "glass" }).quote?.description).toContain("windows in the top section, no inserts");
    // Unknown names are left off; the price does not move either way.
    expect(q({ style: "glass", plainWindow: "PLAIN WHATEVER" }).quote?.description).not.toContain("whatever");
    expect(q({ style: "glass", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' }).quote?.unitPrice).toBe(q({ style: "glass" }).quote?.unitPrice);
  });

  it("has one section glazed for now: section 4", () => {
    expect(GLAZED_SECTIONS).toEqual([{ value: "4", label: "Section 4" }]);
  });
});
