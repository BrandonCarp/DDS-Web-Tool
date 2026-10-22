import { describe, it, expect } from "vitest";
import { vinylForDoor, vinylForDoorColor, vinylForPieces, piecesText, DOOR_COLOR_TO_VINYL, VINYL_STOCK } from "./data/vinyl";
import { COLORS } from "./data/catalog-meta";

describe("vinyl stop molding", () => {
  const bins = (v: { bins: { ft: number; pieces: number[] }[] }) => v.bins.map((b) => `${b.ft}:${b.pieces.join("+")}`);

  it("covers a 12x8 black door the way the counter writes it", () => {
    // Black has no 12ft, so the header takes a 16. Confirmed off a real order —
    // and cutting a second 16 into the two 8s would save nothing, so it is not cut.
    const v = vinylForDoor("BLACK", 12, 8)!;
    expect(v.description).toBe("BLACK VINYL STOP MOLDING,  [1] - 16FT AND [2] - 8FT");
    expect(v.feet).toBe(32);
    expect(v.total).toBe(62.4);
    expect(bins(v)).toEqual(["16:12", "8:8", "8:8"]);
  });

  it("matches the parts sheet's own default row for an 8x7 white", () => {
    const v = vinylForDoor("WHITE", 8, 7)!;
    expect(v.description).toBe("WHITE VINYL STOP MOLDING,  [1] - 8FT AND [2] - 7FT");
    expect(v.feet).toBe(22);
  });

  it("rounds each piece UP to the next stocked length, never down", () => {
    const v = vinylForDoor("BLACK", 14, 8)!;
    expect(bins(v)).toEqual(["16:14", "8:8", "8:8"]);
    expect(v.pieces).toEqual([{ ft: 16, count: 1 }, { ft: 8, count: 2 }]);
  });

  it("uses white's extra lengths — a 12ft door is one 12ft piece in white only", () => {
    expect(bins(vinylForDoor("WHITE", 12, 8)!)).toEqual(["12:12", "8:8", "8:8"]);
    expect(bins(vinylForDoor("BLACK", 12, 8)!)).toEqual(["16:12", "8:8", "8:8"]);
  });

  it("cuts two legs out of one length where the colour is stocked in 16s alone (Brandon, 22/10/2026)", () => {
    // A 12' x 7' Medium Finish door: a 16 for the header and the two 7' legs out of one more.
    const v = vinylForDoor("MEDIUM FINISH", 12, 7)!;
    expect(v.description).toBe("MEDIUM FINISH VINYL STOP MOLDING,  [2] - 16FT");
    expect(v.feet).toBe(32);
    expect(v.total).toBe(62.4);
    expect(bins(v)).toEqual(["16:12", "16:7+7"]);
    // A 16 gives two 8' legs exactly.
    expect(bins(vinylForDoor("BRONZE", 12, 8)!)).toEqual(["16:12", "16:8+8"]);
    // The header may share a length with a leg: an 8' x 7' is two 16s, not three.
    const v2 = vinylForDoor("BRONZE", 8, 7)!;
    expect(v2.description).toBe("BRONZE VINYL STOP MOLDING,  [2] - 16FT");
    expect(v2.feet).toBe(32);
    expect(bins(v2)).toEqual(["16:8+7", "16:7"]);
  });

  it("cuts in the stocked-short colours too, only where it saves feet", () => {
    // A 10' x 7' black: no 10 in black, so the header and a leg come out of an
    // 18 (25 ft) rather than a 16 for the header alone (30 ft).
    const v = vinylForDoor("BLACK", 10, 7)!;
    expect(v.description).toBe("BLACK VINYL STOP MOLDING,  [1] - 18FT AND [1] - 7FT");
    expect(v.feet).toBe(25);
    expect(bins(v)).toEqual(["18:10+7", "7:7"]);
    // A 9' x 7' white: 9 + 7 + 7 is 23 ft, the same as a 16 cut 9 + 7 and a 7 — nothing is cut on a tie.
    const w = vinylForDoor("WHITE", 9, 7)!;
    expect(w.description).toBe("WHITE VINYL STOP MOLDING,  [1] - 9FT AND [2] - 7FT");
    expect(w.feet).toBe(23);
  });

  it("packs the whole order, not a door at a time", () => {
    // Three 9' x 7' Medium Finish doors: three 9+7s, a 7+7 and a 7 — five 16s, where
    // a door at a time (9 | 7+7, three times) would be six.
    const v = vinylForDoor("MEDIUM FINISH", 9, 7, 3)!;
    expect(v.description).toBe("MEDIUM FINISH VINYL STOP MOLDING,  [5] - 16FT");
    expect(v.feet).toBe(80);
    expect(v.total).toBe(156);
    expect(bins(v)).toEqual(["16:9+7", "16:9+7", "16:9+7", "16:7+7", "16:7"]);
    expect(vinylForDoor("MEDIUM FINISH", 9, 7, 1)!.feet).toBe(32);
    // Sets that cannot share just multiply.
    const one = vinylForDoor("BLACK", 14, 8, 1)!;
    const two = vinylForDoor("BLACK", 14, 8, 2)!;
    expect(two.feet).toBe(one.feet * 2);
    expect(two.total).toBe(Math.round(one.total * 2 * 100) / 100);
    expect(two.description).toBe("BLACK VINYL STOP MOLDING,  [2] - 16FT AND [4] - 8FT");
    expect(two.pieces).toEqual([{ ft: 16, count: 2 }, { ft: 8, count: 4 }]);
  });

  it("past the longest length stocked, takes whole lengths and packs what is left with the rest", () => {
    // White tops out at 18': a 20' header is an 18 and a 2' piece, which shares
    // a 16 with the two 7' legs.
    const white = vinylForDoor("WHITE", 20, 7)!;
    expect(white.description).toBe("WHITE VINYL STOP MOLDING,  [1] - 18FT AND [1] - 16FT");
    expect(white.feet).toBe(34);
    expect(bins(white)).toEqual(["18:18", "16:7+7+2"]);
    // Almond runs to 16' and stocks short lengths: the 2' takes a 7 on its own, the 8' legs their 8s.
    const almond = vinylForDoor("ALMOND", 18, 8)!;
    expect(almond.description).toBe("ALMOND VINYL STOP MOLDING,  [1] - 16FT,  [2] - 8FT AND [1] - 7FT");
    expect(almond.feet).toBe(39);
    // Bronze is 16' only: the 2' and the two 7' legs fill the second 16 exactly.
    const bronze = vinylForDoor("BRONZE", 18, 7)!;
    expect(bronze.description).toBe("BRONZE VINYL STOP MOLDING,  [2] - 16FT");
    expect(bins(bronze)).toEqual(["16:16", "16:7+7+2"]);
  });

  it("handles the half-foot sizes", () => {
    // 7'6" legs: 7.5 + 7.5 fits a 16; in white each takes an 8 on its own for the same 16 ft, so nothing is cut.
    expect(bins(vinylForDoor("GRAY", 9, 7.5)!)).toEqual(["16:9", "16:7.5+7.5"]);
    expect(vinylForDoor("WHITE", 9, 7.5)!.description).toBe("WHITE VINYL STOP MOLDING,  [1] - 9FT AND [2] - 8FT");
  });

  it("packs a long run without the table", () => {
    const v = vinylForDoor("MEDIUM FINISH", 9, 7, 400)!;
    expect(v.feet).toBeGreaterThanOrEqual(400 * 23);
    expect(v.feet % 16).toBe(0);
  });

  it("still returns nothing for a colour that is not stocked", () => {
    expect(vinylForDoor("PURPLE", 9, 7)).toBeNull();
  });

  it("resolves Ultra Grain from the finish word, not the wood family", () => {
    // Oak Dark, Classic Dark and Cypress Dark all take DARK FINISH molding.
    expect(vinylForDoorColor("Ultra-Grain Oak Dark Finish")).toBe("DARK FINISH");
    expect(vinylForDoorColor("Ultra-Grain Classic Walnut Finish")).toBe("WALNUT FINISH");
    expect(vinylForDoorColor("Ultra-Grain Cypress Medium Finish")).toBe("MEDIUM FINISH");
    expect(vinylForDoorColor("Ultra-Grain Classic Cherry Finish")).toBe("CHERRY");
    expect(vinylForDoorColor("Ultra-Grain Oak Slate Finish")).toBe("SLATE");
  });

  it("asks when an Ultra Grain door names no finish", () => {
    expect(vinylForDoorColor("Ultra Grain")).toBeNull();
  });

  it("puts charcoal molding on an Iron Ore door — there is no Iron Ore vinyl", () => {
    expect(vinylForDoorColor("Iron Ore")).toBe("CHARCOAL");
  });

  it("sends chocolate to plain brown, not mocha", () => {
    expect(vinylForDoorColor("Chocolate Brown")).toBe("BROWN");
    expect(vinylForDoorColor("Mocha Brown")).toBe("MOCHA BROWN");
    expect(vinylForDoorColor("Glacier White")).toBe("WHITE");
  });

  it("resolves every door colour that has a vinyl equivalent", () => {
    // A bare "Ultra Grain" names no finish, so it correctly returns null and
    // the tool asks. Everything else must resolve to a stocked colour.
    const NO_VINYL = new Set(["Ultra Grain"]);
    for (const c of new Set(Object.values(COLORS).flat())) {
      const mapped = vinylForDoorColor(c);
      if (NO_VINYL.has(c)) {
        expect(mapped, `${c} should not auto-resolve`).toBeNull();
        continue;
      }
      expect(mapped, `no vinyl resolved for door colour ${c}`).toBeTruthy();
      expect(VINYL_STOCK[mapped!], `${mapped} has no stock lengths`).toBeTruthy();
    }
  });

  it("resolves the named Ultra Grain finishes now on the colour lists", () => {
    for (const [door, want] of [
      ["Ultra-Grain Oak Dark Finish", "DARK FINISH"],
      ["Ultra-Grain Oak Slate Finish", "SLATE"],
      ["Ultra-Grain Classic Cherry Finish", "CHERRY"],
      ["Ultra-Grain Classic Medium Finish", "MEDIUM FINISH"],
    ] as const) {
      expect(vinylForDoorColor(door)).toBe(want);
    }
  });
});

