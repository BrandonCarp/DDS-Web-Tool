import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { RESIDENTIAL_PHOTOS, COMMERCIAL_PHOTOS } from "./door-photos";

const file = (src: string) => join(process.cwd(), "public", src);

describe("door photos for the welcome cards", () => {
  it("lists the 20 residential and 7 commercial photos", () => {
    expect(RESIDENTIAL_PHOTOS).toHaveLength(20);
    expect(COMMERCIAL_PHOTOS).toHaveLength(7);
  });

  it("has a real WebP file behind every name", () => {
    for (const src of [...RESIDENTIAL_PHOTOS, ...COMMERCIAL_PHOTOS]) {
      expect(existsSync(file(src)), src).toBe(true);
      const head = readFileSync(file(src)).subarray(0, 12);
      expect(head.toString("latin1", 0, 4) + head.toString("latin1", 8, 12), src).toBe("RIFFWEBP");
    }
  });

  it("leaves no photo in the folders out of the lists", () => {
    for (const [folder, list] of [["residential", RESIDENTIAL_PHOTOS], ["commercial", COMMERCIAL_PHOTOS]] as const) {
      const onDisk = readdirSync(join(process.cwd(), "public", "door-photos", folder)).map((f) => `/door-photos/${folder}/${f}`);
      expect([...onDisk].sort()).toEqual([...list].sort());
    }
  });
});
