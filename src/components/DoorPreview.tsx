"use client";

import { useEffect, useState } from "react";
import type { DoorPictureSpec } from "@/lib/pricing/data/door-layout";
import { useDoorPicture } from "./use-door-picture";

/**
 * The door as configured on the quote card (19/10/2026): click for a larger
 * look, and a Download picture button for the customer. Draws nothing where
 * the door cannot be drawn — a wrong picture on an estimate is worse than none.
 */
export default function DoorPreview({ spec, label, filename }: { spec: DoorPictureSpec | null; label: string; filename: string }) {
  const { url } = useDoorPicture(spec);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  if (!url) return null;
  const dl = `${filename.replace(/\s+/g, "-").toLowerCase()}.png`;
  return (
    <>
      <div className="qtyrow doorrow no-print" data-testid="door-preview">
        <button type="button" className="doorthumb-btn" onClick={() => setOpen(true)} title="View larger" data-testid="door-preview-open">
          <img src={url} alt={label} />
        </button>
        <a className="btn" href={url} download={dl} data-testid="door-preview-download">Download picture</a>
      </div>
      {open && (
        <div className="modal-scrim no-print" onClick={() => setOpen(false)}>
          <div className="modal doorlb" role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}>
            <img src={url} alt={label} />
            <div className="doorlb-foot">
              <span>{label.toUpperCase()}</span>
              <a className="btn primary" href={url} download={dl}>Download picture</a>
              <button type="button" className="btn" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
