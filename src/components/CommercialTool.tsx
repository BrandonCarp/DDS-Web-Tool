"use client";

import { useCallback, useMemo, useState } from "react";
import { CustomerJobFields } from "@/components/CustomerJobFields";
import {
  COMM_COMPLETE, COMM_MATRIX_SIZES,
  SLAB_RATE, SLAB_LABEL, SLAB_ADDERS, commMfrs, commModelsFor, maxWindows, roundedFeet,
} from "@/lib/pricing/data/commercial-meta";

interface CommQuote {
  priced: boolean; incomplete?: string; warn?: string;
  lines: { name: string; value: number; kind: "base" | "add" | "minus" }[];
  unitPrice: number; sub: string; description?: string; stock?: { inStock: boolean };
}
const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function CommercialTool() {
  const [step, setStep] = useState<1 | 2>(1);
  const [mfr, setMfr] = useState("");
  const [model, setModel] = useState("");

  // complete-door config
  const [size, setSize] = useState("");
  const [glass, setGlass] = useState<"solid" | "glass">("solid");
  const [track, setTrack] = useState<"15R" | "FV" | "LHR">("15R");
  const [mount, setMount] = useState<"continuous" | "reverse">("continuous");
  const [cspring, setCspring] = useState<"torsion" | "extension">("torsion");
  const [clock, setClock] = useState<"none" | "slide">("none");
  // section config
  const [order, setOrder] = useState<"complete" | "section">("section");
  const [manFt, setManFt] = useState("");
  const [manIn, setManIn] = useState("0");
  const [secKind, setSecKind] = useState<"bt" | "int">("bt");
  const [secHeight, setSecHeight] = useState<"21" | "24">("21");
  const [windows, setWindows] = useState("0");
  const [stile, setStile] = useState<"none" | "single" | "double">("none");

  const [qty, setQty] = useState(1);
  const [custName, setCustName] = useState("");
  const [custPo, setCustPo] = useState("");
  const [custJob, setCustJob] = useState("");
  const [resultRaw, setResult] = useState<CommQuote | null>(null);
  const [resultSig, setResultSig] = useState("");
  const [errorRaw, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const canComplete = COMM_COMPLETE.has(model);
  const hasRate = SLAB_RATE[model] != null;
  const perFoot = hasRate; // per-foot rate models; others price from the section cost table

  const rFeet = useMemo(() => {
    if (order !== "section") return null;
    const ft = parseInt(manFt, 10);
    const inch = parseInt(manIn, 10) || 0;
    if (Number.isNaN(ft)) return null;
    return roundedFeet(ft, inch);
  }, [order, manFt, manIn]);
  const mx = rFeet ? maxWindows(rFeet) : 0;

  const cfgSig = JSON.stringify([mfr, model, order, size, glass, track, mount, cspring, clock, manFt, manIn, secKind, secHeight, windows, stile]);
  const result = resultRaw && resultSig === cfgSig ? resultRaw : null;
  const liveError = errorRaw && resultSig === cfgSig ? errorRaw : null;
  const priced = result?.priced ?? false;
  const unit = result?.unitPrice ?? 0;
  const total = unit * Math.max(1, qty);

  function pickModel(m: string) {
    setModel(m);
    setSize(""); setManFt(""); setManIn("0");
    setWindows("0"); setStile("none");
    setOrder(COMM_COMPLETE.has(m) ? "complete" : "section");
  }
  function resetConfig() {
    setSize(""); setGlass("solid"); setTrack("15R"); setMount("continuous"); setCspring("torsion"); setClock("none");
    setManFt(""); setManIn("0");
    setSecKind("bt"); setSecHeight("21"); setWindows("0"); setStile("none");
    setQty(1); setResult(null); setError(null); setSaved(false); setCopied(false);
  }
  function onBack() { resetConfig(); setStep(1); }

  const getPrice = useCallback(async () => {
    setError(null); setSaved(false);
    try {
      const body =
        order === "complete"
          ? { order, mfr, model, size, glass, track, mount, cspring, clock }
          : { order, mfr, model, manFt: Number(manFt), manIn: Number(manIn) || 0, secKind, secHeight, windows: Number(windows) || 0, stile };
      const res = await fetch("/api/price/commercial", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const data = (await res.json()) as CommQuote & { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setResult(data); setResultSig(cfgSig);
      if (data.incomplete) { setError(data.incomplete); return; }
      if (data.priced) {
        const n = Math.max(1, qty);
        await fetch("/api/estimates", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quoteType: "commercial",
            model: `${mfr} ${model}${order === "section" ? " section" : ""}`,
            size: data.sub, style: order, color: "—",
            unitPrice: data.unitPrice, qty: n, total: data.unitPrice * n,
            customer: custName, poNumber: custPo, jobName: custJob,
            description: data.description ?? `${mfr} ${model} — ${data.sub}`,
          }),
        }).then(() => setSaved(true)).catch(() => {/* ignore */});
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setResult(null); setResultSig(cfgSig);
    }
  }, [order, mfr, model, size, glass, track, mount, cspring, clock, manFt, manIn, secKind, secHeight, windows, stile, qty, cfgSig, custName, custPo, custJob]);

  function copyDesc() {
    if (!result?.description) return;
    navigator.clipboard.writeText(result.description.toUpperCase()).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1400);
    });
  }

  // ---------------- STEP 1 ----------------
  if (step === 1) {
    return (
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="step-h"><span className="step-n">1</span><h3>Select your door</h3><span className="hint">Commercial</span></div>
              <div className="field"><label className="lbl">Select category</label>
                <div className="selectwrap"><select disabled><option>Commercial Doors</option></select></div></div>
              <div className="field"><label className="lbl">Select series <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="comm-mfr" value={mfr} onChange={(e) => { setMfr(e.target.value); setModel(""); }}>
                    <option value="">Select…</option>
                    {commMfrs().map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div></div>
              {mfr && (
                <div className="field"><label className="lbl">Model type <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select data-testid="comm-model" value={model} onChange={(e) => pickModel(e.target.value)}>
                      <option value="">Select…</option>
                      {commModelsFor(mfr).map((m) => <option key={m} value={m}>{m}{SLAB_LABEL[m] ? ` - ${SLAB_LABEL[m]}` : ""}</option>)}
                    </select>
                  </div></div>
              )}
              <button data-testid="comm-configure" className="btn primary configbtn" disabled={!model} onClick={() => setStep(2)}>
                Configure
              </button>
            </div>
          </div>
        </section>
        <aside className="quote">
          <div className="panel">
            <div className="qhead"><div className="ql">Commercial quote</div><div className="qmodel">{model ? `${mfr} ${model}` : mfr || "—"}</div></div>
            <div className="lines" />
          </div>
        </aside>
      </div>
    );
  }

  // ---------------- STEP 2 ----------------
  return (
    <div className="wrap two">
      <section className="config-col">
        <div className="panel">
          <div className="respanel">
            <div className="modelbar">
              <button type="button" className="btn backbtn" onClick={onBack}>‹ Back</button>
              <span className="mlbl">Model</span>
              <span className="mval">{model}</span>
              <span className="muted-note" style={{ marginLeft: "auto" }}>{mfr}{SLAB_LABEL[model] ? ` · ${SLAB_LABEL[model]}` : ""}</span>
            </div>

            <div className="cfg2">
              <div className="ggroup">
                <div className="ghdr">Layout options</div>
                <div className="grow">
                  <label>Assembly type</label>
                  <div className="ctl selectwrap">
                    <select value={order} onChange={(e) => setOrder(e.target.value as "complete" | "section")}>
                      {canComplete && <option value="complete">Complete door</option>}
                      <option value="section">Replacement section</option>
                    </select>
                  </div>
                </div>

                {order === "complete" ? (
                  <div className="grow">
                    <label>Size</label>
                    <div className="ctl selectwrap">
                      <select data-testid="comm-size" value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value="">Select size…</option>
                        {(COMM_MATRIX_SIZES[model] ?? []).map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grow">
                      <label>Section type</label>
                      <div className="ctl selectwrap">
                        <select value={secKind} onChange={(e) => setSecKind(e.target.value as "bt" | "int")}>
                          <option value="bt">Bottom section</option>
                          <option value="int">Intermediate section</option>
                        </select>
                      </div>
                    </div>
                    <div className="grow">
                      <label>Section height</label>
                      <div className="ctl selectwrap">
                        <select value={secHeight} onChange={(e) => setSecHeight(e.target.value as "21" | "24")}>
                          <option value="21">21″</option>
                          <option value="24">24″</option>
                        </select>
                      </div>
                    </div>
                    <div className="grow">
                      <label>Door width</label>
                      <div className="ctl dimstack">
                        <div className="dimrow">
                          <input data-testid="comm-width-ft" type="number" min={0} placeholder="ft" value={manFt} onChange={(e) => { const v = e.target.value; if (v === "" || Number(v) >= 0) setManFt(v); }} />
                          <span className="u">ft</span>
                          <input data-testid="comm-width-in" type="number" min={0} value={manIn} onChange={(e) => { const v = e.target.value; if (v === "" || Number(v) >= 0) setManIn(v); }} />
                          <span className="u">in</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="ggroup">
                <div className="ghdr">Window options</div>
                {order === "complete" ? (
                  <div className="grow">
                    <label>Glass type</label>
                    <div className="ctl selectwrap">
                      <select value={glass} onChange={(e) => setGlass(e.target.value as "solid" | "glass")} disabled={!size}>
                        <option value="solid">Solid (no windows)</option>
                        <option value="glass">Glass</option>
                      </select>
                    </div>
                  </div>
                ) : secKind === "int" ? (
                  <div className="grow">
                    <label>Windows{rFeet ? ` (≤${mx})` : ""}</label>
                    <div className="ctl selectwrap">
                      <select value={windows} onChange={(e) => setWindows(e.target.value)}>
                        <option value="0">Solid — no windows</option>
                        {Array.from({ length: mx }, (_, i) => i + 1).map((i) => (
                          <option key={i} value={String(i)}>{i} window{i > 1 ? "s" : ""} (+${SLAB_ADDERS.window * i})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="grow"><label>Windows</label><div className="ctl"><span className="muted-note">— bottom section —</span></div></div>
                )}
              </div>

              {order === "complete" && (
                <div className="ggroup">
                  <div className="ghdr">Track options</div>
                  <div className="grow">
                    <label>Track / lift</label>
                    <div className="ctl selectwrap">
                      <select value={track} onChange={(e) => setTrack(e.target.value as "15R" | "FV" | "LHR")}>
                        <option value="15R">15R (15″ radius)</option>
                        <option value="FV">Full vertical</option>
                        <option value="LHR">Low headroom</option>
                      </select>
                    </div>
                  </div>
                  <div className="grow">
                    <label>Track mount</label>
                    <div className="ctl selectwrap">
                      <select value={mount} onChange={(e) => setMount(e.target.value as "continuous" | "reverse")}>
                        <option value="continuous">Continuous angle (wood)</option>
                        <option value="reverse">Reverse angle (steel)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grow">
                    <label>Spring</label>
                    <div className="ctl selectwrap">
                      <select value={cspring} onChange={(e) => setCspring(e.target.value as "torsion" | "extension")}>
                        <option value="torsion">Torsion</option>
                        <option value="extension">Extension</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="ggroup">
                <div className="ghdr">Additional options</div>
                {order === "complete" ? (
                  <div className="grow">
                    <label>Lock</label>
                    <div className="ctl selectwrap">
                      <select value={clock} onChange={(e) => setClock(e.target.value as "none" | "slide")}>
                        <option value="none">No lock</option>
                        <option value="slide">Inside slide lock</option>
                      </select>
                    </div>
                  </div>
                ) : perFoot ? (
                  <>
                    <div className="grow">
                      <label>End stiles</label>
                      <div className="ctl selectwrap">
                        <select value={stile} onChange={(e) => setStile(e.target.value as "none" | "single" | "double")}>
                          <option value="none">None</option>
                          <option value="single">Single (+${SLAB_ADDERS.stile_single})</option>
                          <option value="double">Double (+${SLAB_ADDERS.stile_double})</option>
                        </select>
                      </div>
                    </div>
                    {secKind === "bt" && (
                      <div className="grow">
                        <label>Bottom retainer &amp; rubber</label>
                        <div className="ctl"><span className="muted-note">Included automatically (+${SLAB_ADDERS.retainer}/ft)</span></div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="grow"><label>&nbsp;</label><div className="ctl"><span className="muted-note">Any width — priced from the next standard section up. 21″ and 24″ are the same price.</span></div></div>
                )}
              </div>
            </div>

            <button data-testid="comm-get-price" className="btn primary configbtn" type="button" onClick={getPrice}>
              Get price
            </button>
            {liveError && <div className="alert warn" data-testid="comm-error">{liveError}</div>}
            {result?.warn && <div className="alert warn">{result.warn}</div>}
          </div>
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Commercial quote</div>
            <div className="qmodel">{mfr} {model}</div>
            {result && <div className="qsub">{result.sub}</div>}
            {priced && result?.stock && (
              <span className={`stockbadge ${result.stock.inStock ? "yes" : "no"}`}>
                {result.stock.inStock ? "✓ In stock — Doors Direct South" : "Special order"}
              </span>
            )}
          </div>

          {!result || !priced ? (
            <div className="lines" />
          ) : (
            <>
              <div className="lines">
                {result.lines.map((l, i) => (
                  <div className="qline" key={i}>
                    <span className="nm">{l.name}</span>
                    <span className={l.kind === "add" ? "vl add" : l.kind === "minus" ? "vl minus" : "vl"} {...(i === 0 ? { "data-testid": "comm-price" } : {})}>
                      {l.kind === "add" && l.value > 0 ? "+" : ""}{fmt(l.value)}
                    </span>
                  </div>
                ))}
              </div>
              <CustomerJobFields
                customer={custName} setCustomer={setCustName}
                po={custPo} setPo={setCustPo}
                job={custJob} setJob={setCustJob}
              />
              <div className="qtyrow">
                <label htmlFor="cqty">Quantity</label>
                <input id="cqty" type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
              </div>
              <div className="total">
                <span className="tl">Quote total</span>
                <span className="tv" data-testid="comm-total">{fmt(total)}</span>
              </div>
              {result.description && (
                <div className="descbox no-print">
                  <div className="desclbl">Door description</div>
                  <div className="desctext">{result.description.toUpperCase()}</div>
                  <button className={`btn copybtn ${copied ? "ok" : ""}`} type="button" onClick={copyDesc}>
                    {copied ? "Copied ✓" : "Copy description"}
                  </button>
                </div>
              )}
              <div className="qfoot">
                <button className="btn" type="button" onClick={resetConfig}>Clear</button>
                {saved && <span className="muted-note" data-testid="comm-saved">Saved to estimates ✓</span>}
                <button className="btn primary" type="button" onClick={() => window.print()}>Print quote</button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
