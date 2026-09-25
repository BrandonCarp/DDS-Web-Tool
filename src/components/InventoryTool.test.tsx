// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { InventoryTool } from "./InventoryTool";
import { STOCK_ITEMS } from "@/lib/inventory";

/** The Inventory tab, against a faked server. */
const TEK = STOCK_ITEMS.find((i) => i.name === '1/4" X 3/4" TEK')!;
const done = (extra: Record<string, unknown> = {}) =>
  ({ ok: true, moveId: 7, code: "012345", mode: "pull", item: TEK, change: -1, onHand: 9, ...extra });

let calls: { url: string; method: string; body: Record<string, unknown> | null }[] = [];
let scanReplies: { status: number; body: unknown }[] = [];

beforeEach(() => {
  calls = [];
  scanReplies = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    calls.push({ url, method: init?.method ?? "GET", body: init?.body ? JSON.parse(String(init.body)) : null });
    const reply = (status: number, body: unknown) => ({ ok: status < 400, status, json: async () => body }) as Response;
    if (url === "/api/inventory/stock") return reply(200, { items: [] });
    if (url === "/api/inventory/scan") {
      const r = scanReplies.shift() ?? { status: 200, body: done() };
      return reply(r.status, r.body);
    }
    if (url === "/api/inventory/link") return reply(200, { ok: true });
    if (url === "/api/inventory/undo") return reply(200, { ok: true, onHand: 10 });
    return reply(404, {});
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

/** What the scanner does: type the code, press Enter. */
const scan = (code: string) => {
  const box = screen.getByTestId("inv-scan");
  fireEvent.change(box, { target: { value: code } });
  fireEvent.keyDown(box, { key: "Enter" });
};
const scans = () => calls.filter((c) => c.url === "/api/inventory/scan");

describe("inventory tab — scanning", () => {
  it("sends a scan when the scanner presses Enter, and shows what it did", async () => {
    render(<InventoryTool />);
    scan("012345");
    await screen.findByTestId("inv-result");
    expect(scans()[0].body).toEqual({ code: "012345", mode: "put_away", qty: 1 });
    expect(screen.getByTestId("inv-result").textContent).toContain(TEK.name);
    expect(screen.getByTestId("inv-onhand").textContent).toBe("9");
  });

  it("sends the mode and quantity chosen", async () => {
    render(<InventoryTool />);
    fireEvent.click(screen.getByTestId("inv-mode-put_away"));
    fireEvent.change(screen.getByTestId("inv-qty"), { target: { value: "5" } });
    scanReplies.push({ status: 200, body: done({ mode: "put_away", change: 5, onHand: 15 }) });
    scan("012345");
    await screen.findByTestId("inv-result");
    expect(scans()[0].body).toEqual({ code: "012345", mode: "put_away", qty: 5 });
  });

  it("hands the cursor back to the scan box after a scan", async () => {
    render(<InventoryTool />);
    scan("012345");
    await screen.findByTestId("inv-result");
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId("inv-scan")));
  });

  it("asks before counting the same barcode twice in a row", async () => {
    render(<InventoryTool />);
    scan("012345");
    await screen.findByTestId("inv-result");
    scan("012345");
    await screen.findByTestId("inv-again");
    expect(scans()).toHaveLength(1);
    fireEvent.click(screen.getByTestId("inv-again-yes"));
    await waitFor(() => expect(scans()).toHaveLength(2));
  });

  it("takes a scan back with Undo", async () => {
    render(<InventoryTool />);
    scan("012345");
    await screen.findByTestId("inv-result");
    fireEvent.click(screen.getByTestId("inv-undo"));
    await waitFor(() => expect(screen.getByTestId("inv-result").textContent).toContain("Undone"));
    expect(calls.find((c) => c.url === "/api/inventory/undo")!.body).toEqual({ moveId: 7 });
    expect(screen.getByTestId("inv-onhand").textContent).toBe("10");
  });
});

describe("inventory tab — a barcode nobody has linked", () => {
  it("asks which part it is, links it, then counts the scan", async () => {
    render(<InventoryTool />);
    scanReplies.push({ status: 404, body: { notLinked: true, code: "012345" } });
    scan("012345");
    await screen.findByTestId("inv-unlinked");
    fireEvent.change(screen.getByTestId("inv-link-part"), { target: { value: TEK.key } });
    fireEvent.click(screen.getByTestId("inv-link"));
    await screen.findByTestId("inv-result");
    expect(calls.find((c) => c.url === "/api/inventory/link")!.body).toEqual({ code: "012345", itemKey: TEK.key });
    expect(scans()).toHaveLength(2);
  });
});

describe("inventory tab — counting a shelf", () => {
  it("will not count until a number is typed — an empty box is not zero", async () => {
    render(<InventoryTool />);
    fireEvent.click(screen.getByTestId("inv-mode-count"));
    expect((screen.getByTestId("inv-qty") as HTMLInputElement).value).toBe("");
    scan("012345");
    await screen.findByTestId("inv-error");
    expect(scans()).toHaveLength(0);
  });

  it("clears the count after each shelf, and pulls go back to one a scan", async () => {
    render(<InventoryTool />);
    fireEvent.click(screen.getByTestId("inv-mode-count"));
    fireEvent.change(screen.getByTestId("inv-qty"), { target: { value: "24" } });
    scanReplies.push({ status: 200, body: done({ mode: "count", change: 24, onHand: 24 }) });
    scan("012345");
    await screen.findByTestId("inv-result");
    expect(scans()[0].body).toEqual({ code: "012345", mode: "count", qty: 24 });
    expect((screen.getByTestId("inv-qty") as HTMLInputElement).value).toBe("");
    fireEvent.click(screen.getByTestId("inv-mode-pull"));
    expect((screen.getByTestId("inv-qty") as HTMLInputElement).value).toBe("1");
  });
});

describe("inventory tab — the scanned-twice check", () => {
  it("starts over when the mode changes — counting then pulling is on purpose", async () => {
    render(<InventoryTool />);
    fireEvent.click(screen.getByTestId("inv-mode-count"));
    fireEvent.change(screen.getByTestId("inv-qty"), { target: { value: "24" } });
    scanReplies.push({ status: 200, body: done({ mode: "count", change: 24, onHand: 24 }) });
    scan("012345");
    await screen.findByTestId("inv-result");
    fireEvent.click(screen.getByTestId("inv-mode-pull"));
    scan("012345");
    await waitFor(() => expect(scans()).toHaveLength(2));
    expect(screen.queryByTestId("inv-again")).toBeNull();
  });
});

describe("inventory tab — photos", () => {
  it("shows the part's photo beside the scan result", async () => {
    render(<InventoryTool />);
    scan("012345");
    await screen.findByTestId("inv-result");
    expect(screen.getByTestId("inv-result").querySelector("img.partphoto")?.getAttribute("src")).toBe(TEK.photo);
  });
});

describe("inventory tab — scans that arrive together", () => {
  it("sends every scan, in order, even while the last is still saving", async () => {
    render(<InventoryTool />);
    const box = screen.getByTestId("inv-scan") as HTMLInputElement;
    for (const code of ["111", "222"]) {
      fireEvent.change(box, { target: { value: code } });
      fireEvent.keyDown(box, { key: "Enter" });
      expect(box.value).toBe("");
    }
    await waitFor(() => expect(scans()).toHaveLength(2));
    expect(scans().map((c) => c.body!.code)).toEqual(["111", "222"]);
  });
});
