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

import {
  baseGlassFor, glassAdderSell, glassLabel, doorMargin, isSheetGroup, sheetUltraGrain, panelStylesFor, windowSeriesFor, windowsPricedAt,
  type PanelStyle, type WindowSeries,
} from "./so-glass";
import { sectionCost, windowSectionGroup, windowSectionSell } from "./coachman-windows";
import { colorKeyFor, colorTakesPremium } from "./catalog-meta";
import { mountPhrase, trackMountFor } from "./track-lift";
import { glassWhere, sheetSpringRates, sheetTrackAdder, sheetTrackPrice, sheetTracksFor } from "./sheet-tracks";
import type { SpringRates } from "./sheet-band";
import { ADDONS, GRADE_RES, COLLECTIONS_RES } from "./addons";
import { dataKey, RESIDENTIAL_HIDDEN } from "../model-groups";
import { STOCK_PRICES } from "./stock-prices";
import { colorInStock } from "./stock-colors";
import { designClause, designName, specialPlainWindowsFor, specialWindowDesigns } from "./inserts";
import { doorStack, maxWindowRows, rowsPickable, sectionOrdinal } from "./door-stacks";
import { describeModernWindows, modernFraming, modernGlassLabel, modernPanelsWide, modernPickerModel, modernStack, modernWindowCost, type WindowPlace } from "./modern-steel";
import { designBuilt, designTakesWindows, hasDesigns, modelWithDesign, secondColorName, secondColorPricedAs } from "./door-designs";
import { SPECIAL_DOORS } from "./special-doors";
import type { LockKey, PriceTriple, SpringKey, TrackKey, WindowStyle } from "../types";

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
  /** A named glass type. Meaningful when style is "glass" or "inserts". */
  glassType?: string;
  /** Short or long panel. Changes the window count, and so the glass price. */
  panelStyle?: "short" | "long";
  /** The window series on a door with two (the Premium Steel doors): standard unless said. */
  windowSeries?: WindowSeries;
  /** A plain window by its order name (PLAIN SHORT 19-1/2" X 12"), named on the line as the stock tab does. */
  plainWindow?: string;
  /** The door's design — the Coachman's 11…43, the Bridgeport Inlay's A, V, X — named on the line after the model. */
  design?: string;
  /** The door's second colour — the Coachman's overlay, the Bridgeport Inlay's inlay — named on the line after the door's. */
  overlayColor?: string;
  /** Track mount, incline and high lift — priced from the track-lift tables, or the sheet's own (the 4138's). */
  trackMount?: string;
  incline?: string;
  highLiftInches?: number;
  /** The pitch, 1/12 to 6/12, for track following the roof (the 4138's sheet). */
  roofPitch?: string;
  /** A Modern Steel door's windows, where they were pressed in on the drawing: section from the top, panel from the left. */
  windowsAt?: WindowPlace[];
  /** The Modern Steel window's framing — its size, plain or with grilles (modern-steel.ts). */
  modernFraming?: string;
  /**
   * The section the windows are in on a Premium or Value Steel door, numbered
   * from the floor up (door-stacks.ts): the top section unless the row under
   * it was pressed on the drawing (Brandon, 22/10/2026).
   */
  windowRow?: number;
  /** Two rows of windows (Brandon, 23/10/2026): the rows from the floor up; a special order may always take two, never in the bottom section. */
  windowRows?: number[];
}

/** The rows asked for, from the floor up, top first: none in the bottom section, two at most. */
function windowRowsAsked(stack: readonly number[] | null, input: { windowRow?: number; windowRows?: number[] }): number[] {
  if (!stack) return [];
  const asked = input.windowRows?.length ? input.windowRows : input.windowRow ? [input.windowRow] : [];
  return [...new Set(asked.filter((r) => Number.isInteger(r) && r >= 2 && r <= stack.length))].sort((a, b) => b - a).slice(0, maxWindowRows(stack, false));
}

/** "top section", "third section", "top and third sections". */
function windowSectionWords(stack: readonly number[] | null, rows: number[]): string {
  if (!stack || !rows.length) return "top section";
  const name = (r: number) => (r === stack.length ? "top" : sectionOrdinal(r));
  return rows.length > 1 ? `${rows.map(name).join(" and ")} sections` : `${name(rows[0])} section`;
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
  /**
   * A row of the door's windows as the special order prices it — its sheet's
   * windows, or its grid's glass over its solid door — on a stocked door too:
   * what a second row adds (Brandon, 23/10/2026). Absent on a solid door.
   */
  windowRowPrice?: number;
}

const TRACK_TEXT: Record<string, string> = {
  high_lift: 'high lift track',
  full_vertical: 'full vertical lift track',
  roof_pitch: 'roof pitch track',
  r10: '10\u2033 radius track',
  r12: '12\u2033 radius track',
  r15: '15\u2033 radius track',
  low_headroom: "low headroom track",
  reverse_low_headroom: "low headroom rear torsion track",
  r20: '20\u2033 radius track',
  r32: '32\u2033 radius track',
};
/** Collections named on the line: "Clopay Gallery Collection, Model GD1SP, ...". */
const NAMED_COLLECTIONS = new Set(["Gallery Collection", "Bridgeport Collection", "Coachman Collection", "Modern Collection"]);

