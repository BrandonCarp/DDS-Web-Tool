// Turning what the counter types into a configuration.
//
// People do not use the dropdowns' wording. They type "16x7 wh 509" or "gallery
// long panel 8x7 whit 12 radius key lock install" — abbreviations, mixed size
// formats, panel-style names rather than model numbers, and typos. All of it is
// drawn from closed lists, which is why this is a parser and not a model: nine
// models, twenty-one colours, thirty-three designs. Matching against a known
// vocabulary is exact, instant, free and testable, and an LLM in this path would
// be slower and less certain.
//
// The parser NEVER prices anything and never commits a configuration. It returns
// what it understood, with whatever remains ambiguous listed separately, so the
// caller can show it and let the counter confirm. A wrong guess applied silently
// is worse than no guess at all.

import { STOCK_MATRIX, stockedColors, sizeCode } from "./stock-colors";
import { DECORATIVE, ARCHITECTURAL } from "./inserts";
import { OPERATOR_CATALOGUE } from "./operator-catalogue";
import { STOCK_TORSION_SPRINGS, EXTENSION_SPRINGS, SHELF_PART_CATEGORIES } from "./springs";
import { commMfrs, commModelsFor } from "./commercial-meta";
import { SPECIAL_COMMERCIAL_SERIES, seriesFor } from "./special-orders";
import { VINYL_COLORS } from "./vinyl";

/** Which tool the request belongs on. */
export type ToolId =
  | "residential" | "commercial" | "special"
  | "torsion" | "extension" | "parts" | "vinyl" | "operators";

export interface ParsedRequest {
  /** Where to send the counter. */
  tool: ToolId;
  /** How sure we are the tool is right. Below 0.5 the caller should ask. */
  confidence: number;
  /** A door configuration, when the request is for one. */
  door?: ParsedDoor;
  /** An operator model or group, when one was named. */
  operator?: { model?: string; group?: string };
  /** A free-text term to hand to the destination tool's own search. */
  term?: string;
  /** Fields the text left genuinely open. */
  ambiguous: string[];
  unmatched: string[];
}

export interface ParsedDoor {
  /** Size in feet and inches, when one was found. */
  widthFt?: number;
  widthIn?: number;
  heightFt?: number;
  heightIn?: number;
  /** A single model, when the text named one outright. */
  model?: string;
  /** Candidates when a panel style was named instead of a model. */
  models?: string[];
  color?: string;
  style?: "solid" | "glass" | "inserts";
  windesign?: string;
  track?: string;
  spring?: "torsion" | "extension";
  lock?: string;
  /** "stock" or "stocked" appeared — the counter wants what is on the floor. */
  stockOnly?: boolean;
  /** Heavier hinges and rollers. */
  upgradedHardware?: boolean;
  /** Selling to a homeowner. */
  homeowner?: boolean;
  /** Glass grade, when one was named. */
  glass?: "ssb" | "dsb";
  /** Fields the text left genuinely open, for the caller to ask about. */
  ambiguous: string[];
  /** Words that matched nothing, so the UI can say what it ignored. */
  unmatched: string[];
}

/** Panel-style wording -> the models it could mean. Longest phrase wins. */
const PANEL_STYLE: Record<string, string[]> = {
  "gallery short panel": ["GD1SP"],
  "gallery long panel": ["GD1LP"],
  "gallery short": ["GD1SP"],
  "gallery long": ["GD1LP"],
  gallery: ["GD1SP", "GD1LP"],
  "short panel": ["4050", "9130", "T50S", "T52S"],
  "long panel": ["4053", "9133"],
  "flush panel": ["4051"],
  "modern flush": ["4051"],
  flush: ["4051"],
  short: ["4050", "9130", "T50S", "T52S"],
  long: ["4053", "9133"],
};

/** How colours get abbreviated on a work order. */
const COLOR_ALIAS: Record<string, string> = {
  wh: "White", w: "White", wht: "White",
  al: "Almond", alm: "Almond",
  bk: "Black", blk: "Black",
  cb: "Chocolate Brown", choc: "Chocolate Brown", chocolate: "Chocolate Brown",
  dt: "Desert Tan", tan: "Desert Tan",
  st: "Sandtone", sand: "Sandtone",
  brz: "Bronze",
  mb: "Mocha Brown", mocha: "Mocha Brown",
  ch: "Charcoal", charcoal: "Charcoal",
  io: "Iron Ore",
  hg: "Hunter Green", hunter: "Hunter Green",
};

