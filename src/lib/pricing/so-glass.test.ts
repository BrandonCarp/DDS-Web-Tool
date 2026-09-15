import { describe, it, expect } from "vitest";
import { specialDoorQuote } from "./data/special-door-pricing";
import { glassOptionsFor, hasGlassOptions, glassAdder, glassLabel, SO_GLASS_TYPES } from "./data/so-glass";

const base = {
  model: "4050/4051/4053", color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const, height: "7",
};
const sell = (width: string, glassType?: string) =>
  specialDoorQuote({ ...base, width, style: "glass" as const, glassType }).quote?.unitPrice ?? 0;

/** Brandon's sheet, 4050_8_9_GLASS.xlsx. */
const SHEET: Record<string, Record<string, number>> = {
  "8": { dsb: 918.05, acrylic: 941.86, insulated: 1005.35, obscure: 963.02,
         insulated_obscure: 1058.26, tempered: 1084.72, insulated_tempered: 1292.89,
         frosted: 1190.54, rain: 1190.54, insulated_frosted: 1428.65,
         insulated_rain: 1428.65, seeded: 1428.65, insulated_seeded: 1613.84 },
  "9": { dsb: 977.00, acrylic: 1000.81, insulated: 1064.30, obscure: 1021.96,
         insulated_obscure: 1117.21, tempered: 1143.67, insulated_tempered: 1351.84,
         frosted: 1249.49, rain: 1249.49, insulated_frosted: 1487.60,
         insulated_rain: 1487.60, seeded: 1487.60, insulated_seeded: 1672.79 },
};

describe("special order glass types", () => {
  it("prices all 26 rows to the cent", () => {
    for (const [w, row] of Object.entries(SHEET)) {
      for (const [g, expected] of Object.entries(row)) {
        expect(sell(w, g), `${w}' ${g}`).toBeCloseTo(expected, 1);
      }
    }
  });

  it("offers thirteen types at the two priced widths", () => {
    for (const w of ["8", "9"]) {
      expect(hasGlassOptions("4050/4051/4053", w), w).toBe(true);
      expect(glassOptionsFor("4050/4051/4053", w)).toHaveLength(13);
    }
  });

  it("offers none where DDS has not priced them", () => {
    // Every other width falls back to the grid's generic glass column.
    for (const w of ["6", "10", "12", "16", "18"]) {
      expect(hasGlassOptions("4050/4051/4053", w), w).toBe(false);
      expect(glassOptionsFor("4050/4051/4053", w), w).toEqual([]);
    }
    expect(hasGlassOptions("T50S/T50L", "8")).toBe(false);
  });

  it("falls back to the grid when no type is chosen", () => {
    // 897.37 is the grid's own GLASS column at 8'0".
    expect(sell("8")).toBeCloseTo(897.37, 2);
    expect(sell("9")).toBeCloseTo(956.32, 2);
  });

  it("falls back for a width with no priced table", () => {
    expect(sell("16", "insulated_seeded")).toBeCloseTo(sell("16"), 2);
  });

  it("charges more for every named type than the grid's standard glass", () => {
    // The cheapest named type is double strength, and it still beats standard.
    for (const w of ["8", "9"]) {
      expect(sell(w, "dsb"), w).toBeGreaterThan(sell(w));
    }
  });

  it("orders them cheapest first within a family", () => {
    for (const w of ["8", "9"]) {
      expect(sell(w, "dsb")).toBeLessThan(sell(w, "insulated"));
      expect(sell(w, "obscure")).toBeLessThan(sell(w, "insulated_obscure"));
      expect(sell(w, "tempered")).toBeLessThan(sell(w, "insulated_tempered"));
      expect(sell(w, "frosted")).toBeLessThan(sell(w, "insulated_frosted"));
    }
  });

  it("names the glass on the quote", () => {
    const q = specialDoorQuote({ ...base, width: "8", style: "glass", glassType: "insulated_tempered" });
    expect(q.quote?.description).toContain("insulated tempered glass");
    const plain = specialDoorQuote({ ...base, width: "8", style: "glass" });
    expect(plain.quote?.description).toContain("glass in the top section");
    expect(plain.quote?.description).not.toContain("insulated");
  });

  it("ignores a glass type on a solid or inserts door", () => {
    const solid = specialDoorQuote({ ...base, width: "8", style: "solid", glassType: "insulated_seeded" });
    expect(solid.quote?.description).toContain("solid, no windows");
    expect(solid.quote?.unitPrice).toBeCloseTo(723.25, 2);
  });

  it("carries the flat $10 DDS adds to every glazed special order", () => {
    // The book's own DSB figure at the 8'/9' band is 101.04.
    expect(glassAdder("4050/4051/4053", "8", "dsb")).toBeCloseTo(101.04 + 10, 2);
    expect(glassAdder("4050/4051/4053", "9", "obscure")).toBeCloseTo(126.67 + 10, 2);
  });

  it("gives every type a label", () => {
    for (const g of SO_GLASS_TYPES) {
      expect(glassLabel(g.id), g.id).toBe(g.label);
      expect(g.label.length).toBeGreaterThan(2);
    }
  });
});

