import { describe, it, expect } from "vitest";
import { faceMask, frameShade, frameTone, glassMask } from "./door-draw";

/**
 * An Ultra-Grain door's windows, as Clopay draws them (Brandon's captures,
 * 23/10/2026): the face round the windows the grain, the frames and grilles
 * one flat tone off it, the glass its own. These read the white render.
 */

// A white strip in miniature: the face (216), a frame's outline (180) round its flat (215), the glass (70).
function strip(): { lum: Float32Array; w: number; h: number } {
  const w = 24, h = 16;
  const lum = new Float32Array(w * h).fill(216);
  for (let y = 3; y <= 12; y++) for (let x = 4; x <= 19; x++) lum[y * w + x] = 180;
  for (let y = 4; y <= 11; y++) for (let x = 5; x <= 18; x++) lum[y * w + x] = 215;
  for (let y = 6; y <= 9; y++) for (let x = 7; x <= 16; x++) lum[y * w + x] = 70;
  return { lum, w, h };
}

describe("door pictures — Ultra-Grain windows", () => {
  it("takes the face round the windows for the grain, never a frame's own white inside its outline", () => {
    const { lum, w, h } = strip();
    const face = faceMask(lum, w, h);
    expect(face[0]).toBe(1);
    expect(face[2 * w + 10]).toBe(1);
    expect(face[5 * w + 6]).toBe(0); // the frame's flat, as white as the face
    expect(face[3 * w + 10]).toBe(0); // its outline
    // an outline with a pixel's gap still keeps the frame out
    lum[3 * w + 10] = 215;
    expect(faceMask(lum, w, h)[5 * w + 6]).toBe(0);
  });

  it("keeps the glass and the light on it, not the frame's inner line", () => {
    const w = 30, h = 20;
    const lum = new Float32Array(w * h).fill(215);
    for (let y = 4; y <= 15; y++) for (let x = 4; x <= 25; x++) lum[y * w + x] = 70;
    for (let y = 8; y <= 10; y++) for (let x = 10; x <= 20; x++) lum[y * w + x] = 140; // a reflection
    for (let x = 4; x <= 25; x++) lum[4 * w + x] = 120; // the shadow along the frame
    const glass = glassMask(lum, w, h);
    expect(glass[9 * w + 15]).toBe(1);
    expect(glass[12 * w + 6]).toBe(1);
    expect(glass[4 * w + 15]).toBe(0);
    expect(glass[0]).toBe(0);
  });

  it("shades a frame as the white render does: flat at 215, outlines dark, bevels light", () => {
    expect(frameShade(215)).toBe(1);
    expect(frameShade(155)).toBeLessThan(0.45);
    expect(frameShade(230)).toBeGreaterThan(1.15);
    expect(frameShade(200)).toBeCloseTo(0.97, 2);
  });

  it("tones the frames off the grain as Clopay does: a shade darker on a light grain, a shade lighter on a dark one", () => {
    const lum = (c: readonly number[]) => c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114;
    // the 9200 16x7 in Classic Medium: grain 117, frames 104
    expect(lum(frameTone([160.4, 106.6, 57.8]))).toBeCloseTo(104.3, 0);
    // the Modern Steel in Cypress Walnut: grain 66, frames 70
    const walnut = frameTone([92, 58.6, 33.7]);
    expect(lum(walnut)).toBeGreaterThan(66);
    expect(lum(walnut)).toBeLessThan(76);
  });
});
