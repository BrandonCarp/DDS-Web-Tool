"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { LockKey, Quote, SpringKey, TrackKey, WindowStyle } from "@/lib/pricing/types";
import { MARGINS, COLORS, COLLECTIONS } from "@/lib/pricing/data/catalog-meta";
import { dataKey, modelSort } from "@/lib/pricing/model-groups";
import { windowDesigns, designWidthCode } from "@/lib/pricing/data/inserts";

const GLASS = [
  { value: "solid", label: "Solid (no windows)" },
  { value: "ssb", label: "Single strength B grade" },
  { value: "dsb", label: "Double strength B grade" },
] as const;

const TRACKS: { value: TrackKey; label: string }[] = [
  { value: "r10", label: '10" radius' },
  { value: "r12", label: '12" radius' },
  { value: "r15", label: '15" radius' },
  { value: "low_headroom", label: "Low headroom" },
  { value: "r20", label: '20" radius' },
  { value: "r32", label: '32" radius' },
];

const LOCKS: { value: LockKey; label: string }[] = [
  { value: "none", label: "No lock" },
  { value: "slide", label: "Inside slide lock" },
  { value: "lockbar", label: "Lockbar assembly" },
  { value: "lockbar_installed", label: "Lockbar installed" },
];

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function styleFrom(glass: string, framing: string): WindowStyle {
  if (glass === "solid") return "solid";
  return framing === "insert" ? "inserts" : "glass";
}

