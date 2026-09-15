// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { SpecialTool } from "./SpecialTool";

/**
 * Special order follows the same two steps as the stock tabs: choose the door,
 * press Configure, then build it under the same four headings. The margin route
 * stays at the bottom for anything the configurator cannot build.
 */

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async () =>
    new Response("{}", { status: 200, headers: { "content-type": "application/json" } })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const sel = (id: string) => screen.getByTestId(id) as HTMLSelectElement;
const maybe = (id: string) => screen.queryByTestId(id);
const settle = () => new Promise((r) => setTimeout(r, 40));

async function pickDoor(model = "4050") {
  render(<SpecialTool />);
  fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
  fireEvent.change(sel("so-series"), { target: { value: "Premium Steel Collection" } });
  const m = maybe("so-model") as HTMLSelectElement | null;
  const v = [...(m?.options ?? [])].map((o) => o.value).find((x) => x.includes(model));
  if (m && v) fireEvent.change(m, { target: { value: v } });
  await settle();
}

describe("special order — two steps", () => {
  it("opens on the manufacturer, nothing else", () => {
    render(<SpecialTool />);
    expect(maybe("so-mfr")).toBeTruthy();
    expect(maybe("so-width")).toBeNull();
    expect(maybe("so-configure")).toBeNull();
  });

  it("offers Configure once a model is chosen", async () => {
    await pickDoor();
    expect(maybe("so-configure")).toBeTruthy();
    // The size picker stays hidden until Configure, as on the stock tabs.
    expect(maybe("so-width")).toBeNull();
  });

  it("opens the configurator on Configure", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    for (const t of ["so-width", "so-height", "so-style", "so-track", "so-track-mount"]) {
      expect(maybe(t), t).toBeTruthy();
    }
    expect(maybe("so-configure")).toBeNull();
  });

  it("goes back to change the door", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.click(maybe("so-back")!);
    await settle();
    expect(maybe("so-width")).toBeNull();
    expect(maybe("so-configure")).toBeTruthy();
  });

  it("returns to step 1 when the collection changes", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.change(sel("so-series"), { target: { value: "Gallery Collection" } });
    await settle();
    expect(maybe("so-width")).toBeNull();
  });

  it("groups the configurator the way the stock tabs do", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const headings = [...document.querySelectorAll(".ghdr")].map((e) => e.textContent);
    expect(headings).toEqual(expect.arrayContaining([
      "Layout options", "Window options", "Track options", "Additional options",
    ]));
  });

  it("keeps the margin route at the bottom", async () => {
    // A configuration the grid cannot build still needs a price.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const headings = [...document.querySelectorAll(".ghdr")].map((e) => e.textContent);
    expect(headings[headings.length - 1]).toMatch(/Clopay total/i);
  });
});

describe("special order — glass types reach the price", () => {
  const total = () => {
    const el = [...document.querySelectorAll("*")].reverse()
      .find((e) => /^\$[\d,]+\.\d\d$/.test(e.textContent ?? "") && e.children.length === 0);
    return Number((el?.textContent ?? "0").replace(/[$,]/g, ""));
  };

  it("moves the total when a named glass is chosen", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.change(sel("so-width"), { target: { value: "8" } });
    fireEvent.change(sel("so-height"), { target: { value: "7" } });
    await settle();
    fireEvent.change(sel("so-style"), { target: { value: "glass" } });
    await settle();
    expect(total()).toBeCloseTo(897.37, 1);
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_seeded" } });
    await settle();
    expect(total()).toBeCloseTo(1613.84, 0);
  });

  it("offers thirteen types at a priced width", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.change(sel("so-width"), { target: { value: "9" } });
    fireEvent.change(sel("so-height"), { target: { value: "7" } });
    await settle();
    fireEvent.change(sel("so-style"), { target: { value: "glass" } });
    await settle();
    expect([...sel("so-glass").options].filter((o) => o.value)).toHaveLength(13);
  });

  it("offers none at a width DDS has not priced", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.change(sel("so-width"), { target: { value: "16" } });
    fireEvent.change(sel("so-height"), { target: { value: "7" } });
    await settle();
    fireEvent.change(sel("so-style"), { target: { value: "glass" } });
    await settle();
    expect(maybe("so-glass")).toBeNull();
  });
});

describe("special order — condensed layout", () => {
  const settle2 = () => new Promise((r) => setTimeout(r, 40));

  it("uses the stock tabs' row layout in the configurator", async () => {
    // .grow is the compact label-plus-control row the residential tab uses;
    // .field and .row2 are the taller special-order blocks it replaced.
    render(<SpecialTool />);
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Premium Steel Collection" } });
    const m = maybe("so-model") as HTMLSelectElement | null;
    const v = [...(m?.options ?? [])].map((o) => o.value).find((x) => x.includes("4050"));
    if (m && v) fireEvent.change(m, { target: { value: v } });
    await settle2();
    fireEvent.click(maybe("so-configure")!);
    await settle2();
    expect(document.querySelectorAll(".grow").length).toBeGreaterThan(8);
    expect(document.querySelectorAll(".row2")).toHaveLength(0);
  });

  it("keeps the Clopay total block visually separate", async () => {
    // It is the fallback, not part of the configuration, so it stays a .field.
    render(<SpecialTool />);
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Premium Steel Collection" } });
    const m = maybe("so-model") as HTMLSelectElement | null;
    const v = [...(m?.options ?? [])].map((o) => o.value).find((x) => x.includes("4050"));
    if (m && v) fireEvent.change(m, { target: { value: v } });
    await settle2();
    fireEvent.click(maybe("so-configure")!);
    await settle2();
    expect(document.querySelectorAll(".field").length).toBeGreaterThan(0);
  });
});

describe("special order — condensed layout", () => {
  it("uses the same row shape as the stock configurator", async () => {
    // .grow is the compact label-plus-control row the residential tab uses;
    // .field and .row2 are the taller blocks this tab had before.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.querySelectorAll(".grow").length).toBeGreaterThan(8);
    expect(document.querySelectorAll(".row2").length).toBe(0);
  });

  it("calls the default glass single strength", async () => {
    // It is not "standard" — it is the SSB column in Clopay's own book.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.change(sel("so-width"), { target: { value: "8" } });
    fireEvent.change(sel("so-height"), { target: { value: "7" } });
    await settle();
    fireEvent.change(sel("so-style"), { target: { value: "glass" } });
    await settle();
    const first = [...sel("so-glass").options][0];
    expect(first.text).toBe("Single strength");
    expect(first.value).toBe("");
  });
});
