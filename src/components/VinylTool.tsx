"use client";

import { useState } from "react";
import { CopyButton, CopyPrice, priceText } from "@/components/CopyButton";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import { vinylForDoor, VINYL_COLORS } from "@/lib/pricing/data/vinyl";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Vinyl stop molding.
 *
 * Its own tab rather than a row on the parts shelf, because it is measured off
 * a door opening instead of picked by name: one piece across the header at the
 * door's width, two down the sides at its height, each filled with the smallest
 * stock length that reaches. Stock lengths differ sharply by colour, so a 12ft
 * door is one 12ft piece in white and a 16ft piece in anything else.
 *
 * It also bills the opposite way to the per-foot parts — the QuickBooks
 * quantity is the total footage and the rate is the per-foot figure — which is
 * why it carries its own item and its own Copy quantity button.
 */
export function VinylTool() {
  const [color, setColor] = useState(VINYL_COLORS[0]);
  const [widthFt, setWidthFt] = useState("");
  const [heightFt, setHeightFt] = useState("");

  const w = Math.trunc(Number(widthFt) || 0);
  const h = Math.trunc(Number(heightFt) || 0);
  const sized = w > 0 && h > 0;
  const quote = sized ? vinylForDoor(color, w, h) : null;

  return (
    <>
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="ggroup">
                <div className="ghdr">Vinyl stop molding</div>
                <div className="gbody">
                  <div className="grow">
                    <label>Color</label>
                    <div className="ctl selectwrap">
                      <select
                        data-testid="vinyl-color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      >
                        {VINYL_COLORS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grow">
                    <label>Door width (ft)</label>
                    <div className="ctl">
                      <input
                        data-testid="vinyl-w"
                        type="number"
                        min={1}
                        value={widthFt}
                        onChange={(e) => setWidthFt(e.target.value)}
                        placeholder="e.g. 16"
                      />
                    </div>
                  </div>

                  <div className="grow">
                    <label>Door height (ft)</label>
                    <div className="ctl">
                      <input
                        data-testid="vinyl-h"
                        type="number"
                        min={1}
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="e.g. 7"
                      />
                    </div>
                    <div className="muted-note" style={{ marginTop: 6 }}>
                      One piece across the header, two down the sides
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="quote">
          <div className="qcard">
            <div className="qhead">
              <div className="qeyebrow">Vinyl quote</div>
              <div className="qtitle">{color}</div>
              <div className="qsub">QuickBooks item: {QB_ITEMS.vinyl}</div>
            </div>

            {quote ? (
              <>
                <div className="descbox no-print">
                  <div className="desclbl">Molding description</div>
                  <div className="desctext" data-testid="vinyl-desc">
                    {quote.description}
                  </div>
                </div>
                <div className="total">
                  <span>
                    Quantity <b data-testid="vinyl-qty">{quote.feet}</b> ft
                  </span>
                  <b data-testid="vinyl-total">{fmt(quote.total)}</b>
                </div>
                <div className="qfoot">
                  <CopyButton text={quote.description} label="Copy description" primary testId="vinyl-copy-desc" />
                  <CopyButton text={String(quote.feet)} label="Copy quantity" testId="vinyl-copy-qty" />
                  <CopyPrice amount={quote.total} testId="vinyl-copy-price" />
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      setWidthFt("");
                      setHeightFt("");
                    }}
                  >
                    Clear
                  </button>
                </div>
              </>
            ) : (
              <div className="empty">
                <div className="emptymsg">
                  {sized
                    ? `${color} is not stocked long enough for a ${w}′ x ${h}′ opening — special order it.`
                    : "Enter the door size to price the molding"}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {quote && (
        <QbLineDemo
          model="Vinyl stop molding"
          size={`${color} · ${w}′ x ${h}′`}
          item={QB_ITEMS.vinyl}
          typed="VIN"
          description={quote.description}
          qty={String(quote.feet)}
          rate={quote.pricePerFt.toFixed(2)}
        />
      )}
    </>
  );
}
