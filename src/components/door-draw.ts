"use client";

import { baseRef } from "@/lib/pricing/data/door-images";
import type { Blit, DoorLayout, WindowArea } from "@/lib/pricing/data/door-layout";

// Draws a door layout (door-layout.ts) onto a canvas and hands back a PNG.

const images = new Map<string, Promise<HTMLImageElement>>();
function load(src: string): Promise<HTMLImageElement> {
  let p = images.get(src);
  if (!p) {
    p = new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = () => { images.delete(src); rej(new Error(src)); };
      img.src = src;
    });
    images.set(src, p);
  }
  return p;
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] | null {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const x = c.getContext("2d");
  if (!x) return null;
  x.imageSmoothingQuality = "high";
  return [c, x];
}

function draw(x: CanvasRenderingContext2D, img: HTMLImageElement, b: Blit) {
  if (!b.flipY) { x.drawImage(img, b.sx, b.sy, b.sw, b.sh, b.dx, b.dy, b.dw, b.dh); return; }
  x.save();
  x.translate(0, b.dy + b.dh);
  x.scale(1, -1);
  x.drawImage(img, b.sx, b.sy, b.sw, b.sh, b.dx, 0, b.dw, b.dh);
  x.restore();
}

/**
 * Clopay's Ultra-Grain frame tone against the door's grain, by brightness
 * (Brandon's captures, 23/10/2026): 104 on the Classic Medium's 117, 70 on
 * the Cypress Walnut's 66 — a light grain's frames a shade darker, a dark
 * one's a shade lighter.
 */
export function frameTone(face: readonly number[]): number[] {
  const lf = face[0] * 0.299 + face[1] * 0.587 + face[2] * 0.114;
  if (!(lf > 0)) return [...face];
  const k = (0.6 * lf + 34) / lf;
  return face.map((c) => Math.min(255, c * k));
}
/**
 * An Ultra-Grain frame's shading by the white render's brightness there (215
 * its flat): its outlines dark and its bevels light, as Clopay draws them.
 */
const FRAME_SHADE: readonly (readonly [number, number])[] = [[0, 0.35], [160, 0.42], [180, 0.8], [200, 0.97], [215, 1], [222, 1.08], [232, 1.22], [255, 1.35]];
export function frameShade(l: number): number {
  for (let i = 1; i < FRAME_SHADE.length; i++) {
    const [l1, f1] = FRAME_SHADE[i];
    if (l <= l1) {
      const [l0, f0] = FRAME_SHADE[i - 1];
      return f0 + ((f1 - f0) * (l - l0)) / (l1 - l0);
    }
  }
  return FRAME_SHADE[FRAME_SHADE.length - 1][1];
}

/**
 * The face round the windows in an area of the white render: the plain white
 * that reaches the area's edge, an outline a pixel thick closed first so a
 * frame's own white is never taken for it.
 */
export function faceMask(lum: Float32Array, w: number, h: number): Uint8Array {
  const n = w * h;
  const like = new Uint8Array(n);
  for (let i = 0; i < n; i++) like[i] = lum[i] >= 209 && lum[i] <= 223 ? 1 : 0;
  const core = new Uint8Array(n);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (!like[i]) continue;
      let all = 1;
      for (let dy = -1; dy <= 1 && all; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const yy = y + dy, xx = x + dx;
          if (yy < 0 || yy >= h || xx < 0 || xx >= w) continue;
          if (!like[yy * w + xx]) { all = 0; break; }
        }
      }
      core[i] = all;
    }
  }
  const face = new Uint8Array(n);
  const queue = new Int32Array(n);
  let head = 0, tail = 0;
  const seed = (i: number) => { if (core[i] && !face[i]) { face[i] = 1; queue[tail++] = i; } };
  for (let x = 0; x < w; x++) { seed(x); seed((h - 1) * w + x); }
  for (let y = 0; y < h; y++) { seed(y * w); seed(y * w + w - 1); }
  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    if (x > 0) seed(i - 1);
    if (x < w - 1) seed(i + 1);
    if (i >= w) seed(i - w);
    if (i + w < n) seed(i + w);
  }
  for (let step = 0; step < 2; step++) {
    const grow: number[] = [];
    for (let i = 0; i < n; i++) {
      if (face[i] || !like[i]) continue;
      const x = i % w;
      if ((x > 0 && face[i - 1]) || (x < w - 1 && face[i + 1]) || (i >= w && face[i - w]) || (i + w < n && face[i + w])) grow.push(i);
    }
    for (const i of grow) face[i] = 1;
  }
  return face;
}

