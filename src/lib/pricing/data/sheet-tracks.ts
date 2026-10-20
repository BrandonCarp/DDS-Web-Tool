import { MODERN_TRACKS, type SheetTracks } from "./modern-windows";
import { isAngleMount, maxHighLift, type InclineStyle, type TrackMount } from "./track-lift";

/**
 * The track options a sheet prices on its own (CJ's TRACKS block of
 * 20/10/2026, the 4138's): high lift, breakaway or 25 degree, by inches of
 * lift; full vertical lift by door height; track following the roof pitch —
 * each bracket or angle mount, cost before margin (modern-windows.ts). The
 * headings' build rules are here: what each is built with.
 *
 *   breakaway high lift   bracket mount: solid only; angle mount: solid, or
 *                         glass in the top section only, on a reverse angle
 *   25 degree high lift   solid or glass, lift to 72"
 *   full vertical lift    solid only
 *   roof pitch            solid or glass
 */
export type SheetTrack = "high_lift" | "full_vertical" | "roof_pitch";

/** Which sections of a door carry glass: none, the top section alone, or more. */
export type GlassWhere = "none" | "top" | "other";

export function sheetTracksFor(group: string): SheetTracks | null {
  return MODERN_TRACKS[group] ?? null;
}

/** The track options a sheet adds to the list, beyond high lift. */
export function sheetTrackChoices(group: string): { value: SheetTrack; label: string }[] {
  const t = sheetTracksFor(group);
  if (!t) return [];
  const out: { value: SheetTrack; label: string }[] = [];
  if (t.fullVertical.bracket || t.fullVertical.angle) out.push({ value: "full_vertical", label: "Full vertical lift" });
  if (t.roofPitch.bracket || t.roofPitch.angle) out.push({ value: "roof_pitch", label: "Roof pitch" });
  return out;
}

/** The inclines a sheet prices high lift in, in the sheet's order; null where the book's three apply. */
export function sheetInclines(group: string): InclineStyle[] | null {
  const t = sheetTracksFor(group);
  return t ? (Object.keys(t.highLift) as InclineStyle[]) : null;
}

/** The inches of lift a sheet prices for an incline, up to what the door's height allows. */
export function sheetLiftChoices(group: string, incline: string, heightFt?: number, heightIn = 0): number[] | null {
  const table = sheetTracksFor(group)?.highLift[incline];
  if (!table) return null;
  const cap = heightFt ? maxHighLift(heightFt, heightIn) : Infinity;
  return Object.keys(table.bracket).map(Number).filter((n) => n <= cap).sort((a, b) => a - b);
}

/** The pitches a sheet prices track following the roof for. */
export function roofPitches(group: string): string[] {
  const t = sheetTracksFor(group);
  return Object.keys(t?.roofPitch.bracket ?? t?.roofPitch.angle ?? {});
}

export interface SheetTrackInput {
  group: string;
  track: string;
  mount: TrackMount;
  incline?: string;
  inches?: number;
  heightFt: number;
  heightIn?: number;
  pitch?: string;
  glass: GlassWhere;
}

/**
 * What a sheet's track option costs, or why it is not built that way. Cost
 * before margin; the quote lifts it by the group's margin as it does the
 * sheet's windows and colours.
 */
export function sheetTrackPrice(input: SheetTrackInput): { cost: number; label: string } | { reason: string } {
  const t = sheetTracksFor(input.group);
  if (!t) return { reason: "No track table for this door." };
  const angle = isAngleMount(input.mount);
  const mount = angle ? "angle" : "bracket";
  if (input.track === "high_lift") {
    const incline = input.incline ?? "breakaway";
    const table = t.highLift[incline];
    if (!table) return { reason: `High lift is priced breakaway or 25 degree on this door.` };
    const inches = input.inches ?? 0;
    if (inches <= 0) return { reason: "Choose the high lift amount." };
    const cost = table[mount][inches];
    if (cost == null) {
      const max = Math.max(...Object.keys(table[mount]).map(Number));
      return { reason: `${incline === "deg25" ? "25 degree" : "Breakaway"} high lift is priced to ${max}" on this door.` };
    }
    if (incline === "breakaway" && input.glass !== "none") {
      if (!angle) return { reason: "Breakaway high lift on a bracket mount is built solid only." };
      if (input.glass !== "top") return { reason: "Breakaway high lift takes glass in the top section only." };
      if (input.mount !== "reverse_angle") return { reason: "Breakaway high lift with glass in the top section is built on a reverse angle mount only." };
    }
    return { cost, label: `${inches}″ high lift track` };
  }
  if (input.track === "full_vertical") {
    const table = t.fullVertical[mount];
    if (!table) return { reason: "Full vertical lift is not priced on this mount." };
    if (input.glass !== "none") return { reason: "Full vertical lift is built solid only." };
    // Priced by door height in whole feet; 7'6" takes the 8FT figure.
    const ft = Math.ceil((input.heightFt * 12 + (input.heightIn ?? 0)) / 12 - 1e-9);
    const cost = table[String(ft)];
    if (cost == null) return { reason: `Full vertical lift is priced for doors ${Object.keys(table)[0]}' to ${Object.keys(table).slice(-1)[0]}' high.` };
    return { cost, label: "full vertical lift track" };
  }
  if (input.track === "roof_pitch") {
    const table = t.roofPitch[mount];
    if (!table) return { reason: "Track following the roof pitch is not priced on this mount." };
    const pitch = input.pitch && table[input.pitch] != null ? input.pitch : Object.keys(table)[0];
    return { cost: table[pitch], label: `${pitch} roof pitch track` };
  }
  return { reason: "Not a sheet track." };
}

/** Where a Modern Steel door's windows are: none, the top section alone, or elsewhere too. */
export function glassWhere(places: readonly { section: number }[] | undefined, glazed: boolean): GlassWhere {
  if (!glazed) return "none";
  if (!places || places.length === 0) return "none";
  return places.every((p) => p.section === 1) ? "top" : "other";
}
