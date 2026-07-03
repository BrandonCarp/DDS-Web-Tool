// Ported 1:1 from the production single-file tool (CATALOG.torsion).
// Price per inch by wire size and inside diameter, plus cone charge per ID and
// 6-inch-ID filler. If a wire size isn't priced for an ID, the next LARGER
// priced wire is used ("go up wire size until it works").

export const TORSION: {
  ppi: Record<string, Record<string, number>>;
  cone: Record<string, number>;
  filler_per_inch: number;
  id_labels: Record<string, string>;
  stock_wires: Record<string, string[]>;
} = {
  "ppi": {
    "0.192": {
      "2": 0.88
    },
    "0.207": {
      "2": 1.48
    },
    "0.218": {
      "2": 1.58
    },
    "0.225": {
      "2": 1.62
    },
    "0.234": {
      "2": 1.69,
      "2.625": 2.16
    },
    "0.243": {
      "2": 1.78,
      "2.625": 2.25
    },
    "0.25": {
      "2": 1.81,
      "2.625": 2.32
    },
    "0.262": {
      "2": 1.93,
      "2.625": 2.45,
      "3.75": 3.4
    },
    "0.273": {
      "2": 2.0,
      "2.625": 2.56,
      "3.75": 3.55
    },
    "0.283": {
      "2": 2.09,
      "2.625": 2.67,
      "3.75": 3.7
    },
    "0.295": {
      "2": 2.19,
      "2.625": 2.79,
      "3.75": 3.86
    },
    "0.306": {
      "2.625": 2.91,
      "3.75": 4.01
    },
    "0.312": {
      "2.625": 2.97,
      "3.75": 4.1
    },
    "0.319": {
      "2.625": 3.06,
      "3.75": 4.21
    },
    "0.331": {
      "3.75": 4.37,
      "6": 6.52
    },
    "0.343": {
      "3.75": 4.54,
      "6": 7.04
    },
    "0.362": {
      "3.75": 4.82,
      "6": 7.44
    },
    "0.375": {
      "3.75": 5.01,
      "6": 7.73
    },
    "0.393": {
      "6": 8.13
    },
    "0.406": {
      "6": 8.4
    },
    "0.421": {
      "6": 8.74
    },
    "0.43": {
      "6": 8.94
    },
    "0.437": {
      "6": 9.08
    }
  },
  "cone": {
    "2": 9.62,
    "2.625": 16.78,
    "3.75": 28.74,
    "6": 50.3
  },
  "filler_per_inch": 0.53,
  "id_labels": {
    "2": "2″ ID",
    "2.625": "2⅝″ ID",
    "3.75": "3¾″ ID",
    "6": "6″ ID"
  },
  "stock_wires": {
    "2": [
      "0.187",
      "0.192",
      "0.207",
      "0.218",
      "0.225",
      "0.234",
      "0.243",
      "0.25",
      "0.262",
      "0.273",
      "0.283"
    ],
    "2.625": [
      "0.207",
      "0.218",
      "0.225",
      "0.234",
      "0.243",
      "0.25",
      "0.262",
      "0.273",
      "0.283",
      "0.295",
      "0.306",
      "0.312",
      "0.319"
    ],
    "3.75": [
      "0.207",
      "0.225",
      "0.234",
      "0.243",
      "0.25",
      "0.262",
      "0.273",
      "0.283",
      "0.295",
      "0.306",
      "0.312",
      "0.319",
      "0.331",
      "0.343",
      "0.362",
      "0.375"
    ],
    "6": [
      "0.25",
      "0.262",
      "0.273",
      "0.283",
      "0.295",
      "0.306",
      "0.312",
      "0.319",
      "0.331",
      "0.343",
      "0.362",
      "0.375",
      "0.406",
      "0.421",
      "0.43"
    ]
  }
};

export const ID_ORDER = ["2", "2.625", "3.75", "6"];

/** Effective price-per-inch: this wire, or the next larger priced wire for the ID. */
export function effPPI(wireStr: string, id: string): number | null {
  const req = parseFloat(wireStr);
  if (Number.isNaN(req)) return null;
  let best: number | null = null, bestw = Infinity;
  for (const k of Object.keys(TORSION.ppi)) {
    const v = TORSION.ppi[k][id];
    const wf = parseFloat(k);
    if (v != null && wf >= req - 1e-9 && wf < bestw) { bestw = wf; best = v; }
  }
  return best;
}

/** Price one cut-to-size spring. */
export function torsionPrice(wireStr: string, id: string, len: number): number | null {
  const ppi = effPPI(wireStr, id);
  if (ppi == null || !(len > 0)) return null;
  return len * ppi + (TORSION.cone[id] || 0) + (id === "6" ? len * TORSION.filler_per_inch : 0);
}

export function fmtWire(w: string): string { return parseFloat(w).toFixed(3).replace(/^0/, ""); }