/**
 * Groups whose sheet prices every height with torsion springs — "ALL TORSION
 * SPRING PRICES" on the Coachman sheet (CJ, 12/10/2026). No extension choice,
 * no torsion adder at 7' or 8'; galvanized is still the difference.
 */
const TORSION_INCLUDED = new Set(["CD"]);

/**
 * True when a group's special order configurator offers high lift track:
 * the groups whose sheet prices it (the 4138 on 20/10/2026; every Premium
 * and Modern Steel sheet on 21/10/2026 — the 4050 family's book figures of
 * 13/10/2026 are superseded by its sheet). Every other door takes the radius
 * and low headroom tracks alone, and a high lift asked for on one is 12"
 * radius.
 */
export function highLiftOffered(group: string): boolean {
  return !!sheetTracksFor(group);
}

/** True when a group's grid prices include torsion at every height. */
export function torsionIncluded(group: string): boolean {
  return TORSION_INCLUDED.has(group);
}

/**
 * Spring rates by collection — Brandon, 12/10/2026: on a Gallery or Bridgeport
 * door torsion is $55 on a single door and $75 on a double, and galvanized
 * torsion is the same price. Where the sheet already includes torsion the
 * torsion rate is in the price, and galvanized adds its difference.
 */
const SPRING_RATES: Record<string, SpringRates> = {
  "Gallery Collection": { torsion: { single: 55, double: 75 }, galvanized: { single: 55, double: 75 } },
  "Bridgeport Collection": { torsion: { single: 55, double: 75 }, galvanized: { single: 55, double: 75 } },
};
const STOCK_SPRING_RATES: SpringRates = {
  torsion: { single: ADDONS.torsion, double: ADDONS.torsion },
  galvanized: { single: ADDONS.galvanized.single, double: ADDONS.galvanized.double },
};
/**
 * A stocked door is a stocked door whichever tab quotes it, and strictly
 * what DDS has on the floor (Brandon, 21/10/2026): the model, the colour,
 * the exact width and the exact height together on the stock list
 * (stock-colors.ts — what the residential tab's IN STOCK badge goes by: the
 * 4050 in White 7' to 18' wide and to 9' high, in Black at 8, 9 and 16 wide
 * to 8' high; the 4053 at 8, 9 and 16 in White or Black; and so on), with
 * the windows the stock book carries (none, or the standard short windows in
 * the book's own grade, plain or with inserts) and a track the stock tab
 * sells. That door takes the stock book's figures — the door itself, its
 * windows, its springs and its track adders — so the two tabs agree on it.
 *
 * Anything else is a special order through and through, the sheet's: a 4053
 * 10' x 8' in Black (floored at 8, 9 and 16 only), a 4050 9' x 7' in
 * Sandtone at 9' high (Sandtone stops at 8'), an odd width, a glass the
 * stock book has no column for, high lift on a floored door, a model with no
 * stock book (the 4132, the 9131, the 4300 family, the Modern Steel doors).
 */
function stockedDoor(input: SpecialDoorInput, member: string, style: WindowStyle, track: TrackKey, tierKey: string | null): PriceTriple | null {
  if (!tierKey || RESIDENTIAL_HIDDEN.has(member)) return null;
  if (track === "high_lift" || track === "full_vertical" || track === "roof_pitch") return null;
  const stockWindows = style === "solid"
    || ((input.windowSeries ?? "standard") === "standard" && (input.panelStyle ?? "short") === "short"
      && (!input.glassType || input.glassType === baseGlassFor(input.model, "standard")));
  if (!stockWindows) return null;
  if (!colorInStock(member, input.color, input.width, input.height, style)) return null;
  return STOCK_PRICES[dataKey(member)]?.[input.width]?.[tierKey] ?? null;
}

/**
 * The spring rates a door carries: the stock adders on a stocked door
 * (stockedDoor); else its collection's where Brandon set them (the Gallery,
 * the Bridgeport); else its sheet's TORSION SPRINGS where the sheet has the
 * table (CJ, 21/10/2026 — torsion 45 on a single door and 55 on a double,
 * galvanized 50 and 70, on every Premium and Modern Steel sheet); the stock
 * adders otherwise.
 */
export function springRatesFor(group: string, member: string, stocked: boolean): SpringRates {
  return (stocked ? STOCK_SPRING_RATES : null)
    ?? SPRING_RATES[COLLECTIONS_RES[dataKey(member)] ?? ""]
    ?? sheetSpringRates(group)
    ?? STOCK_SPRING_RATES;
}

/**
 * A Coachman with windows over 8'0" wide up to 9'0" — the sheet's 8'2", 8'6"
 * and 9'0" — is priced as the 8'0" door of the same build, plus a flat $200
 * on the sell price — Brandon, 14/10/2026 for the 9'0" (an 8x7 with ARCH1 at
 * $2,812.60 makes the 9x7 $3,012.60), 16/10/2026 for the widths between. The
 * line still says the width asked for. A solid door at these widths, and
 * every other width, is as the sheet prices it.
 */
