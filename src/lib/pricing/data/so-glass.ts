/**
 * Glass on a special order door.
 *
 * Three things vary and they are independent, which is why they are three
 * separate choices rather than one list:
 *
 *   glass type    ten of them, from single strength to insulated rain
 *   panel style   short or long — it changes the window COUNT, so a 15'0"
 *                 short door takes 7 windows and a long door 4, at different
 *                 prices for the same glass
 *   inserts       decorative inserts are an ADD on top of a glass price, not a
 *                 glass type of their own
 *
 * Figures are book values with the energy surcharge already in them, before
 * margin — the same convention SPECIAL_DOORS uses. Source: WINDOWS
 * 4050|4051|4053|4132, net price book 09/15/2026.
 */

import { SPECIAL } from "./special-orders";
import { GALLERY_GLASS, GALLERY_GLASS_TYPES, GALLERY_GROUPS, GALLERY_ULTRA_GRAIN } from "./gallery-glass";
import { BRIDGEPORT_GLASS, BRIDGEPORT_GLASS_TYPES, BRIDGEPORT_GROUPS, BRIDGEPORT_ULTRA_GRAIN } from "./bridgeport-glass";
import { COACHMAN_GLASS, COACHMAN_GLASS_TYPES, COACHMAN_GROUPS, COACHMAN_ULTRA_GRAIN } from "./coachman-glass";
import type { GlassOption, SheetBand } from "./sheet-band";

export type PanelStyle = "short" | "long";
export type { GlassOption } from "./sheet-band";

/** Ordered as the counter reads them. */
export const SO_GLASS_TYPES: GlassOption[] = [
  // Single strength is NOT listed. It is what the grid's own GLASS and INSERTS
  // columns were built from, so the placeholder option already selects it —
  // offering it here as well gave the same door two prices, a dollar apart at
  // 6'0" and six at 18'0", depending on which control the counter had touched.
  // Whether the grid column or the book table is the more accurate of the two
  // is still open; this removes the contradiction without moving any price.
  { id: "dsb", label: "Double strength" },
  { id: "acrylic", label: "Acrylic" },
  { id: "obscure", label: "Obscure" },
  { id: "insulated", label: "Insulated" },
  { id: "insulated_obscure", label: "Insulated obscure" },
  { id: "frosted", label: "Frosted DSB" },
  { id: "insulated_frosted", label: "Insulated frosted DSB" },
  { id: "rain", label: "Rain DSB" },
  { id: "insulated_rain", label: "Insulated rain DSB" },
];

interface Band {
  widths: string[];
  /** How many windows a door in this band carries. */
  windows: number;
  /** Decorative inserts, added on top of the glass price. */
  decor: number;
  prices: Record<string, number>;
}

const SHORT: Band[] = [
  { widths: ["6", "6.2", "6.4", "6.6", "6.8", "6.10", "7", "7.2", "7.4", "7.6", "7.8", "7.10"],
    windows: 3, decor: 35.44,
    prices: { ssb: 73.89, dsb: 76.15, acrylic: 85.96, obscure: 95, insulated: 113.1, insulated_obscure: 135.72, frosted: 192.27, insulated_frosted: 294.06, rain: 192.27, insulated_rain: 294.06 } },
  { widths: ["8", "8.2", "8.4", "8.6", "8.8", "8.10", "9", "9.2", "9.4", "9.6", "9.8", "9.10"],
    windows: 4, decor: 46.74,
    prices: { ssb: 98.02, dsb: 101.04, acrylic: 114.61, obscure: 126.67, insulated: 150.8, insulated_obscure: 180.96, frosted: 256.36, insulated_frosted: 392.08, rain: 256.36, insulated_rain: 392.08 } },
  { widths: ["10", "10.2", "10.4", "10.6", "10.8", "10.10", "11", "11.2", "11.4", "11.6", "11.8", "11.10"],
    windows: 5, decor: 58.81,
    prices: { ssb: 122.15, dsb: 126.67, acrylic: 143.26, obscure: 158.34, insulated: 188.5, insulated_obscure: 226.2, frosted: 320.45, insulated_frosted: 490.1, rain: 320.45, insulated_rain: 490.1 } },
  { widths: ["12", "12.2", "12.4", "12.6", "12.8", "12.10", "13", "13.2", "13.4", "13.6", "13.8", "13.10"],
    windows: 6, decor: 70.13,
    prices: { ssb: 147.03, dsb: 151.55, acrylic: 171.91, obscure: 190.01, insulated: 226.2, insulated_obscure: 271.44, frosted: 384.54, insulated_frosted: 588.12, rain: 384.54, insulated_rain: 588.12 } },
  { widths: ["14", "14.2", "14.4", "14.6", "14.8", "14.10", "15", "15.2", "15.4", "15.6", "15.8", "15.10"],
    windows: 7, decor: 82.18,
    prices: { ssb: 171.91, dsb: 176.44, acrylic: 200.56, obscure: 221.68, insulated: 263.9, insulated_obscure: 316.68, frosted: 448.63, insulated_frosted: 686.14, rain: 448.63, insulated_rain: 686.14 } },
  { widths: ["16", "16.2", "16.4", "16.6", "16.8", "16.10", "17", "17.2", "17.4", "17.6", "17.8", "17.10", "18"],
    windows: 8, decor: 93.5,
    prices: { ssb: 196.04, dsb: 202.07, acrylic: 229.22, obscure: 253.34, insulated: 301.6, insulated_obscure: 361.92, frosted: 512.72, insulated_frosted: 784.16, rain: 512.72, insulated_rain: 784.16 } },
];

