import { describe, it, expect } from "vitest";
import { quoteCommercial } from "./commercial";
import {
  joinAnd, panelCount, panelsPhrase, placementOf, placementPanels, sectionGlassLabel, sectionWindowSizes,
  stileLocationCount, stileLocationText, windowPlacements,
} from "./data/commercial-meta";

const section = (model: string, o: Record<string, unknown> = {}) =>
  quoteCommercial({
    order: "section", mfr: model.startsWith("2415") ? "Wayne Dalton" : "Clopay",
    model, manFt: 16, manIn: 0, secKind: "int", secHeight: "21",
    windows: 0, color: "White", stile: "double", ...o,
  } as never).description ?? "";

const complete = (model: string, o: Record<string, unknown> = {}) =>
  quoteCommercial({
    order: "complete", mfr: "Clopay", model, size: "9′2″ × 14′0″", glass: "solid",
    track: "15R", mount: "continuous", cspring: "torsion", clock: "none",
    color: "White", ...o,
  } as never).description ?? "";

describe("ribbed steel verbiage", () => {
  it("words a 524 complete door as Brandon wrote it (9/10/2026): the insulation, then on like any door", () => {
    expect(complete("524")).toBe(
      `Clopay Model 524, 9'2" x 14'0", non insulated, in the color white, solid no windows, 2" angle mount track to wood, 15" radius track, front torsion springs, no lock`,
    );
    expect(complete("524")).not.toContain("hollow");
    expect(complete("524")).not.toContain("ribbed"); // that wording is the sections' only
  });

  it("puts a 524 complete door's windows after the colour, like any other door", () => {
    expect(complete("524", { glass: "glass", winSection: 3 })).toContain(
      `non insulated, in the color white, 24x12 windows in the third section, 2" angle`,
    );
    // The panels pressed, where not every one has a window (15/10/2026): a 9'2" door has two.
    expect(complete("524", { glass: "glass", winSection: 3, windowPanels: [1] })).toContain(
      "in the color white, one 24x12 window in the left panel of the third section, 2\" angle",
    );
    expect(complete("524", { glass: "glass", winSection: 2, windowPanels: [1, 2] })).toContain("in the color white, 24x12 windows in the second section,");
    expect(complete("524", { glass: "glass", winSection: 3, windowSize: "24x6", windowPanels: [2] })).toContain("one 24x6 window in the right panel of the third section");
    // A complete door's windows stay 24x12 unless another size is picked, whatever the model's section sizes lead with.
    expect(complete("3200", { glass: "glass", winSection: 3, windowPanels: [2] })).toContain("one insulated 24x12 window in the right panel of the third section");
    expect(complete("3200", { glass: "glass", winSection: 3 })).toContain("insulated 24x12 windows in the third section");
    expect(complete("3200", { glass: "glass", winSection: 3, windowSize: "24x8", windowPanels: [2] })).toContain("one insulated 24x8 window in the right panel of the third section");
  });

  // Brandon's lines of 14/10/2026, for an 8'2" x 24" section with single end stiles.
  const sec = (model: string, o: Record<string, unknown> = {}) =>
    section(model, { manFt: 8, manIn: 2, secHeight: "24", stile: "single", ...o });

  // Brandon's estimate of 16/10/2026: section, colour, insulation, windows and the
  // panel-by-panel layout, one end stile, the stile locations, the lock.
  it("words a bottom section as Brandon wrote it: section, colour, insulation, stile", () => {
    expect(sec("2415V", { secKind: "bt" })).toBe(
      'Wayne Dalton Model 2415V, 8\'2" x 24", steel ribbed bottom section, in the color white, insulated with vinyl back cover, single end stile',
    );
    expect(sec("2415", { secKind: "bt" })).toBe(
      'Wayne Dalton Model 2415, 8\'2" x 24", steel ribbed bottom section, in the color white, non insulated, single end stile',
    );
    expect(sec("524", { secKind: "bt" })).toBe(
      'Clopay Model 524, 8\'2" x 24", steel ribbed bottom section, in the color white, non insulated, single end stile',
    );
  });

  it("says SOLID NO WINDOWS on a solid intermediate, after the insulation", () => {
    expect(sec("2415V")).toBe(
      'Wayne Dalton Model 2415V, 8\'2" x 24", steel ribbed intermediate section, in the color white, insulated with vinyl back cover, solid no windows, single end stile',
    );
    expect(sec("524V")).toBe(
      'Clopay Model 524V, 8\'2" x 24", steel ribbed intermediate section, in the color white, insulated with vinyl back cover, solid no windows, single end stile',
    );
    expect(sec("2415S")).toBe(
      'Wayne Dalton Model 2415S, 8\'2" x 24", steel ribbed intermediate section, in the color white, insulated with steel back cover, solid no windows, single end stile',
    );
    expect(sec("524")).toContain("steel ribbed intermediate section, in the color white, non insulated, solid no windows, single end stile");
  });

  it("names the windows by count, size and glass — double strength b grade on the plain door, insulated on the V and S — then the layout", () => {
    expect(sec("2415V", { windows: 2 })).toBe(
      'Wayne Dalton Model 2415V, 8\'2" x 24", steel ribbed intermediate section, in the color white, insulated with vinyl back cover, two 24x12 insulated windows, single end stile',
    );
    expect(sec("524", { windowPanels: [1, 2] })).toContain("in the color white, non insulated, two 24x12 double strength b grade windows, glass-glass, single end stile");
    expect(sec("2415S", { windowPanels: [1] })).toContain("in the color white, insulated with steel back cover, one 24x12 insulated window in the left panel, glass-solid, single end stile");
    // Brandon's own line: a 14'0" with the two middle panels glazed.
    expect(section("524", { manFt: 14, manIn: 0, secHeight: "24", stile: "single", windowPanels: [2, 3], stileLocations: ['134"', '124"', '122"'] })).toBe(
      'Clopay Model 524, 14\'0" x 24", steel ribbed intermediate section, in the color white, non insulated, two 24x12 double strength b grade windows in center of section, solid-glass-glass-solid, single end stile, stile locations 134"  124" and 122"',
    );
    // The size the sections come in: 24x12 or 24x6 on a 524 or 2415; a size they do not come in is the first.
    expect(sec("524", { windows: 2, windowSize: "24x6" })).toContain("two 24x6 double strength b grade windows");
    expect(sec("2415V", { windows: 2, windowSize: "24x8" })).toContain("two 24x12 insulated windows");
    expect(sectionWindowSizes("524")).toEqual(["24x12", "24x6"]);
    expect(sectionWindowSizes("2415S")).toEqual(["24x12", "24x6"]);
    expect(sectionWindowSizes("3200")).toEqual(["24x12", "24x8"]); // 24x12 first everywhere (16/10/2026)
    expect(sectionWindowSizes("2742")).toEqual(["24x12"]);
  });

  it("gives the 3200 its 24x12 or 24x8 insulated glass windows", () => {
    const s3200 = (o: Record<string, unknown>) => section("3200", { manFt: 8, manIn: 2, secHeight: "24", stile: "single", ...o });
    expect(s3200({ windows: 2 })).toContain('intermediate section, in the color White, two 24x12 insulated glass windows');
    expect(s3200({ windows: 2, windowSize: "24x8" })).toContain("two 24x8 insulated glass windows");
  });

  it("counts a section's panels and stiles by width, as CJ's sheet does (15/10/2026)", () => {
    expect([[9, 2], [9, 3], [13, 2], [13, 3], [16, 2], [16, 3], [20, 2], [20, 3], [24, 2], [24, 3]].map(([f, i]) => panelCount(f, i)))
      .toEqual([2, 3, 3, 4, 4, 5, 5, 6, 6, 7]);
    expect(stileLocationCount("524", 10, 2)).toBe(2);
    // None up to 9'2" — the one stile of an 8'2" or 9'2" is not asked for (16/10/2026); two from 9'3".
    expect(stileLocationCount("2415S", 8, 0)).toBe(0);
    expect(stileLocationCount("2415S", 8, 2)).toBe(0);
    expect(stileLocationCount("524", 9, 2)).toBe(0);
    expect(stileLocationCount("524", 9, 3)).toBe(2);
    expect(stileLocationCount("2415V", 16, 3)).toBe(4);
    expect(stileLocationCount("3200", 16, 3)).toBe(0);
    expect(stileLocationCount("524", 0, 0)).toBe(0);
  });

  it("puts the windows in the panels pressed, named from the left, where not every panel has one", () => {
    expect(panelsPhrase(3, [2])).toBe("in the middle panel");
    expect(panelsPhrase(3, [1, 3])).toBe("in the left and right panels");
    expect(panelsPhrase(2, [2])).toBe("in the right panel");
    expect(panelsPhrase(4, [2, 4])).toBe("in the second and fourth panels from the left");
    expect(panelsPhrase(5, [1, 3, 5])).toBe("in the first, third and fifth panels from the left");
    expect(panelsPhrase(3, [])).toBe("");
    // A 10'2" section has three panels: one window in the middle is "in center of
    // section"; two at the ends name their panels; all three say no panel — and
    // the layout follows, panel by panel (16/10/2026).
    const wide = (o: Record<string, unknown>) => sec("524", { manFt: 10, manIn: 2, ...o });
    expect(wide({ windowPanels: [2] })).toContain("in the color white, non insulated, one 24x12 double strength b grade window in center of section, solid-glass-solid, single end stile");
    expect(wide({ windowPanels: [1, 3] })).toContain("two 24x12 double strength b grade windows in the left and right panels, glass-solid-glass, single end stile");
    expect(wide({ windowPanels: [1, 2, 3] })).toContain("three 24x12 double strength b grade windows, glass-glass-glass, single end stile");
    expect(wide({ windowPanels: [] })).toContain("solid no windows");
    expect(wide({ windowPanels: [2, 2, 9] })).toContain("one 24x12 double strength b grade window in center of section, solid-glass-solid");
    // "In center" is a run of panels either side of the middle; off-centre runs and gapped sets name their panels.
    const five = (o: Record<string, unknown>) => sec("524", { manFt: 16, manIn: 3, ...o });
    expect(five({ windowPanels: [3] })).toContain("one 24x12 double strength b grade window in center of section, solid-solid-glass-solid-solid");
    expect(five({ windowPanels: [2, 3, 4] })).toContain("three 24x12 double strength b grade windows in center of section, solid-glass-glass-glass-solid");
    expect(five({ windowPanels: [2, 4] })).toContain("two 24x12 double strength b grade windows in the second and fourth panels from the left, solid-glass-solid-glass-solid");
    expect(five({ windowPanels: [1, 2] })).toContain("two 24x12 double strength b grade windows in the first and second panels from the left, glass-glass-solid-solid-solid");
    expect(sec("524", { windowPanels: [1, 2] })).toContain("two 24x12 double strength b grade windows, glass-glass"); // both of two: no "center"
    // A window count alone (no panels) has no layout to give.
    expect(wide({ windows: 1 })).toContain("one 24x12 double strength b grade window, single end stile");
    // The price is a window a panel pressed; a bottom section takes none.
    const price = (o: Record<string, unknown>) => quoteCommercial({ order: "section", mfr: "Clopay", model: "524", manFt: 10, manIn: 2, secKind: "int", secHeight: "24", stile: "single", color: "White", ...o } as never).unitPrice;
    expect(price({ windowPanels: [1, 3] }) - price({ windowPanels: [] })).toBeCloseTo(2 * (price({ windowPanels: [2] }) - price({ windowPanels: [] })), 2);
    expect(price({ windowPanels: [1, 3] })).toBe(price({ windows: 2 }));
    expect(sec("524", { manFt: 10, manIn: 2, secKind: "bt", windowPanels: [1, 2] })).not.toContain("window");
  });

  it("writes the stile locations of a 524 or 2415 one a stile, left to right — or that they are needed", () => {
    expect(joinAnd(['59"'], "  ")).toBe('59"');
    expect(joinAnd(['59"', '82-1/4'], "  ")).toBe('59" and 82-1/4');
    expect(joinAnd(['59"', '82-1/4', '90-1/2"'], "  ")).toBe('59"  82-1/4 and 90-1/2"');
    // 12'0": three panels, two stiles.
    expect(sec("524", { manFt: 12, manIn: 0, stileLocations: ['48"', '96"'] })).toBe(
      'Clopay Model 524, 12\'0" x 24", steel ribbed intermediate section, in the color white, non insulated, solid no windows, single end stile, stile locations 48" and 96"',
    );
    // 16'3": five panels, four stiles; blanks are skipped, and a stile added past the sheet's count is written too (Add Stile, 15/10/2026).
    expect(sec("2415V", { manFt: 16, manIn: 3, secKind: "bt", stile: "double", stileLocations: ['39"', "", '78-1/2"', '117"', '156"'] }))
      .toMatch(/double end stiles, stile locations 39"  78-1\/2"  117" and 156"$/);
    expect(sec("524", { manFt: 12, manIn: 0, stileLocations: ['24"', '48"', '72"'] })).toMatch(/stile locations 24"  48" and 72"$/);
    // None under 9'3": an 8'2" or 9'2" writes no stile locations, typed or not (16/10/2026).
    expect(sec("2415", { manFt: 8, manIn: 2, stileLocations: ['49"'] })).toMatch(/single end stile$/);
    expect(sec("2415", { manFt: 9, manIn: 2, stileLocations: ['55"'], stileLocationsNeeded: true })).toMatch(/single end stile$/);
    // Still to come.
    expect(sec("524", { manFt: 12, manIn: 0, stileLocations: ['48"'], stileLocationsNeeded: true })).toMatch(/single end stile, stile locations needed$/);
    // Nothing typed: needed (16/10/2026), with or without windows; and never on another model.
    expect(sec("524", { manFt: 12, manIn: 0 })).toMatch(/single end stile, stile locations needed$/);
    expect(sec("524", { manFt: 12, manIn: 0, stileLocations: ["", " "] })).toMatch(/single end stile, stile locations needed$/);
    expect(sec("524", { manFt: 14, manIn: 0, windowPanels: [2, 3] })).toMatch(/windows in center of section, solid-glass-glass-solid, single end stile, stile locations needed$/);
    expect(section("3200", { manFt: 12, manIn: 0, stileLocations: ['48"'], stileLocationsNeeded: true })).not.toContain("stile locations");
  });

  it("lists a complete door's window placements as Clopay writes them, and reads a stile location from its inches and quarter (15/10/2026)", () => {
    expect(windowPlacements(2)).toEqual(["GL,GL", "GL,SOL", "SOL,GL"]);
    expect(windowPlacements(3)).toEqual(["GL,GL,GL", "GL,GL,SOL", "GL,SOL,GL", "SOL,GL,GL", "GL,SOL,SOL", "SOL,GL,SOL", "SOL,SOL,GL"]);
    expect(windowPlacements(4)).toHaveLength(15);
    expect(windowPlacements(0)).toEqual([]);
    expect(placementPanels("GL,SOL,GL")).toEqual([1, 3]);
    expect(placementPanels("SOL,SOL,SOL")).toEqual([]);
    expect(placementOf(3, [2])).toBe("SOL,GL,SOL");
    expect(placementOf(3, [1, 2, 3])).toBe("GL,GL,GL");
    // The placement is the panels the complete door's line names.
    expect(complete("524", { glass: "glass", winSection: 3, windowPanels: placementPanels("GL,SOL,SOL") })).toContain("one 24x12 window in the left panel of the third section");
    expect(stileLocationText("59", "0")).toBe('59"');
    expect(stileLocationText("82", "1/4")).toBe('82-1/4"');
    expect(stileLocationText("82", "3/8")).toBe('82-3/8"');
    expect(stileLocationText("82", "5/8")).toBe('82-5/8"');
    expect(stileLocationText(" 90 ", "1/2")).toBe('90-1/2"');
    expect(stileLocationText("", "3/4")).toBe("");
    expect(stileLocationText("48", "x")).toBe('48"');
    expect(sectionGlassLabel("524")).toBe("Double Strength");
    expect(sectionGlassLabel("2415")).toBe("Double Strength");
    expect(sectionGlassLabel("2415V")).toBe("Insulated");
    expect(sectionGlassLabel("524S")).toBe("Insulated");
    expect(sectionGlassLabel("3200")).toBe("Insulated");
    expect(sectionGlassLabel("3720")).toBe("Insulated");
  });

  it("ends an intermediate section with its inside slide lock, and a bottom section never (16/10/2026)", () => {
    // On a 524 or 2415 the lock comes before any mention of stiles (16/10/2026).
    expect(sec("524", { manFt: 12, manIn: 0, lock: "slide", stileLocations: ['48"', '96"'] })).toMatch(/solid no windows, inside slide lock, single end stile, stile locations 48" and 96"$/);
    expect(sec("2415V", { lock: "slide" })).toMatch(/insulated with vinyl back cover, solid no windows, inside slide lock, single end stile$/);
    expect(sec("2415V", { lock: "none" })).toMatch(/single end stile$/);
    expect(sec("2415V", { secKind: "bt", lock: "slide" })).toMatch(/single end stile$/);
    expect(sec("524", { manFt: 12, manIn: 0, lock: "slide" })).toMatch(/inside slide lock, single end stile, stile locations needed$/);
    // A section with windows takes no lock (Brandon, 20/10/2026).
    expect(sec("524", { manFt: 14, manIn: 0, lock: "slide", windowPanels: [2, 3] })).toMatch(/windows in center of section, solid-glass-glass-solid, single end stile, stile locations needed$/);
    expect(section("3200", { manFt: 8, manIn: 2, secHeight: "24", stile: "single", lock: "slide" })).toMatch(/single end stile, inside slide lock$/);
    expect(section("3720", { manFt: 12, manIn: 0, windows: 1, stile: "single", lock: "slide" })).toMatch(/single end stile$/);
    // Wording only: the price does not move.
    const price = (o: Record<string, unknown>) => quoteCommercial({ order: "section", mfr: "Clopay", model: "524", manFt: 12, manIn: 0, secKind: "int", secHeight: "24", stile: "single", color: "White", ...o } as never).unitPrice;
    expect(price({ lock: "slide" })).toBe(price({ lock: "none" }));
  });

  it("puts a lockbar on a windowless intermediate section at the add-on figures, and says so (Brandon, 20/10/2026)", () => {
    const price = (o: Record<string, unknown>) => quoteCommercial({ order: "section", mfr: "Clopay", model: "524", manFt: 12, manIn: 0, secKind: "int", secHeight: "24", stile: "single", color: "White", ...o } as never).unitPrice;
    expect(price({ lock: "lockbar" })).toBeCloseTo(price({ lock: "none" }) + 49.95, 2);
    expect(price({ lock: "lockbar_installed" })).toBeCloseTo(price({ lock: "none" }) + 74.95, 2);
    expect(price({ lock: "lockbar_installed", windowPanels: [2, 3] })).toBeCloseTo(price({ lock: "none", windowPanels: [2, 3] }), 2);
    expect(sec("524", { manFt: 12, manIn: 0, lock: "lockbar", stileLocations: ['48"', '96"'] })).toMatch(/solid no windows, lockbar assembly, single end stile, stile locations 48" and 96"$/);
    expect(sec("2415V", { lock: "lockbar_installed" })).toMatch(/solid no windows, lockbar installed, single end stile$/);
    expect(sec("2415V", { secKind: "bt", lock: "lockbar" })).toMatch(/single end stile$/);
    expect(section("3200", { manFt: 8, manIn: 2, secHeight: "24", stile: "single", lock: "lockbar" })).toMatch(/single end stile, lockbar assembly$/);
  });

  it("words the 2415 the same way, under its own maker", () => {
    expect(sec("2415", { secKind: "bt", manFt: 12, manIn: 0, stileLocations: ['48"', '96"'] })).toBe(
      'Wayne Dalton Model 2415, 12\'0" x 24", steel ribbed bottom section, in the color white, non insulated, single end stile, stile locations 48" and 96"',
    );
  });

  it("never assumes a colour from the model", () => {
    expect(section("524S", { color: "White" })).toContain("in the color white");
    expect(section("524V", { color: "Brown" })).toContain("in the color brown");
  });

  it("keeps two end stiles plural", () => {
    expect(section("524", { stile: "double", stileLocations: ['48"', '96"', '144"'] })).toMatch(/double end stiles, stile locations 48"  96" and 144"$/);
    expect(section("524", { stile: "double", manFt: 8, manIn: 2 })).toMatch(/double end stiles$/);
  });

  it("leaves every other commercial model alone", () => {
    expect(section("3150")).toContain("solid intermediate section, in the color White");
    expect(complete("3200")).toContain("in the color white, solid no windows,");
    expect(section("3150")).not.toContain("ribbed");
  });
});
