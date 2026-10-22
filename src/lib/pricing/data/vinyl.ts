/**
 * Vinyl stop molding — stock lengths, per-foot pricing, and the logic that
 * works out what covers a given door opening.
 *
 * A door takes three pieces: one across the header at the door's WIDTH, and two
 * legs down the sides at the door's HEIGHT. Stock lengths differ sharply by
 * colour — white runs 7' to 18' while most colours are 16' only.
 *
 * What is pulled from stock is whatever covers the whole order's cut list in
 * the fewest feet (Brandon, 22/10/2026): pieces may be cut out of one stock
 * length — two 7' legs out of a 16', an 8' header and a 7' leg out of one,
 * two 8' legs out of a 16' exactly — and the list is packed across every door
 * on the order, so three 9' x 7' doors take five 16s where one door at a
 * time would take six. Where cutting saves nothing, nothing is cut: a 12' x 8'
 * black door is still [1] - 16FT and [2] - 8FT, the figure Brandon confirmed
 * off a real order, not a 16' and another 16' sawn in two.
 *
 * Price is per LINEAR FOOT, so the QuickBooks line carries the total footage as
 * its quantity and the per-foot figure as its rate, and names what is pulled —
 * the stock lengths and how many of each — never the cuts.
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
  /** Each stock length used and how many of it, longest first — what the
      description and the quote card both read out. */
  pieces: { ft: number; count: number }[];
  /** Every stock length pulled, with the cut pieces that come out of it. */
  bins: VinylBin[];
  /** Total linear feet actually ordered — this is the QuickBooks quantity. */
  feet: number;
  pricePerFt: number;
  /** feet x pricePerFt, rounded to the cent. */
  total: number;
  description: string;
}

/** One stock length pulled, and the pieces cut from it (one piece: nothing cut). */
export interface VinylBin {
  ft: number;
  pieces: number[];
}

const EPS = 1e-9;
const key = (n: number) => Math.round(n * 10000) / 10000;

/**
 * Pack pieces into a colour's stock lengths for the fewest feet.
 *
 * Every way of filling one stock length from the pieces on hand is a
 * pattern — a 9 and a 7 in a 16, two 7s in a 16, a 7 on its own in a 7 — and
 * the order is covered by patterns until nothing is left. The patterns are
 * chosen by a table over what remains of each piece size, so the answer is
 * the least footage, not a guess; on equal footage the one with the fewest
 * sawn lengths wins, then the fewest lengths. A piece is never put in a
 * longer length than the shortest that holds the pattern.
 *
 * A piece longer than the longest length stocked takes whole lengths first
 * and only its remainder goes in the list — a 20' header in white is an 18'
 * and a 2' piece, and the 2' may share a length with the legs.
 */
