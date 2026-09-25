/**
 * Light/dark theme and the collapsed sidebar, both remembered per computer.
 *
 * Both live as attributes on <html> (data-theme, data-sidebar) rather than in
 * React state, so the CSS can style the very first paint. BOOT_SCRIPT runs in
 * the <head> before anything draws; without it a dark-mode computer would
 * flash white on every load while React caught up.
 *
 * Light is the default. Nothing is stored until someone changes something.
 *
 * This file stays free of React so the root layout — a server component — can
 * import BOOT_SCRIPT. The hooks that read these attributes are in
 * components/useShellPrefs.ts.
 */
export type Theme = "light" | "dark";

export const THEME_KEY = "dds-theme";
export const SIDEBAR_KEY = "dds-sidebar";

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private window or storage off — the change still applies for this visit */
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  write(THEME_KEY, theme);
}

export function applySidebarCollapsed(collapsed: boolean) {
  document.documentElement.dataset.sidebar = collapsed ? "collapsed" : "open";
  write(SIDEBAR_KEY, collapsed ? "collapsed" : "open");
}

/** Inlined into <head> by the root layout. Keep it tiny and dependency-free. */
export const BOOT_SCRIPT = `try{var d=document.documentElement,s=localStorage;if(s.getItem("${THEME_KEY}")==="dark")d.dataset.theme="dark";if(s.getItem("${SIDEBAR_KEY}")==="collapsed")d.dataset.sidebar="collapsed"}catch(e){}`;
