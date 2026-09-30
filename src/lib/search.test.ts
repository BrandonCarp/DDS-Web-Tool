import { describe, expect, it } from "vitest";
import { buildIndex, searchIndex } from "./search";
import { EXTENSION_SPRINGS, STOCK_TORSION_SPRINGS } from "@/lib/pricing/data/springs";
import { commMfrs, commModelsFor } from "@/lib/pricing/data/commercial-meta";
import { modelSelectionValue } from "@/lib/pricing/data/special-door-pricing";
import { SPECIAL, SO_MANUFACTURERS, seriesFor } from "@/lib/pricing/data/special-orders";

const TABS = [
  { id: "residential", label: "Residential" }, { id: "commercial", label: "Commercial" },
  { id: "special", label: "Special Order" }, { id: "torsion", label: "Torsion Springs" },
  { id: "extension", label: "Extension Springs" }, { id: "parts", label: "Parts" },
  { id: "track", label: "Track" }, { id: "cables", label: "Cables" },
  { id: "vinyl", label: "Vinyl" }, { id: "operators", label: "Operators" },
];
const index = buildIndex(TABS, ["T50S", "4050", "4053", "GD1SP"]);
const find = (q: string) => searchIndex(index, q);

describe("quick search", () => {
  it("finds a part and opens it on its own tab, in its own category", () => {
    const [hit] = find("1100-18");
    expect(hit).toMatchObject({ tab: "parts", label: "1100-18", pick: { kind: "part", category: "DRUMS", name: "1100-18" } });
    expect(hit.price).toMatch(/^\$/);
  });

  it("finds the hand-added adder pieces on the Track tab", () => {
    expect(find('36" adder')[0]).toMatchObject({ tab: "track", label: '36" ADDER PIECE', price: "$129.95" });
  });

  it("sends track and cables to their own tabs", () => {
    expect(find('2" raw track')[0]).toMatchObject({ tab: "track", pick: { kind: "part", category: "TRACKS" } });
    expect(find("cable keepers")[0]).toMatchObject({ tab: "cables", pick: { kind: "part", category: "CABLES" } });
  });

  it("finds springs on the spring tabs, and the kits in Parts", () => {
    const ext = EXTENSION_SPRINGS.items[0], tor = STOCK_TORSION_SPRINGS.items[0];
    expect(find(ext.name)[0]).toMatchObject({ tab: "extension", pick: { kind: "spring", name: ext.name } });
    expect(find(tor.name)[0]).toMatchObject({ tab: "torsion", pick: { kind: "spring", name: tor.name } });
    expect(find("7ft ext kit")[0]).toMatchObject({ tab: "parts", pick: { kind: "part", category: "EXTENSION KITS" } });
    expect(find("7ft tor kit")[0]).toMatchObject({ tab: "parts", pick: { kind: "part", category: "TORSION KITS" } });
  });

  it("finds an operator by its rail length, not just its model", () => {
    const [hit] = find("2240l 10ft");
    expect(hit.tab).toBe("operators");
    expect(hit.pick).toMatchObject({ kind: "operator" });
    expect(hit.detail).toContain("10FT CHAIN RAIL");
  });

  it("needs every word to match", () => {
    const names = find("tek 3/4").map((h) => h.label);
    expect(names).toContain('1/4" X 3/4" TEK');
    expect(names).not.toContain('1/4" X 1" TEK');
  });

  it("finds a tab by its name, first", () => {
    const [hit] = find("vinyl");
    expect(hit.tab).toBe("vinyl");
    expect(hit.pick).toBeUndefined(); // a tab: choosing it just opens it
  });

  it("only searches the tabs this person can see", () => {
    const noOperators = buildIndex(TABS.filter((t) => t.id !== "operators"));
    expect(searchIndex(noOperators, "2240l")).toEqual([]);
  });

  it("returns nothing for an empty search", () => {
    expect(find("   ")).toEqual([]);
  });
});

describe("quick search: doors", () => {
  it("offers 4050 as the stock residential door first, then as a special order", () => {
    const [first, second] = find("4050"); // exact names rank before anything merely starting 4050
    expect(first).toMatchObject({ tab: "residential", label: "4050", pick: { kind: "resdoor", model: "4050" } });
    expect(second).toMatchObject({ tab: "special", label: "4050" });
    expect(second.pick).toEqual({
      kind: "sodoor", scope: "residential", mfr: "Clopay", series: "Premium Steel Collection",
      model: modelSelectionValue("4050/4051/4053", "4050"),
    });
  });

  it("finds the stock commercial doors", () => {
    const mfr = commMfrs()[0];
    const model = commModelsFor(mfr)[0];
    expect(find(model).find((h) => h.tab === "commercial")?.pick).toEqual({ kind: "commdoor", mfr, model });
  });

  it("finds special order commercial models, an everyday one picked outright", () => {
    expect(find("3720").find((h) => h.tab === "special")?.pick).toEqual({
      kind: "sodoor", scope: "commercial", mfr: "Clopay", series: "3720", model: "3720",
    });
  });

  it("offers a special order collection with no model list as the collection itself", () => {
    const flat = SO_MANUFACTURERS.flatMap((mfr) => seriesFor(mfr).map((series) => ({ mfr, series })))
      .find(({ series }) => !SPECIAL[series]?.models);
    expect(flat).toBeTruthy();
    const hit = find(flat!.series).find((h) => h.tab === "special" && h.label === flat!.series);
    expect(hit?.pick).toEqual({ kind: "sodoor", scope: "residential", mfr: flat!.mfr, series: flat!.series, model: "" });
  });

  it("offers only the residential doors that tab stocks", () => {
    expect(find("9133").some((h) => h.tab === "residential")).toBe(false);
    expect(buildIndex(TABS, []).some((e) => e.pick?.kind === "resdoor")).toBe(false);
  });
});
