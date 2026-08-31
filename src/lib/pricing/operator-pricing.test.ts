import { describe, it, expect } from "vitest";
import { ALL_OPERATORS } from "./data/operator-catalogue";
import { OPERATOR_PRICES } from "./data/operator-prices";
import { MANUAL_OPERATOR_PRICES } from "./data/operator-prices-manual";
import { SHEET_OPERATOR_PRICES } from "./data/operator-sheet-prices";
import { isManualPrice, operatorPrice, pricedCount, priceKey } from "./data/operator-pricing";

const ALL = ALL_OPERATORS;

describe("operator prices join to the catalogue", () => {
  it("matches every parsed estimate row to a catalogue item", () => {
    // The two files come from different source documents and are generated
    // separately. If the OPERATORS sheet is re-exported with different wording,
    // rows stop matching and the tab quietly goes back to "price not set" —
    // this is the test that says so instead.
    const keys = new Set(ALL.map((o) => priceKey(o.desc)));
    const orphans = Object.keys(OPERATOR_PRICES).filter((k) => !keys.has(k));
    expect(orphans).toEqual([]);
  });

  it("prices the 52 rows read off the four estimates", () => {
    expect(Object.keys(OPERATOR_PRICES).length).toBe(52);
  });

  it("adds the hand-entered rows and the price sheet on top", () => {
    // 52 estimate rows + 3 hand-entered + the 16 the LiftMaster sheet priced
    // for the first time (five I-beam rails, two jackshafts, the 485LM battery
    // backup, and the eight hand-added 2240L/4690L rows). The sheet's other
    // rows overlap items already priced, so they change a number without
    // changing the count.
    expect(pricedCount()).toEqual({ priced: 71, total: ALL.length });
  });

  it("survives the double-space the OPERATORS sheet writes", () => {
    // "LIFTMASTER 880LM,  SMART CONTROL PANEL" in the sheet vs one space in
    // QuickBooks. This is the exact thing that made the first join return 2/52.
    const panel = ALL.find((o) => o.name === "880LM");
    expect(panel?.desc).toContain(",  ");
    expect(operatorPrice(panel!)).toBe(50.95);
  });

  it("returns null rather than zero for anything unpriced", () => {
    const unpriced = ALL.filter((o) => operatorPrice(o) == null);
    expect(unpriced.length).toBe(ALL.length - pricedCount().priced);
    for (const o of unpriced.slice(0, 5)) {
      expect(operatorPrice(o)).toBeNull();
      expect(operatorPrice(o)).not.toBe(0);
    }
  });

  it("carries no zero or negative price", () => {
    for (const [key, price] of Object.entries(OPERATOR_PRICES)) {
      expect(price, key).toBeGreaterThan(0);
    }
  });

  it("keeps rail-length variants priced apart", () => {
    // 2220L at 7/8/10FT are three different rows at three different rates;
    // a join that collapsed them would be silently wrong rather than empty.
    const rates = ["7FT", "8FT", "10FT"].map((ft) => {
      const item = ALL.find((o) => o.desc.includes("2220L") && o.desc.includes(`${ft} CHAIN`));
      return operatorPrice(item!);
    });
    // Sheet values as of NEW_LM_PRICING_8-31-2026; the estimates had these at
    // 315.95 / 349.95 / 380.95 before the sheet superseded them.
    expect(rates).toEqual([310.95, 350.95, 390.95]);
  });
});

describe("descriptions parsed off the estimates are clean", () => {
  it("has no footer boilerplate glued onto a description", () => {
    // Page footers sit in the description column with no figures beside them,
    // so they look exactly like a wrapped line. The subtotal check does NOT
    // catch this, because the rates stay correct while the text is ruined.
    for (const key of Object.keys(OPERATOR_PRICES)) {
      expect(key, key).not.toContain("APPROVAL");
      expect(key, key).not.toContain("SIGNATURE");
      expect(key, key).not.toContain("TERMS AND CONDITIONS");
      expect(key, key).not.toMatch(/PAGE \d/);
    }
  });

  it("keeps every description a plausible single line item", () => {
    for (const key of Object.keys(OPERATOR_PRICES)) {
      expect(key.startsWith("LIFTMASTER"), key).toBe(true);
      expect(key.length, key).toBeLessThan(70);
    }
  });
});

