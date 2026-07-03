// Ported 1:1 from the production single-file tool (CATALOG.commercial et al).
// Server-side pricing data for the Commercial tab. Do not edit by hand.

/** Complete-door sell-price matrices (3200 / 524). Keys are the size labels shown in the UI. */
export const COMM_MATRIX: Record<string, { margins: { door: number; section: number }; sizes: Record<string, Record<string, number | null>> }> = {
  "3200": {
    "margins": {
      "door": 45,
      "section": 49
    },
    "sizes": {
      "8′2″ × 8′0″": {
        "solid15R": 1348.89,
        "glass15R": 1570.98,
        "solidFV": 1566.56,
        "glassFV": 1788.65,
        "solidLHR": 1502.11,
        "glassLHR": 1724.2
      },
      "8′2″ × 9′0″": {
        "solid15R": 1555.09,
        "glass15R": 1777.18,
        "solidFV": 1634.51,
        "glassFV": 2022.05,
        "solidLHR": 1708.31,
        "glassLHR": 1930.4
      },
      "8′2″ × 10′0″": {
        "solid15R": 1651.04,
        "glass15R": 1873.22,
        "solidFV": 1923.11,
        "glassFV": 2145.2,
        "solidLHR": 1804.25,
        "glassLHR": 2026.35
      },
      "8′2″ × 12′0″": {
        "solid15R": 2017.6,
        "glass15R": 2239.69,
        "solidFV": 2344.07,
        "glassFV": 2566.16,
        "solidLHR": 2170.82,
        "glassLHR": 2392.91
      },
      "8′2″ × 14′0″": {
        "solid15R": 2332.64,
        "glass15R": 2554.73,
        "solidFV": 2713.53,
        "glassFV": 2953.62,
        "solidLHR": 2485.85,
        "glassLHR": 2707.95
      },
      "8′2″ × 16′0″": {
        "solid15R": 2876.78,
        "glass15R": 3098.87,
        "solidFV": 3312.09,
        "glassFV": 3534.18,
        "solidLHR": 3030,
        "glassLHR": 3252.09
      },
      "9′2″ × 8′0″": {
        "solid15R": 1449.15,
        "glass15R": 1671.24,
        "solidFV": 1666.82,
        "glassFV": 1888.91,
        "solidLHR": 1602.36,
        "glassLHR": 1824.45
      },
      "9′2″ × 9′0″": {
        "solid15R": 1691.13,
        "glass15R": 1913.22,
        "solidFV": 1936,
        "glassFV": 2158.09,
        "solidLHR": 1844.35,
        "glassLHR": 2066.44
      },
      "9′2″ × 10′0″": {
        "solid15R": 1778.47,
        "glass15R": 2000.56,
        "solidFV": 2050.55,
        "glassFV": 2272.64,
        "solidLHR": 1931.69,
        "glassLHR": 2153.78
      },
      "9′2″ × 12′0″": {
        "solid15R": 2177.98,
        "glass15R": 2400.07,
        "solidFV": 2504.45,
        "glassFV": 2726.55,
        "solidLHR": 2331.2,
        "glassLHR": 2553.29
      },
      "9′2″ × 14′0″": {
        "solid15R": 2521.65,
        "glass15R": 2743.75,
        "solidFV": 2902.55,
        "glassFV": 3124.64,
        "solidLHR": 2674.87,
        "glassLHR": 2896.96
      },
      "9′2″ × 16′0″": {
        "solid15R": 3035.73,
        "glass15R": 3257.82,
        "solidFV": 3471.04,
        "glassFV": 3693.13,
        "solidLHR": 3188.95,
        "glassLHR": 3411.04
      },
      "10′2″ × 8′0″": {
        "solid15R": 1589.45,
        "glass15R": 1922.78,
        "solidFV": 1807.13,
        "glassFV": 2140.27,
        "solidLHR": 1742.67,
        "glassLHR": 2075.82
      },
      "10′2″ × 9′0″": {
        "solid15R": 1835.75,
        "glass15R": 2168.89,
        "solidFV": 2080.62,
        "glassFV": 2413.76,
        "solidLHR": 1988.96,
        "glassLHR": 2322.11
      },
      "10′2″ × 10′0″": {
        "solid15R": 1941.71,
        "glass15R": 2274.85,
        "solidFV": 2213.78,
        "glassFV": 2546.93,
        "solidLHR": 2094.93,
        "glassLHR": 2428.15
      },
      "10′2″ × 12′0″": {
        "solid15R": 2447.2,
        "glass15R": 2780.35,
        "solidFV": 2773.67,
        "glassFV": 3106.82,
        "solidLHR": 2600.38,
        "glassLHR": 2933.56
      },
      "10′2″ × 14′0″": {
        "solid15R": 2747.89,
        "glass15R": 3081.04,
        "solidFV": 3128.78,
        "glassFV": 3461.93,
        "solidLHR": 2901.11,
        "glassLHR": 3234.25
      },
      "10′2″ × 16′0″": {
        "solid15R": 3316.38,
        "glass15R": 3649.53,
        "solidFV": 3751.69,
        "glassFV": 3967.22,
        "solidLHR": 3469.6,
        "glassLHR": 3802.75
      },
      "12′2″ × 8′0″": {
        "solid15R": 1825.73,
        "glass15R": 2156.71,
        "solidFV": 2041.36,
        "glassFV": 2374.16,
        "solidLHR": 1976.98,
        "glassLHR": 2309.78
      },
      "12′2″ × 9′0″": {
        "solid15R": 2092.07,
        "glass15R": 2422.8,
        "solidFV": 2334.62,
        "glassFV": 2667.42,
        "solidLHR": 2243.07,
        "glassLHR": 2575.87
      },
      "12′2″ × 10′0″": {
        "solid15R": 2228.09,
        "glass15R": 2558.69,
        "solidFV": 2497.69,
        "glassFV": 2830.49,
        "solidLHR": 2378.96,
        "glassLHR": 2711.76
      },
      "12′2″ × 12′0″": {
        "solid15R": 2709.24,
        "glass15R": 3039.36,
        "solidFV": 3032.71,
        "glassFV": 3365.51,
        "solidLHR": 2859.64,
        "glassLHR": 3192.44
      },
      "12′2″ × 14′0″": {
        "solid15R": 3143.11,
        "glass15R": 3472.8,
        "solidFV": 3520.51,
        "glassFV": 3853.31,
        "solidLHR": 3293.07,
        "glassLHR": 3625.87
      },
      "12′2″ × 16′0″": {
        "solid15R": 3830.44,
        "glass15R": 4159.45,
        "solidFV": 4261.55,
        "glassFV": 4594.2,
        "solidLHR": 3979.73,
        "glassLHR": 4312.53
      },
      "14′2″ × 8′0″": {
        "solid15R": 2055.67,
        "glass15R": 2499.42,
        "solidFV": 2273.13,
        "glassFV": 2716.87,
        "solidLHR": 2208.75,
        "glassLHR": 2652.49
      },
      "14′2″ × 9′0″": {
        "solid15R": 2370.38,
        "glass15R": 2814.13,
        "solidFV": 2615,
        "glassFV": 3058.75,
        "solidLHR": 2523.45,
        "glassLHR": 2967.2
      },
      "14′2″ × 10′0″": {
        "solid15R": 2570.65,
        "glass15R": 3014.4,
        "solidFV": 2842.45,
        "glassFV": 3286.2,
        "solidLHR": 2723.73,
        "glassLHR": 3167.47
      },
      "14′2″ × 12′0″": {
        "solid15R": 3078.51,
        "glass15R": 3522.25,
        "solidFV": 3404.65,
        "glassFV": 3848.4,
        "solidLHR": 3231.58,
        "glassLHR": 3675.33
      },
      "14′2″ × 14′0″": {
        "solid15R": 3695.05,
        "glass15R": 4138.8,
        "solidFV": 4075.56,
        "glassFV": 4519.31,
        "solidLHR": 3848.13,
        "glassLHR": 4292.6
      },
      "14′2″ × 16′0″": {
        "solid15R": 4288.73,
        "glass15R": 4732.47,
        "solidFV": 4919.11,
        "glassFV": 5362.85,
        "solidLHR": 4441.8,
        "glassLHR": 4885.55
      }
    }
  },
  "524": {
    "margins": {
      "door": 45,
      "section": 49
    },
    "sizes": {
      "8′2″ × 8′0″": {
        "solid15R": 917.35,
        "glass15R": 1113.49,
        "solidFV": 1152.09,
        "glassFV": 1348.24,
        "solidLHR": 1082.6,
        "glassLHR": 1278.75
      },
      "8′2″ × 9′0″": {
        "solid15R": 1033.18,
        "glass15R": 1229.33,
        "solidFV": 1297.27,
        "glassFV": 1493.42,
        "solidLHR": 1198.44,
        "glassLHR": 1394.58
      },
      "8′2″ × 10′0″": {
        "solid15R": 1115.04,
        "glass15R": 1311.18,
        "solidFV": 1408.47,
        "glassFV": 1604.62,
        "solidLHR": 1280.29,
        "glassLHR": 1476.44
      },
      "8′2″ × 12′0″": {
        "solid15R": 1371.42,
        "glass15R": 1567.56,
        "solidFV": 1723.55,
        "glassFV": 1919.69,
        "solidLHR": 1536.67,
        "glassLHR": 1732.82
      },
      "8′2″ × 14′0″": {
        "solid15R": 1590.71,
        "glass15R": 1786.85,
        "solidFV": 2001.51,
        "glassFV": 2197.65,
        "solidLHR": 1755.96,
        "glassLHR": 1952.11
      },
      "8′2″ × 16′0″": {
        "solid15R": 1837.82,
        "glass15R": 2033.96,
        "solidFV": 2307.29,
        "glassFV": 2503.44,
        "solidLHR": 2003.07,
        "glassLHR": 2199.22
      },
      "9′2″ × 8′0″": {
        "solid15R": 962.15,
        "glass15R": 1158.29,
        "solidFV": 1196.89,
        "glassFV": 1393.04,
        "solidLHR": 1127.4,
        "glassLHR": 1323.55
      },
      "9′2″ × 9′0″": {
        "solid15R": 1087.24,
        "glass15R": 1283.38,
        "solidFV": 1351.33,
        "glassFV": 1547.47,
        "solidLHR": 1252.49,
        "glassLHR": 1448.64
      },
      "9′2″ × 10′0″": {
        "solid15R": 1166,
        "glass15R": 1362.15,
        "solidFV": 1459.44,
        "glassFV": 1655.58,
        "solidLHR": 1331.25,
        "glassLHR": 1527.4
      },
      "9′2″ × 12′0″": {
        "solid15R": 1450.16,
        "glass15R": 1646.31,
        "solidFV": 1802.29,
        "glassFV": 1998.44,
        "solidLHR": 1615.42,
        "glassLHR": 1811.56
      },
      "9′2″ × 14′0″": {
        "solid15R": 1680.29,
        "glass15R": 1876.44,
        "solidFV": 2091.09,
        "glassFV": 2287.24,
        "solidLHR": 1845.55,
        "glassLHR": 2041.69
      },
      "9′2″ × 16′0″": {
        "solid15R": 1952.09,
        "glass15R": 2148.24,
        "solidFV": 2421.56,
        "glassFV": 2617.71,
        "solidLHR": 2117.35,
        "glassLHR": 2313.49
      },
      "10′2″ × 8′0″": {
        "solid15R": 1027.02,
        "glass15R": 1321.22,
        "solidFV": 1261.76,
        "glassFV": 1555.96,
        "solidLHR": 1192.27,
        "glassLHR": 1486.47
      },
      "10′2″ × 9′0″": {
        "solid15R": 1164.45,
        "glass15R": 1458.65,
        "solidFV": 1428.55,
        "glassFV": 1722.75,
        "solidLHR": 1330.62,
        "glassLHR": 1623.91
      },
      "10′2″ × 10′0″": {
        "solid15R": 1258.67,
        "glass15R": 1552.87,
        "solidFV": 1552.11,
        "glassFV": 1846.31,
        "solidLHR": 1423.93,
        "glassLHR": 1717.22
      },
      "10′2″ × 12′0″": {
        "solid15R": 1547.45,
        "glass15R": 1841.65,
        "solidFV": 1899.58,
        "glassFV": 2193.78,
        "solidLHR": 1712.71,
        "glassLHR": 2006.91
      },
      "10′2″ × 14′0″": {
        "solid15R": 1766.76,
        "glass15R": 2060.96,
        "solidFV": 2177.56,
        "glassFV": 2471.76,
        "solidLHR": 1932.02,
        "glassLHR": 2226.22
      },
      "10′2″ × 16′0″": {
        "solid15R": 2095.73,
        "glass15R": 2389.93,
        "solidFV": 2565.2,
        "glassFV": 2859.4,
        "solidLHR": 2260.98,
        "glassLHR": 2555.18
      },
      "12′2″ × 8′0″": {
        "solid15R": 1184.55,
        "glass15R": 1478.75,
        "solidFV": 1419.29,
        "glassFV": 1713.49,
        "solidLHR": 1349.8,
        "glassLHR": 1644
      },
      "12′2″ × 9′0″": {
        "solid15R": 1335.89,
        "glass15R": 1630.09,
        "solidFV": 1599.98,
        "glassFV": 1894.18,
        "solidLHR": 1501.15,
        "glassLHR": 1795.35
      },
      "12′2″ × 10′0″": {
        "solid15R": 1436.27,
        "glass15R": 1730.47,
        "solidFV": 1729.71,
        "glassFV": 2023.91,
        "solidLHR": 1601.53,
        "glassLHR": 1895.73
      },
      "12′2″ × 12′0″": {
        "solid15R": 1746.69,
        "glass15R": 2040.89,
        "solidFV": 2098.82,
        "glassFV": 2393.02,
        "solidLHR": 1911.95,
        "glassLHR": 2206.15
      },
      "12′2″ × 14′0″": {
        "solid15R": 2054.02,
        "glass15R": 2348.22,
        "solidFV": 2464.82,
        "glassFV": 2759.02,
        "solidLHR": 2219.27,
        "glassLHR": 2513.47
      },
      "12′2″ × 16′0″": {
        "solid15R": 2423.13,
        "glass15R": 2717.33,
        "solidFV": 2892.6,
        "glassFV": 3186.8,
        "solidLHR": 2588.38,
        "glassLHR": 2882.58
      }
    }
  }
};

