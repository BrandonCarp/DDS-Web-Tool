// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { SpecialTool } from "./SpecialTool";
import { copiedQbLine } from "./test-clipboard";

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
/** The size is two boxes each — feet, then inches — like the stock tab (12/10/2026). */
const setSize = (which: "width" | "height", key: string) => {
  const [ft, inch] = key.split(".");
  fireEvent.change(sel(`so-${which}-ft`), { target: { value: ft } });
  fireEvent.change(sel(`so-${which}-in`), { target: { value: inch ?? "0" } });
};
const setWidth = (key: string) => setSize("width", key);
const setHeight = (key: string) => setSize("height", key);
const options = (id: string) => [...sel(id).options];

/** Open the configurator and give it a size, so the track group unlocks. */
async function configured(width = "9", height = "7") {
  await pickDoor();
  fireEvent.click(maybe("so-configure")!);
  await settle();
  setWidth(width);
  setHeight(height);
  fireEvent.change(sel("so-color"), { target: { value: "White" } });
  await settle();
}

async function pickDoor(model = "4050") {
  render(<SpecialTool />);
  // Residential or commercial comes first now; nothing else shows until it is
  // chosen, and it greys out once it is.
  fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
  fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
  fireEvent.change(sel("so-series"), { target: { value: "Premium Steel Collection" } });
  const m = maybe("so-model") as HTMLSelectElement | null;
  const v = [...(m?.options ?? [])].map((o) => o.value).find((x) => x.includes(model));
  if (m && v) fireEvent.change(m, { target: { value: v } });
  await settle();
}

describe("special order — two steps", () => {
  it("opens on the order type, nothing else", () => {
    render(<SpecialTool />);
    expect(maybe("so-scope")).toBeTruthy();
    expect(maybe("so-mfr")).toBeNull();
    expect(maybe("so-width-ft")).toBeNull();
    expect(maybe("so-configure")).toBeNull();
  });

  it("offers Configure once a model is chosen", async () => {
    await pickDoor();
    expect(maybe("so-configure")).toBeTruthy();
    // The size picker stays hidden until Configure, as on the stock tabs.
    expect(maybe("so-width-ft")).toBeNull();
  });

  it("opens the configurator on Configure", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    for (const t of ["so-width-ft", "so-width-in", "so-height-ft", "so-height-in", "so-glass", "so-framing", "so-section"]) expect(maybe(t), t).toBeTruthy();
    // Track waits for a size.
    expect(maybe("so-track")).toBeNull();
    setWidth("9");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    for (const t of ["so-track", "so-track-mount"]) expect(maybe(t), t).toBeTruthy();
    expect(maybe("so-configure")).toBeNull();
  });

  it("goes back to change the door", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.click(maybe("so-back")!);
    await settle();
    expect(maybe("so-width-ft")).toBeNull();
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
  // The card no longer shows a total; the QuickBooks line carries it.
  const total = async () => {
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    return line.rate * line.qty;
  };

  it("moves the total when a named glass is chosen", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    fireEvent.change(sel("so-glass"), { target: { value: "ssb" } });
    await settle();
    expect(await total()).toBeCloseTo(897.37, 1);
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_rain" } });
    await settle();
    // Book: 8' short band, 4 windows, insulated rain 392.08, at 43 margin.
    expect(await total()).toBeCloseTo(723.25 + 392.08 / 0.57, 0);
  });

  it("offers thirteen types at a priced width", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("9");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // Solid, single strength, then the nine named types — one list, like the stock tab's.
    expect(options("so-glass").map((o) => o.value)).toEqual(["solid", "ssb", "dsb", "acrylic", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain"]);
  });

  it("offers long windows in the framing only from 8 feet", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("7");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    fireEvent.change(sel("so-glass"), { target: { value: "ssb" } });
    await settle();
    // Only short windows at 7'0": the plain short window and Inserts.
    expect(options("so-framing").map((o) => o.textContent)).toEqual(['PLAIN SHORT 19-1/2" X 12"', "Inserts"]);
    setWidth("12");
    await settle();
    expect(options("so-framing").map((o) => o.textContent)).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"', "Inserts — short windows", "Inserts — long windows"]);
  });
});

