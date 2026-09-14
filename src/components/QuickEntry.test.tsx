// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppShell } from "./AppShell";

/**
 * The box is switched OFF in AppShell as of 12/9/2026 — these render it with
 * `quickEntry` so the parser, the index and the component stay under test while
 * it waits. Turning the flag back on should leave all of this green.
 *
 * The box reads shorthand and either changes tab or fills the form. What it
 * must never do is price: Get price stays a deliberate act, so the counter sees
 * what was understood before a number reaches a customer.
 */

const MODELS = ["T50S", "T52S", "4050", "4051", "4053", "9130", "9133", "GD1LP", "GD1SP"];

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(async () =>
    new Response(JSON.stringify({ priced: true, unitPrice: 1, lines: [], description: "x" }),
      { status: 200, headers: { "content-type": "application/json" } })));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

/** The box lives behind a button, so open it first. */
const shell = () => {
  const r = render(<AppShell models={MODELS} user={{ username: "bc", role: "user" }} quickEntry />);
  fireEvent.click(screen.getByTestId("quick-open"));
  return r;
};
const type = (s: string) => fireEvent.change(screen.getByTestId("quick-entry"), { target: { value: s } });
const ids = () => [...document.querySelectorAll("[data-testid]")].map((e) => e.getAttribute("data-testid"));
const val = (id: string) => (screen.getByTestId(id) as HTMLSelectElement).value;
/** The apply is deferred a tick so a dozen setStates do not cascade. */
const settle = () => new Promise((r) => setTimeout(r, 60));

describe("quick entry — reading back", () => {
  it("shows what it understood before anything is applied", () => {
    shell();
    type("4050 16x7 wh 509");
    const read = screen.getByTestId("quick-read").textContent ?? "";
    expect(read).toContain("Stock Residential");
    expect(read).toContain("4050");
    expect(read).toContain("White");
    expect(read).toContain("509");
    // Nothing has changed on the form yet.
    expect(ids()).not.toContain("width-ft");
  });

  it("says so when it understood almost nothing", () => {
    shell();
    type("qwerty");
    expect(screen.getByTestId("quick-none")).toBeTruthy();
    expect(screen.queryByTestId("quick-use")).toBeNull();
  });

  it("clears when the box is emptied", () => {
    shell();
    type("4050 16x7 wh");
    expect(screen.getByTestId("quick-read")).toBeTruthy();
    type("");
    expect(screen.queryByTestId("quick-read")).toBeNull();
  });
});