/** Stocked Clopay replacement-section COSTS by model and width; sell = cost / (1 - margin/100). */
export const COMM_SECTIONS: { margin: number; cost: Record<string, Record<string, { bt: number; int: number }>> } = {
  "cost": {
    "524": {
      "8.2": {
        "bt": 128.23,
        "int": 113.03
      },
      "9.2": {
        "bt": 144.27,
        "int": 127.15
      },
      "10.2": {
        "bt": 160.29,
        "int": 141.29
      },
      "12.2": {
        "bt": 192.35,
        "int": 169.54
      },
      "14.2": {
        "bt": 224.42,
        "int": 197.8
      },
      "16.2": {
        "bt": 256.47,
        "int": 226.06
      }
    },
    "524V": {
      "8.2": {
        "bt": 177.11,
        "int": 161.91
      },
      "9.2": {
        "bt": 199.26,
        "int": 182.14
      },
      "10.2": {
        "bt": 221.4,
        "int": 202.38
      },
      "12.2": {
        "bt": 265.67,
        "int": 242.85
      },
      "14.2": {
        "bt": 309.95,
        "int": 283.24
      },
      "16.2": {
        "bt": 354.23,
        "int": 323.82
      }
    },
    "524S": {
      "8.2": {
        "bt": 194.42,
        "int": 179.21
      },
      "9.2": {
        "bt": 218.73,
        "int": 201.62
      },
      "10.2": {
        "bt": 243.03,
        "int": 224.02
      },
      "12.2": {
        "bt": 291.63,
        "int": 268.83
      },
      "14.2": {
        "bt": 340.25,
        "int": 313.63
      },
      "16.2": {
        "bt": 388.85,
        "int": 358.44
      }
    },
    "3200": {
      "8.2": {
        "bt": 190.78,
        "int": 176.7
      },
      "9.2": {
        "bt": 214.62,
        "int": 198.78
      },
      "10.2": {
        "bt": 238.48,
        "int": 220.87
      },
      "12.2": {
        "bt": 286.17,
        "int": 265.04
      },
      "14.2": {
        "bt": 333.87,
        "int": 309.22
      },
      "16.2": {
        "bt": 381.57,
        "int": 353.39
      }
    },
    "3720": {
      "8.2": {
        "bt": 208.83,
        "int": 194.2
      },
      "9.2": {
        "bt": 234.93,
        "int": 218.45
      },
      "10.2": {
        "bt": 261.04,
        "int": 242.73
      },
      "12.2": {
        "bt": 313.26,
        "int": 291.27
      },
      "14.2": {
        "bt": 365.46,
        "int": 339.83
      },
      "16.2": {
        "bt": 417.66,
        "int": 388.37
      }
    },
    "3717": {
      "8.2": {
        "bt": 187.92,
        "int": 194.92
      },
      "9.2": {
        "bt": 211.39,
        "int": 194.92
      },
      "10.2": {
        "bt": 234.88,
        "int": 216.58
      },
      "12.2": {
        "bt": 281.87,
        "int": 259.89
      },
      "14.2": {
        "bt": 328.84,
        "int": 303.21
      },
      "16.2": {
        "bt": 375.83,
        "int": 346.54
      }
    },
    "3150": {
      "8.2": {
        "bt": 149.9,
        "int": 135.82
      },
      "9.2": {
        "bt": 168.65,
        "int": 152.81
      },
      "10.2": {
        "bt": 187.38,
        "int": 169.78
      },
      "12.2": {
        "bt": 224.86,
        "int": 203.74
      },
      "14.2": {
        "bt": 262.34,
        "int": 237.69
      },
      "16.2": {
        "bt": 299.82,
        "int": 271.65
      }
    }
  },
  "margin": 49
};

