// AUTO-GENERATED residential metadata (margins, colors, collections) from the catalog.
export const MARGINS: Record<string, { door: number; section: number }> = {
  "T50S": {
    "door": 49,
    "section": 49
  },
  "T52S": {
    "door": 44,
    "section": 49
  },
  "4050-4051-4053": {
    "door": 43,
    "section": 49
  },
  "9130-9133": {
    "door": 43,
    "section": 49
  },
  "4300": {
    "door": 44,
    "section": 49
  },
  "GD1LP-GD1SP": {
    "door": 43,
    "section": 49
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
    "Sandtone",
    "Chocolate Brown",
    "Black",
    "Bronze"
  ],
  "9130-9133": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Chocolate Brown",
    "Hunter Green",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black",
    "Ultra-Grain Classic Medium Finish",
    "Ultra-Grain Classic Cherry Finish",
    "Ultra-Grain Classic Walnut Finish"
  ],
  "4300": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone",
    "Chocolate Brown",
    "Hunter Green",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black",
    "Ultra-Grain Classic Medium Finish",
    "Ultra-Grain Classic Cherry Finish",
    "Ultra-Grain Classic Walnut Finish"
  ],
  "GD1LP-GD1SP": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ]
};

/**
 * Colours that carry the Ultra Grain net adder (ULTRAGRAIN in addons.ts).
 *
 * It is not just the wood finishes — Iron Ore takes the adder on every model
 * that offers it, and the 4300 family charges it on Charcoal as well. Listing
 * them per model rather than pattern-matching the name keeps that difference
 * visible instead of buried in a regex.
 */
export const PREMIUM_COLORS: Record<string, string[]> = {
  // 9130/9133 runs the same colours and the same adder rules as the 4300.
  "9130-9133": [
    "Iron Ore",
    "Charcoal",
    "Ultra-Grain Classic Medium Finish",
    "Ultra-Grain Classic Cherry Finish",
    "Ultra-Grain Classic Walnut Finish"
  ],
  "GD1LP-GD1SP": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  "4300": [
    "Iron Ore",
    "Charcoal",
    "Ultra-Grain Classic Medium Finish",
    "Ultra-Grain Classic Cherry Finish",
    "Ultra-Grain Classic Walnut Finish"
  ]
};

/** Does this colour carry the Ultra Grain adder on this model? */
export function colorTakesPremium(catalogKey: string, color: string): boolean {
  return (PREMIUM_COLORS[catalogKey] ?? []).includes(color);
}

export const COLLECTIONS: Record<string, string> = {
  "GD1LP-GD1SP": "Gallery Collection",
  "T50S": "Value Steel Collection",
  "T52S": "Value Steel Collection",
  "4050-4051-4053": "Premium Steel Collection",
  "9130-9133": "Premium Steel Collection",
  "4300": "Premium Steel Collection"
};

