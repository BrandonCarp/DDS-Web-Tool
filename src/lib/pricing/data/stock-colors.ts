// What Doors Direct South actually keeps on the floor, from the DDS stock list.
//
// A door is only IN STOCK when the model, the colour, the exact WIDTH and the
// exact HEIGHT all appear together. That last part matters: the 4050 is floored
// in five colours, but only White runs the full width range and only White goes
// above 8'0" tall. A 10'0" x 7'0" in Black prices off the stock sheet and is
// still a special order, because Black is only floored at 8', 9' and 16'.
//
// The 9130/9133 is the opposite case: it carries the widest colour range in the
// line — fourteen options including the Ultra-Grain finishes — and exactly one
// of them, White, is on the floor.
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

/**
 * Heights every floored colour carries, on every model.
 *
 * The range floors at 6'0" and runs to 8'0". Nothing needs a pricing change to
 * support it: the 7' tier already covers everything from 6'0" to 7'0".
 */
const SHORT_HEIGHTS = ["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8"];
/** White also runs tall. */
const WHITE_HEIGHTS = [...SHORT_HEIGHTS, "9", "10"];

/**
 * Heights floored ONLY as solid doors.
 *
 * A 6'0" door is on the floor, but not with windows — there is no glazed 6'0"
 * to sell, so the style dropdown drops to Solid at that height rather than
 * offering something that has to be ordered in. Windows start at 6'3".
 *
 * This is the one place in the matrix where style bears on stock at all, which
 * is why it is data rather than a condition buried in the lookup.
 */
export const SOLID_ONLY_HEIGHTS = ["6"];

/** True when a height is floored in solid only, so windows must not be offered. */
export function solidOnlyHeight(heightCode: string): boolean {
  return SOLID_ONLY_HEIGHTS.includes(heightCode);
}

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
  // 9130/9133 went on the floor 3/9/2026: White only, 8/9/16 wide.
  "9130": {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  "9133": {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  GD1LP: {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  GD1SP: {
    White: { widths: ["8", "9", "16"], heights: SHORT_HEIGHTS },
  },
  // The whole 4300 family is still not floored as a complete door.
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
  style?: string,
): boolean {
  const byColor = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!byColor) return false;
  const want = String(color || "").trim().toLowerCase();
  const entry = Object.entries(byColor).find(([c]) => c.toLowerCase() === want)?.[1];
  if (!entry) return false;
  if (widthCode != null && !entry.widths.includes(widthCode)) return false;
  if (heightCode != null && !entry.heights.includes(heightCode)) return false;
  // A height floored in solid only. The UI does not offer windows there, so
  // this is a backstop for anything reaching the engine directly.
  if (heightCode != null && style != null && style !== "solid" && solidOnlyHeight(heightCode)) {
    return false;
  }
  return true;
}

/** Order two size codes: "7.6" is 7 feet 6 inches, not 7.6 feet. */
export function compareSizeCodes(a: string, b: string): number {
  const parse = (c: string) => {
    const [ft, inch] = c.split(".");
    return [Number(ft), Number(inch ?? 0)] as const;
  };
  const [af, ai] = parse(a);
  const [bf, bi] = parse(b);
  return af - bf || ai - bi;
}

/** A size code back into feet and inches. */
export function sizeParts(code: string): { ft: number; in: number } {
  const [ft, inch] = code.split(".");
  return { ft: Number(ft), in: Number(inch ?? 0) };
}

/** `7.6` -> `7'6"`, for a dropdown label. */
export function sizeLabel(code: string): string {
  const { ft, in: inches } = sizeParts(code);
  return `${ft}'${inches}"`;
}

/**
 * Every width DDS floors for a model, across all of its colours.
 *
 * Deliberately the union rather than one colour's list. The dropdown offers a
 * size if it is stocked at all; whether THIS colour is stocked at that size is
 * a separate question, answered by colorInStock and shown as the special order
 * badge. A 9133 is floored 8/9/16 and only in White, so a Black 8'0" still
 * quotes — it just quotes as a special order, which is what the counter needs
 * to see rather than an empty dropdown.
 */
export function stockedWidths(model: string): string[] {
  const entry = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!entry) return [];
  return [...new Set(Object.values(entry).flatMap((v) => v.widths))].sort(compareSizeCodes);
}

/** Every height DDS floors for a model, across all of its colours. */
export function stockedHeights(model: string): string[] {
  const entry = STOCK_MATRIX[model] ?? STOCK_MATRIX[dataKey(model)];
  if (!entry) return [];
  return [...new Set(Object.values(entry).flatMap((v) => v.heights))].sort(compareSizeCodes);
}
