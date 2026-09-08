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
  /** Door height as a size code — "6.6" is 6'6". Banded to a gridded tier. */
  height: string;
  /** Door colour, for the description only — the grid does not price by colour. */
  color: string;
  style: WindowStyle;
  /** Insert design id, when the style is inserts. */
  windesign?: string;
  /** The specific model within the group, when the group covers several. */
  variant?: string;
  track: TrackKey;
  spring: SpringKey;
  lock: LockKey;
}

export interface SpecialDoorQuote {
  /** True when the height forces torsion and the price already includes it. */
  torsionIncluded: boolean;
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

/** `6.6` -> `6'6"`, for a dropdown label. */
export function heightLabel(code: string): string {
  const [ft, inch] = code.split(".");
  return `${ft}'${inch ?? 0}"`;
}

/** "8.10" -> `8'10"`, matching how the residential description writes a size. */
function feetInches(key: string): string {
  const [ft, inch] = key.split(".");
  return `${ft}'${inch ?? 0}"`;
}

/**
 * Narrowest width each model is built in, where it differs from its group.
 *
 * The grid is keyed by margin group — "4050/4051/4053" is one set of prices for
 * three models — but the models are not interchangeable at every size. Clopay
 * does not build a 4053 under 8'0", so offering 6'0" would quote a door that
 * cannot be ordered.
 *
 * Anything absent here has no minimum beyond what the grid carries.
 */
/**
 * Widths a model is not built in, beyond its minimum.
 *
 * Separate from MODEL_MIN_WIDTH because these are holes rather than a floor —
 * the 4053 is built at 14'0" and 16'0" but not 15'0". Clopay's own
 * unavailable-widths table on the net price book carries several of these.
 */
const MODEL_EXCLUDED_WIDTHS: Record<string, string[]> = {
  "4053": ["15"],
};

const MODEL_MIN_WIDTH: Record<string, string> = {
  "4053": "8",
  "4310": "8",
  "9133": "8",
  "9203": "8",
};

/** The individual models a grid key covers: "4050/4051/4053" -> the three. */
export function groupMembers(groupKey: string): string[] {
  return groupKey.split("/").map((m) => m.trim()).filter(Boolean);
}

/** True when any member of the group is built in a different range than the rest. */
export function groupHasWidthLimits(groupKey: string): boolean {
  return groupMembers(groupKey).some(
    (m) => m in MODEL_MIN_WIDTH || m in MODEL_EXCLUDED_WIDTHS,
  );
}

/** Narrowest width a specific model is built in, or null for no limit. */
export function minWidthFor(model: string): string | null {
  return MODEL_MIN_WIDTH[model] ?? null;
}

/** Widths a specific model skips inside its range. */
export function excludedWidthsFor(model: string): string[] {
  return MODEL_EXCLUDED_WIDTHS[model] ?? [];
}

/** True when a model is built in a width at all. */
export function modelBuildsWidth(model: string, width: string): boolean {
  const min = minWidthFor(model);
  if (min && compareWidths(width, min) < 0) return false;
  return !excludedWidthsFor(model).includes(width);
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

/**
 * Door heights the configurator offers, matching the residential tab exactly.
 *
 * Clopay grids two heights — 7'0" and 8'0" — but prices every height in between
 * off the nearer of the two, the same banding residential uses: 6'0" to 7'0"
 * takes the 7' grid, 7'6" to 8'0" takes the 8' grid. So no extra price data is
 * needed to offer the in-between heights, and a 6'6" door quotes the same as a
 * 7'0" one, which is what the book says.
 *
 * offeredHeights() filters this per model against what is actually gridded, so
 * the T50S offers 9'0" and the 4050 does not.
 */
export const OFFERED_HEIGHTS = ["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8", "9"];

/** True when a height's price already includes torsion springs. */
export function heightForcesTorsion(height: string, available: string[]): boolean {
  const tier = tierForOfferedHeight(height, available);
  return tier !== null && tier !== "7" && tier !== "8";
}

/** Height code -> the grid tier that prices it, or null if past the grid. */
export function tierForOfferedHeight(height: string, available: string[]): string | null {
  const [ft, inch] = height.split(".");
  const inches = Number(ft) * 12 + Number(inch ?? 0);
  // Nearest gridded tier at or above the height, mirroring TIER_MAX_IN.
  const tiers = available.map(Number).sort((a, b) => a - b);
  for (const t of tiers) if (inches <= t * 12) return String(t);
  return null;
}

/** Heights the configurator should offer for a model, given what is gridded. */
export function offeredHeights(model: string): string[] {
  const have = griddedHeights(model);
  return OFFERED_HEIGHTS.filter((h) => tierForOfferedHeight(h, have) !== null);
}

/** Height tiers gridded for a model, ascending. */
export function griddedHeights(model: string): string[] {
  return Object.keys(SPECIAL_DOORS[model] ?? {}).sort((a, b) => Number(a) - Number(b));
}

/**
 * Width keys gridded for a model, ascending.
 *
 * `height` narrows to one tier; omit it for every width the model is gridded
 * in at any height. Clopay grids the same 73 widths at every height it
 * publishes, so the two are the same list today — but the union is what lets
 * the counter pick a width before a height rather than being made to work in
 * an order the data does not actually require.
 *
 * `variant` narrows to what that specific model is built in — a 4053 starts at
 * 8'0" even though its group is gridded from 6'0".
 */
export function griddedWidths(model: string, height?: string, variant?: string): string[] {
  const tiers = SPECIAL_DOORS[model] ?? {};
  const keys = height
    ? Object.keys(tiers[height] ?? {})
    : [...new Set(Object.values(tiers).flatMap((t) => Object.keys(t)))];
  const all = keys.sort(compareWidths);
  return variant ? all.filter((w) => modelBuildsWidth(variant, w)) : all;
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

  // The requested height bands to a gridded tier: a 6'6" door prices off the
  // 7' grid, exactly as it does on the residential tab.
  const tierKey = tierForOfferedHeight(input.height, griddedHeights(input.model));
  const tier = tierKey ? model[tierKey] : undefined;
  if (!tier) {
    const have = offeredHeights(input.model).map(heightLabel).join(", ");
    return {
      reason: `Only ${have} are gridded so far — enter the Clopay total below for other heights.`,
    };
  }

  if (input.variant && !modelBuildsWidth(input.variant, input.width)) {
    const min = minWidthFor(input.variant);
    const reason =
      min && compareWidths(input.width, min) < 0
        ? `The ${input.variant} is not built narrower than ${heightLabel(min)}`
        : `The ${input.variant} is not built at ${heightLabel(input.width)}`;
    return { reason: `${reason} — enter the Clopay total below for this one.` };
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
  // Extension springs are only printed for the 7' and 8' bands. Every taller
  // band is torsion, included in the door price — so no adder is charged and
  // the description still says torsion springs. Same rule as the residential
  // tab's torsionOnly, deliberately worded the same way.
  const torsionOnly = tierKey !== "7" && tierKey !== "8";

  const adders =
    (ADDONS.track[input.track as keyof typeof ADDONS.track] ?? 0) +
    (!torsionOnly && input.spring === "torsion" ? ADDONS.torsion : 0) +
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
    `Clopay Model ${input.variant || input.model}, ${feetInches(input.width)} x ${heightLabel(input.height)}, ` +
    `in the color ${input.color}, ${winText}, ` +
    `${TRACK_TEXT[input.track] ?? TRACK_TEXT.r12}, ` +
    `${torsionOnly || input.spring === "torsion" ? "torsion" : "extension"} springs, ` +
    `${LOCK_TEXT[input.lock] ?? "no lock"}`;

  return {
    quote: { base, unitPrice: Math.round((base + adders) * 100) / 100, description, torsionIncluded: torsionOnly },
  };
}

/**
 * Should the model dropdown list a group's members separately?
 *
 * A margin group like "4050/4051/4053" is one set of prices, so it was one
 * dropdown entry. That reads badly when the members are not interchangeable:
 * the counter picks the group, then has to answer a second "which model"
 * question, and an unanswered one puts all three model numbers on a customer's
 * invoice.
 *
 * Split where the members genuinely differ — a size range that is not shared,
 * or a size grid the configurator needs the specific model for. Groups whose
 * members are interchangeable stay collapsed, because splitting them would add
 * dropdown entries that make no difference to anything.
 */
export function shouldSplitGroup(groupKey: string): boolean {
  return groupHasWidthLimits(groupKey) || hasGrid(groupKey);
}

/**
 * The model dropdown's value, split into the parts everything else needs.
 *
 * A split group is selected as "4050/4051/4053:4051" — the group prices it, the
 * member narrows sizes and names the line. Passing the raw value where a grid
 * key was expected returns nothing and empties the width dropdown with no
 * error, which is exactly what happened the first time this was inline in the
 * component. It lives here so it can be tested.
 */
export function parseModelSelection(value: string): { group: string; member: string } {
  const at = value.indexOf(":");
  if (at < 0) return { group: value, member: "" };
  return { group: value.slice(0, at), member: value.slice(at + 1) };
}

/** The dropdown value for a group, or for one member of a split group. */
export function modelSelectionValue(group: string, member?: string): string {
  return member ? `${group}:${member}` : group;
}