describe("special order — condensed layout", () => {
  const settle2 = () => new Promise((r) => setTimeout(r, 40));

  it("uses the stock tabs' row layout in the configurator", async () => {
    // .grow is the compact label-plus-control row the residential tab uses;
    // .field and .row2 are the taller special-order blocks it replaced.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.querySelectorAll(".grow").length).toBeGreaterThan(6);
    expect(document.querySelectorAll(".row2")).toHaveLength(0);
  });

  it("puts the Clopay total beside the quote, not in the configurator", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    // It is how a price gets in when the grid cannot build the door, so it
    // belongs with the number it produces rather than with the options.
    const box = document.querySelector(".qtotalbox");
    expect(box).toBeTruthy();
    expect(box?.closest(".quote")).toBeTruthy();
    expect(box?.textContent).toContain("Clopay total");
  });
});

describe("special order — condensed layout", () => {
  it("uses the same row shape as the stock configurator", async () => {
    // .grow is the compact label-plus-control row the residential tab uses;
    // .field and .row2 are the taller blocks this tab had before.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.querySelectorAll(".grow").length).toBeGreaterThan(6);
    expect(document.querySelectorAll(".row2").length).toBe(0);
  });

  it("starts solid, and calls the grid's own glass single strength", async () => {
    // It is not "standard" — it is the SSB column in Clopay's own book.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(sel("so-glass").value).toBe("solid");
    const [first, second] = options("so-glass");
    expect(first.text).toBe("Solid — no windows");
    expect(second.text).toBe("Single strength B grade");
    expect(second.value).toBe("ssb");
  });
});

describe("special order — reads like the stock tabs", () => {
  it("asks for the assembly in step 1, as buttons, before Configure", async () => {
    await pickDoor();
    const opts = ["door", "section"].map((v) => screen.getByTestId(`so-assembly-${v}`));
    expect(opts.map((b) => b.textContent)).toEqual(["Complete door", "Replacement section"]);
    expect(opts[0].getAttribute("aria-checked")).toBe("true");
    // Buttons first, then Configure — the order the stock tabs use.
    const configure = maybe("so-configure")!;
    expect(opts[1].compareDocumentPosition(configure) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("leaves no assembly question or chips while configuring", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(maybe("so-assembly-door")).toBeNull();
    expect(document.querySelectorAll(".chip").length).toBe(0);
    expect(screen.getByTestId("so-assembly-tag").textContent).toBe("Complete door");
  });

  it("opens the size first, then the color, then the rest", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const off = (id: string) => sel(id).disabled;
    expect(off("so-width-ft")).toBe(false);
    expect(off("so-color")).toBe(true);
    expect(off("so-glass")).toBe(true);
    setWidth("9");
    setHeight("7");
    expect(off("so-color")).toBe(false);
    expect(sel("so-color").value).toBe("");
    expect(off("so-glass")).toBe(true);
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    expect(off("so-glass")).toBe(false);
    expect(maybe("so-cfg-hint")).toBeNull();
  });

  it("copies the door description to QuickBooks rather than showing it", async () => {
    await configured();
    await settle();
    expect(maybe("so-desc")).toBeNull();
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.description).toMatch(/white/i);
    expect(line.description).toMatch(/4050/);
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

describe("special order — order type comes first", () => {
  it("shows nothing until residential or commercial is chosen", () => {
    render(<SpecialTool />);
    expect(maybe("so-scope")).toBeTruthy();
    for (const t of ["so-mfr", "so-series", "so-model", "so-configure"]) {
      expect(maybe(t), t).toBeNull();
    }
  });

  it("greys out once chosen, like Clopay on the stock tabs", () => {
    render(<SpecialTool />);
    const s = sel("so-scope");
    expect(s.disabled).toBe(false);
    fireEvent.change(s, { target: { value: "residential" } });
    expect(sel("so-scope").disabled).toBe(true);
    expect(sel("so-scope").value).toBe("residential");
    expect(maybe("so-mfr")).toBeTruthy();
  });

  it("can be changed back", () => {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "commercial" } });
    expect(sel("so-scope").disabled).toBe(true);
    fireEvent.click(maybe("so-change-scope")!);
    expect(sel("so-scope").disabled).toBe(false);
    expect(maybe("so-mfr")).toBeNull();
  });

  it("offers commercial as well", () => {
    render(<SpecialTool />);
    expect([...sel("so-scope").options].map((o) => o.value))
      .toEqual(expect.arrayContaining(["residential", "commercial"]));
  });
});

describe("special order — home owner surcharge", () => {
  it("is not offered before Configure", () => {
    // Nothing is priced until a door is chosen and Configure pressed, so there
    // is nothing for a surcharge to apply to yet.
    render(<SpecialTool />);
    expect(maybe("so-homeowner-quote")).toBeNull();
    expect(maybe("so-homeowner")).toBeNull();
  });

  it("is in the configurator too, on the same state", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(maybe("so-homeowner")).toBeTruthy();
    // The quote-panel copy comes off once the configurator has its own.
    expect(maybe("so-homeowner-quote")).toBeNull();
    fireEvent.change(sel("so-homeowner"), { target: { value: "double" } });
    await settle();
    expect(sel("so-homeowner").value).toBe("double");
  });

  it("offers no, single door and double door in both places", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect([...sel("so-homeowner").options].map((o) => o.value)).toEqual(["no", "single", "double"]);
  });

  it("wraps the configurator so it can be tightened for a laptop screen", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const box = document.querySelector(".socfg");
    expect(box).toBeTruthy();
    expect(box?.querySelector(".cfg2")).toBeTruthy();
  });
});

