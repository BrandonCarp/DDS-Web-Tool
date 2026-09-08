import { describe, it, expect } from "vitest";
import {
  specialDoorQuote, hasGrid, griddedHeights, griddedWidths, compareWidths, offeredHeights,
  groupMembers, groupHasWidthLimits, minWidthFor, excludedWidthsFor, shouldSplitGroup,
  parseModelSelection, modelSelectionValue,
} from "./data/special-door-pricing";
import { SPECIAL_DOORS } from "./data/special-doors";
import { ADDONS } from "./data/addons";
import { priceResidential, quoteResidential } from "./engine";

const M = "4050/4051/4053";
const base = { model: M, height: "7", color: "White", track: "r12" as const, spring: "extension" as const, lock: "none" as const };

describe("special order door grid", () => {
  it("grids the 4050 at 7'0\" and 8'0\", 73 widths from 6'0\" to 18'0\"", () => {
    expect(hasGrid(M)).toBe(true);
    expect(griddedHeights(M)).toEqual(["7", "8"]);
    const w = griddedWidths(M, "7");
    expect(w).toHaveLength(73);
    expect(w[0]).toBe("6");
    expect(w[w.length - 1]).toBe("18");
  });

  it("quotes the SELL column straight, with no further margin", () => {
    // The grid is already at 43M. Applying the margin again here would be the
    // single most expensive mistake available in this file.
    expect(specialDoorQuote({ ...base, width: "8", style: "solid" }).quote?.unitPrice).toBe(723.25);
    expect(specialDoorQuote({ ...base, width: "16", style: "inserts" }).quote?.unitPrice).toBe(1817.47);
    expect(specialDoorQuote({ ...base, width: "18", style: "solid" }).quote?.unitPrice).toBe(1575.05);
  });

  it("agrees with the residential grid wherever both carry a size", () => {
    // The ALL and STOCK tabs are the same book, so a stocked size must quote
    // the same either way. A drift here means one of the two was applied from
    // a stale sheet.
    const stocked: [string, "solid" | "glass" | "inserts", number][] = [
      ["8", "solid", 723.25], ["9", "glass", 956.32], ["12", "inserts", 1462.58],
      ["16", "solid", 1303.18], ["18", "inserts", 2089.35],
    ];
    for (const [width, style, expected] of stocked) {
      expect(specialDoorQuote({ ...base, width, style }).quote?.unitPrice, `${width} ${style}`).toBe(expected);
    }
  });

  it("adds the same option money a stock door pays", () => {
    const plain = specialDoorQuote({ ...base, width: "8", style: "solid" }).quote!;
    const loaded = specialDoorQuote({
      ...base, width: "8", style: "solid",
      spring: "torsion", track: "low_headroom", lock: "lockbar_installed",
    }).quote!;
    expect(loaded.base).toBe(plain.base);
    expect(loaded.unitPrice - plain.unitPrice).toBeCloseTo(
      ADDONS.track.low_headroom + ADDONS.torsion + ADDONS.lockbar_installed, 2,
    );
    expect(loaded.unitPrice).toBeCloseTo(873.25, 2);
  });

  it("refuses anything off the grid, and says to use the manual total", () => {
    for (const off of [
      { ...base, height: "9", width: "8", style: "solid" as const },
      { ...base, width: "19", style: "solid" as const },
      { model: "GD1LP/GD1SP", height: "7", width: "8", style: "solid" as const, color: "White",
        track: "r12" as const, spring: "extension" as const, lock: "none" as const },
    ]) {
      const r = specialDoorQuote(off);
      expect(r.quote).toBeUndefined();
      expect(r.reason).toMatch(/total below/);
    }
  });

  it("carries a price for every style at every gridded width", () => {
    const holes: string[] = [];
    for (const [width, triple] of Object.entries(SPECIAL_DOORS[M]["7"])) {
      for (const style of ["solid", "glass", "inserts"] as const) {
        if (typeof triple[style] !== "number") holes.push(`${width} ${style}`);
      }
    }
    expect(holes).toEqual([]);
  });

  it("prices a standard width below the odd sizes in its band", () => {
    // Clopay's structure, and it is not intuitive: standard widths are stocked
    // and cheap, while any odd width prices at the band above. An 8'2" door is
    // $905.53 against $782.19 for a 9'0" — the odd size costs MORE than the
    // next standard size UP. Asserting "wider is dearer" would be wrong, and
    // asserting nothing would let a transposed row through.
    const solid = (w: string) =>
      specialDoorQuote({ ...base, width: w, style: "solid" }).quote!.unitPrice;
    for (const [std, odd] of [["8", "8.2"], ["9", "9.2"], ["10", "10.2"], ["12", "12.2"]]) {
      expect(solid(std), `${std} should undercut ${odd}`).toBeLessThan(solid(odd));
    }
    expect(solid("8.2")).toBeGreaterThan(solid("9"));
  });

  it("prices every odd width in a band the same", () => {
    const solid = (w: string) =>
      specialDoorQuote({ ...base, width: w, style: "solid" }).quote!.unitPrice;
    for (const band of [["8.2", "8.4", "8.6", "8.8", "8.10"], ["9.2", "9.4", "9.6", "9.8", "9.10"]]) {
      const prices = new Set(band.map(solid));
      expect([...prices], `band ${band[0]}–${band[band.length - 1]}`).toHaveLength(1);
    }
  });
});