/** Per-foot section rates + adders (also shown in the UI, mirrored in commercial-meta). */
export const COMM_SLAB: { rate: Record<string, number>; label: Record<string, string>; adders: { retainer: number; stile_single: number; stile_double: number; window: number }; widths: number[] } = {
  "rate": {
    "591": 49.5,
    "592": 54.5,
    "593": 48.5,
    "TS125": 33.5,
    "TS150": 37.5,
    "TS200": 44.5,
    "2415": 29,
    "2415V": 37,
    "2415S": 40.75,
    "2742": 41.5,
    "524": 29.0,
    "524V": 37.0,
    "524S": 40.75
  },
  "label": {
    "591": "1-5/8″",
    "592": "2″",
    "593": "1-3/8″",
    "TS125": "1″",
    "TS150": "1-1/2″",
    "TS200": "2″",
    "2415": "2″ non-insulated",
    "2415V": "2″ vinyl backer",
    "2415S": "2″ steel backer",
    "2742": "2″",
    "524": "2″",
    "524V": "2″ vinyl backer",
    "524S": "2″ steel backer"
  },
  "adders": {
    "retainer": 3.75,
    "stile_single": 20,
    "stile_double": 50,
    "window": 150
  },
  "widths": [
    8,
    9,
    10,
    12,
    14,
    15,
    15.5,
    16,
    17,
    18,
    19,
    20
  ]
};