describe("special order — track waits for a size", () => {
  it("hides the track group until a width and height are set", async () => {
    // High lift caps at the door height and the spring choice is height-driven,
    // so none of it can be answered before the size is.
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    for (const t of ["so-track", "so-track-mount", "so-high-lift"]) {
      expect(maybe(t), t).toBeNull();
    }
  });

  it("says why, rather than showing an empty panel", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.body.textContent).toMatch(/width and height first/i);
  });

  it("unlocks once both are set", async () => {
    await configured();
    expect(maybe("so-track")).toBeTruthy();
    expect(maybe("so-track-mount")).toBeTruthy();
    expect(document.body.textContent).not.toMatch(/width and height first/i);
  });

  it("needs both, not just one", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("9");
    await settle();
    expect(maybe("so-track")).toBeNull();
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(maybe("so-track")).toBeTruthy();
  });
});

describe("special order — surcharge follows the pricing route", () => {
  it("is absent until Configure", async () => {
    await pickDoor();
    expect(maybe("so-homeowner")).toBeNull();
    expect(maybe("so-homeowner-quote")).toBeNull();
  });

  it("moves into the configurator once it is open", async () => {
    await configured();
    expect(maybe("so-homeowner")).toBeTruthy();
    expect(maybe("so-homeowner-quote")).toBeNull();
  });

  it("goes away again on Change door", async () => {
    await configured();
    expect(maybe("so-homeowner")).toBeTruthy();
    fireEvent.click(maybe("so-back")!);
    await settle();
    expect(maybe("so-homeowner")).toBeNull();
    expect(maybe("so-homeowner-quote")).toBeNull();
  });
});

describe("special order — nothing prices before Configure", () => {
  it("offers no way to enter a price at step 1", () => {
    // Both routes need a door first: the grid needs a model to look up, and a
    // typed Clopay total needs one to be a quote for.
    render(<SpecialTool />);
    expect(document.querySelector('input[inputmode="decimal"]')).toBeNull();
    expect(maybe("so-width-ft")).toBeNull();
  });

  it("says what is still missing, step by step", () => {
    render(<SpecialTool />);
    const note = () => maybe("so-not-ready")?.textContent ?? "";
    expect(note()).toMatch(/residential or commercial/i);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    expect(note()).toMatch(/collection/i);
  });

  it("tells the counter to press Configure once a model is chosen", async () => {
    await pickDoor();
    expect(maybe("so-not-ready")?.textContent).toMatch(/Configure/i);
  });

  it("opens both routes on Configure", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    // The size picker for the grid, and the Clopay total for anything it
    // cannot build.
    expect(maybe("so-width-ft")).toBeTruthy();
    expect(document.querySelector('input[inputmode="decimal"]')).toBeTruthy();
    expect(maybe("so-not-ready")).toBeNull();
  });

  it("closes them again on Change door", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    fireEvent.click(maybe("so-back")!);
    await settle();
    expect(document.querySelector('input[inputmode="decimal"]')).toBeNull();
    expect(maybe("so-not-ready")).toBeTruthy();
  });
});

