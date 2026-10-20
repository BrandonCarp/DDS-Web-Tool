"use client";

import { useState, type KeyboardEvent } from "react";
import { NoticeModal } from "@/components/NoticeModal";

export default function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  // The sign-in notice the admin panel switched on, shown once the account is
  // in and before the tool (Brandon, 20/10/2026); OK goes on to the tool.
  const [notice, setNotice] = useState<{ title: string; body: string } | null>(null);

  async function login() {
    setErr(false);
    setBusy(true);
    try {
      const r = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p }),
      });
      if (r.ok) {
        const d = (await r.json().catch(() => ({}))) as { notice?: { title: string; body: string } | null };
        if (d.notice && d.notice.body) { setNotice(d.notice); return; }
        window.location.href = "/";
        return;
      }
      setErr(true);
      setP("");
    } catch {
      setErr(true);
    }
    setBusy(false);
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="login-shell">
      <div className="topbar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-light.png" alt="Doors Direct" />
      </div>
      <div className="wrap">
        <div className="card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo" src="/logo.png" alt="Doors Direct" />
          <h1>Sign in to your account</h1>
          <div className={`err ${err ? "show" : ""}`}>Incorrect username or password.</div>
          <div className="field">
            <label htmlFor="u">Username</label>
            <input id="u" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false}
              value={u} onChange={(e) => setU(e.target.value)} onKeyDown={onKey} autoFocus />
          </div>
          <div className="field">
            <label htmlFor="p">Password</label>
            <input id="p" type="password" autoComplete="current-password"
              value={p} onChange={(e) => setP(e.target.value)} onKeyDown={onKey} />
          </div>
          <button className="btn" type="button" onClick={login} disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
          <div className="hint"><b>Authorized staff only</b></div>
          <div className="foot">© Doors Direct · 2026</div>
        </div>
      </div>
      {notice && <NoticeModal title={notice.title} body={notice.body} onClose={() => { window.location.href = "/"; }} />}
    </div>
  );
}
