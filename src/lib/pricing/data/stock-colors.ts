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

export function colorInStock(model: string, color: string): boolean {
  const list = STOCK_COLORS[model] ?? STOCK_COLORS[dataKey(model)] ?? [];
  const c = String(color || "").trim().toLowerCase();
  return list.some((x) => x.toLowerCase() === c);
}
