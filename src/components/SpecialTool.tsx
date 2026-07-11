"use client";

import { useState } from "react";
import { useCustomerJob } from "@/components/CustomerJobFields";
import { SPECIAL, SPECIAL_COMMERCIAL } from "@/lib/pricing/data/special-orders";

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

// Commercial special orders: Clopay 3200/524 — 45% margin complete door, 49% sections.
function soCommercial(mfr: string, kind: "door" | "section", priceStr: string) {
  const cfg = SPECIAL_COMMERCIAL[mfr];
  const list = parseFloat(priceStr);
  if (!cfg || Number.isNaN(list)) return null;
  const margin = kind === "section" ? cfg.section : cfg.door;
  return { sell: list / (1 - margin / 100), margin, ugSel: false };
}

export function SpecialTool() {
  const { custName, custPo, custJob } = useCustomerJob();
  const [scope, setScope] = useState<"residential" | "commercial">("residential");
  // residential
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  const [ug, setUg] = useState(false);
  // commercial
  const [cMfr, setCMfr] = useState("Clopay");
  const [cModel, setCModel] = useState("");
  // shared
  const [kind, setKind] = useState<"door" | "section">("door");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);

  const ser = series ? SPECIAL[series] : null;
  const md = ser && ser.type === "margin" && model ? ser.models[model] : null;

  const n =
    scope === "residential"
      ? series ? soNumbers(series, model, kind, ug, price) : null
      : cModel ? soCommercial(cMfr, kind, price) : null;
  const total = n ? n.sell * Math.max(1, qty) : 0;

  const label =
    scope === "residential"
      ? ser?.type === "multiplier"
        ? `${series} special order`
        : `${model} ${kind === "section" ? "sections" : "door"}${n?.ugSel ? ", Ultra Grain" : ""}`
      : `${cMfr} ${cModel} ${kind === "section" ? "sections" : "complete door"}`;

  function pickScope(v: "residential" | "commercial") {
    setScope(v); setSeries(""); setModel(""); setCModel(""); setKind("door"); setUg(false); setPrice(""); setSaved(false);
  }
  function pickSeries(v: string) {
    setSeries(v); setModel(""); setKind("door"); setUg(false); setPrice(""); setSaved(false);
  }

  async function saveQuote() {
    if (!n) return;
    const nQty = Math.max(1, qty);
    await fetch("/api/estimates", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteType: "special",
        model: scope === "residential" ? `${series}${model ? " " + model : ""}` : `${cMfr} ${cModel}`,
        size: kind === "section" ? "Sections" : "Door",
        style: scope, color: null,
        unitPrice: n.sell, qty: nQty, total: n.sell * nQty,
        description: `Special order — ${label} — Clopay list ${price} @ ${n.margin}% margin`,
        customer: custName, poNumber: custPo, jobName: custJob,
      }),
    }).then(() => setSaved(true)).catch(() => {/* ignore */});
  }

  return (
    <div className="wrap two">
      <section className="config-col">
        <div className="panel">
          <div className="step">
            <div className="step-h"><span className="step-n">1</span><h3>Select series</h3><span className="hint">Special order</span></div>
            <div className="field"><label className="lbl">Order type</label>
              <div className="chips">
                <button type="button" className={`chip ${scope === "residential" ? "sel" : ""}`} onClick={() => pickScope("residential")}>Residential</button>
                <button type="button" className={`chip ${scope === "commercial" ? "sel" : ""}`} onClick={() => pickScope("commercial")}>Commercial</button>
              </div>
            </div>

            {scope === "residential" ? (
              <div className="field"><label className="lbl">Collection / series <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="so-series" value={series} onChange={(e) => pickSeries(e.target.value)}>
                    <option value="">Select…</option>
                    {Object.keys(SPECIAL).map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            ) : (
              <>
                <div className="field"><label className="lbl">Manufacturer <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select value={cMfr} onChange={(e) => { setCMfr(e.target.value); setCModel(""); setSaved(false); }}>
                      {Object.keys(SPECIAL_COMMERCIAL).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field"><label className="lbl">Model <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select data-testid="so-comm-model" value={cModel} onChange={(e) => { setCModel(e.target.value); setSaved(false); }}>
                      <option value="">Select…</option>
                      {(SPECIAL_COMMERCIAL[cMfr]?.models ?? []).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              </>
            )}
          </div>

          {scope === "residential" && ser && ser.type === "multiplier" && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{series}</h3></div>
              <div className="field" style={{ marginTop: 4 }}>
                <label className="lbl">Clopay list price <span className="req">*</span></label>
                <input type="text" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); setSaved(false); }} placeholder="0.00" />
                <div className="note">Sell = list × {ser.multiplier} cost, at a {ser.cost_margin}% margin.</div>
              </div>
            </div>
          )}

          {scope === "residential" && ser && ser.type === "margin" && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{series} model</h3></div>
              <div className="field"><label className="lbl">Model <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="so-model" value={model} onChange={(e) => { setModel(e.target.value); setUg(false); setSaved(false); }}>
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
                        <button type="button" className={`chip ${kind === "door" ? "sel" : ""}`} onClick={() => { setKind("door"); setSaved(false); }}>Door</button>
                        <button type="button" className={`chip ${kind === "section" ? "sel" : ""}`} onClick={() => { setKind("section"); setSaved(false); }}>Sections</button>
                      </div>
                    </div>
                    {md.ug ? (
                      <div className="field"><label className="lbl">Finish</label>
                        <div className="chips">
                          <button type="button" className={`chip ${!ug ? "sel" : ""}`} onClick={() => { setUg(false); setSaved(false); }}>Standard color</button>
                          <button type="button" className={`chip ${ug ? "sel" : ""}`} onClick={() => { setUg(true); setSaved(false); }}>Ultra Grain</button>
                        </div>
                      </div>
                    ) : <div />}
                  </div>
                  <div className="field" style={{ marginTop: 6 }}>
                    <label className="lbl">Clopay list / total <span className="req">*</span></label>
                    <input type="text" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); setSaved(false); }} placeholder="0.00" />
                  </div>
                </>
              )}
            </div>
          )}

          {scope === "commercial" && cModel && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{cMfr} {cModel}</h3></div>
              <div className="field"><label className="lbl">Ordering</label>
                <div className="chips">
                  <button type="button" className={`chip ${kind === "door" ? "sel" : ""}`} onClick={() => { setKind("door"); setSaved(false); }}>Complete door</button>
                  <button type="button" className={`chip ${kind === "section" ? "sel" : ""}`} onClick={() => { setKind("section"); setSaved(false); }}>Sections</button>
                </div>
                <div className="note">Complete door at a 45% margin · sections at a 49% margin.</div>
              </div>
              <div className="field" style={{ marginTop: 6 }}>
                <label className="lbl">Clopay list / total <span className="req">*</span></label>
                <input data-testid="so-comm-price" type="text" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); setSaved(false); }} placeholder="0.00" />
              </div>
            </div>
          )}
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Special order</div>
            <div className="qmodel">{scope === "residential" ? series || "—" : `${cMfr} ${cModel || "—"}`}</div>
            <div className="qsub">
              {scope === "residential"
                ? ser ? (ser.type === "multiplier" ? "Special order" : model ? `${model} · ${kind === "section" ? "Sections" : "Door"}` : "Select a model") : "Select a series"
                : cModel ? (kind === "section" ? "Sections" : "Complete door") : "Select a model"}
            </div>
          </div>
          {!n ? (
            <div className="lines" />
          ) : (
            <>
              <div className="lines">
                <div className="qline">
                  <span className="nm">{label}</span>
                  <span className="vl" data-testid="so-sell">{fmt(n.sell)}</span>
                </div>
              </div>
              <div className="qtyrow">
                <label htmlFor="soqty">Quantity</label>
                <input id="soqty" type="number" min={1} value={qty} onChange={(e) => { setQty(Number(e.target.value)); setSaved(false); }} />
              </div>
              <div className="total">
                <span className="tl">Quote total</span>
                <span className="tv">{fmt(total)}</span>
              </div>
              <div className="qfoot">
                <button className="btn" type="button" onClick={() => pickScope(scope)}>Clear</button>
                {saved
                  ? <span className="muted-note">Saved to estimates ✓</span>
                  : <button className="btn" type="button" onClick={saveQuote}>Save quote</button>}
                <button className="btn primary" type="button" onClick={() => window.print()}>Print quote</button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
