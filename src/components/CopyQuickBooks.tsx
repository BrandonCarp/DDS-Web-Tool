"use client";

import { useState } from "react";
import { CopyButton, CopyPrice } from "./CopyButton";
import { AddToCart } from "./Cart";
import { copyExtrasFor, useCurrentUser } from "./CurrentUser";
import { quickBooksRow } from "@/lib/pricing/data/quickbooks";
import { QtyStepper } from "./QtyStepper";

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
  extraLines,
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
  /** More invoice lines, each pasted two rows below the one before with a
      blank row between — how a door's vinyl rides along (Brandon, 25/9/2026). */
  extraLines?: { item: string; description: string; qty: number; rate: number }[];
}) {
  const [own, setOwn] = useState(defaultQty);
  const extras = copyExtrasFor(useCurrentUser());
  const controlled = qty !== undefined;
  const n = controlled ? qty : own;
  // One clipboard line per invoice row; an empty line leaves that row blank.
  // The paste script moves down a row for every line break.
  const text = [
    quickBooksRow(item, description, n, rate),
    ...(extraLines ?? []).flatMap((l) => ["", quickBooksRow(l.item, l.description, l.qty, l.rate)]),
  ].join("\n");

  return (
    <>
    <span className="qbline">
      {!controlled && (
        <span className="qbqty">
          <span>Qty</span>
          <QtyStepper value={own} testId={`${testId}-qty`} onChange={(v) => setOwn(Math.max(1, Number(v) || 1))} />
        </span>
      )}
      <CopyButton
        text={text}
        label="QuickBooks"
        primary
        testId={testId}
        onCopy={onCopy}
      />
    </span>
    {/* Some accounts also copy the pieces on their own (Aimee 6/10/2026,
        doorsdirect 7/10/2026): the description in capitals, as QuickBooks gets
        it; the quantity on the line; and the rate — through CopyPrice, so it
        goes out as a bare number like every price copy. */}
    {extras.includes("description") && (
      <CopyButton text={description.replace(/[\t\r\n]+/g, " ").trim().toUpperCase()} label="Copy description" testId={`${testId}-desc`} />
    )}
    {extras.includes("quantity") && <CopyButton text={String(n)} label="Copy quantity" testId={`${testId}-qtycopy`} />}
    {extras.includes("price") && <CopyPrice amount={rate} testId={`${testId}-price`} />}
    {/* The same lines, kept in the Cart tab for later (30/9/2026). */}
    <AddToCart lines={[{ item, description, qty: n, rate }, ...(extraLines ?? [])]} testId={`${testId}-cart`} />
    </>
  );
}
