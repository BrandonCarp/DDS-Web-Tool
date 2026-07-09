import { NextResponse } from "next/server";
import { quoteResidential, quoteResidentialSection } from "@/lib/pricing/engine";
import type { LockKey, QuoteOptions, SpringKey, TrackKey, WindowStyle } from "@/lib/pricing/types";
import { getSessionUser } from "@/lib/auth";
import { DECORATIVE, ARCHITECTURAL } from "@/lib/pricing/data/inserts";

const STYLES: WindowStyle[] = ["solid", "glass", "inserts"];
const DESIGN_IDS = new Set([...DECORATIVE, ...ARCHITECTURAL].map((d) => d.id));

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { model, widthFt, widthIn, heightFt, heightIn, style, color, track, spring, lock, windesign } = body;
  if (typeof model !== "string") return NextResponse.json({ error: "model is required" }, { status: 400 });

  // Sections-only quotes: stock-size dropdown widths, priced from the workbook
  // SECTIONS blocks in the engine. No door-style/track fields apply.
  if (body.assembly === "sections") {
    const widthKey = String(body.widthKey ?? "");
    if (!/^\d+(\.\d+)?$/.test(widthKey)) return NextResponse.json({ error: "invalid section width" }, { status: 400 });
    const quote = quoteResidentialSection(model, {
      widthKey,
      height: body.secHeight === "21" ? "21" : "18",
      kind: body.secKind === "int" ? "int" : "bt",
      glazed: body.glazed === true,
      lockbar: body.lockbar === true,
      color: typeof color === "string" ? color : "White",
    });
    return NextResponse.json(quote);
  }

  if (!STYLES.includes(style as WindowStyle)) return NextResponse.json({ error: "invalid style" }, { status: 400 });

  const opts: QuoteOptions = {
    style: style as WindowStyle,
    color: typeof color === "string" ? color : "White",
    track: (typeof track === "string" ? track : "r12") as TrackKey,
    spring: (spring === "torsion" ? "torsion" : "extension") as SpringKey,
    lock: (typeof lock === "string" ? lock : "none") as LockKey,
    // Known design ids only; the engine additionally checks the design is valid
    // for this model/style/width before it appears in the description.
    windesign: typeof windesign === "string" && DESIGN_IDS.has(windesign) ? windesign : undefined,
  };
  const quote = quoteResidential(model, {
    widthFt: Number(widthFt), widthIn: Number(widthIn ?? 0),
    heightFt: Number(heightFt), heightIn: Number(heightIn ?? 0),
  }, opts);
  return NextResponse.json(quote);
}
