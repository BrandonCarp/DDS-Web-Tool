"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Who is signed in, for the few places below the shell that need to know —
 * Brandon, 6/10/2026. The shell already has the user; this shares it the way
 * the cart and the customer fields are shared, instead of passing it through
 * every tab.
 */
export type CurrentUser = { username: string; role: string };

const UserContext = createContext<CurrentUser | null>(null);

export function CurrentUserProvider({ user, children }: { user: CurrentUser; children: ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

/** The signed-in user, or null outside the shell (a tool rendered on its own). */
export const useCurrentUser = () => useContext(UserContext);

/**
 * Accounts that also get Copy price and Copy description under the QuickBooks
 * button — Aimee's, 6/10/2026. Usernames, lower case; add one to give someone
 * else the buttons.
 */
const COPY_EXTRAS = new Set(["aimee"]);

export function hasCopyExtras(user: CurrentUser | null): boolean {
  return !!user && COPY_EXTRAS.has(user.username.trim().toLowerCase());
}
