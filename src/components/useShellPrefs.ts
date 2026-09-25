"use client";

import { useSyncExternalStore } from "react";

/*
 * React reads the data-sidebar attribute set by lib/sidebar.ts through
 * useSyncExternalStore: a change made anywhere re-renders every reader, and
 * the server render always sees the default, so hydration never disagrees.
 */
function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-sidebar"] });
  return () => mo.disconnect();
}

export function useSidebarCollapsed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.sidebar === "collapsed",
    () => false,
  );
}
