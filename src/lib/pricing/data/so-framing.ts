/**
 * The special order configurator's window choices, shaped like the stock tab's
 * (Brandon, 12/10/2026, "DDS App Changes" 1-5):
 *
 *   Glass type      Solid, then every glass the door prices
 *   Section glazed  which section carries the windows — section 4 for now
 *   Framing         the plain windows by their order names, then every insert
 *                   the door takes, each its own entry (Brandon, 12/10/2026:
 *                   no second drop-down); on the Coachman, its window designs
 *                   and arch sections
 *
 * …and the size as two boxes each, feet and inches, like the stock tab's.
 * What the quote needs — style, glass type, panel, design, plain window —
 * is worked out from those choices here, so the component carries no
 * pricing knowledge and the mapping can be tested on its own.
 */
import { glassOptionsFor, glassTakesInserts, isSheetGroup, panelStylesFor, type GlassOption, type PanelStyle } from "./so-glass";
import { archSectionGroup } from "./special-door-pricing";
import { COACHMAN_ARCH, COACHMAN_GLASS_DESIGNS, plainWindowsFor, takesInserts, windowDesigns, type InsertDesign } from "./inserts";
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
 * door prices. A sheet-priced door lists its sheet's types (double strength
 * first); the 4050 family lists single strength (the grid's own column) then
 * its named types; everything else is single strength only. A width built
 * solid only offers Solid alone.
 */
export function glassTypeOptions(group: string, width: string, windowsOk: boolean): GlassOption[] {
  if (!windowsOk) return [SOLID];
  const panels = panelStylesFor(group, width);
  const named = panels.length ? glassOptionsFor(group, panels[0], width) : [];
  if (isSheetGroup(group)) return [SOLID, ...named];
  return [SOLID, SINGLE_STRENGTH, ...named];
}

export type FramingKind = "plain" | "insert" | "design" | "arch";
export interface FramingOption {
  value: string;
  label: string;
  kind: FramingKind;
  /** Short or long windows, where the door prices them apart. */
  panel?: PanelStyle;
  /** The plain window's order name, where the model has one, for the line. */
  plainWindow?: string;
  /** An insert design, a Coachman window design or an arch section. */
  design?: string;
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
 * A Gallery or Bridgeport "insert" whose name says Plain is a plain window
 * (Clopay prices windows with or without inserts; Plain Long has none), so it
 * is offered as one — priced without the inserts adder.
 */
const plainDesign = (d: InsertDesign) => d.cat === "arch" && /\bPLAIN\b/i.test(d.name);

/**
 * The Framing list for a door at a width with a glass type chosen.
 *
 * Sheet-priced doors (Gallery, Bridgeport) and the 4050 family price short and
 * long windows apart, so each plain window and each insert says which. The
 * model's own plain window names (PLAIN SHORT 19-1/2" X 12"…) are used where
 * it has them, as the stock tab does; the inserts follow, one entry each, in
 * the window their design goes in. The Coachman has one window layout: its
 * ten glass designs, then the arch sections where the sheet prices them.
 */
export function framingOptions(group: string, member: string, width: string, glass: string): FramingOption[] {
  if (!width || glass === "solid") return [];
  const widthFt = width.split(".")[0];
  if (archSectionGroup(group)) {
    const designs: FramingOption[] = COACHMAN_GLASS_DESIGNS.map((d) => ({ value: `design:${d.id}`, label: d.name, kind: "design", design: d.id }));
    // An arch section is priced over the solid door with its own glass, on the
    // widths the sheet prices it; it is not combined with a special glass.
    const arch: FramingOption[] = glass === "dsb" && glassTakesInserts(group, "short", width, "dsb")
      ? COACHMAN_ARCH.map((d) => ({ value: `arch:${d.id}`, label: `${d.name} arch section`, kind: "arch", design: d.id }))
      : [];
    return [...designs, ...arch];
  }
  const panels = panelStylesFor(group, width);
  const named = plainWindowsFor(member);
  const designs = takesInserts(member) ? windowDesigns(member, "inserts", widthFt) : [];
  if (panels.length) {
    const out: FramingOption[] = [];
    for (const p of panels) {
      // A named plain window goes by its order name; the Gallery's arch window
      // is a long window too.
      const names = named.filter((n) => (p === "long" ? /\bLONG\b|\bARCH\b/i : /\bSHORT\b/i).test(n));
      if (names.length) names.forEach((n) => out.push({ value: `plain:${p}:${n}`, label: n, kind: "plain", panel: p, plainWindow: n }));
      else out.push({ value: `plain:${p}`, label: panelLabel(p), kind: "plain", panel: p });
      // The sheet doors' other plain windows (Arch 2 Plain at 8' and 9', Arch 3
      // Plain at 16'), less the ones the order names already cover.
      for (const d of designs.filter((x) => plainDesign(x) && designPanel(x) === p)) {
        if (names.some((n) => sameWindow(n, d.name)) || /^PLAIN (SHORT|LONG)$/i.test(d.name)) continue;
        out.push({ value: `plain:${p}:${d.name}`, label: d.name, kind: "plain", panel: p, plainWindow: d.name });
      }
    }
    for (const p of panels) {
      if (!glassTakesInserts(group, p, width, glass === "ssb" ? "dsb" : glass)) continue;
      for (const d of designs.filter((x) => !plainDesign(x) && designPanel(x) === p)) {
        out.push({ value: `insert:${p}:${d.id}`, label: `${d.name} inserts`, kind: "insert", panel: p, design: d.id });
      }
    }
    return out;
  }
  // No window tables: the grid's own glass and inserts columns, worded by the
  // model's plain windows where it names them.
  const out: FramingOption[] = named.length
    ? named.map((n) => ({ value: `plain::${n}`, label: n, kind: "plain", plainWindow: n }))
    : [{ value: "plain:", label: "Plain (no insert)", kind: "plain" }];
  for (const d of designs) out.push({ value: `insert::${d.id}`, label: `${d.name} inserts`, kind: "insert", design: d.id });
  return out;
}

/** "PLAIN ARCH 1" and "Arch 1 Plain" are the same window. */
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
}

/** What the quote is asked for, from the glass type and framing chosen. */
export function windowChoice(glass: string, framing: FramingOption | undefined): WindowChoice {
  if (glass === "solid") return { style: "solid" };
  const glassType = glass === "ssb" ? undefined : glass;
  if (!framing) return { style: "glass", glassType };
  switch (framing.kind) {
    case "design": return { style: "glass", glassType, windesign: framing.design };
    case "arch": return { style: "inserts", glassType: "dsb", windesign: framing.design };
    case "insert": return { style: "inserts", glassType, panelStyle: framing.panel, windesign: framing.design };
    default: return { style: "glass", glassType, panelStyle: framing.panel, plainWindow: framing.plainWindow };
  }
}

/** The one section glazed input for now: section 4. */
export const GLAZED_SECTIONS = [{ value: "4", label: "Section 4" }];
