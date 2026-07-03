import { describe, it, expect } from "vitest";
import { priceResidential, quoteResidential, resolveSizeCode, tierForHeight, listModels } from "./engine";
import { RESIDENTIAL_PRICES } from "./data/residential-prices";
import { STOCK_PRICES } from "./data/stock-prices";
import type { WindowStyle } from "./types";

const dim = (wf: number, wi: number, hf: number, hi: number) => ({
  widthFt: wf, widthIn: wi, heightFt: hf, heightIn: hi,
});

describe("tierForHeight", () => {
  it("maps heights to tiers at the 7' and 8' boundaries", () => {
    expect(tierForHeight(7 * 12)).toBe("7"); // 7'0"
    expect(tierForHeight(7 * 12 + 1)).toBe("8");
    expect(tierForHeight(8 * 12)).toBe("8"); // 8'0"
    expect(tierForHeight(8 * 12 + 1)).toBe("9");
  });
});

describe("resolveSizeCode", () => {
  it("collapses an in-between width to the nominal foot band", () => {
    expect(resolveSizeCode("T50S", dim(8, 4, 7, 0))?.code).toBe("8x7");
  });
  it("maps the 15'6\"/15'8\" half-foot group to the 15.6 band", () => {
    expect(resolveSizeCode("T50S", dim(15, 8, 7, 0))?.code).toBe("15.6x7");
  });
  it("returns null when a dimension is missing", () => {
    expect(resolveSizeCode("T50S", dim(NaN, 0, 7, 0))).toBeNull();
  });
});

describe("priceResidential — stock vs standard (the core rule)", () => {
  const cases: [string, ReturnType<typeof dim>, WindowStyle, number, "stock" | "standard"][] = [
    ["T50S", dim(8, 0, 7, 0), "solid", 560.37, "stock"],
    ["T50S", dim(8, 4, 7, 0), "solid", 696.96, "standard"], // in-between odd width
    ["T50S", dim(8, 6, 7, 0), "solid", 696.96, "standard"],
    ["T50S", dim(9, 0, 7, 0), "solid", 595.58, "stock"],
    ["T50S", dim(9, 0, 7, 0), "glass", 732.0, "stock"],
    ["T50S", dim(7, 6, 7, 0), "solid", 625.37, "stock"], // 7'6" is a stock width
    ["T50S", dim(7, 6, 8, 0), "inserts", 958.37, "stock"],
    ["T50S", dim(7, 8, 7, 0), "solid", 653.55, "standard"], // 7'8" stays on the odd band
    ["T50S", dim(7, 0, 7, 0), "solid", 653.55, "standard"], // 7'0" not stock
    ["T50S", dim(6, 0, 7, 0), "solid", 563.47, "standard"],
    ["T50S", dim(11, 0, 7, 0), "solid", 915.12, "standard"],
    ["T50S", dim(16, 0, 8, 0), "inserts", 1598.96, "stock"],
    ["T50S", dim(16, 0, 7, 0), "glass", 1255.7, "stock"],
    ["T50S", dim(12, 0, 9, 0), "solid", 1801.19, "standard"], // 9' tall -> no stock
    ["T50S", dim(10, 0, 9, 0), "solid", 1669.94, "standard"],
    ["T52S", dim(8, 0, 7, 0), "solid", 662.42, "stock"],
    ["T52S", dim(9, 0, 7, 0), "glass", 852.96, "stock"],
    ["T52S", dim(9, 4, 7, 0), "glass", 1084.98, "standard"],
    ["T52S", dim(16, 0, 8, 0), "inserts", 1789.35, "stock"],
    ["T52S", dim(12, 0, 7, 0), "solid", 1271.55, "standard"],
    ["T52S", dim(10, 0, 8, 0), "solid", 970.26, "stock"],
  ];
  it.each(cases)("%s %o %s -> $%d (%s)", (model, d, style, expected, source) => {
    const r = priceResidential(model, d, style);
    expect(r.price).toBeCloseTo(expected, 2);
    expect(r.source).toBe(source);
    expect(r.isStock).toBe(source === "stock");
  });
});

describe("data integrity", () => {
  it("every catalog price is a positive number", () => {
    for (const grid of Object.values(RESIDENTIAL_PRICES))
      for (const t of Object.values(grid))
        for (const v of [t.solid, t.glass, t.inserts]) expect(v).toBeGreaterThan(0);
  });

  it("the stock override is actually applied for every exact stock size", () => {
    for (const [model, widths] of Object.entries(STOCK_PRICES)) {
      for (const [w, tiers] of Object.entries(widths)) {
        for (const [tier, trip] of Object.entries(tiers)) {
          const hf = tier === "7" ? 7 : 8;
          const wf = w === "7.6" ? 7 : Number(w);
          const wi = w === "7.6" ? 6 : 0;
          const r = priceResidential(model, dim(wf, wi, hf, 0), "solid");
          expect(r.source).toBe("stock");
          expect(r.price).toBeCloseTo(trip.solid, 2);
        }
      }
    }
  });
});

