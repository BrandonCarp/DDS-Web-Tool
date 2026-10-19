import { describe, it, expect } from "vitest";
import {
  hasGrid, griddedHeights, griddedWidths, groupMembers, shouldSplitGroup,
  specialDoorQuote,
} from "./data/special-door-pricing";
import { COLORS } from "./data/catalog-meta";
import { windowDesigns } from "./data/inserts";
import { SPECIAL } from "./data/special-orders";

const G = "4300/4301/4302/4305/4310";
const MEMBERS = ["4300", "4301", "4302", "4305", "4310"];
const base = {
  model: G, color: "White", style: "solid" as const,
  track: "r12" as const, spring: "extension" as const, lock: "none" as const,
};
// CJ's Premium Steel workbook (16/10/2026): list x .704 x 0.99 / (1 - 0.0265), sold at 44.
const K = 0.99 / (1 - 0.0265);
const sheet = (list: number) => Math.round((list * 0.704 * K) / 0.56 * 100) / 100;

describe("4300 family — special order configurator", () => {
  it("is gridded, so the size picker opens", () => {
    expect(hasGrid(G)).toBe(true);
    expect(shouldSplitGroup(G)).toBe(true);
  });

  it("lists its five members separately, as CJ's sheet groups them", () => {
    expect(groupMembers(G)).toEqual(MEMBERS);
  });

  it("carries the four heights the sheet covers", () => {
    // 7FT and 8FT extension, 9FT and 10FT torsion.
    expect(griddedHeights(G)).toEqual(["7", "8", "9", "10"]);
  });

  it("carries 6'2\" to 20'0\" at every height", () => {
    for (const t of ["7", "8", "9", "10"]) {
      expect(griddedWidths(G, t), t).toHaveLength(84);
      expect(griddedWidths(G, t)[0], t).toBe("6.2");
      expect(griddedWidths(G, t), t).toContain("20");
    }
  });

  it("keys 11-foot widths the same way as every other foot", () => {
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
    for (const v of MEMBERS.filter((m) => m !== "4310")) {
      const r = specialDoorQuote({ ...base, width: "9", height: "7", variant: v });
      expect(r.quote?.unitPrice, v).toBe(sheet(725));
    }
    // The 4310 is built from 8'0".
    expect(specialDoorQuote({ ...base, width: "9", height: "7", variant: "4310" }).quote?.unitPrice).toBe(sheet(725));
    expect(specialDoorQuote({ ...base, width: "7.6", height: "7", variant: "4310" }).quote).toBeUndefined();
  });

  it("prices every tier off the sheet's columns", () => {
    expect(specialDoorQuote({ ...base, width: "9", height: "7" }).quote?.unitPrice).toBe(sheet(725));
    expect(specialDoorQuote({ ...base, width: "9", height: "8" }).quote?.unitPrice).toBe(sheet(874));
    expect(specialDoorQuote({ ...base, width: "9", height: "9" }).quote?.unitPrice).toBe(sheet(1130));
    expect(specialDoorQuote({ ...base, width: "9", height: "10" }).quote?.unitPrice).toBe(sheet(1180));
    expect(specialDoorQuote({ ...base, width: "9", height: "7" }).quote?.unitPrice).toBe(926.88);
  });

  it("sends a width past the sheet to the manual total", () => {
    // Past 20'0" there is no sheet at any height. It must decline rather
    // than reach for another width's price.
    const r = specialDoorQuote({ ...base, width: "20.2", height: "8" });
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
    // The same window and insert options as the 4050 (Brandon, 12/9/2026):
    // the long-panel inserts too since the 4050 took them (5/10/2026), CJ's
    // sheet pricing the family's long windows (16/10/2026).
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
