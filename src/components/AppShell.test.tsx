// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AppShell } from "./AppShell";

/**
 * The sidebar shell: who sees the admin panel, the Settings tab's theme
 * switch, and the collapsed sidebar. Theme and sidebar live on <html>, so
 * each test puts it back.
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
  it("opens from the sidebar", () => {
    shell();
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Settings");
    expect(screen.getByTestId("theme-light")).toBeTruthy();
  });

  it("starts light and switches to dark, remembering the choice", async () => {
    shell();
    fireEvent.click(screen.getByRole("button", { name: "Settings" }));
    expect(screen.getByTestId("theme-light").getAttribute("aria-checked")).toBe("true");

    fireEvent.click(screen.getByTestId("theme-dark"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem("dds-theme")).toBe("dark");
    await waitFor(() =>
      expect(screen.getByTestId("theme-dark").getAttribute("aria-checked")).toBe("true"),
    );

    fireEvent.click(screen.getByTestId("theme-light"));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("dds-theme")).toBe("light");
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
