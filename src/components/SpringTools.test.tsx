// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import { ExtensionTool } from "./ExtensionTool";
import { TorsionTool } from "./TorsionTool";
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

  it("shows the stock list below the cut-to-size configurator", () => {
    renderTool();
    expect(screen.getByTestId("tor-wire")).toBeTruthy();
    expect(screen.getByTestId("stock-list")).toBeTruthy();
  });

  it("hands the quote card to a stock spring when one is picked", () => {
    renderTool();
    const handed = STOCK_TORSION_SPRINGS.items.find((p) => p.hands);
    expect(handed).toBeTruthy();

    clickRow("stock-list", handed?.name ?? "");

    // Defaults to one right and one left, so the pair is priced immediately.
    expect(screen.getByTestId("stock-desc").textContent).toContain("[1] - RIGHT");
    expect(screen.getByTestId("stock-price").textContent).toContain(
      (handed?.price ?? 0).toFixed(2),
    );
    expect(screen.queryByTestId("tor-price")).toBeNull();
  });

  it("hands it back the moment a custom field is touched", () => {
    renderTool();
    const handed = STOCK_TORSION_SPRINGS.items.find((p) => p.hands);
    clickRow("stock-list", handed?.name ?? "");
    expect(screen.getByTestId("stock-desc")).toBeTruthy();

    fireEvent.change(screen.getByTestId("tor-length"), { target: { value: "24.5" } });
    expect(screen.queryByTestId("stock-desc")).toBeNull();
  });
});
