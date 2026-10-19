import { describe, it, expect } from "vitest";
import {
  hasGrid, griddedHeights, griddedWidths, groupMembers, shouldSplitGroup, specialDoorQuote,
} from "./data/special-door-pricing";
import { SPECIAL } from "./data/special-orders";
import { glassOptionsFor } from "./data/so-glass";

const G = "9200/9201/9202/9203/9205";
const base = {
  model: G, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const,
};
const sell = (width: string, height = "7", style: "solid" | "glass" | "inserts" = "solid") =>
  specialDoorQuote({ ...base, width, height, style }).quote?.unitPrice ?? 0;
// CJ's Premium Steel workbook (16/10/2026): list x .865 x 0.99 / (1 - 0.0265), sold at 43.
const K = 0.99 / (1 - 0.0265);
const sheet = (list: number) => Math.round((list * 0.865 * K) / 0.57 * 100) / 100;
const windows = (n: number, list: number) => Math.round(Math.round(n * list * 0.865 * K * 100) / 100 / 0.57 * 100) / 100;

describe("9200 family — special order", () => {
  it("is gridded and splits into its members, as CJ's sheet groups them", () => {
    expect(hasGrid(G)).toBe(true);
    expect(shouldSplitGroup(G)).toBe(true);
    expect(groupMembers(G)).toEqual(["9200", "9201", "9202", "9203", "9205"]);
  });

  it("carries all four heights", () => {
    expect(griddedHeights(G)).toEqual(["7", "8", "9", "10"]);
  });

  it("starts at 6'2\", not 6'0\", and runs to 20'0\"", () => {
    // The sheet gives this family 6'2"-20'0", so a 6'0" does not exist. It
    // falls through to the typed Clopay total rather than quoting a price.
    for (const t of ["7", "8", "9", "10"]) {
      expect(griddedWidths(G, t), t).toHaveLength(84);
      expect(griddedWidths(G, t)[0], t).toBe("6.2");
      expect(griddedWidths(G, t).slice(-1)[0], t).toBe("20");
      expect(griddedWidths(G, t)).not.toContain("6");
    }
    expect(specialDoorQuote({ ...base, width: "6", height: "7", style: "solid" }).quote).toBeUndefined();
  });

  it("keys 11-foot widths like every other foot", () => {
    const w = griddedWidths(G, "7");
    expect(w).toContain("11");
    expect(w).toContain("11.2");
    expect(w.filter((x) => x.startsWith("11.0"))).toEqual([]);
    expect(sell("11")).toBe(sheet(1140.9));
    expect(sell("11.4")).toBe(sell("11"));
  });

  it("prices every style at every height off the sheet", () => {
    expect(sell("9", "7", "solid")).toBe(sheet(725));
    expect(sell("9", "7", "solid")).toBe(1118.87);
    // 16'0" x 8'0" with inserts: eight short single strength windows with inserts, 49 list a window.
    expect(sell("16", "8", "inserts")).toBe(sheet(1500) + windows(8, 49));
    expect(sell("18", "9", "solid")).toBe(sheet(2319));
    expect(sell("20", "10", "solid")).toBe(sheet(2753));
  });

  it("prices every member off the one grid", () => {
    for (const v of ["9200", "9201", "9202", "9205"]) {
      expect(specialDoorQuote({ ...base, width: "9", height: "7", style: "solid", variant: v }).quote?.unitPrice, v)
        .toBe(sheet(725));
    }
    // The 9203 is built from 8'0".
    expect(specialDoorQuote({ ...base, width: "9", height: "7", style: "solid", variant: "9203" }).quote?.unitPrice).toBe(sheet(725));
    expect(specialDoorQuote({ ...base, width: "7.6", height: "7", style: "solid", variant: "9203" }).quote).toBeUndefined();
  });

  it("climbs with width, height and glass", () => {
    expect(sell("12")).toBeGreaterThan(sell("9"));
    expect(sell("9", "9")).toBeGreaterThan(sell("9", "7"));
    expect(sell("9", "7", "inserts")).toBeGreaterThan(sell("9", "7", "glass"));
    expect(sell("9", "7", "glass")).toBeGreaterThan(sell("9", "7", "solid"));
  });

  it("takes 43 on a door and 49 on sections", () => {
    const models = Object.values(SPECIAL).find((s) => s.models?.[G])?.models;
    expect(models?.[G]).toEqual({ door: 43, section: 49 });
  });

  it("prices architectural windows past 18'0\", where the standard windows stop", () => {
    // 19'0" x 10'0" with the architectural double strength short windows: ten at 55 list over the solid door.
    const r = specialDoorQuote({ ...base, width: "19", height: "10", style: "glass", glassType: "dsb", panelStyle: "short", windowSeries: "architectural" });
    expect(r.quote?.unitPrice).toBe(sheet(2597) + windows(8, 55));
    expect(r.quote?.description).toContain("double strength b grade windows in the top section");
    // The standard windows are not priced there, and the message says which are.
    const s = specialDoorQuote({ ...base, width: "19", height: "10", style: "glass", glassType: "ssb", panelStyle: "short" });
    expect(s.quote).toBeUndefined();
    expect(s.reason).toContain("no standard windows");
    expect(s.reason).toContain("architectural");
  });

  it("prices the architectural obscure glass at the revised workbook's figures (CJ, 19/10/2026)", () => {
    // 9'0" x 7'0", four obscure 19-1/2" x 16" windows: 65 list each plain, 80 with grilles — the
    // workbook of 16/10/2026 had them at the double strength's 55 and 70.
    const plain = specialDoorQuote({ ...base, width: "9", height: "7", style: "glass", glassType: "obscure", panelStyle: "short", windowSeries: "architectural" });
    expect(plain.quote?.unitPrice).toBeCloseTo(sheet(725) + windows(4, 65), 2);
    const grilles = specialDoorQuote({ ...base, width: "9", height: "7", style: "inserts", glassType: "obscure", panelStyle: "short", windowSeries: "architectural" });
    expect(grilles.quote?.unitPrice).toBeCloseTo(sheet(725) + windows(4, 80), 2);
  });

  it("offers the sheet's glass types, single strength first", () => {
    expect(glassOptionsFor(G, "short", "9").map((g) => g.id)).toEqual([
      "ssb", "dsb", "acrylic", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
    ]);
  });
});
