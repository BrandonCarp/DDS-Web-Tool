/**
 * Glass types on a special order door.
 *
 * The grid in special-doors.ts prices SOLID, GLASS and INSERTS — three broad
 * styles. Clopay actually sells a dozen glass types, and the difference between
 * the cheapest and the dearest is more than $400 on the same door. This table
 * carries the specific ones so a quote can name what is being ordered.
 *
 * The figure is an ADDER on the solid door price, in the same convention the
 * rest of the special order grid uses — book value with the energy surcharge
 * already in it, before margin.
 *
 * Source: WINDOWS 4050|4051|4053|4132 for most types, the ARCHITECTURAL SERIES
 * WINDOWS 4138 tables for the two tempered ones, plus a flat $10 on every row —
 * Brandon's sheet, which DDS adds to every glazed special order.
 */

import { SPECIAL } from "./special-orders";

export interface GlassOption {
  id: string;
  label: string;
}

/** Ordered as the counter reads them, cheapest first within each family. */
export const SO_GLASS_TYPES: GlassOption[] = [
  { id: "dsb", label: "Double strength" },
  { id: "acrylic", label: "Acrylic" },
  { id: "obscure", label: "Obscure" },
  { id: "insulated", label: "Insulated" },
  { id: "insulated_obscure", label: "Insulated obscure" },
  { id: "tempered", label: '1/8" tempered' },
  { id: "insulated_tempered", label: "Insulated tempered" },
  { id: "frosted", label: '1/8" frosted DSB' },
  { id: "rain", label: '1/8" rain DSB' },
  { id: "insulated_frosted", label: "Insulated frosted" },
  { id: "insulated_rain", label: "Insulated rain" },
  { id: "seeded", label: '1/8" seeded DSB' },
  { id: "insulated_seeded", label: "Insulated seeded" },
];

/**
 * Adder by model group, then width, then glass id.
 *
 * Keyed by width because the window count changes with it — a wider door takes
 * more windows and every type costs proportionally more. Only the widths DDS
 * has priced are here; anything else falls back to the grid's plain GLASS
 * column, which is what the tool did before this table existed.
 */
const ADDERS: Record<string, Record<string, Record<string, number>>> = {
  "4050/4051/4053": {
    // 8'0" and 9'0" share the book's 4-window band, so the adders are identical.
    "8": {
      dsb: 111.04, acrylic: 124.61, insulated: 160.80, obscure: 136.67,
      insulated_obscure: 190.96, frosted: 266.36, insulated_frosted: 402.08,
      rain: 266.36, insulated_rain: 402.08, seeded: 402.08, insulated_seeded: 507.64,
      tempered: 206.04, insulated_tempered: 324.70,
    },
    "9": {
      dsb: 111.04, acrylic: 124.61, insulated: 160.80, obscure: 136.67,
      insulated_obscure: 190.96, frosted: 266.36, insulated_frosted: 402.08,
      rain: 266.36, insulated_rain: 402.08, seeded: 402.08, insulated_seeded: 507.64,
      tempered: 206.04, insulated_tempered: 324.70,
    },
  },
};

/** Whether a specific glass type can be chosen for this model group and width. */
export function hasGlassOptions(group: string, width: string): boolean {
  return !!ADDERS[group]?.[width];
}

/** The glass types priced for a model group and width, in display order. */
export function glassOptionsFor(group: string, width: string): GlassOption[] {
  const row = ADDERS[group]?.[width];
  if (!row) return [];
  return SO_GLASS_TYPES.filter((g) => row[g.id] != null);
}

/** The adder, or null when this combination is not priced. */
export function glassAdder(group: string, width: string, glassId: string): number | null {
  const v = ADDERS[group]?.[width]?.[glassId];
  return v == null ? null : v;
}

/** Label for a glass id, for a quote line. */
export function glassLabel(glassId: string): string {
  return SO_GLASS_TYPES.find((g) => g.id === glassId)?.label ?? glassId;
}

/**
 * The adder in the grid's own terms.
 *
 * The figures above are totals — cost with the energy surcharge, before margin —
 * because that is how Brandon's sheet carries them. SPECIAL_DOORS holds SELL
 * prices, so the adder has to be divided by the margin before it can be added
 * to one. Taking the margin from the table rather than hard-coding 43 means a
 * margin change moves the glass with the door.
 */
export function glassAdderSell(group: string, width: string, glassId: string): number | null {
  const total = glassAdder(group, width, glassId);
  if (total == null) return null;
  const margin = doorMargin(group);
  if (margin == null) return null;
  return Math.round((total / (1 - margin / 100)) * 100) / 100;
}

/** The door margin for a model group, searched across every collection. */
export function doorMargin(group: string): number | null {
  for (const series of Object.values(SPECIAL)) {
    const m = series.models?.[group];
    if (m && typeof m.door === "number") return m.door;
  }
  return null;
}
