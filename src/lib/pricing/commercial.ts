// Ported 1:1 from the production single-file tool: buildCommQuote() +
// commStockCheck() + the complete-door description builder. Server-side only.

import { COMM_MATRIX, COMM_SECTIONS, COMM_SLAB, STOCK_COMM, GRADE_COMM } from "./data/commercial";
import { COMM_COMPLETE, maxWindows, roundedFeet } from "./data/commercial-meta";

export interface CommQuoteLine { name: string; value: number; kind: "base" | "add" | "minus" }
export interface CommQuote {
  priced: boolean;
  incomplete?: string;
  warn?: string;
  lines: CommQuoteLine[];
  unitPrice: number;
  sub: string;
  description?: string;
  stock?: { inStock: boolean };
}

export interface CommCompleteInput {
  order: "complete";
  mfr: string; model: string;
  size: string;                       // matrix size label, e.g. "8′2″ × 8′0″"
  glass: "solid" | "glass";
  track: "15R" | "FV" | "LHR";
  mount: "continuous" | "reverse";
  cspring: "torsion" | "extension";
  clock: "none" | "slide";
}
export interface CommSectionInput {
  order: "section";
  mfr: string; model: string;
  widthMode: "standard" | "manual";
  secSize?: string;                   // standard width key, e.g. "8.2"
  manFt?: number; manIn?: number;     // manual width
  secKind: "bt" | "int";
  secHeight: "21" | "24";
  windows?: number;                   // intermediate sections only
  retainer?: boolean;                 // bottom + per-foot only
  stile?: "none" | "single" | "double"; // per-foot only
}
export type CommInput = CommCompleteInput | CommSectionInput;

// size labels are like 8′2″ × 8′0″ ; width token = "8.2"
function commWidthToken(label: string): string {
  const m = String(label).match(/(\d+)′(\d+)″/);
  return m ? `${m[1]}.${m[2]}` : "";
}
export function commStockCheck(model: string, sizeLabel: string): { inStock: boolean } {
  const wtok = commWidthToken(sizeLabel);
  const hit = STOCK_COMM.find((s) => s.model === String(model) && s.widths.includes(wtok));
  return { inStock: !!hit };
}

export function quoteCommercial(input: CommInput): CommQuote {
  const base: CommQuote = { priced: false, lines: [], unitPrice: 0, sub: "" };
  const model = input.model;

  // 1) Complete door — Clopay matrix (3200 / 524)
  if (input.order === "complete") {
    const cat = COMM_MATRIX[model];
    if (!cat) return { ...base, incomplete: "No complete-door pricing for this model" };
    if (!input.size) return { ...base, incomplete: "Select a size" };
    const row = cat.sizes[input.size];
    if (!row) return { ...base, incomplete: "Select a size" };
    const key = input.glass + input.track;
    const val = row[key];
    const ref = row[input.glass + "15R"];
    if (val == null) return { ...base, incomplete: "Option not offered for this size" };
    const warn =
      ref != null && val < ref * 0.6
        ? "This price looks wrong in the source sheet — verify with Clopay before quoting."
        : undefined;
    const glassNm = input.glass === "solid" ? "Solid" : "Glass";
    const trackNm = { "15R": "15R standard", FV: "Full view", LHR: "Low headroom" }[input.track];
    const dimTxt = String(input.size).replace(/x/i, " x ");
    const cgrade = GRADE_COMM[model] || "insulated";
    const winTxt =
      input.glass === "glass" ? (model === "3200" ? "insulated 24x12 windows" : `${cgrade} windows`) : "solid, no windows";
    const mountTxt = input.mount === "reverse" ? "2″ angle mount track to steel" : "2″ angle mount track to wood";
    const radiusTxt = { "15R": "15″ radius track", FV: "full view", LHR: "low headroom track" }[input.track];
    const cspringTxt = input.cspring === "extension" ? "extension springs" : "torsion springs";
    const clockTxt = input.clock === "slide" ? "inside slide lock" : "no lock";
    return {
      priced: true,
      warn,
      lines: [{ name: `${glassNm}, ${trackNm}`, value: val, kind: "base" }],
      unitPrice: val,
      sub: `${input.size} · ${glassNm} · ${trackNm}`,
      stock: commStockCheck(model, input.size),
      description: `${input.mfr || "Clopay"} Model ${model}, ${dimTxt}, ${winTxt}, ${mountTxt}, ${radiusTxt}, ${cspringTxt}, ${clockTxt}`,
    };
  }

  // 2) Replacement section — stock cost @ margin for stocked Clopay standard
  //    sizes, per-foot otherwise.
  const hasCost = !!COMM_SECTIONS.cost[model];
  const hasRate = COMM_SLAB.rate[model] != null;
  const perFoot = hasRate && (input.widthMode === "manual" || !hasCost);

  let ft: number, inch: number, widthLabel: string, secSizeKey: string | null = null;
  if (input.widthMode === "manual" && hasRate) {
    ft = Math.trunc(Number(input.manFt));
    inch = Math.trunc(Number(input.manIn)) || 0;
    if (!Number.isFinite(ft) || ft <= 0) return { ...base, incomplete: "Enter the door width" };
    widthLabel = `${ft}′${inch ? inch + "″" : ""}`;
  } else {
    if (!input.secSize) return { ...base, incomplete: "Select a width" };
    secSizeKey = input.secSize;
    const m = input.secSize.split(".");
    ft = parseInt(m[0], 10);
    inch = parseInt(m[1] || "0", 10);
    widthLabel = `${ft}′${inch ? inch + "″" : ""}`;
  }
  const rFeet = roundedFeet(ft, inch);
  const kindNm = input.secKind === "bt" ? "Bottom" : "Intermediate";
  const sub = `${widthLabel} · ${kindNm} · ${input.secHeight}″`;
  const lines: CommQuoteLine[] = [];

  if (perFoot) {
    const rate = COMM_SLAB.rate[model];
    lines.push({ name: `${kindNm} section · ${rFeet}′ × $${rate}/ft`, value: rate * rFeet, kind: "base" });
    if (input.secKind === "bt" && input.retainer)
      lines.push({ name: `Bottom retainer & rubber · ${rFeet}′`, value: COMM_SLAB.adders.retainer * rFeet, kind: "add" });
    if (input.stile === "single") lines.push({ name: "Single end stiles", value: COMM_SLAB.adders.stile_single, kind: "add" });
    if (input.stile === "double") lines.push({ name: "Double end stiles", value: COMM_SLAB.adders.stile_double, kind: "add" });
  } else {
    const cost = (COMM_SECTIONS.cost[model]?.[secSizeKey as string] as Record<string, number> | undefined)?.[input.secKind];
    if (cost == null) return { ...base, sub, incomplete: "Not available for this size" };
    lines.push({ name: `${kindNm} section`, value: cost / (1 - COMM_SECTIONS.margin / 100), kind: "base" });
  }
  // windows on any intermediate section
  if (input.secKind === "int") {
    const n = Math.trunc(Number(input.windows)) || 0;
    const mx = maxWindows(rFeet);
    if (n > 0) lines.push({ name: `Windows ×${Math.min(n, mx)}`, value: COMM_SLAB.adders.window * Math.min(n, mx), kind: "add" });
  }
  const unitPrice = lines.reduce((a, l) => a + (l.kind === "minus" ? -l.value : l.value), 0);
  return { priced: true, lines, unitPrice, sub };
}
