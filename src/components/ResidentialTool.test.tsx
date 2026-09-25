// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { ResidentialTool } from "./ResidentialTool";
import { copiedQbLine, copyFrom } from "./test-clipboard";
import { QB_VINYL } from "@/lib/pricing/data/quickbooks";

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

/** Walk step 1 as far as picking a model. */
function pickModel(model = "4050") {
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
}

/** Walk the tool to the configure step for a model, as a given assembly. */
async function configure(model = "4050", assemblyType?: string) {
  pickModel(model);
  if (assemblyType) fireEvent.click(screen.getByTestId(`assembly-${assemblyType}`));
  fireEvent.click(screen.getByTestId("configure"));
  await waitFor(() => screen.getByText("‹ Back"));
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
    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
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
  it("drops the track group", async () => {
    // Neither track nor spring ships with sections, and the engine already
    // forces r12/extension — the dropdowns were asking a question with no
    // effect on the quote.
    await configure("4050", "sectionsonly");
    expect(screen.queryByTestId("track")).toBeNull();
    expect(screen.queryByTestId("spring")).toBeNull();
  });

  it("drops upgraded hardware", async () => {
    // Hinges and rollers are door hardware; sections ship without them.
    await configure("4050", "sectionsonly");
    expect(screen.queryByTestId("upgraded-hardware")).toBeNull();
  });

  it("keeps lock and the home owner surcharge", async () => {
    // Both still apply: a lock ships with sections, and the surcharge is about
    // who is buying rather than what is in the box.
    await configure("4050", "sectionsonly");
    expect(screen.getByTestId("lock")).toBeTruthy();
    expect(screen.getByTestId("homeowner")).toBeTruthy();
  });

  it("never sends the hardware flag", async () => {
    // Turn it on as a complete door, go back and switch — the flag must not
    // survive.
    await configure();
    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
    fireEvent.change(screen.getByTestId("upgraded-hardware"), { target: { value: "yes" } });
    fireEvent.click(screen.getByText("‹ Back"));
    fireEvent.click(screen.getByTestId("assembly-sectionsonly"));
    fireEvent.click(screen.getByTestId("configure"));
    await waitFor(() => screen.getByText("‹ Back"));
    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
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

describe("residential tool — replacement sections", () => {
  it("offers the home owner surcharge on a bottom section", async () => {
    await configure("4050", "sections");
    expect(screen.getByTestId("sec-homeowner")).toBeTruthy();
  });

  it("offers it on an intermediate too", async () => {
    await configure("4050", "sections");
    const kind = [...document.querySelectorAll("select")]
      .find((x) => [...x.options].some((o) => o.value === "int"));
    if (kind) fireEvent.change(kind, { target: { value: "int" } });
    expect(screen.getByTestId("sec-homeowner")).toBeTruthy();
  });

  it("sends it with the section request", async () => {
    await configure("4050", "sections");
    fireEvent.change(screen.getByTestId("sec-width"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
    fireEvent.change(screen.getByTestId("sec-homeowner"), { target: { value: "yes" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies.length).toBeGreaterThan(0));
    const last = bodies[bodies.length - 1];
    expect(last.assembly).toBe("sections");
    expect(last.homeowner).toBe(true);
  });
});

describe("residential tool — assembly type and the order of step 2", () => {
  it("asks for the assembly type in step 1, once a model is picked", () => {
    pickModel();
    const opts = ["complete", "sectionsonly", "sections"].map((v) => screen.getByTestId(`assembly-${v}`));
    expect(opts.map((b) => b.textContent)).toEqual(["Complete door", "Sections only", "Replacement section"]);
    expect(opts[0].getAttribute("aria-checked")).toBe("true");
    fireEvent.click(opts[2]);
    expect(opts[2].getAttribute("aria-checked")).toBe("true");
    expect(opts[0].getAttribute("aria-checked")).toBe("false");
  });

  it("leaves no assembly question in step 2, and shows the one chosen", async () => {
    await configure("4050", "sectionsonly");
    expect(screen.queryByTestId("assembly-complete")).toBeNull();
    expect(screen.getByTestId("assembly-tag").textContent).toBe("Sections only");
  });

  it("opens the size first, then the color, then the rest", async () => {
    await configure();
    const off = (t: string) => (screen.getByTestId(t) as HTMLSelectElement | HTMLButtonElement).disabled;
    const rest = ["style", "spring", "track", "lock", "upgraded-hardware", "homeowner", "get-price"];
    expect(off("width-ft")).toBe(false);
    expect(off("color")).toBe(true);
    for (const t of rest) expect(off(t), `${t} before a size`).toBe(true);

    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    expect(off("color")).toBe(false);
    for (const t of rest) expect(off(t), `${t} before a color`).toBe(true);

    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
    for (const t of rest) expect(off(t), `${t} after the color`).toBe(false);
    expect(screen.queryByTestId("cfg-hint")).toBeNull();
  });

  it("never picks the color for you", async () => {
    await configure();
    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    expect((screen.getByTestId("color") as HTMLSelectElement).value).toBe("");
  });
});

describe("residential tool — the quote card once priced", () => {
  async function priceIt() {
    await configure();
    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(screen.getByTestId("source-badge")).toBeTruthy());
  }

  it("grays out Get price once priced, until something changes", async () => {
    await priceIt();
    const button = () => screen.getByTestId("get-price") as HTMLButtonElement;
    expect(button().disabled).toBe(true);
    const lock = screen.getByTestId("lock") as HTMLSelectElement;
    const other = [...lock.options].map((o) => o.value).find((v) => v !== lock.value)!;
    fireEvent.change(lock, { target: { value: other } });
    expect(button().disabled).toBe(false);
  });

  it("shows the model, the stock marker, the quantity, the price and Copy for QuickBooks — nothing else", async () => {
    await priceIt();
    // The card, not the page: the printed estimate sheet (hidden on screen)
    // still carries the full breakdown.
    const cardEl = document.querySelector("aside.quote") as HTMLElement;
    const card = within(cardEl);
    expect(card.getByTestId("source-badge").textContent).toContain("In stock");
    expect(card.getByTestId("copy-qb")).toBeTruthy();
    expect(cardEl.querySelector("#qty")).toBeTruthy();
    // The price came back on 25/9/2026; the line items did not.
    expect(card.getByTestId("total").textContent).toBe("$100.00");
    for (const gone of ["price", "copy-desc", "copy-price"]) {
      expect(card.queryByTestId(gone), gone).toBeNull();
    }
    expect(card.queryByText("TEST DESCRIPTION")).toBeNull();
    expect(cardEl.querySelector(".qsub")).toBeNull();
  });

  it("still copies the whole line to QuickBooks", async () => {
    await priceIt();
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.description).toBe("TEST DESCRIPTION");
    expect(line.qty).toBe(1);
    expect(line.rate).toBe(100);
  });
});

describe("residential tool — framing, by model", () => {
  const SHORT = 'PLAIN SHORT 19-1/2" X 12"', LONG = 'PLAIN LONG 40-1/2" X 12"';
  const options = (id: string) =>
    [...(screen.getByTestId(id) as HTMLSelectElement).options].map((o) => o.textContent);

  it("offers each model its own plain windows, then Inserts where it takes them", async () => {
    const expected: Record<string, string[]> = {
      T50S: [SHORT, "Inserts"],
      "4050": [SHORT, LONG, "Inserts"],
      "9130": [SHORT, LONG, "Inserts"],
      "4053": [LONG, "Inserts"],
      "9133": [LONG, "Inserts"],
      GD1SP: ['PLAIN LONG 42" X 16"'],
      GD1LP: ['PLAIN ARCH 1 42" X 16"', "Inserts"],
    };
    for (const [model, want] of Object.entries(expected)) {
      cleanup();
      await configure(model);
      expect(options("framing"), model).toEqual(want);
    }
  });

  it("sends the plain window chosen", async () => {
    await configure("4050");
    fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
    fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
    const glass = options("style").length && [...(screen.getByTestId("style") as HTMLSelectElement).options]
      .map((o) => o.value).find((v) => v !== "solid")!;
    fireEvent.change(screen.getByTestId("style"), { target: { value: glass } });
    fireEvent.change(screen.getByTestId("framing"), { target: { value: LONG } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies.length).toBeGreaterThan(0));
    const last = bodies[bodies.length - 1];
    expect(last.style).toBe("glass");
    expect(last.plainWindow).toBe(LONG);
  });

  it("labels the size rows Width and Height, beside their own boxes", async () => {
    await configure();
    const rowOf = (id: string) => screen.getByTestId(id).closest(".grow")!.querySelector("label")!.textContent;
    expect(rowOf("width-ft")).toBe("Width");
    expect(rowOf("height-ft")).toBe("Height");
    expect(screen.queryByText("Measure size")).toBeNull();
  });
});

describe("residential tool — vinyl molding", () => {
  async function priceIt(assemblyType?: string) {
    await configure("4050", assemblyType);
    if (assemblyType === "sections") {
      fireEvent.change(screen.getByTestId("sec-width"), { target: { value: "9" } });
    } else {
      fireEvent.change(screen.getByTestId("width-ft"), { target: { value: "9" } });
      fireEvent.change(screen.getByTestId("height-ft"), { target: { value: "7" } });
    }
    fireEvent.change(screen.getByTestId("color"), { target: { value: "White" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(bodies.length).toBeGreaterThan(0));
  }

  it("asks about vinyl when Get price is pressed", async () => {
    await priceIt();
    expect(screen.getByTestId("vinyl-prompt").textContent).toContain("WHITE vinyl");
  });

  it("No copies the door line alone", async () => {
    await priceIt();
    fireEvent.click(screen.getByTestId("vinyl-ask-no"));
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    await waitFor(() => screen.getByTestId("copy-qb"));
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
  });

  it("Yes puts the door on row 1 and the vinyl on row 3, row 2 left blank", async () => {
    await priceIt();
    fireEvent.click(screen.getByTestId("vinyl-ask-yes"));
    await waitFor(() => screen.getByTestId("vinyl-price"));
    // White 9' x 7': one 9' header and two 7' legs, 23 ft at 0.95.
    expect(screen.getByTestId("vinyl-price").textContent).toBe("$21.85");
    const rows = (await copyFrom(screen.getByTestId("copy-qb"))).split("\n");
    expect(rows).toHaveLength(3);
    expect(rows[1]).toBe("");
    expect(rows[2].split("\t")).toEqual([QB_VINYL, "WHITE VINYL STOP MOLDING,  [1] - 9FT AND [2] - 7FT", "23", "0.95"]);
  });

  it("can change its mind in the quote card", async () => {
    await priceIt();
    fireEvent.click(screen.getByTestId("vinyl-ask-yes"));
    await waitFor(() => screen.getByTestId("vinyl-price"));
    fireEvent.click(screen.getByTestId("vinyl-no"));
    expect(screen.queryByTestId("vinyl-price")).toBeNull();
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
  });

  it("never asks for a replacement section — its opening already has molding", async () => {
    await priceIt("sections");
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    expect(screen.queryByTestId("vinyl-row")).toBeNull();
  });
});