/**
 * The glass in an area: dark, and the reflections on it — the lighter glass
 * reached from the dark without coming within two pixels of a frame.
 */
export function glassMask(lum: Float32Array, w: number, h: number): Uint8Array {
  const n = w * h;
  const sum = new Int32Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) {
    let row = 0;
    for (let x = 0; x < w; x++) {
      row += lum[y * w + x] >= 175 ? 1 : 0;
      sum[(y + 1) * (w + 1) + x + 1] = sum[y * (w + 1) + x + 1] + row;
    }
  }
  const nearFrame = (x: number, y: number) => {
    const x0 = Math.max(0, x - 2), x1 = Math.min(w, x + 3), y0 = Math.max(0, y - 2), y1 = Math.min(h, y + 3);
    return sum[y1 * (w + 1) + x1] - sum[y0 * (w + 1) + x1] - sum[y1 * (w + 1) + x0] + sum[y0 * (w + 1) + x0] > 0;
  };
  const glass = new Uint8Array(n);
  const queue = new Int32Array(n);
  let head = 0, tail = 0;
  for (let i = 0; i < n; i++) if (lum[i] < 110) { glass[i] = 1; queue[tail++] = i; }
  while (head < tail) {
    const i = queue[head++];
    const x = i % w, y = (i - x) / w;
    for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i >= w ? i - w : -1, i + w < n ? i + w : -1]) {
      if (j < 0 || glass[j] || lum[j] >= 175) continue;
      const jx = j % w;
      if (nearFrame(jx, (j - jx) / w)) continue;
      glass[j] = 1;
      queue[tail++] = j;
    }
    void y;
  }
  return glass;
}

/**
 * An Ultra-Grain door's windows, as Clopay draws them (Brandon's captures,
 * 23/10/2026): the frames and grilles one flat tone off the grain round them,
 * shaded as the white render shades them; the face round them the grain; the
 * glass its own.
 */
function grainWindows(w: WindowArea, px: Uint8ClampedArray, und: Uint8ClampedArray, W: number, H: number, base: readonly number[]) {
  const x0 = Math.max(0, w.x), y0 = Math.max(0, w.y);
  const aw = Math.min(W, w.x + w.w) - x0, ah = Math.min(H, w.y + w.h) - y0;
  if (aw <= 0 || ah <= 0) return;
  const lum = new Float32Array(aw * ah);
  for (let y = 0; y < ah; y++) {
    for (let x = 0; x < aw; x++) {
      const i = ((y0 + y) * W + x0 + x) * 4;
      lum[y * aw + x] = (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) * (216 / w.ref);
    }
  }
  const lb = base[0] * 0.299 + base[1] * 0.587 + base[2] * 0.114;
  const face = w.whole ? null : faceMask(lum, aw, ah);
  const glass = glassMask(lum, aw, ah);
  for (let y = 0; y < ah; y++) {
    for (let x = 0; x < aw; x++) {
      const a = y * aw + x;
      if (glass[a]) continue;
      const i = ((y0 + y) * W + x0 + x) * 4;
      const l = lum[a];
      if (face && face[a]) {
        const k = l / 216;
        for (let c = 0; c < 3; c++) px[i + c] = Math.min(255, und[i + c] * k);
        continue;
      }
      const f = frameShade(l);
      if (f <= 1) {
        for (let c = 0; c < 3; c++) px[i + c] = base[c] * f;
      } else {
        const t = Math.min(1, ((f - 1) * lb) / (255 - lb));
        for (let c = 0; c < 3; c++) px[i + c] = base[c] + (255 - base[c]) * t;
      }
    }
  }
}

/**
 * The picture as a PNG data URL, or null where the browser cannot draw it.
 *
 * Colour: the face of a tinted door multiplies the white render by the
 * colour, every pixel keeping its shading. The windows were captured white,
 * so their frames take the door's colour by brightness — the glass, dark,
 * keeps its own look: the colour on a tinted door, the frame paint on one
 * Clopay rendered in its colour, the face under them on a texture and on a
 * Modern Steel door (Brandon's captures, 23/10/2026); an Ultra-Grain door's
 * frames one flat tone off its grain; a slim window's frame is its own black
 * or silver.
 */
