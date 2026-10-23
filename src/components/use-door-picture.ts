"use client";

import { useEffect, useMemo, useState } from "react";
import { doorLayout, type DoorLayout, type DoorPictureSpec } from "@/lib/pricing/data/door-layout";
import { drawDoor } from "./door-draw";

/** The door's layout and, once drawn, its picture; both null where it cannot be drawn. */
export function useDoorPicture(spec: DoorPictureSpec | null): { layout: DoorLayout | null; url: string | null } {
  const key = spec ? JSON.stringify(spec) : "";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const layout = useMemo(() => (spec ? doorLayout(spec) : null), [key]);
  const [drawn, setDrawn] = useState<{ key: string; url: string | null } | null>(null);
  useEffect(() => {
    if (!layout) return;
    let live = true;
    drawDoor(layout).then((u) => { if (live) setDrawn({ key, url: u }); }).catch(() => { if (live) setDrawn({ key, url: null }); });
    return () => { live = false; };
  }, [layout, key]);
  // The last picture stays up while the next is drawn, so a change does not flicker.
  return { layout, url: layout ? drawn?.url ?? null : null };
}
