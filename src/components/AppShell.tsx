"use client";

import { useState } from "react";
import { ResidentialTool } from "./ResidentialTool";

const TABS = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "special", label: "Special Order" },
  { id: "torsion", label: "Torsion Springs" },
] as const;

export function AppShell({
  models,
  user,
}: {
  models: string[];
  user: { username: string; role: string };
}) {
  const [mode, setMode] = useState<string>("residential");
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
              onClick={() => setMode(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="right">
          {user.role === "admin" && (
            <a href="/admin" style={{ color: "#fff", fontWeight: 700, marginRight: 14 }}>Admin</a>
          )}
          {user.username} · <a href="/api/logout" style={{ color: "#fff" }}>Sign out</a>
        </div>
      </header>
      {mode === "residential" ? <ResidentialTool models={models} /> : <ComingSoon mode={mode} />}
    </>
  );
}

function ComingSoon({ mode }: { mode: string }) {
  const name =
    ({ commercial: "Commercial", special: "Special Order", torsion: "Torsion Springs" } as Record<string, string>)[mode] ??
    mode;
  return (
    <div className="wrap two">
      <section className="config-col">
        <div className="panel">
          <div className="step">
            <div className="step-h"><span className="step-n">•</span><h3>{name}</h3></div>
            <div className="empty">
              <div className="emptymsg">{name} is being converted to the new app.</div>
              <div className="muted-note" style={{ marginTop: 8 }}>Residential pricing is fully live — use the Residential tab.</div>
            </div>
          </div>
        </div>
      </section>
      <aside className="quote">
        <div className="panel">
          <div className="qhead"><div className="ql">{name} quote</div><div className="qmodel">—</div></div>
          <div className="empty"><div className="muted-note">Coming soon</div></div>
        </div>
      </aside>
    </div>
  );
}
