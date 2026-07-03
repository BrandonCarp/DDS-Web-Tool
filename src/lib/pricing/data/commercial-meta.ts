// Client-safe commercial metadata (option lists + per-foot rates shown in the UI).
// Ported from the production single-file tool. Sell matrices stay server-side.

export const COMM_COMPLETE_MODELS: Record<string, string[]> = {
  "Clopay": [
    "3200",
    "524"
  ]
};
export const COMM_SECTION_MODELS: Record<string, string[]> = {
  "Clopay": [
    "524",
    "524V",
    "524S",
    "3150",
    "3717",
    "3200",
    "3720"
  ],
  "Wayne Dalton": [
    "2415",
    "2415V",
    "2415S",
    "TS125",
    "TS150",
    "TS200"
  ],
  "Overhead": [
    "591",
    "592",
    "593"
  ],
  "Amarr": [
    "2742"
  ]
};
export const COMM_STD_SIZES: string[] = [
  "8.2",
  "9.2",
  "10.2",
  "12.2",
  "14.2",
  "16.2"
];
export const COMM_MATRIX_SIZES: Record<string, string[]> = {
  "3200": [
    "8′2″ × 8′0″",
    "8′2″ × 9′0″",
    "8′2″ × 10′0″",
    "8′2″ × 12′0″",
    "8′2″ × 14′0″",
    "8′2″ × 16′0″",
    "9′2″ × 8′0″",
    "9′2″ × 9′0″",
    "9′2″ × 10′0″",
    "9′2″ × 12′0″",
    "9′2″ × 14′0″",
    "9′2″ × 16′0″",
    "10′2″ × 8′0″",
    "10′2″ × 9′0″",
    "10′2″ × 10′0″",
    "10′2″ × 12′0″",
    "10′2″ × 14′0″",
    "10′2″ × 16′0″",
    "12′2″ × 8′0″",
    "12′2″ × 9′0″",
    "12′2″ × 10′0″",
    "12′2″ × 12′0″",
    "12′2″ × 14′0″",
    "12′2″ × 16′0″",
    "14′2″ × 8′0″",
    "14′2″ × 9′0″",
    "14′2″ × 10′0″",
    "14′2″ × 12′0″",
    "14′2″ × 14′0″",
    "14′2″ × 16′0″"
  ],
  "524": [
    "8′2″ × 8′0″",
    "8′2″ × 9′0″",
    "8′2″ × 10′0″",
    "8′2″ × 12′0″",
    "8′2″ × 14′0″",
    "8′2″ × 16′0″",
    "9′2″ × 8′0″",
    "9′2″ × 9′0″",
    "9′2″ × 10′0″",
    "9′2″ × 12′0″",
    "9′2″ × 14′0″",
    "9′2″ × 16′0″",
    "10′2″ × 8′0″",
    "10′2″ × 9′0″",
    "10′2″ × 10′0″",
    "10′2″ × 12′0″",
    "10′2″ × 14′0″",
    "10′2″ × 16′0″",
    "12′2″ × 8′0″",
    "12′2″ × 9′0″",
    "12′2″ × 10′0″",
    "12′2″ × 12′0″",
    "12′2″ × 14′0″",
    "12′2″ × 16′0″"
  ]
};
export const COMM_SECTION_WIDTHS: Record<string, string[]> = {
  "524": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "524V": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "524S": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3200": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3720": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3717": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ],
  "3150": [
    "8.2",
    "9.2",
    "10.2",
    "12.2",
    "14.2",
    "16.2"
  ]
};
export const SLAB_RATE: Record<string, number> = {
  "591": 49.5,
  "592": 54.5,
  "593": 48.5,
  "TS125": 33.5,
  "TS150": 37.5,
  "TS200": 44.5,
  "2415": 29,
  "2415V": 37,
  "2415S": 40.75,
  "2742": 41.5,
  "524": 29.0,
  "524V": 37.0,
  "524S": 40.75
};
export const SLAB_LABEL: Record<string, string> = {
  "591": "1-5/8″",
  "592": "2″",
  "593": "1-3/8″",
  "TS125": "1″",
  "TS150": "1-1/2″",
  "TS200": "2″",
  "2415": "2″ non-insulated",
  "2415V": "2″ vinyl backer",
  "2415S": "2″ steel backer",
  "2742": "2″",
  "524": "2″",
  "524V": "2″ vinyl backer",
  "524S": "2″ steel backer"
};
export const SLAB_ADDERS = {
  "retainer": 3.75,
  "stile_single": 20,
  "stile_double": 50,
  "window": 150
} as const;

export const COMM_COMPLETE = new Set(["3200", "524"]); // models with full-door matrix pricing

export function commMfrs(): string[] {
  return [...new Set([...Object.keys(COMM_COMPLETE_MODELS), ...Object.keys(COMM_SECTION_MODELS)])];
}
export function commModelsFor(mfr: string): string[] {
  return [...new Set([...(COMM_COMPLETE_MODELS[mfr] ?? []), ...(COMM_SECTION_MODELS[mfr] ?? [])])];
}
export function maxWindows(ft: number): number { if (ft <= 9) return 2; if (ft <= 13) return 3; if (ft <= 16) return 4; return 5; }
export function roundedFeet(ft: number, inch: number): number { return ft + (inch >= 5 ? 1 : 0); }
