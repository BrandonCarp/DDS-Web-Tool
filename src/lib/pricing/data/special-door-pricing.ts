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

import { glassAdderSell, glassLabel, doorMargin, isSheetGroup, sheetUltraGrain, panelStylesFor, type PanelStyle } from "./so-glass";
import { colorTakesPremium } from "./catalog-meta";
import { highLiftPrice, mountPhrase, type TrackMount, type InclineStyle } from "./track-lift";
import { ADDONS, GRADE_RES, COLLECTIONS_RES } from "./addons";
import { dataKey } from "../model-groups";
import { designName, plainWindowsFor, windowDesigns } from "./inserts";
import { designBuilt, designLabel, designTakesWindows, hasDesigns, secondColorName } from "./door-designs";
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
  /** A named glass type. Meaningful when style is "glass" or "inserts". */
  glassType?: string;
  /** Short or long panel. Changes the window count, and so the glass price. */
  panelStyle?: "short" | "long";
  /** A plain window by its order name (PLAIN SHORT 19-1/2" X 12"), named on the line as the stock tab does. */
  plainWindow?: string;
  /** The door's design — the Coachman's 11…43, the Bridgeport Inlay's A, V, X — named on the line after the model. */
  design?: string;
  /** The door's second colour — the Coachman's overlay, the Bridgeport Inlay's inlay — named on the line after the door's. */
  overlayColor?: string;
  /** Track mount, incline and high lift — priced from the track-lift tables. */
  trackMount?: string;
  incline?: string;
  highLiftInches?: number;
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
  high_lift: 'high lift track',
  r10: '10\u2033 radius track',
  r12: '12\u2033 radius track',
  r15: '15\u2033 radius track',
  low_headroom: "low headroom track",
  r20: '20\u2033 radius track',
  r32: '32\u2033 radius track',
};
/** Collections named on the line: "Clopay Gallery Collection, Model GD1SP, ...". */
const NAMED_COLLECTIONS = new Set(["Gallery Collection", "Bridgeport Collection", "Coachman Collection"]);

/**
 * Groups whose sheet prices every height with torsion springs — "ALL TORSION
 * SPRING PRICES" on the Coachman sheet (CJ, 12/10/2026). No extension choice,
 * no torsion adder at 7' or 8'; galvanized is still the difference.
 */
const TORSION_INCLUDED = new Set(["CD"]);

/** True when a group's grid prices include torsion at every height. */
export function torsionIncluded(group: string): boolean {
  return TORSION_INCLUDED.has(group);
}

/**
 * Groups on which torsion and galvanized torsion are the same price — the
 * galvanized one (Brandon, 12/10/2026: the Coachman, then the Bridgeport
 * Inlay). The line still says which was chosen.
 */
const GALVANIZED_PRICED_TORSION = new Set(["CD", "BD1CU", "BD2CU"]);

/**
 * Groups whose third window choice is an arch window SECTION rather than
 * decorative inserts over the glass — the Coachman's ARC13A, ARC14A, ARC1A,
 * ARC3A and ARC4A, priced over the solid door on its sheet. The data rides in
 * the sheet's inserts slot; the words on the screen and the line do not.
 */
const ARCH_SECTION_GROUPS = new Set(["CD"]);

/** True when a group's "inserts" are arch window sections (the Coachman). */
export function archSectionGroup(group: string): boolean {
  return ARCH_SECTION_GROUPS.has(group);
}

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
 * What the chosen springs add. Torsion is $35 unless the height already
 * includes it. Galvanized torsion (5/10/2026) is $40 on a single door and $45 on
 * a double, 12' and over; where torsion is already included, the difference.
 */
