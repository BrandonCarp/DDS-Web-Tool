/**
 * QuickBooks item names.
 *
 * A quote is pasted into QuickBooks as one invoice line:
 *
 *     ITEM <tab> DESCRIPTION <tab> QTY <tab> RATE
 *
 * The counter copies that with one button and an AutoHotkey macro types it
 * across the row — QuickBooks itself will not spread a multi-column paste, and
 * its own Copy Line uses a private clipboard format a browser cannot write.
 *
 * ITEM has to match an item in the QuickBooks list. QuickBooks autofills to the
 * closest match, which means a near-miss lands silently on the wrong item, so
 * these names are sent exactly as the item list holds them rather than relying
 * on that matching.
 *
 * Doors collapse to one item; parts and operators keep their own category
 * names, because DDS reports on those separately — Brandon, 24/9/2026.
 */

/**
 * QuickBooks items — one per tab, not one per category (Brandon, 6/10/2026):
 * every operator and accessory is OPERATORS, every spring on the two spring
 * tabs is TORSION SPRINGS, everything on the Track tab is TRACKS, and
 * everything else on the shelf — parts, kits, cables, fasteners — is PARTS.
 * Doors and vinyl keep their own.
 */
/** Every door, stock or section, residential or commercial. */
export const QB_STOCK_DOORS = "STOCK DOOR";
export const QB_SPECIAL_ORDERS = "SPECIAL ORDER";
export const QB_VINYL = "VINYL";
export const QB_OPERATORS = "OPERATORS";
export const QB_SPRINGS = "SPRINGS";
/** The spring tabs read better by their own names; both are the one item. */
export const QB_TORSION = QB_SPRINGS;
export const QB_EXTENSION = QB_SPRINGS;
export const QB_PARTS = "PARTS";

/**
 * Build the clipboard line.
 *
 * Tab-separated, no currency symbol, no thousands separator — QuickBooks wants
 * a bare number in Rate, and a leading "$" had to be deleted by hand on every
 * paste before this existed.
 */
export function quickBooksRow(
  item: string,
  description: string,
  qty: number,
  rate: number,
): string {
  const clean = description.replace(/[\t\r\n]+/g, " ").trim();
  // Math.max(1, NaN) is NaN, so guard the value itself rather than the floor —
  // a blank or broken quantity field would otherwise put "NaN" in the column.
  const n = Number.isFinite(qty) ? Math.max(1, Math.floor(qty)) : 1;
  const r = Number.isFinite(rate) ? rate : 0;
  return [item, clean.toUpperCase(), String(n), r.toFixed(2)].join("\t");
}

/**
 * The item for a shelf category: the Track tab's TRACKS, and every other
 * category — on the Parts tab (the spring kits included), the Cables tab or
 * scanned off the shelf — is PARTS. "TRACKS" is springs.ts's TRACK_CATEGORY.
 */
export function categoryItem(categoryName: string | null | undefined): string {
  const raw = (categoryName ?? "").trim().toUpperCase();
  if (!raw) return "";
  // Every shelf category, track included, pastes as PARTS (Brandon, 7/10/2026).
  return QB_PARTS;
}