describe("special order — the Clopay total is always reachable", () => {
  /** Pick a manufacturer and collection, then whatever model it offers. */
  async function pick(mfr: string, collection: string) {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    fireEvent.change(sel("so-mfr"), { target: { value: mfr } });
    const ser = maybe("so-series") as HTMLSelectElement | null;
    if (ser && [...ser.options].some((o) => o.value === collection)) {
      fireEvent.change(ser, { target: { value: collection } });
    }
    await settle();
    const m = maybe("so-model") as HTMLSelectElement | null;
    const v = [...(m?.options ?? [])].map((o) => o.value).filter(Boolean)[0];
    if (m && v) fireEvent.change(m, { target: { value: v } });
    await settle();
  }
  const totalField = () => document.querySelector('input[inputmode="decimal"]');

  it("shows it straight away for a model with no grid", async () => {
    // Gallery, Canyon Ridge, Coachman and every outside manufacturer price off
    // a typed Clopay total. They have no configurator, so no Configure button,
    // so gating the field behind Configure made it unreachable — which is most
    // of the special order catalogue.
        for (const c of ["Canyon Ridge Collection"]) {
      cleanup();
      await pick("Clopay", c);
      expect(maybe("so-configure"), c).toBeNull();
      expect(totalField(), c).toBeTruthy();
    }
  });

  it("shows it for an outside manufacturer too", async () => {
    await pick("Haas", "Haas Doors");
    expect(totalField()).toBeTruthy();
  });

  it("still waits for Configure on a gridded model", async () => {
    // There the size picker is the primary route, and the total is the fallback
    // for anything the grid cannot build — so both appear together.
    await pick("Clopay", "Premium Steel Collection");
    expect(maybe("so-configure")).toBeTruthy();
    expect(totalField()).toBeNull();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(totalField()).toBeTruthy();
  });

  it("shows nothing before a model is chosen", async () => {
    render(<SpecialTool />);
    expect(totalField()).toBeNull();
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    expect(totalField()).toBeNull();
  });
});

