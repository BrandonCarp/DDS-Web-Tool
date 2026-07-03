"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export interface AdminUser {
  id: number;
  username: string;
  role: "admin" | "semiadmin" | "user";
  active: boolean;
  created_at: string;
}
export interface AdminEstimate {
  id: number;
  username: string;
  model: string;
  size: string;
  style: string | null;
  color: string | null;
  unit_price: string;
  qty: number;
  total: string;
  description: string | null;
  quote_type: string | null;
  created_at: string;
}

const money = (n: string | number) =>
  Number(n).toLocaleString("en-US", { style: "currency", currency: "USD" });
const when = (s: string) => new Date(s).toLocaleString([], { month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit" });

const TYPES = ["residential", "commercial", "special", "spring"] as const;
const TYPE_LABEL: Record<string, string> = { residential: "Residential", commercial: "Commercial", special: "Special order", spring: "Spring" };
const TYPE_COLOR: Record<string, string> = { residential: "#73121a", commercial: "#3f6ea5", special: "#d99a2b", spring: "#9a9a9a" };
const typeOf = (e: AdminEstimate) => (e.quote_type && TYPE_LABEL[e.quote_type] ? e.quote_type : "residential");

/* ---------- last-30-day buckets ---------- */
function buildDays(rows: AdminEstimate[]) {
  const days: { key: string; label: string; total: number; counts: Record<string, number> }[] = [];
  const idx = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    idx.set(key, days.length);
    days.push({ key, label: `${d.getMonth() + 1}/${d.getDate()}`, total: 0, counts: { residential: 0, commercial: 0, special: 0, spring: 0 } });
  }
  for (const e of rows) {
    const d = new Date(e.created_at); d.setHours(0, 0, 0, 0);
    const i = idx.get(d.toISOString().slice(0, 10));
    if (i == null) continue;
    days[i].total += Number(e.total) || 0;
    days[i].counts[typeOf(e)]++;
  }
  return days;
}

/* ---------- charts (hand-rolled SVG, no deps) ---------- */
function AreaChart({ days }: { days: ReturnType<typeof buildDays> }) {
  const W = 640, H = 148, P = { l: 46, r: 8, t: 12, b: 22 };
  const max = Math.max(100, ...days.map((d) => d.total));
  const x = (i: number) => P.l + (i * (W - P.l - P.r)) / (days.length - 1);
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  const pts = days.map((d, i) => `${x(i).toFixed(1)},${y(d.total).toFixed(1)}`);
  const area = `M${P.l},${y(0)} L${pts.join(" L")} L${x(days.length - 1)},${y(0)} Z`;
  const ticks = [0, 0.5, 1].map((f) => Math.round(max * f));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Quoted dollars per day">
      <defs>
        <linearGradient id="admArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#73121a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#73121a" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="#eee0e1" strokeWidth="1" />
          <text x={P.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#9a8b8c">${t >= 1000 ? (t / 1000).toFixed(1) + "k" : t}</text>
        </g>
      ))}
      <path d={area} fill="url(#admArea)" />
      <path d={`M${pts.join(" L")}`} fill="none" stroke="#73121a" strokeWidth="2.2" strokeLinejoin="round" />
      {days.map((d, i) => d.total > 0 && <circle key={d.key} cx={x(i)} cy={y(d.total)} r="2.6" fill="#73121a" />)}
      {days.map((d, i) => (i % 5 === 0 || i === days.length - 1) && (
        <text key={d.key} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9a8b8c">{d.label}</text>
      ))}
    </svg>
  );
}

