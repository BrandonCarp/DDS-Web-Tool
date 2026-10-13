"use client";

import { useMemo, useState } from "react";
import type { SearchPick } from "@/lib/search";
import { priceText } from "@/components/CopyButton";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { QB_OPERATORS } from "@/lib/pricing/data/quickbooks";
import { QbLineDemo } from "@/components/QbLineDemo";
import { operatorPrice } from "@/lib/pricing/data/operator-pricing";
import { QB_ITEMS } from "@/lib/qb/iif";
import { OPERATOR_CATALOGUE } from "@/lib/pricing/data/operator-catalogue";
import { OPERATOR_GROUPS, type Operator } from "@/lib/pricing/data/operators";
import { slugOf } from "@/lib/pricing/data/parts-menu";
import {
  OPERATOR_KINDS, OPERATOR_USES, kindsFor, locate, modelsFor, operatorAt, operatorLabel, operatorModel, operatorsFor, railLabel, railLengthsForModel,
  type OperatorKind, type OperatorUse, type RailLength,
} from "@/lib/pricing/data/operator-kinds";

/**
 * LiftMaster operators and the accessories that hang off them.
 *
 * Same flow as the parts shelf (Brandon's wireframe, 12/10/2026): the two
 * groups as stacked buttons, then — Accessories — the group's sections the
 * same way and the section's list; — Operators (13/10/2026) — Residential or
 * Commercial, then Belt / Chain / Side Mount, then the models as buttons, then
 * the model's rail lengths as buttons — pressing one is the operator; the other
 * lengths collapse, and pressing it again (or Back) opens them back up. A side
 * mount lists its operators straight off the kind. One level showing at a
 * time, with Back in the header. One difference from the shelf: not
 * everything is priced yet, so
 * where there is no price the card says so instead of showing a rate. Nobody
 * should be able to lift a number off this screen that the company has not set.
 */