describe("width key ordering", () => {
  it("sorts ten-inch widths above two-inch ones", () => {
    // The bug this exists to prevent: Number("6.10") is 6.1, which files 6'10"
    // below 6'2". Six widths on this grid end in ten inches.
    expect(compareWidths("6.10", "6.2")).toBeGreaterThan(0);
    expect(compareWidths("6.2", "6.10")).toBeLessThan(0);
    expect(compareWidths("7", "6.10")).toBeGreaterThan(0);
    expect([...["6.10", "6.2", "6", "7"]].sort(compareWidths)).toEqual(["6", "6.2", "6.10", "7"]);
  });

  it("gives every gridded width a distinct key", () => {
    const w = griddedWidths(M, "7");
    expect(new Set(w).size).toBe(w.length);
  });
});

describe("gridded door verbiage", () => {
  const d = (o: Partial<Parameters<typeof specialDoorQuote>[0]> = {}) =>
    specialDoorQuote({ ...base, width: "8", style: "solid", ...o }).quote!.description;

  it("words a door exactly as the residential tab words the same door", () => {
    // Both land in the same QuickBooks column and the counter reads both, so a
    // difference in phrasing between them is a difference with no meaning.
    expect(d()).toBe(
      `Clopay Model 4050/4051/4053, 8'0" x 7'0", in the color White, solid, no windows, ` +
      `12\u2033 radius track, extension springs, no lock`,
    );
  });

  it("carries colour, options and the insert design through", () => {
    expect(d({ color: "Black", track: "low_headroom", spring: "torsion", lock: "lockbar_installed" }))
      .toContain("in the color Black, solid, no windows, low headroom track, torsion springs, lockbar installed");
    expect(d({ width: "9", style: "inserts", windesign: "509" }))
      .toContain("windows in the top section, Colonial 509 inserts");
  });

  it("says NO INSERTS rather than trailing off, same as residential", () => {
    expect(d({ width: "9", style: "inserts" })).toContain("windows in the top section, no inserts");
    expect(d({ width: "9", style: "glass" })).toContain("glass in the top section, no inserts");
  });

  it("writes ten-inch widths correctly", () => {
    // "8.10" is 8 feet 10 inches, not 8.1 feet.
    expect(d({ width: "8.10" })).toContain(`8'10" x 7'0"`);
    expect(d({ width: "8.2" })).toContain(`8'2" x 7'0"`);
  });
});

