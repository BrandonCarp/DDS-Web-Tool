import { describe, it, expect } from "vitest";
import { quoteCommercial } from "./commercial";
import { slabBilledFeet, roundedFeet, SLAB_MIN_FEET } from "./data/commercial-meta";

const sec = (model: string, mfr: string, ft: number, inch = 0) =>
  quoteCommercial({ order: "section", mfr, model, manFt: ft, manIn: inch,
    secKind: "bt", secHeight: "21", stile: "none" });

describe("per-foot slab minimum", () => {
  it("bills anything under 8' as 8'", () => {
    for (const ft of [3, 5, 6, 7]) {
      expect(slabBilledFeet(ft, 0), `${ft}'`).toBe(SLAB_MIN_FEET);
    }
    expect(slabBilledFeet(7, 6)).toBe(8);   // rounds to 8 anyway
  });

  it("leaves 8' and wider alone", () => {
    for (const ft of [8, 9, 12, 20]) {
      expect(slabBilledFeet(ft, 0), `${ft}'`).toBe(roundedFeet(ft, 0));
    }
    expect(slabBilledFeet(9, 6)).toBe(10);  // rounding still applies above the floor
  });

  it("charges the same for every width below the minimum", () => {
    const at8 = sec("524", "Overhead", 8).unitPrice;
    for (const ft of [5, 6, 7]) {
      expect(sec("524", "Overhead", ft).unitPrice, `${ft}'`).toBeCloseTo(at8, 2);
    }
  });

  it("bills the retainer at the same width as the slab", () => {
    // A short slab must not get a full-price slab with a short retainer. The
    // lines are collapsed into one number, so check the arithmetic: 8' of slab
    // at $29 plus 8' of retainer at $3.75 is $262.
    expect(sec("524", "Overhead", 6).unitPrice).toBeCloseTo(8 * 29 + 8 * 3.75, 2);
    expect(sec("524", "Overhead", 9).unitPrice).toBeCloseTo(9 * 29 + 9 * 3.75, 2);
  });

  it("says when the minimum is doing the work", () => {
    expect(sec("524", "Overhead", 6).lines[0].name).toContain("8′ minimum");
    expect(sec("524", "Overhead", 9).lines[0].name).not.toContain("minimum");
  });

  it("still climbs by the foot above the minimum", () => {
    const a = sec("TS150", "Therma Steel", 9).unitPrice;
    const b = sec("TS150", "Therma Steel", 8).unitPrice;
    expect(a).toBeGreaterThan(b);
  });

  it("does not touch the standard-width models", () => {
    // The 3720 prices off a width table that already rounds up, so the floor
    // has nothing to do there.
    const q = sec("3720", "Clopay", 6);
    expect(q.lines[0].name).toContain("standard");
    expect(q.lines[0].name).not.toContain("minimum");
  });
});
