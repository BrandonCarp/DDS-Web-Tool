// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ScannerTool } from "./ScannerTool";
import { copyFrom } from "./test-clipboard";

/** The Scanner tab against a faked lookup. */
const ITEMS: Record<string, { key: string; name: string; desc: string; qbItem: string; price: number; photo?: string }> = {
  "111": { key: "FASTENERS|TEK", name: '1/4" X 3/4" TEK', desc: '1/4" X 3/4" TEK,  BAG OF 100', qbItem: "FASTENERS", price: 10.95, photo: "/parts/tek.webp" },
  "222": { key: "DRUMS|1100-18", name: "1100-18", desc: "1100-18 DRUMS", qbItem: "PARTS", price: 59.95 },
};

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => {
    const { code } = JSON.parse(String(init?.body));
    const item = ITEMS[code];
    return { ok: !!item, status: item ? 200 : 404, json: async () => (item ? { code, item } : { notLinked: true, code }) } as Response;
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const scan = async (code: string) => {
  const box = screen.getByTestId("scanner-box");
  fireEvent.change(box, { target: { value: code } });
  fireEvent.keyDown(box, { key: "Enter" });
  await waitFor(() => expect((box as HTMLInputElement).value).toBe(""));
  await waitFor(() => expect(screen.getByTestId("scanner-note")).toBeTruthy());
};
const rows = () => screen.queryAllByTestId("cart-row");

describe("scanner tab — the cart", () => {
  it("adds a scanned part with its quantity and the price for one", async () => {
    render(<ScannerTool />);
    await scan("111");
    expect(rows()).toHaveLength(1);
    expect(rows()[0].textContent).toContain('1/4" X 3/4" TEK');
    expect((screen.getByTestId("cart-qty") as HTMLInputElement).value).toBe("1");
    expect(screen.getByTestId("cart-price").textContent).toBe("$10.95");
  });

  it("adds one to the line when the same part is scanned again — never a total", async () => {
    render(<ScannerTool />);
    await scan("111");
    await scan("111");
    expect(rows()).toHaveLength(1);
    expect((screen.getByTestId("cart-qty") as HTMLInputElement).value).toBe("2");
    expect(screen.getByTestId("cart-price").textContent).toBe("$10.95");
    expect(document.body.textContent).not.toContain("$21.90");
  });

  it("lets a line be changed or removed, and Clear empties it", async () => {
    render(<ScannerTool />);
    await scan("111");
    await scan("222");
    fireEvent.change(screen.getAllByTestId("cart-qty")[0], { target: { value: "5" } });
    expect((screen.getAllByTestId("cart-qty")[0] as HTMLInputElement).value).toBe("5");
    fireEvent.click(screen.getAllByTestId("cart-del")[0]);
    expect(rows()).toHaveLength(1);
    expect(rows()[0].textContent).toContain("1100-18");
    fireEvent.click(screen.getByTestId("scanner-clear"));
    expect(rows()).toHaveLength(0);
  });

  it("says so when a barcode is not linked, and adds nothing", async () => {
    render(<ScannerTool />);
    await scan("999");
    expect(screen.getByTestId("scanner-note").textContent).toContain("not linked");
    expect(rows()).toHaveLength(0);
  });

  it("copies every line to QuickBooks, with a blank row between each", async () => {
    render(<ScannerTool />);
    await scan("111");
    await scan("111");
    await scan("222");
    const copied = await copyFrom(screen.getByTestId("scanner-qb"));
    expect(copied.split("\n")).toEqual([
      'FASTENERS\t1/4" X 3/4" TEK,  BAG OF 100\t2\t10.95',
      "",
      "PARTS\t1100-18 DRUMS\t1\t59.95",
    ]);
  });

  it("hands the cursor back to the scan box after a scan", async () => {
    render(<ScannerTool />);
    await scan("111");
    await waitFor(() => expect(document.activeElement).toBe(screen.getByTestId("scanner-box")));
  });
});

describe("scanner tab — photos", () => {
  it("shows a part's photo to the left of its name", async () => {
    render(<ScannerTool />);
    await scan("111");
    const item = rows()[0].querySelector(".cart-item")!;
    expect(item.firstElementChild?.tagName).toBe("IMG");
    expect(item.firstElementChild?.getAttribute("src")).toBe("/parts/tek.webp");
  });
});

describe("scanner tab — scans that arrive together", () => {
  it("keeps a scan that lands while the last is still being looked up", async () => {
    vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => {
      await new Promise((r) => setTimeout(r, 40)); // a slow lookup
      const { code } = JSON.parse(String(init?.body));
      return { ok: true, status: 200, json: async () => ({ code, item: ITEMS[code] }) } as Response;
    }));
    render(<ScannerTool />);
    const box = screen.getByTestId("scanner-box") as HTMLInputElement;
    for (const code of ["111", "222"]) {
      fireEvent.change(box, { target: { value: code } });
      fireEvent.keyDown(box, { key: "Enter" });
      expect(box.value).toBe(""); // cleared at once, so the next scan types into an empty box
    }
    await waitFor(() => expect(rows()).toHaveLength(2));
    expect(rows()[0].textContent).toContain("TEK");
    expect(rows()[1].textContent).toContain("1100-18");
  });
});

describe("scanner tab — wording", () => {
  it("starts with a blank scan box and says Scan to start", () => {
    render(<ScannerTool />);
    expect((screen.getByTestId("scanner-box") as HTMLInputElement).placeholder.trim()).toBe("");
    expect(screen.getByText("Scan to start")).toBeTruthy();
  });
});
