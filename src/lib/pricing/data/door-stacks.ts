/**
 * How a door stacks — its sections top to bottom, each to its height — off
 * Clopay's section stacking charts, for the door drawings on the stock tabs
 * (Brandon, 22/10/2026):
 *
 *   CLASSIC      Residential Door Stacking & Panel Configurations, Classic
 *                Steel (page 7): the 9200/9203, 9130/9133, 4300/4310, 4050/
 *                4053, T52S/T52L and T50S/T50L and their variants — 18" and
 *                21" sections, 6'0" to 16'0" (7'3" is not built).
 *   GALLERY      Gallery Steel, 3 layer (page 8): the GD1SP/GD1LP, GD1SU/
 *                GD1LU, GD2SP/GD2LP and GD2SU/GD2LU — 18", 21" and 24"
 *                sections, 6'0" to 16'0". The Gallery 1 and 2 layer chart
 *                (page 9, GD4/GD5) and the Bridgeport Steel 3 layer chart
 *                (page 10, BD1/BD2) are the same stacks, section for section.
 *   COACHMAN     Coachman designs 11 to 23 (page 24) — 18", 21" and 24"
 *                sections, 6'0" to 16'0"; designs 31 and up are built solid.
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
  111: [21, ...r(18, 5)],
  114: [21, ...r(18, 4), 21],
  117: [21, ...r(18, 3), 21, 21],
  120: [21, 18, 18, ...r(21, 3)],
  123: [21, 18, ...r(21, 4)],
  126: r(21, 6),
  129: [21, ...r(18, 6)],
  132: [21, ...r(18, 5), 21],
  135: [21, ...r(18, 4), 21, 21],
  138: [21, ...r(18, 3), ...r(21, 3)],
  141: [21, 18, 18, ...r(21, 4)],
  144: [21, 18, ...r(21, 5)],
  147: r(21, 7),
  150: [21, ...r(18, 6), 21],
  153: [21, ...r(18, 5), 21, 21],
  156: [21, ...r(18, 4), ...r(21, 3)],
  159: [21, ...r(18, 3), ...r(21, 4)],
  162: [21, 18, 18, ...r(21, 5)],
  165: [21, 18, ...r(21, 6)],
  168: r(21, 8),
  171: [21, ...r(18, 6), 21, 21],
  174: [21, ...r(18, 5), ...r(21, 3)],
  177: [21, ...r(18, 4), ...r(21, 4)],
  180: [21, ...r(18, 3), ...r(21, 5)],
  183: [21, 18, 18, ...r(21, 6)],
  186: [21, 18, ...r(21, 7)],
  189: r(21, 9),
  192: [21, ...r(18, 6), ...r(21, 3)],
};

/** Section heights top to bottom, by door height in inches: the Coachman, designs 11 to 23. */
export const COACHMAN_STACK: Record<number, readonly number[]> = {
  72: r(24, 3),
  75: [21, 18, 18, 18],
  78: [24, 18, 18, 18],
  81: [24, 18, 21, 18],
  84: [24, 18, 24, 18],
  87: [24, 21, 21, 21],
  90: [24, 24, 18, 24],
  93: [24, 24, 21, 24],
  96: r(24, 4),
  99: [24, 18, 18, 18, 21],
  102: [24, 18, 21, 21, 18],
  105: [24, 21, 18, 18, 24],
  108: [24, 24, 18, 18, 24],
  111: [24, 21, 21, 21, 24],
  114: [24, 24, 21, 21, 24],
  117: [24, 24, 21, 24, 24],
  120: r(24, 5),
  123: [24, 18, 18, 21, 18, 24],
  126: [24, 18, 18, 24, 18, 24],
  129: [24, 18, 21, 18, 24, 24],
  132: [24, 18, 24, 18, 24, 24],
  135: [24, 18, 24, 21, 24, 24],
  138: [24, 18, ...r(24, 4)],
  141: [24, 21, ...r(24, 4)],
  144: r(24, 6),
  147: [24, 18, 21, 18, 24, 18, 24],
  150: [24, 18, 24, 18, 24, 18, 24],
  153: [24, 18, 21, 18, 24, 24, 24],
  156: [24, 18, 24, 18, 24, 24, 24],
  159: [24, 18, 24, 21, 24, 24, 24],
  162: [24, 18, ...r(24, 5)],
  165: [24, 21, ...r(24, 5)],
  168: r(24, 7),
  171: [24, 18, 21, 18, 24, 18, 24, 24],
  174: [24, 18, 24, 18, 24, 18, 24, 24],
  177: [24, 18, 21, 18, 24, 24, 24, 24],
  180: [24, 18, 24, 18, 24, 24, 24, 24],
  183: [24, 18, 24, 21, 24, 24, 24, 24],
  186: [24, 18, ...r(24, 6)],
  189: [24, 21, ...r(24, 6)],
  192: r(24, 8),
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

/** The models the Classic Steel chart stacks: the Premium and Value Steel doors and their variants. */
export const CLASSIC_STACK_MODELS: ReadonlySet<string> = new Set([
  "9200", "9201", "9202", "9203", "9205", "9130", "9131", "9132", "9133",
  "4300", "4301", "4302", "4305", "4310", "4050", "4051", "4053", "4132",
  "T52S", "T52L", "T50S", "T50L",
]);

/** How a door stacks and takes its windows: by its family. */
export type StackFamily = "classic" | "gallery" | "coachman";

/**
 * The chart a model stacks by: the Premium and Value Steel doors the Classic
 * Steel chart, the Gallery and Bridgeport doors the Gallery chart, the
 * Coachman its own; null for a door with none here (the Modern Steel doors
 * have modern-steel.ts).
 */
export function stackFamily(model: string): StackFamily | null {
  const m = String(model);
  if (CLASSIC_STACK_MODELS.has(m)) return "classic";
  if (/^(GD|GR|BD|BR)\d/.test(m)) return "gallery";
  if (/^C[DG]U?$/.test(m)) return "coachman";
  return null;
}

/** A model's sections, top to bottom, by its family's chart; null off the chart or for a model with none. */
export function doorStack(model: string, heightFt: number, heightIn = 0): readonly number[] | null {
  const inches = heightFt * 12 + heightIn;
  switch (stackFamily(model)) {
    case "classic": return CLASSIC_STACK[inches] ?? null;
    case "gallery": return GALLERY_STACK[inches] ?? null;
    case "coachman": return COACHMAN_STACK[inches] ?? null;
    default: return null;
  }
}

/** The Coachman's windows across, by width (the chart's PANELS/WINDOWS WIDE): 2, 3 or 4. */
export function coachmanWindowsWide(widthFt: number, widthIn: number): number | null {
  const w = widthFt * 12 + widthIn;
  return w < 74 ? null : w <= 118 ? 2 : w <= 190 ? 3 : w <= 240 ? 4 : null;
}

/** A model's windows across, by its family's chart: `long` for a long window (a 42" one, or a long insert). */
export function windowsWide(model: string, widthFt: number, widthIn: number, long: boolean): number | null {
  switch (stackFamily(model)) {
    case "classic": return classicPanelsWide(widthFt, widthIn, long);
    case "gallery": return galleryPanelsWide(widthFt, widthIn, long);
    case "coachman": return coachmanWindowsWide(widthFt, widthIn);
    default: return null;
  }
}

/** True where the windows may go in the top section or the one under it (the Premium and Value Steel doors); elsewhere the top section alone. */
export function rowsPickable(model: string): boolean {
  return stackFamily(model) === "classic";
}

/**
 * The stock 8'0" Gallery door is a five-section door — "5 PANEL DESIGN" on
 * its line (Brandon, 22/10/2026) — stacked 21-18-18-18-21 where the chart
 * has four 24s; every other stock Gallery height is the chart's.
 */
export function stockGalleryStack(heightFt: number, heightIn = 0): readonly number[] | null {
  if (heightFt * 12 + heightIn === 96) return [21, 18, 18, 18, 21];
  return galleryStack(heightFt, heightIn);
}

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
