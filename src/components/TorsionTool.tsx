"use client";

import { useState } from "react";
import { useCustomerJob } from "@/components/CustomerJobFields";
import { TORSION, ID_ORDER, torsionPrice, fmtWire } from "@/lib/pricing/data/torsion";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function TorsionTool() {
  const { custName, custPo, custJob } = useCustomerJob();
  const [id, setId] = useState("2");
  const [wire, setWire] = useState("");
  const [length, setLength] = useState("");
  const [saved, setSaved] = useState(false);

  const wires = TORSION.stock_wires[id] ?? Object.keys(TORSION.ppi).filter((w) => TORSION.ppi[w][id] != null);
  const len = parseFloat(length);
  const price = wire && Number.isFinite(len) && len > 0 ? torsionPrice(wire, id, len) : null;

  function pickId(v: string) { setId(v); setWire(""); setSaved(false); }

  async function saveQuote() {
    if (price == null) return;
    await fetch("/api/estimates", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteType: "spring",
        model: "Torsion spring", size: `${fmtWire(wire)}″ × ${TORSION.id_labels[id]} × ${len}″`,
        style: null, color: null,
        unitPrice: price, qty: 1, total: price,
        description: `Torsion spring cut to size — ${fmtWire(wire)}″ wire, ${TORSION.id_labels[id]}, ${len}″ long`,
        customer: custName, poNumber: custPo, jobName: custJob,
      }),
    }).then(() => setSaved(true)).catch(() => {/* ignore */});
  }

  return (
    <div className="wrap two">
      <section className="config-col">
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
                  <select data-testid="tor-wire" value={wire} onChange={(e) => { setWire(e.target.value); setSaved(false); }}>
                    <option value="">Select…</option>
                    {wires.map((w) => <option key={w} value={w}>{fmtWire(w)}″ wire</option>)}
                  </select>
                </div>
              </div>
              <div className="field"><label className="lbl">Length (inches) <span className="req">*</span></label>
                <input data-testid="tor-length" type="text" inputMode="decimal" value={length} onChange={(e) => { setLength(e.target.value); setSaved(false); }} placeholder="e.g. 24.5" />
              </div>
            </div>
            {id === "6" && <div className="note">6″ ID springs include filler at ${TORSION.filler_per_inch}/inch.</div>}
            <div className="note">If a wire size isn&apos;t priced, the next larger priced wire is used automatically. Springs are cut to size in our shop — ready within 2 hours of your call.</div>
          </div>
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Torsion spring</div>
            <div className="qmodel">Cut to size</div>
            <div className="qsub">{wire ? `${fmtWire(wire)}″ · ${TORSION.id_labels[id]}` : "Select options"}</div>
          </div>
          {price == null ? (
            <div className="lines" />
          ) : (
            <>
              <div className="total" style={{ borderTop: 0, paddingTop: 18 }}>
                <span className="tl">Spring price (each)</span>
                <span className="tv" data-testid="tor-price">{fmt(price)}</span>
              </div>
              <div className="note" style={{ margin: "0 20px 16px" }}>
                {fmtWire(wire)}″ wire · {TORSION.id_labels[id]} · {len}″ long
              </div>
              <div className="qfoot">
                <button className="btn" type="button" onClick={() => { setWire(""); setLength(""); setSaved(false); }}>Clear</button>
                {saved
                  ? <span className="muted-note">Saved to estimates ✓</span>
                  : <button className="btn" type="button" onClick={saveQuote}>Save quote</button>}
                <button className="btn primary" type="button" onClick={() => window.print()}>Print</button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
