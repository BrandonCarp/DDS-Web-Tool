"use client";

import { Icon } from "./Icon";
import { useTheme } from "./useShellPrefs";
import { applyTheme, type Theme } from "@/lib/theme";

const THEMES: { id: Theme; label: string; note: string }[] = [
  { id: "light", label: "Light", note: "White background. The default." },
  { id: "dark", label: "Dark", note: "Dark background, easier in a dim room." },
];

/**
 * The Settings tab. Appearance is the only setting so far.
 *
 * The theme is saved in this browser, not on the login: it is a property of
 * the screen and the room it sits in, and the counter computers are shared.
 */
export function SettingsPanel({
  username,
  roleLabel,
}: {
  username: string;
  roleLabel: string;
}) {
  const theme = useTheme();

  return (
    <div className="wrap one">
      <section className="config-col">
        <div className="panel">
          <div className="step">
            <div className="step-h">
              <h3>Appearance</h3>
              <span className="hint">Saved on this computer</span>
            </div>
            <div className="themepick" role="radiogroup" aria-label="Theme">
              {THEMES.map((t) => {
                const on = theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    data-testid={`theme-${t.id}`}
                    className={`themeopt${on ? " sel" : ""}`}
                    onClick={() => applyTheme(t.id)}
                  >
                    {/* A thumbnail of the app in that theme: sidebar, form, quote. */}
                    <span className={`themeprev ${t.id}`} aria-hidden="true">
                      <span className="tp-side" />
                      <span className="tp-main">
                        <span className="tp-form" />
                        <span className="tp-quote">
                          <span className="tp-btn" />
                        </span>
                      </span>
                    </span>
                    <span className="themelbl">
                      <Icon name={t.id === "light" ? "sun" : "moon"} size={18} />
                      <span className="themetext">
                        <b>{t.label}</b>
                        <small>{t.note}</small>
                      </span>
                      {on && (
                        <span className="themecheck">
                          <Icon name="check" size={16} />
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

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
                <small>{roleLabel}</small>
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
