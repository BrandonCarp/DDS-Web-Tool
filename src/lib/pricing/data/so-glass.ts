/**
 * Glass on a special order door.
 *
 * Three things vary and they are independent, which is why they are three
 * separate choices rather than one list:
 *
 *   glass type    single strength to insulated rain, as the door's sheet
 *                 prices them
 *   panel style   short or long — it changes the window COUNT, so a 15'0"
 *                 short door takes 7 windows and a long door 4, at different
 *                 prices for the same glass
 *   inserts       decorative inserts are an ADD on top of a glass price, not a
 *                 glass type of their own
 *
 * …and on the Premium Steel doors a fourth, the window SERIES: the standard
 * windows (19-1/2" x 12" and 40-1/2" x 12", plain or with inserts) or the
 * architectural series (19-1/2" x 16" and 42" x 16", plain or with grilles),
 * each on its own width bands with its own glass list (CJ's workbook of
 * 16/10/2026). Every other sheet-priced door has the one series. The series
 * is never a choice of its own (Brandon, 19/10/2026): the framing list names
 * the windows of both, and the window picked says which series it is from.
 *
 * Every figure is DDS cost, before margin — the convention every sheet file
 * follows — lifted by the group's door margin at quote time.
 */

import { SPECIAL } from "./special-orders";
import { GALLERY_GLASS, GALLERY_GLASS_TYPES, GALLERY_GROUPS, GALLERY_ULTRA_GRAIN } from "./gallery-glass";
import { BRIDGEPORT_GLASS, BRIDGEPORT_GLASS_TYPES, BRIDGEPORT_GROUPS, BRIDGEPORT_ULTRA_GRAIN } from "./bridgeport-glass";
import { COACHMAN_GLASS, COACHMAN_GLASS_TYPES, COACHMAN_GROUPS, COACHMAN_ULTRA_GRAIN } from "./coachman-glass";
import {
  PREMIUM_ARCH_GLASS, PREMIUM_ARCH_GLASS_TYPES, PREMIUM_GLASS, PREMIUM_GLASS_TYPES, PREMIUM_GROUPS, PREMIUM_ULTRA_GRAIN,
} from "./premium-glass";
import { MODERN_ULTRA_GRAIN } from "./modern-windows";
import type { GlassOption, SheetBand } from "./sheet-band";

export type PanelStyle = "short" | "long";
export type { GlassOption } from "./sheet-band";

/**
 * The window series a door's windows come from. Standard is every door's;
 * the architectural series is the Premium Steel doors' second list.
 */
export type WindowSeries = "standard" | "architectural";

/** Every glass type any sheet prices, for labels — the id is the same type on every sheet. */
export const SO_GLASS_TYPES: GlassOption[] = [
  { id: "ssb", label: "Single strength B grade" },
  ...GALLERY_GLASS_TYPES,
];

interface Band {
  widths: string[];
  /** How many windows a door in this band carries. */
  windows: number;
  /** The glass, by type: the windows the band carries, at that glass. */
  prices: Record<string, number>;
  /** The same with decorative inserts (grilles), by type; null where the glass takes none (acrylic). */
  withInserts: Record<string, number | null>;
}

/** The Gallery pair that was gridded first (8/10/2026); tests and the tool still name it. */
export const GALLERY_GROUP = "GD1LP/GD1SP";
const widthIn = (width: string) => {
  const [ft, inch] = width.split(".");
  return Number(ft) * 12 + Number(inch ?? 0);
};

/**
 * Groups priced from a Clopay workbook of their own — the four Gallery Steel
 * pairs, the four Bridgeport Steel groups, the Coachman (CJ's workbooks,
 * 12/10/2026) and the four Premium Steel groups (16/10/2026), loaded by
 * scripts/apply_sheet_workbook.py. One shape for all of them: glass id ->
 * short or long windows -> bands by width, in DDS cost, lifted by the group's
 * door margin at quote time.
 *
 * The window style is a plain choice on every one of them: on the Gallery the
 * long band is the L model's window and the short band the S model's, so long
 * glass on a GD1SP prices as the GD1LP's (Brandon, 8/10/2026); on a Bridgeport
 * door the N, E and C designs each take either. The Coachman has one window
 * layout — a top section priced by design — so its sheet fills the short band
 * only and the choice never appears; its bands hold the glass over the double
 * strength door, and the section itself is priced in coachman-windows.ts. The
 * Premium Steel sheets price short and long for the whole group, and a second
 * series beside them (SHEET_ARCH_GLASS).
 */
