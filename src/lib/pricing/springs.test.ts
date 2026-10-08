import { describe, it, expect } from "vitest";
import { PART_CATEGORIES } from "./data/parts";
import { priceNotSet } from "./data/part-pricing";
import { categoryItem } from "./data/quickbooks";
import {
  EXTENSION_CATEGORY,
  EXTENSION_SPRINGS,
  KITS_GROUP,
  SHELF_PART_CATEGORIES,
  HAND_PRICES,
  HAND_ADDED_PARTS,
  PARTS_TAB_CATEGORIES,
  TRACK_CATEGORIES,
  CABLE_CATEGORIES,
  STOCK_TORSION_SPRINGS,
  TORSION_CATEGORY,
  springGroups,
} from "./data/springs";

describe("springs split out of the parts shelf", () => {
  it("finds both spring categories in the generated data", () => {
    // If gen_parts.py ever renames these, category() falls back to an empty
    // list and the tabs silently go blank. Fail here instead.
    expect(EXTENSION_SPRINGS.items.length).toBeGreaterThan(0);
    expect(STOCK_TORSION_SPRINGS.items.length).toBeGreaterThan(0);
  });

  it("leaves no spring anywhere on the parts shelf", () => {
    const names = SHELF_PART_CATEGORIES.map((c) => c.name);
    expect(names).not.toContain(EXTENSION_CATEGORY);
    expect(names).not.toContain(TORSION_CATEGORY);
    // Two spring sheets out, the two kit categories in (30/9/2026).
    expect(SHELF_PART_CATEGORIES.length).toBe(PART_CATEGORIES.length - 2 + 2);
  });

  it("keeps every other category and every item intact", () => {
    const shelfItems = SHELF_PART_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
    const moved = EXTENSION_SPRINGS.items.length + STOCK_TORSION_SPRINGS.items.length;
    const all = PART_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
    const added = Object.values(HAND_ADDED_PARTS).reduce((n, list) => n + list.length, 0);
    expect(shelfItems + moved).toBe(all + added);
  });

  it("prices nothing differently — the move is a move, not a repricing", () => {
    const source = PART_CATEGORIES.find((c) => c.name === EXTENSION_CATEGORY)!;
    for (const p of EXTENSION_SPRINGS.items) expect(source.items).toContain(p); // the same rows, untouched
  });
});

describe("spring groups", () => {
  it("labels torsion springs by door height, with no kits among them", () => {
    expect(springGroups(STOCK_TORSION_SPRINGS).map((g) => g.label)).toEqual(["7FT", "8FT", "9FT"]);
  });

  it("groups extension springs by 7ft and 8ft", () => {
    expect(springGroups(EXTENSION_SPRINGS).map((g) => g.label)).toEqual(["7FT", "8FT"]);
  });

  it("still files an unheaded row under KITS, should a sheet add one", () => {
    const groups = springGroups({ name: "X", items: [{ name: "A", desc: "A", price: 1 }, { name: "B", desc: "B", price: 1, sub: "X, 7FT" }] });
    expect(groups.map((g) => g.label)).toEqual([KITS_GROUP, "7FT"]);
  });

  it("loses no item to grouping", () => {
    for (const cat of [EXTENSION_SPRINGS, STOCK_TORSION_SPRINGS]) {
      const grouped = springGroups(cat).reduce((n, g) => n + g.items.length, 0);
      expect(grouped).toBe(cat.items.length);
    }
  });
});

describe("shapes the spring tabs assume", () => {
  it("has no per-foot or handed extension spring", () => {
    // ExtensionTool renders no footage and no hand inputs. If the sheet grows a
    // row that needs them, this fails rather than quoting a silent zero.
    for (const p of EXTENSION_SPRINGS.items) {
      expect(p.perFoot).toBeFalsy();
      expect(p.hands).toBeFalsy();
    }
  });

  it("has no per-foot stock torsion spring", () => {
    for (const p of STOCK_TORSION_SPRINGS.items) {
      expect(p.perFoot).toBeFalsy();
    }
  });
});

