import { describe, it, expect } from "vitest";
import { specialDoorQuote, hasGrid, griddedHeights, griddedWidths, compareWidths } from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { ADDONS } from "./data/addons";

const M = "4050/4051/4053";
const base = { model: M, height: "7", color: "White", track: "r12" as const, spring: "extension" as const, lock: "none" as const };

describe("special order door grid", () => {
  it("grids the 4050 at 7'0\" only, 73 widths from 6'0\" to 18'0\"", () => {
    expect(hasGrid(M)).toBe(true);
    expect(griddedHeights(M)).toEqual(["7"]);
    const w = griddedWidths(M, "7");
    expect(w).toHaveLength(73);
    expect(w[0]).toBe("6");
    expect(w[w.length - 1]).toBe("18");
  });

  it("quotes the SELL column straight, with no further margin", () => {
    // The grid is already at 43M. Applying the margin again here would be the
    // single most expensive mistake available in this file.
    expect(specialDoorQuote({ ...base, width: "8", style: "solid" }).quote?.unitPrice).toBe(723.25);
    expect(specialDoorQuote({ ...base, width: "16", style: "inserts" }).quote?.unitPrice).toBe(1817.47);
    expect(specialDoorQuote({ ...base, width: "18", style: "solid" }).quote?.unitPrice).toBe(1575.05);
  });

  it("agrees with the residential grid wherever both carry a size", () => {
    // The ALL and STOCK tabs are the same book, so a stocked size must quote
    // the same either way. A drift here means one of the two was applied from
    // a stale sheet.
    const stocked: [string, "solid" | "glass" | "inserts", number][] = [
      ["8", "solid", 723.25], ["9", "glass", 956.32], ["12", "inserts", 1462.58],
      ["16", "solid", 1303.18], ["18", "inserts", 2089.35],
    ];
    for (const [width, style, expected] of stocked) {
      expect(specialDoorQuote({ ...base, width, style }).quote?.unitPrice, `${width} ${style}`).toBe(expected);
    }
  });

  it("adds the same option money a stock door pays", () => {
    const plain = specialDoorQuote({ ...base, width: "8", style: "solid" }).quote!;
    const loaded = specialDoorQuote({
      ...base, width: "8", style: "solid",
      spring: "torsion", track: "low_headroom", lock: "lockbar_installed",
    }).quote!;
    expect(loaded.base).toBe(plain.base);
    expect(loaded.unitPrice - plain.unitPrice).toBeCloseTo(
      ADDONS.track.low_headroom + ADDONS.torsion + ADDONS.lockbar_installed, 2,
    );
    expect(loaded.unitPrice).toBeCloseTo(873.25, 2);
  });

  it("refuses anything off the grid, and says to use the manual total", () => {
    for (const off of [
      { ...base, height: "8", width: "8", style: "solid" as const },
      { ...base, width: "19", style: "solid" as const },
      { model: "GD1LP/GD1SP", height: "7", width: "8", style: "solid" as const, color: "White",
        track: "r12" as const, spring: "extension" as const, lock: "none" as const },
    ]) {
      const r = specialDoorQuote(off);
      expect(r.quote).toBeUndefined();
      expect(r.reason).toMatch(/total below/);
    }
  });

  it("carries a price for every style at every gridded width", () => {
    const holes: string[] = [];
    for (const [width, triple] of Object.entries(SPECIAL_DOORS[M]["7"])) {
      for (const style of ["solid", "glass", "inserts"] as const) {
        if (typeof triple[style] !== "number") holes.push(`${width} ${style}`);
      }
    }
    expect(holes).toEqual([]);
  });

  it("prices a standard width below the odd sizes in its band", () => {
    // Clopay's structure, and it is not intuitive: standard widths are stocked
    // and cheap, while any odd width prices at the band above. An 8'2" door is
    // $905.53 against $782.19 for a 9'0" — the odd size costs MORE than the
    // next standard size UP. Asserting "wider is dearer" would be wrong, and
    // asserting nothing would let a transposed row through.
    const solid = (w: string) =>
      specialDoorQuote({ ...base, width: w, style: "solid" }).quote!.unitPrice;
    for (const [std, odd] of [["8", "8.2"], ["9", "9.2"], ["10", "10.2"], ["12", "12.2"]]) {
      expect(solid(std), `${std} should undercut ${odd}`).toBeLessThan(solid(odd));
    }
    expect(solid("8.2")).toBeGreaterThan(solid("9"));
  });

  it("prices every odd width in a band the same", () => {
    const solid = (w: string) =>
      specialDoorQuote({ ...base, width: w, style: "solid" }).quote!.unitPrice;
    for (const band of [["8.2", "8.4", "8.6", "8.8", "8.10"], ["9.2", "9.4", "9.6", "9.8", "9.10"]]) {
      const prices = new Set(band.map(solid));
      expect([...prices], `band ${band[0]}–${band[band.length - 1]}`).toHaveLength(1);
    }
  });
});

describe("width key ordering", () => {
  it("sorts ten-inch widths above two-inch ones", () => {
    // The bug this exists to prevent: Number("6.10") is 6.1, which files 6'10"
    // below 6'2". Six widths on this grid end in ten inches.
    expect(compareWidths("6.10", "6.2")).toBeGreaterThan(0);
    expect(compareWidths("6.2", "6.10")).toBeLessThan(0);
    expect(compareWidths("7", "6.10")).toBeGreaterThan(0);
    expect([...["6.10", "6.2", "6", "7"]].sort(compareWidths)).toEqual(["6", "6.2", "6.10", "7"]);
  });

  it("gives every gridded width a distinct key", () => {
    const w = griddedWidths(M, "7");
    expect(new Set(w).size).toBe(w.length);
  });
});

describe("gridded door verbiage", () => {
  const d = (o: Partial<Parameters<typeof specialDoorQuote>[0]> = {}) =>
    specialDoorQuote({ ...base, width: "8", style: "solid", ...o }).quote!.description;

  it("words a door exactly as the residential tab words the same door", () => {
    // Both land in the same QuickBooks column and the counter reads both, so a
    // difference in phrasing between them is a difference with no meaning.
    expect(d()).toBe(
      `Clopay Model 4050/4051/4053, 8'0" x 7'0", in the color White, solid, no windows, ` +
      `12\u2033 radius track, extension springs, no lock`,
    );
  });

  it("carries colour, options and the insert design through", () => {
    expect(d({ color: "Black", track: "low_headroom", spring: "torsion", lock: "lockbar_installed" }))
      .toContain("in the color Black, solid, no windows, low headroom track, torsion springs, lockbar installed");
    expect(d({ width: "9", style: "inserts", windesign: "509" }))
      .toContain("windows in the top section, Colonial 509 inserts");
  });

  it("says NO INSERTS rather than trailing off, same as residential", () => {
    expect(d({ width: "9", style: "inserts" })).toContain("windows in the top section, no inserts");
    expect(d({ width: "9", style: "glass" })).toContain("glass in the top section, no inserts");
  });

  it("writes ten-inch widths correctly", () => {
    // "8.10" is 8 feet 10 inches, not 8.1 feet.
    expect(d({ width: "8.10" })).toContain(`8'10" x 7'0"`);
    expect(d({ width: "8.2" })).toContain(`8'2" x 7'0"`);
  });
});
