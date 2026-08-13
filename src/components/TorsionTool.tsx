"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import { useCustomerJob } from "@/components/CustomerJobFields";
import { SpringPicker } from "@/components/SpringPicker";
import { TORSION, ID_ORDER, torsionPrice, fmtWire, springDescription } from "@/lib/pricing/data/torsion";
import { STOCK_TORSION_SPRINGS } from "@/lib/pricing/data/springs";
import { partDescription, partPrice, partQuantity } from "@/lib/pricing/data/parts";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function TorsionTool() {
  const { custName, custPo, custJob } = useCustomerJob();
  const [id, setId] = useState("2");
  const [wire, setWire] = useState("");
  const [length, setLength] = useState("");
  // Hand counts default to 0/0 — the description then reads as the bare spring
  // spec, with no quantities appended.
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(0);
  // Two jobs on one tab, one at a time. The switch below decides which is on
  // screen AND which drives the quote card, so there is never a total on the
  // card sourced from something you cannot see. Both sets of state survive the
  // switch — flip to check a stock size and your cut-to-size entry is still
  // there when you flip back.
  const [view, setView] = useState<"config" | "stock">("config");
  const [stockName, setStockName] = useState<string | null>(null);
  const [stockRight, setStockRight] = useState(1);
  const [stockLeft, setStockLeft] = useState(1);

  const wires = TORSION.stock_wires[id] ?? Object.keys(TORSION.ppi).filter((w) => TORSION.ppi[w][id] != null);
  const len = parseFloat(length);
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
        model: "Torsion spring", size: `${fmtWire(wire)}″ × ${TORSION.id_labels[id]} × ${len}″`,
        style: null, color: null,
        unitPrice: price, qty: n, total: price * n,
        description, customer: custName, poNumber: custPo, jobName: custJob,
      }),
    }).catch(() => {/* ignore */});
  }

  function pickId(v: string) { setId(v); setWire(""); }
  function pickStock(name: string) { setStockName(name); setStockRight(1); setStockLeft(1); }
  function clear() {
    setWire(""); setLength(""); setRight(0); setLeft(0);
    setStockName(null); setStockRight(1); setStockLeft(1);
  }

  return (
    <>
    <div className="wrap two">
      <section className="config-col">
        <div className="modeswitch" role="tablist" aria-label="Spring source">
          <button
            type="button" role="tab" data-testid="mode-stock"
            aria-selected={view === "stock"}
            className={`modebtn ${view === "stock" ? "sel" : ""}`}
            onClick={() => setView("stock")}
          >
            Stock springs
            <span className="modesub">{STOCK_TORSION_SPRINGS.items.length} off the shelf</span>
          </button>
          <button
            type="button" role="tab" data-testid="mode-config"
            aria-selected={view === "config"}
            className={`modebtn ${view === "config" ? "sel" : ""}`}
            onClick={() => setView("config")}
          >
            Spring configurator
            <span className="modesub">Cut to size</span>
          </button>
        </div>

        {view === "config" && (
        <div className="panel">
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
            <div className="row2">
              <div className="field"><label className="lbl">Wire size <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="tor-wire" value={wire} onChange={(e) => setWire(e.target.value)}>
                    <option value="">Select…</option>
                    {wires.map((w) => <option key={w} value={w}>{fmtWire(w)}″ wire</option>)}
                  </select>
                </div>
              </div>
              <div className="field"><label className="lbl">Length (inches) <span className="req">*</span></label>
                <input data-testid="tor-length" type="text" inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g. 24.5" />
              </div>
            </div>
          </div>
        </div>
        )}

        {view === "stock" && (
        <div className="panel">
          <SpringPicker
            category={STOCK_TORSION_SPRINGS}
            picked={stockName}
            onPick={pickStock}
            testId="stock"
            heading="Pick a stock spring"
          />
        </div>
        )}
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Torsion spring</div>
            <div className="qmodel">{onStock ? "Stock" : "Cut to size"}</div>
            <div className="qsub">
              {onStock
                ? (stockPart?.sub ?? STOCK_TORSION_SPRINGS.name)
                : wire ? `${fmtWire(wire)}″ · ${TORSION.id_labels[id]}` : "Select options"}
            </div>
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
              <div className="descbox no-print">
                <div className="desclbl">Spring description</div>
                <div className="desctext" data-testid="stock-desc">{stockDesc}</div>
              </div>

              <div className="row2" style={{ margin: "0 20px 16px" }}>
                <div className="field">
                  <label className="lbl">Right springs (red)</label>
                  <input
                    data-testid="stock-right" type="number" min={0} value={stockRight}
                    onChange={(e) => setStockRight(Math.max(0, Math.trunc(Number(e.target.value)) || 0))}
                  />
                </div>
                <div className="field">
                  <label className="lbl">Left springs (black)</label>
                  <input
                    data-testid="stock-left" type="number" min={0} value={stockLeft}
                    onChange={(e) => setStockLeft(Math.max(0, Math.trunc(Number(e.target.value)) || 0))}
                  />
                </div>
              </div>

              <div className="muted-note" style={{ margin: "0 20px 14px" }}>
                Quantity {stockQty} · QuickBooks item {QB_ITEMS.parts}
              </div>

              {stockReady ? (
                <div className="qfoot">
                  <CopyButton text={stockDesc} label="Copy description" primary testId="stock-copy-desc" />
                  <CopyButton text={fmt(stockUnit)} label="Copy price" testId="stock-copy-price" />
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
              <div className="descbox no-print">
                <div className="desclbl">Spring description</div>
                <div className="desctext" data-testid="tor-desc">{description}</div>
              </div>

              <div className="row2" style={{ margin: "0 20px 16px" }}>
                <div className="field">
                  <label className="lbl">Right springs (red)</label>
                  <input
                    data-testid="tor-right" type="number" min={0} value={right}
                    onChange={(e) => setRight(Math.max(0, Math.trunc(Number(e.target.value)) || 0))}
                  />
                </div>
                <div className="field">
                  <label className="lbl">Left springs (black)</label>
                  <input
                    data-testid="tor-left" type="number" min={0} value={left}
                    onChange={(e) => setLeft(Math.max(0, Math.trunc(Number(e.target.value)) || 0))}
                  />
                </div>
              </div>

              <div className="qfoot">
                <CopyButton text={description} label="Copy description" primary onCopy={record} testId="tor-copy-desc" />
                <CopyButton text={fmt(price)} label="Copy price" onCopy={record} testId="tor-copy-price" />
                <button className="btn" type="button" onClick={clear}>Clear</button>
              </div>
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
        rate={fmt(stockUnit).replace("$", "")}
      />
    ) : !onStock && price != null ? (
      <QbLineDemo
        model="Torsion spring"
        size={`${id} ID \u00b7 ${wire} wire \u00b7 ${len}\u2033`}
        item={QB_ITEMS.spring}
        typed="SPR"
        description={description.toUpperCase()}
        rate={fmt(price).replace("$", "")}
      />
    ) : null}
    </>
  );
}