describe("track and cables have their own tabs", () => {
  const names = (cats: { name: string }[]) => cats.map((c) => c.name);

  it("takes them off the Parts tab and gives each its own", () => {
    expect(names(PARTS_TAB_CATEGORIES)).not.toContain("TRACKS");
    expect(names(PARTS_TAB_CATEGORIES)).not.toContain("CABLES");
    expect(names(TRACK_CATEGORIES)).toEqual(["TRACKS"]);
    expect(names(CABLE_CATEGORIES)).toEqual(["CABLES"]);
  });

  it("loses nothing: the three tabs together are the whole shelf", () => {
    const all = [...PARTS_TAB_CATEGORIES, ...TRACK_CATEGORIES, ...CABLE_CATEGORIES];
    expect(names(all).sort()).toEqual(names(SHELF_PART_CATEGORIES).sort());
  });
});

describe("the kits sell from the Parts tab", () => {
  const names = (c: string) => SHELF_PART_CATEGORIES.find((x) => x.name === c)?.items.map((p) => p.name);

  it("takes them off the spring tabs and gives Parts two kit categories", () => {
    expect(names("EXTENSION KITS")).toEqual(["7FT EXT KIT", "8FT EXT KIT"]);
    expect(names("TORSION KITS")).toEqual(["7FT TOR KIT", "8FT TOR KIT"]);
    expect(EXTENSION_SPRINGS.items.some((p) => /KIT/.test(p.name))).toBe(false);
    expect(STOCK_TORSION_SPRINGS.items.some((p) => /KIT/.test(p.name))).toBe(false);
  });

  it("files them alphabetically, after DRUMS", () => {
    const order = SHELF_PART_CATEGORIES.map((c) => c.name);
    expect(order[0]).toBe("DRUMS");
    expect(order.indexOf("EXTENSION KITS")).toBe(order.indexOf("END BEARING PLATES") + 1);
    expect(order.indexOf("TORSION KITS")).toBe(order.indexOf("TOOLS") + 1);
  });

  it("bills them to QuickBooks as PARTS, like the rest of the Parts tab (6/10/2026)", () => {
    expect(categoryItem("EXTENSION KITS")).toBe("PARTS");
    expect(categoryItem("TORSION KITS")).toBe("PARTS");
  });
});

describe("the Track tab", () => {
  const items = () => TRACK_CATEGORIES[0].items;

  it("reads residential sets first, then the adders, commercial sets and raw track", () => {
    const order = [...new Set(items().map((p) => p.sub))];
    expect(order).toEqual(["RESIDENTIAL TRACKS", "ADDER PIECES", "PIERCED TRACK", "COMMERCIAL TRACKS", "RAW TRACK"]);
  });

  it("keeps every track from the sheet, and adds the two adder pieces at their prices", () => {
    const sheet = PART_CATEGORIES.find((c) => c.name === "TRACKS")!;
    expect(items()).toHaveLength(sheet.items.length + HAND_ADDED_PARTS.TRACKS.length);
    for (const p of sheet.items) expect(items().some((q) => q.name === p.name && q.price === p.price)).toBe(true);
    const adder = (n: string) => items().find((p) => p.name === n)?.price;
    expect(adder('36" ADDER PIECE')).toBe(129.95);
    expect(adder('54" ADDER PIECE')).toBe(149.95);
  });

  it("still prices raw track by the foot", () => {
    expect(items().find((p) => p.name === '2" RAW TRACK')?.perFoot).toBe(true);
  });
});

describe("pierced track (30/9/2026)", () => {
  it("sells four lengths, by the pair, under their own heading", () => {
    const pierced = TRACK_CATEGORIES[0].items.filter((p) => p.sub === "PIERCED TRACK");
    expect(pierced.map((p) => [p.name, p.price])).toEqual([
      ['76" PIERCED TRACK', 29.95], ['88" PIERCED TRACK', 34.95],
      ['100" PIERCED TRACK', 39.95], ['112" PIERCED TRACK', 45.95],
    ]);
    for (const p of pierced) expect(p.desc).toMatch(/PAIR$/);
  });
});

