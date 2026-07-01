"use client";

import { useState, type KeyboardEvent } from "react";

export default function LoginPage() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

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
          <div className="hint">Internal pricing tool · authorized staff only</div>
          <div className="foot">© Doors Direct · build v6</div>
        </div>
      </div>
    </div>
  );
}
