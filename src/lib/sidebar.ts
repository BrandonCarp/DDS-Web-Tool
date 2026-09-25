/**
 * The collapsed sidebar, remembered per computer.
 *
 * It lives as an attribute on <html> (data-sidebar) rather than in React
 * state, so the CSS can lay out the very first paint. BOOT_SCRIPT runs in the
 * <head> before anything draws; without it a collapsed sidebar would flash
 * open on every load while React caught up.
 *
 * The colours need nothing like this: the app is always dark, straight from
 * the stylesheet.
 *
 * This file stays free of React so the root layout — a server component — can
 * import BOOT_SCRIPT. The hook that reads the attribute is in
 * components/useShellPrefs.ts.
 */
export const SIDEBAR_KEY = "dds-sidebar";

export function applySidebarCollapsed(collapsed: boolean) {
  document.documentElement.dataset.sidebar = collapsed ? "collapsed" : "open";
  try {
    window.localStorage.setItem(SIDEBAR_KEY, collapsed ? "collapsed" : "open");
  } catch {
    /* private window or storage off — the change still applies for this visit */
  }
}

/** Inlined into <head> by the root layout. Keep it tiny and dependency-free. */
export const BOOT_SCRIPT = `try{if(localStorage.getItem("${SIDEBAR_KEY}")==="collapsed")document.documentElement.dataset.sidebar="collapsed"}catch(e){}`;
