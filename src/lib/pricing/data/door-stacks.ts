/**
 * How a door stacks — its sections top to bottom, each to its height — off
 * Clopay's section stacking charts, for the door drawings on the stock tabs
 * (Brandon, 22/10/2026):
 *
 *   CLASSIC      Residential Door Stacking & Panel Configurations, Classic
 *                Steel: the 9200/9203, 9130/9133, 4300/4310, 4050/4053, T52S/
 *                T52L and T50S/T50L — 18" and 21" sections, 6'0" to 9'0" here
 *                (the stock tab's heights; 7'3" is not built).
 *   GALLERY      Gallery Steel, 3 layer (page 8): the GD1SP/GD1LP, GD1SU/
 *                GD1LU, GD2SP/GD2LP and GD2SU/GD2LU — 18", 21" and 24"
 *                sections, 6'0" to 16'0".
 *   ENERGY       the commercial energy series' chart (page 28): the 3150,
 *                3200 and 3220 — 18", 21" and 24" sections, 7'0" to 17'0".
 *   INDUSTRIAL   the industrial series' chart (page 32): the 520 to 525S —
 *                19.375", 21" and 24" sections, 7'0" to 17'0".
 *
 * The Modern Steel doors' chart is modern-steel.ts's. Sections are numbered
 * from the floor up, as Clopay numbers them — the bottom section is 1, the
 * top the last — which is how the drawings and the lines count them.
 */

const r = (n: number, times: number) => Array.from({ length: times }, () => n);

/** Section heights top to bottom, by door height in inches: the Classic Steel doors. */
export const CLASSIC_STACK: Record<number, readonly number[]> = {
  72: [18, 18, 18, 18],
  75: [21, 18, 18, 18],
  78: [21, 18, 18, 21],
  81: [21, 18, 21, 21],
  84: [21, 21, 21, 21],
  90: [18, 18, 18, 18, 18],
  93: [21, 18, 18, 18, 18],
  96: [21, 18, 18, 18, 21],
  99: [21, 18, 18, 21, 21],
  102: [21, 18, 21, 21, 21],
  105: [21, 21, 21, 21, 21],
  108: [18, 18, 18, 18, 18, 18],
};

/** Section heights top to bottom, by door height in inches: the Gallery Steel 3 layer doors. */
export const GALLERY_STACK: Record<number, readonly number[]> = {
  72: r(24, 3),
  75: [21, 18, 18, 18],
  78: [21, 18, 18, 21],
  81: [21, 18, 21, 21],
  84: r(21, 4),
  87: [24, 21, 21, 21],
  90: [24, 21, 21, 24],
  93: [24, 21, 24, 24],
  96: r(24, 4),
  99: [21, 18, 18, 21, 21],
  102: [21, 18, 21, 21, 21],
  105: r(21, 5),
  108: [24, 21, 21, 21, 21],
  111: [24, 21, 21, 21, 24],
  114: [24, 21, 21, 24, 24],
  117: [24, 21, 24, 24, 24],
  120: r(24, 5),
  123: [21, 18, 21, 21, 21, 21],
  126: r(21, 6),
  129: [24, ...r(21, 5)],
  132: [24, ...r(21, 4), 24],
  135: [24, ...r(21, 3), 24, 24],
  138: [24, 21, 21, ...r(24, 3)],
  141: [24, 21, ...r(24, 4)],
  144: r(24, 6),
  147: r(21, 7),
  150: [24, ...r(21, 6)],
  153: [24, ...r(21, 5), 24],
  156: [24, ...r(21, 4), 24, 24],
  159: [24, ...r(21, 3), ...r(24, 3)],
  162: [24, 21, 21, ...r(24, 4)],
  165: [24, 21, ...r(24, 5)],
  168: r(24, 7),
  171: [24, ...r(21, 7)],
  174: [24, ...r(21, 6), 24],
  177: [24, ...r(21, 5), 24, 24],
  180: [24, ...r(21, 4), ...r(24, 3)],
  183: [24, ...r(21, 3), ...r(24, 4)],
  186: [24, 21, 21, ...r(24, 5)],
  189: [24, 21, ...r(24, 6)],
  192: r(24, 8),
};

/** The energy series' commercial doors (3150, 3200, 3220), 7'0" to 17'0". */
export const ENERGY_STACK: Record<number, readonly number[]> = {
  84: r(21, 4),
  87: [21, 21, 21, 24],
  90: [21, 21, 24, 24],
  93: [21, 24, 24, 24],
  96: r(24, 4),
  99: [18, 18, 21, 21, 21],
  102: [18, 21, 21, 21, 21],
  105: r(21, 5),
  108: [...r(21, 4), 24],
  111: [...r(21, 3), 24, 24],
  114: [21, 21, ...r(24, 3)],
  117: [21, ...r(24, 4)],
  120: r(24, 5),
  123: [18, ...r(21, 5)],
  126: r(21, 6),
  129: [...r(21, 5), 24],
  132: [...r(21, 4), 24, 24],
  135: [...r(21, 3), ...r(24, 3)],
  138: [21, 21, ...r(24, 4)],
  141: [21, ...r(24, 5)],
  144: r(24, 6),
  147: r(21, 7),
  150: [...r(21, 6), 24],
  153: [...r(21, 5), 24, 24],
  156: [...r(21, 4), ...r(24, 3)],
  159: [...r(21, 3), ...r(24, 4)],
  162: [21, 21, ...r(24, 5)],
  165: [21, ...r(24, 6)],
  168: r(24, 7),
  171: [...r(21, 7), 24],
  174: [...r(21, 6), 24, 24],
  177: [...r(21, 5), ...r(24, 3)],
  180: [...r(21, 4), ...r(24, 4)],
  183: [...r(21, 3), ...r(24, 5)],
  186: [21, 21, ...r(24, 6)],
  189: [21, ...r(24, 7)],
  192: r(24, 8),
  195: [...r(21, 7), 24, 24],
  198: [...r(21, 6), ...r(24, 3)],
  201: [...r(21, 5), ...r(24, 4)],
  204: [...r(21, 4), ...r(24, 5)],
};

