// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { ExtensionTool } from "./ExtensionTool";
import { CopyQuickBooks } from "./CopyQuickBooks";

let copied = "";
beforeEach(() => {
  copied = "";
  vi.stubGlobal("navigator", { clipboard: { writeText: async (t: string) => { copied = t; } } });
  vi.stubGlobal("isSecureContext", true);
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const settle = () => new Promise((r) => setTimeout(r, 40));
const el = (id: string) => document.querySelector(`[data-testid="${id}"]`) as HTMLElement | null;

describe("Copy for QuickBooks", () => {
  it("carries its own quantity where the tool has none", async () => {
    // The spring, parts and operator tabs are item pickers with no quantity of
    // their own, so the button brings one rather than always sending 1.
    render(<CopyQuickBooks item="STOCK DOOR" description="A door" rate={100} testId="t" />);
    const qty = el("t-qty") as HTMLInputElement;
    expect(qty).toBeTruthy();
    expect(qty.value).toBe("1");
    fireEvent.change(qty, { target: { value: "3" } });
    fireEvent.click(el("t")!);
    await settle();
    expect(copied.split("\t")).toEqual(["STOCK DOOR", "A DOOR", "3", "100.00"]);
  });

  it("uses the tool's quantity where there is one, and shows no box", async () => {
    render(<CopyQuickBooks item="STOCK DOOR" description="A door" rate={100} qty={5} testId="t" />);
    expect(el("t-qty")).toBeNull();
    fireEvent.click(el("t")!);
    await settle();
    expect(copied.split("\t")[2]).toBe("5");
  });

  it("never sends a quantity below one", async () => {
    render(<CopyQuickBooks item="X" description="Y" rate={1} testId="t" />);
    fireEvent.change(el("t-qty") as HTMLInputElement, { target: { value: "0" } });
    fireEvent.click(el("t")!);
    await settle();
    expect(copied.split("\t")[2]).toBe("1");
  });

  it("keeps the rate at one unit whatever the quantity", async () => {
    // QuickBooks multiplies by QTY itself.
    render(<CopyQuickBooks item="X" description="Y" rate={784.89} testId="t" />);
    fireEvent.change(el("t-qty") as HTMLInputElement, { target: { value: "9" } });
    fireEvent.click(el("t")!);
    await settle();
    expect(copied.split("\t")[3]).toBe("784.89");
  });
});

describe("on the picker tabs", () => {
  it("appears once an item is chosen, with the singular item name", async () => {
    render(<ExtensionTool />);
    expect(el("ext-copy-qb")).toBeNull();
    const row = [...document.querySelectorAll("button")]
      .find((b) => (b.textContent ?? "").includes("25-42-100"));
    fireEvent.click(row!);
    await settle();
    expect(el("ext-copy-qb")).toBeTruthy();
    fireEvent.click(el("ext-copy-qb")!);
    await settle();
    const [item, , qty, rate] = copied.split("\t");
    expect(item).toBe("EXTENSION SPRING");
    expect(qty).toBe("1");
    expect(Number(rate)).toBeGreaterThan(0);
  });
});
