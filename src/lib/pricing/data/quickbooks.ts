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
 * Singular throughout — the item names a line item, not a category, and a
 * quantity column already says how many. Brandon, 24/9/2026.
 */
/** Every door, stock or section, residential or commercial. */
export const QB_STOCK_DOORS = "STOCK DOOR";
export const QB_SPECIAL_ORDERS = "SPECIAL ORDER";
export const QB_TORSION = "TORSION SPRING";
export const QB_EXTENSION = "EXTENSION SPRING";
export const QB_VINYL = "VINYL";
export const QB_OPERATOR = "OPERATOR";
export const QB_KEYPAD = "KEYPAD";
export const QB_REMOTE = "REMOTE";

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
 * Operator groups whose QuickBooks item differs from the catalogue name.
 *
 * The catalogue names are written for browsing — "LIFTMASTER LOGIC 5" tells a
 * counter what shelf to look on. The QuickBooks item is what goes on an
 * invoice, so the brand comes off and the rest shortens.
 */
const OPERATOR_ITEM: Record<string, string> = {
  "LIFTMASTER LOGIC 5": "LOGIC 5",
  "LIFTMASTER ACCESSORIES": "ACCESSORY",
  "MAXUM OPERATORS": "MAXUM",
  "RESIDENTIAL BELT DRIVES": "BELT DRIVE",
  "RESIDENTIAL CHAIN DRIVES": "CHAIN DRIVE",
  "RESIDENTIAL SIDEMOUNT": "SIDEMOUNT",
  "LIGHT COMMERCIAL SIDEMOUNT": "SIDEMOUNT",
  "BELT RAILS": "BELT RAIL",
  "CHAIN RAILS": "CHAIN RAIL",
  "I BEAM RAILS": "I BEAM RAIL",
};

/**
 * The item for a part or an operator: its own category name, singularised.
 *
 * The data carries these as plurals — "DRUMS", "CABLES", "KEYPADS" — and the
 * QuickBooks item list is singular, so the trailing S comes off. Names ending
 * in SS keep it, and a name whose last word is already singular is left alone;
 * a slashed name like "BRUSH SEAL / RETAINERS" has each part handled.
 */
export function categoryItem(categoryName: string | null | undefined): string {
  const raw = (categoryName ?? "").trim().toUpperCase();
  if (!raw) return "";
  // Names the QuickBooks item list holds differently from the catalogue. The
  // catalogue names are written for browsing — "LIFTMASTER LOGIC 5" tells a
  // counter what shelf to look at — where the item list wants the short trade
  // name. Anything not listed here falls through to the singular rule below.
  const override = OPERATOR_ITEM[raw];
  if (override) return override;
  const named = OPERATOR_ITEM[raw];
  if (named) return named;
  return raw
    .split("/")
    .map((part) => {
      const words = part.trim().split(/\s+/);
      const last = words[words.length - 1];
      if (last.length > 4 && last.endsWith("IES")) {
        // BATTERIES -> BATTERY, ACCESSORIES -> ACCESSORY
        words[words.length - 1] = last.slice(0, -3) + "Y";
      } else if (last.length > 3 && last.endsWith("S") && !last.endsWith("SS")) {
        words[words.length - 1] = last.slice(0, -1);
      }
      return words.join(" ");
    })
    .join(" / ");
}
