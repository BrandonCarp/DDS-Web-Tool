import { describe, expect, it } from "vitest";
import { specialDoorQuote } from "./data/special-door-pricing";
import { glassWhere, roofPitches, sheetInclines, sheetLiftChoices, sheetTrackChoices, sheetTrackPrice, sheetTracksFor } from "./data/sheet-tracks";
import { trackMountsFor } from "./data/track-lift";
import { MODERN_TRACKS } from "./data/modern-windows";

/**
 * The 4138's own track options, off CJ's TRACKS block (20/10/2026): high
 * lift breakaway or 25 degree, full vertical lift, and track following the
 * roof pitch, bracket or angle mount, each what the sheet says it is built
 * with. Cost is the sheet's at the track multiplier (.774); the quote lifts
 * it by the 4138's 45%.
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
    // 173 list to 54", then 15.90 a 3" — at .774 and k; angle 108 list over bracket.
    expect(t.highLift.breakaway.bracket[36]).toBe(136.17);
    expect(t.highLift.breakaway.bracket[54]).toBe(136.17);
    expect(t.highLift.breakaway.bracket[57]).toBe(148.69);
    expect(t.highLift.breakaway.bracket[117]).toBe(398.99);
    expect(t.highLift.breakaway.angle[36]).toBe(221.18);
    expect(t.highLift.deg25.bracket[72]).toBe(245.58);
    expect(t.fullVertical).toEqual({ bracket: { "7": 104.69, "8": 119.64, "9": 134.60, "10": 149.55 }, angle: { "7": 158.21, "8": 173.17, "9": 188.12, "10": 203.08 } });
    expect(t.roofPitch.bracket).toEqual({ "1/12": 78.24, "2/12": 78.24, "3/12": 106.65, "4/12": 106.65, "5/12": 137.27, "6/12": 137.27 });
    expect(t.roofPitch.angle?.["6/12"]).toBe(217.56);
    // The other Modern Steel sheets price no tracks; the 4050 family keeps Clopay's book.
    expect(sheetTracksFor("9208/9209")).toBeNull();
    expect(sheetTracksFor("4050/4051/4053/4132")).toBeNull();
  });

  it("offers the sheet's choices: full vertical and roof pitch, breakaway or 25 degree, the sheet's inches up to the door's", () => {
    expect(sheetTrackChoices(G).map((t) => t.value)).toEqual(["full_vertical", "roof_pitch"]);
    expect(sheetTrackChoices("4050/4051/4053/4132")).toEqual([]);
    expect(sheetInclines(G)).toEqual(["breakaway", "deg25"]);
    expect(sheetInclines("4050/4051/4053/4132")).toBeNull();
    // A 7'0" door takes 81" at most; an 8'0" door 93"; 25 degree stops at 72".
    expect(sheetLiftChoices(G, "breakaway", 7)).toEqual([36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81]);
    expect(sheetLiftChoices(G, "breakaway", 8)?.slice(-1)).toEqual([93]);
    expect(sheetLiftChoices(G, "breakaway", 12)?.slice(-1)).toEqual([117]);
    expect(sheetLiftChoices(G, "deg25", 8)?.slice(-1)).toEqual([72]);
    expect(roofPitches(G)).toEqual(["1/12", "2/12", "3/12", "4/12", "5/12", "6/12"]);
    // The 4138 is sold with every mount again: the sheet prices the angle mount tracks.
    expect(trackMountsFor("4138").map((m) => m.value)).toEqual(["bracket", "continuous_angle", "reverse_angle"]);
  });

  it("prices high lift off the sheet, lifted by the 45%, bracket or angle", () => {
    expect(q({ incline: "breakaway", highLiftInches: 36 }).quote?.unitPrice).toBeCloseTo(solid + sell(136.17), 2);
    expect(q({ incline: "breakaway", highLiftInches: 60 }).quote?.unitPrice).toBeCloseTo(solid + sell(161.20), 2);
    expect(q({ incline: "breakaway", highLiftInches: 36, trackMount: "continuous_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(221.18), 2);
    expect(q({ incline: "deg25", highLiftInches: 72, trackMount: "reverse_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(330.59), 2);
    expect(q({ incline: "deg25", highLiftInches: 75 }).reason).toMatch(/25 degree high lift is priced to 72"/);
    // Straight incline is not on the sheet.
    expect(q({ incline: "straight_incline", highLiftInches: 36 }).reason).toMatch(/breakaway or 25 degree/);
    // No amount chosen yet: the door prices without the lift, as the 4050 does.
    expect(q({ incline: "breakaway", highLiftInches: 0 }).quote?.unitPrice).toBe(solid);
    const line = q({ incline: "breakaway", highLiftInches: 36, trackMount: "reverse_angle" }).quote!.description;
    expect(line).toMatch(/2" REVERSE ANGLE MOUNT TRACK TO STEEL, 36″ HIGH LIFT TRACK, TORSION SPRINGS/i);
  });

  it("builds breakaway high lift solid only on a bracket, and with top section glass on a reverse angle alone", () => {
    const glazed = (places: { section: number; panel: number }[], extra: Record<string, unknown>) =>
      specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: places, track: "high_lift", incline: "breakaway", highLiftInches: 36, ...extra } as never);
    expect(glazed([{ section: 1, panel: 1 }], {}).reason).toMatch(/bracket mount is built solid only/);
    expect(glazed([{ section: 1, panel: 1 }], { trackMount: "continuous_angle" }).reason).toMatch(/reverse angle mount only/);
    expect(glazed([{ section: 2, panel: 1 }], { trackMount: "reverse_angle" }).reason).toMatch(/top section only/);
    const ok = glazed([{ section: 1, panel: 1 }, { section: 1, panel: 2 }], { trackMount: "reverse_angle" }).quote!;
    expect(ok.unitPrice).toBeCloseTo(solid + sell(51.29 * 2) + sell(221.18), 2);
    // 25 degree takes glass anywhere, on any mount.
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: [{ section: 2, panel: 1 }], track: "high_lift", incline: "deg25", highLiftInches: 36 } as never).quote?.unitPrice)
      .toBeCloseTo(solid + sell(51.29) + sell(160.57), 2);
    expect(glassWhere([{ section: 1 }, { section: 1 }], true)).toBe("top");
    expect(glassWhere([{ section: 1 }, { section: 3 }], true)).toBe("other");
    expect(glassWhere([{ section: 1 }], false)).toBe("none");
  });

  it("prices full vertical lift by the door's height, solid only, and the line says so", () => {
    const fv = (extra: Record<string, unknown>) => specialDoorQuote({ ...base, style: "solid", track: "full_vertical", ...extra } as never);
    expect(fv({}).quote?.unitPrice).toBeCloseTo(solid + sell(104.69), 2);
    expect(fv({ trackMount: "continuous_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(158.21), 2);
    expect(fv({}).quote?.description).toMatch(/, FULL VERTICAL LIFT TRACK, TORSION SPRINGS/i);
    // 7'6" takes the 8FT figure; a 9'0" door the 9FT (torsion included at that height).
    const solid76 = specialDoorQuote({ ...base, height: "7.6", style: "solid", track: "r12" }).quote!.unitPrice;
    expect(fv({ height: "7.6" }).quote?.unitPrice).toBeCloseTo(solid76 + sell(119.64), 2);
    const solid9 = specialDoorQuote({ ...base, height: "9", style: "solid", track: "r12" }).quote!.unitPrice;
    expect(fv({ height: "9" }).quote?.unitPrice).toBeCloseTo(solid9 + sell(134.60), 2);
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: [{ section: 1, panel: 1 }], track: "full_vertical" } as never).reason).toMatch(/solid only/);
    // Not a 4050 track: 12" radius there.
    expect(specialDoorQuote({ model: "4050/4051/4053/4132", width: "8", height: "7", color: "White", style: "solid", track: "full_vertical", spring: "torsion", lock: "none" }).quote?.description).toMatch(/12″ RADIUS TRACK/i);
  });

  it("prices track following the roof pitch by the pitch, and names it on the line", () => {
    const rp = (extra: Record<string, unknown>) => specialDoorQuote({ ...base, style: "solid", track: "roof_pitch", ...extra } as never);
    expect(rp({ roofPitch: "4/12" }).quote?.unitPrice).toBeCloseTo(solid + sell(106.65), 2);
    expect(rp({ roofPitch: "6/12", trackMount: "reverse_angle" }).quote?.unitPrice).toBeCloseTo(solid + sell(217.56), 2);
    expect(rp({ roofPitch: "4/12" }).quote?.description).toMatch(/, 4\/12 ROOF PITCH TRACK, TORSION SPRINGS/i);
    // No pitch given: the first, 1/12.
    expect(rp({}).quote?.unitPrice).toBeCloseTo(solid + sell(78.24), 2);
    expect(rp({}).quote?.description).toMatch(/1\/12 ROOF PITCH TRACK/i);
    // Glass is fine on it.
    expect(specialDoorQuote({ ...base, style: "glass", glassType: "tempered", modernFraming: "short", windowsAt: [{ section: 2, panel: 1 }], track: "roof_pitch", roofPitch: "2/12" } as never).quote?.unitPrice)
      .toBeCloseTo(solid + sell(51.29) + sell(78.24), 2);
  });

  it("says why when it cannot price", () => {
    expect(sheetTrackPrice({ group: "9208/9209", track: "high_lift", mount: "bracket", heightFt: 7, glass: "none" })).toEqual({ reason: "No track table for this door." });
    expect(sheetTrackPrice({ group: G, track: "high_lift", mount: "bracket", incline: "breakaway", inches: 0, heightFt: 7, glass: "none" })).toEqual({ reason: "Choose the high lift amount." });
    expect(sheetTrackPrice({ group: G, track: "full_vertical", mount: "bracket", heightFt: 11, glass: "none" })).toEqual({ reason: "Full vertical lift is priced for doors 7' to 10' high." });
  });
});
