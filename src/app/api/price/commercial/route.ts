import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { quoteCommercial, type CommInput } from "@/lib/pricing/commercial";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const model = typeof b.model === "string" ? b.model : "";
  const mfr = typeof b.mfr === "string" ? b.mfr : "";
  if (!model || !mfr) return NextResponse.json({ error: "mfr and model are required" }, { status: 400 });

  let input: CommInput;
  if (b.order === "complete") {
    input = {
      order: "complete", mfr, model,
      size: typeof b.size === "string" ? b.size : "",
      glass: b.glass === "glass" ? "glass" : "solid",
      track: b.track === "FV" || b.track === "LHR" ? (b.track as "FV" | "LHR") : "15R",
      mount: b.mount === "reverse" ? "reverse" : "continuous",
      cspring: b.cspring === "extension" ? "extension" : "torsion",
      clock: b.clock === "slide" ? "slide" : "none",
    };
  } else {
    input = {
      order: "section", mfr, model,
      manFt: Number(b.manFt), manIn: Number(b.manIn) || 0,
      secKind: b.secKind === "int" ? "int" : "bt",
      secHeight: b.secHeight === "24" ? "24" : "21",
      windows: Number(b.windows) || 0,
      retainer: b.retainer === true,
      stile: b.stile === "single" || b.stile === "double" ? (b.stile as "single" | "double") : "none",
    };
  }
  return NextResponse.json(quoteCommercial(input));
}