const LONG: Band[] = [
  { widths: ["8", "8.2", "8.4", "8.6", "8.8", "8.10", "9", "9.2", "9.4", "9.6", "9.8", "9.10", "10", "10.2", "10.4", "10.6", "10.8", "10.10", "11", "11.2", "11.4", "11.6", "11.8", "11.10"],
    windows: 2, decor: 46.74,
    prices: { ssb: 98.02, dsb: 101.04, acrylic: 114.61, obscure: 126.67, insulated: 150.8, insulated_obscure: 180.96, frosted: 256.36, insulated_frosted: 392.08, rain: 256.36, insulated_rain: 392.08 } },
  { widths: ["12", "12.2", "12.4", "12.6", "12.8", "12.10", "13", "13.2", "13.4", "13.6", "13.8", "13.10", "14", "14.2", "14.4", "14.6", "14.8", "14.10"],
    windows: 3, decor: 70.13,
    prices: { ssb: 147.03, dsb: 151.55, acrylic: 171.91, obscure: 190.01, insulated: 226.2, insulated_obscure: 271.44, frosted: 384.54, insulated_frosted: 588.12, rain: 384.54, insulated_rain: 588.12 } },
  { widths: ["15", "15.2", "15.4", "15.6", "15.8", "15.10", "16", "16.2", "16.4", "16.6", "16.8", "16.10", "17", "17.2", "17.4", "17.6", "17.8", "17.10", "18"],
    windows: 4, decor: 93.5,
    prices: { ssb: 196.04, dsb: 202.07, acrylic: 229.22, obscure: 253.34, insulated: 301.6, insulated_obscure: 361.92, frosted: 512.72, insulated_frosted: 784.16, rain: 512.72, insulated_rain: 784.16 } },
];

const TABLES: Record<PanelStyle, Band[]> = { short: SHORT, long: LONG };

/** Which model groups these tables cover. */
const GROUPS = new Set(["4050/4051/4053"]);

/** The Gallery pair that was gridded first (8/10/2026); tests and the tool still name it. */
export const GALLERY_GROUP = "GD1LP/GD1SP";
const widthIn = (width: string) => {
  const [ft, inch] = width.split(".");
  return Number(ft) * 12 + Number(inch ?? 0);
};

/**
 * Groups priced from a Clopay workbook of their own — the four Gallery Steel
 * pairs, the four Bridgeport Steel groups and the Coachman (CJ's workbooks,
 * 12/10/2026), loaded by scripts/apply_sheet_workbook.py. One shape for all of
 * them: glass id -> short or long windows -> bands by width, in DDS cost,
 * lifted by the group's door margin at quote time.
 *
 * The window style is a plain choice on every one of them: on the Gallery the
 * long band is the L model's window and the short band the S model's, so long
 * glass on a GD1SP prices as the GD1LP's (Brandon, 8/10/2026); on a Bridgeport
 * door the N, E and C designs each take either. The Coachman has one window
 * layout — a glass top section — so its sheet fills the short band only and
 * the choice never appears; its "inserts" figure is the arch window section.
 */
const SHEET_GLASS: Record<string, Record<string, Record<PanelStyle, SheetBand[]>>> = {
  ...GALLERY_GLASS,
  ...BRIDGEPORT_GLASS,
  ...COACHMAN_GLASS,
};

/** Ultra-Grain and the other premium finishes, per sheet-priced group: cost, before margin. */
const SHEET_ULTRA_GRAIN: Record<string, { upTo8ft: { single: number; double: number }; over8ft: { single: number; double: number } }> = {
  ...GALLERY_ULTRA_GRAIN,
  ...BRIDGEPORT_ULTRA_GRAIN,
  ...COACHMAN_ULTRA_GRAIN,
};

