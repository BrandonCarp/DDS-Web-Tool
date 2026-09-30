/**
 * How a shelf part is described and priced for QuickBooks.
 *
 * Kept out of parts.ts on purpose: that file is written by scripts/gen_parts.py
 * from NEW_PARTS_LIST.xlsx, and anything typed into it is lost the next time
 * the script runs. These rules are made by hand — the retainer and raw-track
 * stick lengths especially — so they live here, and parts.ts re-exports them.
 * (30/9/2026: the retainer sticks had been typed into parts.ts itself, where a
 * re-run would have dropped them without a word.)
 */
import type { Part } from "./parts";
import { handSuffix } from "./torsion";

/**
 * Description ready for QuickBooks.
 *
 * Per-foot parts get the footage written on (`2" RAW TRACK,  10FT`).
 * Hand-ordered parts get the counts appended (`... [2] - RIGHTS AND [1] - LEFT`).
 */
export function partDescription(
  part: Part,
  feet?: number,
  right?: number,
  left?: number,
): string {
  if (part.hands) {
    const suffix = handSuffix(right ?? 0, left ?? 0);
    return suffix ? `${part.desc} ${suffix}` : part.desc;
  }
  if (!part.perFoot || !feet) return part.desc;
  const base = part.desc.replace(/,\s*$/, "");
  // The billed length, not the length asked for: a 12FT U retainer is sold as
  // a 16FT stick, 10FT of raw track as a 12FT one, and the QuickBooks line has
  // to say what left the building.
  return `${base},  ${billedFeet(part, feet)}FT`;
}

/** Springs are priced each — the pair shows up as quantity 2, not a doubled rate. */
export function partQuantity(part: Part, right?: number, left?: number): number {
  if (!part.hands) return 1;
  return Math.max(0, Math.trunc(right ?? 0)) + Math.max(0, Math.trunc(left ?? 0));
}

/**
 * Retainers come off a stick, so past a point you are buying the long one.
 *
 * Brandon, 31/8/2026: a U retainer's longest stick is 16FT and an L retainer's
 * is 18FT. Anything over 8FT of U has to come off a 16FT stick, and anything
 * over 10FT of L off an 18FT one — the offcut is not sellable, so the customer
 * pays for the whole stick.
 *
 * Under the threshold it still bills by the foot. Brandon: nobody asks for less
 * than 7 or 8 feet in practice, so there is no minimum charge to worry about.
 *
 * Matches on " U RETAINER" / " L RETAINER" as the retainer TYPE. "UNIVERSAL
 * BOTTOM RETAINER" is not a U retainer and is deliberately not caught, nor are
 * the aluminium retainers, which are sold as fixed 10FT pieces rather than by
 * the foot.
 */
const RETAINER_STICKS: { type: RegExp; overFeet: number; billFeet: number }[] = [
  { type: /\bU\s+RETAINER/i, overFeet: 8, billFeet: 16 },
  { type: /\bL\s+RETAINER/i, overFeet: 10, billFeet: 18 },
];

/**
 * Raw track comes as 12FT and 24FT sticks — Brandon, 30/9/2026. Up to 12FT
 * bills a 12FT stick, anything longer a 24FT one, and it is sold from 1FT to
 * 24FT only: feetLimits says so, and the Track tab refuses anything outside it.
 */
const RAW_TRACK = /\bRAW TRACK\b/i;
const isRawTrack = (part: Part) => RAW_TRACK.test(part.name) || RAW_TRACK.test(part.desc);

/** The footage a part may be sold in, where it is limited; null where it is not. */
export function feetLimits(part: Part): { min: number; max: number } | null {
  return part.perFoot && isRawTrack(part) ? { min: 1, max: 24 } : null;
}

/** Feet actually billed for a part, which is not always the feet asked for. */
export function billedFeet(part: Part, feet?: number): number {
  const ft = Math.max(0, Math.trunc(feet ?? 0));
  if (!part.perFoot) return ft;
  if (isRawTrack(part)) return ft === 0 ? 0 : ft <= 12 ? 12 : 24;
  for (const stick of RETAINER_STICKS) {
    if (stick.type.test(part.desc) && ft > stick.overFeet) return stick.billFeet;
  }
  return ft;
}

/** Extended price: per-foot parts charge rate x billed footage, others each. */
export function partPrice(part: Part, feet?: number): number {
  if (!part.perFoot) return part.price;
  return Math.round(part.price * billedFeet(part, feet) * 100) / 100;
}
