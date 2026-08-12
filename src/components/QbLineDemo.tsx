"use client";

/**
 * A looping, silent demo of the one thing every counter quote ends in: getting
 * the line into QuickBooks. It shows a single estimate row filling itself —
 * Item typed, Description pasted, Rate pasted — in the same order the buttons
 * sit directly above it.
 *
 * Deliberately CSS-only. A JS timer here would keep running behind an idle tab
 * and drift out of step with the row it is describing; a single shared
 * animation timeline cannot. Nothing about this component touches pricing.
 */

interface QbLineDemoProps {
  /** Item name typed into the QuickBooks Item column. */
  item?: string;
  /** Description text pasted in — matches what Copy description puts on the clipboard. */
  description?: string;
  /** Rate pasted in, already formatted. */
  rate?: string;
}

export function QbLineDemo({
  item = "STOCK DOOR",
  description = 'CLOPAY MODEL 4300, 16\u20320" X 7\u20320", IN THE COLOR WHITE, SOLID, NO WINDOWS, 12" RADIUS TRACK, TORSION SPRINGS, NO LOCK',
  rate = "1,471.84",
}: QbLineDemoProps) {
  return (
    <div className="qbdemo" aria-hidden="true">
      <div className="qbd-cap">
        <span className="qbd-cap-t">In QuickBooks</span>
        <span className="qbd-cap-s">on loop</span>
      </div>

      <div className="qbd-grid">
        <div className="qbd-hrow">
          <span className="qbd-h qbd-c-item">Item</span>
          <span className="qbd-h qbd-c-desc">Description</span>
          <span className="qbd-h qbd-c-qty">Qty</span>
          <span className="qbd-h qbd-c-rate">Rate</span>
        </div>

        <div className="qbd-row">
          <span className="qbd-cell qbd-c-item">
            <span className="qbd-fill qbd-f-item">
              <span className="qbd-type">{item}</span>
            </span>
            <span className="qbd-caret" />
          </span>
          <span className="qbd-cell qbd-c-desc">
            <span className="qbd-fill qbd-f-desc qbd-clamp">{description}</span>
          </span>
          <span className="qbd-cell qbd-c-qty">
            <span className="qbd-fill qbd-f-qty">1</span>
          </span>
          <span className="qbd-cell qbd-c-rate">
            <span className="qbd-fill qbd-f-rate">{rate}</span>
          </span>
        </div>
      </div>

      <ol className="qbd-steps">
        <li className="qbd-step qbd-s1">
          <b>1</b> Type the item
        </li>
        <li className="qbd-step qbd-s2">
          <b>2</b> Copy description
        </li>
        <li className="qbd-step qbd-s3">
          <b>3</b> Copy price
        </li>
      </ol>
    </div>
  );
}
