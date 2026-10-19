/**
 * The Modern Steel doors with contemporary windows — 9208, 9138, 9209, 9139,
 * 4308, 4138 and 4309 — whose windows go in any section, pressed into the
 * door's panels on a drawing of the whole door (Brandon, 19/10/2026), the
 * way a commercial section's are.
 *
 * The drawing is Clopay's own: the SECTION STACKING CHART and PANELS/WINDOWS
 * WIDE tables for these models (Residential Door Stacking & Panel
 * Configurations, Modern Steel, page 13). A height is a stack of 18", 21"
 * and 24" sections, top to bottom, every 3" from 6'0" to 16'0"; a width is
 * so many panels across, by the window's size. CJ's window-count table on
 * the sheets differs at the edges (6 short at 11'6"-11'8", 8 at 14'10");
 * the drawing goes by the chart.
 *
 * The windows are priced a window, by glass and framing, from CJ's 9208-9209,
 * 4308-4309 and 4138 sheets (modern-windows.ts, 19/10/2026) — over the solid
 * door off the grid. A model with no sheet (the 9138, 9139) draws its windows
 * and asks for the Clopay total.
 */

import type { GlassOption } from "./sheet-band";
import { MODERN_GLASS_TYPES, MODERN_WINDOW_COST } from "./modern-windows";

export const MODERN_PICKER_MODELS: ReadonlySet<string> = new Set(["9208", "9138", "9209", "9139", "4308", "4138", "4309"]);

/** True for a model whose windows are placed on the door drawing. */
export function modernPickerModel(model: string): boolean {
  return MODERN_PICKER_MODELS.has(model);
}

/** Section heights top to bottom, by door height in inches. */
const STACK: Record<number, readonly number[]> = {
  72: [24, 24, 24],
  75: [21, 18, 18, 18],
  78: [21, 21, 18, 18],
  81: [21, 21, 21, 18],
  84: [21, 21, 21, 21],
  87: [24, 21, 21, 21],
  90: [24, 21, 21, 24],
  93: [24, 21, 24, 24],
  96: [24, 24, 24, 24],
  99: [21, 21, 21, 18, 18],
  102: [21, 21, 21, 21, 18],
  105: [21, 21, 21, 21, 21],
  108: [24, 21, 21, 21, 21],
  111: [24, 21, 21, 21, 24],
  114: [24, 21, 21, 24, 24],
  117: [24, 21, 24, 24, 24],
  120: [24, 24, 24, 24, 24],
  123: [21, 21, 21, 21, 21, 18],
  126: [21, 21, 21, 21, 21, 21],
  129: [24, 21, 21, 21, 21, 21],
  132: [24, 21, 21, 21, 21, 24],
  135: [24, 21, 21, 21, 24, 24],
  138: [24, 21, 21, 24, 24, 24],
  141: [24, 21, 24, 24, 24, 24],
  144: [24, 24, 24, 24, 24, 24],
  147: [21, 21, 21, 21, 21, 21, 21],
  150: [24, 21, 21, 21, 21, 21, 21],
  153: [24, 21, 21, 21, 21, 21, 24],
  156: [24, 21, 21, 21, 21, 24, 24],
  159: [24, 21, 21, 21, 24, 24, 24],
  162: [24, 21, 21, 24, 24, 24, 24],
  165: [24, 21, 24, 24, 24, 24, 24],
  168: [24, 24, 24, 24, 24, 24, 24],
  171: [24, 21, 21, 21, 21, 21, 21, 21],
  174: [24, 21, 21, 21, 21, 21, 21, 24],
  177: [24, 21, 21, 21, 21, 21, 24, 24],
  180: [24, 21, 21, 21, 21, 24, 24, 24],
  183: [24, 21, 21, 21, 24, 24, 24, 24],
  186: [24, 21, 21, 24, 24, 24, 24, 24],
  189: [24, 21, 24, 24, 24, 24, 24, 24],
  192: [24, 24, 24, 24, 24, 24, 24, 24],
};

/** The sections of a door, top to bottom, in inches; null off the chart (a height not on a 3" step). */
export function modernStack(heightFt: number, heightIn = 0): readonly number[] | null {
  return STACK[heightFt * 12 + heightIn] ?? null;
}

export type ModernWindowSize = "short" | "long" | "slim";

/**
 * Contemporary short windows across, by width; long and slim windows take
 * two short places. The chart starts at 6'2"; the 6'0" door CJ's sheets
 * price (19/10/2026) takes the three his count table gives it.
 */
