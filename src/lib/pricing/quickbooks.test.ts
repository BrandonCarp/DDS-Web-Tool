import { describe, it, expect } from "vitest";
import { SHELF_PART_CATEGORIES, TRACK_CATEGORY } from "./data/springs";
import {
  quickBooksRow, categoryItem,
  QB_STOCK_DOORS, QB_SPECIAL_ORDERS, QB_TORSION, QB_EXTENSION, QB_VINYL, QB_SPRINGS, QB_OPERATORS,
} from "./data/quickbooks";

describe("QuickBooks row", () => {
  it("is four tab-separated fields", () => {
    const row = quickBooksRow(QB_STOCK_DOORS, "Clopay 4050", 1, 784.89);
    expect(row.split("\t")).toEqual(["STOCK DOOR", "CLOPAY 4050", "1", "784.89"]);
  });

  it("sends the rate bare, with no currency symbol", () => {
    // QuickBooks wants a number in Rate — a leading "$" had to be deleted by
    // hand on every paste before this existed.
    const rate = quickBooksRow("X", "Y", 1, 1234.5).split("\t")[3];
    expect(rate).toBe("1234.50");
    expect(rate).not.toContain("$");
    expect(rate).not.toContain(",");
  });

  it("always sends two decimal places", () => {
    expect(quickBooksRow("X", "Y", 1, 100).split("\t")[3]).toBe("100.00");
    expect(quickBooksRow("X", "Y", 1, 99.9).split("\t")[3]).toBe("99.90");
  });

  it("sends the unit rate, not the line total", () => {
    // QuickBooks multiplies by QTY itself. Sending the total would square it.
    const [, , qty, rate] = quickBooksRow("X", "Y", 3, 100).split("\t");
    expect(qty).toBe("3");
    expect(rate).toBe("100.00");
  });

  it("never sends a quantity below one", () => {
    for (const q of [0, -1, Number.NaN]) {
      expect(quickBooksRow("X", "Y", q, 1).split("\t")[2], String(q)).toBe("1");
    }
  });

  it("strips tabs and newlines out of the description", () => {
    // A stray tab would shift every field after it into the wrong column.
    const row = quickBooksRow("X", "line one\tline\ntwo", 1, 1);
    expect(row.split("\t")).toHaveLength(4);
    expect(row.split("\t")[1]).toBe("LINE ONE LINE TWO");
  });

  it("uppercases the description, as the counter reads it", () => {
    expect(quickBooksRow("X", "clopay 4050", 1, 1).split("\t")[1]).toBe("CLOPAY 4050");
  });
});

describe("item names — one per tab (6/10/2026)", () => {
  it("collapses every door onto one item", () => {
    expect(QB_STOCK_DOORS).toBe("STOCK DOOR");
    expect(QB_SPECIAL_ORDERS).toBe("SPECIAL ORDER");
    expect(QB_VINYL).toBe("VINYL");
  });

  it("puts every operator and accessory under OPERATORS", () => {
    expect(QB_OPERATORS).toBe("OPERATORS");
  });

  it("puts every spring on the two spring tabs under TORSION SPRINGS", () => {
    expect(QB_SPRINGS).toBe("SPRINGS");
    expect(QB_TORSION).toBe("SPRINGS");
    expect(QB_EXTENSION).toBe("SPRINGS");
  });

  it("puts the spring kits under PARTS, with the rest of the Parts tab", () => {
    expect(categoryItem("EXTENSION KITS")).toBe("PARTS");
    expect(categoryItem("TORSION KITS")).toBe("PARTS");
  });

  it("puts the Tracks tab under PARTS too (7/10/2026)", () => {
    expect(categoryItem(TRACK_CATEGORY)).toBe("PARTS");
    expect(categoryItem("tracks")).toBe("PARTS");
  });

  it("puts everything else on the shelf under PARTS: parts, cables and scanned fasteners", () => {
    for (const c of ["DRUMS", "TUBE SHAFT", "SPRING BUMPERS", "CABLES", "CABLE HARDWARE", "FASTENERS",
                     "BRUSH SEAL / RETAINERS", "  Pulleys  "]) {
      expect(categoryItem(c), c).toBe("PARTS");
    }
    for (const c of SHELF_PART_CATEGORIES.map((x) => x.name)) {
      if (c !== TRACK_CATEGORY) expect(categoryItem(c), c).toBe("PARTS");
    }
    expect(categoryItem(null)).toBe("");
  });
});

describe("the rate is per unit, whatever the quantity", () => {
  it("does not scale with quantity", () => {
    // QuickBooks multiplies RATE by QTY in its own Amount column. Sending the
    // line total would square it — a quantity of 2 came out at four times the
    // door price before this was fixed.
    const one = quickBooksRow("STOCK DOORS", "4050", 1, 784.89).split("\t");
    const two = quickBooksRow("STOCK DOORS", "4050", 2, 784.89).split("\t");
    expect(one[3]).toBe("784.89");
    expect(two[3]).toBe("784.89");
    expect(two[2]).toBe("2");
  });
})

