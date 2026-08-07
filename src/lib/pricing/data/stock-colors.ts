// GENERATED from new_pricing_2026_V2.xlsx (COLORS IN STOCK blocks, per sheet).
// Which COLORS DDS actually stocks, per individual model — a door or section
// only counts as in stock if BOTH the size resolves from the stock tables AND
// the chosen color is on this list. Note the 4050 split: 4051/4053 stock
// White + Black only, while 4050 stocks the full five.

import { dataKey } from "../model-groups";

export const STOCK_COLORS: Record<string, string[]> = {
  "T50S": ["White"],
  "T52S": ["White"],
  "4050": ["White", "Almond", "Sandtone", "Chocolate Brown", "Black"],
  "4051": ["White", "Black"],
  "4053": ["White", "Black"],
  "9130": ["White"],
  "9133": ["White"],
  "4300": ["White"],
  "4301": ["White"],
  "4310": ["White"],
  "GD1LP": ["White"],
  "GD1SP": ["White"],
};

/**
 * Sizes where DDS stocks a NARROWER colour set than the model's normal list,
 * keyed by model then by exact door width in feet. An empty array means the
 * model is not stocked at that width at all.
 *
 * 18'0": the only 18-foot door on the floor is a 4050 in White. The 4050's
 * other four colours, and the whole 4051/4053 split, are special order at that
 * width even though they price off the shared 4050 stock sheet.
 */
export const STOCK_COLORS_BY_WIDTH: Record<string, Record<string, string[]>> = {
  "4050": { "18": ["White"] },
  "4051": { "18": [] },
  "4053": { "18": [] },
};

export function colorInStock(model: string, color: string, widthFt?: number): boolean {
  const bySize = widthFt != null ? STOCK_COLORS_BY_WIDTH[model]?.[String(widthFt)] : undefined;
  const list = bySize ?? STOCK_COLORS[model] ?? STOCK_COLORS[dataKey(model)] ?? [];
  const c = String(color || "").trim().toLowerCase();
  return list.some((x) => x.toLowerCase() === c);
}