export const STOCK_COMM: { model: string; widths: string[]; heights: string }[] = [
  {
    "model": "524",
    "widths": [
      "8.2",
      "9.2",
      "10.2",
      "12.2"
    ],
    "heights": "8'0\", 9'0\", 10'0\", 12'0\", 14'0\""
  },
  {
    "model": "524V",
    "widths": [
      "8.2",
      "9.2",
      "10.2",
      "12.2"
    ],
    "heights": "8'0\", 9'0\", 10'0\", 12'0\", 14'0\""
  },
  {
    "model": "524S",
    "widths": [
      "8.2",
      "9.2",
      "10.2",
      "12.2"
    ],
    "heights": "8'0\", 9'0\", 10'0\", 12'0\", 14'0\""
  },
  {
    "model": "3200",
    "widths": [
      "8.2",
      "9.2",
      "10.2",
      "12.2",
      "14.2"
    ],
    "heights": "8'0\", 9'0\", 10'0\", 12'0\", 14'0\""
  }
];
export const COMM_DESC: Record<string, string> = {
  "2415": "Steel Ribbed, 2″, Non-Insulated",
  "2415V": "Steel Ribbed, 2″, R-Value 6.6, Vinyl Back",
  "2415S": "Steel Ribbed, 2″, R-Value 6.6, Steel Back",
  "TS125": "Minor Ribbed Flush, 1″, R-Value 10.7, Tongue & Groove, Built-in Struts",
  "TS150": "Minor Ribbed Flush, 1½″, R-Value 14.16, Tongue & Groove",
  "TS200": "Minor Ribbed Flush, 2″, R-Value 17.5, Tongue & Groove",
  "591": "Steel Ribbed, 1⅝″, R-Value 14.86",
  "592": "Steel Ribbed, 2″, R-Value 17.5",
  "593": "Steel Ribbed, 1⅜″, R-Value 12.76",
  "524": "Commercial Deep Ribbed, 2″, Non-Insulated, 24 Ga Steel",
  "524V": "Commercial Deep Ribbed, 2″, R-Value 6.6, Vinyl Back, 24 Ga Steel",
  "524S": "Commercial Deep Ribbed, 2″, R-Value 6.6, Steel Back, 24 Ga Steel",
  "3150": "Stucco Emboss w/Micro Groove, 1 3/8″ EPS Insulation, R-Value 6.5, 27 Ga Steel",
  "3200": "Stucco Emboss w/Micro Groove, 2″ EPS Insulation, R-Value 9.1, 24 Ga Steel",
  "3717": "Stucco Embossed with Micro Groove, 1 3/4″ Intellicore, R-Value 16.2, 27 Ga Steel",
  "3720": "Stucco Embossed with Micro Groove, 2″ Intellicore, R-Value 18.4, 27 Ga Steel"
};
export const GRADE_COMM: Record<string, string> = {
  "3200": "insulated",
  "524": "double strength b grade"
};
export const COLLECTIONS_COMM: Record<string, string> = {
  "3200": "Energy Collection"
};