export function modernPanelsWide(widthFt: number, widthIn: number, size: ModernWindowSize): number | null {
  const w = widthFt * 12 + widthIn;
  const short = w < 72 ? null : w <= 90 ? 3 : w < 92 ? null : w <= 140 ? 4 : w <= 178 ? 6 : w <= 228 ? 8 : w <= 240 ? 10 : null;
  if (size === "short") return short;
  return w < 92 ? null : w <= 140 ? 2 : w <= 178 ? 3 : w <= 228 ? 4 : w <= 240 ? 5 : null;
}

/**
 * The glass these windows come in, as CJ's sheets name it (19/10/2026): the
 * types the group's sheet prices, in its order — every type where no sheet
 * prices the group yet.
 */
export function modernGlassOptions(group: string): GlassOption[] {
  const priced = MODERN_WINDOW_COST[group];
  return priced ? MODERN_GLASS_TYPES.filter((g) => g.id in priced) : MODERN_GLASS_TYPES;
}

/** The label of a glass id, for the line. */
export function modernGlassLabel(glass: string): string {
  return MODERN_GLASS_TYPES.find((g) => g.id === glass)?.label ?? glass;
}

export interface ModernFraming {
  value: string;
  /** Clopay's name for it: PLAIN SHORT 19 1/2 X 16, REC12-RECTANGULAR 1 HIGH / 2 ACROSS, 37 X 8 BLACK SLIM WINDOW. */
  label: string;
  size: ModernWindowSize;
  grilles: boolean;
  /** The sheet's line that prices it: short, short_grilles, long, long_grilles or slim. */
  price: string;
  /** The grille design, where the window has one. */
  design?: string;
  /** The window as the line names it, after the glass: "short 19 1/2x16", "black slim 37x8" (the estimates' wording). */
  window: string;
}

/** Slim windows are the 9208, 9209, 4308 and 4309's alone. */
const SLIM_MODELS: ReadonlySet<string> = new Set(["9208", "9209", "4308", "4309"]);

/**
 * The contemporary windows as Clopay's order list names them (Brandon,
 * 19/10/2026): the plain short and long, the four grille designs — REC12 and
 * SQ22 in the short window, REC14 and SQ24 in the long, priced as CJ's
 * sheet prices the window with grilles — and the 37" x 8" slim window in a
 * black or a silver frame, one price.
 */
const CLOPAY_FRAMINGS: readonly ModernFraming[] = [
  { value: "short", label: "PLAIN SHORT 19 1/2 X 16", size: "short", grilles: false, price: "short", window: "short 19 1/2x16" },
  { value: "long", label: "PLAIN LONG 42 X 16", size: "long", grilles: false, price: "long", window: "long 42x16" },
  { value: "short_grilles:REC12", label: "REC12-RECTANGULAR 1 HIGH / 2 ACROSS", size: "short", grilles: true, price: "short_grilles", design: "REC12", window: "short 19 1/2x16" },
  { value: "long_grilles:REC14", label: "REC14-RECTANGULAR 1 HIGH / 4 ACROSS", size: "long", grilles: true, price: "long_grilles", design: "REC14", window: "long 42x16" },
  { value: "short_grilles:SQ22", label: "SQ22-SQUARE 2 HIGH / 2 ACROSS", size: "short", grilles: true, price: "short_grilles", design: "SQ22", window: "short 19 1/2x16" },
  { value: "long_grilles:SQ24", label: "SQ24-SQUARE 2 HIGH / 4 ACROSS", size: "long", grilles: true, price: "long_grilles", design: "SQ24", window: "long 42x16" },
  { value: "slim:black", label: "37 X 8 BLACK SLIM WINDOW", size: "slim", grilles: false, price: "slim", window: "black slim 37x8" },
  { value: "slim:silver", label: "37 X 8 SILVER SLIM WINDOW", size: "slim", grilles: false, price: "slim", window: "silver slim 37x8" },
];

/**
 * The framing list for a Modern Steel door in a glass: the windows the
 * group's sheet prices in it — the slim window in the three insulated
 * glasses Clopay builds it in, the 9/16" midnight gray its alone — and every
 * window the model takes where no sheet prices the group yet.
 */
