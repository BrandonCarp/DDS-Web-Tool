// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { OperatorsTool } from "./OperatorsTool";
import { OPERATOR_CATALOGUE } from "@/lib/pricing/data/operator-catalogue";
import { copiedQbLine } from "./test-clipboard";

/**
 * Several operators share a model number and differ only by rail length: the
 * 2240L comes in three, the 4690L and the TDC12X1BMC in five, and some
 * sprockets twice. The list used to tell rows apart by that name, so every
 * click quoted the first of them — a 10FT 2240L went into QuickBooks as the
 * 7FT one. Rows are told apart by their description now.
 */
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const list = () => within(screen.getByTestId("op-list"));
/** Rows whose model number (the first line of the row) reads exactly `name`. */
const rowsNamed = (name: string) =>
  list()
    .getAllByRole("button")
    .filter((b) => b.querySelector(".partname")?.firstChild?.textContent === name);

const slug = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/** Walk the buttons: back to the groups if needed, the group, then the section (12/10/2026). */
function openSection(name: string) {
  const s = OPERATOR_CATALOGUE.find((x) => x.name === name)!;
  while (screen.queryByTestId("op-back")) fireEvent.click(screen.getByTestId("op-back"));
  fireEvent.click(screen.getByTestId(`op-group-${slug(s.group)}`));
  fireEvent.click(screen.getByTestId(`op-section-${slug(name)}`));
}

/** Walk the Operators group: use, kind, rail (belt and chain), then the list (13/10/2026). */
function openOperators(use: "Residential" | "Commercial", kind: "belt" | "chain" | "sidemount", rail?: number | "head") {
  while (screen.queryByTestId("op-back")) fireEvent.click(screen.getByTestId("op-back"));
  fireEvent.click(screen.getByTestId("op-group-operators"));
  fireEvent.click(screen.getByTestId(`op-use-${slug(use)}`));
  fireEvent.click(screen.getByTestId(`op-kind-${kind}`));
  if (rail !== undefined) fireEvent.click(screen.getByTestId(`op-rail-${rail}`));
}
const pickOptions = () => [...screen.getByTestId("op-list").querySelectorAll(".partname")].map((o) => o.textContent);
const pickRow = (desc: string) => {
  const row = [...screen.getByTestId("op-list").querySelectorAll("button")].find((b) => b.getAttribute("data-desc") === desc || b.textContent?.startsWith(descLabel(desc)));
  if (!row) throw new Error(`no row for ${desc}`);
  fireEvent.click(row);
};
const descLabel = (desc: string) => desc.replace(/^LIFTMASTER (?:ELECTRIC OPERATOR MODEL )?/, "").replace(/,\s*\d+\s*FT\s+(?:BELT|CHAIN|I-BEAM|TROLLEY)\s+RAIL/, "").replace(/\s+/g, " ").trim();

describe("the Operators group: residential or commercial, belt / chain / side mount, the rail, the operator (13/10/2026)", () => {
  const buttons = () => [...document.querySelectorAll(".pnav-btn, .pnav-page")].map((b) => b.textContent);

  it("asks residential or commercial, then the kind, then the rail length as buttons and lists the operators", async () => {
    render(<OperatorsTool />);
    fireEvent.click(screen.getByTestId("op-group-operators"));
    expect(buttons()).toEqual(["Residential", "Commercial"]);
    expect(screen.getByTestId("op-title").textContent).toBe("Operators");
    fireEvent.click(screen.getByTestId("op-use-residential"));
    expect(buttons()).toEqual(["Belt Operators", "Chain Operators", "Side Mount Operators"]);
    expect(screen.getByTestId("op-title").textContent).toBe("Operators › Residential");
    fireEvent.click(screen.getByTestId("op-kind-belt"));
    expect(screen.getByTestId("op-title").textContent).toBe("Operators › Residential › Belt Operators");
    expect(buttons()).toEqual(["7FT", "8FT", "10FT", "Head only"]);
    expect(screen.queryByTestId("op-list")).toBeNull();                 // no list until a rail is pressed
    fireEvent.click(screen.getByTestId("op-rail-7"));
    expect(pickOptions()).toEqual(["6580L", "6690L"]);
    pickRow("LIFTMASTER ELECTRIC OPERATOR MODEL 6690L,  7FT BELT RAIL");
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("6690L, 7FT");
    const line = await copiedQbLine(screen.getByTestId("op-copy-qb"));
    expect(line.description).toBe("LIFTMASTER ELECTRIC OPERATOR MODEL 6690L,  7FT BELT RAIL");
    // Another rail: the list changes and the pick is dropped.
    fireEvent.click(screen.getByTestId("op-rail-10"));
    expect(pickOptions()).toEqual(["6580L", "6690L"]);
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("Nothing selected");
  });

  it("quotes the rail length that was chosen for a chain drive", async () => {
    render(<OperatorsTool />);
    openOperators("Residential", "chain", 10);
    expect(pickOptions()).toEqual(["2220L", "2420L", "87802", "ATSWT", "2240L", "4690L"]);
    pickRow("LIFTMASTER ELECTRIC OPERATOR MODEL 2240L,  10FT CHAIN RAIL");
    const line = await copiedQbLine(screen.getByTestId("op-copy-qb"));
    expect(line.description).toContain("2240L,  10FT CHAIN RAIL");
  });

  it("goes straight to the list for side mounts, and offers commercial its own kinds", () => {
    render(<OperatorsTool />);
    openOperators("Residential", "sidemount");
    expect(document.querySelectorAll(".pnav-page")).toHaveLength(0);
    expect(pickOptions()).toEqual(["8500", "98022", "98032"]);
    openOperators("Commercial", "chain");
    expect([...document.querySelectorAll(".pnav-page")].map((b) => b.textContent)).toEqual(["8FT", "10FT", "12FT", "14FT", "16FT", "Head only"]);
    fireEvent.click(screen.getByTestId("op-rail-12"));
    expect(pickOptions()).toContain("T101L5");
    expect(pickOptions()).toContain("TDC7S1BMC, STANDARD, 700 LBS, 20 CYCLES");
    fireEvent.click(screen.getByTestId("op-back"));
    expect([...document.querySelectorAll(".pnav-page")].map((b) => b.textContent)).toEqual(["Chain Operators", "Side Mount Operators"]);
  });

  it("gives every row its own key, in every section", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<OperatorsTool />);
    for (const s of OPERATOR_CATALOGUE.filter((x) => x.group === "Accessories")) openSection(s.name);
    for (const rail of [7, 8, 10, "head"] as const) openOperators("Residential", "chain", rail);
    const dupes = err.mock.calls.filter((c) => String(c[0]).includes("same key"));
    expect(dupes).toEqual([]);
  });
});

