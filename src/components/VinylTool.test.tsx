// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { VinylTool } from "./VinylTool";
import { copiedQbLine } from "./test-clipboard";

afterEach(cleanup);

describe("Vinyl tab: number of doors (7/10/2026)", () => {
  const door = (color: string, w: string, h: string, doors?: string) => {
    render(<VinylTool />);
    fireEvent.change(screen.getByTestId("vinyl-color"), { target: { value: color } });
    fireEvent.change(screen.getByTestId("vinyl-w"), { target: { value: w } });
    fireEvent.change(screen.getByTestId("vinyl-h"), { target: { value: h } });
    if (doors) fireEvent.change(screen.getByTestId("vinyl-doors"), { target: { value: doors } });
  };

  it("multiplies every piece by the doors, and pastes the total feet as the quantity", async () => {
    door("ALMOND", "8", "7", "2");
    const line = await copiedQbLine(screen.getByTestId("vinyl-copy-qb"));
    expect(line.description).toBe("ALMOND VINYL STOP MOLDING,  [2] - 8FT AND [4] - 7FT");
    expect(line.qty).toBe(44); // (8 + 7 + 7) x 2
    expect(screen.getByTestId("vinyl-qty").textContent).toBe("44");
  });

  it("starts at one door", async () => {
    door("ALMOND", "8", "7");
    expect((screen.getByTestId("vinyl-doors") as HTMLInputElement).value).toBe("1");
    const line = await copiedQbLine(screen.getByTestId("vinyl-copy-qb"));
    expect(line.description).toBe("ALMOND VINYL STOP MOLDING,  [1] - 8FT AND [2] - 7FT");
    expect(line.qty).toBe(22);
  });
});
