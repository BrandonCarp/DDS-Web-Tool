import { describe, it, expect } from "vitest";
import { quoteResidential, upgradedHardwarePrice } from "./engine";
import { SPECIAL, seriesFor } from "./data/special-orders";

const base = {
  style: "solid" as const, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const,
};
const dim = (ft: number, inch = 0) => ({ widthFt: ft, widthIn: inch, heightFt: 7, heightIn: 0 });

describe("upgraded hardware", () => {
  it("is $35 through 9'0\" and $45 above", () => {
    for (const [ft, inch] of [[6, 0], [8, 0], [9, 0]] as const) {
      expect(upgradedHardwarePrice(dim(ft, inch)), `${ft}'${inch}"`).toBe(35);
    }
    for (const [ft, inch] of [[9, 6], [10, 0], [16, 0], [18, 0]] as const) {
      expect(upgradedHardwarePrice(dim(ft, inch)), `${ft}'${inch}"`).toBe(45);
    }
  });

  it("puts the in-between widths on the wider price", () => {
    // Brandon gave the bands as "9'0\" or less" and "9'6\" or larger". A 9'2" or
    // 9'4" falls between; anything over 9'0" carries the heavier hardware.
    expect(upgradedHardwarePrice(dim(9, 2))).toBe(45);
    expect(upgradedHardwarePrice(dim(9, 4))).toBe(45);
  });

  it("adds exactly the addon to the quote", () => {
    for (const [ft, add] of [[9, 35], [10, 45]] as const) {
      const off = quoteResidential("4050", dim(ft), base).unitPrice;
      const on = quoteResidential("4050", dim(ft), { ...base, upgradedHardware: true }).unitPrice;
      expect(on - off, `${ft}'`).toBeCloseTo(add, 2);
    }
  });

  it("adds nothing when it is not selected", () => {
    const a = quoteResidential("4050", dim(9), base).unitPrice;
    const b = quoteResidential("4050", dim(9), { ...base, upgradedHardware: false }).unitPrice;
    expect(a).toBe(b);
  });

  it("does not vary with height", () => {
    // Width alone decides the band.
    expect(upgradedHardwarePrice({ widthFt: 9, widthIn: 0, heightFt: 10, heightIn: 0 })).toBe(35);
    expect(upgradedHardwarePrice({ widthFt: 10, widthIn: 0, heightFt: 6, heightIn: 0 })).toBe(45);
  });
});

describe("Haas Aluminum Series", () => {
  it("sits alongside the other two Haas lines", () => {
    expect(seriesFor("Haas")).toEqual(["Haas Doors", "American Tradition", "Aluminum Series"]);
  });

  it("takes 35 on a door and 49 on sections", () => {
    expect(SPECIAL["Aluminum Series"].door).toBe(35);
    expect(SPECIAL["Aluminum Series"].section).toBe(49);
  });

  it("prices the same as American Tradition and below Haas Doors", () => {
    const sell = (m: number) => 1000 / (1 - m / 100);
    expect(sell(SPECIAL["Aluminum Series"].door!)).toBeCloseTo(sell(SPECIAL["American Tradition"].door!), 2);
    expect(sell(SPECIAL["Aluminum Series"].door!)).toBeLessThan(sell(SPECIAL["Haas Doors"].door!));
    expect(sell(SPECIAL["Aluminum Series"].door!)).toBeCloseTo(1538.46, 2);
  });

  it("stays out of the Clopay collection list", () => {
    expect(seriesFor("Clopay")).not.toContain("Aluminum Series");
  });
});
