// GENERATED from new_pricing_2026_V2.xlsx (SECTIONS blocks, per model sheet).
// SELL prices per replacement section. 18" and 21" heights share one price
// (the sheet lists them as a single 18"/21" row). Values are verbatim from
// the workbook — the 7'6" -> 8'0" pricing rule is applied in the engine, not here.

export type ResSectionRow = { bottom: number; inter: number; glazed: number };

export const RES_SECTIONS: Record<string, Record<string, ResSectionRow>> = {
  "T50S": {
    "7.6": { "bottom": 150.82, "inter": 123.16, "glazed": 235.53 },
    "8": { "bottom": 160.86, "inter": 131.35, "glazed": 281.22 },
    "9": { "bottom": 180.98, "inter": 147.78, "glazed": 297.65 },
    "10": { "bottom": 201.1, "inter": 164.18, "glazed": 351.49 },
    "12": { "bottom": 241.31, "inter": 197.04, "glazed": 421.8 },
    "15": { "bottom": 301.61, "inter": 246.27, "glazed": 508.51 },
    "16": { "bottom": 321.73, "inter": 262.71, "glazed": 562.39 },
  },
  "T52S": {
    "8": { "bottom": 241.43, "inter": 210.49, "glazed": 360.35 },
    "9": { "bottom": 271.61, "inter": 236.82, "glazed": 386.69 },
    "10": { "bottom": 301.78, "inter": 263.12, "glazed": 450.43 },
    "16": { "bottom": 482.86, "inter": 421.0, "glazed": 720.69 },
  },
  "4050-4051-4053": {
    "7": { "bottom": 242.3, "inter": 215.97, "glazed": 401.62 },
    "7.6": { "bottom": 242.3, "inter": 215.97, "glazed": 401.62 },
    "8": { "bottom": 217.3, "inter": 190.97, "glazed": 376.62 },
    "9": { "bottom": 244.48, "inter": 215.08, "glazed": 400.54 },
    "10": { "bottom": 271.63, "inter": 238.95, "glazed": 470.79 },
    "12": { "bottom": 325.95, "inter": 286.76, "glazed": 564.95 },
    "14": { "bottom": 380.29, "inter": 334.52, "glazed": 659.08 },
    "15": { "bottom": 407.48, "inter": 358.46, "glazed": 683.02 },
    "16": { "bottom": 434.62, "inter": 382.32, "glazed": 753.27 },
    "18": { "bottom": 493.8, "inter": 434.42, "glazed": 809.02 },
  },
  "9130-9133": {
    "8": { "bottom": 259.92, "inter": 228.65, "glazed": 450.25 },
    "9": { "bottom": 292.43, "inter": 257.25, "glazed": 478.84 },
    "16": { "bottom": 519.84, "inter": 457.11, "glazed": 900.57 },
  },
  "4300": {
    "8": { "bottom": 225.56, "inter": 200.86, "glazed": 375.97 },
    "9": { "bottom": 253.78, "inter": 225.97, "glazed": 401.06 },
    "16": { "bottom": 451.14, "inter": 401.75, "glazed": 751.97 },
  },
  "GD1LP-GD1SP": {
    "8": { "bottom": 242.84, "inter": 213.59, "glazed": 547.49 },
    "9": { "bottom": 273.2, "inter": 240.27, "glazed": 574.18 },
    "16": { "bottom": 485.69, "inter": 427.16, "glazed": 1094.98 },
  },
};
