/**
 * The sign-in notice (Brandon, 20/10/2026): a message every account sees in
 * a window as they sign in, written and switched on or off in the admin panel.
 *
 * This module is the shape and the rules alone, so the admin panel (a client
 * component) can share them; reading and writing the database is
 * login-notice-db.ts, for the server.
 */
export interface LoginNotice {
  enabled: boolean;
  title: string;
  body: string;
  updated_at?: string;
  updated_by?: string;
}

export const EMPTY_NOTICE: LoginNotice = { enabled: false, title: "", body: "" };
export const NOTICE_TITLE_MAX = 120;
export const NOTICE_BODY_MAX = 2000;

/** What was typed, trimmed and cut to length; anything else off. */
export function normalizeNotice(input: unknown): LoginNotice {
  const o = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    enabled: o.enabled === true,
    title: String(o.title ?? "").trim().slice(0, NOTICE_TITLE_MAX),
    body: String(o.body ?? "").replace(/\r\n/g, "\n").trim().slice(0, NOTICE_BODY_MAX),
  };
}

/** What the sign-in shows: the notice when it is on and says something, else nothing. */
export function noticeToShow(n: LoginNotice): { title: string; body: string } | null {
  return n.enabled && n.body ? { title: n.title, body: n.body } : null;
}
