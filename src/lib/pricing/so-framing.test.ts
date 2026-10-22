import { describe, expect, it } from "vitest";
import {
  splitSize, sizeKey, feetOptions, inchOptions, glassTypeOptions, framingOptions, framingChoices, glassForFraming, designPanel, windowChoice, GLAZED_SECTIONS, SOLID,
} from "./data/so-framing";
import { ARCHITECTURAL, DECORATIVE, plainWindowsFor, specialPlainWindowsFor, specialWindowDesigns, windowDesigns } from "./data/inserts";
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
  it("is Solid, then the sheet's types on the 4050 family — the standard list, single strength first, then the glass only the architectural windows take (19/10/2026)", () => {
    const ids = glassTypeOptions("4050/4051/4053/4132", "8", true).map((g) => g.id);
    expect(ids).toEqual([
      "solid", "ssb", "dsb", "acrylic", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
      "seeded", "insulated_seeded", "midnight_gray", "insulated_midnight_gray", "tempered_midnight_gray", "insulated_tempered_midnight_gray",
    ]);
    // Single strength is worded as the grid's own glass is on the Value Steel and Modern doors.
    expect(glassTypeOptions("4050/4051/4053/4132", "8", true)[1].label).toBe("Single strength B grade");
    // A width one series prices lists that series' glass: 10'2" the standard's, 19'0" the architectural's.
    expect(glassTypeOptions("4050/4051/4053/4132", "10.2", true).map((g) => g.id)).toHaveLength(11);
    expect(glassTypeOptions("4050/4051/4053/4132", "10.2", true).map((g) => g.id)).not.toContain("seeded");
    expect(glassTypeOptions("9200/9201/9202/9203/9205", "19", true).map((g) => g.id)).toHaveLength(15);
    expect(glassTypeOptions("9200/9201/9202/9203/9205", "19", true).map((g) => g.id)).not.toContain("acrylic");
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
    expect(framingOptions("4050/4051/4053/4132", "4050", "8", "solid")).toEqual([]);
  });

  it("lists the 4050's plain windows by their order names, then each insert in the window it goes in", () => {
    // The 4050 takes the standard windows alone (Brandon, 22/10/2026), so its list carries no series mark.
    const f = framingOptions("4050/4051/4053/4132", "4050", "8", "dsb");
    expect(f.every((o) => o.series === undefined)).toBe(true);
    expect(f.slice(0, 2).map((o) => o.label)).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"']);
    expect(f[0]).toMatchObject({ kind: "plain", panel: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 12"' });
    const inserts = f.slice(2);
    expect(inserts.every((o) => o.kind === "insert")).toBe(true);
    expect(inserts.slice(0, 3).map((o) => o.label)).toEqual(["Colonial 509 inserts", "Charleston 508 inserts", "Prairie 510 inserts"]);
    expect(inserts.filter((o) => o.panel === "short").map((o) => o.design)).toContain("501");
    expect(inserts.filter((o) => o.panel === "long").map((o) => o.design)).toEqual(["608", "610", "612", "611", "613"]);
    expect(inserts.find((o) => o.design === "608")).toMatchObject({ value: "insert:long:608", label: "Charleston 608 inserts", kind: "insert", panel: "long" });
    // Under 8'0" there are no long windows, so no long inserts either.
    const at7 = framingOptions("4050/4051/4053/4132", "4050", "7", "dsb");
    expect(at7[0].label).toBe('PLAIN SHORT 19-1/2" X 12"');
    expect(at7.every((o) => o.panel === "short")).toBe(true);
    expect(at7.map((o) => o.design)).not.toContain("608");
    // Nor at 14'0" to 15'10", where the sheet prices no long standard window (16/10/2026) — on the 4132 the architectural long is there.
    const at15 = framingOptions("4050/4051/4053/4132", "4050", "15", "dsb");
    expect(at15.every((o) => o.panel === "short")).toBe(true);
    const at15on4132 = framingOptions("4050/4051/4053/4132", "4132", "15", "dsb");
    expect(at15on4132.filter((o) => o.series === "standard").every((o) => o.panel === "short")).toBe(true);
    expect(at15on4132.some((o) => o.series === "architectural" && o.panel === "long")).toBe(true);
    // Single strength frames the standard windows alone — the architectural series prices none.
    expect(framingOptions("4050/4051/4053/4132", "4132", "8", "ssb").every((o) => o.series === "standard")).toBe(true);
    expect(framingOptions("4050/4051/4053/4132", "4050", "8", "ssb").length).toBeGreaterThan(0);
  });

  it("never offers the 4050, 4051 or 4053 the architectural windows (Brandon, 22/10/2026) — the 4132 and the other families keep them", () => {
    const G = "4050/4051/4053/4132";
    for (const m of ["4050", "4051", "4053"]) {
      const labels = framingOptions(G, m, "8", "dsb").map((o) => o.label);
      expect(labels, m).not.toContain("SQ24 design");
      expect(labels, m).not.toContain('PLAIN LONG 42" X 16"');
      expect(labels, m).not.toContain("PLAIN ARCH 1");
      expect(framingOptions(G, m, "8", "seeded"), m).toEqual([]); // seeded is an architectural glass
      expect(glassTypeOptions(G, "8", true, m).map((g) => g.id), m).not.toContain("seeded");
      expect(framingChoices(G, m, "8", true).map((o) => o.label), m).not.toContain("SQ24 design");
      expect(specialWindowDesigns(m, "inserts", "8", "architectural").map((d) => d.id), m).not.toContain("SQ24");
      expect(specialPlainWindowsFor(m, "architectural"), m).not.toContain("PLAIN ARCH 1");
    }
    expect(framingOptions(G, "4132", "8", "dsb").map((o) => o.label)).toContain("SQ24 design");
    expect(framingOptions("9130/9131/9132/9133", "9130", "8", "dsb").map((o) => o.label)).toContain("SQ24 design");
    expect(framingOptions("4300/4301/4302/4305/4310", "4300", "8", "dsb").map((o) => o.label)).toContain("SQ24 design");
  });

  it("lists both series in the one list on a Premium Steel door — the plain windows of each, then the inserts of each (19/10/2026)", () => {
    const G = "4050/4051/4053/4132";
    const f = framingOptions(G, "4132", "8", "dsb");
    expect(f.filter((o) => o.kind === "plain").map((o) => [o.label, o.series])).toEqual([
      ['PLAIN SHORT 19-1/2" X 12"', "standard"], ['PLAIN LONG 40-1/2" X 12"', "standard"],
      ['PLAIN SHORT 19-1/2" X 16"', "architectural"], ['PLAIN LONG 42" X 16"', "architectural"], ["PLAIN ARCH 1", "architectural"], ["Arch 2 Plain", "architectural"],
    ]);
    const inserts = f.filter((o) => o.kind === "insert");
    expect(inserts.slice(0, 3).map((o) => o.label)).toEqual(["Colonial 509 inserts", "Charleston 508 inserts", "Prairie 510 inserts"]);
    const arch = inserts.filter((o) => o.series === "architectural");
    expect(arch.filter((o) => o.panel === "short").map((o) => o.label)).toEqual(["SQ22 design", "REC12 design"]);
    expect(arch.filter((o) => o.panel === "long").map((o) => o.label)).toEqual([
      "SQ24 design", "REC14 design", "Arch 1 Grille design", "Arch 1 Vertical Grille design", "Arch 2 Grille design", "Arch 2 Vertical Grille design",
    ]);
    // The two lists never share a value.
    expect(arch.find((o) => o.design === "SQ24")).toMatchObject({ value: "arch:insert:long:SQ24", panel: "long" });
    expect(new Set(f.map((o) => o.value)).size).toBe(f.length);
    // A glass one series prices frames that series alone: acrylic the standard windows, seeded the architectural.
    expect(framingOptions(G, "4132", "8", "acrylic").every((o) => o.series === "standard")).toBe(true);
    expect(framingOptions(G, "4132", "8", "seeded").every((o) => o.series === "architectural")).toBe(true);
    // The Arch 3s on double doors, 11'6" and wider, as on the Gallery.
    expect(framingOptions(G, "4132", "16", "dsb").map((o) => o.label)).toContain("Arch 3 Grille design");
    expect(framingOptions(G, "4132", "10", "dsb").map((o) => o.label)).not.toContain("Arch 3 Plain");
    // Up to 7'6" both series have short windows only; 10'2" to 11'4" the standard alone; past 18'0" the architectural alone.
    expect(framingOptions(G, "4132", "7", "dsb").every((o) => o.panel === "short")).toBe(true);
    expect(framingOptions(G, "4132", "10.2", "dsb").every((o) => o.series === "standard")).toBe(true);
    expect(framingOptions("9200/9201/9202/9203/9205", "9200", "19", "dsb").every((o) => o.series === "architectural")).toBe(true);
    // Every member of every family the same way; the flush 4053 and 9133 keep the long standard window alone.
    const plain = (group: string, member: string, series: string) =>
      framingOptions(group, member, "8", "dsb").filter((o) => o.kind === "plain" && o.series === series).map((o) => o.label);
    expect(plain("9200/9201/9202/9203/9205", "9201", "standard")).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"']);
    // The 4053 has the one series, so its list is unmarked.
    expect(framingOptions(G, "4053", "8", "dsb").filter((o) => o.kind === "plain").map((o) => o.label)).toEqual(["Plain short windows", 'PLAIN LONG 40-1/2" X 12"']);
    expect(plain("4300/4301/4302/4305/4310", "4302", "architectural")).toHaveLength(4);
    // A door with one series says nothing about it.
    expect(framingOptions("GD1LP/GD1SP", "GD1SP", "8", "dsb").every((o) => o.series === undefined)).toBe(true);
  });

  it("names the Gallery's plain windows — short, long, arch — its other plain arches, then the inserts by window", () => {
    const f = framingOptions("GD1LP/GD1SP", "GD1SP", "8", "dsb");
    expect(f.filter((o) => o.kind === "plain").map((o) => o.label)).toEqual(['PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain"]);
    expect(f[0]).toMatchObject({ kind: "plain", panel: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 16"' });
    expect(f[2]).toMatchObject({ kind: "plain", panel: "long", plainWindow: "PLAIN ARCH 1" });
    expect(f[3]).toMatchObject({ kind: "plain", panel: "long", plainWindow: "Arch 2 Plain" });
    const inserts = f.filter((o) => o.kind === "insert");
    expect(inserts.filter((o) => o.panel === "short").map((o) => o.label)).toEqual(["SQ22 design", "REC12 design"]);
    expect(inserts.filter((o) => o.panel === "long").map((o) => o.label)).toEqual([
      "SQ24 design", "REC14 design", "Arch 1 Grille design", "Arch 1 Vertical Grille design", "Arch 2 Grille design", "Arch 2 Vertical Grille design",
    ]);
    // Plain Long, Plain Short and Arch 1 Plain are the named windows already listed.
    expect(f.map((o) => o.label)).not.toContain("Plain Long");
    expect(f.map((o) => o.label)).not.toContain("Arch 1 Plain design");
  });

  it("takes the architectural windows as Clopay's size chart has them: the Arch 3s on double doors, 11'6\" and wider (15/10/2026)", () => {
    const labels = (group: string, member: string, width: string) => framingOptions(group, member, width, "dsb").map((o) => o.label);
    const arch3 = ["Arch 3 Plain", "Arch 3 Grille design", "Arch 3 Vertical Grille design"];
    for (const w of ["8", "9", "10", "11.4"]) for (const a of arch3) expect(labels("GD1LP/GD1SP", "GD1SP", w), `${a} at ${w}`).not.toContain(a);
    for (const w of ["11.6", "12", "16", "18", "20"]) for (const a of arch3) expect(labels("GD1LP/GD1SP", "GD1LP", w), `${a} at ${w}`).toContain(a);
    // Every Gallery pair and Bridgeport door alike; Arch 1 and Arch 2 on singles and doubles.
    expect(labels("GD2LU/GD2SU", "GD2SU", "16")).toEqual(expect.arrayContaining(arch3));
    expect(labels("BD1CU", "BD1CU", "12")).toEqual(expect.arrayContaining(arch3));
    expect(labels("BD1CU", "BD1CU", "8")).not.toContain("Arch 3 Plain");
    expect(labels("GD1LP/GD1SP", "GD1SP", "16")).toEqual(expect.arrayContaining(["PLAIN ARCH 1", "Arch 2 Plain", "Arch 2 Grille design", "Arch 1 Vertical Grille design"]));
    expect(labels("GD1LP/GD1SP", "GD1SP", "16").filter((l) => l.startsWith("Arch 3"))).toEqual(["Arch 3 Plain", "Arch 3 Grille design", "Arch 3 Vertical Grille design"]);
    // The stock tab keeps the stock widths.
    expect(windowDesigns("GD1SP", "inserts", "8").map((d) => d.id)).not.toContain("ARCH3PLAIN");
    expect(windowDesigns("GD1SP", "inserts", "16").map((d) => d.id)).not.toContain("ARCH2PLAIN");
    expect(specialWindowDesigns("GD1SP", "inserts", "16").map((d) => d.id)).toContain("ARCH2PLAIN");
    expect(specialWindowDesigns("GD1SP", "inserts", null).map((d) => d.id)).not.toContain("ARCH3PLAIN");
    // Other models keep their own lists, by the width's own code.
    expect(specialWindowDesigns("4050", "inserts", "7.6").map((d) => d.id)).toContain("502");
    expect(specialWindowDesigns("4050", "inserts", "8").map((d) => d.id)).not.toContain("502");
    // Acrylic takes no inserts on a sheet-priced door.
    expect(framingOptions("GD1LP/GD1SP", "GD1SP", "8", "acrylic").every((o) => o.kind === "plain")).toBe(true);
    // A Bridgeport door names the same windows (Brandon, 14/10/2026), then the same inserts.
    for (const [group, member] of [["BD1CU", "BD1CU"], ["BD2EU/BD2NU", "BD2NU"], ["GD2LU/GD2SU", "GD2SU"]]) {
      const bd = framingOptions(group, member, "8", "dsb");
      expect(bd.filter((o) => o.kind === "plain").map((o) => o.label), member).toEqual(['PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain"]);
      expect(bd.filter((o) => o.kind === "insert"), member).toHaveLength(8);
    }
    // The stock tab: the Gallery's long window and arch — "ARCH 1" there (22/10/2026) — no short.
    expect(plainWindowsFor("GD1SP")).toEqual(['PLAIN LONG 42" X 16"', "ARCH 1"]);
    expect(specialPlainWindowsFor("GD1SP")).toEqual(['PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1"]);
    expect(specialPlainWindowsFor("4050")).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"']);
    expect(specialPlainWindowsFor("4132", "architectural")).toEqual(['PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1"]);
    expect(specialPlainWindowsFor("9202")).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"']);
    expect(specialWindowDesigns("4132", "inserts", "16", "architectural").map((d) => d.id)).toContain("ARCH3GRILLE");
    expect(specialWindowDesigns("4132", "inserts", "8", "architectural").map((d) => d.id)).not.toContain("509");
  });

  it("lists the T50S's one plain window and each insert, with no panel to choose", () => {
    const f = framingOptions("T50S/T50L", "T50S", "8", "ssb");
    expect(f[0]).toMatchObject({ label: 'PLAIN SHORT 19-1/2" X 12"', kind: "plain" });
    expect(f[0].panel).toBeUndefined();
    expect(f.slice(1).every((o) => o.kind === "insert" && o.panel === undefined)).toBe(true);
    expect(f.slice(1).map((o) => o.design)).not.toContain("608");
    const g = framingOptions("4308", "4308", "8", "ssb");
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

  it("lists the Coachman's window designs and arched sections where its sheet builds them, with any glass", () => {
    const at8 = framingOptions("CD", "CD", "8", "dsb");
    expect(at8.map((o) => o.label)).toEqual(["ARCH1", "ARCH3", "ARCH4", "ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24"]);
    const at16 = framingOptions("CD", "CD", "16", "dsb");
    expect(at16.slice(10).map((o) => o.label)).toEqual(["ARC13A arch section", "ARC14A arch section", "ARC1A arch section", "ARC3A arch section", "ARC4A arch section"]);
    expect(at16[10]).toMatchObject({ kind: "design", design: "ARC13A" });
    expect(framingOptions("CD", "CD", "16", "rain")).toHaveLength(15);
    // 12'0" to 13'8": the REC and SQ designs and the arched sections; 14'0": solid only.
    expect(framingOptions("CD", "CD", "12", "dsb").map((o) => o.design)).toEqual(["REC11", "REC13", "REC14", "SQ23", "SQ24", "ARC13A", "ARC14A", "ARC1A", "ARC3A", "ARC4A"]);
    expect(framingOptions("CD", "CD", "14", "dsb")).toEqual([]);
  });
});

describe("framing first, the glass from the window (Brandon, 20/10/2026)", () => {
  const G = "4050/4051/4053/4132";
  const ids = (xs: { id: string }[]) => xs.map((x) => x.id);

  it("lists every window the door takes at the width over all its glass, the plain windows first", () => {
    const f = framingChoices(G, "4132", "8", true);
    const plain = f.filter((o) => o.kind === "plain");
    expect(plain.map((o) => o.label)).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"', 'PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain"]);
    expect(f.findIndex((o) => o.kind !== "plain")).toBe(plain.length);
    expect(f.map((o) => o.label)).toContain("Colonial 509 inserts");
    expect(f.map((o) => o.label)).toContain("SQ24 design");
    expect(new Set(f.map((o) => o.value)).size).toBe(f.length);
    // Under 8'0" the short windows alone; nothing where the width is not built with windows.
    expect(framingChoices(G, "4050", "7", true).every((o) => o.panel === "short")).toBe(true);
    expect(framingChoices(G, "4050", "8", false)).toEqual([]);
    expect(framingChoices(G, "4050", "", true)).toEqual([]);
    // The Coachman: its window designs and arched sections at the width; none at 14'0".
    expect(framingChoices("CD", "CD", "12", true).map((o) => o.design)).toEqual(["REC11", "REC13", "REC14", "SQ23", "SQ24", "ARC13A", "ARC14A", "ARC1A", "ARC3A", "ARC4A"]);
    expect(framingChoices("CD", "CD", "14", true)).toEqual([]);
  });

  it("gives a window the glass it comes in — the standard glass behind a standard window, single strength first; the architectural behind an architectural one; any of the Coachman's behind a design", () => {
    const f = framingChoices(G, "4132", "9", true);
    const by = (label: string) => f.find((o) => o.label === label);
    expect(ids(glassForFraming(G, "4132", "9", by('PLAIN SHORT 19-1/2" X 12"')))).toEqual([
      "ssb", "dsb", "acrylic", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
    ]);
    expect(ids(glassForFraming(G, "4132", "9", by('PLAIN SHORT 19-1/2" X 16"')))).toEqual([
      "dsb", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
      "seeded", "insulated_seeded", "midnight_gray", "insulated_midnight_gray", "tempered_midnight_gray", "insulated_tempered_midnight_gray",
    ]);
    // An insert comes in the glass its window takes inserts in.
    const seeded = ids(glassForFraming(G, "4132", "9", by("SQ24 design")));
    expect(seeded).toContain("seeded");
    expect(seeded).not.toContain("acrylic");
    expect(ids(glassForFraming("CD", "CD", "16", framingChoices("CD", "CD", "16", true)[0]))).toEqual(["dsb", "obscure", "frosted", "rain", "seeded"]);
    // No window: Solid alone.
    expect(glassForFraming(G, "4132", "9", undefined)).toEqual([SOLID]);
    // Every window comes in at least one glass, and every glass offered frames the window — on the 4132 and the 4050 alike.
    for (const m of ["4132", "4050"]) {
      for (const o of framingChoices(G, m, "9", true)) {
        const g = glassForFraming(G, m, "9", o);
        expect(g.length, `${m} ${o.label}`).toBeGreaterThan(0);
        for (const x of g) expect(framingOptions(G, m, "9", x.id).map((y) => y.value), `${m} ${o.label} in ${x.id}`).toContain(o.value);
      }
    }
  });
});

describe("what the quote is asked for", () => {
  const f = (group: string, member: string, width: string, glass: string, label: string) =>
    framingOptions(group, member, width, glass).find((o) => o.label === label);

  it("maps the choices to style, glass, panel, design, plain window and series", () => {
    const G = "4050/4051/4053/4132";
    expect(windowChoice("solid", undefined)).toEqual({ style: "solid" });
    // The series is the window's: a 12" window is a standard one, a 16" window or a grille an architectural one.
    expect(windowChoice("dsb", f(G, "4132", "8", "dsb", 'PLAIN SHORT 19-1/2" X 12"')))
      .toEqual({ style: "glass", glassType: "dsb", panelStyle: "short", plainWindow: 'PLAIN SHORT 19-1/2" X 12"', windowSeries: "standard" });
    expect(windowChoice("dsb", f(G, "4132", "8", "dsb", 'PLAIN LONG 42" X 16"')))
      .toEqual({ style: "glass", glassType: "dsb", panelStyle: "long", plainWindow: 'PLAIN LONG 42" X 16"', windowSeries: "architectural" });
    expect(windowChoice("insulated", f(G, "4132", "8", "insulated", "Charleston 608 inserts")))
      .toEqual({ style: "inserts", glassType: "insulated", panelStyle: "long", windesign: "608", windowSeries: "standard" });
    expect(windowChoice("dsb", f(G, "4050", "8", "dsb", "Colonial 509 inserts")))
      .toEqual({ style: "inserts", glassType: "dsb", panelStyle: "short", windesign: "509", windowSeries: "standard" });
    expect(windowChoice("seeded", f(G, "4132", "8", "seeded", "SQ24 design")))
      .toEqual({ style: "inserts", glassType: "seeded", panelStyle: "long", windesign: "SQ24", windowSeries: "architectural" });
    expect(windowChoice("dsb", f("GD1LP/GD1SP", "GD1SP", "8", "dsb", "PLAIN ARCH 1")))
      .toEqual({ style: "glass", glassType: "dsb", panelStyle: "long", plainWindow: "PLAIN ARCH 1", windowSeries: "standard" });
    expect(windowChoice("dsb", f("GD1LP/GD1SP", "GD1SP", "8", "dsb", "Arch 2 Plain")))
      .toEqual({ style: "glass", glassType: "dsb", panelStyle: "long", plainWindow: "Arch 2 Plain", windowSeries: "standard" });
    expect(windowChoice("dsb", f("GD1LP/GD1SP", "GD1SP", "8", "dsb", "SQ22 design")))
      .toEqual({ style: "inserts", glassType: "dsb", panelStyle: "short", windesign: "SQ22", windowSeries: "standard" });
    expect(windowChoice("dsb", f("CD", "CD", "8", "dsb", "REC13"))).toEqual({ style: "glass", glassType: "dsb", windesign: "REC13", windowSeries: "standard" });
    expect(windowChoice("rain", f("CD", "CD", "16", "rain", "ARC1A arch section"))).toEqual({ style: "glass", glassType: "rain", windesign: "ARC1A", windowSeries: "standard" });
    // Rain with a framing not yet chosen is plain rain glass.
    expect(windowChoice("rain", undefined)).toEqual({ style: "glass", glassType: "rain", windowSeries: "standard" });
  });

  it("names the plain window on the line, as the stock tab does", () => {
    const q = (o: Record<string, unknown>) => specialDoorQuote({
      model: "4050/4051/4053/4132", variant: "4050", width: "8", height: "7", color: "White",
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
    // Arch 3 is a double door's window (11'6" and wider): not one to name at 8'0", named and priced at 16'0" —
    // the plain window as plain glass, the grilles at the inserts adder (15/10/2026).
    expect(g({ style: "glass", plainWindow: "Arch 3 Plain" }).quote?.description).not.toContain("arch 3");
    expect(g({ style: "inserts", windesign: "ARCH3GRILLE" }).quote?.description).not.toContain("Arch 3");
    const wide = g({ width: "16", style: "glass", plainWindow: "Arch 3 Plain" });
    expect(wide.quote?.description).toContain("windows in the top section, arch 3 plain, no inserts");
    expect(wide.quote?.unitPrice).toBe(g({ width: "16", style: "glass" }).quote?.unitPrice);
    expect(g({ width: "16", style: "inserts", windesign: "ARCH3GRILLE" }).quote?.description).toContain("windows in the top section, Arch 3 Grille design");
    expect(g({ width: "16", style: "inserts", windesign: "ARCH3VERT" }).quote?.unitPrice).toBe(g({ width: "16", style: "inserts", windesign: "ARCH1GRILLE" }).quote?.unitPrice);
  });

  it("has one section glazed for now: section 4", () => {
    expect(GLAZED_SECTIONS).toEqual([{ value: "4", label: "Section 4" }]);
  });
});
