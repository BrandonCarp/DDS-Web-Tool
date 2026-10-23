import { describe, it, expect } from "vitest";
import {
  CLASSIC_STACK, CLASSIC_STACK_MODELS, COACHMAN_STACK, ENERGY_STACK, GALLERY_STACK, GALLERY_STACK_MODELS, INDUSTRIAL_STACK,
  classicPanelsWide, classicStack, coachmanWindowsWide, commercialStack, doorStack, galleryPanelsWide, galleryStack, glazedStack,
  glazedStackRows, maxWindowRows, pickWindowRow, windowRowsFrom, windowRowsPickable,
  rowsPickable, sectionOrdinal, stackFamily, stockGalleryStack, windowsWide,
} from "./data/door-stacks";
import { COMM_MATRIX_SIZES } from "./data/commercial-meta";
import { stockedHeights } from "./data/stock-colors";

/**
 * Clopay's section stacking charts, as transcribed for the door drawings
 * (Brandon, 22/10/2026): every stack adds up to its door height, and every
 * height the stock tabs offer is on a chart.
 */
describe("door stacks — Clopay's stacking charts", () => {
  const sum = (a: readonly number[]) => a.reduce((x, y) => x + y, 0);
  const r24 = (n: number) => Array.from({ length: n }, () => 24);

  it("adds each Classic Steel stack up to its height, 6'0\" to 16'0\" in 18s and 21s", () => {
    for (const [h, stack] of Object.entries(CLASSIC_STACK)) {
      expect(sum(stack), `${h}"`).toBe(Number(h));
      expect(stack.every((s) => s === 18 || s === 21), `${h}"`).toBe(true);
      // The chart's shape: a 21 on top wherever there is one, the 18s, then the 21s.
      const firstBottom21 = stack.findIndex((s, i) => i > 0 && s === 21);
      if (firstBottom21 > 0) expect(stack.slice(firstBottom21).every((s) => s === 21), `${h}"`).toBe(true);
    }
    expect(Object.keys(CLASSIC_STACK)).toHaveLength(40); // every 3" from 72 to 192 but 87
    expect(classicStack(7, 0)).toEqual([21, 21, 21, 21]);
    expect(classicStack(7, 6)).toEqual([18, 18, 18, 18, 18]);
    expect(classicStack(8, 0)).toEqual([21, 18, 18, 18, 21]);
    expect(classicStack(6, 6)).toEqual([21, 18, 18, 21]);
    expect(classicStack(7, 3)).toBeNull(); // not built
    expect(classicStack(10, 0)).toEqual([21, 18, 18, 21, 21, 21]);
    expect(classicStack(12, 6)).toEqual([21, 18, 18, 18, 18, 18, 18, 21]);
    expect(classicStack(14, 3)).toEqual([21, 18, 18, 18, 18, 18, 18, 21, 21]);
    expect(classicStack(16, 0)).toEqual([21, 18, 18, 18, 18, 18, 18, 21, 21, 21]);
    expect(classicStack(16, 3)).toBeNull();
  });

  it("stacks the Coachman's designs 11 to 23 off their own chart, 6'0\" to 16'0\"", () => {
    for (const [h, stack] of Object.entries(COACHMAN_STACK)) {
      expect(sum(stack), `${h}"`).toBe(Number(h));
      expect(stack.every((s) => s === 18 || s === 21 || s === 24), `${h}"`).toBe(true);
    }
    expect(Object.keys(COACHMAN_STACK)).toHaveLength(41);
    expect(doorStack("CD", 7, 0)).toEqual([24, 18, 24, 18]);
    expect(doorStack("CD", 8, 6)).toEqual([24, 18, 21, 21, 18]);
    expect(doorStack("CD", 12, 3)).toEqual([24, 18, 21, 18, 24, 18, 24]);
    expect([8, 10, 14, 16, 20].map((w) => coachmanWindowsWide(w, 0))).toEqual([2, 3, 3, 4, 4]);
  });

  it("knows each door's family: the chart it stacks by, the windows across, and whether a row can be picked", () => {
    for (const m of ["4050", "4132", "9201", "4302", "T50S", "T52L"]) expect(stackFamily(m), m).toBe("classic");
    for (const m of ["GD1LP", "GD2SU", "GD4L", "BD1EU", "BD2CU", "BR1NU"]) expect(stackFamily(m), m).toBe("gallery");
    for (const m of ["CD", "CG", "CGU"]) expect(stackFamily(m), m).toBe("coachman");
    for (const m of ["4138", "9208", "3200", "AV"]) expect(stackFamily(m), m).toBeNull();
    expect(doorStack("BD1EU", 7, 6)).toEqual([24, 21, 21, 24]);
    expect(doorStack("4138", 7, 0)).toBeNull();
    expect(windowsWide("4050", 9, 0, false)).toBe(4);
    expect(windowsWide("GD1LP", 9, 0, true)).toBe(2);
    expect(windowsWide("BD1EU", 16, 0, false)).toBe(8);
    expect(windowsWide("CD", 9, 0, true)).toBe(2);
    expect(windowsWide("4138", 9, 0, false)).toBeNull();
    expect(rowsPickable("4050")).toBe(true);
    expect(rowsPickable("T50S")).toBe(true);
    expect(rowsPickable("GD1LP")).toBe(false);
    expect(rowsPickable("CD")).toBe(false);
    // The stock 8'0" Gallery is a five-section door; the rest of its heights the chart's.
    expect(stockGalleryStack(8, 0)).toEqual([21, 18, 18, 18, 21]);
    expect(stockGalleryStack(7, 0)).toEqual([21, 21, 21, 21]);
    expect(stockGalleryStack(9, 0)).toEqual([24, 21, 21, 21, 21]);
  });

  it("covers every height the stock tab floors on the Premium and Value Steel doors", () => {
    for (const m of ["T50S", "T52S", "4050", "4051", "4053", "9130", "9133"]) {
      expect(CLASSIC_STACK_MODELS.has(m), m).toBe(true);
      for (const h of stockedHeights(m)) {
        const [f, i] = h.split(".").map(Number);
        expect(classicStack(f, i || 0), `${m} ${h}`).not.toBeNull();
      }
    }
    expect(CLASSIC_STACK_MODELS.has("GD1LP")).toBe(false);
    expect(CLASSIC_STACK_MODELS.has("CD")).toBe(false);
  });

  it("adds each Gallery Steel 3 layer stack up to its height, 6'0\" to 16'0\" in 18s, 21s and 24s, and covers the stock heights", () => {
    for (const [h, stack] of Object.entries(GALLERY_STACK)) {
      expect(sum(stack), `${h}"`).toBe(Number(h));
      expect(stack.every((s) => s === 18 || s === 21 || s === 24), `${h}"`).toBe(true);
    }
    expect(Object.keys(GALLERY_STACK)).toHaveLength(41); // every 3" from 72 to 192
    expect(galleryStack(6, 0)).toEqual([24, 24, 24]);
    expect(galleryStack(7, 0)).toEqual([21, 21, 21, 21]);
    expect(galleryStack(7, 6)).toEqual([24, 21, 21, 24]);
    expect(galleryStack(8, 0)).toEqual([24, 24, 24, 24]);
    expect(galleryStack(9, 0)).toEqual([24, 21, 21, 21, 21]);
    expect(galleryStack(10, 3)).toEqual([21, 18, 21, 21, 21, 21]);
    expect(galleryStack(16, 0)).toEqual(r24(8));
    expect(galleryStack(16, 3)).toBeNull();
    for (const m of ["GD1LP", "GD1SP"]) {
      expect(GALLERY_STACK_MODELS.has(m), m).toBe(true);
      for (const h of stockedHeights(m)) {
        const [f, i] = h.split(".").map(Number);
        expect(galleryStack(f, i || 0), `${m} ${h}`).not.toBeNull();
      }
    }
    // Windows across: the long window two at 8' and 9', four at 16'; short 4, 4, 8.
    expect([8, 9, 16].map((w) => galleryPanelsWide(w, 0, true))).toEqual([2, 2, 4]);
    expect([8, 9, 16].map((w) => galleryPanelsWide(w, 0, false))).toEqual([4, 4, 8]);
    expect(galleryPanelsWide(7, 0, true)).toBeNull();
    expect(galleryPanelsWide(7, 0, false)).toBe(3);
    expect(galleryPanelsWide(12, 0, false)).toBe(6);
    expect(galleryPanelsWide(20, 0, true)).toBe(5);
  });

  it("adds each energy and industrial stack up to its height, 7'0\" to 17'0\"", () => {
    for (const [h, stack] of Object.entries(ENERGY_STACK)) {
      expect(sum(stack), `energy ${h}"`).toBe(Number(h));
      expect(stack.every((s) => s === 18 || s === 21 || s === 24), `energy ${h}"`).toBe(true);
    }
    for (const [h, stack] of Object.entries(INDUSTRIAL_STACK)) {
      // Clopay's chart prints 19.375" sections, which leave the 8'3", 8'6"
      // and 10'3" doors a touch short of their height; the chart is kept as printed.
      expect(Math.abs(sum(stack) - Number(h)), `industrial ${h}"`).toBeLessThanOrEqual(0.5);
      expect(stack.every((s) => s === 19.375 || s === 21 || s === 24), `industrial ${h}"`).toBe(true);
    }
    expect(Object.keys(ENERGY_STACK)).toEqual(Object.keys(INDUSTRIAL_STACK));
    // The industrial chart differs where the energy chart uses 18s.
    expect(INDUSTRIAL_STACK[99]).toEqual([19.375, 19.375, 19.375, 19.375, 21]);
    expect(INDUSTRIAL_STACK[102]).toEqual([19.375, 19.375, 21, 21, 21]);
    expect(INDUSTRIAL_STACK[123]).toEqual([19.375, 19.375, 21, 21, 21, 21]);
    expect(INDUSTRIAL_STACK[96]).toEqual(ENERGY_STACK[96]);
  });

  it("stacks the stock complete doors by family: the 3200 off the energy chart, the 524 off the industrial one", () => {
    expect(commercialStack("3200", 8, 0)).toEqual([24, 24, 24, 24]);
    expect(commercialStack("3200", 10, 0)).toEqual([24, 24, 24, 24, 24]);
    expect(commercialStack("3200", 16, 0)).toEqual([24, 24, 24, 24, 24, 24, 24, 24]);
    expect(commercialStack("524", 12, 0)).toEqual([24, 24, 24, 24, 24, 24]);
    expect(commercialStack("524", 8, 3)).toEqual([19.375, 19.375, 19.375, 19.375, 21]);
    expect(commercialStack("524S", 9, 0)).toEqual([21, 21, 21, 21, 24]);
    expect(commercialStack("2415", 8, 0)).toBeNull(); // no chart loaded for the 2415
    expect(commercialStack("3200", 18, 0)).toBeNull();
    for (const [model, sizes] of Object.entries(COMM_MATRIX_SIZES)) {
      for (const size of sizes) {
        const m = size.match(/×\s*(\d+)′(\d+)″/)!;
        expect(commercialStack(model, Number(m[1]), Number(m[2])), `${model} ${size}`).not.toBeNull();
      }
    }
  });

  it("counts the Classic Steel windows across by width: short 3 to 10, long 2 to 5", () => {
    expect(classicPanelsWide(7, 0, false)).toBe(3);
    expect(classicPanelsWide(8, 0, false)).toBe(4);
    expect(classicPanelsWide(9, 0, false)).toBe(4);
    expect(classicPanelsWide(10, 0, false)).toBe(5);
    expect(classicPanelsWide(12, 0, false)).toBe(6);
    expect(classicPanelsWide(14, 0, false)).toBe(7);
    expect(classicPanelsWide(16, 0, false)).toBe(8);
    expect(classicPanelsWide(18, 0, false)).toBe(8);
    expect(classicPanelsWide(20, 0, false)).toBe(10);
    expect(classicPanelsWide(6, 0, false)).toBeNull();
    expect(classicPanelsWide(8, 0, true)).toBe(2);
    expect(classicPanelsWide(9, 0, true)).toBe(2);
    expect(classicPanelsWide(12, 0, true)).toBe(3);
    expect(classicPanelsWide(16, 0, true)).toBe(4);
    expect(classicPanelsWide(18, 0, true)).toBe(4);
    expect(classicPanelsWide(7, 6, true)).toBeNull(); // no long window under 8'0"
  });

  it("gives the windows' row a 21\" section, the chart's 18\" going to the top (Brandon, 22/10/2026)", () => {
    // 8'0" x 6'6": 21-18-18-21 on the chart; windows in the third section → 18-21-18-21.
    expect(glazedStack(classicStack(6, 6)!, 3)).toEqual([18, 21, 18, 21]);
    expect(glazedStack(classicStack(6, 6)!, 4)).toEqual([21, 18, 18, 21]); // the top is a 21 already
    expect(glazedStack(classicStack(6, 9)!, 3)).toEqual([18, 21, 21, 21]);
    expect(glazedStack(classicStack(8, 0)!, 4)).toEqual([18, 21, 18, 18, 21]);
    expect(glazedStack(classicStack(8, 0)!, 5)).toEqual([21, 18, 18, 18, 21]);
    expect(glazedStack(classicStack(7, 9)!, 4)).toEqual([18, 21, 18, 18, 18]);
    expect(glazedStack(classicStack(7, 0)!, 3)).toEqual([21, 21, 21, 21]); // all 21s: nothing to trade
    // 7'6" and 9'0" are all 18s on the chart: no 21 to give, left as charted.
    expect(glazedStack(classicStack(7, 6)!, 5)).toEqual([18, 18, 18, 18, 18]);
    expect(glazedStack(classicStack(7, 6)!, 4)).toEqual([18, 18, 18, 18, 18]);
    expect(glazedStack(classicStack(9, 0)!, 5)).toEqual([18, 18, 18, 18, 18, 18]);
    // A row the stack does not have changes nothing.
    expect(glazedStack(classicStack(6, 6)!, 0)).toEqual([21, 18, 18, 21]);
    expect(glazedStack(classicStack(6, 6)!, 9)).toEqual([21, 18, 18, 21]);
    // Every chart stack with a 21 has it on top, so the row under the top always gets one.
    for (const [h, stack] of Object.entries(CLASSIC_STACK)) {
      if (!stack.includes(21)) continue;
      const glazed = glazedStack(stack, stack.length - 1);
      expect(glazed[1], `${h}"`).toBe(21);
      expect([...glazed].sort(), `${h}"`).toEqual([...stack].sort());
    }
  });

  it("writes a section's number as the commercial line always has", () => {
    expect([1, 2, 3, 4, 5, 6, 10, 11].map(sectionOrdinal)).toEqual(["first", "second", "third", "fourth", "fifth", "sixth", "tenth", "11th"]);
  });
});

