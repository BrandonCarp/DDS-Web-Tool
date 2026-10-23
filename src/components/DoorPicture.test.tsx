// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DoorPicture } from "./DoorPicture";
import { classicStack, glazedStack } from "@/lib/pricing/data/door-stacks";

// The canvas is the browser's; here the drawing hands back a stand-in picture.
vi.mock("./door-draw", () => ({ drawDoor: vi.fn(async () => "data:image/png;base64,AAAA") }));

afterEach(cleanup);

/**
 * The door picture in the drawing's place (Brandon, 23/10/2026): the real
 * door, the row of windows picked by a press on its section, as the drawing
 * has it.
 */
describe("DoorPicture", () => {
  const stack = glazedStack(classicStack(7, 0)!, 4);
  const base = { model: "4300", colour: "White", widthIn: 108, stack, window: "PS12" };

  it("shows the drawing until the picture is drawn, then the door with its sections to press", async () => {
    const pick = vi.fn();
    render(<DoorPicture spec={{ ...base, windowRow: 4 }} alt="door" pickRows={new Set([4, 3])} onPickRow={pick}
      fallback={<div data-testid="door-diagram">drawing</div>} />);
    expect(screen.getByTestId("door-diagram").textContent).toBe("drawing");
    await waitFor(() => expect(screen.getByTestId("door-picture")).toBeTruthy());
    expect(screen.getByTestId("door-diagram").className).toContain("dpic");
    const picks = screen.getAllByRole("button").map((b) => b.getAttribute("data-testid"));
    expect(picks).toEqual(["door-section-4-pick", "door-section-3-pick"]);
    expect(screen.getByTestId("door-section-4-pick").getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByTestId("door-section-3-pick").getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByTestId("door-section-1-height").textContent).toBe("21″");
    fireEvent.click(screen.getByTestId("door-section-3-pick"));
    expect(pick).toHaveBeenCalledWith(3);
  });

  it("marks the row the windows are in", async () => {
    render(<DoorPicture spec={{ ...base, windowRow: 3 }} alt="door" pickRows={new Set([4, 3])} fallback={null} />);
    await waitFor(() => expect(screen.getByTestId("door-picture")).toBeTruthy());
    expect(screen.getByTestId("door-section-3-pick").getAttribute("aria-pressed")).toBe("true");
  });

  it("keeps the drawing where the door cannot be drawn", async () => {
    render(<DoorPicture spec={{ ...base, window: "SQ23" }} alt="door" fallback={<div data-testid="door-diagram">drawing</div>} />);
    await new Promise((r) => setTimeout(r, 20));
    expect(screen.getByTestId("door-diagram").textContent).toBe("drawing");
    expect(screen.queryByTestId("door-picture")).toBeNull();
  });

  it("puts a Modern Steel door's windows in panel by panel, on the picture", async () => {
    const toggle = vi.fn();
    const all = vi.fn();
    render(<DoorPicture spec={{ model: "9208", colour: "White", widthIn: 192, stack: [21, 21, 21, 21], window: "SLIMBLACK", places: [{ section: 4, panel: 2 }], across: 4 }}
      alt="door" panels={{ across: 4, on: new Set(["4:2"]), onToggle: toggle, onSetSection: all }} fallback={<div data-testid="door-diagram">drawing</div>} />);
    await waitFor(() => expect(screen.getByTestId("door-picture")).toBeTruthy());
    expect(screen.getByTestId("door-panel-4-2").getAttribute("data-on")).toBe("true");
    expect(screen.getByTestId("door-panel-4-1").getAttribute("data-on")).toBe("false");
    fireEvent.click(screen.getByTestId("door-panel-3-1-add"));
    expect(toggle).toHaveBeenCalledWith({ section: 3, panel: 1 });
    fireEvent.click(screen.getByTestId("door-panel-4-2-remove"));
    expect(toggle).toHaveBeenCalledWith({ section: 4, panel: 2 });
    fireEvent.click(screen.getByTestId("door-section-1-all"));
    expect(all).toHaveBeenCalledWith(1, [1, 2, 3, 4], true);
  });

  it("has nothing to press on a Gallery: its windows stay in the top section", async () => {
    render(<DoorPicture spec={{ model: "GD1LP", colour: "White", widthIn: 96, stack: [21, 21, 21, 21], window: "PL16" }} alt="door" pickRows={new Set()} fallback={null} />);
    await waitFor(() => expect(screen.getByTestId("door-picture")).toBeTruthy());
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getAllByText("21″")).toHaveLength(4);
  });
});