function StackedBars({ days }: { days: ReturnType<typeof buildDays> }) {
  const W = 640, H = 132, P = { l: 30, r: 8, t: 12, b: 22 };
  const max = Math.max(3, ...days.map((d) => TYPES.reduce((a, t) => a + d.counts[t], 0)));
  const bw = (W - P.l - P.r) / days.length - 3;
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Quotes per day by type">
      {[0, Math.ceil(max / 2), max].map((t) => (
        <g key={t}>
          <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="#eee0e1" strokeWidth="1" />
          <text x={P.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="#9a8b8c">{t}</text>
        </g>
      ))}
      {days.map((d, i) => {
        const x0 = P.l + i * ((W - P.l - P.r) / days.length) + 1.5;
        let acc = 0;
        return (
          <g key={d.key}>
            {TYPES.map((t) => {
              const c = d.counts[t]; if (!c) return null;
              const y1 = y(acc + c), h = y(acc) - y(acc + c); acc += c;
              return <rect key={t} x={x0} y={y1} width={Math.max(2, bw)} height={h} rx="2" fill={TYPE_COLOR[t]} />;
            })}
            {(i % 5 === 0 || i === days.length - 1) && (
              <text x={x0 + bw / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="#9a8b8c">{d.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function UserBars({ rows }: { rows: AdminEstimate[] }) {
  const byUser = useMemo(() => {
    const m = new Map<string, { total: number; count: number }>();
    for (const e of rows) {
      const u = m.get(e.username) ?? { total: 0, count: 0 };
      u.total += Number(e.total) || 0; u.count++;
      m.set(e.username, u);
    }
    return [...m.entries()].sort((a, b) => b[1].total - a[1].total);
  }, [rows]);
  const max = Math.max(1, ...byUser.map(([, v]) => v.total));
  if (byUser.length === 0) return <div className="muted-note">No quotes yet this month.</div>;
  return (
    <div className="ubars">
      {byUser.map(([u, v]) => (
        <div className="ubar" key={u}>
          <div className="urow"><b>{u}</b><span>{money(v.total)} · {v.count} quote{v.count === 1 ? "" : "s"}</span></div>
          <div className="track"><div className="fill" style={{ width: `${(v.total / max) * 100}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

/* ---------- main panel ---------- */
export function AdminPanel({
  users, estimates, monthEstimates, meId, master, username,
}: {
  users: AdminUser[];
  estimates: AdminEstimate[];
  monthEstimates: AdminEstimate[];
  meId: number;
  /** Full admins manage accounts; semi-admins see the dashboard without user controls. */
  master: boolean;
  username: string;
}) {
  const router = useRouter();
  const [view, setView] = useState<"dashboard" | "users">("dashboard");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [nu, setNu] = useState("");
  const [np, setNp] = useState("");
  const [nr, setNr] = useState<"admin" | "semiadmin" | "user">("user");
  const [open, setOpen] = useState<number | null>(null);

  const days = useMemo(() => buildDays(monthEstimates), [monthEstimates]);
  const monthTotal = monthEstimates.reduce((a, e) => a + (Number(e.total) || 0), 0);
  const avg = monthEstimates.length ? monthTotal / monthEstimates.length : 0;
  const topUser = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of monthEstimates) m.set(e.username, (m.get(e.username) ?? 0) + (Number(e.total) || 0));
    return [...m.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
  }, [monthEstimates]);

  async function call(method: string, body: Record<string, unknown>) {
    setBusy(true); setErr(null);
    try {
      const r = await fetch("/api/admin/users", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error ?? "Request failed");
      router.refresh();
      return true;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      return false;
    } finally { setBusy(false); }
  }
  async function addUser() {
    if (await call("POST", { username: nu, password: np, role: nr })) { setNu(""); setNp(""); setNr("user"); }
  }
  async function resetPw(id: number, uname: string) {
    const p = window.prompt(`New password for ${uname} (6+ characters):`);
    if (p) await call("PATCH", { id, password: p });
  }

  const th: React.CSSProperties = { textAlign: "left", padding: "8px 10px", fontSize: 12, color: "var(--muted)", textTransform: "uppercase", borderBottom: "1px solid var(--line)" };
  const td: React.CSSProperties = { padding: "9px 10px", fontSize: 13, borderBottom: "1px solid var(--line-2)" };

  return (
    <div className="admin-shell">
      <aside className="adm-side no-print">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/logo.png" alt="Doors Direct" />
        <nav className="adm-nav">
          <button type="button" className={view === "dashboard" ? "active" : ""} onClick={() => setView("dashboard")}>⌂ Admin Dashboard</button>
          {master && (
            <button type="button" className={view === "users" ? "active" : ""} onClick={() => setView("users")}>👤 Users</button>
          )}
        </nav>
        <div className="adm-foot">
          <Link href="/">‹ Back to tool</Link>
          <a href="/api/logout">Sign out</a>
        </div>
      </aside>

      <main className="adm-main">
        <div className="adm-top">
          <h1>{view === "users" ? "Users" : "Admin Dashboard"}</h1>
          <span className="who">{username}</span>
        </div>
        {err && <div className="alert warn" style={{ marginBottom: 14 }}>{err}</div>}

        {view === "dashboard" && (
          <>
            <div className="kpis">
              <div className="kpi"><div className="k">Quotes · last 30 days</div><div className="v">{monthEstimates.length}</div><div className="s">across all tools</div></div>
              <div className="kpi"><div className="k">Quoted total</div><div className="v">{money(monthTotal)}</div><div className="s">last 30 days</div></div>
              <div className="kpi"><div className="k">Average quote</div><div className="v">{money(avg)}</div><div className="s">per saved quote</div></div>
              <div className="kpi"><div className="k">Top quoter</div><div className="v" style={{ fontSize: 18 }}>{topUser}</div><div className="s">by quoted $</div></div>
            </div>

            <div className="charts">
              <div className="chartcard">
                <h4>Quoted $ per day — last 30 days</h4>
                <AreaChart days={days} />
              </div>
              <div className="chartcard">
                <h4>Quotes by user — last 30 days</h4>
                <UserBars rows={monthEstimates} />
              </div>
            </div>
            <div className="charts" style={{ gridTemplateColumns: "1fr" }}>
              <div className="chartcard">
                <h4>Quotes per day by type</h4>
                <StackedBars days={days} />
                <div className="legend">
                  {TYPES.map((t) => <span key={t}><span className="sw" style={{ background: TYPE_COLOR[t] }} />{TYPE_LABEL[t]}</span>)}
                </div>
              </div>
            </div>

            <div className="chartcard">
              <h4>Latest quotes</h4>
              {estimates.length === 0 ? (
                <div className="muted-note">No quotes saved yet.</div>
              ) : (
                <div className="tablescroll">
                <table className="esttable">
                  <thead><tr>
                    <th>When</th><th>User</th><th>Model</th><th>Quote type</th><th>Description</th><th style={{ textAlign: "right" }}>Total</th>
                  </tr></thead>
                  <tbody>
                    {estimates.map((e) => {
                      const t = typeOf(e);
                      const opened = open === e.id;
                      return [
                        <tr key={e.id} className="datarow" onClick={() => setOpen(opened ? null : e.id)} title="Click for details">
                          <td style={{ whiteSpace: "nowrap" }}>{when(e.created_at)}</td>
                          <td><b>{e.username}</b></td>
                          <td>{e.model}</td>
                          <td><span className={`typechip ${t}`}>{TYPE_LABEL[t]}</span></td>
                          <td><div className="desccell">{e.description ?? "—"}</div></td>
                          <td className="adm-money" style={{ textAlign: "right" }}>{money(e.total)}</td>
                        </tr>,
                        opened ? (
                          <tr key={`${e.id}-d`} className="detail">
                            <td colSpan={6}>
                              <b>Full description:</b> {e.description ?? "—"}
                              <div style={{ marginTop: 6, color: "var(--muted)" }}>
                                Size {e.size || "—"} · Qty {e.qty} · Unit {money(e.unit_price)}{e.color && e.color !== "—" ? ` · ${e.color}` : ""}
                              </div>
                            </td>
                          </tr>
                        ) : null,
                      ];
                    })}
                  </tbody>
                </table>
                </div>
              )}
            </div>
          </>
        )}

        {view === "users" && master && (
          <div className="chartcard">
            <div className="ggroup" style={{ marginBottom: 14 }}>
              <div className="ghdr">Add a user</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", padding: 12, alignItems: "center" }}>
                <input placeholder="username" value={nu} onChange={(e) => setNu(e.target.value)} style={{ width: 180 }} />
                <input placeholder="temp password (6+)" value={np} onChange={(e) => setNp(e.target.value)} style={{ width: 200 }} />
                <div className="selectwrap">
                  <select value={nr} onChange={(e) => setNr(e.target.value as "admin" | "semiadmin" | "user")}>
                    <option value="user">User</option>
                    <option value="semiadmin">Semi-admin</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button className="btn primary" style={{ flex: "0 0 auto", padding: "10px 18px" }} disabled={busy} onClick={addUser}>
                  Add user
                </button>
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={th}>User</th><th style={th}>Role</th><th style={th}>Status</th><th style={th}>Actions</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={td}><b>{u.username}</b></td>
                    <td style={td}>{u.role === "semiadmin" ? "semi-admin" : u.role}</td>
                    <td style={td}>
                      <span className={`stockbadge ${u.active ? "yes" : "no"}`} style={{ margin: 0 }}>
                        {u.active ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td style={{ ...td, display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button className="chip" disabled={busy || u.id === meId} onClick={() => call("PATCH", { id: u.id, active: !u.active })}>
                        {u.active ? "Disable" : "Enable"}
                      </button>
                      <div className="selectwrap" style={{ display: "inline-block" }}>
                        <select value={u.role} disabled={busy || u.id === meId} onChange={(e) => call("PATCH", { id: u.id, role: e.target.value })} style={{ padding: "4px 26px 4px 8px", fontSize: 12 }}>
                          <option value="user">User</option>
                          <option value="semiadmin">Semi-admin</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <button className="chip" disabled={busy} onClick={() => resetPw(u.id, u.username)}>Reset password</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
