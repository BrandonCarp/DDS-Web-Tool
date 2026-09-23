import { describe, it, expect } from "vitest";
import {
  hasGrid, griddedHeights, griddedWidths, groupMembers, shouldSplitGroup, specialDoorQuote,
} from "./data/special-door-pricing";
import { SPECIAL } from "./data/special-orders";
import { glassOptionsFor } from "./data/so-glass";

const G = "9200/9203";
const base = {
  model: G, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const,
};
const sell = (width: string, height = "7", style: "solid" | "glass" | "inserts" = "solid") =>
  specialDoorQuote({ ...base, width, height, style }).quote?.unitPrice ?? 0;

describe("9200 / 9203 — special order", () => {
  it("is gridded and splits into its members", () => {
    expect(hasGrid(G)).toBe(true);
    expect(shouldSplitGroup(G)).toBe(true);
    expect(groupMembers(G)).toEqual(["9200", "9203"]);
  });

  it("carries all three heights", () => {
    expect(griddedHeights(G)).toEqual(["7", "8", "9"]);
  });

  it("starts at 6'2\", not 6'0\"", () => {
    // The book gives this family 6'2"-20'0", so a 6'0" does not exist. It falls
    // through to the typed Clopay total rather than quoting a price.
    for (const t of ["7", "8", "9"]) {
      expect(griddedWidths(G, t), t).toHaveLength(72);
      expect(griddedWidths(G, t)[0], t).toBe("6.2");
      expect(griddedWidths(G, t)).not.toContain("6");
    }
    expect(specialDoorQuote({ ...base, width: "6", height: "7", style: "solid" }).quote).toBeUndefined();
  });

  it("keys 11-foot widths like every other foot", () => {
    // The sheet writes them 11'00", 11'02" — left alone those sort below 11'2"
    // and never match, so the width simply would not price.
    const w = griddedWidths(G, "7");
    expect(w).toContain("11");
    expect(w).toContain("11.2");
    expect(w.filter((x) => x.startsWith("11.0"))).toEqual([]);
    expect(sell("11")).toBeGreaterThan(0);
    expect(sell("11.4")).toBeGreaterThan(0);
  });

  it("prices every style at every height", () => {
    expect(sell("9", "7", "solid")).toBeCloseTo(1086.79, 2);
    expect(sell("16", "8", "inserts")).toBeCloseTo(2828.35, 2);
    expect(sell("18", "9", "solid")).toBeCloseTo(3481.42, 2);
  });

  it("prices both members off the one grid", () => {
    for (const v of ["9200", "9203"]) {
      expect(specialDoorQuote({ ...base, width: "9", height: "7", style: "solid", variant: v }).quote?.unitPrice, v)
        .toBeCloseTo(1086.79, 2);
    }
  });

  it("climbs with width, height and glass", () => {
    expect(sell("12")).toBeGreaterThan(sell("9"));
    expect(sell("9", "9")).toBeGreaterThan(sell("9", "7"));
    expect(sell("9", "7", "inserts")).toBeGreaterThan(sell("9", "7", "glass"));
    expect(sell("9", "7", "glass")).toBeGreaterThan(sell("9", "7", "solid"));
  });

  it("takes 43 on a door and 49 on sections", () => {
    // The 8ft and 9ft tabs are headed 49M but every row computes at 43, same as
    // the 7ft tab. Brandon confirmed 43 for the family — the marker is wrong,
    // not the data. That has happened on Clopay sheets twice before.
    const models = Object.values(SPECIAL).find((s) => s.models?.[G])?.models;
    expect(models?.[G]).toEqual({ door: 43, section: 49 });
  });

  it("offers no named glass types yet", () => {
    // No WINDOWS table has been traced for this family.
    expect(glassOptionsFor(G, "short", "9")).toEqual([]);
  });
});
