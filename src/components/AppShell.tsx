"use client";

import { useEffect, useRef, useState } from "react";
import type { ParsedDoor } from "@/lib/pricing/data/parse-request";
import { IDLE_MS } from "@/lib/session-timeout";
import { applySidebarCollapsed } from "@/lib/sidebar";
import { ResidentialTool } from "./ResidentialTool";
import { QuickEntry } from "./QuickEntry";
import { QuickBooksSetup } from "./QuickBooksSetup";
import { CommercialTool } from "./CommercialTool";
import { SpecialTool } from "./SpecialTool";
import { TorsionTool } from "./TorsionTool";
import { ExtensionTool } from "./ExtensionTool";
import { PartsTool } from "./PartsTool";
import { TopBar } from "./TopBar";
import type { SearchHit, SearchPick } from "@/lib/search";
import { TRACK_CATEGORIES, CABLE_CATEGORIES } from "@/lib/pricing/data/springs";
import { VinylTool } from "./VinylTool";
import { OperatorsTool } from "./OperatorsTool";
import { SettingsPanel } from "./SettingsPanel";
import { InventoryTool } from "./InventoryTool";
import { ScannerTool } from "./ScannerTool";
import { CustomerJobProvider, useCustomerJob } from "./CustomerJobFields";
import { Icon, type IconName } from "./Icon";
import { useSidebarCollapsed } from "./useShellPrefs";

/**
 * Whether the quick-entry box renders.
 *
 * Off since 12/9/2026. It reads counter shorthand and routes or fills a form,
 * and it works — but it rewards someone who already knows the models and the
 * abbreviations, and the problem it was meant to help with is that people are
 * not using the tool as it stands. Building for the user we already have does
 * not fix that.
 *
 * Nothing is deleted. The parser, the 596-product index and their tests all
 * stay under test, so turning this back on is a one-line change. The index in
 * particular is worth reusing inside the existing dropdowns — type-ahead on a
 * window design or a part helps everyone, with no new concept to learn.
 */
const SHOW_QUICK_ENTRY = false;

/**
 * Whether the Brochure link shows in the sidebar.
 *
 * Hidden since 24/9/2026 — Brandon. Nothing else is removed: the link and
 * Brochure.test all stay, so bringing it back is this one line.
 */
const SHOW_BROCHURE = false;

/**
 * Whether the QB Setup tab shows.
 *
 * Hidden since 24/9/2026 — Brandon. The tab, its page and its tests all stay,
 * so bringing it back is this one line.
 */
// The QuickBooks setup tab. Set to false to take it down — that is the whole
// change; the tests follow whichever way it is set.
export const SHOW_QB_SETUP = true;

type Tab = {
  id: string;
  label: string;
  /** A small tag beside the label. Residential and commercial quote from the
      stock sheets, and saying so on the tab keeps a counter from reaching for
      them on a special order — Brandon, 12/9/2026. */
  over?: string;
  icon: IconName;
  /** The page heading. */
  title: string;
};

const QUOTING_TABS: readonly Tab[] = [
  {
    id: "residential", label: "Residential", over: "Stock", icon: "residential",
    title: "Stock Residential",
  },
  {
    id: "commercial", label: "Commercial", over: "Stock", icon: "commercial",
    title: "Stock Commercial",
  },
  {
    id: "special", label: "Special Order", icon: "special",
    title: "Special Order",
  },
  {
    id: "torsion", label: "Torsion Springs", icon: "torsion",
    title: "Torsion Springs",
  },
  {
    id: "extension", label: "Extension Springs", icon: "extension",
    title: "Extension Springs",
  },
  {
    id: "parts", label: "Parts", icon: "parts",
    title: "Parts",
  },
  // Track and cables left Parts for tabs of their own — Brandon, 29/9/2026.
  {
    id: "track", label: "Track", icon: "track",
    title: "Track",
  },
  {
    id: "cables", label: "Cables", icon: "cable",
    title: "Cables",
  },
  {
    id: "vinyl", label: "Vinyl", icon: "vinyl",
    title: "Vinyl",
  },
  {
    id: "operators", label: "Operators", icon: "operators",
    title: "Operators",
  },
  // Scan parts into a cart for QuickBooks — every counter gets it (Brandon, 25/9/2026).
  {
    id: "scanner", label: "Scanner", icon: "barcode",
    title: "Scanner",
  },
];

