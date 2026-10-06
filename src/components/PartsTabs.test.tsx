// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PartsTool } from "./PartsTool";
import { CustomerJobProvider } from "./CustomerJobFields";
import { TRACK_CATEGORIES, CABLE_CATEGORIES } from "@/lib/pricing/data/springs";
import { PARTS_MENU, PARTS_TAB_MENU, TRACK_MENU, GROUP_TABS } from "@/lib/pricing/data/parts-menu";

/** The Parts, Track and Cables tabs are one tool, each given its own shelf. */
afterEach(cleanup);
const show = (ui: React.ReactElement) => render(<CustomerJobProvider>{ui}</CustomerJobProvider>);

describe("Parts, Track and Cables tabs", () => {
  it("leaves tracks and cables out of the Parts tab's categories", () => {
    show(<PartsTool />);
    const cats = [...(screen.getByTestId("parts-category") as HTMLSelectElement).options].map((o) => o.value);
    expect(cats).not.toContain("TRACKS");
    expect(cats).not.toContain("CABLES");
    expect(cats).toContain("DRUMS");
  });

  it("gives Track its own shelf: tracks only, no category to choose", () => {
    show(<PartsTool categories={TRACK_CATEGORIES} eyebrow="Track quote" finder="Find track" />);
    expect(screen.queryByTestId("parts-category")).toBeNull();
    expect(screen.getByText("Find track")).toBeTruthy();
    expect(screen.getByText("Track quote")).toBeTruthy();
    expect(document.body.textContent).toContain(TRACK_CATEGORIES[0].items[0].name.replace(/\\"/g, '"'));
  });

  it("gives Cables its own shelf too", () => {
    show(<PartsTool categories={CABLE_CATEGORIES} eyebrow="Cables quote" finder="Find a cable" />);
    expect(screen.queryByTestId("parts-category")).toBeNull();
    expect(screen.getByText("Cables quote")).toBeTruthy();
    expect(document.body.textContent).toContain(CABLE_CATEGORIES[0].items[0].name);
  });
});

describe("Track tab headings", () => {
  it("shows its groups as headings, residential first", () => {
    show(<PartsTool categories={TRACK_CATEGORIES} eyebrow="Track quote" finder="Find track" />);
    expect(screen.getAllByTestId("parts-group").map((h) => h.textContent)).toEqual([
      "RESIDENTIAL TRACKS", "ADDER PIECES", "PIERCED TRACK", "COMMERCIAL TRACKS", "RAW TRACK",
    ]);
  });

  it("adds no headings to the Parts tab", () => {
    show(<PartsTool />);
    expect(screen.queryAllByTestId("parts-group")).toHaveLength(0);
  });
});

describe("raw track on the Track tab", () => {
  const pickRaw = () => {
    show(<PartsTool categories={TRACK_CATEGORIES} eyebrow="Track quote" finder="Find track" />);
    fireEvent.click(screen.getByText('2" RAW TRACK').closest("button")!);
  };
  const feet = (v: string) => fireEvent.change(screen.getByTestId("parts-feet"), { target: { value: v } });

  it("refuses more than 24 ft, with no line to copy", () => {
    pickRaw();
    feet("30");
    expect(screen.getByTestId("parts-feet-error").textContent).toContain("1 to 24 ft");
    expect(screen.queryByTestId("parts-copy-qb")).toBeNull();
  });

  it("says what a length is charged as, and nothing before one is entered", () => {
    pickRaw();
    expect(screen.queryByTestId("parts-feet-note")).toBeNull();
    feet("10");
    expect(screen.getByTestId("parts-feet-note").textContent).toContain("Charged as 12 ft");
    expect(screen.getByTestId("parts-copy-qb")).toBeTruthy();
    feet("13");
    expect(screen.getByTestId("parts-feet-note").textContent).toContain("Charged as 24 ft");
  });
});

describe("a part with no price yet", () => {
  it("says Price not set, and offers nothing to paste or add to the cart", () => {
    show(<PartsTool categories={CABLE_CATEGORIES} eyebrow="Cables quote" finder="Find a cable" />);
    const row = screen.getByText('1/8" CABLE, 250FT ROLL').closest("button")!;
    expect(row.textContent).toContain("Price not set");
    fireEvent.click(row);
    expect(screen.getByTestId("parts-price").textContent).toBe("Price not set");
    expect(screen.getByText(/no price yet/i)).toBeTruthy();
    expect(screen.queryByTestId("parts-copy-qb")).toBeNull();
    expect(screen.queryByTestId("parts-copy-qb-cart")).toBeNull();
  });
});

describe("the Parts buttons (6/10/2026)", () => {
  const open = (group: string, page?: string) => {
    fireEvent.click(screen.getByTestId(group));
    if (page) fireEvent.click(screen.getByTestId(page));
  };

  it("leaves the five group tabs off the Parts tab's buttons", () => {
    show(<PartsTool menu={PARTS_TAB_MENU} />);
    for (const g of ["tools", "angle", "retainers", "seals", "tube-shafts"]) expect(screen.queryByTestId(`group-${g}`), g).toBeNull();
    expect(screen.getByTestId("group-drums")).toBeTruthy();
  });

  it("shows no list and no prompt until a page is picked, then just that page's parts", () => {
    show(<PartsTool menu={PARTS_MENU} />);
    expect(screen.queryByTestId("parts-list")).toBeNull();
    expect(document.body.textContent).not.toMatch(/pick a category|choose a category|pick one of the buttons/i);
    expect(screen.queryByTestId("parts-category")).toBeNull();
    open("group-retainers", "page-l-retainers");
    expect(screen.getByTestId("parts-page").textContent).toBe("Retainers › L retainers");
    expect(document.querySelectorAll("ul.partlist .partrow")).toHaveLength(3);
  });

  it("picks the part straight away on a one-part page", () => {
    show(<PartsTool menu={PARTS_MENU} />);
    open("group-tools", "page-felco-cutter");
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe("CABLE CUTTER");
  });

  it("opens a group with one page directly", () => {
    show(<PartsTool menu={PARTS_MENU} />);
    open("group-locks");
    expect(screen.getByTestId("parts-page").textContent).toBe("Locks");
    expect(document.querySelector(".pnav-pages")).toBeNull();
  });

  it("has no search box of its own — the top bar's is the one (6/10/2026)", () => {
    show(<PartsTool menu={PARTS_MENU} />);
    expect(screen.queryByTestId("parts-search")).toBeNull();
  });

  it("opens a group tab straight onto its pages", () => {
    const angle = GROUP_TABS.find((t) => t.id === "angle")!;
    show(<PartsTool menu={angle.menu} categories={angle.categories} group="Angle" />);
    expect(document.querySelector(".pnav-groups")).toBeNull();
    expect([...document.querySelectorAll(".pnav-page")].map((b) => b.textContent)).toEqual(["Galvanized", "White", '2" x 2" x 10\'']);
    expect(screen.queryByTestId("parts-list")).toBeNull(); // nothing listed, and no prompt, until a page is picked
    fireEvent.click(screen.getByTestId("page-white"));
    expect(screen.getByTestId("parts-page").textContent).toBe("Angle › White");
  });
});

describe("the Track buttons (6/10/2026)", () => {
  const track = () => show(<PartsTool menu={TRACK_MENU} categories={TRACK_CATEGORIES} eyebrow="Track quote" finder="Find track" />);
  const rows = () => [...document.querySelectorAll("ul.partlist .partrow .partname")].map((e) => e.firstChild?.textContent);

  it("asks residential or commercial for a complete track, then lists its sets like the other tabs", () => {
    track();
    fireEvent.click(screen.getByTestId("group-complete-track"));
    expect([...document.querySelectorAll(".pnav-page")].map((b) => b.textContent)).toEqual(["Residential", "Commercial"]);
    expect(screen.queryByTestId("parts-list")).toBeNull();
    fireEvent.click(screen.getByTestId("page-commercial"));
    expect(rows()).toHaveLength(8);
    expect(document.querySelector("ul.partlist .partsub")).toBeNull(); // the heading already says Commercial
    fireEvent.click(document.querySelector("ul.partlist .partrow") as HTMLElement);
    expect(document.querySelector("aside.quote .qtitle")?.textContent).toBe(rows()[0]);
  });

  it("lists the pieces straight from the other three buttons", () => {
    track();
    fireEvent.click(screen.getByTestId("group-adder-pieces"));
    expect(rows()).toEqual(['36" ADDER PIECE', '54" ADDER PIECE']);
    fireEvent.click(screen.getByTestId("group-pierced-track"));
    expect(rows()).toHaveLength(4);
    expect(screen.queryByTestId("parts-pick")).toBeNull(); // no drop-down any more
  });
});
