// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CommercialTool } from "./CommercialTool";

/**
 * The commercial tab's wiring, after CJ's RIBBED SECTIONS sheet (Brandon,
 * 15/10/2026): complete door or replacement section comes first, as two
 * buttons; sections are 24" unless changed; a complete door's windows are
 * pressed into the door drawing (22/10/2026), a section's by pressing the panels on the diagram;
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
const pressed = () => [1, 2, 3, 4, 5, 6, 7].filter((p) => screen.queryByTestId(`comm-panel-${p}`)?.getAttribute("data-on") === "true");
const addWindow = (p: number) => fireEvent.click(screen.getByTestId(`comm-panel-${p}-add`));
const removeWindow = (p: number) => fireEvent.click(screen.getByTestId(`comm-panel-${p}-remove`));
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

describe("commercial tab — a section's windows, pressed into the drawing once Add windows is pressed (16/10/2026)", () => {
  const hints = () => [...document.querySelectorAll(".phint")].map((h) => h.textContent);

  it("draws the section as soon as it has a width, opens the panels on Add windows, and a press puts a 24x12 window in one", async () => {
    configure("section", "Clopay", "524");
    change("comm-sec-kind", "int");
    expect(panelsDrawn()).toBe(0); // no width yet
    expect(screen.queryByTestId("comm-add-windows")).toBeNull();
    width("10", "2");
    expect(panelsDrawn()).toBe(3);
    // Drawn, but not pressable until Add windows.
    expect(screen.queryByTestId("comm-panel-2-add")).toBeNull();
    expect(hints()).toEqual([]);
    const add = screen.getByTestId("comm-add-windows");
    expect(add.textContent).toBe("Add windows");
    expect(add.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(add);
    expect(add.getAttribute("aria-pressed")).toBe("true");
    expect(hints()).toEqual(["+ Add window", "+ Add window", "+ Add window"]); // every empty panel says where to press
    expect(pressed()).toEqual([]);
    addWindow(2);
    expect(pressed()).toEqual([2]);
    expect(hints()).toHaveLength(2);
    expect(screen.queryByTestId("comm-panel-2-add")).toBeNull(); // the x at the top takes it out, not a press on the panel
    expect(screen.getByTestId("comm-panel-2-remove").textContent).toBe("×");
    expect(document.querySelector(".pglass-word")).toBeNull(); // the size alone in the box
    expect(options("comm-panel-2-size")).toEqual(["24x12", "24x6"]);
    expect(sel("comm-panel-2-size").value).toBe("24x12");
    let body = await getPrice();
    expect(body).toMatchObject({ order: "section", model: "524", manFt: 10, manIn: 2, secKind: "int", secHeight: "24", windowPanels: [2], windowSize: "24x12" });
    // The size is the section's: picked in one panel, every window has it.
    addWindow(3);
    change("comm-panel-3-size", "24x6");
    expect(sel("comm-panel-2-size").value).toBe("24x6");
    body = await getPrice();
    expect(body).toMatchObject({ windowPanels: [2, 3], windowSize: "24x6" });
    // The x takes a window out; Add windows pressed again closes the panels and clears them.
    removeWindow(2);
    expect(pressed()).toEqual([3]);
    expect(screen.getByTestId("comm-panel-2-add")).toBeTruthy();
    fireEvent.click(add);
    expect(add.getAttribute("aria-pressed")).toBe("false");
    expect(screen.queryByTestId("comm-panel-3-add")).toBeNull();
    expect(screen.queryByTestId("comm-panel-3-remove")).toBeNull();
    body = await getPrice();
    expect(body).toMatchObject({ windowPanels: [] });
  });

  it("offers each model its sizes, 24x12 first", () => {
    const check = (mfr: string, model: string, sizes: string[]) => {
      configure("section", mfr, model);
      change("comm-sec-kind", "int");
      width("12");
      fireEvent.click(screen.getByTestId("comm-add-windows"));
      addWindow(1);
      expect(options("comm-panel-1-size")).toEqual(sizes);
      expect(sel("comm-panel-1-size").value).toBe("24x12");
      cleanup();
    };
    check("Wayne Dalton", "2415V", ["24x12", "24x6"]);
    check("Wayne Dalton", "2415", ["24x12", "24x6"]);
    check("Clopay", "3200", ["24x12", "24x8"]);
    check("Clopay", "3720", ["24x12"]);
  });

  it("redraws the panels as the width changes, solid again", async () => {
    configure("section", "Clopay", "3200");
    change("comm-sec-kind", "int");
    width("16");
    expect(panelsDrawn()).toBe(4);
    fireEvent.click(screen.getByTestId("comm-add-windows"));
    addWindow(4);
    addWindow(1);
    expect(pressed()).toEqual([1, 4]);
    width("8");
    expect(panelsDrawn()).toBe(2);
    expect(pressed()).toEqual([]);
    expect(stileRows()).toBe(0); // a 3200 never asks for stile locations
    addWindow(2);
    change("comm-panel-2-size", "24x8");
    expect(await getPrice()).toMatchObject({ model: "3200", windowSize: "24x8", windowPanels: [2] });
  });

  it("draws a bottom section too, but takes no windows on it, whatever was pressed as an intermediate", async () => {
    configure("section", "Clopay", "524");
    change("comm-sec-kind", "int");
    width("12");
    fireEvent.click(screen.getByTestId("comm-add-windows"));
    addWindow(1);
    change("comm-sec-kind", "bt");
    expect(panelsDrawn()).toBe(3);
    expect(pressed()).toEqual([]); // drawn, not pressable
    expect(screen.queryByTestId("comm-panel-1-add")).toBeNull();
    expect(screen.queryByTestId("comm-add-windows")).toBeNull();
    expect(await getPrice()).toMatchObject({ secKind: "bt", windowPanels: [], lock: "none" });
  });

  it("labels the 524 non-insulated at the top, like the 2415", () => {
    configure("section", "Clopay", "524");
    expect(screen.getByTestId("comm-model-note").textContent).toBe("Clopay · 2″ non-insulated");
    expect(screen.queryByTestId("comm-joint")).toBeNull();
    cleanup();
    configure("section", "Wayne Dalton", "2415");
    expect(screen.getByTestId("comm-model-note").textContent).toBe("Wayne Dalton · 2″ non-insulated");
  });

  it("offers a lockbar on an intermediate section without windows only (Brandon, 20/10/2026)", async () => {
    configure("section", "Wayne Dalton", "2415V");
    expect(screen.queryByTestId("comm-sec-lock")).toBeNull();
    change("comm-sec-kind", "int");
    expect(options("comm-sec-lock")).toEqual(["none", "lockbar", "lockbar_installed"]);
    change("comm-sec-lock", "lockbar_installed");
    width("8", "2");
    expect(await getPrice()).toMatchObject({ secKind: "int", lock: "lockbar_installed" });
    // A window in the section takes the lock away.
    fireEvent.click(screen.getByTestId("comm-add-windows"));
    fireEvent.click(screen.getByTestId("comm-panel-1-add"));
    expect(screen.queryByTestId("comm-sec-lock")).toBeNull();
    expect(await getPrice()).toMatchObject({ secKind: "int", lock: "none" });
    fireEvent.click(screen.getByTestId("comm-panel-1-remove"));
    expect(options("comm-sec-lock")).toEqual(["none", "lockbar", "lockbar_installed"]);
    change("comm-sec-kind", "bt");
    expect(await getPrice()).toMatchObject({ secKind: "bt", lock: "none" });
  });

  it("says inside looking out over the drawing (Brandon, 20/10/2026)", () => {
    configure("section", "Wayne Dalton", "2415V");
    width("8", "2");
    expect(screen.getByTestId("comm-looking-out").textContent).toBe("Inside looking out");
  });
});

describe("commercial tab — a complete door's windows, pressed into the door drawing (Brandon, 22/10/2026)", () => {
  const doorOn = () => [...document.querySelectorAll('[data-testid^="door-panel-"][data-on="true"]')].map((el) => el.getAttribute("data-testid")!.replace("door-panel-", ""));
  const doorSections = () => [...document.querySelectorAll('[data-testid^="door-section-"]')].map((el) => el.getAttribute("data-testid")!).filter((id) => /^door-section-\d+$/.test(id));

  it("draws the door as Clopay stacks it under Glass type, with the third section glass to begin with, and takes a row at a time", async () => {
    configure("complete", "Clopay", "524");
    expect(screen.queryByTestId("comm-door-drawing")).toBeNull();
    change("comm-size", "10′2″ × 10′0″");
    expect(screen.queryByTestId("comm-door-drawing")).toBeNull(); // solid: no drawing
    change("comm-glass", "glass");
    expect(panelsDrawn()).toBe(0); // the section drawing is the replacement section's
    // The old section and placement dropdowns are gone.
    expect(screen.queryByTestId("comm-win-section")).toBeNull();
    expect(screen.queryByTestId("comm-placement")).toBeNull();
    expect(screen.queryByTestId("comm-window-size")).toBeNull();
    // A 10'0" 524: five sections off the industrial chart, three panels across; the third row glass.
    expect(doorSections()).toEqual(["door-section-5", "door-section-4", "door-section-3", "door-section-2", "door-section-1"]);
    expect(screen.getByTestId("door-section-5-height").textContent).toBe("24″");
    expect(screen.getByTestId("door-section-1-height").textContent).toBe("24″");
    expect(doorOn()).toEqual(["3-1", "3-2", "3-3"]);
    // Each window shows its size in the panel: 24x12, with 24x6 to pick.
    expect(options("door-panel-3-2-size")).toEqual(["24x12", "24x6"]);
    // A panel comes out on its x; a press in another row starts that row.
    fireEvent.click(screen.getByTestId("door-panel-3-1-remove"));
    fireEvent.click(screen.getByTestId("door-panel-3-3-remove"));
    expect(doorOn()).toEqual(["3-2"]);
    fireEvent.click(screen.getByTestId("door-panel-4-2-add"));
    expect(doorOn()).toEqual(["4-2"]);
    fireEvent.click(screen.getByTestId("door-panel-4-3-add"));
    expect(doorOn()).toEqual(["4-2", "4-3"]);
    change("door-panel-4-2-size", "24x6");
    const body = await getPrice();
    expect(body).toMatchObject({ order: "complete", model: "524", size: "10′2″ × 10′0″", glass: "glass", winSection: 4, windowPanels: [2, 3], windowSize: "24x6" });
    // ALL beside a row fills it, and clears any other.
    fireEvent.click(screen.getByTestId("door-section-5-all"));
    expect(doorOn()).toEqual(["5-1", "5-2", "5-3"]);
    expect(await getPrice()).toMatchObject({ winSection: 5, windowPanels: [1, 2, 3] });
    // A new size starts over with every panel of the third section glass.
    change("comm-size", "8′2″ × 8′0″");
    expect(doorSections()).toHaveLength(4);
    expect(doorOn()).toEqual(["3-1", "3-2"]);
    // Solid takes the drawing away and sends no panels.
    change("comm-glass", "solid");
    expect(screen.queryByTestId("comm-door-drawing")).toBeNull();
    expect(await getPrice()).toMatchObject({ glass: "solid", windowPanels: [] });
  });

  it("offers a complete door in white alone, and sends white (Brandon, 22/10/2026)", async () => {
    configure("complete", "Clopay", "524");
    expect(options("comm-door-color")).toEqual(["White"]);
    expect(sel("comm-door-color").disabled).toBe(true);
    change("comm-size", "8′2″ × 8′0″");
    expect(await getPrice()).toMatchObject({ order: "complete", model: "524", color: "White" });
    cleanup();
    configure("complete", "Clopay", "3200");
    expect(options("comm-door-color")).toEqual(["White"]);
    // Sections still come in brown where the table lists it.
    cleanup();
    configure("section", "Clopay", "524");
    expect(options("comm-color")).toEqual(["White", "Brown"]);
  });

  it("offers a 3200 complete door 24x12 windows first in the panel, as the line reads, off the energy chart", async () => {
    configure("complete", "Clopay", "3200");
    change("comm-size", "12′2″ × 10′0″");
    change("comm-glass", "glass");
    expect(doorSections()).toHaveLength(5);
    expect(screen.getByTestId("door-section-5-height").textContent).toBe("24″");
    expect(screen.getByTestId("door-section-1-height").textContent).toBe("24″");
    expect(options("door-panel-3-1-size")).toEqual(["24x12", "24x8"]);
    expect(sel("door-panel-3-1-size").value).toBe("24x12");
    expect(doorOn()).toEqual(["3-1", "3-2", "3-3"]);
    expect(await getPrice()).toMatchObject({ model: "3200", windowSize: "24x12", winSection: 3, windowPanels: [1, 2, 3] });
  });
});

describe("commercial tab — stile locations on a 524 or 2415, under the stiles of the drawing (16/10/2026)", () => {
  it("shows a box a stile under the drawing from 9'3\", each its inches and quarter, and sends them written out", async () => {
    configure("section", "Wayne Dalton", "2415V");
    expect(stileRows()).toBe(0);
    width("8", "2");
    expect(panelsDrawn()).toBe(2);
    expect(stileRows()).toBe(0); // no stile input on an 8'2" or 9'2"
    width("9", "2");
    expect(stileRows()).toBe(0);
    width("12");
    expect(stileRows()).toBe(2); // 9'3" to 13'2": two
    expect(screen.getByTestId("comm-stiles").closest(".pdiag")).toBe(screen.getByTestId("comm-panels")); // under the panels
    width("16", "3");
    expect(stileRows()).toBe(4); // 16'3" to 20'2": four
    expect(options("comm-stile-1-frac")).toEqual(["0", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4"]);
    expect([...sel("comm-stile-1-frac").options].map((o) => o.textContent)).toEqual(["0", '1/8"', '1/4"', '3/8"', '1/2"', '5/8"', '3/4"']);
    expect(sel("comm-stile-1-frac").value).toBe("0");
    // Left blank, the engine writes "stile locations needed": nothing else is sent for it.
    let body = await getPrice();
    expect(body).toMatchObject({ stileLocations: ["", "", "", ""] });
    expect(body).not.toHaveProperty("stileLocationsNeeded");
    expect(screen.queryByTestId("comm-stiles-needed")).toBeNull();
    stileInch(1, "39");
    stileInch(2, "78"); stileFrac(2, "1/2");
    stileInch(4, "156"); stileFrac(4, "1/4");
    stileFrac(3, "3/4"); // no inches: nothing written
    body = await getPrice();
    expect(body).toMatchObject({ model: "2415V", secKind: "bt", stileLocations: ['39"', '78-1/2"', "", '156-1/4"'] });
    expect(screen.getByText("Enter in stile measurements — measurements are taken left to right.")).toBeTruthy();
  });

  it("adds a stile box for a double end stile, and ADD STILE's + adds a stile line and its box — never a window panel — that its − takes out again (Brandon, 20/10/2026)", async () => {
    configure("section", "Wayne Dalton", "2415V");
    width("12");
    const stileLines = () => document.querySelectorAll(".pstile-line").length;
    expect(stileRows()).toBe(2);
    expect(stileLines()).toBe(2);
    expect(panelsDrawn()).toBe(3);
    expect((screen.getByTestId("comm-remove-stile") as HTMLButtonElement).disabled).toBe(true);
    change("comm-end-stiles", "double");
    expect(stileRows()).toBe(4);
    expect(stileLines()).toBe(4);   // a double end stile is a line and a box at either end
    expect([1, 2, 3, 4].map((i) => screen.getByTestId(`comm-stile-line-${i}`).style.left)).toEqual(["5%", "33.33333333333333%", "66.66666666666666%", "95%"]);
    fireEvent.click(screen.getByTestId("comm-add-stile"));
    expect(stileRows()).toBe(5);
    expect(stileLines()).toBe(5);
    expect(panelsDrawn()).toBe(3);  // the window panels are the width's
    expect((screen.getByTestId("comm-remove-stile") as HTMLButtonElement).disabled).toBe(false);
    stileInch(1, "8"); stileInch(2, "39"); stileInch(4, "117"); stileInch(5, "140");
    expect(await getPrice()).toMatchObject({ stile: "double", stileLocations: ['8"', '39"', "", '117"', '140"'] });
    expect(await getPrice()).not.toHaveProperty("extraStiles");
    // − takes out the one added by hand (117), not the right end stile's (140).
    fireEvent.click(screen.getByTestId("comm-remove-stile"));
    expect(stileRows()).toBe(4);
    expect(stileLines()).toBe(4);
    expect(await getPrice()).toMatchObject({ stileLocations: ['8"', '39"', "", '140"'] });
    // Back to a single end stile: the end boxes go, the ones across keep what was typed.
    change("comm-end-stiles", "single");
    expect(stileRows()).toBe(2);
    expect(await getPrice()).toMatchObject({ stileLocations: ['39"', ""] });
    // The inches can be picked as well as typed.
    change("comm-stile-2-pick", "78");
    expect((screen.getByTestId("comm-stile-2") as HTMLInputElement).value).toBe("78");
    expect(await getPrice()).toMatchObject({ stileLocations: ['39"', '78"'] });
    // And the end stiles' measurements come back with them.
    change("comm-end-stiles", "double");
    expect(await getPrice()).toMatchObject({ stileLocations: ['8"', '39"', '78"', '140"'] });
  });

  it("lays a section out as Brandon drew it (16/10/2026): the section beside colour, end stiles and lock, the drawing across both with its notes and Add windows under it", () => {
    configure("section", "Clopay", "524S");
    change("comm-sec-kind", "int");
    width("14");
    expect(panelsDrawn()).toBe(4);
    expect(stileRows()).toBe(3);
    const groupOf = (id: string) => screen.getByTestId(id).closest(".ggroup")!;
    const groups = [...document.querySelectorAll(".cfg2 > .ggroup")];
    expect(groups.map((g) => g.querySelector(".ghdr")?.textContent ?? "")).toEqual(["Replacement section", "Additional options", ""]);
    expect([...groups[0].querySelectorAll(".grow > label")].map((l) => l.textContent)).toEqual(["Section type", "Section height", "Door width"]);
    expect([...groups[1].querySelectorAll(".grow > label")].map((l) => l.textContent)).toEqual(["Color", "End stiles", "Lock"]);
    for (const id of ["comm-color", "comm-end-stiles", "comm-sec-lock"]) expect(groupOf(id)).toBe(groups[1]);
    for (const id of ["comm-panel-1", "comm-stile-1", "comm-stile-3", "comm-add-windows"]) expect(groupOf(id)).toBe(groups[2]);
    expect(groups[2].classList.contains("span")).toBe(true);
    // The stile note, then the button, under the drawing; no other note.
    const notes = groups[2].querySelector(".pnotes")!;
    expect([...notes.children].map((el) => el.textContent)).toEqual([
      "Enter in stile measurements — measurements are taken left to right.",
      "Add windows",
    ]);
    expect(screen.queryByText(/If windows are needed/)).toBeNull();
    // A bottom section: no lock, no Add windows, and the drawing stays for its stiles.
    change("comm-sec-kind", "bt");
    expect([...groups[1].querySelectorAll(".grow > label")].map((l) => l.textContent)).toEqual(["Color", "End stiles"]);
    expect(panelsDrawn()).toBe(4);
    expect(stileRows()).toBe(3);
    expect(screen.queryByTestId("comm-add-windows")).toBeNull();
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
    fireEvent.click(screen.getByText("‹ Back"));
    change("comm-model", "524");
    fireEvent.click(screen.getByTestId("comm-configure"));
    width("12");
    expect((screen.getByTestId("comm-stile-1") as HTMLInputElement).value).toBe("");
  });
});
