/**
 * Door disposals — Brandon, 9/10/2026. Priced by location and by how many
 * doors come off: Pennsauken (Doors Direct South) and Union (Doors Direct
 * Union) charge differently. Sell prices, no margin to apply. QuickBooks item
 * DISPOSAL; the line reads SINGLE DOOR DISPOSAL or DOUBLE DOOR DISPOSAL.
 */
export const QB_DISPOSAL = "DISPOSAL";

export type DisposalLocation = "south" | "union";
export type DisposalSize = "single" | "double";

export const DISPOSAL_LOCATIONS: { value: DisposalLocation; label: string }[] = [
  { value: "south", label: "Doors Direct South" },
  { value: "union", label: "Doors Direct Union" },
];

export const DISPOSAL_SIZES: { value: DisposalSize; label: string }[] = [
  { value: "single", label: "Single door" },
  { value: "double", label: "Double door" },
];

export const DISPOSAL_PRICES: Record<DisposalLocation, Record<DisposalSize, number>> = {
  south: { single: 45, double: 75 },
  union: { single: 40, double: 80 },
};

export function disposalPrice(location: DisposalLocation, size: DisposalSize): number {
  return DISPOSAL_PRICES[location][size];
}

export function disposalDescription(size: DisposalSize): string {
  return size === "double" ? "DOUBLE DOOR DISPOSAL" : "SINGLE DOOR DISPOSAL";
}
