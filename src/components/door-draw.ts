"use client";

import { baseRef } from "@/lib/pricing/data/door-images";
import type { DoorLayout } from "@/lib/pricing/data/door-layout";

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

/**
 * The picture as a PNG data URL, or null where the browser cannot draw it.
 *
 * Colour: the face of a tinted door multiplies the white render by the
 * colour, every pixel keeping its shading. The windows were captured white,
 * so their frames take the door's colour by brightness — the glass, dark,
 * keeps its own look: the colour on a tinted door, the frame paint on one
 * Clopay rendered in its colour, the face under them on a grain or a texture
 * and on a Modern Steel door (Brandon's captures, 23/10/2026); a slim
 * window's frame is its own black or silver.
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
    if (img) sx.drawImage(img, b.sx, b.sy, b.sw, b.sh, b.dx, b.dy, b.dw, b.dh);
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
  if (L.windows.some((w) => w.mode === "under")) {
    const u = canvas(L.width, L.height);
    if (!u) return null;
    for (const b of L.under) {
      const img = imgs.get(b.src);
      if (img) u[1].drawImage(img, b.sx, b.sy, b.sw, b.sh, b.dx, b.dy, b.dw, b.dh);
    }
    und = u[1].getImageData(0, 0, L.width, L.height).data;
    if (tint) {
      for (let i = 0; i < und.length; i += 4) {
        const k = und[i] / ref;
        und[i] = Math.min(255, k * tint[0]); und[i + 1] = Math.min(255, k * tint[1]); und[i + 2] = Math.min(255, k * tint[2]);
      }
    }
  }
  for (const w of L.windows) {
    if (w.mode === "metal" || (w.mode === "paint" && !w.rgb)) continue;
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
