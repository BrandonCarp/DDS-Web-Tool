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

/**
 * The pieces as the description reads them (Brandon, 8/10/2026): two sizes
 * are joined by AND; with more, commas between them and AND only before the
 * last — "[1] - 16FT,  [1] - 8FT AND [1] - 7FT". Two spaces after each comma,
 * as everywhere else in the descriptions.
 */
export function piecesText(pieces: { ft: number; count: number }[]): string {
  const each = pieces.map((p) => `[${p.count}] - ${p.ft}FT`);
  return each.length <= 2 ? each.join(" AND ") : `${each.slice(0, -1).join(",  ")} AND ${each[each.length - 1]}`;
}

export interface VinylQuote {
  color: string;
  /** Stock length used for the header piece, in feet — the longest, when the
      header takes more than one piece (see headerPieces). */
  headerFt: number;
  /** Stock length used for each of the two side pieces, in feet. */
  legFt: number;
  /** Every stock length the header takes: one, unless the opening is wider
      than the colour is stocked long. */
  headerPieces: number[];
  /** The same for each side piece. */
  legPieces: number[];
  /** Each stock length used and how many of it, header first then the legs —
      what the description and the quote card both read out. */
  pieces: { ft: number; count: number }[];
  /** Total linear feet for one door, before the quantity multiplier. */
  feetPerDoor: number;
  /** Total linear feet actually ordered — this is the QuickBooks quantity. */
  feet: number;
  pricePerFt: number;
  /** feet x pricePerFt, rounded to the cent. */
  total: number;
  description: string;
}

/**
 * Stock lengths that cover `need`: the smallest one that reaches. Past the
 * longest length the colour is stocked in — 18' in white and black, 16' in the
 * rest — it is the longest, plus the smallest that covers what is left
 * (Brandon, 25/9/2026). Null only for a colour that is not stocked at all.
 */
function coveringLengths(color: string, need: number): number[] | null {
  const stock = VINYL_STOCK[color];
  if (!stock?.length) return null;
  const longest = stock[stock.length - 1];
  const pieces: number[] = [];
  let left = need;
  while (left > longest) {
    pieces.push(longest);
    left -= longest;
  }
  if (left > 0) pieces.push(stock.find((s) => s >= left)!);
  return pieces;
}

/**
 * Work out the molding for one door opening.
 *
 * `sets` covers more than one identical opening: it multiplies the footage and
 * the piece counts, never the piece sizes. The Vinyl tab's Number of doors
 * feeds it (7/10/2026): two 8x7 doors are "[2] - 8FT AND [4] - 7FT".
 *
 * An opening longer than the colour is stocked in takes the longest length
 * plus extra pieces (coveringLengths). Returns null only for a colour that is
 * not stocked.
 */
export function vinylForDoor(
  color: string,
  widthFt: number,
  heightFt: number,
  setCount = 1,
): VinylQuote | null {
  const headerPieces = coveringLengths(color, widthFt);
  const legPieces = coveringLengths(color, heightFt);
  if (headerPieces == null || legPieces == null) return null;

  const sets = Math.max(1, Math.trunc(setCount) || 1);
  const sum = (a: number[]) => a.reduce((t, x) => t + x, 0);
  const feetPerDoor = sum(headerPieces) + sum(legPieces) * 2;
  const feet = feetPerDoor * sets;
  const pricePerFt = VINYL_PRICE_PER_FT[color] ?? 0;

  // One count per stock length, header first then the legs, so pieces that
  // land on the same length read as one count: three 16s are "[3] - 16FT",
  // never the same number twice.
  const counts = new Map<number, number>();
  for (const ft of [...headerPieces, ...legPieces, ...legPieces]) counts.set(ft, (counts.get(ft) ?? 0) + 1);
  const pieces = [...counts].map(([ft, n]) => ({ ft, count: n * sets }));
  const body = piecesText(pieces);

  return {
    color,
    headerFt: headerPieces[0],
    legFt: legPieces[0],
    headerPieces,
    legPieces,
    pieces,
    feetPerDoor,
    feet,
    pricePerFt,
    total: Math.round(feet * pricePerFt * 100) / 100,
    description: `${color} VINYL STOP MOLDING,  ${body}`,
  };
}

/** Vinyl ordered by the piece: the colour, the pieces, and the QuickBooks line. */
export interface VinylOrder {
  color: string;
  /** Each stock length and how many of it, longest first. */
  pieces: { ft: number; count: number }[];
  /** Total linear feet — the QuickBooks quantity. */
  feet: number;
  pricePerFt: number;
  /** feet x pricePerFt, rounded to the cent. */
  total: number;
  description: string;
}

/**
 * Vinyl picked by the piece on the Vinyl tab (Brandon, 7/10/2026): stock
 * lengths and how many of each, worded and priced the way a door's vinyl is.
 * Lines of the same length merge into one count, longest first, and the
 * QuickBooks quantity is the total feet at the colour's price per foot. A
 * length the colour is not stocked in, or a count under one, is left out;
 * null when nothing is left.
 */
export function vinylForPieces(color: string, lines: { ft: number | null; count: number }[]): VinylOrder | null {
  const stock = VINYL_STOCK[color];
  if (!stock) return null;
  const counts = new Map<number, number>();
  for (const l of lines) {
    const n = Math.trunc(l.count);
    if (l.ft == null || !stock.includes(l.ft) || !(n > 0)) continue;
    counts.set(l.ft, (counts.get(l.ft) ?? 0) + n);
  }
  if (counts.size === 0) return null;
  const pieces = [...counts].sort((a, b) => b[0] - a[0]).map(([ft, count]) => ({ ft, count }));
  const feet = pieces.reduce((t, p) => t + p.ft * p.count, 0);
  const pricePerFt = VINYL_PRICE_PER_FT[color] ?? 0;
  return {
    color,
    pieces,
    feet,
    pricePerFt,
    total: Math.round(feet * pricePerFt * 100) / 100,
    description: `${color} VINYL STOP MOLDING,  ${piecesText(pieces)}`,
  };
}