describe("door stacks — two rows of windows (Brandon, 23/10/2026)", () => {
  it("takes a row in any section but the bottom", () => {
    expect(windowRowsPickable([21, 21, 21, 21])).toEqual([4, 3, 2]);
    expect(windowRowsPickable([21, 18, 18, 18, 21])).toEqual([5, 4, 3, 2]);
  });
  it("takes two rows on a stock door only where the chart has two 21\" sections above the bottom one; a special order always", () => {
    expect(maxWindowRows([21, 21, 21, 21], true)).toBe(2); // 7'0"
    expect(maxWindowRows([21, 18, 18, 18, 21], true)).toBe(1); // 8'0"
    expect(maxWindowRows([21, 18, 18, 21, 21], true)).toBe(2); // 8'3"
    expect(maxWindowRows([18, 18, 18, 18, 18], true)).toBe(1); // 7'6"
    expect(maxWindowRows([21, 18, 18, 18, 21], false)).toBe(2);
  });
  it("gives each row a 21\" where the chart has one to give, the top's first, never the bottom's", () => {
    expect(glazedStackRows([21, 18, 18, 18, 21], [3])).toEqual([18, 18, 21, 18, 21]);
    expect(glazedStackRows([21, 18, 18, 21, 21], [4, 3])).toEqual([18, 21, 21, 18, 21]);
    expect(glazedStackRows([21, 18, 18, 21], [4, 3])).toEqual([21, 18, 18, 21]); // no 21 left to give
    expect(glazedStackRows([21, 21, 21, 21], [4])).toEqual([21, 21, 21, 21]);
  });
  it("keeps the rows picked to the door, and a press adds, moves or takes out a row", () => {
    expect(windowRowsFrom([0], [21, 21, 21, 21], 2)).toEqual([4]);
    expect(windowRowsFrom([1, 3], [21, 21, 21, 21], 2)).toEqual([3]); // the bottom is never a row
    expect(windowRowsFrom([], [21, 21, 21, 21], 2)).toEqual([4]);
    expect(windowRowsFrom([0, 1], [21, 18, 18, 18, 21], 1)).toEqual([4]); // the latest kept
    expect(pickWindowRow([0], [21, 21, 21, 21], 2, 3)).toEqual([0, 1]);
    expect(pickWindowRow([0, 1], [21, 21, 21, 21], 2, 2)).toEqual([1, 2]);
    expect(pickWindowRow([0, 1], [21, 21, 21, 21], 2, 4)).toEqual([1]);
    expect(pickWindowRow([1], [21, 21, 21, 21], 2, 3)).toEqual([1]); // never the last row out
    expect(pickWindowRow([0], [21, 18, 18, 18, 21], 1, 2)).toEqual([3]);
    expect(pickWindowRow([0], [21, 21, 21, 21], 2, 1)).toEqual([0]); // not the bottom
  });
});
