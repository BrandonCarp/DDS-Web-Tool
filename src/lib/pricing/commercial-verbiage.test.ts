import { describe, it, expect } from "vitest";
import { quoteCommercial } from "./commercial";
import { asksStileLocations, sectionWindowSizes } from "./data/commercial-meta";

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
      `Clopay Model 524, 9'2" x 14'0", non insulated, in the color white, solid no windows, 2" angle mount track to wood, 15" radius track, torsion springs, no lock`,
    );
    expect(complete("524")).not.toContain("hollow");
    expect(complete("524")).not.toContain("ribbed"); // that wording is the sections' only
  });

  it("puts a 524 complete door's windows after the colour, like any other door", () => {
    expect(complete("524", { glass: "glass", winSection: 3 })).toContain(
      `non insulated, in the color white, 24x12 windows in the third section, 2" angle`,
    );
  });

  // Brandon's lines of 14/10/2026, for an 8'2" x 24" section with single end stiles.
  const sec = (model: string, o: Record<string, unknown> = {}) =>
    section(model, { manFt: 8, manIn: 2, secHeight: "24", stile: "single", ...o });

  it("words a bottom section as Brandon wrote it: section, colour, insulation, stiles", () => {
    expect(sec("2415V", { secKind: "bt" })).toBe(
      'Wayne Dalton Model 2415V, 8\'2" x 24", steel ribbed bottom section, in the color white, insulated with vinyl back cover, single end stiles',
    );
    expect(sec("2415", { secKind: "bt" })).toBe(
      'Wayne Dalton Model 2415, 8\'2" x 24", steel ribbed bottom section, in the color white, non insulated, single end stiles',
    );
    expect(sec("524", { secKind: "bt" })).toBe(
      'Clopay Model 524, 8\'2" x 24", steel ribbed bottom section, in the color white, non insulated, single end stiles',
    );
  });

  it("says SOLID NO WINDOWS on a solid intermediate, between the colour and the insulation", () => {
    expect(sec("2415V")).toBe(
      'Wayne Dalton Model 2415V, 8\'2" x 24", steel ribbed intermediate section, in the color white, solid no windows, insulated with vinyl back cover, single end stiles',
    );
    expect(sec("524V")).toBe(
      'Clopay Model 524V, 8\'2" x 24", steel ribbed intermediate section, in the color white, solid no windows, insulated with vinyl back cover, single end stiles',
    );
    expect(sec("2415S")).toBe(
      'Wayne Dalton Model 2415S, 8\'2" x 24", steel ribbed intermediate section, in the color white, solid no windows, insulated with steel back cover, single end stiles',
    );
    expect(sec("524")).toContain("steel ribbed intermediate section, in the color white, solid no windows, non insulated, single end stiles");
  });

  it("names the windows by count, size and glass: double strength b grade on the plain door, insulated on the V and S", () => {
    expect(sec("2415V", { windows: 2 })).toBe(
      'Wayne Dalton Model 2415V, 8\'2" x 24", steel ribbed intermediate section, in the color white, two 24x12 insulated glass windows, insulated with vinyl back cover, single end stiles',
    );
    expect(sec("524", { windows: 2 })).toContain("in the color white, two 24x12 double strength b grade glass windows, non insulated, single end stiles");
    expect(sec("2415S", { windows: 1 })).toContain("in the color white, one 24x12 insulated glass window, insulated with steel back cover");
    // The size the sections come in: 24x12 or 24x6 on a 524 or 2415; a size they do not come in is the first.
    expect(sec("524", { windows: 2, windowSize: "24x6" })).toContain("two 24x6 double strength b grade glass windows");
    expect(sec("2415V", { windows: 2, windowSize: "24x8" })).toContain("two 24x12 insulated glass windows");
    expect(sectionWindowSizes("524")).toEqual(["24x12", "24x6"]);
    expect(sectionWindowSizes("2415S")).toEqual(["24x12", "24x6"]);
    expect(sectionWindowSizes("3200")).toEqual(["24x8", "24x12"]);
    expect(sectionWindowSizes("2742")).toEqual(["24x12"]);
  });

  it("gives the 3200 its 24x8 or 24x12 insulated glass windows", () => {
    const s3200 = (o: Record<string, unknown>) => section("3200", { manFt: 8, manIn: 2, secHeight: "24", stile: "single", ...o });
    expect(s3200({ windows: 2 })).toContain('intermediate section, in the color White, two 24x8 insulated glass windows');
    expect(s3200({ windows: 2, windowSize: "24x12" })).toContain("two 24x12 insulated glass windows");
  });

  it("asks a 524 or 2415 from 10'0\" wide where its stiles go, and writes it on the end", () => {
    expect(asksStileLocations("524", 10, 0)).toBe(true);
    expect(asksStileLocations("2415V", 9, 11)).toBe(false);
    expect(asksStileLocations("3200", 12, 0)).toBe(false);
    expect(sec("524", { manFt: 12, manIn: 0, stileLocations: '48" and 96"' })).toBe(
      'Clopay Model 524, 12\'0" x 24", steel ribbed intermediate section, in the color white, solid no windows, non insulated, single end stiles, stile locations 48" and 96"',
    );
    expect(sec("2415V", { manFt: 12, manIn: 0, secKind: "bt", stile: "double", stileLocations: "center" })).toMatch(/double end stiles, stile locations center$/);
    // Under 10'0" the locations are not asked, so none are written.
    expect(sec("524", { stileLocations: "center" })).not.toContain("stile locations");
    expect(sec("524", { manFt: 12, manIn: 0, stileLocations: "  " })).not.toContain("stile locations");
  });

  it("words the 2415 the same way, under its own maker", () => {
    expect(sec("2415", { secKind: "bt", manFt: 12, manIn: 0 })).toBe(
      'Wayne Dalton Model 2415, 12\'0" x 24", steel ribbed bottom section, in the color white, non insulated, single end stiles',
    );
  });

  it("never assumes a colour from the model", () => {
    expect(section("524S", { color: "White" })).toContain("in the color white");
    expect(section("524V", { color: "Brown" })).toContain("in the color brown");
  });

  it("keeps two end stiles plural", () => {
    expect(section("524", { stile: "double" })).toMatch(/double end stiles$/);
  });

  it("leaves every other commercial model alone", () => {
    expect(section("3150")).toContain("solid intermediate section, in the color White");
    expect(complete("3200")).toContain("in the color white, solid no windows,");
    expect(section("3150")).not.toContain("ribbed");
  });
});