const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function OperatorsTool({ openOn }: { openOn?: SearchPick } = {}) {
  const start = openOn?.kind === "operator" ? openOn : null;
  const landed = start?.group === "Operators" ? locate(start.desc) : null;
  // The open group and, under Accessories, its section; under Operators the
  // use, kind, model and rail length instead (Brandon, 13/10/2026). Null until
  // chosen. A pick from the top bar's search opens straight on its place.
  const [group, setGroup] = useState<string | null>(start?.group ?? null);
  const [sectionName, setSectionName] = useState<string | null>(start && !landed ? start.section : null);
  const [use, setUse] = useState<OperatorUse | null>(landed?.use ?? null);
  const [kind, setKind] = useState<OperatorKind | null>(landed?.kind ?? null);
  const [model, setModel] = useState<string | null>(landed && landed.kind !== "sidemount" ? operatorModel(landed) : null);
  const [rail, setRail] = useState<RailLength | null>(landed?.rail ?? null);
  const [picked, setPicked] = useState<string | null>(start?.desc ?? null);

  const onOperators = group === "Operators";
  const sections = OPERATOR_CATALOGUE.filter((s) => s.group === group);
  const sidemount = kind === "sidemount";
  // Accessories: groups, sections, list. Operators: groups, use, kind, then
  // the models and the model's rail lengths (belt and chain) or the list
  // alone (side mount).
  const level = !group ? 0
    : !onOperators ? (sectionName ? 2 : 1)
    : !use ? 1 : !kind ? 2 : sidemount || !model ? 3 : 4;
  const kinds = use ? kindsFor(use) : [];
  const models = use && kind && !sidemount ? modelsFor(use, kind) : [];
  const modelLabel = models.find((m) => m.id === model)?.label ?? model ?? "";
  const rails = use && kind && !sidemount && model ? railLengthsForModel(use, kind, model) : [];
  // Once a rail is pressed the other lengths collapse: only the chosen one
  // stays, pressed, and pressing it again opens them back up.
  const railsShown = rail === null ? rails : rails.filter((r) => r === rail);
  const choices = use && kind
    ? sidemount ? operatorsFor(use, kind)
    : model && rail !== null ? [operatorAt(use, kind, model, rail)].filter((o): o is NonNullable<typeof o> => !!o)
    : []
    : [];

  const results = useMemo(() => {
    const s = OPERATOR_CATALOGUE.find((x) => x.name === sectionName);
    return (s?.items ?? []).map((o) => ({ item: o, section: s?.name ?? sectionName ?? "" }));
  }, [sectionName]);

  // A row is its description, not its model number. The 2240L and 4690L come
  // in several rail lengths, the TDC12X1BMC in five, and some sprockets twice,
  // all under one name — picking by name quoted the first of them whichever
  // row was clicked. Descriptions are unique (OperatorsTool.test holds them to it).
  const hit = onOperators
    ? (() => { const c = choices.find((o) => o.item.desc === picked); return c ? { item: c.item, section: c.section } : null; })()
    : results.find((r) => r.item.desc === picked) ?? null;
  const chosen: Operator | null = hit?.item ?? null;
  // null means DDS has not priced this one yet — a real state, not an error.
  const price = chosen ? operatorPrice(chosen) : null;
  // Names that repeat in the list show their description underneath, or three
  // identical "2240L" rows would give no way to tell them apart.
  const repeated = useMemo(() => {
    const seen = new Set<string>();
    const twice = new Set<string>();
    for (const { item } of results) (seen.has(item.name) ? twice : seen).add(item.name);
    return twice;
  }, [results]);

  function pickGroup(g: string) {
    setGroup(g);
    setSectionName(null);
    setUse(null); setKind(null); setModel(null); setRail(null);
    setPicked(null);
  }
  function openSection(name: string) {
    setSectionName(name);
    setPicked(null);
  }
  function pickUse(u: OperatorUse) { setUse(u); setKind(null); setModel(null); setRail(null); setPicked(null); }
  function pickKind(k: OperatorKind) { setKind(k); setModel(null); setRail(null); setPicked(null); }
  function pickModel(m: string) { setModel(m); setRail(null); setPicked(null); }
  /** A rail length pressed is the operator: the model at that length. */
  function pickRail(r: RailLength | null) {
    setRail(r);
    setPicked(r === null || !use || !kind || !model ? null : operatorAt(use, kind, model, r)?.item.desc ?? null);
  }
  /** Up one level: the list back to the sections, those back to the groups; on Operators the rail lengths, the models, the kind, the use, the groups. */
  function back() {
    setPicked(null);
    if (!onOperators) {
      if (sectionName) setSectionName(null);
      else setGroup(null);
      return;
    }
    if (rail !== null) setRail(null);
    else if (model) setModel(null);
    else if (kind) setKind(null);
    else if (use) setUse(null);
    else setGroup(null);
  }
  const title = !onOperators
    ? (level === 1 ? group : `${group} › ${sectionName}`)
    : [group, use, kind ? OPERATOR_KINDS.find((k) => k.id === kind)?.label : null, model ? modelLabel : null].filter(Boolean).join(" › ");

  return (
    <>
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <div className="step">
              <div className="ggroup">
                <div className={`ghdr${level > 0 ? " pnav-head" : ""}`}>
                  {level > 0 && (
                    <button type="button" className="btn backbtn" data-testid="op-back" onClick={back}>&lsaquo; Back</button>
                  )}
                  {level === 0 ? "Find an operator" : <span data-testid="op-title">{title}</span>}
                </div>
                {level === 0 && (
                  <div className="gbody pnav-body">
                    <div className="pnav stack">
                      <div className="pnav-groups">
                        {OPERATOR_GROUPS.map((g) => (
                          <button key={g} type="button" className="pnav-btn" data-testid={`op-group-${slugOf(g)}`} onClick={() => pickGroup(g)}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {!onOperators && level === 1 && (
                  <div className="gbody pnav-body">
                    <div className="pnav stack">
                      <div className="pnav-pages" role="group" aria-label={group ?? undefined}>
                        {sections.map((sec) => (
                          <button key={sec.name} type="button" className="pnav-page" data-testid={`op-section-${slugOf(sec.name)}`}
                            onClick={() => openSection(sec.name)}>
                            {sec.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {onOperators && level === 1 && (
                  <div className="gbody pnav-body">
                    <div className="pnav stack">
                      <div className="pnav-pages" role="group" aria-label="Residential or commercial">
                        {OPERATOR_USES.map((u) => (
                          <button key={u} type="button" className="pnav-page" data-testid={`op-use-${slugOf(u)}`} onClick={() => pickUse(u)}>
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {onOperators && level === 2 && (
                  <div className="gbody pnav-body">
                    <div className="pnav stack">
                      <div className="pnav-pages" role="group" aria-label={use ?? undefined}>
                        {kinds.map((k) => (
                          <button key={k.id} type="button" className="pnav-page" data-testid={`op-kind-${k.id}`} onClick={() => pickKind(k.id)}>
                            {k.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {onOperators && level === 3 && !sidemount && (
                  <div className="gbody pnav-body">
                    <div className="pnav stack">
                      <div className="pnav-pages" role="group" aria-label={OPERATOR_KINDS.find((k) => k.id === kind)?.label}>
                        {models.map((m) => (
                          <button key={m.id} type="button" className="pnav-page" data-testid={`op-model-${slugOf(m.id)}`} onClick={() => pickModel(m.id)}>
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {onOperators && level === 4 && (
                  <div className="gbody" data-testid="op-choose">
                    <div className="grow"><label>Rail</label>
                      <div className="pnav-pages" role="group" aria-label="Rail length">
                        {railsShown.map((r) => (
                          <button key={String(r)} type="button" data-testid={`op-rail-${r}`} className={`pnav-page${r === rail ? " on" : ""}`}
                            aria-pressed={r === rail} onClick={() => pickRail(r === rail ? null : r)}>
                            {railLabel(r)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {onOperators && level === 3 && sidemount && (
                  <ul className="partlist" data-testid="op-list">
                    {choices.map((o) => {
                      const p = operatorPrice(o.item);
                      return (
                        <li key={o.item.desc}>
                          <button type="button" className={`partrow ${picked === o.item.desc ? "on" : ""}`} onClick={() => setPicked(o.item.desc)}>
                            <span className="partname">{operatorLabel(o)}</span>
                            <span className={`partprice${p == null ? " nopricing" : ""}`}>{p == null ? "Price not set" : fmt(p)}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {!onOperators && level === 2 && (
                <ul className="partlist" data-testid="op-list">
                  {results.map(({ item, section }) => (
                    <li key={`${section}-${item.desc}`}>
                      <button
                        type="button"
                        className={`partrow ${picked === item.desc ? "on" : ""}`}
                        onClick={() => setPicked(item.desc)}
                      >
                        <span className="partname">
                          {item.name}
                          {repeated.has(item.name) && <span className="partsub">{item.desc}</span>}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="quote">
          <div className="qcard">
            <div className="qhead">
              <div className="qeyebrow">Operator quote</div>
              <div className="qtitle">{chosen ? chosen.name : "Nothing selected"}</div>
            </div>

            {!chosen ? (
              <div className="empty">
                <div className="emptymsg">Pick an operator or accessory</div>
              </div>
            ) : (
              <>
                <div className="total">
                  <span>Quantity 1</span>
                  {price == null ? (
                    <b className="nopricing" data-testid="op-price">
                      Price not set
                    </b>
                  ) : (
                    <b data-testid="op-price">{fmt(price)}</b>
                  )}
                </div>
                {price == null && (
                  <div className="muted-note" style={{ padding: "0 22px 4px" }}>
                    This one has no price yet — look it up before the order goes out.
                  </div>
                )}
                <div className="qfoot">
                  {price != null && (
                    <CopyQuickBooks item={QB_OPERATORS} description={chosen.desc}
                      rate={price} testId="op-copy-qb" />
                  )}
                  <button className="btn" type="button" onClick={() => setPicked(null)}>
                    Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {chosen && (
        <QbLineDemo
          model={chosen.name}
          size={hit?.section ?? sectionName ?? ""}
          item={QB_ITEMS.operators}
          typed="OPE"
          description={chosen.desc}
          qty="1"
          rate={price == null ? "" : priceText(price)}
        />
      )}
    </>
  );
}