export async function drawDoor(L: DoorLayout): Promise<string | null> {
  const srcs = [...new Set([...L.blits, ...L.under].map((b) => b.src))];
  const imgs = new Map<string, HTMLImageElement>();
  await Promise.all(srcs.map(async (s) => { imgs.set(s, await load(s)); }));
  const stage = canvas(L.width, L.height);
  if (!stage) return null;
  const [sc, sx] = stage;
  for (const b of L.blits) {
    const img = imgs.get(b.src);
    if (img) draw(sx, img, b);
  }
  const ref = baseRef(L.art.style);
  const tint = L.art.kind === "tint" ? L.art.rgb : null;
  // Where the windows are, pixel by pixel: a tinted face is tinted round them, not over them.
  const inWindow = new Uint8Array(L.width * L.height);
  for (const w of L.windows) {
    for (let y = Math.max(0, w.y); y < Math.min(L.height, w.y + w.h); y++) {
      inWindow.fill(1, y * L.width + Math.max(0, w.x), y * L.width + Math.min(L.width, w.x + w.w));
    }
  }
  const all = sx.getImageData(0, 0, L.width, L.height);
  const px = all.data;
  if (tint) {
    for (let p = 0, i = 0; p < inWindow.length; p++, i += 4) {
      if (inWindow[p]) continue;
      const k = px[i] / ref;
      px[i] = Math.min(255, k * tint[0]);
      px[i + 1] = Math.min(255, k * tint[1]);
      px[i + 2] = Math.min(255, k * tint[2]);
    }
  }
  // The face under the windows, for frames that take it — tinted as the face is.
  let und: Uint8ClampedArray | null = null;
  if (L.windows.some((w) => w.mode === "under" || w.mode === "grain")) {
    const u = canvas(L.width, L.height);
    if (!u) return null;
    for (const b of L.under) {
      const img = imgs.get(b.src);
      if (img) draw(u[1], img, b);
    }
    und = u[1].getImageData(0, 0, L.width, L.height).data;
    if (tint) {
      for (let i = 0; i < und.length; i += 4) {
        const k = und[i] / ref;
        und[i] = Math.min(255, k * tint[0]); und[i + 1] = Math.min(255, k * tint[1]); und[i + 2] = Math.min(255, k * tint[2]);
      }
    }
  }
  // An Ultra-Grain door's frame tone, off its face round the windows.
  let tone: number[] | null = null;
  if (L.windows.some((w) => w.mode === "grain")) {
    const sum = [0, 0, 0];
    let count = 0;
    for (let p = 0, i = 0; p < inWindow.length; p++, i += 4) {
      if (inWindow[p]) continue;
      sum[0] += px[i]; sum[1] += px[i + 1]; sum[2] += px[i + 2]; count++;
    }
    if (count) tone = frameTone(sum.map((v) => v / count));
  }
  for (const w of L.windows) {
    if (w.mode === "metal" || (w.mode === "paint" && !w.rgb)) continue;
    if (w.mode === "grain") {
      if (und && tone) grainWindows(w, px, und, L.width, L.height, tone);
      continue;
    }
    for (let y = Math.max(0, w.y); y < Math.min(L.height, w.y + w.h); y++) {
      for (let x = Math.max(0, w.x); x < Math.min(L.width, w.x + w.w); x++) {
        const i = (y * L.width + x) * 4;
        const lum = px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114;
        const t = Math.max(0, Math.min(1, (lum - 110) / (w.ref - 110)));
        if (!t) continue;
        if (w.mode === "paint" && w.rgb) {
          const k = px[i] / w.ref;
          for (let c = 0; c < 3; c++) px[i + c] += (Math.min(255, k * w.rgb[c]) - px[i + c]) * t;
        } else if (und) {
          const k = lum / w.ref;
          for (let c = 0; c < 3; c++) px[i + c] += (Math.min(255, und[i + c] * k) - px[i + c]) * t;
        }
      }
    }
  }
  sx.putImageData(all, 0, 0);
  if (L.outWidth === L.width && L.outHeight === L.height) return sc.toDataURL("image/png");
  const out = canvas(L.outWidth, L.outHeight);
  if (!out) return null;
  out[1].drawImage(sc, 0, 0, L.width, L.height, 0, 0, L.outWidth, L.outHeight);
  return out[0].toDataURL("image/png");
}
