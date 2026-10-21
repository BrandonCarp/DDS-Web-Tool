// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { SpecialTool } from "./SpecialTool";
import { copiedQbLine, copyFrom } from "./test-clipboard";
import { MODERN_GLASS_TYPES } from "@/lib/pricing/data/modern-windows";
import { QB_PARTS, QB_VINYL } from "@/lib/pricing/data/quickbooks";

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

/** The first real choice in a framing list, picked — the framing comes first (Brandon, 20/10/2026): no window, no glass. */
const pickFraming = (value?: string) => {
  const first = value ?? options("so-framing").find((o) => o.value !== "")?.value;
  if (first) fireEvent.change(sel("so-framing"), { target: { value: first } });
};
/** The framing list's real choices, by label. */
const framingLabels = () => options("so-framing").filter((o) => o.value !== "").map((o) => o.textContent);

/**
 * Every option starts blank and has to be chosen, the lock last and the door
 * priced once it is (Brandon, 19/10/2026). Fills whatever a test does not
 * care about: extension (torsion where that is all there is), 12" radius,
 * bracket mount, no lock. The homeowner surcharge is No on its own; the door
 * is solid unless a framing was picked.
 */
async function fillOptions(o: { spring?: string; track?: string; mount?: string; lock?: string } = {}) {
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
    // The framing first; the plain short window comes in single strength, then double strength.
    pickFraming();
    await settle();
    expect(options("so-glass").map((o) => o.value).slice(0, 2)).toEqual(["ssb", "dsb"]);
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    await fillOptions();
    // Double strength is not the stock book's glass, so this is not the floored 4050 (723.25) but the sheet's 747.62 (Brandon, 21/10/2026), with CJ's windows over it: four short double strength at 35 list.
    expect(await total()).toBeCloseTo(747.62 + Math.round(4 * 35 * 0.776 * (0.99 / (1 - 0.0265)) * 100) / 100 / 0.57, 1);
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_rain" } });
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
    expect(sel("so-framing").value).toBe("");
    // Every window at the width in the one list, Solid first — both series' plain windows, then the inserts of each.
    expect(options("so-framing")[0].textContent).toBe("Solid — no windows");
    const framing = framingLabels();
    expect(framing.slice(0, 6)).toEqual([
      'PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"', 'PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain",
    ]);
    expect(framing).toContain("Colonial 509 inserts");
    expect(framing).toContain("SQ24 inserts");
    // A standard window comes in the standard glass alone; an architectural one in its own.
    pickFraming('plain:short:PLAIN SHORT 19-1/2" X 12"');
    await settle();
    expect(options("so-glass").map((o) => o.value)).not.toContain("seeded");
    expect(options("so-glass").map((o) => o.value)).toContain("acrylic");
    pickFraming('arch:plain:short:PLAIN SHORT 19-1/2" X 16"');
    await settle();
    expect(options("so-glass").map((o) => o.value)).toContain("seeded");
    expect(options("so-glass").map((o) => o.value)).not.toContain("acrylic");
    fireEvent.change(sel("so-glass"), { target: { value: "seeded" } });
    await settle();
    await fillOptions();
    // Four short seeded windows at 130 list over the solid door.
    expect(await total()).toBeCloseTo(747.62 + Math.round(4 * 130 * 0.776 * (0.99 / (1 - 0.0265)) * 100) / 100 / 0.57, 0);   // the sheet's door under the architectural windows (21/10/2026)
    // The glass stays through a framing change to a window that comes in it.
    fireEvent.change(sel("so-framing"), { target: { value: "arch:insert:long:SQ24" } });
    await settle();
    expect(sel("so-glass").value).toBe("seeded");
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/SEEDED DSB WINDOWS IN THE TOP SECTION,  SQ24 INSERTS/i);
    // …and gives way to the first the window comes in where it does not.
    fireEvent.change(sel("so-framing"), { target: { value: "insert:short:509" } });
    await settle();
    expect(sel("so-glass").value).toBe("ssb");
  });

  it("offers the standard glass behind a standard window and the architectural behind an architectural one, sixteen types in all at a priced width", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("9");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // Nothing until a window is chosen; the plain short window in the ten standard types, single strength first; the architectural short window in the fourteen it takes — the six only it takes last — one list each, like the stock tab's.
    expect(options("so-glass").map((o) => o.value)).toEqual([""]);
    pickFraming('plain:short:PLAIN SHORT 19-1/2" X 12"');
    await settle();
    expect(options("so-glass").map((o) => o.value)).toEqual([
      "ssb", "dsb", "acrylic", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
    ]);
    pickFraming('arch:plain:short:PLAIN SHORT 19-1/2" X 16"');
    await settle();
    expect(options("so-glass").map((o) => o.value)).toEqual([
      "dsb", "obscure", "insulated", "insulated_obscure", "frosted", "insulated_frosted", "rain", "insulated_rain",
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
    await fillOptions();
    // Only short windows at 7'0": the plain short windows, then the short inserts, each its own entry.
    let framing = framingLabels();
    expect(framing[0]).toBe('PLAIN SHORT 19-1/2" X 12"');
    expect(framing[1]).toBe('PLAIN SHORT 19-1/2" X 16"');
    expect(framing.slice(2, 5)).toEqual(["Colonial 509 inserts", "Charleston 508 inserts", "Prairie 510 inserts"]);
    expect(framing).not.toContain("Charleston 608 inserts");
    expect(maybe("so-windesign")).toBeNull();                                 // no second drop-down for the design
    setWidth("12");
    await settle();
    framing = framingLabels();
    expect(framing.slice(0, 2)).toEqual(['PLAIN SHORT 19-1/2" X 12"', 'PLAIN LONG 40-1/2" X 12"']);
    expect(framing.filter((l) => /\b6\d\d inserts$/.test(l ?? ""))).toEqual(["Charleston 608 inserts", "Prairie 610 inserts", "Stockton 612 inserts", "Madison 611 inserts", "Madison Arch 613 inserts"]);
    // Picking an insert from the framing is the whole choice: the line names it, in the first glass it comes in.
    fireEvent.change(sel("so-framing"), { target: { value: "insert:long:608" } });
    await settle();
    expect(sel("so-glass").value).toBe("ssb");
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/WINDOWS IN THE TOP SECTION,  CHARLESTON 608 INSERTS/i);
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

  it("starts solid — the framing Solid, the glass empty and greyed — then a window picked offers single strength B grade and double strength (20/10/2026)", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(sel("so-framing").value).toBe("");
    expect(options("so-framing")[0].text).toBe("Solid — no windows");
    expect(sel("so-glass").value).toBe("");
    expect(sel("so-glass").disabled).toBe(true);
    expect(options("so-glass").map((o) => o.text)).toEqual([""]);
    pickFraming();
    await settle();
    expect(sel("so-glass").disabled).toBe(false);
    const [first, second] = options("so-glass");
    expect(first.text).toBe("Single strength B grade");
    expect(first.value).toBe("ssb");
    expect(second.text).toBe("Double strength");
    expect(second.value).toBe("dsb");
    expect(sel("so-glass").value).toBe("ssb");
    // Back to Solid: the glass follows.
    fireEvent.change(sel("so-framing"), { target: { value: "" } });
    await settle();
    expect(sel("so-glass").value).toBe("");
    expect(sel("so-glass").disabled).toBe(true);
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
    expect(off("so-framing")).toBe(true);
    setWidth("9");
    setHeight("7");
    expect(off("so-color")).toBe(false);
    expect(sel("so-color").value).toBe("");
    expect(off("so-framing")).toBe(true);
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    expect(off("so-framing")).toBe(false);
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
    // Short or long windows, a free choice, in the framing first: the plain windows, then each insert in its window.
    expect(framingLabels()).toEqual([
      'PLAIN SHORT 19-1/2" X 16"', 'PLAIN LONG 42" X 16"', "PLAIN ARCH 1", "Arch 2 Plain",
      "SQ22 inserts", "REC12 inserts", "SQ24 inserts", "REC14 inserts",
      "Arch 1 Grille inserts", "Arch 1 Vertical Grille inserts", "Arch 2 Grille inserts", "Arch 2 Vertical Grille inserts",
    ]);
    pickFraming();
    await settle();
    const glass = options("so-glass");
    expect(glass).toHaveLength(16);            // the Gallery's fifteen plus 1/8" tempered; no single strength, no Solid
    expect(glass[0].textContent).toBe("Double strength");
    expect(sel("so-glass").value).toBe("dsb");
    expect(await total()).toBeCloseTo(Math.round((569 * 0.898 * (0.99 / (1 - 0.0265))) / 0.57 * 100) / 100 + 200.91 / 0.57, 0);
    setWidth("14.10");
    await settle();
    expect(maybe("so-no-windows")).toBeTruthy();
    expect(options("so-framing").map((o) => o.value)).toEqual([""]);
    expect(options("so-glass").map((o) => o.value)).toEqual([""]);
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
    // Priced at the defaults as soon as the design is chosen (20/10/2026).
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.description).toMatch(/MODEL BD2CU,  DESIGN V,  8'0" X 7'0",  IN THE COLOR WHITE,  INLAY IN THE COLOR WHITE,  SOLID NO WINDOWS/i);
    const extension = line.rate;
    fireEvent.change(sel("so-overlay"), { target: { value: "Charcoal" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/IN THE COLOR WHITE,  INLAY IN THE COLOR CHARCOAL/i);
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
    pickFraming();
    await settle();
    expect(options("so-glass")).toHaveLength(15);   // the Gallery's fifteen, once a window is chosen
    fireEvent.change(sel("so-framing"), { target: { value: "" } });
    await settle();
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
    // Torsion or galvanized torsion, at one price (Brandon, 13/10/2026); torsion from the start.
    expect([...sel("so-spring").options].map((o) => o.value)).toEqual(["torsion", "galvanized"]);
    expect(sel("so-spring").value).toBe("torsion");
    expect(await total()).toBe(at(2127, true));
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/12″ RADIUS TRACK,  FRONT TORSION SPRINGS,  NO LOCK/i);
    fireEvent.change(sel("so-spring"), { target: { value: "galvanized" } });
    await settle();
    expect(await total()).toBe(at(2127, true));
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/GALVANIZED FRONT TORSION SPRINGS/i);
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
      .toMatch(/COACHMAN COLLECTION,  MODEL CD12,  16'0" X 7'0",  IN THE COLOR WHITE,  OVERLAYS IN THE COLOR WHITE,  SOLID NO WINDOWS/i);
    fireEvent.change(sel("so-overlay"), { target: { value: "Sandtone" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/IN THE COLOR WHITE,  OVERLAYS IN THE COLOR SANDTONE/i);
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
    expect(options("so-framing").map((o) => o.value)).toEqual([""]);
    expect(options("so-glass").map((o) => o.value)).toEqual([""]);
    expect(maybe("so-no-windows")).toBeNull();                       // no note: the framing list says it
    design("13");
    await settle();
    expect(options("so-framing").length).toBeGreaterThan(1);
    pickFraming();
    await settle();
    expect(options("so-glass").map((o) => o.value)).toEqual(["dsb", "obscure", "frosted", "rain", "seeded"]);
  });

  it("configures the window section by design, with the glass over it (CJ's workbook of 13/10/2026)", async () => {
    await pickCoachman();
    setWidth("16");
    setHeight("7");
    design("12");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(options("so-glass").map((o) => o.textContent)).toEqual([""]);
    expect(sel("so-glass")).toHaveProperty("disabled", true);
    expect(await total()).toBe(at(2127, true));
    // Framing first: Solid, then the window designs and the arched sections the sheet builds at 16'0"; any of the door's glass over the one picked.
    expect(options("so-framing").map((o) => o.textContent)).toEqual([
      "Solid — no windows",
      "ARCH1", "ARCH3", "ARCH4", "ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24",
      "ARC13A arch section", "ARC14A arch section", "ARC1A arch section", "ARC3A arch section", "ARC4A arch section",
    ]);
    const adder = (list: number) => Math.round((Math.round(list * 1.193 * K * 100) / 100) / 0.59 * 100) / 100;
    pickFraming("design:ARCH1");
    await settle();
    expect(options("so-glass").map((o) => o.textContent)).toEqual(["Double strength", "Obscure", "Frosted DSB", "Rain DSB", "Seeded DSB"]);
    expect(sel("so-glass").value).toBe("dsb");
    expect(await total()).toBe(at(2127, true, adder(435)));                               // ARCH1 in double strength: 435 over the solid door
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
    expect(line.description).toMatch(/IN THE COLOR WHITE,  OVERLAYS IN THE COLOR WHITE,  SEEDED DSB WINDOWS IN THE TOP SECTION,  ARC1A INSERTS,  12″ RADIUS TRACK/i);
    // 8'0": the two-window designs only, ARCH1 at 218 and ARCH4 at 436 — the arched section chosen is not among them, so the door is solid until one is.
    setWidth("8");
    await settle();
    expect(options("so-framing")).toHaveLength(11);
    expect(sel("so-framing").value).toBe("");
    expect(sel("so-glass").value).toBe("");
    fireEvent.change(sel("so-framing"), { target: { value: "design:ARCH1" } });
    fireEvent.change(sel("so-glass"), { target: { value: "dsb" } });
    await settle();
    expect(await total()).toBe(at(1135, false, adder(218)));
    fireEvent.change(sel("so-framing"), { target: { value: "design:ARCH4" } });
    await settle();
    expect(await total()).toBe(at(1135, false, adder(436)));
    // 14'0": solid only — the window chosen is gone, so the door is solid.
    setWidth("14");
    await settle();
    expect(options("so-framing").map((o) => o.value)).toEqual([""]);
    expect(options("so-glass").map((o) => o.value)).toEqual([""]);
    expect(maybe("so-no-windows")).toBeTruthy();
    expect(await total()).toBe(at(1861, true));
  });
});

describe("special order — high lift is the sheet-tracked doors' (the 4050 family's since 13/10/2026, off its sheet since 21/10/2026)", () => {
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
    expect(options("so-track").map((o) => o.value)).toEqual(["r10", "r12", "r15", "low_headroom", "r20", "r32"]);
    expect(maybe("so-high-lift")).toBeNull();
    expect(maybe("so-incline")).toBeNull();
  });

  it("still names what the 4050's track group waits for", async () => {
    await pickDoor();
    fireEvent.click(maybe("so-configure")!);
    await settle();
    expect(document.body.textContent).toMatch(/high lift and spring depend on the door size/i);
  });

  it("keeps the stock book's option money on the stocked 4050 and prices what stock does not sell off CJ's sheet (Brandon, 21/10/2026)", async () => {
    await configured("9", "7");
    await fillOptions({ spring: "torsion" });
    // Torsion opens every track on the sheet: rear torsion after low headroom, high lift, full vertical, roof pitch.
    expect(options("so-track").map((o) => o.value)).toEqual(["r10", "r12", "r15", "low_headroom", "reverse_low_headroom", "r20", "r32", "high_lift", "full_vertical", "roof_pitch"]);
    const solid = (await copiedQbLine(screen.getByTestId("copy-qb"))).rate;
    const sell = (cost: number) => Math.round((cost / 0.57) * 100) / 100;
    // Stock options at the stock price: low headroom 45, rear torsion 60, an angle mount free.
    fireEvent.change(sel("so-track"), { target: { value: "low_headroom" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBeCloseTo(solid + 45, 2);
    fireEvent.change(sel("so-track"), { target: { value: "reverse_low_headroom" } });
    await settle();
    let line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + 60, 2);
    expect(line.description).toMatch(/,  LOW HEADROOM REAR TORSION TRACK,  REAR TORSION SPRINGS/i);
    fireEvent.change(sel("so-track"), { target: { value: "r20" } });
    fireEvent.change(sel("so-track-mount"), { target: { value: "continuous_angle" } });
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + 200, 2);
    expect(line.description).toMatch(/2" CONTINUOUS ANGLE MOUNT TRACK TO WOOD,  20″ RADIUS TRACK/i);
    fireEvent.change(sel("so-track-mount"), { target: { value: "bracket" } });
    // High lift is not a stock track, so the door is no longer the floored one (782.19 in the stock book): the sheet's 9' x 7' (808.54) with the sheet's torsion (45), under high lift off the 4050's sheet (.776, the 4138's figures) at the 43%: breakaway or 25 degree, the sheet's inches.
    const sheetSolid = 808.54 + 45;
    expect(sheetSolid).not.toBe(solid);
    fireEvent.change(sel("so-track"), { target: { value: "high_lift" } });
    await settle();
    expect(options("so-incline").map((o) => o.value)).toEqual(["breakaway", "deg25"]);
    expect(options("so-high-lift").map((o) => o.value).slice(1, 3)).toEqual(["36", "39"]);
    fireEvent.change(sel("so-high-lift"), { target: { value: "36" } });
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(sheetSolid + sell(136.52), 2);
    expect(line.description).toMatch(/SOLID NO WINDOWS,  2" BRACKET MOUNT TRACK WITH 36″ HIGH LIFT BREAKAWAY,  FRONT TORSION SPRINGS/i);
    fireEvent.change(sel("so-track"), { target: { value: "full_vertical" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBeCloseTo(sheetSolid + sell(104.96), 2);
    fireEvent.change(sel("so-track"), { target: { value: "roof_pitch" } });
    await settle();
    fireEvent.change(sel("so-roof-pitch"), { target: { value: "6/12" } });
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(sheetSolid + sell(137.63), 2);
    expect(line.description).toMatch(/,  6\/12 ROOF PITCH TRACK,  FRONT TORSION SPRINGS/i);
    // Back on a stock track it is the floored door again.
    fireEvent.change(sel("so-track"), { target: { value: "r12" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBe(solid);
    // A door with windows cannot pick breakaway (Brandon, 21/10/2026): the incline list drops it, and one chosen before the windows becomes 25 degree.
    fireEvent.change(sel("so-track"), { target: { value: "high_lift" } });
    await settle();
    fireEvent.change(sel("so-incline"), { target: { value: "breakaway" } });
    await settle();
    expect(sel("so-incline").value).toBe("breakaway");
    pickFraming();
    await settle();
    expect(options("so-incline").map((o) => o.value)).toEqual(["deg25"]);
    expect(sel("so-incline").value).toBe("deg25");
    fireEvent.change(sel("so-high-lift"), { target: { value: "36" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/WINDOWS IN THE TOP SECTION.*2" BRACKET MOUNT TRACK WITH 36″ HIGH LIFT 25 DEGREE BREAKAWAY,  FRONT TORSION SPRINGS/i);
    fireEvent.change(sel("so-framing"), { target: { value: "" } });
    await settle();
    expect(options("so-incline").map((o) => o.value)).toEqual(["breakaway", "deg25"]);
  });
});

describe("special order — vinyl molding on a configured door (Brandon, 14/10/2026)", () => {
  it("is a Yes/No on the card, No until pressed — nothing asked (Brandon, 20/10/2026); Yes puts the vinyl line on the copy", async () => {
    await configured("9", "7");
    // No prompt: the card carries the choice, in the vinyl that matches the door's colour.
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    expect(screen.getByTestId("so-vinyl-no").getAttribute("aria-checked")).toBe("true");
    expect(screen.queryByTestId("so-vinyl-line")).toBeNull();
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
    fireEvent.click(screen.getByTestId("so-vinyl-yes"));
    await settle();
    expect(screen.getByTestId("so-vinyl-yes").getAttribute("aria-checked")).toBe("true");
    const rows = (await copyFrom(screen.getByTestId("copy-qb"))).split("\n");
    expect(rows).toHaveLength(3);
    expect(rows[1]).toBe("");
    expect(rows[2].split("\t")).toEqual([QB_VINYL, "WHITE VINYL STOP MOLDING,  [1] - 9FT AND [2] - 7FT", "23", "0.95"]);
    // A change of track keeps the answer; No drops the line.
    fireEvent.change(sel("so-track"), { target: { value: "r15" } });
    await settle();
    expect(screen.getByTestId("so-vinyl-yes").getAttribute("aria-checked")).toBe("true");
    fireEvent.click(screen.getByTestId("so-vinyl-no"));
    await settle();
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
  });

  it("suggests an operator bracket and struts under the vinyl, each a PARTS line once chosen, as the stock tab does (Brandon, 20/10/2026)", async () => {
    await configured("9", "7");
    const addons = screen.getByTestId("so-addons");
    expect(addons.querySelector(".addons-hdr")?.textContent).toBe("Suggested addons");
    expect(screen.getByTestId("so-vinyl-row").compareDocumentPosition(addons) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect([...(screen.getByTestId("so-addon-bracket") as HTMLSelectElement).options].map((o) => o.textContent)).toEqual(["No", "ARB", "ORB"]);
    expect((screen.getByTestId("so-addon-struts") as HTMLInputElement).value).toBe("0");
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
    fireEvent.change(screen.getByTestId("so-addon-bracket"), { target: { value: "ARB" } });
    fireEvent.click(screen.getByTestId("so-addon-struts-plus"));
    fireEvent.click(screen.getByTestId("so-addon-struts-plus"));
    await settle();
    const rows = (await copyFrom(screen.getByTestId("copy-qb"))).split("\n");
    // The bracket, then two struts the door's width — a 9'0" door takes the 9FT strut.
    expect(rows).toHaveLength(5);
    expect(rows[2].split("\t")).toEqual([QB_PARTS, "ARB BRACKET", "1", "12.95"]);
    expect(rows[4].split("\t")).toEqual([QB_PARTS, '2-1/4" GALVANIZED STRUT,  [2] - 9FT', "2", "17.95"]);
    // Vinyl on as well: its line sits first, the add-ons after it.
    fireEvent.click(screen.getByTestId("so-vinyl-yes"));
    await settle();
    const withVinyl = (await copyFrom(screen.getByTestId("copy-qb"))).split("\n");
    expect(withVinyl).toHaveLength(7);
    expect(withVinyl[2].split("\t")[0]).toBe(QB_VINYL);
    expect(withVinyl[4].split("\t")).toEqual([QB_PARTS, "ARB BRACKET", "1", "12.95"]);
    // Two doors: two brackets, four struts.
    fireEvent.change(document.getElementById("soqty")!, { target: { value: "2" } });
    await settle();
    const twice = (await copyFrom(screen.getByTestId("copy-qb"))).split("\n");
    expect(twice[4].split("\t")).toEqual([QB_PARTS, "ARB BRACKET", "2", "12.95"]);
    expect(twice[6].split("\t")).toEqual([QB_PARTS, '2-1/4" GALVANIZED STRUT,  [4] - 9FT', "4", "17.95"]);
    // A typed-in total keeps the door line alone.
    fireEvent.change(document.querySelector('input[inputmode="decimal"]')!, { target: { value: "1500" } });
    await settle();
    expect(screen.queryByTestId("so-addons")).toBeNull();
    expect((await copyFrom(screen.getByTestId("copy-qb"))).split("\n")).toHaveLength(1);
  });

  it("lists the framing above the glass type (Brandon, 20/10/2026)", async () => {
    await configured("9", "7");
    const labels = [...document.querySelectorAll(".grow > label")].map((l) => l.textContent);
    expect(labels.indexOf("Framing")).toBeGreaterThan(-1);
    expect(labels.indexOf("Framing")).toBeLessThan(labels.indexOf("Section glazed"));
    expect(labels.indexOf("Section glazed")).toBeLessThan(labels.indexOf("Glass type"));
  });

  it("prices at the defaults as soon as the door is sized and coloured — 12\" radius, extension, bracket mount, no lock (Brandon, 20/10/2026)", async () => {
    await configured("9", "7");
    expect(sel("so-glass").value).toBe("");
    expect(sel("so-spring").value).toBe("extension");
    expect(sel("so-track").value).toBe("r12");
    expect(sel("so-track-mount").value).toBe("bracket");
    expect(sel("so-lock").value).toBe("none");
    expect(sel("so-lock").disabled).toBe(false);
    expect(sel("so-homeowner").value).toBe("no");
    expect(maybe("copy-qb")).toBeTruthy();
    expect(screen.getByTestId("so-vinyl-row")).toBeTruthy();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/SOLID NO WINDOWS,  12″ RADIUS TRACK,  EXTENSION SPRINGS,  NO LOCK/i);
    // A window picked takes the first glass it comes in until another is picked.
    pickFraming();
    await settle();
    expect(sel("so-glass").value).toBe(options("so-glass")[0].value);
    expect(maybe("copy-qb")).toBeTruthy();
  });

  it("never asks on a typed-in total", async () => {
    await pickDoor();
    expect(screen.queryByTestId("vinyl-prompt")).toBeNull();
    expect(screen.queryByTestId("so-vinyl-row")).toBeNull();
    expect(screen.queryByTestId("so-addons")).toBeNull();
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

  it("shows page 3 of the Modern Steel brochure under the quote card on every Modern Steel door, full size when pressed (Brandon, 21/10/2026)", async () => {
    await pickModern("9138");
    const thumb = screen.getByTestId("so-brochure-open").querySelector("img")!;
    expect(thumb.getAttribute("src")).toBe("/brochure/modern-steel-p3-thumb.jpg");
    expect(maybe("so-brochure-lightbox")).toBeNull();
    fireEvent.click(screen.getByTestId("so-brochure-open"));
    expect(screen.getByTestId("so-brochure-lightbox").querySelector("img")!.getAttribute("src")).toBe("/brochure/modern-steel-p3.jpg");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(maybe("so-brochure-lightbox")).toBeNull();
    fireEvent.click(screen.getByTestId("so-brochure-open"));
    fireEvent.click(screen.getByTestId("so-brochure-close"));
    expect(maybe("so-brochure-lightbox")).toBeNull();
    // Still there with the door priced; not on a Premium Steel door.
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    await fillOptions();
    expect(maybe("so-brochure")).toBeTruthy();
    expect(maybe("copy-qb")).toBeTruthy();
    cleanup();
    await configured();
    expect(maybe("so-brochure")).toBeNull();
  });

  it("prices the 9138 and 9139 off their sheet (CJ, 21/10/2026): 569 list the 8'0\" x 7'0\" door at .912 and 45, the windows a window, the slim window lent from the 9208's sheet", async () => {
    await pickModern("9139");
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(options("so-framing").map((o) => o.value)).toEqual(["", "short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24", "slim:black", "slim:silver"]);
    await fillOptions();
    const k = 0.99 / (1 - 0.0265);
    const grid = (list: number) => Math.round((list * 0.912 * k / 0.55) * 100) / 100;
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBe(grid(569));
    fireEvent.change(sel("so-framing"), { target: { value: "short" } });
    await settle();
    fireEvent.click(screen.getByTestId("door-panel-1-1-add"));
    await settle();
    const line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(grid(569) + Math.round((Math.round(65 * 0.912 * k * 100) / 100 / 0.55) * 100) / 100, 2);
    expect(line.description).toMatch(/CLOPAY MODERN COLLECTION,  MODEL 9139,  8'0" X 7'0",  IN THE COLOR WHITE,  1\/8" TEMPERED SHORT 19 1\/2X16 WINDOWS IN SECTION 1,  GL-SOL-SOL-SOL,  LEFT SIDE INSIDE LOOKING OUT,  NO INSERTS/i);
  });

  it("draws the door as Clopay stacks it, takes a window per press, and prices each at CJ's rate", async () => {
    await pickModern("4308");
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // The framing first: Solid, then every window as Clopay's list names them — short or long, plain or in a grille design, and the slim window; no section-glazed question, and no drawing on a solid door.
    expect(options("so-framing").map((o) => o.value)).toEqual(["", "short", "long", "short_grilles:REC12", "long_grilles:REC14", "short_grilles:SQ22", "long_grilles:SQ24", "slim:black", "slim:silver"]);
    expect(options("so-framing").map((o) => o.text).slice(0, 3)).toEqual(["Solid — no windows", "PLAIN SHORT 19 1/2 X 16", "PLAIN LONG 42 X 16"]);
    expect(options("so-glass").map((o) => o.value)).toEqual([""]);
    expect(sel("so-glass").disabled).toBe(true);
    expect(maybe("so-section")).toBeNull();
    expect(maybe("door-diagram")).toBeNull();
    fireEvent.change(sel("so-framing"), { target: { value: "short" } });
    await settle();
    expect(screen.getByTestId("door-looking-out").textContent).toBe("Inside looking out");
    // The short window comes in every contemporary glass but the slim window's own 9/16"; tempered, the first, until another is picked.
    expect(options("so-glass").map((o) => o.value)).toEqual(MODERN_GLASS_TYPES.map((g) => g.id).filter((g) => g !== "insulated_tempered_midnight_gray_916"));
    expect(sel("so-glass").value).toBe("tempered");
    // The drawing is up, 8'0" x 7'0": four 21" sections, four short windows across.
    expect(document.querySelectorAll(".dsec")).toHaveLength(4);
    expect(document.querySelectorAll("[data-testid='door-section-1'] .dpanel")).toHaveLength(4);
    expect([1, 2, 3, 4].map((i) => screen.getByTestId(`door-section-${i}-height`).textContent)).toEqual(["21″", "21″", "21″", "21″"]);
    // Nothing priced until a window is pressed in.
    expect(maybe("copy-qb")).toBeNull();
    expect(document.body.textContent).toMatch(/none are placed yet/);
    fireEvent.click(screen.getByTestId("door-panel-1-1-add"));
    fireEvent.click(screen.getByTestId("door-panel-1-2-add"));
    fireEvent.click(screen.getByTestId("door-panel-3-4-add"));
    await settle();
    expect(screen.getByTestId("door-panel-1-1").getAttribute("data-on")).toBe("true");
    // The 8'0" x 7'0" 4308 solid (704 list at .704, at 45%) and three short tempered windows (65 list each).
    const solid = 916.39;
    const window = (list: number) => Math.round(list * 0.704 * (0.99 / (1 - 0.0265)) * 100) / 100;
    const lift = (c: number) => Math.round((c / 0.55) * 100) / 100;
    let line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + lift(window(65) * 3), 2);
    expect(line.description).toMatch(/CLOPAY MODERN COLLECTION,  MODEL 4308,  8'0" X 7'0",  IN THE COLOR WHITE,  1\/8" TEMPERED SHORT 19 1\/2X16 WINDOWS IN SECTION 1 GL-GL-SOL-SOL AND SECTION 3 SOL-SOL-SOL-GL,  NO INSERTS/i);
    // The x takes one out again, and the price follows.
    fireEvent.click(screen.getByTestId("door-panel-1-2-remove"));
    await settle();
    expect(screen.getByTestId("door-panel-1-2").getAttribute("data-on")).toBe("false");
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + lift(window(65) * 2), 2);
    // ALL fills the section's row, and clears it once it is full.
    fireEvent.click(screen.getByTestId("door-section-2-all"));
    await settle();
    expect(document.querySelectorAll(".dpanel.on")).toHaveLength(6);
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).description).toMatch(/WINDOWS IN SECTION 1 GL-SOL-SOL-SOL,  SECTION 2 GL-GL-GL-GL AND SECTION 3 SOL-SOL-SOL-GL/i);
    fireEvent.click(screen.getByTestId("door-section-2-all"));
    await settle();
    expect(document.querySelectorAll(".dpanel.on")).toHaveLength(2);
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
    expect(line.description).toMatch(/1\/8" TEMPERED LONG 42X16 WINDOWS IN SECTION 2,  GL-SOL,  LEFT SIDE inside looking out,  SQ24 INSERTS/i);
    // Insulated tempered frosted over the long window: 272 list.
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_tempered_frosted" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBeCloseTo(solid + lift(window(272)), 2);
    // The slim window takes the long window's places and comes in the three insulated glasses Clopay builds it in alone; the glass picked stays, being one of them.
    fireEvent.change(sel("so-framing"), { target: { value: "slim:black" } });
    await settle();
    expect(options("so-glass").map((o) => o.value)).toEqual(["insulated_tempered", "insulated_tempered_frosted", "insulated_tempered_midnight_gray_916"]);
    expect(sel("so-glass").value).toBe("insulated_tempered_frosted");
    fireEvent.click(screen.getByTestId("door-panel-1-1-add"));
    fireEvent.click(screen.getByTestId("door-panel-1-2-add"));
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + lift(window(180) * 2), 2);
    expect(line.description).toMatch(/INSULATED TEMPERED FROSTED BLACK SLIM 37X8 WINDOWS IN SECTION 1,  12/i);
    // Back to a short window in the slim window's own 9/16" glass: the first glass the short window comes in stands in.
    fireEvent.change(sel("so-glass"), { target: { value: "insulated_tempered_midnight_gray_916" } });
    await settle();
    fireEvent.change(sel("so-framing"), { target: { value: "short" } });
    await settle();
    expect(sel("so-glass").value).toBe("tempered");
    // Solid prices off the grid as before.
    fireEvent.change(sel("so-framing"), { target: { value: "" } });
    await settle();
    expect(sel("so-glass").value).toBe("");
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
    expect(line.description).toMatch(/CLOPAY MODERN COLLECTION,  MODEL 9208,  16'0" X 7'0",  IN THE COLOR ULTRA-GRAIN PLANK KONA FINISH,  SOLID NO WINDOWS/i);
  });

  it("offers short windows alone under 7'8\", and a 9'0\" door five sections; the 4138 off its own sheet", async () => {
    await pickModern("4138");
    setWidth("7.6");
    setHeight("9");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    // Under 7'8" the short windows alone, and no slim window on the 4138.
    expect(options("so-framing").map((o) => o.value)).toEqual(["", "short", "short_grilles:REC12", "short_grilles:SQ22"]);
    fireEvent.change(sel("so-framing"), { target: { value: "short_grilles:REC12" } });
    await settle();
    fireEvent.change(sel("so-glass"), { target: { value: "tempered_frosted" } });
    await settle();
    expect(document.querySelectorAll(".dsec")).toHaveLength(5);
    expect(document.querySelectorAll("[data-testid='door-section-5'] .dpanel")).toHaveLength(3);
    expect([1, 2, 3, 4, 5].map((i) => screen.getByTestId(`door-section-${i}-height`).textContent)).toEqual(["21″", "21″", "21″", "21″", "24″"]);   // numbered from the floor up (Brandon, 21/10/2026): the 24" top section is section 5
    fireEvent.click(screen.getByTestId("door-panel-5-1-add"));
    await settle();
    // CJ's sheet of 21/10/2026 prices the 9FT and 10FT doors under 8'0" as one band, 1116 list, so this one prices: the door and its one window.
    const k9 = 0.99 / (1 - 0.0265);
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBeCloseTo(Math.round((1116 * 0.776 * k9 / 0.55) * 100) / 100 + Math.round((Math.round(96 * 0.776 * k9 * 100) / 100 / 0.55) * 100) / 100, 2);
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
    expect(line.description).toMatch(/CLOPAY MODERN COLLECTION,  MODEL 4138,  7'6" X 8'0",  IN THE COLOR WHITE,  1\/8" TEMPERED FROSTED SHORT 19 1\/2X16 WINDOWS IN SECTION 2,  SOL-GL-SOL,  REC12 INSERTS/i);
  });

  it("offers the 4138 every mount, and CJ's track options off its sheet: high lift breakaway or 25 degree, full vertical lift, roof pitch — torsion only (20/10/2026)", async () => {
    await pickModern("4138");
    setWidth("8");
    setHeight("7");
    fireEvent.change(sel("so-color"), { target: { value: "White" } });
    await settle();
    expect(options("so-track-mount").map((o) => o.value)).toEqual(["bracket", "continuous_angle", "reverse_angle"]);
    // On extension springs none of the sheet's tracks are offered.
    expect(options("so-track").map((o) => o.value)).toEqual(["r10", "r12", "r15", "low_headroom", "r20", "r32"]);
    fireEvent.change(sel("so-spring"), { target: { value: "torsion" } });
    await settle();
    expect(options("so-track").map((o) => o.value)).toEqual(["r10", "r12", "r15", "low_headroom", "reverse_low_headroom", "r20", "r32", "high_lift", "full_vertical", "roof_pitch"]);
    expect(options("so-track").slice(-2).map((o) => o.textContent)).toEqual(["Full vertical lift", "Follow the roof pitch"]);
    expect(options("so-track")[4].textContent).toBe("Low headroom rear torsion");
    const solid = (await copiedQbLine(screen.getByTestId("copy-qb"))).rate;
    const sell = (cost: number) => Math.round((cost / 0.55) * 100) / 100;
    // The sheet's own adders (21/10/2026): low headroom 39.06, rear torsion 45.06, an angle mount on 12" or 15" radius 58.40 — not the stock book's.
    fireEvent.change(sel("so-track"), { target: { value: "low_headroom" } });
    await settle();
    expect((await copiedQbLine(screen.getByTestId("copy-qb"))).rate).toBeCloseTo(solid + sell(39.06), 2);
    fireEvent.change(sel("so-track"), { target: { value: "reverse_low_headroom" } });
    await settle();
    let lineRt = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(lineRt.rate).toBeCloseTo(solid + sell(45.06), 2);
    expect(lineRt.description).toMatch(/,  LOW HEADROOM REAR TORSION TRACK,  REAR TORSION SPRINGS/i);
    fireEvent.change(sel("so-track"), { target: { value: "r15" } });
    fireEvent.change(sel("so-track-mount"), { target: { value: "continuous_angle" } });
    await settle();
    lineRt = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(lineRt.rate).toBeCloseTo(solid + sell(58.40), 2);
    expect(lineRt.description).toMatch(/2" CONTINUOUS ANGLE MOUNT TRACK TO WOOD,  15″ RADIUS TRACK/i);
    fireEvent.change(sel("so-track"), { target: { value: "r20" } });
    await settle();
    expect(maybe("copy-qb")).toBeNull();
    expect(document.body.textContent).toMatch(/An angle mount is priced on 12" and 15" radius track on this door/);
    fireEvent.change(sel("so-track-mount"), { target: { value: "bracket" } });
    fireEvent.change(sel("so-track"), { target: { value: "r12" } });
    await settle();
    // High lift: breakaway or 25 degree, the sheet's inches up to the door's 81".
    fireEvent.change(sel("so-track"), { target: { value: "high_lift" } });
    await settle();
    expect(options("so-incline").map((o) => o.value)).toEqual(["breakaway", "deg25"]);
    expect(sel("so-incline").value).toBe("breakaway");
    expect(options("so-high-lift").map((o) => o.value).slice(1)).toEqual(["36", "39", "42", "45", "48", "51", "54", "57", "60", "63", "66", "69", "72", "75", "78", "81"]);
    fireEvent.change(sel("so-high-lift"), { target: { value: "60" } });
    await settle();
    let line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + sell(161.62), 2);
    expect(line.description).toMatch(/SOLID NO WINDOWS,  2" BRACKET MOUNT TRACK WITH 60″ HIGH LIFT BREAKAWAY,  FRONT TORSION SPRINGS/i);
    fireEvent.change(sel("so-incline"), { target: { value: "deg25" } });
    await settle();
    expect(options("so-high-lift").map((o) => o.value).slice(-1)).toEqual(["72"]);
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + sell(189.40), 2);
    // Angle mount off the angle column.
    fireEvent.change(sel("so-track-mount"), { target: { value: "reverse_angle" } });
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + sell(274.63), 2);
    expect(line.description).toMatch(/SOLID NO WINDOWS,  2" REVERSE ANGLE MOUNT TRACK TO STEEL WITH 60″ HIGH LIFT 25 DEGREE BREAKAWAY,  FRONT TORSION SPRINGS/i);
    // Full vertical lift, by the door's height; the pitch box only on roof pitch.
    fireEvent.change(sel("so-track"), { target: { value: "full_vertical" } });
    await settle();
    expect(maybe("so-high-lift")).toBeNull();
    expect(maybe("so-roof-pitch")).toBeNull();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + sell(158.62), 2);
    expect(line.description).toMatch(/2" REVERSE ANGLE MOUNT TRACK TO STEEL,  FULL VERTICAL LIFT TRACK,  FRONT TORSION SPRINGS/i);
    fireEvent.change(sel("so-track"), { target: { value: "roof_pitch" } });
    await settle();
    expect(options("so-roof-pitch").map((o) => o.value)).toEqual(["1/12", "2/12", "3/12", "4/12", "5/12", "6/12"]);
    fireEvent.change(sel("so-roof-pitch"), { target: { value: "5/12" } });
    fireEvent.change(sel("so-track-mount"), { target: { value: "bracket" } });
    await settle();
    line = await copiedQbLine(screen.getByTestId("copy-qb"));
    expect(line.rate).toBeCloseTo(solid + sell(137.63), 2);
    expect(line.description).toMatch(/,  5\/12 ROOF PITCH TRACK,  FRONT TORSION SPRINGS/i);
    // Glass on full vertical lift is not built: the reason shows and nothing prices.
    fireEvent.change(sel("so-track"), { target: { value: "full_vertical" } });
    fireEvent.change(sel("so-framing"), { target: { value: "short" } });
    await settle();
    fireEvent.click(screen.getByTestId("door-panel-1-1-add"));
    await settle();
    expect(maybe("copy-qb")).toBeNull();
    expect(document.body.textContent).toMatch(/Full vertical lift is built solid only/);
    // Back to extension springs: the sheet's tracks fall back to 12" radius.
    fireEvent.change(sel("so-spring"), { target: { value: "extension" } });
    await settle();
    expect(sel("so-track").value).toBe("r12");
    expect(maybe("copy-qb")).toBeTruthy();
  });
});
