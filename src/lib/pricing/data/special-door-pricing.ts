// Special order doors quoted from a Clopay size grid rather than a typed total.
//
// Two ways to price a special order, and they are not interchangeable:
//
//   MANUAL  — the counter reads a total off the Clopay portal and the
//             collection's margin is applied here. Works for any model, any
//             size, any oddity: special glass, a colour Clopay only quotes on
//             request, anything not on a grid. This is still the default and
//             still the fallback.
//
//   GRID    — for models where Clopay has issued a full size grid, the common
//             configurations are picked from dropdowns. The grid's SELL column
//             already carries the margin, so nothing further is applied.
//
// The grid covers the door at 12" radius, extension springs, no lock. Track,
// spring and lock adders come from ADDONS — the same values a stock door uses,
// which is why the sheet's own footer is not read into the data. Two copies of
// the same seven numbers is two things to keep in step.
//
// Anything the grid does not cover returns null with a reason. The caller shows
// that reason and points at the manual box; it must never fall through to a
// guessed price.

import { ADDONS } from "./addons";
import { designName, windowDesigns } from "./inserts";
import { SPECIAL_DOORS } from "./special-doors";
import type { LockKey, SpringKey, TrackKey, WindowStyle } from "../types";

export interface SpecialDoorInput {
  model: string;
  /** Catalogue width key: whole feet as "8", part-foot as "7.6". */
  width: string;
  /** Height tier in feet. Only "7" is gridded today. */
  height: string;
  /** Door colour, for the description only — the grid does not price by colour. */
  color: string;
  style: WindowStyle;
  /** Insert design id, when the style is inserts. */
  windesign?: string;
  track: TrackKey;
  spring: SpringKey;
  lock: LockKey;
}

export interface SpecialDoorQuote {
  /** Grid price before options. */
  base: number;
  /** Grid price plus track, spring and lock adders. */
  unitPrice: number;
  /** QuickBooks line text, worded exactly as a residential door is. */
  description: string;
}

const TRACK_TEXT: Record<string, string> = {
  r10: '10\u2033 radius track',
  r12: '12\u2033 radius track',
  r15: '15\u2033 radius track',
  low_headroom: "low headroom track",
  r20: '20\u2033 radius track',
  r32: '32\u2033 radius track',
};
const LOCK_TEXT: Record<string, string> = {
  none: "no lock",
  slide: "inside slide lock",
  lockbar: "lockbar",
  lockbar_installed: "lockbar installed",
};

/** "8.10" -> `8'10"`, matching how the residential description writes a size. */
function feetInches(key: string): string {
  const [ft, inch] = key.split(".");
  return `${ft}'${inch ?? 0}"`;
}

/** Models with a size grid, for the UI to decide whether to offer the picker. */
export function hasGrid(model: string): boolean {
  return model in SPECIAL_DOORS;
}

/**
 * Order two width keys.
 *
 * NOT Number(): the catalogue writes 6'10" as "6.10", which Number() reads as
 * 6.1 and sorts below "6.2" (6'2"). Residential only ever had half-foot sizes
 * so the convention was never stressed, but this grid steps every 2 inches from
 * 6'0" to 18'0" and six of its widths end in ten inches.
 */
export function compareWidths(a: string, b: string): number {
  const parse = (w: string) => {
    const [ft, inch] = w.split(".");
    return [Number(ft), Number(inch ?? 0)] as const;
  };
  const [af, ai] = parse(a);
  const [bf, bi] = parse(b);
  return af - bf || ai - bi;
}

/** Height tiers gridded for a model, ascending. */
export function griddedHeights(model: string): string[] {
  return Object.keys(SPECIAL_DOORS[model] ?? {}).sort((a, b) => Number(a) - Number(b));
}

/** Width keys gridded for a model at a height, ascending. */
export function griddedWidths(model: string, height: string): string[] {
  return Object.keys(SPECIAL_DOORS[model]?.[height] ?? {}).sort(compareWidths);
}

/**
 * Price a gridded special order door, or explain why it cannot be.
 *
 * Returns a reason rather than null alone, because "not on the grid" is
 * something the counter needs to read and act on — the action being to use the
 * manual total box instead.
 */
export function specialDoorQuote(
  input: SpecialDoorInput,
): { quote: SpecialDoorQuote; reason?: undefined } | { quote?: undefined; reason: string } {
  const model = SPECIAL_DOORS[input.model];
  if (!model) return { reason: "No size grid for this model yet — enter the Clopay total below." };

  const tier = model[input.height];
  if (!tier) {
    const have = griddedHeights(input.model).map((h) => `${h}'0"`).join(", ");
    return {
      reason: `Only ${have} doors are gridded so far — enter the Clopay total below for other heights.`,
    };
  }

  const triple = tier[input.width];
  if (!triple) return { reason: "That width is not on the grid — enter the Clopay total below." };

  const base = triple[input.style];
  if (typeof base !== "number") {
    return { reason: "Clopay does not grid that style at this size — enter the total below." };
  }

  // The same adders a stock door gets, read from the same place. ADDONS keys
  // locks flat rather than nested, so the mapping mirrors LOCK_VALUE in
  // engine.ts — deliberately, so a change to one is visible against the other.
  const LOCK: Record<string, number> = {
    slide: ADDONS.slidelock,
    lockbar: ADDONS.lockbar_assembly,
    lockbar_installed: ADDONS.lockbar_installed,
  };
  const adders =
    (ADDONS.track[input.track as keyof typeof ADDONS.track] ?? 0) +
    (input.spring === "torsion" ? ADDONS.torsion : 0) +
    (LOCK[input.lock] ?? 0);

  // Worded the way a residential door is worded, because it lands in the same
  // QuickBooks description column and the counter reads both. The one thing
  // deliberately left out is stock status: a special order is never in stock,
  // so saying so would be noise.
  const winText =
    input.style === "solid"
      ? "solid, no windows"
      : input.style === "glass"
        ? "glass in the top section, no inserts"
        : (() => {
            const valid = windowDesigns(input.model, "inserts", input.width.split(".")[0]).map((d) => d.id);
            const name = input.windesign && valid.includes(input.windesign)
              ? designName(input.windesign)
              : null;
            return name ? `windows in the top section, ${name} inserts` : "windows in the top section, no inserts";
          })();
  const description =
    `Clopay Model ${input.model}, ${feetInches(input.width)} x ${input.height}'0", ` +
    `in the color ${input.color}, ${winText}, ` +
    `${TRACK_TEXT[input.track] ?? TRACK_TEXT.r12}, ` +
    `${input.spring === "torsion" ? "torsion" : "extension"} springs, ` +
    `${LOCK_TEXT[input.lock] ?? "no lock"}`;

  return {
    quote: { base, unitPrice: Math.round((base + adders) * 100) / 100, description },
  };
}
