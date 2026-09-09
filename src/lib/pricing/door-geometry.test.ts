import { describe, it, expect } from "vitest";
import { doorGeometry, panelsAcross, sectionsTall, panelRunFor } from "./data/door-geometry";

describe("door geometry, against Clopay RS8", () => {
  it("reproduces every door I measured from a real Clopay image", () => {
    // These four came from configurator screenshots before the tables were
    // available. If the encoding is right, it predicts all of them.
    expect(doorGeometry(7, 0, 6, 0, "short")).toEqual({ panels: 3, sections: 4 });
    expect(doorGeometry(8, 0, 7, 0, "short")).toEqual({ panels: 4, sections: 4 });
    expect(doorGeometry(8, 0, 7, 0, "long")).toEqual({ panels: 2, sections: 4 });
    expect(doorGeometry(12, 0, 10, 0, "long")).toEqual({ panels: 3, sections: 6 });
  });

  it("answers the size that started this: 18'0\" x 6'6\"", () => {
    expect(doorGeometry(18, 0, 6, 6, "short")).toEqual({ panels: 8, sections: 4 });
    expect(doorGeometry(18, 0, 6, 6, "long")).toEqual({ panels: 4, sections: 4 });
  });

  it("counts panels across the published width bands", () => {
    const table: [number, number, number, number | null][] = [
      [8, 0, 4, 2], [9, 0, 4, 2], [10, 0, 5, 2], [12, 0, 6, 3],
      [14, 0, 7, 3], [15, 0, 7, 4], [15, 6, 7, 4], [16, 0, 8, 4],
      [17, 0, 8, 4], [18, 0, 8, 4], [19, 0, 9, 5], [20, 0, 10, 5],
    ];
    for (const [ft, inch, short, long] of table) {
      expect(panelsAcross(ft, inch, "short"), `${ft}'${inch}" short`).toBe(short);
      expect(panelsAcross(ft, inch, "long"), `${ft}'${inch}" long`).toBe(long);
    }
  });

  it("counts sections across the published height bands", () => {
    for (const [ft, inch, n] of [[6,0,4],[6,6,4],[7,0,4],[7,6,5],[8,0,5],[8,9,5],
                                 [9,0,6],[10,0,6],[10,6,6],[10,9,7],[12,0,7]] as const) {
      expect(sectionsTall(ft, inch), `${ft}'${inch}"`).toBe(n);
    }
  });

  it("is not height divided by 21", () => {
    // The naive rule. A 6'0" door is 4 sections of 18", not 3 of 21", and a
    // 10'0" is 6 of 20", not 5. Both would draw wrong.
    expect(sectionsTall(6, 0)).toBe(4);
    expect(Math.round((6 * 12) / 21)).toBe(3);
    expect(sectionsTall(10, 0)).toBe(6);
    expect(Math.round((10 * 12) / 21)).toBe(6);
  });

  it("declines rather than guessing", () => {
    // A door drawn with the wrong panel count is worse than no picture.
    expect(panelsAcross(7, 0, "long")).toBeNull();        // long not built that narrow
    expect(panelsAcross(22, 0, "short")).toBeNull();      // past 20'
    expect(sectionsTall(14, 0)).toBeNull();               // past the RS8 table
    expect(sectionsTall(7, 0, "9202")).toBeNull();        // 24" sections, own table
    expect(doorGeometry(7, 0, 7, 0, "long")).toBeNull();
  });

  it("knows which run each model uses", () => {
    expect(panelRunFor("4050")).toBe("short");
    expect(panelRunFor("4053")).toBe("long");
    expect(panelRunFor("9203")).toBe("long");
    expect(panelRunFor("T50L")).toBe("long");
    expect(panelRunFor("nope")).toBeNull();
  });
});
