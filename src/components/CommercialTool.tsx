"use client";

import { useState } from "react";
import type { SearchPick } from "@/lib/search";
import { DoorSlideshow } from "./DoorSlideshow";
import { COMMERCIAL_PHOTOS } from "@/lib/door-photos";
import { EstimateSheet } from "@/components/EstimateSheet";
import { priceText } from "@/components/CopyButton";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { QB_STOCK_DOORS } from "@/lib/pricing/data/quickbooks";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import { useCustomerJob } from "@/components/CustomerJobFields";
import {
  COMM_COMPLETE, COMM_COMPLETE_MODELS, COMM_SECTION_MODELS, COMM_MATRIX_SIZES,
  SLAB_RATE, SLAB_LABEL, panelCount, placementOf, placementPanels, windowPlacements,
  SECTION_MAX_WIDTH_IN, maxWidthLabel, sectionColors,
  STOCK_SECTION_WIDTHS, sectionWidthLabel, sectionWindowSizes, stileLocationCount,
  stileLocationText,
} from "@/lib/pricing/data/commercial-meta";
import { PanelDiagram, type StileValue } from "./PanelDiagram";
import { homeownerMarkup } from "@/lib/pricing/engine";
import { QtyStepper } from "./QtyStepper";
import { PickInput, range } from "./PickInput";

