import { describe, expect, it } from "vitest";
import { PARTS_MENU, TRACK_MENU, PARTS_TAB_MENU, GROUP_TABS, tabForPart, type PartsMenu } from "./data/parts-menu";
import { PARTS_TAB_CATEGORIES, TRACK_CATEGORIES } from "./data/springs";
import type { PartCategory } from "./data/parts";

const pages = (menu: PartsMenu) => menu.flatMap((g) => g.entries.map((e) => ({ group: g.label, ...e })));
const names = (menu: PartsMenu, group: string, entry: string) =>
  pages(menu).find((p) => p.group === group && p.label === entry)?.parts.map((mp) => mp.part.name);

describe("every part has exactly one page", () => {
  for (const [tab, menu, cats] of [["Parts", PARTS_MENU, PARTS_TAB_CATEGORIES], ["Track", TRACK_MENU, TRACK_CATEGORIES]] as [string, PartsMenu, PartCategory[]][]) {
    it(`on the ${tab} tab`, () => {
      const seen = new Map<string, number>();
      for (const p of pages(menu)) for (const mp of p.parts) {
        const k = `${mp.category}|${mp.part.name}`;
        seen.set(k, (seen.get(k) ?? 0) + 1);
      }
      for (const c of cats) for (const part of c.items) expect(seen.get(`${c.name}|${part.name}`), `${c.name} ${part.name}`).toBe(1);
      expect(seen.size).toBe(cats.reduce((n, c) => n + c.items.length, 0));
    });
  }
});

describe("the Parts drop-downs Brandon set out (6/10/2026)", () => {
  it("leads with Tools, Angle, Retainers and Seals", () => {
    expect(PARTS_MENU.slice(0, 4).map((g) => g.label)).toEqual(["Tools", "Angle", "Retainers", "Seals"]);
  });

  it("puts the tools on their own pages, the Felco cutter as the CABLE CUTTER", () => {
    expect(PARTS_MENU[0].entries.map((e) => e.label)).toEqual([
      "Felco cutter", "Multi cutter", "Multi cutter blades", "Pocket gauge", "Torsion spring ruler", "Staples", "Spray lube", "Winding bars",
    ]);
    expect(names(PARTS_MENU, "Tools", "Felco cutter")).toEqual(["CABLE CUTTER"]);
    expect(names(PARTS_MENU, "Tools", "Torsion spring ruler")).toEqual(["RULER"]);
    expect(names(PARTS_MENU, "Tools", "Winding bars")).toHaveLength(3);
  });

  it("splits retainers from seals, the aluminum retainers and brush seals included", () => {
    expect(names(PARTS_MENU, "Retainers", "L retainers")).toEqual(['1-3/4" L RETAINER', '1-3/8" L RETAINER', '2" L RETAINER']);
    expect(names(PARTS_MENU, "Retainers", "U retainers")).toEqual(['1-3/8" U RETAINER', '2" U RETAINER']);
    expect(names(PARTS_MENU, "Retainers", "Aluminum retainers")).toHaveLength(3);
    expect(names(PARTS_MENU, "Seals", "Bottom T rubbers")).toHaveLength(3);
    expect(names(PARTS_MENU, "Seals", "Brush seals")).toEqual(['1" BRUSH SEAL', '2" BRUSH SEAL', '3" BRUSH SEAL']);
    for (const s of ["Jamb seals", "Rolling steel bottom seals", "Threshold seals", "Top header seals"]) {
      expect(names(PARTS_MENU, "Seals", s), s).toHaveLength(1);
    }
  });

  it("gives drums, hinges, rollers and fasteners pages of their own", () => {
    expect(names(PARTS_MENU, "Drums", "400 series")).toHaveLength(3);
    expect(names(PARTS_MENU, "Hinges", "14 gauge")).toHaveLength(7);
    expect(names(PARTS_MENU, "Rollers", "Long stem")).toHaveLength(3);
    expect(names(PARTS_MENU, "Fasteners", "Tek screws")).toHaveLength(3);
  });
});

describe("the Track buttons", () => {
  it("has complete track by kind, then a button each for adder, raw and pierced pieces", () => {
    expect(TRACK_MENU.map((g) => g.label)).toEqual(["Complete track", "Adder pieces", "Raw track", "Pierced track"]);
    expect(names(TRACK_MENU, "Complete track", "Residential")).toHaveLength(16);
    expect(names(TRACK_MENU, "Complete track", "Commercial")).toHaveLength(8);
    expect(names(TRACK_MENU, "Pierced track", "Pierced track")).toEqual(['76" PIERCED TRACK', '88" PIERCED TRACK', '100" PIERCED TRACK', '112" PIERCED TRACK']);
  });
});

describe("the Parts group tabs (6/10/2026)", () => {
  it("are Tools, Angle, Retainers, Seals, Tube shafts and Struts, each a real group", () => {
    expect(GROUP_TABS.map((t) => t.group)).toEqual(["Tools", "Angle", "Retainers", "Seals", "Tube shafts", "Struts"]);
    for (const t of GROUP_TABS) expect(t.menu.map((g) => g.label), t.group).toEqual([t.group]);
  });

  it("leave the Parts tab with every other group", () => {
    expect(PARTS_TAB_MENU.map((g) => g.label)).not.toContain("Tools");
    expect(PARTS_TAB_MENU.map((g) => g.label)).not.toContain("Struts");
    expect(PARTS_TAB_MENU).toHaveLength(PARTS_MENU.length - 6);
  });

  it("search only their own parts: no jamb seal on the Retainers tab", () => {
    const retainers = GROUP_TABS.find((t) => t.id === "retainers")!;
    const names = retainers.categories.flatMap((c) => c.items.map((p) => p.name));
    expect(names).toContain('2" L RETAINER');
    expect(names).not.toContain("JAMB SEAL");
  });

  it("say which tab a part is sold from", () => {
    expect(tabForPart("TOOLS", "CABLE CUTTER")).toBe("tools");
    expect(tabForPart("RETAINERS", "JAMB SEAL")).toBe("seals");
    expect(tabForPart("DRUMS", "1100-18")).toBe("parts");
  });
});
