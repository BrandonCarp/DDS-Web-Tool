// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CommercialTool } from "./CommercialTool";

/**
 * The commercial tab's wiring, after CJ's RIBBED SECTIONS sheet (Brandon,
 * 15/10/2026): complete door or replacement section comes first, as two
 * buttons; sections are 24" unless changed; a complete door's windows are
 * placed GL/SOL a panel, a section's by pressing the panels on the diagram;
 * a 524 or 2415 asks for its stile locations, one row a stile — the inches
 * and the quarter — with more to add, or says they are needed. Fetch is
 * stubbed and the request body inspected, as the residential tests do — the
 * engine is tested on its own.
 */

let bodies: Record<string, unknown>[] = [];

beforeEach(() => {
  bodies = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    if (String(url).includes("/api/price/commercial")) {
      bodies.push(body);
      return new Response(JSON.stringify({ priced: true, unitPrice: 100, lines: [], sub: "TEST", description: "TEST DESCRIPTION" }),
        { status: 200, headers: { "content-type": "application/json" } });
    }
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const sel = (id: string) => screen.getByTestId(id) as HTMLSelectElement;
const options = (id: string) => [...sel(id).options].map((o) => o.value);
const labels = (id: string) => [...sel(id).options].map((o) => o.textContent);
const change = (id: string, value: string) => fireEvent.change(sel(id), { target: { value } });
const width = (ft: string, inch = "0") => { fireEvent.change(screen.getByTestId("comm-width-ft"), { target: { value: ft } }); change("comm-width-in", inch); };
const pressed = () => [1, 2, 3, 4, 5, 6, 7].filter((p) => screen.queryByTestId(`comm-panel-${p}`)?.getAttribute("aria-pressed") === "true");
const panelsDrawn = () => [1, 2, 3, 4, 5, 6, 7].filter((p) => screen.queryByTestId(`comm-panel-${p}`)).length;
const stileRows = () => [1, 2, 3, 4, 5, 6, 7, 8].filter((i) => screen.queryByTestId(`comm-stile-${i}`)).length;
const stileInch = (i: number, v: string) => fireEvent.change(screen.getByTestId(`comm-stile-${i}`), { target: { value: v } });
const stileFrac = (i: number, v: string) => change(`comm-stile-${i}-frac`, v);

/** The two buttons, then the maker and model, then Configure. */
function configure(order: "complete" | "section", mfr: string, model: string) {
  render(<CommercialTool />);
  fireEvent.click(screen.getByTestId(`comm-order-${order}`));
  change("comm-mfr", mfr);
  change("comm-model", model);
  fireEvent.click(screen.getByTestId("comm-configure"));
}
async function getPrice() {
  fireEvent.click(screen.getByTestId("comm-get-price"));
  await waitFor(() => expect(bodies.length).toBeGreaterThan(0));
  return bodies[bodies.length - 1];
}

describe("commercial tab — complete door or replacement section first (15/10/2026)", () => {
  it("opens on the two buttons, and lists the makers and models of the one pressed", () => {
    render(<CommercialTool />);
    expect(screen.queryByTestId("comm-mfr")).toBeNull();
    fireEvent.click(screen.getByTestId("comm-order-complete"));
    expect(options("comm-mfr")).toEqual(["", "Clopay"]);
    change("comm-mfr", "Clopay");
    expect(options("comm-model")).toEqual(["", "3200", "524"]);
    // Back to the buttons; a section lists every maker.
    fireEvent.click(screen.getByTestId("comm-back-order"));
    fireEvent.click(screen.getByTestId("comm-order-section"));
    expect(options("comm-mfr")).toEqual(["", "Clopay", "Wayne Dalton", "Overhead", "Amarr"]);
    change("comm-mfr", "Wayne Dalton");
    expect(options("comm-model")).toEqual(["", "2415", "2415V", "2415S", "TS125", "TS150", "TS200"]);
  });

  it("starts a section at 24 inches, with 24 first", () => {
    configure("section", "Clopay", "524");
    expect(options("comm-sec-height")).toEqual(["24", "21"]);
    expect(sel("comm-sec-height").value).toBe("24");
  });
});

describe("commercial tab — a section's windows, pressed into the drawing (16/10/2026)", () => {
  const glassWord = (p: number) => screen.getByTestId(`comm-panel-${p}`).parentElement!.querySelector(".pglass-word")?.textContent ?? null;

  it("draws the section as soon as it has a width, and a press puts a 24x12 window in a panel, the smaller size in its dropdown", async () => {
    configure("section", "Clopay", "524");
    change("comm-sec-kind", "int");
    expect(panelsDrawn()).toBe(0); // no width yet
    width("10", "2");
    expect(panelsDrawn()).toBe(3);
    expect(pressed()).toEqual([]); // solid to begin with
    expect(screen.queryByTestId("comm-panel-2-size")).toBeNull();
    fireEvent.click(screen.getByTestId("comm-panel-2"));
    expect(pressed()).toEqual([2]);
    expect(glassWord(2)).toBe("Double Strength");
    expect(options("comm-panel-2-size")).toEqual(["24x12", "24x6"]);
    expect(sel("comm-panel-2-size").value).toBe("24x12");
    let body = await getPrice();
    expect(body).toMatchObject({ order: "section", model: "524", manFt: 10, manIn: 2, secKind: "int", secHeight: "24", windowPanels: [2], windowSize: "24x12" });
    // The size is the section's: picked in one panel, every window has it.
    fireEvent.click(screen.getByTestId("comm-panel-3"));
    change("comm-panel-3-size", "24x6");
    expect(sel("comm-panel-2-size").value).toBe("24x6");
    body = await getPrice();
    expect(body).toMatchObject({ windowPanels: [2, 3], windowSize: "24x6" });
    // Pressed again, the window comes out.
    fireEvent.click(screen.getByTestId("comm-panel-2"));
    fireEvent.click(screen.getByTestId("comm-panel-3"));
    expect(pressed()).toEqual([]);
    body = await getPrice();
    expect(body).toMatchObject({ windowPanels: [] });
  });

  it("names the glass by model: insulated on the vinyl and steel backs and the 3200, double strength on the 2415 — 24x12 first on all", () => {
    const check = (mfr: string, model: string, word: string, sizes: string[]) => {
      configure("section", mfr, model);
      change("comm-sec-kind", "int");
      width("12");
      fireEvent.click(screen.getByTestId("comm-panel-1"));
      expect(glassWord(1)).toBe(word);
      expect(options("comm-panel-1-size")).toEqual(sizes);
      expect(sel("comm-panel-1-size").value).toBe("24x12");
      cleanup();
    };
    check("Wayne Dalton", "2415V", "Insulated", ["24x12", "24x6"]);
    check("Wayne Dalton", "2415", "Double Strength", ["24x12", "24x6"]);
    check("Clopay", "3200", "Insulated", ["24x12", "24x8"]);
    check("Clopay", "3720", "Insulated", ["24x12"]);
  });

  it("redraws the panels as the width changes, solid again", async () => {
    configure("section", "Clopay", "3200");
    change("comm-sec-kind", "int");
    width("16");
    expect(panelsDrawn()).toBe(4);
    fireEvent.click(screen.getByTestId("comm-panel-4"));
    fireEvent.click(screen.getByTestId("comm-panel-1"));
    expect(pressed()).toEqual([1, 4]);
    width("8");
    expect(panelsDrawn()).toBe(2);
    expect(pressed()).toEqual([]);
    expect(stileRows()).toBe(0); // a 3200 never asks for stile locations
    expect(screen.queryByTestId("comm-stiles-needed")).toBeNull();
    fireEvent.click(screen.getByTestId("comm-panel-2"));
    change("comm-panel-2-size", "24x8");
    expect(await getPrice()).toMatchObject({ model: "3200", windowSize: "24x8", windowPanels: [2] });
  });

  it("draws a bottom section too, but takes no windows on it, whatever was pressed as an intermediate", async () => {
    configure("section", "Clopay", "524");
    change("comm-sec-kind", "int");
    width("12");
    fireEvent.click(screen.getByTestId("comm-panel-1"));
    change("comm-sec-kind", "bt");
    expect(panelsDrawn()).toBe(3);
    expect(pressed()).toEqual([]); // drawn, not pressable
    expect(screen.getByTestId("comm-panel-1").tagName).not.toBe("BUTTON");
    expect(screen.queryByText("If windows are needed, click on which panel you want windows in, and what size.")).toBeNull();
    expect(await getPrice()).toMatchObject({ secKind: "bt", windowPanels: [], lock: "none" });
  });

  it("offers an inside slide lock on an intermediate section only", async () => {
    configure("section", "Wayne Dalton", "2415V");
    expect(screen.queryByTestId("comm-sec-lock")).toBeNull();
    change("comm-sec-kind", "int");
    expect(options("comm-sec-lock")).toEqual(["none", "slide"]);
    change("comm-sec-lock", "slide");
    width("8", "2");
    expect(await getPrice()).toMatchObject({ secKind: "int", lock: "slide" });
    change("comm-sec-kind", "bt");
    expect(await getPrice()).toMatchObject({ secKind: "bt", lock: "none" });
  });
});

describe("commercial tab — a complete door's windows, placed GL or SOL a panel", () => {
  it("asks the window section and the placement under Glass type, with every panel glass to begin with", async () => {
    configure("complete", "Clopay", "524");
    expect(screen.queryByTestId("comm-win-section")).toBeNull();
    change("comm-size", "10′2″ × 10′0″");
    change("comm-glass", "glass");
    expect(panelsDrawn()).toBe(0); // no diagram on a complete door
    expect(options("comm-win-section")).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(sel("comm-win-section").value).toBe("3");
    expect(options("comm-placement")).toEqual(["GL,GL,GL", "GL,GL,SOL", "GL,SOL,GL", "SOL,GL,GL", "GL,SOL,SOL", "SOL,GL,SOL", "SOL,SOL,GL"]);
    expect(sel("comm-placement").value).toBe("GL,GL,GL");
    change("comm-placement", "SOL,GL,SOL");
    change("comm-win-section", "4");
    const body = await getPrice();
    expect(body).toMatchObject({ order: "complete", model: "524", size: "10′2″ × 10′0″", glass: "glass", winSection: 4, windowPanels: [2], windowSize: "24x12" });
    // A new size starts over with every panel glass, and lists that width's placements.
    change("comm-size", "8′2″ × 8′0″");
    expect(options("comm-placement")).toEqual(["GL,GL", "GL,SOL", "SOL,GL"]);
    expect(sel("comm-placement").value).toBe("GL,GL");
    // Solid hides them all and sends no panels.
    change("comm-glass", "solid");
    expect(screen.queryByTestId("comm-placement")).toBeNull();
    expect(screen.queryByTestId("comm-win-section")).toBeNull();
    expect(await getPrice()).toMatchObject({ glass: "solid", windowPanels: [] });
  });

  it("offers a 3200 complete door 24x12 windows first, as the line reads", async () => {
    configure("complete", "Clopay", "3200");
    change("comm-size", "12′2″ × 10′0″");
    change("comm-glass", "glass");
    expect(options("comm-window-size")).toEqual(["24x12", "24x8"]);
    expect(sel("comm-window-size").value).toBe("24x12");
    expect(options("comm-placement")).toHaveLength(7);
    expect(await getPrice()).toMatchObject({ model: "3200", windowSize: "24x12", windowPanels: [1, 2, 3] });
  });
});

describe("commercial tab — stile locations on a 524 or 2415, under the stiles of the drawing (16/10/2026)", () => {
  it("shows a box a stile under the drawing from 9'3\", each its inches and quarter, and sends them written out", async () => {
    configure("section", "Wayne Dalton", "2415V");
    expect(stileRows()).toBe(0);
    width("8", "2");
    expect(panelsDrawn()).toBe(2);
    expect(stileRows()).toBe(0); // no stile input on an 8'2" or 9'2"
    expect(screen.queryByTestId("comm-stiles-needed")).toBeNull();
    width("9", "2");
    expect(stileRows()).toBe(0);
    width("12");
    expect(stileRows()).toBe(2); // 9'3" to 13'2": two
    expect(screen.getByTestId("comm-stiles").closest(".pdiag")).toBe(screen.getByTestId("comm-panels")); // under the panels
    width("16", "3");
    expect(stileRows()).toBe(4); // 16'3" to 20'2": four
    expect(options("comm-stile-1-frac")).toEqual(["0", "1/4", "1/2", "3/4"]);
    expect(sel("comm-stile-1-frac").value).toBe("0");
    stileInch(1, "39");
    stileInch(2, "78"); stileFrac(2, "1/2");
    stileInch(4, "156"); stileFrac(4, "1/4");
    stileFrac(3, "3/4"); // no inches: nothing written
    const body = await getPrice();
    expect(body).toMatchObject({ model: "2415V", secKind: "bt", stileLocations: ['39"', '78-1/2"', "", '156-1/4"'], stileLocationsNeeded: false });
    expect(screen.getByText("Enter in stile measurements — measurements are taken left to right.")).toBeTruthy();
  });

  it("lays a section out as Brandon drew it (16/10/2026): the section beside colour, end stiles and lock, the drawing across both", () => {
    configure("section", "Clopay", "524S");
    change("comm-sec-kind", "int");
    width("14");
    fireEvent.click(screen.getByTestId("comm-panel-1"));
    expect(panelsDrawn()).toBe(4);
    expect(stileRows()).toBe(3);
    const groupOf = (id: string) => screen.getByTestId(id).closest(".ggroup")!;
    const groups = [...document.querySelectorAll(".cfg2 > .ggroup")];
    expect(groups.map((g) => g.querySelector(".ghdr")?.textContent ?? "")).toEqual(["Replacement section", "Additional options", ""]);
    expect([...groups[0].querySelectorAll(".grow > label")].map((l) => l.textContent)).toEqual(["Section type", "Section height", "Door width"]);
    expect([...groups[1].querySelectorAll(".grow > label")].map((l) => l.textContent)).toEqual(["Color", "End stiles", "Lock"]);
    for (const id of ["comm-color", "comm-end-stiles", "comm-sec-lock"]) expect(groupOf(id)).toBe(groups[1]);
    for (const id of ["comm-panel-1", "comm-panel-1-size", "comm-stile-1", "comm-stile-3", "comm-stiles-needed"]) expect(groupOf(id)).toBe(groups[2]);
    expect(groups[2].classList.contains("span")).toBe(true);
    expect(screen.queryByTestId("comm-add-stile")).toBeNull();
    expect(screen.getByTestId("comm-stiles-needed").textContent).toBe("Stiles to be determined");
    expect(screen.getByText("If windows are needed, click on which panel you want windows in, and what size.")).toBeTruthy();
    // A bottom section: no lock, and the drawing stays for its stiles.
    change("comm-sec-kind", "bt");
    expect([...groups[1].querySelectorAll(".grow > label")].map((l) => l.textContent)).toEqual(["Color", "End stiles"]);
    expect(panelsDrawn()).toBe(4);
    expect(stileRows()).toBe(3);
    // No width, no drawing.
    width("");
    expect(screen.queryByTestId("comm-drawing")).toBeNull();
  });

  it("lays a complete door out with the track options under the door and its colour, the lock under the window options", () => {
    configure("complete", "Clopay", "524");
    const cols = [...document.querySelectorAll(".cfg2 > .cfgcol")];
    expect(cols).toHaveLength(2);
    expect([...cols[0].querySelectorAll(".ghdr")].map((h) => h.textContent)).toEqual(["Complete door", "Track options"]);
    expect([...cols[1].querySelectorAll(".ghdr")].map((h) => h.textContent)).toEqual(["Window options", "Additional options"]);
    expect(screen.getByTestId("comm-door-color").closest(".ggroup")!.querySelector(".ghdr")?.textContent).toBe("Complete door");
    const doorRows = [...screen.getByTestId("comm-size").closest(".ggroup")!.querySelectorAll(".grow > label")].map((l) => l.textContent);
    expect(doorRows).toEqual(["Size", "Color"]);
  });

  it("hides the boxes and says they are to be determined when the button is pressed", async () => {
    configure("section", "Clopay", "524");
    width("12");
    stileInch(1, "48");
    const needed = screen.getByTestId("comm-stiles-needed");
    expect(needed.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(needed);
    expect(needed.getAttribute("aria-pressed")).toBe("true");
    expect(stileRows()).toBe(0);
    expect(screen.queryByText("Enter in stile measurements — measurements are taken left to right.")).toBeNull();
    let body = await getPrice();
    expect(body).toMatchObject({ stileLocationsNeeded: true });
    fireEvent.click(needed);
    expect(stileRows()).toBe(2);
    expect((screen.getByTestId("comm-stile-1") as HTMLInputElement).value).toBe("48"); // kept
    body = await getPrice();
    expect(body).toMatchObject({ stileLocationsNeeded: false, stileLocations: ['48"', ""] });
  });

  it("asks no stile locations of a model that has none, and clears them on a new model", () => {
    configure("section", "Clopay", "524");
    width("12");
    stileInch(1, "48");
    fireEvent.click(screen.getByText("‹ Back"));
    change("comm-model", "3720");
    fireEvent.click(screen.getByTestId("comm-configure"));
    width("12");
    expect(panelsDrawn()).toBe(3);
    expect(stileRows()).toBe(0);
    expect(screen.queryByTestId("comm-stiles-needed")).toBeNull();
    fireEvent.click(screen.getByText("‹ Back"));
    change("comm-model", "524");
    fireEvent.click(screen.getByTestId("comm-configure"));
    width("12");
    expect((screen.getByTestId("comm-stile-1") as HTMLInputElement).value).toBe("");
  });
});
