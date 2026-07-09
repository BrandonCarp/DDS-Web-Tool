// GENERATED from new_pricing_2026_V2.xlsx — width OPTIONS only, no pricing,
// so it is safe to import in client components (same pattern as inserts.ts).
// Sections are stock-size dropdowns only (no free width input) per Brandon, 7/2026.

export const RES_SECTION_WIDTHS: Record<string, string[]> = {
  "T50S": ["7.6", "8", "9", "10", "12", "15", "16"],
  "T52S": ["8", "9", "10", "16"],
  "4050-4051-4053": ["7", "7.6", "8", "9", "10", "12", "14", "15", "16", "18"],
  "9130-9133": ["8", "9", "16"],
  "4300": ["8", "9", "16"],
  "GD1LP-GD1SP": ["8", "9", "16"],
};

export function sectionWidthLabel(key: string): string {
  const [ft, inch] = key.split(".");
  return `${ft}'${inch ?? 0}\"`;
}
