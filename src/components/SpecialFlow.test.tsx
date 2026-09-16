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

  it("takes the door selectors off screen while configuring", async () => {
    // Order type, manufacturer, collection and model are step 1 choices. Once
    // the counter is building the door they come off, exactly as on the stock
    // tabs — Change door goes back.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    for (const t of ["so-mfr", "so-series", "so-model"]) expect(maybe(t), t).toBeNull();
    expect(screen.queryByText("Residential")).toBeNull();
    expect(maybe("so-back")).toBeTruthy();
  });

  it("brings them back on Change door", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.click(maybe("so-back")!);
    await settle();
    for (const t of ["so-mfr", "so-series", "so-model"]) expect(maybe(t), t).toBeTruthy();
    expect(screen.queryByText("Residential")).toBeTruthy();
  });

  it("numbers the step it is on", async () => {
    await pickDoor();
    expect(document.querySelector(".step-n")?.textContent).toBe("1");
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.querySelector(".step-n")?.textContent).toBe("2");
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
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_rain" } });
    await settle();
    // Book: 8' short band, 4 windows, insulated rain 392.08, at 43 margin.
    expect(total()).toBeCloseTo(723.25 + 392.08 / 0.57, 0);
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
    expect([...sel("so-glass").options].filter((o) => o.value)).toHaveLength(10);
  });

  it("offers long panel glass only from 8 feet", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.change(sel("so-width"), { target: { value: "7" } });
    fireEvent.change(sel("so-height"), { target: { value: "7" } });
    await settle();
    fireEvent.change(sel("so-style"), { target: { value: "glass" } });
    await settle();
    // Only short is available, so the panel row is hidden entirely.
    expect(maybe("so-panel")).toBeNull();
    fireEvent.change(sel("so-width"), { target: { value: "12" } });
    await settle();
    expect(maybe("so-panel")).toBeTruthy();
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

describe("special order — reads like the stock tabs", () => {
  it("has no chips left while configuring", async () => {
    // Order type is a step 1 choice, and Assembly type is a dropdown here just
    // as it is on residential.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.querySelectorAll(".chip").length).toBe(0);
    expect(maybe("so-assembly")).toBeTruthy();
  });

  it("asks for the assembly the same way residential does", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const opts = [...sel("so-assembly").options].map((o) => o.text);
    expect(opts).toEqual(["Complete door", "Replacement section"]);
  });
});

describe("special order — looks like the stock configurator", () => {
  it("has a model bar with Back, the model and the collection", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const bar = document.querySelector(".modelbar");
    expect(bar).toBeTruthy();
    expect(bar?.textContent).toContain("Back");
    expect(bar?.textContent).toContain("4050");
    expect(bar?.textContent).toContain("Premium Steel Collection");
  });

  it("lays the options out in four panels, two columns", async () => {
    // The same .cfg2 grid of .ggroup panels the residential tab uses.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.querySelectorAll(".cfg2")).toHaveLength(1);
    expect(document.querySelectorAll(".ggroup")).toHaveLength(4);
    expect([...document.querySelectorAll(".ggroup .ghdr")].map((e) => e.textContent))
      .toEqual(["Layout options", "Window options", "Track options", "Additional options"]);
  });
});