describe("quick entry — filling a door", () => {
  it("fills the form and stops short of pricing", async () => {
    shell();
    type("4050 16x7 wh 509");
    fireEvent.click(screen.getByTestId("quick-use"));
    await settle();
    expect(val("width-ft")).toBe("16");
    expect(val("height-ft")).toBe("7");
    expect(val("color")).toBe("White");
    expect(val("windesign")).toBe("509");
    // The whole point: a price has not been fetched.
    expect(ids()).toContain("get-price");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("carries track, spring and lock across", async () => {
    shell();
    type("4050 16x7 wh 12 radius torsion lockbar");
    fireEvent.click(screen.getByTestId("quick-use"));
    await settle();
    expect(val("track")).toBe("r12");
    expect(val("spring")).toBe("torsion");
    expect(val("lock")).toBe("lockbar");
  });

  it("empties the box once used", async () => {
    shell();
    type("4050 16x7 wh");
    fireEvent.click(screen.getByTestId("quick-use"));
    await settle();
    expect((screen.getByTestId("quick-entry") as HTMLInputElement).value).toBe("");
  });
});

describe("quick entry — asking rather than guessing", () => {
  it("asks which model when a panel style names several", () => {
    // Four models share the short panel. Picking one would quote a different
    // door from the one the counter meant.
    shell();
    type("short panel 8x7 wh");
    expect(screen.getByTestId("quick-ask")).toBeTruthy();
    expect((screen.getByTestId("quick-use") as HTMLButtonElement).disabled).toBe(true);
  });

  it("enables the button once a model is chosen", async () => {
    shell();
    type("short panel 8x7 wh");
    fireEvent.click(screen.getByText("T50S"));
    expect((screen.getByTestId("quick-use") as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(screen.getByTestId("quick-use"));
    await settle();
    // The configurator shows the chosen model in its header, not a dropdown.
    expect(document.body.textContent).toContain("T50S");
    expect(screen.getByTestId("width-ft")).toBeTruthy();
  });

  it("offers only the models floored in that size", () => {
    // At 12'0" only the 4050 and T50S are on the floor, so the other two short
    // panel models are not offered.
    shell();
    type("short panel 12x7 wh");
    const chips = screen.getByTestId("quick-ask").textContent ?? "";
    expect(chips).toContain("4050");
    expect(chips).toContain("T50S");
    expect(chips).not.toContain("9130");
  });

  it("says when a colour is not floored in that size", () => {
    // Almond does not run at 7'0" — the note explains the dropped colour rather
    // than silently filling White.
    shell();
    type("4050 7x7 almond");
    expect(screen.getByTestId("quick-color-note")).toBeTruthy();
  });

  it("names words it ignored", () => {
    shell();
    type("4050 16x7 wh purple sparkles");
    expect(screen.getByTestId("quick-unmatched").textContent).toContain("purple");
  });
});

describe("quick entry — routing", () => {
  it("changes tab for a tool word", async () => {
    shell();
    type("vinyl molding");
    expect(screen.getByTestId("quick-use").textContent).toContain("Vinyl");
    fireEvent.click(screen.getByTestId("quick-use"));
    await waitFor(() => expect(screen.getByTestId("tabsel")).toHaveProperty("value", "vinyl"));
  });

  it("routes an operator model", async () => {
    shell();
    type("gh101l5");
    expect(screen.getByTestId("quick-read").textContent).toContain("GH101L5");
    fireEvent.click(screen.getByTestId("quick-use"));
    await waitFor(() => expect(screen.getByTestId("tabsel")).toHaveProperty("value", "operators"));
  });

  it("routes springs and parts", async () => {
    for (const [text, tab] of [["torsion spring 234 x 2 x 32", "torsion"], ["rollers", "parts"]] as const) {
      cleanup();
      shell();
      type(text);
      fireEvent.click(screen.getByTestId("quick-use"));
      await waitFor(() => expect(screen.getByTestId("tabsel")).toHaveProperty("value", tab));
    }
  });
});

describe("quick entry — the button", () => {
  it("starts collapsed behind a prompt", () => {
    render(<AppShell models={MODELS} user={{ username: "bc", role: "user" }} quickEntry />);
    const btn = screen.getByTestId("quick-open");
    expect(btn.textContent).toContain("Need help finding a door or part?");
    expect(screen.queryByTestId("quick-entry")).toBeNull();
  });

  it("opens and closes", () => {
    render(<AppShell models={MODELS} user={{ username: "bc", role: "user" }} quickEntry />);
    fireEvent.click(screen.getByTestId("quick-open"));
    expect(screen.getByTestId("quick-entry")).toBeTruthy();
    fireEvent.click(screen.getByTestId("quick-close"));
    expect(screen.queryByTestId("quick-entry")).toBeNull();
  });

  it("forgets what was typed when closed", () => {
    render(<AppShell models={MODELS} user={{ username: "bc", role: "user" }} quickEntry />);
    fireEvent.click(screen.getByTestId("quick-open"));
    fireEvent.change(screen.getByTestId("quick-entry"), { target: { value: "4050 16x7" } });
    fireEvent.click(screen.getByTestId("quick-close"));
    fireEvent.click(screen.getByTestId("quick-open"));
    expect((screen.getByTestId("quick-entry") as HTMLInputElement).value).toBe("");
  });
});

describe("quick entry — suggestions", () => {
  it("offers the 9133 from a partial model number", () => {
    shell();
    type("913");
    const list = screen.getByTestId("quick-hints").textContent ?? "";
    expect(list).toContain("9130");
    expect(list).toContain("9133");
  });

  it("offers torsion springs from a wire gauge", () => {
    // "207" is a wire size, not a model — it should find the springs wound on
    // it rather than nothing.
    shell();
    type("207");
    const list = screen.getByTestId("quick-hints").textContent ?? "";
    expect(list).toContain("207");
    expect(list).toContain("TORSION");
  });

  it("offers window designs by id and by name", () => {
    shell();
    type("sq2");
    expect(screen.getByTestId("quick-hints").textContent).toContain("SQ24");
    type("madi");
    expect(screen.getByTestId("quick-hints").textContent).toContain("Madison");
  });

  it("says nothing for one character", () => {
    shell();
    type("9");
    expect(screen.queryByTestId("quick-hints")).toBeNull();
  });

  it("adds a door suggestion to the line rather than leaving", () => {
    shell();
    type("913");
    fireEvent.click(screen.getByText("9133"));
    expect((screen.getByTestId("quick-entry") as HTMLInputElement).value).toContain("9133");
    expect(screen.getByTestId("quick-entry")).toBeTruthy();
  });

  it("goes straight there for a part or a spring", async () => {
    shell();
    type("207");
    const first = screen.getByTestId("quick-hints").querySelector("button")!;
    fireEvent.click(first);
    await waitFor(() => expect(screen.getByTestId("tabsel")).toHaveProperty("value", "torsion"));
    expect(screen.queryByTestId("quick-entry")).toBeNull();
  });
});

describe("quick entry is switched off", () => {
  it("does not render in the app", () => {
    // Off since 12/9/2026 — it rewards someone who already knows the models and
    // the shorthand, and the problem it was meant to help with is that people
    // are not using the tool as it stands.
    render(<AppShell models={MODELS} user={{ username: "bc", role: "user" }} />);
    expect(screen.queryByTestId("quick-open")).toBeNull();
    expect(screen.queryByTestId("quick-entry")).toBeNull();
  });

  it("still works when switched on", () => {
    // Everything above this block proves that; this is the one-line check that
    // the flag is the only thing standing in the way.
    render(<AppShell models={MODELS} user={{ username: "bc", role: "user" }} quickEntry />);
    expect(screen.getByTestId("quick-open")).toBeTruthy();
  });
});
