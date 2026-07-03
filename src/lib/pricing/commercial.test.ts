import { describe, it, expect } from "vitest";
import { quoteCommercial, commStockCheck } from "./commercial";
import { torsionPrice, effPPI } from "./data/torsion";
import { SPECIAL } from "./data/special-orders";

const complete = (over: Record<string, unknown> = {}) => ({
  order: "complete" as const, mfr: "Clopay", model: "3200",
  size: "8′2″ × 8′0″", glass: "solid" as const, track: "15R" as const,
  mount: "continuous" as const, cspring: "torsion" as const, clock: "none" as const, ...over,
});

describe("commercial complete-door matrix (ported from the legacy tool)", () => {
  it("prices the 3200 matrix (cost / (1 - 45%) per the source book)", () => {
    const q = quoteCommercial(complete());
    expect(q.priced).toBe(true);
    expect(q.unitPrice).toBeCloseTo(1348.89, 2); // = 741.89 cost / 0.55
  });
  it("prices glass + full view", () => {
    const q = quoteCommercial(complete({ glass: "glass", track: "FV" }));
    expect(q.unitPrice).toBeCloseTo(1788.65, 2);
  });
  it("includes the in-stock badge from the stock list", () => {
    expect(quoteCommercial(complete()).stock?.inStock).toBe(true);
    expect(commStockCheck("524", "14′2″ × 8′0″").inStock).toBe(false); // 524 stock stops at 12'2" wide
  });
  it("builds the copyable description", () => {
    const q = quoteCommercial(complete({ glass: "glass", mount: "reverse", clock: "slide" }));
    expect(q.description).toContain("Clopay Model 3200");
    expect(q.description).toContain("insulated 24x12 windows");
    expect(q.description).toContain("2″ angle mount track to steel");
    expect(q.description).toContain("inside slide lock");
  });
  it("asks for a size before pricing", () => {
    expect(quoteCommercial(complete({ size: "" })).incomplete).toMatch(/size/i);
  });
});

const section = (over: Record<string, unknown> = {}) => ({
  order: "section" as const, mfr: "Clopay", model: "524",
  manFt: 8, manIn: 2, secKind: "bt" as const,
  secHeight: "21" as const, windows: 0, retainer: false, stile: "none" as const, ...over,
});

describe("commercial replacement sections (any customer width)", () => {
  it("per-foot model at the customer's width (524 @ $29/ft), 5-inch-plus rounds up", () => {
    expect(quoteCommercial(section({ manFt: 9, manIn: 6 })).unitPrice).toBeCloseTo(29 * 10, 2);
    expect(quoteCommercial(section({ manFt: 8, manIn: 2 })).unitPrice).toBeCloseTo(29 * 8, 2);
  });
  it("per-foot adders: retainer per foot, stiles flat, windows ×$150 on intermediates", () => {
    const q = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", manFt: 10, manIn: 0, retainer: true, stile: "double" }));
    expect(q.unitPrice).toBeCloseTo(29 * 10 + 3.75 * 10 + 50, 2);
    const qi = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", manFt: 10, manIn: 0, secKind: "int", windows: 2 }));
    expect(qi.unitPrice).toBeCloseTo(29 * 10 + 300, 2);
  });
  it("caps windows at the max for the width (≤9ft -> 2)", () => {
    const q = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", manFt: 8, manIn: 0, secKind: "int", windows: 5 }));
    expect(q.unitPrice).toBeCloseTo(29 * 8 + 150 * 2, 2);
  });
  it("Clopay panel model without a per-foot rate rounds UP to the next standard width cost", () => {
    // 9'4" wanted -> priced as the 10'2" standard section, cost / (1 - 49%)
    const q = quoteCommercial(section({ model: "3200", manFt: 9, manIn: 4, secKind: "int" }));
    expect(q.unitPrice).toBeCloseTo(220.87 / 0.51, 2);
    expect(q.lines[0].name).toContain("priced as 10′2″ standard");
    // exact standard width prices straight from its own cost row
    const q2 = quoteCommercial(section({ model: "3200", manFt: 9, manIn: 2, secKind: "int" }));
    expect(q2.unitPrice).toBeCloseTo(198.78 / 0.51, 2);
  });
  it("rejects widths beyond the widest standard section for cost-table models", () => {
    expect(quoteCommercial(section({ model: "3200", manFt: 18, manIn: 0 })).incomplete).toMatch(/Too wide/);
  });
});

describe("torsion springs (cut to size)", () => {
  it("prices length × ppi + cone (matches the TSC workbook example: $69.66)", () => {
    expect(torsionPrice("0.218", "2", 38)).toBeCloseTo(69.66, 2);
  });
  it("goes UP a wire size when the requested size isn't priced", () => {
    expect(effPPI("0.2", "2")).toBe(1.48); // 0.200 not priced -> 0.207's rate
  });
  it("adds filler on 6-inch ID springs", () => {
    const p = torsionPrice("0.331", "6", 20)!;
    expect(p).toBeCloseTo(20 * 6.52 + 50.3 + 20 * 0.53, 2);
  });
});

describe("special orders (margin + multiplier collections)", () => {
  const sell = (list: number, margin: number) => list / (1 - margin / 100);
  it("Gallery margins per model, door vs sections", () => {
    const g = SPECIAL["Gallery Collection"];
    if (g.type !== "margin") throw new Error("expected margin series");
    expect(sell(1000, g.models["GD4L/GD4S"].door)).toBeCloseTo(1000 / 0.44, 2);
    expect(sell(1000, g.models["GD4L/GD4S"].section)).toBeCloseTo(1000 / 0.57, 2);
  });
  it("multiplier collections: list × multiplier at the cost margin", () => {
    const cr = SPECIAL["Canyon Ridge Collection"];
    if (cr.type !== "multiplier") throw new Error("expected multiplier series");
    expect((1000 * cr.multiplier) / (1 - cr.cost_margin / 100)).toBeCloseTo(1090 / 0.71, 2);
  });
});
