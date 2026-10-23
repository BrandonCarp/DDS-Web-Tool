/**
 * The special order configurator's window choices, shaped like the stock tab's
 * (Brandon, 12/10/2026, "DDS App Changes" 1-5):
 *
 *   Glass type      Solid, then every glass the door prices
 *   Section glazed  which section carries the windows — section 4 for now
 *   Framing         the plain windows by their order names, then every insert
 *                   the door takes, each its own entry (Brandon, 12/10/2026:
 *                   no second drop-down); on the Coachman, the window designs
 *                   and arched sections its sheet builds at the width
 *
 * …and the size as two boxes each, feet and inches, like the stock tab's.
 * What the quote needs — style, glass type, panel, design, plain window —
 * is worked out from those choices here, so the component carries no
 * pricing knowledge and the mapping can be tested on its own.
 */
import {
  glassOptionsFor, glassTakesInserts, isSheetGroup, panelStylesFor, windowSeriesFor, type GlassOption, type PanelStyle, type WindowSeries,
} from "./so-glass";
import { sectionDesignsAt, windowSectionGroup } from "./coachman-windows";
import { designWord, specialPlainWindowsFor, specialWindowDesigns, takesInserts, type InsertDesign } from "./inserts";
import type { WindowStyle } from "../types";

/** "8.2" -> ["8", "2"]; "7" -> ["7", "0"]. */
export function splitSize(key: string): [string, string] {
  const [ft, inch] = key.split(".");
  return [ft, inch ?? "0"];
}

/** ("8", "2") -> "8.2"; ("7", "0") -> "7". */
export function sizeKey(ft: string, inch: string): string {
  if (!ft) return "";
  return !inch || inch === "0" ? ft : `${ft}.${inch}`;
}

/** The whole feet a list of size keys offers, in order. */
export function feetOptions(keys: string[]): string[] {
  return [...new Set(keys.map((k) => splitSize(k)[0]))];
}

/** The inches a list of size keys offers at a given foot, in order. */
export function inchOptions(keys: string[], ft: string): string[] {
  return [...new Set(keys.filter((k) => splitSize(k)[0] === ft).map((k) => splitSize(k)[1]))];
}

/** The first option of the glass type list: a solid door. */
export const SOLID: GlassOption = { id: "solid", label: "Solid — no windows" };
/** The grid's own glass on a door with no named glass tables: single strength. */
export const SINGLE_STRENGTH: GlassOption = { id: "ssb", label: "Single strength B grade" };

/**
 * The glass type list for a door at a width: Solid first, then what the
 * door prices. A sheet-priced door lists its sheet's types — on a door with
 * two window series (the Premium Steel doors) the standard list, single
 * strength first, then the glass only the architectural windows take, in one
 * list (Brandon, 19/10/2026: no series control); everything else is single
 * strength only, the grid's own column. A width built solid only offers
 * Solid alone.
 */
export function glassTypeOptions(group: string, width: string, windowsOk: boolean, member?: string): GlassOption[] {
  if (!windowsOk) return [SOLID];
  const named: GlassOption[] = [];
  for (const series of windowSeriesFor(group, member)) {
    const panels = panelStylesFor(group, width, series);
    if (!panels.length) continue;
    for (const g of glassOptionsFor(group, panels[0], width, series)) {
      if (!named.some((n) => n.id === g.id)) named.push(g);
    }
  }
  if (isSheetGroup(group)) return [SOLID, ...named];
  return [SOLID, SINGLE_STRENGTH, ...named];
}

export type FramingKind = "plain" | "insert" | "design";
export interface FramingOption {
  value: string;
  label: string;
  kind: FramingKind;
  /** Short or long windows, where the door prices them apart. */
  panel?: PanelStyle;
  /** The plain window's order name, where the model has one, for the line. */
  plainWindow?: string;
  /** An insert design, or a Coachman window design or arched section. */
  design?: string;
  /** The window series the window is from, on a door with two. */
  series?: WindowSeries;
}

const panelLabel = (p: PanelStyle) => (p === "short" ? "Plain short windows" : "Plain long windows");

