"use client";

/**
 * The Settings tab. The light/dark choice it used to hold is gone — the app is
 * always dark now (Brandon, 25/9/2026) — which leaves the account.
 */
export function SettingsPanel({
  username,
  roleLabel,
}: {
  username: string;
  roleLabel: string;
}) {
  return (
    <div className="wrap one">
      <section className="config-col">
        <div className="panel">
          <div className="step">
            <div className="step-h">
              <h3>Account</h3>
            </div>
            <div className="acct">
              <span className="avatar" aria-hidden="true">
                {username.charAt(0) || "?"}
              </span>
              <span className="acct-who">
                <b>{username}</b>
                {roleLabel && <small>{roleLabel}</small>}
              </span>
              <a className="btn" href="/api/logout">
                Sign out
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
