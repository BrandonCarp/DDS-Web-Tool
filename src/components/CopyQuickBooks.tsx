"use client";

import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { quickBooksRow } from "@/lib/pricing/data/quickbooks";

/**
 * Copy a whole QuickBooks invoice line.
 *
 * Puts ITEM, DESCRIPTION, QTY and RATE on the clipboard tab-separated. In
 * QuickBooks the counter clicks the first cell of a line and presses F9; an
 * AutoHotkey macro reads the clipboard, splits on the tabs and types each
 * field with a Tab between.
 *
 * The macro exists because QuickBooks will not spread a multi-column paste
 * across a row, and its own Copy Line uses a private clipboard format that a
 * browser cannot write. Plain tab-separated text is the only thing both ends
 * can agree on.
 *
 * RATE is always the price of ONE. QuickBooks multiplies by QTY itself, so
 * sending a line total would square it.
 */
export function CopyQuickBooks({
  item,
  description,
  rate,
  qty,
  defaultQty = 1,
  testId = "copy-qb",
  onCopy,
}: {
  /** Must match an item in the QuickBooks list — see data/quickbooks.ts. */
  item: string;
  description: string;
  /** Unit price. Never a line total. */
  rate: number;
  /** Supply this where the tool already owns a quantity; otherwise the button
      carries its own box, which is the case on the parts and spring tabs. */
  qty?: number;
  defaultQty?: number;
  testId?: string;
  onCopy?: () => void;
}) {
  const [own, setOwn] = useState(defaultQty);
  const controlled = qty !== undefined;
  const n = controlled ? qty : own;

  return (
    <span className="qbline">
      {!controlled && (
        <label className="qbqty">
          Qty
          <input
            type="number"
            min={1}
            value={own}
            data-testid={`${testId}-qty`}
            onChange={(e) => setOwn(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
      )}
      <CopyButton
        text={quickBooksRow(item, description, n, rate)}
        label="Copy for QuickBooks"
        primary
        testId={testId}
        onCopy={onCopy}
      />
    </span>
  );
}