/**
 * The window an insert design goes in. The 4050 family's designs say so
 * (608-613 are the long-window inserts); the Gallery and Bridgeport windows
 * go by Clopay's names — REC12, SQ22 and Plain Short are the short-panel
 * windows, REC14, SQ24, Plain Long and the arches the long ones.
 */
export function designPanel(d: InsertDesign): PanelStyle {
  if (d.cat === "long") return "long";
  if (d.cat === "arch") return /\bSHORT\b|SQ22|REC12/i.test(d.name) ? "short" : "long";
  return "short";
}

/**
 * A Gallery or Bridgeport "insert" that is a plain window — Plain Long, Plain
 * Short, the plain arches (Clopay prices windows with or without inserts;
 * these have none) — is offered as one, priced without the inserts adder.
 */
const plainDesign = (d: InsertDesign) => d.cat === "arch" && d.id.includes("PLAIN");

/**
 * The Framing list for a door at a width with a glass type chosen.
 *
 * Sheet-priced doors (Gallery, Bridgeport) and the 4050 family price short and
 * long windows apart, so each plain window and each insert says which. The
 * model's own plain window names (PLAIN SHORT 19-1/2" X 12"…) are used where
 * it has them, as the stock tab does — every Gallery and Bridgeport door the
 * one list (PLAIN SHORT 19-1/2" X 16", PLAIN LONG 42" X 16", ARCH 1;
 * Brandon, 14/10/2026); the inserts follow, one entry each, in the window
 * their design goes in. The Coachman has one window layout: the
 * window designs and arched sections its sheet builds at the width, each
 * priced on its own, with any of its glass.
 *
 * A door with two window series (the Premium Steel doors) lists both in the
 * one list, the plain windows of each and then the inserts of each, each
 * entry saying its series; a series that does not price the glass chosen at
 * the width — acrylic is a standard glass, seeded an architectural one — is
 * left out (Brandon, 19/10/2026: the framing says which windows, not a
 * control of its own).
 */
export function framingOptions(group: string, member: string, width: string, glass: string): FramingOption[] {
  if (!width || glass === "solid") return [];
  if (windowSectionGroup(group)) {
    return sectionDesignsAt(group, width).map((d) => ({
      value: `design:${d.id}`, label: d.cat === "arch" ? `${d.name} arch section` : d.name, kind: "design", design: d.id,
    }));
  }
  const bySeries = windowSeriesFor(group, member)
    .filter((series) => panelStylesFor(group, width, series).some((p) => glassOptionsFor(group, p, width, series).some((g) => g.id === glass)))
    .map((series) => seriesFraming(group, member, width, glass, series));
  // A sheet-priced door with no window priced at the width, or none at this
  // glass, has nothing to frame — the architectural series at 10'2", say.
  if (isSheetGroup(group) && bySeries.length === 0) return [];
  if (!bySeries.length) return seriesFraming(group, member, width, glass, "standard");
  return [...bySeries.flatMap((f) => f.filter((o) => o.kind === "plain")), ...bySeries.flatMap((f) => f.filter((o) => o.kind !== "plain"))];
}

