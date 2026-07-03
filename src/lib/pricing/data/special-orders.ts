// Ported 1:1 from the production single-file tool (CATALOG.special).
// Special-order collections: margin-based (per model, door vs sections, optional
// Ultra Grain margin) or multiplier-based (Clopay list × multiplier, cost margin).

export type SpecialModel = { door: number; section: number; ug?: boolean; new?: boolean };
export type SpecialSeries =
  | { type: "margin"; models: Record<string, SpecialModel>; ug?: { single: number; double: number }; ug_margin?: number }
  | { type: "multiplier"; multiplier: number; cost_margin: number };

export const SPECIAL: Record<string, SpecialSeries> = {
  "Gallery Collection": {
    "type": "margin",
    "models": {
      "GD4L/GD4S": {
        "door": 56,
        "section": 43
      },
      "GD5L/GD5S": {
        "door": 52,
        "section": 43
      },
      "GD4LV/GD4SV": {
        "door": 55,
        "section": 43
      },
      "GD5LV/GD5SV": {
        "door": 51,
        "section": 43
      },
      "GD2LP/GD2SP": {
        "door": 45,
        "section": 43
      },
      "GD1LU/GD1SU": {
        "door": 43,
        "section": 43,
        "ug": true
      },
      "GD2LU/GD2SU": {
        "door": 45,
        "section": 43,
        "ug": true
      }
    },
    "ug": {
      "single": 216.72,
      "double": 433.51
    },
    "ug_margin": 43
  },
  "Coachman Collection": {
    "type": "margin",
    "models": {
      "CD": {
        "door": 41,
        "section": 43
      },
      "CG": {
        "door": 41,
        "section": 43
      },
      "CGU": {
        "door": 40,
        "section": 43
      }
    }
  },
  "Bridgeport Collection": {
    "type": "margin",
    "models": {
      "BD4E/BD4N": {
        "door": 56,
        "section": 43
      },
      "BD4C": {
        "door": 40,
        "section": 43,
        "new": true
      },
      "BD5E/BD5N": {
        "door": 52,
        "section": 43
      },
      "BD5C": {
        "door": 40,
        "section": 43,
        "new": true
      },
      "BD4EV/BD4NV": {
        "door": 55,
        "section": 43
      },
      "BD4CV": {
        "door": 40,
        "section": 43,
        "new": true
      },
      "BD5EV/BD5NV": {
        "door": 51,
        "section": 43
      },
      "BD5CV": {
        "door": 40,
        "section": 43,
        "new": true
      },
      "BD1EU/BD1NU": {
        "door": 43,
        "section": 43
      },
      "BD1CU": {
        "door": 40,
        "section": 43,
        "new": true
      },
      "BD2EU/BD2NU": {
        "door": 48,
        "section": 43
      },
      "BD2CU": {
        "door": 40,
        "section": 43,
        "new": true
      }
    },
    "ug": {
      "single": 216.72,
      "double": 433.51
    }
  },
  "Canyon Ridge Collection": {
    "type": "multiplier",
    "multiplier": 1.09,
    "cost_margin": 29
  },
  "Avante Collection": {
    "type": "multiplier",
    "multiplier": 1.09,
    "cost_margin": 29
  },
  "Modern Collection": {
    "type": "margin",
    "models": {
      "4308": {
        "door": 44,
        "section": 44
      },
      "4305": {
        "door": 44,
        "section": 44
      },
      "4132": {
        "door": 44,
        "section": 44
      },
      "4138": {
        "door": 44,
        "section": 44
      },
      "9132": {
        "door": 42,
        "section": 42
      },
      "9131": {
        "door": 42,
        "section": 42
      },
      "9138": {
        "door": 42,
        "section": 42
      },
      "9139": {
        "door": 42,
        "section": 42
      },
      "9202": {
        "door": 42,
        "section": 42
      },
      "9201": {
        "door": 42,
        "section": 42
      },
      "9208": {
        "door": 42,
        "section": 42
      },
      "9205": {
        "door": 42,
        "section": 42
      },
      "9209": {
        "door": 42,
        "section": 42
      }
    }
  }
};

/** Commercial special orders: Clopay 3200/524 — complete door at 45% margin, sections at 49%. */
export const SPECIAL_COMMERCIAL: Record<string, { models: string[]; door: number; section: number }> = {
  Clopay: { models: ["3200", "524"], door: 45, section: 49 },
};
