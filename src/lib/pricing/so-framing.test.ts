import { describe, expect, it } from "vitest";
import {
  splitSize, sizeKey, feetOptions, inchOptions, glassTypeOptions, framingOptions, designPanel, windowChoice, GLAZED_SECTIONS,
} from "./data/so-framing";
import { ARCHITECTURAL, DECORATIVE } from "./data/inserts";
import { specialDoorQuote } from "./data/special-door-pricing";

// The special order configurator's window choices, shaped like the stock tab's
// (Brandon, 12/10/2026): Glass type with Solid first, Section glazed, and
// Framing with the plain windows then every insert, one entry each — no
// second drop-down for the design.
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

  it("lists the 4050's plain windows by their order names, then each insert in the window it goes in", () => {
    const f = framingOptions("4050/4051/4053", "4050", "8", "ssb");
    expect(f.slice(0, 2).map((o) => o.label)).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"']);
    expect(f[0]).toMatchObject({ kind: "plain", panel: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' });
    const inserts = f.slice(2);
    expect(inserts.every((o) => o.kind === "insert")).toBe(true);
    expect(inserts.slice(0, 3).map((o) => o.label)).toEqual(["Colonial 509 inserts", "Charleston 508 inserts", "Prairie 510 inserts"]);
    expect(inserts.filter((o) => o.panel === "short").map((o) => o.design)).toContain("501");
    expect(inserts.filter((o) => o.panel === "long").map((o) => o.design)).toEqual(["608", "610", "612", "611", "613"]);
    expect(inserts.find((o) => o.design === "608")).toMatchObject({ value: "insert:long:608", label: "Charleston 608 inserts", kind: "insert", panel: "long" });
    // Under 8'0" there are no long windows, so no long inserts either.
    const at7 = framingOptions("4050/4051/4053", "4050", "7", "ssb");
    expect(at7[0].label).toBe('PLAIN SHORT 19-1/2" X 12"');
    expect(at7.filter((o) => o.kind === "plain")).toHaveLength(1);
    expect(at7.every((o) => o.panel === "short")).toBe(true);
    expect(at7.map((o) => o.design)).not.toContain("608");
  });

  it("lists the Gallery's named long windows and a plain short, its other plain arches, then the inserts by window", () => {
    const f = framingOptions("GD1LP/GD1SP", "GD1SP", "8", "dsb");
    expect(f.filter((o) => o.kind === "plain").map((o) => o.label)).toEqual(["Plain short windows", 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain"]);
    expect(f[2]).toMatchObject({ kind: "plain", panel: "long", plainWindow: "PLAIN ARCH 1" });
    expect(f[3]).toMatchObject({ kind: "plain", panel: "long", plainWindow: "Arch 2 Plain" });
    const inserts = f.filter((o) => o.kind === "insert");
    expect(inserts.filter((o) => o.panel === "short").map((o) => o.label)).toEqual(["SQ22 inserts", "REC12 inserts"]);
    expect(inserts.filter((o) => o.panel === "long").map((o) => o.label)).toEqual([
      "SQ24 inserts", "REC14 inserts", "Arch 1 Grille inserts", "Arch 1 Vertical Grille inserts", "Arch 2 Grille inserts", "Arch 2 Vertical Grille inserts",
    ]);
    // Plain Long, Plain Short and Arch 1 Plain are the named windows already listed.
    expect(f.map((o) => o.label)).not.toContain("Plain Long");
    expect(f.map((o) => o.label)).not.toContain("Arch 1 Plain inserts");
    // Arch 3 is built at 16'0" only.
    expect(framingOptions("GD1LP/GD1SP", "GD1SP", "16", "dsb").map((o) => o.label)).toContain("Arch 3 Plain");
    expect(framingOptions("GD1LP/GD1SP", "GD1SP", "16", "dsb").map((o) => o.label)).not.toContain("Arch 2 Plain");
    // Acrylic takes no inserts on a sheet-priced door.
    expect(framingOptions("GD1LP/GD1SP", "GD1SP", "8", "acrylic").every((o) => o.kind === "plain")).toBe(true);
    // A Bridgeport design has no named plain windows: the generic pair, then the same inserts.
    const bd = framingOptions("BD1CU", "BD1CU", "8", "dsb");
    expect(bd.filter((o) => o.kind === "plain").map((o) => o.label)).toEqual(["Plain short windows", "Plain long windows", "Arch 1 Plain", "Arch 2 Plain"]);
    expect(bd.filter((o) => o.kind === "insert")).toHaveLength(8);
  });

  it("lists the T50S's one plain window and each insert, with no panel to choose", () => {
    const f = framingOptions("T50S/T50L", "T50S", "8", "ssb");
    expect(f[0]).toMatchObject({ label: 'PLAIN SHORT 19-1/2" X 12"', kind: "plain" });
    expect(f[0].panel).toBeUndefined();
    expect(f.slice(1).every((o) => o.kind === "insert" && o.panel === undefined)).toBe(true);
    expect(f.slice(1).map((o) => o.design)).not.toContain("608");
    const g = framingOptions("9200/9203", "9200", "8", "ssb");
    expect(g[0].label).toBe("Plain (no insert)");
    expect(g.slice(1).map((o) => o.label)).toContain("Charleston 608 inserts");
  });

  it("knows the window each insert goes in", () => {
    expect(designPanel(DECORATIVE.find((d) => d.id === "608")!)).toBe("long");
    expect(designPanel(DECORATIVE.find((d) => d.id === "509")!)).toBe("short");
    expect(designPanel(DECORATIVE.find((d) => d.id === "501")!)).toBe("short");
    const arch = (id: string) => designPanel(ARCHITECTURAL.find((d) => d.id === id)!);
    expect(["SQ22", "REC12", "PLAINSHORT"].map(arch)).toEqual(["short", "short", "short"]);
    expect(["SQ24", "REC14", "PLAINLONG", "ARCH1GRILLE", "ARCH3VERT"].map(arch)).toEqual(["long", "long", "long", "long", "long"]);
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

describe("what the quote is asked for", () => {
  const f = (group: string, member: string, width: string, glass: string, label: string) =>
    framingOptions(group, member, width, glass).find((o) => o.label === label);

  it("maps the choices to style, glass, panel, design and plain window", () => {
    expect(windowChoice("solid", undefined)).toEqual({ style: "solid" });
    expect(windowChoice("ssb", f("4050/4051/4053", "4050", "8", "ssb", 'PLAIN SHORT 19-1/2" X 12"')))
      .toEqual({ style: "glass", glassType: undefined, panelStyle: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' });
    expect(windowChoice("insulated", f("4050/4051/4053", "4050", "8", "insulated", "Charleston 608 inserts")))
      .toEqual({ style: "inserts", glassType: "insulated", panelStyle: "long", windesign: "608" });
    expect(windowChoice("ssb", f("4050/4051/4053", "4050", "8", "ssb", "Colonial 509 inserts")))
      .toEqual({ style: "inserts", glassType: undefined, panelStyle: "short", windesign: "509" });
    expect(windowChoice("dsb", f("GD1LP/GD1SP", "GD1SP", "8", "dsb", "PLAIN ARCH 1")))
      .toEqual({ style: "glass", glassType: "dsb", panelStyle: "long", plainWindow: "PLAIN ARCH 1" });
    expect(windowChoice("dsb", f("GD1LP/GD1SP", "GD1SP", "8", "dsb", "Arch 2 Plain")))
      .toEqual({ style: "glass", glassType: "dsb", panelStyle: "long", plainWindow: "Arch 2 Plain" });
    expect(windowChoice("dsb", f("GD1LP/GD1SP", "GD1SP", "8", "dsb", "SQ22 inserts")))
      .toEqual({ style: "inserts", glassType: "dsb", panelStyle: "short", windesign: "SQ22" });
    expect(windowChoice("dsb", f("CD", "CD", "8", "dsb", "REC13"))).toEqual({ style: "glass", glassType: "dsb", windesign: "REC13" });
    expect(windowChoice("dsb", f("CD", "CD", "16", "dsb", "ARC1A arch section"))).toEqual({ style: "inserts", glassType: "dsb", windesign: "ARC1A" });
    // Rain with a framing not yet chosen is plain rain glass.
    expect(windowChoice("rain", undefined)).toEqual({ style: "glass", glassType: "rain" });
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

  it("names the Gallery's plain arch windows on the line and prices them without the inserts adder", () => {
    const g = (o: Record<string, unknown>) => specialDoorQuote({
      model: "GD1LP/GD1SP", variant: "GD1SP", width: "8", height: "7", color: "White",
      track: "r12", spring: "extension", lock: "none", glassType: "dsb", panelStyle: "long", ...o,
    } as never);
    const plain = g({ style: "glass", plainWindow: "Arch 2 Plain" });
    expect(plain.quote?.description).toContain("double strength b grade windows in the top section, arch 2 plain, no inserts");
    expect(plain.quote?.unitPrice).toBe(g({ style: "glass" }).quote?.unitPrice);
    expect(g({ style: "inserts", windesign: "ARCH2GRILLE" }).quote?.unitPrice).toBeGreaterThan(plain.quote!.unitPrice);
    // Arch 3 Plain is built at 16'0" only, so at 8'0" it is not a window to name.
    expect(g({ style: "glass", plainWindow: "Arch 3 Plain" }).quote?.description).not.toContain("arch 3");
  });

  it("has one section glazed for now: section 4", () => {
    expect(GLAZED_SECTIONS).toEqual([{ value: "4", label: "Section 4" }]);
  });
});
