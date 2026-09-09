import { describe, it, expect } from "vitest";
import { doorArt, styleOf, BASE_REF, windowBand, BAND_HEIGHT } from "./data/door-images";
import { doorGeometry } from "./data/door-geometry";
import { STOCK_MATRIX, stockedWidths, stockedHeights, sizeParts } from "./data/stock-colors";

describe("door art", () => {
  it("draws every floored model in every colour it is floored in", () => {
    // The bar for stock quotes: no gaps on the floor. Catalogue colours that
    // are special order only — Hunter Green, Mocha Brown, Charcoal, Iron Ore —
    // are deliberately not covered; they have neither a Clopay render nor a
    // tint fitted against one, and guessing them would put a wrong colour on a
    // customer's estimate.
    const gaps: string[] = [];
    for (const m of Object.keys(STOCK_MATRIX)) {
      if (!stockedWidths(m).length) continue;
      for (const c of Object.keys(STOCK_MATRIX[m])) {
        if (!doorArt(m, c)) gaps.push(`${m} / ${c}`);
      }
    }
    expect(gaps).toEqual([]);
  });

  it("declines the special-order colours rather than approximating them", () => {
    for (const c of ["Hunter Green", "Mocha Brown", "Charcoal", "Iron Ore"]) {
      expect(doorArt("9130", c), c).toBeNull();
    }
  });


  it("prefers Clopay's own render over a tint", () => {
    // A Short door in Almond has a real Clopay image, so it must not be tinted
    // even though the tint measures well.
    expect(doorArt("4050", "Almond")).toMatchObject({ kind: "image", src: "/doors/short--almond.webp" });
    expect(doorArt("4050", "White")).toMatchObject({ kind: "image", src: "/doors/short--white.webp" });
  });

  it("never tints Black or an Ultra-Grain", () => {
    // Black is 25 ga with texture the white door lacks; Ultra-Grain is wood
    // grain. Neither survives a colour multiply.
    for (const [m, c] of [
      ["4050", "Black"], ["4053", "Black"], ["4051", "Black"],
      ["GD1LP", "Black"], ["GD1SP", "Black"],
      ["9130", "Ultra-Grain Classic Cherry Finish"],
      ["GD1LP", "Ultra-Grain Oak Slate Finish"],
    ] as const) {
      expect(doorArt(m, c)?.kind, `${m} ${c}`).toBe("image");
    }
  });

  it("tints only where no render exists, from the fitted values", () => {
    // The Long panel has no captured Sandtone, so it falls back to the white
    // base times the fitted colour — not the chip colour, which read 5-17 high.
    const a = doorArt("4053", "Sandtone");
    expect(a).toMatchObject({ kind: "tint", src: "/doors/long--white.webp" });
    expect(a && "rgb" in a && a.rgb).toEqual([172, 158, 142]);
  });

  it("declines rather than guessing a colour it does not have", () => {
    expect(doorArt("4050", "Hunter Green")).toBeNull();   // not sold on the 4050
    expect(doorArt("nope", "White")).toBeNull();
  });

  it("groups the models that render identically", () => {
    for (const m of ["4050", "9130", "9200", "4300", "T50S", "T52S"]) {
      expect(styleOf(m), m).toBe("short");
    }
    for (const m of ["4053", "9133", "9203"]) expect(styleOf(m), m).toBe("long");
    expect(styleOf("GD1LP")).toBe("gallery-long");
  });

  it("carries the right tint divisor per base", () => {
    // The Gallery renders sit at a different mid-tone than the Classic ones;
    // using one value for both would shift every Gallery colour.
    expect(BASE_REF.short).toBe(216);
    expect(BASE_REF["gallery-long"]).toBe(232);
  });
});

describe("art and geometry together cover the stock floor", () => {
  it("resolves art and a panel grid for every stock size and colour", () => {
    const RUN: Record<string, "short" | "long"> = {
      "4050": "short", "4051": "short", "4053": "long", "9130": "short",
      "9133": "long", T50S: "short", T52S: "short", GD1SP: "short", GD1LP: "long",
    };
    let combos = 0;
    for (const m of Object.keys(STOCK_MATRIX)) {
      const W = stockedWidths(m), H = stockedHeights(m);
      if (!W.length) continue;
      for (const w of W) for (const h of H) {
        const wp = sizeParts(w), hp = sizeParts(h);
        expect(doorGeometry(wp.ft, wp.in, hp.ft, hp.in, RUN[m]), `${m} ${w}x${h}`).not.toBeNull();
        combos++;
      }
    }
    expect(combos).toBe(354);
  });
});

describe("window bands", () => {
  it("finds a band for the designs we captured", () => {
    expect(windowBand("4050", "509")).toBe("/doors/bands/short--509.webp");
    expect(windowBand("4053", "612")).toBe("/doors/bands/long--612.webp");
    expect(windowBand("GD1LP", "SQ24")).toBe("/doors/bands/gallery-long--SQ24.webp");
    expect(windowBand("GD1SP", "VERTARCH")).toBe("/doors/bands/gallery-short--VERTARCH.webp");
  });

  it("falls the 4051 back to the short panel's bands", () => {
    // Brandon's call: the flush door takes the same top sections as the 4050
    // and 4053, so it inherits their captures rather than needing its own.
    expect(windowBand("4051", "509")).toBe("/doors/bands/short--509.webp");
    expect(windowBand("4051", "610")).toBe("/doors/bands/short--610.webp");
  });

  it("returns null for a design with no capture yet", () => {
    // The renderer must decline, not draw the solid door — a picture with no
    // windows on a quote for a door with windows is a wrong picture.
    for (const d of ["502", "504", "505", "506", "507"]) {
      expect(windowBand("4050", d), d).toBeNull();
    }
    expect(windowBand("4053", "509")).toBeNull();
  });

  it("has no band without a design", () => {
    expect(windowBand("4050", "")).toBeNull();
    expect(windowBand("nope", "509")).toBeNull();
  });

  it("knows the band height per canvas", () => {
    // One section tall. Classic sections are 96px, Gallery 210px; using one
    // number for both would clip or overdraw.
    expect(BAND_HEIGHT.short).toBe(96);
    expect(BAND_HEIGHT["gallery-long"]).toBe(210);
  });

  it("covers both Gallery styles completely", () => {
    for (const st of ["GD1SP", "GD1LP"]) {
      for (const d of ["SQ24", "REC14", "VERTARCH", "GRILLEARCH"]) {
        expect(windowBand(st, d), `${st} ${d}`).not.toBeNull();
      }
    }
  });
});