/** One series' framing: its plain windows, then its inserts. */
function seriesFraming(group: string, member: string, width: string, glass: string, series: WindowSeries): FramingOption[] {
  const panels = panelStylesFor(group, width, series);
  const named = specialPlainWindowsFor(member, series);
  const designs = takesInserts(member) ? specialWindowDesigns(member, "inserts", width, series) : [];
  // The standard windows keep the values they have always had; the
  // architectural series' say so, so the two lists never share one.
  const tag = series === "architectural" ? "arch:" : "";
  const marked = windowSeriesFor(group, member).length > 1 ? { series } : {};
  if (panels.length) {
    const out: FramingOption[] = [];
    for (const p of panels) {
      // A named plain window goes by its order name; the Gallery's arch window
      // is a long window too.
      const names = named.filter((n) => (p === "long" ? /\bLONG\b|\bARCH\b/i : /\bSHORT\b/i).test(n));
      if (names.length) names.forEach((n) => out.push({ value: `${tag}plain:${p}:${n}`, label: n, kind: "plain", panel: p, plainWindow: n, ...marked }));
      else out.push({ value: `${tag}plain:${p}`, label: panelLabel(p), kind: "plain", panel: p, ...marked });
      // The sheet doors' other plain windows (Arch 2 at 8' and 9', Arch 3 at
      // 16'), less the ones the order names already cover.
      for (const d of designs.filter((x) => plainDesign(x) && designPanel(x) === p)) {
        if (names.some((n) => sameWindow(n, d.name)) || /^PLAIN (SHORT|LONG)$/i.test(d.name)) continue;
        out.push({ value: `${tag}plain:${p}:${d.name}`, label: d.name, kind: "plain", panel: p, plainWindow: d.name, ...marked });
      }
    }
    for (const p of panels) {
      if (!glassTakesInserts(group, p, width, glass, series)) continue;
      for (const d of designs.filter((x) => !plainDesign(x) && designPanel(x) === p)) {
        out.push({ value: `${tag}insert:${p}:${d.id}`, label: `${d.name} ${designWord(d.id)}`, kind: "insert", panel: p, design: d.id, ...marked });
      }
    }
    return out;
  }
  // No window tables: the grid's own glass and inserts columns, worded by the
  // model's plain windows where it names them.
  const out: FramingOption[] = named.length
    ? named.map((n) => ({ value: `plain::${n}`, label: n, kind: "plain", plainWindow: n }))
    : [{ value: "plain:", label: "Plain (no insert)", kind: "plain" }];
  for (const d of designs) out.push({ value: `insert::${d.id}`, label: `${d.name} ${designWord(d.id)}`, kind: "insert", design: d.id });
  return out;
}

/**
 * The Framing list first (Brandon, 20/10/2026): every window the door takes
 * at the width in any of its glass — the plain windows, then the inserts, as
 * the list in a glass orders them — and the glass follows from the window.
 * Nothing where the width is not built with windows.
 */
export function framingChoices(group: string, member: string, width: string, windowsOk: boolean): FramingOption[] {
  if (!width || !windowsOk) return [];
  const out: FramingOption[] = [];
  for (const g of glassTypeOptions(group, width, true, member)) {
    if (g.id === SOLID.id) continue;
    for (const f of framingOptions(group, member, width, g.id)) if (!out.some((o) => o.value === f.value)) out.push(f);
  }
  return [...out.filter((o) => o.kind === "plain"), ...out.filter((o) => o.kind !== "plain")];
}

/** The glass a window comes in at the width, in the glass list's order; Solid alone where no window is chosen. */
export function glassForFraming(group: string, member: string, width: string, framing: FramingOption | undefined): GlassOption[] {
  if (!framing || !width) return [SOLID];
  return glassTypeOptions(group, width, true, member).filter((g) => g.id !== SOLID.id && framingOptions(group, member, width, g.id).some((f) => f.value === framing.value));
}

/** "ARCH 1" and "Arch 1" are the same window. */
function sameWindow(orderName: string, designName: string): boolean {
  const words = (s: string) => s.toUpperCase().replace(/[^A-Z0-9 ]/g, "").split(/\s+/).filter(Boolean).sort().join(" ");
  return words(orderName) === words(designName);
}

export interface WindowChoice {
  style: WindowStyle;
  glassType?: string;
  panelStyle?: PanelStyle;
  windesign?: string;
  plainWindow?: string;
  windowSeries?: WindowSeries;
}

/**
 * What the quote is asked for, from the glass type and framing chosen. Single
 * strength goes through as a glass type where a grid with no glass tables
 * offers it: that grid takes its own GLASS column for it, as it always has.
 * The window series is the framing's; a door with one series is standard.
 */
export function windowChoice(glass: string, framing: FramingOption | undefined): WindowChoice {
  if (glass === "solid") return { style: "solid" };
  const glassType = glass;
  const windowSeries: WindowSeries = framing?.series ?? "standard";
  if (!framing) return { style: "glass", glassType, windowSeries };
  switch (framing.kind) {
    case "design": return { style: "glass", glassType, windesign: framing.design, windowSeries };
    case "insert": return { style: "inserts", glassType, panelStyle: framing.panel, windesign: framing.design, windowSeries };
    default: return { style: "glass", glassType, panelStyle: framing.panel, plainWindow: framing.plainWindow, windowSeries };
  }
}

/** The one section glazed input for now: section 4. */
export const GLAZED_SECTIONS = [{ value: "4", label: "Section 4" }];
