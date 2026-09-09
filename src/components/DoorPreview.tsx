"use client";

import { useEffect, useState, useCallback } from "react";
import { doorArt, windowBand, BAND_HEIGHT } from "@/lib/pricing/data/door-images";
import { doorGeometry, panelRunFor } from "@/lib/pricing/data/door-geometry";
import { composite, SLICES } from "@/lib/pricing/data/door-composite";
import { BASE_REF } from "@/lib/pricing/data/door-images";

interface Props {
  model: string;
  color: string;
  widthFt: number;
  widthIn: number;
  heightFt: number;
  heightIn: number;
  /** "solid", "glass" or "inserts". */
  style: string;
  /** Insert design id when style is inserts; ignored otherwise. */
  design?: string;
  /** Long or short plain glass, when style is glass. */
  glassRun?: "PLAINLONG" | "PLAINSHORT";
  /** Filename stem for the download. */
  filename?: string;
}

/**
 * Draws the quoted door, or nothing.
 *
 * Renders only when all three pieces resolve — an image or tint for the model
 * and colour, a panel grid for the size, and a composite for that grid. Any of
 * them coming back null means we do not know what the door looks like, and a
 * wrong picture on an estimate is worse than no picture, so the component
 * disappears rather than approximating.
 */
export default function DoorPreview({ model, color, widthFt, widthIn, heightFt, heightIn, style, design, glassRun, filename }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const art = doorArt(model, color);
  // A glazed door needs its top section swapped. No band for the chosen design
  // means we cannot draw it — showing the solid door instead would put a
  // window-less picture on a quote for a door with windows.
  const wantsGlass = style === "glass" || style === "inserts";
  const designKey = style === "inserts" ? (design ?? "") : (glassRun ?? "PLAINSHORT");
  const bandSrc = wantsGlass ? windowBand(model, designKey) : null;
  const blocked = wantsGlass && !bandSrc;
  const run = panelRunFor(model) ?? (art?.style.includes("long") ? "long" : "short");
  const geo = art ? doorGeometry(widthFt, widthIn, heightFt, heightIn, run, model) : null;

  const draw = useCallback(async (): Promise<string | null> => {
    if (!art || !geo || blocked) return null;
    const slice = SLICES[art.style];
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej(new Error(art.src));
      img.src = art.src;
    });

    let band: HTMLImageElement | null = null;
    if (bandSrc) {
      band = new Image();
      band.crossOrigin = "anonymous";
      const b = band;
      await new Promise<void>((res, rej) => {
        b.onload = () => res();
        b.onerror = () => rej(new Error(bandSrc));
        b.src = bandSrc;
      });
    }

    const plan = composite(art.style, geo.panels, geo.sections);
    const w = plan ? plan.width : slice.width;
    const h = plan ? plan.height : slice.height;
    const stage = document.createElement("canvas");
    stage.width = w; stage.height = h;
    const sx = stage.getContext("2d");
    if (!sx) return null;

    if (plan) {
      for (const b of plan.blits) sx.drawImage(img, b.sx, b.sy, b.sw, b.sh, b.dx, b.dy, b.dw, b.dh);
    } else {
      sx.drawImage(img, 0, 0);
    }

    // The band replaces the top section, using the SAME horizontal slicing the
    // panels below it use. Tiling the band at its own width instead puts the
    // windows out of step with the columns underneath on any door wider than
    // the base.
    if (band) {
      const bh = BAND_HEIGHT[art.style];
      if (plan) {
        for (const b of plan.blits) {
          if (b.sy !== 0) continue;                    // the top row only
          const sh = Math.min(b.sh, bh);
          sx.drawImage(band, b.sx, 0, b.sw, sh, b.dx, 0, b.dw, sh);
        }
      } else {
        sx.drawImage(band, 0, 0, band.width, bh, 0, 0, band.width, bh);
      }
    }

    // A tint multiplies the white base: every pixel keeps its shading and takes
    // the colour. Done here rather than with a CSS filter so the downloaded
    // image carries it too.
    if (art.kind === "tint") {
      const ref = BASE_REF[art.style];
      const d = sx.getImageData(0, 0, w, h);
      const px = d.data;
      const [tr, tg, tb] = art.rgb;
      for (let i = 0; i < px.length; i += 4) {
        const k = px[i] / ref;
        px[i] = Math.min(255, k * tr);
        px[i + 1] = Math.min(255, k * tg);
        px[i + 2] = Math.min(255, k * tb);
      }
      sx.putImageData(d, 0, 0);
    }

    // Clopay scales the canvas with the grid, so the finished door is scaled to
    // the size their own render of it would be.
    const outW = plan ? plan.targetWidth : slice.width;
    const outH = plan ? plan.targetHeight : slice.height;
    const out = document.createElement("canvas");
    out.width = outW; out.height = outH;
    const ox = out.getContext("2d");
    if (!ox) return null;
    ox.imageSmoothingQuality = "high";
    ox.drawImage(stage, 0, 0, w, h, 0, 0, outW, outH);
    return out.toDataURL("image/png");
  }, [art, geo, bandSrc, blocked]);

  useEffect(() => {
    // The draw is async by construction (it awaits the image load), so state
    // never lands synchronously inside the effect.
    let live = true;
    void draw().then((u) => { if (live) setUrl(u); }).catch(() => { if (live) setUrl(null); });
    return () => { live = false; };
  }, [draw]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  if (!url) return null;
  const label = `${widthFt}'${widthIn}" x ${heightFt}'${heightIn}" ${model} ${color}`;
  const dl = `${filename ?? `${model}-${widthFt}x${heightFt}-${color}`.replace(/\s+/g, "-").toLowerCase()}.png`;

  return (
    <>
      <div className="doorthumb no-print">
        <button type="button" className="doorthumb-btn" onClick={() => setOpen(true)} title="View larger">
          <img src={url} alt={label} />
        </button>
        <a className="doorthumb-dl" href={url} download={dl}>Download image</a>
      </div>
      {open && (
        <div className="doorlb no-print" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="doorlb-inner" onClick={(e) => e.stopPropagation()}>
              <img src={url} alt={label} />
            <div className="doorlb-foot">
              <span>{label.toUpperCase()}</span>
              <a href={url} download={dl}>Download image</a>
              <button type="button" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
