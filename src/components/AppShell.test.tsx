// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppShell } from "./AppShell";
import { BOOT_SCRIPT } from "@/lib/sidebar";
import { EXTENSION_SPRINGS } from "@/lib/pricing/data/springs";

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
    fireEvent.click(tab("track"));
    expect(list()).toContain("20R");
    fireEvent.click(tab("cables"));
    expect(list()).toContain("CABLE KEEPERS");
    expect(list()).not.toContain("Nothing matches");
    fireEvent.click(tab("parts"));
    expect(list()).toContain("1100-18");
  });
});
