"use client";

import { useState } from "react";
import { SPECIAL } from "@/lib/pricing/data/special-orders";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Ported 1:1 from the production tool's soNumbers():
//   multiplier series: cost = Clopay list × multiplier, sell = cost / (1 - cost_margin/100)
//   margin series:     sell = list / (1 - margin/100); Ultra Grain swaps in the UG margin (no $ adder)
function soNumbers(series: string, model: string, kind: "door" | "section", ug: boolean, priceStr: string) {
  const ser = SPECIAL[series];
  const list = parseFloat(priceStr);
  if (!ser || Number.isNaN(list)) return null;
  let costBasis: number, margin: number, ugSel = false;
  if (ser.type === "multiplier") {
    costBasis = list * ser.multiplier;
    margin = ser.cost_margin;
  } else {
    const md = ser.models[model];
    if (!md) return null;
    margin = kind === "section" ? md.section : md.door;
    if (md.ug && ug) { ugSel = true; margin = ser.ug_margin != null ? ser.ug_margin : 43; }
    costBasis = list;
  }
  return { sell: costBasis / (1 - margin / 100), margin, ugSel };
}

export function SpecialTool() {
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [kind, setKind] = useState<"door" | "section">("door");
  const [ug, setUg] = useState(false);
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);

  const ser = series ? SPECIAL[series] : null;
  const md = ser && ser.type === "margin" && model ? ser.models[model] : null;
  const n = series ? soNumbers(series, model, kind, ug, price) : null;
  const total = n ? n.sell * Math.max(1, qty) : 0;

  function pickSeries(v: string) {
    setSeries(v); setModel(""); setKind("door"); setUg(false); setPrice("");
  }

  return (
    <div className="wrap two">
      <section className="config-col">
        <div className="panel">
          <div className="step">
            <div className="step-h"><span className="step-n">1</span><h3>Select series</h3><span className="hint">Special order</span></div>
            <div className="field"><label className="lbl">Collection / series <span className="req">*</span></label>
              <div className="selectwrap">
                <select data-testid="so-series" value={series} onChange={(e) => pickSeries(e.target.value)}>
                  <option value="">Select…</option>
                  {Object.keys(SPECIAL).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          {ser && ser.type === "multiplier" && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{series}</h3></div>
              <div className="field" style={{ marginTop: 4 }}>
                <label className="lbl">Clopay list price <span className="req">*</span></label>
                <input type="text" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
                <div className="note">Sell = list × {ser.multiplier} cost, at a {ser.cost_margin}% margin.</div>
              </div>
            </div>
          )}

          {ser && ser.type === "margin" && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{series} model</h3></div>
              <div className="field"><label className="lbl">Model <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="so-model" value={model} onChange={(e) => { setModel(e.target.value); setUg(false); }}>
                    <option value="">Select…</option>
                    {Object.keys(ser.models).map((m) => <option key={m} value={m}>{m}{ser.models[m].new ? " (new)" : ""}</option>)}
                  </select>
                </div>
              </div>
              {md && (
                <>
                  <div className="row2">
                    <div className="field"><label className="lbl">Ordering</label>
                      <div className="chips">
                        <button type="button" className={`chip ${kind === "door" ? "sel" : ""}`} onClick={() => setKind("door")}>Door</button>
                        <button type="button" className={`chip ${kind === "section" ? "sel" : ""}`} onClick={() => setKind("section")}>Sections</button>
                      </div>
                    </div>
                    {md.ug ? (
                      <div className="field"><label className="lbl">Finish</label>
                        <div className="chips">
                          <button type="button" className={`chip ${!ug ? "sel" : ""}`} onClick={() => setUg(false)}>Standard color</button>
                          <button type="button" className={`chip ${ug ? "sel" : ""}`} onClick={() => setUg(true)}>Ultra Grain</button>
                        </div>
                      </div>
                    ) : <div />}
                  </div>
                  <div className="field" style={{ marginTop: 6 }}>
                    <label className="lbl">Clopay list / total <span className="req">*</span></label>
                    <input type="text" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Special order</div>
            <div className="qmodel">{series || "—"}</div>
            {ser && <div className="qsub">{ser.type === "multiplier" ? "Special order" : model ? `${model} · ${kind === "section" ? "Sections" : "Door"}${n?.ugSel ? " · Ultra Grain" : ""}` : "Select a model"}</div>}
          </div>
          {!n ? (
            <div className="lines" />
          ) : (
            <>
              <div className="lines">
                <div className="qline">
                  <span className="nm">{ser!.type === "multiplier" ? `${series} special order` : `${model} ${kind === "section" ? "sections" : "door"}${n.ugSel ? ", Ultra Grain" : ""}`}</span>
                  <span className="vl" data-testid="so-sell">{fmt(n.sell)}</span>
                </div>
              </div>
              <div className="qtyrow">
                <label htmlFor="soqty">Quantity</label>
                <input id="soqty" type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
              </div>
              <div className="total">
                <span className="tl">Quote total</span>
                <span className="tv">{fmt(total)}</span>
              </div>
              <div className="qfoot">
                <button className="btn" type="button" onClick={() => pickSeries(series)}>Clear</button>
                <button className="btn primary" type="button" onClick={() => window.print()}>Print quote</button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
