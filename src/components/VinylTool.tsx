"use client";

import { useState } from "react";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { QB_VINYL } from "@/lib/pricing/data/quickbooks";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import { vinylForPieces, VINYL_COLORS, VINYL_STOCK } from "@/lib/pricing/data/vinyl";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** "WALNUT FINISH" -> "Walnut Finish", for the stock heading. */
const title = (c: string) => c.toLowerCase().replace(/\b\w/g, (m) => m.toUpperCase());

/** A box of vinyl holds 15 pieces (Brandon's wireframe, 7/10/2026). */
const PIECES_PER_BOX = 15;

type Line = { id: number; ft: number | null; qty: string };

/**
 * Vinyl stop molding, picked by the piece — Brandon's wireframe, 7/10/2026.
 *
 * The colour (White to start), then a line for each stock length wanted: the
 * size from the colour's stock lengths and how many, with − and + or typed in.
 * "Add a size" starts another line. The colour's stock lengths are listed
 * underneath, so the counter can see what there is.
 *
 * It bills the way door vinyl always has: the QuickBooks quantity is the total
 * footage and the rate is the colour's price per foot, under its own VINYL
 * item. A door measured on the Residential tab still gets its vinyl worked out
 * from the door size (vinylForDoor); this tab is for ordering pieces outright.
 */
export function VinylTool() {
  const [color, setColor] = useState("WHITE");
  const [nextId, setNextId] = useState(2);
  const [lines, setLines] = useState<Line[]>([{ id: 1, ft: null, qty: "1" }]);

  const stock = VINYL_STOCK[color] ?? [];
  const count = (l: Line) => Math.max(0, Math.trunc(Number(l.qty) || 0));
  const order = vinylForPieces(color, lines.map((l) => ({ ft: l.ft, count: count(l) })));

  const setLine = (id: number, change: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...change } : l)));
  const step = (l: Line, by: number) => setLine(l.id, { qty: String(Math.max(1, count(l) + by)) });
  const addLine = () => {
    setLines((ls) => [...ls, { id: nextId, ft: null, qty: "1" }]);
    setNextId((n) => n + 1);
  };
  const removeLine = (id: number) => setLines((ls) => (ls.length > 1 ? ls.filter((l) => l.id !== id) : ls));
  // A new colour keeps the lines, but a size it is not stocked in is cleared.
  const pickColor = (c: string) => {
    setColor(c);
    setLines((ls) => ls.map((l) => (l.ft != null && !(VINYL_STOCK[c] ?? []).includes(l.ft) ? { ...l, ft: null } : l)));
  };
  const clear = () => {
    setLines([{ id: nextId, ft: null, qty: "1" }]);
    setNextId((n) => n + 1);
  };

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
                      <select data-testid="vinyl-color" value={color} onChange={(e) => pickColor(e.target.value)}>
                        {VINYL_COLORS.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grow vgrow">
                    <label>Pieces</label>
                    <div className="vlines">
                      <div className="vline vhead" aria-hidden="true">
                        <span>Size</span>
                        <span>Qty</span>
                      </div>
                      {lines.map((l, i) => (
                        <div className="vline" key={l.id} data-testid="vinyl-line">
                          <div className="selectwrap">
                            <select
                              data-testid={`vinyl-size-${i}`}
                              aria-label="Size"
                              value={l.ft ?? ""}
                              onChange={(e) => setLine(l.id, { ft: e.target.value ? Number(e.target.value) : null })}
                            >
                              <option value="">Size…</option>
                              {stock.map((ft) => (
                                <option key={ft} value={ft}>{ft}FT</option>
                              ))}
                            </select>
                          </div>
                          <div className="stepper">
                            <button type="button" data-testid={`vinyl-minus-${i}`} aria-label="One fewer"
                              disabled={count(l) <= 1} onClick={() => step(l, -1)}>−</button>
                            <input
                              data-testid={`vinyl-count-${i}`}
                              aria-label="Quantity"
                              type="number"
                              min={1}
                              value={l.qty}
                              onChange={(e) => setLine(l.id, { qty: e.target.value })}
                            />
                            <button type="button" data-testid={`vinyl-plus-${i}`} aria-label="One more"
                              onClick={() => step(l, 1)}>+</button>
                          </div>
                          {lines.length > 1 ? (
                            <button type="button" className="vline-del" data-testid={`vinyl-remove-${i}`}
                              aria-label="Remove this size" onClick={() => removeLine(l.id)}>×</button>
                          ) : (
                            <span className="vline-del-space" />
                          )}
                        </div>
                      ))}
                      <button type="button" className="btn vline-add" data-testid="vinyl-add-line" onClick={addLine}>
                        + Add a size
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>

              <div className="ggroup" style={{ marginTop: 14 }}>
                <div className="ghdr">Stock {title(color)} vinyl</div>
                <div className="vstock" data-testid="vinyl-stock">
                  {stock.map((ft) => (
                    <span key={ft} className="vstock-ft">{ft}FT</span>
                  ))}
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
            </div>

            {order ? (
              <>
                <div className="total">
                  <span>
                    Quantity <b data-testid="vinyl-qty">{order.feet}</b> ft
                  </span>
                  <b data-testid="vinyl-total">{fmt(order.total)}</b>
                </div>
                <div className="qfoot">
                  <CopyQuickBooks item={QB_VINYL} description={order.description} rate={order.pricePerFt} qty={order.feet} testId="vinyl-copy-qb" />
                  <button className="btn" type="button" data-testid="vinyl-clear" onClick={clear}>
                    Clear
                  </button>
                </div>
              </>
            ) : (
              <div className="empty">
                <div className="emptymsg">Pick a size to price the molding</div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {order && (
        <QbLineDemo
          model="Vinyl stop molding"
          size={order.pieces.map((p) => `${p.count} x ${p.ft}′`).join(" · ")}
          item={QB_ITEMS.vinyl}
          typed="VIN"
          description={order.description}
          qty={String(order.feet)}
          rate={order.pricePerFt.toFixed(2)}
        />
      )}
    </>
  );
}
