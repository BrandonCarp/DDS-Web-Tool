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

describe("operators that share a model number", () => {
  it("quotes the rail length that was clicked", async () => {
    render(<OperatorsTool />);
    openSection("RESIDENTIAL CHAIN DRIVES");
    const rows = rowsNamed("2240L");
    expect(rows).toHaveLength(3);
    fireEvent.click(rows[2]);
    const line = await copiedQbLine(screen.getByTestId("op-copy-qb"));
    expect(line.description).toContain("10FT CHAIN RAIL");
    // Only the clicked row lights up, not every 2240L.
    const lit = list().getAllByRole("button").filter((b) => b.classList.contains("on"));
    expect(lit).toEqual([rows[2]]);
  });

  it("shows which is which before anything is clicked", () => {
    render(<OperatorsTool />);
    openSection("RESIDENTIAL CHAIN DRIVES");
    const subs = rowsNamed("4690L").map((b) => b.querySelector(".partsub")?.textContent ?? "");
    for (const ft of ["7FT", "8FT", "10FT", "12FT", "14FT"]) {
      expect(subs.some((s) => s.includes(`${ft} I-BEAM`)), ft).toBe(true);
    }
  });

  it("gives every row its own key, in every section", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<OperatorsTool />);
    for (const s of OPERATOR_CATALOGUE) openSection(s.name);
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
    openSection("RESIDENTIAL CHAIN DRIVES");
    fireEvent.click(rowsNamed("2240L")[0]);
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("2240L");
    fireEvent.click(screen.getByTestId("op-back"));
    expect(screen.queryByTestId("op-list")).toBeNull();
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("Nothing selected");
    expect(buttons()).toContain("RESIDENTIAL CHAIN DRIVES");
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
});
