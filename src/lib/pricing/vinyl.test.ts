import { describe, it, expect } from "vitest";
import { vinylForDoor, vinylForDoorColor, DOOR_COLOR_TO_VINYL, VINYL_STOCK } from "./data/vinyl";
import { COLORS } from "./data/catalog-meta";

describe("vinyl stop molding", () => {
  it("covers a 12x8 black door the way the counter writes it", () => {
    // Black has no 12ft, so the header takes a 16. Confirmed off a real order.
    const v = vinylForDoor("BLACK", 12, 8)!;
    expect(v.description).toBe("BLACK VINYL STOP MOLDING,  [1] - 16FT AND [2] - 8FT");
    expect(v.feet).toBe(32);
    expect(v.total).toBe(62.4);
  });

  it("matches the parts sheet's own default row for an 8x7 white", () => {
    const v = vinylForDoor("WHITE", 8, 7)!;
    expect(v.description).toBe("WHITE VINYL STOP MOLDING,  [1] - 8FT AND [2] - 7FT");
    expect(v.feet).toBe(22);
  });

  it("rounds each piece UP to the next stocked length, never down", () => {
    const v = vinylForDoor("BLACK", 14, 8)!;
    expect(v.headerFt).toBe(16);
    expect(v.legFt).toBe(8);
  });

  it("uses white's extra lengths — a 12ft door is one 12ft piece in white only", () => {
    expect(vinylForDoor("WHITE", 12, 8)!.headerFt).toBe(12);
    expect(vinylForDoor("BLACK", 12, 8)!.headerFt).toBe(16);
  });

  it("collapses to a count of three when every piece is the same length", () => {
    // Bronze is 16ft only, so a small door still takes three 16s.
    const v = vinylForDoor("BRONZE", 8, 7)!;
    expect(v.description).toBe("BRONZE VINYL STOP MOLDING,  [3] - 16FT");
    expect(v.feet).toBe(48);
  });

  it("multiplies whole sets, not piece sizes", () => {
    const one = vinylForDoor("BLACK", 14, 8, 1)!;
    const two = vinylForDoor("BLACK", 14, 8, 2)!;
    expect(two.feet).toBe(one.feet * 2);
    expect(two.total).toBe(Math.round(one.total * 2 * 100) / 100);
    expect(two.description).toBe("BLACK VINYL STOP MOLDING,  [2] - 16FT AND [4] - 8FT");
  });

  it("returns nothing when the opening outruns the stocked lengths", () => {
    expect(vinylForDoor("WHITE", 20, 7)).toBeNull(); // white tops out at 18
    expect(vinylForDoor("BRONZE", 18, 7)).toBeNull(); // bronze is 16 only
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

  it("sends chocolate to plain brown, not mocha", () => {
    expect(vinylForDoorColor("Chocolate Brown")).toBe("BROWN");
    expect(vinylForDoorColor("Mocha Brown")).toBe("MOCHA BROWN");
    expect(vinylForDoorColor("Glacier White")).toBe("WHITE");
  });

  it("maps every door colour except Ultra Grain, which needs a finish", () => {
    const doorColors = new Set(Object.values(COLORS).flat());
    for (const c of doorColors) {
      if (c === "Ultra Grain") {
        expect(DOOR_COLOR_TO_VINYL[c]).toBeUndefined();
        continue;
      }
      const mapped = DOOR_COLOR_TO_VINYL[c];
      expect(mapped, `no vinyl mapped for door colour ${c}`).toBeTruthy();
      expect(VINYL_STOCK[mapped], `${mapped} has no stock lengths`).toBeTruthy();
    }
  });
});
