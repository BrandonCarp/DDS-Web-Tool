import { describe, it, expect } from "vitest";
import {
  hasGrid, griddedHeights, griddedWidths, groupMembers, shouldSplitGroup, specialDoorQuote,
} from "./data/special-door-pricing";
import { windowDesigns } from "./data/inserts";
import { SPECIAL } from "./data/special-orders";
import { glassOptionsFor } from "./data/so-glass";

const G = "T52S/T52L";
const base = {
  model: G, color: "White", track: "r12" as const,
  spring: "extension" as const, lock: "none" as const, height: "7",
};
const sell = (width: string, style: "solid" | "glass" | "inserts" = "solid") =>
  specialDoorQuote({ ...base, width, style }).quote?.unitPrice ?? 0;

describe("T52S / T52L — special order", () => {
  it("is gridded, so the size picker opens", () => {
    expect(hasGrid(G)).toBe(true);
    expect(shouldSplitGroup(G)).toBe(true);
    expect(groupMembers(G)).toEqual(["T52S", "T52L"]);
  });

  it("carries the one height the sheet covers", () => {
    // 7'0" only. An 8ft and 9ft sheet do not exist yet, and offering those
    // heights would imply a price that has not been supplied.
    expect(griddedHeights(G)).toEqual(["7"]);
  });

  it("carries all 73 widths, 6'0\" to 18'0\"", () => {
    const w = griddedWidths(G, "7");
    expect(w).toHaveLength(73);
    expect(w[0]).toBe("6");
    expect(w[w.length - 1]).toBe("18");
  });

  it("prices all three styles", () => {
    expect(sell("9", "solid")).toBeCloseTo(702.46, 2);
    expect(sell("9", "glass")).toBeCloseTo(839.14, 2);
    expect(sell("16", "inserts")).toBeCloseTo(1607.71, 2);
  });

  it("prices every member off the one grid", () => {
    for (const v of ["T52S", "T52L"]) {
      expect(specialDoorQuote({ ...base, width: "9", style: "solid", variant: v }).quote?.unitPrice, v)
        .toBeCloseTo(702.46, 2);
    }
  });

  it("takes 44 on a door and 49 on sections", () => {
    const models = Object.values(SPECIAL).find((s) => s.models?.[G])?.models;
    expect(models?.[G]).toEqual({ door: 44, section: 49 });
  });

  it("holds every row at that margin", () => {
    // One row came in at 44.73% — 14'0" glass, which the sheet had at 1375.54
    // where its own total implies 1357.54. Corrected on import.
    expect(sell("14", "glass")).toBeCloseTo(1357.54, 2);
    expect(sell("13.10", "glass")).toBeCloseTo(1499.68, 2);
    expect(sell("14.2", "glass")).toBeCloseTo(1565.98, 2);
  });

  it("offers the same window designs as the 4050, 507 excluded", () => {
    for (const w of ["7", "9", "12", "16"]) {
      expect(windowDesigns("T52S", "inserts", w).map((d) => d.id), w)
        .toEqual(windowDesigns("4050", "inserts", w).map((d) => d.id));
    }
    expect(windowDesigns("T52S", "inserts", "9").map((d) => d.id)).not.toContain("507");
  });

  it("offers no named glass types yet", () => {
    // The book prints a WINDOWS table for the T40S and the T50S but not the
    // T52S, and it is foam-insulated where the T50S is not, so which table it
    // shares cannot be assumed. Until that is traced it uses the grid's own
    // GLASS column, same as before.
    expect(glassOptionsFor(G, "short", "9")).toEqual([]);
  });
});
