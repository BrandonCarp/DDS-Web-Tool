"use client";

import { useEffect } from "react";

/**
 * The sign-in notice's window (Brandon, 20/10/2026): the title and message
 * the admin panel set, over the sign-in page once the account is in, and
 * the admin panel's preview of the same. OK (or Escape) is the only way on.
 * Styled on its own, the sign-in page's white card, so it reads the same in
 * either place.
 */
export function NoticeModal({ title, body, onClose, testId = "login-notice" }: {
  title: string;
  body: string;
  onClose: () => void;
  testId?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="notice-scrim">
      <div className="notice-modal" role="dialog" aria-modal="true" aria-labelledby={title ? `${testId}-title` : undefined} data-testid={testId}>
        {title && <h2 id={`${testId}-title`} data-testid={`${testId}-title`}>{title}</h2>}
        <div className="notice-body" data-testid={`${testId}-body`}>{body}</div>
        <button type="button" className="notice-ok" data-testid={`${testId}-ok`} onClick={onClose} autoFocus>OK</button>
      </div>
    </div>
  );
}
