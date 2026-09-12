// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { QbLineDemo } from "./QbLineDemo";

afterEach(cleanup);

describe("QuickBooks helper", () => {
  it("renders nothing while it is switched off", () => {
    // Hidden on every tool — Brandon, 12/9/2026. The seven call sites are
    // untouched, so bringing it back is a one-line change here.
    const { container } = render(<QbLineDemo />);
    expect(container.firstChild).toBeNull();
    expect(screen.queryByText(/Getting this quote into QuickBooks/i)).toBeNull();
  });

  it("stays out of the way of the tools that mount it", () => {
    // It took no props from the quote and changed no price, so hiding it can
    // only remove markup — nothing downstream reads it.
    const { container } = render(
      <QbLineDemo model="4050" size="9′0&quot; X 7′0&quot;" rate="1,234.56" qty="2" />,
    );
    expect(container.innerHTML).toBe("");
  });
});
