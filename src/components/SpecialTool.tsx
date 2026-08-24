"use client";

import { useState } from "react";
import { useCustomerJob } from "@/components/CustomerJobFields";
import { CopyButton, CopyPrice, priceText } from "@/components/CopyButton";
import { SPECIAL, SPECIAL_COMMERCIAL } from "@/lib/pricing/data/special-orders";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Ported 1:1 from the production tool's soNumbers():
//   multiplier series: cost = Clopay list × multiplier, sell = cost / (1 - cost_margin/100)
//   margin series:     sell = list / (1 - margin/100); Ultra Grain swaps in the UG margin (no $ adder)
function soNumbers(series: string, model: string, kind: "door" | "section", priceStr: string) {
  const ser = SPECIAL[series];
  const list = parseFloat(priceStr);
  if (!ser || Number.isNaN(list)) return null;
  let costBasis: number, margin: number;
  if (ser.type === "multiplier") {
    // A cheap section costs the same to handle and freight as an expensive one,
    // so anything under the threshold is doubled before margin is applied.
    const small =
      kind === "section" &&
      ser.small_section_under != null &&
      list < ser.small_section_under;
    costBasis = list * (small ? 2 : 1) * ser.multiplier;
    margin = kind === "section" ? (ser.section_margin ?? ser.cost_margin) : ser.cost_margin;
  } else {
    const md = ser.models[model];
    if (!md) return null;
    // FLAT MARGIN. The counter enters the Clopay portal TOTAL (subtotal +
    // energy surcharge, no MPQ), which already carries any Ultra Grain premium
    // Clopay charged. So the model's own margin applies and nothing is swapped
    // in. SPECIAL.ug_margin and SPECIAL.ug (the $216.72 / $433.51 single and
    // double adders) are left in the data, unused, against a future change of
    // input basis — they are list-side figures, not sell-side.
    margin = kind === "section" ? md.section : md.door;
    costBasis = list;
  }
  return { sell: costBasis / (1 - margin / 100), margin };
}

// Commercial special orders: Clopay 3200/524 — 45% margin complete door, 49% sections.
function soCommercial(mfr: string, kind: "door" | "section", priceStr: string) {
  const cfg = SPECIAL_COMMERCIAL[mfr];
  const list = parseFloat(priceStr);
  if (!cfg || Number.isNaN(list)) return null;
  const margin = kind === "section" ? cfg.section : cfg.door;
  return { sell: list / (1 - margin / 100), margin };
}

export function SpecialTool() {
  const { custName, custPo, custJob } = useCustomerJob();
  const [scope, setScope] = useState<"residential" | "commercial">("residential");
  // residential
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
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
      ? series ? soNumbers(series, model, kind, price) : null
      : cModel ? soCommercial(cMfr, kind, price) : null;
  const total = n ? n.sell * Math.max(1, qty) : 0;

  const label =
    scope === "residential"
      ? ser?.type === "multiplier"
        ? `${series} special order`
        : `${model} ${kind === "section" ? "sections" : "door"}`
      : `${cMfr} ${cModel} ${kind === "section" ? "sections" : "complete door"}`;

  function pickScope(v: "residential" | "commercial") {
    setScope(v); setSeries(""); setModel(""); setCModel(""); setKind("door"); setPrice(""); setSaved(false);
  }
  function pickSeries(v: string) {
    setSeries(v); setModel(""); setKind("door"); setPrice(""); setSaved(false);
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
        // The entered list value is kept for audit; the MARGIN is not written into
        // the stored description — semi-admins can read the estimates table.
        description: `${label} — Clopay list ${price}`,
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
              {ser.section_margin != null && (
                <div className="field">
                  <label className="lbl">Ordering</label>
                  <div className="chips">
                    <button type="button" className={`chip ${kind === "door" ? "sel" : ""}`} onClick={() => { setKind("door"); setSaved(false); }}>Door</button>
                    <button type="button" className={`chip ${kind === "section" ? "sel" : ""}`} onClick={() => { setKind("section"); setSaved(false); }}>Sections</button>
                  </div>
                </div>
              )}
              <div className="field" style={{ marginTop: 4 }}>
                <label className="lbl">Enter total = sub total + energy surcharge — do not apply MPQ <span className="req">*</span></label>
                <input type="text" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); setSaved(false); }} placeholder="0.00" />
                {kind === "section" && ser.small_section_under != null && (
                  <div className="muted-note" style={{ marginTop: 6 }}>
                    Sections under ${ser.small_section_under} are doubled before margin
                  </div>
                )}
              </div>
            </div>
          )}

          {scope === "residential" && ser && ser.type === "margin" && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{series} model</h3></div>
              <div className="field"><label className="lbl">Model <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="so-model" value={model} onChange={(e) => { setModel(e.target.value); setSaved(false); }}>
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
                    <div />
                  </div>
                  <div className="field" style={{ marginTop: 6 }}>
                    <label className="lbl">Enter total = sub total + energy surcharge — do not apply MPQ <span className="req">*</span></label>
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
              </div>
              <div className="field" style={{ marginTop: 6 }}>
                <label className="lbl">Enter total = sub total + energy surcharge — do not apply MPQ <span className="req">*</span></label>
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
                <CopyButton text={label.toUpperCase()} label="Copy description" primary onCopy={saveQuote} testId="so-copy-desc" />
                <CopyPrice amount={total} onCopy={saveQuote} testId="so-copy-price" />
                <button className="btn" type="button" onClick={() => pickScope(scope)}>Clear</button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
