import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SHELF_ITEMS, STOCK_ITEMS, TRACKED_KEYS, changeFor, cleanCode, findStockItem, parseQty } from "./inventory";

describe("inventory — which parts can be counted", () => {
  it("keys every shelf part distinctly, so any can be switched on later", () => {
    const keys = SHELF_ITEMS.map((i) => i.key);
    expect(keys.length).toBeGreaterThan(0);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("tracks every listed part, and only real shelf parts", () => {
    // A mistyped key matches no part and quietly drops out — this catches it.
    expect(STOCK_ITEMS).toHaveLength(TRACKED_KEYS.length);
    expect(STOCK_ITEMS.map((i) => i.name).sort()).toEqual(['1/4" X 3/4" TEK', '3/8" FLAT WASHERS', "TRACK NUTS"]);
    const tek = STOCK_ITEMS.find((i) => i.key === 'FASTENERS|1/4" X 3/4" TEK')!;
    expect(tek.desc).toMatch(/BAG OF 100/);
    expect(findStockItem(tek.key)).toEqual(tek);
  });

  it("has a photo for every tracked part, and the file is there", () => {
    for (const i of STOCK_ITEMS) {
      expect(i.photo, i.key).toBeTruthy();
      expect(existsSync(join(process.cwd(), "public", i.photo!)), i.photo).toBe(true);
    }
  });

  it("links the seeded barcodes to real tracked parts", () => {
    // A typo in the SQL would link a barcode to nothing, and it would scan as
    // "not linked" at the counter.
    const sql = readFileSync(join(process.cwd(), "db", "schema.sql"), "utf8");
    const seeded = [...sql.matchAll(/\('(\d+)',\s*'([^']+)',\s*'setup'\)/g)].map((m) => [m[1], m[2]]);
    expect(Object.fromEntries(seeded)).toEqual({
      "12345": 'FASTENERS|1/4" X 3/4" TEK',
      "123456": "FASTENERS|TRACK NUTS",
      "1234567": 'FASTENERS|3/8" FLAT WASHERS',
    });
    for (const [, key] of seeded) expect(findStockItem(key), key).not.toBeNull();
  });

  it("does not count a shelf part that has not been switched on", () => {
    const other = SHELF_ITEMS.find((i) => i.key !== STOCK_ITEMS[0].key)!;
    expect(findStockItem(other.key)).toBeNull();
    expect(findStockItem("NOPE|NOPE")).toBeNull();
  });
});

describe("inventory — what a scan does", () => {
  it("pulls take away, put-aways add, and a count sets the shelf", () => {
    expect(changeFor("pull", 2, 10)).toBe(-2);
    expect(changeFor("put_away", 5, 10)).toBe(5);
    expect(changeFor("count", 7, 10)).toBe(-3);
    expect(changeFor("count", 12, 10)).toBe(2);
    expect(changeFor("count", 0, 4)).toBe(-4);
  });

  it("allows a count of zero, but never a pull or put-away of zero", () => {
    expect(parseQty("count", 0)).toBe(0);
    expect(parseQty("pull", 0)).toBeNull();
    expect(parseQty("put_away", "3")).toBe(3);
    expect(parseQty("pull", 1.5)).toBeNull();
    expect(parseQty("pull", -1)).toBeNull();
  });

  it("keeps exactly what the scanner typed, minus the edges", () => {
    expect(cleanCode("  012345678905 ")).toBe("012345678905");
    expect(cleanCode("")).toBeNull();
    expect(cleanCode("01\t23")).toBeNull();
    expect(cleanCode("x".repeat(129))).toBeNull();
  });
});
