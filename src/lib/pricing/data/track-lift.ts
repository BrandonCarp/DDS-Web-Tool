/**
 * High lift track.
 *
 * Clopay prices it as an adder on top of the standard door: a base figure that
 * covers up to 54 inches of lift, then a per-inch rate for anything above that.
 * The rates differ by how the track is mounted and by which incline style is
 * used, and there are two entirely separate tables — one for doors up to 8'0"
 * and one for 8'1" and higher. The taller table is CHEAPER on most rows, which
 * is easy to get backwards.
 *
 * Source: TRACK OPTIONS - 4050, 4138, net price book 09/15/2026.
 *
 * Two constraints the book states in prose:
 *   - the horizontal track must sit at least 12" below the ceiling
 *   - high lift is only available on doors up to 14' high
 */

export type TrackMount = "bracket" | "continuous_angle" | "reverse_angle";
export type InclineStyle = "straight_incline" | "breakaway" | "deg25";

/** A mount is either bracket-mounted or angle-mounted; the book prices those two. */
export function isAngleMount(m: TrackMount): boolean {
  return m === "continuous_angle" || m === "reverse_angle";
}

export const TRACK_MOUNTS: { value: TrackMount; label: string }[] = [
  { value: "bracket", label: "Bracket mount" },
  { value: "continuous_angle", label: "Continuous angle mount to wood" },
  { value: "reverse_angle", label: "Reverse angle mount to steel" },
];

/**
 * How a mount reads on a quote.
 *
 * Matched to the commercial wording, which has said `2" angle mount track to
 * wood` for years — a counter reading a residential and a commercial quote side
 * by side should see the same phrase for the same thing.
 */
export function mountPhrase(mount: TrackMount): string {
  if (mount === "continuous_angle") return '2" continuous angle mount track to wood';
  if (mount === "reverse_angle") return '2" reverse angle mount track to steel';
  return "";
}

/**
 * The tallest high lift a door can take: its own height less 3 inches.
 *
 * Above that the door is full vertical lift, which is a different track
 * altogether and is not priced from the high lift tables.
 */
export function maxHighLift(heightFt: number, heightIn = 0): number {
  const inches = heightFt * 12 + heightIn - 3;
  return Math.max(0, Math.floor(inches / HIGH_LIFT_STEP) * HIGH_LIFT_STEP);
}

export const INCLINE_STYLES: { value: InclineStyle; label: string }[] = [
  { value: "straight_incline", label: "Straight incline" },
  { value: "breakaway", label: "Breakaway" },
  { value: "deg25", label: "25 degree" },
];

interface LiftRate {
  /** Covers lift up to and including 54 inches. */
  base: number;
  /** Added per inch above 54. */
  perInch: number;
}

/** Doors up to 8'0" high. */
const UP_TO_8: Record<InclineStyle, { bracket: LiftRate; angle: LiftRate }> = {
  straight_incline: { bracket: { base: 111.59, perInch: 4.03 }, angle: { base: 143.26, perInch: 4.03 } },
  breakaway:        { bracket: { base: 130.44, perInch: 4.00 }, angle: { base: 156.08, perInch: 4.00 } },
  deg25:            { bracket: { base: 153.82, perInch: 4.52 }, angle: { base: 179.45, perInch: 4.52 } },
};

/** Doors 8'1" and higher. Cheaper than the table above on every row. */
const OVER_8: Record<InclineStyle, { bracket: LiftRate; angle: LiftRate }> = {
  straight_incline: { bracket: { base: 58.81, perInch: 4.03 }, angle: { base: 96.51, perInch: 4.03 } },
  breakaway:        { bracket: { base: 58.81, perInch: 4.00 }, angle: { base: 84.45, perInch: 4.00 } },
  deg25:            { bracket: { base: 116.87, perInch: 4.52 }, angle: { base: 142.51, perInch: 4.52 } },
};

/** Lift is sold in 3-inch increments. */
export const HIGH_LIFT_STEP = 3;
/** The base figure covers everything up to this. */
export const HIGH_LIFT_BASE_INCHES = 54;
/** The book does not price lift above this. */
export const HIGH_LIFT_MAX_INCHES = 120;
/** High lift is not available on a door taller than this. */
export const HIGH_LIFT_MAX_DOOR_FT = 14;

/**
 * Selectable lift amounts for a door, 3" apart.
 *
 * Capped at the door's height less 3 inches — anything above that is full
 * vertical lift — and at the 120" the book prices to, whichever is lower.
 */
export function highLiftChoices(heightFt?: number, heightIn = 0): number[] {
  const ceiling = heightFt
    ? Math.min(maxHighLift(heightFt, heightIn), HIGH_LIFT_MAX_INCHES)
    : HIGH_LIFT_MAX_INCHES;
  const out: number[] = [];
  for (let n = HIGH_LIFT_STEP; n <= ceiling; n += HIGH_LIFT_STEP) out.push(n);
  return out;
}

/** High lift is a torsion option. Extension springs cannot take it at all. */
export function canTakeHighLift(spring: string): boolean {
  return spring === "torsion";
}

export interface HighLiftInput {
  mount: TrackMount;
  incline: InclineStyle;
  /** Door height in feet. Decides which of the two tables applies. */
  heightFt: number;
  heightIn?: number;
  /** Inches of lift. Must be a multiple of 3. */
  inches: number;
}

export interface HighLiftResult {
  price: number;
  /** Why it could not be priced, when it could not. */
  reason?: string;
  /** What the quote line should read. */
  label: string;
}

/**
 * Price a high lift adder.
 *
 * Returns a reason rather than throwing when the configuration is not one
 * Clopay sells, so the caller can show it instead of quoting a number that
 * cannot be ordered.
 */
export function highLiftPrice(input: HighLiftInput): HighLiftResult {
  const { mount, incline, heightFt, heightIn = 0, inches } = input;
  const style = INCLINE_STYLES.find((i) => i.value === incline)?.label ?? incline;
  const label = `${style} high lift, ${inches}"`;

  if (inches <= 0) return { price: 0, label: "" };
  if (inches % HIGH_LIFT_STEP !== 0) {
    return { price: 0, reason: `High lift comes in ${HIGH_LIFT_STEP}" increments.`, label };
  }
  if (inches > HIGH_LIFT_MAX_INCHES) {
    return { price: 0, reason: `The book prices high lift to ${HIGH_LIFT_MAX_INCHES}" only.`, label };
  }
  if (heightFt > HIGH_LIFT_MAX_DOOR_FT || (heightFt === HIGH_LIFT_MAX_DOOR_FT && heightIn > 0)) {
    return { price: 0, reason: `High lift is only available on doors up to ${HIGH_LIFT_MAX_DOOR_FT}' high.`, label };
  }
  const cap = maxHighLift(heightFt, heightIn);
  if (inches > cap) {
    return {
      price: 0,
      reason: `A ${heightFt}'${heightIn}" door takes at most ${cap}" of high lift. Above that it is full vertical lift.`,
      label,
    };
  }

  // 8'0" exactly uses the shorter table; 8'1" and up uses the taller one.
  const tall = heightFt > 8 || (heightFt === 8 && heightIn > 0);
  const table = tall ? OVER_8 : UP_TO_8;
  const rate = isAngleMount(mount) ? table[incline].angle : table[incline].bracket;

  const over = Math.max(0, inches - HIGH_LIFT_BASE_INCHES);
  const price = Math.round((rate.base + over * rate.perInch) * 100) / 100;
  return { price, label };
}
