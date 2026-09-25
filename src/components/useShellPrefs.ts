"use client";

import { useSyncExternalStore } from "react";
import type { Theme } from "@/lib/theme";

/*
 * React reads the two <html> attributes set by lib/theme.ts through
 * useSyncExternalStore: a change made anywhere (the Settings tab, the sidebar
 * button) re-renders every reader, and the server render always sees the
 * defaults, so hydration never disagrees with it.
 */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-sidebar"],
  });
  return () => mo.disconnect();
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
}

export function useSidebarCollapsed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.sidebar === "collapsed",
    () => false,
  );
}
