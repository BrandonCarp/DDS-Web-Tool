// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PartsTool } from "./PartsTool";
import { CustomerJobProvider } from "./CustomerJobFields";
import { TRACK_CATEGORIES, CABLE_CATEGORIES } from "@/lib/pricing/data/springs";

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