describe("special order — Bridgeport Steel from its own sheets (12/10/2026)", () => {
  async function pickBridgeport(member = "BD1NU") {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Bridgeport Collection" } });
    const m = sel("so-model");
    const v = [...m.options].map((o) => o.value).find((x) => x.endsWith(`:${member}`));
    fireEvent.change(m, { target: { value: v } });
    await settle();
  }
  const total = async () => (await copiedQbLine(screen.getByTestId("copy-qb"))).rate;

  it("lists the six gridded designs first, each on its own, the C designs marked new", async () => {
    await pickBridgeport();
    const labels = [...sel("so-model").options].map((o) => o.textContent).slice(1, 7);
    expect(labels).toEqual(["BD1EU", "BD1NU", "BD1CU (new)", "BD2EU", "BD2NU", "BD2CU (new)"]);
    expect(maybe("so-configure")).toBeTruthy();
  });

  it("offers the widths Clopay builds, prices the door and its glass, and says where windows are not built", async () => {
    await pickBridgeport();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const feet = options("so-width-ft").map((o) => o.value);
    expect(feet[1]).toBe("7");                // the BD1NU starts at 7'8"…
    fireEvent.change(sel("so-width-ft"), { target: { value: "7" } });
    expect(options("so-width-in").map((o) => o.value)).toEqual(["8", "10"]);
    fireEvent.change(sel("so-width-ft"), { target: { value: "10" } });
    expect(options("so-width-in").map((o) => o.value)).toEqual(["0"]);   // not built 10'2" to 11'4"
    expect(feet).toContain("12");             // on the sheet since 12/10/2026
    expect(feet).toContain("18");
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(await total()).toBe(937.93);        // (569 list x .898 x k + the flat $15) at 43%
    const glass = options("so-glass");
    expect(glass).toHaveLength(17);            // Solid, then the Gallery's fifteen plus 1/8" tempered; no single strength
    expect(glass[1].textContent).toBe("Double strength");
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    // Short or long windows, a free choice, in the framing.
    expect(options("so-framing").map((o) => o.textContent)).toEqual(["Plain short windows", "Plain long windows", "Inserts — short windows", "Inserts — long windows"]);
    expect(await total()).toBeCloseTo(937.93 + 200.91 / 0.57, 0);
    setWidth("14.10");
    await settle();
    expect(maybe("so-no-windows")).toBeTruthy();
    expect(options("so-glass").map((o) => o.value)).toEqual(["solid"]);
  });

  it("offers heights to 8'0\" only on the C designs, and lists the Ultra-Grain finishes", async () => {
    await pickBridgeport("BD2CU");
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const heights = options("so-height-ft").map((o) => o.value).filter(Boolean);
    expect(heights.slice(-1)[0]).toBe("8");
    expect([...sel("so-color").options].map((o) => o.value)).toContain("Ultra-Grain Oak Medium Finish");
  });
});

describe("special order — the four Gallery pairs from CJ's workbook (12/10/2026)", () => {
  async function pickGallery(member: string) {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Gallery Collection" } });
    const m = sel("so-model");
    const v = [...m.options].map((o) => o.value).find((x) => x.endsWith(`:${member}`));
    fireEvent.change(m, { target: { value: v } });
    await settle();
  }
  const total = async () => (await copiedQbLine(screen.getByTestId("copy-qb"))).rate;

  it("lists the eight gridded models first, each on its own", async () => {
    await pickGallery("GD2SU");
    const labels = [...sel("so-model").options].map((o) => o.textContent).slice(1, 9);
    expect(labels).toEqual(["GD1LP", "GD1SP", "GD2LP", "GD2SP", "GD1LU", "GD1SU", "GD2LU", "GD2SU"]);
    expect(maybe("so-configure")).toBeTruthy();
  });

  it("configures a GD2SU off its own sheet: list x .823 at 45%, the Gallery's fifteen glass types", async () => {
    await pickGallery("GD2SU");
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(options("so-width-ft").map((o) => o.value)[1]).toBe("6");
    expect(options("so-width-ft").map((o) => o.value).slice(-1)[0]).toBe("20");
    fireEvent.change(sel("so-width-ft"), { target: { value: "6" } });
    expect(options("so-width-in").map((o) => o.value)).toEqual(["2", "4", "6", "8", "10"]);   // the GD2SU starts at 6'2"
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(await total()).toBe(Math.round((704 * 0.823 * (0.99 / (1 - 0.0265)) + 15) / 0.55 * 100) / 100); // the flat $15 on every door
    expect(options("so-glass")).toHaveLength(16);   // Solid, then the Gallery's fifteen
    expect(options("so-color").map((o) => o.value)).toContain("Ultra-Grain Oak Medium Finish");
  });
});