const TRACK_PHRASE: Record<string, string> = {
  '10 radius': "r10", "10in radius": "r10", "10 rad": "r10",
  '12 radius': "r12", "12in radius": "r12", "12 rad": "r12",
  '15 radius': "r15", "15in radius": "r15", "15 rad": "r15",
  '20 radius': "r20", '32 radius': "r32",
  "low headroom": "low_headroom", "low hr": "low_headroom", lhr: "low_headroom",
};

const LOCK_PHRASE: Record<string, string> = {
  "key lock install": "lockbar_installed",
  "lockbar install": "lockbar_installed",
  "lock bar install": "lockbar_installed",
  "lockbar installed": "lockbar_installed",
  "lockbar assembly": "lockbar",
  "inside slide lock": "slide",
  "slide lock": "slide",
  lockbar: "lockbar",
  "no lock": "none",
};

const STYLE_PHRASE: Record<string, "solid" | "glass" | "inserts"> = {
  solid: "solid", "no windows": "solid",
  "plain glass": "glass", glass: "glass",
  inserts: "inserts", insert: "inserts", windows: "inserts",
};

/**
 * Shorthand the counter types that no product name contains.
 *
 * Each maps to the words a real entry will match. "lbi" is nobody's product
 * name, but "lockbar installed" is what it means — so the abbreviation expands
 * and the expansion does the searching.
 */
const SHORTHAND: Record<string, string> = {
  lbi: "lockbar installed", lba: "lockbar assembly", lb: "lockbar",
  isl: "inside slide lock", sl: "slide lock",
  th: "top handle", bb: "bottom bracket", ebp: "end bearing plate",
  cbp: "center bearing plate", jb: "jamb bracket",
  ts: "torsion spring", es: "extension spring", tk: "torsion kit", ek: "extension kit",
  op: "operator", lm: "liftmaster",
  qd: "quick disconnect", wb: "winding bar", sb: "spring bumper",
  dh: "decorative hardware", bs: "brush seal",
  lh: "low headroom", ug: "ultra-grain",
  // Track radius, written as a number and a letter.
  "10r": "10 radius", "12r": "12 radius", "15r": "15 radius",
  "20r": "20 radius", "32r": "32 radius",
  r10: "10 radius", r12: "12 radius", r15: "15 radius", r20: "20 radius", r32: "32 radius",
  // Springs.
  tor: "torsion", tors: "torsion", ext: "extension", extn: "extension",
  // Glass and windows.
  dsb: "double strength", ssb: "single strength",
  pl: "plain long", ps: "plain short",
  // The two surcharges.
  uh: "upgraded hardware", ho: "home owner",
  vm: "vinyl molding", pvc: "vinyl",
};

/** Expand any shorthand in a query, so the index search sees real words. */
export function expandShorthand(q: string): string {
  return q
    .split(/\s+/)
    .map((w) => SHORTHAND[w.toLowerCase()] ?? w)
    .join(" ");
}

/** Levenshtein distance, for catching a typed colour like "whit". */
function distance(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  const cur = new Array<number>(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev.splice(0, prev.length, ...cur);
  }
  return prev[b.length];
}

/** Closest entry within `max` edits, or null. Ties go to the shorter candidate. */
function nearest(token: string, options: string[], max = 2): string | null {
  let best: string | null = null;
  let bestD = Infinity;
  for (const o of options) {
    const d = distance(token.toLowerCase(), o.toLowerCase());
    if (d < bestD || (d === bestD && best && o.length < best.length)) { bestD = d; best = o; }
  }
  return bestD <= max ? best : null;
}

/**
 * Words that name a tool. Checked before anything else: "vinyl molding" is a
 * destination, not a door option, and sending someone to the right tab is more
 * useful than half-filling the wrong one.
 */
