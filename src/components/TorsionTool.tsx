"use client";

import { useState } from "react";
import type { SearchPick } from "@/lib/search";
import { priceText } from "@/components/CopyButton";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { QB_TORSION } from "@/lib/pricing/data/quickbooks";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import { useCustomerJob } from "@/components/CustomerJobFields";
import { SpringPicker } from "@/components/SpringPicker";
import { Icon } from "./Icon";
import { TORSION, ID_ORDER, torsionPrice, fmtWire, springDescription, inchesText } from "@/lib/pricing/data/torsion";
import { STOCK_TORSION_SPRINGS } from "@/lib/pricing/data/springs";
import { partDescription, partPrice, partQuantity } from "@/lib/pricing/data/parts";
import { QtyStepper } from "./QtyStepper";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function TorsionTool({ openOn }: { openOn?: SearchPick } = {}) {
  const { custName, custPo, custJob } = useCustomerJob();
  const [id, setId] = useState("2");
  const [wire, setWire] = useState("");
  const [length, setLength] = useState("");
  // Whole inches are typed; the fraction is picked (Brandon, 1/10/2026).
  const [frac, setFrac] = useState("0");
  // Hand counts default to 0/0 — the description then reads as the bare spring
  // spec, with no quantities appended.
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(0);
  // Two jobs on one tab, one at a time. Whichever section is open decides what
  // is on screen AND what drives the quote card, so there is never a total on
  // the card sourced from something you cannot see. Both sets of state survive
  // — open Stock springs to check a size and your cut-to-size entry is still
  // there when you open the configurator again.
  // A stock spring chosen in the top bar's search opens the stock list on it.
  const [view, setView] = useState<"config" | "stock">(openOn?.kind === "spring" ? "stock" : "config");
  const [stockName, setStockName] = useState<string | null>(openOn?.kind === "spring" ? openOn.name : null);
  const [stockRight, setStockRight] = useState(1);
  const [stockLeft, setStockLeft] = useState(1);

  const wires = TORSION.stock_wires[id] ?? Object.keys(TORSION.ppi).filter((w) => TORSION.ppi[w][id] != null);
  const len = parseFloat(length) + parseFloat(frac);
  const price = wire && Number.isFinite(len) && len > 0 ? torsionPrice(wire, id, len) : null;

  const springs = Math.max(0, right) + Math.max(0, left);
  const description = price != null ? springDescription(wire, id, len, right, left) : "";

  const stockPart = stockName
    ? (STOCK_TORSION_SPRINGS.items.find((p) => p.name === stockName) ?? null)
    : null;
  const onStock = view === "stock";
  const stockDesc = stockPart ? partDescription(stockPart, 0, stockRight, stockLeft) : "";
  const stockUnit = stockPart ? partPrice(stockPart) : 0;
  const stockQty = stockPart ? partQuantity(stockPart, stockRight, stockLeft) : 0;
  const stockReady = onStock && stockPart != null && stockQty > 0;

  // Spring quotes are still recorded — copying now stands in for the old
  // "Save quote" button, so the admin dashboard keeps seeing them.
  async function record() {
    if (price == null) return;
    const n = springs || 1;
    await fetch("/api/estimates", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteType: "spring",
        model: "Torsion spring", size: `${fmtWire(wire)}″ × ${TORSION.id_labels[id]} × ${inchesText(len)}″`,
        style: null, color: null,
        unitPrice: price, qty: n, total: price * n,
        description, customer: custName, poNumber: custPo, jobName: custJob,
      }),
    }).catch(() => {/* ignore */});
  }

  function pickId(v: string) { setId(v); setWire(""); }
  function pickStock(name: string) { setStockName(name); setStockRight(1); setStockLeft(1); }
  function clear() {
    setWire(""); setLength(""); setFrac("0"); setRight(0); setLeft(0);
    setStockName(null); setStockRight(1); setStockLeft(1);
  }

  return (
    <>
    <div className="wrap two">
      <section className="config-col">
        {/* The configurator, with Stock springs at the bottom of it (Brandon,
            8/10/2026): opening Stock springs hides the configurator's options,
            and opening the configurator hides the list again. */}
        <div className="panel springacc">
          <button
            type="button" className="acc-head" data-testid="mode-config"
            aria-expanded={view === "config"}
            onClick={() => setView("config")}
          >
            <span className="acc-title">Spring configurator<span className="acc-sub">Cut to size</span></span>
            <Icon name="chevdown" />
          </button>
          {view === "config" && (
          <div className="acc-body">
          <div className="step">
            <div className="step-h"><span className="step-n">1</span><h3>Spring inside diameter</h3></div>
            <div className="chips">
              {ID_ORDER.map((k) => (
                <button key={k} type="button" className={`chip ${id === k ? "sel" : ""}`} onClick={() => pickId(k)}>
                  {TORSION.id_labels[k]}
                </button>
              ))}
            </div>
          </div>
          <div className="step">
            <div className="step-h"><span className="step-n">2</span><h3>Wire size &amp; length</h3></div>
            <div className="row2 compact">
              <div className="field"><label className="lbl">Wire size <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="tor-wire" value={wire} onChange={(e) => setWire(e.target.value)}>
                    <option value="">Select…</option>
                    {wires.map((w) => <option key={w} value={w}>{fmtWire(w)}″ wire</option>)}
                  </select>
                </div>
              </div>
              <div className="field"><label className="lbl">Length (inches) <span className="req">*</span></label>
                <div className="lenrow">
                  <input data-testid="tor-length" type="text" inputMode="numeric" value={length} onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g. 24" aria-label="Whole inches" />
                  <select data-testid="tor-length-frac" value={frac} onChange={(e) => setFrac(e.target.value)} aria-label="Fraction of an inch">
                    <option value="0">0</option>
                    <option value="0.25">1/4″</option>
                    <option value="0.5">1/2″</option>
                    <option value="0.75">3/4″</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          </div>
          )}

          <button
            type="button" className="acc-head" data-testid="mode-stock"
            aria-expanded={view === "stock"}
            onClick={() => setView(view === "stock" ? "config" : "stock")}
          >
            <span className="acc-title">
              Stock springs<span className="acc-sub">{STOCK_TORSION_SPRINGS.items.length} off the shelf</span>
            </span>
            <Icon name="chevdown" />
          </button>
          {view === "stock" && (
          <div className="acc-body">
            <SpringPicker
              category={STOCK_TORSION_SPRINGS}
              picked={stockName}
              onPick={pickStock}
              testId="stock"
              heading="Pick a stock spring"
            />
          </div>
          )}
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Torsion spring</div>
            <div className="qmodel">{onStock ? "Stock" : "Cut to size"}</div>
          </div>
          {onStock ? (
            stockPart == null ? (
              <div className="empty">
                <div className="emptymsg">Pick a stock spring from the list</div>
              </div>
            ) : (
            <>

              <div className="total" style={{ borderTop: 0, paddingTop: 18 }}>
                <span className="tl">Spring price (each)</span>
                <span className="tv" data-testid="stock-price">{fmt(stockUnit)}</span>
              </div>
              <div className="row2" style={{ margin: "0 20px 16px" }}>
                <div className="field">
                  <label className="lbl">Right Wound</label>
                  <QtyStepper testId="stock-right" min={0} value={stockRight} label="Right wound"
                    onChange={(v) => setStockRight(Math.max(0, Math.trunc(Number(v)) || 0))} />
                </div>
                <div className="field">
                  <label className="lbl">Left Wound</label>
                  <QtyStepper testId="stock-left" min={0} value={stockLeft} label="Left wound"
                    onChange={(v) => setStockLeft(Math.max(0, Math.trunc(Number(v)) || 0))} />
                </div>
              </div>


              {stockReady ? (
                <div className="qfoot">
                  <CopyQuickBooks item={QB_TORSION} description={stockDesc} rate={stockUnit} qty={stockRight + stockLeft} testId="stock-copy-qb" />
                  <button className="btn" type="button" onClick={clear}>Clear</button>
                </div>
              ) : (
                <div className="qfoot">
                  <span className="muted-note">Enter how many rights and lefts</span>
                  <button className="btn" type="button" onClick={clear}>Clear</button>
                </div>
              )}
            </>
            )
          ) : price == null ? (
            <div className="lines" />
          ) : (
            <>

              <div className="total" style={{ borderTop: 0, paddingTop: 18 }}>
                <span className="tl">Spring price (each)</span>
                <span className="tv" data-testid="tor-price">{fmt(price)}</span>
              </div>
              <div className="row2" style={{ margin: "0 20px 16px" }}>
                <div className="field">
                  <label className="lbl">RIGHT WOUND</label>
                  <QtyStepper testId="tor-right" min={0} value={right} label="Right wound"
                    onChange={(v) => setRight(Math.max(0, Math.trunc(Number(v)) || 0))} />
                </div>
                <div className="field">
                  <label className="lbl">LEFT WOUND</label>
                  <QtyStepper testId="tor-left" min={0} value={left} label="Left wound"
                    onChange={(v) => setLeft(Math.max(0, Math.trunc(Number(v)) || 0))} />
                </div>
              </div>

              {/* The quantity is the springs counted — [1] and [1] pastes 2 — so
                  there is nothing to paste until at least one is (30/9/2026). */}
              {right + left > 0 ? (
                <div className="qfoot">
                  <CopyQuickBooks item={QB_TORSION} description={description} rate={price} qty={right + left} onCopy={record} testId="tor-copy-qb" />
                  <button className="btn" type="button" onClick={clear}>Clear</button>
                </div>
              ) : (
                <div className="qfoot">
                  <span className="muted-note">Enter how many RIGHT WOUND and LEFT WOUND</span>
                  <button className="btn" type="button" onClick={clear}>Clear</button>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
    {stockReady ? (
      <QbLineDemo
        model={stockPart?.name ?? "Torsion spring"}
        size={stockPart?.sub ?? STOCK_TORSION_SPRINGS.name}
        item={QB_ITEMS.parts}
        typed="PAR"
        description={stockDesc.toUpperCase()}
        qty={String(stockQty)}
        rate={priceText(stockUnit)}
      />
    ) : !onStock && price != null ? (
      <QbLineDemo
        model="Torsion spring"
        size={`${id} ID \u00b7 ${wire} wire \u00b7 ${inchesText(len)}\u2033`}
        item={QB_ITEMS.spring}
        typed="SPR"
        description={description.toUpperCase()}
        rate={priceText(price)}
      />
    ) : null}
    </>
  );
}