describe("cable hardware (30/9/2026)", () => {
  it("sells sleeves, stops and thimbles in bags of 100, priced by size, on the Cables tab", () => {
    const items = CABLE_CATEGORIES[0].items.filter((p) => p.sub === "CABLE HARDWARE");
    expect(items).toHaveLength(9);
    const price = (n: string) => items.find((p) => p.name === n)?.price;
    for (const kind of ["SLEEVES", "STOPS", "THIMBLES"]) {
      expect(price(`1/8" ${kind}`), kind).toBe(19.95);
      expect(price(`5/32" ${kind}`), kind).toBe(24.95);
      expect(price(`3/16" ${kind}`), kind).toBe(29.95);
    }
    for (const p of items) expect(p.desc).toMatch(/BAG OF 100$/);
  });

  it("keeps the cables the sheet already had", () => {
    const sheet = PART_CATEGORIES.find((c) => c.name === "CABLES")!;
    for (const p of sheet.items) expect(CABLE_CATEGORIES[0].items).toContain(p);
  });
});

describe("cable rolls (6/10/2026)", () => {
  it("sells 250FT rolls only, priced by size", () => {
    const rolls = CABLE_CATEGORIES[0].items.filter((p) => p.sub === "CABLE ROLLS");
    expect(rolls.map((p) => [p.name, p.price])).toEqual([
      ['1/8" CABLE, 250FT ROLL', 99.95],
      ['5/32" CABLE, 250FT ROLL', 149.95],
      ['3/16" CABLE, 250FT ROLL', 199.95],
    ]);
  });

  it("leaves no part on the shelf without a price", () => {
    expect(SHELF_PART_CATEGORIES.flatMap((c) => c.items).filter(priceNotSet).map((p) => p.name)).toEqual([]);
  });
});

describe("prices set by hand ahead of the sheet (7/10/2026)", () => {
  const price = (category: string, name: string) =>
    SHELF_PART_CATEGORIES.find((c) => c.name === category)?.items.find((p) => p.name === name)?.price;

  it("sells the struts and tube shafts at Brandon's prices", () => {
    expect(price("STRUTS", "10FT STRUT")).toBe(22.95);
    expect(price("STRUTS", "12FT STRUT")).toBe(25.95);
    expect(price("STRUTS", "14FT STRUT")).toBe(34.95);
    expect(price("TUBE SHAFT", "10FT TUBE SHAFT")).toBe(24.95);
    expect(price("TUBE SHAFT", "14FT TUBE SHAFT")).toBe(34.95);
    expect(price("STRUTS", "16FT STRUT")).toBe(34.95); // untouched
  });

  it("is still needed: the sheet has not caught up with any of them", () => {
    // When this fails, the sheet carries that price now — delete it from HAND_PRICES.
    for (const [key, hand] of Object.entries(HAND_PRICES)) {
      const [category, name] = key.split("|");
      const sheet = PART_CATEGORIES.find((c) => c.name === category)?.items.find((p) => p.name === name);
      expect(sheet, `${key} is on the sheet`).toBeTruthy();
      expect(sheet!.price, key).not.toBe(hand);
    }
  });
});

describe("stock springs in order (8/10/2026)", () => {
  const feet = (sub?: string) => Number(/(\d+)\s*FT/.exec(sub ?? "")?.[1]);
  const weight = (name: string) => Number(/^(\d+)\s*LBS/.exec(name)?.[1] ?? /^\d+-\d+-(\d+)/.exec(name)?.[1]);

  for (const cat of [EXTENSION_SPRINGS, STOCK_TORSION_SPRINGS]) {
    it(`${cat.name}: door height first, then lightest to heaviest`, () => {
      for (let i = 1; i < cat.items.length; i++) {
        const [a, b] = [cat.items[i - 1], cat.items[i]];
        const ok = feet(a.sub) < feet(b.sub) || (feet(a.sub) === feet(b.sub) && weight(a.name) < weight(b.name));
        expect(ok, `${a.name} (${a.sub}) before ${b.name} (${b.sub})`).toBe(true);
      }
    });
  }

  it("groups the heights 7FT, 8FT, 9FT, and keeps every spring", () => {
    expect(springGroups(STOCK_TORSION_SPRINGS).map((g) => g.label)).toEqual(["7FT", "8FT", "9FT"]);
    expect(springGroups(EXTENSION_SPRINGS).map((g) => g.label)).toEqual(["7FT", "8FT"]);
    expect(STOCK_TORSION_SPRINGS.items).toHaveLength(29);
    expect(EXTENSION_SPRINGS.items).toHaveLength(39);
  });
});
