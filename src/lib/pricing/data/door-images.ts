// Which picture to draw for a given model and colour.
//
// Two ways a door gets rendered, and the order matters:
//
//   1. A real Clopay render, when one exists for that face and colour.
//      Always preferred — it is their image, not an approximation of it.
//   2. The white base for that face, multiplied by a colour. Used for the
//      painted colours nobody has captured.
//
// Black and every Ultra-Grain finish are image-only. Black is 25 ga steel where
// the painted colours are 27 ga and its render carries surface texture the white
// door does not have; Ultra-Grain is wood grain, which a colour multiply cannot
// invent at all.

/**
 * A door's face. Six stocked models share three of these; the Coachman is
 * one per design (its overlays are the picture) and the Bridgeport one per
 * panel. Every Modern Steel flush door looks the same, and every grooved one
 * (Brandon, 23/10/2026).
 */
export type DoorStyle =
  | "short" | "long" | "flush" | "gallery-short" | "gallery-long"
  | "bridgeport-narrow" | "bridgeport-extended" | "modern-flush" | "modern-grooved" | CoachmanStyle;
export type CoachmanStyle = `coachman-${string}`;

/** The Coachman designs captured as a 16'0" x 7'0" white render (Brandon, 19/10/2026). */
export const COACHMAN_DESIGNS_DRAWN: readonly string[] = ["11", "12", "13", "21", "22", "23", "31", "32", "33", "34", "35", "36", "41", "42", "43"];

/**
 * Face per model. The 4050, 9130, 9200, 4300, T50S and T52S all render
 * identically despite the price book calling some "Short Elegant" and others
 * "Short Traditional".
 */
const STYLE_OF: Record<string, DoorStyle> = {
  "4050": "short", "9130": "short", "9200": "short", "4300": "short",
  T50S: "short", T52S: "short",
  "4053": "long", "9133": "long", "9203": "long", "4310": "long", T50L: "long", T52L: "long",
  "4051": "flush", "9131": "flush", "9201": "flush", "4301": "flush",
  "9202": "modern-flush", "9132": "modern-flush", "4302": "modern-flush", "4132": "modern-flush",
  "9208": "modern-flush", "9138": "modern-flush", "4308": "modern-flush", "4138": "modern-flush",
  "9205": "modern-grooved", "4305": "modern-grooved", "9209": "modern-grooved", "9139": "modern-grooved", "4309": "modern-grooved",
  // The Gallery pairs all wear the same face; the number is the construction.
  GD1SP: "gallery-short", GD2SP: "gallery-short", GD1SU: "gallery-short", GD2SU: "gallery-short",
  GD1LP: "gallery-long", GD2LP: "gallery-long", GD1LU: "gallery-long", GD2LU: "gallery-long",
  // Bridgeport Steel (19/10/2026): the N designs narrow, the E extended. The C (inlay) designs have no capture.
  BD1NU: "bridgeport-narrow", BD2NU: "bridgeport-narrow",
  BD1EU: "bridgeport-extended", BD2EU: "bridgeport-extended",
};

/** Colour name as the catalogue writes it -> the key used in a filename. */
const COLOUR_KEY: Record<string, string> = {
  White: "white", "Standard White": "white",
  Almond: "almond", Sandtone: "sandtone", "Desert Tan": "desert-tan",
  "Chocolate Brown": "chocolate", Chocolate: "chocolate",
  Bronze: "bronze", Black: "black",
  "Mocha Brown": "mocha", Charcoal: "charcoal", "Iron Ore": "iron-ore", "Hunter Green": "hunter-green",
  "Ultra-Grain Classic Medium Finish": "ug-classic-medium",
  "Ultra-Grain Classic Cherry Finish": "ug-classic-cherry",
  "Ultra-Grain Classic Walnut Finish": "ug-classic-walnut",
  "Ultra-Grain Oak Medium Finish": "ug-oak-medium",
  "Ultra-Grain Oak Dark Finish": "ug-oak-dark",
  "Ultra-Grain Oak Walnut Finish": "ug-oak-walnut",
  "Ultra-Grain Oak Slate Finish": "ug-oak-slate",
  "Lustra Black": "lustra-black", "Lustra Charcoal": "lustra-charcoal", "Lustra Silver": "lustra-silver",
  "Ultra-Grain Cypress Medium Finish": "ug-cypress-medium",
  "Ultra-Grain Cypress Cherry Finish": "ug-cypress-cherry",
  "Ultra-Grain Cypress Walnut Finish": "ug-cypress-walnut",
  "Ultra-Grain Cypress Slate Finish": "ug-cypress-slate",
  "Ultra-Grain Plank Coastal Gray Finish": "ug-plank-coastal-gray",
  "Ultra-Grain Plank Natural Finish": "ug-plank-natural",
  "Ultra-Grain Plank Cedar Finish": "ug-plank-cedar",
  "Ultra-Grain Plank Kona Finish": "ug-plank-kona",
  "Ultra-Grain Plank Barnwood Finish": "ug-plank-barnwood",
  "Ultra-Grain Plank Espresso Finish": "ug-plank-espresso",
};