/** The glass types each workbook prices, in the order the counter reads them. */
const SHEET_GLASS_TYPES: Record<string, GlassOption[]> = Object.fromEntries([
  ...GALLERY_GROUPS.map((g) => [g, GALLERY_GLASS_TYPES] as const),
  ...BRIDGEPORT_GROUPS.map((g) => [g, BRIDGEPORT_GLASS_TYPES] as const),
  ...COACHMAN_GROUPS.map((g) => [g, COACHMAN_GLASS_TYPES] as const),
]);

/** True for a group whose glass and finishes come off its own Clopay sheet. */
export function isSheetGroup(group: string): boolean {
  return group in SHEET_GLASS;
}

/** The premium-finish adder bands for a sheet-priced group, or null. */
export function sheetUltraGrain(group: string) {
  return SHEET_ULTRA_GRAIN[group] ?? null;
}

function sheetBand(group: string, panel: PanelStyle, width: string, glassId: string): SheetBand | null {
  const w = widthIn(width);
  return SHEET_GLASS[group]?.[glassId]?.[panel]?.find((b) => b.lo <= w && w <= b.hi) ?? null;
}

function bandFor(group: string, panel: PanelStyle, width: string): Band | null {
  if (isSheetGroup(group)) {
    // Lift the sheet's band into the shape the rest of this file reads: the
    // insert charge is the gap between the two columns, and a type with no
    // inserts column (acrylic) gets none.
    const dsb = sheetBand(group, panel, width, "dsb");
    if (!dsb) return null;
    const prices: Record<string, number> = {};
    for (const g of SHEET_GLASS_TYPES[group] ?? []) {
      const b = sheetBand(group, panel, width, g.id);
      if (b) prices[g.id] = b.glass;
    }
    return { widths: [width], windows: dsb.windows, decor: (dsb.inserts ?? dsb.glass) - dsb.glass, prices };
  }
  if (!GROUPS.has(group)) return null;
  return TABLES[panel].find((b) => b.widths.includes(width)) ?? null;
}

/** Whether this model group, panel style and width has priced glass. */
export function hasGlass(group: string, panel: PanelStyle, width: string): boolean {
  return bandFor(group, panel, width) != null;
}

/** Panel styles available at a width. Long panels start at 8'0". */
export function panelStylesFor(group: string, width: string): PanelStyle[] {
  return (["short", "long"] as PanelStyle[]).filter((p) => hasGlass(group, p, width));
}

/** The glass types priced for this combination, in display order. */
export function glassOptionsFor(group: string, panel: PanelStyle, width: string): GlassOption[] {
  const b = bandFor(group, panel, width);
  if (!b) return [];
  const list = SHEET_GLASS_TYPES[group] ?? SO_GLASS_TYPES;
  return list.filter((g) => b.prices[g.id] != null);
}

/** True where inserts are not offered on this glass (acrylic, on every sheet-priced group). */
export function glassTakesInserts(group: string, panel: PanelStyle, width: string, glassId: string): boolean {
  if (!isSheetGroup(group)) return true;
  return sheetBand(group, panel, width, glassId)?.inserts != null;
}

/** Window count, for the quote wording. */
export function windowCount(group: string, panel: PanelStyle, width: string): number | null {
  return bandFor(group, panel, width)?.windows ?? null;
}

/**
 * The adder, before margin. `inserts` adds the decorative insert charge on top
 * of the glass, which is how Clopay prices it — inserts are never an
 * alternative to glass.
 */
export function glassAdder(
  group: string, panel: PanelStyle, width: string, glassId: string, inserts = false,
): number | null {
  const b = bandFor(group, panel, width);
  const g = b?.prices[glassId];
  if (b == null || g == null) return null;
  // A glass with no inserts price (acrylic) cannot take them.
  if (inserts && !glassTakesInserts(group, panel, width, glassId)) return null;
  return Math.round((g + (inserts ? b.decor : 0)) * 100) / 100;
}

/** The same adder lifted into the grid's SELL space. */
export function glassAdderSell(
  group: string, panel: PanelStyle, width: string, glassId: string, inserts = false,
): number | null {
  const total = glassAdder(group, panel, width, glassId, inserts);
  if (total == null) return null;
  const margin = doorMargin(group);
  if (margin == null) return null;
  return Math.round((total / (1 - margin / 100)) * 100) / 100;
}

/** Label for a glass id. */
export function glassLabel(glassId: string): string {
  return [...SO_GLASS_TYPES, ...GALLERY_GLASS_TYPES, ...BRIDGEPORT_GLASS_TYPES, ...COACHMAN_GLASS_TYPES].find((g) => g.id === glassId)?.label ?? glassId;
}

/** The door margin for a model group, searched across every collection. */
export function doorMargin(group: string): number | null {
  for (const series of Object.values(SPECIAL)) {
    const m = series.models?.[group];
    if (m && typeof m.door === "number") return m.door;
  }
  return null;
}
