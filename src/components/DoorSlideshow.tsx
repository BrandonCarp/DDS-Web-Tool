"use client";

import { useEffect, useState } from "react";

/** How long each photo stays before the next fades in. */
export const SLIDE_MS = 4000;

/**
 * Door photos, one fading into the next, on the welcome cards — Brandon,
 * 1/10/2026.
 *
 * Only three photos are ever on the page: the one showing, the one fading out
 * and the next one (loading quietly), so opening a tab does not fetch them all.
 * The photos are decoration — the card's words say what to do — so screen
 * readers skip them, and anyone who has asked their system for less motion
 * gets the first photo, still.
 */
export function DoorSlideshow({ photos, testId }: { photos: readonly string[]; testId?: string }) {
  const [shown, setShown] = useState(0);
  const n = photos.length;

  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setShown((i) => (i + 1) % n), SLIDE_MS);
    return () => clearInterval(timer);
  }, [n]);

  if (!n) return null;
  const keep = new Set([(shown - 1 + n) % n, shown, (shown + 1) % n]);
  return (
    <div className="doorshow" aria-hidden="true" data-testid={testId}>
      {photos.map((src, i) =>
        keep.has(i) ? (
          <img key={src} src={src} alt="" className={i === shown ? "on" : undefined} decoding="async" />
        ) : null,
      )}
    </div>
  );
}
