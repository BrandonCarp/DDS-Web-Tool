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
    ["T50S", dim(12, 0, 9, 0), "solid", 1408.44, "stock"], // 9' tall exact width -> 9FT-book stock price
    ["T50S", dim(10, 0, 9, 0), "solid", 1087.78, "stock"],
    ["T50S", dim(12, 2, 9, 0), "solid", 1801.19, "standard"], // odd 9' width stays on the odd band
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
          const hf = Number(tier);
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

describe("4050-4051-4053 odd-size resolution (finer width groups)", () => {
  const price = (wf: number, wi: number, tier: number, style: "solid" | "glass" | "inserts" = "solid") =>
    priceResidential("4050-4051-4053", dim(wf, wi, tier, 0), style).price;

  it("splits 6' at 6'0-6'2 vs 6'4-6'10 (7' tall)", () => {
    expect(price(6, 0, 7)).toBeCloseTo(717.17, 2);
    expect(price(6, 2, 7)).toBeCloseTo(717.17, 2);
    expect(price(6, 4, 7)).toBeCloseTo(829.14, 2);
    expect(price(6, 6, 7)).toBeCloseTo(829.14, 2);
    expect(price(6, 10, 7)).toBeCloseTo(829.14, 2);
  });
  it("splits 15' at 15'2/4/10 vs 15'6/8", () => {
    expect(price(15, 2, 7)).toBeCloseTo(1473.98, 2);
    expect(price(15, 6, 7)).toBeCloseTo(1276.37, 2);
    expect(price(15, 8, 7)).toBeCloseTo(1276.37, 2);
    expect(price(15, 10, 7)).toBeCloseTo(1473.98, 2);
  });
  it("splits 16' at 16'0-2 vs 16'4-10 (7' tall)", () => {
    expect(price(16, 0, 7)).toBeCloseTo(1261.71, 2); // exact 16'0" is a stock size (V2 book)
    expect(price(16, 2, 7)).toBeCloseTo(1284.21, 2); // odd widths stay on the odd band
    expect(price(16, 4, 7)).toBeCloseTo(1710.42, 2);
    expect(price(16, 10, 7)).toBeCloseTo(1710.42, 2);
  });
  it("prices glass and inserts too (odd 10' band x 9')", () => {
    expect(price(10, 0, 9, "glass")).toBeCloseTo(1677.24, 2); // exact 10'0" x 9' -> 9FT-book stock price
    expect(price(10, 2, 9, "glass")).toBeCloseTo(2242.35, 2); // odd widths keep the odd band
    expect(price(10, 2, 9, "inserts")).toBeCloseTo(2343.84, 2);
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

describe("2026 workbook authority (V2 stock + strict 9FT book)", () => {
  it("grouped models get stock prices at exact stock sizes (V2 book)", () => {
    expect(priceResidential("4050", dim(8, 0, 7, 0), "solid")).toMatchObject({ price: 710.65, source: "stock" });
    expect(priceResidential("4051", dim(8, 0, 8, 0), "solid")).toMatchObject({ price: 852.78, source: "stock" });
    expect(priceResidential("9130", dim(9, 0, 7, 0), "glass")).toMatchObject({ price: 1109.48, source: "stock" });
    expect(priceResidential("GD1SP", dim(16, 0, 8, 0), "inserts")).toMatchObject({ price: 2347.17, source: "stock" });
    expect(priceResidential("4300", dim(9, 0, 8, 0), "solid")).toMatchObject({ price: 1065.28, source: "stock" });
  });
  it("odd widths on grouped models stay on the standard band", () => {
    expect(priceResidential("4050", dim(8, 4, 7, 0), "solid")).toMatchObject({ price: 895.4, source: "standard" });
    expect(priceResidential("9133", dim(9, 4, 7, 0), "solid").source).toBe("standard");
  });
  it("9-ft-high exact sizes use the strict 9FT-book prices", () => {
    expect(priceResidential("4050", dim(12, 0, 9, 0), "solid")).toMatchObject({ price: 1756.51, source: "stock" });
    expect(priceResidential("9130", dim(12, 0, 9, 0), "solid")).toMatchObject({ price: 2064.75, source: "stock" });
    expect(priceResidential("T52S", dim(18, 0, 9, 0), "inserts")).toMatchObject({ price: 2694.66, source: "stock" });
    expect(priceResidential("4300", dim(8, 0, 9, 0), "solid")).toMatchObject({ price: 1311.74, source: "stock" });
  });
  it("Gallery has no 9-ft prices at all (not stocked or priced 9' tall)", () => {
    expect(priceResidential("GD1LP", dim(8, 0, 9, 0), "solid").source).toBe("none");
  });
});

describe("window designs (inserts catalog from index.html)", () => {
  const opts = { style: "inserts" as const, color: "White", track: "r12" as const, spring: "extension" as const, lock: "none" as const };
  it("adds the design name to the description when valid for the door", () => {
    const q = quoteResidential("T50S", dim(8, 0, 7, 0), { ...opts, windesign: "509" });
    expect(q.description).toContain("Colonial 509 inserts");
    expect(q.description).toContain("windows in the top section");
    expect(q.description).toContain(`x 7'0", in the color White,`); // color sits right after the size
  });
  it("ignores designs the model cannot take (long panels on a short-only door)", () => {
    const q = quoteResidential("T50S", dim(8, 0, 7, 0), { ...opts, windesign: "612" });
    expect(q.description).not.toContain("Stockton");
  });
  it("ignores width-restricted sunsets on the wrong width", () => {
    const q = quoteResidential("T50S", dim(8, 0, 7, 0), { ...opts, windesign: "504" }); // 504 is 14/15/15.6 only
    expect(q.description).not.toContain("Sunset 504");
    const q2 = quoteResidential("T50S", dim(15, 0, 7, 0), { ...opts, windesign: "504" });
    expect(q2.description).toContain("Sunset 504 inserts");
  });
  it("Gallery doors get architectural designs even with plain glass", () => {
    const q = quoteResidential("GD1LP", dim(8, 0, 7, 0), { ...opts, style: "glass", windesign: "SQ24" });
    expect(q.description).toContain("SQ24 inserts");
  });
});

describe("4300 family (4301/4310 share 4300 pricing; 7/5/2026 odd-size sheets)", () => {
  const o = { style: "solid" as const, color: "White", track: "r12" as const, spring: "extension" as const, lock: "none" as const };
  it("4301 and 4310 appear as their own selections and price identically to 4300", () => {
    const models = listModels();
    for (const m of ["4300", "4301", "4310"]) expect(models).toContain(m);
    const a = quoteResidential("4300", dim(8, 4, 7, 0), o);
    const b = quoteResidential("4301", dim(8, 4, 7, 0), o);
    const c = quoteResidential("4310", dim(8, 4, 7, 0), o);
    expect(a.unitPrice).toBeCloseTo(1023.63, 2); // new 7' odd band
    expect(b.unitPrice).toBeCloseTo(a.unitPrice, 2);
    expect(c.unitPrice).toBeCloseTo(a.unitPrice, 2);
    expect(c.description).toContain("Model 4310");
  });
  it("prices the new 7-ft odd bands (incl. the 15'6/15'8 split)", () => {
    expect(priceResidential("4300", dim(6, 2, 7, 0), "solid").price).toBeCloseTo(818.96, 2);
    expect(priceResidential("4300", dim(15, 6, 7, 0), "solid").price).toBeCloseTo(1452.59, 2);
    expect(priceResidential("4300", dim(15, 4, 7, 0), "solid").price).toBeCloseTo(1676.07, 2);
    expect(priceResidential("4300", dim(19, 10, 7, 0), "inserts").price).toBeCloseTo(2803.36, 2);
  });
  it("prices the new 9-ft odd bands and keeps stock overrides at exact stock sizes", () => {
    expect(priceResidential("4301", dim(9, 4, 9, 0), "glass").price).toBeCloseTo(1922.13, 2);
    expect(priceResidential("4300", dim(8, 0, 7, 0), "solid")).toMatchObject({ price: 823.71, source: "stock" });
    expect(priceResidential("4301", dim(12, 0, 9, 0), "solid")).toMatchObject({ price: 1873.54, source: "stock" });
  });
  it("corrects the 12-ft x 9-ft inserts sheet typo (was listed below glass)", () => {
    expect(priceResidential("4300", dim(12, 4, 9, 0), "inserts").price).toBeCloseTo(2716.7, 2);
  });
});

describe("GD1LP/GD1SP odd-size grids (Est 42768/42827/42828, 7/2026)", () => {
  const cases: [ReturnType<typeof dim>, WindowStyle, number][] = [
    // tier 7 (heights 6'0–7'0)
    [dim(6, 2, 6, 0), "solid", 764.05],
    [dim(6, 2, 7, 0), "inserts", 1042.35],
    [dim(6, 6, 6, 3), "glass", 1101.96], // 6'4–6'10 band interior
    [dim(7, 0, 7, 0), "solid", 883.32], // 7'0 flat shares the 7'0–7'6 band
    [dim(11, 6, 6, 9), "glass", 1698.32], // the 116'' sheet typo width
    [dim(15, 4, 7, 0), "solid", 1567.11], // 15' split: 15'2/15'4/15'10...
    [dim(15, 8, 7, 0), "solid", 1357.74], // ...vs cheaper 15'6/15'8
    [dim(17, 10, 7, 0), "inserts", 2644.51],
    // tier 8 (heights 7'6–8'0)
    [dim(6, 2, 7, 6), "solid", 921.74],
    [dim(10, 8, 8, 0), "glass", 1991.18],
    [dim(17, 10, 8, 0), "inserts", 3059.32],
    // tier 9 (heights 8'3–9'0)
    [dim(6, 2, 8, 3), "solid", 1295.46],
    [dim(12, 10, 9, 0), "glass", 2925.46],
    [dim(15, 6, 9, 0), "inserts", 3138.82],
    [dim(17, 10, 9, 0), "inserts", 4065.12],
  ];
  for (const [d, style, want] of cases) {
    it(`prices ${d.widthFt}'${d.widthIn}\" x ${d.heightFt}'${d.heightIn}\" ${style} at ${want} (both models)`, () => {
      for (const model of ["GD1LP", "GD1SP"]) {
        const r = priceResidential(model, d, style);
        expect(r.priced).toBe(true);
        expect(r.source).toBe("standard");
        expect(r.price).toBe(want);
      }
    });
  }
  it("stock override still wins at exact stock sizes (8x7)", () => {
    expect(priceResidential("GD1LP", dim(8, 0, 7, 0), "solid").source).toBe("stock");
  });
});
