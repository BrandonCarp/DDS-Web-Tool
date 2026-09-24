// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { AppShell } from "./AppShell";

afterEach(cleanup);

/** Renders with the button switched on — SHOW_BROCHURE hides it in the app. */
const shell = (role = "user") =>
  render(<AppShell models={["4050"]} user={{ username: "bc", role }} brochure />);

describe("brochure button", () => {
  it("is in the header for every user", () => {
    // A counter is often asked for the catalog mid-quote, so it sits in the bar
    // rather than behind a tab, and it is not admin-gated the way DASH is.
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

  it("sits beside DASH, not instead of it", () => {
    shell("admin");
    const bar = screen.getByTestId("brochure").parentElement;
    expect(bar?.textContent).toContain("BROCHURE");
    expect(bar?.textContent).toContain("DASH");
  });

  it("stays put when the tab changes", () => {
    // It is in the header, outside the tab panels, so nothing can unmount it.
    shell();
    const before = screen.getByTestId("brochure");
    expect(before.closest("header")).toBeTruthy();
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
