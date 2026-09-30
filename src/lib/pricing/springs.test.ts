import { describe, it, expect } from "vitest";
import { PART_CATEGORIES } from "./data/parts";
import { categoryItem, QB_EXTENSION, QB_TORSION } from "./data/quickbooks";
import {
  EXTENSION_CATEGORY,
  EXTENSION_SPRINGS,
  KITS_GROUP,
  SHELF_PART_CATEGORIES,
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
    expect(shelfItems + moved).toBe(all);
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

  it("still bills them to QuickBooks as the springs they come with", () => {
    expect(categoryItem("EXTENSION KITS")).toBe(QB_EXTENSION);
    expect(categoryItem("TORSION KITS")).toBe(QB_TORSION);
  });
});
