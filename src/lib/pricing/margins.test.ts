import { describe, it, expect } from "vitest";
import { SPECIAL } from "./data/special-orders";
import { MARGINS } from "./data/catalog-meta";

const OUTSIDE = ["Haas", "Amarr", "CHI", "Overhead", "Wayne Dalton"];

describe("Clopay margins (RES_CLOPAY_MARGINS, 31/8/2026)", () => {
  it("uses 49 on every section, without exception", () => {
    // The sheet's header rule, and the one line on it that applied to
    // everything at once. Two models were off it: T50S at 53, GD1LP at 51.
    const off: string[] = [];
    for (const [series, s] of Object.entries(SPECIAL)) {
      if (s.type !== "margin" || OUTSIDE.includes(series)) continue;
      if (s.models) {
        for (const [model, m] of Object.entries(s.models)) {
          if (m.section !== 49) off.push(`${series} / ${model} = ${m.section}`);
        }
      } else if (s.section !== 49) {
        off.push(`${series} = ${s.section}`);
      }
    }
    expect(off).toEqual([]);
  });

  it("pins the door margins the sheet moved", () => {
    const door = (series: string, model: string) => {
      const s = SPECIAL[series];
      return s.type === "margin" ? s.models?.[model]?.door : undefined;
    };
    expect(door("Gallery Collection", "GD5LV/GD5SV")).toBe(52); // was 51
    expect(door("Gallery Collection", "GD4LV/GD4SV")).toBe(51); // was 55
    expect(door("Premium Steel Collection", "9200/9203")).toBe(43); // was 47
    // Unchanged, but pinned because they sit beside the ones that moved.
    expect(door("Gallery Collection", "GD4L/GD4S")).toBe(56);
    expect(door("Gallery Collection", "GD5L/GD5S")).toBe(52);
    expect(door("Value Steel Collection", "T50S/T50L")).toBe(49);
    expect(door("Premium Steel Collection", "4050/4051/4053")).toBe(43);
  });

  it("keeps the reference table in step with the pricing table", () => {
    // MARGINS in catalog-meta.ts drives no price — but a comment in
    // special-orders.ts claims the two match, and a stale copy makes that
    // comment a lie for whoever reads it next.
    for (const [model, m] of Object.entries(MARGINS)) {
      expect(m.section, `MARGINS/${model}`).toBe(49);
    }
  });
});
