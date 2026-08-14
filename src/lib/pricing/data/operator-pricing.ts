// Joins the operator catalogue to the prices parsed off QuickBooks estimates.
//
// Two generated files, two different source documents: OPERATOR_SECTIONS comes
// from the OPERATORS sheet (descriptions, no rates), OPERATOR_PRICES comes from
// counter estimates run in QuickBooks. Neither is hand-edited, so the join has
// to happen here.
//
// The sheet writes "LIFTMASTER 880LM,  SMART CONTROL PANEL" with two spaces
// after the comma and QuickBooks writes one. Same product, same words. Both
// sides collapse whitespace and upper-case before comparing — the identical
// rule lives in scripts/gen_operator_prices.py, and operator-pricing.test.ts
// fails if the two ever drift apart.

import { OPERATOR_SECTIONS, type Operator } from "./operators";
import { OPERATOR_PRICES } from "./operator-prices";
import { MANUAL_OPERATOR_PRICES } from "./operator-prices-manual";

/** Normalise a description into the shared join key. */
export function priceKey(desc: string): string {
  return desc.replace(/\s+/g, " ").trim().toUpperCase();
}

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
  // Estimate-derived beats hand-entered, always. A number read off a
  // QuickBooks estimate has a subtotal behind it; a number somebody typed does
  // not, and should stop being consulted the moment a real one exists.
  const generated = OPERATOR_PRICES[key];
  if (typeof generated === "number") return generated;
  const manual = MANUAL_OPERATOR_PRICES[key];
  return manual ? manual.price : null;
}

/** True when the price shown came from a person rather than an estimate. */
export function isManualPrice(item: Operator): boolean {
  const key = priceKey(item.desc);
  return !(key in OPERATOR_PRICES) && key in MANUAL_OPERATOR_PRICES;
}

/** How much of the catalogue currently carries a price. */
export function pricedCount(): { priced: number; total: number } {
  let priced = 0;
  let total = 0;
  for (const section of OPERATOR_SECTIONS) {
    for (const item of section.items) {
      total += 1;
      if (operatorPrice(item) != null) priced += 1;
    }
  }
  return { priced, total };
}
