import { describe, it, expect } from "vitest";
import { doorArt, styleOf, BASE_REF, windowBand, BAND_HEIGHT } from "./data/door-images";
import { windowDesigns, excludedDesignsFor } from "./data/inserts";
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
    expect(windowBand("GD1LP", "SQ24", "8")).toBe("/doors/bands/gallery-long--SQ24--8.webp");
    expect(windowBand("GD1SP", "ARCH1VERT", "9")).toBe("/doors/bands/gallery-short--ARCH1VERT--9.webp");
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
    // 505 and 605 gained bands from the 16ft renders; 507 is no longer offered
    // on the 4050 at all.
    for (const d of ["502", "504", "506"]) {
      expect(windowBand("4050", d), d).toBeNull();
    }
    // 4053/509 is no longer null — it borrows the short panel's capture now.
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
      for (const d of ["SQ24", "REC14", "ARCH1VERT", "ARCH1GRILLE"]) {
        expect(windowBand(st, d, "8"), `${st} ${d}`).not.toBeNull();
        expect(windowBand(st, d, "9"), `${st} ${d} 9ft`).not.toBeNull();
      }
      // Gallery has no width fallback: 9'0" renders on a 1080px canvas, so an
      // 8'0" band would be the wrong proportions.
      expect(windowBand(st, "SQ24"), `${st} no width`).toBeNull();
    }
  });
});

describe("stocked insert list", () => {
  it("does not offer Sunset 507 on the 4050", () => {
    // DDS floors 507 in white but not for this model — from the stocked-insert
    // list, 10/9/2026. The width rules would otherwise allow it at every size.
    for (const w of ["7", "9", "12", "16", "18"]) {
      expect(windowDesigns("4050", "inserts", w).map((d) => d.id), w).not.toContain("507");
    }
    expect(excludedDesignsFor("4050")).toEqual(["507"]);
  });

  it("leaves 507 on the models that do take it", () => {
    expect(windowDesigns("4053", "inserts", "9").map((d) => d.id)).toContain("507");
    expect(excludedDesignsFor("4053")).toEqual([]);
  });

  it("finds bands for the designs added from the 16ft renders", () => {
    // Extracted from Clopay's own 16'0" images — the left half's top section.
    expect(windowBand("4050", "505")).toBe("/doors/bands/short--505.webp");
    expect(windowBand("4050", "605")).toBe("/doors/bands/short--605.webp");
    for (const d of ["ARCH3PLAIN", "ARCH3GRILLE", "ARCH3VERT"]) {
      // Arch 3 is a separate insert, built only at 16'0".
      expect(windowBand("GD1LP", d, "16"), d).toBe(`/doors/bands/gallery-long--${d}--16.webp`);
      expect(windowBand("GD1LP", d, "8"), d).toBeNull();
    }
  });
});

describe("styles that share top sections", () => {
  it("lets the 4050 and 4053 use each other's glass", () => {
    // The top section is a separate part from the panels below it, so the same
    // glass goes on either body. Brandon's call, 10/9/2026.
    // The 4053 has no 509 of its own and borrows the short panel's.
    expect(windowBand("4053", "509")).toBe("/doors/bands/short--509.webp");
    expect(windowBand("4053", "508")).toBe("/doors/bands/short--508.webp");
    // Where both have a capture, each keeps its own.
    expect(windowBand("4050", "612")).toBe("/doors/bands/short--612.webp");
  });

  it("lets the two Gallery panels share", () => {
    expect(windowBand("GD1SP", "SQ24", "8")).not.toBeNull();
    expect(windowBand("GD1LP", "SQ24", "8")).not.toBeNull();
    // GD1SP borrows the long panel's Arch 3, which only exists at 16'0".
    expect(windowBand("GD1SP", "ARCH3PLAIN", "16")).toBe("/doors/bands/gallery-long--ARCH3PLAIN--16.webp");
  });

  it("prefers a style's own capture over a borrowed one", () => {
    // Both have a 610; each must use its own rather than the other's.
    expect(windowBand("4050", "610")).toBe("/doors/bands/short--610.webp");
    expect(windowBand("4053", "610")).toBe("/doors/bands/long--610.webp");
  });

  it("covers every design each model offers, bar 507", () => {
    for (const m of ["4050", "4053", "4051", "GD1SP", "GD1LP"]) {
      const missing = windowDesigns(m, "inserts", "9")
        .map((d) => d.id)
        .filter((id) => !windowBand(m, id, "9"));
      expect(missing, m).toEqual(m === "4050" ? [] : missing.filter((x) => x === "507"));
    }
  });
});

