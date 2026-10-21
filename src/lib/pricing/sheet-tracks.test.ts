import { describe, expect, it } from "vitest";
import { specialDoorQuote } from "./data/special-door-pricing";
import { glassWhere, roofPitches, sheetInclines, sheetLiftChoices, sheetRearTorsion, sheetTrackAdder, sheetTrackChoices, sheetTrackPrice, sheetTracksFor } from "./data/sheet-tracks";
import { trackMountsFor } from "./data/track-lift";
import { MODERN_SPRING_RATES, MODERN_TRACKS } from "./data/modern-windows";
import { PREMIUM_SPRING_RATES, PREMIUM_TRACKS } from "./data/premium-glass";
import { ADDONS } from "./data/addons";
import { STOCK_PRICES } from "./data/stock-prices";
import { SPECIAL_DOORS } from "./data/special-doors";

/**
 * The 4138's own track options, off CJ's TRACKS block (20/10/2026): high
 * lift breakaway or 25 degree, full vertical lift, and track following the
 * roof pitch, bracket or angle mount, each what the sheet says it is built
 * with. Cost is the sheet's at .776 (CJ's sheet of 21/10/2026; the day
 * before it was .774); the quote lifts it by the 4138's 45%.
 */
const G = "4138";
const sell = (cost: number) => Math.round((cost / 0.55) * 100) / 100;
const base = { model: G, width: "8", height: "7", color: "White", lock: "none" as const, spring: "torsion" as const };
const solid = specialDoorQuote({ ...base, style: "solid", track: "r12" }).quote!.unitPrice;
const q = (extra: Record<string, unknown>) => specialDoorQuote({ ...base, style: "solid", track: "high_lift", ...extra } as never);

