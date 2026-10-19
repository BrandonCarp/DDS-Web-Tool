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

// Ultra-Grain finishes are special order only and were removed from the
// residential lists for the 9130/9133 and the Gallery pair on 10/9/2026.
// The 4300 family carries ten colours for special order — Brandon, 12/9/2026.
// Iron Ore and the three Ultra-Grains came off: they are catalogue finishes DDS
// does not sell on this family.
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
    "Black"
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
    "Black"
  ],
  // The 9200 family (special order only; CJ's workbook of 16/10/2026): the
  // 9130's colours, pending a list of its own.
  "9200": [
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
    "Black"
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
    "Black"
  ],
  // The other Gallery Steel pairs (special order only, 12/10/2026): the same colours.
  "GD2LP-GD2SP": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black"
  ],
  "GD1LU-GD1SU": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black"
  ],
  "GD2LU-GD2SU": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black"
  ],
  // Bridgeport Steel (special order only, 9/10/2026): the Gallery's colours,
  // pending a list of its own from Clopay.
  "BD1EU-BD1NU": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black"
  ],
  "BD1CU": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black"
  ],
  "BD2EU-BD2NU": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black"
  ],
  "BD2CU": [
    "White",
    "Almond",
    "Sandtone",
    "Desert Tan",
    "Chocolate Brown",
    "Bronze",
    "Mocha Brown",
    "Charcoal",
    "Iron Ore",
    "Black"
  ],
  // Coachman (special order only, 12/10/2026): the four colours Clopay's
  // Coachman book lists. Premium finishes are left off until CJ's sheet prices
  // one — it carries no line for any.
  "CD": [
    "White",
    "Almond",
    "Desert Tan",
    "Sandtone"
  ]
};

/**
 * Colours that carry the Ultra Grain net adder (ULTRAGRAIN in addons.ts on
 * the stock tab; the sheet's or PREMIUM_COLOR_ADDER's figure on a special
 * order).
 *
 * It is not just the wood finishes — Iron Ore takes the adder on every model
 * that offers it. Charcoal does not, on any model (Brandon, 19/10/2026; the
 * 4300 family charged it until then). Listing them per model rather than
 * pattern-matching the name keeps the rule visible instead of buried in a
 * regex.
 */
export const PREMIUM_COLORS: Record<string, string[]> = {
  // 9130/9133 runs the same colours and the same adder rules as the 4300.
  "9130-9133": [
    "Iron Ore",
    "Ultra-Grain Classic Medium Finish",
    "Ultra-Grain Classic Cherry Finish",
    "Ultra-Grain Classic Walnut Finish"
  ],
  // The 9200 family carries the 9130's colours pending a list of its own
  // (16/10/2026), and its adder rule and finishes with them.
  "9200": [
    "Iron Ore",
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
  // The other Gallery Steel pairs: the same finishes, priced on their sheets.
  "GD2LP-GD2SP": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  "GD1LU-GD1SU": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  "GD2LU-GD2SU": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  // Bridgeport Steel: the Ultra-Grain lines on its sheets price the same
  // finishes; Iron Ore rides along as it does on the Gallery.
  "BD1EU-BD1NU": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  "BD1CU": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  "BD2EU-BD2NU": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  "BD2CU": [
    "Iron Ore",
    "Ultra-Grain Oak Medium Finish",
    "Ultra-Grain Oak Dark Finish",
    "Ultra-Grain Oak Walnut Finish",
    "Ultra-Grain Oak Slate Finish"
  ],
  "4300": [
    "Iron Ore",
    "Ultra-Grain Classic Medium Finish",
    "Ultra-Grain Classic Cherry Finish",
    "Ultra-Grain Classic Walnut Finish"
  ]
};

/** Does this colour carry the Ultra Grain adder on this model? */
/**
 * Colours a SPECIAL ORDER of the model offers: the stock list, plus the
 * premium colours and finishes that are special order only. The Gallery's
 * Ultra-Grain Oak finishes came off the stock list on 10/9/2026 for exactly
 * that reason; the Gallery sheet (8/10/2026) prices them, so the special
 * order tab lists them again. The Premium Steel sheets price their premium
 * colours from 19/10/2026 (CJ's ULTRA COLOR block), so the 9130, 9200 and
 * 4300 families list Iron Ore and the Ultra-Grain Classic finishes on a
 * special order — the 4300 does not stock them (Brandon, 19/10/2026).
 */
/** Catalogue keys whose special orders list the premium colours their sheets price. */
const SHEET_PRICED_KEYS = new Set([
  "GD1LP-GD1SP", "GD2LP-GD2SP", "GD1LU-GD1SU", "GD2LU-GD2SU",
  "BD1EU-BD1NU", "BD1CU", "BD2EU-BD2NU", "BD2CU",
  "9130-9133", "9200", "4300",
]);
export function specialOrderColors(catalogKey: string): string[] {
  const stock = COLORS[catalogKey] ?? [];
  const extra = (PREMIUM_COLORS[catalogKey] ?? []).filter((c) => !stock.includes(c));
  return SHEET_PRICED_KEYS.has(catalogKey) ? [...stock, ...extra] : stock;
}

export function colorTakesPremium(catalogKey: string, color: string): boolean {
  return (PREMIUM_COLORS[catalogKey] ?? []).includes(color);
}

export const COLLECTIONS: Record<string, string> = {
  "GD1LP-GD1SP": "Gallery Collection",
  "GD2LP-GD2SP": "Gallery Collection",
  "GD1LU-GD1SU": "Gallery Collection",
  "GD2LU-GD2SU": "Gallery Collection",
  "BD1EU-BD1NU": "Bridgeport Collection",
  "BD1CU": "Bridgeport Collection",
  "BD2EU-BD2NU": "Bridgeport Collection",
  "BD2CU": "Bridgeport Collection",
  "CD": "Coachman Collection",
  "T50S": "Value Steel Collection",
  "T52S": "Value Steel Collection",
  "4050-4051-4053": "Premium Steel Collection",
  "9130-9133": "Premium Steel Collection",
  "4300": "Premium Steel Collection"
};

