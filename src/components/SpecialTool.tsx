"use client";

import { useState } from "react";
import { useCustomerJob } from "@/components/CustomerJobFields";
import { CopyButton, CopyPrice, priceText } from "@/components/CopyButton";
import {
  SPECIAL, SPECIAL_COMMERCIAL, SPECIAL_COMMERCIAL_PINNED, SPECIAL_COMMERCIAL_SERIES,
  commercialSeriesOf, SO_MANUFACTURERS, seriesFor, hasSingleSeries,
} from "@/lib/pricing/data/special-orders";
import {
  specialDoorQuote, hasGrid, griddedWidths, griddedHeights,
  offeredHeights, tierForOfferedHeight, heightLabel,
  groupMembers, groupHasWidthLimits, heightForcesTorsion, shouldSplitGroup,
  minWidthFor, excludedWidthsFor,
  parseModelSelection, modelSelectionValue,
} from "@/lib/pricing/data/special-door-pricing";
import { COLORS } from "@/lib/pricing/data/catalog-meta";
import { homeownerMarkup } from "@/lib/pricing/engine";
import { sizeParts } from "@/lib/pricing/data/stock-colors";
import { windowDesigns } from "@/lib/pricing/data/inserts";

const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Ported 1:1 from the production tool's soNumbers():
//   margin series:     sell = list / (1 - margin/100); Ultra Grain swaps in the UG margin (no $ adder)
/**
 * Parse a price the way a counter actually types it.
 *
 * parseFloat stops at the first character it does not understand, so
 * "1,741.92" comes back as 1 — which then quoted a $1,741.92 door at $1.82.
 * Commas, dollar signs and spaces are all stripped before parsing, and anything
 * still not numeric returns NaN so the caller shows nothing rather than a
 * wrong number.
 */
export function parsePrice(raw: string): number {
  const cleaned = String(raw ?? "").replace(/[$,\s]/g, "");
  if (!/^\d*\.?\d+$/.test(cleaned)) return NaN;
  return parseFloat(cleaned);
}

function soNumbers(series: string, model: string, kind: "door" | "section", priceStr: string) {
  const ser = SPECIAL[series];
  const list = parsePrice(priceStr);
  if (!ser || Number.isNaN(list)) return null;

  // One rule for every series now: the counter enters the manufacturer's total
  // and a margin is applied to it. No multiplier, no small-section doubling —
  // both were removed 9/9/2026 when the outside makers moved to flat 45/49.
  //
  // The model's own margins where a series has a model table, the collection's
  // otherwise. Haas Doors and American Tradition are separate series, so they
  // need nothing special here.
  let margin: number;
  if (ser.models) {
    const md = ser.models[model];
    if (!md) return null;
    margin = kind === "section" ? md.section : md.door;
  } else {
    if (ser.door == null || ser.section == null) return null;
    margin = kind === "section" ? ser.section : ser.door;
  }
  return { sell: list / (1 - margin / 100), margin: margin as number | null, doubled: false };
}

// Commercial special orders: Clopay 3200/524 — 45% margin complete door, 49% sections.
function soCommercial(mfr: string, kind: "door" | "section", priceStr: string) {
  const cfg = SPECIAL_COMMERCIAL[mfr];
  const list = parsePrice(priceStr);
  if (!cfg || Number.isNaN(list)) return null;
  const margin = kind === "section" ? cfg.section : cfg.door;
  return { sell: list / (1 - margin / 100), margin };
}

