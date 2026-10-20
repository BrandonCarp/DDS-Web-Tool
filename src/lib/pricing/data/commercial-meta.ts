// Client-safe commercial metadata (option lists + per-foot rates shown in the UI).
// Ported from the production single-file tool. Sell matrices stay server-side.

export const COMM_COMPLETE_MODELS: Record<string, string[]> = {
  "Clopay": [
    "3200",
    "524"
  ]
};
export const COMM_SECTION_MODELS: Record<string, string[]> = {
  "Clopay": [
    "524",
    "524V",
    "524S",
    "3150",
    "3717",
    "3200",
    "3720"
  ],
  "Wayne Dalton": [
    "2415",
    "2415V",
    "2415S",
    "TS125",
    "TS150",
    "TS200"
  ],
  "Overhead": [
    "591",
    "592",
    "593"
  ],
  "Amarr": [
    "2742"
  ]
};
export const COMM_STD_SIZES: string[] = [
  "8.2",
  "9.2",
  "10.2",
  "12.2",
  "14.2",
  "16.2"
];
export const COMM_MATRIX_SIZES: Record<string, string[]> = {
  "3200": [
    "8′2″ × 8′0″",
    "8′2″ × 9′0″",
    "8′2″ × 10′0″",
    "8′2″ × 12′0″",
    "8′2″ × 14′0″",
    "8′2″ × 16′0″",
    "9′2″ × 8′0″",
    "9′2″ × 9′0″",
    "9′2″ × 10′0″",
    "9′2″ × 12′0″",
    "9′2″ × 14′0″",
    "9′2″ × 16′0″",
    "10′2″ × 8′0″",
    "10′2″ × 9′0″",
    "10′2″ × 10′0″",
    "10′2″ × 12′0″",
    "10′2″ × 14′0″",
    "10′2″ × 16′0″",
    "12′2″ × 8′0″",
    "12′2″ × 9′0″",
    "12′2″ × 10′0″",
    "12′2″ × 12′0″",
    "12′2″ × 14′0″",
    "12′2″ × 16′0″",
    "14′2″ × 8′0″",
    "14′2″ × 9′0″",
    "14′2″ × 10′0″",
    "14′2″ × 12′0″",
    "14′2″ × 14′0″",
    "14′2″ × 16′0″"
  ],
  "524": [
    "8′2″ × 8′0″",
    "8′2″ × 9′0″",
    "8′2″ × 10′0″",
    "8′2″ × 12′0″",
    "8′2″ × 14′0″",
    "8′2″ × 16′0″",
    "9′2″ × 8′0″",
    "9′2″ × 9′0″",
    "9′2″ × 10′0″",
    "9′2″ × 12′0″",
    "9′2″ × 14′0″",
    "9′2″ × 16′0″",
    "10′2″ × 8′0″",
    "10′2″ × 9′0″",
    "10′2″ × 10′0″",
    "10′2″ × 12′0″",
    "10′2″ × 14′0″",
    "10′2″ × 16′0″",
    "12′2″ × 8′0″",
    "12′2″ × 9′0″",
    "12′2″ × 10′0″",
    "12′2″ × 12′0″",
    "12′2″ × 14′0″",
    "12′2″ × 16′0″"
  ]
};
export const COMM_SECTION_WIDTHS: Record<string, string[]> = {
  "524": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "524V": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "524S": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3200": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3720": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3717": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3150": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ]
};
/**
 * Models whose replacement sections are stocked in fixed widths only (sell
 * prices live in COMM_SECTION_STOCK). Mirrored here so the UI can show the
 * stile selector and the right hint without importing the price data.
 */
export const STOCK_SECTION_WIDTHS: Record<string, string[]> = {
  "3200": ["8.2", "9.2", "10.2", "12.2"],
};

/** "8.2" -> 8\u20322\u2033 for hints and messages. */
export function sectionWidthLabel(key: string): string {
  const [ft, inch] = key.split(".");
  return `${ft}\u2032${inch && inch !== "0" ? inch + "\u2033" : ""}`;
}

export const SLAB_RATE: Record<string, number> = {
  "591": 49.5,
  "592": 54.5,
  "593": 48.5,
  "TS125": 33.5,
  "TS150": 37.5,
  "TS200": 44.5,
  "2415": 29,
  "2415V": 37,
  "2415S": 40.75,
  "2742": 41.5,
  "524": 29.0,
  "524V": 37.0,
  "524S": 40.75
};
export const SLAB_LABEL: Record<string, string> = {
  "591": "1-5/8″",
  "592": "2″",
  "593": "1-3/8″",
  "TS125": "1″",
  "TS150": "1-1/2″",
  "TS200": "2″",
  "2415": "2″ non-insulated",
  "2415V": "2″ vinyl backer",
  "2415S": "2″ steel backer",
  "2742": "2″",
  "524": "2″ non-insulated",
  "524V": "2″ vinyl backer",
  "524S": "2″ steel backer"
};
export const SLAB_ADDERS = {
  "retainer": 3.75,
  "stile_single": 20,
  "stile_double": 50,
  "window": 150
} as const;

