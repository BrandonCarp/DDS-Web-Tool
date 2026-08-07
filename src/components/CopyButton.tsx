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
