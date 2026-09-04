import { describe, it, expect } from "vitest";
import { quoteResidential } from "./engine";
import {
  colorInStock, stockedWidths, stockedHeights, compareSizeCodes, sizeLabel, sizeParts,
  solidOnlyHeight,
} from "./data/stock-colors";

const opts = (o: Record<string, unknown> = {}) =>
  ({ style: "solid", color: "White", track: "r12", spring: "extension", lock: "none", ...o }) as never;
const dim = (wf: number, hf: number, hi = 0) =>
  ({ widthFt: wf, widthIn: 0, heightFt: hf, heightIn: hi });

describe("4050 family at 6'0\"", () => {
  it("floors a 6'0\" solid door", () => {
    // 6'3" and 6'6" were already stocked; 6'0" is the addition. It needed no
    // pricing change — the 7' tier runs from 6'0" to 7'0".
    for (const model of ["4050", "4051", "4053"]) {
      expect(quoteResidential(model, dim(9, 6, 0), opts()).isStock, model).toBe(true);
    }
  });

  it("makes 6'0\" a special order the moment windows are added", () => {
    // The one size in the matrix where style decides stock status.
    for (const style of ["glass", "inserts"]) {
      expect(quoteResidential("4050", dim(9, 6, 0), opts({ style })).isStock, style).toBe(false);
    }
  });

  it("leaves 6'3\" and 6'6\" glazed doors in stock", () => {
    // The solid-only rule is scoped to 6'0" and must not leak upward.
    for (const [hf, hi] of [[6, 3], [6, 6], [7, 0]] as const) {
      expect(
        quoteResidential("4050", dim(9, hf, hi), opts({ style: "glass" })).isStock,
        `${hf}'${hi}"`,
      ).toBe(true);
    }
  });

  it("still respects colour and width at 6'0\"", () => {
    // Adding a height does not floor a size or colour that was never floored.
    expect(colorInStock("4050", "Black", "9", "6", "solid")).toBe(true);
    expect(colorInStock("4050", "Black", "12", "6", "solid")).toBe(false); // Black stops at 16
    expect(colorInStock("4050", "Bronze", "9", "6", "solid")).toBe(false); // not floored at all
  });

  it("floors 6'0\" on every stocked model, not just the 4050", () => {
    // Superseded the 4050-only rule on 4/9/2026: the whole matrix floors at
    // 6'0" now.
    for (const model of ["T50S", "T52S", "GD1LP", "9130", "9133"]) {
      expect(quoteResidential(model, dim(9, 6, 0), opts()).isStock, model).toBe(true);
    }
  });
});

describe("9130 / 9133 on the floor", () => {
  it("stocks 8, 9 and 16 in White", () => {
    for (const model of ["9130", "9133"]) {
      for (const w of [8, 9, 16]) {
        expect(quoteResidential(model, dim(w, 7), opts()).isStock, `${model} ${w}'`).toBe(true);
      }
    }
  });

  it("stocks no colour but White", () => {
    // The 9130 carries fourteen colours including the Ultra-Grain finishes.
    // Exactly one is floored.
    for (const color of ["Almond", "Black", "Bronze", "Charcoal", "Ultra-Grain Classic Walnut"]) {
      expect(colorInStock("9130", color, "9", "7"), color).toBe(false);
    }
  });

  it("stocks no width but 8, 9 and 16", () => {
    for (const w of [7, 10, 12, 14, 15, 18]) {
      expect(quoteResidential("9130", dim(w, 7), opts()).isStock, `${w}'`).toBe(false);
    }
  });

  it("leaves the 4300 family unfloored", () => {
    expect(quoteResidential("4300", dim(9, 7), opts()).isStock).toBe(false);
  });
});

describe("size dropdown options", () => {
  it("offers every size DDS floors for the model, across all colours", () => {
    // The union, not one colour's list. A 9133 floors 8/9/16 in White only, so
    // a Black 8'0" must still be offerable — it quotes as a special order,
    // which is what the counter needs to see rather than an empty dropdown.
    expect(stockedWidths("9133")).toEqual(["8", "9", "16"]);
    expect(colorInStock("9133", "Black", "8", "7")).toBe(false);
    expect(quoteResidential("9133", dim(8, 7), opts({ color: "Black" })).isStock).toBe(false);
    expect(quoteResidential("9133", dim(8, 7), opts({ color: "Black" })).unitPrice).toBeGreaterThan(0);
  });

  it("runs every model 6'0\" to 8'0\"", () => {
    const band = ["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8"];
    expect(stockedHeights("9130")).toEqual(band);
    expect(stockedHeights("9133")).toEqual(band);
    expect(stockedHeights("4051")).toEqual(band);
    // White runs tall on top of that.
    expect(stockedHeights("4050")).toEqual([...band, "9", "10"]);
  });

  it("gives the 4050 the widest size list, 6'0\" included", () => {
    expect(stockedWidths("4050")).toEqual(["7", "7.6", "8", "9", "10", "12", "14", "15", "16", "18"]);
    expect(stockedHeights("4050")[0]).toBe("6");
    expect(stockedHeights("T50S")[0]).toBe("6");
  });

  it("offers nothing for a model DDS floors in nothing", () => {
    // The 4300 keeps the free-entry boxes: an empty dropdown is a dead end.
    expect(stockedWidths("4300")).toEqual([]);
    expect(stockedHeights("4300")).toEqual([]);
  });

  it("sorts sizes by feet then inches, never as decimals", () => {
    expect(compareSizeCodes("7.6", "10")).toBeLessThan(0);
    expect(compareSizeCodes("6.9", "6.10")).toBeLessThan(0);
    expect(sizeLabel("7.6")).toBe(`7'6"`);
    expect(sizeLabel("9")).toBe(`9'0"`);
    expect(sizeParts("7.6")).toEqual({ ft: 7, in: 6 });
  });
});
