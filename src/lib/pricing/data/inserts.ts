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

/**
 * The Coachman's arched window sections — the five on CJ's Coachman sheet,
 * priced by width like the window designs (coachman-glass.ts) and built on
 * 3- and 4-window doors only. They are the window, not an insert over one;
 * the special order tab offers them only where the sheet prices them.
 */
export const COACHMAN_ARCH: InsertDesign[] = [
  { id: "ARC13A", name: "ARC13A", cat: "arch" },
  { id: "ARC14A", name: "ARC14A", cat: "arch" },
  { id: "ARC1A", name: "ARC1A", cat: "arch" },
  { id: "ARC3A", name: "ARC3A", cat: "arch" },
  { id: "ARC4A", name: "ARC4A", cat: "arch" },
];

/**
 * The Coachman's window designs on the double strength top section. Each is
 * priced on its own by width (CJ's workbook of 13/10/2026, coachman-glass.ts:
 * ARCH3 and ARCH4 twice the rest). Distinct from COACHMAN_ARCH, the arched
 * sections, built on 3- and 4-window doors only.
 */
export const COACHMAN_GLASS_DESIGNS: InsertDesign[] = [
  { id: "ARCH1", name: "ARCH1", cat: "glass" },
  { id: "ARCH3", name: "ARCH3", cat: "glass" },
  { id: "ARCH4", name: "ARCH4", cat: "glass" },
  { id: "ARCH13", name: "ARCH13", cat: "glass" },
  { id: "ARCH14", name: "ARCH14", cat: "glass" },
  { id: "REC11", name: "REC11", cat: "glass" },
  { id: "REC13", name: "REC13", cat: "glass" },
  { id: "REC14", name: "REC14", cat: "glass" },
  { id: "SQ23", name: "SQ23", cat: "glass" },
  { id: "SQ24", name: "SQ24", cat: "glass" },
];

/** Every window design the Coachman's line may name, in the sheet's order. */
export const COACHMAN_WINDOW_DESIGNS: InsertDesign[] = [...COACHMAN_GLASS_DESIGNS, ...COACHMAN_ARCH];

// Which window designs each specific model can take.
// short = plain short windows (508/509/510 + Sunsets); shortlong adds long panels; all = everything.
export const INSERT_RULES: Record<string, "short" | "shortlong" | "all"> = {
  T50S: "short", T52S: "short",
  // The 4050 takes long windows, so it takes the long-panel inserts too, as the
  // 4053 does — Brandon, 5/10/2026. The 9130 is the same door insulated.
  "4050": "shortlong", "9130": "shortlong",
  "4051": "shortlong", "4053": "all", "9133": "all",
  // The 4300 family takes the same window and insert options as the 4050 —
  // Brandon, 12/9/2026 — so the long-panel inserts too since the 4050 took
  // them (CJ's sheet of 16/10/2026 prices its long windows). 4301 and 4310
  // are listed so a member selected on the special order tab resolves without
  // falling back to "all".
  "4300": "shortlong", "4301": "shortlong", "4310": "shortlong",
};

/**
 * The Premium Steel doors CJ's workbook of 16/10/2026 prices: the 9130,
 * 9200, 4300 and 4050 families as it groups them. Every one takes the
 * standard windows by their order names (PLAIN_WINDOWS, or the short and
 * the long window where it lists neither) and the architectural series on
 * its own names — special order only; the stock tab is unchanged.
 */
export const PREMIUM_STEEL_MEMBERS: ReadonlySet<string> = new Set([
  "9130", "9131", "9132", "9133",
  "9200", "9201", "9202", "9203", "9205",
  "4300", "4301", "4302", "4305", "4310",
  "4050", "4051", "4053", "4132",
]);

/**
 * The Premium Steel doors that take the standard windows alone, never the
 * architectural series (Brandon, 22/10/2026): the 4050, 4051 and 4053. Their
 * sheet prices the series for the group, which the 4132 keeps.
 */
export const NO_ARCHITECTURAL_WINDOWS: ReadonlySet<string> = new Set(["4050", "4051", "4053"]);

/** True where a Premium Steel member takes the architectural series on a special order. */
export function takesArchitecturalSeries(member: string): boolean {
  return PREMIUM_STEEL_MEMBERS.has(String(member)) && !NO_ARCHITECTURAL_WINDOWS.has(String(member));
}

/**
 * The designs a SPECIAL ORDER door takes at a width (a size key, "11.6").
 *
 * A Gallery or Bridgeport door takes the architectural windows as Clopay's
 * size chart has them (Brandon, 15/10/2026): every one on a single or a
 * double door, except the Arch 3s — Arch 3 Plain, Grille on Arch 3, Vertical
 * Grille on Arch 3 — which the chart shows on double doors only, 11'6" and
 * wider. The stock tab keeps the stock widths (Arch 2 at 8' and 9', Arch 3 at
 * 16'); every other model keeps its own list.
 */
