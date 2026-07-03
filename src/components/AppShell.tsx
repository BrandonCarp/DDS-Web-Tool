"use client";

import { useState } from "react";
import { ResidentialTool } from "./ResidentialTool";
import { CommercialTool } from "./CommercialTool";
import { SpecialTool } from "./SpecialTool";
import { TorsionTool } from "./TorsionTool";

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
          {(user.role === "admin" || user.role === "semiadmin") && (
            <a href="/admin" style={{ color: "#fff", fontWeight: 700, marginRight: 14 }}>Admin</a>
          )}
          {user.username} · <a href="/api/logout" style={{ color: "#fff" }}>Sign out</a>
        </div>
      </header>
      {mode === "residential" && <ResidentialTool models={models} />}
      {mode === "commercial" && <CommercialTool />}
      {mode === "special" && <SpecialTool />}
      {mode === "torsion" && <TorsionTool />}
    </>
  );
}

