import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { quoteCommercial, type CommInput } from "@/lib/pricing/commercial";

/** The panels with windows, as sent: whole numbers, or nothing when the body names none. */
function panels(v: unknown): number[] | undefined {
  return Array.isArray(v) ? v.map(Number).filter((n) => Number.isInteger(n) && n > 0).slice(0, 8) : undefined;
}

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
      color: typeof b.color === "string" ? b.color : undefined,
      winSection: Number(b.winSection) || undefined,
      windowPanels: panels(b.windowPanels),
      windowSize: typeof b.windowSize === "string" ? b.windowSize : undefined,
    };
  } else {
    input = {
      order: "section", mfr, model,
      manFt: Number(b.manFt), manIn: Number(b.manIn) || 0,
      secKind: b.secKind === "int" ? "int" : "bt",
      secHeight: b.secHeight === "24" ? "24" : "21",
      windows: Number(b.windows) || 0,
      windowPanels: panels(b.windowPanels),
      // Checked against the model's own sizes in the engine.
      windowSize: typeof b.windowSize === "string" ? b.windowSize : undefined,
      retainer: b.retainer === true,
      // Sections always carry end stiles now; single is the default.
      stile: b.stile === "double" ? "double" : "single",
      stileLocations: Array.isArray(b.stileLocations) ? b.stileLocations.slice(0, 10).map((x) => String(x ?? "").slice(0, 40)) : undefined,
      stileLocationsNeeded: b.stileLocationsNeeded === true,
      lock: b.lock === "slide" ? "slide" : "none",
      joint: b.joint === "tongue and groove" ? "tongue and groove" : "ship lap",
      color: b.color === "Brown" ? "Brown" : "White",
    };
  }
  return NextResponse.json(quoteCommercial(input));
}
