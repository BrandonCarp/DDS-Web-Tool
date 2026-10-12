/**
 * The designs a door comes in, and its second colour — the Coachman's overlay
 * and the Bridgeport Inlay's inlay (Brandon, 12/10/2026, from Clopay's
 * brochures). A door with designs asks for one after its size; the second
 * colour sits under the colour and follows it until one is picked.
 *
 * Coachman (model CD), from the size availability table:
 *
 *   Series 1  11, 12, 13       Series 3  31, 32, 33, 34, 35, 36
 *   Series 2  21, 22, 23       Series 4  41, 42, 43
 *
 *   Widths: 6'2", 6'4", 7'0", 7'2", 7'6", 7'8", 8'0", 8'2", 8'6", 9'0", 9'2",
 *   10'0", 12'0", 12'2", 13'0", 13'8", 14'0", 14'2", 15'0", 15'2", 15'6",
 *   15'8", 16'0", 16'2", 17'0", 18'0", 18'2" — designs 22, 23, 34 and 35 less
 *   12'0", 12'2", 13'0" and 13'8". (The CG and CGU add 19'0", and 20'0" on
 *   the designs built at 12'; neither is gridded here.)
 *
 *   Heights: series 1, 3 and 4 from 6'0" to 16'0" in 3" steps; design 21 from
 *   6'0" to 8'0" in 3" steps then 8'6", 9'0", 9'6" and 10'0"; designs 22 and
 *   23 from 6'0" to 10'0" in 3" steps. CJ's sheet prices 7' to 10', so that is
 *   what the configurator offers.
 *
 *   Series 3 and 4 are not built with windows (Clopay's book: "Designs
 *   beginning with a 3 or 4 not available with windows"). The overlay comes in
 *   the door's four colours, any pairing, at no adder.
 *
 * Bridgeport Inlay (BD1CU, BD2CU): designs A, V and X, at every size the door
 * is built in. The inlay comes in the door's paint colours and the four oak
 * finishes (Clopay's inlay colour list — Brandon, 12/10/2026); a door is
 * priced at the dearer of its two colours (a premium inlay carries the adder,
 * an oak inlay the Ultra-Grain one).
 */
export const COACHMAN_DESIGNS = ["11", "12", "13", "21", "22", "23", "31", "32", "33", "34", "35", "36", "41", "42", "43"] as const;
export const BRIDGEPORT_INLAY_DESIGNS = ["A", "V", "X"] as const;

const COACHMAN = "CD";
const INLAY = new Set(["BD1CU", "BD2CU"]);

/** The designs a group comes in; empty for a door with none to choose. */
export function designsFor(group: string): readonly string[] {
  if (group === COACHMAN) return COACHMAN_DESIGNS;
  if (INLAY.has(group)) return BRIDGEPORT_INLAY_DESIGNS;
  return [];
}

export const hasDesigns = (group: string): boolean => designsFor(group).length > 0;

/** The designs the CD is not built in at 12'0", 12'2", 13'0" and 13'8". */
const NARROWER = new Set<string>(["22", "23", "34", "35"]);
const NOT_AT = new Set<string>(["12", "12.2", "13", "13.8"]);

const inches = (key: string): number => {
  const [ft, inch] = key.split(".");
  return Number(ft) * 12 + Number(inch ?? 0);
};

export const coachmanSeries = (design: string): number => Number(design.charAt(0));

/** True when Clopay builds the Coachman design at the width (any width while none is chosen). */
export function coachmanDesignAtWidth(design: string, width: string): boolean {
  if (!width) return true;
  return !(NARROWER.has(design) && NOT_AT.has(width));
}

/** True when Clopay builds the Coachman design at the height (any height while none is chosen). */
export function coachmanDesignAtHeight(design: string, height: string): boolean {
  if (!height) return true;
  const h = inches(height);
  if (design === "21") return h <= 96 || ["8.6", "9", "9.6", "10"].includes(height);
  if (coachmanSeries(design) === 2) return h <= 120;
  return h <= 192;
}

/** True when Clopay builds the design at the size. */
export function designBuilt(group: string, design: string, width: string, height: string): boolean {
  if (!designsFor(group).includes(design)) return false;
  if (group === COACHMAN) return coachmanDesignAtWidth(design, width) && coachmanDesignAtHeight(design, height);
  return true;
}

/** The designs built at a size, in Clopay's order. */
export function designsBuilt(group: string, width: string, height: string): string[] {
  return designsFor(group).filter((d) => designBuilt(group, d, width, height));
}

/** The Coachman's series 1 and 2 take windows; series 3 and 4 are solid only. Every inlay design does. */
export function designTakesWindows(group: string, design: string): boolean {
  if (!design || group !== COACHMAN) return true;
  return coachmanSeries(design) <= 2;
}

/** "Design 12", "Design A" — on the drop-down and the line. */
export const designLabel = (design: string): string => `Design ${design}`;

/** The Coachman's overlay colours: the door's four, any pairing. */
export const COACHMAN_OVERLAY_COLORS = ["White", "Almond", "Desert Tan", "Sandtone"] as const;

/** What a group's second colour is called — the overlay, the inlay — or null where there is none. */
export function secondColorName(group: string): "overlay" | "inlay" | null {
  if (group === COACHMAN) return "overlay";
  if (INLAY.has(group)) return "inlay";
  return null;
}

/** The oak inlay finishes, each priced as the door's matching Ultra-Grain finish. */
export const INLAY_OAKS: Record<string, string> = {
  "Medium Oak": "Ultra-Grain Oak Medium Finish",
  "Dark Oak": "Ultra-Grain Oak Dark Finish",
  "Walnut Oak": "Ultra-Grain Oak Walnut Finish",
  "Slate Oak": "Ultra-Grain Oak Slate Finish",
};

/**
 * The colours the second colour is offered in: the Coachman's four; an inlay
 * in any of the door's paint colours, then the four oaks (the door's own
 * Ultra-Grain names are not inlay colours).
 */
export function secondColors(group: string, doorColors: readonly string[]): string[] {
  if (group === COACHMAN) return [...COACHMAN_OVERLAY_COLORS];
  if (INLAY.has(group)) return [...doorColors.filter((c) => !/Ultra-Grain/i.test(c)), ...Object.keys(INLAY_OAKS)];
  return [];
}

/** The door colour a second colour is priced as: an oak inlay as its Ultra-Grain finish, anything else as itself. */
export function secondColorPricedAs(color: string): string {
  return INLAY_OAKS[color] ?? color;
}
