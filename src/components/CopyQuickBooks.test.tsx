// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, fireEvent, screen } from "@testing-library/react";
import { ExtensionTool } from "./ExtensionTool";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { CurrentUserProvider } from "./CurrentUser";
import { copyFrom } from "./test-clipboard";

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
    expect(item).toBe("SPRINGS"); // every spring is one item, 6/10/2026
    expect(qty).toBe("1");
    expect(Number(rate)).toBeGreaterThan(0);
  });
});

describe("QuickBooks button — more than one line", () => {
  it("puts each extra line two rows down, with a blank row between", async () => {
    cleanup();
    render(<CopyQuickBooks item="STOCK DOOR" description="a door" rate={100} qty={1} testId="m"
      extraLines={[{ item: "VINYL", description: "white molding", qty: 23, rate: 0.95 }]} />);
    const copied = await copyFrom(screen.getByTestId("m"));
    expect(copied).toBe("STOCK DOOR\tA DOOR\t1\t100.00\n\nVINYL\tWHITE MOLDING\t23\t0.95");
  });

  it("is labelled QuickBooks", () => {
    cleanup();
    render(<CopyQuickBooks item="STOCK DOOR" description="a door" rate={100} qty={1} testId="l" />);
    expect(screen.getByTestId("l").textContent).toBe("QuickBooks");
  });
});

describe("Copy price and Copy description, for Aimee's account only (6/10/2026)", () => {
  const card = (username: string) =>
    render(
      <CurrentUserProvider user={{ username, role: "user" }}>
        <CopyQuickBooks item="STOCK DOOR" description={"Clopay Model 4050, 8'0\" x 7'0\""} rate={1234.5} qty={2} testId="door" />
      </CurrentUserProvider>,
    );

  it("shows both under the QuickBooks button for aimee, in any case", () => {
    card("Aimee");
    expect(screen.getByTestId("door-price")).toBeTruthy();
    expect(screen.getByTestId("door-desc")).toBeTruthy();
  });

  it("copies the price of one as a bare number, and the description in capitals", async () => {
    card("aimee");
    fireEvent.click(screen.getByTestId("door-price"));
    await settle();
    expect(copied).toBe("1,234.50");
    fireEvent.click(screen.getByTestId("door-desc"));
    await settle();
    expect(copied).toBe("CLOPAY MODEL 4050, 8'0\" X 7'0\"");
  });

  it("shows neither for anyone else, or outside a signed-in shell", () => {
    card("bc");
    expect(screen.queryByTestId("door-price")).toBeNull();
    expect(screen.queryByTestId("door-desc")).toBeNull();
    cleanup();
    render(<CopyQuickBooks item="STOCK DOOR" description="X" rate={1} testId="door" />);
    expect(screen.queryByTestId("door-price")).toBeNull();
  });
});

describe("copy buttons for the doorsdirect account (7/10/2026)", () => {
  const card = (username: string) =>
    render(
      <CurrentUserProvider user={{ username, role: "user" }}>
        <CopyQuickBooks item="VINYL" description="ALMOND VINYL STOP MOLDING,  [2] - 8FT AND [4] - 7FT" rate={0.95} qty={44} testId="vinyl" />
      </CurrentUserProvider>,
    );
  const labels = () => [...document.querySelectorAll("button")].map((b) => b.textContent ?? "");

  it("gives doorsdirect Copy description, quantity and price, in that order, under QuickBooks", () => {
    card("doorsdirect");
    const all = labels();
    const at = (l: string) => all.findIndex((x) => x.toLowerCase().includes(l));
    expect(at("quickbooks")).toBeLessThan(at("copy description"));
    expect(at("copy description")).toBeLessThan(at("copy quantity"));
    expect(at("copy quantity")).toBeLessThan(at("copy price"));
  });

  it("copies the quantity on the line", async () => {
    card("DoorsDirect");
    fireEvent.click(screen.getByTestId("vinyl-qtycopy"));
    await settle();
    expect(copied).toBe("44");
  });

  it("leaves Aimee with her two, and everyone else with none", () => {
    card("aimee");
    expect(screen.getByTestId("vinyl-desc")).toBeTruthy();
    expect(screen.getByTestId("vinyl-price")).toBeTruthy();
    expect(screen.queryByTestId("vinyl-qtycopy")).toBeNull();
    cleanup();
    card("bc");
    expect(screen.queryByTestId("vinyl-desc")).toBeNull();
    expect(screen.queryByTestId("vinyl-qtycopy")).toBeNull();
    expect(screen.queryByTestId("vinyl-price")).toBeNull();
  });
});

describe("typing the quantity on the QuickBooks button (8/10/2026)", () => {
  it("pastes the number typed, after the box is emptied — 5, not 15", async () => {
    render(<CopyQuickBooks item="PARTS" description="CABLE CUTTER" rate={74.95} testId="p" />);
    const qty = screen.getByTestId("p-qty") as HTMLInputElement;
    fireEvent.change(qty, { target: { value: "" } }); // Backspace
    expect(qty.value).toBe("");
    fireEvent.change(qty, { target: { value: "5" } });
    fireEvent.click(screen.getByTestId("p"));
    await settle();
    expect(copied.split("\t")[2]).toBe("5");
  });
});
