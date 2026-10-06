// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import { ExtensionTool } from "./ExtensionTool";
import { TorsionTool } from "./TorsionTool";
import { AppShell } from "./AppShell";
import { CustomerJobProvider } from "./CustomerJobFields";
import { EXTENSION_SPRINGS, STOCK_TORSION_SPRINGS } from "@/lib/pricing/data/springs";
import { copiedQbLine } from "./test-clipboard";

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
  it("renders and prices a spring off the list", async () => {
    render(<ExtensionTool />);
    expect(screen.getByText("No spring selected")).toBeTruthy();

    const first = EXTENSION_SPRINGS.items[0];
    clickRow("ext-list", first.name);

    // The card names the spring; its description and price go to QuickBooks.
    expect(screen.queryByTestId("ext-desc")).toBeNull();
    expect(screen.getByTestId("ext-price").textContent).toContain(first.price.toFixed(2));
    const line = await copiedQbLine(screen.getByTestId("ext-copy-qb"));
    expect(line.description).toBe(first.desc);
    expect(line.rate).toBeCloseTo(first.price, 2);
  });

  it("has no search box of its own — the top bar's is the one (6/10/2026)", () => {
    render(<ExtensionTool />);
    expect(screen.queryByTestId("ext-search")).toBeNull();
    expect(within(screen.getByTestId("ext-list")).getAllByRole("button").length).toBe(EXTENSION_SPRINGS.items.length);
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

  it("prices a stock spring as a pair by default", async () => {
    renderTool();
    fireEvent.click(screen.getByTestId("mode-stock"));
    const handed = STOCK_TORSION_SPRINGS.items.find((p) => p.hands);
    expect(handed).toBeTruthy();

    clickRow("stock-list", handed?.name ?? "");

    expect(screen.getByTestId("stock-price").textContent).toContain((handed?.price ?? 0).toFixed(2));
    const line = await copiedQbLine(screen.getByTestId("stock-copy-qb"));
    expect(line.description).toContain("[1] - RIGHT");
    expect(line.rate).toBeCloseTo(handed?.price ?? 0, 2);
    expect(screen.queryByTestId("tor-copy-qb")).toBeNull();
  });

  it("keeps both entries alive across a switch", () => {
    renderTool();
    fireEvent.change(screen.getByTestId("tor-length"), { target: { value: "24" } });
    fireEvent.change(screen.getByTestId("tor-length-frac"), { target: { value: "0.5" } });

    fireEvent.click(screen.getByTestId("mode-stock"));
    const handed = STOCK_TORSION_SPRINGS.items.find((p) => p.hands);
    clickRow("stock-list", handed?.name ?? "");
    expect(screen.getByTestId("stock-copy-qb")).toBeTruthy();

    // Back to the configurator: the length typed before the detour survives,
    // and the stock spring is no longer driving the card.
    fireEvent.click(screen.getByTestId("mode-config"));
    expect(screen.getByTestId("tor-length").getAttribute("value")).toBe("24");
    expect((screen.getByTestId("tor-length-frac") as HTMLSelectElement).value).toBe("0.5");
    expect(screen.queryByTestId("stock-copy-qb")).toBeNull();
  });
});