export const COMM_COMPLETE = new Set(["3200", "524"]); // models with full-door matrix pricing

export function commMfrs(): string[] {
  return [...new Set([...Object.keys(COMM_COMPLETE_MODELS), ...Object.keys(COMM_SECTION_MODELS)])];
}
export function commModelsFor(mfr: string): string[] {
  return [...new Set([...(COMM_COMPLETE_MODELS[mfr] ?? []), ...(COMM_SECTION_MODELS[mfr] ?? [])])];
}
/**
 * A section's panels, and the stiles between them, by width — CJ's RIBBED
 * SECTIONS sheet (15/10/2026): up to 9'2" two panels and one stile, 9'3" to
 * 13'2" three and two, 13'3" to 16'2" four and three, 16'3" to 20'2" five and
 * four, 20'3" to 24'2" six and five, 24'3" and up seven and six. A window goes
 * in a panel, so the panels are the most windows a section takes (it had been
 * 2 / 3 / 4 / 5 by rounded feet, which agrees to 20'2").
 */
const PANEL_BANDS: { toIn: number; panels: number }[] = [
  { toIn: 9 * 12 + 2, panels: 2 }, { toIn: 13 * 12 + 2, panels: 3 }, { toIn: 16 * 12 + 2, panels: 4 },
  { toIn: 20 * 12 + 2, panels: 5 }, { toIn: 24 * 12 + 2, panels: 6 },
];
export function panelCount(ft: number, inch = 0): number {
  const w = ft * 12 + inch;
  return PANEL_BANDS.find((b) => w <= b.toIn)?.panels ?? 7;
}
/** The most windows a section takes: one a panel. */
export function maxWindows(ft: number, inch = 0): number { return panelCount(ft, inch); }

/**
 * The panels named left to right, as the stile measurements are taken: left
 * and right; left, middle and right; past three, first to seventh from the
 * left.
 */
export function panelNames(panels: number): string[] {
  if (panels <= 2) return ["left", "right"].slice(0, panels);
  if (panels === 3) return ["left", "middle", "right"];
  return ["first", "second", "third", "fourth", "fifth", "sixth", "seventh"].slice(0, panels);
}