export function packVinyl(stock: readonly number[], needs: readonly number[]): VinylBin[] | null {
  if (!stock.length) return null;
  const lengths = [...stock].sort((a, b) => a - b);
  const longest = lengths[lengths.length - 1];
  const bins: VinylBin[] = [];
  const pieces: number[] = [];
  for (const need of needs) {
    let left = need;
    while (left > longest + EPS) {
      bins.push({ ft: longest, pieces: [longest] });
      left -= longest;
    }
    if (left > EPS) pieces.push(key(left));
  }
  if (!pieces.length) return bins;

  // The distinct piece sizes and how many of each, longest first.
  const sizes = [...new Set(pieces)].sort((a, b) => b - a);
  const counts = sizes.map((v) => pieces.filter((p) => p === v).length);
  const fits = (sum: number) => lengths.find((l) => l + EPS >= sum)!;

  // Every pattern: a count of each size that fits one stock length.
  const patterns: { take: number[]; ft: number; n: number; idx: number }[] = [];
  const stride = counts.map((_, i) => counts.slice(0, i).reduce((a, c) => a * (c + 1), 1));
  const walk = (i: number, take: number[], sum: number, n: number) => {
    if (i === sizes.length) {
      if (n > 0) patterns.push({ take: [...take], ft: fits(sum), n, idx: take.reduce((a, t, j) => a + t * stride[j], 0) });
      return;
    }
    for (let k = 0; k <= counts[i]; k++) {
      const next = sum + k * sizes[i];
      if (next > longest + EPS) break;
      take[i] = k;
      walk(i + 1, take, next, n + k);
    }
    take[i] = 0;
  };
  walk(0, sizes.map(() => 0), 0, 0);

  // The table: for what remains (as one index over the counts), the least
  // footage and the pattern that starts it; built from nothing left upward.
  const states = counts.reduce((a, c) => a * (c + 1), 1);
  if (states > 400_000) return bins.concat(packGreedy(lengths, pieces));
  const feet = new Float64Array(states);
  const sawn = new Int32Array(states);
  const used = new Int32Array(states);
  const via = new Int32Array(states).fill(-1);
  const remaining = new Array<number>(sizes.length);
  for (let st = 1; st < states; st++) {
    let r = st;
    for (let i = sizes.length - 1; i >= 0; i--) { remaining[i] = Math.floor(r / stride[i]); r -= remaining[i] * stride[i]; }
    let bestFeet = Infinity, bestSawn = 0, bestUsed = 0, bestPat = -1;
    for (let pi = 0; pi < patterns.length; pi++) {
      const p = patterns[pi];
      let ok = true;
      for (let i = 0; i < sizes.length; i++) if (p.take[i] > remaining[i]) { ok = false; break; }
      if (!ok) continue;
      const prev = st - p.idx;
      const f = feet[prev] + p.ft, sw = sawn[prev] + (p.n > 1 ? 1 : 0), u = used[prev] + 1;
      if (f < bestFeet - EPS || (Math.abs(f - bestFeet) <= EPS && (sw < bestSawn || (sw === bestSawn && u < bestUsed)))) {
        bestFeet = f; bestSawn = sw; bestUsed = u; bestPat = pi;
      }
    }
    feet[st] = bestFeet; sawn[st] = bestSawn; used[st] = bestUsed; via[st] = bestPat;
  }
  // Read the patterns back off the table.
  for (let st = states - 1; st > 0; ) {
    const p = patterns[via[st]];
    const cut: number[] = [];
    p.take.forEach((t, i) => { for (let k = 0; k < t; k++) cut.push(sizes[i]); });
    bins.push({ ft: p.ft, pieces: cut });
    st -= p.idx;
  }
  return bins;
}

/** Past the table's size: each piece, longest first, into the first length with room, then each length the shortest that holds its pieces. */
function packGreedy(lengths: readonly number[], pieces: readonly number[]): VinylBin[] {
  const longest = lengths[lengths.length - 1];
  const open: { sum: number; pieces: number[] }[] = [];
  for (const p of [...pieces].sort((a, b) => b - a)) {
    const bin = open.find((b) => b.sum + p <= longest + EPS);
    if (bin) { bin.sum += p; bin.pieces.push(p); } else open.push({ sum: p, pieces: [p] });
  }
  return open.map((b) => ({ ft: lengths.find((l) => l + EPS >= b.sum)!, pieces: b.pieces }));
}

/** The stock lengths pulled and how many of each, longest first. */
function countBins(bins: readonly VinylBin[]): { ft: number; count: number }[] {
  const counts = new Map<number, number>();
  for (const b of bins) counts.set(b.ft, (counts.get(b.ft) ?? 0) + 1);
  return [...counts].sort((a, b) => b[0] - a[0]).map(([ft, count]) => ({ ft, count }));
}

/**
 * Work out the molding for a door opening, or for `sets` identical openings
 * packed as one order (the Vinyl tab's Number of doors, the quote's quantity):
 * a header the door's width and two legs its height, each, pulled from the
 * colour's stock lengths in the fewest feet (packVinyl). Null only for a
 * colour that is not stocked.
 */
export function vinylForDoor(
  color: string,
  widthFt: number,
  heightFt: number,
  setCount = 1,
): VinylQuote | null {
  const stock = VINYL_STOCK[color];
  if (!stock?.length) return null;
  const sets = Math.max(1, Math.trunc(setCount) || 1);
  const needs: number[] = [];
  for (let i = 0; i < sets; i++) needs.push(widthFt, heightFt, heightFt);
  const bins = packVinyl(stock, needs);
  if (!bins) return null;
  // Longest length first; within a length, the one holding the longest piece, then the fullest.
  const sum = (b: VinylBin) => b.pieces.reduce((t, x) => t + x, 0);
  const sorted = [...bins].sort((a, b) => b.ft - a.ft || Math.max(...b.pieces) - Math.max(...a.pieces) || sum(b) - sum(a));
  const pieces = countBins(sorted);
  const feet = sorted.reduce((t, b) => t + b.ft, 0);
  const pricePerFt = VINYL_PRICE_PER_FT[color] ?? 0;
  return {
    color,
    pieces,
    bins: sorted,
    feet,
    pricePerFt,
    total: Math.round(feet * pricePerFt * 100) / 100,
    description: `${color} VINYL STOP MOLDING,  ${piecesText(pieces)}`,
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