interface CommQuote {
  priced: boolean; incomplete?: string; warn?: string;
  lines: { name: string; value: number; kind: "base" | "add" | "minus" }[];
  unitPrice: number; sub: string; description?: string; stock?: { inStock: boolean };
}
const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function CommercialTool({ openOn }: { openOn?: SearchPick } = {}) {
  const start = openOn?.kind === "commdoor" ? openOn : null;
  // Complete door or replacement section comes first, as two buttons (Brandon,
  // 15/10/2026), then the maker and model, then the configuration.
  const [step, setStep] = useState<0 | 1 | 2>(start ? 1 : 0);
  const [mfr, setMfr] = useState(start?.mfr ?? "");
  const [model, setModel] = useState(start?.model ?? "");

  // complete-door config
  const [size, setSize] = useState("");
  const [glass, setGlass] = useState<"solid" | "glass">("solid");
  const [track, setTrack] = useState<"15R" | "FV" | "LHR">("15R");
  const [mount, setMount] = useState<"continuous" | "reverse">("continuous");
  const [cspring, setCspring] = useState<"torsion" | "extension">("torsion");
  const [clock, setClock] = useState<"none" | "slide">("none");
  const [cColor, setCColor] = useState("White");
  // Windows are called out by section on the description; third is the common one.
  const [winSection, setWinSection] = useState("3");
  // section config
  const [order, setOrder] = useState<"complete" | "section">(start ? (COMM_COMPLETE.has(start.model) ? "complete" : "section") : "section");
  const [manFt, setManFt] = useState("");
  const [manIn, setManIn] = useState("0");
  const [secKind, setSecKind] = useState<"bt" | "int">("bt");
  const [homeowner, setHomeowner] = useState(false);
  // 24" first and by default (Brandon, 15/10/2026).
  const [secHeight, setSecHeight] = useState<"21" | "24">("24");
  // The panels with windows, 1-based from the left (15/10/2026): pressed on
  // the section drawing, or read off a complete door's placement ("GL,SOL,GL").
  // A complete door's glass starts with a window in every panel; a section
  // starts solid and takes a window a press.
  const [winPanels, setWinPanels] = useState<number[]>([]);
  // The windows' size, 24x12 first, where the model's sections come in more
  // than one (24x6 on a 524 or 2415, 24x8 on a 3200 — 14 and 16/10/2026).
  const [windowSize, setWindowSize] = useState("");
  const [stile, setStile] = useState<"single" | "double">("single");
  // The stile measurements of a 524 or 2415, one a stile, left to right —
  // the inches and the quarter — as many as the sheet asks by width; or
  // "needed" when they are still to be determined (15/10/2026).
  const [stileVals, setStileVals] = useState<StileValue[]>([]);
  // Stiles added by hand with ADD STILE, past the sheet's count (20/10/2026).
  const [extraStiles, setExtraStiles] = useState(0);
  // Windows go in only after Add windows is pressed (16/10/2026).
  const [addingWindows, setAddingWindows] = useState(false);
  const [secColor, setSecColor] = useState<"White" | "Brown">("White");
  // A lock on an intermediate section without windows (20/10/2026): no
  // lock, a lockbar assembly or a lockbar installed, at the add-on figures.
  const [lock, setLock] = useState<"none" | "lockbar" | "lockbar_installed">("none");

  const [qty, setQty] = useState(1);
  const { custName, custPo, custJob } = useCustomerJob();
  const [resultRaw, setResult] = useState<CommQuote | null>(null);
  const [resultSig, setResultSig] = useState("");
  const [errorRaw, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

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

  // The panels of the section (or of a complete door's glazed section), from
  // its width: a window goes in a panel, a stile between each two.
  const sizeDims = String(size).match(/(\d+)\u2032(\d+)\u2033/);
  const widthIn = order === "complete"
    ? (sizeDims ? Number(sizeDims[1]) * 12 + Number(sizeDims[2]) : 0)
    : (parseInt(manFt, 10) || 0) * 12 + (parseInt(manIn, 10) || 0);
  const panels = widthIn > 0 ? panelCount(0, widthIn) : 0;
  const glassOn = order === "complete" ? glass === "glass" : secKind === "int" && addingWindows;
  const winPanelsUsed = glassOn ? winPanels.filter((n) => n >= 1 && n <= panels) : [];
  const stileCount = order === "section" ? stileLocationCount(model, parseInt(manFt, 10) || 0, parseInt(manIn, 10) || 0) : 0;
  // The sheet's count, one more for a double end stile, and any added by hand (Brandon, 20/10/2026).
  const stileFixed = stileCount > 0 ? stileCount + (stile === "double" ? 1 : 0) : 0;
  const stileTotal = stileCount > 0 ? stileFixed + extraStiles : 0;
  const stileValsUsed = Array.from({ length: stileTotal }, (_, i) => stileVals[i] ?? { inch: "", frac: "0" });
  // A lock goes on an intermediate section with no windows in it.
  const lockOffered = secKind === "int" && winPanelsUsed.length === 0;
  const lockUsed = lockOffered ? lock : "none";
  const stileLocationsUsed = stileValsUsed.map((v) => stileLocationText(v.inch, v.frac));
  function togglePanel(p: number) {
    setWinPanels((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p].sort((a, b) => a - b)));
  }
  const allPanels = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
  function setStileVal(i: number, patch: Partial<StileValue>) {
    setStileVals((cur) => {
      const next = Array.from({ length: Math.max(stileTotal, i + 1) }, (_, k) => cur[k] ?? { inch: "", frac: "0" });
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }
  /** Take out a stile added by hand, and what was typed in it. */
  function removeStile(i: number) {
    setStileVals((cur) => cur.filter((_, k) => k !== i));
    setExtraStiles((n) => Math.max(0, n - 1));
  }

  // Widest section this model may be ordered in, for the input hint and the
  // number field's max. quoteCommercial() enforces it regardless.
  const colorOpts = sectionColors(model);
  const maxIn = SECTION_MAX_WIDTH_IN[model] ?? null;
  const maxFt = maxIn != null ? Math.floor(maxIn / 12) : null;
  const overMax = maxIn != null && manFt !== "" && (Number(manFt) * 12 + (Number(manIn) || 0)) > maxIn;
  // 24x12 unless another size is picked — the model's first, as the engine reads it.
  const winSizes = sectionWindowSizes(model);
  const winSizeUsed = winSizes.includes(windowSize) ? windowSize : winSizes[0];
  const placements = order === "complete" ? windowPlacements(panels) : [];
  const placement = placementOf(panels, winPanelsUsed);

  const cfgSig = JSON.stringify([mfr, model, order, size, glass, track, mount, cspring, clock, cColor, winSection, manFt, manIn, secKind, secHeight, winPanelsUsed, winSizeUsed, stile, stileLocationsUsed, secColor, lockUsed, homeowner]);
  const result = resultRaw && resultSig === cfgSig ? resultRaw : null;
  const liveError = errorRaw && resultSig === cfgSig ? errorRaw : null;
  const priced = result?.priced ?? false;
  const unit = result?.unitPrice ?? 0;
  // Commercial is always a special order, so it takes the special rates. The
  // width comes from the size fields, which both the complete-door and section
  // paths already carry.
  const hoMarkup = homeowner
    ? homeownerMarkup(Number(manFt) || 0, Number(manIn) || 0,
        order === "section" ? "special_section" : "special_door")
    : 0;
  const total = (unit + hoMarkup) * Math.max(1, qty);

  function pickModel(m: string) {
    setModel(m);
    setSize(""); setManFt(""); setManIn("0");
    setWinPanels([]); setAddingWindows(false); setWindowSize(""); setStile("single"); setSecColor("White"); setStileVals([]); setExtraStiles(0); setLock("none");
  }
  /** The order type, as the first two buttons ask it: it decides which models are listed. */
  function pickOrder(o: "complete" | "section") {
    setOrder(o); setMfr(""); setModel(""); setStep(1);
  }
  const modelsFor = (m: string) => (order === "complete" ? COMM_COMPLETE_MODELS[m] ?? [] : COMM_SECTION_MODELS[m] ?? []);
  const mfrsFor = Object.keys(order === "complete" ? COMM_COMPLETE_MODELS : COMM_SECTION_MODELS);
  /** A complete door's glass starts with a window in every panel (GL,GL,GL); a size change keeps it that way. */
  function pickSize(v: string) {
    setSize(v);
    const d = v.match(/(\d+)\u2032(\d+)\u2033/);
    setWinPanels(d ? allPanels(panelCount(Number(d[1]), Number(d[2]))) : []);
  }
  /** A section's width: the panels and stiles follow it, so what was pressed starts over. */
  function pickWidth(ft: string, inch: string) {
    setManFt(ft); setManIn(inch);
    setWinPanels([]);
  }
  function resetConfig() {
    setSize(""); setGlass("solid"); setTrack("15R"); setMount("continuous"); setCspring("torsion"); setClock("none");
    setManFt(""); setManIn("0");
    setSecKind("bt"); setSecHeight("24"); setWinPanels([]); setAddingWindows(false); setWindowSize(""); setStile("single"); setSecColor("White");
    setStileVals([]); setExtraStiles(0); setLock("none");
    setQty(1); setResult(null); setError(null); setSaved(false);
  }
  function onBack() { resetConfig(); setStep(1); }

  async function getPrice() {
    setError(null); setSaved(false);
    try {
      const body =
        order === "complete"
          ? { order, mfr, model, size, glass, track, mount, cspring, clock, color: cColor, winSection: Number(winSection) || 3, windowPanels: winPanelsUsed, windowSize: winSizeUsed }
          : { order, mfr, model, manFt: Number(manFt), manIn: Number(manIn) || 0, secKind, secHeight, windowPanels: winPanelsUsed, windowSize: winSizeUsed, stile,
              stileLocations: stileLocationsUsed, color: secColor, lock: lockUsed };
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
  }


  // ---------------- STEP 0: complete door or replacement section ----------------
  if (step === 0) {
    return (
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="ggroup">
                <div className="ghdr">Commercial</div>
                <div className="gbody pnav-body">
                  <div className="pnav stack">
                    <div className="pnav-pages" role="group" aria-label="Complete door or replacement section">
                      <button type="button" className="pnav-page" data-testid="comm-order-complete" onClick={() => pickOrder("complete")}>Complete door</button>
                      <button type="button" className="pnav-page" data-testid="comm-order-section" onClick={() => pickOrder("section")}>Replacement section</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <aside className="quote">
          <div className="panel">
            <div className="empty">
              <DoorSlideshow photos={COMMERCIAL_PHOTOS} testId="door-show" />
              <div className="emptymsg">Select your commercial configuration</div>
            </div>
          </div>
        </aside>
      </div>
    );
  }

  // ---------------- STEP 1 ----------------
  if (step === 1) {
    return (
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="step-h">
                <button type="button" className="btn backbtn" data-testid="comm-back-order" onClick={() => { setMfr(""); setModel(""); setStep(0); }}>‹ Back</button>
                <h3>{order === "complete" ? "Complete door" : "Replacement section"}</h3><span className="hint">Commercial</span>
              </div>
              {/* The manufacturer IS the first real choice here — commercial
                  carries four. The disabled "category" box above it only
                  repeated the tab. */}
              <div className="field"><label className="lbl">Select manufacturer <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="comm-mfr" value={mfr} onChange={(e) => { setMfr(e.target.value); setModel(""); }}>
                    <option value="">Select…</option>
                    {mfrsFor.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div></div>
              {mfr && (
                <div className="field"><label className="lbl">Select model <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select data-testid="comm-model" value={model} onChange={(e) => pickModel(e.target.value)}>
                      <option value="">Select…</option>
                      {modelsFor(mfr).map((m) => <option key={m} value={m}>{m}{SLAB_LABEL[m] ? ` - ${SLAB_LABEL[m]}` : ""}</option>)}
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
            {/* The same welcome as Residential, with commercial doors (1/10/2026). */}
            <div className="empty">
              <DoorSlideshow photos={COMMERCIAL_PHOTOS} testId="door-show" />
              <div className="emptymsg">Select your commercial configuration</div>
              <div className="muted-note" style={{ marginTop: 8 }}>Pick a manufacturer and model, then Configure.</div>
            </div>
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
              <span className="muted-note" data-testid="comm-model-note" style={{ marginLeft: "auto" }}>{mfr}{SLAB_LABEL[model] ? ` · ${SLAB_LABEL[model]}` : ""}</span>
            </div>

            {/* Brandon's layout of 15/10/2026. A complete door: its size and
                colour with the track options under them on the left, the window
                options and the lock on the right. A section: the section and its
                colour on the left, the window options on the right, then — when
                it has windows — the section drawn across both, and the stile
                options across both under that. */}
            <div className="cfg2">
              {order === "complete" ? (
                <>
                  <div className="cfgcol">
                    <div className="ggroup">
                      <div className="ghdr">Complete door</div>
                      <div className="grow">
                        <label>Size</label>
                        <div className="ctl selectwrap">
                          <select data-testid="comm-size" value={size} onChange={(e) => pickSize(e.target.value)}>
                            <option value="">Select size…</option>
                            {(COMM_MATRIX_SIZES[model] ?? []).map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="grow">
                        <label>Color</label>
                        <div className="ctl selectwrap">
                          <select data-testid="comm-door-color" value={cColor} onChange={(e) => setCColor(e.target.value)}>
                            {colorOpts.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
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
                  </div>

                  <div className="cfgcol">
                    <div className="ggroup">
                      <div className="ghdr">Window options</div>
                      <div className="grow">
                        <label>Glass type</label>
                        <div className="ctl selectwrap">
                          <select data-testid="comm-glass" value={glass} onChange={(e) => setGlass(e.target.value as "solid" | "glass")} disabled={!size}>
                            <option value="solid">Solid (no windows)</option>
                            <option value="glass">Glass</option>
                          </select>
                        </div>
                      </div>
                      {glass === "glass" && (
                        <>
                          <div className="grow">
                            <label>Window section</label>
                            <div className="ctl selectwrap">
                              <select data-testid="comm-win-section" value={winSection} onChange={(e) => setWinSection(e.target.value)}>
                                {["1","2","3","4","5","6"].map((n) => (
                                  <option key={n} value={n}>{["First","Second","Third","Fourth","Fifth","Sixth"][Number(n)-1]}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* GL or SOL a panel, left to right, as Clopay's order form has it (15/10/2026). */}
                          {placements.length > 0 && (
                            <div className="grow">
                              <label>Window placement</label>
                              <div className="ctl selectwrap">
                                <select data-testid="comm-placement" value={placement} onChange={(e) => setWinPanels(placementPanels(e.target.value))}>
                                  {placements.map((pl) => <option key={pl} value={pl}>{pl}</option>)}
                                </select>
                              </div>
                            </div>
                          )}
                          {winSizes.length > 1 && (
                            <div className="grow">
                              <label>Window size</label>
                              <div className="ctl selectwrap">
                                <select data-testid="comm-window-size" value={winSizeUsed} onChange={(e) => setWindowSize(e.target.value)}>
                                  {winSizes.map((w) => <option key={w} value={w}>{w}</option>)}
                                </select>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="ggroup">
                      <div className="ghdr">Additional options</div>
                      <div className="grow">
                        <label>Lock</label>
                        <div className="ctl selectwrap">
                          <select value={clock} onChange={(e) => setClock(e.target.value as "none" | "slide")}>
                            <option value="none">No lock</option>
                            <option value="slide">Inside slide lock</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="ggroup">
                    <div className="ghdr">Replacement section</div>
                    <div className="grow">
                      <label>Section type</label>
                      <div className="ctl selectwrap">
                        <select data-testid="comm-sec-kind" value={secKind} onChange={(e) => setSecKind(e.target.value as "bt" | "int")}>
                          <option value="bt">Bottom section</option>
                          <option value="int">Intermediate section</option>
                        </select>
                      </div>
                    </div>
                    <div className="grow">
                      <label>Section height</label>
                      <div className="ctl selectwrap">
                        <select data-testid="comm-sec-height" value={secHeight} onChange={(e) => setSecHeight(e.target.value as "21" | "24")}>
                          <option value="24">24″</option>
                          <option value="21">21″</option>
                        </select>
                      </div>
                    </div>
                    <div className="grow">
                      <label>Door width</label>
                      <div className="ctl dimstack">
                        <div className="dimrow">
                          <PickInput testId="comm-width-ft" label="Door width feet" min={0} max={maxFt ?? undefined} placeholder="ft" value={manFt}
                            options={range(6, maxFt ?? 24)} onChange={(v) => { if (v === "" || Number(v) >= 0) pickWidth(v, manIn); }} />
                          <span className="u">ft</span>
                          {/* A picker, not a number box: 12 or 20 inches used to price a
                              section that cannot be built. The engine re-checks this
                              too — the browser is not the gate. */}
                          <div className="selectwrap inpick">
                            <select
                              data-testid="comm-width-in"
                              value={manIn}
                              onChange={(e) => pickWidth(manFt, e.target.value)}
                            >
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={String(i)}>
                                  {i}
                                </option>
                              ))}
                            </select>
                          </div>
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
                  </div>

                  {/* Colour, end stiles and the lock (an intermediate section's only)
                      beside the section, as Brandon drew it (16/10/2026). */}
                  <div className="ggroup">
                    <div className="ghdr">Additional options</div>
                    {hasStileChoice && (
                      <>
                        <div className="grow">
                          <label>Color</label>
                          <div className="ctl selectwrap">
                            <select data-testid="comm-color" value={secColor} onChange={(e) => setSecColor(e.target.value as "White" | "Brown")} disabled={colorOpts.length === 1}>
                              {colorOpts.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="grow">
                          <label>End stiles</label>
                          <div className="ctl selectwrap">
                            <select data-testid="comm-end-stiles" value={stile} onChange={(e) => setStile(e.target.value as "single" | "double")}>
                              <option value="single">Single</option>
                              <option value="double">Double</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}
                    {lockOffered && (
                      <div className="grow">
                        <label>Lock</label>
                        <div className="ctl selectwrap">
                          <select data-testid="comm-sec-lock" value={lock} onChange={(e) => setLock(e.target.value as "none" | "lockbar" | "lockbar_installed")}>
                            <option value="none">No lock</option>
                            <option value="lockbar">Lockbar assembly</option>
                            <option value="lockbar_installed">Lockbar installed</option>
                          </select>
                        </div>
                      </div>
                    )}
                    {!hasStileChoice && (
                      <div className="grow"><label>&nbsp;</label><div className="ctl"><span className="muted-note">Any width — priced from the next standard section up. 21″ and 24″ are the same price.</span></div></div>
                    )}
                  </div>

                  {/* The section, drawn to its proportions as soon as it has a width
                      (16/10/2026): on a 524 or 2415 the stile measurements go under
                      the stiles, left to right (left blank, the line says they are
                      needed). On an intermediate section, Add windows opens the
                      panels — each says where to press — and a press puts a window
                      in, 24x12 with the smaller size in its dropdown. */}
                  {panels > 0 && (
                    <div className="ggroup span" data-testid="comm-drawing">
                      <PanelDiagram panels={panels} windows={glassOn ? new Set(winPanelsUsed) : null} onToggle={togglePanel}
                        sizes={winSizes} size={winSizeUsed} onSize={setWindowSize}
                        stiles={stileCount > 0 ? stileValsUsed : null} onStile={setStileVal} fixedStiles={stileFixed}
                        onAddStile={stileCount > 0 ? () => setExtraStiles((k) => k + 1) : undefined} onRemoveStile={removeStile}
                        widthIn={widthIn} heightIn={Number(secHeight)} />
                      {(secKind === "int" || stileCount > 0) && (
                        <div className="pnotes">
                          {stileCount > 0 && <div className="pnote-stiles">Enter in stile measurements — measurements are taken left to right.</div>}
                          {secKind === "int" && (
                            <button type="button" className={`btn${addingWindows ? " on" : ""}`} data-testid="comm-add-windows" aria-pressed={addingWindows}
                              onClick={() => { setAddingWindows((v) => !v); setWinPanels([]); }}>
                              Add windows
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <button data-testid="comm-get-price" className="btn primary configbtn" type="button" disabled={priced} onClick={getPrice}>
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
              <div className="field">
                <label className="lbl">Home owner surcharge</label>
                <div className="selectwrap">
                  <select data-testid="comm-homeowner" value={homeowner ? "yes" : "no"}
                    onChange={(e) => setHomeowner(e.target.value === "yes")}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
              </div>
              <div className="qtyrow">
                <label htmlFor="cqty">Quantity</label>
                <QtyStepper id="cqty" value={qty} onChange={(v) => setQty(Number(v))} />
              </div>
              <div className="total">
                <span className="tl">Door price (each)</span>
                <span className="tv" data-testid="comm-total">{fmt(unit + hoMarkup)}</span>
              </div>
              <div className="qfoot">
                <CopyQuickBooks item={QB_STOCK_DOORS} description={result.description ?? ""}
                  rate={unit + hoMarkup} qty={qty} testId="copy-qb" />
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
        rate={priceText(result.unitPrice)}
      />
    )}
    {result?.priced && (
      <EstimateSheet lines={[{ item: QB_ITEMS.commercial, desc: result.description ?? "", qty: Math.max(1, qty), rate: result.unitPrice }]} />
    )}
    </>
  );
}
