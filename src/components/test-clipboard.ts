import { vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";

/**
 * For tests: press a copy button and return what landed on the clipboard.
 *
 * The quote cards no longer show a price or a description — both only travel
 * in the Copy for QuickBooks line — so that line is what the tests read.
 */
export async function copyFrom(button: HTMLElement): Promise<string> {
  let copied = "";
  // CopyButton only uses the clipboard on a secure page (https, or localhost),
  // as a real browser requires. The test page is neither, so say it is.
  vi.stubGlobal("isSecureContext", true);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (t: string) => { copied = t; } },
  });
  fireEvent.click(button);
  await waitFor(() => {
    if (!copied) throw new Error("nothing was copied yet");
  });
  return copied;
}

/** The four fields Copy for QuickBooks pastes: item, description, quantity, rate. */
export async function copiedQbLine(button: HTMLElement) {
  const [item, description, qty, rate] = (await copyFrom(button)).split("\t");
  return { item, description, qty: Number(qty), rate: Number(rate) };
}
