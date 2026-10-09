// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppShell } from "./AppShell";
import { BOOT_SCRIPT } from "@/lib/sidebar";
import { EXTENSION_SPRINGS } from "@/lib/pricing/data/springs";
import { copiedQbLine } from "./test-clipboard";

/**
 * The sidebar shell: who sees the admin panel, the Settings tab, and the
 * collapsed sidebar. The sidebar state lives on <html>, so each test puts it
 * back.
 */
afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.sidebar;
  localStorage.clear();
});

const shell = (role = "user") =>
  render(<AppShell models={["4050"]} user={{ username: "bc", role }} />);

describe("admin panel link", () => {
  it("shows for the master admin only", () => {
    // Semi-admins had the old DASH button; the link is Brandon's alone since
    // 24/9/2026.
    for (const [role, shown] of [["admin", true], ["semiadmin", false], ["user", false]] as const) {
      cleanup();
      shell(role);
      expect(screen.queryByTestId("admin-link") !== null, role).toBe(shown);
    }
  });
});

describe("settings", () => {
  it("opens from the sidebar, with the account on it", () => {
    shell();
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Settings");
    expect(screen.getByText("Sign out", { selector: "a.btn" }).getAttribute("href")).toBe("/api/logout");
  });

  it("is always dark: no theme to pick, and an old light choice is ignored", () => {
    // A computer that picked Light before 25/9/2026 still has it stored.
    localStorage.setItem("dds-theme", "light");
    new Function(BOOT_SCRIPT)();
    expect(document.documentElement.dataset.theme).toBeUndefined();
    shell();
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.queryByTestId("theme-light")).toBeNull();
    expect(screen.queryByTestId("theme-dark")).toBeNull();
  });
});

describe("sidebar", () => {
  it("collapses and remembers it", async () => {
    shell();
    fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));
    expect(document.documentElement.dataset.sidebar).toBe("collapsed");
    expect(localStorage.getItem("dds-sidebar")).toBe("collapsed");
    // Collapsed, the labels hide, so every tab carries its name as a tooltip.
    await waitFor(() => expect(screen.getByRole("button", { name: "Expand sidebar" })).toBeTruthy());
    expect(document.querySelector('[data-tab="special"]')?.getAttribute("title")).toBe("Special Order");
  });

  it("names the page after the tab", () => {
    shell();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Stock Residential");
    fireEvent.click(document.querySelector('[data-tab="parts"]')!);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Parts");
  });
});

describe("chosen fields", () => {
  it("marks a field someone changes, and unmarks it when emptied", () => {
    shell();
    const series = screen.getByTestId("series") as HTMLSelectElement;
    const value = [...series.options].map((o) => o.value).find(Boolean)!;
    fireEvent.change(series, { target: { value } });
    expect(series.hasAttribute("data-set")).toBe(true);
    fireEvent.change(series, { target: { value: "" } });
    expect(series.hasAttribute("data-set")).toBe(false);
  });
});

describe("scanner cart", () => {
  it("empties when someone leaves the Scanner tab", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({
      ok: true, status: 200,
      json: async () => ({ code: "12345", item: { key: "FASTENERS|TEK", name: "TEK", desc: "TEK, BAG OF 100", qbItem: "FASTENER", price: 10.95 } }),
    }) as Response));
    shell();
    const tab = (id: string) => document.querySelector(`.side [data-tab="${id}"]`) as HTMLElement;
    fireEvent.click(tab("scanner"));
    const box = screen.getByTestId("scanner-box");
    fireEvent.change(box, { target: { value: "12345" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await waitFor(() => expect(screen.getAllByTestId("cart-row")).toHaveLength(1));
    fireEvent.click(tab("residential"));
    fireEvent.click(tab("scanner"));
    expect(screen.queryAllByTestId("cart-row")).toHaveLength(0);
    vi.unstubAllGlobals();
  });
});

