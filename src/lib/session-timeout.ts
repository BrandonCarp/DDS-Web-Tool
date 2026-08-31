// The inactivity logout window, defined once.
//
// Two places enforce it and they must agree. lib/auth.ts is the authority — it
// kills the session server-side, and a session it rejects is dead whatever the
// browser thinks. AppShell.tsx runs a matching client timer purely so the
// logout is visible: without it the tab looks signed in until the next click,
// and the counter discovers the session died halfway through a quote.
//
// This file carries no "server-only" import on purpose. lib/auth.ts does, which
// is why the client could not import the constant from there and why the number
// used to be written out twice with a comment asking the next person to keep
// them in sync. A comment is not a mechanism; this is.

/** Idle time before a session is destroyed and the user must sign in again. */
export const IDLE_MINUTES = 60;

export const IDLE_MS = IDLE_MINUTES * 60 * 1000;
