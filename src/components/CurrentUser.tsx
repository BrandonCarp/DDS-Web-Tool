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

/** The extra copy buttons an account can have under the QuickBooks button. */
export type CopyExtra = "description" | "quantity" | "price";

/**
 * Accounts that get extra copy buttons under the QuickBooks button, and which:
 * Aimee's (6/10/2026) and the doorsdirect account (7/10/2026). Usernames in
 * lower case; add a line to give someone else buttons, or add "quantity" to
 * Aimee's to give her that one too.
 */
const COPY_EXTRAS: Record<string, readonly CopyExtra[]> = {
  aimee: ["description", "price"],
  doorsdirect: ["description", "quantity", "price"],
};

export function copyExtrasFor(user: CurrentUser | null): readonly CopyExtra[] {
  return user ? COPY_EXTRAS[user.username.trim().toLowerCase()] ?? [] : [];
}

export function hasCopyExtras(user: CurrentUser | null): boolean {
  return copyExtrasFor(user).length > 0;
}
