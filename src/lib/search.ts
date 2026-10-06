/**
 * The quick search in the top bar — Brandon, 30/9/2026.
 *
 * One index over everything a counter picks from: the tabs themselves, every
 * door on the three door tabs (stock residential, stock commercial and every
 * special order model), every part (Parts, Track, Cables), every extension and
 * stock torsion spring (kits included), and every operator. A hit says which tab it opens and what to
 * select there, so choosing it lands on the item already picked.
 *
 * Nothing here touches the page, so it is tested on its own (search.test.ts).
 */
import {
  PARTS_TAB_CATEGORIES, TRACK_CATEGORIES, CABLE_CATEGORIES, EXTENSION_SPRINGS, STOCK_TORSION_SPRINGS,
} from "@/lib/pricing/data/springs";
import type { PartCategory } from "@/lib/pricing/data/parts";
import { OPERATOR_CATALOGUE } from "@/lib/pricing/data/operator-catalogue";
import { operatorPrice } from "@/lib/pricing/data/operator-pricing";
import { priceNotSet } from "@/lib/pricing/data/part-pricing";
import { tabForPart } from "@/lib/pricing/data/parts-menu";
import { COLLECTIONS } from "@/lib/pricing/data/catalog-meta";
import { dataKey } from "@/lib/pricing/model-groups";
import { SECTION_ONLY_MODELS } from "@/lib/pricing/data/res-section-meta";
import { commMfrs, commModelsFor, SLAB_LABEL } from "@/lib/pricing/data/commercial-meta";
import {
  SPECIAL, SO_MANUFACTURERS, seriesFor, SPECIAL_COMMERCIAL, SPECIAL_COMMERCIAL_SERIES, SPECIAL_COMMERCIAL_PINNED,
} from "@/lib/pricing/data/special-orders";
import { shouldSplitGroup, groupMembers, modelSelectionValue } from "@/lib/pricing/data/special-door-pricing";

/** What to select on arrival. */
export type SearchPick =
  | { kind: "part"; category: string; name: string }
  | { kind: "spring"; name: string }
  | { kind: "operator"; group: string; section: string; desc: string }
  /** A door opens its tab at step 1 with the door chosen, ready to configure. */
  | { kind: "resdoor"; model: string }
  | { kind: "commdoor"; mfr: string; model: string }
  | { kind: "sodoor"; scope: "residential" | "commercial"; mfr: string; series: string; model: string };

export type SearchHit = {
  id: string;
  /** The tab it opens. */
  tab: string;
  label: string;
  detail: string;
  /** "$59.95", "$3.75 / ft", or null where there is no price to show. */
  price: string | null;
  /** Nothing for a tab: choosing a tab just opens it. */
  pick?: SearchPick;
};

type Entry = SearchHit & { hay: string };

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function partEntries(cats: PartCategory[], tabOf: string | ((category: string, name: string) => string)): Entry[] {
  return cats.flatMap((c) =>
    c.items.map((p) => {
      const tab = typeof tabOf === "string" ? tabOf : tabOf(c.name, p.name);
      return {
      id: `${tab}|${c.name}|${p.name}|${p.desc}`,
      tab, label: p.name, detail: p.desc || c.name,
      price: priceNotSet(p) ? null : p.perFoot ? `${money(p.price)} / ft` : money(p.price),
      pick: { kind: "part" as const, category: c.name, name: p.name },
      hay: `${p.name} ${p.desc} ${c.name}`.toLowerCase(),
      };
    }),
  );
}

function springEntries(cat: PartCategory, tab: string): Entry[] {
  return cat.items.map((p) => ({
    id: `${tab}|${p.name}|${p.desc}`,
    tab, label: p.name, detail: p.desc,
    price: money(p.price),
    pick: { kind: "spring" as const, name: p.name },
    hay: `${p.name} ${p.desc} ${cat.name}`.toLowerCase(),
  }));
}

function door(tab: string, id: string, label: string, detail: string, pick: SearchPick): Entry {
  return { id: `${tab}|${id}`, tab, label, detail, price: null, pick, hay: `${label} ${detail}`.toLowerCase() };
}

/**
 * Every door the three door tabs offer, in the same shape as their own step-1
 * lists: the stocked residential models (the server's list), every stock
 * commercial model, and every special order model — a split group such as
 * 4050/4051/4053 as its separate models, and a collection with no model list
 * as the collection itself.
 */
