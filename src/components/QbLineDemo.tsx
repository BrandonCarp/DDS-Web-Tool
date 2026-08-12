"use client";

/**
 * A looping, silent demo of the one thing every counter quote ends in: getting
 * the line into QuickBooks.
 *
 * It runs left to right — a miniature of the quote card on the left, the
 * QuickBooks estimate row on the right — so the two Copy buttons visibly feed
 * the two cells they fill. Item is typed, description and rate are pasted.
 *
 * Deliberately CSS-only. A JS timer here would keep running behind an idle tab
 * and drift out of step with the row it is describing; one shared animation
 * timeline cannot. Nothing about this component touches pricing.
 */

interface QbLineDemoProps {
  /** Model shown on the mini quote card. */
  model?: string;
  /** Size line shown next to the model. */
  size?: string;
  /** Item name typed into the QuickBooks Item column. */
  item?: string;
  /** Description text — matches what Copy description puts on the clipboard. */
  description?: string;
  /** Rate, already formatted, without a currency symbol. */
  rate?: string;
  /** The few characters typed before the QuickBooks list narrows down. */
  typed?: string;
  /** Quantity cell — linear feet for per-foot parts, otherwise 1. */
  qty?: string;
}

export function QbLineDemo({
  model = "4300",
  size = "16\u20320\" X 7\u20320\"",
  item = "STOCK DOOR",
  description = 'CLOPAY MODEL 4300, 16\u20320" X 7\u20320", IN THE COLOR WHITE, SOLID, NO WINDOWS, 12" RADIUS TRACK, TORSION SPRINGS, NO LOCK',
  rate = "1,471.84",
  typed = "STO",
  qty = "1",
}: QbLineDemoProps) {
  return (
    <div className="qbdemo" aria-hidden="true">
      <div className="qbd-inner">
        <div className="qbd-cap">Getting this quote into QuickBooks</div>

        <div className="qbd-flow">
          {/* left: a miniature of the quote card the counter is looking at */}
          <div className="qbd-src">
            <div className="qbd-src-hd">
              <span className="qbd-src-model">{model}</span>
              <span className="qbd-src-size">{size}</span>
            </div>
            <div className="qbd-src-row">
              <span>Base door</span>
              <b>${rate}</b>
            </div>
            <div className="qbd-src-btns">
              <span className="qbd-btn qbd-btn-desc">Copy description</span>
              <span className="qbd-btn qbd-btn-rate">Copy price</span>
            </div>
          </div>

          <div className="qbd-arrow" />

          {/* right: the QuickBooks estimate line it lands on */}
          <div className="qbd-grid">
            <div className="qbd-hrow">
              <span className="qbd-h qbd-c-item">Item</span>
              <span className="qbd-h qbd-c-desc">Description</span>
              <span className="qbd-h qbd-c-qty">Qty</span>
              <span className="qbd-h qbd-c-rate">Rate</span>
            </div>
            <div className="qbd-row">
              <span className="qbd-cell qbd-c-item">
                {/* what the counter types, then what they pick from the list */}
                <span className="qbd-fill qbd-f-item">
                  <span className="qbd-type">{typed}</span>
                </span>
                <span className="qbd-caret" />
                <span className="qbd-picked">{item}</span>
                {/* Only the item being picked — a list of decoys would just
                    give the counter something to misread. */}
                <span className="qbd-menu">
                  <span className="qbd-opt qbd-opt-hit">{item}</span>
                </span>
              </span>
              <span className="qbd-cell qbd-c-desc">
                <span className="qbd-fill qbd-f-desc qbd-clamp">{description}</span>
              </span>
              <span className="qbd-cell qbd-c-qty">
                <span className="qbd-fill qbd-f-desc">{qty}</span>
              </span>
              <span className="qbd-cell qbd-c-rate">
                <span className="qbd-fill qbd-f-rate">{rate}</span>
              </span>
            </div>
          </div>
        </div>

        <ol className="qbd-steps">
          <li className="qbd-step qbd-s1"><b>1</b> Select the item</li>
          <li className="qbd-step qbd-s2"><b>2</b> Copy description, paste</li>
          <li className="qbd-step qbd-s3"><b>3</b> Copy price, paste</li>
        </ol>
      </div>
    </div>
  );
}