describe("Gallery arches are separate inserts", () => {
  it("offers Arch 1, 2 and 3 as distinct designs", () => {
    // Brandon, 10/9/2026: these are different inserts, not one design drawn
    // three ways. Collapsing them onto a single "Vertical Grille on Arch" is
    // what put the wrong arch on a quote.
    const ids = windowDesigns("GD1LP", "inserts", "9").map((d) => d.id);
    expect(ids).toContain("ARCH1VERT");
    expect(ids).toContain("ARCH2VERT");
    expect(ids).not.toContain("ARCH3VERT");     // 16'0" only
  });

  it("honours each arch's width availability", () => {
    const at = (w: string) => windowDesigns("GD1LP", "inserts", w).map((d) => d.id);
    for (const w of ["8", "9"]) {
      expect(at(w), w).toContain("ARCH2PLAIN");
      expect(at(w), w).not.toContain("ARCH3PLAIN");
    }
    expect(at("16")).toContain("ARCH3PLAIN");
    expect(at("16")).not.toContain("ARCH2PLAIN");
    expect(at("16")).toContain("ARCH1PLAIN");   // built at every width
  });

  it("stores Gallery bands per width and never substitutes one", () => {
    // A 9'0" Gallery renders 1080px wide, not a scaled 960, so an 8'0" band
    // would be visibly the wrong proportions.
    expect(windowBand("GD1LP", "SQ24", "8")).toBe("/doors/bands/gallery-long--SQ24--8.webp");
    expect(windowBand("GD1LP", "SQ24", "9")).toBe("/doors/bands/gallery-long--SQ24--9.webp");
    // 16'0" is exactly two 8'0" doors, so the 8'0" band tiles onto it.
    expect(windowBand("GD1LP", "SQ24", "16")).toBe("/doors/bands/gallery-long--SQ24--8.webp");
  });

  it("keeps the Classic canvas width-independent", () => {
    // The 4050 at 8'0" and 9'0" are byte-identical, so one band serves both.
    expect(windowBand("4050", "509", "8")).toBe(windowBand("4050", "509", "9"));
    expect(windowBand("4050", "509")).not.toBeNull();
  });
});

describe("Gallery at 16'0\"", () => {
  it("uses its own 16'0\" capture when there is one", () => {
    // Arch 3 exists only at 16'0" and is a different insert from Arch 1 — it is
    // one wide arch, not two repeated, so it can never come from an 8'0" band.
    for (const d of ["ARCH3PLAIN", "ARCH3GRILLE", "ARCH3VERT"]) {
      expect(windowBand("GD1LP", d, "16"), d).toBe(`/doors/bands/gallery-long--${d}--16.webp`);
    }
  });

  it("tiles the 8'0\" band for designs with no 16'0\" capture", () => {
    // 1920 = 2 x 960 exactly, so this is a clean repeat rather than a stretch.
    // Verified against Clopay's own 16'0" Arch 1: halves repeat at 7.66 where
    // their own left and right differ by 7.66 anyway.
    for (const d of ["SQ24", "SQ22", "REC14", "REC12", "PLAINLONG", "PLAINSHORT"]) {
      expect(windowBand("GD1LP", d, "16"), d).toBe(`/doors/bands/gallery-long--${d}--8.webp`);
    }
  });

  it("gives 9'0\" no fallback at all", () => {
    // 1080 is not a multiple of 960; an 8'0" band would be the wrong shape.
    expect(windowBand("GD1LP", "ARCH3VERT", "9")).toBeNull();
  });

  it("covers every Gallery design at every stock width", () => {
    for (const m of ["GD1LP", "GD1SP"]) {
      for (const w of ["8", "9", "16"]) {
        const missing = windowDesigns(m, "inserts", w)
          .map((d) => d.id)
          .filter((id) => !windowBand(m, id, w));
        expect(missing, `${m} @ ${w}`).toEqual([]);
      }
    }
  });
});

describe("Sunset width availability", () => {
  it("restricts 501 and 503 to the widths Clopay builds", () => {
    // Checked against Clopay's Decorative Insert Series page: 501 is 8', 9',
    // 12', 16', 17', 18', 20' only; 503 is 8', 9', 16', 17', 18' only. The data
    // already matched — this pins it against a future regenerate.
    const at = (w: string) => windowDesigns("4053", "inserts", w).map((d) => d.id);
    for (const w of ["8", "9", "16", "17", "18"]) {
      expect(at(w), `503 @ ${w}`).toContain("503");
      expect(at(w), `501 @ ${w}`).toContain("501");
    }
    expect(at("12")).toContain("501");
    expect(at("12")).not.toContain("503");
    for (const w of ["7", "10", "14", "15"]) {
      expect(at(w), `501 @ ${w}`).not.toContain("501");
      expect(at(w), `503 @ ${w}`).not.toContain("503");
    }
  });

  it("leaves the other Sunsets as they were", () => {
    const at = (w: string) => windowDesigns("4053", "inserts", w).map((d) => d.id);
    expect(at("7")).toContain("502");        // 7', 7'6", 12' only
    expect(at("14")).toContain("504");       // 14', 15', 15'6"
    expect(at("16")).toContain("505");       // 16', 17', 18'
    expect(at("10")).toContain("506");       // 10', 20'
  });
});
