"use client";

import { useState } from "react";
import type { SearchPick } from "@/lib/search";
import { useCustomerJob } from "@/components/CustomerJobFields";
import { priceText } from "@/components/CopyButton";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { QB_SPECIAL_ORDERS, QB_VINYL } from "@/lib/pricing/data/quickbooks";
import { vinylForDoor, vinylForDoorColor } from "@/lib/pricing/data/vinyl";
import { VinylPrompt, YES_NO } from "./VinylPrompt";
import {
  SPECIAL, SPECIAL_COMMERCIAL, SPECIAL_COMMERCIAL_PINNED, SPECIAL_COMMERCIAL_SERIES,
  commercialSeriesOf, SO_MANUFACTURERS, seriesFor, hasSingleSeries, modelGroupsOf,
} from "@/lib/pricing/data/special-orders";
import {
  specialDoorQuote, hasGrid, griddedWidths, griddedHeights,
  offeredHeights, tierForOfferedHeight, heightLabel,
  groupMembers, groupHasWidthLimits, heightForcesTorsion, torsionIncluded, highLiftOffered, shouldSplitGroup,
  minWidthFor, excludedWidthsFor,
  parseModelSelection, modelSelectionValue, windowsOfferedAt,
} from "@/lib/pricing/data/special-door-pricing";
import { COLORS, specialOrderColors } from "@/lib/pricing/data/catalog-meta";
import { designsBuilt, designLabel, designTakesWindows, hasDesigns, secondColorName, secondColors } from "@/lib/pricing/data/door-designs";
import { isSheetGroup, windowsPricedAt } from "@/lib/pricing/data/so-glass";
import {
  splitSize, sizeKey, feetOptions, inchOptions, glassTypeOptions, framingOptions, windowChoice, GLAZED_SECTIONS,
} from "@/lib/pricing/data/so-framing";
import {
  TRACK_MOUNTS, INCLINE_STYLES, highLiftChoices, highLiftPrice, canTakeHighLift,
  type TrackMount, type InclineStyle,
} from "@/lib/pricing/data/track-lift";
import { dataKey } from "@/lib/pricing/model-groups";
import { homeownerMarkupForBand } from "@/lib/pricing/engine";
import { OptionButtons, type ButtonOption } from "./OptionButtons";
import { DoorDiagram } from "./DoorDiagram";
import { modernFramings, modernGlassOptions, modernPanelsWide, modernPickerModel, modernStack, placeKey, type WindowPlace } from "@/lib/pricing/data/modern-steel";
import { QtyStepper } from "./QtyStepper";

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

// Complete door or one replacement section. On a model with a price grid this
// also picks the route: a door opens the configurator, a section goes to the
// typed Clopay total. Asked in step 1, as buttons, like the stock tabs.
const SO_ASSEMBLIES: ButtonOption<"door" | "section">[] = [
  { value: "door", label: "Complete door", icon: "door" },
  { value: "section", label: "Replacement section", icon: "section" },
];
const SO_C_ASSEMBLIES: ButtonOption<"door" | "section">[] = [
  { value: "door", label: "Complete door", icon: "door" },
  { value: "section", label: "Sections", icon: "sections" },
];

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

