"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface AdminUser {
  id: number;
  username: string;
  role: "admin" | "user";
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
  created_at: string;
}

const money = (n: string | number) =>
  Number(n).toLocaleString("en-US", { style: "currency", currency: "USD" });
const when = (s: string) => new Date(s).toLocaleString();

export function AdminPanel({
  users,
  estimates,
  meId,
}: {
  users: AdminUser[];
  estimates: AdminEstimate[];
  meId: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [nu, setNu] = useState("");
  const [np, setNp] = useState("");
  const [nr, setNr] = useState<"admin" | "user">("user");

  async function call(method: string, body: Record<string, unknown>) {
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error ?? "Request failed");
      router.refresh();
      return true;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function addUser() {
    if (await call("POST", { username: nu, password: np, role: nr })) {
      setNu(""); setNp(""); setNr("user");
    }
  }
  async function resetPw(id: number, username: string) {
    const p = window.prompt(`New password for ${username} (6+ characters):`);
    if (p) await call("PATCH", { id, password: p });
  }

  const th: React.CSSProperties = { textAlign: "left", padding: "8px 10px", fontSize: 12, color: "var(--muted)", textTransform: "uppercase", borderBottom: "1px solid var(--line)" };
  const td: React.CSSProperties = { padding: "9px 10px", fontSize: 13, borderBottom: "1px solid var(--line-2)" };

  return (
    <div className="wrap" style={{ gridTemplateColumns: "1fr", gridTemplateAreas: "none", display: "block", maxWidth: 1100 }}>
      {err && <div className="alert warn" style={{ marginBottom: 14 }}>{err}</div>}

      <div className="panel" style={{ marginBottom: 18 }}>
        <div className="step">
          <div className="step-h"><span className="step-n">1</span><h3>User accounts</h3></div>

          <div className="ggroup" style={{ marginBottom: 14 }}>
            <div className="ghdr">Add a user</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", padding: 12, alignItems: "center" }}>
              <input placeholder="username" value={nu} onChange={(e) => setNu(e.target.value)} style={{ width: 180 }} />
              <input placeholder="temp password (6+)" value={np} onChange={(e) => setNp(e.target.value)} style={{ width: 200 }} />
              <div className="selectwrap">
                <select value={nr} onChange={(e) => setNr(e.target.value as "admin" | "user")}>
                  <option value="user">User</option>
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
                  <td style={td}>{u.role}</td>
                  <td style={td}>
                    <span className={`stockbadge ${u.active ? "yes" : "no"}`} style={{ margin: 0 }}>
                      {u.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td style={{ ...td, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button className="chip" disabled={busy || u.id === meId} onClick={() => call("PATCH", { id: u.id, active: !u.active })}>
                      {u.active ? "Disable" : "Enable"}
                    </button>
                    <button className="chip" disabled={busy || u.id === meId} onClick={() => call("PATCH", { id: u.id, role: u.role === "admin" ? "user" : "admin" })}>
                      Make {u.role === "admin" ? "user" : "admin"}
                    </button>
                    <button className="chip" disabled={busy} onClick={() => resetPw(u.id, u.username)}>Reset password</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="step">
          <div className="step-h"><span className="step-n">2</span><h3>Estimates</h3><span className="hint">Last 100</span></div>
          {estimates.length === 0 ? (
            <div className="muted-note">No estimates saved yet.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>
                <th style={th}>When</th><th style={th}>User</th><th style={th}>Model</th>
                <th style={th}>Size</th><th style={th}>Windows</th><th style={th}>Color</th><th style={th}>Total</th>
              </tr></thead>
              <tbody>
                {estimates.map((e) => (
                  <tr key={e.id}>
                    <td style={td}>{when(e.created_at)}</td>
                    <td style={td}><b>{e.username}</b></td>
                    <td style={td}>{e.model}</td>
                    <td style={td}>{e.size}</td>
                    <td style={td}>{e.style}</td>
                    <td style={td}>{e.color}</td>
                    <td style={{ ...td, fontFamily: "var(--mono)" }}>{money(e.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