/**
 * The industrial series' ribbed doors (520 to 525S): the energy stack with
 * 19.375" sections where its 18s are, as Clopay's chart prints them — which
 * leaves the 8'3", 8'6" and 10'3" doors a touch under their height on paper.
 */
export const INDUSTRIAL_STACK: Record<number, readonly number[]> = {
  ...ENERGY_STACK,
  99: [19.375, 19.375, 19.375, 19.375, 21],
  102: [19.375, 19.375, 21, 21, 21],
  123: [19.375, 19.375, 21, 21, 21, 21],
};

/** The Classic Steel doors' sections, top to bottom; null off the chart. */
export function classicStack(heightFt: number, heightIn = 0): readonly number[] | null {
  return CLASSIC_STACK[heightFt * 12 + heightIn] ?? null;
}

/**
 * The stack with the windows' row a 21" section (Brandon, 22/10/2026: the
 * stock glass sections come 21" only). Where the chart gives the row an 18"
 * and the top a 21", the two trade places — the windows take the 21" and a
 * solid 18" goes on top: an 8'0" x 6'6" 4050 with its windows in the third
 * section stacks 18-21-18-21 instead of the chart's 21-18-18-21. A stack with
 * no 21" to give (7'6", 9'0" — all 18s on the chart) is left as the chart
 * has it; those two heights are floored solid only (stock-colors.ts), so
 * no stock door draws that way. Rows are numbered from the floor up; the
 * stack runs top to bottom.
 */
export function glazedStack(stack: readonly number[], row: number): readonly number[] {
  const i = stack.length - Math.trunc(row);
  if (i <= 0 || i >= stack.length || stack[i] !== 18 || stack[0] !== 21) return stack;
  const out = [...stack];
  out[0] = 18; out[i] = 21;
  return out;
}

/** The Gallery Steel 3 layer doors' sections, top to bottom; null off the chart. */
export function galleryStack(heightFt: number, heightIn = 0): readonly number[] | null {
  return GALLERY_STACK[heightFt * 12 + heightIn] ?? null;
}

/** The models the Gallery Steel 3 layer chart stacks. */
export const GALLERY_STACK_MODELS: ReadonlySet<string> = new Set(["GD1SP", "GD1LP", "GD1SU", "GD1LU", "GD2SP", "GD2LP", "GD2SU", "GD2LU"]);

/**
 * The Gallery doors' windows across, by width and window (the chart's
 * PANELS/WINDOWS WIDE): short windows 3 to 10, long 2 to 5.
 */
export function galleryPanelsWide(widthFt: number, widthIn: number, long: boolean): number | null {
  const w = widthFt * 12 + widthIn;
  if (long) return w < 92 ? null : w <= 136 ? 2 : w <= 176 ? 3 : w <= 228 ? 4 : w <= 240 ? 5 : null;
  return w < 74 ? null : w <= 90 ? 3 : w <= 136 ? 4 : w <= 176 ? 6 : w <= 228 ? 8 : w <= 240 ? 10 : null;
}

/** The models the Classic Steel chart stacks, as the stock tab names them. */
export const CLASSIC_STACK_MODELS: ReadonlySet<string> = new Set(["9200", "9203", "9130", "9133", "4300", "4310", "4050", "4051", "4053", "T52S", "T52L", "T50S", "T50L"]);

/** A commercial door's sections, top to bottom, by model family; null off the chart or for a model with none. */
export function commercialStack(model: string, heightFt: number, heightIn = 0): readonly number[] | null {
  const inches = heightFt * 12 + heightIn;
  if (/^(3150|3200|3220)$/.test(model)) return ENERGY_STACK[inches] ?? null;
  if (/^52[0-5][VS]?$/.test(model)) return INDUSTRIAL_STACK[inches] ?? null;
  return null;
}

/**
 * The Classic Steel doors' windows across, by width and window (the chart's
 * PANELS/WINDOWS WIDE): short windows 3 to 10, long 2 to 5.
 */
export function classicPanelsWide(widthFt: number, widthIn: number, long: boolean): number | null {
  const w = widthFt * 12 + widthIn;
  if (long) return w < 96 ? null : w <= 134 ? 2 : w <= 178 ? 3 : w <= 226 ? 4 : w <= 242 ? 5 : null;
  return w < 74 ? null : w <= 94 ? 3 : w <= 118 ? 4 : w <= 142 ? 5 : w <= 166 ? 6 : w <= 190 ? 7 : w <= 226 ? 8 : w <= 238 ? 9 : w <= 242 ? 10 : null;
}

/** "third", "fourth" — a section's number as the commercial line has always said it. */
export function sectionOrdinal(n: number): string {
  const i = Math.trunc(n);
  const word = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"][i - 1];
  return word ?? `${i}th`;
}