const ARCH3_FROM_INCHES = 11 * 12 + 6;
/**
 * `series` is the Premium Steel doors' choice (16/10/2026): their standard
 * windows take the decorative inserts the model's rule allows, and their
 * architectural series takes the architectural windows exactly as the Gallery
 * and Bridgeport do, grilles and plain arches alike.
 */
export function specialWindowDesigns(unit: string, style: string, width: string | null, series: "standard" | "architectural" = "standard"): InsertDesign[] {
  const [wf, wi] = (width ?? "").split(".");
  const architectural = /^(GD|BD)/.test(String(unit)) || (series === "architectural" && takesArchitecturalSeries(String(unit)));
  if (style !== "inserts" || !architectural) {
    return windowDesigns(unit, style, width ? designWidthCode(Number(wf), Number(wi ?? 0)) : null);
  }
  const inches = width ? Number(wf) * 12 + Number(wi ?? 0) : null;
  return ARCHITECTURAL.filter((d) => !/^ARCH3/.test(d.id) || (inches !== null && inches >= ARCH3_FROM_INCHES));
}

/** Resolve the width code used by the design width-restriction lists (e.g. 7'6" -> "7.6"). */
/**
 * The stock 4050 takes long-panel windows and long-panel inserts only at 8', 9'
 * and 16' wide — the widths DDS can do them in stock (Brandon, 6/10/2026). Other
 * widths offer short ones only. Special orders are not limited by this, and
 * a width not yet chosen is not held against a door.
 */
const STOCK_LONG_WIDTHS: Record<string, number[]> = { "4050": [8, 9, 16] };
export function stockLongAllowed(model: string, widthFt: number, widthIn: number): boolean {
  const only = STOCK_LONG_WIDTHS[model];
  if (!only || !Number.isFinite(widthFt) || widthFt <= 0) return true;
  return widthIn === 0 && only.includes(widthFt);
}

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
  // Same list as the 4050, so the same exclusion.
  "4300": ["507"], "4301": ["507"], "4310": ["507"],
  // Same list as the 4050, so the same exclusion — Brandon, 16/9/2026.
  T52S: ["507"], T52L: ["507"],
};

/** The inserts the stock Gallery doors take, in the order the dropdown lists them (Brandon, 22/10/2026). */
const STOCK_GALLERY_INSERTS: Record<string, readonly string[]> = {
  GD1SP: ["SQ24", "REC14", "ARCH1VERT", "ARCH1GRILLE"],
  GD1LP: ["SQ24", "REC14", "ARCH1VERT", "ARCH1GRILLE"],
};

/** Designs a specific model will not take. */
export function excludedDesignsFor(unit: string): string[] {
  return MODEL_EXCLUDED_DESIGNS[unit] ?? [];
}

