import { MODERN_SPRING_RATES, MODERN_TRACKS } from "./modern-windows";
import { PREMIUM_SPRING_RATES, PREMIUM_TRACKS } from "./premium-glass";
import type { SheetTracks, SpringRates } from "./sheet-band";
import { isAngleMount, maxHighLift, type InclineStyle, type TrackMount } from "./track-lift";

/**
 * The track options a sheet prices on its own (CJ's TRACKS block — the
 * 4138's of 20/10/2026, every Premium and Modern Steel sheet's of
 * 21/10/2026): high lift, breakaway or 25 degree, by inches of lift; full
 * vertical lift by door height; track following the roof pitch — each
 * bracket or angle mount, cost before margin (premium-glass.ts and
 * modern-windows.ts). The headings' build rules are here: what each is
 * built with.
 *
 *   breakaway high lift   solid only on a Modern Steel door, bracket or angle mount
 *   25 degree high lift   solid or glass, lift to 72"
 *   full vertical lift    solid only on a Modern Steel door
 *   roof pitch            solid or glass
 *
 * The sheets' SOLID ONLY is the Modern Steel doors' (Brandon, 22/10/2026):
 * the Premium Steel doors take breakaway high lift and full vertical lift
 * with glass.
 *
 * And the sheet's own adders (CJ, 21/10/2026), in place of the stock book's
 * on a door DDS does not stock: low headroom track, low headroom rear
 * torsion, and an angle mount on 12" or 15" radius track — the radii the
 * sheet prices it on.
 */
export type SheetTrack = "high_lift" | "full_vertical" | "roof_pitch";

/** Which sections of a door carry glass: none, the top section alone, or more. */
export type GlassWhere = "none" | "top" | "other";

const SHEET_TRACKS: Record<string, SheetTracks> = { ...PREMIUM_TRACKS, ...MODERN_TRACKS };
const SHEET_SPRINGS: Record<string, SpringRates> = { ...PREMIUM_SPRING_RATES, ...MODERN_SPRING_RATES };

export function sheetTracksFor(group: string): SheetTracks | null {
  return SHEET_TRACKS[group] ?? null;
}

/** True where breakaway high lift and full vertical lift are built solid only: the Modern Steel doors. */
export function trackSolidOnly(group: string): boolean {
  return group in MODERN_TRACKS;
}

/** The spring rates a sheet prices for a group (its TORSION SPRINGS table), null where it has none. */
export function sheetSpringRates(group: string): SpringRates | null {
  return SHEET_SPRINGS[group] ?? null;
}

/** The track options a sheet adds to the list, beyond high lift. */
export function sheetTrackChoices(group: string): { value: SheetTrack; label: string }[] {
  const t = sheetTracksFor(group);
  if (!t) return [];
  const out: { value: SheetTrack; label: string }[] = [];
  if (t.fullVertical.bracket || t.fullVertical.angle) out.push({ value: "full_vertical", label: "Full vertical lift" });
  if (t.roofPitch.bracket || t.roofPitch.angle) out.push({ value: "roof_pitch", label: "Follow the roof pitch" });
  return out;
}

/** True where the sheet prices low headroom rear torsion, offered after Low headroom in the list. */
export function sheetRearTorsion(group: string): boolean {
  return sheetTracksFor(group)?.adders?.lowHeadroomRearTorsion != null;
}

/** The radius tracks the sheet prices an angle mount on. */
const ANGLE_MOUNT_RADII = new Set(["r12", "r15"]);

/**
 * The sheet's adder for a radius or low headroom track, cost before margin:
 * low headroom and low headroom rear torsion at the sheet's figures, an angle
 * mount on 12" or 15" radius track at its, nothing on a bracket mount; null
 * where the sheet has no figure of its own and the stock book's stands, and
 * a reason where the sheet does not price the combination at all.
 */
export function sheetTrackAdder(group: string, track: string, mount: TrackMount): { cost: number } | { reason: string } | null {
  const a = sheetTracksFor(group)?.adders;
  if (!a) return null;
  // An angle mount is priced on 12" and 15" radius track alone — not on any
  // other radius, nor on low headroom.
  if (isAngleMount(mount) && a.angleMount12r15r != null) {
    if (ANGLE_MOUNT_RADII.has(track)) return { cost: a.angleMount12r15r };
    if (track === "low_headroom" || track === "reverse_low_headroom" || /^r\d+$/.test(track)) {
      return { reason: 'An angle mount is priced on 12" and 15" radius track on this door.' };
    }
  }
  if (track === "low_headroom" && a.lowHeadroom != null) return { cost: a.lowHeadroom };
  if (track === "reverse_low_headroom" && a.lowHeadroomRearTorsion != null) return { cost: a.lowHeadroomRearTorsion };
  return null;
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
    // SOLID ONLY on both mounts on a Modern Steel door (CJ, 21/10/2026 — the
    // top-section-glass reverse angle build of the day before is gone from
    // the sheet); the other doors take it with glass (Brandon, 22/10/2026).
    if (incline === "breakaway" && input.glass !== "none" && trackSolidOnly(input.group)) return { reason: "Breakaway high lift is built solid only." };
    // The line names the incline (Brandon, 21/10/2026, afternoon): "2" bracket
    // mount track with 72″ high lift breakaway", "… with 72″ high lift 25
    // degree breakaway" — the mount is the quote's to say.
    return { cost, label: `${inches}″ high lift ${incline === "deg25" ? "25 degree breakaway" : "breakaway"}` };
  }
  if (input.track === "full_vertical") {
    const table = t.fullVertical[mount];
    if (!table) return { reason: "Full vertical lift is not priced on this mount." };
    if (input.glass !== "none" && trackSolidOnly(input.group)) return { reason: "Full vertical lift is built solid only." };
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

/**
 * Where a door's windows are: none, the top section alone, or elsewhere too.
 * A Modern Steel door's are where they were pressed into the drawing — its
 * sections numbered from the floor up, so the top section is the last of
 * `sections`; any other door's windows are in its top section.
 */
export function glassWhere(places: readonly { section: number }[] | undefined, glazed: boolean, sections?: number): GlassWhere {
  if (!glazed) return "none";
  if (!places) return "top";
  if (places.length === 0) return "none";
  const top = sections ?? Math.max(...places.map((p) => p.section));
  return places.every((p) => p.section === top) ? "top" : "other";
}
