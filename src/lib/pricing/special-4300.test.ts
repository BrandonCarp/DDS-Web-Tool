import { describe, it, expect } from "vitest";
import {
  hasGrid, griddedHeights, griddedWidths, groupMembers, shouldSplitGroup,
  specialDoorQuote,
} from "./data/special-door-pricing";
import { COLORS } from "./data/catalog-meta";
import { windowDesigns } from "./data/inserts";
import { SPECIAL } from "./data/special-orders";

const G = "4300/4301/4310";
const base = {
  model: G, color: "White", style: "solid" as const,
  track: "r12" as const, spring: "extension" as const, lock: "none" as const,
};

describe("4300 family — special order configurator", () => {
  it("is gridded, so the size picker opens", () => {
    expect(hasGrid(G)).toBe(true);
    expect(shouldSplitGroup(G)).toBe(true);
  });

  it("lists its three members separately", () => {
    expect(groupMembers(G)).toEqual(["4300", "4301", "4310"]);
  });

  it("carries the two heights the sheets cover", () => {
    // 7'0" and 8'0" only. A 9'0" sheet does not exist yet, so that height must
    // not appear as though it could be priced.
    expect(griddedHeights(G)).toEqual(["7", "8"]);
  });

  it("carries the widths each sheet actually holds", () => {
    // The 7ft sheet runs to 20'0", the 8ft one stops at 14'10" — Brandon is
    // entering the rest later, so the two ranges differ on purpose.
    expect(griddedWidths(G, "7")).toHaveLength(84);
    expect(griddedWidths(G, "8")).toHaveLength(53);
    expect(griddedWidths(G, "7")).toContain("20");
    expect(griddedWidths(G, "8")).not.toContain("16");
  });

  it("keys 11-foot widths the same way as every other foot", () => {
    // The sheet writes 11'0" as "11.00" and 11'2" as "11.02". Left alone those
    // sort and match wrongly against "11" and "11.2".
    for (const t of ["7", "8"]) {
      const w = griddedWidths(G, t);
      expect(w, t).toContain("11");
      expect(w, t).toContain("11.2");
      expect(w.filter((x) => x.startsWith("11.0")), t).toEqual([]);
    }
  });
});

describe("4300 family — pricing", () => {
  it("prices every member off the one grid", () => {
    for (const v of ["4300", "4301", "4310"]) {
      const r = specialDoorQuote({ ...base, width: "9", height: "7", variant: v });
      expect(r.quote?.unitPrice, v).toBeCloseTo(898.38, 2);
    }
  });

  it("prices both tiers", () => {
    expect(specialDoorQuote({ ...base, width: "9", height: "7" }).quote?.unitPrice).toBeCloseTo(898.38, 2);
    expect(specialDoorQuote({ ...base, width: "9", height: "8" }).quote?.unitPrice).toBeCloseTo(1083.02, 2);
  });

  it("sends an 8ft width past the sheet to the manual total", () => {
    // 16'0" x 8'0" is not on the 8ft sheet yet. It must decline rather than
    // reach for a 7ft price.
    const r = specialDoorQuote({ ...base, width: "16", height: "8" });
    expect(r.quote).toBeUndefined();
    expect(r.reason).toMatch(/not on the grid|total/i);
  });

  it("takes 44 on a door and 49 on sections", () => {
    const ser = SPECIAL["Premium Steel Collection"];
    expect(ser.models?.[G]).toEqual({ door: 44, section: 49 });
  });
});

describe("4300 family — options", () => {
  it("offers the ten colours DDS sells it in", () => {
    expect(COLORS["4300"]).toEqual([
      "White", "Almond", "Desert Tan", "Sandtone", "Chocolate Brown",
      "Hunter Green", "Bronze", "Mocha Brown", "Charcoal", "Black",
    ]);
  });

  it("drops Iron Ore and the Ultra-Grains", () => {
    // Catalogue finishes DDS does not sell on this family.
    expect(COLORS["4300"]).not.toContain("Iron Ore");
    expect(COLORS["4300"].some((c) => c.includes("Ultra-Grain"))).toBe(false);
  });

  it("offers exactly the 4050's window designs at every width", () => {
    for (const w of ["7", "9", "12", "16", "18"]) {
      const want = windowDesigns("4050", "inserts", w).map((d) => d.id);
      for (const m of ["4300", "4301", "4310"]) {
        expect(windowDesigns(m, "inserts", w).map((d) => d.id), `${m} @ ${w}`).toEqual(want);
      }
    }
  });

  it("excludes Sunset 507, as the 4050 does", () => {
    for (const m of ["4300", "4301", "4310"]) {
      expect(windowDesigns(m, "inserts", "9").map((d) => d.id), m).not.toContain("507");
    }
  });
});
