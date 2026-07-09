// GENERATED from new_pricing_2026_V2.xlsx (SECTIONS blocks, per model sheet).
// SELL prices per replacement section. 18" and 21" heights share one price
// (the sheet lists them as a single 18"/21" row). Values are verbatim from
// the workbook — the 7'6" -> 8'0" pricing rule is applied in the engine, not here.

export type ResSectionRow = { bottom: number; inter: number; glazed: number };

export const RES_SECTIONS: Record<string, Record<string, ResSectionRow>> = {
  "T50S": {
    "7.6": { "bottom": 192.6, "inter": 161.84, "glazed": 317.95 },
    "8": { "bottom": 167.5, "inter": 136.84, "glazed": 292.95 },
    "9": { "bottom": 188.54, "inter": 153.94, "glazed": 310.05 },
    "10": { "bottom": 209.49, "inter": 171.06, "glazed": 366.21 },
    "12": { "bottom": 251.4, "inter": 205.27, "glazed": 439.43 },
    "15": { "bottom": 314.25, "inter": 256.57, "glazed": 529.78 },
    "16": { "bottom": 335.19, "inter": 273.68, "glazed": 585.9 },
  },
  "T52S": {
    "8": { "bottom": 235.65, "inter": 205.46, "glazed": 351.71 },
    "9": { "bottom": 265.1, "inter": 231.13, "glazed": 377.38 },
    "10": { "bottom": 294.54, "inter": 256.81, "glazed": 439.63 },
    "16": { "bottom": 471.29, "inter": 410.89, "glazed": 703.41 },
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
    "8": { "bottom": 250.73, "inter": 220.53, "glazed": 565.28 },
    "9": { "bottom": 282.05, "inter": 248.08, "glazed": 592.83 },
    "16": { "bottom": 501.48, "inter": 441.03, "glazed": 1130.53 },
  },
};