// The paste helper install. Its own tab rather than a panel hanging under
// whichever tab happened to be open — a counter reads it once, follows it,
// and never comes back.
const QB_TAB: Tab = {
  id: "qbsetup", label: "QB Setup", icon: "download",
  title: "QuickBooks Setup",
};
// Inventory is visible ONLY to the master admin (role "admin") — it's a
// placeholder until that build starts.
const INVENTORY_TAB: Tab = {
  id: "inventory", label: "Inventory", icon: "inventory",
  title: "Inventory",
};
const SETTINGS_TAB: Tab = {
  id: "settings", label: "Settings", icon: "settings",
  title: "Settings",
};

/** Tab label for the phone dropdown, where the tag cannot sit beside it. */
function flatLabel(t: { label: string; over?: string }): string {
  return t.over ? `${t.over} ${t.label}` : t.label;
}

/** What shows under the name. A counter gets nothing — Brandon, 25/9/2026. */
function roleLabel(role: string): string {
  if (role === "admin") return "Admin";
  if (role === "semiadmin") return "Semi-admin";
  return "";
}

export function AppShell(props: {
  models: string[];
  user: { username: string; role: string };
  /** Render the quick-entry box. Defaults to the flag above; tests pass it
      explicitly so the component stays under test while it is switched off. */
  quickEntry?: boolean;
  /** Show the Brochure link. Defaults to the flag above; tests pass it
      explicitly so the link stays under test while it is hidden. */
  brochure?: boolean;
  /** Offer the QB Setup tab. Defaults to the flag above; tests pass it
      explicitly so the tab stays under test while it is hidden. */
  qbSetup?: boolean;
}) {
  return (
    <CustomerJobProvider>
      <Shell {...props} />
    </CustomerJobProvider>
  );
}

function NavTab({
  tab,
  active,
  collapsed,
  onPick,
}: {
  tab: Tab;
  active: boolean;
  collapsed: boolean;
  onPick: (id: string) => void;
}) {
  return (
    <button
      type="button"
      data-tab={tab.id}
      className={`tab${active ? " active" : ""}`}
      aria-current={active ? "page" : undefined}
      // Collapsed, the icon is all that shows, so the name moves to a tooltip.
      title={collapsed ? flatLabel(tab) : undefined}
      onClick={() => onPick(tab.id)}
    >
      <Icon name={tab.icon} />
      {tab.over ? (
        <span className="tab-stack">
          <span className="tab-over">{tab.over}</span>
          <span className="tab-main">{tab.label}</span>
        </span>
      ) : (
        <span className="tab-main">{tab.label}</span>
      )}
      {active && (
        <span className="tab-chev">
          <Icon name="chevron" size={16} />
        </span>
      )}
    </button>
  );
}

function Logo() {
  // Two files rather than a CSS filter: the dark-mode version is the white
  // logo Brandon already has, and the door mark keeps its shape either way.
  return (
    <span className="brand">
      <img className="logo-light" src="/logo.png" alt="Doors Direct" />
      <img className="logo-dark" src="/logo-light.png" alt="" />
    </span>
  );
}