export function ResidentialTool({ models }: { models: string[] }) {
  const doorTree = useMemo(() => {
    const t: Record<string, string[]> = {};
    for (const m of models) {
      const c = COLLECTIONS[dataKey(m)] || "Other";
      (t[c] ||= []).push(m);
    }
    for (const c of Object.keys(t)) t[c].sort(modelSort);
    return t;
  }, [models]);
  const collections = Object.keys(doorTree);

  const [step, setStep] = useState<1 | 2>(1);
  const [coll, setColl] = useState("");
  const [model, setModel] = useState("");

  // sizes are strings so the fields can start blank (prompt the user, like index.html)
  const [widthFt, setWidthFt] = useState("");
  const [widthIn, setWidthIn] = useState("0");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("0");
  const [assembly, setAssembly] = useState("complete");
  const [color, setColor] = useState("White");
  const [glass, setGlass] = useState("solid");
  const [framing, setFraming] = useState("plain");
  const [windesign, setWindesign] = useState("");
  const [spring, setSpring] = useState<SpringKey>("extension");
  const [track, setTrack] = useState<TrackKey>("r12");
  const [lock, setLock] = useState<LockKey>("none");
  const [qty, setQty] = useState(1);

  const [soPrice, setSoPrice] = useState("");
  const [soKind, setSoKind] = useState<"door" | "section">("door");

  const [resultRaw, setResult] = useState<Quote | null>(null);
  const [resultSig, setResultSig] = useState("");
  const [errorRaw, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const style = styleFrom(glass, framing);
  const colorList = COLORS[dataKey(model)] ?? ["White"];
  const collection = COLLECTIONS[dataKey(model)] ?? coll;
  const isGallery = collection === "Gallery Collection";
  // Double strength B grade is only offered on Gallery Collection doors.
  const glassOptions = isGallery ? GLASS : GLASS.filter((g) => g.value !== "dsb");
  const wf = parseInt(widthFt, 10);
  const hf = parseInt(heightFt, 10);
  const sizeComplete = Number.isFinite(wf) && Number.isFinite(hf);

  // Window/insert designs available for this exact door (model + style + width).
  const wDesigns = useMemo(
    () => windowDesigns(model, style, designWidthCode(wf, parseInt(widthIn, 10) || 0)),
    [model, style, wf, widthIn],
  );
  // A previously chosen design that no longer fits this door is simply inactive.
  const activeDesign = windesign && wDesigns.some((d) => d.id === windesign) ? windesign : "";

  // The quote is only shown while it matches the CURRENT configuration; any
  // config change makes it stale, so the user must click "Get price" again.
  const cfgSig = JSON.stringify([model, widthFt, widthIn, heightFt, heightIn, style, color, track, spring, lock, activeDesign]);
  const result = resultRaw && resultSig === cfgSig ? resultRaw : null;
  const liveError = errorRaw && resultSig === cfgSig ? errorRaw : null;

  const getPrice = useCallback(async () => {
    setError(null);
    setSaved(false);
    if (!sizeComplete) {
      setError("Enter the width and height before getting a price.");
      setResult(null);
      setResultSig(cfgSig);
      return;
    }
    try {
      const res = await fetch("/api/price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          widthFt: Number(widthFt), widthIn: Number(widthIn || 0),
          heightFt: Number(heightFt), heightIn: Number(heightIn || 0),
          style, color, track, spring, lock,
          windesign: activeDesign || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      const q = data as Quote;
      setResult(q);
      setResultSig(cfgSig);
      // Getting a price also records the quote in the estimates DB.
      if (q.priced) {
        const n = Math.max(1, qty);
        await fetch("/api/estimates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quoteType: "residential",
            model, size: `${widthFt || "—"}'${widthIn || "0"}" x ${heightFt || "—"}'${heightIn || "0"}"`,
            style, color, unitPrice: q.unitPrice, qty: n, total: q.unitPrice * n, description: q.description,
          }),
        }).then(() => setSaved(true)).catch(() => {/* ignore */});
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setResult(null);
      setResultSig(cfgSig);
    }
  }, [model, widthFt, widthIn, heightFt, heightIn, style, color, track, spring, lock, activeDesign, qty, cfgSig, sizeComplete]);

  function onSeries(c: string) {
    setColl(c);
    setModel("");
  }
  function onPickModel(m: string) {
    setModel(m);
    const list = COLORS[dataKey(m)] ?? ["White"];
    if (!list.includes(color)) setColor(list[0]);
    // Double strength is Gallery-only; drop it if the new model isn't Gallery.
    if ((COLLECTIONS[dataKey(m)] ?? coll) !== "Gallery Collection" && glass === "dsb") setGlass("solid");
  }
  // Clear the whole door configuration back to defaults (used when going Back).
  function resetConfig() {
    setWidthFt(""); setWidthIn("0");
    setHeightFt(""); setHeightIn("0");
    setAssembly("complete");
    setColor((COLORS[dataKey(model)] ?? ["White"])[0]);
    setGlass("solid"); setFraming("plain"); setWindesign("");
    setSpring("extension"); setTrack("r12"); setLock("none");
    setQty(1);
    setSoPrice(""); setSoKind("door");
    setResult(null); setError(null); setCopied(false); setSaved(false);
  }
  function onBack() {
    resetConfig();
    setStep(1);
  }

  const priced = (result?.priced ?? false) && sizeComplete;
  const unit = result?.unitPrice ?? 0;
  const total = unit * Math.max(1, qty);
  const dims = `${widthFt || "—"}'${widthIn || "0"}" x ${heightFt || "—"}'${heightIn || "0"}"`;
  const description = result?.description ?? "";

  const margins = MARGINS[dataKey(model)];
  const margin = margins ? (soKind === "door" ? margins.door : margins.section) : null;
  const soCost = parseFloat(String(soPrice).replace(/,/g, "")) || 0;
  const soSell = margin != null && soCost > 0 ? soCost / (1 - margin / 100) : null;

  function copyDesc() {
    navigator.clipboard?.writeText(description.toUpperCase());
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  function clearAll() {
    setWidthFt(""); setWidthIn("0"); setHeightFt(""); setHeightIn("0");
    setAssembly("complete"); setGlass("solid"); setFraming("plain"); setWindesign("");
    setSpring("extension"); setTrack("r12"); setLock("none"); setQty(1); setSoPrice("");
  }

  // ---------------- STEP 1: SELECT YOUR DOOR ----------------
  if (step === 1) {
    return (
      <div className="wrap">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="step-h">
                <span className="step-n">1</span>
                <h3>Select your door</h3>
                <span className="hint">Residential</span>
              </div>
              <div className="field">
                <label className="lbl">Select category</label>
                <div className="selectwrap"><select disabled><option>Residential Doors</option></select></div>
              </div>
              <div className="field">
                <label className="lbl">Select series <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="series" value={coll} onChange={(e) => onSeries(e.target.value)}>
                    <option value="">Select…</option>
                    {collections.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              {coll && (
                <div className="field">
                  <label className="lbl">Model type <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select data-testid="model" value={model} onChange={(e) => onPickModel(e.target.value)}>
                      <option value="">Select…</option>
                      {(doorTree[coll] ?? []).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              )}
              <button data-testid="configure" className="btn primary configbtn" disabled={!model} onClick={() => setStep(2)}>
                Configure
              </button>
            </div>
          </div>
        </section>
        <aside className="quote">
          <div className="panel">
            <div className="empty">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="emptyimg" src="/door-res.webp" alt="Garage door" />
              <div className="emptymsg">Select your residential configuration</div>
              <div className="muted-note" style={{ marginTop: 8 }}>Pick a series and model, then Configure.</div>
            </div>
          </div>
        </aside>
        <div className="special-col">
          <div className="sobox panel no-print">
            <div className="sohead">Special order — {model || "select a model first"}</div>
            <div className="sobody">
              <div className="note">Pick a residential model above to price a special-order version.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- STEP 2: CONFIGURE ----------------
  return (
    <div className="wrap">
      <section className="config-col">
        <div className="panel">
          <div className="respanel">
            <div className="modelbar">
              <button type="button" className="btn backbtn" onClick={onBack}>‹ Back</button>
              <span className="mlbl">Model</span>
              <span className="mval">{model}</span>
              <span className="muted-note" style={{ marginLeft: "auto" }}>{collection}</span>
            </div>

            <div className="cfg2">
              <div className="ggroup">
                <div className="ghdr">Layout options</div>
                <div className="grow">
                  <label>Assembly type</label>
                  <div className="ctl selectwrap">
                    <select value={assembly} onChange={(e) => setAssembly(e.target.value)}>
                      <option value="complete">Complete door</option>
                      <option value="sections">Sections only</option>
                    </select>
                  </div>
                </div>
                <div className="grow">
                  <label>Measure size</label>
                  <div className="ctl dimstack">
                    <div className="dimrow">
                      <input data-testid="width-ft" type="number" min={0} placeholder="ft" value={widthFt} onChange={(e) => { const v = e.target.value; if (v === "" || Number(v) >= 0) setWidthFt(v); }} />
                      <span className="u">ft</span>
                      <select data-testid="width-in" className="insel" value={widthIn} onChange={(e) => setWidthIn(e.target.value)}>
                        {["0", "2", "4", "6", "8", "10"].map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                      <span className="u">in W</span>
                    </div>
                    <div className="dimrow">
                      <input data-testid="height-ft" type="number" min={0} placeholder="ft" value={heightFt} onChange={(e) => { const v = e.target.value; if (v === "" || Number(v) >= 0) setHeightFt(v); }} />
                      <span className="u">ft</span>
                      <select data-testid="height-in" className="insel" value={heightIn} onChange={(e) => setHeightIn(e.target.value)}>
                        {["0", "3", "6", "9"].map((v) => <option key={v} value={v}>{v}</option>)}
                      </select>
                      <span className="u">in H</span>
                    </div>
                  </div>
                </div>
                <div className="grow">
                  <label>Color</label>
                  <div className="ctl selectwrap">
                    <select value={color} onChange={(e) => setColor(e.target.value)}>
                      {colorList.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="ggroup">
                <div className="ghdr">Window options</div>
                <div className="grow">
                  <label>Glass type</label>
                  <div className="ctl selectwrap">
                    <select data-testid="style" value={glass} disabled={!sizeComplete} onChange={(e) => setGlass(e.target.value)}>
                      {glassOptions.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grow">
                  <label>Framing / insert</label>
                  <div className="ctl selectwrap">
                    <select value={framing} onChange={(e) => setFraming(e.target.value)} disabled={glass === "solid" || !sizeComplete}>
                      <option value="plain">Plain (no insert)</option>
                      <option value="insert">Insert</option>
                    </select>
                  </div>
                </div>
                {sizeComplete && wDesigns.length > 0 && (
                  <div className="grow">
                    <label>Window design</label>
                    <div className="ctl selectwrap">
                      <select data-testid="windesign" value={activeDesign} onChange={(e) => setWindesign(e.target.value)}>
                        <option value="">None / standard</option>
                        {wDesigns.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="ggroup">
                <div className="ghdr">Track options</div>
                <div className="grow">
                  <label>Spring</label>
                  <div className="ctl selectwrap">
                    <select data-testid="spring" value={spring} onChange={(e) => setSpring(e.target.value as SpringKey)}>
                      <option value="extension">Extension</option>
                      <option value="torsion">Torsion</option>
                    </select>
                  </div>
                </div>
                <div className="grow">
                  <label>Track lift / radius</label>
                  <div className="ctl selectwrap">
                    <select data-testid="track" value={track} onChange={(e) => setTrack(e.target.value as TrackKey)}>
                      {TRACKS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="ggroup">
                <div className="ghdr">Additional options</div>
                <div className="grow">
                  <label>Lock</label>
                  <div className="ctl selectwrap">
                    <select data-testid="lock" value={lock} onChange={(e) => setLock(e.target.value as LockKey)}>
                      {LOCKS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button data-testid="get-price" className="btn primary configbtn" type="button" onClick={getPrice}>
              Get price
            </button>
            {liveError && <div className="alert warn" data-testid="error">{liveError}</div>}
          </div>
        </div>
      </section>

      <aside className="quote">
        <div className="panel">
          <div className="qhead">
            <div className="ql">Residential quote</div>
            <div className="qmodel">{model}</div>
            {sizeComplete && <div className="qsub">{dims} · {style} · {color}</div>}
            {priced && (
              <span data-testid="source-badge" className={`stockbadge ${result?.isStock ? "yes" : "no"}`}>
                {result?.isStock ? "✓ In stock — Doors Direct South" : "Special / odd size"}
              </span>
            )}
          </div>

          {!result ? (
            <div className="lines" />
          ) : priced ? (
            <>
              <div className="lines">
                {result!.lines.map((l, i) => {
                  const prefix = l.kind === "add" && l.value > 0 ? "+" : "";
                  const cls = l.kind === "add" ? "vl add" : l.kind === "minus" ? "vl minus" : "vl";
                  return (
                    <div className="qline" key={i}>
                      <span className="nm">{l.name}</span>
                      <span className={cls} {...(i === 0 ? { "data-testid": "price" } : {})}>
                        {prefix}{fmt(l.value)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="qtyrow">
                <label htmlFor="qty">Quantity</label>
                <input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} />
              </div>
              <div className="total">
                <span className="tl">Quote total</span>
                <span className="tv" data-testid="total">{fmt(total)}</span>
              </div>
              <div className="descbox no-print">
                <div className="desclbl">Door description</div>
                <div className="desctext">{description.toUpperCase()}</div>
                <button className={`btn copybtn ${copied ? "ok" : ""}`} type="button" onClick={copyDesc}>
                  {copied ? "Copied ✓" : "Copy description"}
                </button>
              </div>
              <div className="qfoot">
                <button className="btn" type="button" onClick={clearAll}>Clear</button>
                {saved && <span className="muted-note" data-testid="saved-note">Saved to estimates ✓</span>}
                <button className="btn primary" type="button" onClick={() => window.print()}>Print quote</button>
              </div>
            </>
          ) : (
            <div className="empty" data-testid="not-priced">
              <div className="emptymsg">No standard price for that size</div>
              <div className="muted-note" style={{ marginTop: 6 }}>Handle it as a special order &rarr;</div>
            </div>
          )}
        </div>
      </aside>

      <div className="special-col">
        <div className="sobox panel no-print">
          <div className="sohead">Special order — {model}</div>
          <div className="sobody sobody-grid">
            <div className="so-fields">
              <div className="field">
                <label className="lbl">Total price <span className="req">*</span></label>
                <input type="text" inputMode="decimal" value={soPrice} onChange={(e) => setSoPrice(e.target.value)} placeholder="0.00" />
                <div className="note">Enter the total price — that is the cost plus the fuel charge.</div>
              </div>
              <div className="field">
                <label className="lbl">Type</label>
                <div className="chips">
                  <button type="button" className={`chip ${soKind === "door" ? "sel" : ""}`} onClick={() => setSoKind("door")}>Complete door</button>
                  <button type="button" className={`chip ${soKind === "section" ? "sel" : ""}`} onClick={() => setSoKind("section")}>Sections</button>
                </div>
              </div>
            </div>
            <div className="so-out">
              <div className="box sell">
                <div className="k">Sell price</div>
                <div className="v" data-testid="so-sell">{soSell ? fmt(soSell) : "—"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