/** Window/insert designs available for the current door (specific model + style + width). */
export function windowDesigns(unit: string, style: string, widthCode: string | null): InsertDesign[] {
  if (style === "solid") return [];
  // The Coachman's windows are a top section named by design, on plain glass
  // or any of its special glass: the ten window designs, then the five arched
  // sections (CJ's workbook of 13/10/2026 prices each one). It takes no
  // inserts. Which designs a width is built in is the sheet's
  // (coachman-windows.ts); this is every name the line may carry.
  if (String(unit) === "CD") return style === "glass" ? COACHMAN_WINDOW_DESIGNS : [];
  // Designs are INSERTS: only offered when the framing/insert selection is
  // "insert" (style === "inserts"). Plain glass gets no design on any model,
  // Gallery included — otherwise an insert could ride along at the glass price.
  if (style !== "inserts") return [];
  // The stock Gallery doors take four inserts (Brandon, 22/10/2026): SQ24,
  // REC14, the vertical grille on Arch 1 and the grille on Arch 1 — no plain
  // window and no other arch on the stock tab.
  const stockGallery = STOCK_GALLERY_INSERTS[String(unit)];
  if (stockGallery) return stockGallery.map((id) => ARCHITECTURAL.find((d) => d.id === id)!);
  if (/^(GD|BD)/.test(String(unit))) {
    // Gallery and Bridgeport Steel take the architectural windows (Clopay's
    // Bridgeport sheet lists the same SQ, REC and Arch designs). Their width
    // lists apply too: Arch 2 is not built at 16'0" and Arch 3 only is.
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
  const d = [...DECORATIVE, ...ARCHITECTURAL, ...COACHMAN_ARCH, ...COACHMAN_GLASS_DESIGNS].find((x) => x.id === id);
  return d ? d.name : null;
}

/**
 * The word after a design on the line (Brandon, 22/10/2026): an
 * architectural window — the 16" windows' grilles (REC12, SQ22, REC14,
 * SQ24) on the Premium and Modern Steel doors, the Gallery's and Bridgeport's
 * arch windows, the Coachman's window designs — is a "design"; the
 * decorative inserts (509, 608…) are "inserts", as they have always been.
 */
export function designWord(id: string | undefined | null): "design" | "inserts" {
  return !!id && [...ARCHITECTURAL, ...COACHMAN_ARCH, ...COACHMAN_GLASS_DESIGNS].some((x) => x.id === id) ? "design" : "inserts";
}

/**
 * A window's name without its size, for where the whole name will not fit
 * (Brandon, 22/10/2026 — the label on a narrow window of the drawing):
 * PLAIN SHORT 19-1/2" X 12" is "PLAIN SHORT", short 19 1/2x16 is "short",
 * black slim 37x8 is "black slim"; a name with no size (ARCH 1) is itself.
 */
export function shortWindowName(name: string): string {
  return name.replace(/\s+[\d\s\-\/]+"?\s*x\s*[\d\s\-\/]+"?\s*$/i, "").trim() || name;
}

/** "SQ24 design", "Colonial 509 inserts": a design named with its word. */
export function designClause(id: string | undefined | null): string | null {
  const name = designName(id);
  return name ? `${name} ${designWord(id)}` : null;
}


/**
 * The plain (no-insert) windows each stock model takes, by the name they go on
 * the order under — short or long matters to whoever pulls the door. Listed
 * models offer these, then Inserts where they take them (Brandon, 25/9/2026).
 * A model not listed keeps the plain / insert pair.
 *
 * Every plain window prices as the door's glass price; only the description
 * changes. The engine checks a window against this list before using it.
 */
const PLAIN_SHORT = 'PLAIN SHORT 19-1/2" X 12"';
const PLAIN_LONG = 'PLAIN LONG 40-1/2" X 12"';
const GALLERY_LONG = 'PLAIN LONG 42" X 16"';
const GALLERY_ARCH = "ARCH 1";
export const PLAIN_WINDOWS: Record<string, readonly string[]> = {
  T50S: [PLAIN_SHORT],
  "4050": [PLAIN_SHORT, PLAIN_LONG],
  "9130": [PLAIN_SHORT, PLAIN_LONG],
  "4053": [PLAIN_LONG],
  "9133": [PLAIN_LONG],
  // Both Gallery doors take the long window or the arch, then Inserts —
  // GD1LP from 25/9/2026, GD1SP matched to it on 28/9/2026 (Brandon); the
  // arch is "ARCH 1" on the stock tab (22/10/2026).
  GD1SP: [GALLERY_LONG, GALLERY_ARCH],
  GD1LP: [GALLERY_LONG, GALLERY_ARCH],
};

/** Models offered no inserts at all. None today: the GD1SP took them from 28/9/2026. */
const NO_INSERTS = new Set<string>();

export function plainWindowsFor(model: string): readonly string[] {
  return PLAIN_WINDOWS[model] ?? [];
}

/**
 * The plain windows a Gallery or Bridgeport door takes on a special order —
 * Brandon, 14/10/2026: the two collections share the names, the short window
 * a special order takes and the stock Gallery does not, then the long and the
 * arch the stock tab already names. The other plain arches (Arch 2 at 8' and
 * 9', Arch 3 at 16') come off the architectural list as they do today.
 */
const SHEET_PLAIN_SHORT = 'PLAIN SHORT 19-1/2" X 16"';
export const SPECIAL_PLAIN_WINDOWS: readonly string[] = [SHEET_PLAIN_SHORT, GALLERY_LONG, "PLAIN ARCH 1"];
/** The standard windows every Premium Steel door takes, where PLAIN_WINDOWS does not say otherwise. */
const PREMIUM_PLAIN_WINDOWS: readonly string[] = [PLAIN_SHORT, PLAIN_LONG];

/**
 * The plain windows a model names on a special order: the Gallery and
 * Bridgeport list, or the model's own. A Premium Steel door's architectural
 * series (16/10/2026) names the same 16" windows the Gallery does, and its
 * standard series the short and the long window unless the model lists its
 * own (the flush 4053 and 9133 take the long alone).
 */
export function specialPlainWindowsFor(model: string, series: "standard" | "architectural" = "standard"): readonly string[] {
  if (/^(GD|BD)/.test(model)) return SPECIAL_PLAIN_WINDOWS;
  if (PREMIUM_STEEL_MEMBERS.has(model)) {
    if (series === "architectural" && takesArchitecturalSeries(model)) return SPECIAL_PLAIN_WINDOWS;
    return PLAIN_WINDOWS[model] ?? PREMIUM_PLAIN_WINDOWS;
  }
  return plainWindowsFor(model);
}

export function takesInserts(model: string): boolean {
  return !NO_INSERTS.has(model);
}