const TOOL_WORDS: Record<string, ToolId> = {
  "vinyl molding": "vinyl", "vinyl moulding": "vinyl", "vinyl stop": "vinyl",
  molding: "vinyl", moulding: "vinyl", vinyl: "vinyl", "door stop": "vinyl",
  "torsion spring": "torsion", "torsion springs": "torsion",
  "extension spring": "extension", "extension springs": "extension",
  operator: "operators", operators: "operators", opener: "operators",
  openers: "operators", liftmaster: "operators", motor: "operators",
  "special order": "special", "special": "special",
  commercial: "commercial",
  parts: "parts", part: "parts", hardware: "parts",
  cable: "parts", cables: "parts", roller: "parts", rollers: "parts",
  hinge: "parts", hinges: "parts", bracket: "parts", track: "parts",
};

const ALL_MODELS = ["T50S", "T52S", "4050", "4051", "4053", "9130", "9133", "GD1LP", "GD1SP"];
/**
 * Colours the parser will match.
 *
 * The floor, not the catalogue. The tool quotes stock, so matching "hunter
 * green" would fill in a colour no dropdown offers and leave the counter
 * wondering why the form disagrees with what they typed.
 */
const ALL_COLORS = [...new Set(
  Object.keys(STOCK_MATRIX).flatMap((m) => stockedColors(m)),
)];
const ALL_DESIGNS = [...DECORATIVE, ...ARCHITECTURAL].map((d) => d.id);

/**
 * Read a line of counter shorthand.
 *
 * Order matters: models are lifted out before the size is hunted for, because
 * "4050 9x7" otherwise reads as 50 x 9 — the model number is four digits and the
 * size pattern is greedy.
 */
