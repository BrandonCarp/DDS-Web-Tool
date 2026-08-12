"use client";

import { useCallback, useMemo, useState } from "react";
import { EstimateSheet } from "@/components/EstimateSheet";
import { CopyButton } from "@/components/CopyButton";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import { useCustomerJob } from "@/components/CustomerJobFields";
import {
  COMM_COMPLETE, COMM_MATRIX_SIZES,
  SLAB_RATE, SLAB_LABEL, commMfrs, commModelsFor, maxWindows, roundedFeet,
  SECTION_MAX_WIDTH_IN, maxWidthLabel, sectionColors,
  STOCK_SECTION_WIDTHS, sectionWidthLabel,
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
  const [stile, setStile] = useState<"single" | "double">("single");
  const [secColor, setSecColor] = useState<"White" | "Brown">("White");

  const [qty, setQty] = useState(1);
  const { custName, custPo, custJob } = useCustomerJob();
  const [resultRaw, setResult] = useState<CommQuote | null>(null);
  const [resultSig, setResultSig] = useState("");
  const [errorRaw, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const canComplete = COMM_COMPLETE.has(model);
  const hasRate = SLAB_RATE[model] != null;
  const stockWidths = STOCK_SECTION_WIDTHS[model];
  const perFoot = hasRate; // per-foot rate models; others price from the section cost table
  // End stiles and colour apply to per-foot AND stocked-width sections. Only the
  // cost-table models (3720/3717/3150) price a bare section with neither.
  const hasStileChoice = hasRate || stockWidths != null;
  // Is the typed width one of the stocked ones? Blank reads as OK so the hint
  // stays neutral until the counter has actually entered a size.
  const stockOk =
    !stockWidths ||
    manFt === "" ||
    stockWidths.includes(`${Math.trunc(Number(manFt)) || 0}.${Math.trunc(Number(manIn)) || 0}`);

  const rFeet = useMemo(() => {
    if (order !== "section") return null;
    const ft = parseInt(manFt, 10);
    const inch = parseInt(manIn, 10) || 0;
    if (Number.isNaN(ft)) return null;
    return roundedFeet(ft, inch);
  }, [order, manFt, manIn]);
  const mx = rFeet ? maxWindows(rFeet) : 0;

  // Widest section this model may be ordered in, for the input hint and the
  // number field's max. quoteCommercial() enforces it regardless.
  const colorOpts = sectionColors(model);
  const maxIn = SECTION_MAX_WIDTH_IN[model] ?? null;
  const maxFt = maxIn != null ? Math.floor(maxIn / 12) : null;
  const overMax = maxIn != null && manFt !== "" && (Number(manFt) * 12 + (Number(manIn) || 0)) > maxIn;

  const cfgSig = JSON.stringify([mfr, model, order, size, glass, track, mount, cspring, clock, manFt, manIn, secKind, secHeight, windows, stile, secColor]);
  const result = resultRaw && resultSig === cfgSig ? resultRaw : null;
  const liveError = errorRaw && resultSig === cfgSig ? errorRaw : null;
  const priced = result?.priced ?? false;
  const unit = result?.unitPrice ?? 0;
  const total = unit * Math.max(1, qty);

  function pickModel(m: string) {
    setModel(m);
    setSize(""); setManFt(""); setManIn("0");
    setWindows("0"); setStile("single"); setSecColor("White");
    setOrder(COMM_COMPLETE.has(m) ? "complete" : "section");
  }
  function resetConfig() {
    setSize(""); setGlass("solid"); setTrack("15R"); setMount("continuous"); setCspring("torsion"); setClock("none");
    setManFt(""); setManIn("0");
    setSecKind("bt"); setSecHeight("21"); setWindows("0"); setStile("single"); setSecColor("White");
    setQty(1); setResult(null); setError(null); setSaved(false);
  }
  function onBack() { resetConfig(); setStep(1); }

  const getPrice = useCallback(async () => {
    setError(null); setSaved(false);
    try {
      const body =
        order === "complete"
          ? { order, mfr, model, size, glass, track, mount, cspring, clock }
          : { order, mfr, model, manFt: Number(manFt), manIn: Number(manIn) || 0, secKind, secHeight, windows: Number(windows) || 0, stile, color: secColor };
      const res = await fetch("/api/price/commercial", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      const data = (await res.json()) as CommQuote & { error?: string };
      if (res.status === 401) { window.location.assign("/login"); return; }
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
  }, [order, mfr, model, size, glass, track, mount, cspring, clock, manFt, manIn, secKind, secHeight, windows, stile, secColor, qty, cfgSig, custName, custPo, custJob]);


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
    <>
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
                          <input data-testid="comm-width-ft" type="number" min={0} max={maxFt ?? undefined} placeholder="ft" value={manFt} onChange={(e) => { const v = e.target.value; if (v === "" || Number(v) >= 0) setManFt(v); }} />
                          <span className="u">ft</span>
                          {/* Inches are inches. The engine re-checks this — the browser is not the gate. */}
                          <input data-testid="comm-width-in" type="number" min={0} max={11} value={manIn} onChange={(e) => { const v = e.target.value; if (v === "" || (Number(v) >= 0 && Number(v) <= 11)) setManIn(v); }} />
                          <span className="u">in</span>
                        </div>
                        {stockWidths ? (
                          <div
                            className={stockOk ? "muted-note" : "note warn"}
                            style={{ marginTop: 6 }}
                            data-testid="comm-width-limit"
                          >
                            {stockOk
                              ? `Stocked: ${stockWidths.map(sectionWidthLabel).join(", ")}`
                              : `${model} sections are stocked in ${stockWidths.map(sectionWidthLabel).join(", ")} only — use Special Order for this size`}
                          </div>
                        ) : maxIn != null && (
                          <div className={overMax ? "note warn" : "muted-note"} style={{ marginTop: 6 }} data-testid="comm-width-limit">
                            {overMax ? `Too wide — ${model} sections go up to ${maxWidthLabel(maxIn)}` : `Up to ${maxWidthLabel(maxIn)}`}
                          </div>
                        )}
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
                          <option key={i} value={String(i)}>{i} window{i > 1 ? "s" : ""}</option>
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
                ) : hasStileChoice ? (
                  <>
                    <div className="grow">
                      <label>End stiles</label>
                      <div className="ctl selectwrap">
                        <select value={stile} onChange={(e) => setStile(e.target.value as "single" | "double")}>
                          <option value="single">Single</option>
                          <option value="double">Double</option>
                        </select>
                      </div>
                    </div>
                    <div className="grow">
                      <label>Color</label>
                      <div className="ctl selectwrap">
                        <select data-testid="comm-color" value={secColor} onChange={(e) => setSecColor(e.target.value as "White" | "Brown")} disabled={colorOpts.length === 1}>
                          {colorOpts.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
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
              {order === "section" ? (
                // Sections show the finished price only — the retainer, stile and
                // window adders are rolled in rather than itemised.
                <div className="lines">
                  <div className="qline">
                    <span className="nm">{result.sub}</span>
                    <span className="vl" data-testid="comm-price">{fmt(result.unitPrice)}</span>
                  </div>
                </div>
              ) : (
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
              )}
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
                </div>
              )}
              <div className="qfoot">
                <CopyButton text={(result.description ?? "").toUpperCase()} label="Copy description" primary testId="comm-copy-desc" />
                <CopyButton text={fmt(total)} label="Copy price" testId="comm-copy-price" />
                <button className="btn" type="button" onClick={resetConfig}>Clear</button>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
    {result?.priced && (
      <QbLineDemo
        model={model}
        size={result.sub}
        item={QB_ITEMS.commercial}
        description={(result.description ?? "").toUpperCase()}
        rate={fmt(result.unitPrice).replace("$", "")}
      />
    )}
    {result?.priced && (
      <EstimateSheet lines={[{ item: QB_ITEMS.commercial, desc: result.description ?? "", qty: Math.max(1, qty), rate: result.unitPrice }]} />
    )}
    </>
  );
}
