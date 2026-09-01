// Joins the operator catalogue to its prices.
//
// Three generated files, three different source documents: OPERATOR_SECTIONS
// comes from the OPERATORS sheet (descriptions, no rates), OPERATOR_PRICES from
// counter estimates run in QuickBooks, SHEET_OPERATOR_PRICES from the dated
// LiftMaster price sheet. None is hand-edited, so the join has to happen here.
//
// The sheet writes "LIFTMASTER 880LM,  SMART CONTROL PANEL" with two spaces
// after the comma and QuickBooks writes one. Same product, same words. Both
// sides collapse whitespace and upper-case before comparing — the identical
// rule lives in scripts/gen_operator_prices.py, and operator-pricing.test.ts
// fails if the two ever drift apart.

import { type Operator } from "./operators";
import { OPERATOR_CATALOGUE, HEAD_ONLY_PRICES } from "./operator-catalogue";
import { priceKey } from "./price-key";
import { OPERATOR_PRICES } from "./operator-prices";
import { SHEET_OPERATOR_PRICES } from "./operator-sheet-prices";
import { MANUAL_OPERATOR_PRICES } from "./operator-prices-manual";

export { priceKey };

/**
 * Counter sell price for an operator or accessory, or null when DDS has not
 * set one.
 *
 * Null is a real answer here, not a failure: only part of the catalogue has
 * been priced so far, and the tab has always said "price not set" rather than
 * inventing a number. Callers must handle null — never `?? 0`, which would
 * quote a free operator.
 */
export function operatorPrice(item: Operator): number | null {
  const key = priceKey(item.desc);
  // Precedence: vendor price sheet, then QuickBooks estimate, then hand-entered.
  //
  // The sheet outranks the estimates because it is dated and they are not. A
  // LiftMaster sheet states what the price IS from the day it is issued; an
  // estimate records what was charged on some earlier job, and nothing in
  // operator-prices.ts says when. When the two disagree the sheet is the newer
  // fact, so it wins — which is also why every sheet row that overlaps an
  // estimate row is a price CHANGE rather than a conflict.
  //
  // This ordering is the whole of the decision. Swap the first two lookups to
  // reverse it.
  // Head-only rows carry no row in any price file — their number is derived
  // from the shortest rail. See operator-head-only.ts.
  const headOnly = HEAD_ONLY_PRICES[key];
  if (typeof headOnly === "number") return headOnly;
  const sheet = SHEET_OPERATOR_PRICES[key];
  if (typeof sheet === "number") return sheet;
  const generated = OPERATOR_PRICES[key];
  if (typeof generated === "number") return generated;
  const manual = MANUAL_OPERATOR_PRICES[key];
  return manual ? manual.price : null;
}

/** True when the price shown came from a person rather than a source document. */
export function isManualPrice(item: Operator): boolean {
  const key = priceKey(item.desc);
  return (
    !(key in SHEET_OPERATOR_PRICES) &&
    !(key in OPERATOR_PRICES) &&
    key in MANUAL_OPERATOR_PRICES
  );
}

/** How much of the catalogue currently carries a price. */
export function pricedCount(): { priced: number; total: number } {
  let priced = 0;
  let total = 0;
  for (const section of OPERATOR_CATALOGUE) {
    for (const item of section.items) {
      total += 1;
      if (operatorPrice(item) != null) priced += 1;
    }
  }
  return { priced, total };
}
