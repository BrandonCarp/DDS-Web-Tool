// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";

afterEach(cleanup);

/** Renders with the button switched on — SHOW_BROCHURE hides it in the app. */
const shell = (role = "user") =>
  render(<AppShell models={["4050"]} user={{ username: "bc", role }} brochure />);

describe("brochure button", () => {
  it("is in the sidebar for every user", () => {
    // A counter is often asked for the catalog mid-quote, so it sits in the
    // sidebar rather than behind a tab, and it is not admin-gated the way the
    // admin panel link is.
    for (const role of ["user", "semiadmin", "admin"]) {
      cleanup();
      shell(role);
      expect(screen.getByTestId("brochure"), role).toBeTruthy();
    }
  });

  it("points at the catalog and downloads rather than navigating", () => {
    shell();
    const a = screen.getByTestId("brochure") as HTMLAnchorElement;
    expect(a.getAttribute("href")).toBe("/DoorsDirect_Catalog.pdf");
    expect(a.getAttribute("download")).toBe("DoorsDirect_Catalog.pdf");
  });

  it("sits beside the admin panel link, not instead of it", () => {
    shell("admin");
    const nav = screen.getByTestId("brochure").closest("nav");
    expect(nav?.contains(screen.getByTestId("admin-link"))).toBe(true);
  });

  it("stays put when the tab changes", () => {
    // It is in the sidebar, outside the tab panels, so nothing can unmount it.
    shell();
    const before = screen.getByTestId("brochure");
    expect(before.closest("aside")).toBeTruthy();
  });
});

describe("brochure button is hidden", () => {
  it("does not render in the app for anyone", () => {
    for (const role of ["user", "semiadmin", "admin"]) {
      cleanup();
      render(<AppShell models={["4050"]} user={{ username: "bc", role }} />);
      expect(screen.queryByTestId("brochure"), role).toBeNull();
    }
  });
});