/** The Modern Steel faces Brandon captured (16'0" x 7'0", 23/10/2026), by colour. */
const MODERN_FLUSH = ["white", "almond", "black", "desert-tan", "iron-ore", "sandtone", "lustra-black", "lustra-charcoal",
  "lustra-silver", "ug-cypress-medium", "ug-cypress-cherry", "ug-cypress-walnut", "ug-cypress-slate", "ug-plank-cedar",
  "ug-plank-coastal-gray", "ug-plank-espresso", "ug-plank-kona", "ug-plank-natural", "ug-plank-barnwood"];
const MODERN_GROOVED = ["white", "almond", "black", "bronze", "charcoal", "chocolate", "desert-tan", "iron-ore", "mocha",
  "sandtone", "lustra-black", "lustra-charcoal", "lustra-silver", "ug-cypress-medium", "ug-cypress-cherry",
  "ug-cypress-walnut", "ug-cypress-slate"];

/** Every base image shipped in public/doors. */
const HAVE = new Set<string>([
  "bridgeport-narrow--white", "bridgeport-extended--white",
  ...COACHMAN_DESIGNS_DRAWN.map((d) => `coachman-${d}--white`),
  "short--white", "short--almond", "short--sandtone", "short--desert-tan",
  "short--chocolate", "short--bronze", "short--black",
  "short--ug-classic-medium", "short--ug-classic-cherry", "short--ug-classic-walnut",
  "long--white", "long--black",
  "long--ug-classic-medium", "long--ug-classic-cherry", "long--ug-classic-walnut",
  "flush--white", "flush--black",
  "gallery-short--white", "gallery-short--black",
  "gallery-short--ug-oak-medium", "gallery-short--ug-oak-dark",
  "gallery-short--ug-oak-walnut", "gallery-short--ug-oak-slate",
  "gallery-long--white", "gallery-long--black",
  "gallery-long--ug-oak-medium", "gallery-long--ug-oak-dark",
  "gallery-long--ug-oak-walnut", "gallery-long--ug-oak-slate",
  ...MODERN_FLUSH.map((c) => `modern-flush--${c}`),
  ...MODERN_GROOVED.map((c) => `modern-grooved--${c}`),
]);

/**
 * Tint targets, fitted against Clopay's own renders of the same door: each
 * solved for by least squares so that white base x colour reproduces the
 * render. Mocha Brown, Charcoal, Iron Ore and Hunter Green from Brandon's
 * 16'0" captures of 23/10/2026.
 */
const TINT: Record<string, [number, number, number]> = {
  almond: [222, 216, 201],
  sandtone: [172, 158, 142],
  "desert-tan": [183, 179, 158],
  chocolate: [48, 32, 16],
  bronze: [92, 84, 78],
  mocha: [55, 48, 41],
  charcoal: [94, 94, 91],
  "iron-ore": [59, 59, 57],
  "hunter-green": [30, 55, 41],
};

/** The mid-tone each white base sits at, used as the tint divisor. */
export function baseRef(style: DoorStyle): number {
  if (style.startsWith("gallery")) return 232;
  if (style === "bridgeport-narrow") return 206;
  if (style === "bridgeport-extended") return 209;
  if (style.startsWith("coachman")) return 213;
  if (style === "modern-grooved") return 214;
  return 216;
}

/**
 * What a window's frame is painted on a door Clopay rendered in a colour of
 * its own: the strips were captured on the white door, and Clopay paints the
 * frames to match. The painted colours take their tint target; Black the
 * black door's own surface. A grain or a texture (Ultra-Grain, Lustra) has
 * no flat colour, so it returns null: its frames take the face under them.
 */
const BLACK_FRAME: [number, number, number] = [26, 26, 26];
export function frameTint(colour: string): [number, number, number] | null {
  const ckey = COLOUR_KEY[colour];
  if (!ckey) return null;
  if (ckey === "black") return BLACK_FRAME;
  return TINT[ckey] ?? null;
}
/** True when a strip on this colour's own render needs its frame painted — every colour but white. */
export function frameTintNeeded(colour: string): boolean {
  return COLOUR_KEY[colour] !== undefined && COLOUR_KEY[colour] !== "white";
}

