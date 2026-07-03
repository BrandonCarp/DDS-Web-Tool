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
  widthMode: "standard" as const, secSize: "8.2", secKind: "bt" as const,
  secHeight: "21" as const, windows: 0, retainer: false, stile: "none" as const, ...over,
});

describe("commercial replacement sections", () => {
  it("stocked Clopay standard size: sell = cost / (1 - 49%)", () => {
    const q = quoteCommercial(section());
    expect(q.unitPrice).toBeCloseTo(128.23 / 0.51, 2); // 524 8'2" bottom cost from the sections book
  });
  it("per-foot model (Wayne Dalton 2415 @ $29/ft), 5-inch-plus rounds up", () => {
    const q = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", widthMode: "manual", manFt: 9, manIn: 6 }));
    expect(q.unitPrice).toBeCloseTo(29 * 10, 2);
  });
  it("per-foot adders: retainer per foot, stiles flat, windows ×$150 on intermediates", () => {
    const q = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", widthMode: "manual", manFt: 10, manIn: 0, retainer: true, stile: "double" }));
    expect(q.unitPrice).toBeCloseTo(29 * 10 + 3.75 * 10 + 50, 2);
    const qi = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", widthMode: "manual", manFt: 10, manIn: 0, secKind: "int", windows: 2 }));
    expect(qi.unitPrice).toBeCloseTo(29 * 10 + 300, 2);
  });
  it("caps windows at the max for the width (≤9ft -> 2)", () => {
    const q = quoteCommercial(section({ model: "2415", mfr: "Wayne Dalton", widthMode: "manual", manFt: 8, manIn: 0, secKind: "int", windows: 5 }));
    expect(q.unitPrice).toBeCloseTo(29 * 8 + 150 * 2, 2);
  });
  it("Clopay 3200 section uses stock cost (no per-foot rate exists)", () => {
    const q = quoteCommercial(section({ model: "3200", secSize: "9.2", secKind: "int" }));
    expect(q.unitPrice).toBeCloseTo(198.78 / 0.51, 2);
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