export function SpecialTool() {
  const { custName, custPo, custJob } = useCustomerJob();
  const [scope, setScope] = useState<"residential" | "commercial">("residential");
  // residential
  const [rMfr, setRMfr] = useState("Clopay");
  const [series, setSeries] = useState("");
  const [model, setModel] = useState("");
  // commercial
  const [cMfr, setCMfr] = useState("Clopay");
  const [cSeries, setCSeries] = useState("");
  const [cModel, setCModel] = useState("");
  // shared
  const [kind, setKind] = useState<"door" | "section">("door");
  // Gridded configurator (4050/4051/4053 today). Independent of the manual
  // total below, which stays available for anything the grid does not cover.
  const [gWidth, setGWidth] = useState("");
  const [gStyle, setGStyle] = useState<"solid" | "glass" | "inserts">("solid");
  const [gColor, setGColor] = useState("White");
  const [gTrack, setGTrack] = useState("r12");
  const [gSpring, setGSpring] = useState("extension");
  const [gLock, setGLock] = useState("none");
  const [gDesign, setGDesign] = useState("");
  const [gHeight, setGHeight] = useState("");
  const [gVariant, setGVariant] = useState("");
  const [homeowner, setHomeowner] = useState(false);
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);

  // The dropdown value is "group:member" for split groups and the bare group
  // key otherwise. Pricing always keys on the group; the member rides along as
  // the variant so size limits and the description use the specific model.
  const { group: modelGroup, member: modelMember } = parseModelSelection(model);
  const ser = series ? SPECIAL[series] : null;
  const md = ser && ser.type === "margin" && ser.models && modelGroup ? ser.models[modelGroup] : null;
  // A margin collection with no model table needs no model chosen to price.
  const flatMargin = !!ser && !ser.models;


  // The collection dropdown carries the five daily models at the top, above the
  // series themselves. Picking one jumps straight to that model; picking a
  // series lists its models below. Model numbers and series names never look
  // alike, so one dropdown can hold both without ambiguity.
  const isPinnedModel = (v: string) => SPECIAL_COMMERCIAL_PINNED.includes(v);
  const commSeriesName = isPinnedModel(cSeries) ? (commercialSeriesOf(cSeries) ?? "") : cSeries;
  const commModels = SPECIAL_COMMERCIAL_SERIES.find((g) => g.name === commSeriesName)?.models ?? [];
  const resetGrid = () => { setGHeight(""); setGWidth(""); setGDesign(""); setGVariant(""); };
  const pickCommSeries = (v: string) => {
    setCSeries(v);
    // A pinned pick IS the model. A series pick clears it so one must be chosen.
    setCModel(isPinnedModel(v) ? v : "");
    setPrice("");
    setSaved(false);
  };

  // The configurator appears only for models Clopay has gridded. Everything
  // else keeps the manual total path exactly as it was.
  const gridded = scope === "residential" && !!modelGroup && hasGrid(modelGroup);
  // Heights come from the grid rather than a constant. Both models carry 7'0"
  // and 8'0" as of UPDATED_PRICING_9-8; a third arrives by regenerating the
  // data, with no change needed here.
  const gHeights = gridded ? offeredHeights(modelGroup) : [];
  const gTier = gridded && gHeight ? tierForOfferedHeight(gHeight, griddedHeights(modelGroup)) : null;
  // The grid is keyed by margin group; the models inside it are not built in
  // the same range, so the width list narrows once a specific one is chosen.
  const gMembers = gridded ? groupMembers(modelGroup) : [];
  // The top-level dropdown already names the model for a split group, so the
  // old "which model" question is asked only where it is still unanswered.
  const gNeedsVariant = gridded && groupHasWidthLimits(modelGroup) && !modelMember;
  // Width does not wait on height, and it keys on the GROUP — the dropdown
  // value for a split group is "4050/4051/4053:4051", which is not a grid key.
  // The member is the variant, so a 4053 selected up top narrows the widths
  // without needing the old sub-select.
  // A model with size restrictions routes a lot of real orders to the manual
  // box — the 4053 is built in 55 of the group's 73 widths — so for those the
  // total entry is presented as a normal required field rather than an
  // afterthought below the configurator.
  const restricted =
    !!modelMember && (minWidthFor(modelMember) !== null || excludedWidthsFor(modelMember).length > 0);

  const gWidths = gridded
    ? griddedWidths(modelGroup, gTier ?? undefined, modelMember || gVariant || undefined)
    : [];
  // At 9'0" and above the book prints no extension column — torsion is included
  // in the price, so the dropdown locks to it rather than offering a choice
  // that would be ignored.
  const gTorsionOnly = gridded && !!gHeight && heightForcesTorsion(gHeight, griddedHeights(modelGroup));
  const gResult = gridded && gWidth && gHeight
    ? specialDoorQuote({ model: modelGroup, width: gWidth, height: gHeight, style: gStyle, color: gColor,
        windesign: gDesign || undefined, variant: (modelMember || gVariant) || undefined,
        track: gTrack as never, spring: (gTorsionOnly ? "torsion" : gSpring) as never, lock: gLock as never })
    : null;
  const widthLabel = (w: string) => {
    const [ft, inch] = w.split(".");
    return `${ft}'${inch ?? 0}"`;
  };
  const gColors = COLORS["4050-4051-4053"] ?? COLORS[model] ?? ["White"];
  // The same insert list a residential 4050 offers, filtered the same way — by
  // model, style and door width.
  const gDesigns = gridded && gStyle === "inserts" && gWidth
    ? windowDesigns(model, "inserts", gWidth.split(".")[0])
    : [];

  // Grid first when it produced a price and the counter has not typed a total.
  // A typed total always wins: it is what someone reaches for precisely when
  // the grid is wrong for the job.
  const manual =
    scope === "residential"
      ? series ? soNumbers(series, modelGroup, kind, price) : null
      : cModel ? soCommercial(cMfr, kind, price) : null;
  const n =
    !manual && gResult?.quote
      ? { sell: gResult.quote.unitPrice, margin: null as number | null, doubled: false }
      : manual;

  // Homeowner markup, at the special-order rate. The width comes from the size
  // picker on a gridded door; on a typed-in total there is no width to read, so
  // the narrow band applies unless one was chosen.
  const hoWidth = gWidth ? sizeParts(gWidth) : { ft: 0, in: 0 };
  const hoMarkup = homeowner
    ? homeownerMarkup(hoWidth.ft, hoWidth.in, kind === "section" ? "special_section" : "special_door")
    : 0;
  const total = n ? (n.sell + hoMarkup) * Math.max(1, qty) : 0;

  // A gridded door carries a real QuickBooks description. Everything else keeps
  // the short label it has always had — there is nothing more to say about a
  // typed-in total than which model and whether it is a door or sections.
  const copyText = gResult?.quote?.description ?? null;
  const label =
    scope === "residential"
      ? flatMargin
        ? `${series} special order`
        : `${modelMember || modelGroup} ${kind === "section" ? "sections" : "door"}`
      : `${cMfr} ${cModel}${commercialSeriesOf(cModel) ? ` (${commercialSeriesOf(cModel)})` : ""} ${kind === "section" ? "sections" : "complete door"}`;

  function pickScope(v: "residential" | "commercial") {
    setScope(v); setSeries(""); setModel(""); setCSeries(""); setCModel(""); setKind("door"); setPrice(""); resetGrid(); setSaved(false);
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
        description: copyText ?? `${label} — Clopay list ${price}`,
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
              <>
                <div className="field"><label className="lbl">Manufacturer <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select
                      data-testid="so-mfr"
                      value={rMfr}
                      onChange={(e) => {
                        const m = e.target.value;
                        setRMfr(m);
                        // An outside maker has one series, so pick it outright
                        // rather than making the counter choose from a list of one.
                        pickSeries(hasSingleSeries(m) ? seriesFor(m)[0] : "");
                      }}
                    >
                      {SO_MANUFACTURERS.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                {!hasSingleSeries(rMfr) && (
                  <div className="field"><label className="lbl">Collection / series <span className="req">*</span></label>
                    <div className="selectwrap">
                      <select data-testid="so-series" value={series} onChange={(e) => pickSeries(e.target.value)}>
                        <option value="">Select…</option>
                        {seriesFor(rMfr).map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="field"><label className="lbl">Manufacturer <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select value={cMfr} onChange={(e) => { setCMfr(e.target.value); setCSeries(""); setCModel(""); setSaved(false); }}>
                      {Object.keys(SPECIAL_COMMERCIAL).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field"><label className="lbl">Collection / Series <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select data-testid="so-comm-series" value={cSeries} onChange={(e) => pickCommSeries(e.target.value)}>
                      <option value="">Select…</option>
                      {/* The five daily models sit above the series. Each also
                          appears inside its own series further down. */}
                      {SPECIAL_COMMERCIAL_PINNED.map((m) => (
                        <option key={`pin-${m}`} value={m}>{m}</option>
                      ))}
                      {SPECIAL_COMMERCIAL_SERIES.map((g) => (
                        <option key={g.name} value={g.name}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {cSeries && (
                  <div className="field"><label className="lbl">Model <span className="req">*</span></label>
                    <div className="selectwrap">
                      <select data-testid="so-comm-model" value={cModel} onChange={(e) => { setCModel(e.target.value); setSaved(false); }}>
                        <option value="">Select…</option>
                        {commModels.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>


          {scope === "residential" && ser && ser.type === "margin" && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{series}{ser.models ? " model" : ""}</h3></div>
              {ser.models && (
                <div className="field"><label className="lbl">Model <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select data-testid="so-model" value={model} onChange={(e) => { setModel(e.target.value); resetGrid(); setSaved(false); }}>
                      <option value="">Select…</option>
                      {Object.keys(ser.models).flatMap((g) =>
                        shouldSplitGroup(g)
                          ? groupMembers(g).map((m) => (
                              <option key={`${g}:${m}`} value={modelSelectionValue(g, m)}>{m}</option>
                            ))
                          : [<option key={g} value={g}>{g}{ser.models![g].new ? " (new)" : ""}</option>],
                      )}
                    </select>
                  </div>
                </div>
              )}
              {gridded && kind === "door" && (
                <>
                  <div className="ghdr" style={{ marginTop: 10 }}>Build a door</div>
                  {gNeedsVariant && (
                    <div className="field"><label className="lbl">Which model <span className="req">*</span></label>
                      <div className="selectwrap">
                        <select data-testid="so-variant" value={gVariant} onChange={(e) => { setGVariant(e.target.value); setGWidth(""); setSaved(false); }}>
                          <option value="">Select…</option>
                          {gMembers.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="muted-note">These share a price grid but not a size range.</div>
                    </div>
                  )}
                  <div className="row2">
                    <div className="field"><label className="lbl">Width <span className="req">*</span></label>
                      <div className="selectwrap">
                        <select data-testid="so-width" value={gWidth} onChange={(e) => { setGWidth(e.target.value); setSaved(false); }}>
                          <option value="">Select…</option>
                          {gWidths.map((w) => <option key={w} value={w}>{widthLabel(w)}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="field"><label className="lbl">Height <span className="req">*</span></label>
                      <div className="selectwrap">
                        <select data-testid="so-height" value={gHeight} onChange={(e) => { setGHeight(e.target.value); setSaved(false); }}>
                          <option value="">Select…</option>
                          {gHeights.map((h) => <option key={h} value={h}>{heightLabel(h)}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row2">
                    <div className="field"><label className="lbl">Color</label>
                      <div className="selectwrap">
                        <select value={gColor} onChange={(e) => { setGColor(e.target.value); setSaved(false); }}>
                          {gColors.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="field"><label className="lbl">Windows</label>
                      <div className="selectwrap">
                        <select data-testid="so-style" value={gStyle} onChange={(e) => { setGStyle(e.target.value as "solid" | "glass" | "inserts"); setSaved(false); }}>
                          <option value="solid">Solid — no windows</option>
                          <option value="glass">Glass</option>
                          <option value="inserts">Inserts</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {gDesigns.length > 0 && (
                    <div className="field">
                      <label className="lbl">Window design</label>
                      <div className="selectwrap">
                        <select data-testid="so-windesign" value={gDesign} onChange={(e) => { setGDesign(e.target.value); setSaved(false); }}>
                          <option value="">Select a design…</option>
                          {gDesigns.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="row2">
                    <div className="field"><label className="lbl">Spring</label>
                      <div className="selectwrap">
                        <select value={gTorsionOnly ? "torsion" : gSpring} disabled={gTorsionOnly}
                          onChange={(e) => { setGSpring(e.target.value); setSaved(false); }}>
                          {!gTorsionOnly && <option value="extension">Extension</option>}
                          <option value="torsion">Torsion</option>
                        </select>
                      </div>
                    </div>
                    <div className="field"><label className="lbl">Track lift / radius</label>
                      <div className="selectwrap">
                        <select value={gTrack} onChange={(e) => { setGTrack(e.target.value); setSaved(false); }}>
                          <option value="r10">10&quot; radius</option>
                          <option value="r12">12&quot; radius</option>
                          <option value="r15">15&quot; radius</option>
                          <option value="low_headroom">Low headroom</option>
                          <option value="r20">20&quot; radius</option>
                          <option value="r32">32&quot; radius</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <label className="lbl">Lock</label>
                    <div className="selectwrap">
                      <select value={gLock} onChange={(e) => { setGLock(e.target.value); setSaved(false); }}>
                        <option value="none">No lock</option>
                        <option value="slide">Inside slide lock</option>
                        <option value="lockbar">Lockbar assembly</option>
                        <option value="lockbar_installed">Lockbar installed</option>
                      </select>
                    </div>
                  </div>
                  {gResult?.reason && (
                    <div className="muted-note" style={{ marginTop: 6 }}>{gResult.reason}</div>
                  )}
                </>
              )}

              {(md || flatMargin) && (
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
                    <label className="lbl">{gridded && kind === "door" && !restricted
                      ? "Or enter a Clopay total for a configuration not listed above"
                      : "Enter total = sub total + energy surcharge — do not apply MPQ"} <span className="req">*</span></label>
                    {restricted && kind === "door" && (
                      <div className="muted-note" style={{ marginBottom: 6 }}>
                        The {modelMember} is not built in every size above — enter the Clopay total for anything the size picker will not take.
                      </div>
                    )}
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
                ? ser ? (flatMargin ? `Special order · ${kind === "section" ? "Sections" : "Door"}` : modelGroup ? `${modelMember || modelGroup} · ${kind === "section" ? "Sections" : "Door"}` : "Select a model") : "Select a series"
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
                <CopyButton text={(copyText ?? label).toUpperCase()} label="Copy description" primary onCopy={saveQuote} testId="so-copy-desc" />
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