describe("phone tab dropdown", () => {
  it("offers every tab the sidebar does, and leaves the admin link out of it", () => {
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
    // The admin panel is its own page, so it is a link in the sidebar's
    // Others group rather than a tab — and never an option in the dropdown.
    expect(options).not.toContain("Admin panel");
    expect(screen.getByTestId("admin-link").getAttribute("href")).toBe("/admin");
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

describe("Torsion Springs tab — cut to size", () => {
  it("labels the two hand boxes RHW and LHW", () => {
    render(<CustomerJobProvider><TorsionTool /></CustomerJobProvider>);
    // The hand boxes show once a spring is priced: a wire size and a length.
    const wire = screen.getByTestId("tor-wire") as HTMLSelectElement;
    fireEvent.change(wire, { target: { value: [...wire.options].map((o) => o.value).find(Boolean) } });
    fireEvent.change(screen.getByTestId("tor-length"), { target: { value: "24" } });
    fireEvent.change(screen.getByTestId("tor-length-frac"), { target: { value: "0.5" } });
    const label = (id: string) => screen.getByTestId(id).closest(".field")!.querySelector("label")!.textContent;
    expect(label("tor-right")).toBe("RHW");
    expect(label("tor-left")).toBe("LHW");
  });
});

describe("Torsion Springs tab — the quantity is the springs counted", () => {
  it("pastes a stock pair as quantity 2, and 2 rights and 2 lefts as 4, with no Qty box", async () => {
    render(<CustomerJobProvider><TorsionTool /></CustomerJobProvider>);
    fireEvent.click(screen.getByTestId("mode-stock"));
    fireEvent.click(document.querySelector("ul.partlist .partrow") as HTMLElement);
    expect(screen.queryByTestId("stock-copy-qb-qty")).toBeNull();
    let line = await copiedQbLine(screen.getByTestId("stock-copy-qb"));
    expect(line.qty).toBe(2);
    expect(line.description).toContain("[1] - RIGHT AND [1] - LEFT");
    fireEvent.change(screen.getByTestId("stock-right"), { target: { value: "2" } });
    fireEvent.change(screen.getByTestId("stock-left"), { target: { value: "2" } });
    line = await copiedQbLine(screen.getByTestId("stock-copy-qb"));
    expect(line.qty).toBe(4);
  });

  it("waits on a cut spring until RHW or LHW is entered, then pastes their count", async () => {
    render(<CustomerJobProvider><TorsionTool /></CustomerJobProvider>);
    const wire = screen.getByTestId("tor-wire") as HTMLSelectElement;
    fireEvent.change(wire, { target: { value: [...wire.options].map((o) => o.value).find(Boolean) } });
    fireEvent.change(screen.getByTestId("tor-length"), { target: { value: "24" } });
    fireEvent.change(screen.getByTestId("tor-length-frac"), { target: { value: "0.5" } });
    expect(screen.queryByTestId("tor-copy-qb")).toBeNull();
    expect(screen.getByText("Enter how many RHW and LHW")).toBeTruthy();
    fireEvent.change(screen.getByTestId("tor-right"), { target: { value: "1" } });
    fireEvent.change(screen.getByTestId("tor-left"), { target: { value: "1" } });
    expect(screen.queryByTestId("tor-copy-qb-qty")).toBeNull();
    expect((await copiedQbLine(screen.getByTestId("tor-copy-qb"))).qty).toBe(2);
  });
});

describe("cut spring length — whole inches and a fraction (1/10/2026)", () => {
  const setup = () => {
    render(<CustomerJobProvider><TorsionTool /></CustomerJobProvider>);
    const wire = screen.getByTestId("tor-wire") as HTMLSelectElement;
    fireEvent.change(wire, { target: { value: "0.218" } });
    // RHW only shows once the spring is priced, so a length goes in first.
    fireEvent.change(screen.getByTestId("tor-length"), { target: { value: "23" } });
    fireEvent.change(screen.getByTestId("tor-right"), { target: { value: "1" } });
  };
  const length = (inches: string, frac: string) => {
    fireEvent.change(screen.getByTestId("tor-length"), { target: { value: inches } });
    fireEvent.change(screen.getByTestId("tor-length-frac"), { target: { value: frac } });
  };

  it("offers 0, 1/4, 1/2 and 3/4 inch, starting at 0", () => {
    render(<CustomerJobProvider><TorsionTool /></CustomerJobProvider>);
    const frac = screen.getByTestId("tor-length-frac") as HTMLSelectElement;
    expect([...frac.options].map((o) => o.textContent)).toEqual(["0", "1/4″", "1/2″", "3/4″"]);
    expect(frac.value).toBe("0");
  });

  it("prices any fraction as the next whole inch, and describes the length cut", async () => {
    setup();
    length("23", "0");
    const at23 = (await copiedQbLine(screen.getByTestId("tor-copy-qb"))).rate;
    for (const f of ["0.25", "0.5", "0.75"]) {
      length("22", f);
      expect((await copiedQbLine(screen.getByTestId("tor-copy-qb"))).rate, `22 + ${f}`).toBe(at23);
    }
    length("22", "0.5");
    // The length cut, written as the counter picked it (descriptions.test.ts).
    expect((await copiedQbLine(screen.getByTestId("tor-copy-qb"))).description).toContain('22-1/2" LONG');
    length("22", "0");
    expect((await copiedQbLine(screen.getByTestId("tor-copy-qb"))).rate).toBeLessThan(at23);
  });
});
