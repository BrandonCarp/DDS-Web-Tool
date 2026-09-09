import { describe, it, expect } from "vitest";
import { composite, SLICES } from "./data/door-composite";
import { doorGeometry } from "./data/door-geometry";
import { STOCK_MATRIX, stockedWidths, stockedHeights, sizeParts } from "./data/stock-colors";

describe("door composite", () => {
  it("declines when the base already is the size asked for", () => {
    // Taking a 4x4 apart to rebuild a 4x4 can only lose fidelity.
    expect(composite("short", 4, 4)).toBeNull();
    expect(composite("long", 2, 4)).toBeNull();
    expect(composite("gallery-short", 4, 4)).toBeNull();
  });

  it("scales the canvas the way Clopay does", () => {
    // Their 16'0" is exactly twice the width of their 8'0" at the same height.
    const c = composite("short", 8, 4)!;
    expect(c.targetWidth).toBe(880);
    expect(c.targetHeight).toBe(384);
    const t = composite("short", 4, 6)!;
    expect(t.targetWidth).toBe(440);
    expect(t.targetHeight).toBe(576);
  });

  it("repeats the base whole when the panel count is a multiple", () => {
    // 16'0" is exactly two 8'0" doors. Slicing it instead would copy one
    // interior panel repeatedly, which breaks any design spanning more than one
    // panel — the Gallery arch rises across panel 1 and falls across panel 2.
    const c = composite("short", 8, 4)!;
    expect(c.blits).toHaveLength(2);
    expect(c.blits.every((b) => b.sx === 0 && b.sw === SLICES.short.width)).toBe(true);
    expect(c.width).toBe(880);
    const g = composite("gallery-long", 4, 4)!;
    expect(g.blits).toHaveLength(2);
    expect(g.width).toBe(1920);
  });

  it("slices only when the count is not a multiple", () => {
    const c = composite("short", 6, 4)!;
    const m = SLICES.short;
    const perRow = 1 + (6 - 1) + 1;
    expect(c.blits).toHaveLength(perRow * 4);
    expect(c.blits[0]).toMatchObject({ sx: 0, sw: m.left, dx: 0 });
    expect(c.blits.filter((b) => b.sx === m.left + m.panelPitch)).toHaveLength(5 * 4);
  });

  it("never stretches a slice", () => {
    // Repeating a cell preserves the bevel; scaling it would smear the shadow.
    for (const [p, s] of [[8, 4], [6, 5], [3, 6], [10, 4]] as const) {
      for (const b of composite("short", p, s)!.blits) {
        expect(b.dw).toBe(b.sw);
        expect(b.dh).toBe(b.sh);
      }
    }
  });

  it("tiles the interior sections, not the header or footer", () => {
    const m = SLICES.short;
    const c = composite("short", 4, 6)!;   // not a whole multiple: 6 sections
    const fromHeader = c.blits.filter((b) => b.sy === 0);
    const fromFooter = c.blits.filter((b) => b.sy === m.footerTop);
    const fromInterior = c.blits.filter((b) => b.sy === m.header);
    const perRow = 1 + (4 - 1) + 1;                 // left margin + interior + tail
    expect(fromHeader).toHaveLength(perRow);       // one strip only
    expect(fromFooter).toHaveLength(perRow);       // one strip only
    expect(fromInterior).toHaveLength(perRow * 4); // sections - 2 = 4 strips
  });

  it("covers the output with no gaps and no overlaps", () => {
    for (const [style, p, s] of [["short", 8, 4], ["gallery-long", 5, 6], ["flush", 3, 5]] as const) {
      const c = composite(style, p, s)!;
      const area = c.blits.reduce((a, b) => a + b.dw * b.dh, 0);
      expect(area, `${style} ${p}x${s}`).toBe(c.width * c.height);
    }
  });

  it("builds every shape the stock floor needs", () => {
    const RUN: Record<string, "short" | "long"> = {
      "4050": "short", "4051": "short", "4053": "long", "9130": "short",
      "9133": "long", T50S: "short", T52S: "short", GD1SP: "short", GD1LP: "long",
    };
    const STYLE: Record<string, keyof typeof SLICES> = {
      "4050": "short", "4051": "flush", "4053": "long", "9130": "short",
      "9133": "long", T50S: "short", T52S: "short",
      GD1SP: "gallery-short", GD1LP: "gallery-long",
    };
    const shapes = new Set<string>();
    for (const m of Object.keys(STOCK_MATRIX)) {
      const W = stockedWidths(m), H = stockedHeights(m);
      if (!W.length) continue;
      for (const w of W) for (const h of H) {
        const wp = sizeParts(w), hp = sizeParts(h);
        const g = doorGeometry(wp.ft, wp.in, hp.ft, hp.in, RUN[m])!;
        shapes.add(`${g.panels}x${g.sections}`);
        const c = composite(STYLE[m], g.panels, g.sections);
        // null only when the base already is that shape
        if (c === null) {
          const s = SLICES[STYLE[m]];
          expect([g.panels, g.sections], `${m} ${w}x${h}`).toEqual([s.panels, s.sections]);
        } else {
          expect(c.blits.length, `${m} ${w}x${h}`).toBeGreaterThan(0);
        }
      }
    }
    expect(shapes.size).toBe(20);
  });

  it("never reads outside the source image", () => {
    // The invariant a wrong panel pitch breaks: a blit that reads past the
    // canvas silently draws nothing, and on the Gallery long panel it put the
    // window band out of step with the columns below it.
    for (const style of Object.keys(SLICES) as (keyof typeof SLICES)[]) {
      const m = SLICES[style];
      for (const [p, s] of [[3, 4], [4, 5], [8, 6], [10, 4]] as const) {
        const c = composite(style, p, s);
        if (!c) continue;
        for (const b of c.blits) {
          expect(b.sx + b.sw, `${style} ${p}x${s} x`).toBeLessThanOrEqual(m.width);
          expect(b.sy + b.sh, `${style} ${p}x${s} y`).toBeLessThanOrEqual(m.height);
        }
      }
    }
  });

  it("leaves a real tail after the last interior cell", () => {
    // The blit logic lays down panels-1 interior cells and then copies the rest
    // of the source as the tail, so the last panel never needs a full pitch of
    // space. What it does need is for that tail to exist.
    for (const [style, m] of Object.entries(SLICES)) {
      const tailStart = m.left + (m.panels - 1) * m.panelPitch;
      expect(tailStart, `${style} tail start`).toBeLessThan(m.width);
      expect(m.width - tailStart, `${style} tail width`).toBeGreaterThan(0);
    }
  });
});
