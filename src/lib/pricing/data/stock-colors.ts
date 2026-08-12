// What Doors Direct South actually keeps on the floor, from the DDS stock list.
//
// A door is only IN STOCK when the model, the colour, the exact WIDTH and the
// exact HEIGHT all appear together. That last part matters: the 4050 is floored
// in five colours, but only White runs the full width range and only White goes
// above 8'0" tall. A 10'0" x 7'0" in Black prices off the stock sheet and is
// still a special order, because Black is only floored at 8', 9' and 16'.
//
// Sizes are stored as catalog codes — whole feet as "8", inches as "7.6" for
// 7'6". Replacement sections are a separate question, further down.

import { dataKey } from "../model-groups";

export interface StockRange {
  /** Exact widths floored in this colour. */
  widths: string[];
  /** Exact heights floored in this colour. */
  heights: string[];
}

/** Heights every floored colour carries. */
const SHORT_HEIGHTS = ["6.3", "6.6", "6.9", "7", "7.6", "7.9", "8"];
/** White also runs tall. */
const WHITE_HEIGHTS = [...SHORT_HEIGHTS, "9", "10"];

/**
 * model -> colour -> the sizes floored in it.
 *
 * Keyed by individual model, not by catalog group: the 4050 stocks five colours
 * across ten widths while the 4051 and 4053 stock two colours across three, even
 * though all three share one price sheet.
 */
export const STOCK_MATRIX: Record<string, Record<string, StockRange>> = {
  T50S: {
    White: { widths: ["7.6", "8", "9", "10", "12", "15", "16"], heights: WHITE_HEIGHTS },
  },
  T52S: {
    White: { widths: ["8", "9", "10", "16"], heights: WHITE_HEIGHTS },
  },
  "4050": {
    White: {
      widths: ["7", "7.6", "8", "9", "10", "12", "14", "15", "16", "18"],
      heights: WHITE_HEIGHTS,
    },
    Almond: { widths: ["7.6", "8", "9", "16"], heights: SHORT_HEIGHTS },
    "Chocolate Brown": { widths: ["7.6", "8", "9", "16"], heights: SHORT_HEIGHTS },
    Sandtone: { widths: ["7.6", "8", "9", "16"], heights: SHORT_HEIGHTS },
    Black: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  "4051": {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
    Black: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  "4053": {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
    Black: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  GD1LP: {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  GD1SP: {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  // 9130/9133 and the whole 4300 family are not floored as complete doors.
};

/**
 * Colours DDS keeps replacement SECTIONS in, which is a different question from
 * complete doors — a model can be cut sections in White without a single
 * finished door on the floor. The stock list covers doors, so these stay as they
 * were.
 */
export const SECTION_STOCK_COLORS: Record<string, string[]> = {
  T50S: ["White"],
  T52S: ["White"],
  "4050": ["White", "Almond", "Sandtone", "Chocolate Brown", "Black"],
  "4051": ["White", "Black"],
  "4053": ["White", "Black"],
  "9130": ["White"],
  "9133": ["White"],
  "4300": ["White"],
  "4301": ["White"],
  "4310": ["White"],
  GD1LP: ["White"],
  GD1SP: ["White"],
};

/** Is this colour stocked for replacement sections of this model? */
export function sectionColorInStock(model: string, color: string): boolean {
  const list = SECTION_STOCK_COLORS[model] ?? SECTION_STOCK_COLORS[dataKey(model)] ?? [];
  const want = String(color || "").trim().toLowerCase();
  return list.some((c) => c.toLowerCase() === want);
}

/** Colours floored as complete doors, at any size — for listing, not the badge. */
export const STOCK_COLORS: Record<string, string[]> = Object.fromEntries(
  Object.entries(STOCK_MATRIX).map(([m, byColor]) => [m, Object.keys(byColor)]),
);

/** Feet + inches -> catalog size code ("7.6" for 7'6"). */
export function sizeCode(ft: number, inch = 0): string {
  return inch ? `${ft}.${inch}` : String(ft);
}

/**
 * Is this exact door on the floor?
 *
 * Width and height are optional so a caller that only cares about the colour can
 * ask the looser question. When given, BOTH must match a floored size — a
 * stocked colour in an unstocked size is still a special order.
 */
export function colorInStock(
  model: string,
  color: string,
  widthCode?: string,
  heightCode?: string,
): boolean {
  const byColor = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!byColor) return false;
  const want = String(color || "").trim().toLowerCase();
  const entry = Object.entries(byColor).find(([c]) => c.toLowerCase() === want)?.[1];
  if (!entry) return false;
  if (widthCode != null && !entry.widths.includes(widthCode)) return false;
  if (heightCode != null && !entry.heights.includes(heightCode)) return false;
  return true;
}
