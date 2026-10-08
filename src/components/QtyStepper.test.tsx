// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { useState } from "react";
import { QtyStepper } from "./QtyStepper";

afterEach(cleanup);

function Harness({ start = "1", min }: { start?: string; min?: number }) {
  const [v, setV] = useState(start);
  return <QtyStepper value={v} onChange={setV} min={min} testId="q" />;
}
const box = () => screen.getByTestId("q") as HTMLInputElement;

describe("the quantity stepper (7/10/2026)", () => {
  it("steps up and down with the buttons, and never below one", () => {
    render(<Harness />);
    expect((screen.getByTestId("q-minus") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByTestId("q-plus"));
    fireEvent.click(screen.getByTestId("q-plus"));
    expect(box().value).toBe("3");
    fireEvent.click(screen.getByTestId("q-minus"));
    expect(box().value).toBe("2");
  });

  it("takes a typed number", () => {
    render(<Harness />);
    fireEvent.change(box(), { target: { value: "24" } });
    expect(box().value).toBe("24");
    fireEvent.click(screen.getByTestId("q-plus"));
    expect(box().value).toBe("25");
  });

  it("lets a person empty the box and type a new number (8/10/2026)", () => {
    // Backspace used to snap an empty box back to 1, so typing 5 made 15.
    render(<Harness start="1" />);
    fireEvent.change(box(), { target: { value: "" } });
    expect(box().value).toBe("");
    fireEvent.change(box(), { target: { value: "5" } });
    expect(box().value).toBe("5");
    fireEvent.click(screen.getByTestId("q-plus"));
    expect(box().value).toBe("6");
  });

  it("puts the last good number back when the box is left empty or too low", () => {
    render(<Harness start="3" />);
    fireEvent.change(box(), { target: { value: "" } });
    fireEvent.blur(box());
    expect(box().value).toBe("3");
    fireEvent.change(box(), { target: { value: "0" } }); // below the lowest, 1
    expect(box().value).toBe("0");
    fireEvent.blur(box());
    expect(box().value).toBe("3");
  });

  it("shows a reset from outside straight away, mid-typing", () => {
    function Resettable() {
      const [v, setV] = useState("1");
      return (<><QtyStepper value={v} onChange={setV} min={0} testId="q" /><button onClick={() => setV("")}>reset</button></>);
    }
    render(<Resettable />);
    fireEvent.change(box(), { target: { value: "24" } });
    fireEvent.click(screen.getByText("reset")); // Inventory clears the count after a shelf
    expect(box().value).toBe("");
  });

  it("goes down to zero where none is allowed (a spring hand, an inventory count)", () => {
    render(<Harness start="1" min={0} />);
    fireEvent.click(screen.getByTestId("q-minus"));
    expect(box().value).toBe("0");
    expect((screen.getByTestId("q-minus") as HTMLButtonElement).disabled).toBe(true);
  });

  it("starts an empty box from its lowest", () => {
    render(<Harness start="" min={0} />);
    fireEvent.click(screen.getByTestId("q-plus"));
    expect(box().value).toBe("1");
  });

  it("leaves the cursor where it was, so a scan box keeps it", () => {
    const onChange = vi.fn();
    render(<QtyStepper value={1} onChange={onChange} testId="q" />);
    const down = new MouseEvent("mousedown", { bubbles: true, cancelable: true });
    screen.getByTestId("q-plus").dispatchEvent(down);
    expect(down.defaultPrevented).toBe(true);
  });
});

describe("every quantity box in the app is a stepper", () => {
  // Measurements and money keep plain number boxes: these are the only ones.
  const ALLOWED = [
    'data-testid="parts-feet"', 'data-testid="cable-ft"', 'data-testid="cable-in"', // feet and inches
    'data-testid="width-ft"', 'data-testid="height-ft"', 'data-testid="comm-width-ft"', // door and section sizes
    'step="0.01"', // prices
  ];

  it("has no plain number box left but measurements and prices", () => {
    const dir = join(process.cwd(), "src/components");
    const offenders: string[] = [];
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(".tsx") || f.includes(".test.") || f === "QtyStepper.tsx") continue;
      const src = readFileSync(join(dir, f), "utf8");
      for (let i = src.indexOf("<input"); i >= 0; i = src.indexOf("<input", i + 1)) {
        const tag = src.slice(i, src.indexOf("/>", i) + 2);
        if (tag.includes('type="number"') && !ALLOWED.some((a) => tag.includes(a))) offenders.push(`${f}: ${tag.slice(0, 80)}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
