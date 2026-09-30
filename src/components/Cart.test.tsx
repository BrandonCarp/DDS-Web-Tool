// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { CartProvider, CartTool } from "./Cart";
import { CopyQuickBooks } from "./CopyQuickBooks";
import { copyFrom } from "./test-clipboard";

/** The cart, fed by two quotes' QuickBooks buttons. */
afterEach(cleanup);
const VINYL = { item: "VINYL", description: "WHITE VINYL STOP MOLDING", qty: 23, rate: 0.95 };
const quotes = () => (
  <CartProvider>
    <CopyQuickBooks item="STOCK DOOR" description="CLOPAY MODEL 4050" rate={604.63} qty={1} extraLines={[VINYL]} testId="door" />
    <CopyQuickBooks item="PARTS" description="ANGLE IRON" rate={25} testId="angle" />
    <CartTool />
  </CartProvider>
);
const lines = () => screen.queryAllByTestId("cartline");
const qtys = () => screen.queryAllByTestId("cartline-qty").map((q) => (q as HTMLInputElement).value);

describe("the cart", () => {
  it("adds a door with its vinyl as two lines, and pastes every line with a blank row between", async () => {
    render(quotes());
    fireEvent.click(screen.getByTestId("door-cart"));
    fireEvent.click(screen.getByTestId("angle-cart"));
    expect(lines()).toHaveLength(3);
    const copied = await copyFrom(screen.getByTestId("cart-qb"));
    expect(copied.split("\n")).toEqual([
      "STOCK DOOR\tCLOPAY MODEL 4050\t1\t604.63", "",
      "VINYL\tWHITE VINYL STOP MOLDING\t23\t0.95", "",
      "PARTS\tANGLE IRON\t1\t25.00",
    ]);
  });

  it("adds to a line's quantity when the same thing is added again", () => {
    render(quotes());
    fireEvent.click(screen.getByTestId("door-cart"));
    fireEvent.click(screen.getByTestId("door-cart"));
    expect(lines()).toHaveLength(2);
    expect(qtys()).toEqual(["2", "46"]);
  });

  it("lets a quantity be changed and a line removed, and Clear empties it", () => {
    render(quotes());
    fireEvent.click(screen.getByTestId("door-cart"));
    fireEvent.change(screen.getAllByTestId("cartline-qty")[0], { target: { value: "3" } });
    expect(qtys()[0]).toBe("3");
    fireEvent.click(screen.getAllByTestId("cartline-del")[1]);
    expect(lines()).toHaveLength(1);
    fireEvent.click(screen.getByTestId("cart-clear"));
    expect(lines()).toHaveLength(0);
  });

  it("shows no Add to cart on a quote with no cart around it", () => {
    render(<CopyQuickBooks item="PARTS" description="ANGLE IRON" rate={25} testId="alone" />);
    expect(screen.queryByTestId("alone-cart")).toBeNull();
  });
});
