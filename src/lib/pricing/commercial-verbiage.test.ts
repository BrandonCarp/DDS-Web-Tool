import { describe, it, expect } from "vitest";
import { quoteCommercial } from "./commercial";

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
  it("leads a 524 complete door with the material", () => {
    expect(complete("524")).toContain(`Model 524, 9'2" x 14'0", hollow steel ribbed, in the color white,`);
    // The model prefix and the track/spring/lock tail are unchanged.
    expect(complete("524")).toMatch(/^Clopay Model 524,/);
    expect(complete("524")).toMatch(/torsion springs, no lock$/);
  });

  // Brandon's three lines (7/10/2026), for a 12'0" x 24" section, single end stile.
  const sec = (model: string, o: Record<string, unknown> = {}) =>
    section(model, { manFt: 12, secHeight: "24", stile: "single", ...o });

  it("words a 524 bottom section as Brandon wrote it", () => {
    expect(sec("524", { secKind: "bt" })).toBe(
      'CLOPAY MODEL 524,  12\'0" X 24",  STEEL RIBBED BOTTOM SECTION,  NON INSULATED,  IN THE COLOR WHITE,  SINGLE END STILE',
    );
  });

  it("words a solid 524 intermediate section as Brandon wrote it", () => {
    expect(sec("524")).toBe(
      'CLOPAY MODEL 524,  12\'0" X 24",  SOLID STEEL RIBBED INTERMEDIATE SECTION,  NON INSULATED,  IN THE COLOR WHITE,  SINGLE END STILE',
    );
  });

  it("words a 524 intermediate with glass as Brandon wrote it, windows before the insulation", () => {
    expect(sec("524", { windows: 2 })).toBe(
      'CLOPAY MODEL 524,  12\'0" X 24",  STEEL RIBBED INTERMEDIATE SECTION,  TWO 24X12 WINDOWS,  NON INSULATED,  IN THE COLOR WHITE,  SINGLE END STILE',
    );
    expect(sec("524", { windows: 1 })).toContain("ONE 24X12 WINDOW,");
  });

  it("gives the V a vinyl backer and the S a steel one", () => {
    for (const m of ["524V", "2415V"]) {
      expect(sec(m), m).toContain("SOLID STEEL RIBBED INTERMEDIATE SECTION,  INSULATED VINYL BACKER,  IN THE COLOR");
      expect(sec(m), m).not.toContain("NON INSULATED");
    }
    for (const m of ["524S", "2415S"]) {
      expect(sec(m), m).toContain("SOLID STEEL RIBBED INTERMEDIATE SECTION,  INSULATED STEEL BACKER,  IN THE COLOR");
    }
  });

  it("words the 2415 the same way, under its own maker", () => {
    expect(sec("2415", { secKind: "bt" })).toBe(
      'WAYNE DALTON MODEL 2415,  12\'0" X 24",  STEEL RIBBED BOTTOM SECTION,  NON INSULATED,  IN THE COLOR WHITE,  SINGLE END STILE',
    );
  });

  it("never assumes a colour from the model", () => {
    expect(section("524S", { color: "White" })).toContain("IN THE COLOR WHITE");
    expect(section("524V", { color: "Brown" })).toContain("IN THE COLOR BROWN");
  });

  it("keeps two end stiles plural", () => {
    expect(section("524", { stile: "double" })).toMatch(/DOUBLE END STILES$/);
  });

  it("leaves every other commercial model alone", () => {
    expect(section("3150")).toContain("solid intermediate section, in the color White");
    expect(complete("3200")).toContain("in the color white, solid, no windows,");
    expect(section("3150")).not.toContain("ribbed");
  });
});