function doorEntries(open: Set<string>, residentialModels: readonly string[]): Entry[] {
  const out: Entry[] = [];
  if (open.has("residential")) {
    for (const m of residentialModels) {
      out.push(door("residential", m, m,
        SECTION_ONLY_MODELS[m] ? `Stock sections, ${SECTION_ONLY_MODELS[m].collection}` : `Stock residential door, ${COLLECTIONS[dataKey(m)] || "Other"}`,
        { kind: "resdoor", model: m }));
    }
  }
  if (open.has("commercial")) {
    for (const mfr of commMfrs()) {
      for (const m of commModelsFor(mfr)) {
        out.push(door("commercial", `${mfr}|${m}`, m,
          `Stock commercial door, ${mfr}${SLAB_LABEL[m] ? `, ${SLAB_LABEL[m]}` : ""}`,
          { kind: "commdoor", mfr, model: m }));
      }
    }
  }
  if (open.has("special")) {
    for (const mfr of SO_MANUFACTURERS) {
      for (const series of seriesFor(mfr)) {
        const models = SPECIAL[series]?.models;
        const where = mfr === series ? mfr : `${mfr} ${series}`;
        if (!models) {
          out.push(door("special", `res|${mfr}|${series}`, series, `Special order, ${mfr}`,
            { kind: "sodoor", scope: "residential", mfr, series, model: "" }));
          continue;
        }
        for (const g of Object.keys(models)) {
          const choices = shouldSplitGroup(g)
            ? groupMembers(g).map((m) => [m, modelSelectionValue(g, m)] as const)
            : [[g, g] as const];
          for (const [label, value] of choices) {
            out.push(door("special", `res|${mfr}|${series}|${value}`, label, `Special order, ${where}`,
              { kind: "sodoor", scope: "residential", mfr, series, model: value }));
          }
        }
      }
    }
    const cMfr = Object.keys(SPECIAL_COMMERCIAL)[0] ?? "Clopay";
    for (const s of SPECIAL_COMMERCIAL_SERIES) {
      for (const m of s.models) {
        // A pinned model is picked in the series list itself, as on the tab.
        const series = SPECIAL_COMMERCIAL_PINNED.includes(m) ? m : s.name;
        out.push(door("special", `comm|${s.name}|${m}`, m, `Special order commercial, ${s.name}`,
          { kind: "sodoor", scope: "commercial", mfr: cMfr, series, model: m }));
      }
    }
  }
  return out;
}

/** Build the index for the tabs this person can see. */
export function buildIndex(tabs: readonly { id: string; label: string }[], residentialModels: readonly string[] = []): Entry[] {
  const open = new Set(tabs.map((t) => t.id));
  const entries: Entry[] = tabs.map((t) => ({
    id: `tab|${t.id}`, tab: t.id, label: t.label, detail: "Open this tab", price: null,
    hay: t.label.toLowerCase(),
  }));
  // Doors next, so a model number finds its doors before any part named alike.
  entries.push(...doorEntries(open, residentialModels));
  // A part opens on the tab it is sold from: Tools, Angle… have their own (6/10/2026).
  if (open.has("parts")) entries.push(...partEntries(PARTS_TAB_CATEGORIES, (c, n) => {
    const t = tabForPart(c, n);
    return open.has(t) ? t : "parts";
  }));
  if (open.has("track")) entries.push(...partEntries(TRACK_CATEGORIES, "track"));
  if (open.has("cables")) entries.push(...partEntries(CABLE_CATEGORIES, "cables"));
  if (open.has("extension")) entries.push(...springEntries(EXTENSION_SPRINGS, "extension"));
  if (open.has("torsion")) entries.push(...springEntries(STOCK_TORSION_SPRINGS, "torsion"));
  if (open.has("operators")) {
    for (const s of OPERATOR_CATALOGUE) {
      for (const o of s.items) {
        const price = operatorPrice(o);
        entries.push({
          id: `operators|${s.name}|${o.desc}`,
          tab: "operators", label: o.name, detail: o.desc,
          price: price == null ? null : money(price),
          pick: { kind: "operator", group: s.group, section: s.name, desc: o.desc },
          hay: `${o.name} ${o.desc} ${s.name}`.toLowerCase(),
        });
      }
    }
  }
  return entries;
}

/**
 * Every word typed must appear somewhere in the item — its name, description
 * or category — so "tek 3/4" finds the 1/4" X 3/4" TEK and not the 1/4" X 1".
 * An exact name comes first ("4050" finds the 4050 doors before 4050-anything),
 * then names that start with the first word, then names that contain it, then
 * the rest; ties keep the index order — tabs, doors, then everything else.
 */
export function searchIndex(index: Entry[], query: string, limit = 12): SearchHit[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const whole = words.join(" ");
  const ranked: [number, Entry][] = [];
  for (const e of index) {
    if (!words.every((w) => e.hay.includes(w))) continue;
    const label = e.label.toLowerCase();
    ranked.push([label === whole ? -1 : label.startsWith(words[0]) ? 0 : label.includes(words[0]) ? 1 : 2, e]);
  }
  ranked.sort((a, b) => a[0] - b[0]);
  return ranked.slice(0, limit).map(([, { hay: _hay, ...hit }]) => hit);
}