const SHEET_GLASS: Record<string, Record<string, Record<PanelStyle, SheetBand[]>>> = {
  ...GALLERY_GLASS,
  ...BRIDGEPORT_GLASS,
  ...COACHMAN_GLASS,
  ...PREMIUM_GLASS,
};

/** The architectural series, where a group has one. */
const SHEET_ARCH_GLASS: Record<string, Record<string, Record<PanelStyle, SheetBand[]>>> = {
  ...PREMIUM_ARCH_GLASS,
};

/**
 * Ultra-Grain and the other premium finishes, per sheet-priced group: cost,
 * before margin. The Modern Steel pairs' too (CJ's sheets of 19/10/2026),
 * whose windows are priced a window rather than by band (modern-steel.ts).
 */
const SHEET_ULTRA_GRAIN: Record<string, { upTo8ft: { single: number; double: number }; over8ft: { single: number; double: number } }> = {
  ...GALLERY_ULTRA_GRAIN,
  ...BRIDGEPORT_ULTRA_GRAIN,
  ...COACHMAN_ULTRA_GRAIN,
  ...PREMIUM_ULTRA_GRAIN,
  ...MODERN_ULTRA_GRAIN,
};

/** The glass types each workbook prices, in the order the counter reads them. */
const SHEET_GLASS_TYPES: Record<string, GlassOption[]> = Object.fromEntries([
  ...GALLERY_GROUPS.map((g) => [g, GALLERY_GLASS_TYPES] as const),
  ...BRIDGEPORT_GROUPS.map((g) => [g, BRIDGEPORT_GLASS_TYPES] as const),
  ...COACHMAN_GROUPS.map((g) => [g, COACHMAN_GLASS_TYPES] as const),
  ...PREMIUM_GROUPS.map((g) => [g, PREMIUM_GLASS_TYPES] as const),
]);
const SHEET_ARCH_GLASS_TYPES: Record<string, GlassOption[]> = Object.fromEntries(
  PREMIUM_GROUPS.map((g) => [g, PREMIUM_ARCH_GLASS_TYPES] as const),
);

/** True for a group whose glass and finishes come off its own Clopay sheet. */
export function isSheetGroup(group: string): boolean {
  return group in SHEET_GLASS;
}

/** The window series a group's sheet prices: standard, and architectural where it has that list too. */
export function windowSeriesFor(group: string): WindowSeries[] {
  return group in SHEET_ARCH_GLASS ? ["standard", "architectural"] : ["standard"];
}

/**
 * The premium-finish adder bands for a sheet-priced group, or null. On the
 * Premium Steel and Modern Steel sheets it is CJ's ULTRA COLOR block
 * (19/10/2026) — the 9130, 9200 and 4300 families and the 9208/9209 and
 * 4308/4309 pairs; the 4050's has none, and its colours take none. Which
 * colours count is PREMIUM_COLORS: Iron Ore and the Ultra-Grain finishes,
 * never Charcoal.
 */
export function sheetUltraGrain(group: string) {
  return SHEET_ULTRA_GRAIN[group] ?? null;
}

function tablesFor(group: string, series: WindowSeries) {
  return series === "architectural" ? SHEET_ARCH_GLASS[group] : SHEET_GLASS[group];
}
function typesFor(group: string, series: WindowSeries): GlassOption[] {
  return (series === "architectural" ? SHEET_ARCH_GLASS_TYPES[group] : SHEET_GLASS_TYPES[group]) ?? [];
}
/**
 * The types the counter is offered: every type the sheet prices, in its
 * order — single strength first on the Premium Steel sheets, the grade the
 * Value Steel and Modern grids carry as their own glass (Brandon,
 * 19/10/2026), double strength first on the Gallery, Bridgeport and Coachman
 * sheets, which price no single strength.
 */
function offeredTypesFor(group: string, series: WindowSeries): GlassOption[] {
  return typesFor(group, series);
}

function sheetBand(group: string, panel: PanelStyle, width: string, glassId: string, series: WindowSeries): SheetBand | null {
  const w = widthIn(width);
  return tablesFor(group, series)?.[glassId]?.[panel]?.find((b) => b.lo <= w && w <= b.hi) ?? null;
}

/**
 * The sheet's band at a width, lifted into the shape the rest of this file
 * reads: every type's glass, and its glass with inserts where the sheet
 * prices that (acrylic takes none). The base glass — the first type the
 * sheet lists, double strength on most and single strength on the Premium
 * Steel sheets — says whether the width has windows at all.
 */
