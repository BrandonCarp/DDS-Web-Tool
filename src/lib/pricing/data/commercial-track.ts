/**
 * Commercial track sets — Brandon's TRACK_PRICING sheet, 12/10/2026. Each
 * height has five options: the complete set of angle mount track to wood at
 * 15" radius, its vertical and horizontal track on their own, the complete
 * full vertical lift set, and its top track on its own. The Track tab shows
 * them under "Show options" by height.
 *
 * This supersedes the commercial sets NEW_PARTS_LIST.xlsx carries (the 8FT
 * and 10FT full vertical sets moved to 599.95 and 699.95, and 9FT joined);
 * springs.ts swaps those out for these.
 */
import type { Part } from "./parts";

export const COMMERCIAL_TRACK_HEIGHTS = ["8", "9", "10", "12", "14"] as const;
export type CommercialTrackHeight = (typeof COMMERCIAL_TRACK_HEIGHTS)[number];

/** [complete set 15" radius, vertical only, horizontal only, complete set full vertical lift, full vertical top only] */
const PRICES: Record<CommercialTrackHeight, [number, number, number, number, number]> = {
  "8": [299.95, 199.95, 199.95, 599.95, 449.95],
  "9": [399.95, 249.95, 249.95, 699.95, 549.59],
  "10": [399.95, 249.95, 249.95, 699.95, 549.59],
  "12": [499.95, 299.95, 299.95, 799.95, 649.95],
  "14": [599.95, 349.95, 349.95, 899.95, 749.95],
};

export const COMMERCIAL_TRACK_SUB = "COMMERCIAL TRACKS";

/** The five options, in the sheet's order; `name` is the shelf part's name and `desc` its QuickBooks line. */
export const COMMERCIAL_TRACK_OPTIONS = [
  { key: "set15", label: 'Complete set, 15" radius', name: (h: string) => `COMMERCIAL TRACKS:${h}FT,  15R`, desc: (h: string) => `COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  ${h}FT HIGH,  15" RADIUS` },
  { key: "vertical", label: "Vertical track only", name: (h: string) => `COMMERCIAL TRACKS:${h}FT,  VERTICAL ONLY`, desc: (h: string) => `VERTICAL TRACK ONLY,  ${h}FT HIGH` },
  { key: "horizontal", label: "Horizontal track only", name: (h: string) => `COMMERCIAL TRACKS:${h}FT,  HORIZONTAL ONLY`, desc: (h: string) => `HORIZONTAL TRACK ONLY,  ${h}FT HIGH,  15" RADIUS` },
  { key: "setFV", label: "Complete set, full vertical lift", name: (h: string) => `COMMERCIAL TRACKS:${h}FT,  FV`, desc: (h: string) => `COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  ${h}FT HIGH,  FULL VERTICAL LIFT` },
  { key: "fvTop", label: "Full vertical top track only", name: (h: string) => `COMMERCIAL TRACKS:${h}FT,  FV TOP ONLY`, desc: (h: string) => `FULL VERTICAL TOP TRACK ONLY,  ${h}FT HIGH` },
] as const;

export interface CommercialTrackPart {
  height: CommercialTrackHeight;
  key: (typeof COMMERCIAL_TRACK_OPTIONS)[number]["key"];
  label: string;
  part: Part;
}

/** Every option at every height, as shelf parts under the COMMERCIAL TRACKS heading. */
export const COMMERCIAL_TRACK: CommercialTrackPart[] = COMMERCIAL_TRACK_HEIGHTS.flatMap((h) =>
  COMMERCIAL_TRACK_OPTIONS.map((o, i) => ({
    height: h,
    key: o.key,
    label: o.label,
    part: { name: o.name(h), desc: o.desc(h), price: PRICES[h][i], sub: COMMERCIAL_TRACK_SUB },
  })),
);

export const COMMERCIAL_TRACK_PARTS: Part[] = COMMERCIAL_TRACK.map((x) => x.part);

/** The height a commercial track part is for, or null for any other part. */
export function commercialTrackHeight(part: Part): CommercialTrackHeight | null {
  return COMMERCIAL_TRACK.find((x) => x.part.name === part.name)?.height ?? null;
}

/** The options at a height, in the sheet's order. */
export function commercialTrackAt(height: string): CommercialTrackPart[] {
  return COMMERCIAL_TRACK.filter((x) => x.height === height);
}
