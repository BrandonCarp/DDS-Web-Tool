// Ported 1:1 from the production single-file tool: CATALOG.inserts + INSERT_RULES
// + windowDesigns(). Contains design NAMES/availability only — no pricing — so it
// is safe to use in client components for the design dropdown. The engine
// re-validates the chosen design server-side before it reaches a quote.

export type InsertDesign = { id: string; name: string; cat?: string; w?: string[] };

export const DECORATIVE: InsertDesign[] = [
  { id: "509", name: "Colonial 509", cat: "short" },
  { id: "508", name: "Charleston 508", cat: "short" },
  { id: "510", name: "Prairie 510", cat: "short" },
  { id: "608", name: "Charleston 608", cat: "long" },
  { id: "610", name: "Prairie 610", cat: "long" },
  { id: "612", name: "Stockton 612", cat: "long" },
  { id: "611", name: "Madison 611", cat: "long" },
  { id: "613", name: "Madison Arch 613", cat: "long" },
  { id: "501", name: "Sunset 501", cat: "sunset", w: ["8", "9", "12", "16", "17", "18", "20"] },
  { id: "502", name: "Sunset 502", cat: "sunset", w: ["7", "7.6", "12"] },
  { id: "503", name: "Sunset 503", cat: "sunset", w: ["8", "9", "16", "17", "18"] },
  { id: "504", name: "Sunset 504", cat: "sunset", w: ["14", "15", "15.6"] },
  { id: "505", name: "Sunset 505", cat: "sunset", w: ["16", "17", "18"] },
  { id: "506", name: "Sunset 506", cat: "sunset", w: ["10", "20"] },
  { id: "507", name: "Sunset 507", cat: "sunset" },
  { id: "601", name: "Sunset 601", cat: "sunset" },
  { id: "603", name: "Sunset 603", cat: "sunset" },
  { id: "605", name: "Sunset 605", cat: "sunset", w: ["15", "15.6", "16", "17", "18"] },
];

/**
 * Gallery architectural inserts.
 *
 * Arch 1, Arch 2 and Arch 3 are separate inserts, not one design drawn three
 * ways — Brandon, 10/9/2026. The width lists reflect what Clopay actually
 * builds: Arch 2 is not offered at 16'0" and Arch 3 only is.
 */
export const ARCHITECTURAL: InsertDesign[] = [
  { id: "SQ24", name: "SQ24", cat: "arch" },
  { id: "SQ22", name: "SQ22", cat: "arch" },
  { id: "REC14", name: "REC14", cat: "arch" },
  { id: "REC12", name: "REC12", cat: "arch" },
  { id: "PLAINLONG", name: "Plain Long", cat: "arch" },
  { id: "PLAINSHORT", name: "Plain Short", cat: "arch" },
  { id: "ARCH1PLAIN", name: "Arch 1 Plain", cat: "arch" },
  { id: "ARCH1GRILLE", name: "Arch 1 Grille", cat: "arch" },
  { id: "ARCH1VERT", name: "Arch 1 Vertical Grille", cat: "arch" },
  { id: "ARCH2PLAIN", name: "Arch 2 Plain", cat: "arch", w: ["8", "9"] },
  { id: "ARCH2GRILLE", name: "Arch 2 Grille", cat: "arch", w: ["8", "9"] },
  { id: "ARCH2VERT", name: "Arch 2 Vertical Grille", cat: "arch", w: ["8", "9"] },
  { id: "ARCH3PLAIN", name: "Arch 3 Plain", cat: "arch", w: ["16"] },
  { id: "ARCH3GRILLE", name: "Arch 3 Grille", cat: "arch", w: ["16"] },
  { id: "ARCH3VERT", name: "Arch 3 Vertical Grille", cat: "arch", w: ["16"] },
];

// Which window designs each specific model can take.
// short = plain short windows (508/509/510 + Sunsets); shortlong adds long panels; all = everything.
export const INSERT_RULES: Record<string, "short" | "shortlong" | "all"> = {
  T50S: "short", T52S: "short", "4050": "short", "4300": "short", "9130": "short",
  "4051": "shortlong", "4053": "all", "9133": "all",
};

/** Resolve the width code used by the design width-restriction lists (e.g. 7'6" -> "7.6"). */
export function designWidthCode(wf: number, wi: number): string {
  const all = [...DECORATIVE, ...ARCHITECTURAL];
  const candidates: string[] = [];
  if (wi === 0) candidates.push(String(wf));
  else candidates.push(`${wf}.${wi}`);
  if (wi === 6 || wi === 8) candidates.push(`${wf}.6`);
  candidates.push(String(wf));
  for (const c of candidates) if (all.some((d) => d.w?.includes(c))) return c;
  return String(wf);
}

/**
 * Designs a model does not take, whatever the width rules would otherwise allow.
 *
 * DDS floors Sunset 507 in white, but not for the 4050 — Brandon's call from the
 * stocked-insert list, 10/9/2026.
 */
const MODEL_EXCLUDED_DESIGNS: Record<string, string[]> = {
  "4050": ["507"],
};

/** Designs a specific model will not take. */
export function excludedDesignsFor(unit: string): string[] {
  return MODEL_EXCLUDED_DESIGNS[unit] ?? [];
}

/** Window/insert designs available for the current door (specific model + style + width). */
export function windowDesigns(unit: string, style: string, widthCode: string | null): InsertDesign[] {
  if (style === "solid") return [];
  // Designs are INSERTS: only offered when the framing/insert selection is
  // "insert" (style === "inserts"). Plain glass gets no design on any model,
  // Gallery included — otherwise an insert could ride along at the glass price.
  if (style !== "inserts") return [];
  if (String(unit).indexOf("GD") === 0) {
    // Gallery inserts carry width lists too: Arch 2 is not built at 16'0" and
    // Arch 3 only is, so the same width filter applies here as below.
    return ARCHITECTURAL.filter(
      (d) => !d.w || (widthCode !== null && d.w.includes(widthCode)),
    );
  }
  const rule = INSERT_RULES[unit] ?? "all";
  const excluded = excludedDesignsFor(unit);
  return DECORATIVE.filter((d) => {
    if (excluded.includes(d.id)) return false;
    const is500 = String(d.id).charAt(0) === "5"; // 500-series = plain short windows + sunsets
    const catOk = rule === "all" ? true : rule === "shortlong" ? is500 || d.cat === "long" : is500;
    const widthOk = !d.w || (widthCode !== null && d.w.includes(widthCode));
    return catOk && widthOk;
  });
}

export function designName(id: string | undefined | null): string | null {
  if (!id) return null;
  const d = [...DECORATIVE, ...ARCHITECTURAL].find((x) => x.id === id);
  return d ? d.name : null;
}
