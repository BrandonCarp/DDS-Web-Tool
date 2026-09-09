// Add-on amounts and upcharges. NOT generated — there is no script for this
// file and it must not be regenerated from the old catalog or from a price
// sheet footer, both of which carry superseded figures. Change a number here
// and nowhere else.
//
// Torsion is 35 as of 2/9/2026.

export const ADDONS = {
  "torsion": 35,
  "slidelock": 5,
  "lockbar_assembly": 45,
  "lockbar_installed": 70,
  "track": {
    "low_headroom": 45,
    "r20": 200,
    "r32": 225,
    "no_tracks": -10
  },
  "insert": {
    "short": 19.5,
    "long": 34.5
  },
  /**
   * Upgraded hardware, priced by door width.
   *
   * $35 up to and including 9'0", $45 above it. Brandon gave the upper band as
   * 9'6" and wider; anything between — a 9'2" or 9'4" — takes the wider price,
   * since a door over 9'0" carries the heavier hardware either way.
   */
  /**
   * Homeowner markup, added when the buyer is a homeowner rather than a dealer.
   *
   * Four rates: a stock door, a special order door, a stock section and a
   * special order section — each with a narrow and a wide band. The band split
   * is the same as upgraded hardware: through 9'0" is narrow, above it is wide.
   * Brandon gave the upper band as 9'6" and wider; a 9'2" or 9'4" takes the
   * wide rate, since anything over 9'0" is the larger door.
   */
  "homeowner": {
    "stock_door": { "narrow": 250, "wide": 500 },
    "special_door": { "narrow": 400, "wide": 800 },
    "stock_section": { "narrow": 100, "wide": 200 },
    "special_section": { "narrow": 150, "wide": 300 },
    "narrow_max_inches": 108
  },
  "upgraded_hardware": {
    "narrow": 35,
    "wide": 45,
    "narrow_max_inches": 108
  }
} as const;

export const ULTRAGRAIN: Record<string, { single: number; double: number }> = {
  "9130-9133": {
    "single": 211.02,
    "double": 422.04
  },
  "4300": {
    "single": 211.02,
    "double": 422.04
  },
  "GD1LP-GD1SP": {
    "single": 216.72,
    "double": 433.51
  }
};

export const GRADE_RES: Record<string, string> = {
  "T50S": "single strength b grade",
  "T52S": "single strength b grade",
  "4050-4051-4053": "single strength b grade",
  "9130-9133": "single strength b grade",
  "4300": "single strength b grade",
  "GD1LP-GD1SP": "double strength b grade"
};

export const COLLECTIONS_RES: Record<string, string> = {
  "GD1LP-GD1SP": "Gallery Collection",
  "T50S": "Value Steel Collection",
  "T52S": "Value Steel Collection",
  "4050-4051-4053": "Premium Steel Collection",
  "9130-9133": "Premium Steel Collection",
  "4300": "Premium Steel Collection"
};
