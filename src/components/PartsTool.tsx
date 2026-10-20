"use client";

import { Fragment, useMemo, useState } from "react";
import { CopyButton, CopyPrice, priceText } from "@/components/CopyButton";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { categoryItem } from "@/lib/pricing/data/quickbooks";
import { QbLineDemo } from "@/components/QbLineDemo";
import { QB_ITEMS } from "@/lib/qb/iif";
import {
  partDescription,
  partPrice,
  partQuantity,
  type Part,
} from "@/lib/pricing/data/parts";
import { PARTS_TAB_CATEGORIES } from "@/lib/pricing/data/springs";
import type { PartCategory } from "@/lib/pricing/data/parts";
import type { SearchPick } from "@/lib/search";
import { entryId, feetAsQuantity, type PartsMenu } from "@/lib/pricing/data/parts-menu";
import { PartsNavigator } from "./PartsNavigator";
import { cableQuote, CABLE_GAUGES } from "@/lib/pricing/data/cables";
import { feetLimits, isLockbar, isSolidShaft, measuredToInch, partColors, pieceCounted, priceNoteText, priceNotSet, takesLength } from "@/lib/pricing/data/part-pricing";
import { QtyStepper } from "./QtyStepper";
import { PickInput, range } from "./PickInput";
import { COMMERCIAL_TRACK, COMMERCIAL_TRACK_HEIGHTS, COMMERCIAL_TRACK_SUB, commercialTrackAt } from "@/lib/pricing/data/commercial-track";
import { RESIDENTIAL_TRACK_SUB, pickResidentialTrack, radiiFor, residentialTrackSets, trackHeightFor } from "@/lib/pricing/data/residential-track";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const CUSTOM_CABLE = "Custom cut cable";

/**
 * Counter lookup for the parts shelf.
 *
 * Two ways in, because the counter uses both: pick a category when you know
 * roughly where a part lives, or type when you know what it is called. Search
 * runs across every category at once so nobody has to guess whether a jamb seal
 * files under RETAINERS or FASTENERS.
 *
 * Everything here bills to the one QuickBooks item, PARTS. Vinyl has its own
 * tab and its own item because it is measured off a door rather than picked off
 * a shelf.
 *
 * Springs are gone from this shelf entirely — not hidden, gone. Extension
 * springs have their own tab and stock torsion springs sit under the
 * configurator on the Torsion Springs tab, so browsing AND search here run over
 * SHELF_PART_CATEGORIES. Searching "spring" on this tab finds spring bumpers
 * and nothing else; that is deliberate, so there is exactly one place to quote
 * a spring from.
 */
