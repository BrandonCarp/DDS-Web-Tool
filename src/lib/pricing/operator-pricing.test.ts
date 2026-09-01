import { describe, it, expect } from "vitest";
import { ALL_OPERATORS } from "./data/operator-catalogue";
import { OPERATOR_PRICES } from "./data/operator-prices";
import { MANUAL_OPERATOR_PRICES } from "./data/operator-prices-manual";
import { SHEET_OPERATOR_PRICES } from "./data/operator-sheet-prices";
import { SUPPRESSED_OPERATORS } from "./data/operators-manual";
import { isManualPrice, operatorPrice, pricedCount, priceKey } from "./data/operator-pricing";

const SUPPRESSED = new Set(SUPPRESSED_OPERATORS.map((s) => priceKey(s.desc)));

const ALL = ALL_OPERATORS;

describe("operator prices join to the catalogue", () => {
  it("matches every parsed estimate row to a catalogue item", () => {
    // The two files come from different source documents and are generated
    // separately. If the OPERATORS sheet is re-exported with different wording,
    // rows stop matching and the tab quietly goes back to "price not set" —
    // this is the test that says so instead.
    // A suppressed item is an allowed orphan: the estimate really did carry
    // that row, and operator-prices.ts records what the estimates said rather
    // than what DDS currently offers. Everything else must still join.
    const keys = new Set(ALL.map((o) => priceKey(o.desc)));
    const hidden = new Set(SUPPRESSED_OPERATORS.map((s) => priceKey(s.desc)));
    const orphans = Object.keys(OPERATOR_PRICES).filter(
      (k) => !keys.has(k) && !hidden.has(k),
    );
    expect(orphans).toEqual([]);
  });

  it("prices the 52 rows read off the four estimates", () => {
    expect(Object.keys(OPERATOR_PRICES).length).toBe(52);
  });

  it("adds the hand-entered rows and the price sheet on top", () => {
    // 149 of 166 — ATSWT 7FT is suppressed, see operators-manual.ts. The LiftMaster sheets carry both a RES and a COMM tab, and
    // the commercial tab is what filled in LOGIC 5, MAXUM and the sprockets —
    // sections that had no price at all when the estimates were the only
    // source. What is left unpriced is listed by the generator on every run.
    expect(pricedCount()).toEqual({ priced: 149, total: ALL.length });
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
    // Five standalone G37xxCH rails, five hand-added 4690L rows, and the four
    // ATSWT lengths the commercial tab priced.
    const beams = Object.keys(SHEET_OPERATOR_PRICES).filter((k) => k.includes("BEAM"));
    expect(beams.length).toBe(14);
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

describe("the commercial tab's trickier joins", () => {
  it("prices only the STANDARD trolley, never the mislabelled EXTENDED row", () => {
    // The catalogue carries TDC12S1BMC twice per length — once STANDARD / 20
    // CYCLES, once EXTENDED / 30 CYCLES. The second is wrong: the sheet sells
    // the extended unit as TDC12X1BMC at its own price, and the jackshaft pair
    // (JHDC12S1BMC STANDARD, JHDC12X1BMC EXTENDED) establishes that S means
    // standard. Until NEW_PARTS_LIST.xlsx is corrected, the EXTENDED rows must
    // stay unpriced rather than inherit the standard unit's number — they are
    // about $490 apart.
    // The mislabelled rows are gone from the merged catalogue entirely —
    // operators-manual.ts supersedes them — so there is no TDC12S1BMC that
    // claims to be extended.
    const mislabelled = ALL.filter(
      (o) => o.desc.includes("TDC12S1BMC") && o.desc.includes("EXTENDED"),
    );
    expect(mislabelled).toEqual([]);
    const extended = ALL.filter((o) => o.desc.includes("TDC12X1BMC"));
    expect(extended.length).toBe(5);
    for (const o of extended) {
      expect(operatorPrice(o), o.desc).toBeGreaterThan(1000);
    }
    const standard = ALL.filter(
      (o) => o.desc.includes("TDC12S1BMC") && o.desc.includes("STANDARD"),
    );
    expect(standard.length).toBe(5);
    for (const o of standard) {
      expect(operatorPrice(o), o.desc).toBeGreaterThan(0);
    }
  });

  it("prices both sprocket bores the same, which is what makes the join safe", () => {
    // The sheet keys sprockets by part number (71-1550B60LGH) and the
    // catalogue by bore and chain size (1'' SPROCKET, 50B60). The generator
    // maps L to 1'' and Q to 1-1/4''. That mapping is an inference, and it is
    // harmless only for as long as the two bores carry the same price. If a
    // future sheet prices them apart, this fails and the mapping needs
    // confirming against LiftMaster before the next regenerate.
    const sprockets = Object.entries(SHEET_OPERATOR_PRICES).filter(([k]) =>
      k.includes("SPROCKET"),
    );
    expect(sprockets.length).toBeGreaterThan(0);
    const bySize = new Map<string, Set<number>>();
    for (const [key, price] of sprockets) {
      const size = key.match(/50B\d+/)?.[0] ?? key;
      if (!bySize.has(size)) bySize.set(size, new Set());
      bySize.get(size)!.add(price);
    }
    for (const [size, prices] of bySize) {
      expect([...prices], `${size} bores priced apart`).toHaveLength(1);
    }
  });
});

describe("suppressed items", () => {
  it("are gone from the catalogue entirely", () => {
    for (const { desc } of SUPPRESSED_OPERATORS) {
      const found = ALL.find((o) => priceKey(o.desc) === priceKey(desc));
      expect(found, `${desc} is still in the catalogue`).toBeUndefined();
    }
  });

  it("say why, so the next person is not left guessing", () => {
    for (const s of SUPPRESSED_OPERATORS) {
      expect(s.reason.length, s.desc).toBeGreaterThan(20);
    }
  });

  it("flags one a price sheet has since covered", () => {
    // ATSWT 7FT is hidden because the 8-31 sheet stops at 8FT and its old
    // estimate price had drifted $150 below the 8FT. If a later sheet carries
    // the missing length, this fails — the reason for hiding it is gone and
    // the item should come back.
    const covered = SUPPRESSED_OPERATORS.filter(
      (s) => priceKey(s.desc) in SHEET_OPERATOR_PRICES,
    );
    expect(
      covered.map((s) => s.desc),
      "now on a price sheet — remove from SUPPRESSED_OPERATORS",
    ).toEqual([]);
  });
});
