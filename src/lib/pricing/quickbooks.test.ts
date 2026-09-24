import { describe, it, expect } from "vitest";
import {
  quickBooksRow, categoryItem,
  QB_STOCK_DOORS, QB_SPECIAL_ORDERS, QB_TORSION, QB_EXTENSION, QB_VINYL,
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

describe("item names", () => {
  it("collapses every door onto one item", () => {
    // Residential, commercial and replacement sections all bill as STOCK
    // DOOR — Brandon, 24/9/2026.
    expect(QB_STOCK_DOORS).toBe("STOCK DOOR");
  });

  it("names everything in the singular", () => {
    // The item names a line, not a category, and the QTY column already says
    // how many.
    expect(QB_SPECIAL_ORDERS).toBe("SPECIAL ORDER");
    expect(QB_TORSION).toBe("TORSION SPRING");
    expect(QB_EXTENSION).toBe("EXTENSION SPRING");
    expect(QB_VINYL).toBe("VINYL");
  });

  it("singularises a part or operator category from the data", () => {
    // No mapping table to fall out of step when a category is added.
    expect(categoryItem("DRUMS")).toBe("DRUM");
    expect(categoryItem("keypads")).toBe("KEYPAD");
    expect(categoryItem("  Remotes  ")).toBe("REMOTE");
    expect(categoryItem(null)).toBe("");
  });

  it("handles the endings that a bare trailing S gets wrong", () => {
    expect(categoryItem("BATTERIES")).toBe("BATTERY");
    expect(categoryItem("ACCESSORIES")).toBe("ACCESSORY");
    expect(categoryItem("PULLEYS")).toBe("PULLEY");
  });

  it("leaves a name that is already singular alone", () => {
    for (const n of ["CHAIN HOIST", "DECORATIVE HARDWARE", "QUICK DISCONNECT",
                     "TUBE SHAFT", "SPROCKET", "ANGLE", "ARB"]) {
      expect(categoryItem(n), n).toBe(n);
    }
  });

  it("singularises each side of a slashed name", () => {
    expect(categoryItem("BRUSH SEAL / RETAINERS")).toBe("BRUSH SEAL / RETAINER");
    expect(categoryItem("CENTER PLATES / BEARINGS")).toBe("CENTER PLATE / BEARING");
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

describe("operator item names", () => {
  it("drops the brand and shortens the rest", () => {
    // The catalogue names are written for browsing — "LIFTMASTER LOGIC 5" tells
    // a counter what shelf to look on. The invoice wants the short form.
    expect(categoryItem("LIFTMASTER LOGIC 5")).toBe("LOGIC 5");
    expect(categoryItem("LIFTMASTER ACCESSORIES")).toBe("ACCESSORY");
    expect(categoryItem("MAXUM OPERATORS")).toBe("MAXUM");
    expect(categoryItem("RESIDENTIAL BELT DRIVES")).toBe("BELT DRIVE");
    expect(categoryItem("RESIDENTIAL CHAIN DRIVES")).toBe("CHAIN DRIVE");
    expect(categoryItem("I BEAM RAILS")).toBe("I BEAM RAIL");
  });

  it("collapses both sidemounts onto one item", () => {
    expect(categoryItem("RESIDENTIAL SIDEMOUNT")).toBe("SIDEMOUNT");
    expect(categoryItem("LIGHT COMMERCIAL SIDEMOUNT")).toBe("SIDEMOUNT");
  });

  it("leaves the groups that need no rename", () => {
    expect(categoryItem("KEYPADS")).toBe("KEYPAD");
    expect(categoryItem("REMOTES")).toBe("REMOTE");
    expect(categoryItem("PHOTOEYES")).toBe("PHOTOEYE");
    expect(categoryItem("CONTROL PANELS")).toBe("CONTROL PANEL");
    expect(categoryItem("SPROCKET")).toBe("SPROCKET");
  });
});

describe("operator item names", () => {
  it("drops the brand and shortens to the trade name", () => {
    // The catalogue names are written for browsing; the QuickBooks item list
    // holds the short name that goes on an invoice.
    expect(categoryItem("LIFTMASTER LOGIC 5")).toBe("LOGIC 5");
    expect(categoryItem("LIFTMASTER ACCESSORIES")).toBe("ACCESSORY");
    expect(categoryItem("MAXUM OPERATORS")).toBe("MAXUM");
    expect(categoryItem("RESIDENTIAL BELT DRIVES")).toBe("BELT DRIVE");
    expect(categoryItem("RESIDENTIAL CHAIN DRIVES")).toBe("CHAIN DRIVE");
  });

  it("collapses both sidemounts onto one item", () => {
    expect(categoryItem("RESIDENTIAL SIDEMOUNT")).toBe("SIDEMOUNT");
    expect(categoryItem("LIGHT COMMERCIAL SIDEMOUNT")).toBe("SIDEMOUNT");
  });

  it("leaves the groups that need no override to the singular rule", () => {
    expect(categoryItem("KEYPADS")).toBe("KEYPAD");
    expect(categoryItem("REMOTES")).toBe("REMOTE");
    expect(categoryItem("PHOTOEYES")).toBe("PHOTOEYE");
    expect(categoryItem("CONTROL PANELS")).toBe("CONTROL PANEL");
    expect(categoryItem("SPROCKET")).toBe("SPROCKET");
  });

  it("never returns a name with a trailing plural", () => {
    for (const n of ["LIFTMASTER LOGIC 5", "MAXUM OPERATORS", "BELT RAILS",
                     "CHAIN RAILS", "I BEAM RAILS", "KEYPADS", "REMOTES"]) {
      const item = categoryItem(n);
      expect(item.endsWith("S") && !item.endsWith("SS"), `${n} -> ${item}`).toBe(false);
    }
  });
});
