// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import { AppShell } from "./AppShell";

afterEach(cleanup);
const shell = (role = "user") =>
  render(<AppShell models={["4050"]} user={{ username: "bc", role }} qbSetup />);
const openTab = () => {
  const sel = screen.getByTestId("tabsel") as HTMLSelectElement;
  fireEvent.change(sel, { target: { value: "qbsetup" } });
};

describe("QuickBooks setup tab", () => {
  it("is a tab of its own, not a floating panel", () => {
    shell();
    expect(screen.queryByTestId("qb-setup")).toBeNull();
    openTab();
    expect(screen.getByTestId("qb-setup")).toBeTruthy();
  });

  it("is offered to every user", () => {
    // Each counter PC needs the helper once, so it is not admin-gated.
    for (const role of ["user", "semiadmin", "admin"]) {
      cleanup();
      shell(role);
      const opts = within(screen.getByTestId("tabsel")).getAllByRole("option")
        .map((o) => (o as HTMLOptionElement).value);
      expect(opts, role).toContain("qbsetup");
    }
  });

  it("offers both downloads", () => {
    shell();
    openTab();
    const ahk = screen.getByTestId("dl-ahk") as HTMLAnchorElement;
    const script = screen.getByTestId("dl-script") as HTMLAnchorElement;
    expect(ahk.getAttribute("href")).toBe("/download/AutoHotkey_2_0_28_setup.exe");
    expect(script.getAttribute("href")).toBe("/download/qb-paste.ahk");
    for (const a of [ahk, script]) expect(a.hasAttribute("download")).toBe(true);
  });

  it("says the file has to be double-clicked to start", () => {
    // The step people miss: downloading it does nothing on its own.
    shell();
    openTab();
    const text = screen.getByTestId("qb-setup").textContent ?? "";
    expect(text).toMatch(/double-click/i);
    expect(text).toMatch(/system tray/i);
    expect(text).toMatch(/shell:startup/);
  });

  it("explains how to use it and what to do when it fails", () => {
    shell();
    openTab();
    const text = screen.getByTestId("qb-setup").textContent ?? "";
    expect(text).toMatch(/F9/);
    expect(text).toMatch(/the QuickBooks button/);
    expect(text).toMatch(/Sleep 120/);
  });

  it("leaves the other tabs alone", () => {
    shell();
    openTab();
    expect(screen.queryByTestId("series")).toBeNull();
  });
});

describe("QuickBooks setup tab is hidden", () => {
  it("is not offered in the app, to anyone", () => {
    // SHOW_QB_SETUP is off; everything above renders it switched on.
    for (const role of ["user", "semiadmin", "admin"]) {
      cleanup();
      render(<AppShell models={["4050"]} user={{ username: "bc", role }} />);
      const opts = within(screen.getByTestId("tabsel")).getAllByRole("option").map((o) => o.getAttribute("value"));
      expect(opts, role).not.toContain("qbsetup");
      expect(screen.queryByText("QB Setup"), role).toBeNull();
    }
  });
});
