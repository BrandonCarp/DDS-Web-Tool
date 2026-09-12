// GENERATED from new_pricing_2026_V2.xlsx (SECTIONS blocks, per model sheet).
// SELL prices per replacement section. 18" and 21" heights share one price
// (the sheet lists them as a single 18"/21" row). Values are verbatim from
// the workbook, including the 7'6" rows, which the engine now reads directly.

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
    "7":{ "bottom": 214.18, "inter": 188.43, "glazed": 334.65 }, //{ "bottom": 199.90, "inter": 175.88, "glazed": 322.10 },
    "7.6": { "bottom": 214.18, "inter": 188.43, "glazed": 334.65 },
    "8": { "bottom": 228.45, "inter": 201.0, "glazed": 395.98 },
    "9": { "bottom": 257.04, "inter": 226.10, "glazed": 421.08 },
    "10": { "bottom": 285.57, "inter": 251.22, "glazed": 494.92 },
    "12": { "bottom": 342.69, "inter": 301.45, "glazed": 593.92 },
    "14": { "bottom": 399.80, "inter": 351.71, "glazed": 692.90 },
    "15": { "bottom": 428.37, "inter": 376.84, "glazed": 718.04 },
    "16": { "bottom": 456.92, "inter": 401.96, "glazed": 791.92 },
    "18": { "bottom": 514.04, "inter": 452.22, "glazed": 842.18 },
  },
  "9130-9133": {
    "8": { "bottom": 268.47, "inter": 236.16, "glazed": 465.27 },
    "9": { "bottom": 302, "inter": 265.67, "glazed": 494.78 },
    "16": { "bottom": 536.90, "inter": 472.35, "glazed": 930.59 },
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