describe("the 6'4\"-7'10\" band", () => {
  const BAND = { solid: 837.75, glass: 968.32, inserts: 1030.6 };
  // 6'0" and 6'2" sit in the band below, per UPDATED_PRICING_9-8.
  const WIDTHS = ["6.4", "6.6", "6.8", "6.10", "7", "7.2", "7.4", "7.6", "7.8", "7.10"];

  it("prices every width in the band identically, in all three styles", () => {
    // The 4050 at 7'0" tall is flat from 6'0" to 7'10". The sheet's 6'0" and
    // 6'2" rows carried the band below and are corrected in the generator.
    for (const width of WIDTHS) {
      for (const [style, expected] of Object.entries(BAND)) {
        expect(
          specialDoorQuote({ ...base, width, style: style as "solid" }).quote?.unitPrice,
          `${width} ${style}`,
        ).toBe(expected);
      }
    }
  });

  it("agrees with what the residential tab quotes for the same door", () => {
    // Same door, two tabs, one number — whether it lands on the stock grid or
    // the standard one.
    for (const width of WIDTHS) {
      const [ft, inch] = width.split(".");
      const r = priceResidential("4050", { widthFt: +ft, widthIn: +(inch ?? 0), heightFt: 7, heightIn: 0 }, "solid");
      expect(r.price, `${width} residential`).toBe(BAND.solid);
    }
  });

  it("drops back down at 8'0\", where the stocked size takes over", () => {
    expect(specialDoorQuote({ ...base, width: "8", style: "solid" }).quote?.unitPrice).toBe(723.25);
  });
});