export function modernFramings(group: string, model: string, glass?: string): ModernFraming[] {
  const all = CLOPAY_FRAMINGS.filter((f) => f.size !== "slim" || SLIM_MODELS.has(model));
  const sheet = MODERN_WINDOW_COST[group];
  if (!sheet) return all;
  const priced = sheet[glass ?? ""] ?? {};
  return all.filter((f) => priced[f.price] != null);
}

export function modernFraming(group: string, model: string, glass: string | undefined, value: string | undefined): ModernFraming | null {
  return modernFramings(group, model, glass).find((f) => f.value === value) ?? null;
}

/** A window's place: the section from the top and the panel from the left, both from 1. */
export interface WindowPlace { section: number; panel: number }

export const placeKey = (p: WindowPlace) => `${p.section}:${p.panel}`;

/**
 * What a window costs, before margin, by group, glass and framing — CJ's
 * sheets price them a window (modern-windows.ts). Null where no sheet prices
 * the group (the 4138), and a door with windows asks for the Clopay total.
 */
export function modernWindowCost(group: string, glass: string, framing: string): number | null {
  return MODERN_WINDOW_COST[group]?.[glass]?.[framing] ?? null;
}

/** Two items with AND, more with commas and AND before the last, as the vinyl pieces are listed. */
function listed(parts: readonly string[]): string {
  return parts.length <= 2 ? parts.join(" and ") : `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/**
 * The windows on the line, as DDS's estimates word a Modern Steel door
 * (Brandon, 19/10/2026): where they are — "all sections", "section 1",
 * "sections 1 and 3" — then, where a section is not glazed across, the
 * row as GL and SOL a panel, written LOOKING OUT (the drawing is the door
 * from outside, so its right-hand panel is the left looking out), and the
 * side the glass sits on: "all sections, GL-SOL, left side looking out".
 * Sections glazed differently are each written with their row.
 */
export function describeModernWindows(places: readonly WindowPlace[], sections: number, across: number): string {
  const has = new Set(places.map(placeKey));
  const glazed = [...new Set(places.map((p) => p.section))].filter((s) => s >= 1 && s <= sections).sort((a, b) => a - b);
  if (!glazed.length) return "no sections";
  // A section's row looking out: the drawing's last panel first.
  const row = (s: number) => Array.from({ length: across }, (_, i) => across - i).map((panel) => has.has(placeKey({ section: s, panel })) ? "GL" : "SOL");
  const full = (s: number) => row(s).every((x) => x === "GL");
  const where = glazed.length === sections ? "all sections" : `section${glazed.length > 1 ? "s" : ""} ${listed(glazed.map(String))}`;
  const rows = new Set(glazed.map((s) => row(s).join("-")));
  const partial = glazed.some((s) => !full(s));
  // Which side the glass is on, looking out: every window in the left half, or every one in the right.
  const half = Math.floor(across / 2);
  const outIndex = (panel: number) => across + 1 - panel;
  const seats = places.filter((p) => glazed.includes(p.section)).map((p) => outIndex(p.panel));
  const side = !partial ? "" : seats.every((j) => j <= half) ? "left side looking out" : seats.every((j) => j > across - half) ? "right side looking out" : "looking out";
  const text = rows.size === 1
    ? `${where}${partial ? `, ${[...rows][0]}` : ""}`
    : listed(glazed.map((s) => `section ${s} ${row(s).join("-")}`));
  return side ? `${text}, ${side}` : text;
}

/**
 * The windows on the line, by section from the top: "section 1 panels 1-4
 * and section 3 panels 2, 3" — three or more sections with commas and AND
 * before the last, as the vinyl pieces are listed. Panels in a run are
 * written as a range.
 */
export function describeWindowPlaces(places: readonly WindowPlace[]): string {
  const bySection = new Map<number, number[]>();
  for (const p of places) bySection.set(p.section, [...(bySection.get(p.section) ?? []), p.panel]);
  const parts: string[] = [];
  for (const [section, panels] of [...bySection.entries()].sort((a, b) => a[0] - b[0])) {
    const sorted = [...new Set(panels)].sort((a, b) => a - b);
    const runs: string[] = [];
    let start = sorted[0], prev = sorted[0];
    for (const p of sorted.slice(1).concat(NaN)) {
      if (p === prev + 1) { prev = p; continue; }
      runs.push(start === prev ? `${start}` : prev === start + 1 ? `${start}, ${prev}` : `${start}-${prev}`);
      start = prev = p;
    }
    parts.push(`section ${section} panel${sorted.length > 1 ? "s" : ""} ${runs.join(", ")}`);
  }
  return listed(parts);
}