describe("hand-entered prices", () => {
  it("matches a real catalogue item", () => {
    const keys = new Set(ALL.map((o) => priceKey(o.desc)));
    for (const key of Object.keys(MANUAL_OPERATOR_PRICES)) {
      expect(keys.has(key), `${key} is not in the operator catalogue`).toBe(true);
    }
  });

  it("is already normalised, so the join cannot miss it", () => {
    for (const key of Object.keys(MANUAL_OPERATOR_PRICES)) {
      expect(priceKey(key)).toBe(key);
    }
  });

  it("names a source for every entry", () => {
    for (const [key, entry] of Object.entries(MANUAL_OPERATOR_PRICES)) {
      expect(entry.source.length, key).toBeGreaterThan(10);
      expect(entry.price, key).toBeGreaterThan(0);
    }
  });

  it("holds nothing an estimate has since covered", () => {
    // When gen_operator_prices.py picks one of these up off a real estimate,
    // this fails — delete the entry from operator-prices-manual.ts.
    const superseded = Object.keys(MANUAL_OPERATOR_PRICES).filter(
      (k) => k in OPERATOR_PRICES || k in SHEET_OPERATOR_PRICES,
    );
    expect(superseded, "now on a source document — remove from the manual file").toEqual([]);
  });

  it("prices the 2420L chain drives at 7, 8 and 10 feet", () => {
    const rates = ["7FT", "8FT", "10FT"].map((ft) => {
      const item = ALL.find((o) => o.desc.includes("2420L") && o.desc.includes(`${ft} CHAIN`));
      return [operatorPrice(item!), isManualPrice(item!)];
    });
    expect(rates).toEqual([
      [375.95, true],
      [410.95, true],
      [445.95, true],
    ]);
  });
});

describe("the LiftMaster price sheet", () => {
  it("matches every sheet row to a catalogue item", () => {
    // The generator refuses to write an unmatched row, so a failure here means
    // the catalogue was regenerated with different wording after the fact and
    // those items have quietly reverted to "price not set".
    const keys = new Set(ALL.map((o) => priceKey(o.desc)));
    const orphans = Object.keys(SHEET_OPERATOR_PRICES).filter((k) => !keys.has(k));
    expect(orphans).toEqual([]);
  });

  it("is already normalised, so the join cannot miss it", () => {
    // Guards the specific bug this file was written with: the generator folds
    // hyphens when it compares "I BEAM" against "I-BEAM", and folding a stored
    // key would silently unprice every I-beam rail.
    for (const key of Object.keys(SHEET_OPERATOR_PRICES)) {
      expect(priceKey(key)).toBe(key);
    }
  });

  it("keeps the hyphen in the I-beam rails", () => {
    // Five standalone G37xxCH rails plus the five hand-added 4690L rows.
    const beams = Object.keys(SHEET_OPERATOR_PRICES).filter((k) => k.includes("BEAM"));
    expect(beams.length).toBe(10);
    for (const key of beams) expect(key).toContain("I-BEAM");
  });

  it("outranks the estimate for anything on both", () => {
    const both = Object.keys(SHEET_OPERATOR_PRICES).filter((k) => k in OPERATOR_PRICES);
    expect(both.length).toBeGreaterThan(0);
    for (const key of both) {
      const item = ALL.find((o) => priceKey(o.desc) === key);
      expect(operatorPrice(item!), key).toBe(SHEET_OPERATOR_PRICES[key]);
    }
  });

  it("carries no zero or negative price", () => {
    for (const [key, price] of Object.entries(SHEET_OPERATOR_PRICES)) {
      expect(price, key).toBeGreaterThan(0);
    }
  });
});
