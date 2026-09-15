// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ResidentialTool } from "./ResidentialTool";

/**
 * Track mount, high lift and incline style — the controls Clopay splits out
 * under TRACK OPTIONS. The flow here is unchanged; these just sit alongside the
 * spring and radius dropdowns.
 */

const MODELS = ["4050", "4051", "4053", "T50S"];
let priced: Record<string, unknown>[] = [];

beforeEach(() => {
  priced = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    if (String(url).includes("/api/price") && init?.body) priced.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ priced: true, unitPrice: 1, lines: [], description: "x" }),
      { status: 200, headers: { "content-type": "application/json" } });
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const sel = (id: string) => screen.getByTestId(id) as HTMLSelectElement;
const opts = (id: string) => [...sel(id).options].map((o) => o.value).filter(Boolean);

async function configure(model = "4050") {
  render(<ResidentialTool models={MODELS} />);
  const series = sel("series");
  for (const c of [...series.options].map((o) => o.value).filter(Boolean)) {
    fireEvent.change(series, { target: { value: c } });
    const m = screen.queryByTestId("model") as HTMLSelectElement | null;
    if (m && [...m.options].some((o) => o.value === model)) {
      fireEvent.change(m, { target: { value: model } });
      break;
    }
  }
  fireEvent.click(screen.getByTestId("configure"));
  await waitFor(() => screen.getByTestId("width-ft"));
}
const settle = () => new Promise((r) => setTimeout(r, 30));

describe("track mount", () => {
  it("offers the three mounts", async () => {
    await configure();
    expect(opts("track-mount")).toEqual(["bracket", "continuous_angle", "reverse_angle"]);
  });

  it("defaults to bracket", async () => {
    await configure();
    expect(sel("track-mount").value).toBe("bracket");
  });
});

describe("high lift lives inside the track dropdown", () => {
  it("offers High lift as a radius choice on torsion", async () => {
    await configure();
    fireEvent.change(sel("spring"), { target: { value: "torsion" } });
    await settle();
    expect(opts("track")).toContain("high_lift");
  });

  it("does not offer it on extension", async () => {
    // High lift is a torsion option.
    await configure();
    fireEvent.change(sel("spring"), { target: { value: "extension" } });
    await settle();
    expect(opts("track")).not.toContain("high_lift");
  });

  it("drops back to a standard radius if the spring changes to extension", async () => {
    await configure();
    fireEvent.change(sel("spring"), { target: { value: "torsion" } });
    await settle();
    fireEvent.change(sel("track"), { target: { value: "high_lift" } });
    await settle();
    expect(sel("track").value).toBe("high_lift");
    fireEvent.change(sel("spring"), { target: { value: "extension" } });
    await settle();
    expect(sel("track").value).toBe("r12");
    expect(screen.queryByTestId("high-lift")).toBeNull();
  });

  it("asks for the amount only once High lift is chosen", async () => {
    await configure();
    fireEvent.change(sel("spring"), { target: { value: "torsion" } });
    await settle();
    expect(screen.queryByTestId("high-lift")).toBeNull();
    expect(screen.queryByTestId("incline")).toBeNull();
    fireEvent.change(sel("track"), { target: { value: "high_lift" } });
    await settle();
    expect(screen.getByTestId("high-lift")).toBeTruthy();
    expect(screen.getByTestId("incline")).toBeTruthy();
  });

  it("caps the amount at the door height less 3 inches", async () => {
    // Above that the door is full vertical lift, not high lift.
    await configure();
    fireEvent.change(sel("height-ft"), { target: { value: "7" } });
    fireEvent.change(sel("spring"), { target: { value: "torsion" } });
    await settle();
    fireEvent.change(sel("track"), { target: { value: "high_lift" } });
    await settle();
    const steps = opts("high-lift").map(Number).filter((n) => n > 0);
    expect(steps[steps.length - 1]).toBe(81);
    expect(steps.every((n) => n % 3 === 0)).toBe(true);
    expect(steps).not.toContain(84);
  });

  it("offers more on a taller door", async () => {
    await configure();
    fireEvent.change(sel("height-ft"), { target: { value: "8" } });
    fireEvent.change(sel("spring"), { target: { value: "torsion" } });
    await settle();
    fireEvent.change(sel("track"), { target: { value: "high_lift" } });
    await settle();
    const steps = opts("high-lift").map(Number).filter((n) => n > 0);
    expect(steps[steps.length - 1]).toBe(93);
  });
});

describe("what gets sent", () => {
  const price = async () => {
    fireEvent.change(sel("width-ft"), { target: { value: "16" } });
    fireEvent.change(sel("height-ft"), { target: { value: "7" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(priced.length).toBeGreaterThan(0));
    return priced[priced.length - 1];
  };

  it("sends mount, incline and inches", async () => {
    await configure();
    fireEvent.change(sel("height-ft"), { target: { value: "7" } });
    fireEvent.change(sel("spring"), { target: { value: "torsion" } });
    fireEvent.change(sel("track-mount"), { target: { value: "continuous_angle" } });
    await settle();
    fireEvent.change(sel("track"), { target: { value: "high_lift" } });
    await settle();
    fireEvent.change(sel("high-lift"), { target: { value: "60" } });
    fireEvent.change(sel("incline"), { target: { value: "deg25" } });
    const body = await price();
    expect(body.trackMount).toBe("continuous_angle");
    expect(body.incline).toBe("deg25");
    expect(body.highLiftInches).toBe(60);
  });

  it("sends zero lift on a standard radius", async () => {
    await configure();
    const body = await price();
    expect(body.highLiftInches).toBe(0);
  });

  it("re-prices when the mount changes", async () => {
    await configure();
    await price();
    const before = priced.length;
    fireEvent.change(sel("track-mount"), { target: { value: "reverse_angle" } });
    fireEvent.click(screen.getByTestId("get-price"));
    await waitFor(() => expect(priced.length).toBeGreaterThan(before));
    expect(priced[priced.length - 1].trackMount).toBe("reverse_angle");
  });
});
