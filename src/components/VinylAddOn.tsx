"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  vinylForDoor,
  vinylForDoorColor,
  VINYL_COLORS,
  ULTRAGRAIN_VINYL,
} from "@/lib/pricing/data/vinyl";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface VinylAddOnProps {
  /** Door colour as chosen on the quote — picks the matching vinyl. */
  doorColor: string;
  widthFt: number;
  heightFt: number;
}

/**
 * Optional stop molding alongside a door quote.
 *
 * It stays collapsed until the counter asks for it, because most door quotes do
 * not include molding and an always-open card reads like part of the price. The
 * colour is preselected from the door but stays editable — Ultra Grain has five
 * possible finishes, so that one always needs a choice.
 *
 * This is its own line in QuickBooks, not part of the door, so it carries its
 * own description, quantity and price to copy.
 */
export function VinylAddOn({ doorColor, widthFt, heightFt }: VinylAddOnProps) {
  const suggested = vinylForDoorColor(doorColor) ?? "";
  const [open, setOpen] = useState(false);
  const [sets, setSets] = useState(1);
  // The colour follows the door unless the counter picks a different one. Held
  // as an override rather than synced in an effect, so changing the door colour
  // cannot leave a stale vinyl colour on screen for a frame.
  const [override, setOverride] = useState<string | null>(null);
  const [lastDoor, setLastDoor] = useState(doorColor);
  if (doorColor !== lastDoor) {
    setLastDoor(doorColor);
    setOverride(null);
  }
  const color = override ?? suggested;
  const setColor = setOverride;

  // An Ultra Grain door with no finish named cannot resolve on its own, so the
  // list narrows to the five finishes rather than all sixteen colours.
  const isUltraGrain = /ultra[\s-]*grain/i.test(doorColor);
  const needsFinish = isUltraGrain && !suggested;
  const choices: readonly string[] = needsFinish ? ULTRAGRAIN_VINYL : VINYL_COLORS;
  const quote = color ? vinylForDoor(color, widthFt, heightFt, sets) : null;

  return (
    <div className="ggroup vinylbox no-print">
      <div className="ghdr vinylhdr">
        <span>Vinyl stop molding</span>
        <label className="vinyltoggle">
          <input
            type="checkbox"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
            data-testid="vinyl-toggle"
          />
          <span>Add to this quote</span>
        </label>
      </div>

      {open && (
        <div className="vinylbody">
          <div className="grow">
            <label>Color</label>
            <div className="ctl selectwrap">
              <select
                data-testid="vinyl-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                {!color && <option value="">Select a color</option>}
                {choices.map((c) => (
                  <option key={c} value={c}>
                    {c}
                    {c === suggested ? "  (matches door)" : ""}
                  </option>
                ))}
              </select>
            </div>
            {needsFinish && (
              <div className="muted-note" style={{ marginTop: 6 }}>
                Ultra Grain — pick the finish to match the door
              </div>
            )}
          </div>

          <div className="grow">
            <label>Sets</label>
            <div className="ctl">
              <input
                data-testid="vinyl-sets"
                type="number"
                min={1}
                value={sets}
                onChange={(e) => setSets(Math.max(1, Math.trunc(Number(e.target.value)) || 1))}
              />
            </div>
            <div className="muted-note" style={{ marginTop: 6 }}>
              One set covers one opening
            </div>
          </div>

          {quote ? (
            <>
              <div className="vinyldesc" data-testid="vinyl-desc">
                {quote.description}
              </div>
              <div className="vinyltotals">
                <span>
                  Quantity <b data-testid="vinyl-qty">{quote.feet}</b> ft
                </span>
                <span className="vinylprice" data-testid="vinyl-total">
                  {fmt(quote.total)}
                </span>
              </div>
              <div className="vinylfoot">
                <CopyButton text={quote.description} label="Copy description" primary testId="vinyl-copy-desc" />
                <CopyButton text={String(quote.feet)} label="Copy quantity" testId="vinyl-copy-qty" />
                <CopyButton text={fmt(quote.total)} label="Copy price" testId="vinyl-copy-price" />
              </div>
            </>
          ) : (
            <div className="vinyldesc muted-note" data-testid="vinyl-none">
              {color
                ? `${color} is not stocked long enough for a ${widthFt}\u2032 x ${heightFt}\u2032 opening — order this as a special order.`
                : "Select a color to price the molding."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
