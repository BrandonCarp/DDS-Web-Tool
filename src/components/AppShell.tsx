"use client";

import { useEffect, useState } from "react";
import { ResidentialTool } from "./ResidentialTool";
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
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
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

export function AppShell(props: {
  models: string[];
  user: { username: string; role: string };
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
}: {
  models: string[];
  user: { username: string; role: string };
}) {
  const [mode, setMode] = useState<string>("residential");
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
              {t.label}
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
                {t.label}
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
      {mode === "residential" && <ResidentialTool models={models} />}
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