export type DoorArt =
  | { kind: "image"; src: string; style: DoorStyle }
  | { kind: "tint"; src: string; style: DoorStyle; rgb: [number, number, number] };

/**
 * Face for a model, or null if it is not one we draw. The Coachman (model CD)
 * is drawn per design — "12" for Design 12 — and only the designs captured.
 */
export function styleOf(model: string, design?: string): DoorStyle | null {
  // the Coachman — CD, CG and CGU — wear the same face, design by design
  if (/^C[DG]U?$/.test(model)) return design && COACHMAN_DESIGNS_DRAWN.includes(design) ? `coachman-${design}` : null;
  return STYLE_OF[model] ?? null;
}

/**
 * What to draw for a model in a colour, or null when we cannot draw it. A
 * door shown in the wrong colour is worse than no picture, so an unknown
 * colour declines rather than falling back to white.
 */
export function doorArt(model: string, colour: string, design?: string): DoorArt | null {
  const style = styleOf(model, design);
  const ckey = COLOUR_KEY[colour];
  if (!style || !ckey) return null;
  const key = `${style}--${ckey}`;
  if (HAVE.has(key)) return { kind: "image", src: `/doors/${key}.webp`, style };
  const rgb = TINT[ckey];
  const base = `${style}--white`;
  if (rgb && HAVE.has(base)) return { kind: "tint", src: `/doors/${base}.webp`, style, rgb };
  return null;
}

/** True for an Ultra-Grain or Lustra finish: a grain or a texture no paint colour stands for — a window's frames take it from the face. */
export function isWoodGrain(colour: string): boolean {
  return /^(ug|lustra)-/.test(COLOUR_KEY[colour] ?? "");
}

/**
 * True for an Ultra-Grain finish, whose window frames Clopay draws in one
 * flat wood tone rather than the grain (Brandon's captures, 23/10/2026: the
 * 9200 16x7 in Classic Medium, the Modern Steel in Cypress Walnut). A Lustra
 * frame keeps its texture.
 */
export function isUltraGrain(colour: string): boolean {
  return /^ug-/.test(COLOUR_KEY[colour] ?? "");
}

/**
 * The window a Modern Steel door's drawing places, as the picture's key, by
 * the framing's value (modern-steel.ts): the 16" windows and their grilles,
 * the slim window in its black or silver frame.
 */
export function modernWindowKey(framing: string | undefined | null): string | null {
  const map: Record<string, string> = {
    short: "PS16", long: "PL16", "short_grilles:REC12": "REC12", "long_grilles:REC14": "REC14",
    "short_grilles:SQ22": "SQ22", "long_grilles:SQ24": "SQ24", "slim:black": "SLIMBLACK", "slim:silver": "SLIMSILVER",
  };
  return framing ? map[framing] ?? "" : null;
}

/**
 * The window a door is drawn with, as the picture's design key, or null for
 * a solid door; "" when the door has windows the picture cannot name.
 *
 *   - an insert or a window by design: the design id; the architectural Plain Long and Plain Short
 *     are the 16" windows (PL16, PS16).
 *   - plain glass: by the window's order name — PLAIN SHORT 19-1/2" X 12" is
 *     PS12, PLAIN LONG 40-1/2" X 12" PL12, the 16" ones PS16 and PL16, an
 *     arch by its number and grille (ARCH 1, Arch 2, Arch 2 Grille); no name is the door's own window (the short on a
 *     Premium or Value Steel door, the long on a Gallery or Bridgeport).
 */
export function windowKey(style: string, design: string | undefined | null, plainWindow: string | undefined | null, model: string): string | null {
  // An insert, or a window named by its design (the architectural windows on a special order).
  if (style === "inserts" || (style === "glass" && design)) {
    if (!design) return "";
    return design === "PLAINLONG" ? "PL16" : design === "PLAINSHORT" ? "PS16" : design;
  }
  if (style !== "glass") return null;
  const w = (plainWindow ?? "").toUpperCase().trim();
  if (!w || w === "PLAIN" || w === "GLAZED") return /^(GD|BD)/.test(model) ? "PL16" : "PS12";
  const arch = /\bARCH\s*([123])\b/.exec(w);
  if (arch) return `ARCH${arch[1]}${/\bVERT/.test(w) ? "VERT" : /\bGRILLE/.test(w) ? "GRILLE" : "PLAIN"}`;
  const sixteen = /X\s*16"?\s*$/.test(w) || /42"?\s*X/.test(w);
  if (/\bLONG\b/.test(w)) return sixteen ? "PL16" : "PL12";
  if (/\bSHORT\b/.test(w)) return sixteen ? "PS16" : "PS12";
  return "";
}