export function SpecialTool({ openOn }: { openOn?: SearchPick } = {}) {
  // A door chosen in the top bar's search opens at step 1 with it chosen.
  const start = openOn?.kind === "sodoor" ? openOn : null;
  const res = start?.scope === "residential" ? start : null;
  const com = start?.scope === "commercial" ? start : null;
  const { custName, custPo, custJob } = useCustomerJob();
  // Empty until the counter picks one — a special order is residential or
  // commercial before anything else can be asked.
  const [scope, setScope] = useState<"" | "residential" | "commercial">(start?.scope ?? "");
  // residential
  const [rMfr, setRMfr] = useState(res?.mfr ?? "Clopay");
  const [series, setSeries] = useState(res?.series ?? "");
  const [model, setModel] = useState(res?.model ?? "");
  // commercial
  const [cMfr, setCMfr] = useState(com?.mfr ?? "Clopay");
  const [cSeries, setCSeries] = useState(com?.series ?? "");
  const [cModel, setCModel] = useState(com?.model ?? "");
  // shared
  const [kind, setKind] = useState<"door" | "section">("door");
  // Gridded configurator (4050/4051/4053 today). Independent of the manual
  // total below, which stays available for anything the grid does not cover.
  // The size as two boxes each, feet and inches, like the stock tab's (Brandon,
  // 12/10/2026); the grid key ("8.2") is put together from them.
  const [gWidthFt, setGWidthFt] = useState("");
  const [gWidthIn, setGWidthIn] = useState("0");
  const [gHeightFt, setGHeightFt] = useState("");
  const [gHeightIn, setGHeightIn] = useState("0");
  // No default: the counter has to choose the color — Brandon, 25/9/2026.
  const [gColor, setGColor] = useState("");
  // The door's design and second colour — the Coachman's overlay, the
  // Bridgeport Inlay's inlay (Brandon, 12/10/2026). The design has to be
  // chosen; the second colour follows the door's until one is picked.
  const [gCdDesign, setGCdDesign] = useState("");
  const [gOverlay, setGOverlay] = useState("");
  // Every option starts blank and has to be chosen (Brandon, 19/10/2026):
  // glass, framing, spring, track, mount, and the lock last — it opens once
  // the rest are chosen, and the door prices once it is. The homeowner
  // surcharge is the one exception: No unless changed.
  const [gTrack, setGTrack] = useState("");
  const [gSpring, setGSpring] = useState("");
  const [gLock, setGLock] = useState("");
  const [gVariant, setGVariant] = useState("");
  // Two steps, the same shape as the stock tabs: choose the door, then build it.
  const [step, setStep] = useState(1);
  // The window choices read like the stock tab's: a glass type (Solid first),
  // the section glazed and the framing (plain windows, then each insert) —
  // so-framing.ts turns them into what the quote needs.
  const [gGlass, setGGlass] = useState("");
  const [gFraming, setGFraming] = useState("");
  const [gSection, setGSection] = useState("4");
  // A Modern Steel door's windows: where they were pressed in on the door
  // drawing, and their framing (Brandon, 19/10/2026).
  const [gWinPlaces, setGWinPlaces] = useState<ReadonlySet<string>>(new Set());
  const [gModernFraming, setGModernFraming] = useState("");
  // Track mount, high lift and incline. These live on special order rather than
  // residential: a stock door ships on standard track, and anything else is an
  // order Clopay builds to spec.
  const [gMount, setGMount] = useState<TrackMount | "">("");
  const [gIncline, setGIncline] = useState<InclineStyle | "">("");
  const [gLift, setGLift] = useState(0);
  const [homeowner, setHomeowner] = useState<"no" | "single" | "double">("no");
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
  // Vinyl molding for a configured door, asked once the door prices and
  // changeable after, as the stock tab does it (Brandon, 14/10/2026).
  const [vinylOn, setVinylOn] = useState(false);
  const [vinylAsked, setVinylAsked] = useState(false);
  const resetGrid = () => {
    setGWidthFt(""); setGWidthIn("0"); setGHeightFt(""); setGHeightIn("0"); setGColor(""); setGCdDesign(""); setGOverlay("");
    setGGlass(""); setGFraming(""); setGVariant(""); setGWinPlaces(new Set()); setGModernFraming("");
    setGSpring(""); setGTrack(""); setGMount(""); setGIncline(""); setGLift(0); setGLock(""); setHomeowner("no");
    setVinylOn(false); setVinylAsked(false);
  };
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
  // The grid is keyed by margin group; the models inside it are not built in
  // the same range, so the width list narrows once a specific one is chosen.
  const gMembers = gridded ? groupMembers(modelGroup) : [];
  // The top-level dropdown already names the model for a split group, so the
  // old "which model" question is asked only where it is still unanswered.
  const gNeedsVariant = gridded && groupHasWidthLimits(modelGroup) && !modelMember;
  const member = modelMember || gVariant || modelGroup.split("/")[0];
  // A model with size restrictions routes a lot of real orders to the manual
  // box — the 4053 is built in 55 of the group's 73 widths — so for those the
  // total entry is presented as a normal required field rather than an
  // afterthought below the configurator.
  const restricted =
    !!modelMember && (minWidthFor(modelMember) !== null || excludedWidthsFor(modelMember).length > 0);

  // Width and height: every size the grid carries for this model, offered as
  // feet then inches, like the stock tab. The inches follow the feet chosen.
  const gWidths = gridded ? griddedWidths(modelGroup, undefined, modelMember || gVariant || undefined) : [];
  const gHeights = gridded ? offeredHeights(modelGroup) : [];
  const widthFeet = feetOptions(gWidths);
  const widthInches = inchOptions(gWidths, gWidthFt);
  const heightFeet = feetOptions(gHeights);
  const heightInches = inchOptions(gHeights, gHeightFt);
  const gWidth = gWidths.includes(sizeKey(gWidthFt, gWidthIn)) ? sizeKey(gWidthFt, gWidthIn) : "";
  const gHeight = gHeights.includes(sizeKey(gHeightFt, gHeightIn)) ? sizeKey(gHeightFt, gHeightIn) : "";
  const pickWidthFt = (ft: string) => { setGWidthFt(ft); setGWidthIn(ft ? (inchOptions(gWidths, ft)[0] ?? "0") : "0"); setSaved(false); };
  const pickHeightFt = (ft: string) => { setGHeightFt(ft); setGHeightIn(ft ? (inchOptions(gHeights, ft)[0] ?? "0") : "0"); setSaved(false); };
  const gTier = gridded && gHeight ? tierForOfferedHeight(gHeight, griddedHeights(modelGroup)) : null;
  // At 9'0" and above the book prints no extension column — torsion is included
  // in the price, so the dropdown locks to it rather than offering a choice
  // that would be ignored. A sheet priced with torsion at every height (the
  // Coachman) locks it from the start.
  const gTorsionOnly = gridded && !!gHeight && (heightForcesTorsion(gHeight, griddedHeights(modelGroup)) || torsionIncluded(modelGroup));

  // The door's design, from what Clopay builds at the size (12/10/2026); the
  // Coachman's series 3 and 4 designs come solid only.
  const gDesigned = gridded && hasDesigns(modelGroup);
  const gDesignOptions = gDesigned ? designsBuilt(modelGroup, gWidth, gHeight) : [];
  const gDesignEff = gDesignOptions.includes(gCdDesign) ? gCdDesign : "";
  const gDesignChosen = !gDesigned || !!gDesignEff;
  const gSecondName = gDesigned ? secondColorName(modelGroup) : null;

  // Window choices. Some widths are built solid only (Clopay's note, 9/10/2026),
  // and a sheet-priced door with no glass band at a width has no window price:
  // the glass list is Solid alone there.
  const isSheet = isSheetGroup(modelGroup);
  const gWindowsOk = !gWidth || (windowsOfferedAt(modelMember || undefined, gWidth) && (!isSheet || windowsPricedAt(modelGroup, gWidth))
    && (!gDesigned || designTakesWindows(modelGroup, gDesignEff)));
  // A Modern Steel door (9208, 4308, 4138…): its glass is the contemporary
  // windows' own list, its framing the window's size, and the windows go
  // where they are pressed in on the door drawing below (Brandon,
  // 19/10/2026) — each as CJ's sheet prices the pair, a window at a time.
  const gModern = gridded && modernPickerModel(member);
  const gGlassOptions = gridded && gWidth
    ? gModern ? [{ id: "solid", label: "Solid — no windows" }, ...(gWindowsOk ? modernGlassOptions(modelGroup) : [])] : glassTypeOptions(modelGroup, gWidth, gWindowsOk)
    : [];
  const gGlassEff = gGlassOptions.some((g) => g.id === gGlass) ? gGlass : "";
  const gGlazed = !!gGlassEff && gGlassEff !== "solid";
  const gFramings = gridded && gWidth && gGlazed && !gModern ? framingOptions(modelGroup, member, gWidth, gGlassEff) : [];
  // The framing picked stays through a glass change where the new glass
  // offers it (a Coachman design, say); where it does not, one has to be chosen.
  const gFramingEff = gFramings.find((f) => f.value === gFraming);
  const [vwf0, vwi0] = gWidth.split(".").map(Number); const [vhf0, vhi0] = gHeight.split(".").map(Number);
  // The drawing for the size: Clopay's section stack and panel count, by the window's size.
  const gModernFramings = gModern && gWidth && gGlazed
    ? modernFramings(modelGroup, member, gGlassEff).filter((f) => modernPanelsWide(vwf0, vwi0 ?? 0, f.size) != null) : [];
  const gModernFramingEff = gModernFramings.find((f) => f.value === gModernFraming) ?? null;
  const gStack = gModern && gHeight ? modernStack(vhf0, vhi0 ?? 0) : null;
  const gPanelsWide = gModern && gWidth && gModernFramingEff ? modernPanelsWide(vwf0, vwi0 ?? 0, gModernFramingEff.size) : null;
  // Windows pressed in that still fit the drawing — a size or framing change can shrink it.
  const gPlaces: WindowPlace[] = gModern && gStack && gPanelsWide
    ? [...gWinPlaces].map((k) => k.split(":").map(Number)).filter(([s, p]) => s >= 1 && s <= gStack.length && p >= 1 && p <= gPanelsWide).map(([section, panel]) => ({ section, panel }))
    : [];
  const gWindowsChosen = !!gGlassEff && (!gGlazed || (gModern ? !!gModernFramingEff && gPlaces.length > 0 : gFramings.length === 0 || !!gFramingEff));
  // Until the windows are chosen the door is looked up solid — for the
  // reasons a size or design may carry; it is not priced before then.
  const choice = gWindowsChosen ? windowChoice(gGlassEff, gFramingEff) : windowChoice("solid", undefined);
  const gStyleEff = choice.style;

  // High lift is the 4050 family's (Brandon, 13/10/2026), torsion only, and
  // caps at the door height less 3 inches — above that the door is full
  // vertical lift, a different track entirely. A tall door locks out extension
  // springs; standard or galvanized torsion stay open (on the Coachman at one
  // price, 13/10/2026).
  const gSpringUsed = gTorsionOnly && gSpring === "extension" ? "torsion" : gSpring;
  const gLiftOffered = gridded && highLiftOffered(modelGroup);
  const gLiftAllowed = gLiftOffered && canTakeHighLift(gSpringUsed);
  // A high lift chosen on a door that then stops offering it has to be chosen again.
  const gTrackEff = gTrack === "high_lift" && !gLiftAllowed ? "" : gTrack;
  const gIsLift = gTrackEff === "high_lift";
  const gHeightFtN = Number(gHeightFt || "0");
  const gHeightInN = Number(gHeightIn || "0");
  const gLiftSteps = highLiftChoices(gHeightFtN, gHeightInN);
  const gEffLift = gLiftSteps.length && gLift > gLiftSteps[gLiftSteps.length - 1] ? 0 : gLift;
  const gLiftNote = gIsLift && gEffLift && gMount && gIncline
    ? highLiftPrice({ mount: gMount, incline: gIncline, heightFt: gHeightFtN, heightIn: gHeightInN, inches: gEffLift }).reason ?? ""
    : "";

  // Track depends on the door size — high lift caps at the height, and the
  // spring choice is height-driven — so the whole group waits for a size.
  const gSizeSet = !!gWidth && !!gHeight;

  // A model with no price grid has no configurator to open, so there is no
  // Configure button and step never reaches 2. Its only route is the typed
  // Clopay total, which has to appear as soon as a model is chosen — gating it
  // behind Configure made it unreachable for Gallery, Canyon Ridge, Coachman
  // and every outside manufacturer.
  const readyForTotal = !!(md || flatMargin) && !(gridded && kind === "door");

  // The model's own list, not the 4050's. Hardcoding the 4050 group gave the
  // T50S Black and Bronze, which Clopay does not build it in — Brandon,
  // 12/9/2026.
  // Special order groups are slash-separated ("T50S/T50L"); the colour table is
  // keyed by catalogue group. Resolve through the first member.
  // A member with no colour list of its own (the 4132, the 9201…) takes its
  // group's first member's, which is the family's.
  const colorKeyFor = (m: string) => (COLORS[dataKey(m)] ? dataKey(m) : null);
  const gColorKey = colorKeyFor(modelMember || modelGroup.split("/")[0]) ?? colorKeyFor(modelGroup.split("/")[0]) ?? dataKey(modelGroup);
  const gColors = COLORS[gColorKey] ? specialOrderColors(gColorKey) : ["White"];
  // The configurator opens in order: size, then color (and the Coachman's
  // design), then everything else.
  const gColorChosen = gColors.includes(gColor);
  const gSecondColors = gSecondName ? secondColors(modelGroup, gColors) : [];
  const gOverlayEff = gSecondColors.includes(gOverlay) ? gOverlay : gColor;
  const gOpen = gSizeSet && gColorChosen && gDesignChosen;
  // The lock opens once everything else is chosen; the door prices once the
  // lock is (Brandon, 19/10/2026).
  const gOptionsChosen = gOpen && gWindowsChosen && !!gSpringUsed && !!gTrackEff
    && (!gIsLift || (gEffLift > 0 && !!gIncline)) && !!gMount;
  const gComplete = gOptionsChosen && !!gLock;

  // Looked up as soon as the size and colour are set, so a size or design the
  // model is not built in says so at once; the options still blank stand in
  // at no charge until chosen, and nothing is priced before gComplete.
  const gResult = gridded && gWidth && gHeight && gColorChosen && gDesignChosen
    ? specialDoorQuote({ model: modelGroup, width: gWidth, height: gHeight, color: gColor,
        design: gDesignEff || undefined, overlayColor: gSecondName ? gOverlayEff : undefined,
        style: choice.style, glassType: choice.glassType, panelStyle: choice.panelStyle, windesign: choice.windesign, plainWindow: choice.plainWindow,
        windowSeries: choice.windowSeries,
        windowsAt: gModern ? gPlaces : undefined, modernFraming: gModern ? gModernFramingEff?.value : undefined,
        variant: (modelMember || gVariant) || undefined,
        track: (gTrackEff || "r12") as never, spring: (gSpringUsed || (gTorsionOnly ? "torsion" : "extension")) as never, lock: (gLock || "none") as never,
        trackMount: gMount || "bracket", incline: gIncline || "straight_incline", highLiftInches: gIsLift ? gEffLift : 0 })
    : null;

  // The door's vinyl stop molding, in the vinyl that matches its colour and cut
  // to its opening, exactly as the stock tab works it out — whole doors only.
  const vinylColor = gridded && kind === "door" && gComplete && gResult?.quote ? vinylForDoorColor(gColor) : null;
  const [vwf, vwi] = gWidth.split("."); const [vhf, vhi] = gHeight.split(".");
  const vinyl = vinylColor
    ? vinylForDoor(vinylColor, Number(vwf) + (Number(vwi ?? 0)) / 12, Number(vhf) + (Number(vhi ?? 0)) / 12, Math.max(1, qty))
    : null;
  // Asked once, when the door first prices; Yes or No stays in the quote card.
  const askVinyl = !!vinyl && !vinylAsked;

  // Grid first when it produced a price and the counter has not typed a total.
  // A typed total always wins: it is what someone reaches for precisely when
  // the grid is wrong for the job.
  const manual =
    scope === "residential"
      ? series ? soNumbers(series, modelGroup, kind, price) : null
      : cModel ? soCommercial(cMfr, kind, price) : null;
  // A configured door prices once its lock is chosen (Brandon, 19/10/2026).
  const n =
    !manual && gComplete && gResult?.quote
      ? { sell: gResult.quote.unitPrice, margin: null as number | null, doubled: false }
      : manual;

  // Homeowner markup, at the special-order rate. The width comes from the size
  // picker on a gridded door; on a typed-in total there is no width to read, so
  // the narrow band applies unless one was chosen.
  // Width for the markup band: the size picker on a gridded door, else the
  // width typed into the commercial size field. With neither, the narrow band
  // applies — a typed-in total carries no size to read.
  // The counter says which band it is rather than the tool guessing. Most
  // special orders are a typed-in total with no size attached, so there is no
  // width to read — and where there is one, stating it is still unambiguous.
  const hoMarkup =
    homeowner === "no"
      ? 0
      : homeownerMarkupForBand(homeowner, kind === "section" ? "special_section" : "special_door");
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

  function pickScope(v: "" | "residential" | "commercial") {
    setStep(1);
    setScope(v); setSeries(""); setModel(""); setCSeries(""); setCModel(""); setKind("door"); setPrice(""); resetGrid(); setSaved(false);
  }
  function pickSeries(v: string) {
    setStep(1);
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
            <div className="step-h">
              <span className="step-n">{step}</span>
              <h3>{step === 1 ? "Select your door" : "Configure"}</h3>
              <span className="hint">Special order</span>
            </div>
            {/* Order type, manufacturer, collection and model are the step 1
                choices. Once the counter is configuring, they come off screen —
                Change door goes back — so the panel reads like the stock tabs. */}
            {/* Residential or commercial first, then it greys out — the same
                shape as the manufacturer on the stock tabs, where Clopay is
                shown but not changeable once you are past it. */}
            {step === 1 && (
              <div className="field"><label className="lbl">Select order type <span className="req">*</span></label>
                <div className="selectwrap">
                  <select data-testid="so-scope" value={scope || ""} disabled={!!scope}
                    onChange={(e) => pickScope(e.target.value as "residential" | "commercial")}>
                    {!scope && <option value="">Select…</option>}
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                {scope && (
                  <button type="button" className="linkbtn" data-testid="so-change-scope"
                    onClick={() => { setScope(""); setSeries(""); setModel(""); setStep(1); }}>
                    Change
                  </button>
                )}
              </div>
            )}

            {step === 1 && scope && (scope === "residential" ? (
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
                {/* A pinned pick names the model outright, so there is nothing
                    left to choose — showing its whole series with it selected
                    reads as an unanswered question. Only a series pick opens
                    the model list. */}
                {cSeries && !isPinnedModel(cSeries) && (
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
            ))}
          </div>


          {scope === "residential" && ser && ser.type === "margin" && (
            <div className="step">
              {step === 1 && (
                <div className="step-h"><span className="step-n">2</span><h3>{series}{ser.models ? " model" : ""}</h3></div>
              )}
              {step === 1 && ser.models && (
                <div className="field"><label className="lbl">Model <span className="req">*</span></label>
                  <div className="selectwrap">
                    <select data-testid="so-model" value={model} onChange={(e) => { setModel(e.target.value); resetGrid(); setSaved(false); }}>
                      <option value="">Select…</option>
                      {modelGroupsOf(ser.models).flatMap((g) =>
                        shouldSplitGroup(g)
                          ? groupMembers(g).map((m) => (
                              <option key={`${g}:${m}`} value={modelSelectionValue(g, m)}>{m}{ser.models![g].new ? " (new)" : ""}</option>
                            ))
                          : [<option key={g} value={g}>{g}{ser.models![g].new ? " (new)" : ""}</option>],
                      )}
                    </select>
                  </div>
                </div>
              )}
              {(md || flatMargin) && step === 1 && (
                <div className="field">
                  <label className="lbl">Assembly type</label>
                  <OptionButtons label="Assembly type" testid="so-assembly" options={SO_ASSEMBLIES} value={kind}
                    onChange={(v) => { setKind(v); setSaved(false); }} />
                </div>
              )}
              {gridded && kind === "door" && step === 1 && (
                <button data-testid="so-configure" className="btn primary configbtn"
                  onClick={() => setStep(2)}>
                  Configure
                </button>
              )}
              {gridded && kind === "door" && step === 2 && (
                <>
                  <div className="modelbar">
                    <button type="button" className="btn backbtn" data-testid="so-back"
                      onClick={() => setStep(1)}>&lsaquo; Back</button>
                    <span className="mlbl">Model</span>
                    <span className="mval">{modelMember || modelGroup}</span>
                    <span className="mtag" data-testid="so-assembly-tag">Complete door</span>
                    <span className="muted-note" style={{ marginLeft: "auto" }}>{series}</span>
                  </div>
                  <div className="socfg"><div className="cfg2">
                  <div className="ggroup">
                  <div className="ghdr">Layout options</div>
                  {gNeedsVariant && (
                    <div className="grow"><label>Which model</label>
                      <div className="ctl selectwrap">
                        <select data-testid="so-variant" value={gVariant} onChange={(e) => { setGVariant(e.target.value); setGWidthFt(""); setGWidthIn("0"); setSaved(false); }}>
                          <option value="">Select…</option>
                          {gMembers.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="muted-note">These share a price grid but not a size range.</div>
                    </div>
                  )}
                  <div className="grow"><label>Width</label>
                    <div className="ctl dimrow">
                      <div className="selectwrap dimsel">
                        <select data-testid="so-width-ft" value={gWidthFt} onChange={(e) => pickWidthFt(e.target.value)}>
                          <option value="">ft</option>
                          {widthFeet.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>
                      <span className="u">ft</span>
                      <div className="selectwrap dimsel">
                        <select data-testid="so-width-in" value={gWidthIn} disabled={!gWidthFt} onChange={(e) => { setGWidthIn(e.target.value); setSaved(false); }}>
                          {(widthInches.length ? widthInches : ["0"]).map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <span className="u">in</span>
                    </div>
                  </div>
                  <div className="grow"><label>Height</label>
                    <div className="ctl dimrow">
                      <div className="selectwrap dimsel">
                        <select data-testid="so-height-ft" value={gHeightFt} onChange={(e) => pickHeightFt(e.target.value)}>
                          <option value="">ft</option>
                          {heightFeet.map((f) => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>
                      <span className="u">ft</span>
                      <div className="selectwrap dimsel">
                        <select data-testid="so-height-in" value={gHeightIn} disabled={!gHeightFt} onChange={(e) => { setGHeightIn(e.target.value); setSaved(false); }}>
                          {(heightInches.length ? heightInches : ["0"]).map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <span className="u">in</span>
                    </div>
                  </div>
                  {gDesigned && (
                    <div className="grow"><label>Design</label>
                      <div className="ctl selectwrap">
                        <select data-testid="so-design" value={gDesignEff} disabled={!gSizeSet}
                          onChange={(e) => { setGCdDesign(e.target.value); setSaved(false); }}>
                          {!gDesignEff && <option value="">Select design…</option>}
                          {gDesignOptions.map((d) => <option key={d} value={d}>{designLabel(d)}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                  <div className="grow"><label>Color</label>
                    <div className="ctl selectwrap">
                      <select data-testid="so-color" value={gColorChosen ? gColor : ""} disabled={!gSizeSet} onChange={(e) => { setGColor(e.target.value); setSaved(false); }}>
                        {!gColorChosen && <option value="">Select color…</option>}
                        {gColors.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  {gSecondName && (
                    <div className="grow"><label>{gSecondName === "inlay" ? "Inlay color" : "Overlay color"}</label>
                      <div className="ctl selectwrap">
                        <select data-testid="so-overlay" value={gColorChosen ? gOverlayEff : ""} disabled={!gColorChosen}
                          onChange={(e) => { setGOverlay(e.target.value); setSaved(false); }}>
                          {!gColorChosen && <option value="">Select color first…</option>}
                          {gSecondColors.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                  </div>
                  <div className="ggroup">
                  <div className="ghdr">Window options</div>
                  <div className="grow"><label>Glass type</label>
                    <div className="ctl selectwrap">
                      <select disabled={!gOpen} data-testid="so-glass" value={gGlassEff}
                        onChange={(e) => { setGGlass(e.target.value); setSaved(false); }}>
                        {!gGlassEff && <option value="">Select…</option>}
                        {(gGlassOptions.length ? gGlassOptions : [{ id: "solid", label: "Solid — no windows" }]).map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
                      </select>
                    </div>
                    {gWidth && !gWindowsOk && (!gDesigned || designTakesWindows(modelGroup, gDesignEff)) && (
                      <div className="muted-note" style={{ marginTop: 6 }} data-testid="so-no-windows">
                        Not built with windows at this width — solid only.
                      </div>
                    )}
                  </div>
                  {!gModern && <div className="grow"><label>Section glazed</label>
                    <div className="ctl selectwrap">
                      <select disabled={!gOpen || !gGlazed} data-testid="so-section" value={gSection}
                        onChange={(e) => { setGSection(e.target.value); setSaved(false); }}>
                        {GLAZED_SECTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>}
                  <div className="grow"><label>Framing</label>
                    <div className="ctl selectwrap">
                      {gModern ? (
                        <select disabled={!gOpen || !gGlazed} data-testid="so-framing" value={gModernFramingEff?.value ?? ""}
                          onChange={(e) => { setGModernFraming(e.target.value); setGWinPlaces(new Set()); setSaved(false); }}>
                          {!gModernFramingEff && <option value="">Select…</option>}
                          {gModernFramings.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                      ) : (
                        <select disabled={!gOpen || !gGlazed} data-testid="so-framing" value={gFramingEff?.value ?? ""}
                          onChange={(e) => { setGFraming(e.target.value); setSaved(false); }}>
                          {!gFramingEff && <option value="">{gGlazed && gFramings.length === 0 ? "Plain (no insert)" : "Select…"}</option>}
                          {gFramings.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                  </div>
                  <div className="ggroup">
                  <div className="ghdr">Track options</div>
                  {!gSizeSet && (
                    <div className="grow"><span className="muted-note" style={{ gridColumn: "1 / -1" }}>
                      Choose a width and height first — {gLiftOffered ? "high lift and spring depend" : "the spring depends"} on the door size.
                    </span></div>
                  )}
                  {gSizeSet && <><div className="grow"><label>Spring</label>
                    <div className="ctl selectwrap">
                      <select data-testid="so-spring" value={gSpringUsed} disabled={!gOpen}
                        onChange={(e) => {
                          setGSpring(e.target.value);
                          if (e.target.value === "extension" && gTrack === "high_lift") { setGTrack(""); setGLift(0); }
                          setSaved(false);
                        }}>
                        {!gSpringUsed && <option value="">Select…</option>}
                        {!gTorsionOnly && <option value="extension">Extension</option>}
                        <option value="torsion">Torsion</option>
                        <option value="galvanized">Galvanized torsion</option>
                      </select>
                    </div>
                  </div>
                  <div className="grow"><label>Track</label>
                    <div className="ctl selectwrap">
                      <select disabled={!gOpen} data-testid="so-track" value={gTrackEff}
                        onChange={(e) => { setGTrack(e.target.value); if (e.target.value !== "high_lift") setGLift(0); setSaved(false); }}>
                        {!gTrackEff && <option value="">Select…</option>}
                        <option value="r10">10&quot; radius</option>
                        <option value="r12">12&quot; radius</option>
                        <option value="r15">15&quot; radius</option>
                        <option value="low_headroom">Low headroom</option>
                        <option value="r20">20&quot; radius</option>
                        <option value="r32">32&quot; radius</option>
                        {gLiftAllowed && <option value="high_lift">High lift</option>}
                      </select>
                    </div>
                  </div>
                  <div className="grow"><label>Track mount</label>
                    <div className="ctl selectwrap">
                      <select disabled={!gOpen} data-testid="so-track-mount" value={gMount}
                        onChange={(e) => { setGMount(e.target.value as TrackMount); setSaved(false); }}>
                        {!gMount && <option value="">Select…</option>}
                        {TRACK_MOUNTS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                      </select>
                    </div>
                  </div>
                  {gIsLift && (
                    <div className="grow"><label>High lift amount</label>
                      <div className="ctl selectwrap">
                        <select disabled={!gOpen} data-testid="so-high-lift" value={gEffLift}
                          onChange={(e) => { setGLift(Number(e.target.value)); setSaved(false); }}>
                          <option value={0}>Select…</option>
                          {gLiftSteps.map((n) => <option key={n} value={n}>{n}&quot;</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                  {gIsLift && (
                    <div className="grow"><label>Incline style</label>
                      <div className="ctl selectwrap">
                        <select disabled={!gOpen} data-testid="so-incline" value={gIncline}
                          onChange={(e) => { setGIncline(e.target.value as InclineStyle); setSaved(false); }}>
                          {!gIncline && <option value="">Select…</option>}
                          {INCLINE_STYLES.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
                        </select>
                      </div>
                    </div>
                  )}
                  {gLiftNote && <div className="hl-note" data-testid="so-high-lift-note">{gLiftNote}</div>}
                  </>}
                  </div>
                  <div className="ggroup">
                  <div className="ghdr">Additional options</div>
                  <div className="grow">
                    <label>Lock</label>
                    <div className="ctl selectwrap">
                      <select disabled={!gOptionsChosen} data-testid="so-lock" value={gLock} onChange={(e) => { setGLock(e.target.value); setSaved(false); }}>
                        {!gLock && <option value="">Select…</option>}
                        <option value="none">No lock</option>
                        <option value="slide">Inside slide lock</option>
                        <option value="lockbar">Lockbar assembly</option>
                        <option value="lockbar_installed">Lockbar installed</option>
                      </select>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  {gModern && gGlazed && gModernFramingEff && gStack && gPanelsWide && (
                    <div className="ggroup gwide">
                      <div className="ghdr">Windows</div>
                      <DoorDiagram stack={gStack} panels={gPanelsWide} widthIn={vwf0 * 12 + (vwi0 ?? 0)}
                        windows={new Set(gPlaces.map(placeKey))}
                        onToggle={(place) => {
                          const k = placeKey(place);
                          const next = new Set(gPlaces.map(placeKey));
                          if (next.has(k)) next.delete(k); else next.add(k);
                          setGWinPlaces(next); setSaved(false);
                        }}
                        onSetSection={(section, panels, on) => {
                          const next = new Set(gPlaces.map(placeKey));
                          for (const panel of panels) { const k = placeKey({ section, panel }); if (on) next.add(k); else next.delete(k); }
                          setGWinPlaces(next); setSaved(false);
                        }} />
                    </div>
                  )}
                  {gResult?.reason && (
                    <div className="muted-note" style={{ marginTop: 6 }}>{gResult.reason}</div>
                  )}
                </>
              )}

              {(md || flatMargin) && (
                <>
                  {/* Only once the configurator is open — before that the copy
                      beside the quote is the one in play. */}
                  {step === 2 && <div className="grow">
                    <label>Home owner surcharge</label>
                    <div className="ctl selectwrap">
                      <select data-testid="so-homeowner" disabled={gridded && !gOpen} value={homeowner}
                        onChange={(e) => { setHomeowner(e.target.value as "no" | "single" | "double"); setSaved(false); }}>
                        <option value="no">No</option>
                        <option value="single">Single door</option>
                        <option value="double">Double door</option>
                      </select>
                    </div>
                  </div>}
                </>
              )}
            </div>
          )}

          {scope === "commercial" && cModel && (
            <div className="step">
              <div className="step-h"><span className="step-n">2</span><h3>{cMfr} {cModel}</h3></div>
              <div className="field"><label className="lbl">Assembly type</label>
                <OptionButtons label="Assembly type" testid="so-c-assembly" options={SO_C_ASSEMBLIES} value={kind}
                  onChange={(v) => { setKind(v); setSaved(false); }} />
              </div>
              <div className="field">
                <label className="lbl">Home owner surcharge</label>
                <div className="selectwrap">
                  <select data-testid="so-comm-homeowner" value={homeowner}
                    onChange={(e) => { setHomeowner(e.target.value as "no" | "single" | "double"); setSaved(false); }}>
                    <option value="no">No</option>
                    <option value="single">Single door</option>
                    <option value="double">Double door</option>
                  </select>
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
          </div>
          {/* Nothing is priced until Configure. A door has to be chosen before
              either route makes sense — the grid needs a model to look up, and
              a typed Clopay total needs one to be a quote for. Before that the
              panel shows what is still missing. */}
          {step === 1 && !readyForTotal && (
            <div className="qtotalbox">
              <div className="ghdr">Pricing</div>
              <div className="field" style={{ marginTop: 6 }}>
                <span className="muted-note" data-testid="so-not-ready">
                  {!scope
                    ? "Choose residential or commercial to start."
                    : !series
                      ? "Choose a collection."
                      : ser?.models && !model
                        ? "Choose a model."
                        : "Press Configure to build the door or enter a Clopay total."}
                </span>
              </div>
            </div>
          )}
          {(step === 2 || readyForTotal) && (
          <div className="qtotalbox">
            <div className="ghdr">Price from a Clopay total</div>
            <div className="field" style={{ marginTop: 6 }}>
            <label className="lbl">{gridded && kind === "door" && !restricted
              ? "For a configuration the picker above will not take"
              : "Enter total = sub total + energy surcharge — do not apply MPQ"} <span className="req">*</span></label>
            <input type="text" inputMode="decimal" value={price} onChange={(e) => { setPrice(e.target.value); setSaved(false); }} placeholder="0.00" />
          </div>
            {/* The configurator carries its own surcharge for a gridded door.
                Anything else — a section, or a model with no grid — is priced
                from the typed total, so the control belongs here instead. The
                two share one piece of state either way. */}
            {!(gridded && kind === "door") && <div className="grow">
              <label>Home owner surcharge</label>
              <div className="ctl selectwrap">
                <select data-testid="so-homeowner-quote" value={homeowner}
                  onChange={(e) => { setHomeowner(e.target.value as "no" | "single" | "double"); setSaved(false); }}>
                  <option value="no">No</option>
                  <option value="single">Single door</option>
                  <option value="double">Double door</option>
                </select>
              </div>
            </div>}
          </div>
          )}
          {!n ? (
            <div className="lines" />
          ) : (
            <>
              <div className="qtyrow">
                <label htmlFor="soqty">Quantity</label>
                <QtyStepper id="soqty" value={qty} onChange={(v) => { setQty(Number(v)); setSaved(false); }} />
              </div>
              <div className="total">
                <span className="tl">Door price (each)</span>
                <span className="tv" data-testid="so-total">{fmt(n.sell + hoMarkup)}</span>
              </div>
              {gridded && kind === "door" && !manual && (
                <div className="qtyrow vinylrow" data-testid="so-vinyl-row">
                  <label>Vinyl molding</label>
                  {vinyl ? (
                    <OptionButtons label="Vinyl molding" testid="so-vinyl" options={YES_NO} value={vinylOn ? "yes" : "no"}
                      onChange={(v) => { setVinylOn(v === "yes"); setSaved(false); }} />
                  ) : (
                    <span className="muted-note">None to match {gColor}</span>
                  )}
                </div>
              )}
              {vinylOn && vinyl && (
                <div className="lines">
                  <div className="qline">
                    <span className="nm" data-testid="so-vinyl-line">
                      {vinyl.color} vinyl {vinyl.pieces.map((p) => `(${p.count}) ${p.ft}FT`).join(" & ")}
                    </span>
                  </div>
                </div>
              )}
              <div className="qfoot">
                <CopyQuickBooks item={QB_SPECIAL_ORDERS} description={copyText ?? label}
                  rate={(n?.sell ?? 0) + hoMarkup} qty={qty} onCopy={saveQuote} testId="copy-qb"
                  extraLines={vinylOn && vinyl ? [{ item: QB_VINYL, description: vinyl.description, qty: vinyl.feet, rate: vinyl.pricePerFt }] : undefined} />
              </div>
              {askVinyl && vinyl && (
                <VinylPrompt
                  detail={`${vinyl.color} vinyl stop molding for this ${heightLabel(gWidth)} x ${heightLabel(gHeight)} door.`}
                  onAnswer={(yes) => { setVinylOn(yes); setVinylAsked(true); setSaved(false); }}
                />
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