export function parseDoorRequest(raw: string): ParsedDoor {
  const out: ParsedDoor = { ambiguous: [], unmatched: [] };
  // Expand first. The suggestion index already did this, which is why "lbi"
  // offered Lockbar installed and then parsed as an unrecognised word.
  let text = ` ${expandShorthand(raw.toLowerCase().replace(/[,;]/g, " ")).replace(/\s+/g, " ")} `;
  const consumed = new Set<string>();

  const take = (phrase: string) => {
    text = text.replace(` ${phrase} `, " ");
    for (const w of phrase.split(" ")) consumed.add(w);
  };

  // 1. an explicit model, removed before anything else reads the digits
  for (const m of ALL_MODELS) {
    if (text.includes(` ${m.toLowerCase()} `)) {
      out.model = m;
      out.models = [m];
      take(m.toLowerCase());
      break;
    }
  }

  // 2. multi-word phrases, longest first
  for (const table of [LOCK_PHRASE, TRACK_PHRASE] as const) {
    for (const k of Object.keys(table).sort((a, b) => b.length - a.length)) {
      if (text.includes(` ${k} `)) {
        if (table === LOCK_PHRASE) out.lock = table[k];
        else out.track = table[k];
        take(k);
        break;
      }
    }
  }
  if (!out.model) {
    for (const k of Object.keys(PANEL_STYLE).sort((a, b) => b.length - a.length)) {
      if (text.includes(` ${k} `)) {
        out.models = PANEL_STYLE[k];
        if (PANEL_STYLE[k].length > 1) out.ambiguous.push("model");
        take(k);
        break;
      }
    }
  }
  for (const k of Object.keys(STYLE_PHRASE).sort((a, b) => b.length - a.length)) {
    if (text.includes(` ${k} `)) { out.style = STYLE_PHRASE[k]; take(k); break; }
  }

  // 3. size — "16x7", "16 by 7", "8'0 x 7'0", "16 x 7'6"
  // The trailing inches must not run into the next token: "16x7 509" is a
  // 16x7 with design 509, not a 7'50" door.
  const size = text.match(
    /\s(\d{1,2})\s*(?:'|\u2032)?\s*(\d{1,2})?\s*(?:"|\u2033)?\s*(?:x|by)\s*(\d{1,2})\s*(?:(?:'|\u2032)\s*(\d{1,2})|(?:'|\u2032))?\s*(?:"|\u2033)?(?=\s|$)/,
  );
  if (size) {
    out.widthFt = Number(size[1]);
    out.widthIn = Number(size[2] ?? 0);
    out.heightFt = Number(size[3]);
    out.heightIn = Number(size[4] ?? 0);
    text = text.replace(size[0], " ");
  }

  if (/\bstock(ed)?\b/.test(text)) { out.stockOnly = true; take("stock"); take("stocked"); }
  if (text.includes(" upgraded hardware ")) { out.upgradedHardware = true; take("upgraded hardware"); }
  if (text.includes(" home owner ")) { out.homeowner = true; take("home owner"); }
  else if (text.includes(" homeowner ")) { out.homeowner = true; take("homeowner"); }
  if (text.includes(" double strength ")) { out.glass = "dsb"; take("double strength"); }
  else if (text.includes(" single strength ")) { out.glass = "ssb"; take("single strength"); }
  if (/\btorsion\b/.test(text)) { out.spring = "torsion"; take("torsion"); }
  else if (/\bextension\b|\bext\b/.test(text)) { out.spring = "extension"; take("extension"); take("ext"); }

  // 4. two-word colours first — "iron ore" and "desert tan" are single colours,
  //    and matching "tan" alone would leave "desert" looking unrecognised.
  for (const c of ALL_COLORS.filter((x) => x.includes(" ")).sort((a, b) => b.length - a.length)) {
    if (text.includes(` ${c.toLowerCase()} `)) { out.color = c; take(c.toLowerCase()); break; }
  }

  // 5. single tokens: design id, then colour (alias, then near-match)
  for (const w of text.trim().split(/\s+/).filter(Boolean)) {
    const up = w.toUpperCase();
    if (!out.windesign && ALL_DESIGNS.includes(up)) {
      out.windesign = up;
      out.style ??= "inserts";
      consumed.add(w);
      continue;
    }
    if (!out.color) {
      // An alias still has to name a floored colour — "hg" for Hunter Green
      // resolves, but Hunter Green is not on the floor, so it is not offered.
      if (COLOR_ALIAS[w] && ALL_COLORS.includes(COLOR_ALIAS[w])) {
        out.color = COLOR_ALIAS[w];
        consumed.add(w);
        continue;
      }
      if (w.length >= 3) {
        const c = nearest(w, ALL_COLORS);
        if (c) { out.color = c; consumed.add(w); continue; }
      }
    }
    if (!consumed.has(w) && !/^\d+$/.test(w)) out.unmatched.push(w);
  }

  // A design without a style means inserts; glass with no design stays plain.
  if (out.windesign && out.style === "solid") out.ambiguous.push("style");
  return out;
}

/** True when enough was understood to be worth filling the form with. */
export function isUsable(p: ParsedDoor): boolean {
  const hasSize = p.widthFt !== undefined && p.heightFt !== undefined;
  const hasModel = !!p.model || (p.models?.length ?? 0) > 0;
  return hasSize && hasModel;
}

/** Operator model names, e.g. GH101L5, flattened from the catalogue. */
function operatorNames(): { model: string; group: string }[] {
  type Group = { name: string; items?: { name: string }[] };
  const cat = OPERATOR_CATALOGUE as unknown as Group[] | Record<string, Group>;
  const groups: Group[] = Array.isArray(cat) ? cat : Object.values(cat);
  const out: { model: string; group: string }[] = [];
  for (const g of groups) {
    for (const it of g.items ?? []) out.push({ model: it.name, group: g.name });
  }
  return out;
}

/**
 * Work out where a request belongs, and fill in what the destination needs.
 *
 * Routing comes first. "vinyl molding" is a place to go, not a door option, and
 * an operator model number would otherwise be read as a window design. Only once
 * a door is the answer does the door parser run.
 *
 * Nothing here prices anything and nothing is applied without the counter
 * seeing it — the caller shows what was understood and waits for Get price.
 */
export function parseRequest(raw: string): ParsedRequest {
  const text = ` ${expandShorthand(raw.toLowerCase().replace(/[,;]/g, " ")).replace(/\s+/g, " ")} `;
  const res: ParsedRequest = { tool: "residential", confidence: 0, ambiguous: [], unmatched: [] };
  if (!raw.trim()) return res;

  // 1. an operator model named outright is the strongest signal there is
  for (const { model, group } of operatorNames()) {
    if (text.includes(` ${model.toLowerCase()} `)) {
      return { tool: "operators", confidence: 1, operator: { model, group }, ambiguous: [], unmatched: [] };
    }
  }

  // 2. a tool word, longest phrase first
  for (const k of Object.keys(TOOL_WORDS).sort((a, b) => b.length - a.length)) {
    if (text.includes(` ${k} `)) {
      res.tool = TOOL_WORDS[k];
      res.confidence = 0.9;
      // Strip the routing word and any other tool word: "liftmaster operator"
      // routes on "liftmaster" and should not search for "operator".
      let rest = text.replace(` ${k} `, " ");
      for (const other of Object.keys(TOOL_WORDS)) {
        if (TOOL_WORDS[other] === res.tool) rest = rest.replace(` ${other} `, " ");
      }
      rest = rest.replace(/\b(a|an|the|for|need|want|get|me)\b/g, " ").replace(/\s+/g, " ").trim();
      if (rest) res.term = rest;
      // A named door on the special order tab still wants its configuration.
      if (res.tool === "special" || res.tool === "commercial") {
        // Special order and commercial are NOT stock, so no narrowing there.
        const d = parseDoorRequest(raw);
        if (d.widthFt !== undefined || d.model) res.door = d;
      }
      if (res.tool === "operators") {
        // "liftmaster logic 5" names a group; keep it and drop it from the term
        // so the destination search is not handed a word it already used.
        const groups = operatorNames();
        const seen = new Set(groups.map((g) => g.group));
        const hit = [...seen].sort((a, b) => b.length - a.length)
          .find((g) => text.includes(` ${g.toLowerCase()} `));
        if (hit) {
          res.operator = { group: hit };
          res.term = text.replace(new RegExp(hit.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), " ")
            .replace(` ${k} `, " ").replace(/\s+/g, " ").trim() || undefined;
        }
      }
      return res;
    }
  }

  // 3. otherwise it is a residential door
  const door = restrictToStock(parseDoorRequest(raw));
  res.door = door;
  res.ambiguous = door.ambiguous;
  res.unmatched = door.unmatched;
  res.confidence = isUsable(door) ? 0.9 : door.widthFt !== undefined || door.model ? 0.5 : 0.2;
  return res;
}

/**
 * Narrow a parsed door to what DDS actually floors.
 *
 * The parser matches vocabulary; this decides whether the result can be
 * ordered. A model that is not stocked in the colour or size asked for has the
 * offending field cleared and named in `ambiguous`, so the UI can say what it
 * dropped rather than silently filling a configuration that quotes as a special
 * order.
 */
export function restrictToStock(d: ParsedDoor): ParsedDoor {
  const out: ParsedDoor = { ...d, ambiguous: [...d.ambiguous], unmatched: [...d.unmatched] };
  const w = out.widthFt !== undefined ? sizeCode(out.widthFt, out.widthIn ?? 0) : undefined;
  const h = out.heightFt !== undefined ? sizeCode(out.heightFt, out.heightIn ?? 0) : undefined;

  // Models that are floored at this size at all.
  const candidates = (out.model ? [out.model] : out.models ?? [])
    .filter((m) => stockedColors(m, w, h).length > 0);

  if (candidates.length === 0 && (out.model || out.models?.length)) {
    out.ambiguous.push("size");        // nothing is floored in that size
    return out;
  }
  if (candidates.length === 1) { out.model = candidates[0]; out.models = candidates; }
  else if (candidates.length > 1) { out.model = undefined; out.models = candidates; }

  // A colour has to be floored on the chosen model at the chosen size.
  if (out.color) {
    const ok = candidates.some((m) => stockedColors(m, w, h).includes(out.color!));
    if (!ok) { out.ambiguous.push("color"); out.color = undefined; }
  }
  return out;
}

/** One thing the counter might have meant. */
export interface Suggestion {
  /** What to show. */
  label: string;
  /** Where it lives. */
  tool: ToolId;
  /** Category or group, shown small beside the label. */
  hint?: string;
  /** Text to hand the destination tool. */
  term?: string;
  /** Lower sorts first. */
  rank: number;
}

/** Everything a partial string can match, built once. */
let INDEX: Suggestion[] | null = null;



function buildIndex(): Suggestion[] {
  const out: Suggestion[] = [];

  // Commercial: complete doors and sections, by manufacturer.
  for (const mfr of commMfrs()) {
    for (const m of commModelsFor(mfr)) {
      out.push({ label: m, tool: "commercial", hint: `${mfr} — commercial`, term: m, rank: 1 });
    }
  }
  // Special order: every Clopay collection and every commercial series model.
  for (const c of seriesFor("Clopay")) {
    out.push({ label: c, tool: "special", hint: "Clopay special order", term: c, rank: 2 });
  }
  for (const g of SPECIAL_COMMERCIAL_SERIES) {
    for (const m of g.models) {
      out.push({ label: m, tool: "special", hint: `${g.name} — special order`, term: m, rank: 2 });
    }
  }
  // Door options are not products, but they are things the counter asks for by
  // name. They build the residential line rather than sending anyone anywhere.
  for (const [label, hint] of [
    ["No lock", "Lock"], ["Inside slide lock", "Lock"],
    ["Lockbar assembly", "Lock"], ["Lockbar installed", "Lock"],
    ["10\" radius", "Track"], ["12\" radius", "Track"], ["15\" radius", "Track"],
    ["Low headroom", "Track"], ["20\" radius", "Track"], ["32\" radius", "Track"],
    ["Torsion springs", "Spring"], ["Extension springs", "Spring"],
    ["Upgraded hardware", "Option"], ["Home owner surcharge", "Option"],
  ] as const) {
    out.push({ label, tool: "residential", hint: `${hint} — door option`, term: label, rank: 2.5 });
  }

  for (const c of VINYL_COLORS) {
    out.push({ label: c, tool: "vinyl", hint: "Vinyl molding", term: c, rank: 3 });
  }

  for (const m of ALL_MODELS) {
    out.push({ label: m, tool: "residential", hint: "Stock door", term: m, rank: 0 });
  }
  for (const d of [...DECORATIVE, ...ARCHITECTURAL]) {
    out.push({ label: d.id, tool: "residential", hint: `Window \u2014 ${d.name}`, term: d.id, rank: 1 });
  }
  for (const { model, group } of operatorNames()) {
    out.push({ label: model, tool: "operators", hint: group, term: model, rank: 1 });
  }
  for (const [cat, tool] of [
    [STOCK_TORSION_SPRINGS, "torsion"],
    [EXTENSION_SPRINGS, "extension"],
  ] as const) {
    for (const it of cat?.items ?? []) {
      out.push({ label: it.name, tool, hint: it.sub ?? cat!.name, term: it.name, rank: 2 });
    }
  }
  for (const cat of SHELF_PART_CATEGORIES) {
    for (const it of cat.items ?? []) {
      out.push({ label: it.name, tool: "parts", hint: cat.name, term: it.name, rank: 3 });
    }
  }
  return out;
}

/**
 * Partial matches for what has been typed so far.
 *
 * Type-ahead, not parsing: "913" should offer the 9133 and "207" the torsion
 * springs wound on 207 wire, long before either is a complete request. The
 * parser answers "what is this"; this answers "what could this become".
 *
 * Ranked by where the match lands — a label that starts with the text beats one
 * that merely contains it, and a door beats a part when both match.
 */
export function suggest(raw: string, limit = 8): Suggestion[] {
  const q = expandShorthand(raw.trim()).toLowerCase();
  if (q.length < 2) return [];
  INDEX ??= buildIndex();

  const hits: (Suggestion & { score: number })[] = [];
  for (const s of INDEX) {
    const label = s.label.toLowerCase();
    const hint = (s.hint ?? "").toLowerCase();
    let where = -1;
    if (label.startsWith(q)) where = 0;
    else if (label.includes(q)) where = 1;
    else if (hint.startsWith(q)) where = 2;
    else if (hint.includes(q)) where = 3;
    if (where < 0) continue;
    hits.push({ ...s, score: where * 10 + s.rank });
  }
  hits.sort((a, b) => a.score - b.score || a.label.length - b.label.length || a.label.localeCompare(b.label));
  return hits.slice(0, limit).map(({ score: _score, ...rest }) => rest);
}
