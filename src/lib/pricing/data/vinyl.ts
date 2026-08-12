/**
 * Vinyl stop molding — stock lengths, per-foot pricing, and the logic that
 * works out what covers a given door opening.
 *
 * A door takes three pieces: one across the header at the door's WIDTH, and two
 * legs down the sides at the door's HEIGHT. Each piece is filled with the
 * smallest stock length that reaches, and stock lengths differ sharply by
 * colour — white runs 7' to 18' while most colours are 16' only. That means a
 * 12' wide door is one 12' piece in white and a 16' piece in anything else.
 *
 * Pieces are NOT cut down to make two legs out of one long length: a 12'x8' black
 * door bills [1] - 16FT and [2] - 8FT, which is the figure Brandon confirmed
 * off a real order.
 *
 * Price is per LINEAR FOOT, so the QuickBooks line carries the total footage as
 * its quantity and the per-foot figure as its rate.
 */

/** Stock lengths carried per colour, in feet, ascending. */
export const VINYL_STOCK: Record<string, number[]> = {
  WHITE: [7, 8, 9, 10, 12, 16, 18],
  BLACK: [7, 8, 9, 16, 18],
  ALMOND: [7, 8, 9, 16],
  BROWN: [7, 8, 9, 16],
  SANDTONE: [7, 8, 9, 16],
  BRONZE: [16],
  GRAY: [16],
  CHARCOAL: [16],
  "MOCHA BROWN": [16],
  "DESERT TAN": [16],
  "HUNTER GREEN": [16],
  CHERRY: [16],
  "WALNUT FINISH": [16],
  "MEDIUM FINISH": [16],
  "DARK FINISH": [16],
  SLATE: [16],
};

/** Net price per linear foot. */
export const VINYL_PRICE_PER_FT: Record<string, number> = {
  WHITE: 0.95,
  ALMOND: 0.95,
  BROWN: 0.95,
  SANDTONE: 0.95,
  BLACK: 1.95,
  BRONZE: 1.95,
  CHARCOAL: 1.95,
  CHERRY: 1.95,
  "DARK FINISH": 1.95,
  "DESERT TAN": 1.95,
  GRAY: 1.95,
  "HUNTER GREEN": 1.95,
  "MEDIUM FINISH": 1.95,
  "MOCHA BROWN": 1.95,
  SLATE: 1.95,
  "WALNUT FINISH": 1.95,
};

/**
 * Door colour -> the vinyl carried to match it.
 *
 * Glacier White takes plain white molding (there is no glacier vinyl), and
 * Chocolate Brown takes BROWN rather than MOCHA BROWN, which is its own colour.
 * Ultra Grain is absent because the FINISH decides, not the family — see
 * vinylForDoorColor(), which reads the finish word out of the colour name.
 */
export const DOOR_COLOR_TO_VINYL: Record<string, string> = {
  White: "WHITE",
  "Glacier White": "WHITE",
  Almond: "ALMOND",
  "Desert Tan": "DESERT TAN",
  Sandtone: "SANDTONE",
  "Chocolate Brown": "BROWN",
  "Mocha Brown": "MOCHA BROWN",
  Bronze: "BRONZE",
  Gray: "GRAY",
  Charcoal: "CHARCOAL",
  // No molding is made in Iron Ore — charcoal is what goes on those doors.
  "Iron Ore": "CHARCOAL",
  "Hunter Green": "HUNTER GREEN",
  Black: "BLACK",
};

/** Ultra Grain finishes, which each map to their own vinyl. */
export const ULTRAGRAIN_VINYL = [
  "MEDIUM FINISH",
  "DARK FINISH",
  "WALNUT FINISH",
  "CHERRY",
  "SLATE",
] as const;

/**
 * Ultra Grain vinyl follows the FINISH word, not the wood family — Oak Dark,
 * Classic Dark and Cypress Dark all take DARK FINISH molding.
 */
const UG_FINISH: [RegExp, string][] = [
  [/\bdark\b/i, "DARK FINISH"],
  [/\bwalnut\b/i, "WALNUT FINISH"],
  [/\bmedium\b/i, "MEDIUM FINISH"],
  [/\bcherry\b/i, "CHERRY"],
  [/\bslate\b/i, "SLATE"],
];

/**
 * Vinyl colour for a door colour, or null when it cannot be decided.
 *
 * Named colours resolve from DOOR_COLOR_TO_VINYL. Ultra Grain resolves from its
 * finish word, so this keeps working the day the colour list gains the real
 * finish names. A bare "Ultra Grain" carries no finish, so it returns null and
 * the counter is asked instead of being given a guess.
 */
export function vinylForDoorColor(doorColor: string): string | null {
  const exact = DOOR_COLOR_TO_VINYL[doorColor];
  if (exact) return exact;
  if (/ultra[\s-]*grain/i.test(doorColor)) {
    for (const [re, vinyl] of UG_FINISH) if (re.test(doorColor)) return vinyl;
  }
  return null;
}

export const VINYL_COLORS = Object.keys(VINYL_STOCK).sort();

export interface VinylQuote {
  color: string;
  /** Stock length used for the header piece, in feet. */
  headerFt: number;
  /** Stock length used for each of the two side pieces, in feet. */
  legFt: number;
  /** Total linear feet for one door, before the quantity multiplier. */
  feetPerDoor: number;
  /** Total linear feet actually ordered — this is the QuickBooks quantity. */
  feet: number;
  pricePerFt: number;
  /** feet x pricePerFt, rounded to the cent. */
  total: number;
  description: string;
}

/** Smallest stock length that reaches `need`, or null if nothing does. */
function coveringLength(color: string, need: number): number | null {
  const stock = VINYL_STOCK[color];
  if (!stock) return null;
  return stock.find((s) => s >= need) ?? null;
}

/**
 * Work out the molding for one door opening.
 *
 * `sets` covers more than one identical opening: it multiplies the footage and
 * the piece counts, never the piece sizes. The tool does not expose it — one
 * opening is one set — but it is kept so a multi-door quote stays a one-liner.
 *
 * Returns null when the opening is larger than the colour is stocked in, which
 * is a special order rather than something to quote here.
 */
export function vinylForDoor(
  color: string,
  widthFt: number,
  heightFt: number,
  setCount = 1,
): VinylQuote | null {
  const headerFt = coveringLength(color, widthFt);
  const legFt = coveringLength(color, heightFt);
  if (headerFt == null || legFt == null) return null;

  const sets = Math.max(1, Math.trunc(setCount) || 1);
  const feetPerDoor = headerFt + legFt * 2;
  const feet = feetPerDoor * sets;
  const pricePerFt = VINYL_PRICE_PER_FT[color] ?? 0;

  // When all three pieces land on the same stock length the counter calls it a
  // count of three rather than reading out the same number twice.
  const body =
    headerFt === legFt
      ? `[${3 * sets}] - ${headerFt}FT`
      : `[${1 * sets}] - ${headerFt}FT AND [${2 * sets}] - ${legFt}FT`;

  return {
    color,
    headerFt,
    legFt,
    feetPerDoor,
    feet,
    pricePerFt,
    total: Math.round(feet * pricePerFt * 100) / 100,
    description: `${color} VINYL STOP MOLDING,  ${body}`,
  };
}
