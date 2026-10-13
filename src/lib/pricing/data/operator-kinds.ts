/**
 * How the Operators tab sorts the operators — Brandon, 13/10/2026: Residential
 * or Commercial, then Belt / Chain / Side Mount, then (belt and chain) the
 * rail length, then the operator itself from a drop-down.
 *
 * Nothing is retyped: the use comes from the catalogue section (the
 * RESIDENTIAL sections are residential, the rest commercial), the kind and
 * the rail length from the description's rail clause — "7FT BELT RAIL",
 * "10FT CHAIN RAIL", "8FT I-BEAM RAIL", "12FT TROLLEY RAIL" — and a head-only
 * row takes its section's kind. An operator with no rail is a side mount
 * (jackshaft, hoist, wall mount).
 */
import { OPERATOR_CATALOGUE } from "./operator-catalogue";
import type { Operator } from "./operators";

export type OperatorUse = "Residential" | "Commercial";
export const OPERATOR_USES: readonly OperatorUse[] = ["Residential", "Commercial"];

export type OperatorKind = "belt" | "chain" | "sidemount";
export const OPERATOR_KINDS: readonly { id: OperatorKind; label: string }[] = [
  { id: "belt", label: "Belt Operators" },
  { id: "chain", label: "Chain Operators" },
  { id: "sidemount", label: "Side Mount Operators" },
];

/** The rail length of a belt or chain operator in feet, "head" for a head-only row, null for a side mount. */
export type RailLength = number | "head";

const RAIL = /(\d+)\s*FT\s+(BELT|CHAIN|I-BEAM|TROLLEY)\s+RAIL/i;
const HEAD_ONLY = /\bHEAD ONLY\b/i;
const PREFIX = /^LIFTMASTER (?:ELECTRIC OPERATOR MODEL )?/i;

export interface CatalogueOperator {
  item: Operator;
  section: string;
  use: OperatorUse;
  kind: OperatorKind;
  rail: RailLength | null;
}

/** Residential sections are the ones named so; everything else sells as commercial. */
export function operatorUse(section: string): OperatorUse {
  return /^RESIDENTIAL\b/i.test(section) ? "Residential" : "Commercial";
}

function kindOf(item: Operator, section: string): OperatorKind {
  const rail = RAIL.exec(item.desc);
  if (rail) return rail[2].toUpperCase() === "BELT" ? "belt" : "chain";
  if (HEAD_ONLY.test(item.desc)) return /\bBELT\b/i.test(section) ? "belt" : "chain";
  return "sidemount";
}

function railOf(item: Operator, kind: OperatorKind): RailLength | null {
  if (kind === "sidemount") return null;
  const rail = RAIL.exec(item.desc);
  if (rail) return Number(rail[1]);
  return HEAD_ONLY.test(item.desc) ? "head" : null;
}

/** Every operator in the Operators group, sorted. */
export const OPERATORS: CatalogueOperator[] = OPERATOR_CATALOGUE
  .filter((s) => s.group === "Operators")
  .flatMap((s) => s.items.map((item) => {
    const kind = kindOf(item, s.name);
    return { item, section: s.name, use: operatorUse(s.name), kind, rail: railOf(item, kind) };
  }));

/** The kinds a use has operators in, in order. */
export function kindsFor(use: OperatorUse): typeof OPERATOR_KINDS {
  return OPERATOR_KINDS.filter((k) => OPERATORS.some((o) => o.use === use && o.kind === k.id));
}

/** The rail lengths a belt or chain kind comes in, ascending, with "head" last where a head-only row exists. */
export function railLengthsFor(use: OperatorUse, kind: OperatorKind): RailLength[] {
  const have = OPERATORS.filter((o) => o.use === use && o.kind === kind);
  const feet = [...new Set(have.flatMap((o) => (typeof o.rail === "number" ? [o.rail] : [])))].sort((a, b) => a - b);
  return have.some((o) => o.rail === "head") ? [...feet, "head"] : feet;
}

export const railLabel = (rail: RailLength): string => (rail === "head" ? "Head only" : `${rail}FT`);

/** The operators to choose from: a kind's side mounts, or a belt or chain kind at a rail length. */
export function operatorsFor(use: OperatorUse, kind: OperatorKind, rail?: RailLength | null): CatalogueOperator[] {
  return OPERATORS.filter((o) => o.use === use && o.kind === kind && (kind === "sidemount" || o.rail === rail));
}

/** What the drop-down shows: the description less the brand and the rail already chosen. */
export function operatorLabel(o: CatalogueOperator): string {
  let s = o.item.desc.replace(PREFIX, "");
  if (typeof o.rail === "number") s = s.replace(/,\s*\d+\s*FT\s+(?:BELT|CHAIN|I-BEAM|TROLLEY)\s+RAIL/i, "");
  return s.replace(/\s+/g, " ").trim();
}

/** Where a catalogue item sits in the flow, for a top-bar search landing on it. */
export function locate(desc: string): CatalogueOperator | null {
  return OPERATORS.find((o) => o.item.desc === desc) ?? null;
}
