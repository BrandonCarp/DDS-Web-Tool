// Hand-entered operator prices. NOT generated — this is the one price file in
// the repo that a person types into, and it exists so that data/operator-prices.ts
// can stay strictly machine-written.
//
// Everything here is waiting on a QuickBooks estimate. When one comes through
// with these rows on it, gen_operator_prices.py picks them up, the generated
// value wins, and operator-pricing.test.ts fails to tell you to delete the
// entry from this file. That failure is the point: entries here are temporary
// by design and should not quietly outlive their source.
//
// Keys use the same normalised form as the generated file — see priceKey in
// operator-pricing.ts. Counter sell prices, tax excluded.

export interface ManualPrice {
  price: number;
  /** Who supplied it and when, so a stale number has a name attached. */
  source: string;
}

export const MANUAL_OPERATOR_PRICES: Record<string, ManualPrice> = {
  "LIFTMASTER ELECTRIC OPERATOR MODEL 2420L, 7FT CHAIN RAIL": {
    price: 375.95,
    source: "Brandon, 2026-08-14 — pending a QuickBooks estimate",
  },
  "LIFTMASTER ELECTRIC OPERATOR MODEL 2420L, 8FT CHAIN RAIL": {
    price: 410.95,
    source: "Brandon, 2026-08-14 — pending a QuickBooks estimate",
  },
  "LIFTMASTER ELECTRIC OPERATOR MODEL 2420L, 10FT CHAIN RAIL": {
    price: 445.95,
    source: "Brandon, 2026-08-14 — pending a QuickBooks estimate",
  },
};