describe("offered heights", () => {
  it("offers the residential heights, filtered by what each model grids", () => {
    // The T50S has a 9ft grid as of UPDATED_PRICING_9-8; the 4050 does not, and
    // must not offer a height it cannot price.
    expect(offeredHeights("4050/4051/4053")).toEqual(["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8"]);
    expect(offeredHeights("T50S/T50L")).toEqual(["6", "6.3", "6.6", "6.9", "7", "7.6", "7.9", "8", "9"]);
  });

  it("bands an in-between height to its tier, like residential", () => {
    // Clopay grids 7'0" and 8'0"; everything between prices off the nearer one
    // at or above it. 6'6" is a 7' door as far as the book is concerned.
    const at = (h: string) =>
      specialDoorQuote({ model: M, width: "9", height: h, color: "White", style: "solid",
        track: "r12", spring: "extension", lock: "none" }).quote!.unitPrice;
    for (const h of ["6", "6.3", "6.6", "6.9", "7"]) expect(at(h), h).toBe(782.19);
    for (const h of ["7.6", "7.9", "8"]) expect(at(h), h).toBe(954.95);
  });

  it("agrees with the residential tab at every offered height", () => {
    // Same door, two tabs, one number — the whole point of banding rather than
    // inventing prices for the heights Clopay does not grid.
    for (const h of offeredHeights(M)) {
      const [ft, inch] = h.split(".");
      const so = specialDoorQuote({ model: M, width: "9", height: h, color: "White",
        style: "solid", track: "r12", spring: "extension", lock: "none" }).quote!.unitPrice;
      const res = priceResidential("4050", { widthFt: 9, widthIn: 0, heightFt: +ft, heightIn: +(inch ?? 0) }, "solid").price;
      expect(so, h).toBe(res);
    }
  });

  it("writes the height ordered, not the tier it priced from", () => {
    const d = specialDoorQuote({ model: M, width: "9", height: "6.6", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" }).quote!.description;
    expect(d).toContain(`9'0" x 6'6"`);
    expect(d).not.toContain(`x 7'0"`);
  });

  it("quotes 7'0\" and 8'0\" on both models", () => {
    for (const model of ["4050/4051/4053", "T50S/T50L"]) {
      expect(griddedHeights(model), model).toEqual(model === "T50S/T50L" ? ["7", "8", "9"] : ["7", "8"]);
      for (const height of ["7", "8"]) {
        expect(griddedWidths(model, height), `${model} ${height}`).toHaveLength(73);
        const q = specialDoorQuote({
          model, width: "9", height, color: "White", style: "solid",
          track: "r12", spring: "extension", lock: "none",
        });
        expect(q.quote?.unitPrice, `${model} ${height}`).toBeGreaterThan(0);
      }
    }
  });

  it("prices 8'0\" above 7'0\" on the same width", () => {
    const at = (height: string) =>
      specialDoorQuote({ model: M, width: "9", height, color: "White", style: "solid",
        track: "r12", spring: "extension", lock: "none" }).quote!.unitPrice;
    expect(at("8")).toBeGreaterThan(at("7"));
    expect(at("7")).toBe(782.19);
    expect(at("8")).toBe(954.95);
  });

  it("names every gridded height when refusing one that is not", () => {
    // The message is what sends the counter to the manual box, so it has to
    // list what IS available rather than a hardcoded 7'0".
    const r = specialDoorQuote({ model: M, width: "9", height: "9", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" });
    expect(r.quote).toBeUndefined();
    expect(r.reason).toContain(`6'0"`);
    expect(r.reason).toContain(`8'0"`);
    expect(r.reason).toMatch(/total below/);
  });
});

describe("per-model width limits", () => {
  const q = (width: string, variant?: string) =>
    specialDoorQuote({ model: M, width, height: "7", color: "White", style: "solid",
      track: "r12", spring: "extension", lock: "none", variant });

  it("starts the 4053 at 8'0\", not 6'0\" like its group", () => {
    // The grid is keyed by margin group, but Clopay does not build a 4053
    // narrower than 8'0". Offering 6'0" would quote a door nobody can order.
    expect(griddedWidths(M, "7", "4053")[0]).toBe("8");
    expect(griddedWidths(M, "7", "4053")).toHaveLength(60); // 73 less 12 narrow, less 15'0"
    expect(q("6", "4053").quote).toBeUndefined();
    expect(q("7.6", "4053").quote).toBeUndefined();
    expect(q("8", "4053").quote?.unitPrice).toBe(723.25);
  });

  it("leaves the 4050 and 4051 on the full range", () => {
    for (const v of ["4050", "4051"]) {
      expect(griddedWidths(M, "7", v), v).toHaveLength(73);
      expect(q("6", v).quote?.unitPrice, v).toBe(723.25);
    }
  });

  it("says why, and points at the manual box", () => {
    const r = q("6", "4053");
    expect(r.reason).toContain("4053");
    expect(r.reason).toContain(`8'0"`);
    expect(r.reason).toMatch(/total below/);
  });

  it("only asks which model where the group's members differ", () => {
    // A picker on a group whose members share a range is a question with one
    // right answer, which is a question not worth asking.
    expect(groupHasWidthLimits(M)).toBe(true);
    expect(groupHasWidthLimits("T50S/T50L")).toBe(false);
    expect(groupMembers(M)).toEqual(["4050", "4051", "4053"]);
    expect(groupMembers("T50S/T50L")).toEqual(["T50S", "T50L"]);
  });

  it("names the specific model on the line once one is chosen", () => {
    expect(q("8", "4053").quote?.description).toContain("Model 4053,");
    expect(q("8", "4053").quote?.description).not.toContain("4050/4051/4053");
    // With none chosen the group name stands, as before.
    expect(q("8").quote?.description).toContain("Model 4050/4051/4053,");
  });

  it("prices identically whichever member is chosen, where both are built", () => {
    expect(q("9", "4053").quote?.unitPrice).toBe(q("9", "4050").quote?.unitPrice);
  });
});

describe("9'0\" includes torsion", () => {
  const q = (height: string, spring: string) =>
    specialDoorQuote({ model: "T50S/T50L", width: "10", height, color: "White", style: "solid",
      track: "r12", spring: spring as "torsion", lock: "none" }).quote!;

  it("charges no adder at 9'0\", because the book already did", () => {
    // Clopay prints no extension column above 8'. Charging the torsion adder on
    // top of a price that includes torsion bills it twice.
    expect(q("9", "extension").unitPrice).toBe(q("9", "torsion").unitPrice);
    expect(q("9", "extension").unitPrice).toBe(1140.14);
    expect(q("9", "extension").torsionIncluded).toBe(true);
  });

  it("still charges it at 7'0\" and 8'0\"", () => {
    for (const h of ["7", "8"]) {
      expect(q(h, "torsion").unitPrice - q(h, "extension").unitPrice, h).toBeCloseTo(ADDONS.torsion, 2);
      expect(q(h, "extension").torsionIncluded, h).toBe(false);
    }
  });

  it("says torsion springs at 9'0\" whatever was selected", () => {
    // The customer is getting torsion either way, so the line has to say so.
    expect(q("9", "extension").description).toContain("torsion springs");
    expect(q("9", "extension").description).not.toContain("extension springs");
  });

  it("matches the residential tab at 9'0\"", () => {
    const res = quoteResidential("T50S", { widthFt: 10, widthIn: 0, heightFt: 9, heightIn: 0 },
      { style: "solid", color: "White", track: "r12", spring: "extension", lock: "none" });
    expect(q("9", "extension").unitPrice).toBe(res.unitPrice);
  });
});

describe("the 8'0\" minimum applies to all four models", () => {
  it("floors 4053, 4310, 9133 and 9203 at 8'0\"", () => {
    for (const m of ["4053", "4310", "9133", "9203"]) {
      expect(minWidthFor(m), m).toBe("8");
    }
  });

  it("leaves their group-mates alone", () => {
    for (const m of ["4050", "4051", "4300", "4301", "9130", "9200", "T50S", "T50L"]) {
      expect(minWidthFor(m), m).toBeNull();
    }
  });

  it("puts a model picker on every group that now has a limit", () => {
    for (const g of ["4050/4051/4053", "4300/4301/4310", "9130/9133", "9200/9203"]) {
      expect(groupHasWidthLimits(g), g).toBe(true);
    }
    expect(groupHasWidthLimits("T50S/T50L")).toBe(false);
  });
});

describe("width and height are independent", () => {
  it("lists every gridded width with no height chosen", () => {
    // The counter often knows the opening width before the height. Making the
    // width dropdown wait on a height asked for information in an order the
    // data does not require.
    expect(griddedWidths(M)).toHaveLength(73);
    expect(griddedWidths("T50S/T50L")).toHaveLength(73);
  });

  it("gives the same list with or without a height", () => {
    // Clopay grids the same widths at every height it publishes, so the two
    // must agree. If a future sheet grids a height differently, this fails and
    // the dropdown needs to narrow again.
    for (const model of [M, "T50S/T50L"]) {
      const union = griddedWidths(model);
      for (const h of griddedHeights(model)) {
        expect(griddedWidths(model, h), `${model} ${h}`).toEqual(union);
      }
    }
  });

  it("still narrows by model where the members differ", () => {
    expect(griddedWidths(M, undefined, "4053")).toHaveLength(60);
    expect(griddedWidths(M, undefined, "4053")[0]).toBe("8");
    expect(griddedWidths(M, undefined, "4050")).toHaveLength(73);
  });

  it("still refuses a width the chosen height does not carry", () => {
    // Ungating the dropdown does not loosen the quote: the pair is checked.
    const r = specialDoorQuote({ model: M, width: "19", height: "7", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" });
    expect(r.quote).toBeUndefined();
    expect(r.reason).toMatch(/not on the grid/);
  });
});

describe("4053 skips 15'0\"", () => {
  const q = (width: string, variant: string) =>
    specialDoorQuote({ model: M, width, height: "7", color: "White", style: "solid",
      track: "r12", spring: "extension", lock: "none", variant });

  it("drops 15'0\" from the 4053 while keeping 14'0\" and 16'0\"", () => {
    // A hole in the range, not a floor — the 4053 is built either side of it.
    const w = griddedWidths(M, undefined, "4053");
    expect(w).not.toContain("15");
    expect(w).toContain("14");
    expect(w).toContain("16");
    expect(excludedWidthsFor("4053")).toEqual(["15"]);
  });

  it("sends a 15'0\" 4053 to the manual total", () => {
    expect(q("15", "4053").quote).toBeUndefined();
    expect(q("15", "4053").reason).toContain(`not built at 15'0"`);
    expect(q("15", "4053").reason).toMatch(/total below/);
  });

  it("words the floor and the hole differently", () => {
    // "not built narrower than 8'0\"" and "not built at 15'0\"" are different
    // facts and the counter should be able to tell them apart.
    expect(q("6", "4053").reason).toContain("narrower than");
    expect(q("15", "4053").reason).not.toContain("narrower than");
  });

  it("leaves the 4050 and 4051 at 15'0\"", () => {
    for (const v of ["4050", "4051"]) {
      expect(q("15", v).quote?.unitPrice, v).toBe(1280.4);
    }
  });
});

describe("split model dropdown", () => {
  it("splits groups whose members are not interchangeable", () => {
    for (const g of ["4050/4051/4053", "4300/4301/4310", "9130/9133", "9200/9203", "T50S/T50L"]) {
      expect(shouldSplitGroup(g), g).toBe(true);
    }
  });

  it("leaves interchangeable groups collapsed", () => {
    // Splitting these would add dropdown entries that change nothing.
    expect(shouldSplitGroup("T52S/T52L")).toBe(false);
  });

  it("prices a split selection off the group, not the member", () => {
    // The member narrows sizes and names the line; the margin still comes from
    // the group, because that is how Clopay prices them.
    const asMember = specialDoorQuote({ model: M, width: "9", height: "7", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none", variant: "4051" });
    const asGroup = specialDoorQuote({ model: M, width: "9", height: "7", color: "White",
      style: "solid", track: "r12", spring: "extension", lock: "none" });
    expect(asMember.quote?.unitPrice).toBe(asGroup.quote?.unitPrice);
    expect(asMember.quote?.description).toContain("Model 4051,");
    expect(asGroup.quote?.description).toContain("Model 4050/4051/4053,");
  });
});

describe("model selection parsing", () => {
  it("splits a group:member value", () => {
    expect(parseModelSelection("4050/4051/4053:4051")).toEqual({ group: "4050/4051/4053", member: "4051" });
    expect(parseModelSelection("T50S/T50L:T50L")).toEqual({ group: "T50S/T50L", member: "T50L" });
  });

  it("leaves a plain group key alone", () => {
    expect(parseModelSelection("9130/9133")).toEqual({ group: "9130/9133", member: "" });
    expect(parseModelSelection("")).toEqual({ group: "", member: "" });
  });

  it("round-trips through the value builder", () => {
    for (const [g, m] of [["4050/4051/4053", "4053"], ["T50S/T50L", ""]] as const) {
      const v = modelSelectionValue(g, m || undefined);
      expect(parseModelSelection(v)).toEqual({ group: g, member: m });
    }
  });

  it("gives every dropdown option a non-empty width list", () => {
    // The bug this exists to prevent: the raw "group:member" value was passed
    // where a grid key was expected, so SPECIAL_DOORS had no entry and the
    // width dropdown rendered empty with no error anywhere.
    for (const model of ["4050/4051/4053", "T50S/T50L"]) {
      const values = shouldSplitGroup(model)
        ? groupMembers(model).map((m) => modelSelectionValue(model, m))
        : [model];
      for (const v of values) {
        const { group, member } = parseModelSelection(v);
        expect(griddedWidths(group, undefined, member || undefined).length, v).toBeGreaterThan(0);
      }
    }
  });

  it("does not treat a raw selection value as a grid key", () => {
    expect(griddedWidths("4050/4051/4053:4051")).toEqual([]);
    expect(griddedWidths(parseModelSelection("4050/4051/4053:4051").group)).toHaveLength(73);
  });
});
