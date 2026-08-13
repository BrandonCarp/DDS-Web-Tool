import { describe, it, expect } from "vitest";
import { PART_CATEGORIES } from "./data/parts";
import {
  EXTENSION_CATEGORY,
  EXTENSION_SPRINGS,
  KITS_GROUP,
  SHELF_PART_CATEGORIES,
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
    expect(SHELF_PART_CATEGORIES.length).toBe(PART_CATEGORIES.length - 2);
  });

  it("keeps every other category and every item intact", () => {
    const shelfItems = SHELF_PART_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
    const moved = EXTENSION_SPRINGS.items.length + STOCK_TORSION_SPRINGS.items.length;
    const all = PART_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
    expect(shelfItems + moved).toBe(all);
  });

  it("prices nothing differently — the move is a move, not a repricing", () => {
    const source = PART_CATEGORIES.find((c) => c.name === EXTENSION_CATEGORY);
    expect(EXTENSION_SPRINGS.items).toBe(source?.items);
  });
});

describe("spring groups", () => {
  it("puts kits first and labels the rest by door height", () => {
    const groups = springGroups(STOCK_TORSION_SPRINGS);
    expect(groups[0].label).toBe(KITS_GROUP);
    expect(groups.map((g) => g.label)).toEqual([KITS_GROUP, "7FT", "8FT", "9FT"]);
  });

  it("groups extension springs by 7ft and 8ft", () => {
    expect(springGroups(EXTENSION_SPRINGS).map((g) => g.label)).toEqual([
      KITS_GROUP,
      "7FT",
      "8FT",
    ]);
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
