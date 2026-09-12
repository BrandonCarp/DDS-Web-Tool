// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ResidentialTool } from "./ResidentialTool";

/**
 * What these cover, and why.
 *
 * The pricing engine is tested thoroughly elsewhere and the API route now has
 * its own suite. What neither reaches is the part that decides WHICH controls
 * exist and what gets sent — 696 lines of state in this file. Every bug
 * Brandon has reported in the tool has been of that shape: a dropdown that
 * should not have appeared, a control that never rendered, an option that
 * stopped being sent.
 *
 * So these assert the wiring, not the arithmetic. Fetch is stubbed and the
 * request body is inspected: if a field stops being sent, a test fails here
 * rather than a surcharge quietly vanishing from a real quote.
 */

const MODELS = ["T50S", "T52S", "4050", "4051", "4053", "9130", "9133", "GD1LP", "GD1SP"];

let bodies: Record<string, unknown>[] = [];

beforeEach(() => {
  bodies = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    if (String(url).includes("/api/price")) {
      bodies.push(body);
      return new Response(JSON.stringify({
        model: body.model, priced: true, unitPrice: 100, lines: [],
        description: "TEST DESCRIPTION", isStock: true, source: "stock",
        size: { widthFt: 9, widthIn: 0, heightFt: 7, heightIn: 0 },
      }), { status: 200, headers: { "content-type": "application/json" } });
    }
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

/** Walk the tool to the configure step for a model. */
async function configure(model = "4050") {
  render(<ResidentialTool models={MODELS} />);
  const series = screen.getByTestId("series") as HTMLSelectElement;
  // Models are grouped by collection, so find the one holding this model
  // rather than assuming it is in the first.
  let found = false;
  for (const coll of [...series.options].map((o) => o.value).filter(Boolean)) {
    fireEvent.change(series, { target: { value: coll } });
    const sel = screen.queryByTestId("model") as HTMLSelectElement | null;
    if (sel && [...sel.options].some((o) => o.value === model)) {
      fireEvent.change(sel, { target: { value: model } });
      found = true;
      break;
    }
  }
  if (!found) throw new Error(`no collection offers ${model}`);
  fireEvent.click(screen.getByTestId("configure"));
  await waitFor(() => screen.getByTestId("width-ft"));
}

describe("residential tool — model list", () => {
  it("offers only the models it was given", async () => {
    render(<ResidentialTool models={MODELS} />);
    const series = screen.getByTestId("series") as HTMLSelectElement;
    const shown: string[] = [];
    for (const opt of [...series.options].map((o) => o.value).filter(Boolean)) {
      fireEvent.change(series, { target: { value: opt } });
      const m = screen.queryByTestId("model") as HTMLSelectElement | null;
      if (m) shown.push(...[...m.options].map((o) => o.value).filter(Boolean));
    }
    // The 4300 family is special order only; it must not appear here.
    for (const m of ["4300", "4301", "4310"]) expect(shown, m).not.toContain(m);
    expect(new Set(shown)).toEqual(new Set(MODELS));
  });
});

describe("residential tool — option controls", () => {
  it("shows lock, upgraded hardware and the home owner surcharge", async () => {
    await configure();
    expect(screen.getByTestId("lock")).toBeTruthy();
    expect(screen.getByTestId("upgraded-hardware")).toBeTruthy();
    expect(screen.getByTestId("homeowner")).toBeTruthy();
  });

  it("orders them lock, hardware, surcharge", async () => {
    // The surcharge sits below upgraded hardware — Brandon, 10/9/2026.
    await configure();
    const ids = ["lock", "upgraded-hardware", "homeowner"].map((t) => screen.getByTestId(t));
    for (let i = 1; i < ids.length; i++) {
      const pos = ids[i - 1].compareDocumentPosition(ids[i]);
      expect(pos & Node.DOCUMENT_POSITION_FOLLOWING, `${i}`).toBeTruthy();
    }
  });

  it("defaults both surcharges to no", async () => {
    await configure();
    expect((screen.getByTestId("upgraded-hardware") as HTMLSelectElement).value).toBe("no");
    expect((screen.getByTestId("homeowner") as HTMLSelectElement).value).toBe("no");
  });
});

describe("residential tool — what gets sent", () => {
  /** Fill in a size and press Get price — the tool does not price on change. */
  const priceIt = async () => {
    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies.length).toBeGreaterThan(0));
  };

  it("sends the model and size", async () => {
    await configure();
    await priceIt();
    const last = bodies[bodies.length - 1];
    expect(last.model).toBe("4050");
    expect(Number(last.widthFt)).toBe(9);
    expect(Number(last.heightFt)).toBe(7);
  });

  it("sends upgraded hardware when selected", async () => {
    await configure();
    await priceIt();
    fireEvent.change(screen.getByTestId("upgraded-hardware"), { target: { value: "yes" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies[bodies.length - 1].upgradedHardware).toBe(true));
  });

  it("sends the home owner surcharge when selected", async () => {
    await configure();
    await priceIt();
    fireEvent.change(screen.getByTestId("homeowner"), { target: { value: "yes" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies[bodies.length - 1].homeowner).toBe(true));
  });

  it("re-prices when a surcharge changes", async () => {
    // The tool clears the shown price when the configuration changes, so the
    // counter cannot read a number that no longer matches the options.
    await configure();
    await priceIt();
    const before = bodies.length;
    fireEvent.change(screen.getByTestId("homeowner"), { target: { value: "yes" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies.length).toBeGreaterThan(before));
    expect(bodies[bodies.length - 1].homeowner).toBe(true);
  });

  it("sends both off by default", async () => {
    await configure();
    await priceIt();
    const last = bodies[bodies.length - 1];
    expect(last.upgradedHardware).toBe(false);
    expect(last.homeowner).toBe(false);
  });
});

describe("residential tool — sections only", () => {
  /** Switch the assembly type once the configurator is open. */
  const assembly = (v: string) => {
    const s = [...document.querySelectorAll("select")]
      .find((x) => [...x.options].some((o) => o.value === "sectionsonly"))!;
    fireEvent.change(s, { target: { value: v } });
  };

  it("drops the track group", async () => {
    // Neither track nor spring ships with sections, and the engine already
    // forces r12/extension — the dropdowns were asking a question with no
    // effect on the quote.
    await configure();
    expect(screen.getByTestId("track")).toBeTruthy();
    assembly("sectionsonly");
    expect(screen.queryByTestId("track")).toBeNull();
    expect(screen.queryByTestId("spring")).toBeNull();
  });

  it("drops upgraded hardware", async () => {
    // Hinges and rollers are door hardware; sections ship without them.
    await configure();
    expect(screen.getByTestId("upgraded-hardware")).toBeTruthy();
    assembly("sectionsonly");
    expect(screen.queryByTestId("upgraded-hardware")).toBeNull();
  });

  it("keeps lock and the home owner surcharge", async () => {
    // Both still apply: a lock ships with sections, and the surcharge is about
    // who is buying rather than what is in the box.
    await configure();
    assembly("sectionsonly");
    expect(screen.getByTestId("lock")).toBeTruthy();
    expect(screen.getByTestId("homeowner")).toBeTruthy();
  });

  it("never sends the hardware flag", async () => {
    // Turn it on as a complete door, then switch — the flag must not survive.
    await configure();
    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    fireEvent.change(screen.getByTestId("upgraded-hardware"), { target: { value: "yes" } });
    assembly("sectionsonly");
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies.length).toBeGreaterThan(0));
    expect(bodies[bodies.length - 1].upgradedHardware).toBe(false);
    expect(bodies[bodies.length - 1].assembly).toBe("sectionsonly");
  });

  it("leaves the complete-door view alone", async () => {
    await configure();
    for (const t of ["track", "spring", "upgraded-hardware", "lock", "homeowner"]) {
      expect(screen.getByTestId(t), t).toBeTruthy();
    }
  });
});