describe("the 4138's track tables", () => {
  it("are the sheet's: breakaway 36\" to 117\", 25 degree 36\" to 72\", vertical by height, pitch 1/12 to 6/12, bracket and angle", () => {
    const t = MODERN_TRACKS[G];
    expect(Object.keys(t.highLift)).toEqual(["breakaway", "deg25"]);
    expect(Object.keys(t.highLift.breakaway.bracket).map(Number)).toEqual(Array.from({ length: 28 }, (_, i) => 36 + 3 * i));
    expect(Object.keys(t.highLift.deg25.angle).map(Number)).toEqual(Array.from({ length: 13 }, (_, i) => 36 + 3 * i));
    // 173 list to 54", then 15.90 a 3" — at .776 and k; angle 108 list over bracket.
    expect(t.highLift.breakaway.bracket[36]).toBe(136.52);
    expect(t.highLift.breakaway.bracket[54]).toBe(136.52);
    expect(t.highLift.breakaway.bracket[57]).toBe(149.07);
    expect(t.highLift.breakaway.bracket[117]).toBe(400.02);
    expect(t.highLift.breakaway.angle[36]).toBe(221.75);
    expect(t.highLift.deg25.bracket[72]).toBe(246.22);
    expect(t.fullVertical).toEqual({ bracket: { "7": 104.96, "8": 119.95, "9": 134.95, "10": 149.94 }, angle: { "7": 158.62, "8": 173.61, "9": 188.61, "10": 203.60 } });
    expect(t.roofPitch.bracket).toEqual({ "1/12": 78.44, "2/12": 78.44, "3/12": 106.93, "4/12": 106.93, "5/12": 137.63, "6/12": 137.63 });
    expect(t.roofPitch.angle?.["6/12"]).toBe(218.12);
  });

  it("are every Premium and Modern Steel sheet's (CJ, 21/10/2026): the same list, at each sheet's own multiplier", () => {
    const groups = ["9130/9131/9132/9133", "9200/9201/9202/9203/9205", "4050/4051/4053/4132", "4300/4301/4302/4305/4310", "9208/9209", "4138", "4308/4309"];
    for (const g of groups) {
      const t = sheetTracksFor(g)!;
      expect(t, g).not.toBeNull();
      expect(Object.keys(t.highLift)).toEqual(["breakaway", "deg25"]);
      expect(Object.keys(t.highLift.breakaway.bracket)).toHaveLength(28);
      expect(Object.keys(t.highLift.deg25.angle)).toHaveLength(13);
      expect(Object.keys(t.fullVertical.bracket!)).toEqual(["7", "8", "9", "10"]);
      expect(Object.keys(t.roofPitch.angle!)).toEqual(["1/12", "2/12", "3/12", "4/12", "5/12", "6/12"]);
      expect(Object.keys(t.adders!)).toEqual(["lowHeadroom", "lowHeadroomRearTorsion", "angleMount12r15r"]);
      expect(sheetTrackChoices(g).map((c) => c.value)).toEqual(["full_vertical", "roof_pitch"]);
      expect(sheetRearTorsion(g)).toBe(true);
    }
    expect(Object.keys(PREMIUM_TRACKS).sort()).toEqual(groups.slice(0, 4).sort());
    expect(Object.keys(MODERN_TRACKS).sort()).toEqual(groups.slice(4).sort());
    // 173 list at 36" breakaway bracket: .912 on the 9130, .865 on the 9200 and 9208, .776 on the 4050 and 4138, .704 on the 4300 and 4308.
    const k = 0.99 / (1 - 0.0265);
    const at36 = (g: string) => sheetTracksFor(g)!.highLift.breakaway.bracket[36];
    expect(at36("9130/9131/9132/9133")).toBeCloseTo(173 * 0.912 * k, 2);
    expect(at36("9200/9201/9202/9203/9205")).toBeCloseTo(173 * 0.865 * k, 2);
    expect(at36("9208/9209")).toBeCloseTo(173 * 0.865 * k, 2);
    expect(at36("4050/4051/4053/4132")).toBe(136.52);
    expect(at36("4300/4301/4302/4305/4310")).toBeCloseTo(173 * 0.704 * k, 2);
    expect(at36("4308/4309")).toBeCloseTo(173 * 0.704 * k, 2);
    expect(sheetTracksFor("4050/4051/4053/4132")).toEqual(sheetTracksFor("4138"));
    // The adders: the sheet's own multiplier on the 9130, 4050, 4300, 4138 and 4308; the 9200 and 9208 sheets carry them at .776, as typed.
    expect(sheetTracksFor("9130/9131/9132/9133")!.adders).toEqual({ lowHeadroom: 45.91, lowHeadroomRearTorsion: 52.96, angleMount12r15r: 68.63 });
    expect(sheetTracksFor("4300/4301/4302/4305/4310")!.adders).toEqual({ lowHeadroom: 35.44, lowHeadroomRearTorsion: 40.88, angleMount12r15r: 52.98 });
    expect(sheetTracksFor("4308/4309")!.adders).toEqual({ lowHeadroom: 35.44, lowHeadroomRearTorsion: 40.88, angleMount12r15r: 52.98 });
    expect(sheetTracksFor("9200/9201/9202/9203/9205")!.adders).toEqual({ lowHeadroom: 39.06, lowHeadroomRearTorsion: 45.06, angleMount12r15r: 58.40 });
    expect(sheetTracksFor("9208/9209")!.adders).toEqual({ lowHeadroom: 39.06, lowHeadroomRearTorsion: 45.06, angleMount12r15r: 58.40 });
    // No sheet, no tracks: the Gallery, the Coachman.
    expect(sheetTracksFor("GD1LP/GD1SP")).toBeNull();
    expect(sheetTracksFor("CD")).toBeNull();
    // Springs: 45/55 torsion, 50/70 galvanized on every sheet.
    for (const g of groups) {
      expect({ ...PREMIUM_SPRING_RATES, ...MODERN_SPRING_RATES }[g], g).toEqual({ torsion: { single: 45, double: 55 }, galvanized: { single: 50, double: 70 } });
    }
  });

  it("offers the sheet's choices: full vertical and roof pitch, breakaway or 25 degree, the sheet's inches up to the door's", () => {
    expect(sheetTrackChoices(G).map((t) => t.value)).toEqual(["full_vertical", "roof_pitch"]);
    expect(sheetTrackChoices("GD1LP/GD1SP")).toEqual([]);
    expect(sheetInclines(G)).toEqual(["breakaway", "deg25"]);
    expect(sheetInclines("GD1LP/GD1SP")).toBeNull();
    // A 7'0" door takes 81" at most; an 8'0" door 93"; 25 degree stops at 72".
    expect(sheetLiftChoices(G, "breakaway", 7)).toEqual([36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81]);
    expect(sheetLiftChoices(G, "breakaway", 8)?.slice(-1)).toEqual([93]);
    expect(sheetLiftChoices(G, "breakaway", 12)?.slice(-1)).toEqual([117]);
    expect(sheetLiftChoices(G, "deg25", 8)?.slice(-1)).toEqual([72]);
    expect(roofPitches(G)).toEqual(["1/12", "2/12", "3/12", "4/12", "5/12", "6/12"]);
    expect(sheetRearTorsion(G)).toBe(true);
    expect(sheetRearTorsion("GD1LP/GD1SP")).toBe(false);
    // The 4138 is sold with every mount again: the sheet prices the angle mount tracks.
    expect(trackMountsFor("4138").map((m) => m.value)).toEqual(["bracket", "continuous_angle", "reverse_angle"]);
  });

  it("prices high lift off the sheet, lifted by the 45%, bracket or angle", () => {
    expect(q({ incline: "breakaway", highLiftInches: 36 }).quote?.unitPrice).toBeCloseTo(solid + sell(136.52), 2);
    expect(q({ incline: "breakaway", highLiftInches: 60 }).quote?.unitPrice).toBeCloseTo(solid + sell(161.62), 2);
    expect(q({ incline: "breakaway", highLiftInches: 36, trackMount: "continuous_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(221.75), 2);
    expect(q({ incline: "deg25", highLiftInches: 72, trackMount: "reverse_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(331.44), 2);
    expect(q({ incline: "deg25", highLiftInches: 75 }).reason).toMatch(/25 degree high lift is priced to 72"/);
    // Straight incline is not on the sheet.
    expect(q({ incline: "straight_incline", highLiftInches: 36 }).reason).toMatch(/breakaway or 25 degree/);
    // No amount chosen yet: the door prices without the lift, as the 4050 does.
    expect(q({ incline: "breakaway", highLiftInches: 0 }).quote?.unitPrice).toBe(solid);
    const line = q({ incline: "breakaway", highLiftInches: 36, trackMount: "reverse_angle" }).quote!.description;
    expect(line).toMatch(/2" REVERSE ANGLE MOUNT TRACK TO STEEL, 36″ HIGH LIFT TRACK, FRONT TORSION SPRINGS/i);
  });

  it("builds breakaway high lift solid only, on either mount (CJ, 21/10/2026 — the top section glass build of the day before is off the sheet)", () => {
    const glazed = (places: { section: number; panel: number }[], extra: Record<string, unknown>) =>
      specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: places, track: "high_lift", incline: "breakaway", highLiftInches: 36, ...extra } as never);
    expect(glazed([{ section: 1, panel: 1 }], {}).reason).toMatch(/Breakaway high lift is built solid only/);
    expect(glazed([{ section: 1, panel: 1 }], { trackMount: "continuous_angle" }).reason).toMatch(/Breakaway high lift is built solid only/);
    expect(glazed([{ section: 1, panel: 1 }, { section: 1, panel: 2 }], { trackMount: "reverse_angle" }).reason).toMatch(/Breakaway high lift is built solid only/);
    expect(glazed([{ section: 2, panel: 1 }], { trackMount: "reverse_angle" }).reason).toMatch(/Breakaway high lift is built solid only/);
    // 25 degree takes glass anywhere, on any mount.
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: [{ section: 2, panel: 1 }], track: "high_lift", incline: "deg25", highLiftInches: 36 } as never).quote?.unitPrice)
      .toBeCloseTo(solid + sell(51.29) + sell(160.99), 2);
    expect(glassWhere([{ section: 1 }, { section: 1 }], true)).toBe("top");
    expect(glassWhere([{ section: 1 }, { section: 3 }], true)).toBe("other");
    expect(glassWhere([{ section: 1 }], false)).toBe("none");
  });

  it("prices full vertical lift by the door's height, solid only, and the line says so", () => {
    const fv = (extra: Record<string, unknown>) => specialDoorQuote({ ...base, style: "solid", track: "full_vertical", ...extra } as never);
    expect(fv({}).quote?.unitPrice).toBeCloseTo(solid + sell(104.96), 2);
    expect(fv({ trackMount: "continuous_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(158.62), 2);
    expect(fv({}).quote?.description).toMatch(/, FULL VERTICAL LIFT TRACK, FRONT TORSION SPRINGS/i);
    // 7'6" takes the 8FT figure; a 9'0" door the 9FT (torsion included at that height).
    const solid76 = specialDoorQuote({ ...base, height: "7.6", style: "solid", track: "r12" }).quote!.unitPrice;
    expect(fv({ height: "7.6" }).quote?.unitPrice).toBeCloseTo(solid76 + sell(119.95), 2);
    const solid9 = specialDoorQuote({ ...base, height: "9", style: "solid", track: "r12" }).quote!.unitPrice;
    expect(fv({ height: "9" }).quote?.unitPrice).toBeCloseTo(solid9 + sell(134.95), 2);
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: [{ section: 1, panel: 1 }], track: "full_vertical" } as never).reason).toMatch(/solid only/);
    // Not a Gallery track: 12" radius there.
    expect(specialDoorQuote({ model: "GD1LP/GD1SP", width: "8", height: "7", color: "White", style: "solid", track: "full_vertical", spring: "torsion", lock: "none" }).quote?.description).toMatch(/12″ RADIUS TRACK/i);
  });

  it("prices track following the roof pitch by the pitch, and names it on the line", () => {
    const rp = (extra: Record<string, unknown>) => specialDoorQuote({ ...base, style: "solid", track: "roof_pitch", ...extra } as never);
    expect(rp({ roofPitch: "4/12" }).quote?.unitPrice).toBeCloseTo(solid + sell(106.93), 2);
    expect(rp({ roofPitch: "6/12", trackMount: "reverse_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(218.12), 2);
    expect(rp({ roofPitch: "4/12" }).quote?.description).toMatch(/, 4\/12 ROOF PITCH TRACK, FRONT TORSION SPRINGS/i);
    // No pitch given: the first, 1/12.
    expect(rp({}).quote?.unitPrice).toBeCloseTo(solid + sell(78.44), 2);
    expect(rp({}).quote?.description).toMatch(/1\/12 ROOF PITCH TRACK/i);
    // Glass is fine on it.
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: [{ section: 2, panel: 1 }], track: "roof_pitch", roofPitch: "2/12" } as never).quote?.unitPrice)
      .toBeCloseTo(solid + sell(51.29) + sell(78.44), 2);
  });

  it("prices low headroom, low headroom rear torsion and an angle mount on 12\" or 15\" radius off the sheet's own adders (CJ, 21/10/2026)", () => {
    expect(MODERN_TRACKS[G].adders).toEqual({ lowHeadroom: 39.06, lowHeadroomRearTorsion: 45.06, angleMount12r15r: 58.40 });
    const at = (track: string, trackMount = "bracket") => specialDoorQuote({ ...base, style: "solid", track, trackMount } as never);
    expect(at("low_headroom").quote?.unitPrice).toBeCloseTo(solid + sell(39.06), 2);          // not the stock book's 45
    expect(at("reverse_low_headroom").quote?.unitPrice).toBeCloseTo(solid + sell(45.06), 2);
    expect(at("reverse_low_headroom").quote?.description).toMatch(/, LOW HEADROOM REAR TORSION TRACK, REAR TORSION SPRINGS/i);
    expect(at("r12", "continuous_angle").quote?.unitPrice).toBeCloseTo(solid + sell(58.40), 2);
    expect(at("r15", "reverse_angle").quote?.unitPrice).toBeCloseTo(solid + sell(58.40), 2);
    expect(at("r12").quote?.unitPrice).toBe(solid);                                             // a bracket mount adds nothing
    expect(at("r20", "continuous_angle").reason).toMatch(/priced on 12" and 15" radius track/);
    expect(at("low_headroom", "reverse_angle").reason).toMatch(/priced on 12" and 15" radius track/);
    expect(at("r20").quote?.unitPrice).toBeCloseTo(solid + 200, 2);                             // 20" radius keeps the stock book's adder
    expect(sheetTrackAdder("GD1LP/GD1SP", "low_headroom", "bracket")).toBeNull();
  });

  it("keeps the stock book's option money on a floored door, and takes the sheet's on one DDS does not have on the floor (Brandon, 21/10/2026)", () => {
    const g4050 = "4050/4051/4053/4132";
    const door = (variant: string, extra: Record<string, unknown>) =>
      specialDoorQuote({ model: g4050, variant, width: "9", height: "7", color: "White", style: "solid", spring: "torsion", lock: "none", track: "r12", ...extra } as never);
    const sell43 = (cost: number) => Math.round((cost / 0.57) * 100) / 100;
    // The 4050 in White is floored at 9' and 10' wide: low headroom 45, rear torsion 60, an angle mount free, torsion 35.
    for (const width of ["9", "10"]) {
      const plain = door("4050", { width }).quote!.unitPrice;
      expect(plain, width).toBe(STOCK_PRICES["4050-4051-4053"][width]["7"].solid + ADDONS.torsion);
      expect(door("4050", { width, track: "low_headroom" }).quote!.unitPrice - plain, width).toBeCloseTo(ADDONS.track.low_headroom, 2);
      expect(door("4050", { width, track: "reverse_low_headroom" }).quote!.unitPrice - plain, width).toBeCloseTo(ADDONS.track.reverse_low_headroom, 2);
      expect(door("4050", { width, track: "r12", trackMount: "continuous_angle" }).quote!.unitPrice, width).toBe(plain);
      expect(door("4050", { width, track: "r20", trackMount: "reverse_angle" }).quote!.unitPrice - plain, width).toBeCloseTo(ADDONS.track.r20, 2);
      expect(door("4050", { width, track: "r12" }).quote!.unitPrice - door("4050", { width, spring: "extension" }).quote!.unitPrice, width).toBeCloseTo(ADDONS.torsion, 2);
      expect(door("4050", { width, spring: "galvanized" }).quote!.unitPrice - door("4050", { width, spring: "extension" }).quote!.unitPrice, width).toBeCloseTo(ADDONS.galvanized.single, 2);
    }
    // A track the stock tab does not sell — high lift, full vertical lift, roof pitch — makes it a special order: the sheet's door (and its 45 torsion) under the sheet's track, at the 4050's 43%.
    const sheet9 = SPECIAL_DOORS[g4050]["7"]["9"].solid! + 45;
    expect(sheet9).not.toBe(door("4050", {}).quote!.unitPrice);
    expect(door("4050", { track: "high_lift", incline: "breakaway", highLiftInches: 36 }).quote!.unitPrice).toBeCloseTo(sheet9 + sell43(136.52), 2);
    expect(door("4050", { track: "high_lift", incline: "deg25", highLiftInches: 72, trackMount: "continuous_angle" }).quote!.unitPrice).toBeCloseTo(sheet9 + sell43(331.44), 2);
    expect(door("4050", { track: "high_lift", incline: "straight_incline", highLiftInches: 36 }).reason).toMatch(/breakaway or 25 degree/);
    expect(door("4050", { track: "full_vertical" }).quote!.unitPrice).toBeCloseTo(sheet9 + sell43(104.96), 2);
    expect(door("4050", { track: "roof_pitch", roofPitch: "3/12" }).quote!.unitPrice).toBeCloseTo(sheet9 + sell43(106.93), 2);
    expect(door("4050", { track: "roof_pitch", roofPitch: "3/12" }).quote!.description).toMatch(/3\/12 ROOF PITCH TRACK/i);
    // Off the floor the 4050 is a special order through and through: a 10' x 8' in Black (floored at 8, 9 and 16), the sheet's door, springs and adders.
    const black = (extra: Record<string, unknown>) => door("4050", { width: "10", height: "8", color: "Black", ...extra }).quote!.unitPrice;
    expect(black({})).toBe(SPECIAL_DOORS[g4050]["8"]["10"].solid! + 45);
    expect(black({ track: "low_headroom" }) - black({})).toBeCloseTo(sell43(39.06), 2);
    expect(black({ track: "r12", trackMount: "continuous_angle" }) - black({})).toBeCloseTo(sell43(58.40), 2);
    expect(black({ spring: "galvanized" }) - black({ spring: "extension" })).toBeCloseTo(50, 2);
    expect(door("4053", { width: "10", height: "8", color: "Black" }).quote!.unitPrice).toBe(black({}));
    expect(door("4053", { width: "9", height: "8", color: "Black" }).quote!.unitPrice).toBe(STOCK_PRICES["4050-4051-4053"]["9"]["8"].solid + ADDONS.torsion);
    // The 4132 has no stock book: the sheet's adders and springs, every one.
    const plain4132 = door("4132", {}).quote!.unitPrice;
    expect(door("4132", { track: "low_headroom" }).quote!.unitPrice - plain4132).toBeCloseTo(sell43(39.06), 2);
    expect(door("4132", { track: "reverse_low_headroom" }).quote!.unitPrice - plain4132).toBeCloseTo(sell43(45.06), 2);
    expect(door("4132", { track: "r12", trackMount: "continuous_angle" }).quote!.unitPrice - plain4132).toBeCloseTo(sell43(58.40), 2);
    expect(door("4132", { track: "r20", trackMount: "continuous_angle" }).reason).toMatch(/priced on 12" and 15" radius track/);
    expect(plain4132 - door("4132", { spring: "extension" }).quote!.unitPrice).toBeCloseTo(45, 2);
    expect(door("4132", { spring: "galvanized" }).quote!.unitPrice - door("4132", { spring: "extension" }).quote!.unitPrice).toBeCloseTo(50, 2);
    expect(door("4132", { width: "16", spring: "galvanized" }).quote!.unitPrice - door("4132", { width: "16", spring: "torsion" }).quote!.unitPrice).toBeCloseTo(70 - 55, 2);
    // The 9131 likewise, off the 9130 sheet at .912 and 43%; the 9133 is stocked.
    const d9 = (variant: string, extra: Record<string, unknown>) =>
      specialDoorQuote({ model: "9130/9131/9132/9133", variant, width: "8", height: "7", color: "White", style: "solid", spring: "torsion", lock: "none", track: "r12", ...extra } as never);
    expect(d9("9131", { track: "low_headroom" }).quote!.unitPrice - d9("9131", {}).quote!.unitPrice).toBeCloseTo(sell43(45.91), 2);
    expect(d9("9133", { track: "low_headroom" }).quote!.unitPrice - d9("9133", {}).quote!.unitPrice).toBeCloseTo(45, 2);
    expect(d9("9131", {}).quote!.unitPrice - d9("9131", { spring: "extension" }).quote!.unitPrice).toBeCloseTo(45, 2);
    expect(d9("9133", {}).quote!.unitPrice - d9("9133", { spring: "extension" }).quote!.unitPrice).toBeCloseTo(35, 2);
    // The 4300 family is special order only: the sheet's, at .704 and 44%.
    const d43 = (extra: Record<string, unknown>) =>
      specialDoorQuote({ model: "4300/4301/4302/4305/4310", variant: "4300", width: "8", height: "7", color: "White", style: "solid", spring: "torsion", lock: "none", track: "r12", ...extra } as never);
    expect(d43({ track: "low_headroom" }).quote!.unitPrice - d43({}).quote!.unitPrice).toBeCloseTo(Math.round((35.44 / 0.56) * 100) / 100, 2);
    expect(d43({}).quote!.unitPrice - d43({ spring: "extension" }).quote!.unitPrice).toBeCloseTo(45, 2);
  });

  it("says why when it cannot price", () => {
    expect(sheetTrackPrice({ group: "GD1LP/GD1SP", track: "high_lift", mount: "bracket", heightFt: 7, glass: "none" })).toEqual({ reason: "No track table for this door." });
    expect(sheetTrackPrice({ group: G, track: "high_lift", mount: "bracket", incline: "breakaway", inches: 0, heightFt: 7, glass: "none" })).toEqual({ reason: "Choose the high lift amount." });
    expect(sheetTrackPrice({ group: G, track: "full_vertical", mount: "bracket", heightFt: 11, glass: "none" })).toEqual({ reason: "Full vertical lift is priced for doors 7' to 10' high." });
  });
});