describe("operator catalogue", () => {
  it("never repeats a description, since the list tells rows apart by it", () => {
    const seen = new Map<string, string>();
    for (const s of OPERATOR_CATALOGUE) {
      for (const o of s.items) {
        expect(seen.has(o.desc), `${o.desc} — in ${s.name} and ${seen.get(o.desc)}`).toBe(false);
        seen.set(o.desc, s.name);
      }
    }
  });
});

describe("one level at a time, with Back (Brandon's wireframe, 12/10/2026)", () => {
  const buttons = () => [...document.querySelectorAll(".pnav-btn, .pnav-page")].map((b) => b.textContent);

  it("stacks the two groups first, then a group's sections, then the list", () => {
    render(<OperatorsTool />);
    expect(buttons()).toEqual(["Operators", "Accessories"]);
    expect(screen.queryByTestId("op-list")).toBeNull();
    expect(screen.queryByTestId("op-back")).toBeNull();
    fireEvent.click(screen.getByTestId("op-group-accessories"));
    expect(screen.getByTestId("op-title").textContent).toBe("Accessories");
    expect(buttons()).toEqual(OPERATOR_CATALOGUE.filter((x) => x.group === "Accessories").map((x) => x.name));
    expect(screen.queryByTestId("op-group-operators")).toBeNull();
    fireEvent.click(screen.getByTestId("op-section-remotes"));
    expect(buttons()).toEqual([]);
    expect(screen.getByTestId("op-title").textContent).toBe("Accessories › REMOTES");
    expect(screen.getByTestId("op-list")).toBeTruthy();
  });

  it("goes back a level at a time and drops the pick on the way", () => {
    render(<OperatorsTool />);
    openOperators("Residential", "chain", 7);
    pickRow("LIFTMASTER ELECTRIC OPERATOR MODEL 2240L,  7FT CHAIN RAIL");
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("2240L");
    fireEvent.click(screen.getByTestId("op-back"));
    expect(screen.queryByTestId("op-list")).toBeNull();
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("Nothing selected");
    expect(buttons()).toEqual(["Belt Operators", "Chain Operators", "Side Mount Operators"]);
    fireEvent.click(screen.getByTestId("op-back"));
    expect(buttons()).toEqual(["Residential", "Commercial"]);
    fireEvent.click(screen.getByTestId("op-back"));
    expect(buttons()).toEqual(["Operators", "Accessories"]);
    expect(screen.queryByTestId("op-back")).toBeNull();
  });

  it("opens straight on the section a top-bar search lands on", () => {
    const s = OPERATOR_CATALOGUE.find((x) => x.name === "REMOTES")!;
    render(<OperatorsTool openOn={{ kind: "operator", group: s.group, section: s.name, desc: s.items[0].desc } as never} />);
    expect(screen.getByTestId("op-title").textContent).toBe("Accessories › REMOTES");
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe(s.items[0].name);
  });

  it("opens an operator a top-bar search lands on at its use, kind and rail, chosen", () => {
    const desc = "LIFTMASTER ELECTRIC OPERATOR MODEL 4690L,  12FT I-BEAM RAIL";
    render(<OperatorsTool openOn={{ kind: "operator", group: "Operators", section: "RESIDENTIAL CHAIN DRIVES", desc } as never} />);
    expect(screen.getByTestId("op-title").textContent).toBe("Operators › Residential › Chain Operators");
    expect((screen.getByTestId("op-rail-12") as HTMLButtonElement).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByTestId("op-list").querySelector(".partrow.on")?.textContent).toContain("4690L");
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("4690L");
  });
});