describe("special order — the Coachman from CJ's sheet (12/10/2026)", () => {
  async function pickCoachman() {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Coachman Collection" } });
    const m = sel("so-model");
    const v = [...m.options].map((o) => o.value).find((x) => x.endsWith(":CD"));
    fireEvent.change(m, { target: { value: v } });
    await settle();
    fireEvent.click(maybe("so-configure")!);
    await settle();
  }
  const total = async () => (await copiedQbLine(screen.getByTestId("copy-qb"))).rate;
  const K = 0.99 / (1 - 0.0265);
  const sell = (list: number) => Math.round(((list * 1.193 * K + 15) / 0.59) * 100) / 100;

  it("offers the 26 Coachman widths, 7' to 10', torsion only, and prices off the sheet", async () => {
    await pickCoachman();
    const feet = options("so-width-ft").map((o) => o.value).filter(Boolean);
    expect(feet).toEqual(["6", "7", "8", "9", "10", "12", "13", "14", "15", "16", "17", "18"]);   // the 26 Coachman widths, by foot
    fireEvent.change(sel("so-width-ft"), { target: { value: "6" } });
    expect(options("so-width-in").map((o) => o.value)).toEqual(["2", "4"]);
    fireEvent.change(sel("so-width-ft"), { target: { value: "15" } });
    expect(options("so-width-in").map((o) => o.value)).toEqual(["0", "2", "6", "8"]);
    expect(options("so-height-ft").map((o) => o.value)).toContain("10");
    setWidth("16");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(await total()).toBe(sell(2127));
    expect([...sel("so-spring").options].map((o) => o.value)).toEqual(["torsion", "galvanized"]);
    expect([...sel("so-color").options].map((o) => o.value)).not.toContain("Ultra-Grain Oak Medium Finish");
  });

  it("names the window choices as the sheet does: glass top section, the other glass, arch windows", async () => {
    await pickCoachman();
    setWidth("16");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(options("so-glass").map((o) => o.textContent)).toEqual(["Solid — no windows", "Double strength", "Obscure", "Frosted DSB", "Rain DSB", "Seeded DSB"]);
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    // The framing names the glass design — ten, at no adder — then the arch sections the sheet prices at 16'.
    const framing = options("so-framing").map((o) => o.value);
    expect(framing.slice(0, 10)).toEqual(["design:ARCH1", "design:ARCH3", "design:ARCH4", "design:ARCH13", "design:ARCH14", "design:REC11", "design:REC13", "design:REC14", "design:SQ23", "design:SQ24"]);
    expect(framing.slice(10)).toEqual(["arch:ARC13A", "arch:ARC14A", "arch:ARC1A", "arch:ARC3A", "arch:ARC4A"]);
    expect(maybe("so-windesign")).toBeNull();                                 // no separate insert list on the Coachman
    expect(await total()).toBe(Math.round((sell(2127) + Math.round(435 * 1.193 * K * 100) / 100 / 0.59) * 100) / 100);
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/ARCH1 DOUBLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION/i);
    fireEvent.change(sel("so-framing"), { target: { value: "design:REC13" } });
    await settle();
    expect(await total()).toBe(Math.round((sell(2127) + Math.round(435 * 1.193 * K * 100) / 100 / 0.59) * 100) / 100);
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/REC13 DOUBLE STRENGTH B GRADE WINDOWS IN THE TOP SECTION/i);
    fireEvent.change(sel("so-glass"), { target: { value: "rain" } });
    await settle();
    // Rain on a 16' door: CJ's 4-window rain figure over the solid door; no arch sections with a special glass.
    expect(options("so-framing")).toHaveLength(10);
    expect(await total()).toBe(Math.round((sell(2127) + 903.85 / 0.59) * 100) / 100);
    // An arch section goes with the plain glass top section.
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    fireEvent.change(sel("so-framing"), { target: { value: "arch:ARC1A" } });
    await settle();
    expect(await total()).toBe(Math.round((sell(2127) + 1055.5 / 0.59) * 100) / 100);
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/COACHMAN COLLECTION, MODEL CD, 16'0" X 7'0", IN THE COLOR WHITE, ARC1A WINDOWS IN THE TOP SECTION/i);
  });

  it("offers no arch section on a 2-window door, and is solid only at 14'0\"", async () => {
    await pickCoachman();
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    expect(options("so-framing").map((o) => o.value).filter((v) => v.startsWith("arch:"))).toEqual([]);   // no arch section on a 2-window door
    expect(await total()).toBe(Math.round((sell(1135) + Math.round(218 * 1.193 * K * 100) / 100 / 0.59) * 100) / 100);
    setWidth("14");
    await settle();
    expect(maybe("so-no-windows")).toBeTruthy();
    expect(options("so-glass").map((o) => o.value)).toEqual(["solid"]);
    expect(await total()).toBe(sell(1861));
  });
});
