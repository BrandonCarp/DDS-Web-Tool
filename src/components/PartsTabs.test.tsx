// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PartsTool } from "./PartsTool";
import type { Part, PartCategory } from "@/lib/pricing/data/parts";
import { copiedQbLine } from "./test-clipboard";
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
    expect(screen.getByTestId("parts-feet-note").textContent).toContain("Charged as 12FT");
    expect(screen.getByTestId("parts-copy-qb")).toBeTruthy();
    feet("13");
    expect(screen.getByTestId("parts-feet-note").textContent).toContain("Charged as 24FT");
  });
});

describe("a part with no price yet", () => {
  // No real part is unpriced since the cable rolls were priced (6/10/2026); a
  // made-up one keeps the rule tested for the next that arrives without a price.
  const UNPRICED: PartCategory = { name: "TEST SHELF", items: [{ name: "TEST ROLL", desc: "TEST ROLL", price: 0, priceNotSet: true } as Part] };

  it("says Price not set, and offers nothing to paste or add to the cart", () => {
    show(<PartsTool categories={[UNPRICED]} eyebrow="Cables quote" finder="Find a cable" />);
    const row = screen.getByText("TEST ROLL").closest("button")!;
    expect(row.textContent).toContain("Price not set");
    fireEvent.click(row);
    expect(screen.getByTestId("parts-price").textContent).toBe("Price not set");
    expect(screen.getByText(/no price yet/i)).toBeTruthy();
    expect(screen.queryByTestId("parts-copy-qb")).toBeNull();
    expect(screen.queryByTestId("parts-copy-qb-cart")).toBeNull();
  });
});

describe("cable rolls on the Cables tab (6/10/2026)", () => {
  it("paste a 250FT roll at its price", async () => {
    show(<PartsTool categories={CABLE_CATEGORIES} eyebrow="Cables quote" finder="Find a cable" />);
    fireEvent.click(screen.getByText('5/32" CABLE, 250FT ROLL').closest("button")!);
    expect(screen.getByTestId("parts-price").textContent).toBe("$149.95");
    const line = await copiedQbLine(screen.getByTestId("parts-copy-qb"));
    expect([line.description, line.rate]).toEqual(['5/32" CABLE,  250FT ROLL', 149.95]);
    expect(screen.queryByText(/500FT/)).toBeNull();
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

describe("seals paste the feet as the quantity (7/10/2026)", () => {
  const tab = (id: string) => GROUP_TABS.find((t) => t.id === id)!;

  it("pastes 50FT of bottom T rubber as 50, at the per-foot price", async () => {
    const seals = tab("seals");
    show(<PartsTool menu={seals.menu} categories={seals.categories} group="Seals" eyebrow="Seals quote" finder="Find seals" />);
    fireEvent.click(screen.getByTestId("page-bottom-t-rubbers"));
    fireEvent.click(screen.getByText('4" BOTTOM T RUBBER').closest("button")!);
    fireEvent.change(screen.getByTestId("parts-feet"), { target: { value: "50" } });
    expect(screen.queryByTestId("parts-copy-qb-qty")).toBeNull(); // the feet are the quantity
    expect(screen.getByTestId("parts-price").textContent).toBe("$1.25/ft"); // the price per foot, not the run's total
    const line = await copiedQbLine(screen.getByTestId("parts-copy-qb"));
    expect([line.qty, line.rate]).toEqual([50, 1.25]);
    expect(line.description).toContain("BOTTOM T RUBBER");
    expect(line.description).toContain("50FT"); // the description stays as it was
  });

  it("leaves retainers as one line at the price of the stick", async () => {
    const retainers = tab("retainers");
    show(<PartsTool menu={retainers.menu} categories={retainers.categories} group="Retainers" />);
    fireEvent.click(screen.getByTestId("page-u-retainers"));
    fireEvent.click(document.querySelector("ul.partlist .partrow") as HTMLElement);
    fireEvent.change(screen.getByTestId("parts-feet"), { target: { value: "12" } });
    const line = await copiedQbLine(screen.getByTestId("parts-copy-qb"));
    expect(line.qty).toBe(1);
    expect(line.description).toContain("16FT");
  });
});

describe("retainers measured in feet and inches (9/10/2026)", () => {
  const uRetainer = () => {
    const retainers = GROUP_TABS.find((t) => t.id === "retainers")!;
    show(<PartsTool menu={retainers.menu} categories={retainers.categories} group="Retainers" />);
    fireEvent.click(screen.getByTestId("page-u-retainers"));
    fireEvent.click(screen.getByText('2" U RETAINER').closest("button")!);
  };

  it("offers an inches box, 0 to 11, beside the feet", () => {
    uRetainer();
    const inches = screen.getByTestId("parts-inches") as HTMLSelectElement;
    expect([...inches.options].map((o) => o.value)).toEqual(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
  });

  it("bills 8'6\" by the foot, to the inch, and names the length on the line", async () => {
    uRetainer();
    fireEvent.change(screen.getByTestId("parts-feet"), { target: { value: "8" } });
    fireEvent.change(screen.getByTestId("parts-inches"), { target: { value: "6" } });
    const line = await copiedQbLine(screen.getByTestId("parts-copy-qb"));
    expect(line.description).toContain("8'6\"");
    expect(line.rate).toBeCloseTo(3.75 * 8.5, 2);
  });

  it("bills 10'1\" as the 16FT stick, since it is over 10 feet, with no note saying so", async () => {
    uRetainer();
    fireEvent.change(screen.getByTestId("parts-feet"), { target: { value: "10" } });
    fireEvent.change(screen.getByTestId("parts-inches"), { target: { value: "1" } });
    expect(screen.queryByTestId("parts-feet-note")).toBeNull(); // the line says 16FT; nothing else does (9/10/2026)
    const line = await copiedQbLine(screen.getByTestId("parts-copy-qb"));
    expect(line.description).toContain("16FT");
    expect(line.rate).toBeCloseTo(3.75 * 16, 2);
  });

  it("gives other per-foot parts whole feet only", () => {
    const seals = GROUP_TABS.find((t) => t.id === "seals")!;
    show(<PartsTool menu={seals.menu} categories={seals.categories} group="Seals" />);
    fireEvent.click(screen.getByTestId("page-brush-seals"));
    fireEvent.click(document.querySelector("ul.partlist .partrow") as HTMLElement);
    expect(screen.queryByTestId("parts-inches")).toBeNull();
  });
});
