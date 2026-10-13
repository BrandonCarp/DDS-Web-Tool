/**
 * The Coachman's windows — a top section priced by design (CJ's workbook of
 * 13/10/2026, loaded into coachman-glass.ts by scripts/apply_sheet_workbook.py).
 *
 * Three figures make a window door:
 *
 *   solid door      the grid in special-doors.ts, already SELL
 *   section         COACHMAN_SECTIONS: the design's adder over the solid door
 *                   at the width — ARCH3 and ARCH4 twice the other window
 *                   designs, the arched sections (ARC13A and the rest) their
 *                   own figure on 3- and 4-window doors only. A design with no
 *                   band at a width is not built there, and a width no design
 *                   is priced at (14'0") is solid only.
 *   glass           COACHMAN_GLASS: the ADD ON TO DOUBLE STRENGTH DOOR PRICE by
 *                   window count — obscure, frosted, rain, seeded; double
 *                   strength itself adds nothing.
 *
 * The section and the glass are cost, lifted by the group's door margin
 * together, the way every sheet's glass is (so-glass.ts).
 */
import { COACHMAN_SECTIONS } from "./coachman-glass";
import { doorMargin, glassAdder } from "./so-glass";
import { COACHMAN_ARCH, COACHMAN_GLASS_DESIGNS, type InsertDesign } from "./inserts";

/** True for a group whose windows are a top section priced by design (the Coachman). */
export function windowSectionGroup(group: string): boolean {
  return group in COACHMAN_SECTIONS;
}

const widthIn = (width: string) => {
  const [ft, inch] = width.split(".");
  return Number(ft) * 12 + Number(inch ?? 0);
};

/** Every window design the group names, in the sheet's order — the window designs, then the arched sections. */
export function sectionDesigns(group: string): InsertDesign[] {
  const named = [...COACHMAN_GLASS_DESIGNS, ...COACHMAN_ARCH];
  return Object.keys(COACHMAN_SECTIONS[group] ?? {}).map((id) => named.find((d) => d.id === id) ?? { id, name: id, cat: "glass" as const });
}

/** The section's cost adder over the solid door for a design at a width, or null where it is not built. */
export function sectionCost(group: string, design: string, width: string): number | null {
  const w = widthIn(width);
  return COACHMAN_SECTIONS[group]?.[design]?.find((b) => b.lo <= w && w <= b.hi)?.cost ?? null;
}

/** The designs built at a width, in the sheet's order. */
export function sectionDesignsAt(group: string, width: string): InsertDesign[] {
  return sectionDesigns(group).filter((d) => sectionCost(group, d.id, width) != null);
}

/** Section plus glass over the solid door, in cost; null where the design or the glass is not priced at the width. */
export function windowSectionCost(group: string, width: string, design: string, glassId: string): number | null {
  const section = sectionCost(group, design, width);
  const glass = glassAdder(group, "short", width, glassId);
  if (section == null || glass == null) return null;
  return Math.round((section + glass) * 100) / 100;
}

/** The same, lifted into the grid's SELL space. */
export function windowSectionSell(group: string, width: string, design: string, glassId: string): number | null {
  const cost = windowSectionCost(group, width, design, glassId);
  const margin = doorMargin(group);
  if (cost == null || margin == null) return null;
  return Math.round((cost / (1 - margin / 100)) * 100) / 100;
}
