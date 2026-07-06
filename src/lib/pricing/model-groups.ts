// Some catalog entries cover several door models that share one price table
// (e.g. 4050/4051/4053, GD1LP/GD1SP). We expose those as INDEPENDENT selections
// in the UI while resolving their catalog lookups back to the shared data key, so
// a quote shows the specific model the user picked. Pricing is identical across a
// split until a model is given its own catalog entry.
//
// To split another grouped model (e.g. "9130-9133"), just add a line to MODEL_SPLIT.
// To give a split model its own pricing later, add its own key to the data files and
// remove it from the group here.

/** Grouped catalog key -> the individual models it should appear as in the selector. */
export const MODEL_SPLIT: Record<string, string[]> = {
  "4050-4051-4053": ["4050", "4051", "4053"],
  // 4301/4310 share the 4300 price tables (special-order variants of the same door)
  "4300": ["4300", "4301", "4310"],
  "9130-9133": ["9130", "9133"],
  "GD1LP-GD1SP": ["GD1LP", "GD1SP"],
};

/** Individual model -> the catalog key that holds its data. */
export const MODEL_DATA_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(MODEL_SPLIT).flatMap(([group, members]) => members.map((m) => [m, group])),
);

/** Resolve a (possibly split) model to the catalog key that stores its data. */
export function dataKey(model: string): string {
  return MODEL_DATA_KEY[model] ?? model;
}

/** Expand grouped catalog keys into the individual models shown in the selector. */
export function expandModels(keys: string[]): string[] {
  return keys.flatMap((k) => MODEL_SPLIT[k] ?? [k]);
}

/** Display order for the model selector within each collection. */
export const MODEL_ORDER = ["T50S", "T52S", "4050", "4051", "4053", "4300", "4301", "4310", "9130", "9133", "GD1LP", "GD1SP"];

export function modelSort(a: string, b: string): number {
  const ia = MODEL_ORDER.indexOf(a), ib = MODEL_ORDER.indexOf(b);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
}
