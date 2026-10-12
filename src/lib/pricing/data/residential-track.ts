/**
 * Residential track sets, picked from the door size and the radius — Brandon,
 * 12/10/2026: the Track tab's Residential page asks width x height like the
 * residential configuration and a radius from what is in stock.
 *
 * The sets are the shelf's RESIDENTIAL TRACKS (NEW_PARTS_LIST.xlsx): one per
 * height (7', 8', 9'), radius group (10/12/15R, LHR, and 20R and 32R at 8')
 * and width band (7' to 10' wide; 12' and up). A door's height rounds up to
 * the next set height — a 7'6" door takes the 8' set — and its width takes
 * the wide set from 12'0". The line names the radius chosen.
 */
import type { Part } from "./parts";

export const RESIDENTIAL_TRACK_SUB = "RESIDENTIAL TRACKS";

/** The radii in the order the drop-down lists them. */
export const RADIUS_ORDER = ["10R", "12R", "15R", "LHR", "20R", "32R"] as const;

export interface ResidentialTrackSet {
  part: Part;
  /** The set's height in feet. */
  height: number;
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
    const h = /(\d+)FT HIGH/i.exec(part.desc);
    const r = /(?:^|,\s*)((?:\d+\/)*\d+R|LHR)\s*,/i.exec(part.name);
    if (!h || !r) continue;
    const radii = r[1].toUpperCase() === "LHR" ? ["LHR"] : r[1].replace(/R$/i, "").split("/").map((n) => `${n}R`);
    out.push({ part, height: Number(h[1]), radii, wide: /\b12'/.test(part.name) });
  }
  return out;
}

/** The set height a door height takes: the next whole foot up, or null past the tallest set. */
export function trackHeightFor(sets: readonly ResidentialTrackSet[], heightIn: number): number | null {
  if (heightIn <= 0) return null;
  const heights = [...new Set(sets.map((s) => s.height))].sort((a, b) => a - b);
  return heights.find((h) => h * 12 >= heightIn) ?? null;
}

/** The radii stocked at a set height, in drop-down order. */
export function radiiFor(sets: readonly ResidentialTrackSet[], height: number | null): string[] {
  if (height === null) return [];
  const have = new Set(sets.filter((s) => s.height === height).flatMap((s) => s.radii));
  return RADIUS_ORDER.filter((r) => have.has(r));
}

export interface ResidentialTrackPick {
  part: Part;
  /** The QuickBooks line, naming the radius chosen. */
  description: string;
}

/** The set for a door size and radius, or null where none is stocked. */
export function pickResidentialTrack(
  sets: readonly ResidentialTrackSet[], widthIn: number, heightIn: number, radius: string,
): ResidentialTrackPick | null {
  const height = trackHeightFor(sets, heightIn);
  if (height === null || widthIn <= 0 || !radius) return null;
  const wide = widthIn >= 144;
  const set = sets.find((s) => s.height === height && s.wide === wide && s.radii.includes(radius));
  if (!set) return null;
  const n = /^(\d+)R$/.exec(radius);
  const description = n ? set.part.desc.replace(/\d+" RADIUS/, `${n[1]}" RADIUS`) : set.part.desc;
  return { part: set.part, description };
}
