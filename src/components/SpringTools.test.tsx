// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import { ExtensionTool } from "./ExtensionTool";
import { TorsionTool } from "./TorsionTool";
import { AppShell } from "./AppShell";
import { CustomerJobProvider } from "./CustomerJobFields";
import { EXTENSION_SPRINGS, STOCK_TORSION_SPRINGS } from "@/lib/pricing/data/springs";

// The last runtime crash on this tool (part!.name with no branch for the custom
// cable path) got through tsc AND next build. Rendering the tab is the only
// check that catches that class, so both new spring surfaces get driven here.

afterEach(cleanup);

/** A row's name and its sub-heading are separate nodes, so match on the row. */
function clickRow(listTestId: string, name: string) {
  const row = within(screen.getByTestId(listTestId))
    .getAllByRole("button")
    .find((b) => b.textContent?.includes(name));
  if (!row) throw new Error(`no row for ${name} in ${listTestId}`);
  fireEvent.click(row);
}

describe("Extension Springs tab", () => {
  it("renders and prices a spring off the list", () => {
    render(<ExtensionTool />);
    expect(screen.getByText("No spring selected")).toBeTruthy();

    const first = EXTENSION_SPRINGS.items[0];
    clickRow("ext-list", first.name);

    expect(screen.getByTestId("ext-desc").textContent).toBe(first.desc);
    expect(screen.getByTestId("ext-price").textContent).toContain(first.price.toFixed(2));
  });

  it("searches across every door height", () => {
    render(<ExtensionTool />);
    const target = EXTENSION_SPRINGS.items.find((p) => p.sub?.includes("8FT"));
    expect(target).toBeTruthy();
    fireEvent.change(screen.getByTestId("ext-search"), {
      target: { value: target?.name.slice(0, 9) ?? "" },
    });
    expect(within(screen.getByTestId("ext-list")).getAllByRole("button").length).toBeGreaterThan(0);
  });
});

describe("Torsion Springs tab", () => {
  const renderTool = () =>
    render(
      <CustomerJobProvider>
        <TorsionTool />
      </CustomerJobProvider>,
    );

  it("opens on the configurator with the stock list not on screen", () => {
    renderTool();
    expect(screen.getByTestId("tor-wire")).toBeTruthy();
    expect(screen.queryByTestId("stock-list")).toBeNull();
  });

  it("puts Stock springs left of the configurator", () => {
    renderTool();
    const order = Array.from(document.querySelectorAll(".modeswitch .modebtn")).map((b) =>
      b.getAttribute("data-testid"),
    );
    expect(order).toEqual(["mode-stock", "mode-config"]);
  });

  it("swaps the whole column when Stock springs is picked", () => {
    renderTool();
    fireEvent.click(screen.getByTestId("mode-stock"));
    expect(screen.getByTestId("stock-list")).toBeTruthy();
    expect(screen.queryByTestId("tor-wire")).toBeNull();
  });

  it("prices a stock spring as a pair by default", () => {
    renderTool();
    fireEvent.click(screen.getByTestId("mode-stock"));
    const handed = STOCK_TORSION_SPRINGS.items.find((p) => p.hands);
    expect(handed).toBeTruthy();

    clickRow("stock-list", handed?.name ?? "");

    expect(screen.getByTestId("stock-desc").textContent).toContain("[1] - RIGHT");
    expect(screen.getByTestId("stock-price").textContent).toContain(
      (handed?.price ?? 0).toFixed(2),
    );
    expect(screen.queryByTestId("tor-price")).toBeNull();
  });

  it("keeps both entries alive across a switch", () => {
    renderTool();
    fireEvent.change(screen.getByTestId("tor-length"), { target: { value: "24.5" } });

    fireEvent.click(screen.getByTestId("mode-stock"));
    const handed = STOCK_TORSION_SPRINGS.items.find((p) => p.hands);
    clickRow("stock-list", handed?.name ?? "");
    expect(screen.getByTestId("stock-desc")).toBeTruthy();

    // Back to the configurator: the length typed before the detour survives,
    // and the stock spring is no longer driving the card.
    fireEvent.click(screen.getByTestId("mode-config"));
    expect(screen.getByTestId("tor-length").getAttribute("value")).toBe("24.5");
    expect(screen.queryByTestId("stock-desc")).toBeNull();
  });
});

describe("header tab dropdown", () => {
  it("offers every tab the button bar does, and leaves DASH out of it", () => {
    render(<AppShell models={["4050"]} user={{ username: "bc", role: "admin" }} />);
    const select = screen.getByTestId("tabsel");
    const options = within(select).getAllByRole("option").map((o) => o.textContent);
    const buttons = screen
      .getAllByRole("button")
      .filter((b) => b.className.includes("tab"))
      .map((b) => b.textContent);

    // Residential and Commercial stack "Stock" above the name, so the button's
    // textContent runs the two words together where the dropdown has a space.
    // The invariant is that both offer the same tabs, not that the strings are
    // byte-identical.
    const flat = (x: string | null) => (x ?? "").replace(/\s+/g, "").toLowerCase();
    expect(options.map(flat)).toEqual(buttons.map(flat));
    expect(options).toContain("Extension Springs");
    // The admin link is an anchor in .right, not a tab — it stays on screen at
    // every width rather than hiding inside the dropdown.
    expect(options).not.toContain("DASH");
    expect(screen.getByText("DASH")).toBeTruthy();
  });

  it("switches tools from the dropdown", () => {
    render(<AppShell models={["4050"]} user={{ username: "bc", role: "counter" }} />);
    fireEvent.change(screen.getByTestId("tabsel"), { target: { value: "extension" } });
    expect(screen.getByTestId("ext-list")).toBeTruthy();
  });
});

describe("stock tab labels", () => {
  it('stacks "Stock" above Residential and Commercial', () => {
    render(<AppShell models={["4050"]} user={{ username: "bc", role: "user" }} />);
    const tabs = screen.getAllByRole("button").filter((b) => b.className.includes("tab"));
    const res = tabs.find((b) => b.textContent?.includes("Residential"))!;
    const com = tabs.find((b) => b.textContent?.includes("Commercial"))!;
    for (const [el, name] of [[res, "Residential"], [com, "Commercial"]] as const) {
      expect(el.querySelector(".tab-over")?.textContent, name).toBe("Stock");
      expect(el.querySelector(".tab-main")?.textContent, name).toBe(name);
    }
  });

  it("leaves the other tabs on one line", () => {
    render(<AppShell models={["4050"]} user={{ username: "bc", role: "user" }} />);
    const tabs = screen.getAllByRole("button").filter((b) => b.className.includes("tab"));
    for (const label of ["Special Order", "Torsion Springs", "Parts", "Vinyl", "Operators"]) {
      const el = tabs.find((b) => b.textContent === label);
      expect(el, label).toBeTruthy();
      expect(el!.querySelector(".tab-over"), label).toBeNull();
    }
  });

  it("spells it out in the mobile dropdown, where two lines will not fit", () => {
    render(<AppShell models={["4050"]} user={{ username: "bc", role: "user" }} />);
    const opts = within(screen.getByTestId("tabsel")).getAllByRole("option").map((o) => o.textContent);
    expect(opts).toContain("Stock Residential");
    expect(opts).toContain("Stock Commercial");
  });
});
