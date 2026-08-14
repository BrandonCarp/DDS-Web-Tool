import { describe, it, expect } from "vitest";
import { OPERATOR_SECTIONS } from "./data/operators";
import { OPERATOR_PRICES } from "./data/operator-prices";
<<<<<<< ours
import { operatorPrice, pricedCount, priceKey } from "./data/operator-pricing";
=======
import { MANUAL_OPERATOR_PRICES } from "./data/operator-prices-manual";
import { isManualPrice, operatorPrice, pricedCount, priceKey } from "./data/operator-pricing";
>>>>>>> theirs

const ALL = OPERATOR_SECTIONS.flatMap((s) => s.items);

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
<<<<<<< ours
    expect(pricedCount()).toEqual({ priced: 52, total: ALL.length });
=======
  });

  it("adds the hand-entered rows on top", () => {
    const manual = Object.keys(MANUAL_OPERATOR_PRICES).length;
    expect(pricedCount()).toEqual({ priced: 52 + manual, total: ALL.length });
>>>>>>> theirs
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
<<<<<<< ours
    expect(unpriced.length).toBe(ALL.length - 52);
=======
    expect(unpriced.length).toBe(ALL.length - pricedCount().priced);
>>>>>>> theirs
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
    expect(rates).toEqual([315.95, 349.95, 380.95]);
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
<<<<<<< ours
=======

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
    const superseded = Object.keys(MANUAL_OPERATOR_PRICES).filter((k) => k in OPERATOR_PRICES);
    expect(superseded, "now on an estimate — remove from the manual file").toEqual([]);
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
>>>>>>> theirs
