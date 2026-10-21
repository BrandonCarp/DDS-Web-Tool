import { describe, expect, it } from "vitest";
import { TRACK_CATEGORIES } from "./data/springs";
import {
  COMMERCIAL_TRACK, COMMERCIAL_TRACK_HEIGHTS, COMMERCIAL_TRACK_PARTS, commercialTrackAt, commercialTrackHeight,
} from "./data/commercial-track";
import { pickResidentialTrack, radiiFor, residentialTrackSets, trackHeightFor } from "./data/residential-track";

// The Track tab's complete sets (Brandon, 12/10/2026): residential sets picked
// from the door size and a radius, commercial sets shown by height off the
// TRACK_PRICING sheet.
const tracks = () => TRACK_CATEGORIES[0].items;

describe("commercial track sets off the TRACK_PRICING sheet", () => {
  it("carries five options at each of 8, 9, 10, 12 and 14 ft, at the sheet's prices", () => {
    expect(COMMERCIAL_TRACK_HEIGHTS).toEqual(["8", "9", "10", "12", "14"]);
    expect(COMMERCIAL_TRACK).toHaveLength(25);
    const at8 = commercialTrackAt("8");
    expect(at8.map((x) => [x.label, x.part.price])).toEqual([
      ['Complete set, 15" radius', 299.95], ["Vertical track only", 199.95], ["Horizontal track only", 199.95],
      ["Complete set, full vertical lift", 599.95], ["Full vertical top track only", 449.95],
    ]);
    expect(commercialTrackAt("9").map((x) => x.part.price)).toEqual([399.95, 249.95, 249.95, 699.95, 549.59]);
    expect(commercialTrackAt("10").map((x) => x.part.price)).toEqual([399.95, 249.95, 249.95, 699.95, 549.59]);
    expect(commercialTrackAt("12").map((x) => x.part.price)).toEqual([499.95, 299.95, 299.95, 799.95, 649.95]);
    expect(commercialTrackAt("14").map((x) => x.part.price)).toEqual([599.95, 349.95, 349.95, 899.95, 749.95]);
  });

  it("words each line as Brandon writes them: the track, the height, then the piece", () => {
    const at14 = commercialTrackAt("14");
    expect(at14[0].part.desc).toBe('COMPLETE SET OF 2" ANGLE MOUNT TRACK TO WOOD,  14FT HIGH,  15" RADIUS');
    expect(at14[3].part.desc).toBe('COMPLETE SET OF 2" ANGLE MOUNT TRACK TO WOOD,  14FT HIGH,  FULL VERTICAL LIFT');
    expect(at14[1].part.desc).toBe('2" ANGLE MOUNT TRACK TO WOOD,  14FT HIGH,  VERTICAL TRACK ONLY');
    expect(at14[2].part.desc).toBe('2" ANGLE MOUNT TRACK TO WOOD,  14FT HIGH,  HORIZONTAL TRACK ONLY');
    expect(at14[4].part.desc).toBe('2" ANGLE MOUNT TRACK TO WOOD,  14FT HIGH,  FULL VERTICAL TOP TRACK ONLY');
    expect(commercialTrackHeight(at14[4].part)).toBe("14");
    expect(commercialTrackHeight(tracks().find((p) => p.name === '2" RAW TRACK')!)).toBeNull();
  });

  it("replaces the older commercial sets on the Track tab's shelf", () => {
    const comm = tracks().filter((p) => p.sub === "COMMERCIAL TRACKS");
    expect(comm).toHaveLength(25);
    expect(comm.map((p) => p.name)).toEqual(COMMERCIAL_TRACK_PARTS.map((p) => p.name));
    expect(comm.find((p) => p.name === "COMMERCIAL TRACKS:8FT,  FV")?.price).toBe(599.95);   // was 549.95 on the parts list
    expect(comm.find((p) => p.name === "COMMERCIAL TRACKS:10FT,  FV")?.price).toBe(699.95);  // was 649.95
    expect(comm.some((p) => p.name === "COMMERCIAL TRACKS:9FT,  15R")).toBe(true);           // 9FT joined
    // Still one of everything, and the shelf keeps the residential sets ahead of them.
    expect(new Set(tracks().map((p) => p.name)).size).toBe(tracks().length);
    expect(tracks().findIndex((p) => p.sub === "COMMERCIAL TRACKS")).toBeGreaterThan(tracks().findIndex((p) => p.sub === "RESIDENTIAL TRACKS"));
  });
});

