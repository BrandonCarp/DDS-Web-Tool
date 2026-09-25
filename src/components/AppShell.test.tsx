// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppShell } from "./AppShell";
import { BOOT_SCRIPT } from "@/lib/sidebar";

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

describe("the name card", () => {
  it("shows nothing under a counter's name, and Admin under Brandon's", () => {
    shell("user");
    expect(document.querySelector(".side-who-role")).toBeNull();
    cleanup();
    shell("admin");
    expect(document.querySelector(".side-who-role")?.textContent).toBe("Admin");
  });
});
