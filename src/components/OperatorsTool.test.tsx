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

function openSection(name: string) {
  const s = OPERATOR_CATALOGUE.find((x) => x.name === name)!;
  fireEvent.change(screen.getByTestId("op-group"), { target: { value: s.group } });
  fireEvent.change(screen.getByTestId("op-section"), { target: { value: name } });
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
