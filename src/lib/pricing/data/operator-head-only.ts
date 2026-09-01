// HEAD ONLY operators — the drive head sold without a rail.
//
// DERIVED, not stored. Every price here is the model's SMALLEST rail price
// minus a fixed deduction, so when a new LiftMaster sheet moves the 7FT 6580L
// the head-only 6580L moves with it on the same regenerate. Writing these into
// a data file would freeze them, and a head-only price that silently lags its
// own rail price is exactly the kind of stale number that gets quoted.
//
// The rule, from Brandon:
//   price   = smallest rail length's price, minus the deduction
//   deduct  = $10 residential, $25 commercial
//   wording = "LIFTMASTER ELECTRIC OPERATOR MODEL 6580L,  HEAD ONLY"
//             — the rail length comes out, nothing replaces it
//
// Worked example: 6580L is floored at 7/8/10FT, and the 7FT sells for 385.95,
// so HEAD ONLY is 375.95.
//
// Only models that HAVE a rail get a head-only row. A jackshaft or a Logic 5
// wall mount (98022, GH101L5, MH5011U) is already a head with no rail to
// remove, so giving it a "HEAD ONLY" twin would put the same product in the
// list twice at two different prices.

import { priceKey } from "./price-key";
import type { Operator, OperatorSection } from "./operators";
import { OPERATOR_PRICES } from "./operator-prices";
import { SHEET_OPERATOR_PRICES } from "./operator-sheet-prices";
import { MANUAL_OPERATOR_PRICES } from "./operator-prices-manual";

/** Deduction off the smallest rail price, by section. */
export const HEAD_ONLY_DEDUCTION = { residential: 10, commercial: 25 } as const;

/**
 * Sections whose operators are priced as residential.
 *
 * Membership decides the deduction, so this is a pricing decision rather than a
 * naming one. ATSWT and the 87802 sit in RESIDENTIAL CHAIN DRIVES despite being
 * heavier units, and they take the $10 because that is the shelf they are sold
 * off.
 */
const RESIDENTIAL_SECTIONS = new Set([
  "RESIDENTIAL CHAIN DRIVES",
  "RESIDENTIAL BELT DRIVES",
  "RESIDENTIAL SIDEMOUNT",
]);

const RAIL_LENGTH = /(\d+)\s*FT/;
const MODEL_PREFIX = "LIFTMASTER ELECTRIC OPERATOR MODEL ";

/** Base price lookup, mirroring operatorPrice()'s precedence exactly. */
function basePrice(desc: string): number | null {
  const key = priceKey(desc);
  const sheet = SHEET_OPERATOR_PRICES[key];
  if (typeof sheet === "number") return sheet;
  const generated = OPERATOR_PRICES[key];
  if (typeof generated === "number") return generated;
  const manual = MANUAL_OPERATOR_PRICES[key];
  return manual ? manual.price : null;
}

/** Model number out of a full description, or null when it is not an operator. */
function modelOf(desc: string): string | null {
  if (!desc.startsWith(MODEL_PREFIX)) return null;
  const rest = desc.slice(MODEL_PREFIX.length);
  const model = rest.split(",")[0].trim();
  return model.length > 0 ? model : null;
}

export interface HeadOnlyDerivation {
  /** Section name -> the head-only rows to append to it. */
  items: Map<string, Operator[]>;
  /** Join key -> derived price, for operatorPrice() to consult. */
  prices: Record<string, number>;
  /** Models that have rails but no price on the smallest one. */
  skipped: string[];
}

/**
 * Work out the head-only rows for a set of catalogue sections.
 *
 * Takes the sections rather than importing the catalogue, so that
 * operator-catalogue.ts can call this while building itself without the two
 * modules importing each other.
 */
export function deriveHeadOnly(sections: OperatorSection[]): HeadOnlyDerivation {
  const items = new Map<string, Operator[]>();
  const prices: Record<string, number> = {};
  const skipped: string[] = [];

  for (const section of sections) {
    if (section.group !== "Operators") continue;
    const deduction = RESIDENTIAL_SECTIONS.has(section.name)
      ? HEAD_ONLY_DEDUCTION.residential
      : HEAD_ONLY_DEDUCTION.commercial;

    // model -> its rail rows, so the smallest can be picked per model
    const byModel = new Map<string, { ft: number; desc: string }[]>();
    for (const item of section.items) {
      const model = modelOf(item.desc);
      const ft = item.desc.match(RAIL_LENGTH);
      if (!model || !ft) continue; // no rail: already a head
      if (!byModel.has(model)) byModel.set(model, []);
      byModel.get(model)!.push({ ft: Number(ft[1]), desc: item.desc });
    }

    const rows: Operator[] = [];
    for (const [model, variants] of byModel) {
      const smallest = variants.reduce((a, b) => (b.ft < a.ft ? b : a));
      const base = basePrice(smallest.desc);
      // No price on the shortest rail means no basis to deduct from. Skipping
      // leaves the model reading "price not set", which is honest; inventing a
      // number off a longer rail would quietly overcharge.
      if (base == null) {
        skipped.push(model);
        continue;
      }
      const desc = `${MODEL_PREFIX}${model},  HEAD ONLY`;
      // The list column shows `name`, and rail rows put the length there
      // ("2220L, 7FT"). A bare model would read as if the rail were simply
      // missing, so HEAD ONLY sits in the same slot.
      rows.push({ name: `${model}, HEAD ONLY`, desc });
      prices[priceKey(desc)] = Number((base - deduction).toFixed(2));
    }
    if (rows.length > 0) items.set(section.name, rows);
  }

  return { items, prices, skipped };
}