const NINE_FOOT_GLASS = { widths: new Set(["8.2", "8.6", "9"]), pricedAs: "8", flat: 200 };
function nineFootGlass(group: string, width: string, style: WindowStyle): boolean {
  return windowSectionGroup(group) && NINE_FOOT_GLASS.widths.has(width) && style !== "solid";
}

/**
 * An odd width — any width between the whole-foot sizes Clopay lists, 8'2"
 * to 8'10", 9'2" to 9'10", 10'2" to 11'10" and so on — is priced as the
 * whole-foot door below it, the same build, plus a flat $200 on the sell
 * price (Brandon, 19/10/2026: an 8'0" 9130 with four windows at $1,093.41
 * makes every width up to 8'10" $1,293.41, and 9'2" to 9'10" the 9'0" door
 * and $200). The sheets list those widths on their own rows, some 16% over
 * the next whole foot, which put an 8'6" above a 10'0"; those rows are not
 * used. Every gridded door prices this way but the Coachman, whose sheet
 * prices its odd widths and whose glazed 9'0" has NINE_FOOT_GLASS.
 *
 * Which whole feet are Clopay's own sizes is read off the grid: a whole foot
 * priced the same as the width 2" under it sits inside an odd band (11'0" in
 * 10'2" to 11'10", 13'0" in 12'2" to 13'10") and is odd itself; one priced
 * differently is a size of its own (8'0", 9'0", 10'0", 12'0", 14'0", 15'0"…).
 * Under 8'0" the sheets price one band and nothing is a whole foot below
 * it, so those widths stay as the sheet has them.
 */
const ODD_WIDTH_FLAT = 200;
function oddWidthBase(tier: Record<string, Partial<PriceTriple>>, width: string): string | null {
  const [ft, inch] = width.split(".").map(Number);
  const solid = (w: string) => tier[w]?.solid;
  const ownSize = (f: number) => {
    const here = solid(String(f));
    if (typeof here !== "number") return false;
    const under = solid(`${f - 1}.10`);
    return typeof under !== "number" || under !== here;
  };
  if ((inch ?? 0) === 0 && ownSize(ft)) return null;
  for (let f = ft; f >= 8; f--) {
    if (ownSize(f)) return String(f);
  }
  return null;
}

/**
 * Groups whose torsion and galvanized torsion are one price — the galvanized
 * rate (Brandon, 13/10/2026, the Coachman; galvanized alone on the 12th). The
 * choice still names the spring on the line. No extension: the sheet includes
 * torsion at every height.
 */
const GALVANIZED_PRICED = new Set(["CD"]);

/** True when a group prices torsion at its galvanized rate, the two being its only springs. */
export function galvanizedPriced(group: string): boolean {
  return GALVANIZED_PRICED.has(group);
}

/** The grades as the stock tab words them; every other glass goes by its label. */
const GRADE_WORDS: Record<string, string> = { ssb: "Single strength b grade", dsb: "Double strength b grade" };

