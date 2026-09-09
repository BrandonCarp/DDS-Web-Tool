import { describe, it, expect } from "vitest";
import { homeownerMarkup, homeownerMarkupForBand, isWideBand } from "./engine";

describe("home owner surcharge coverage", () => {
  it("has a rate for a door and a section, stock and special", () => {
    // Every quoting path is covered: residential doors and replacement
    // sections take the stock rates, special order and commercial take the
    // special ones — commercial is always a special order.
    const kinds = ["stock_door", "special_door", "stock_section", "special_section"] as const;
    for (const k of kinds) {
      expect(homeownerMarkup(9, 0, k), `${k} narrow`).toBeGreaterThan(0);
      expect(homeownerMarkup(16, 0, k), `${k} wide`).toBeGreaterThan(0);
    }
  });

  it("keeps sections cheaper than doors at both bands", () => {
    for (const w of [9, 16]) {
      expect(homeownerMarkup(w, 0, "stock_section")).toBeLessThan(homeownerMarkup(w, 0, "stock_door"));
      expect(homeownerMarkup(w, 0, "special_section")).toBeLessThan(homeownerMarkup(w, 0, "special_door"));
    }
  });

  it("uses one band rule everywhere", () => {
    // The same 9'0" split as upgraded hardware, so the two options never
    // disagree about which side of the line a door is on.
    expect(isWideBand(9, 0)).toBe(false);
    expect(isWideBand(9, 2)).toBe(true);
  });
});

describe("stated single or double door", () => {
  it("matches the width-derived rates exactly", () => {
    // A special order is usually a typed-in total with no size attached, so the
    // counter states the band instead. It must reach the same numbers.
    for (const k of ["stock_door", "special_door", "stock_section", "special_section"] as const) {
      expect(homeownerMarkupForBand("single", k), `${k} single`).toBe(homeownerMarkup(9, 0, k));
      expect(homeownerMarkupForBand("double", k), `${k} double`).toBe(homeownerMarkup(16, 0, k));
    }
  });

  it("prices a double at twice a single", () => {
    for (const k of ["stock_door", "special_door", "stock_section", "special_section"] as const) {
      expect(homeownerMarkupForBand("double", k), k).toBe(homeownerMarkupForBand("single", k) * 2);
    }
  });

  it("gives the special-order door rates the counter will see", () => {
    expect(homeownerMarkupForBand("single", "special_door")).toBe(400);
    expect(homeownerMarkupForBand("double", "special_door")).toBe(800);
    expect(homeownerMarkupForBand("single", "special_section")).toBe(150);
    expect(homeownerMarkupForBand("double", "special_section")).toBe(300);
  });
});
