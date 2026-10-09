"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { OptionButtons } from "./OptionButtons";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { QtyStepper } from "./QtyStepper";
import {
  DISPOSAL_LOCATIONS, DISPOSAL_SIZES, QB_DISPOSAL, disposalDescription, disposalPrice,
  type DisposalLocation, type DisposalSize,
} from "@/lib/pricing/data/disposals";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * The Disposals button's window — Brandon, 9/10/2026. Two questions, in order:
 * which location, then single or double door. Both must be answered before a
 * price shows. Then a quantity — the − n + box the door cards use — over the
 * price of one, and QuickBooks with Copy description, Copy quantity and Copy
 * price under it for every account; here the buttons do not go by who is
 * signed in. Rendered into the app root, as the vinyl question is, so the
 * overlay covers the window rather than the column. Escape, or a click
 * outside, closes it.
 */
const DISPOSAL_COPY = ["description", "quantity", "price"] as const;
export function DisposalModal({ onClose }: { onClose: () => void }) {
  const [location, setLocation] = useState<DisposalLocation | null>(null);
  const [size, setSize] = useState<DisposalSize | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const ready = location !== null && size !== null;
  const price = ready ? disposalPrice(location, size) : null;
  const description = size ? disposalDescription(size) : "";

  const dialog = (
    <div className="modal-scrim" onClick={onClose}>
      <div
        className="modal disposal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disposal-title"
        data-testid="disposal-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3 id="disposal-title">Door disposal</h3>
          <button type="button" className="modal-close" aria-label="Close" data-testid="disposal-close" onClick={onClose}>×</button>
        </div>

        <div className="field">
          <label className="lbl">Location <span className="req">*</span></label>
          <OptionButtons label="Location" testid="disposal-loc" options={DISPOSAL_LOCATIONS} value={location} onChange={setLocation} />
        </div>
        <div className="field">
          <label className="lbl">Door <span className="req">*</span></label>
          <OptionButtons label="Door" testid="disposal-size" options={DISPOSAL_SIZES} value={size} onChange={setSize} />
        </div>

        {price !== null && size ? (
          <>
            <div className="qtyrow">
              <label htmlFor="disposal-qty">Quantity</label>
              <QtyStepper id="disposal-qty" value={qty} testId="disposal-qty" onChange={(v) => setQty(Math.max(1, Number(v) || 1))} />
            </div>
            <div className="total">
              {/* The price of one, whatever the quantity — as the door cards show it. */}
              <span data-testid="disposal-desc">{description}</span>
              <b data-testid="disposal-price">{fmt(price)}</b>
            </div>
            <div className="qfoot">
              <CopyQuickBooks item={QB_DISPOSAL} description={description} rate={price} qty={qty} extras={DISPOSAL_COPY} testId="disposal-copy-qb" />
            </div>
          </>
        ) : (
          <p className="muted-note" data-testid="disposal-prompt">
            {location === null ? "Pick the location first." : "Single or double door?"}
          </p>
        )}
      </div>
    </div>
  );
  return createPortal(dialog, document.querySelector(".tool-shell") ?? document.body);
}
