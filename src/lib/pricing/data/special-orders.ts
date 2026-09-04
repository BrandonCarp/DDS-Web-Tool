// Ported 1:1 from the production single-file tool (CATALOG.special).
// Special-order collections: margin-based (per model, door vs sections, optional
// Ultra Grain margin) or multiplier-based (Clopay list × multiplier, cost margin).

export type SpecialModel = { door: number; section: number; ug?: boolean; new?: boolean };
export type SpecialSeries =
  | {
      type: "margin";
      /**
       * Per-model margins. Absent when the whole collection shares one, as
       * Canyon Ridge and Avante do — those have no model breakdown to choose
       * from, just a collection margin.
       */
      models?: Record<string, SpecialModel>;
      /** Collection-wide margins, used when there is no per-model table. */
      door?: number;
      section?: number;
      ug?: { single: number; double: number };
      ug_margin?: number;
    }
  | {
      type: "multiplier";
      multiplier: number;
      /** Margin on a complete door. */
      cost_margin: number;
      /** Margin on replacement sections, when it differs from the door. */
      section_margin?: number;
      /**
       * Sections entered under this price are simply doubled — no multiplier,
       * no margin. A small section costs the same to handle, freight and stage
       * as a large one, so the margins do not cover the work.
       */
      small_section_under?: number;
    };

export const SPECIAL: Record<string, SpecialSeries> = {
  "Gallery Collection": {
    "type": "margin",
    "models": {
      "GD4L/GD4S": {
        "door": 56,
        "section": 49
      },
      "GD5L/GD5S": {
        "door": 52,
        "section": 49
      },
      "GD4LV/GD4SV": {
        "door": 51,
        "section": 49
      },
      "GD5LV/GD5SV": {
        "door": 52,
        "section": 49
      },
      "GD2LP/GD2SP": {
        "door": 45,
        "section": 49
      },
      "GD1LP/GD1SP": {
        "door": 43,
        "section": 49
      },
      "GD1LU/GD1SU": {
        "door": 43,
        "section": 49,
        "ug": true
      },
      "GD2LU/GD2SU": {
        "door": 45,
        "section": 49,
        "ug": true
      }
    },
    "ug": {
      "single": 216.72,
      "double": 433.51
    },
    "ug_margin": 43
  },
  "Grand Harbor Collection": {
    "type": "margin",
    "models": {
      "GH": {
        "door": 41,
        "section": 49
      }
    }
  },
  "Coachman Collection": {
    "type": "margin",
    "models": {
      "CD": {
        "door": 41,
        "section": 49
      },
      "CG": {
        "door": 41,
        "section": 49
      },
      "CGU": {
        "door": 40,
        "section": 49
      }
    }
  },
  "Bridgeport Collection": {
    "type": "margin",
    "models": {
      "BD4E/BD4N": {
        "door": 56,
        "section": 49
      },
      "BD4C": {
        "door": 40,
        "section": 49,
        "new": true
      },
      "BD5E/BD5N": {
        "door": 52,
        "section": 49
      },
      "BD5C": {
        "door": 40,
        "section": 49,
        "new": true
      },
      "BD4EV/BD4NV": {
        "door": 55,
        "section": 49
      },
      "BD4CV": {
        "door": 40,
        "section": 49,
        "new": true
      },
      "BD5EV/BD5NV": {
        "door": 51,
        "section": 49
      },
      "BD5CV": {
        "door": 40,
        "section": 49,
        "new": true
      },
      "BD1EU/BD1NU": {
        "door": 43,
        "section": 49
      },
      "BD1CU": {
        "door": 40,
        "section": 49,
        "new": true
      },
      "BD2EU/BD2NU": {
        "door": 48,
        "section": 49
      },
      "BD2CU": {
        "door": 40,
        "section": 49,
        "new": true
      }
    },
    "ug": {
      "single": 216.72,
      "double": 433.51
    }
  },
  // Canyon Ridge and Avante are Clopay, so they price the way every other
  // Clopay collection does: flat margin on the portal total, no 1.09. They ran
  // on the outside-manufacturer shape (list x 1.09, then 29) until 31/8/2026,
  // which came to list x 1.5352 — near enough the same number as a flat 35
  // (list x 1.5385) that the change is a restatement rather than a price rise.
  // The 1.09 belongs only to the genuinely outside makers further down, where
  // DDS really does pay list plus 9%.
  "Canyon Ridge Collection": {
    "type": "margin",
    "door": 35,
    "section": 49
  },
  "Avante Collection": {
    "type": "margin",
    "door": 35,
    "section": 49
  },
  // The residential steel lines. DDS floors only a handful of sizes in these
  // (see STOCK_MATRIX); everything else is a special order and is priced here on
  // the margins rather than off the stock sheet. Margins match MARGINS in
  // catalog-meta.ts, which is the same table the residential grid was built to.
  "Value Steel Collection": {
    "type": "margin",
    "models": {
      "T50S/T50L": { "door": 49, "section": 49 },
      "T52S/T52L": { "door": 44, "section": 49 }
    }
  },
  "Premium Steel Collection": {
    "type": "margin",
    "models": {
      "4050/4051/4053": { "door": 43, "section": 49 },
      "4300/4301/4310": { "door": 44, "section": 49 },
      "9130/9133": { "door": 43, "section": 49 },
      "9200/9203": { "door": 43, "section": 49 }
    }
  },
  // Outside manufacturers. DDS pays list x 1.09, then 29 on a complete door and
  // 37 on sections. Same terms across all five, so they share one shape.
  "Haas": {
    "type": "multiplier",
    "multiplier": 1.09,
    "cost_margin": 29,
    "section_margin": 37,
    "small_section_under": 250
  },
  "Amarr": {
    "type": "multiplier",
    "multiplier": 1.09,
    "cost_margin": 29,
    "section_margin": 37,
    "small_section_under": 250
  },
  "CHI": {
    "type": "multiplier",
    "multiplier": 1.09,
    "cost_margin": 29,
    "section_margin": 37,
    "small_section_under": 250
  },
  "Overhead": {
    "type": "multiplier",
    "multiplier": 1.09,
    "cost_margin": 29,
    "section_margin": 37,
    "small_section_under": 250
  },
  "Wayne Dalton": {
    "type": "multiplier",
    "multiplier": 1.09,
    "cost_margin": 29,
    "section_margin": 37,
    "small_section_under": 250
  },
  "Modern Collection": {
    "type": "margin",
    "models": {
      "4308": {
        "door": 45,
        "section": 49
      },
      "4305": {
        "door": 45,
        "section": 49
      },
      "4132": {
        "door": 45,
        "section": 49
      },
      "4138": {
        "door": 45,
        "section": 49
      },
      "9132": {
        "door": 45,
        "section": 49
      },
      "9131": {
        "door": 43,
        "section": 49
      },
      "9138": {
        "door": 45,
        "section": 49
      },
      "9139": {
        "door": 45,
        "section": 49
      },
      "9202": {
        "door": 45,
        "section": 49
      },
      "9201": {
        "door": 43,
        "section": 49
      },
      "9208": {
        "door": 45,
        "section": 49
      },
      "9205": {
        "door": 45,
        "section": 49
      },
      "9209": {
        "door": 45,
        "section": 49
      }

    }
  }
};