function springAdder(spring: string, torsionIncluded: boolean, doubleDoor: boolean, galvanizedPriced = false): number {
  if (spring === "galvanized" || (spring === "torsion" && galvanizedPriced)) {
    const price = doubleDoor ? ADDONS.galvanized.double : ADDONS.galvanized.single;
    return torsionIncluded ? price - ADDONS.torsion : price;
  }
  return !torsionIncluded && spring === "torsion" ? ADDONS.torsion : 0;
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

  const triple = tier[input.width];
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
  // at all — a BD2NU under 7'8", say — so it is solid only there too.
  const sheet = isSheetGroup(input.model);
  if (sheet && input.style !== "solid" && panelStylesFor(input.model, input.width).length === 0) {
    return { reason: `Clopay prices no windows on the ${input.variant || input.model} at ${heightLabel(input.width)} — solid only at this width.` };
  }

  let base = triple[input.style];
  if (typeof base !== "number") {
    return { reason: "Clopay does not grid that style at this size — enter the total below." };
  }

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
  if (sheet && input.style !== "solid" && typeof triple.solid === "number") {
    const add = glassAdderSell(input.model, sheetPanel, input.width, input.glassType || "dsb", input.style === "inserts");
    if (add == null) return { reason: "Inserts are not offered on that glass — pick another glass, or plain glass." };
    base = triple.solid + add;
    // Double strength is these doors' own grade, so the line keeps the grade
    // words ("double strength b grade windows"); a special glass is named.
    glassName = input.glassType && input.glassType !== "dsb" ? glassLabel(input.glassType) : null;
  } else if (input.style !== "solid" && input.glassType && input.glassType !== "ssb") {
    const panel = input.panelStyle ?? "short";
    const withInserts = input.style === "inserts";
    const add = glassAdderSell(input.model, panel, input.width, input.glassType, withInserts);
    if (add != null && typeof triple.solid === "number") {
      base = triple.solid + add;
      glassName = glassLabel(input.glassType);
    }
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

  // High lift is priced from the Clopay track tables, then divided by the
  // group's margin — the grid holds SELL figures, so an adder has to be lifted
  // into the same space before it can be added.
  const lift = (() => {
    if (!input.highLiftInches || input.highLiftInches <= 0) return { value: 0, label: "" };
    const [hf, hi] = [Number(input.height.split(".")[0]), Number(input.height.split(".")[1] ?? 0)];
    const r = highLiftPrice({
      mount: (input.trackMount ?? "bracket") as TrackMount,
      incline: (input.incline ?? "straight_incline") as InclineStyle,
      heightFt: hf, heightIn: hi, inches: input.highLiftInches,
    });
    if (r.price <= 0) return { value: 0, label: "" };
    const margin = doorMargin(input.model);
    const value = margin == null ? r.price : Math.round((r.price / (1 - margin / 100)) * 100) / 100;
    return { value, label: r.label };
  })();

  // Ultra-Grain and the other premium finishes on a sheet-priced door: a flat
  // adder, single or double (10'2" and up), in two height bands — up to 8'0",
  // and 8'2" and up (Brandon, 8/10/2026). Cost on the sheet, so lifted by the
  // margin like the glass. Which colours count is the catalogue's list for
  // the group, keyed the way the colour tables are.
  const member = input.variant || input.model.split("/")[0];
  const ug = sheetUltraGrain(input.model);
  const premium = (() => {
    if (!ug || !colorTakesPremium(dataKey(member), input.color)) return 0;
    const [hf, hi] = [Number(input.height.split(".")[0]), Number(input.height.split(".")[1] ?? 0)];
    const [wf, wi] = [Number(input.width.split(".")[0]), Number(input.width.split(".")[1] ?? 0)];
    const band = hf * 12 + hi > 96 ? ug.over8ft : ug.upTo8ft;
    const cost = wf * 12 + wi >= 122 ? band.double : band.single;
    const margin = doorMargin(input.model);
    return margin == null ? cost : Math.round((cost / (1 - margin / 100)) * 100) / 100;
  })();

  const adders =
    premium +
    (input.track === "high_lift" ? 0 : ADDONS.track[input.track as keyof typeof ADDONS.track] ?? 0) +
    springAdder(input.spring, torsionOnly, parseInt(input.width, 10) >= 12, GALVANIZED_PRICED_TORSION.has(input.model)) +
    (LOCK[input.lock] ?? 0) +
    lift.value;

  // Worded the way a residential door is worded, because it lands in the same
  // QuickBooks description column and the counter reads both. The one thing
  // deliberately left out is stock status: a special order is never in stock,
  // so saying so would be noise.
  // Worded exactly as the stock tab words the same door (Brandon, 8/10/2026):
  //   SOLID NO WINDOWS
  //   SINGLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION, NO INSERTS
  //   DOUBLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION, ARCH 1 GRILLE INSERTS
  // A named glass type takes the grade's place: "insulated windows in the top
  // section". The design is named where one was chosen, from the same list the
  // stock tab offers (the Gallery's arches and grilles included).
  const grade = GRADE_RES[dataKey(member)] || "";
  // A design is validated against what the model offers for the style: inserts
  // everywhere, and plain glass too on the Coachman (its ten glass designs).
  const designId = (() => {
    if (input.style === "solid" || !input.windesign) return null;
    const valid = windowDesigns(member, input.style, input.width.split(".")[0]).map((d) => d.id);
    return valid.includes(input.windesign) ? input.windesign : null;
  })();
  // An arch window section (the Coachman) is the window, not an insert over
  // it: "ARC1A windows in the top section". A Coachman glass design names the
  // window the same way, ahead of the glass: "REC13 double strength b grade
  // windows in the top section".
  const glassDesign = input.style === "glass" && designId ? `${designName(designId)} ` : "";
  // A plain window named by its order name, as the stock tab words it (its own
  // clause after "in the top section" — Brandon, 25/9/2026 there, 12/10/2026
  // here). The Gallery's and Bridgeport's other plain arch windows (Arch 2
  // Plain, Arch 3 Plain) are named from the window list the same way.
  const plainNames = [
    ...plainWindowsFor(member),
    ...windowDesigns(member, "inserts", input.width.split(".")[0]).filter((d) => d.cat === "arch" && /\bPLAIN\b/i.test(d.name)).map((d) => d.name),
  ];
  const plain = input.style === "glass" && input.plainWindow && plainNames.includes(input.plainWindow)
    ? `${input.plainWindow.toLowerCase()}, ` : "";
  const winText =
    input.style === "solid"
      ? "solid no windows"
      : input.style === "inserts" && archSectionGroup(input.model)
      ? `${designId ? designName(designId) : "arch"} windows in the top section`
      : `${glassDesign}${glassName ? glassName.toLowerCase() : grade || "single strength b grade"} windows in the top section, ${plain}` +
        (input.style === "inserts" && designId ? `${designName(designId)} inserts` : "no inserts");
  // Gallery, Bridgeport and Coachman doors carry the collection, as the stock tab
  // writes the Gallery ("CLOPAY GALLERY COLLECTION, MODEL GD1SU, ..." — Brandon, 8/10/2026).
  const collectionName = COLLECTIONS_RES[dataKey(member)];
  const collection = collectionName && NAMED_COLLECTIONS.has(collectionName) ? `${collectionName}, ` : "";
  // A door with designs names its design after the model and its second
  // colour after the door's: "Model CD, Design 12, … in the color White,
  // Sandtone overlay"; "Model BD1CU, Design A, … in the color White, White
  // inlay" (Brandon, 12/10/2026).
  const designText = design ? `${designLabel(design)}, ` : "";
  const secondName = secondColorName(input.model);
  const overlay = secondName && input.overlayColor ? `, ${input.overlayColor} ${secondName}` : "";
  const description =
    `Clopay ${collection}Model ${input.variant || input.model}, ${designText}${feetInches(input.width)} x ${heightLabel(input.height)}, ` +
    `in the color ${input.color}${overlay}, ${winText}, ` +
    // An angle mount names what it fastens to, exactly as the commercial tool
    // phrases it, so the two read alike on a quote.
    (mountPhrase((input.trackMount ?? "bracket") as TrackMount)
      ? `${mountPhrase((input.trackMount ?? "bracket") as TrackMount)}, ` : "") +
    `${input.track === "high_lift" && input.highLiftInches
        ? `${input.highLiftInches}\u2033 high lift track`
        : TRACK_TEXT[input.track] ?? TRACK_TEXT.r12}, ` +
    `${input.spring === "galvanized" ? "galvanized torsion" : torsionOnly || input.spring === "torsion" ? "torsion" : "extension"} springs, ` +
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
