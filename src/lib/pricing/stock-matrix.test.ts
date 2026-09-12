import { describe, it, expect } from "vitest";
import { quoteResidential } from "./engine";
import {
  colorInStock, stockedWidths, stockedHeights, compareSizeCodes, sizeLabel, sizeParts,
  solidOnlyHeight, torsionOnlyHeight, stockedColors, STOCK_MATRIX,
} from "./data/stock-colors";
import { COLORS } from "./data/catalog-meta";
import { priceResidential } from "./engine";
import { RES_SECTIONS } from "./data/res-sections";

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

describe("torsion-only heights", () => {
  it("locks exactly the heights where the spring choice changes nothing", () => {
    // The dropdown offered Extension above 8' while the engine quoted torsion
    // anyway. The lock must cover precisely the heights where picking either
    // gives the same price — no more, no less.
    for (const h of stockedHeights("T50S")) {
      const { ft, in: inches } = sizeParts(h);
      const d = { widthFt: 10, widthIn: 0, heightFt: ft, heightIn: inches };
      const ext = quoteResidential("T50S", d, opts({ spring: "extension" })).unitPrice;
      const tor = quoteResidential("T50S", d, opts({ spring: "torsion" })).unitPrice;
      expect(torsionOnlyHeight(h), `${ft}'${inches}"`).toBe(ext === tor);
    }
  });

  it("starts above 8'0\", matching the book's extension columns", () => {
    for (const h of ["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8"]) {
      expect(torsionOnlyHeight(h), h).toBe(false);
    }
    for (const h of ["9", "10"]) expect(torsionOnlyHeight(h), h).toBe(true);
  });

  it("says torsion springs on the line whatever was picked", () => {
    const d = { widthFt: 10, widthIn: 0, heightFt: 9, heightIn: 0 };
    const q = quoteResidential("T50S", d, opts({ spring: "extension" }));
    expect(q.description).toContain("torsion springs");
    expect(q.description).not.toContain("extension springs");
  });
});

describe("residential colour lists", () => {
  it("offers no Ultra-Grain on the 9130/9133 or the Gallery pair", () => {
    // Special order only — Brandon, 10/9/2026. They stay available on the
    // special order tab, which reads a different list.
    for (const key of ["9130-9133", "GD1LP-GD1SP"]) {
      for (const c of COLORS[key]) {
        expect(c, `${key}: ${c}`).not.toContain("Ultra-Grain");
      }
    }
  });

  it("leaves every other list alone", () => {
    expect(COLORS["4050-4051-4053"]).toContain("Bronze");
    expect(COLORS["T50S"]).toContain("Almond");
  });
});

describe("9ft tiers added 10/9/2026", () => {
  it("prices the 4050 at 7'0\" and 7'6\" wide, 9'0\" tall", () => {
    // Those two widths carried no 9-ft tier before the stock sheet.
    for (const w of [[7, 0], [7, 6]] as const) {
      const r = priceResidential("4050", { widthFt: w[0], widthIn: w[1], heightFt: 9, heightIn: 0 }, "solid");
      expect(r.source, `${w[0]}'${w[1]}"`).toBe("stock");
      expect(r.price, `${w[0]}'${w[1]}"`).toBe(1372.35);
    }
  });

  it("prices the Gallery at every stock width, 9'0\" tall", () => {
    for (const [w, expected] of [[8, 1317.26], [9, 1420.47]] as const) {
      const r = priceResidential("GD1LP", { widthFt: w, widthIn: 0, heightFt: 9, heightIn: 0 }, "solid");
      expect(r.source, `${w}'`).toBe("stock");
      expect(r.price, `${w}'`).toBe(expected);
    }
  });

  it("carries T52S section prices", () => {
    // These were missing entirely; the sheet supplies all twelve.
    expect(RES_SECTIONS["T52S"]["8"].bottom).toBe(241.43);
    expect(RES_SECTIONS["T52S"]["8"].inter).toBe(210.49);
    expect(RES_SECTIONS["T52S"]["8"].glazed).toBe(360.35);
  });
});

describe("stocked colours narrow with the size", () => {
  it("gives a 7'0\" 4050 White and nothing else", () => {
    // Only White carries the 7'0" width. Offering the other four would put a
    // door on a quote that cannot be ordered at that size.
    expect(stockedColors("4050", "7", "7")).toEqual(["White"]);
    expect(stockedColors("4050", "8", "7")).toEqual(
      ["White", "Almond", "Chocolate Brown", "Sandtone", "Black"],
    );
  });

  it("narrows on height too", () => {
    // Nothing but White goes above 8'0" tall on any model.
    expect(stockedColors("4050", "8", "9")).toEqual(["White"]);
    expect(stockedColors("T50S", "9", "10")).toEqual(["White"]);
  });

  it("drops Black where it is not floored", () => {
    // Black runs 8', 9' and 16' only.
    for (const w of ["8", "9", "16"]) expect(stockedColors("4050", w, "7"), w).toContain("Black");
    for (const w of ["7", "7.6", "10", "12", "14", "15", "18"]) {
      expect(stockedColors("4050", w, "7"), w).not.toContain("Black");
    }
  });

  it("returns the whole floored list when no size is given", () => {
    expect(stockedColors("4050")).toHaveLength(5);
    expect(stockedColors("4051")).toEqual(["White", "Black"]);
  });

  it("offers only White on the models floored in one colour", () => {
    for (const m of ["9130", "9133", "T50S", "T52S", "GD1LP", "GD1SP"]) {
      expect(stockedColors(m), m).toEqual(["White"]);
    }
  });

  it("never offers a colour the engine would call special order", () => {
    // The list and the in-stock check have to agree, or the badge contradicts
    // the dropdown that produced it.
    for (const m of Object.keys(STOCK_MATRIX)) {
      for (const w of stockedWidths(m)) {
        for (const c of stockedColors(m, w, "7")) {
          expect(colorInStock(m, c, w, "7"), `${m} ${c} ${w}`).toBe(true);
        }
      }
    }
  });
});