/**
 * Commercial special orders — every Clopay commercial model, grouped.
 *
 * Margins are flat across the whole range: 45 on a complete door, 49 on
 * sections, the same terms the 3200 and 524 have always carried.
 *
 * PINNED is the handful the counter reaches for daily. Those five sit at the
 * top of the collection dropdown as models in their own right, above the series
 * — someone who knows they want a 3200 should not have to remember it lives
 * under Energy Series. Each still appears inside its real series as well, so
 * browsing by series finds everything.
 */
export interface CommercialSeries {
  name: string;
  models: string[];
}

export const SPECIAL_COMMERCIAL_PINNED = ["3720", "3200", "3150", "524", "524V"];

export const SPECIAL_COMMERCIAL_SERIES: CommercialSeries[] = [
  {
    name: "Architectural Series — Aluminum Full View Doors",
    models: ["902", "903", "904"],
  },
  {
    name: "Architectural Series",
    models: ["3158", "3159", "3208", "3209", "3708", "3709"],
  },
  {
    name: "Energy Series with Intellicore",
    models: ["3715", "3717", "3718", "3720", "3721", "3722", "3723", "3724"],
  },
  {
    name: "Energy Series",
    models: ["3150", "3154", "3155", "3200", "3211", "3213", "3220"],
  },
  {
    name: "Industrial Series",
    models: ["520", "522", "524", "524V", "524S", "525", "525V", "525S", "664", "664V"],
  },
];

/** Every commercial model DDS special orders, deduplicated. */
export const SPECIAL_COMMERCIAL_MODELS: string[] = [
  ...new Set(SPECIAL_COMMERCIAL_SERIES.flatMap((s) => s.models)),
];

export const SPECIAL_COMMERCIAL: Record<string, { models: string[]; door: number; section: number }> = {
  Clopay: { models: SPECIAL_COMMERCIAL_MODELS, door: 45, section: 49 },
};

/** The series a model belongs to, for the quote description. */
export function commercialSeriesOf(model: string): string | null {
  return SPECIAL_COMMERCIAL_SERIES.find((s) => s.models.includes(model))?.name ?? null;
}

/**
 * Residential special orders, grouped by who makes the door.
 *
 * Clopay carries a collection under it — Gallery, Coachman, Value Steel and so
 * on — while the outside manufacturers are a single choice each, since DDS
 * prices every one of their doors on the same terms. Keeping Clopay's
 * collections behind one manufacturer stops a fifteen-entry flat list where
 * "Amarr" sits between "Avante" and "Canyon Ridge".
 */
export const SO_OUTSIDE_MFRS = ["Haas", "Amarr", "CHI", "Overhead", "Wayne Dalton"] as const;

export const SO_MANUFACTURERS = ["Clopay", ...SO_OUTSIDE_MFRS] as const;

/** Series selectable under a manufacturer. Outside makers have exactly one. */
export function seriesFor(mfr: string): string[] {
  if (mfr === "Clopay") {
    return Object.keys(SPECIAL).filter(
      (s) => !(SO_OUTSIDE_MFRS as readonly string[]).includes(s),
    );
  }
  return Object.keys(SPECIAL).filter((s) => s === mfr);
}

/** True when the manufacturer needs no second dropdown. */
export function isOutsideMfr(mfr: string): boolean {
  return (SO_OUTSIDE_MFRS as readonly string[]).includes(mfr);
}
