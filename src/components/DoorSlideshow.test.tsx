// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { DoorSlideshow, SLIDE_MS } from "./DoorSlideshow";

const PHOTOS = ["/a.webp", "/b.webp", "/c.webp", "/d.webp", "/e.webp"];
const shown = () => document.querySelector(".doorshow img.on")?.getAttribute("src");
const onPage = () => document.querySelectorAll(".doorshow img").length;
const motion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({ matches: reduce && q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} }));

beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("the welcome cards' door slideshow", () => {
  it("moves to the next photo every few seconds, and comes round again", () => {
    motion(false);
    render(<DoorSlideshow photos={PHOTOS} />);
    expect(shown()).toBe("/a.webp");
    act(() => { vi.advanceTimersByTime(SLIDE_MS); });
    expect(shown()).toBe("/b.webp");
    act(() => { vi.advanceTimersByTime(SLIDE_MS * 4); });
    expect(shown()).toBe("/a.webp");
  });

  it("never has more than three photos on the page", () => {
    motion(false);
    render(<DoorSlideshow photos={PHOTOS} />);
    for (let i = 0; i < PHOTOS.length; i++) {
      expect(onPage()).toBeLessThanOrEqual(3);
      act(() => { vi.advanceTimersByTime(SLIDE_MS); });
    }
  });

  it("holds still for anyone who asks for less motion", () => {
    motion(true);
    render(<DoorSlideshow photos={PHOTOS} />);
    act(() => { vi.advanceTimersByTime(SLIDE_MS * 3); });
    expect(shown()).toBe("/a.webp");
  });

  it("is hidden from screen readers, as decoration", () => {
    motion(false);
    render(<DoorSlideshow photos={PHOTOS} />);
    expect(document.querySelector(".doorshow")?.getAttribute("aria-hidden")).toBe("true");
  });
});
