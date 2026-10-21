/**
 * The shape of a glass band on a sheet-priced special order door — the
 * Gallery and Bridgeport workbooks, loaded by scripts/apply_sheet_workbook.py
 * into gallery-glass.ts and bridgeport-glass.ts. Figures are DDS cost.
 */
export interface SheetBand {
  /** Door width this band covers, in inches, inclusive. */
  lo: number;
  hi: number;
  /** Windows across the door in this band. */
  windows: number;
  /** Glass, and glass with decorative inserts; null where inserts are not offered. */
  glass: number;
  inserts: number | null;
}

/**
 * A window section's adder over the solid door, on a door whose windows are
 * priced by design (the Coachman, coachman-glass.ts). Cost, before margin.
 */
export interface SectionBand {
  /** Door width this band covers, in inches, inclusive. */
  lo: number;
  hi: number;
  cost: number;
}

export interface GlassOption {
  id: string;
  label: string;
}

/**
 * A sheet's track options (CJ's TRACKS block, 20/10/2026 on the 4138 and
 * 21/10/2026 on every Premium and Modern Steel sheet), cost before margin:
 * high lift by incline, mount and inches of lift; full vertical lift by door
 * height; track following the roof pitch by pitch; and the sheet's own
 * figures for low headroom track, low headroom rear torsion, and an angle
 * mount on 12" or 15" radius track.
 */
export interface SheetTracks {
  highLift: Record<string, { bracket: Record<number, number>; angle: Record<number, number> }>;
  fullVertical: { bracket?: Record<string, number>; angle?: Record<string, number> };
  roofPitch: { bracket?: Record<string, number>; angle?: Record<string, number> };
  adders?: { lowHeadroom?: number; lowHeadroomRearTorsion?: number; angleMount12r15r?: number };
}

/**
 * What torsion springs add on a door, plain or galvanized, on a single door
 * and on a double (12' and up). Flat figures — springs are the one adder the
 * margin does not lift (Brandon, 21/10/2026).
 */
export interface SpringRates {
  torsion: { single: number; double: number };
  galvanized: { single: number; double: number };
}
