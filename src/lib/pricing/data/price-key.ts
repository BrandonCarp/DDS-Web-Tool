// The description-to-join-key rule, on its own so that both the catalogue and
// the pricing layer can use it without importing each other.
//
// Every price file keys on the QuickBooks DESCRIPTION. The LiftMaster sheets
// write "LIFTMASTER 880LM,  SMART CONTROL PANEL" with two spaces after the
// comma and QuickBooks writes one — same product, same words. Collapsing
// whitespace and upper-casing makes them compare equal. The identical rule
// lives in scripts/gen_operator_prices_sheet.py, and operator-pricing.test.ts
// fails if the two drift apart.

/** Normalise a description into the shared join key. */
export function priceKey(desc: string): string {
  return desc.replace(/\s+/g, " ").trim().toUpperCase();
}
