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
      "STOCK DOOR\tCLOPAY  MODEL  4050\t1\t604.63", "",
      "VINYL\tWHITE  VINYL  STOP  MOLDING\t23\t0.95", "",
      "PARTS\tANGLE  IRON\t1\t25.00",
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

  it("writes the quantity into a line that counts its pieces, as added and as changed (16/10/2026)", async () => {
    render(
      <CartProvider>
        <CopyQuickBooks item="PARTS" description='2" PLASTIC U RETAINER WITH RUBBER, [1] - 16FT' rate={60} counted testId="ret" />
        <CartTool />
      </CartProvider>,
    );
    // Two on the button, then three in the cart; the same retainer again adds to it.
    fireEvent.change(screen.getByTestId("ret-qty"), { target: { value: "2" } });
    expect(await copyFrom(screen.getByTestId("ret"))).toBe('PARTS\t2"  PLASTIC  U  RETAINER  WITH  RUBBER,  [2]  -  16FT\t2\t60.00');
    fireEvent.click(screen.getByTestId("ret-cart"));
    expect(lines()[0].textContent).toContain("[2] - 16FT");
    fireEvent.change(screen.getAllByTestId("cartline-qty")[0], { target: { value: "3" } });
    expect(lines()[0].textContent).toContain("[3] - 16FT");
    fireEvent.click(screen.getByTestId("ret-cart"));
    expect(lines()).toHaveLength(1);
    expect(qtys()).toEqual(["5"]);
    expect(await copyFrom(screen.getByTestId("cart-qb"))).toBe('PARTS\t2"  PLASTIC  U  RETAINER  WITH  RUBBER,  [5]  -  16FT\t5\t60.00');
  });

  it("asks whether to clear the cart once it is copied to QuickBooks (12/10/2026)", async () => {
    render(quotes());
    fireEvent.click(screen.getByTestId("door-cart"));
    expect(screen.queryByTestId("cart-clear-prompt")).toBeNull();
    await copyFrom(screen.getByTestId("cart-qb"));
    expect(screen.getByTestId("cart-clear-prompt")).toBeTruthy();
    // No keeps the lines; the prompt closes.
    fireEvent.click(screen.getByTestId("cart-clear-ask-no"));
    expect(screen.queryByTestId("cart-clear-prompt")).toBeNull();
    expect(lines()).toHaveLength(2);
    // Yes empties the cart.
    await copyFrom(screen.getByTestId("cart-qb"));
    fireEvent.click(screen.getByTestId("cart-clear-ask-yes"));
    expect(screen.queryByTestId("cart-clear-prompt")).toBeNull();
    expect(lines()).toHaveLength(0);
  });

  it("shows no Add to cart on a quote with no cart around it", () => {
    render(<CopyQuickBooks item="PARTS" description="ANGLE IRON" rate={25} testId="alone" />);
    expect(screen.queryByTestId("alone-cart")).toBeNull();
  });
});