export function PartsTool({
  categories = PARTS_TAB_CATEGORIES,
  eyebrow = "Parts quote",
  finder = "Find a part",
  openOn,
  menu,
  group,
}: {
  /** Groups of pages, shown as buttons (the Parts and Track tabs, 6/10/2026).
      Without one the tab keeps its category list (Cables). */
  menu?: PartsMenu;
  /** Open on this group — a group tab (Tools, Angle…) opens on its own. */
  group?: string;
  /** A part chosen in the top bar's search: open on it, already picked. */
  openOn?: SearchPick;
  /** What this tab browses and searches. The Track and Cables tabs pass their
      one category; the Parts tab gets the rest of the shelf (29/9/2026). */
  categories?: PartCategory[];
  eyebrow?: string;
  finder?: string;
} = {}) {
  const start = openOn?.kind === "part" && categories.some((c) => c.name === openOn.category) ? openOn : null;
  const [catName, setCatName] = useState(start?.category ?? categories[0]?.name ?? "");
  const [pickedName, setPickedName] = useState<string | null>(start?.name ?? null);
  // The open drop-down page, as "Group|Entry". A part found by the top bar's
  // search opens the page it sits on.
  const pages = useMemo(
    () => (menu ?? []).flatMap((g) => g.entries.map((e) => ({ id: entryId(g, e), group: g.label, entry: e }))),
    [menu],
  );
  const [pageId, setPageId] = useState<string | null>(() => {
    if (start) return pages.find((pg) => pg.entry.parts.some((mp) => mp.category === start.category && mp.part.name === start.name))?.id ?? null;
    const g = menu?.find((x) => x.label === group);
    return g && g.entries.length === 1 ? entryId(g, g.entries[0]) : null;
  });
  const page = pages.find((pg) => pg.id === pageId) ?? null;
  const [groupLabel, setGroupLabel] = useState<string | null>(() => page?.group ?? (menu?.some((g) => g.label === group) ? group! : null));
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("0");
  // The colour of a part sold in several (the jamb seal: white, black, brown — 13/10/2026).
  const [partColor, setPartColor] = useState("White");
  // Cut-to-length cables: measured feet + inches, priced as a pair.
  const [cabGauge, setCabGauge] = useState(CABLE_GAUGES[0].label);
  const [cabFt, setCabFt] = useState("");
  const [cabIn, setCabIn] = useState("");
  // Torsion springs are ordered by hand — a pair is one right and one left.
  const [right, setRight] = useState(1);
  const [left, setLeft] = useState(1);
  // The Track tab's complete sets (Brandon, 12/10/2026): a residential set is
  // picked from the door size and a radius, like the residential
  // configuration; the commercial sets are shown by height.
  const [trkWFt, setTrkWFt] = useState("");
  const [trkWIn, setTrkWIn] = useState("0");
  const [trkHFt, setTrkHFt] = useState("");
  const [trkHIn, setTrkHIn] = useState("0");
  const [trkRadius, setTrkRadius] = useState("");
  const [trkHeight, setTrkHeight] = useState("");

  const onCable = catName === "CABLES" && pickedName === CUSTOM_CABLE;
  const cabQ = onCable ? cableQuote(cabGauge, Number(cabFt) || 0, Number(cabIn) || 0) : null;

  // The open page's parts, or (Cables) the chosen category's. Searching is the
  // top bar's job alone since 6/10/2026.
  const results = useMemo(() => {
    if (menu) return (page?.entry.parts ?? []).map((mp) => ({ part: mp.part, category: mp.category }));
    const cat = categories.find((c) => c.name === catName);
    return (cat?.items ?? []).map((p) => ({ part: p, category: cat?.name ?? catName }));
  }, [catName, categories, menu, page]);
  // A drop-down page already says what it holds, so no headings inside it.
  const grouped = !menu && results.length > 0 && results.every((r) => r.part.sub);

  // The complete-track pages: every part on the page is a residential set, or
  // every part a commercial one.
  const trackPage = results.length === 0 ? null
    : results.every((r) => r.part.sub === RESIDENTIAL_TRACK_SUB) ? "residential"
    : results.every((r) => r.part.sub === COMMERCIAL_TRACK_SUB) ? "commercial"
    : null;
  const resSets = useMemo(() => (trackPage === "residential" ? residentialTrackSets(results.map((r) => r.part)) : []), [trackPage, results]);
  const trkWidthIn = (Math.max(0, Math.trunc(Number(trkWFt) || 0))) * 12 + (Number(trkWIn) || 0);
  const trkHeightIn = (Math.max(0, Math.trunc(Number(trkHFt) || 0))) * 12 + (Number(trkHIn) || 0);
  const trkSetHeight = trackPage === "residential" ? trackHeightFor(resSets, trkHeightIn) : null;
  const trkRadii = radiiFor(resSets, trkSetHeight);
  const trkRadiusEff = trkRadii.includes(trkRadius) ? trkRadius : "";
  const trackPick = trackPage === "residential" ? pickResidentialTrack(resSets, trkWidthIn, trkHeightIn, trkRadiusEff) : null;

  const hit = onCable ? null : trackPick ? { part: trackPick.part, category: results[0].category } : results.find((r) => r.part.name === pickedName) ?? null;
  const part: Part | null = hit?.part ?? null;

  // U and L retainers, lock bars and raw track take feet and inches
  // (9/10/2026, raw track 12/10/2026); other per-foot parts whole feet. A lock
  // bar's length goes on the line only — the price is the same at any length.
  const toInch = !!part && measuredToInch(part);
  const lockbar = !!part && isLockbar(part);
  const ft = toInch
    ? Math.max(0, Math.trunc(Number(feet) || 0)) + Math.min(11, Math.max(0, Math.trunc(Number(inches) || 0))) / 12
    : Math.max(0, Math.trunc(Number(feet) || 0));
  const needsFeet = !!part && takesLength(part);
  const needsHands = !!part?.hands;
  const colors = part ? partColors(part) : [];
  const colorUsed = colors.includes(partColor) ? partColor : colors[0];
  // Raw track is sold 1FT to 24FT only (30/9/2026); outside that, no line.
  const limits = part ? feetLimits(part) : null;
  const feetOk = !limits || (ft >= limits.min && ft <= limits.max);

  const ready = onCable
    ? !!cabQ
    : !!part && (!needsFeet || (ft > 0 && feetOk)) && (!needsHands || right + left > 0);
  const description = onCable
    ? (cabQ?.description ?? "")
    : trackPick
      ? trackPick.description
      : part
        ? partDescription(part, ft, right, left, colorUsed)
        : "";
  // A part with no price yet has no price here — never its placeholder 0 — so
  // the card says so and offers nothing to paste or add to the cart.
  const price: number | null = onCable ? (cabQ?.total ?? 0) : part ? (priceNotSet(part) ? null : partPrice(part, ft)) : 0;
  // Seals paste the feet as the quantity, at the price per foot (7/10/2026).
  const feetQty = !onCable && !!part?.perFoot && feetAsQuantity(hit?.category ?? catName, part.name);
  const qtyText = onCable ? "1" : feetQty ? `${ft} ft` : part ? String(partQuantity(part, right, left)) : "1";
  // The complete-track pages name the set by what was chosen, not the shelf's name.
  const commPick = trackPage === "commercial" && part ? COMMERCIAL_TRACK.find((x) => x.part.name === part.name) ?? null : null;
  const title = onCable ? CUSTOM_CABLE
    : trackPick ? `${trkSetHeight}' set, ${trkRadiusEff}`
    : commPick ? `${commPick.height}FT — ${commPick.label}`
    : (part?.name ?? "");
  const showing = onCable || !!part;

  function pick(name: string) {
    setPickedName(name);
    setFeet("");
    setInches("0");
    setRight(1);
    setLeft(1);
    setPartColor("White");
  }

  /** Open a drop-down page. A page holding one part picks it straight away. */
  function openPage(id: string) {
    const pg = pages.find((x) => x.id === id);
    if (!pg) return;
    setPageId(id);
    setGroupLabel(pg.group);
    setCatName(pg.entry.parts[0]?.category ?? catName);
    if (pg.entry.parts.length === 1) pick(pg.entry.parts[0].part.name);
    else setPickedName(null);
  }

  /** Open a group: straight to its page if it has only one. */
  function openGroup(label: string) {
    const g = menu?.find((x) => x.label === label);
    if (!g) return;
    if (g.entries.length === 1) return openPage(entryId(g, g.entries[0]));
    setGroupLabel(label);
    setPageId(null);
    setPickedName(null);
  }

  // One level showing at a time (Brandon's wireframe, 12/10/2026): the groups,
  // then the chosen group's pages, then the page's parts — each with a Back
  // button in its header. A one-group tab starts on its pages, so there is
  // nothing above them to go back to; a group with one page opens straight
  // onto it, so Back from there is the groups.
  const alone = !!menu && menu.length === 1;
  const openGroupObj = menu ? (alone ? menu[0] : menu.find((g) => g.label === groupLabel) ?? null) : null;
  const level: 0 | 1 | 2 = page ? 2 : openGroupObj ? 1 : 0;
  const canBack = level === 2 ? !(alone && openGroupObj!.entries.length === 1) : level === 1 && !alone;
  function back() {
    if (level === 2) {
      setPickedName(null);
      setPageId(null);
      if (!alone && (openGroupObj?.entries.length ?? 0) === 1) setGroupLabel(null);
      return;
    }
    if (level === 1 && !alone) setGroupLabel(null);
  }
  const pageTitle = page ? (page.group === page.entry.label ? page.group : `${page.group} › ${page.entry.label}`) : "";

  function clear() {
    setPickedName(null);
    setFeet("");
    setInches("0");
    setCabFt("");
    setCabIn("");
    setTrkWFt(""); setTrkWIn("0"); setTrkHFt(""); setTrkHIn("0"); setTrkRadius("");
  }

  return (
    <>
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              {menu ? (
              <div className="ggroup">
                <div className={`ghdr${canBack ? " pnav-head" : ""}`}>
                  {canBack && (
                    <button type="button" className="btn backbtn" data-testid="pnav-back" onClick={back}>&lsaquo; Back</button>
                  )}
                  {level === 0 ? finder
                    : level === 1 ? <span data-testid="pnav-title">{openGroupObj!.label}</span>
                    : <span data-testid="parts-page">{pageTitle}</span>}
                </div>
                {level < 2 ? (
                  <div className="gbody pnav-body">
                    <PartsNavigator menu={menu} open={openGroupObj} page={pageId} onGroup={openGroup} onPage={openPage} />
                  </div>
                ) : trackPage === "residential" ? (
                  <div className="gbody" data-testid="track-res">
                    <div className="grow"><label>Width</label>
                      <div className="ctl dimrow">
                        <PickInput testId="track-width-ft" label="Width feet" min={0} placeholder="ft" value={trkWFt} options={range(6, 24)}
                          onChange={(v) => { if (v === "" || Number(v) >= 0) setTrkWFt(v); }} />
                        <span className="u">ft</span>
                        <select data-testid="track-width-in" className="insel" aria-label="Width inches" value={trkWIn} onChange={(e) => setTrkWIn(e.target.value)}>
                          {["0", "2", "4", "6", "8", "10"].map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                        <span className="u">in</span>
                      </div>
                    </div>
                    <div className="grow"><label>Height</label>
                      <div className="ctl dimrow">
                        <PickInput testId="track-height-ft" label="Height feet" min={0} placeholder="ft" value={trkHFt} options={range(6, 16)}
                          onChange={(v) => { if (v === "" || Number(v) >= 0) setTrkHFt(v); }} />
                        <span className="u">ft</span>
                        <select data-testid="track-height-in" className="insel" aria-label="Height inches" value={trkHIn} onChange={(e) => setTrkHIn(e.target.value)}>
                          {["0", "3", "6", "9"].map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                        <span className="u">in</span>
                      </div>
                    </div>
                    <div className="grow"><label>Radius</label>
                      <div className="ctl selectwrap">
                        <select data-testid="track-radius" value={trkRadiusEff} disabled={trkRadii.length === 0} onChange={(e) => setTrkRadius(e.target.value)}>
                          {!trkRadiusEff && <option value="">{trkRadii.length ? "Select radius…" : "Enter the door size"}</option>}
                          {trkRadii.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : trackPage === "commercial" ? (
                  <>
                    <div className="gbody" data-testid="track-comm">
                      <div className="grow"><label>Show options:</label>
                        <div className="pnav-pages" role="group" aria-label="Door height">
                          {COMMERCIAL_TRACK_HEIGHTS.map((h) => (
                            <button key={h} type="button" data-testid={`track-height-${h}`} className={`pnav-page${h === trkHeight ? " on" : ""}`}
                              aria-pressed={h === trkHeight} onClick={() => { setTrkHeight(h); setPickedName(null); }}>
                              {h}FT
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    {trkHeight && (
                      <ul className="partlist" data-testid="parts-list">
                        {commercialTrackAt(trkHeight).map((o) => (
                          <li key={o.part.name}>
                            <button type="button" className={`partrow ${pickedName === o.part.name ? "on" : ""}`} onClick={() => pick(o.part.name)}>
                              <span className="partname">{o.label}</span>
                              <span className="partprice">{fmt(o.part.price)}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <ul className="partlist" data-testid="parts-list">
                    {results.map(({ part: p, category }) => (
                      <li key={`${category}-${p.name}`}>
                        <button
                          type="button"
                          className={`partrow ${pickedName === p.name ? "on" : ""}`}
                          onClick={() => pick(p.name)}
                        >
                          {/* A page picked from the buttons already says what it holds. */}
                          <span className="partname">{p.name}</span>
                          <span className="partprice">
                            {priceNotSet(p) ? priceNoteText(p) : fmt(p.price)}
                            {p.perFoot && !priceNotSet(p) && <span className="perft">/ft</span>}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              ) : (
              <>
              <div className="ggroup">
                <div className="ghdr">{finder}</div>
                <div className="gbody">
                  {/* One category (Cables): nothing to choose. */}
                  {categories.length > 1 && (
                  <div className="grow">
                    <label>Category</label>
                    <div className="ctl selectwrap">
                      <select
                        data-testid="parts-category"
                        value={catName}
                        onChange={(e) => {
                          setCatName(e.target.value);
                          setPickedName(null);
                        }}
                      >
                        {categories.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} ({c.items.length})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  )}
                </div>
              </div>

              <div className="ggroup" style={{ marginTop: 14 }}>
                <div className="ghdr" data-testid="parts-page">{catName}</div>
                <ul className="partlist" data-testid="parts-list">
                  {catName === "CABLES" && (
                    <li>
                      <button
                        type="button"
                        className={`partrow ${onCable ? "on" : ""}`}
                        onClick={() => pick(CUSTOM_CABLE)}
                      >
                        <span className="partname">
                          {CUSTOM_CABLE}
                          <span className="partsub">cut to length, priced per pair</span>
                        </span>
                      </button>
                    </li>
                  )}
                  {results.map(({ part: p, category }, i) => (
                    <Fragment key={`${category}-${p.name}`}>
                    {/* A list where every item has a heading (Track) shows the
                        headings as rows of their own, so a group is never
                        hidden below the fold with nothing saying it is there. */}
                    {grouped && p.sub !== results[i - 1]?.part.sub && (
                      <li className="partgroup" data-testid="parts-group">{p.sub}</li>
                    )}
                    <li>
                      <button
                        type="button"
                        className={`partrow ${!onCable && pickedName === p.name ? "on" : ""}`}
                        onClick={() => pick(p.name)}
                      >
                        <span className="partname">
                          {p.name}
                          {p.sub && !grouped && <span className="partsub">{p.sub}</span>}
                        </span>
                        <span className="partprice">
                          {priceNotSet(p) ? priceNoteText(p) : fmt(p.price)}
                          {p.perFoot && !priceNotSet(p) && <span className="perft">/ft</span>}
                        </span>
                      </button>
                    </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
              </>
              )}
            </div>
          </div>
        </section>

        <aside className="quote">
          <div className="qcard">
            <div className="qhead">
              <div className="qeyebrow">{eyebrow}</div>
              <div className="qtitle">{showing ? title : "No part selected"}</div>
            </div>

            {!showing ? (
              <div className="empty">
                <div className="emptymsg">
                  {trackPage === "residential"
                    ? trkWidthIn > 0 && trkHeightIn > 0 && trkRadiusEff ? "No set stocked for this size" : "Enter the door size and radius"
                    : trackPage === "commercial" ? "Pick a height, then a set" : "Pick a part from the list"}
                </div>
              </div>
            ) : (
              <>
                {onCable && (
                  <div className="gbody">
                    <div className="grow">
                      <label>Cable size</label>
                      <div className="ctl selectwrap">
                        <select
                          data-testid="cable-gauge"
                          value={cabGauge}
                          onChange={(e) => setCabGauge(e.target.value)}
                        >
                          {CABLE_GAUGES.map((g) => (
                            <option key={g.label} value={g.label}>
                              {g.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grow">
                      <label>Length</label>
                      <div className="ctl dimrow">
                        <PickInput testId="cable-ft" label="Length feet" min={0} value={cabFt} options={range(6, 30)} onChange={setCabFt} placeholder="ft" />
                        <span className="u">ft</span>
                        <PickInput testId="cable-in" label="Length inches" min={0} max={11} value={cabIn} options={range(0, 11)} onChange={setCabIn} placeholder="in" />
                        <span className="u">in</span>
                      </div>
                      <div className="muted-note" style={{ marginTop: 6 }}>
                        Sold as a pair. 5&Prime; and over rounds up to the next foot.
                      </div>
                    </div>
                  </div>
                )}

                {needsHands && (
                  <div className="gbody">
                    <div className="grow">
                      <label className="lbl">Right Wound</label>
                      <div className="ctl">
                        <QtyStepper testId="part-right" min={0} value={right} label="Right wound"
                          onChange={(v) => setRight(Math.max(0, Math.trunc(Number(v)) || 0))} />
                      </div>
                    </div>
                    <div className="grow">
                      <label className="lbl">Left Wound</label>
                      <div className="ctl">
                        <QtyStepper testId="part-left" min={0} value={left} label="Left wound"
                          onChange={(v) => setLeft(Math.max(0, Math.trunc(Number(v)) || 0))} />
                      </div>
                      <div className="muted-note" style={{ marginTop: 6 }}>
                        Priced each — the quantity carries the count
                      </div>
                    </div>
                  </div>
                )}

                {colors.length > 0 && (
                  <div className="gbody">
                    <div className="grow">
                      <label>Color</label>
                      <div className="ctl selectwrap">
                        <select data-testid="parts-color" value={colorUsed} onChange={(e) => setPartColor(e.target.value)}>
                          {colors.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {needsFeet && (
                  <div className="gbody">
                    <div className="grow">
                      <label>{toInch ? "How long?" : "How many feet?"}</label>
                      <div className={toInch ? "ctl dimrow" : "ctl"}>
                        <PickInput
                          testId="parts-feet"
                          label={toInch ? "Feet" : "How many feet"}
                          min={limits?.min ?? (toInch ? 0 : 1)}
                          max={limits?.max}
                          value={feet}
                          options={range(limits?.min ?? (toInch ? 6 : 1), limits?.max ?? (toInch ? 24 : 100))}
                          onChange={setFeet}
                          placeholder={limits ? `${limits.min} to ${limits.max}` : toInch ? "ft" : "e.g. 50"}
                        />
                        {toInch && (
                          <>
                            <span className="u">ft</span>
                            <select data-testid="parts-inches" className="insel" aria-label="Inches" value={inches}
                              onChange={(e) => setInches(e.target.value)}>
                              {Array.from({ length: 12 }, (_, i) => String(i)).map((v) => <option key={v} value={v}>{v}</option>)}
                            </select>
                            <span className="u">in</span>
                          </>
                        )}
                      </div>
                      {limits && ft > 0 && !feetOk && (
                        <div className="muted-note err" role="alert" style={{ marginTop: 6 }} data-testid="parts-feet-error">
                          {lockbar ? "Lock bars are cut" : isSolidShaft(part!) ? "Solid shaft is sold" : "Raw track is sold"} from {limits.min} to {limits.max} ft.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {ready ? (
                  <>
                    {price == null && (
                      <div className="muted-note" style={{ margin: "0 20px 12px" }}>
                        This one has no price yet — look it up before the order goes out.
                      </div>
                    )}
                    <div className="total">
                      <span>Quantity {qtyText}</span>
                      {/* Seals show their price per foot, the rate on the line, not the run's
                          total (Brandon, 7/10/2026). */}
                      <b data-testid="parts-price">
                        {price == null ? priceNoteText(part!) : feetQty ? fmt(part!.price) : fmt(price)}
                        {feetQty && price != null && <span className="perft">/ft</span>}
                      </b>
                    </div>
                    <div className="qfoot">
                      {/* A retainer's or a strut's "[1] - 16FT" counts the
                          pieces: the count follows the quantity (16/10/2026). */}
                      {price != null && (
                        <CopyQuickBooks item={categoryItem(hit?.category ?? catName)} description={description}
                          {...(feetQty ? { qty: ft } : {})} counted={!onCable && !trackPick && pieceCounted(description)}
                          rate={feetQty ? part!.price : price} testId="parts-copy-qb" />
                      )}
                      <button className="btn" type="button" onClick={clear}>
                        Clear
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty">
                    <div className="emptymsg">
                      {onCable
                        ? "Enter the cable length"
                        : needsHands
                          ? "Enter how many rights and lefts"
                          : "Enter the footage to price this part"}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </aside>
      </div>

      {ready && (
        <QbLineDemo
          model={onCable ? "Cut cable" : (part?.name ?? "")}
          size={onCable ? `${cabQ?.gauge} · ${cabQ?.feet}′${cabQ?.inches}″` : (hit?.category ?? catName)}
          item={QB_ITEMS.parts}
          typed="PAR"
          description={description}
          qty={feetQty ? String(ft) : qtyText}
          rate={priceText(feetQty ? part!.price : (price ?? 0))}
        />
      )}
    </>
  );
}
