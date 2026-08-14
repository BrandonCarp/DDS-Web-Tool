"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copy-to-clipboard button shared by all four tools.
 *
 * Replaces the old "Print quote" / "Save quote" footer buttons — the counter
 * pastes straight into QuickBooks rather than printing. navigator.clipboard is
 * only available in a secure context (https / localhost); the textarea path is
 * the fallback for anything else.
 */
/**
 * The clipboard form of a price: no currency symbol.
 *
 * The counter copies out of here and pastes straight into the Rate column in
 * QuickBooks, which wants a number — a leading "$" had to be deleted by hand
 * on every single paste. On screen the price still reads "$1,234.50"; only the
 * copied text differs.
 */
export function priceText(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Copy a price to the clipboard.
 *
 * Exists so the no-symbol rule lives in exactly one place. Every tool copies a
 * price, and nine separate `text={fmt(price)}` call sites meant nine chances
 * for the tenth one to get it wrong. Pass the number, not the formatted
 * string.
 */
export function CopyPrice({
  amount,
  label = "Copy price",
  primary = false,
  testId,
  onCopy,
}: {
  amount: number;
  label?: string;
  primary?: boolean;
  testId?: string;
  onCopy?: () => void;
}) {
  return (
    <CopyButton
      text={priceText(amount)}
      label={label}
      primary={primary}
      testId={testId}
      onCopy={onCopy}
    />
  );
}

export function CopyButton({
  text,
  label,
  primary = false,
  testId,
  onCopy,
}: {
  text: string;
  label: string;
  primary?: boolean;
  testId?: string;
  /** Fired after a successful copy. Used to record the estimate — copying is
   *  the moment a quote is actually used, so it stands in for the old
   *  "Save quote" button. */
  onCopy?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    const value = text ?? "";
    if (!value) return;
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        ok = true;
      }
    } catch {
      /* fall through to the textarea path */
    }
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (!ok) return;
    onCopy?.();
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      className={primary ? "btn primary" : "btn"}
      type="button"
      onClick={copy}
      {...(testId ? { "data-testid": testId } : {})}
    >
      {copied ? "Copied ✓" : label}
    </button>
  );
}
