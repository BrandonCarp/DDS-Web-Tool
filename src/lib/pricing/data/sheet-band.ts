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
