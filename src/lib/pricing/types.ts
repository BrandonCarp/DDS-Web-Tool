// Core pricing types (shared by the engine, the API, and the UI).

export type WindowStyle = "solid" | "glass" | "inserts";
export type Tier = "7" | "8" | "9";

/** Full base-door sell price for a given size, by window style. */
export interface PriceTriple {
  solid: number;
  glass: number;
  inserts: number;
}

export interface Dimensions {
  widthFt: number;
  widthIn: number;
  heightFt: number;
  heightIn: number;
}

export interface SizeCode {
  code: string; // grid key, e.g. "8x7"
  widthCode: string; // width portion, e.g. "8" or "15.6"
  tier: Tier;
  wf: number;
  wi: number;
  hf: number;
  hi: number;
}

export interface PriceResult {
  model: string;
  style: WindowStyle;
  size: SizeCode | null;
  price: number | null; // null when the size has no catalog price
  priced: boolean;
  isStock: boolean; // true when the exact stock price was applied
  source: "stock" | "standard" | "none";
  triple: PriceTriple | null; // all three styles for the resolved size
}

export type TrackKey = "r10" | "r12" | "r15" | "low_headroom" | "r20" | "r32" | "no_tracks";
export type SpringKey = "extension" | "torsion";
export type LockKey = "none" | "slide" | "lockbar" | "lockbar_installed";

export interface QuoteLine {
  name: string;
  value: number;
  kind?: "add" | "minus";
}

export interface QuoteOptions {
  style: WindowStyle;
  color: string;
  track: TrackKey;
  spring: SpringKey;
  lock: LockKey;
}

export interface Quote {
  model: string;
  size: SizeCode | null;
  priced: boolean;
  isStock: boolean;
  source: "stock" | "standard" | "none";
  lines: QuoteLine[];
  unitPrice: number;
  description: string;
}
