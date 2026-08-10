// AUTO-GENERATED residential metadata (margins, colors, collections) from the catalog.
export const MARGINS: Record<string, { door: number; section: number }> = {
  "T50S": {
    "door": 49,
    "section": 53
  },
  "T52S": {
    "door": 44,
    "section": 49
  },
  "4050-4051-4053": {
    "door": 43,
    "section": 48
  },
  "9130-9133": {
    "door": 43,
    "section": 48
  },
  "4300": {
    "door": 44,
    "section": 49
  },
  "GD1LP-GD1SP": {
    "door": 43,
    "section": 51
  },
  "BD1NU-BD1EU": {
    "door": 43,
    "section": 43
  },
  "BD2NU-BD2EU": {
    "door": 48,
    "section": 43
  }
};

export const COLORS: Record<string, string[]> = {
  "T50S": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Chocolate Brown"
  ],
  "T52S": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Chocolate Brown"
  ],
  "4050-4051-4053": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Chocolate Brown",
    "Hunter Green",
    "Gray",
    "Bronze",
    "Black"
  ],
  "9130-9133": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Chocolate Brown",
    "Hunter Green",
    "Gray",
    "Bronze",
    "Glacier White",
    "Mocha Brown",
    "Black",
    "Ultra Grain"
  ],
  "4300": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Chocolate Brown",
    "Hunter Green",
    "Gray",
    "Bronze",
    "Glacier White",
    "Mocha Brown",
    "Black",
    "Ultra Grain"
  ],
  "GD1LP-GD1SP": [
    "White",
    "Almond",
    "Sandtone",
    "Chocolate Brown",
    "Bronze",
    "Gray",
    "Black",
    "Ultra Grain"
  ],
  "BD1NU-BD1EU": [
    "White",
    "Glacier White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Bronze",
    "Chocolate Brown",
    "Mocha Brown",
    "Charcoal"
  ],
  "BD2NU-BD2EU": [
    "White",
    "Glacier White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Bronze",
    "Chocolate Brown",
    "Mocha Brown",
    "Charcoal"
  ]
};

export const COLLECTIONS: Record<string, string> = {
  "GD1LP-GD1SP": "Gallery Collection",
  "T50S": "Value Steel Collection",
  "T52S": "Value Steel Collection",
  "4050-4051-4053": "Premium Steel Collection",
  "9130-9133": "Premium Steel Collection",
  "4300": "Premium Steel Collection",
  "BD1NU-BD1EU": "Bridgeport Collection",
  "BD2NU-BD2EU": "Bridgeport Collection"
};

/**
 * Widths a series is NOT built in, even though they fall inside its published
 * min/max range. Bridgeport lists these on BDS10.
 *
 * These have to be named explicitly: resolveSizeCode collapses X'8" onto the
 * X'6" row (the Classic Steel books share one row for 15'6"/15'8"), so without
 * this a 14'8" Bridgeport would quietly quote at the 14'6" price and the order
 * would come back rejected.
 */
export const UNAVAILABLE_WIDTHS: Record<string, string[]> = {
  "BD1NU-BD1EU": ["10.2", "10.4", "10.6", "10.10", "11", "11.2", "11.4", "14.8"],
  "BD2NU-BD2EU": ["10.2", "10.4", "10.6", "10.10", "11", "11.2", "11.4", "14.8"],
};

/** Is this exact width unbuildable in the given series? */
export function widthUnavailable(catalogKey: string, widthCode: string): boolean {
  return (UNAVAILABLE_WIDTHS[catalogKey] ?? []).includes(widthCode);
}