/** "a", "a and b", "a, b and c" — or with another separator between the first ones. */
export function joinAnd(items: string[], sep = ", "): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(sep)} and ${items[items.length - 1]}`;
}

/** "in the middle panel", "in the left and right panels", "in the second and fourth panels from the left". */
export function panelsPhrase(panels: number, chosen: number[]): string {
  const names = panelNames(panels);
  const picked = [...new Set(chosen)].filter((n) => n >= 1 && n <= panels).sort((a, b) => a - b).map((n) => names[n - 1]);
  if (!picked.length) return "";
  return `in the ${joinAnd(picked)} ${picked.length === 1 ? "panel" : "panels"}${panels > 3 ? " from the left" : ""}`;
}
export function roundedFeet(ft: number, inch: number): number { return ft + (inch >= 5 ? 1 : 0); }

/**
 * Narrowest width a per-foot slab is billed at.
 *
 * Anything under 8′ is priced as 8′ — Brandon, 10/9/2026. The rate tables
 * multiply out to any width, so a 6′ slab was quoting six feet of material
 * when the shop charges a minimum of eight.
 */
export const SLAB_MIN_FEET = 8;

/** Billable feet for a per-foot slab: rounded up, then floored at the minimum. */
export function slabBilledFeet(ft: number, inch: number): number {
  return Math.max(roundedFeet(ft, inch), SLAB_MIN_FEET);
}

/**
 * Widest section DDS will quote, per model, as total inches.
 *
 * These are ordering limits, not price-book gaps — the per-foot models would
 * happily multiply out to any width, which is how an 8′20″ section slipped
 * through. Confirmed by Brandon 08/2026.
 *
 * Models absent from this table are NOT capped: 2742 (Amarr) and Clopay
 * 3150 / 3717 / 3200 were not specified.
 */
export const SECTION_MAX_WIDTH_IN: Record<string, number> = {
  "524": 28 * 12, "524V": 28 * 12, "524S": 28 * 12,
  "3720": 28 * 12,
  "TS125": 18 * 12 + 4,
  "TS150": 26 * 12,
  "TS200": 28 * 12,
  "591": 28 * 12, "592": 28 * 12, "593": 28 * 12,
  "2415": 28 * 12, "2415V": 28 * 12, "2415S": 28 * 12,
};

/** Human label for a max width, e.g. 220 -> `18′4″`. */
export function maxWidthLabel(totalIn: number): string {
  const ft = Math.floor(totalIn / 12), inch = totalIn % 12;
  return `${ft}′${inch ? inch + "″" : "0″"}`;
}

/**
 * Colours each section model is actually offered in, from the DDS section
 * availability table (08/2026). Same price either way — this governs what the
 * counter may pick and what lands in the description, not cost.
 *
 * T125 and T200 are WHITE ONLY. 591/592/593/2415 are listed WH/CB, treated as
 * White/Brown here. Models absent from this table fall back to White + Brown.
 */
export const SECTION_COLORS: Record<string, ("White" | "Brown")[]> = {
  "524": ["White", "Brown"], "524V": ["White", "Brown"], "524S": ["White", "Brown"],
  "3720": ["White", "Brown"],
  "TS125": ["White"],
  "TS150": ["White", "Brown"],
  "TS200": ["White"],
  "591": ["White", "Brown"], "592": ["White", "Brown"], "593": ["White", "Brown"],
  "2415": ["White", "Brown"], "2415V": ["White", "Brown"], "2415S": ["White", "Brown"],
};

export function sectionColors(model: string): ("White" | "Brown")[] {
  return SECTION_COLORS[model] ?? ["White", "Brown"];
}

/**
 * The window sizes a model's sections take (Brandon, 14/10/2026): the 3200
 * 24x8 or 24x12, the 524 and 2415 families 24x12 or 24x6, listed in the order
 * he gave them. Every other model keeps the one size it always had.
 */
export const SECTION_WINDOW_SIZES: Record<string, readonly string[]> = {
  "3200": ["24x12", "24x8"],
  "524": ["24x12", "24x6"], "524V": ["24x12", "24x6"], "524S": ["24x12", "24x6"],
  "2415": ["24x12", "24x6"], "2415V": ["24x12", "24x6"], "2415S": ["24x12", "24x6"],
};
export function sectionWindowSizes(model: string): readonly string[] {
  return SECTION_WINDOW_SIZES[model] ?? ["24x12"];
}

/**
 * The 524 and 2415 families: the steel ribbed sections, whose stile locations
 * are asked for — one measurement a stile, left to right, as CJ's sheet counts
 * them by width (15/10/2026; from 10'0" only on the 14th). None up to 9'2":
 * the one stile of an 8'2" or 9'2" section is not asked for (Brandon,
 * 16/10/2026).
 */
export const RIBBED_SECTION_MODELS = new Set(["524", "524V", "524S", "2415", "2415V", "2415S"]);
export function stileLocationCount(model: string, ft: number, inch: number): number {
  const panels = RIBBED_SECTION_MODELS.has(model) && ft > 0 ? panelCount(ft, inch) : 0;
  return panels >= 3 ? panels - 1 : 0;
}

/**
 * A complete door's window placement, written the way Clopay's order form
 * has it — GL or SOL a panel, left to right: "GL,GL,GL", "GL,SOL,SOL"
 * (Brandon, 15/10/2026). Every placement with at least one window, all glass
 * first, then by the windows there are, left to right.
 */
export function windowPlacements(panels: number): string[] {
  const n = Math.max(0, Math.min(8, Math.trunc(panels)));
  // A placement is a bit a panel, the left panel the high bit: GL where set.
  const windows = (mask: number) => mask.toString(2).split("1").length - 1;
  const masks = Array.from({ length: (1 << n) - 1 }, (_, i) => i + 1).sort((a, b) => windows(b) - windows(a) || b - a);
  return masks.map((mask) => Array.from({ length: n }, (_, i) => (mask & (1 << (n - 1 - i)) ? "GL" : "SOL")).join(","));
}
/** The panels (1-based, left to right) a placement puts glass in. */
export function placementPanels(placement: string): number[] {
  return placement.split(",").map((x, i) => (x.trim().toUpperCase() === "GL" ? i + 1 : 0)).filter((n) => n > 0);
}
/** The placement of a set of panels across a door of `panels`: "GL,SOL,GL". */
export function placementOf(panels: number, chosen: readonly number[]): string {
  return Array.from({ length: Math.max(0, panels) }, (_, i) => (chosen.includes(i + 1) ? "GL" : "SOL")).join(",");
}

/** The glass a section's windows are, as the dropdown names it: double strength on a non-insulated 524 or 2415, insulated otherwise. */
export function sectionGlassLabel(model: string): string {
  return model === "524" || model === "2415" ? "Double Strength" : "Insulated";
}

/** A stile location's parts: whole inches, then the eighth (15/10/2026; eighths from 20/10/2026). */
export const STILE_FRACTIONS = ["0", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4"] as const;
/** `59"`, `82-1/4"`; blank where no inches are typed. */
export function stileLocationText(inches: string, fraction: string): string {
  const whole = inches.trim();
  if (!whole) return "";
  const frac = (STILE_FRACTIONS as readonly string[]).includes(fraction) && fraction !== "0" ? `-${fraction}` : "";
  return `${whole}${frac}"`;
}
