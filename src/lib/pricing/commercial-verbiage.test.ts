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

  it("words hollow models without a backer", () => {
    expect(section("524", { secKind: "bt" })).toContain("hollow steel ribbed bottom section, in the color White");
    expect(section("2415")).toContain("hollow steel ribbed intermediate section, in the color White");
    expect(section("524")).not.toContain("backer");
  });

  it("calls out the backer on the insulated variants", () => {
    for (const m of ["524V", "524S", "2415V", "2415S"]) {
      expect(section(m), m).toContain("steel ribbed intermediate section, insulated steel backer,");
      expect(section(m), m).not.toContain("hollow");
    }
  });

  it("spells the window count and puts it before the colour", () => {
    expect(section("524V", { windows: 2 })).toContain(
      "steel ribbed intermediate section, insulated steel backer, two 24x12 windows, in the color White",
    );
    expect(section("524V", { windows: 1 })).toContain("one 24x12 windows");
    expect(section("524V", { windows: 3 })).toContain("three 24x12 windows");
  });

  it("never assumes a colour from the model", () => {
    // V and S differ by how they usually sell, not by construction. Hardcoding
    // a colour would put the wrong word on a customer's estimate.
    expect(section("524S", { color: "White" })).toContain("in the color White");
    expect(section("524V", { color: "Brown" })).toContain("in the color Brown");
  });

  it("gives every ribbed model a colour, hollow ones included", () => {
    for (const m of ["524", "524V", "524S", "2415", "2415V", "2415S"]) {
      expect(section(m), m).toMatch(/in the color \w+/);
    }
  });

  it("leaves every other commercial model alone", () => {
    expect(section("3150")).toContain("solid intermediate section, in the color White");
    expect(complete("3200")).toContain("in the color white, solid, no windows,");
    expect(section("3150")).not.toContain("ribbed");
  });
});
