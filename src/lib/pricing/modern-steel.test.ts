import { describe, it, expect } from "vitest";
import { describeModernWindows, describeWindowPlaces, modernFramingChoices, modernFramings, modernGlassForFraming, modernGlassOptions, modernPanelsWide, modernPickerModel, modernStack, modernWindowCost } from "./data/modern-steel";
import { MODERN_GLASS_TYPES, MODERN_ULTRA_GRAIN, MODERN_WINDOW_COST } from "./data/modern-windows";
import { specialDoorQuote } from "./data/special-door-pricing";
import { specialOrderColors } from "./data/catalog-meta";
import { trackMountsFor, trackMountFor } from "./data/track-lift";

const K = 0.99 / (1 - 0.0265);
const cost = (list: number, mult: number) => Math.round(list * mult * K * 100) / 100;
const sell = (c: number, margin = 45) => Math.round((c / (1 - margin / 100)) * 100) / 100;
/** A grid cell: the sheet's cost unrounded, lifted by the 45% and rounded once, as the loader writes it. */
const grid = (list: number, mult: number) => Math.round((list * mult * K / 0.55) * 100) / 100;

describe("Modern Steel — Clopay's stacking chart and panel counts (19/10/2026)", () => {
  it("stacks every height from 6'0\" to 16'0\" in 3\" steps out of 18\", 21\" and 24\" sections, to the height", () => {
    for (let h = 72; h <= 192; h += 3) {
      const stack = modernStack(Math.floor(h / 12), h % 12);
      expect(stack, `${h}"`).not.toBeNull();
      expect(stack!.reduce((a, b) => a + b, 0), `${h}"`).toBe(h);
      expect(stack!.every((s) => [18, 21, 24].includes(s)), `${h}"`).toBe(true);
    }
    expect(modernStack(7, 0)).toEqual([21, 21, 21, 21]);
    expect(modernStack(8, 0)).toEqual([24, 24, 24, 24]);
    expect(modernStack(7, 6)).toEqual([24, 21, 21, 24]);
    expect(modernStack(9, 0)).toEqual([24, 21, 21, 21, 21]);
    expect(modernStack(10, 3)).toEqual([21, 21, 21, 21, 21, 18]);
    expect(modernStack(16, 0)).toHaveLength(8);
    expect(modernStack(7, 1)).toBeNull();
  });

  it("counts the contemporary windows across by width: short 3/4/6/8/10, long and slim 2/3/4/5 from 7'8\"", () => {
    expect(modernPanelsWide(6, 2, "short")).toBe(3);
    expect(modernPanelsWide(7, 6, "short")).toBe(3);
    expect(modernPanelsWide(7, 8, "short")).toBe(4);
    expect(modernPanelsWide(11, 8, "short")).toBe(4);
    expect(modernPanelsWide(11, 10, "short")).toBe(6);
    expect(modernPanelsWide(14, 10, "short")).toBe(6);
    expect(modernPanelsWide(15, 0, "short")).toBe(8);
    expect(modernPanelsWide(19, 0, "short")).toBe(8);
    expect(modernPanelsWide(19, 2, "short")).toBe(10);
    expect(modernPanelsWide(20, 0, "short")).toBe(10);
    expect(modernPanelsWide(6, 0, "short")).toBe(3);
    expect(modernPanelsWide(5, 10, "short")).toBeNull();
    expect(modernPanelsWide(7, 6, "long")).toBeNull();
    expect(modernPanelsWide(7, 8, "long")).toBe(2);
    expect(modernPanelsWide(12, 0, "slim")).toBe(3);
    expect(modernPanelsWide(16, 0, "long")).toBe(4);
    expect(modernPanelsWide(20, 0, "long")).toBe(5);
  });

  it("is the seven contemporary models, slim windows on four of them", () => {
    for (const m of ["9208", "9138", "9209", "9139", "4308", "4138", "4309"]) expect(modernPickerModel(m), m).toBe(true);
    for (const m of ["9202", "4301", "4050", "9130"]) expect(modernPickerModel(m), m).toBe(false);
    // Clopay's framing list (19/10/2026): plain short and long, the four grille designs, the slim window in black or silver.
    const PLAIN_AND_GRILLES = ["short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24"];
    // The 4138's sheet has no slim window; a model with no sheet (the 9138) takes every window it is built with, the Clopay total typed.
    expect(modernFramings("4138", "4138", "tempered").map((f) => f.value)).toEqual(PLAIN_AND_GRILLES);
    expect(modernFramings("4138", "4138", "insulated_tempered").map((f) => f.value)).toEqual(PLAIN_AND_GRILLES);
    expect(modernFramings("9138", "9138", "insulated_tempered").map((f) => f.value)).toEqual(PLAIN_AND_GRILLES);
    // The sheet-priced pairs: the windows the sheet prices in the glass — the slim window in the three insulated glasses Clopay builds it in.
    expect(modernFramings("4308/4309", "4308", "tempered").map((f) => f.value)).toEqual(PLAIN_AND_GRILLES);
    expect(modernFramings("4308/4309", "4308", "insulated_tempered").map((f) => f.value)).toEqual([...PLAIN_AND_GRILLES, "slim:black", "slim:silver"]);
    expect(modernFramings("9208/9209", "9209", "insulated_tempered_frosted").map((f) => f.value)).toContain("slim:black");
    expect(modernFramings("9208/9209", "9209", "insulated_tempered_midnight_gray").map((f) => f.value)).toEqual(PLAIN_AND_GRILLES);
    expect(modernFramings("9208/9209", "9209", "insulated_tempered_midnight_gray_916").map((f) => f.value)).toEqual(["slim:black", "slim:silver"]);
    expect(modernFramings("9208/9209", "9209", "insulated_tempered_obscure").map((f) => f.value)).not.toContain("slim:black");
    expect(modernFramings("9208/9209", "9208", "")).toEqual([]);
    // Named as Clopay's order list names them.
    expect(modernFramings("9208/9209", "9208", "insulated_tempered").map((f) => f.label)).toEqual([
      "PLAIN SHORT 19 1/2 X 16", "PLAIN LONG 42 X 16", "REC12-RECTANGULAR 1 HIGH / 2 ACROSS", "REC14-RECTANGULAR 1 HIGH / 4 ACROSS",
      "SQ22-SQUARE 2 HIGH / 2 ACROSS", "SQ24-SQUARE 2 HIGH / 4 ACROSS", "37 X 8 BLACK SLIM WINDOW", "37 X 8 SILVER SLIM WINDOW",
    ]);
  });

  it("words the windows as the estimates do: where, the row looking out, and the side (19/10/2026)", () => {
    // The estimate of 16/10/2026: an 8'0" x 7'0" 4308, a slim window in every section — the drawing is inside looking out (20/10/2026), so as drawn.
    const right = [1, 2, 3, 4].map((section) => ({ section, panel: 2 }));
    expect(describeModernWindows(right, 4, 2)).toBe("all sections, SOL-GL, right side looking out");
    expect(describeModernWindows([1, 2, 3, 4].map((section) => ({ section, panel: 1 })), 4, 2)).toBe("all sections, GL-SOL, left side looking out");
    // A full row says only where; a section short of the row says its row.
    expect(describeModernWindows([{ section: 1, panel: 1 }, { section: 1, panel: 2 }], 4, 2)).toBe("section 1");
    expect(describeModernWindows([1, 3].flatMap((section) => [1, 2, 3, 4].map((panel) => ({ section, panel }))), 4, 4)).toBe("sections 1 and 3");
    expect(describeModernWindows([{ section: 1, panel: 1 }, { section: 1, panel: 2 }, { section: 3, panel: 1 }, { section: 3, panel: 2 }], 5, 4))
      .toBe("sections 1 and 3, GL-GL-SOL-SOL, left side looking out");
    expect(describeModernWindows([{ section: 2, panel: 2 }, { section: 2, panel: 3 }], 4, 4)).toBe("section 2, SOL-GL-GL-SOL, looking out");
    // Sections glazed differently each say their row.
    expect(describeModernWindows([{ section: 1, panel: 1 }, { section: 1, panel: 2 }, { section: 1, panel: 3 }, { section: 1, panel: 4 }, { section: 3, panel: 4 }], 4, 4))
      .toBe("section 1 GL-GL-GL-GL and section 3 SOL-SOL-SOL-GL, looking out");
    expect(describeModernWindows([{ section: 1, panel: 4 }, { section: 2, panel: 4 }, { section: 4, panel: 3 }], 4, 4))
      .toBe("section 1 SOL-SOL-SOL-GL, section 2 SOL-SOL-SOL-GL and section 4 SOL-SOL-GL-SOL, right side looking out");
  });

  it("names the windows where they are, panels in a run as a range", () => {
    expect(describeWindowPlaces([{ section: 1, panel: 1 }, { section: 1, panel: 2 }, { section: 1, panel: 3 }, { section: 1, panel: 4 }])).toBe("section 1 panels 1-4");
    expect(describeWindowPlaces([{ section: 3, panel: 2 }, { section: 1, panel: 4 }, { section: 3, panel: 3 }])).toBe("section 1 panel 4 and section 3 panels 2, 3");
    expect(describeWindowPlaces([{ section: 2, panel: 1 }, { section: 2, panel: 3 }, { section: 2, panel: 4 }, { section: 2, panel: 5 }])).toBe("section 2 panels 1, 3-5");
    expect(describeWindowPlaces([{ section: 1, panel: 1 }, { section: 2, panel: 1 }, { section: 2, panel: 2 }, { section: 4, panel: 3 }])).toBe("section 1 panel 1, section 2 panels 1, 2 and section 4 panel 3");
  });

  it("prices a window at CJ's rate over the solid door — the 9208-9209 and 4308-4309 sheets (19/10/2026)", () => {
    // Eleven glass types, named and ordered as Clopay's list has them: 1/8"
    // tempered and insulated, frosted, obscure, narrow reed and midnight gray,
    // and the slim window's own 9/16" insulated tempered midnight gray.
    expect(MODERN_GLASS_TYPES.map((g) => g.id)).toEqual([
      "tempered", "insulated_tempered", "tempered_frosted", "insulated_tempered_frosted", "insulated_tempered_obscure",
      "tempered_narrow_reed", "tempered_obscure", "insulated_tempered_narrow_reed", "tempered_midnight_gray",
      "insulated_tempered_midnight_gray", "insulated_tempered_midnight_gray_916",
    ]);
    expect(MODERN_GLASS_TYPES.map((g) => g.label)).toEqual([
      '1/8" tempered', "Insulated tempered", '1/8" tempered frosted', "Insulated tempered frosted", "Insulated tempered obscure",
      '1/8" tempered narrow reed', '1/8" tempered obscure', "Insulated tempered narrow reed", '1/8" tempered midnight gray',
      '3/4" insulated tempered midnight gray', '9/16" insulated tempered midnight gray',
    ]);
    // The 4138's sheet has no slim window, so no 9/16" glass.
    expect(modernGlassOptions("4138").map((g) => g.id)).not.toContain("insulated_tempered_midnight_gray_916");
    expect(modernGlassOptions("9208/9209")).toEqual(MODERN_GLASS_TYPES);
    expect(modernGlassOptions("9138")).toEqual(MODERN_GLASS_TYPES);
    // A window's cost is the sheet's list at the group's multiplier: 65 list a short tempered window.
    expect(modernWindowCost("9208/9209", "tempered", "short")).toBe(cost(65, 0.865));
    expect(modernWindowCost("4308/4309", "tempered", "short")).toBe(cost(65, 0.704));
    expect(modernWindowCost("4138", "tempered", "short")).toBe(cost(65, 0.776));
    expect(modernWindowCost("4138", "insulated_tempered", "slim")).toBeNull();
    expect(modernWindowCost("9208/9209", "insulated_tempered", "long_grilles")).toBe(cost(242, 0.865));
    expect(modernWindowCost("9208/9209", "insulated_tempered_frosted", "slim")).toBe(cost(180, 0.865));
    expect(modernWindowCost("9208/9209", "insulated_tempered_midnight_gray_916", "slim")).toBe(cost(180, 0.865));
    expect(modernWindowCost("9208/9209", "insulated_tempered_midnight_gray_916", "short")).toBeNull();
    expect(modernWindowCost("9208/9209", "tempered", "slim")).toBeNull();
    expect(modernWindowCost("9138", "tempered", "short")).toBeNull();
    for (const g of ["9208/9209", "4308/4309", "4138"]) for (const [glass, framings] of Object.entries(MODERN_WINDOW_COST[g])) {
      if (glass.endsWith("_916")) expect(Object.keys(framings)).toEqual(["slim"]);
      else expect(Object.keys(framings).slice(0, 4)).toEqual(["short", "short_grilles", "long", "long_grilles"]);
    }
  });

  it("prices the door: the solid grid, then each window pressed in, lifted by the 45% as one figure", () => {
    const base = { model: "9208/9209", variant: "9208", width: "8", height: "7", color: "White", track: "r12" as const, spring: "extension" as const, lock: "none" as const };
    // 8'0" x 7'0" 9208: list 704 at .865.
    const solid = grid(704, 0.865);
    expect(specialDoorQuote({ ...base, style: "solid" }).quote?.unitPrice).toBe(solid);
    const three = specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short_grilles:REC12",
      windowsAt: [{ section: 1, panel: 1 }, { section: 1, panel: 2 }, { section: 2, panel: 4 }] });
    expect(three.quote?.unitPrice).toBeCloseTo(solid + sell(cost(80, 0.865) * 3), 2);
    expect(three.quote?.description).toContain('Clopay Modern Collection, Model 9208, 8\'0" x 7\'0", in the color White, 1/8" tempered short 19 1/2x16 windows in section 1 GL-GL-SOL-SOL and section 2 SOL-SOL-SOL-GL, looking out, REC12 inserts, 12″ radius track');
    // Slim windows, in the glass the sheet prices them in; 16'0" takes four across.
    const slim = specialDoorQuote({ ...base, width: "16", style: "glass", glassType: "insulated_tempered", modernFraming: "slim:black",
      windowsAt: [{ section: 1, panel: 1 }, { section: 1, panel: 2 }, { section: 1, panel: 3 }, { section: 1, panel: 4 }] });
    expect(slim.quote?.unitPrice).toBeCloseTo(grid(1272, 0.865) + sell(cost(180, 0.865) * 4), 2);
    expect(slim.quote?.description).toContain("in the color White, insulated tempered black slim 37x8 windows in section 1, 12″ radius track");
    // The slim window's 9/16" glass, in a silver frame.
    const gray = specialDoorQuote({ ...base, width: "16", style: "glass", glassType: "insulated_tempered_midnight_gray_916", modernFraming: "slim:silver",
      windowsAt: [{ section: 1, panel: 2 }, { section: 1, panel: 3 }] });
    expect(gray.quote?.unitPrice).toBeCloseTo(grid(1272, 0.865) + sell(cost(180, 0.865) * 2), 2);
    expect(gray.quote?.description).toContain('9/16" insulated tempered midnight gray silver slim 37x8 windows in section 1, SOL-GL-GL-SOL, looking out, 12″ radius track');
    // A framing the sheet does not price in that glass has to be chosen again.
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "slim:black", windowsAt: [{ section: 1, panel: 1 }] }).reason).toBe("Pick the windows' framing.");
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "insulated_tempered_midnight_gray_916", modernFraming: "short", windowsAt: [{ section: 1, panel: 1 }] }).reason).toBe("Pick the windows' framing.");
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", windowsAt: [{ section: 1, panel: 1 }] }).reason).toBe("Pick the windows' framing.");
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: [] }).reason).toBe("Press the windows into the door drawing — none are placed yet.");
    // The 4308 at the same list and its own .704; an odd width the whole-foot door and 200.
    const b4 = { ...base, model: "4308/4309", variant: "4309" };
    expect(specialDoorQuote({ ...b4, style: "solid" }).quote?.unitPrice).toBe(grid(704, 0.704));
    expect(specialDoorQuote({ ...b4, width: "8.6", style: "glass", glassType: "tempered_obscure", modernFraming: "long", windowsAt: [{ section: 1, panel: 1 }] }).quote?.description)
      .toContain('1/8" tempered obscure long 42x16 windows in section 1, GL-SOL, left side looking out, no inserts');
    expect(specialDoorQuote({ ...b4, width: "8.6", style: "glass", glassType: "tempered_obscure", modernFraming: "long", windowsAt: [{ section: 1, panel: 1 }] }).quote?.unitPrice)
      .toBeCloseTo(grid(704, 0.704) + sell(cost(150, 0.704)) + 200, 2);
    expect(specialDoorQuote({ ...b4, width: "8.6", style: "solid" }).quote?.description).toContain("Model 4309, 8'6\" x 7'0\"");
  });

  it("prices the 4138 off its own sheet: 569 list the 8'0\" 7FT door at .776, windows a window, whole feet alone at 9FT and 10FT", () => {
    const base = { model: "4138", width: "8", height: "7", color: "White", track: "r12" as const, spring: "extension" as const, lock: "none" as const };
    expect(specialDoorQuote({ ...base, style: "solid" }).quote?.unitPrice).toBe(grid(569, 0.776));
    const r = specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short_grilles:SQ22", windowsAt: [{ section: 1, panel: 1 }, { section: 2, panel: 4 }] });
    expect(r.quote?.unitPrice).toBeCloseTo(grid(569, 0.776) + sell(cost(80, 0.776) * 2), 2);
    expect(r.quote?.description).toContain('Clopay Modern Collection, Model 4138, 8\'0" x 7\'0", in the color White, 1/8" tempered short 19 1/2x16 windows in section 1 GL-SOL-SOL-SOL and section 2 SOL-SOL-SOL-GL, looking out, SQ22 inserts');
    // 9FT and 10FT are priced at the whole feet; an odd width there is the whole-foot door below it and 200, as everywhere.
    expect(specialDoorQuote({ ...base, height: "9", style: "solid" }).quote?.unitPrice).toBe(grid(970, 0.776));
    expect(specialDoorQuote({ ...base, width: "8.6", height: "9", style: "solid" }).quote?.unitPrice).toBeCloseTo(grid(970, 0.776) + 200, 2);
    expect(specialDoorQuote({ ...base, width: "11", height: "10", style: "solid" }).quote?.unitPrice).toBeCloseTo(grid(1210, 0.776) + 200, 2);
    expect(specialDoorQuote({ ...base, width: "11", height: "8", style: "solid" }).quote?.unitPrice).toBeCloseTo(grid(863, 0.776) + 200, 2);
    // Under 8'0" the sheet prices no 9FT or 10FT door, and nothing over 18'0".
    expect(specialDoorQuote({ ...base, width: "7.6", height: "9", style: "solid" }).reason).toMatch(/not on the grid/);
    expect(specialDoorQuote({ ...base, width: "7.6", height: "8", style: "solid" }).quote?.unitPrice).toBe(grid(796, 0.776));
    expect(specialDoorQuote({ ...base, width: "19", height: "7", style: "solid" }).reason).toMatch(/not on the grid/);
    // A model with no sheet draws its windows and asks for the Clopay total.
    expect(modernPickerModel("9138")).toBe(true);
  });

  it("springs the 4138 at its own rates: torsion 45 single and 55 double, galvanized 50 and 70 (Brandon, 20/10/2026)", () => {
    const q = (width: string, spring: "extension" | "torsion" | "galvanized", model = "4138", variant?: string) =>
      specialDoorQuote({ model, variant, width, height: "7", style: "solid", color: "White", track: "r12", spring, lock: "none" }).quote!.unitPrice;
    expect(q("8", "torsion")).toBeCloseTo(q("8", "extension") + 45, 2);
    expect(q("8", "galvanized")).toBeCloseTo(q("8", "extension") + 50, 2);
    expect(q("16", "torsion")).toBeCloseTo(q("16", "extension") + 55, 2);
    expect(q("16", "galvanized")).toBeCloseTo(q("16", "extension") + 70, 2);
    // The other Modern Steel doors keep the stock adders.
    expect(q("8", "torsion", "9208/9209", "9208")).toBeCloseTo(q("8", "extension", "9208/9209", "9208") + 35, 2);
    expect(q("16", "galvanized", "4308/4309", "4308")).toBeCloseTo(q("16", "extension", "4308/4309", "4308") + 45, 2);
  });

  it("lists the framing first and the glass a window comes in after it (Brandon, 20/10/2026)", () => {
    const v = (xs: { value: string }[]) => xs.map((x) => x.value);
    const ids = (xs: { id: string }[]) => xs.map((x) => x.id);
    // Every window the sheet prices in some glass: the 9208 and 4308 the slim window too, the 4138 not.
    expect(v(modernFramingChoices("9208/9209", "9208"))).toEqual(["short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24", "slim:black", "slim:silver"]);
    expect(v(modernFramingChoices("4138", "4138"))).toEqual(["short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24"]);
    // The short window in every glass but the slim window's own 9/16"; the slim window in the three insulated glasses alone.
    const short = modernFramingChoices("4308/4309", "4308").find((f) => f.value === "short")!;
    const slim = modernFramingChoices("4308/4309", "4308").find((f) => f.value === "slim:black")!;
    expect(ids(modernGlassForFraming("4308/4309", short))).toEqual(ids(modernGlassOptions("4308/4309")).filter((g) => g !== "insulated_tempered_midnight_gray_916"));
    expect(ids(modernGlassForFraming("4308/4309", slim))).toEqual(["insulated_tempered", "insulated_tempered_frosted", "insulated_tempered_midnight_gray_916"]);
    // Each pairing offered is one the sheet prices, and no window is offered without a glass.
    for (const g of ["9208/9209", "4308/4309", "4138"]) {
      for (const f of modernFramingChoices(g, g.split("/")[0])) {
        const glass = modernGlassForFraming(g, f);
        expect(glass.length, `${g} ${f.value}`).toBeGreaterThan(0);
        for (const x of glass) expect(modernWindowCost(g, x.id, f.price), `${g} ${f.value} in ${x.id}`).not.toBeNull();
      }
    }
    // No sheet (the 9138): every window the model takes, in every glass.
    expect(v(modernFramingChoices("9138", "9138"))).toEqual(["short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24"]);
    expect(modernGlassForFraming("9138", modernFramingChoices("9138", "9138")[0])).toEqual(modernGlassOptions("9138"));
  });

  it("sells the 4138 bracket mount only — no continuous or reverse angle (Brandon, 20/10/2026)", () => {
    expect(trackMountsFor("4138").map((m) => m.value)).toEqual(["bracket"]);
    expect(trackMountsFor("4308").map((m) => m.value)).toEqual(["bracket", "continuous_angle", "reverse_angle"]);
    expect(trackMountFor("4138", "reverse_angle")).toBe("bracket");
    expect(trackMountFor("4308", "reverse_angle")).toBe("reverse_angle");
    const line = (model: string, variant: string | undefined, trackMount: string) =>
      specialDoorQuote({ model, variant, width: "8", height: "7", style: "solid", color: "White", track: "r12", spring: "extension", lock: "none", trackMount }).quote!.description;
    // Asked for on the 4138, an angle mount is bracket: nothing on the line.
    expect(line("4138", undefined, "continuous_angle")).not.toMatch(/angle mount/i);
    expect(line("4308/4309", "4308", "continuous_angle")).toMatch(/2" continuous angle mount track to wood/);
  });

  it("carries the sheet's ULTRA COLOR block: Iron Ore and the Ultra-Grain finishes a flat adder, lifted by the 45%", () => {
    for (const g of ["9208/9209", "4308/4309", "4138"]) {
      expect(MODERN_ULTRA_GRAIN[g]).toEqual({ upTo8ft: { single: 158.77, double: 317.53 }, over8ft: { single: 264.61, double: 529.22 } });
    }
    const base = { model: "9208/9209", variant: "9208", width: "8", height: "7", style: "solid" as const, track: "r12" as const, spring: "extension" as const, lock: "none" as const };
    const white = specialDoorQuote({ ...base, color: "White" }).quote!.unitPrice;
    expect(specialDoorQuote({ ...base, color: "Iron Ore" }).quote?.unitPrice).toBeCloseTo(white + sell(158.77), 2);
    expect(specialDoorQuote({ ...base, color: "Ultra-Grain Plank Kona Finish" }).quote?.unitPrice).toBeCloseTo(white + sell(158.77), 2);
    expect(specialDoorQuote({ ...base, color: "Charcoal" }).quote?.unitPrice).toBe(white);
    expect(specialDoorQuote({ ...base, height: "8.3", color: "Iron Ore" }).quote?.unitPrice)
      .toBeCloseTo(specialDoorQuote({ ...base, height: "8.3", color: "White" }).quote!.unitPrice + sell(264.61), 2);
    expect(specialDoorQuote({ ...base, width: "16", color: "Ultra-Grain Cypress Walnut Finish" }).quote?.unitPrice)
      .toBeCloseTo(specialDoorQuote({ ...base, width: "16", color: "White" }).quote!.unitPrice + sell(317.53), 2);
    // The 4309 comes in the paint colours and Iron Ore, the 4308 in the Cypress finishes too (Brandon, 20/10/2026); the Plank finishes are the 9208 and 9209's.
    expect(specialOrderColors("4308")).toContain("Iron Ore");
    expect(specialOrderColors("4308")).toContain("Ultra-Grain Cypress Slate Finish");
    expect(specialOrderColors("4309")).not.toContain("Ultra-Grain Cypress Slate Finish");
    expect(specialOrderColors("4308")).not.toContain("Ultra-Grain Plank Kona Finish");
    // The 4138's list is Clopay's order form's (20/10/2026): no Hunter Green, the Cypress finishes and Iron Ore at the adder.
    expect(specialOrderColors("4138")).toEqual([
      "White", "Chocolate Brown", "Almond", "Sandtone", "Desert Tan", "Bronze", "Black", "Mocha Brown", "Charcoal",
      "Ultra-Grain Cypress Medium Finish", "Ultra-Grain Cypress Walnut Finish", "Ultra-Grain Cypress Cherry Finish", "Ultra-Grain Cypress Slate Finish", "Iron Ore",
    ]);
    const b41 = { model: "4138", width: "8", height: "7", style: "solid" as const, track: "r12" as const, spring: "extension" as const, lock: "none" as const };
    expect(specialDoorQuote({ ...b41, color: "Ultra-Grain Cypress Slate Finish" }).quote?.unitPrice)
      .toBeCloseTo(specialDoorQuote({ ...b41, color: "White" }).quote!.unitPrice + sell(158.77), 2);
    // The Lustra finishes take the adder as Iron Ore does, on the 9208 and the 9209 (Brandon, 20/10/2026).
    for (const c of ["Lustra Black", "Lustra Charcoal", "Lustra Silver"]) {
      expect(specialOrderColors("9208")).toContain(c);
      expect(specialOrderColors("9209")).toContain(c);
      expect(specialDoorQuote({ ...base, color: c }).quote?.unitPrice, c).toBeCloseTo(white + sell(158.77), 2);
      expect(specialDoorQuote({ ...base, variant: "9209", color: c }).quote?.unitPrice, c)
        .toBeCloseTo(specialDoorQuote({ ...base, variant: "9209", color: "White" }).quote!.unitPrice + sell(158.77), 2);
    }
    expect(specialOrderColors("9208")).toContain("Ultra-Grain Plank Kona Finish");
    expect(specialOrderColors("9209")).toContain("Ultra-Grain Cypress Slate Finish");
    expect(specialDoorQuote({ ...base, model: "4308/4309", variant: "4308", color: "Iron Ore" }).quote?.unitPrice)
      .toBeCloseTo(specialDoorQuote({ ...base, model: "4308/4309", variant: "4308", color: "White" }).quote!.unitPrice + sell(158.77), 2);
  });
});
