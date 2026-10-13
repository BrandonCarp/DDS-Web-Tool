/**
 * How the Operators tab sorts the operators — Brandon, 13/10/2026: Residential
 * or Commercial, then Belt / Chain / Side Mount, then (belt and chain) the
 * operator by model, then its rail length; a side mount is the operator itself.
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

/**
 * A belt or chain operator's model number — the label's first clause: the
 * 6690L of "6690L, HEAD ONLY", the TDC12S1BMC of "TDC12S1BMC, STANDARD, 1200
 * LBS, 20 CYCLES". The rail rows and the head-only row of one model share it.
 */
export function operatorModel(o: CatalogueOperator): string {
  return operatorLabel(o).split(",")[0].trim();
}

export interface OperatorModel {
  id: string;
  /** The model as its rail rows describe it ("TDC12S1BMC, STANDARD, 1200 LBS, 20 CYCLES"); the head-only row says less. */
  label: string;
}

/** The models a belt or chain kind comes in, in catalogue order. */
export function modelsFor(use: OperatorUse, kind: OperatorKind): OperatorModel[] {
  const out: OperatorModel[] = [];
  for (const o of OPERATORS.filter((x) => x.use === use && x.kind === kind)) {
    const id = operatorModel(o);
    const label = operatorLabel(o).replace(/,\s*HEAD ONLY$/i, "").trim();
    const have = out.find((m) => m.id === id);
    if (!have) out.push({ id, label });
    else if (label.length > have.label.length) have.label = label;
  }
  return out;
}

/** The rail lengths a model comes in, ascending, with "head" last where it is sold as a head alone. */
export function railLengthsForModel(use: OperatorUse, kind: OperatorKind, model: string): RailLength[] {
  const have = OPERATORS.filter((o) => o.use === use && o.kind === kind && operatorModel(o) === model);
  const feet = [...new Set(have.flatMap((o) => (typeof o.rail === "number" ? [o.rail] : [])))].sort((a, b) => a - b);
  return have.some((o) => o.rail === "head") ? [...feet, "head"] : feet;
}

/** The one operator of a model at a rail length, or null. */
export function operatorAt(use: OperatorUse, kind: OperatorKind, model: string, rail: RailLength): CatalogueOperator | null {
  return OPERATORS.find((o) => o.use === use && o.kind === kind && operatorModel(o) === model && o.rail === rail) ?? null;
}

/** Where a catalogue item sits in the flow, for a top-bar search landing on it. */
export function locate(desc: string): CatalogueOperator | null {
  return OPERATORS.find((o) => o.item.desc === desc) ?? null;
}