// Worded as the residential line words them (Brandon, 20/10/2026: "lockbar assembly", not "lockbar").
const LOCK_TEXT: Record<string, string> = {
  none: "no lock",
  slide: "inside slide lock",
  lockbar: "lockbar assembly",
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
/**
 * Bridgeport Steel is not built at 10'2" through 11'4", nor at 14'8" — the
 * note on every sheet of CJ's Bridgeport workbook. The note skips 10'8", but
 * the glass bands skip the whole run (7'8"-10'0", then 11'6" on), so it is
 * taken as left out of the note rather than built. Clopay's Gallery book
 * carries the same note for the Gallery; CJ's Gallery sheets do not, and the
 * app goes by his sheets (Brandon, 12/10/2026).
 */
const BRIDGEPORT_NOT_BUILT = ["10.2", "10.4", "10.6", "10.8", "10.10", "11", "11.2", "11.4", "14.8"];
const MODEL_EXCLUDED_WIDTHS: Record<string, string[]> = {
  "4053": ["15", "15.2", "15.4", "15.6", "15.8", "15.10"],
  BD1NU: BRIDGEPORT_NOT_BUILT, BD1EU: BRIDGEPORT_NOT_BUILT, BD1CU: BRIDGEPORT_NOT_BUILT,
  BD2NU: BRIDGEPORT_NOT_BUILT, BD2EU: BRIDGEPORT_NOT_BUILT, BD2CU: BRIDGEPORT_NOT_BUILT,
};

/**
 * Widths a door is built in but cannot take WINDOWS at — short, long or arch
 * alike (Clopay's note, via Brandon 9/10/2026; the Bridgeport workbook's own
 * note the same day). The solid door is still sold there; glass and inserts
 * are not offered. Width keys as the grids use them: "14.10" is 14'10".
 */
const NO_WINDOW_WIDTHS: Record<string, string[]> = {
  GD1SP: ["14.10", "15.4"],
  GD1LP: ["14.10", "15.4"],
  GD2SP: ["14.10", "15.4", "16.4", "16.6", "16.8", "16.10", "17", "17.2", "17.4", "17.6", "19.2", "19.4", "19.6", "19.8", "19.10", "20", "20.2"],
  GD2LP: ["14.10", "15.4", "16.4", "16.6", "16.8", "16.10", "17", "17.2", "17.4", "17.6", "19.2", "19.4", "19.6", "19.8", "19.10", "20", "20.2"],
  // The Intellicore pairs' sheets say 14'10" and 15'4" only (the Gallery
  // workbook, 12/10/2026) — Brandon: the longer list is the GD2SP/GD2LP's.
  GD1SU: ["14.10", "15.4"], GD1LU: ["14.10", "15.4"],
  GD2SU: ["14.10", "15.4"], GD2LU: ["14.10", "15.4"],
  BD1NU: ["14.10", "15.4"], BD1EU: ["14.10", "15.4"], BD1CU: ["14.10", "15.4"],
  BD2NU: ["14.10", "15.4"], BD2EU: ["14.10", "15.4"], BD2CU: ["14.10", "15.4"],
};

/** True when windows (glass or inserts) are offered on this model at this width. */
export function windowsOfferedAt(model: string | undefined, width: string): boolean {
  if (!model) return true;
  return !(NO_WINDOW_WIDTHS[model] ?? []).includes(width);
}

const MODEL_MIN_WIDTH: Record<string, string> = {
  // The Gallery pairs (workbook, 12/10/2026): the long-panel door from 7'8",
  // the short-panel from 6'2", on every pair.
  "GD1LP": "7.8", "GD1SP": "6.2",
  "GD2LP": "7.8", "GD2SP": "6.2",
  "GD1LU": "7.8", "GD1SU": "6.2",
  "GD2LU": "7.8", "GD2SU": "6.2",
  // Bridgeport Steel (CJ's workbook): the BD2NU from 6'2", the rest from
  // 7'8". Clopay's own book gives the BD2NU 7'8" too; the app goes by CJ's
  // sheet (Brandon, 12/10/2026).
  BD1NU: "7.8", BD1EU: "7.8", BD1CU: "7.8",
  BD2NU: "6.2", BD2EU: "7.8", BD2CU: "7.8",
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
// 8'3", 8'6" and 8'9" joined on 28/9/2026 (Brandon), pricing off the 9' grid.
export const OFFERED_HEIGHTS = ["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8", "8.3", "8.6", "8.9", "9", "9.6", "10"];

/**
 * What the chosen springs add, at the collection's rates (SPRING_RATES).
 * Torsion is its rate unless the height already includes it. Galvanized
 * torsion is its rate on a single door or a double, 12' and over; where
 * torsion is already included, the difference between the two.
 */
function springAdder(spring: string, torsionIncluded: boolean, doubleDoor: boolean, rates: SpringRates): number {
  const size = doubleDoor ? "double" : "single";
  if (spring === "galvanized") {
    return torsionIncluded ? rates.galvanized[size] - rates.torsion[size] : rates.galvanized[size];
  }
  return !torsionIncluded && spring === "torsion" ? rates.torsion[size] : 0;
}

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

  // A door whose windows are a section priced by design (the Coachman) grids
  // the solid door alone; the section is added below. Its sections are not
  // inserts, so a window asked for as "inserts" is the same window.
  const sectioned = windowSectionGroup(input.model);
  const style: WindowStyle = sectioned && input.style === "inserts" ? "glass" : input.style;
  // The width the door is priced at: its own, except an odd width, priced as
  // the whole-foot door below it (oddWidthBase), and a Coachman with windows
  // over 8'0" up to 9'0", priced as the 8'0" door (NINE_FOOT_GLASS) — each
  // with its flat $200. The line, the design and window checks all go by the
  // width asked for.
  // A width the grid lists at some height but not this one — the 4138's odd
  // widths at 9FT and 10FT, blank on CJ's sheet (19/10/2026) — is still the
  // whole-foot door below it and 200; a width the grid never lists is off it.
  if (!tier[input.width] && !griddedWidths(input.model).includes(input.width)) {
    return { reason: "That width is not on the grid — enter the Clopay total below." };
  }
  const asEight = nineFootGlass(input.model, input.width, style);
  const oddBase = sectioned ? null : oddWidthBase(tier, input.width);
  const priceWidth = asEight ? NINE_FOOT_GLASS.pricedAs : oddBase ?? input.width;
  const member = input.variant || input.model.split("/")[0];
  // High lift, full vertical lift and roof pitch are the sheet-tracked
  // doors' (the 4138 on 20/10/2026, every Premium and Modern Steel door on
  // 21/10/2026). On any other door each is 12" radius track.
  const sheetTracks = sheetTracksFor(input.model);
  const track: TrackKey =
    (input.track === "high_lift" || input.track === "full_vertical" || input.track === "roof_pitch") && !sheetTracks
      ? "r12" : input.track;
  // A stocked door is a stocked door whichever tab quotes it (Brandon, 21/10/2026).
  const stocked = stockedDoor(input, member, style, track, tierKey);
  const triple = stocked ?? tier[priceWidth];
  if (!triple) return { reason: "That width is not on the grid — enter the Clopay total below." };

  // The door's design, where it has one: built at this size, and on the
  // Coachman solid only past series 2.
  const design = hasDesigns(input.model) && input.design ? input.design : "";
  if (design && !designBuilt(input.model, design, input.width, input.height)) {
    return { reason: `Clopay does not build design ${design} at ${feetInches(input.width)} x ${heightLabel(input.height)} — pick another design or size.` };
  }
  if (design && input.style !== "solid" && !designTakesWindows(input.model, design)) {
    return { reason: `Clopay does not build series 3 and 4 designs with windows — design ${design} is solid only.` };
  }

  if (input.style !== "solid" && !windowsOfferedAt(input.variant, input.width)) {
    return { reason: `Clopay does not build the ${input.variant} with windows at ${heightLabel(input.width)} — solid only at this width.` };
  }
  // A sheet-priced door with no glass band at this width has no window price
  // at all — a BD2NU under 7'8", say — so it is solid only there too. A door
  // with two window series (the Premium Steel doors, 16/10/2026) may have one
  // and not the other at a width: the standard windows stop at 18'0" and the
  // architectural skip 10'2" to 11'4" and 14'8".
  const sheet = isSheetGroup(input.model);
  const series: WindowSeries = input.windowSeries && windowSeriesFor(input.model, member).includes(input.windowSeries) ? input.windowSeries : "standard";
  if (sheet && input.style !== "solid" && panelStylesFor(input.model, input.width, series).length === 0) {
    const name = input.variant || input.model;
    if (windowsPricedAt(input.model, input.width)) {
      return { reason: `Clopay prices no ${series} windows on the ${name} at ${heightLabel(input.width)} — pick the ${series === "standard" ? "architectural" : "standard"} windows, or solid.` };
    }
    return { reason: `Clopay prices no windows on the ${name} at ${heightLabel(input.width)} — solid only at this width.` };
  }

  // A Modern Steel door's windows are where they were pressed in on the
  // drawing (Brandon, 19/10/2026), a window at a time over the solid door, at
  // what CJ's sheet prices the glass and framing a window — and until a
  // model's windows are priced, the Clopay total typed below.
  const modern = modernPickerModel(member);
  // A sheet-priced door's windows are added to the solid door below, so its
  // grid's GLASS column is never the base — a 19'0" 9200 has architectural
  // windows and no standard ones, and its grid carries solid alone there. A
  // Modern Steel door's grid is solid alone.
  let base = triple[sectioned || sheet || modern ? "solid" : style];
  if (typeof base !== "number") {
    return { reason: "Clopay does not grid that style at this size — enter the total below." };
  }
  // A design is validated against what the model offers for the style: inserts
  // everywhere, and plain glass on the Coachman (its window sections).
  const designId = (() => {
    if (style === "solid" || !input.windesign) return null;
    const valid = specialWindowDesigns(member, style, input.width, series).map((d) => d.id);
    return valid.includes(input.windesign) ? input.windesign : null;
  })();

  // A named glass type replaces the grid's plain GLASS column. The grid prices
  // one generic glass door; Clopay sells a dozen types and the spread is over
  // $400 on the same door, so where DDS has priced them the specific figure is
  // used. Widths without a priced table fall back to the grid.
  let glassName: string | null = null;
  // Single strength IS the grid's own GLASS and INSERTS column — that is what
  // those columns were built from. Routing it through the component tables
  // instead produced a slightly different number at every width (about a dollar
  // at 6'0", six at 18'0"), so the same door priced two ways depending on
  // whether the counter had touched the glass dropdown. The grid wins for
  // single strength; the other types add over the solid door.
  // Sheet-priced glass (the Gallery, 8/10/2026; Bridgeport, 9/10/2026) goes by
  // window style, whichever model is picked: long windows, and the inserts
  // that go on them, at the long band; short at the short band. The grid's own
  // glass columns are the short figures, so every such glass door re-prices here.
  const sheetPanel: PanelStyle = input.panelStyle ?? "short";
  // A row of these windows as the special order prices it, stocked door or not.
  let rowAdd: number | null = null;
  const modernPlaces = modern && style !== "solid" ? input.windowsAt ?? [] : [];
  const modernFramed = modern && style !== "solid" ? modernFraming(input.model, member, input.glassType, input.modernFraming) : null;
  if (modern && style !== "solid") {
    const glassId = input.glassType ?? "";
    if (!modernPlaces.length) return { reason: "Press the windows into the door drawing — none are placed yet." };
    if (!modernFramed) return { reason: "Pick the windows' framing." };
    const each = modernWindowCost(input.model, glassId, modernFramed.price);
    if (each == null || typeof triple.solid !== "number") {
      return { reason: `Windows are not priced on the ${member} yet — enter the Clopay total below.` };
    }
    // The windows' cost lifted by the margin as one figure, so the rounding
    // happens once.
    const margin = doorMargin(input.model) ?? 0;
    base = triple.solid + Math.round((each * modernPlaces.length / (1 - margin / 100)) * 100) / 100;
    glassName = modernGlassLabel(glassId);
  } else if (sectioned && style !== "solid" && typeof triple.solid === "number") {
    // The Coachman (CJ's workbook of 13/10/2026): the design's section over
    // the solid door, then the glass over the double strength door, by window
    // count — both from the sheet, lifted by the margin together.
    if (!designId) return { reason: "Pick a window design — the Coachman's windows are priced by design." };
    if (sectionCost(input.model, designId, input.width) == null || sectionCost(input.model, designId, priceWidth) == null) {
      return { reason: `Clopay does not build the ${designName(designId)} window section at ${heightLabel(input.width)} — pick another design.` };
    }
    const add = windowSectionSell(input.model, priceWidth, designId, input.glassType || "dsb");
    if (add == null) return { reason: "That glass is not priced at this width — pick another glass." };
    base = triple.solid + add;
    glassName = input.glassType && input.glassType !== "dsb" ? glassLabel(input.glassType) : null;
  } else if (sheet && style !== "solid" && typeof triple.solid === "number") {
    const glassId = input.glassType || baseGlassFor(input.model, series);
    // The windows of the door priced — the whole-foot door's on an odd width —
    // and the asked width's own where that door has none of this series.
    const glassWidth = glassAdderSell(input.model, sheetPanel, priceWidth, glassId, false, series) == null ? input.width : priceWidth;
    const add = glassAdderSell(input.model, sheetPanel, glassWidth, glassId, style === "inserts", series);
    rowAdd = add;
    if (stocked && typeof stocked[style] === "number") {
      // The stocked door with the stock book's own windows — the grade its
      // GLASS and INSERTS columns were built from, short, in the top section —
      // is the stock book's figure, as the residential tab prices it.
      base = stocked[style] as number;
    } else {
      if (add == null) {
        return { reason: glassAdderSell(input.model, sheetPanel, glassWidth, glassId, false, series) == null
          ? `That glass is not priced on the ${sheetPanel} ${series} windows at this width — pick another glass.`
          : "Inserts are not offered on that glass — pick another glass, or plain glass." };
      }
      base = triple.solid + add;
    }
    // The glass is named as the stock tab names a grade — "single strength b
    // grade", "double strength b grade" — and a special glass by its name.
    glassName = GRADE_WORDS[glassId] ?? glassLabel(glassId);
  } else if (style !== "solid" && input.glassType && input.glassType !== "ssb") {
    const panel = input.panelStyle ?? "short";
    const withInserts = style === "inserts";
    const add = glassAdderSell(input.model, panel, priceWidth, input.glassType, withInserts)
      ?? glassAdderSell(input.model, panel, input.width, input.glassType, withInserts);
    if (add != null && typeof triple.solid === "number") {
      base = triple.solid + add;
      glassName = glassLabel(input.glassType);
      rowAdd = add;
    }
  }
  // The grid's own glass: its GLASS or INSERTS column over its solid door — the grid's, not the stock book's.
  if (rowAdd == null && style !== "solid" && !modern && !sectioned) {
    const grid = tier[priceWidth];
    const g = grid?.[style];
    if (typeof g === "number" && typeof grid?.solid === "number" && g > grid.solid) rowAdd = Math.round((g - grid.solid) * 100) / 100;
  }

  // The windows' rows (Brandon, 22/10/2026 and 23/10/2026): the top section
  // unless others were pressed on a Premium or Value Steel door's drawing;
  // up to two, never the bottom. A second row is a row of the windows as the
  // special order prices them, a stocked door's too.
  const [shf, shi] = input.height.split(".").map(Number);
  const rowStack = rowsPickable(member) ? doorStack(member, shf, shi ?? 0) : null;
  const rows = windowRowsAsked(rowStack, input);
  if (style !== "solid" && rows.length > 1 && rowAdd != null && rowAdd > 0) {
    base = Math.round((base + rowAdd) * 100) / 100;
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
  // tab's torsionOnly, deliberately worded the same way. A sheet priced with
  // torsion at every height (the Coachman) is torsion at 7' and 8' too.
  const torsionOnly = (tierKey !== "7" && tierKey !== "8") || torsionIncluded(input.model);
  // The Coachman: torsion or galvanized torsion, both at the galvanized rate;
  // extension is not sold, so one asked for is torsion.
  const spring: SpringKey = galvanizedPriced(input.model) && input.spring === "extension" ? "torsion" : input.spring;
  const springPriced = galvanizedPriced(input.model) && spring === "torsion" ? "galvanized" : spring;
  const liftInches = track === "high_lift" ? input.highLiftInches ?? 0 : 0;
  // A mount the model is not sold with is bracket.
  const mount = trackMountFor(member, input.trackMount);
  const [hf, hi] = [Number(input.height.split(".")[0]), Number(input.height.split(".")[1] ?? 0)];

  // High lift, full vertical lift and roof pitch come off the door's sheet
  // (cost), then divided by the group's margin — the grid holds SELL figures,
  // so an adder has to be lifted into the same space before it can be added.
  // The sheet says what each is built with: a track the door is not built
  // with that way is not priced.
  const lift = (() => {
    if (!sheetTracks || !(track === "high_lift" || track === "full_vertical" || track === "roof_pitch")) return { value: 0, label: "" };
    if (track === "high_lift" && liftInches <= 0) return { value: 0, label: "" };
    const r = sheetTrackPrice({
      group: input.model, track, mount, incline: input.incline, inches: liftInches, heightFt: hf, heightIn: hi,
      pitch: input.roofPitch, glass: glassWhere(input.windowsAt, style !== "solid", modern ? modernStack(hf, hi)?.length : undefined),
    });
    if ("reason" in r) return { value: 0, label: "", reason: r.reason };
    const margin = doorMargin(input.model);
    const value = margin == null ? r.cost : Math.round((r.cost / (1 - margin / 100)) * 100) / 100;
    return { value, label: r.label };
  })();
  if ("reason" in lift && lift.reason) return { reason: lift.reason };
  // A radius or low headroom track: the stock book's adder on a stocked door
  // (stockedDoor); on any other sheet-tracked door the sheet's own where it
  // has one (low headroom, low headroom rear torsion, an angle mount on 12"
  // or 15" radius), the stock book's otherwise.
  const trackAdder = ((): { value: number; reason?: string } => {
    if (track === "high_lift" || track === "full_vertical" || track === "roof_pitch") return { value: 0 };
    const own = sheetTracks && !stocked ? sheetTrackAdder(input.model, track, mount) : null;
    if (own && "reason" in own) return { value: 0, reason: own.reason };
    if (own) {
      const margin = doorMargin(input.model);
      return { value: margin == null ? own.cost : Math.round((own.cost / (1 - margin / 100)) * 100) / 100 };
    }
    return { value: ADDONS.track[track as keyof typeof ADDONS.track] ?? 0 };
  })();
  if (trackAdder.reason) return { reason: trackAdder.reason };

  // Ultra-Grain and the other premium finishes on a sheet-priced door: a flat
  // adder, single or double (10'2" and up), in two height bands — up to 8'0",
  // and 8'2" and up (Brandon, 8/10/2026). Cost on the sheet, so lifted by the
  // margin like the glass. Which colours count is the catalogue's list for
  // the group, keyed the way the colour tables are.
  const ug = sheetUltraGrain(input.model);
  // A door with a second colour (the Bridgeport Inlay's inlay) is priced at
  // the dearer of the two: a premium inlay on a standard door carries the
  // adder (Brandon, 12/10/2026).
  // Keyed the member's own way where it has colours of its own (the 4301, the
  // 9202), else its group's first member's, which is the list the tool offers
  // it (the 9203 the 9200's) — so a premium colour offered is a premium colour charged.
  const colorKey = colorKeyFor(member) ?? colorKeyFor(input.model.split("/")[0]) ?? dataKey(member);
  const premiumColor = colorTakesPremium(colorKey, input.color)
    || (!!secondColorName(input.model) && !!input.overlayColor && colorTakesPremium(colorKey, secondColorPricedAs(input.overlayColor)));
  const premium = (() => {
    if (!ug || !premiumColor) return 0;
    const [hf, hi] = [Number(input.height.split(".")[0]), Number(input.height.split(".")[1] ?? 0)];
    const [wf, wi] = [Number(input.width.split(".")[0]), Number(input.width.split(".")[1] ?? 0)];
    const band = hf * 12 + hi > 96 ? ug.over8ft : ug.upTo8ft;
    const cost = wf * 12 + wi >= 122 ? band.double : band.single;
    const margin = doorMargin(input.model);
    return margin == null ? cost : Math.round((cost / (1 - margin / 100)) * 100) / 100;
  })();

  const adders =
    premium +
    trackAdder.value +
    springAdder(springPriced, torsionOnly, parseInt(input.width, 10) >= 12, springRatesFor(input.model, member, !!stocked)) +
    (LOCK[input.lock] ?? 0) +
    lift.value +
    (asEight ? NINE_FOOT_GLASS.flat : 0) +
    (oddBase ? ODD_WIDTH_FLAT : 0);

  // Worded the way a residential door is worded, because it lands in the same
  // QuickBooks description column and the counter reads both. The one thing
  // deliberately left out is stock status: a special order is never in stock,
  // so saying so would be noise.
  // Worded exactly as the stock tab words the same door (Brandon, 8/10/2026):
  //   SOLID NO WINDOWS
  //   SINGLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION, NO INSERTS
  //   DOUBLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION, ARCH 1 GRILLE DESIGN
  // A named glass type takes the grade's place: "insulated windows in the top
  // section". The design is named where one was chosen, from the same list the
  // stock tab offers (the Gallery's arches and grilles included).
  const grade = GRADE_RES[dataKey(member)] || "";
  // A Coachman window design — a window design or an arched section — is its
  // own clause after the windows, worded as the stock tab words a design:
  // "double strength b grade windows in the top section, ARCH4 design"
  // (Brandon, 13/10/2026; "design" for every architectural window, 22/10/2026).
  const glassDesign = style === "glass" && designId ? `, ${designClause(designId)}` : "";
  // A plain window named by its order name, as the stock tab words it (its own
  // clause after "in the top section" — Brandon, 25/9/2026 there, 12/10/2026
  // here). The Gallery's and Bridgeport's other plain arch windows (Arch 2,
  // Arch 3) are named from the window list the same way.
  const plainNames = [
    ...specialPlainWindowsFor(member, series),
    ...specialWindowDesigns(member, "inserts", input.width, series).filter((d) => d.cat === "arch" && d.id.includes("PLAIN")).map((d) => d.name),
  ];
  const plain = style === "glass" && input.plainWindow && plainNames.includes(input.plainWindow)
    ? `${input.plainWindow.toLowerCase()}, ` : "";
  // A Modern Steel door's windows as DDS's estimates word them (Brandon,
  // 19/10/2026): the glass, the window, where they are and the row looking
  // out — "9/16" insulated tempered midnight gray black slim 37x8 windows in
  // all sections, GL-SOL, left side looking out" — then the inserts clause
  // the other doors carry, "no inserts" or "REC12 design" (22/10/2026); the
  // slim window takes none and says nothing.
  const modernWin = (() => {
    if (!modernFramed) return null;
    const [hf, hi] = input.height.split(".").map(Number);
    const [wf, wi] = input.width.split(".").map(Number);
    const sections = modernStack(hf, hi ?? 0)?.length ?? 0;
    const across = modernPanelsWide(wf, wi ?? 0, modernFramed.size) ?? 0;
    const where = describeModernWindows(modernPlaces, sections, across);
    const inserts = modernFramed.design ? `, ${designClause(modernFramed.design) ?? `${modernFramed.design} design`}` : modernFramed.size === "slim" ? "" : ", no inserts";
    return `${(glassName ?? "").toLowerCase()} ${modernFramed.window} windows in ${where}${inserts}`;
  })();
  // Which section the windows are in: "top" unless the row under the top was
  // picked on a Premium or Value Steel door's drawing (Brandon, 22/10/2026),
  // which the line names by Clopay's floor-up number.
  const sectionText = windowSectionWords(rowStack, rows);
  const winText =
    style === "solid"
      ? "solid no windows"
      : modernWin
      ? modernWin
      : glassDesign
      ? `${glassName ? glassName.toLowerCase() : grade || "single strength b grade"} windows in the ${sectionText}${glassDesign}`
      : `${glassName ? glassName.toLowerCase() : grade || "single strength b grade"} windows in the ${sectionText}, ${plain}` +
        (style === "inserts" && designId ? designClause(designId) : "no inserts");
  // Gallery, Bridgeport and Coachman doors carry the collection, as the stock tab
  // writes the Gallery ("CLOPAY GALLERY COLLECTION, MODEL GD1SU, ..." — Brandon, 8/10/2026).
  const collectionName = COLLECTIONS_RES[dataKey(member)];
  const collection = collectionName && NAMED_COLLECTIONS.has(collectionName) ? `${collectionName}, ` : "";
  // A door with designs names its design with the model and its second colour
  // after the door's, as Brandon words them (12/10/2026): "Model CD12, … in
  // the color White, overlays in the color Sandtone"; "Model BD1CU, Design A,
  // … in the color White, inlay in the color Charcoal".
  const modelText = modelWithDesign(input.model, input.variant || input.model, design);
  const secondName = secondColorName(input.model);
  const overlay = secondName && input.overlayColor ? `, ${secondName === "overlay" ? "overlays" : "inlay"} in the color ${input.overlayColor}` : "";
  const torsionTxt = track === "reverse_low_headroom" ? "rear torsion springs" : "front torsion springs";
  const trackLine = track === "high_lift" && liftInches && lift.label
    ? `${mountPhrase(mount) || '2" bracket mount track'} with ${lift.label}`
    : `${mountPhrase(mount) ? `${mountPhrase(mount)}, ` : ""}${track === "roof_pitch" ? lift.label || TRACK_TEXT[track] : TRACK_TEXT[track] ?? TRACK_TEXT.r12}`;
  const description =
    `Clopay ${collection}Model ${modelText}, ${feetInches(input.width)} x ${heightLabel(input.height)}, ` +
    `in the color ${input.color}${overlay}, ${winText}, ` +
    // An angle mount names what it fastens to, exactly as the commercial tool
    // phrases it, so the two read alike on a quote. High lift rides on the
    // mount (Brandon, 21/10/2026): "2" bracket mount track with 72″ high lift
    // breakaway".
    `${trackLine}, ` +
    // Torsion springs say where they sit (Brandon, 21/10/2026): front, or
    // rear on a low headroom rear torsion track, as the residential line does.
    `${spring === "galvanized" ? `galvanized ${torsionTxt}` : torsionOnly || spring === "torsion" ? torsionTxt : "extension springs"}, ` +
    `${LOCK_TEXT[input.lock] ?? "no lock"}`;

  return {
    quote: { base, unitPrice: Math.round((base + adders) * 100) / 100, description, torsionIncluded: torsionOnly,
      ...(style !== "solid" && rowAdd != null && rowAdd > 0 ? { windowRowPrice: rowAdd } : {}) },
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