describe("vinyl by the piece (7/10/2026)", () => {
  it("words and prices the pieces like a door's vinyl, longest first", () => {
    const o = vinylForPieces("ALMOND", [{ ft: 7, count: 4 }, { ft: 8, count: 2 }])!;
    expect(o.description).toBe("ALMOND VINYL STOP MOLDING,  [2] - 8FT AND [4] - 7FT");
    expect([o.feet, o.pricePerFt, o.total]).toEqual([44, 0.95, 41.8]);
  });

  it("merges a length picked twice, and leaves out what cannot be sold", () => {
    const o = vinylForPieces("WHITE", [{ ft: 16, count: 1 }, { ft: 16, count: 2 }, { ft: null, count: 3 }, { ft: 9, count: 0 }, { ft: 11, count: 1 }])!;
    expect(o.description).toBe("WHITE VINYL STOP MOLDING,  [3] - 16FT");
    expect(vinylForPieces("ALMOND", [{ ft: 12, count: 1 }])).toBeNull(); // not stocked in almond
    expect(vinylForPieces("PURPLE", [{ ft: 16, count: 1 }])).toBeNull();
  });
});

describe("the sizes on a vinyl line (8/10/2026)", () => {
  const p = (...fts: number[]) => fts.map((ft) => ({ ft, count: 1 }));
  it("joins two sizes with AND, and uses AND only before the last of more", () => {
    expect(piecesText(p(16))).toBe("[1] - 16FT");
    expect(piecesText(p(16, 8))).toBe("[1] - 16FT AND [1] - 8FT");
    expect(piecesText(p(16, 8, 7))).toBe("[1] - 16FT,  [1] - 8FT AND [1] - 7FT");
    expect(piecesText(p(18, 16, 8, 7))).toBe("[1] - 18FT,  [1] - 16FT,  [1] - 8FT AND [1] - 7FT");
  });
});
