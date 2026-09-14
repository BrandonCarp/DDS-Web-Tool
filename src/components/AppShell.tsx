"use client";

import { useEffect, useState } from "react";
import { ResidentialTool } from "./ResidentialTool";
import { QuickEntry } from "./QuickEntry";

/**
 * Whether the quick-entry box renders.
 *
 * Off since 12/9/2026. It reads counter shorthand and routes or fills a form,
 * and it works — but it rewards someone who already knows the models and the
 * abbreviations, and the problem it was meant to help with is that people are
 * not using the tool as it stands. Building for the user we already have does
 * not fix that.
 *
 * Nothing is deleted. The parser, the 596-product index and their tests all
 * stay under test, so turning this back on is a one-line change. The index in
 * particular is worth reusing inside the existing dropdowns — type-ahead on a
 * window design or a part helps everyone, with no new concept to learn.
 */
const SHOW_QUICK_ENTRY = false;
import type { ParsedDoor } from "@/lib/pricing/data/parse-request";
import { CommercialTool } from "./CommercialTool";
import { SpecialTool } from "./SpecialTool";
import { TorsionTool } from "./TorsionTool";
import { ExtensionTool } from "./ExtensionTool";
import { PartsTool } from "./PartsTool";
import { VinylTool } from "./VinylTool";
import { OperatorsTool } from "./OperatorsTool";
import { CustomerJobProvider, useCustomerJob } from "./CustomerJobFields";
import { IDLE_MS } from "@/lib/session-timeout";

const BASE_TABS = [
  // `over` stacks a smaller word above the label. Residential and commercial
  // quote from the stock sheets, and saying so on the tab keeps a counter from
  // reaching for them on a special order — Brandon, 12/9/2026.
  { id: "residential", label: "Residential", over: "Stock" },
  { id: "commercial", label: "Commercial", over: "Stock" },
  { id: "special", label: "Special Order" },
  { id: "torsion", label: "Torsion Springs" },
  { id: "extension", label: "Extension Springs" },
  { id: "parts", label: "Parts" },
  { id: "vinyl", label: "Vinyl" },
  { id: "operators", label: "Operators" },
] as const;
// Inventory is visible ONLY to the master admin (role "admin") — it's a
// placeholder until that build starts.
const INVENTORY_TAB = { id: "inventory", label: "Inventory" } as const;

/** Tab label for the mobile dropdown, where two lines will not fit. */
function flatLabel(t: { label: string; over?: string }): string {
  return t.over ? `${t.over} ${t.label}` : t.label;
}

export function AppShell(props: {
  models: string[];
  user: { username: string; role: string };
  /** Render the quick-entry box. Defaults to the flag above; tests pass it
      explicitly so the component stays under test while it is switched off. */
  quickEntry?: boolean;
}) {
  return (
    <CustomerJobProvider>
      <Shell {...props} />
    </CustomerJobProvider>
  );
}

function Shell({
  models,
  user,
  quickEntry = SHOW_QUICK_ENTRY,
}: {
  models: string[];
  quickEntry?: boolean;
  user: { username: string; role: string };
}) {
  const [mode, setMode] = useState<string>("residential");
  // A configuration handed over by the quick-entry box. Passed to the
  // residential tool as a prop rather than lifted into shared state, so the
  // tool stays the only thing that owns its fields.
  const [prefill, setPrefill] = useState<ParsedDoor | null>(null);
  // Idle watcher: no interaction for IDLE_MINUTES -> log out and land on the
  // login screen. The SERVER enforces the same window on the session itself;
  // this just makes the logout visible instead of surprising the next click.
  // Both sides read the window from lib/session-timeout.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const kick = () => window.location.assign("/api/logout");
    const reset = () => { clearTimeout(t); t = setTimeout(kick, IDLE_MS); };
    const evs = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    evs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => { clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, reset)); };
  }, []);
  const isMaster = user.role === "admin";
  const tabs = isMaster ? [...BASE_TABS, INVENTORY_TAB] : BASE_TABS;
  // Customer / P.O. / Job name is SHELVED for now — the bar and the
  // selection gate are removed, so quoting is immediate again. The provider
  // stays mounted so the tools keep compiling and simply save blank
  // customer fields; restoring the feature is two JSX lines below.
  const { setCustName, setCustPo, setCustJob } = useCustomerJob();
  const pickTab = (id: string) => {
    setMode(id);
    setCustName(""); setCustPo(""); setCustJob("");
  };
  return (
    <>
      <header className="top">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/logo.png" alt="Doors Direct" />
        <nav className="tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`tab ${mode === t.id ? "active" : ""}`}
              onClick={() => pickTab(t.id)}
            >
              {"over" in t && t.over ? (
                <span className="tab-stack">
                  <span className="tab-over">{t.over}</span>
                  <span className="tab-main">{t.label}</span>
                </span>
              ) : (
                t.label
              )}
            </button>
          ))}
        </nav>
        {/* Same tabs, one dropdown. Eight of them will not sit on a laptop
            header, and wrapping them pushed the tools below the fold. Both are
            rendered and CSS picks one at 1240px — a matchMedia switch would
            mismatch on hydration, and the server does not know the width. The
            DASH button is deliberately NOT in here: it stays reachable in one
            click on every size. */}
        <div className="tabsel">
          <select
            aria-label="Tool"
            data-testid="tabsel"
            value={mode}
            onChange={(e) => pickTab(e.target.value)}
          >
            {tabs.map((t) => (
              <option key={t.id} value={t.id}>
                {flatLabel(t)}
              </option>
            ))}
          </select>
        </div>
        <div className="right">
          {(user.role === "admin" || user.role === "semiadmin") && (
            <a href="/admin" className="dash-btn" title="Admin dashboard">DASH</a>
          )}
          {user.username} · <a href="/api/logout" style={{ color: "#fff" }}>Sign out</a>
        </div>
      </header>
      {quickEntry && (
        <QuickEntry
          onGoTo={(t) => { setPrefill(null); pickTab(t); }}
          onApplyDoor={(d) => { setPrefill(d); pickTab("residential"); }}
        />
      )}
      {mode === "residential" && (
        <ResidentialTool models={models} prefill={prefill} onPrefillUsed={() => setPrefill(null)} />
      )}
      {mode === "commercial" && <CommercialTool />}
      {mode === "special" && <SpecialTool />}
      {mode === "torsion" && <TorsionTool />}
      {mode === "extension" && <ExtensionTool />}
      {mode === "parts" && <PartsTool />}
      {mode === "vinyl" && <VinylTool />}
      {mode === "operators" && <OperatorsTool />}
      {mode === "inventory" && isMaster && (
        <div className="wrap"><section className="config-col"><div className="panel" style={{ padding: 40, textAlign: "center" }}>
          <div className="ghdr" style={{ marginBottom: 12 }}>Inventory — coming soon</div>
          <div className="muted-note" style={{ textTransform: "none" }}>
            Stock on hand by model, size and color — built on receiving documents in and daily sales out.
            This tab is reserved for it and is visible only to you.
          </div>
        </div></section></div>
      )}
    </>
  );
}