function Shell({
  models,
  user,
  quickEntry = SHOW_QUICK_ENTRY,
  brochure = SHOW_BROCHURE,
  qbSetup = SHOW_QB_SETUP,
}: {
  models: string[];
  quickEntry?: boolean;
  brochure?: boolean;
  qbSetup?: boolean;
  user: { username: string; role: string };
}) {
  const [mode, setMode] = useState<string>("residential");
  // A configuration handed over by the quick-entry box. Passed to the
  // residential tool as a prop rather than lifted into shared state, so the
  // tool stays the only thing that owns its fields.
  const [prefill, setPrefill] = useState<ParsedDoor | null>(null);
  const collapsed = useSidebarCollapsed();
  // Idle watcher: no interaction for IDLE_MINUTES -> log out and land on the
  // login screen. The SERVER enforces the same window on the session itself;
  // this just makes the logout visible instead of surprising the next click.
  // Both sides read the window from lib/session-timeout.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const kick = () => window.location.assign("/api/logout");
    const reset = () => { clearTimeout(t); t = setTimeout(kick, IDLE_MS); };
    const evs = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    evs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => { clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, reset)); };
  }, []);
  // A field someone changes is marked data-set, which the stylesheet edges in
  // the in-stock green, so what has been chosen stands out from what is still
  // on its default (Brandon, 25/9/2026). Emptying it takes the mark away. One
  // listener for the whole app, catching events on their way down.
  useEffect(() => {
    const mark = (e: Event) => {
      const el = e.target;
      if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) return;
      if (el.value.trim() === "") el.removeAttribute("data-set");
      else el.setAttribute("data-set", "");
    };
    document.addEventListener("input", mark, true);
    document.addEventListener("change", mark, true);
    return () => {
      document.removeEventListener("input", mark, true);
      document.removeEventListener("change", mark, true);
    };
  }, []);
  // Only the master admin (Brandon's login) gets Inventory and the admin
  // panel link. Semi-admins lost the link on 24/9/2026 — Brandon.
  const isMaster = user.role === "admin";
  // The order here is the order on screen, in the sidebar and in the phone
  // dropdown alike — a test holds the two to the same list.
  const others: Tab[] = [
    ...(qbSetup ? [QB_TAB] : []),
    ...(isMaster ? [INVENTORY_TAB] : []),
    SETTINGS_TAB,
  ];
  const tabs: Tab[] = [...QUOTING_TABS, ...others];
  const current = tabs.find((t) => t.id === mode) ?? QUOTING_TABS[0];
  // Customer / P.O. / Job name is SHELVED for now — the bar and the
  // selection gate are removed, so quoting is immediate again. The provider
  // stays mounted so the tools keep compiling and simply save blank
  // customer fields; restoring the feature is two JSX lines below.
  const { setCustName, setCustPo, setCustJob } = useCustomerJob();
  // A search result opens its tab with the item picked. Each jump gets a new
  // number, used as the tool's key, so a second search on the same tab still
  // rebuilds it on the new item; a plain tab click clears the jump.
  const [jump, setJump] = useState<{ n: number; tab: string; pick?: SearchPick } | null>(null);
  const jumps = useRef(0);
  const pickTab = (id: string) => {
    setMode(id);
    setJump(null);
    setCustName(""); setCustPo(""); setCustJob("");
  };
  const jumpTo = (hit: SearchHit) => {
    pickTab(hit.tab);
    setJump({ n: ++jumps.current, tab: hit.tab, pick: hit.pick });
  };
  const at = (tab: string) => (jump?.tab === tab ? jump : null);
  // The picked row can sit below the fold of a long list; bring it into view.
  useEffect(() => {
    if (!jump?.pick) return;
    const t = setTimeout(() => document.querySelector(".main .partrow.on")?.scrollIntoView?.({ block: "nearest" }), 0);
    return () => clearTimeout(t);
  }, [jump]);
  const role = roleLabel(user.role);

  return (
    <div className="app">
      <aside className="side" aria-label="Main navigation">
        <div className="side-top">
          <Logo />
          <button
            type="button"
            className="side-toggle"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => applySidebarCollapsed(!collapsed)}
          >
            <Icon name="sidebar" />
          </button>
        </div>

        <nav className="side-nav">
          <div className="side-label">Quoting</div>
          {QUOTING_TABS.map((t) => (
            <NavTab key={t.id} tab={t} active={mode === t.id} collapsed={collapsed} onPick={pickTab} />
          ))}

          <div className="side-spacer" />

          <div className="side-label">Others</div>
          {qbSetup && (
            <NavTab tab={QB_TAB} active={mode === QB_TAB.id} collapsed={collapsed} onPick={pickTab} />
          )}
          {isMaster && (
            <>
              <NavTab tab={INVENTORY_TAB} active={mode === INVENTORY_TAB.id} collapsed={collapsed} onPick={pickTab} />
              {/* A link, not a tab: the admin panel is its own page. */}
              <a
                className="navlink"
                href="/admin"
                data-testid="admin-link"
                title={collapsed ? "Admin panel" : undefined}
              >
                <Icon name="dashboard" />
                <span className="navtext">Admin panel</span>
              </a>
            </>
          )}
          {brochure && (
            // On screen on every tab: a counter is often asked for the catalog
            // mid-quote and should not have to leave what they are building.
            <a
              className="navlink"
              href="/DoorsDirect_Catalog.pdf"
              download="DoorsDirect_Catalog.pdf"
              data-testid="brochure"
              title={collapsed ? "Brochure" : "Download the product catalog"}
            >
              <Icon name="book" />
              <span className="navtext">Brochure</span>
            </a>
          )}
          <NavTab tab={SETTINGS_TAB} active={mode === SETTINGS_TAB.id} collapsed={collapsed} onPick={pickTab} />
        </nav>

      </aside>

      {/* Phones and narrow windows: the sidebar gives way to this bar. Both are
          rendered and CSS picks one — a matchMedia switch would mismatch on
          hydration, and the server does not know the width. */}
      <div className="mbar">
        <Logo />
        <div className="tabsel selectwrap">
          <select
            aria-label="Tool"
            data-testid="tabsel"
            value={mode}
            onChange={(e) => pickTab(e.target.value)}
          >
            {tabs.map((t) => (
              <option key={t.id} value={t.id}>
                {flatLabel(t)}
              </option>
            ))}
          </select>
        </div>
        {brochure && (
          <a
            className="mbar-btn"
            href="/DoorsDirect_Catalog.pdf"
            download="DoorsDirect_Catalog.pdf"
            aria-label="Brochure"
            title="Download the product catalog"
          >
            <Icon name="book" />
          </a>
        )}
        {isMaster && (
          <a className="mbar-btn" href="/admin" aria-label="Admin panel" title="Admin panel">
            <Icon name="dashboard" />
          </a>
        )}
        <a className="mbar-btn" href="/api/logout" aria-label="Sign out" title="Sign out">
          <Icon name="logout" />
        </a>
      </div>

      <main className="main">
        <TopBar tabs={tabs} doorModels={models} username={user.username} role={role} isAdmin={isMaster}
          onJump={jumpTo} onSettings={() => pickTab(SETTINGS_TAB.id)} />
        <div className="main-inner">
          <header className="pagehead">
            <h1>{current.title}</h1>
          </header>

          {quickEntry && (
            <QuickEntry
              onGoTo={(t) => { setPrefill(null); pickTab(t); }}
              onApplyDoor={(d) => { setPrefill(d); pickTab("residential"); }}
            />
          )}
          {mode === "residential" && (
            <ResidentialTool key={at("residential")?.n ?? 0} openOn={at("residential")?.pick}
              models={models} prefill={prefill} onPrefillUsed={() => setPrefill(null)} />
          )}
          {mode === "commercial" && <CommercialTool key={at("commercial")?.n ?? 0} openOn={at("commercial")?.pick} />}
          {mode === "special" && <SpecialTool key={at("special")?.n ?? 0} openOn={at("special")?.pick} />}
          {mode === "torsion" && <TorsionTool key={at("torsion")?.n ?? 0} openOn={at("torsion")?.pick} />}
          {mode === "extension" && <ExtensionTool key={at("extension")?.n ?? 0} openOn={at("extension")?.pick} />}
          {mode === "qbsetup" && qbSetup && <QuickBooksSetup />}
          {mode === "parts" && <PartsTool key={at("parts")?.n ?? 0} openOn={at("parts")?.pick} />}
          {mode === "track" && <PartsTool key={at("track")?.n ?? 0} openOn={at("track")?.pick} categories={TRACK_CATEGORIES} eyebrow="Track quote" finder="Find track" />}
          {mode === "cables" && <PartsTool key={at("cables")?.n ?? 0} openOn={at("cables")?.pick} categories={CABLE_CATEGORIES} eyebrow="Cables quote" finder="Find a cable" />}
          {mode === "vinyl" && <VinylTool />}
          {mode === "operators" && <OperatorsTool key={at("operators")?.n ?? 0} openOn={at("operators")?.pick} />}
          {mode === "settings" && <SettingsPanel username={user.username} roleLabel={role} />}
          {mode === "scanner" && <ScannerTool />}
          {mode === "inventory" && isMaster && <InventoryTool />}
        </div>
      </main>
    </div>
  );
}
