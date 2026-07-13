"use client";

import { useEffect, useState } from "react";
import { ResidentialTool } from "./ResidentialTool";
import { CommercialTool } from "./CommercialTool";
import { SpecialTool } from "./SpecialTool";
import { TorsionTool } from "./TorsionTool";
import { CustomerJobProvider, CustomerBar, CustomerGate, useCustomerJob } from "./CustomerJobFields";

const TABS = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "special", label: "Special Order" },
  { id: "torsion", label: "Torsion Springs" },
] as const;

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
  // Idle watcher: 20 minutes with no interaction -> log out and land on the
  // login screen. The SERVER enforces the same window on the session itself;
  // this just makes the logout visible instead of surprising the next click.
  useEffect(() => {
    const IDLE_MS = 20 * 60 * 1000; // keep in sync with IDLE_MS in lib/auth.ts
    let t: ReturnType<typeof setTimeout>;
    const kick = () => window.location.assign("/api/logout");
    const reset = () => { clearTimeout(t); t = setTimeout(kick, IDLE_MS); };
    const evs = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    evs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => { clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, reset)); };
  }, []);
  const { setCustName, setCustPo, setCustJob } = useCustomerJob();
  // Switching tabs starts a fresh quote session: the customer must be
  // re-selected before the new tab's tool unlocks.
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
          {TABS.map((t) => (
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
        <div className="right">
          {(user.role === "admin" || user.role === "semiadmin") && (
            <a href="/admin" style={{ color: "#fff", fontWeight: 700 }}>ADMIN DASHBOARD</a>
          )}
          {user.username} · <a href="/api/logout" style={{ color: "#fff" }}>Sign out</a>
        </div>
      </header>
      <CustomerBar key={mode} />
      <CustomerGate>
        {mode === "residential" && <ResidentialTool models={models} />}
        {mode === "commercial" && <CommercialTool />}
        {mode === "special" && <SpecialTool />}
        {mode === "torsion" && <TorsionTool />}
      </CustomerGate>
    </>
  );
}