describe("quoteResidential — full quote with add-on upcharges", () => {
  const opts = (o: Partial<Parameters<typeof quoteResidential>[2]> = {}) => ({
    style: "solid" as const, color: "White", track: "r12" as const,
    spring: "extension" as const, lock: "none" as const, ...o,
  });

  it("charges only the base door for a plain config", () => {
    const base = priceResidential("T50S", dim(9, 0, 7, 0), "solid").price!;
    const q = quoteResidential("T50S", dim(9, 0, 7, 0), opts());
    expect(q.unitPrice).toBeCloseTo(base, 2);
    expect(q.lines).toHaveLength(1);
  });

  it("adds torsion (+30), lockbar installed (+70) and 32in track (+225)", () => {
    const base = priceResidential("T50S", dim(9, 0, 7, 0), "solid").price!;
    const q = quoteResidential("T50S", dim(9, 0, 7, 0), opts({ track: "r32", spring: "torsion", lock: "lockbar_installed" }));
    expect(q.unitPrice).toBeCloseTo(base + 225 + 30 + 70, 2);
  });

  it("15in track and extension spring add nothing", () => {
    const base = priceResidential("T52S", dim(16, 0, 8, 0), "inserts").price!;
    const q = quoteResidential("T52S", dim(16, 0, 8, 0), opts({ style: "inserts", track: "r15" }));
    expect(q.unitPrice).toBeCloseTo(base, 2);
  });

  it("10in radius track adds nothing (included, like 12in/15in)", () => {
    const base = priceResidential("T50S", dim(8, 0, 7, 0), "solid").price!;
    const q = quoteResidential("T50S", dim(8, 0, 7, 0), opts({ track: "r10" }));
    expect(q.unitPrice).toBeCloseTo(base, 2);
    // no separate track line should be emitted for the no-charge radii
    expect(q.lines.some((l) => /radius track/.test(l.name))).toBe(false);
  });

  it("includes torsion at no charge on 9ft-tall doors", () => {
    const base = priceResidential("T50S", dim(12, 0, 9, 0), "solid").price!;
    const q = quoteResidential("T50S", dim(12, 0, 9, 0), opts());
    expect(q.unitPrice).toBeCloseTo(base, 2);
    expect(q.lines.some((l) => /included/i.test(l.name))).toBe(true);
  });

  it("applies the Ultra Grain single upcharge (+211.02) under 12ft", () => {
    const base = priceResidential("9130-9133", dim(9, 0, 7, 0), "solid").price!;
    const q = quoteResidential("9130-9133", dim(9, 0, 7, 0), opts({ color: "Ultra Grain" }));
    expect(q.unitPrice).toBeCloseTo(base + 211.02, 2);
  });
});

describe("4050-4051-4053 size resolution (matches index.html grid)", () => {
  const price = (wf: number, wi: number, tier: number, style: "solid" | "glass" | "inserts" = "solid") =>
    priceResidential("4050-4051-4053", dim(wf, wi, tier, 0), style).price;

  it("prices nominal widths straight from the catalog grid (7' tall)", () => {
    expect(price(8, 0, 7)).toBeCloseTo(710.65, 2);
    expect(price(9, 0, 7)).toBeCloseTo(765.5, 2);
    expect(price(10, 0, 7)).toBeCloseTo(864, 2);
  });
  it("gives 7'6\" its own half-foot price", () => {
    expect(price(7, 6, 7)).toBeCloseTo(775.65, 2);
    expect(price(7, 0, 7)).toBeCloseTo(775.65, 2);
  });
  it("rounds other half-foot widths down to the nominal foot", () => {
    // no 8.6 grid entry, so 8'6" resolves to the 8' price
    expect(price(8, 6, 7)).toBeCloseTo(710.65, 2);
  });
  it("prices glass and inserts too (10' x 9')", () => {
    expect(price(10, 0, 9, "glass")).toBeCloseTo(1677.24, 2);
    expect(price(10, 0, 9, "inserts")).toBeCloseTo(1778.73, 2);
  });
});

describe("model split (independent selection, shared pricing)", () => {
  const baseOpts = {
    style: "solid" as const, color: "White",
    track: "r12" as const, spring: "extension" as const, lock: "none" as const,
  };

  it("selector lists the split members, not the grouped keys", () => {
    const models = listModels();
    for (const m of ["4050", "4051", "4053", "9130", "9133", "GD1LP", "GD1SP"]) {
      expect(models).toContain(m);
    }
    expect(models).not.toContain("4050-4051-4053");
    expect(models).not.toContain("9130-9133");
    expect(models).not.toContain("GD1LP-GD1SP");
  });

  it("split members price identically and quote the specific model", () => {
    const a = quoteResidential("4050", dim(8, 0, 7, 0), baseOpts);
    const b = quoteResidential("4051", dim(8, 0, 7, 0), baseOpts);
    const c = quoteResidential("4053", dim(8, 0, 7, 0), baseOpts);
    expect(a.unitPrice).toBeGreaterThan(0);
    expect(b.unitPrice).toBeCloseTo(a.unitPrice, 2);
    expect(c.unitPrice).toBeCloseTo(a.unitPrice, 2);
    expect(b.description).toContain("Model 4051");
    expect(b.description).not.toContain("4050-4051-4053");
  });

  it("keeps the Gallery Collection prefix for split GD1LP/GD1SP", () => {
    const q = quoteResidential("GD1LP", dim(9, 0, 7, 0), baseOpts);
    expect(q.description).toContain("Gallery Collection");
    expect(q.description).toContain("Model GD1LP");
  });
});