describe("the top bar", () => {
  const menu = () => screen.getByTestId("user-menu");
  const search = () => screen.getByTestId("qsearch") as HTMLInputElement;
  const find = (text: string) => {
    fireEvent.focus(search());
    fireEvent.change(search(), { target: { value: text } });
    return screen.getAllByTestId("qsearch-hit");
  };
  const title = () => document.querySelector("aside.quote .qtitle")?.textContent;

  it("shows who is signed in at the top right; the sidebar has no name card", () => {
    shell("user");
    expect(document.querySelector(".umenu-name")?.textContent).toBe("bc");
    expect(document.querySelector(".umenu-role")).toBeNull(); // nothing under a counter's name
    expect(document.querySelector(".side-user")).toBeNull();
    cleanup();
    shell("admin");
    expect(document.querySelector(".umenu-role")?.textContent).toBe("Admin");
  });

  it("keeps Settings and Sign out in the name menu, and the admin panel for the admin", () => {
    shell("user");
    fireEvent.click(menu());
    expect(screen.getByTestId("sign-out").getAttribute("href")).toBe("/api/logout");
    expect(screen.queryByText("Admin panel", { selector: ".umenu-pop a" })).toBeNull();
    fireEvent.click(screen.getByRole("menuitem", { name: /settings/i }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Settings");
    cleanup();
    shell("admin");
    fireEvent.click(menu());
    expect(screen.getByText("Admin panel", { selector: ".umenu-pop a" }).getAttribute("href")).toBe("/admin");
  });

  it("puts the cursor in the search with Ctrl+K", () => {
    shell();
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    expect(document.activeElement).toBe(search());
  });

  it("opens a part on its own tab, already picked", () => {
    shell();
    fireEvent.mouseDown(find("1100-18")[0]);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Parts");
    expect(title()).toBe("1100-18");
  });

  it("opens a spring on the Extension Springs tab, already picked", () => {
    shell();
    const spring = EXTENSION_SPRINGS.items[0].name;
    fireEvent.mouseDown(find(spring)[0]);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Extension Springs");
    expect(title()).toBe(spring);
  });

  it("opens a kit on the Parts tab, where kits sell now", () => {
    shell();
    fireEvent.mouseDown(find("7ft tor kit")[0]);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Parts");
    expect(title()).toBe("7FT TOR KIT");
  });

  it("opens the 4050 on Residential at step 1, ready to configure", () => {
    shell();
    const hit = find("4050").find((h) => h.textContent?.includes("Stock residential"))!;
    fireEvent.mouseDown(hit);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Stock Residential");
    expect((screen.getByTestId("model") as HTMLSelectElement).value).toBe("4050");
    expect((screen.getByTestId("configure") as HTMLButtonElement).disabled).toBe(false);
  });

  it("opens the 4050 on Special Order with maker, collection and model chosen", () => {
    shell();
    const hit = find("4050").find((h) => h.textContent?.includes("Special order"))!;
    fireEvent.mouseDown(hit);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Special Order");
    expect((screen.getByTestId("so-series") as HTMLSelectElement).value).toBe("Premium Steel Collection");
    expect((screen.getByTestId("so-model") as HTMLSelectElement).selectedOptions[0].textContent).toBe("4050");
    expect(screen.getByTestId("so-configure")).toBeTruthy();
  });

  it("opens a 4050 on the Special Order tab, chosen and ready to configure", () => {
    shell();
    const hit = find("4050").find((h) => h.textContent?.includes("Special Order"))!;
    fireEvent.mouseDown(hit);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Special Order");
    expect((screen.getByTestId("so-model") as HTMLSelectElement).value).toContain("4050");
    expect(screen.getByTestId("so-configure")).toBeTruthy();
  });

  it("opens a 4050 on the Residential tab at step 1, chosen", () => {
    shell();
    const hit = find("4050").find((h) => h.textContent?.includes("Residential"))!;
    fireEvent.mouseDown(hit);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Stock Residential");
    expect((screen.getByTestId("model") as HTMLSelectElement).value).toBe("4050");
    expect((screen.getByTestId("configure") as HTMLButtonElement).disabled).toBe(false);
  });

  it("switches to the new item when a second search lands on the same tab", () => {
    shell();
    fireEvent.mouseDown(find("1100-18")[0]);
    fireEvent.mouseDown(find("400-12")[0]);
    expect(title()).toBe("400-12");
  });
});

describe("switching between the tabs built on the Parts tool", () => {
  it("gives each its own list: Track, then Cables, then Parts, in one visit", () => {
    // They share one component. Each needs its own key, or React keeps the
    // last tab's category when the next one opens — Cables showed "TRACKS"
    // and "Nothing matches" (30/9/2026).
    shell();
    const tab = (id: string) => document.querySelector(`.side [data-tab="${id}"]`) as HTMLElement;
    const list = () => screen.getByTestId("parts-list").textContent ?? "";
    // Parts and Track open on their buttons (6/10/2026), so a page is chosen;
    // Track then offers its pieces in a drop-down rather than a list.
    const page = (group: string, entry: string) => {
      fireEvent.click(screen.getByTestId(group));
      fireEvent.click(screen.getByTestId(entry));
    };
    fireEvent.click(tab("track"));
    page("group-complete-track", "page-residential");
    expect(list()).toContain("20R");
    fireEvent.click(tab("cables"));
    expect(list()).toContain("CABLE KEEPERS");
    expect(list()).not.toContain("Nothing matches");
    fireEvent.click(tab("parts"));
    page("group-drums", "page-other-drums");
    expect(list()).toContain("1100-18");
  });
});

describe("the Cart tab", () => {
  it("glows, with a count, from the first add until Clear", () => {
    shell();
    const tab = (id: string) => document.querySelector(`.side [data-tab="${id}"]`) as HTMLElement;
    fireEvent.click(tab("tools"));
    fireEvent.click(screen.getByTestId("page-felco-cutter")); // one part: picked straight away
    fireEvent.click(screen.getByTestId("parts-copy-qb-cart"));
    // The Cart sits in the top bar now, left of the signed-in name (7/10/2026).
    const cart = () => screen.getByTestId("topbar-cart");
    expect(tab("cart")).toBeNull();
    expect(cart().classList.contains("glow")).toBe(true);
    expect(screen.getByTestId("cart-count").textContent).toBe("1");
    fireEvent.click(tab("residential")); // still glowing on another tab
    expect(cart().classList.contains("glow")).toBe(true);
    fireEvent.click(cart());
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Cart");
    expect(screen.getAllByTestId("cartline")).toHaveLength(1);
    fireEvent.click(screen.getByTestId("cart-clear"));
    expect(cart().classList.contains("glow")).toBe(false);
    expect(screen.queryByTestId("cart-count")).toBeNull();
  });
});

describe("the welcome cards", () => {
  it("rotate door photos under Residential and Commercial, each with its own words", () => {
    shell();
    expect(screen.getByTestId("door-show").querySelector("img")?.getAttribute("src")).toMatch(/^\/door-photos\/residential\//);
    expect(screen.getByText("Select your residential configuration")).toBeTruthy();
    fireEvent.click(document.querySelector('.side [data-tab="commercial"]') as HTMLElement);
    expect(screen.getByTestId("door-show").querySelector("img")?.getAttribute("src")).toMatch(/^\/door-photos\/commercial\//);
    expect(screen.getByText("Select your commercial configuration")).toBeTruthy();
    expect(screen.getByText("Pick a manufacturer and model, then Configure.")).toBeTruthy();
  });
});

describe("the Parts group tabs (6/10/2026)", () => {
  const ids = () => [...document.querySelectorAll(".side [data-tab]")].map((e) => e.getAttribute("data-tab"));

  it("sit in the side nav in Brandon's order (7/10/2026)", () => {
    shell();
    const quoting = ids().slice(0, ids().indexOf("scanner") + 1);
    expect(quoting).toEqual([
      "residential", "commercial", "special", "vinyl", "operators", "torsion", "extension",
      "angle", "retainers", "seals", "tubeshafts", "struts", "cables", "track", "parts",
      "tools", "disposals", "scanner", // Disposals and Scanner under their own Services heading (9/10/2026)
    ]);
    const labels = [...document.querySelectorAll(".side .side-label")].map((e) => e.textContent);
    expect(labels).toEqual(["Quoting", "Services", "Others"]);
    expect(document.querySelector('.side [data-tab="track"] .tab-main')?.textContent).toBe("Tracks");
  });

  it("open straight onto their pages, with no group buttons", () => {
    shell();
    fireEvent.click(document.querySelector('.side [data-tab="retainers"]') as HTMLElement);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Retainers");
    expect(document.querySelector(".pnav-groups")).toBeNull();
    fireEvent.click(screen.getByTestId("page-u-retainers"));
    expect(document.querySelectorAll("ul.partlist .partrow")).toHaveLength(2);
  });

  it("are where the top-bar search sends their parts", () => {
    shell();
    const search = screen.getByTestId("qsearch") as HTMLInputElement;
    fireEvent.focus(search);
    fireEvent.change(search, { target: { value: "cable cutter" } });
    fireEvent.mouseDown(screen.getAllByTestId("qsearch-hit")[0]);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Tools");
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("CABLE CUTTER");
  });
});

describe("the Parts and Track buttons", () => {
  it("open the page a top-bar search lands on, with the part picked", () => {
    shell();
    const search = screen.getByTestId("qsearch") as HTMLInputElement;
    fireEvent.focus(search);
    fireEvent.change(search, { target: { value: "1100-18" } });
    fireEvent.mouseDown(screen.getAllByTestId("qsearch-hit")[0]);
    expect(screen.getByTestId("parts-page").textContent).toBe("Drums › Other drums");
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("1100-18");
  });
});

describe("the Disposals window (9/10/2026)", () => {
  const open = () => {
    shell();
    fireEvent.click(document.querySelector('.side [data-tab="disposals"]') as HTMLElement);
    return screen.getByTestId("disposal-modal");
  };

  it("opens over the page from the side nav, and asks for both answers before pricing", () => {
    open();
    expect(screen.getByTestId("disposal-prompt").textContent).toContain("location");
    expect(screen.queryByTestId("disposal-price")).toBeNull();
    fireEvent.click(screen.getByTestId("disposal-loc-south"));
    expect(screen.getByTestId("disposal-prompt").textContent).toContain("Single or double");
    fireEvent.click(screen.getByTestId("disposal-size-single"));
    expect(screen.getByTestId("disposal-price").textContent).toBe("$45.00");
    expect(screen.getByTestId("disposal-desc").textContent).toBe("SINGLE DOOR DISPOSAL");
  });

  it("prices each location and door, and pastes under the DISPOSAL item", async () => {
    open();
    const price = (loc: string, size: string) => {
      fireEvent.click(screen.getByTestId(`disposal-loc-${loc}`));
      fireEvent.click(screen.getByTestId(`disposal-size-${size}`));
      return screen.getByTestId("disposal-price").textContent;
    };
    expect(price("south", "single")).toBe("$45.00");
    expect(price("south", "double")).toBe("$75.00");
    expect(price("union", "single")).toBe("$40.00");
    expect(price("union", "double")).toBe("$80.00");
    const line = await copiedQbLine(screen.getByTestId("disposal-copy-qb"));
    expect(line).toEqual({ item: "DISPOSAL", description: "DOUBLE DOOR DISPOSAL", qty: 1, rate: 80 });
  });

  it("gives every account one Copy description, Copy quantity and Copy price, with no doubles", () => {
    // The shell signs in as "bc", who has no copy extras of their own; the
    // Disposals window hands them out regardless, and only once each.
    open();
    fireEvent.click(screen.getByTestId("disposal-loc-union"));
    fireEvent.click(screen.getByTestId("disposal-size-single"));
    const labels = Array.from(screen.getByTestId("disposal-modal").querySelectorAll(".qfoot button"))
      .map((b) => b.textContent?.trim());
    expect(labels).toEqual(["QuickBooks", "Copy description", "Copy quantity", "Copy price", "Add to cart"]);
  });

  it("takes a quantity on the − n + box, which goes on the QuickBooks line while the price stays per door", async () => {
    open();
    fireEvent.click(screen.getByTestId("disposal-loc-south"));
    fireEvent.click(screen.getByTestId("disposal-size-double"));
    fireEvent.click(screen.getByTestId("disposal-qty-plus"));
    fireEvent.click(screen.getByTestId("disposal-qty-plus"));
    expect((screen.getByTestId("disposal-qty") as HTMLInputElement).value).toBe("3");
    expect(screen.getByTestId("disposal-price").textContent).toBe("$75.00");
    const line = await copiedQbLine(screen.getByTestId("disposal-copy-qb"));
    expect(line).toEqual({ item: "DISPOSAL", description: "DOUBLE DOOR DISPOSAL", qty: 3, rate: 75 });
    fireEvent.click(screen.getByTestId("disposal-qty-minus"));
    fireEvent.click(screen.getByTestId("disposal-qty-minus"));
    fireEvent.click(screen.getByTestId("disposal-qty-minus")); // stops at 1
    expect((screen.getByTestId("disposal-qty") as HTMLInputElement).value).toBe("1");
  });

  it("closes on the × and on Escape, leaving the page as it was", () => {
    open();
    fireEvent.click(screen.getByTestId("disposal-close"));
    expect(screen.queryByTestId("disposal-modal")).toBeNull();
    fireEvent.click(document.querySelector('.side [data-tab="disposals"]') as HTMLElement);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByTestId("disposal-modal")).toBeNull();
  });
});
