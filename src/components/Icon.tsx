/**
 * The app's icons, drawn inline so there is no icon library to install.
 *
 * All share one grid (24 x 24, 1.75 stroke, round ends) and take their colour
 * from `currentColor`, so a nav item's icon follows the item's text colour in
 * both themes without any per-icon CSS. They carry no text: a button's
 * textContent stays exactly its label, which the tab tests rely on.
 */
const PATHS = {
  residential: (
    <>
      <path d="M3.5 10.2 12 4l8.5 6.2V19a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" />
      <path d="M7.5 20v-6.5h9V20M7.5 16.5h9" />
    </>
  ),
  commercial: (
    <>
      <path d="M3 20V8.5L12 4l9 4.5V20" />
      <path d="M6.5 20v-8h11v8M6.5 14.7h11M6.5 17.4h11M2 20h20" />
    </>
  ),
  special: (
    <>
      <path d="M9 4.5h6v2.5H9z" />
      <path d="M15 5.5h2.5a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1H9" />
      <path d="M9 11h6M9 14.5h6M9 18h3.5" />
    </>
  ),
  torsion: (
    <>
      <path d="M2.5 12h2M19.5 12h2" />
      <path d="M4.5 12c0-4 2.5-4 2.5 0s2.5 4 2.5 0 2.5-4 2.5 0 2.5 4 2.5 0 2.5-4 2.5 0 2.5 4 2.5 0" />
    </>
  ),
  extension: (
    <>
      <path d="M12 2.5v2.5M12 19v2.5" />
      <path d="M12 5 7.5 7 16.5 9.5 7.5 12l9 2.5-9 2.5L12 19" />
    </>
  ),
  parts: (
    <>
      <path d="M12 3.2 19.6 7.6v8.8L12 20.8l-7.6-4.4V7.6z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  vinyl: (
    <>
      <path d="M3.8 15.6 15.6 3.8l4.6 4.6L8.4 20.2z" />
      <path d="m7.4 12 1.8 1.8M10 9.4l1.2 1.2M12.6 6.8l1.8 1.8" />
    </>
  ),
  operators: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="3" />
      <circle cx="12" cy="8.2" r="1.6" />
      <path d="M10 13h4M10 16.2h4" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.6C9.8 5.1 6.9 4.7 4 5.3v13.2c2.9-.6 5.8-.2 8 1.3 2.2-1.5 5.1-1.9 8-1.3V5.3c-2.9-.6-5.8-.2-8 1.3z" />
      <path d="M12 6.6v13.2" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10.5M7.5 10 12 14.5 16.5 10" />
      <path d="M4.5 16v2.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V16" />
    </>
  ),
  inventory: (
    <>
      <path d="m3.5 7.5 8.5-4 8.5 4-8.5 4z" />
      <path d="M3.5 7.5v9l8.5 4 8.5-4v-9M12 11.5v9" />
    </>
  ),
  dashboard: (
    <>
      <rect x="4" y="4" width="7" height="8" rx="1.6" />
      <rect x="13" y="4" width="7" height="5" rx="1.6" />
      <rect x="4" y="14" width="7" height="6" rx="1.6" />
      <rect x="13" y="11" width="7" height="9" rx="1.6" />
    </>
  ),
  settings: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2.2" />
      <circle cx="9" cy="17" r="2.2" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  logout: (
    <>
      <path d="M14.5 4.5h3a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-3" />
      <path d="M10 8 6 12l4 4M6 12h9.5" />
    </>
  ),
  chevron: <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />,
  sidebar: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <path d="M9.5 4.5v15" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M19.5 14.2A7.5 7.5 0 1 1 9.8 4.5a6 6 0 0 0 9.7 9.7z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
