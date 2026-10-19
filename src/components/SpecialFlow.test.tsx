// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { SpecialTool } from "./SpecialTool";
import { copiedQbLine, copyFrom } from "./test-clipboard";
import { MODERN_GLASS_TYPES } from "@/lib/pricing/data/modern-windows";
import { QB_VINYL } from "@/lib/pricing/data/quickbooks";

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

/** The first real choice in a framing list, picked — a glazed door needs one before it prices. */
const pickFraming = (value?: string) => {
  const first = value ?? options("so-framing").find((o) => o.value !== "")?.value;
  if (first) fireEvent.change(sel("so-framing"), { target: { value: first } });
};

/**
 * Every option starts blank and has to be chosen, the lock last and the door
 * priced once it is (Brandon, 19/10/2026). Fills whatever a test does not
 * care about: Solid unless a glass was picked, the first framing on a glazed
 * door, extension (torsion where that is all there is), 12" radius, bracket
 * mount, no lock. The homeowner surcharge is No on its own.
 */
async function fillOptions(o: { spring?: string; track?: string; mount?: string; lock?: string } = {}) {
  if (sel("so-glass").value === "") fireEvent.change(sel("so-glass"), { target: { value: "solid" } });
  if (!sel("so-framing").disabled && sel("so-framing").value === "") pickFraming();
  const spring = o.spring ?? (options("so-spring").some((x) => x.value === "extension") ? "extension" : "torsion");
  fireEvent.change(sel("so-spring"), { target: { value: spring } });
  fireEvent.change(sel("so-track"), { target: { value: o.track ?? "r12" } });
  fireEvent.change(sel("so-track-mount"), { target: { value: o.mount ?? "bracket" } });
  await settle();
  fireEvent.change(sel("so-lock"), { target: { value: o.lock ?? "none" } });
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
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    await fillOptions();
    // CJ's sheet (16/10/2026): the 8'0" x 7'0" door 747.62, four short double strength windows at 35 list.
    expect(await total()).toBeCloseTo(747.62 + Math.round(4 * 35 * 0.776 * (0.99 / (1 - 0.0265)) * 100) / 100 / 0.57, 1);
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_rain" } });
    await settle();
    pickFraming();
    await settle();
    // Four insulated rain windows at 130 list, at .776 and 43.
    expect(await total()).toBeCloseTo(747.62 + Math.round(4 * 130 * 0.776 * (0.99 / (1 - 0.0265)) * 100) / 100 / 0.57, 0);
  });

  it("offers the architectural windows on a Premium Steel door in the one framing list, with their glass in the one glass list (19/10/2026)", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // No series control: the window picked says which series it is from.
    expect(maybe("so-window-series")).toBeNull();
    expect(sel("so-glass").value).toBe("");
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    const framing = options("so-framing").filter((o) => o.value !== "").map((o) => o.textContent);
    expect(framing.slice(0, 6)).toEqual([
      'PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"', 'PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain",
    ]);
    expect(framing).toContain("Colonial 509 inserts");
    expect(framing).toContain("SQ24 inserts");
    // A glass only the architectural windows take frames those alone.
    fireEvent.change(sel("so-glass"), { target: { value: "seeded" } });
    await settle();
    const seeded = options("so-framing").filter((o) => o.value !== "").map((o) => o.textContent);
    expect(seeded.slice(0, 3)).toEqual(['PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1"]);
    expect(seeded).toContain("SQ24 inserts");
    expect(seeded).not.toContain("Colonial 509 inserts");
    await fillOptions();
    // Four short seeded windows at 130 list over the solid door.
    expect(await total()).toBeCloseTo(747.62 + Math.round(4 * 130 * 0.776 * (0.99 / (1 - 0.0265)) * 100) / 100 / 0.57, 0);
    fireEvent.change(sel("so-framing"), { target: { value: "arch:insert:long:SQ24" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/SEEDED DSB WINDOWS IN THE TOP SECTION, SQ24 INSERTS/i);
  });

  it("offers seventeen types at a priced width", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("9");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // Blank until chosen; then Solid, the ten standard types, single strength first, then the six only the architectural windows take — one list, like the stock tab's.
    expect(options("so-glass").map((o) => o.value)).toEqual([
      "", "solid", "ssb", "dsb", "acrylic", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
      "seeded", "insulated_seeded", "midnight_gray", "insulated_midnight_gray", "tempered_midnight_gray", "insulated_tempered_midnight_gray",
    ]);
  });

  it("offers long windows in the framing only from 8 feet", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("7");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    await fillOptions();
    // Only short windows at 7'0": the plain short windows, then the short inserts, each its own entry.
    let framing = options("so-framing").filter((o) => o.value !== "").map((o) => o.textContent);
    expect(framing[0]).toBe('PLAIN SHORT 19-1/2" X 12"');
    expect(framing[1]).toBe('PLAIN SHORT 19-1/2" X 16"');
    expect(framing.slice(2, 5)).toEqual(["Colonial 509 inserts", "Charleston 508 inserts", "Prairie 510 inserts"]);
    expect(framing).not.toContain("Charleston 608 inserts");
    expect(maybe("so-windesign")).toBeNull();                                 // no second drop-down for the design
    setWidth("12");
    await settle();
    framing = options("so-framing").filter((o) => o.value !== "").map((o) => o.textContent);
    expect(framing.slice(0, 2)).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"']);
    expect(framing.filter((l) => /\b6\d\d inserts$/.test(l ?? ""))).toEqual(["Charleston 608 inserts", "Prairie 610 inserts", "Stockton 612 inserts", "Madison 611 inserts", "Madison Arch 613 inserts"]);
    // Picking an insert from the framing is the whole choice: the line names it.
    fireEvent.change(sel("so-framing"), { target: { value: "insert:long:608" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/WINDOWS IN THE TOP SECTION, CHARLESTON 608 INSERTS/i);
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

  it("starts blank, then offers solid, single strength B grade and double strength (19/10/2026)", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(sel("so-glass").value).toBe("");
    const [blank, first, second, third] = options("so-glass");
    expect(blank.value).toBe("");
    expect(first.text).toBe("Solid — no windows");
    expect(second.text).toBe("Single strength B grade");
    expect(second.value).toBe("ssb");
    expect(third.text).toBe("Double strength");
    expect(third.value).toBe("dsb");
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
    await fillOptions();
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
    await fillOptions();
    expect(await total()).toBe(Math.round((569 * 0.898 * (0.99 / (1 - 0.0265))) / 0.57 * 100) / 100);   // 569 list x .898 x k at 43%, no flat
    const glass = options("so-glass");
    expect(glass).toHaveLength(17);            // Solid, then the Gallery's fifteen plus 1/8" tempered; no single strength
    expect(glass[1].textContent).toBe("Double strength");
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    // Short or long windows, a free choice, in the framing: the plain windows, then each insert in its window.
    expect(options("so-framing").filter((o) => o.value !== "").map((o) => o.textContent)).toEqual([
      'PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain",
      "SQ22 inserts", "REC12 inserts", "SQ24 inserts", "REC14 inserts",
      "Arch 1 Grille inserts", "Arch 1 Vertical Grille inserts", "Arch 2 Grille inserts", "Arch 2 Vertical Grille inserts",
    ]);
    pickFraming();
    await settle();
    expect(await total()).toBeCloseTo(Math.round((569 * 0.898 * (0.99 / (1 - 0.0265))) / 0.57 * 100) / 100 + 200.91 / 0.57, 0);
    setWidth("14.10");
    await settle();
    expect(maybe("so-no-windows")).toBeTruthy();
    expect(options("so-glass").map((o) => o.value)).toEqual(["", "solid"]);
  });

  it("offers heights to 8'0\" only on the C designs, and lists the Ultra-Grain finishes", async () => {
    await pickBridgeport("BD2CU");
    fireEvent.click(maybe("so-configure")!);
    await settle();
    const heights = options("so-height-ft").map((o) => o.value).filter(Boolean);
    expect(heights.slice(-1)[0]).toBe("8");
    expect([...sel("so-color").options].map((o) => o.value)).toContain("Ultra-Grain Oak Medium Finish");
  });

  it("asks the C designs for their inlay design and inlay colour, and prices torsion at 55 (Brandon, 12/10/2026)", async () => {
    await pickBridgeport("BD2CU");
    expect(maybe("so-design")).toBeNull();                        // step 1 has no configurator yet
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(maybe("so-design")).toBeTruthy();
    expect(maybe("so-overlay")).toBeTruthy();
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(maybe("copy-qb")).toBeNull();                          // no price until the design is chosen
    expect(options("so-design").map((o) => o.textContent)).toEqual(["Select design…", "Design A", "Design V", "Design X"]);
    fireEvent.change(sel("so-design"), { target: { value: "V" } });
    await settle();
    expect(sel("so-overlay").value).toBe("White");
    expect(options("so-overlay").map((o) => o.value)).not.toContain("Ultra-Grain Oak Medium Finish");
    expect(maybe("copy-qb")).toBeNull();                          // nor until every option is chosen
    await fillOptions();
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.description).toMatch(/MODEL BD2CU, DESIGN V, 8'0" X 7'0", IN THE COLOR WHITE, INLAY IN THE COLOR WHITE, SOLID NO WINDOWS/i);
    const extension = line.rate;
    fireEvent.change(sel("so-overlay"), { target: { value: "Charcoal" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/IN THE COLOR WHITE, INLAY IN THE COLOR CHARCOAL/i);
    expect(await total()).toBe(extension);                        // a standard inlay colour: words only
    // A premium inlay prices the door as a premium colour would.
    fireEvent.change(sel("so-overlay"), { target: { value: "Iron Ore" } });
    await settle();
    const premium = await total();
    expect(premium).toBeGreaterThan(extension);
    fireEvent.change(sel("so-color"), { target: { value: "Iron Ore" } });
    await settle();
    expect(await total()).toBe(premium);
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    fireEvent.change(sel("so-overlay"), { target: { value: "White" } });
    await settle();
    expect(await total()).toBe(extension);
    fireEvent.change(sel("so-spring"), { target: { value: "torsion" } });
    await settle();
    expect(await total()).toBe(Math.round((extension + 55) * 100) / 100);   // 55 on a single door; galvanized the same
    fireEvent.change(sel("so-spring"), { target: { value: "galvanized" } });
    await settle();
    expect(await total()).toBe(Math.round((extension + 55) * 100) / 100);
    // The oak inlays are offered after the paint colours.
    expect(options("so-overlay").map((o) => o.value).slice(-4)).toEqual(["Medium Oak", "Dark Oak", "Walnut Oak", "Slate Oak"]);
  });

  it("asks the N and E designs for no design, as before", async () => {
    await pickBridgeport("BD1NU");
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(maybe("so-design")).toBeNull();
    expect(maybe("so-overlay")).toBeNull();
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
    expect(options("so-glass")).toHaveLength(17);   // blank, Solid, then the Gallery's fifteen
    await fillOptions();
    expect(await total()).toBe(Math.round((704 * 0.823 * (0.99 / (1 - 0.0265))) / 0.55 * 100) / 100); // no flat: the $15 is the Coachman's
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
  // Every Coachman's springs are priced at the galvanized rate (Brandon,
  // 13/10/2026): the sheet's torsion price plus 5 on a single door, 10 on a double.
  const at = (list: number, double: boolean, extra = 0) => Math.round((sell(list) + (double ? 10 : 5) + extra) * 100) / 100;
  const design = (d: string) => fireEvent.change(sel("so-design"), { target: { value: d } });

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
    design("12");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // Torsion or galvanized torsion, at one price (Brandon, 13/10/2026); blank until chosen.
    expect([...sel("so-spring").options].map((o) => o.value)).toEqual(["", "torsion", "galvanized"]);
    expect(sel("so-spring").value).toBe("");
    await fillOptions({ spring: "torsion" });
    expect(await total()).toBe(at(2127, true));
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/12″ RADIUS TRACK, TORSION SPRINGS, NO LOCK/i);
    fireEvent.change(sel("so-spring"), { target: { value: "galvanized" } });
    await settle();
    expect(await total()).toBe(at(2127, true));
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/GALVANIZED TORSION SPRINGS/i);
    expect([...sel("so-color").options].map((o) => o.value)).not.toContain("Ultra-Grain Oak Medium Finish");
  });

  it("asks for the design Clopay builds at the size, and the overlay colour under the colour (Brandon, 12/10/2026)", async () => {
    await pickCoachman();
    expect(maybe("so-design")).toBeTruthy();
    expect(maybe("so-overlay")).toBeTruthy();
    setWidth("16");
    setHeight("7");
    // No price until the design is chosen.
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(maybe("copy-qb")).toBeNull();
    expect(options("so-design").map((o) => o.value)).toEqual(["", "11", "12", "13", "21", "22", "23", "31", "32", "33", "34", "35", "36", "41", "42", "43"]);
    expect(options("so-design")[1].textContent).toBe("Design 11");
    design("12");
    await settle();
    // The overlay follows the door's colour until one is picked.
    expect(options("so-overlay").map((o) => o.value)).toEqual(["White", "Almond", "Desert Tan", "Sandtone"]);
    expect(sel("so-overlay").value).toBe("White");
    await fillOptions({ spring: "torsion" });
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description)
      .toMatch(/COACHMAN COLLECTION, MODEL CD12, 16'0" X 7'0", IN THE COLOR WHITE, OVERLAYS IN THE COLOR WHITE, SOLID NO WINDOWS/i);
    fireEvent.change(sel("so-overlay"), { target: { value: "Sandtone" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/IN THE COLOR WHITE, OVERLAYS IN THE COLOR SANDTONE/i);
    expect(await total()).toBe(at(2127, true));                              // words only
    // Designs 22, 23, 34 and 35 are not built at 12'0"; design 21 is not built at 8'3".
    setWidth("12");
    await settle();
    expect(options("so-design").map((o) => o.value)).toEqual(["11", "12", "13", "21", "31", "32", "33", "36", "41", "42", "43"]);
    setHeight("8.3");
    await settle();
    expect(options("so-design").map((o) => o.value)).not.toContain("21");
    // A series 3 or 4 design is solid only.
    design("31");
    await settle();
    expect(options("so-glass").map((o) => o.value)).toEqual(["solid"]);
    expect(maybe("so-no-windows")).toBeNull();                       // no note: the glass list says it
    design("13");
    await settle();
    expect(options("so-glass").map((o) => o.value)).toEqual(["solid", "dsb", "obscure", "frosted", "rain", "seeded"]);
  });

  it("configures the window section by design, with the glass over it (CJ's workbook of 13/10/2026)", async () => {
    await pickCoachman();
    setWidth("16");
    setHeight("7");
    design("12");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(options("so-glass").map((o) => o.textContent)).toEqual(["Select…", "Solid — no windows", "Double strength", "Obscure", "Frosted DSB", "Rain DSB", "Seeded DSB"]);
    expect(sel("so-framing")).toHaveProperty("disabled", true);
    await fillOptions({ spring: "torsion" });
    expect(await total()).toBe(at(2127, true));
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    // Framing lists the window designs and the arched sections the sheet builds at 16'0" — blank until one is chosen.
    expect(options("so-framing").map((o) => o.textContent)).toEqual([
      "Select…", "ARCH1", "ARCH3", "ARCH4", "ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24",
      "ARC13A arch section", "ARC14A arch section", "ARC1A arch section", "ARC3A arch section", "ARC4A arch section",
    ]);
    expect(maybe("copy-qb")).toBeNull();
    const adder = (list: number) => Math.round((Math.round(list * 1.193 * K * 100) / 100) / 0.59 * 100) / 100;
    pickFraming("design:ARCH1");
    await settle();
    expect(await total()).toBe(at(2127, true, adder(435)));                               // ARCH1: 435 over the solid door
    fireEvent.change(sel("so-framing"), { target: { value: "design:ARCH4" } });
    await settle();
    expect(await total()).toBe(at(2127, true, adder(870)));
    fireEvent.change(sel("so-framing"), { target: { value: "design:ARC1A" } });
    await settle();
    expect(await total()).toBe(at(2127, true, adder(870)));
    fireEvent.change(sel("so-glass"), { target: { value: "seeded" } });
    await settle();
    expect(await total()).toBe(at(2127, true, adder(870 + 550)));                        // the glass over the double strength door, 4 windows
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.description).toMatch(/IN THE COLOR WHITE, OVERLAYS IN THE COLOR WHITE, SEEDED DSB WINDOWS IN THE TOP SECTION, ARC1A INSERTS, 12″ RADIUS TRACK/i);
    // 8'0": the two-window designs only, ARCH1 at 218 and ARCH4 at 436 — the arched section chosen is not among them, so one is chosen again.
    setWidth("8");
    await settle();
    expect(options("so-framing").filter((o) => o.value !== "")).toHaveLength(10);
    expect(sel("so-framing").value).toBe("");
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    fireEvent.change(sel("so-framing"), { target: { value: "design:ARCH1" } });
    await settle();
    expect(await total()).toBe(at(1135, false, adder(218)));
    fireEvent.change(sel("so-framing"), { target: { value: "design:ARCH4" } });
    await settle();
    expect(await total()).toBe(at(1135, false, adder(436)));
    // 14'0": solid only — the glass chosen is gone, so it is chosen again.
    setWidth("14");
    await settle();
    expect(options("so-glass").map((o) => o.value)).toEqual(["", "solid"]);
    expect(maybe("so-no-windows")).toBeTruthy();
    fireEvent.change(sel("so-glass"), { target: { value: "solid" } });
    await settle();
    expect(await total()).toBe(at(1861, true));
  });
});

describe("special order — high lift is the 4050 family's (Brandon, 13/10/2026)", () => {
  async function pickGallery(member: string) {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Gallery Collection" } });
    const m = sel("so-model");
    fireEvent.change(m, { target: { value: [...m.options].map((o) => o.value).find((x) => x.endsWith(`:${member}`)) } });
    await settle();
    fireEvent.click(maybe("so-configure")!);
    await settle();
  }

  it("offers high lift on a 4050 with torsion, and on nothing else", async () => {
    await configured();
    fireEvent.change(sel("so-spring"), { target: { value: "torsion" } });
    await settle();
    expect(options("so-track").map((o) => o.value)).toContain("high_lift");
    cleanup();
    await pickGallery("GD2SU");
    expect(document.body.textContent).toMatch(/the spring depends on the door size/i);
    expect(document.body.textContent).not.toMatch(/high lift/i);
    setWidth("16");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    fireEvent.change(sel("so-spring"), { target: { value: "torsion" } });
    await settle();
    expect(options("so-track").map((o) => o.value)).toEqual(["", "r10", "r12", "r15", "low_headroom", "r20", "r32"]);
    expect(maybe("so-high-lift")).toBeNull();
    expect(maybe("so-incline")).toBeNull();
  });

  it("still names what the 4050's track group waits for", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.body.textContent).toMatch(/high lift and spring depend on the door size/i);
  });
});

describe("special order — vinyl molding on a configured door (Brandon, 14/10/2026)", () => {
  it("asks once the door prices, puts a Yes on the copy as the vinyl line, and can change its mind in the card", async () => {
    await configured("9", "7");
    // Not before the lock, which is the last choice (19/10/2026).
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    await fillOptions();
    // Asked as the stock tab asks, in the vinyl that matches the door's colour.
    expect(screen.getByTestId("vinyl-prompt").textContent).toContain("WHITE vinyl");
    expect(screen.getByTestId("vinyl-prompt").textContent).toContain("9'0\" x 7'0\"");
    fireEvent.click(screen.getByTestId("vinyl-ask-yes"));
    await settle();
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    expect(screen.getByTestId("so-vinyl-line").textContent?.trim()).toBe("WHITE vinyl (1) 9FT & (2) 7FT");
    const rows = (await copyFrom(screen.getByTestId("copy-qb"))).split("\n");
    expect(rows).toHaveLength(3);
    expect(rows[1]).toBe("");
    expect(rows[2].split("\t")).toEqual([QB_VINYL, "WHITE VINYL STOP MOLDING,  [1] - 9FT AND [2] - 7FT", "23", "0.95"]);
    // A change of track does not ask again; No in the card drops the line.
    fireEvent.change(sel("so-track"), { target: { value: "r15" } });
    await settle();
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    fireEvent.click(screen.getByTestId("so-vinyl-no"));
    await settle();
    expect(screen.queryByTestId("so-vinyl-line")).toBeNull();
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
  });

  it("No copies the door line alone", async () => {
    await configured("9", "7");
    await fillOptions();
    fireEvent.click(screen.getByTestId("vinyl-ask-no"));
    await settle();
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    expect(screen.getByTestId("so-vinyl-row")).toBeTruthy();
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
  });

  it("prices nothing until every option is chosen, the lock last (Brandon, 19/10/2026)", async () => {
    await configured("9", "7");
    for (const id of ["so-glass", "so-spring", "so-track", "so-track-mount", "so-lock"]) expect(sel(id).value, id).toBe("");
    expect(sel("so-homeowner").value).toBe("no");                          // the one option with an answer of its own
    expect(sel("so-lock").disabled).toBe(true);
    expect(maybe("copy-qb")).toBeNull();
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    fireEvent.change(sel("so-spring"), { target: { value: "extension" } });
    fireEvent.change(sel("so-track"), { target: { value: "r12" } });
    fireEvent.change(sel("so-track-mount"), { target: { value: "bracket" } });
    await settle();
    // A glazed door needs its framing too.
    expect(sel("so-lock").disabled).toBe(true);
    pickFraming();
    await settle();
    expect(sel("so-lock").disabled).toBe(false);
    expect(maybe("copy-qb")).toBeNull();
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    fireEvent.change(sel("so-lock"), { target: { value: "slide" } });
    await settle();
    expect(maybe("copy-qb")).toBeTruthy();
    expect(screen.getByTestId("vinyl-prompt")).toBeTruthy();
    // Taking an option away closes the lock and the price again.
    fireEvent.change(sel("so-spring"), { target: { value: "" } });
    await settle();
    expect(sel("so-lock").disabled).toBe(true);
    expect(maybe("copy-qb")).toBeNull();
  });

  it("never asks on a typed-in total", async () => {
    await pickDoor();
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    expect(screen.queryByTestId("so-vinyl-row")).toBeNull();
  });
});

describe("special order — a Modern Steel door's windows on the door drawing (Brandon, 19/10/2026)", () => {
  async function pickModern(model: string) {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Modern Collection" } });
    const m = sel("so-model");
    fireEvent.change(m, { target: { value: [...m.options].map((o) => o.value).find((x) => x === model || x.endsWith(`:${model}`)) } });
    await settle();
    fireEvent.click(maybe("so-configure")!);
    await settle();
  }

  it("draws the door as Clopay stacks it, takes a window per press, and prices each at CJ's rate", async () => {
    await pickModern("4308");
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // The contemporary glass as the 4308-4309 sheet lists it, no section-glazed question, and no drawing until the windows' framing is chosen.
    expect(options("so-glass").map((o) => o.value)).toEqual(["", "solid", ...MODERN_GLASS_TYPES.map((g) => g.id)]);
    expect(maybe("so-section")).toBeNull();
    expect(maybe("door-diagram")).toBeNull();
    fireEvent.change(sel("so-glass"), { target: { value: "tempered" } });
    await settle();
    // Tempered comes short or long, plain or in a grille design, as Clopay's list names them; the slim window is the insulated glass's.
    expect(options("so-framing").map((o) => o.value)).toEqual(["", "short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24"]);
    expect(options("so-framing").map((o) => o.text).slice(1, 3)).toEqual(["PLAIN SHORT 19 1/2 X 16", "PLAIN LONG 42 X 16"]);
    expect(maybe("door-diagram")).toBeNull();
    fireEvent.change(sel("so-framing"), { target: { value: "short" } });
    await settle();
    // 8'0" x 7'0": four 21" sections, four short windows across.
    expect(document.querySelectorAll(".dsec")).toHaveLength(4);
    expect(document.querySelectorAll("[data-testid='door-section-1'] .dpanel")).toHaveLength(4);
    await fillOptions({ lock: "" });
    // Nothing priced until a window is pressed in and the lock chosen.
    expect(maybe("copy-qb")).toBeNull();
    expect(sel("so-lock").disabled).toBe(true);
    fireEvent.click(screen.getByTestId("door-panel-1-1-add"));
    fireEvent.click(screen.getByTestId("door-panel-1-2-add"));
    fireEvent.click(screen.getByTestId("door-panel-3-4-add"));
    await settle();
    expect(sel("so-lock").disabled).toBe(false);
    expect(screen.getByTestId("door-panel-1-1").getAttribute("data-on")).toBe("true");
    fireEvent.change(sel("so-lock"), { target: { value: "none" } });
    await settle();
    // The 8'0" x 7'0" 4308 solid (704 list at .704, at 45%) and three short tempered windows (65 list each).
    const solid = 916.39;
    const window = (list: number) => Math.round(list * 0.704 * (0.99 / (1 - 0.0265)) * 100) / 100;
    const lift = (c: number) => Math.round((c / 0.55) * 100) / 100;
    let line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + lift(window(65) * 3), 2);
    expect(line.description).toMatch(/MODEL 4308, 8'0" X 7'0", IN THE COLOR WHITE, 1\/8" TEMPERED WINDOWS IN SECTION 1 PANELS 1, 2 AND SECTION 3 PANEL 4, PLAIN SHORT 19 1\/2 X 16, NO INSERTS/i);
    // The x takes one out again, and the price follows.
    fireEvent.click(screen.getByTestId("door-panel-1-2-remove"));
    await settle();
    expect(screen.getByTestId("door-panel-1-2").getAttribute("data-on")).toBe("false");
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + lift(window(65) * 2), 2);
    // Long windows: two across; the places pressed in are cleared with the framing.
    fireEvent.change(sel("so-framing"), { target: { value: "long_grilles:SQ24" } });
    await settle();
    expect(document.querySelectorAll("[data-testid='door-section-1'] .dpanel")).toHaveLength(2);
    expect(document.querySelectorAll(".dpanel.on")).toHaveLength(0);
    expect(maybe("copy-qb")).toBeNull();
    fireEvent.click(screen.getByTestId("door-panel-2-1-add"));
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + lift(window(160)), 2);
    expect(line.description).toMatch(/1\/8" TEMPERED WINDOWS IN SECTION 2 PANEL 1, SQ24 INSERTS/i);
    // Insulated glass offers the slim window, which takes the long window's places.
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_tempered_frosted" } });
    await settle();
    expect(options("so-framing").map((o) => o.value)).toEqual(["short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24", "slim:black", "slim:silver"]);
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBeCloseTo(solid + lift(window(272)), 2);
    fireEvent.change(sel("so-framing"), { target: { value: "slim:black" } });
    await settle();
    fireEvent.click(screen.getByTestId("door-panel-1-1-add"));
    fireEvent.click(screen.getByTestId("door-panel-1-2-add"));
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + lift(window(180) * 2), 2);
    expect(line.description).toMatch(/INSULATED TEMPERED FROSTED WINDOWS IN SECTION 1 PANELS 1, 2, 37 X 8 BLACK SLIM WINDOW, NO INSERTS/i);
    // The slim window's own 9/16" glass offers the slim window alone.
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_tempered_midnight_gray_916" } });
    await settle();
    expect(options("so-framing").map((o) => o.value)).toEqual(["slim:black", "slim:silver"]);
    // Solid prices off the grid as before.
    fireEvent.change(sel("so-glass"), { target: { value: "solid" } });
    await settle();
    expect(maybe("door-diagram")).toBeNull();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBe(solid);
  });

  it("lists the pairs a model each, in number order; the 9208 in the Cypress and Plank finishes at the sheet's adder", async () => {
    render(<SpecialTool />);
    fireEvent.change(sel("so-scope"), { target: { value: "residential" } });
    fireEvent.change(sel("so-mfr"), { target: { value: "Clopay" } });
    fireEvent.change(sel("so-series"), { target: { value: "Modern Collection" } });
    expect(options("so-model").map((o) => o.textContent)).toEqual(["Select…", "4138", "4308", "4309", "9138", "9139", "9208", "9209"]);
    fireEvent.change(sel("so-model"), { target: { value: "9208/9209:9208" } });
    await settle();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("16");
    setHeight("7");
    expect(options("so-color").map((o) => o.value)).toContain("Ultra-Grain Plank Kona Finish");
    expect(options("so-color").map((o) => o.value)).toContain("Charcoal");
    fireEvent.change(sel("so-color"), { target: { value: "Ultra-Grain Plank Kona Finish" } });
    await settle();
    await fillOptions();
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    // 16'0" x 7'0" 9208: 1272 list at .865 at 45%, and the double door's up-to-8ft adder, 240 list at 1.301, lifted.
    expect(line.rate).toBeCloseTo(2034.42 + Math.round((317.53 / 0.55) * 100) / 100, 2);
    expect(line.description).toMatch(/MODEL 9208, 16'0" X 7'0", IN THE COLOR ULTRA-GRAIN PLANK KONA FINISH, SOLID NO WINDOWS/i);
  });

  it("offers short windows alone under 7'8\", and a 9'0\" door five sections; the 4138 off its own sheet", async () => {
    await pickModern("4138");
    setWidth("7.6");
    setHeight("9");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    fireEvent.change(sel("so-glass"), { target: { value: "tempered_frosted" } });
    await settle();
    expect(options("so-framing").map((o) => o.value)).toEqual(["", "short", "short_grilles:REC12", "short_grilles:SQ22"]);
    fireEvent.change(sel("so-framing"), { target: { value: "short_grilles:REC12" } });
    await settle();
    expect(document.querySelectorAll(".dsec")).toHaveLength(5);
    expect(document.querySelectorAll("[data-testid='door-section-5'] .dpanel")).toHaveLength(3);
    fireEvent.click(screen.getByTestId("door-panel-5-1-add"));
    await fillOptions();
    // CJ's 4138 sheet prices no 9FT or 10FT door under 8'0", so this one is typed.
    expect(maybe("copy-qb")).toBeNull();
    expect(document.body.textContent).toMatch(/That width is not on the grid/);
    // At 8'0" high it prices: 796 list at .776, and the window 96 list.
    setHeight("8");
    await settle();
    expect(document.querySelectorAll(".dsec")).toHaveLength(4);
    fireEvent.click(screen.getByTestId("door-panel-2-2-add"));
    fireEvent.change(sel("so-spring"), { target: { value: "extension" } });
    await settle();
    const k = 0.99 / (1 - 0.0265);
    const grid = (list: number) => Math.round((list * 0.776 * k / 0.55) * 100) / 100;
    const window = (list: number) => Math.round(list * 0.776 * k * 100) / 100;
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(grid(796) + Math.round((window(96) / 0.55) * 100) / 100, 2);
    expect(line.description).toMatch(/MODEL 4138, 7'6" X 8'0", IN THE COLOR WHITE, 1\/8" TEMPERED FROSTED WINDOWS IN SECTION 2 PANEL 2, REC12 INSERTS/i);
  });
});
