// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { VinylTool } from "./VinylTool";
import { copiedQbLine } from "./test-clipboard";

afterEach(cleanup);

const size = (i: number, ft: string) => fireEvent.change(screen.getByTestId(`vinyl-size-${i}`), { target: { value: ft } });
const count = (i: number) => (screen.getByTestId(`vinyl-count-${i}`) as HTMLInputElement).value;
const stock = () => [...screen.getByTestId("vinyl-stock").querySelectorAll(".vstock-ft")].map((e) => e.textContent);
const sizes = (i: number) => [...(screen.getByTestId(`vinyl-size-${i}`) as HTMLSelectElement).options].map((o) => o.value).filter(Boolean);

describe("Vinyl tab, by the piece (7/10/2026)", () => {
  it("starts on White, with White's stock lengths listed and offered", () => {
    render(<VinylTool />);
    expect((screen.getByTestId("vinyl-color") as HTMLSelectElement).value).toBe("WHITE");
    expect(screen.getByText("Stock White vinyl")).toBeTruthy();
    expect(stock()).toEqual(["7FT", "8FT", "9FT", "10FT", "12FT", "16FT", "18FT"]);
    expect(sizes(0)).toEqual(["7", "8", "9", "10", "12", "16", "18"]);
  });

  it("prices nothing until a size is picked", () => {
    render(<VinylTool />);
    expect(screen.queryByTestId("vinyl-copy-qb")).toBeNull();
    expect(screen.getByText("Pick a size to price the molding")).toBeTruthy();
  });

  it("builds the line from the sizes and counts: [2] - 8FT AND [4] - 7FT", async () => {
    render(<VinylTool />);
    size(0, "8");
    fireEvent.click(screen.getByTestId("vinyl-plus-0")); // 1 -> 2
    fireEvent.click(screen.getByTestId("vinyl-add-line"));
    size(1, "7");
    fireEvent.change(screen.getByTestId("vinyl-count-1"), { target: { value: "4" } }); // typed
    const line = await copiedQbLine(screen.getByTestId("vinyl-copy-qb"));
    expect(line.description).toBe("WHITE VINYL STOP MOLDING,  [2] - 8FT AND [4] - 7FT");
    expect([line.qty, line.rate]).toEqual([44, 0.95]); // 16 + 28 ft, by the foot
    expect(screen.getByTestId("vinyl-qty").textContent).toBe("44");
  });

  it("never steps a count below one", () => {
    render(<VinylTool />);
    expect((screen.getByTestId("vinyl-minus-0") as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByTestId("vinyl-plus-0"));
    fireEvent.click(screen.getByTestId("vinyl-minus-0"));
    fireEvent.click(screen.getByTestId("vinyl-minus-0"));
    expect(count(0)).toBe("1");
  });

  it("adds up two lines of the same size, and removes a line", async () => {
    render(<VinylTool />);
    size(0, "16");
    fireEvent.click(screen.getByTestId("vinyl-add-line"));
    size(1, "16");
    fireEvent.click(screen.getByTestId("vinyl-add-line"));
    size(2, "9");
    fireEvent.click(screen.getByTestId("vinyl-remove-2"));
    expect(screen.getAllByTestId("vinyl-line")).toHaveLength(2);
    const line = await copiedQbLine(screen.getByTestId("vinyl-copy-qb"));
    expect(line.description).toBe("WHITE VINYL STOP MOLDING,  [2] - 16FT");
  });

  it("follows the colour: its stock lengths, and a size it does not stock is cleared", () => {
    render(<VinylTool />);
    size(0, "12");
    fireEvent.change(screen.getByTestId("vinyl-color"), { target: { value: "ALMOND" } });
    expect(screen.getByText("Stock Almond vinyl")).toBeTruthy();
    expect(stock()).toEqual(["7FT", "8FT", "9FT", "16FT"]);
    expect((screen.getByTestId("vinyl-size-0") as HTMLSelectElement).value).toBe("");
    expect(screen.queryByTestId("vinyl-copy-qb")).toBeNull();
  });

  it("clears back to one empty line", () => {
    render(<VinylTool />);
    size(0, "8");
    fireEvent.click(screen.getByTestId("vinyl-add-line"));
    fireEvent.click(screen.getByTestId("vinyl-clear"));
    expect(screen.getAllByTestId("vinyl-line")).toHaveLength(1);
    expect((screen.getByTestId("vinyl-size-0") as HTMLSelectElement).value).toBe("");
  });
});