describe("residential track sets from the door size and radius", () => {
  const sets = () => residentialTrackSets(tracks());

  it("reads the sets off the shelf: height, radii and width band", () => {
    const s = sets();
    expect(s).toHaveLength(16);
    const r = s.find((x) => x.part.name === "7',  10/12/15R,  7' TO 10' WIDE")!;
    expect(r).toMatchObject({ height: 7, radii: ["10R", "12R", "15R"], wide: false });
    expect(s.find((x) => x.part.name === "9',  12/15R,  12' AND UP")).toMatchObject({ height: 9, radii: ["12R", "15R"], wide: true });
    expect(s.find((x) => x.part.name === "8',  LHR,  12' WIDE AND UP")).toMatchObject({ height: 8, radii: ["LHR"], wide: true });
    // The 20R and 32R sets carry no height on the list: one set for any door.
    expect(s.find((x) => x.part.name === "20R,  7' TO 10' WIDE")).toMatchObject({ height: null, radii: ["20R"], wide: false });
    expect(s.find((x) => x.part.name === "32R,  12' AND UP")).toMatchObject({ height: null, radii: ["32R"], wide: true });
  });

  it("rounds the door height up to the next set, and stops at 9'", () => {
    const s = sets();
    expect(trackHeightFor(s, 84)).toBe(7);
    expect(trackHeightFor(s, 78)).toBe(7);
    expect(trackHeightFor(s, 90)).toBe(8);     // 7'6" takes the 8' set
    expect(trackHeightFor(s, 96)).toBe(8);
    expect(trackHeightFor(s, 99)).toBe(9);
    expect(trackHeightFor(s, 108)).toBe(9);
    expect(trackHeightFor(s, 109)).toBeNull();
    expect(trackHeightFor(s, 0)).toBeNull();
  });

  it("lists every radius stocked at a height, in order — 20R and 32R at every height", () => {
    const s = sets();
    expect(radiiFor(s, 7)).toEqual(["10R", "12R", "15R", "LHR", "20R", "32R"]);
    expect(radiiFor(s, 8)).toEqual(["10R", "12R", "15R", "LHR", "20R", "32R"]);
    expect(radiiFor(s, 9)).toEqual(["12R", "15R", "LHR", "20R", "32R"]);
    expect(radiiFor(s, null)).toEqual([]);
  });

  it("picks the set for the size, radius and door thickness, and words the line as Brandon has it (21/10/2026)", () => {
    const s = sets();
    const pick = pickResidentialTrack(s, 9 * 12, 7 * 12, "10R", "138")!;
    expect(pick.part.name).toBe("7',  10/12/15R,  7' TO 10' WIDE");
    expect(pick.part.price).toBe(114);
    expect(pick.description).toBe('Complete set of 2" bracket mount track, 7FT high, 10" radius, 1-3/8" door');
    expect(pickResidentialTrack(s, 9 * 12, 7 * 12, "15R", "2")!.description).toBe('Complete set of 2" bracket mount track, 7FT high, 15" radius, 2" door');
    expect(pickResidentialTrack(s, 16 * 12, 7 * 12 + 6, "12R", "2")!.part.name).toBe("8',  10/12/15R,  12' AND UP");   // 7'6" x 16'
    // 12' and up: full angle, before the thickness.
    expect(pickResidentialTrack(s, 16 * 12, 7 * 12, "15R", "138")!.description).toBe('Complete set of 2" bracket mount track, 7FT high, 15" radius, full angle, 1-3/8" door');
    expect(pickResidentialTrack(s, 16 * 12, 8 * 12, "LHR", "2")!.description).toBe('Complete set of 2" bracket mount track, 8FT high, low headroom, full angle, 2" door');
    expect(pickResidentialTrack(s, 10 * 12, 8 * 12, "32R", "138")!.part.name).toBe("32R,  7' TO 10' WIDE");
    // 20R and 32R on a 7' or 9' door: the one set the list carries, at the height the list words it.
    expect(pickResidentialTrack(s, 9 * 12, 7 * 12, "20R", "138")!.part.name).toBe("20R,  7' TO 10' WIDE");
    expect(pickResidentialTrack(s, 9 * 12, 7 * 12, "20R", "138")!.description).toBe('Complete set of 2" bracket mount track, 8FT high, 20" radius, 1-3/8" door');
    expect(pickResidentialTrack(s, 16 * 12, 9 * 12, "32R", "2")!.part.name).toBe("32R,  12' AND UP");
    expect(pickResidentialTrack(s, 12 * 12, 9 * 12, "15R", "2")!.part.name).toBe("9',  12/15R,  12' AND UP");
    // Not stocked: a 9' door at 10" radius, a 10' high door; nothing until the radius and the thickness are chosen.
    expect(pickResidentialTrack(s, 9 * 12, 9 * 12, "10R", "2")).toBeNull();
    expect(pickResidentialTrack(s, 9 * 12, 10 * 12, "12R", "2")).toBeNull();
    expect(pickResidentialTrack(s, 9 * 12, 7 * 12, "", "2")).toBeNull();
    expect(pickResidentialTrack(s, 9 * 12, 7 * 12, "12R", "")).toBeNull();
  });
});
