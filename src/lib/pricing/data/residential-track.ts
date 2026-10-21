/**
 * Residential track sets, picked from the door size and the radius — Brandon,
 * 12/10/2026: the Track tab's Residential page asks width x height like the
 * residential configuration and a radius from what is in stock.
 *
 * The sets are the shelf's RESIDENTIAL TRACKS (NEW_PARTS_LIST.xlsx): one per
 * height (7', 8', 9'), radius group (10/12/15R, LHR) and width band (7' to
 * 10' wide; 12' and up), plus the 20R and 32R sets, which the list carries
 * with no height — one set for any door, so they are offered at every height
 * (Brandon, 12/10/2026: every radius in stock). A door's height rounds up to
 * the next set height — a 7'6" door takes the 8' set — and its width takes
 * the wide set from 12'0". The line names the radius chosen, and the door's
 * thickness, 1-3/8" or 2" (Brandon, 21/10/2026):
 *
 *   Complete set of 2" bracket mount track, 7FT high, 15" radius, full angle, 2" door
 *   Complete set of 2" bracket mount track, 7FT high, 15" radius, 1-3/8" door
 *
 * — full angle on the 12' and up set.
 */
import type { Part } from "./parts";

export const RESIDENTIAL_TRACK_SUB = "RESIDENTIAL TRACKS";

/** The radii in the order the drop-down lists them. */
export const RADIUS_ORDER = ["10R", "12R", "15R", "LHR", "20R", "32R"] as const;

export interface ResidentialTrackSet {
  part: Part;
  /** The set's height in feet, or null for a set the list carries for any height (20R, 32R). */
  height: number | null;
  /** The radii the set covers: ["10R", "12R", "15R"], ["LHR"], ["20R"]… */
  radii: string[];
  /** True for the 12' and up set, false for 7' to 10' wide. */
  wide: boolean;
}

/** Read the sets off the shelf's RESIDENTIAL TRACKS parts; anything that does not parse is left out. */
export function residentialTrackSets(parts: readonly Part[]): ResidentialTrackSet[] {
  const out: ResidentialTrackSet[] = [];
  for (const part of parts) {
    if (part.sub !== RESIDENTIAL_TRACK_SUB) continue;
    // The height is the name's ("7',  10/12/15R,  …"); a name without one is a set for any height.
    const h = /^\s*(\d+)'\s*,/.exec(part.name);
    const r = /(?:^|,\s*)((?:\d+\/)*\d+R|LHR)\s*,/i.exec(part.name);
    if (!r) continue;
    const radii = r[1].toUpperCase() === "LHR" ? ["LHR"] : r[1].replace(/R$/i, "").split("/").map((n) => `${n}R`);
    out.push({ part, height: h ? Number(h[1]) : null, radii, wide: /\b12'/.test(part.name) });
  }
  return out;
}

/** The set height a door height takes: the next whole foot up, or null past the tallest set. */
export function trackHeightFor(sets: readonly ResidentialTrackSet[], heightIn: number): number | null {
  if (heightIn <= 0) return null;
  const heights = [...new Set(sets.flatMap((s) => (s.height === null ? [] : [s.height])))].sort((a, b) => a - b);
  return heights.find((h) => h * 12 >= heightIn) ?? null;
}

/** The radii stocked at a set height, in drop-down order. */
export function radiiFor(sets: readonly ResidentialTrackSet[], height: number | null): string[] {
  if (height === null) return [];
  const have = new Set(sets.filter((s) => s.height === height || s.height === null).flatMap((s) => s.radii));
  return RADIUS_ORDER.filter((r) => have.has(r));
}

/** The door thicknesses a set is cut for, as the Track tab offers them. */
export const DOOR_THICKNESSES = [
  { value: "138", label: '1-3/8"' },
  { value: "2", label: '2"' },
] as const;
export type DoorThickness = (typeof DOOR_THICKNESSES)[number]["value"];

export interface ResidentialTrackPick {
  part: Part;
  /** The QuickBooks line, naming the radius and the door thickness chosen. */
  description: string;
}

/** The set for a door size, radius and door thickness, or null where none is stocked or something is still to choose. */
export function pickResidentialTrack(
  sets: readonly ResidentialTrackSet[], widthIn: number, heightIn: number, radius: string, thickness: string,
): ResidentialTrackPick | null {
  const height = trackHeightFor(sets, heightIn);
  const thick = DOOR_THICKNESSES.find((t) => t.value === thickness);
  if (height === null || widthIn <= 0 || !radius || !thick) return null;
  const wide = widthIn >= 144;
  // The set made for the height first, then one the list carries for any height.
  const set = sets.find((s) => s.height === height && s.wide === wide && s.radii.includes(radius))
    ?? sets.find((s) => s.height === null && s.wide === wide && s.radii.includes(radius));
  if (!set) return null;
  const n = /^(\d+)R$/.exec(radius);
  // A set the list carries for any height (20R, 32R) is worded at the height the list gives it.
  const named = set.height ?? Number(/(\d+)FT HIGH/.exec(set.part.desc)?.[1] ?? height);
  const description = `Complete set of 2" bracket mount track, ${named}FT high, ${n ? `${n[1]}" radius` : "low headroom"}, ${wide ? "full angle, " : ""}${thick.label} door`;
  return { part: set.part, description };
}
