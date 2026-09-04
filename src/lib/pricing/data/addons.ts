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
