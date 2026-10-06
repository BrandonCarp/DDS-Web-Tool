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
  "1500": ["8", "9"],
  "73": ["8", "9"],
};

/**
 * Models DDS stocks only as replacement sections — no complete door and no
 * sections-only order: the Clopay Value Steel 1500 and 73 (Brandon, 6/10/2026).
 * They list beside the T50S and T52S in the Value Steel Collection.
 */
/**
 * The order they are listed in. Kept as a list on purpose: an object's keys
 * would put "73" before "1500", because JavaScript lists number-like keys
 * first, in numeric order.
 */
export const SECTION_ONLY_LIST: readonly string[] = ["1500", "73"];

export const SECTION_ONLY_MODELS: Record<string, { collection: string }> = {
  "1500": { collection: "Value Steel Collection" },
  "73": { collection: "Value Steel Collection" },
};

/** Models whose 18" sections come solid only: bottoms and intermediates, no glass. */
export const NO_GLASS_AT_18: ReadonlySet<string> = new Set(["1500", "73"]);

export function sectionWidthLabel(key: string): string {
  const [ft, inch] = key.split(".");
  return `${ft}'${inch ?? 0}\"`;
}