function bandFor(group: string, panel: PanelStyle, width: string, series: WindowSeries = "standard"): Band | null {
  const types = typesFor(group, series);
  const baseId = types[0]?.id;
  if (!baseId) return null;
  const base = sheetBand(group, panel, width, baseId, series);
  if (!base) return null;
  const prices: Record<string, number> = {};
  const withInserts: Record<string, number | null> = {};
  for (const g of types) {
    const b = sheetBand(group, panel, width, g.id, series);
    if (b) {
      prices[g.id] = b.glass;
      withInserts[g.id] = b.inserts;
    }
  }
  return { widths: [width], windows: base.windows, prices, withInserts };
}

/** Whether this model group, panel style and width has priced glass. */
export function hasGlass(group: string, panel: PanelStyle, width: string, series: WindowSeries = "standard"): boolean {
  return bandFor(group, panel, width, series) != null;
}

/** Panel styles available at a width, in a series. Long panels start at 8'0". */
export function panelStylesFor(group: string, width: string, series: WindowSeries = "standard"): PanelStyle[] {
  return (["short", "long"] as PanelStyle[]).filter((p) => hasGlass(group, p, width, series));
}

/**
 * The glass a sheet-priced door's windows are unless another is picked: the
 * first the counter is offered — single strength on the Premium Steel
 * sheets, double strength on the rest.
 */
export function baseGlassFor(group: string, series: WindowSeries = "standard"): string {
  return offeredTypesFor(group, series)[0]?.id ?? "dsb";
}

/** True when some series prices a window on this group at this width. */
export function windowsPricedAt(group: string, width: string): boolean {
  return windowSeriesFor(group).some((s) => panelStylesFor(group, width, s).length > 0);
}

/** The glass types offered for this combination, in display order. */
export function glassOptionsFor(group: string, panel: PanelStyle, width: string, series: WindowSeries = "standard"): GlassOption[] {
  const b = bandFor(group, panel, width, series);
  if (!b) return [];
  return offeredTypesFor(group, series).filter((g) => b.prices[g.id] != null);
}

/** True where inserts are not offered on this glass (acrylic, on every sheet-priced group). */
export function glassTakesInserts(group: string, panel: PanelStyle, width: string, glassId: string, series: WindowSeries = "standard"): boolean {
  if (!isSheetGroup(group)) return true;
  return sheetBand(group, panel, width, glassId, series)?.inserts != null;
}

/** Window count, for the quote wording. */
export function windowCount(group: string, panel: PanelStyle, width: string, series: WindowSeries = "standard"): number | null {
  return bandFor(group, panel, width, series)?.windows ?? null;
}

/**
 * The adder, before margin. `inserts` takes the sheet's with-inserts figure
 * for the glass, which is how Clopay prices it — inserts are never an
 * alternative to glass, and a glass with no such figure (acrylic) cannot
 * take them.
 */
export function glassAdder(
  group: string, panel: PanelStyle, width: string, glassId: string, inserts = false, series: WindowSeries = "standard",
): number | null {
  const b = bandFor(group, panel, width, series);
  const g = inserts ? b?.withInserts[glassId] : b?.prices[glassId];
  if (b == null || g == null) return null;
  return Math.round(g * 100) / 100;
}

/** The same adder lifted into the grid's SELL space. */
export function glassAdderSell(
  group: string, panel: PanelStyle, width: string, glassId: string, inserts = false, series: WindowSeries = "standard",
): number | null {
  const total = glassAdder(group, panel, width, glassId, inserts, series);
  if (total == null) return null;
  const margin = doorMargin(group);
  if (margin == null) return null;
  return Math.round((total / (1 - margin / 100)) * 100) / 100;
}

/** Label for a glass id. */
export function glassLabel(glassId: string): string {
  return [...SO_GLASS_TYPES, ...BRIDGEPORT_GLASS_TYPES, ...COACHMAN_GLASS_TYPES, ...PREMIUM_GLASS_TYPES, ...PREMIUM_ARCH_GLASS_TYPES]
    .find((g) => g.id === glassId)?.label ?? glassId;
}

/** The door margin for a model group, searched across every collection. */
export function doorMargin(group: string): number | null {
  for (const series of Object.values(SPECIAL)) {
    const m = series.models?.[group];
    if (m && typeof m.door === "number") return m.door;
  }
  return null;
}
