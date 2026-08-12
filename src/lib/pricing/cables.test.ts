import { describe, it, expect } from "vitest";
import { cableQuote, billableFeet } from "./data/cables";

describe("cut-to-length cables", () => {
  it("prices the pair, not the single cable", () => {
    // Brandon's figure: 10'6" of 1/8" is $22 — 11 billable feet x $1 x 2.
    const q = cableQuote('1/8"', 10, 6)!;
    expect(q.billableFeet).toBe(11);
    expect(q.total).toBe(22);
  });

  it("charges the extra foot from 5 inches up, and drops it below", () => {
    expect(billableFeet(10, 4)).toBe(10);
    expect(billableFeet(10, 5)).toBe(11);
    expect(billableFeet(10, 11)).toBe(11);
    expect(billableFeet(9, 0)).toBe(9);
  });

  it("keeps the measured size in the description, not the rounded one", () => {
    // The cable is cut to what was asked for; only the charge moves to a foot.
    expect(cableQuote('1/8"', 12, 9)!.description).toBe('1/8" TORSION CABLES,  12\'9" LONG,  PAIR');
    expect(cableQuote('1/8"', 9, 10)!.description).toBe('1/8" TORSION CABLES,  9\'10" LONG,  PAIR');
  });

  it("prices each gauge off its own per-foot rate", () => {
    expect(cableQuote('1/8"', 10, 0)!.total).toBe(20); // 10 x 1.00 x 2
    expect(cableQuote('5/32"', 10, 0)!.total).toBe(25); // 10 x 1.25 x 2
    expect(cableQuote('3/16"', 10, 0)!.total).toBe(30); // 10 x 1.50 x 2
  });

  it("names the gauge at the front of the description", () => {
    expect(cableQuote('3/16"', 8, 0)!.description).toBe('3/16" TORSION CABLES,  8\'0" LONG,  PAIR');
  });

  it("refuses a length it cannot cut", () => {
    expect(cableQuote('1/8"', 0, 0)).toBeNull();
    expect(cableQuote('1/8"', 9, 12)).toBeNull(); // inches must be 0-11
    expect(cableQuote('7/32"', 9, 0)).toBeNull(); // gauge not carried
  });

  it("still bills a whole foot for a short run over 5 inches", () => {
    const q = cableQuote('5/32"', 0, 9)!;
    expect(q.billableFeet).toBe(1);
    expect(q.total).toBe(2.5);
  });
});
