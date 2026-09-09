// How many panels across and how many sections tall a door is.
//
// Straight from Clopay's Steel Door Window and Panel Specifications, page RS8
// of the residential net price book. These are published rules, not measured
// from pictures — which matters, because measuring three sample doors gave
// three different pixels-per-foot and no derivable pattern.
//
// This is what makes a drawn door correct at a size nobody has photographed.
// An 18'0" x 6'6" comes out with 8 panels across and 4 sections because the
// table says so.
//
// Two things it does NOT cover, both deliberate:
//   - The 24" section models (9202/9205/9132/4302/4305/4132 and the 9208/9209
//     contemporary group) have their own arrangement tables on RS10 and RS11.
//     sectionsTall() returns null for them rather than guessing.
//   - Anything wider than 20' or taller than 12'. Clopay prices to 16' tall but
//     the arrangement table stops at 12'0"; past that we do not know the stack.

/** Panel style as the spec pages name it. */
export type PanelRun = "short" | "long";

/** Total inches from feet and inches. */
function inches(ft: number, inch = 0): number {
  return ft * 12 + inch;
}

/**
 * Panels across, by door width. RS8 PANEL SPECIFICATIONS.
 *
 * Entries are the widest width in each band, since Clopay lists exact widths
 * and everything between takes the next listed size down. Narrow doors below
 * 8'0" are not on RS8; the per-model price pages carry them as 3 short and no
 * long, which is why 7'0" reads 3 rather than 4.
 */
const PANELS_ACROSS: ReadonlyArray<readonly [maxInches: number, short: number, long: number | null]> = [
  [inches(7, 10), 3, null], // 6'2" to 7'10" — long panel not built this narrow
  [inches(9), 4, 2],        // 8', 9'
  [inches(10), 5, 2],
  [inches(12), 6, 3],
  [inches(14), 7, 3],
  [inches(15, 6), 7, 4],    // 15', 15'6"
  [inches(18), 8, 4],       // 16', 17', 18'
  [inches(19), 9, 5],
  [inches(20), 10, 5],
];

/**
 * Sections tall, by door height. RS8 HEIGHT SPECIFICATIONS ARRANGEMENT TABLE.
 *
 * Not height / 21: a 6'0" door is 4 sections of 18" and a 7'0" is 4 of 21".
 * The count changes in bands, and the stack within a band is on RS9.
 */
const SECTIONS_TALL: ReadonlyArray<readonly [maxInches: number, sections: number]> = [
  [inches(7), 4],       // 6'0" to 7'0"
  [inches(8, 9), 5],    // 7'6" to 8'9"
  [inches(10, 6), 6],   // 9'0" to 10'6"
  [inches(12), 7],      // 10'9" to 12'0"
];

/** Models built on 24" sections, which use a different arrangement table. */
const TWENTY_FOUR_INCH = new Set([
  "9202", "9205", "9132", "4302", "4305", "4132",
  "9208", "9209", "9138", "9139", "4308", "4309", "4138",
]);

/**
 * Panels across for a width, or null when the style is not built that narrow.
 *
 * A long-panel door under 7'8" does not exist — the 4053 and 9133 start at
 * 8'0", which is the same restriction the special order configurator enforces.
 */
export function panelsAcross(widthFt: number, widthIn: number, run: PanelRun): number | null {
  const w = inches(widthFt, widthIn);
  for (const [maxIn, short, long] of PANELS_ACROSS) {
    if (w <= maxIn) return run === "short" ? short : long;
  }
  return null; // wider than 20'
}

/** Sections tall for a height, or null when the model or height is off-table. */
export function sectionsTall(heightFt: number, heightIn: number, model?: string): number | null {
  if (model && TWENTY_FOUR_INCH.has(model)) return null;
  const h = inches(heightFt, heightIn);
  for (const [maxIn, sections] of SECTIONS_TALL) {
    if (h <= maxIn) return sections;
  }
  return null; // taller than 12'
}

export interface DoorGeometry {
  panels: number;
  sections: number;
}

/**
 * Everything a renderer needs to draw the door, or null if we cannot say.
 *
 * Returning null is the point. A door drawn with the wrong number of panels is
 * worse than no picture, so anything off the published tables declines rather
 * than approximating.
 */
export function doorGeometry(
  widthFt: number, widthIn: number,
  heightFt: number, heightIn: number,
  run: PanelRun, model?: string,
): DoorGeometry | null {
  const panels = panelsAcross(widthFt, widthIn, run);
  const sections = sectionsTall(heightFt, heightIn, model);
  if (panels === null || sections === null) return null;
  return { panels, sections };
}

/** Panel run for a model, from the price book's Panel column. */
const MODEL_RUN: Record<string, PanelRun> = {
  "4050": "short", "4051": "short", "4053": "long",
  "4300": "short", "4301": "short", "4310": "long",
  "9130": "short", "9131": "short", "9133": "long",
  "9200": "short", "9201": "short", "9203": "long",
  T50S: "short", T50L: "long", T52S: "short", T52L: "long",
  GD1SP: "short", GD1LP: "long",
};

export function panelRunFor(model: string): PanelRun | null {
  return MODEL_RUN[model] ?? null;
}