describe("special order track options", () => {
  const b = {
    model: "4050/4051/4053", color: "White", style: "solid" as const,
    spring: "torsion" as const, lock: "none" as const, height: "7", width: "16",
  };
  const price = (extra: Record<string, unknown> = {}) =>
    specialDoorQuote({ ...b, track: "r15", ...extra }).quote?.unitPrice ?? 0;
  const desc = (extra: Record<string, unknown> = {}) =>
    specialDoorQuote({ ...b, track: "r15", ...extra }).quote?.description ?? "";

  it("adds high lift at the book rate, lifted by the margin", () => {
    // Continuous angle, 25 degree, 60": 179.45 + 6 x 4.52 = 206.57 cost,
    // which is 362.40 at this group's 43 margin.
    const d = price({ track: "high_lift", trackMount: "continuous_angle", incline: "deg25", highLiftInches: 60 })
            - price();
    expect(d).toBeCloseTo((179.45 + 6 * 4.52) / 0.57, 1);
  });

  it("charges nothing without high lift", () => {
    expect(price({ trackMount: "continuous_angle", incline: "deg25" })).toBeCloseTo(price(), 2);
  });

  it("uses the cheaper table on a taller door", () => {
    const short = specialDoorQuote({ ...b, height: "8", track: "high_lift", trackMount: "bracket", incline: "deg25", highLiftInches: 54 });
    const tall = specialDoorQuote({ ...b, height: "9", track: "high_lift", trackMount: "bracket", incline: "deg25", highLiftInches: 54 });
    const base8 = specialDoorQuote({ ...b, height: "8", track: "r15" }).quote?.unitPrice ?? 0;
    const base9 = specialDoorQuote({ ...b, height: "9", track: "r15" }).quote?.unitPrice ?? 0;
    expect((short.quote?.unitPrice ?? 0) - base8).toBeCloseTo(153.82 / 0.57, 1);
    expect((tall.quote?.unitPrice ?? 0) - base9).toBeCloseTo(116.87 / 0.57, 1);
  });

  it("refuses a lift above the door height less 3 inches", () => {
    // A 7'0" door caps at 81"; 84" is full vertical lift, not high lift.
    const d = price({ track: "high_lift", trackMount: "bracket", incline: "deg25", highLiftInches: 84 }) - price();
    expect(d).toBeCloseTo(0, 2);
  });

  it("names an angle mount the way the commercial tool does", () => {
    expect(desc({ trackMount: "continuous_angle" })).toContain('2" continuous angle mount track to wood');
    expect(desc({ trackMount: "reverse_angle" })).toContain('2" reverse angle mount track to steel');
    expect(desc({ trackMount: "bracket" })).not.toContain("angle mount");
  });

  it("names the lift on the quote", () => {
    expect(desc({ track: "high_lift", trackMount: "bracket", incline: "deg25", highLiftInches: 60 }))
      .toContain("60\u2033 high lift track");
  });

  it("charges no radius adder on a high lift track", () => {
    // The lift figure covers the track; a radius adder on top would double-bill.
    const r32 = price({ track: "r32" });
    const hl = price({ track: "high_lift", trackMount: "bracket", incline: "straight_incline", highLiftInches: 54 });
    expect(hl).toBeLessThan(r32 + 153.82 / 0.57);
  });
});
