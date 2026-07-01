import { NextResponse } from "next/server";
import { quoteResidential } from "@/lib/pricing/engine";
import type { LockKey, QuoteOptions, SpringKey, TrackKey, WindowStyle } from "@/lib/pricing/types";
import { getSessionUser } from "@/lib/auth";

const STYLES: WindowStyle[] = ["solid", "glass", "inserts"];

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { model, widthFt, widthIn, heightFt, heightIn, style, color, track, spring, lock } = body;
  if (typeof model !== "string") return NextResponse.json({ error: "model is required" }, { status: 400 });
  if (!STYLES.includes(style as WindowStyle)) return NextResponse.json({ error: "invalid style" }, { status: 400 });

  const opts: QuoteOptions = {
    style: style as WindowStyle,
    color: typeof color === "string" ? color : "White",
    track: (typeof track === "string" ? track : "r12") as TrackKey,
    spring: (spring === "torsion" ? "torsion" : "extension") as SpringKey,
    lock: (typeof lock === "string" ? lock : "none") as LockKey,
  };
  const quote = quoteResidential(model, {
    widthFt: Number(widthFt), widthIn: Number(widthIn ?? 0),
    heightFt: Number(heightFt), heightIn: Number(heightIn ?? 0),
  }, opts);
  return NextResponse.json(quote);
}
