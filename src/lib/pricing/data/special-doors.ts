// AUTO-GENERATED from the Clopay size grids by scripts/gen_special_doors.py.
// Do not edit by hand — re-run the script against a newer sheet.
//
// Source: 4050-7FT.xlsx (ALL tab, 43M)
//
// Values are the SELL column: the door at the collection margin, already
// applied. Nothing further is applied at quote time, unlike the manual path
// where the counter enters a Clopay portal total and the margin does the work.
//
// Baseline is 12" radius, extension springs, no lock. Track, spring and lock
// adders come from ADDONS at quote time, the same ones a stock door uses.
//
// Shape: model -> height tier -> widthKey -> PriceTriple.
// 5/10/2026, by scripts/apply_margin_grid.py from "Backup_Copy_of_UPDATED_
//   PRICING_9-8 (002).xlsx": the 4308 (7ft; 8ft to 8'2" so far) and the 4138
//   (7, 8 and 9ft), at the SELL Brandon filled in — TOTAL / 0.55, the Modern
//   Collection's 45% door margin, checked on every row. Held off the grid:
//   4308 8'6" x 7'0" glass, whose row carries the solid price ($613.85 total
//   against $794.80 for every glass width around it); it asks for the typed
//   total until the sheet is fixed and the script re-run without --hold.
// 30/9/2026, applied by hand from "Copy of UPDATED PRICING 9-8 (002).xlsx":
//   4300/4301/4310 at 8ft gained 15'0" to 20'0" (it stopped at 14'10"). 19'0"
//   solid is the sheet's own TOTAL at 44M, $2318.41, not the $2266.63 typed.
//   T52S/T52L at 7ft had 11'0" to 11'8" under broken keys ("11.00", "11.02"…)
//   the configurator could not find; same prices, proper keys.
//   Kept the app's price where the sheet disagrees with its own TOTAL: 4300
//   8ft 9'2" to 9'10" inserts ($1679.91, not $1326.27) and T52S 7ft 14'0"
//   glass ($1357.54, not $1375.54).
import type { PriceTriple } from "../types";

export const SPECIAL_DOORS: Record<string, Record<string, Record<string, Partial<PriceTriple>>>> =
  {
  "4050/4051/4053": {
    "7": {
      "6": {
        "solid": 723.25,
        "glass": 856.81,
        "inserts": 916.09
      },
      "6.2": {
        "solid": 723.25,
        "glass": 856.81,
        "inserts": 916.09
      },
      "6.4": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "6.6": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "6.8": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "6.10": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "7": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "7.2": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "7.4": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "7.6": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "7.8": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "7.10": {
        "solid": 837.75,
        "glass": 968.32,
        "inserts": 1030.6
      },
      "8": {
        "solid": 723.25,
        "glass": 897.37,
        "inserts": 980.4
      },
      "8.2": {
        "solid": 905.53,
        "glass": 1079.65,
        "inserts": 1162.68
      },
      "8.4": {
        "solid": 905.53,
        "glass": 1079.65,
        "inserts": 1162.68
      },
      "8.6": {
        "solid": 905.53,
        "glass": 1079.65,
        "inserts": 1162.68
      },
      "8.8": {
        "solid": 905.53,
        "glass": 1079.65,
        "inserts": 1162.68
      },
      "8.10": {
        "solid": 905.53,
        "glass": 1079.65,
        "inserts": 1162.68
      },
      "9": {
        "solid": 782.19,
        "glass": 956.32,
        "inserts": 1039.35
      },
      "9.2": {
        "solid": 1027.21,
        "glass": 1201.33,
        "inserts": 1284.37
      },
      "9.4": {
        "solid": 1027.21,
        "glass": 1201.33,
        "inserts": 1284.37
      },
      "9.6": {
        "solid": 1027.21,
        "glass": 1201.33,
        "inserts": 1284.37
      },
      "9.8": {
        "solid": 1027.21,
        "glass": 1201.33,
        "inserts": 1284.37
      },
      "9.10": {
        "solid": 1027.21,
        "glass": 1201.33,
        "inserts": 1284.37
      },
      "10": {
        "solid": 887.98,
        "glass": 1105.61,
        "inserts": 1209.4
      },
      "10.2": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "10.4": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "10.6": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "10.8": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "10.10": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "11": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "11.2": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "11.4": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "11.6": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "11.8": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "11.10": {
        "solid": 1246.19,
        "glass": 1463.82,
        "inserts": 1567.61
      },
      "12": {
        "solid": 1076.84,
        "glass": 1338.02,
        "inserts": 1462.58
      },
      "12.2": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "12.4": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "12.6": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "12.8": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "12.10": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "13": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "13.2": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "13.4": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "13.6": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "13.8": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "13.10": {
        "solid": 1411.0,
        "glass": 1672.18,
        "inserts": 1796.74
      },
      "14": {
        "solid": 1220.14,
        "glass": 1524.82,
        "inserts": 1670.14
      },
      "14.2": {
        "solid": 1480.32,
        "glass": 1785.0,
        "inserts": 1930.32
      },
      "14.4": {
        "solid": 1480.32,
        "glass": 1785.0,
        "inserts": 1930.32
      },
      "14.6": {
        "solid": 1480.32,
        "glass": 1785.0,
        "inserts": 1930.32
      },
      "14.8": {
        "solid": 1480.32,
        "glass": 1785.0,
        "inserts": 1930.32
      },
      "14.10": {
        "solid": 1480.32,
        "glass": 1785.0,
        "inserts": 1930.32
      },
      "15": {
        "solid": 1280.4,
        "glass": 1585.09,
        "inserts": 1730.4
      },
      "15.2": {
        "solid": 1497.26,
        "glass": 1801.95,
        "inserts": 1947.26
      },
      "15.4": {
        "solid": 1497.26,
        "glass": 1801.95,
        "inserts": 1947.26
      },
      "15.6": {
        "solid": 1295.16,
        "glass": 1599.84,
        "inserts": 1745.16
      },
      "15.8": {
        "solid": 1295.16,
        "glass": 1599.84,
        "inserts": 1745.16
      },
      "15.10": {
        "solid": 1506.49,
        "glass": 1811.18,
        "inserts": 1956.49
      },
      "16": {
        "solid": 1303.18,
        "glass": 1651.4,
        "inserts": 1817.47
      },
      "16.2": {
        "solid": 1739.07,
        "glass": 2087.3,
        "inserts": 2253.37
      },
      "16.4": {
        "solid": 1739.07,
        "glass": 2087.3,
        "inserts": 2253.37
      },
      "16.6": {
        "solid": 1739.07,
        "glass": 2087.3,
        "inserts": 2253.37
      },
      "16.8": {
        "solid": 1739.07,
        "glass": 2087.3,
        "inserts": 2253.37
      },
      "16.10": {
        "solid": 1739.07,
        "glass": 2087.3,
        "inserts": 2253.37
      },
      "17": {
        "solid": 1505.42,
        "glass": 1853.65,
        "inserts": 2019.72
      },
      "17.2": {
        "solid": 1819.16,
        "glass": 2167.39,
        "inserts": 2333.46
      },
      "17.4": {
        "solid": 1819.16,
        "glass": 2167.39,
        "inserts": 2333.46
      },
      "17.6": {
        "solid": 1819.16,
        "glass": 2167.39,
        "inserts": 2333.46
      },
      "17.8": {
        "solid": 1819.16,
        "glass": 2167.39,
        "inserts": 2333.46
      },
      "17.10": {
        "solid": 1819.16,
        "glass": 2167.39,
        "inserts": 2333.46
      },
      "18": {
        "solid": 1575.05,
        "glass": 1923.28,
        "inserts": 2089.35
      }
    },
    "8": {
      "6": {
        "solid": 875.95,
        "glass": 1006.0,
        "inserts": 1068.78
      },
      "6.2": {
        "solid": 875.95,
        "glass": 1006.51,
        "inserts": 1068.79
      },
      "6.4": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "6.6": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "6.8": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "6.10": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "7": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "7.2": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "7.4": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "7.6": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "7.8": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "7.10": {
        "solid": 1013.37,
        "glass": 1143.93,
        "inserts": 1206.21
      },
      "8": {
        "solid": 875.95,
        "glass": 1050.07,
        "inserts": 1133.11
      },
      "8.2": {
        "solid": 1104.23,
        "glass": 1278.35,
        "inserts": 1361.39
      },
      "8.4": {
        "solid": 1104.23,
        "glass": 1278.35,
        "inserts": 1361.39
      },
      "8.6": {
        "solid": 1104.23,
        "glass": 1278.35,
        "inserts": 1361.39
      },
      "8.8": {
        "solid": 1104.23,
        "glass": 1278.35,
        "inserts": 1361.39
      },
      "8.10": {
        "solid": 1104.23,
        "glass": 1278.35,
        "inserts": 1361.39
      },
      "9": {
        "solid": 954.95,
        "glass": 1129.02,
        "inserts": 1212.11
      },
      "9.2": {
        "solid": 1269.02,
        "glass": 1443.14,
        "inserts": 1526.18
      },
      "9.4": {
        "solid": 1269.02,
        "glass": 1443.14,
        "inserts": 1526.18
      },
      "9.6": {
        "solid": 1269.02,
        "glass": 1443.14,
        "inserts": 1526.18
      },
      "9.8": {
        "solid": 1269.02,
        "glass": 1443.14,
        "inserts": 1526.18
      },
      "9.10": {
        "solid": 1269.02,
        "glass": 1443.14,
        "inserts": 1526.18
      },
      "10": {
        "solid": 1098.26,
        "glass": 1315.89,
        "inserts": 1419.68
      },
      "10.2": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "10.4": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "10.6": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "10.8": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "10.10": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "11": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "11.2": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "11.4": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "11.6": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "11.8": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "11.10": {
        "solid": 1483.39,
        "glass": 1701.22,
        "inserts": 1804.81
      },
      "12": {
        "solid": 1283.09,
        "glass": 1544.26,
        "inserts": 1668.82
      },
      "12.2": {
        "solid": 1702.11,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "12.4": {
        "solid": 1702.11,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "12.6": {
        "solid": 1702.11,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "12.8": {
        "solid": 1702.11,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "12.10": {
        "solid": 1701.79,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "13": {
        "solid": 1701.79,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "13.2": {
        "solid": 1701.79,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "13.4": {
        "solid": 1701.79,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "13.6": {
        "solid": 1701.79,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "13.8": {
        "solid": 1701.79,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "13.10": {
        "solid": 1701.79,
        "glass": 1963.28,
        "inserts": 2087.84
      },
      "14": {
        "solid": 1473.28,
        "glass": 1777.96,
        "inserts": 1923.28
      },
      "14.2": {
        "solid": 1817.61,
        "glass": 2122.3,
        "inserts": 2267.61
      },
      "14.4": {
        "solid": 1817.61,
        "glass": 2122.3,
        "inserts": 2267.61
      },
      "14.6": {
        "solid": 1817.61,
        "glass": 2122.3,
        "inserts": 2267.61
      },
      "14.8": {
        "solid": 1817.61,
        "glass": 2122.3,
        "inserts": 2267.61
      },
      "14.10": {
        "solid": 1817.61,
        "glass": 2122.3,
        "inserts": 2267.61
      },
      "15": {
        "solid": 1573.72,
        "glass": 1878.4,
        "inserts": 2023.72
      },
      "15.2": {
        "solid": 1843.79,
        "glass": 2148.47,
        "inserts": 2293.79
      },
      "15.4": {
        "solid": 1843.79,
        "glass": 2148.47,
        "inserts": 2293.79
      },
      "15.6": {
        "solid": 1596.49,
        "glass": 1901.18,
        "inserts": 2046.49
      },
      "15.8": {
        "solid": 1596.49,
        "glass": 1901.18,
        "inserts": 2046.49
      },
      "15.10": {
        "solid": 1889.81,
        "glass": 2194.49,
        "inserts": 2339.81
      },
      "16": {
        "solid": 1636.68,
        "glass": 1984.91,
        "inserts": 2150.98
      },
      "16.2": {
        "solid": 2062.53,
        "glass": 2410.75,
        "inserts": 2576.82
      },
      "16.4": {
        "solid": 2062.53,
        "glass": 2410.75,
        "inserts": 2576.82
      },
      "16.6": {
        "solid": 2062.53,
        "glass": 2410.75,
        "inserts": 2576.82
      },
      "16.8": {
        "solid": 2062.53,
        "glass": 2410.75,
        "inserts": 2576.82
      },
      "16.10": {
        "solid": 2062.53,
        "glass": 2410.75,
        "inserts": 2576.82
      },
      "17": {
        "solid": 1786.68,
        "glass": 2134.91,
        "inserts": 2300.98
      },
      "17.2": {
        "solid": 2218.09,
        "glass": 2566.32,
        "inserts": 2732.39
      },
      "17.4": {
        "solid": 2218.09,
        "glass": 2566.32,
        "inserts": 2732.39
      },
      "17.6": {
        "solid": 2218.09,
        "glass": 2566.32,
        "inserts": 2732.39
      },
      "17.8": {
        "solid": 2218.09,
        "glass": 2566.32,
        "inserts": 2732.39
      },
      "17.10": {
        "solid": 2218.09,
        "glass": 2566.32,
        "inserts": 2732.39
      },
      "18": {
        "solid": 1921.95,
        "glass": 2270.18,
        "inserts": 2436.25
      }
    },
    "9": {
      "6": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "6.2": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "6.4": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "6.6": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "6.8": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "6.10": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "7": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "7.2": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "7.4": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "7.6": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "7.8": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "7.10": {
        "solid": 1372.35,
        "glass": 1502.91,
        "inserts": 1565.19
      },
      "8": {
        "solid": 1193.35,
        "glass": 1367.47,
        "inserts": 1450.51
      },
      "8.2": {
        "solid": 1486.33,
        "glass": 1660.46,
        "inserts": 1743.49
      },
      "8.4": {
        "solid": 1486.33,
        "glass": 1660.46,
        "inserts": 1743.49
      },
      "8.6": {
        "solid": 1486.33,
        "glass": 1660.46,
        "inserts": 1743.49
      },
      "8.8": {
        "solid": 1486.33,
        "glass": 1660.46,
        "inserts": 1743.49
      },
      "8.10": {
        "solid": 1486.33,
        "glass": 1660.46,
        "inserts": 1743.49
      },
      "9": {
        "solid": 1292.46,
        "glass": 1466.58,
        "inserts": 1549.61
      },
      "9.2": {
        "solid": 1722.0,
        "glass": 1896.12,
        "inserts": 1979.16
      },
      "9.4": {
        "solid": 1722.0,
        "glass": 1896.12,
        "inserts": 1979.16
      },
      "9.6": {
        "solid": 1722.0,
        "glass": 1896.12,
        "inserts": 1979.16
      },
      "9.8": {
        "solid": 1722.0,
        "glass": 1896.12,
        "inserts": 1979.16
      },
      "9.10": {
        "solid": 1722.0,
        "glass": 1896.12,
        "inserts": 1979.16
      },
      "10": {
        "solid": 1497.39,
        "glass": 1715.02,
        "inserts": 1818.81
      },
      "10.2": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "10.4": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "10.6": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "10.8": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "10.10": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "11": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "11.2": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "11.4": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "11.6": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "11.8": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "11.10": {
        "solid": 2065.46,
        "glass": 2283.09,
        "inserts": 2386.88
      },
      "12": {
        "solid": 1796.05,
        "glass": 2057.23,
        "inserts": 2181.79
      },
      "12.2": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "12.4": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "12.6": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "12.8": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "12.10": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "13": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "13.2": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "13.4": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "13.6": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "13.8": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "13.10": {
        "solid": 2313.44,
        "glass": 2574.61,
        "inserts": 2699.18
      },
      "14": {
        "solid": 2011.68,
        "glass": 2316.37,
        "inserts": 2461.68
      },
      "14.2": {
        "solid": 2428.98,
        "glass": 2733.67,
        "inserts": 2878.98
      },
      "14.4": {
        "solid": 2428.98,
        "glass": 2733.67,
        "inserts": 2878.98
      },
      "14.6": {
        "solid": 2428.98,
        "glass": 2733.67,
        "inserts": 2878.98
      },
      "14.8": {
        "solid": 2428.98,
        "glass": 2733.67,
        "inserts": 2878.98
      },
      "14.10": {
        "solid": 2428.98,
        "glass": 2733.67,
        "inserts": 2878.98
      },
      "15": {
        "solid": 2112.14,
        "glass": 2416.82,
        "inserts": 2562.14
      },
      "15.2": {
        "solid": 2562.95,
        "glass": 2867.63,
        "inserts": 3012.95
      },
      "15.4": {
        "solid": 2562.95,
        "glass": 2867.63,
        "inserts": 3012.95
      },
      "15.6": {
        "solid": 2228.67,
        "glass": 2533.35,
        "inserts": 2678.67
      },
      "15.8": {
        "solid": 2228.67,
        "glass": 2533.35,
        "inserts": 2678.67
      },
      "15.10": {
        "solid": 2562.95,
        "glass": 2867.63,
        "inserts": 3012.95
      },
      "16": {
        "solid": 2228.67,
        "glass": 2576.89,
        "inserts": 2742.96
      },
      "16.2": {
        "solid": 2948.02,
        "glass": 3296.25,
        "inserts": 3462.32
      },
      "16.4": {
        "solid": 2948.02,
        "glass": 3296.25,
        "inserts": 3462.32
      },
      "16.6": {
        "solid": 2948.02,
        "glass": 3296.25,
        "inserts": 3462.32
      },
      "16.8": {
        "solid": 2948.02,
        "glass": 3296.25,
        "inserts": 3462.32
      },
      "16.10": {
        "solid": 2948.02,
        "glass": 3296.25,
        "inserts": 3462.32
      },
      "17": {
        "solid": 2563.51,
        "glass": 2911.74,
        "inserts": 3077.81
      },
      "17.2": {
        "solid": 3094.35,
        "glass": 3442.58,
        "inserts": 3608.65
      },
      "17.4": {
        "solid": 3094.35,
        "glass": 3442.58,
        "inserts": 3608.65
      },
      "17.6": {
        "solid": 3094.35,
        "glass": 3442.58,
        "inserts": 3608.65
      },
      "17.8": {
        "solid": 3094.35,
        "glass": 3442.58,
        "inserts": 3608.65
      },
      "17.10": {
        "solid": 3094.35,
        "glass": 3442.58,
        "inserts": 3608.65
      },
      "18": {
        "solid": 2690.74,
        "glass": 3038.96,
        "inserts": 3205.04
      }
    }
  },
  "T50S/T50L": {
    "7": {
      "6": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "6.2": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "6.4": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "6.6": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "6.8": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "6.10": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "7": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "7.2": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "7.4": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "7.6": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "7.8": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "7.10": {
        "solid": 658.18,
        "glass": 770.33,
        "inserts": 845.1
      },
      "8": {
        "solid": 566.06,
        "glass": 715.61,
        "inserts": 815.31
      },
      "8.2": {
        "solid": 702.57,
        "glass": 852.12,
        "inserts": 951.82
      },
      "8.4": {
        "solid": 702.57,
        "glass": 852.12,
        "inserts": 951.82
      },
      "8.6": {
        "solid": 702.57,
        "glass": 852.12,
        "inserts": 951.82
      },
      "8.8": {
        "solid": 702.57,
        "glass": 852.12,
        "inserts": 951.82
      },
      "8.10": {
        "solid": 702.57,
        "glass": 852.12,
        "inserts": 951.82
      },
      "9": {
        "solid": 604.63,
        "glass": 754.18,
        "inserts": 853.88
      },
      "9.2": {
        "solid": 828.33,
        "glass": 977.88,
        "inserts": 1077.59
      },
      "9.4": {
        "solid": 828.33,
        "glass": 977.88,
        "inserts": 1077.59
      },
      "9.6": {
        "solid": 828.33,
        "glass": 977.88,
        "inserts": 1077.59
      },
      "9.8": {
        "solid": 828.33,
        "glass": 977.88,
        "inserts": 1077.59
      },
      "9.10": {
        "solid": 828.33,
        "glass": 977.88,
        "inserts": 1077.59
      },
      "10": {
        "solid": 713.98,
        "glass": 900.92,
        "inserts": 1025.53
      },
      "10.2": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "10.4": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "10.6": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "10.8": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "10.10": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "11": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "11.2": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "11.4": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "11.6": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "11.8": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "11.10": {
        "solid": 935.92,
        "glass": 1122.86,
        "inserts": 1247.29
      },
      "12": {
        "solid": 805.65,
        "glass": 1029.96,
        "inserts": 1179.51
      },
      "12.2": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "12.4": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "12.6": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "12.8": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "12.10": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "13": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "13.2": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "13.4": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "13.6": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "13.8": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "13.10": {
        "solid": 996.94,
        "glass": 1221.25,
        "inserts": 1370.8
      },
      "14": {
        "solid": 806.69,
        "glass": 1120.43,
        "inserts": 1294.9
      },
      "14.2": {
        "solid": 1087.55,
        "glass": 1349.27,
        "inserts": 1523.75
      },
      "14.4": {
        "solid": 1087.55,
        "glass": 1349.27,
        "inserts": 1523.75
      },
      "14.6": {
        "solid": 1087.55,
        "glass": 1349.27,
        "inserts": 1523.75
      },
      "14.8": {
        "solid": 1087.55,
        "glass": 1349.27,
        "inserts": 1523.75
      },
      "14.10": {
        "solid": 1087.55,
        "glass": 1349.27,
        "inserts": 1523.75
      },
      "15": {
        "solid": 937.53,
        "glass": 1199.25,
        "inserts": 1373.73
      },
      "15.2": {
        "solid": 1161.51,
        "glass": 1423.24,
        "inserts": 1597.65
      },
      "15.4": {
        "solid": 1161.51,
        "glass": 1423.24,
        "inserts": 1597.65
      },
      "15.6": {
        "solid": 1001.82,
        "glass": 1263.55,
        "inserts": 1438.02
      },
      "15.8": {
        "solid": 1001.82,
        "glass": 1263.55,
        "inserts": 1438.02
      },
      "15.10": {
        "solid": 1176.29,
        "glass": 1438.02,
        "inserts": 1612.49
      },
      "16": {
        "solid": 1014.71,
        "glass": 1313.8,
        "inserts": 1513.22
      },
      "16.2": {
        "solid": 1250.27,
        "glass": 1549.37,
        "inserts": 1748.78
      },
      "16.4": {
        "solid": 1250.27,
        "glass": 1549.37,
        "inserts": 1748.78
      },
      "16.6": {
        "solid": 1250.27,
        "glass": 1549.37,
        "inserts": 1748.78
      },
      "16.8": {
        "solid": 1250.27,
        "glass": 1549.37,
        "inserts": 1748.78
      },
      "16.10": {
        "solid": 1250.27,
        "glass": 1549.37,
        "inserts": 1748.78
      },
      "17": {
        "solid": 1079.02,
        "glass": 1378.12,
        "inserts": 1577.53
      },
      "17.2": {
        "solid": 1479.61,
        "glass": 1778.71,
        "inserts": 1978.12
      },
      "17.4": {
        "solid": 1479.61,
        "glass": 1778.71,
        "inserts": 1978.12
      },
      "17.6": {
        "solid": 1479.61,
        "glass": 1778.71,
        "inserts": 1978.12
      },
      "17.8": {
        "solid": 1479.61,
        "glass": 1778.71,
        "inserts": 1978.12
      },
      "17.10": {
        "solid": 1479.61,
        "glass": 1778.71,
        "inserts": 1978.12
      },
      "18": {
        "solid": 1196.22,
        "glass": 1577.53,
        "inserts": 1776.94
      }
    },
    "8": {
      "6": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "6.2": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "6.4": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "6.6": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "6.8": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "6.10": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "7": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "7.2": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "7.4": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "7.6": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "7.8": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "7.10": {
        "solid": 791.33,
        "glass": 903.49,
        "inserts": 978.25
      },
      "8": {
        "solid": 681.84,
        "glass": 831.39,
        "inserts": 931.1
      },
      "8.2": {
        "solid": 832.02,
        "glass": 981.57,
        "inserts": 1081.27
      },
      "8.4": {
        "solid": 832.02,
        "glass": 981.57,
        "inserts": 1081.27
      },
      "8.6": {
        "solid": 832.02,
        "glass": 981.57,
        "inserts": 1081.27
      },
      "8.8": {
        "solid": 832.02,
        "glass": 981.57,
        "inserts": 1081.27
      },
      "8.10": {
        "solid": 832.02,
        "glass": 981.57,
        "inserts": 1081.27
      },
      "9": {
        "solid": 717.22,
        "glass": 866.76,
        "inserts": 966.47
      },
      "9.2": {
        "solid": 894.88,
        "glass": 1044.43,
        "inserts": 1144.14
      },
      "9.4": {
        "solid": 894.88,
        "glass": 1044.43,
        "inserts": 1144.14
      },
      "9.6": {
        "solid": 894.88,
        "glass": 1044.43,
        "inserts": 1144.14
      },
      "9.8": {
        "solid": 894.88,
        "glass": 1044.43,
        "inserts": 1144.14
      },
      "9.10": {
        "solid": 894.88,
        "glass": 1044.43,
        "inserts": 1144.14
      },
      "10": {
        "solid": 771.88,
        "glass": 958.82,
        "inserts": 1083.43
      },
      "10.2": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "10.4": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "10.6": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "10.8": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "10.10": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "11": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "11.2": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "11.4": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "11.6": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "11.8": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "11.10": {
        "solid": 1150.43,
        "glass": 1338.43,
        "inserts": 1461.98
      },
      "12": {
        "solid": 992.18,
        "glass": 1216.49,
        "inserts": 1366.04
      },
      "12.2": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "12.4": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "12.6": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "12.8": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "12.10": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "13": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "13.2": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "13.4": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "13.6": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "13.8": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "13.10": {
        "solid": 1242.9,
        "glass": 1467.22,
        "inserts": 1616.76
      },
      "14": {
        "solid": 1072.61,
        "glass": 1334.33,
        "inserts": 1508.8
      },
      "14.2": {
        "solid": 1331.65,
        "glass": 1593.37,
        "inserts": 1767.84
      },
      "14.4": {
        "solid": 1331.65,
        "glass": 1593.37,
        "inserts": 1767.84
      },
      "14.6": {
        "solid": 1331.65,
        "glass": 1593.37,
        "inserts": 1767.84
      },
      "14.8": {
        "solid": 1331.65,
        "glass": 1593.37,
        "inserts": 1767.84
      },
      "14.10": {
        "solid": 1331.65,
        "glass": 1593.37,
        "inserts": 1767.84
      },
      "15": {
        "solid": 1149.78,
        "glass": 1411.51,
        "inserts": 1585.98
      },
      "15.2": {
        "solid": 1348.53,
        "glass": 1606.33,
        "inserts": 1780.8
      },
      "15.4": {
        "solid": 1348.53,
        "glass": 1606.33,
        "inserts": 1780.8
      },
      "15.6": {
        "solid": 1161.04,
        "glass": 1422.76,
        "inserts": 1597.24
      },
      "15.8": {
        "solid": 1161.04,
        "glass": 1422.76,
        "inserts": 1597.24
      },
      "15.10": {
        "solid": 1379.75,
        "glass": 1641.47,
        "inserts": 1815.94
      },
      "16": {
        "solid": 1191.59,
        "glass": 1490.69,
        "inserts": 1690.1
      },
      "16.2": {
        "solid": 1509.18,
        "glass": 1808.27,
        "inserts": 2007.69
      },
      "16.4": {
        "solid": 1509.18,
        "glass": 1808.27,
        "inserts": 2007.69
      },
      "16.6": {
        "solid": 1509.18,
        "glass": 1808.27,
        "inserts": 2007.69
      },
      "16.8": {
        "solid": 1509.18,
        "glass": 1808.27,
        "inserts": 2007.69
      },
      "16.10": {
        "solid": 1509.18,
        "glass": 1808.27,
        "inserts": 2007.69
      },
      "17": {
        "solid": 1304.16,
        "glass": 1603.25,
        "inserts": 1802.67
      },
      "17.2": {
        "solid": 1553.57,
        "glass": 1852.67,
        "inserts": 2052.08
      },
      "17.4": {
        "solid": 1553.57,
        "glass": 1852.67,
        "inserts": 2052.08
      },
      "17.6": {
        "solid": 1553.57,
        "glass": 1852.67,
        "inserts": 2052.08
      },
      "17.8": {
        "solid": 1553.57,
        "glass": 1852.67,
        "inserts": 2052.08
      },
      "17.10": {
        "solid": 1553.57,
        "glass": 1852.67,
        "inserts": 2052.08
      },
      "18": {
        "solid": 1255.57,
        "glass": 1641.86,
        "inserts": 1841.27
      }
    },
    "9": {
      "6": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "6.2": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "6.4": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "6.6": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "6.8": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "6.10": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "7": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "7.2": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "7.4": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "7.6": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "7.8": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "7.10": {
        "solid": 1179.86,
        "glass": 1292.02,
        "inserts": 1366.78
      },
      "8": {
        "solid": 1025.96,
        "glass": 1175.51,
        "inserts": 1275.22
      },
      "8.2": {
        "solid": 1226.08,
        "glass": 1375.63,
        "inserts": 1475.33
      },
      "8.4": {
        "solid": 1226.08,
        "glass": 1375.63,
        "inserts": 1475.33
      },
      "8.6": {
        "solid": 1226.08,
        "glass": 1375.63,
        "inserts": 1475.33
      },
      "8.8": {
        "solid": 1226.08,
        "glass": 1375.63,
        "inserts": 1475.33
      },
      "8.10": {
        "solid": 1226.08,
        "glass": 1375.63,
        "inserts": 1475.33
      },
      "9": {
        "solid": 1066.16,
        "glass": 1215.71,
        "inserts": 1315.41
      },
      "9.2": {
        "solid": 1311.16,
        "glass": 1460.71,
        "inserts": 1560.41
      },
      "9.4": {
        "solid": 1311.16,
        "glass": 1460.71,
        "inserts": 1560.41
      },
      "9.6": {
        "solid": 1311.16,
        "glass": 1460.71,
        "inserts": 1560.41
      },
      "9.8": {
        "solid": 1311.16,
        "glass": 1460.71,
        "inserts": 1560.41
      },
      "9.10": {
        "solid": 1311.16,
        "glass": 1460.71,
        "inserts": 1560.41
      },
      "10": {
        "solid": 1140.14,
        "glass": 1327.08,
        "inserts": 1451.69
      },
      "10.2": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "10.4": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "10.6": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "10.8": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "10.10": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "11": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "11.2": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "11.4": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "11.6": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "11.8": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "11.10": {
        "solid": 1697.67,
        "glass": 1884.61,
        "inserts": 2009.22
      },
      "12": {
        "solid": 1476.22,
        "glass": 1700.53,
        "inserts": 1850.08
      },
      "12.2": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "12.4": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "12.6": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "12.8": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "12.10": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "13": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "13.2": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "13.4": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "13.6": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "13.8": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "13.10": {
        "solid": 1827.12,
        "glass": 2051.43,
        "inserts": 2200.98
      },
      "14": {
        "solid": 1588.8,
        "glass": 1850.53,
        "inserts": 2025.0
      },
      "14.2": {
        "solid": 1951.0,
        "glass": 2212.73,
        "inserts": 2387.2
      },
      "14.4": {
        "solid": 1951.0,
        "glass": 2212.73,
        "inserts": 2387.2
      },
      "14.6": {
        "solid": 1951.0,
        "glass": 2212.73,
        "inserts": 2387.2
      },
      "14.8": {
        "solid": 1951.0,
        "glass": 2212.73,
        "inserts": 2387.2
      },
      "14.10": {
        "solid": 1951.0,
        "glass": 2212.73,
        "inserts": 2387.2
      },
      "15": {
        "solid": 1696.53,
        "glass": 1958.25,
        "inserts": 2132.73
      },
      "15.2": {
        "solid": 2037.92,
        "glass": 2299.65,
        "inserts": 2474.12
      },
      "15.4": {
        "solid": 2037.92,
        "glass": 2299.65,
        "inserts": 2474.12
      },
      "15.6": {
        "solid": 1772.1,
        "glass": 2033.81,
        "inserts": 2208.29
      },
      "15.8": {
        "solid": 1772.1,
        "glass": 2033.81,
        "inserts": 2208.29
      },
      "15.10": {
        "solid": 2037.92,
        "glass": 2299.65,
        "inserts": 2474.12
      },
      "16": {
        "solid": 1772.1,
        "glass": 2071.2,
        "inserts": 2270.61
      },
      "16.2": {
        "solid": 2159.98,
        "glass": 2459.08,
        "inserts": 2658.49
      },
      "16.4": {
        "solid": 2159.98,
        "glass": 2459.08,
        "inserts": 2658.49
      },
      "16.6": {
        "solid": 2159.98,
        "glass": 2459.08,
        "inserts": 2658.49
      },
      "16.8": {
        "solid": 2159.98,
        "glass": 2459.08,
        "inserts": 2658.49
      },
      "16.10": {
        "solid": 2159.98,
        "glass": 2459.08,
        "inserts": 2658.49
      },
      "17": {
        "solid": 1878.25,
        "glass": 2177.35,
        "inserts": 2376.76
      },
      "17.2": {
        "solid": 2526.16,
        "glass": 2825.25,
        "inserts": 3024.67
      },
      "17.4": {
        "solid": 2526.16,
        "glass": 2825.25,
        "inserts": 3024.67
      },
      "17.6": {
        "solid": 2526.16,
        "glass": 2825.25,
        "inserts": 3024.67
      },
      "17.8": {
        "solid": 2526.16,
        "glass": 2825.25,
        "inserts": 3024.67
      },
      "17.10": {
        "solid": 2526.16,
        "glass": 2825.25,
        "inserts": 3024.67
      },
      "18": {
        "solid": 2196.67,
        "glass": 2495.76,
        "inserts": 2695.18
      }
    }
  },
  "4300/4301/4310": {
    "7": {
      "6.2": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "6.4": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "6.6": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "6.8": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "6.10": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "7": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "7.2": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "7.4": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "7.6": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "7.8": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "7.10": {
        "solid": 958.91,
        "glass": 1079.71,
        "inserts": 1137.34
      },
      "8": {
        "solid": 828.98,
        "glass": 990.07,
        "inserts": 1066.91
      },
      "8.2": {
        "solid": 1038.71,
        "glass": 1199.8,
        "inserts": 1276.64
      },
      "8.4": {
        "solid": 1038.71,
        "glass": 1199.8,
        "inserts": 1276.64
      },
      "8.6": {
        "solid": 1038.71,
        "glass": 1199.8,
        "inserts": 1276.64
      },
      "8.8": {
        "solid": 1038.71,
        "glass": 1199.8,
        "inserts": 1276.64
      },
      "8.10": {
        "solid": 1038.71,
        "glass": 1199.8,
        "inserts": 1276.64
      },
      "9": {
        "solid": 898.38,
        "glass": 1059.46,
        "inserts": 1136.3
      },
      "9.2": {
        "solid": 1168.38,
        "glass": 1329.46,
        "inserts": 1406.3
      },
      "9.4": {
        "solid": 1168.38,
        "glass": 1329.46,
        "inserts": 1406.3
      },
      "9.6": {
        "solid": 1168.38,
        "glass": 1329.46,
        "inserts": 1406.3
      },
      "9.8": {
        "solid": 1168.38,
        "glass": 1329.46,
        "inserts": 1406.3
      },
      "9.10": {
        "solid": 1168.38,
        "glass": 1329.46,
        "inserts": 1406.3
      },
      "10": {
        "solid": 1011.13,
        "glass": 1212.48,
        "inserts": 1308.52
      },
      "10.2": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "10.4": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "10.6": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "10.8": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "10.10": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "11": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "11.2": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "11.4": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "11.6": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "11.8": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "11.10": {
        "solid": 1413.75,
        "glass": 1615.11,
        "inserts": 1711.14
      },
      "12": {
        "solid": 1223.04,
        "glass": 1464.68,
        "inserts": 1579.91
      },
      "12.2": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "12.4": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "12.6": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "12.8": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "12.10": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "13": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "13.2": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "13.4": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "13.6": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "13.8": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "13.10": {
        "solid": 1601.84,
        "glass": 1843.48,
        "inserts": 1958.71
      },
      "14": {
        "solid": 1386.61,
        "glass": 1668.5,
        "inserts": 1802.95
      },
      "14.2": {
        "solid": 1685.91,
        "glass": 1967.8,
        "inserts": 2102.25
      },
      "14.4": {
        "solid": 1685.91,
        "glass": 1967.8,
        "inserts": 2102.25
      },
      "14.6": {
        "solid": 1685.91,
        "glass": 1967.8,
        "inserts": 2102.25
      },
      "14.8": {
        "solid": 1685.91,
        "glass": 1967.8,
        "inserts": 2102.25
      },
      "14.10": {
        "solid": 1685.91,
        "glass": 1967.8,
        "inserts": 2102.25
      },
      "15": {
        "solid": 1459.7,
        "glass": 1741.59,
        "inserts": 1876.04
      },
      "15.2": {
        "solid": 1707.3,
        "glass": 1989.2,
        "inserts": 2123.64
      },
      "15.4": {
        "solid": 1707.3,
        "glass": 1989.2,
        "inserts": 2123.64
      },
      "15.6": {
        "solid": 1487.29,
        "glass": 1760.18,
        "inserts": 1894.63
      },
      "15.8": {
        "solid": 1487.29,
        "glass": 1760.18,
        "inserts": 1894.63
      },
      "15.10": {
        "solid": 1731.52,
        "glass": 2013.41,
        "inserts": 2147.86
      },
      "16": {
        "solid": 1499.36,
        "glass": 1821.54,
        "inserts": 1975.2
      },
      "16.2": {
        "solid": 1978.04,
        "glass": 2300.12,
        "inserts": 2453.88
      },
      "16.4": {
        "solid": 1978.04,
        "glass": 2300.12,
        "inserts": 2453.88
      },
      "16.6": {
        "solid": 1978.04,
        "glass": 2300.12,
        "inserts": 2453.88
      },
      "16.8": {
        "solid": 1978.04,
        "glass": 2300.12,
        "inserts": 2453.88
      },
      "16.10": {
        "solid": 1978.04,
        "glass": 2300.12,
        "inserts": 2453.88
      },
      "17": {
        "solid": 1713.73,
        "glass": 2035.91,
        "inserts": 2189.57
      },
      "17.2": {
        "solid": 2066.39,
        "glass": 2388.57,
        "inserts": 2542.23
      },
      "17.4": {
        "solid": 2066.39,
        "glass": 2388.57,
        "inserts": 2542.23
      },
      "17.6": {
        "solid": 2066.39,
        "glass": 2388.57,
        "inserts": 2542.23
      },
      "17.8": {
        "solid": 2066.39,
        "glass": 2388.57,
        "inserts": 2542.23
      },
      "17.10": {
        "solid": 2066.39,
        "glass": 2388.57,
        "inserts": 2542.23
      },
      "18": {
        "solid": 1790.57,
        "glass": 2112.75,
        "inserts": 2266.41
      },
      "18.2": {
        "solid": 2193.21,
        "glass": 2515.39,
        "inserts": 2669.05
      },
      "18.4": {
        "solid": 2193.21,
        "glass": 2515.39,
        "inserts": 2669.05
      },
      "18.6": {
        "solid": 2193.21,
        "glass": 2515.39,
        "inserts": 2669.05
      },
      "18.8": {
        "solid": 2193.21,
        "glass": 2515.39,
        "inserts": 2669.05
      },
      "18.10": {
        "solid": 2193.21,
        "glass": 2515.39,
        "inserts": 2669.05
      },
      "19": {
        "solid": 1900.86,
        "glass": 2263.3,
        "inserts": 2436.18
      },
      "19.2": {
        "solid": 2327.16,
        "glass": 2689.61,
        "inserts": 2862.48
      },
      "19.4": {
        "solid": 2327.16,
        "glass": 2689.61,
        "inserts": 2862.48
      },
      "19.6": {
        "solid": 2327.16,
        "glass": 2689.61,
        "inserts": 2862.48
      },
      "19.8": {
        "solid": 2327.16,
        "glass": 2689.61,
        "inserts": 2862.48
      },
      "19.10": {
        "solid": 2327.16,
        "glass": 2689.61,
        "inserts": 2862.48
      },
      "20": {
        "solid": 2017.3,
        "glass": 2420.04,
        "inserts": 2612.11
      }
    },
    "8": {
      "6.2": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "6.4": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "6.6": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "6.8": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "6.10": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "7": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "7.2": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "7.4": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "7.6": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "7.8": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "7.10": {
        "solid": 1151.27,
        "glass": 1272.07,
        "inserts": 1329.7
      },
      "8": {
        "solid": 996.27,
        "glass": 1157.36,
        "inserts": 1234.2
      },
      "8.2": {
        "solid": 1251.04,
        "glass": 1412.13,
        "inserts": 1488.96
      },
      "8.4": {
        "solid": 1251.04,
        "glass": 1412.13,
        "inserts": 1488.96
      },
      "8.6": {
        "solid": 1251.04,
        "glass": 1412.13,
        "inserts": 1488.96
      },
      "8.8": {
        "solid": 1251.04,
        "glass": 1412.13,
        "inserts": 1488.96
      },
      "8.10": {
        "solid": 1251.04,
        "glass": 1412.13,
        "inserts": 1488.96
      },
      "9": {
        "solid": 1083.02,
        "glass": 1244.11,
        "inserts": 1320.95
      },
      "9.2": {
        "solid": 1441.98,
        "glass": 1603.07,
        "inserts": 1679.91
      },
      "9.4": {
        "solid": 1441.98,
        "glass": 1603.07,
        "inserts": 1679.91
      },
      "9.6": {
        "solid": 1441.98,
        "glass": 1603.07,
        "inserts": 1679.91
      },
      "9.8": {
        "solid": 1441.98,
        "glass": 1603.07,
        "inserts": 1679.91
      },
      "9.10": {
        "solid": 1441.98,
        "glass": 1603.07,
        "inserts": 1679.91
      },
      "10": {
        "solid": 1249.05,
        "glass": 1450.41,
        "inserts": 1546.45
      },
      "10.2": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "10.4": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "10.6": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "10.8": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "10.10": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "11": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "11.2": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "11.4": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "11.6": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "11.8": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "11.10": {
        "solid": 1687.34,
        "glass": 1888.7,
        "inserts": 1984.73
      },
      "12": {
        "solid": 1460.96,
        "glass": 1702.61,
        "inserts": 1817.84
      },
      "12.2": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "12.4": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "12.6": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "12.8": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "12.10": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "13": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "13.2": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "13.4": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "13.6": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "13.8": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "13.10": {
        "solid": 1935.29,
        "glass": 2176.93,
        "inserts": 2292.16
      },
      "14": {
        "solid": 1676.55,
        "glass": 1958.45,
        "inserts": 2092.89
      },
      "14.2": {
        "solid": 2064.96,
        "glass": 2348.86,
        "inserts": 2481.3
      },
      "14.4": {
        "solid": 2064.96,
        "glass": 2348.86,
        "inserts": 2481.3
      },
      "14.6": {
        "solid": 2064.96,
        "glass": 2348.86,
        "inserts": 2481.3
      },
      "14.8": {
        "solid": 2064.96,
        "glass": 2348.86,
        "inserts": 2481.3
      },
      "14.10": {
        "solid": 2064.96,
        "glass": 2348.86,
        "inserts": 2481.3
      },
      "15": {
        "solid": 1789.32,
        "glass": 2071.21,
        "inserts": 2205.66
      },
      "15.2": {
        "solid": 2103.45,
        "glass": 2385.34,
        "inserts": 2519.79
      },
      "15.4": {
        "solid": 2103.45,
        "glass": 2385.34,
        "inserts": 2519.79
      },
      "15.6": {
        "solid": 1822.77,
        "glass": 2104.66,
        "inserts": 2239.11
      },
      "15.8": {
        "solid": 1822.77,
        "glass": 2104.66,
        "inserts": 2239.11
      },
      "15.10": {
        "solid": 2144.77,
        "glass": 2426.66,
        "inserts": 2561.11
      },
      "16": {
        "solid": 1858.71,
        "glass": 2180.89,
        "inserts": 2334.55
      },
      "16.2": {
        "solid": 2345.68,
        "glass": 2667.86,
        "inserts": 2821.52
      },
      "16.4": {
        "solid": 2345.68,
        "glass": 2667.86,
        "inserts": 2821.52
      },
      "16.6": {
        "solid": 2345.68,
        "glass": 2667.86,
        "inserts": 2821.52
      },
      "16.8": {
        "solid": 2345.68,
        "glass": 2667.86,
        "inserts": 2821.52
      },
      "16.10": {
        "solid": 2345.68,
        "glass": 2667.86,
        "inserts": 2821.52
      },
      "17": {
        "solid": 2033.43,
        "glass": 2355.61,
        "inserts": 2509.27
      },
      "17.2": {
        "solid": 2519.54,
        "glass": 2841.71,
        "inserts": 2995.38
      },
      "17.4": {
        "solid": 2519.54,
        "glass": 2841.71,
        "inserts": 2995.38
      },
      "17.6": {
        "solid": 2519.54,
        "glass": 2841.71,
        "inserts": 2995.38
      },
      "17.8": {
        "solid": 2519.54,
        "glass": 2841.71,
        "inserts": 2995.38
      },
      "17.10": {
        "solid": 2519.54,
        "glass": 2841.71,
        "inserts": 2995.38
      },
      "18": {
        "solid": 2184.59,
        "glass": 2506.77,
        "inserts": 2660.43
      },
      "18.2": {
        "solid": 2673.45,
        "glass": 2995.63,
        "inserts": 3149.29
      },
      "18.4": {
        "solid": 2673.45,
        "glass": 2995.63,
        "inserts": 3149.29
      },
      "18.6": {
        "solid": 2673.45,
        "glass": 2995.63,
        "inserts": 3149.29
      },
      "18.8": {
        "solid": 2673.45,
        "glass": 2995.63,
        "inserts": 3149.29
      },
      "18.10": {
        "solid": 2673.45,
        "glass": 2995.63,
        "inserts": 3149.29
      },
      "19": {
        "solid": 2318.41,
        "glass": 2680.86,
        "inserts": 2853.73
      },
      "19.2": {
        "solid": 2837.32,
        "glass": 3199.77,
        "inserts": 3372.64
      },
      "19.4": {
        "solid": 2837.32,
        "glass": 3199.77,
        "inserts": 3372.64
      },
      "19.6": {
        "solid": 2837.32,
        "glass": 3199.77,
        "inserts": 3372.64
      },
      "19.8": {
        "solid": 2837.32,
        "glass": 3199.77,
        "inserts": 3372.64
      },
      "19.10": {
        "solid": 2837.32,
        "glass": 3199.77,
        "inserts": 3372.64
      },
      "20": {
        "solid": 2460.93,
        "glass": 2863.66,
        "inserts": 3055.73
      }
    }
  },
  "T52S/T52L": {
    "7": {
      "6": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "6.2": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "6.4": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "6.6": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "6.8": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "6.10": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "7": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "7.2": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "7.4": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "7.6": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "7.8": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "7.10": {
        "solid": 770.48,
        "glass": 872.98,
        "inserts": 941.3
      },
      "8": {
        "solid": 664.25,
        "glass": 800.93,
        "inserts": 892.05
      },
      "8.2": {
        "solid": 814.43,
        "glass": 951.11,
        "inserts": 1042.23
      },
      "8.4": {
        "solid": 814.43,
        "glass": 951.11,
        "inserts": 1042.23
      },
      "8.6": {
        "solid": 814.43,
        "glass": 951.11,
        "inserts": 1042.23
      },
      "8.8": {
        "solid": 814.43,
        "glass": 951.11,
        "inserts": 1042.23
      },
      "8.10": {
        "solid": 814.43,
        "glass": 951.11,
        "inserts": 1042.23
      },
      "9": {
        "solid": 702.46,
        "glass": 839.14,
        "inserts": 930.27
      },
      "9.2": {
        "solid": 966.54,
        "glass": 1103.21,
        "inserts": 1194.34
      },
      "9.4": {
        "solid": 966.54,
        "glass": 1103.21,
        "inserts": 1194.34
      },
      "9.6": {
        "solid": 966.54,
        "glass": 1103.21,
        "inserts": 1194.34
      },
      "9.8": {
        "solid": 966.54,
        "glass": 1103.21,
        "inserts": 1194.34
      },
      "9.10": {
        "solid": 966.54,
        "glass": 1103.21,
        "inserts": 1194.34
      },
      "10": {
        "solid": 834.71,
        "glass": 1005.55,
        "inserts": 1119.43
      },
      "10.2": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "10.4": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "10.6": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "10.8": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "10.10": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "11": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "11.2": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "11.4": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "11.6": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "11.8": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "11.10": {
        "solid": 1255.84,
        "glass": 1426.68,
        "inserts": 1540.55
      },
      "12": {
        "solid": 1084.54,
        "glass": 1289.54,
        "inserts": 1426.21
      },
      "12.2": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "12.4": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "12.6": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "12.8": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "12.10": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "13": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "13.2": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "13.4": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "13.6": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "13.8": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "13.10": {
        "solid": 1294.68,
        "glass": 1499.68,
        "inserts": 1636.36
      },
      "14": {
        "solid": 1118.36,
        "glass": 1357.54,
        "inserts": 1516.96
      },
      "14.2": {
        "solid": 1326.8,
        "glass": 1565.98,
        "inserts": 1725.41
      },
      "14.4": {
        "solid": 1326.8,
        "glass": 1565.98,
        "inserts": 1725.41
      },
      "14.6": {
        "solid": 1326.8,
        "glass": 1565.98,
        "inserts": 1725.41
      },
      "14.8": {
        "solid": 1326.8,
        "glass": 1565.98,
        "inserts": 1725.41
      },
      "14.10": {
        "solid": 1326.8,
        "glass": 1565.98,
        "inserts": 1725.41
      },
      "15": {
        "solid": 1146.27,
        "glass": 1385.45,
        "inserts": 1544.88
      },
      "15.2": {
        "solid": 1333.55,
        "glass": 1572.73,
        "inserts": 1732.16
      },
      "15.4": {
        "solid": 1333.55,
        "glass": 1572.73,
        "inserts": 1732.16
      },
      "15.6": {
        "solid": 1152.14,
        "glass": 1391.32,
        "inserts": 1550.75
      },
      "15.8": {
        "solid": 1152.14,
        "glass": 1391.32,
        "inserts": 1550.75
      },
      "15.10": {
        "solid": 1333.55,
        "glass": 1572.73,
        "inserts": 1732.16
      },
      "16": {
        "solid": 1152.14,
        "glass": 1425.48,
        "inserts": 1607.71
      },
      "16.2": {
        "solid": 1441.71,
        "glass": 1715.05,
        "inserts": 1897.29
      },
      "16.4": {
        "solid": 1441.71,
        "glass": 1715.05,
        "inserts": 1897.29
      },
      "16.6": {
        "solid": 1441.71,
        "glass": 1715.05,
        "inserts": 1897.29
      },
      "16.8": {
        "solid": 1441.71,
        "glass": 1715.05,
        "inserts": 1897.29
      },
      "16.10": {
        "solid": 1441.71,
        "glass": 1715.05,
        "inserts": 1897.29
      },
      "17": {
        "solid": 1246.2,
        "glass": 1519.54,
        "inserts": 1701.77
      },
      "17.2": {
        "solid": 1511,
        "glass": 1784.34,
        "inserts": 1966.57
      },
      "17.4": {
        "solid": 1511,
        "glass": 1784.34,
        "inserts": 1966.57
      },
      "17.6": {
        "solid": 1511,
        "glass": 1784.34,
        "inserts": 1966.57
      },
      "17.8": {
        "solid": 1511,
        "glass": 1784.34,
        "inserts": 1966.57
      },
      "17.10": {
        "solid": 1511,
        "glass": 1784.34,
        "inserts": 1966.57
      },
      "18": {
        "solid": 1306.45,
        "glass": 1579.79,
        "inserts": 1762.02
      }
    }
  },
  "9200/9203": {
    "7": {
      "6.2": {
        "solid": 1002.86,
        "glass": 1149.02,
        "inserts": 1218.74
      },
      "6.4": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "6.6": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "6.8": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "6.10": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "7": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "7.2": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "7.4": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "7.6": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "7.8": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "7.10": {
        "solid": 1160.04,
        "glass": 1306.19,
        "inserts": 1375.91
      },
      "8": {
        "solid": 1002.86,
        "glass": 1197.74,
        "inserts": 1290.68
      },
      "8.2": {
        "solid": 1256.58,
        "glass": 1451.46,
        "inserts": 1544.4
      },
      "8.4": {
        "solid": 1256.58,
        "glass": 1451.46,
        "inserts": 1544.4
      },
      "8.6": {
        "solid": 1256.58,
        "glass": 1451.46,
        "inserts": 1544.4
      },
      "8.8": {
        "solid": 1256.58,
        "glass": 1451.46,
        "inserts": 1544.4
      },
      "8.10": {
        "solid": 1256.58,
        "glass": 1451.46,
        "inserts": 1544.4
      },
      "9": {
        "solid": 1086.79,
        "glass": 1281.67,
        "inserts": 1374.61
      },
      "9.2": {
        "solid": 1413.46,
        "glass": 1608.33,
        "inserts": 1701.28
      },
      "9.4": {
        "solid": 1413.46,
        "glass": 1608.33,
        "inserts": 1701.28
      },
      "9.6": {
        "solid": 1413.46,
        "glass": 1608.33,
        "inserts": 1701.28
      },
      "9.8": {
        "solid": 1413.46,
        "glass": 1608.33,
        "inserts": 1701.28
      },
      "9.10": {
        "solid": 1413.46,
        "glass": 1608.33,
        "inserts": 1701.28
      },
      "10": {
        "solid": 1223.23,
        "glass": 1466.81,
        "inserts": 1582.98
      },
      "10.2": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "10.4": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "10.6": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "10.8": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "10.10": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "11": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "11.2": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "11.4": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "11.6": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "11.8": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "11.10": {
        "solid": 1710.26,
        "glass": 1953.84,
        "inserts": 2070.02
      },
      "12": {
        "solid": 1479.56,
        "glass": 1771.86,
        "inserts": 1911.26
      },
      "12.2": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "12.4": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "12.6": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "12.8": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "12.10": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "13": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "13.2": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "13.4": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "13.6": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "13.8": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "13.10": {
        "solid": 1937.82,
        "glass": 2230.12,
        "inserts": 2369.53
      },
      "14": {
        "solid": 1677.44,
        "glass": 2018.47,
        "inserts": 2181.12
      },
      "14.2": {
        "solid": 2039.53,
        "glass": 2380.56,
        "inserts": 2543.21
      },
      "14.4": {
        "solid": 2039.53,
        "glass": 2380.56,
        "inserts": 2543.21
      },
      "14.6": {
        "solid": 2039.53,
        "glass": 2380.56,
        "inserts": 2543.21
      },
      "14.8": {
        "solid": 2039.53,
        "glass": 2380.56,
        "inserts": 2543.21
      },
      "14.10": {
        "solid": 2039.53,
        "glass": 2380.56,
        "inserts": 2543.21
      },
      "15": {
        "solid": 1765.88,
        "glass": 2106.91,
        "inserts": 2269.56
      },
      "15.2": {
        "solid": 2065.39,
        "glass": 2406.42,
        "inserts": 2569.07
      },
      "15.4": {
        "solid": 2065.39,
        "glass": 2406.42,
        "inserts": 2569.07
      },
      "15.6": {
        "solid": 1788.37,
        "glass": 2129.4,
        "inserts": 2292.05
      },
      "15.8": {
        "solid": 1788.37,
        "glass": 2129.4,
        "inserts": 2292.05
      },
      "15.10": {
        "solid": 2094.68,
        "glass": 2435.72,
        "inserts": 2598.37
      },
      "16": {
        "solid": 1813.84,
        "glass": 2203.6,
        "inserts": 2389.47
      },
      "16.2": {
        "solid": 2392.93,
        "glass": 2782.68,
        "inserts": 2968.56
      },
      "16.4": {
        "solid": 2392.93,
        "glass": 2782.68,
        "inserts": 2968.56
      },
      "16.6": {
        "solid": 2392.93,
        "glass": 2782.68,
        "inserts": 2968.56
      },
      "16.8": {
        "solid": 2392.93,
        "glass": 2782.68,
        "inserts": 2968.56
      },
      "16.10": {
        "solid": 2392.93,
        "glass": 2782.68,
        "inserts": 2968.56
      },
      "17": {
        "solid": 2073.18,
        "glass": 2462.93,
        "inserts": 2648.81
      },
      "17.2": {
        "solid": 2499.81,
        "glass": 2889.56,
        "inserts": 3075.44
      },
      "17.4": {
        "solid": 2499.81,
        "glass": 2889.56,
        "inserts": 3075.44
      },
      "17.6": {
        "solid": 2499.81,
        "glass": 2889.56,
        "inserts": 3075.44
      },
      "17.8": {
        "solid": 2499.81,
        "glass": 2889.56,
        "inserts": 3075.44
      },
      "17.10": {
        "solid": 2499.81,
        "glass": 2889.56,
        "inserts": 3075.44
      },
      "18": {
        "solid": 2166.12,
        "glass": 2555.88,
        "inserts": 2741.75
      }
    },
    "8": {
      "6.2": {
        "solid": 1205.23,
        "glass": 1351.39,
        "inserts": 1421.11
      },
      "6.4": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "6.6": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "6.8": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "6.10": {
        "solid": 1392.77,
        "glass": 1544.19,
        "inserts": 1608.65
      },
      "7": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "7.2": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "7.4": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "7.6": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "7.8": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "7.10": {
        "solid": 1392.77,
        "glass": 1538.93,
        "inserts": 1608.65
      },
      "8": {
        "solid": 1205.23,
        "glass": 1400.11,
        "inserts": 1493.05
      },
      "8.2": {
        "solid": 1513.44,
        "glass": 1708.32,
        "inserts": 1801.26
      },
      "8.4": {
        "solid": 1513.44,
        "glass": 1708.32,
        "inserts": 1801.26
      },
      "8.6": {
        "solid": 1513.44,
        "glass": 1708.32,
        "inserts": 1801.26
      },
      "8.8": {
        "solid": 1513.44,
        "glass": 1708.32,
        "inserts": 1801.26
      },
      "8.10": {
        "solid": 1513.44,
        "glass": 1708.32,
        "inserts": 1801.26
      },
      "9": {
        "solid": 1310.16,
        "glass": 1505.04,
        "inserts": 1597.98
      },
      "9.2": {
        "solid": 1744.44,
        "glass": 1939.32,
        "inserts": 2032.26
      },
      "9.4": {
        "solid": 1744.44,
        "glass": 1939.32,
        "inserts": 2032.26
      },
      "9.6": {
        "solid": 1744.44,
        "glass": 1939.32,
        "inserts": 2032.26
      },
      "9.8": {
        "solid": 1744.44,
        "glass": 1939.32,
        "inserts": 2032.26
      },
      "9.10": {
        "solid": 1744.44,
        "glass": 1939.32,
        "inserts": 2032.26
      },
      "10": {
        "solid": 1511.04,
        "glass": 1754.61,
        "inserts": 1870.79
      },
      "10.2": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "10.4": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2404.51
      },
      "10.6": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "10.8": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "10.10": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "11": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "11.2": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "11.4": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "11.6": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "11.8": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "11.10": {
        "solid": 2041.25,
        "glass": 2284.82,
        "inserts": 2401
      },
      "12": {
        "solid": 1767.37,
        "glass": 2059.67,
        "inserts": 2199.07
      },
      "12.2": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "12.4": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "12.6": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "12.8": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "12.10": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "13": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "13.2": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "13.4": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "13.6": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "13.8": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "13.10": {
        "solid": 2341.21,
        "glass": 2633.51,
        "inserts": 2772.91
      },
      "14": {
        "solid": 2028.19,
        "glass": 2369.23,
        "inserts": 2531.88
      },
      "14.2": {
        "solid": 2498.09,
        "glass": 2839.12,
        "inserts": 3006.21
      },
      "14.4": {
        "solid": 2501.77,
        "glass": 2843.32,
        "inserts": 3006.21
      },
      "14.6": {
        "solid": 2501.77,
        "glass": 2843.32,
        "inserts": 3006.21
      },
      "14.8": {
        "solid": 2501.77,
        "glass": 2843.32,
        "inserts": 3006.21
      },
      "14.10": {
        "solid": 2501.77,
        "glass": 2843.32,
        "inserts": 3006.21
      },
      "15": {
        "solid": 2167.82,
        "glass": 2509.37,
        "inserts": 2672.26
      },
      "15.2": {
        "solid": 2548.39,
        "glass": 2889.93,
        "inserts": 3052.82
      },
      "15.4": {
        "solid": 2548.39,
        "glass": 2889.93,
        "inserts": 3052.82
      },
      "15.6": {
        "solid": 2208.35,
        "glass": 2549.89,
        "inserts": 2712.79
      },
      "15.8": {
        "solid": 2208.35,
        "glass": 2549.89,
        "inserts": 2712.79
      },
      "15.10": {
        "solid": 2598.44,
        "glass": 2939.98,
        "inserts": 3102.88
      },
      "16": {
        "solid": 2251.88,
        "glass": 2642.19,
        "inserts": 2828.35
      },
      "16.2": {
        "solid": 2841.88,
        "glass": 3232.19,
        "inserts": 3418.35
      },
      "16.4": {
        "solid": 2841.88,
        "glass": 3232.19,
        "inserts": 3418.35
      },
      "16.6": {
        "solid": 2841.88,
        "glass": 3232.19,
        "inserts": 3418.35
      },
      "16.8": {
        "solid": 2841.88,
        "glass": 3232.19,
        "inserts": 3418.35
      },
      "16.10": {
        "solid": 2841.88,
        "glass": 3232.19,
        "inserts": 3418.35
      },
      "17": {
        "solid": 2463.56,
        "glass": 2853.88,
        "inserts": 3040.04
      },
      "17.2": {
        "solid": 3052.53,
        "glass": 3442.84,
        "inserts": 3629.0
      },
      "17.4": {
        "solid": 3052.53,
        "glass": 3442.84,
        "inserts": 3629.0
      },
      "17.6": {
        "solid": 3052.53,
        "glass": 3442.84,
        "inserts": 3629.0
      },
      "17.8": {
        "solid": 3052.53,
        "glass": 3442.84,
        "inserts": 3629.0
      },
      "17.10": {
        "solid": 3052.53,
        "glass": 3442.84,
        "inserts": 3629.0
      },
      "18": {
        "solid": 2646.7,
        "glass": 3037.02,
        "inserts": 3223.18
      }
    },
    "9": {
      "6.2": {
        "solid": 1591.35,
        "glass": 1737.74,
        "inserts": 1807.56
      },
      "6.4": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "6.6": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "6.8": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "6.10": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "7": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "7.2": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "7.4": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "7.6": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "7.8": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "7.10": {
        "solid": 1830.04,
        "glass": 1976.42,
        "inserts": 2046.25
      },
      "8": {
        "solid": 1591.35,
        "glass": 1786.53,
        "inserts": 1879.6
      },
      "8.2": {
        "solid": 1950.88,
        "glass": 2146.05,
        "inserts": 2239.12
      },
      "8.4": {
        "solid": 1950.88,
        "glass": 2146.05,
        "inserts": 2239.12
      },
      "8.6": {
        "solid": 1950.88,
        "glass": 2146.05,
        "inserts": 2239.12
      },
      "8.8": {
        "solid": 1950.88,
        "glass": 2146.05,
        "inserts": 2239.12
      },
      "8.10": {
        "solid": 1950.88,
        "glass": 2146.05,
        "inserts": 2239.12
      },
      "9": {
        "solid": 1696.42,
        "glass": 1891.6,
        "inserts": 1984.67
      },
      "9.2": {
        "solid": 2178.75,
        "glass": 2373.93,
        "inserts": 2467.0
      },
      "9.4": {
        "solid": 2178.75,
        "glass": 2373.93,
        "inserts": 2467.0
      },
      "9.6": {
        "solid": 2178.75,
        "glass": 2373.93,
        "inserts": 2467.0
      },
      "9.8": {
        "solid": 2178.75,
        "glass": 2373.93,
        "inserts": 2467.0
      },
      "9.10": {
        "solid": 2178.75,
        "glass": 2373.93,
        "inserts": 2467.0
      },
      "10": {
        "solid": 1894.6,
        "glass": 2138.54,
        "inserts": 2254.89
      },
      "10.2": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "10.4": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "10.6": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "10.8": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "10.10": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "11": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "11.2": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "11.4": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "11.6": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "11.8": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "11.10": {
        "solid": 2613.86,
        "glass": 2857.81,
        "inserts": 2974.16
      },
      "12": {
        "solid": 2272.89,
        "glass": 2565.63,
        "inserts": 2705.25
      },
      "12.2": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "12.4": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "12.6": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "12.8": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "12.10": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "13": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "13.2": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "13.4": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "13.6": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "13.8": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "13.10": {
        "solid": 2928.07,
        "glass": 3220.81,
        "inserts": 3360.42
      },
      "14": {
        "solid": 2546.14,
        "glass": 2887.68,
        "inserts": 3050.58
      },
      "14.2": {
        "solid": 3074.81,
        "glass": 3416.35,
        "inserts": 3579.25
      },
      "14.4": {
        "solid": 3074.81,
        "glass": 3416.35,
        "inserts": 3579.25
      },
      "14.6": {
        "solid": 3074.81,
        "glass": 3416.35,
        "inserts": 3579.25
      },
      "14.8": {
        "solid": 3074.81,
        "glass": 3416.35,
        "inserts": 3579.25
      },
      "14.10": {
        "solid": 3074.81,
        "glass": 3416.35,
        "inserts": 3579.25
      },
      "15": {
        "solid": 2673.74,
        "glass": 3015.28,
        "inserts": 3178.18
      },
      "15.2": {
        "solid": 3345.86,
        "glass": 3687.4,
        "inserts": 3850.3
      },
      "15.4": {
        "solid": 3345.86,
        "glass": 3687.4,
        "inserts": 3850.3
      },
      "15.6": {
        "solid": 2909.44,
        "glass": 3250.98,
        "inserts": 3413.88
      },
      "15.8": {
        "solid": 2909.44,
        "glass": 3250.98,
        "inserts": 3413.88
      },
      "15.10": {
        "solid": 3345.86,
        "glass": 3687.4,
        "inserts": 3850.3
      },
      "16": {
        "solid": 2909.44,
        "glass": 3299.75,
        "inserts": 3485.91
      },
      "16.2": {
        "solid": 3813.72,
        "glass": 4204.04,
        "inserts": 4390.19
      },
      "16.4": {
        "solid": 3813.72,
        "glass": 4204.04,
        "inserts": 4390.19
      },
      "16.6": {
        "solid": 3813.72,
        "glass": 4204.04,
        "inserts": 4390.19
      },
      "16.8": {
        "solid": 3813.72,
        "glass": 4204.04,
        "inserts": 4390.19
      },
      "16.10": {
        "solid": 3813.72,
        "glass": 4204.04,
        "inserts": 4390.19
      },
      "17": {
        "solid": 3316.28,
        "glass": 3706.6,
        "inserts": 3892.75
      },
      "17.2": {
        "solid": 4003.63,
        "glass": 4393.95,
        "inserts": 4580.11
      },
      "17.4": {
        "solid": 4003.63,
        "glass": 4393.95,
        "inserts": 4580.11
      },
      "17.6": {
        "solid": 4003.63,
        "glass": 4393.95,
        "inserts": 4580.11
      },
      "17.8": {
        "solid": 4003.63,
        "glass": 4393.95,
        "inserts": 4580.11
      },
      "17.10": {
        "solid": 4003.63,
        "glass": 4393.95,
        "inserts": 4580.11
      },
      "18": {
        "solid": 3481.42,
        "glass": 3871.74,
        "inserts": 4057.89
      }
    }
  },
  "4308": {
    "7": {
      "6.2": {
        "solid": 890.84,
        "glass": 1137.6,
        "inserts": 1194.53
      },
      "6.4": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "6.6": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "6.8": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "6.10": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "7": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "7.2": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "7.4": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "7.6": {
        "solid": 1030.04,
        "glass": 1276.8,
        "inserts": 1333.73
      },
      "7.8": {
        "solid": 1030.04,
        "glass": 1359.04,
        "inserts": 1434.96
      },
      "7.10": {
        "solid": 1030.04,
        "glass": 1359.04,
        "inserts": 1434.96
      },
      "8": {
        "solid": 890.84,
        "glass": 1219.84,
        "inserts": 1295.76
      },
      "8.2": {
        "solid": 1116.09,
        "glass": 1445.09,
        "inserts": 1521.02
      },
      "8.4": {
        "solid": 1116.09,
        "glass": 1445.09,
        "inserts": 1521.02
      },
      "8.6": {
        "solid": 1116.09,
        "inserts": 1521.02
      },
      "8.8": {
        "solid": 1116.09,
        "glass": 1445.09,
        "inserts": 1521.02
      },
      "8.10": {
        "solid": 1116.09,
        "glass": 1445.09,
        "inserts": 1521.02
      },
      "9": {
        "solid": 965.49,
        "glass": 1294.49,
        "inserts": 1370.42
      },
      "9.2": {
        "solid": 1254.0,
        "glass": 1583.0,
        "inserts": 1658.93
      },
      "9.4": {
        "solid": 1254.0,
        "glass": 1583.0,
        "inserts": 1658.93
      },
      "9.6": {
        "solid": 1254.0,
        "glass": 1583.0,
        "inserts": 1658.93
      },
      "9.8": {
        "solid": 1254.0,
        "glass": 1583.0,
        "inserts": 1658.93
      },
      "9.10": {
        "solid": 1254.0,
        "glass": 1583.0,
        "inserts": 1658.93
      },
      "10": {
        "solid": 1085.71,
        "glass": 1414.71,
        "inserts": 1490.64
      },
      "10.2": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "10.4": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "10.6": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "10.8": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "10.10": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "11": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "11.2": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "11.4": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "11.6": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "11.8": {
        "solid": 1518.47,
        "glass": 1847.47,
        "inserts": 1923.4
      },
      "11.10": {
        "solid": 1518.47,
        "glass": 2011.98,
        "inserts": 2125.87
      },
      "12": {
        "solid": 1313.47,
        "glass": 1806.98,
        "inserts": 1920.87
      },
      "12.2": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "12.4": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "12.6": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "12.8": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "12.10": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "13": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "13.2": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "13.4": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "13.6": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "13.8": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "13.10": {
        "solid": 1719.67,
        "glass": 2213.18,
        "inserts": 2327.07
      },
      "14": {
        "solid": 1489.38,
        "glass": 1982.89,
        "inserts": 2096.78
      },
      "14.2": {
        "solid": 1810.78,
        "glass": 2304.29,
        "inserts": 2418.18
      },
      "14.4": {
        "solid": 1810.78,
        "glass": 2304.29,
        "inserts": 2418.18
      },
      "14.6": {
        "solid": 1810.78,
        "glass": 2304.29,
        "inserts": 2418.18
      },
      "14.8": {
        "solid": 1810.78,
        "glass": 2304.29,
        "inserts": 2418.18
      },
      "14.10": {
        "solid": 1810.78,
        "glass": 2304.29,
        "inserts": 2418.18
      },
      "15": {
        "solid": 1567.85,
        "glass": 2225.85,
        "inserts": 2377.71
      },
      "15.2": {
        "solid": 1833.58,
        "glass": 2491.58,
        "inserts": 2643.44
      },
      "15.4": {
        "solid": 1833.58,
        "glass": 2491.58,
        "inserts": 2643.44
      },
      "15.6": {
        "solid": 1588.09,
        "glass": 2246.09,
        "inserts": 2397.95
      },
      "15.8": {
        "solid": 1588.09,
        "glass": 2246.09,
        "inserts": 2397.95
      },
      "15.10": {
        "solid": 1858.87,
        "glass": 2516.87,
        "inserts": 2668.73
      },
      "16": {
        "solid": 1609.6,
        "glass": 2267.6,
        "inserts": 2419.45
      },
      "16.2": {
        "solid": 2123.33,
        "glass": 2781.33,
        "inserts": 2933.18
      },
      "16.4": {
        "solid": 2123.33,
        "glass": 2781.33,
        "inserts": 2933.18
      },
      "16.6": {
        "solid": 2123.33,
        "glass": 2781.33,
        "inserts": 2933.18
      },
      "16.8": {
        "solid": 2123.33,
        "glass": 2781.33,
        "inserts": 2933.18
      },
      "16.10": {
        "solid": 2123.33,
        "glass": 2781.33,
        "inserts": 2933.18
      },
      "17": {
        "solid": 1839.89,
        "glass": 2497.89,
        "inserts": 2649.75
      },
      "17.2": {
        "solid": 2218.24,
        "glass": 2876.24,
        "inserts": 3028.09
      },
      "17.4": {
        "solid": 2218.24,
        "glass": 2876.24,
        "inserts": 3028.09
      },
      "17.6": {
        "solid": 2218.24,
        "glass": 2876.24,
        "inserts": 3028.09
      },
      "17.8": {
        "solid": 2218.24,
        "glass": 2876.24,
        "inserts": 3028.09
      },
      "17.10": {
        "solid": 2218.24,
        "glass": 2876.24,
        "inserts": 3028.09
      },
      "18": {
        "solid": 1922.15,
        "glass": 2580.15,
        "inserts": 2732.0
      }
    },
    "8": {
      "6.2": {
        "solid": 1070.51,
        "glass": 1317.27,
        "inserts": 1374.2
      },
      "6.4": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "6.6": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "6.8": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "6.10": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "7": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "7.2": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "7.4": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "7.6": {
        "solid": 1236.31,
        "glass": 1483.07,
        "inserts": 1540.0
      },
      "7.8": {
        "solid": 1236.31,
        "glass": 1565.31,
        "inserts": 1641.24
      },
      "7.10": {
        "solid": 1236.31,
        "glass": 1565.31,
        "inserts": 1641.24
      },
      "8": {
        "solid": 1070.51,
        "glass": 1399.51,
        "inserts": 1475.44
      },
      "8.2": {
        "solid": 1342.58,
        "glass": 1671.58,
        "inserts": 1747.51
      }
    }
  },
  "4138": {
    "7": {
      "6.2": {
        "solid": 793.71,
        "glass": 1065.71,
        "inserts": 1128.49
      },
      "6.4": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "6.6": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "6.8": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "6.10": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "7": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "7.2": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "7.4": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "7.6": {
        "solid": 919.24,
        "glass": 1191.24,
        "inserts": 1254.02
      },
      "7.8": {
        "solid": 919.24,
        "glass": 1281.91,
        "inserts": 1365.62
      },
      "7.10": {
        "solid": 919.24,
        "glass": 1281.91,
        "inserts": 1365.62
      },
      "8": {
        "solid": 793.71,
        "glass": 1156.38,
        "inserts": 1240.09
      },
      "8.2": {
        "solid": 993.16,
        "glass": 1355.84,
        "inserts": 1439.55
      },
      "8.4": {
        "solid": 993.16,
        "glass": 1355.84,
        "inserts": 1439.55
      },
      "8.6": {
        "solid": 993.16,
        "glass": 1355.84,
        "inserts": 1439.55
      },
      "8.8": {
        "solid": 993.16,
        "glass": 1355.84,
        "inserts": 1439.55
      },
      "8.10": {
        "solid": 993.16,
        "glass": 1355.84,
        "inserts": 1439.55
      },
      "9": {
        "solid": 857.85,
        "glass": 1220.53,
        "inserts": 1304.24
      },
      "9.2": {
        "solid": 1125.69,
        "glass": 1488.36,
        "inserts": 1572.07
      },
      "9.4": {
        "solid": 1125.69,
        "glass": 1488.36,
        "inserts": 1572.07
      },
      "9.6": {
        "solid": 1125.69,
        "glass": 1488.36,
        "inserts": 1572.07
      },
      "9.8": {
        "solid": 1125.69,
        "glass": 1488.36,
        "inserts": 1572.07
      },
      "9.10": {
        "solid": 1125.69,
        "glass": 1488.36,
        "inserts": 1572.07
      },
      "10": {
        "solid": 973.64,
        "glass": 1336.31,
        "inserts": 1420.02
      },
      "10.2": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "10.4": {
        "solid": 1316.8,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "10.6": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "10.8": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "10.10": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "11": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "11.2": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "11.4": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "11.6": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "11.8": {
        "solid": 1316.78,
        "glass": 1679.45,
        "inserts": 1763.16
      },
      "11.10": {
        "solid": 1316.78,
        "glass": 1860.8,
        "inserts": 1986.33
      },
      "12": {
        "solid": 1138.24,
        "glass": 1682.25,
        "inserts": 1807.78
      },
      "12.2": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "12.4": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "12.6": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "12.8": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "12.10": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "13": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "13.2": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "13.4": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "13.6": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "13.8": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.53
      },
      "13.10": {
        "solid": 1546.96,
        "glass": 2090.98,
        "inserts": 2216.51
      },
      "14": {
        "solid": 1337.71,
        "glass": 1881.73,
        "inserts": 2007.25
      },
      "14.2": {
        "solid": 1622.25,
        "glass": 2166.27,
        "inserts": 2291.8
      },
      "14.4": {
        "solid": 1622.25,
        "glass": 2166.27,
        "inserts": 2291.8
      },
      "14.6": {
        "solid": 1622.25,
        "glass": 2166.27,
        "inserts": 2291.8
      },
      "14.8": {
        "solid": 1622.25,
        "glass": 2166.27,
        "inserts": 2291.8
      },
      "14.10": {
        "solid": 1622.25,
        "glass": 2166.27,
        "inserts": 2291.8
      },
      "15": {
        "solid": 1403.25,
        "glass": 2128.6,
        "inserts": 2295.98
      },
      "15.2": {
        "solid": 1639.0,
        "glass": 2364.35,
        "inserts": 2531.73
      },
      "15.4": {
        "solid": 1639.0,
        "glass": 2364.35,
        "inserts": 2531.73
      },
      "15.6": {
        "solid": 1418.62,
        "glass": 2143.96,
        "inserts": 2311.35
      },
      "15.8": {
        "solid": 1418.62,
        "glass": 2143.96,
        "inserts": 2311.35
      },
      "15.10": {
        "solid": 1650.16,
        "glass": 2375.51,
        "inserts": 2542.89
      },
      "16": {
        "solid": 1428.38,
        "glass": 2153.73,
        "inserts": 2321.11
      },
      "16.2": {
        "solid": 1904.04,
        "glass": 2629.38,
        "inserts": 2796.76
      },
      "16.4": {
        "solid": 1904.04,
        "glass": 2629.38,
        "inserts": 2796.76
      },
      "16.6": {
        "solid": 1904.04,
        "glass": 2629.38,
        "inserts": 2796.76
      },
      "16.8": {
        "solid": 1904.04,
        "glass": 2629.38,
        "inserts": 2796.76
      },
      "16.10": {
        "solid": 1904.04,
        "glass": 2629.38,
        "inserts": 2796.76
      },
      "17": {
        "solid": 1648.78,
        "glass": 2374.13,
        "inserts": 2541.51
      },
      "17.2": {
        "solid": 1991.91,
        "glass": 2717.25,
        "inserts": 2884.64
      },
      "17.4": {
        "solid": 1991.91,
        "glass": 2717.25,
        "inserts": 2884.64
      },
      "17.6": {
        "solid": 1991.91,
        "glass": 2717.25,
        "inserts": 2884.64
      },
      "17.8": {
        "solid": 1991.91,
        "glass": 2717.25,
        "inserts": 2884.64
      },
      "17.10": {
        "solid": 1991.91,
        "glass": 2717.25,
        "inserts": 2884.64
      },
      "18": {
        "solid": 1725.49,
        "glass": 2450.84,
        "inserts": 2618.22
      }
    },
    "8": {
      "6.2": {
        "solid": 959.69,
        "glass": 1231.69,
        "inserts": 1294.47
      },
      "6.4": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "6.6": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "6.8": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "6.10": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "7": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "7.2": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "7.4": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "7.6": {
        "solid": 1110.33,
        "glass": 1382.33,
        "inserts": 1445.11
      },
      "7.8": {
        "solid": 1110.33,
        "glass": 1473.0,
        "inserts": 1556.71
      },
      "7.10": {
        "solid": 1110.33,
        "glass": 1473.0,
        "inserts": 1556.71
      },
      "8": {
        "solid": 959.69,
        "glass": 1322.36,
        "inserts": 1406.07
      },
      "8.2": {
        "solid": 1209.38,
        "glass": 1572.05,
        "inserts": 1655.76
      },
      "8.4": {
        "solid": 1209.38,
        "glass": 1572.05,
        "inserts": 1655.76
      },
      "8.6": {
        "solid": 1209.38,
        "glass": 1572.05,
        "inserts": 1655.76
      },
      "8.8": {
        "solid": 1209.38,
        "glass": 1572.05,
        "inserts": 1655.76
      },
      "8.10": {
        "solid": 1209.38,
        "glass": 1572.05,
        "inserts": 1655.76
      },
      "9": {
        "solid": 1046.16,
        "glass": 1408.84,
        "inserts": 1492.55
      },
      "9.2": {
        "solid": 1390.71,
        "glass": 1753.38,
        "inserts": 1837.09
      },
      "9.4": {
        "solid": 1390.71,
        "glass": 1753.38,
        "inserts": 1837.09
      },
      "9.6": {
        "solid": 1390.71,
        "glass": 1753.38,
        "inserts": 1837.09
      },
      "9.8": {
        "solid": 1390.71,
        "glass": 1753.38,
        "inserts": 1837.09
      },
      "9.10": {
        "solid": 1390.71,
        "glass": 1753.38,
        "inserts": 1837.09
      },
      "10": {
        "solid": 1203.78,
        "glass": 1566.45,
        "inserts": 1650.16
      },
      "10.2": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "10.4": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "10.6": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "10.8": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "10.10": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "11": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "11.2": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "11.4": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "11.6": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "11.8": {
        "solid": 1625.07,
        "glass": 1987.75,
        "inserts": 2071.45
      },
      "11.10": {
        "solid": 1625.07,
        "glass": 2169.09,
        "inserts": 2294.62
      },
      "12": {
        "solid": 1406.05,
        "glass": 1950.07,
        "inserts": 2075.6
      },
      "12.2": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "12.4": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "12.6": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "12.8": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "12.10": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "13": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "13.2": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "13.4": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "13.6": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "13.8": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "13.10": {
        "solid": 1863.58,
        "glass": 2407.6,
        "inserts": 2533.13
      },
      "14": {
        "solid": 1613.91,
        "glass": 2157.93,
        "inserts": 2283.45
      },
      "14.2": {
        "solid": 1990.53,
        "glass": 2534.55,
        "inserts": 2660.07
      },
      "14.4": {
        "solid": 1990.53,
        "glass": 2534.55,
        "inserts": 2660.07
      },
      "14.6": {
        "solid": 1990.53,
        "glass": 2534.55,
        "inserts": 2660.07
      },
      "14.8": {
        "solid": 1990.53,
        "glass": 2534.55,
        "inserts": 2660.07
      },
      "14.10": {
        "solid": 1990.53,
        "glass": 2534.55,
        "inserts": 2660.07
      },
      "15": {
        "solid": 1724.09,
        "glass": 2449.44,
        "inserts": 2616.82
      },
      "15.2": {
        "solid": 2019.8,
        "glass": 2745.15,
        "inserts": 2912.53
      },
      "15.4": {
        "solid": 2019.8,
        "glass": 2745.15,
        "inserts": 2912.53
      },
      "15.6": {
        "solid": 1749.2,
        "glass": 2474.55,
        "inserts": 2641.93
      },
      "15.8": {
        "solid": 1749.2,
        "glass": 2474.55,
        "inserts": 2641.93
      },
      "15.10": {
        "solid": 2070.04,
        "glass": 2795.38,
        "inserts": 2962.76
      },
      "16": {
        "solid": 1792.44,
        "glass": 2517.78,
        "inserts": 2685.16
      },
      "16.2": {
        "solid": 2258.35,
        "glass": 2983.69,
        "inserts": 3151.07
      },
      "16.4": {
        "solid": 2258.35,
        "glass": 2983.69,
        "inserts": 3151.07
      },
      "16.6": {
        "solid": 2258.35,
        "glass": 2983.69,
        "inserts": 3151.07
      },
      "16.8": {
        "solid": 2258.35,
        "glass": 2983.69,
        "inserts": 3151.07
      },
      "16.10": {
        "solid": 2258.35,
        "glass": 2983.69,
        "inserts": 3151.07
      },
      "17": {
        "solid": 1957.04,
        "glass": 2682.38,
        "inserts": 2849.76
      },
      "17.2": {
        "solid": 2428.51,
        "glass": 3153.85,
        "inserts": 3321.24
      },
      "17.4": {
        "solid": 2428.51,
        "glass": 3153.85,
        "inserts": 3321.24
      },
      "17.6": {
        "solid": 2428.51,
        "glass": 3153.85,
        "inserts": 3321.24
      },
      "17.8": {
        "solid": 2428.51,
        "glass": 3153.85,
        "inserts": 3321.24
      },
      "17.10": {
        "solid": 2428.51,
        "glass": 3153.85,
        "inserts": 3321.24
      },
      "18": {
        "solid": 2104.91,
        "glass": 2830.25,
        "inserts": 2997.64
      }
    },
    "9": {
      "6.2": {
        "solid": 1353.05,
        "glass": 1625.05,
        "inserts": 1687.84
      },
      "6.4": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "6.6": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "6.8": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "6.10": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "7": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "7.2": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "7.4": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "7.6": {
        "solid": 1556.71,
        "glass": 1828.71,
        "inserts": 1891.49
      },
      "7.8": {
        "solid": 1556.71,
        "glass": 1919.38,
        "inserts": 2003.09
      },
      "7.10": {
        "solid": 1556.71,
        "glass": 1919.38,
        "inserts": 2003.09
      },
      "8": {
        "solid": 1353.05,
        "glass": 1715.73,
        "inserts": 1799.44
      },
      "8.2": {
        "solid": 1678.05,
        "glass": 2040.73,
        "inserts": 2124.44
      },
      "8.4": {
        "solid": 1678.05,
        "glass": 2040.73,
        "inserts": 2124.44
      },
      "8.6": {
        "solid": 1678.05,
        "glass": 2040.73,
        "inserts": 2124.44
      },
      "8.8": {
        "solid": 1678.05,
        "glass": 2040.73,
        "inserts": 2124.44
      },
      "8.10": {
        "solid": 1678.05,
        "glass": 2040.73,
        "inserts": 2124.44
      },
      "9": {
        "solid": 1459.05,
        "glass": 1821.73,
        "inserts": 1905.44
      },
      "9.2": {
        "solid": 1941.69,
        "glass": 2304.36,
        "inserts": 2388.07
      },
      "9.4": {
        "solid": 1941.69,
        "glass": 2304.36,
        "inserts": 2388.07
      },
      "9.6": {
        "solid": 1941.69,
        "glass": 2304.36,
        "inserts": 2388.07
      },
      "9.8": {
        "solid": 1941.69,
        "glass": 2304.36,
        "inserts": 2388.07
      },
      "9.10": {
        "solid": 1941.69,
        "glass": 2304.36,
        "inserts": 2388.07
      },
      "10": {
        "solid": 1687.84,
        "glass": 2050.51,
        "inserts": 2134.22
      },
      "10.2": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "10.4": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "10.6": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "10.8": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "10.10": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "11": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "11.2": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "11.4": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "11.6": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "11.8": {
        "solid": 2329.49,
        "glass": 2692.16,
        "inserts": 2775.87
      },
      "11.10": {
        "solid": 2329.49,
        "glass": 2873.51,
        "inserts": 2999.04
      },
      "12": {
        "solid": 2025.4,
        "glass": 2569.42,
        "inserts": 2694.95
      },
      "12.2": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "12.4": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "12.6": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "12.8": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "12.10": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "13": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "13.2": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "13.4": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "13.6": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "13.8": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "13.10": {
        "solid": 2608.45,
        "glass": 3152.47,
        "inserts": 3278.0
      },
      "14": {
        "solid": 2268.11,
        "glass": 2812.13,
        "inserts": 2937.65
      },
      "14.2": {
        "solid": 2738.18,
        "glass": 3282.2,
        "inserts": 3407.73
      },
      "14.4": {
        "solid": 2738.18,
        "glass": 3282.2,
        "inserts": 3407.73
      },
      "14.6": {
        "solid": 2738.18,
        "glass": 3282.2,
        "inserts": 3407.73
      },
      "14.8": {
        "solid": 2738.18,
        "glass": 3282.2,
        "inserts": 3407.73
      },
      "14.10": {
        "solid": 2738.18,
        "glass": 3282.2,
        "inserts": 3407.73
      },
      "15": {
        "solid": 2381.09,
        "glass": 3106.44,
        "inserts": 3273.82
      },
      "15.2": {
        "solid": 2888.82,
        "glass": 3614.16,
        "inserts": 3781.55
      },
      "15.4": {
        "solid": 2888.82,
        "glass": 3614.16,
        "inserts": 3781.55
      },
      "15.6": {
        "solid": 2512.2,
        "glass": 3237.55,
        "inserts": 3404.93
      },
      "15.8": {
        "solid": 2512.2,
        "glass": 3237.55,
        "inserts": 3404.93
      },
      "15.10": {
        "solid": 2888.82,
        "glass": 3614.16,
        "inserts": 3781.55
      },
      "16": {
        "solid": 2512.2,
        "glass": 3237.55,
        "inserts": 3404.93
      },
      "16.2": {
        "solid": 3322.65,
        "glass": 4048.0,
        "inserts": 4215.38
      },
      "16.4": {
        "solid": 3322.65,
        "glass": 4048.0,
        "inserts": 4215.38
      },
      "16.6": {
        "solid": 3322.65,
        "glass": 4048.0,
        "inserts": 4215.38
      },
      "16.8": {
        "solid": 3322.65,
        "glass": 4048.0,
        "inserts": 4215.38
      },
      "16.10": {
        "solid": 3322.65,
        "glass": 4048.0,
        "inserts": 4215.38
      },
      "17": {
        "solid": 2888.82,
        "glass": 3614.16,
        "inserts": 3781.55
      },
      "17.2": {
        "solid": 3487.25,
        "glass": 4212.6,
        "inserts": 4379.98
      },
      "17.4": {
        "solid": 3487.25,
        "glass": 4212.6,
        "inserts": 4379.98
      },
      "17.6": {
        "solid": 3487.25,
        "glass": 4212.6,
        "inserts": 4379.98
      },
      "17.8": {
        "solid": 3487.25,
        "glass": 4212.6,
        "inserts": 4379.98
      },
      "17.10": {
        "solid": 3487.25,
        "glass": 4212.6,
        "inserts": 4379.98
      },
      "18": {
        "solid": 3032.53,
        "glass": 3757.87,
        "inserts": 3925.25
      }
    }
  },
  "GD1LP/GD1SP": {
    "7": {
      "6": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "6.2": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "6.4": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "6.6": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "6.8": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "6.10": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "7": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "7.2": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "7.4": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "7.6": {
        "solid": 954.63,
        "glass": 1187.04,
        "inserts": 1250.42
      },
      "7.8": {
        "solid": 954.63,
        "glass": 1264.5,
        "inserts": 1349.01
      },
      "7.10": {
        "solid": 954.63,
        "glass": 1264.5,
        "inserts": 1349.01
      },
      "8": {
        "solid": 827.87,
        "glass": 1137.73,
        "inserts": 1222.25
      },
      "8.2": {
        "solid": 1029.28,
        "glass": 1339.15,
        "inserts": 1423.66
      },
      "8.4": {
        "solid": 1029.28,
        "glass": 1339.15,
        "inserts": 1423.66
      },
      "8.6": {
        "solid": 1029.28,
        "glass": 1339.15,
        "inserts": 1423.66
      },
      "8.8": {
        "solid": 1029.28,
        "glass": 1339.15,
        "inserts": 1423.66
      },
      "8.10": {
        "solid": 1029.28,
        "glass": 1339.15,
        "inserts": 1423.66
      },
      "9": {
        "solid": 892.66,
        "glass": 1202.53,
        "inserts": 1287.04
      },
      "9.2": {
        "solid": 1163.09,
        "glass": 1472.96,
        "inserts": 1557.47
      },
      "9.4": {
        "solid": 1163.09,
        "glass": 1472.96,
        "inserts": 1557.47
      },
      "9.6": {
        "solid": 1163.09,
        "glass": 1472.96,
        "inserts": 1557.47
      },
      "9.8": {
        "solid": 1163.09,
        "glass": 1472.96,
        "inserts": 1557.47
      },
      "9.10": {
        "solid": 1163.09,
        "glass": 1472.96,
        "inserts": 1557.47
      },
      "10": {
        "solid": 1009.56,
        "glass": 1319.43,
        "inserts": 1403.94
      },
      "10.2": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "10.4": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "10.6": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "10.8": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "10.10": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "11": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "11.2": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "11.4": {
        "solid": 1356.05,
        "glass": 1665.92,
        "inserts": 1750.43
      },
      "11.6": {
        "solid": 1356.05,
        "glass": 1820.86,
        "inserts": 1947.63
      },
      "11.8": {
        "solid": 1356.05,
        "glass": 1820.86,
        "inserts": 1947.63
      },
      "11.10": {
        "solid": 1356.05,
        "glass": 1820.86,
        "inserts": 1947.63
      },
      "12": {
        "solid": 1175.77,
        "glass": 1640.58,
        "inserts": 1767.34
      },
      "12.2": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "12.4": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "12.6": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "12.8": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "12.10": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "13": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "13.2": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "13.4": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "13.6": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "13.8": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "13.10": {
        "solid": 1588.45,
        "glass": 2053.27,
        "inserts": 2180.03
      },
      "14": {
        "solid": 1377.18,
        "glass": 1841.99,
        "inserts": 1968.76
      },
      "14.2": {
        "solid": 1664.51,
        "glass": 2129.32,
        "inserts": 2256.09
      },
      "14.4": {
        "solid": 1664.51,
        "glass": 2129.32,
        "inserts": 2256.09
      },
      "14.6": {
        "solid": 1664.51,
        "glass": 2129.32,
        "inserts": 2256.09
      },
      "14.8": {
        "solid": 1664.51,
        "glass": 2129.32,
        "inserts": 2256.09
      },
      "14.10": {
        "solid": 1664.51,
        "glass": 2284.25,
        "inserts": 2453.27
      },
      "15": {
        "solid": 1443.38,
        "glass": 2063.12,
        "inserts": 2232.14
      },
      "15.2": {
        "solid": 1681.42,
        "glass": 2301.15,
        "inserts": 2470.17
      },
      "15.4": {
        "solid": 1681.42,
        "glass": 2301.15,
        "inserts": 2470.17
      },
      "15.6": {
        "solid": 1458.87,
        "glass": 2078.61,
        "inserts": 2247.63
      },
      "15.8": {
        "solid": 1458.87,
        "glass": 2078.61,
        "inserts": 2247.63
      },
      "15.10": {
        "solid": 1692.68,
        "glass": 2312.42,
        "inserts": 2481.44
      },
      "16": {
        "solid": 1468.73,
        "glass": 2088.47,
        "inserts": 2257.49
      },
      "16.2": {
        "solid": 1949.03,
        "glass": 2568.77,
        "inserts": 2737.79
      },
      "16.4": {
        "solid": 1949.03,
        "glass": 2568.77,
        "inserts": 2737.79
      },
      "16.6": {
        "solid": 1949.03,
        "glass": 2568.77,
        "inserts": 2737.79
      },
      "16.8": {
        "solid": 1949.03,
        "glass": 2568.77,
        "inserts": 2737.79
      },
      "16.10": {
        "solid": 1949.03,
        "glass": 2568.77,
        "inserts": 2737.79
      },
      "17": {
        "solid": 1691.28,
        "glass": 2311.01,
        "inserts": 2480.03
      },
      "17.2": {
        "solid": 2037.77,
        "glass": 2657.5,
        "inserts": 2826.52
      },
      "17.4": {
        "solid": 2037.77,
        "glass": 2657.5,
        "inserts": 2826.52
      },
      "17.6": {
        "solid": 2037.77,
        "glass": 2657.5,
        "inserts": 2826.52
      },
      "17.8": {
        "solid": 2037.77,
        "glass": 2657.5,
        "inserts": 2826.52
      },
      "17.10": {
        "solid": 2037.77,
        "glass": 2657.5,
        "inserts": 2826.52
      },
      "18": {
        "solid": 1768.74,
        "glass": 2388.48,
        "inserts": 2557.5
      }
    },
    "8": {
      "6": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "6.2": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "6.4": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "6.6": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "6.8": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "6.10": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "7": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "7.2": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "7.4": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "7.6": {
        "solid": 1147.6,
        "glass": 1380.0,
        "inserts": 1443.38
      },
      "7.8": {
        "solid": 1147.6,
        "glass": 1457.46,
        "inserts": 1541.97
      },
      "7.10": {
        "solid": 1147.6,
        "glass": 1457.46,
        "inserts": 1541.97
      },
      "8": {
        "solid": 995.48,
        "glass": 1305.35,
        "inserts": 1389.86
      },
      "8.2": {
        "solid": 1247.6,
        "glass": 1557.47,
        "inserts": 1641.98
      },
      "8.4": {
        "solid": 1247.6,
        "glass": 1557.47,
        "inserts": 1641.98
      },
      "8.6": {
        "solid": 1247.6,
        "glass": 1557.47,
        "inserts": 1641.98
      },
      "8.8": {
        "solid": 1247.6,
        "glass": 1557.47,
        "inserts": 1641.98
      },
      "8.10": {
        "solid": 1247.6,
        "glass": 1557.47,
        "inserts": 1641.98
      },
      "9": {
        "solid": 1082.8,
        "glass": 1392.67,
        "inserts": 1477.18
      },
      "9.2": {
        "solid": 1430.7,
        "glass": 1740.57,
        "inserts": 1825.08
      },
      "9.4": {
        "solid": 1430.7,
        "glass": 1740.57,
        "inserts": 1825.08
      },
      "9.6": {
        "solid": 1430.7,
        "glass": 1740.57,
        "inserts": 1825.08
      },
      "9.8": {
        "solid": 1430.7,
        "glass": 1740.57,
        "inserts": 1825.08
      },
      "9.10": {
        "solid": 1430.7,
        "glass": 1740.57,
        "inserts": 1825.08
      },
      "10": {
        "solid": 1241.96,
        "glass": 1551.83,
        "inserts": 1636.34
      },
      "10.2": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "10.4": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "10.6": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "10.8": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "10.10": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "11": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "11.2": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "11.4": {
        "solid": 1667.33,
        "glass": 1977.2,
        "inserts": 2061.71
      },
      "11.6": {
        "solid": 1667.33,
        "glass": 2132.14,
        "inserts": 2258.91
      },
      "11.8": {
        "solid": 1667.33,
        "glass": 2132.14,
        "inserts": 2258.91
      },
      "11.10": {
        "solid": 1667.33,
        "glass": 2132.14,
        "inserts": 2258.91
      },
      "12": {
        "solid": 1446.2,
        "glass": 1911.01,
        "inserts": 2037.77
      },
      "12.2": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "12.4": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "12.6": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "12.8": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "12.10": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "13": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "13.2": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "13.4": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "13.6": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "13.8": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "13.10": {
        "solid": 1908.18,
        "glass": 2372.99,
        "inserts": 2499.76
      },
      "14": {
        "solid": 1656.06,
        "glass": 2120.87,
        "inserts": 2247.64
      },
      "14.2": {
        "solid": 2036.36,
        "glass": 2501.17,
        "inserts": 2627.93
      },
      "14.4": {
        "solid": 2036.36,
        "glass": 2501.17,
        "inserts": 2627.93
      },
      "14.6": {
        "solid": 2036.36,
        "glass": 2501.17,
        "inserts": 2627.93
      },
      "14.8": {
        "solid": 2036.36,
        "glass": 2501.17,
        "inserts": 2627.93
      },
      "14.10": {
        "solid": 2036.36,
        "glass": 2656.09,
        "inserts": 2825.11
      },
      "15": {
        "solid": 1767.33,
        "glass": 2387.07,
        "inserts": 2556.09
      },
      "15.2": {
        "solid": 2065.94,
        "glass": 2685.67,
        "inserts": 2854.69
      },
      "15.4": {
        "solid": 2065.94,
        "glass": 2685.67,
        "inserts": 2854.69
      },
      "15.6": {
        "solid": 1792.69,
        "glass": 2412.42,
        "inserts": 2581.44
      },
      "15.8": {
        "solid": 1792.69,
        "glass": 2412.42,
        "inserts": 2581.44
      },
      "15.10": {
        "solid": 2116.64,
        "glass": 2736.38,
        "inserts": 2905.4
      },
      "16": {
        "solid": 1836.35,
        "glass": 2456.09,
        "inserts": 2625.11
      },
      "16.2": {
        "solid": 2306.79,
        "glass": 2926.52,
        "inserts": 3095.55
      },
      "16.4": {
        "solid": 2306.79,
        "glass": 2926.52,
        "inserts": 3095.55
      },
      "16.6": {
        "solid": 2306.79,
        "glass": 2926.52,
        "inserts": 3095.55
      },
      "16.8": {
        "solid": 2306.79,
        "glass": 2926.52,
        "inserts": 3095.55
      },
      "16.10": {
        "solid": 2306.79,
        "glass": 2926.52,
        "inserts": 3095.55
      },
      "17": {
        "solid": 2002.55,
        "glass": 2622.29,
        "inserts": 2791.31
      },
      "17.2": {
        "solid": 2478.62,
        "glass": 3098.36,
        "inserts": 3267.38
      },
      "17.4": {
        "solid": 2478.62,
        "glass": 3098.36,
        "inserts": 3267.38
      },
      "17.6": {
        "solid": 2478.62,
        "glass": 3098.36,
        "inserts": 3267.38
      },
      "17.8": {
        "solid": 2478.62,
        "glass": 3098.36,
        "inserts": 3267.38
      },
      "17.10": {
        "solid": 2478.62,
        "glass": 3098.36,
        "inserts": 3267.38
      },
      "18": {
        "solid": 2151.85,
        "glass": 2771.59,
        "inserts": 2940.61
      }
    },
    "9": {
      "6": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.2": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.4": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.6": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.8": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.10": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.2": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.4": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.6": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.8": {
        "solid": 1598.31,
        "glass": 1908.18,
        "inserts": 1992.69
      },
      "7.10": {
        "solid": 1598.31,
        "glass": 1908.18,
        "inserts": 1992.69
      },
      "8": {
        "solid": 1392.67,
        "glass": 1702.54,
        "inserts": 1787.05
      },
      "8.2": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.4": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.6": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.8": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.10": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "9": {
        "solid": 1499.72,
        "glass": 1809.59,
        "inserts": 1894.1
      },
      "9.2": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.4": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.6": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.8": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.10": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "10": {
        "solid": 1730.71,
        "glass": 2040.58,
        "inserts": 2125.09
      },
      "10.2": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.4": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.6": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.8": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.10": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11.2": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11.4": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11.6": {
        "solid": 2378.62,
        "glass": 2843.43,
        "inserts": 2970.2
      },
      "11.8": {
        "solid": 2378.62,
        "glass": 2843.43,
        "inserts": 2970.2
      },
      "11.10": {
        "solid": 2378.62,
        "glass": 2843.43,
        "inserts": 2970.2
      },
      "12": {
        "solid": 2071.57,
        "glass": 2536.38,
        "inserts": 2663.15
      },
      "12.2": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.4": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.6": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.8": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.10": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.2": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.4": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.6": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.8": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.10": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "14": {
        "solid": 2316.65,
        "glass": 2781.46,
        "inserts": 2908.22
      },
      "14.2": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.4": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.6": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.8": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.10": {
        "solid": 2791.31,
        "glass": 3411.05,
        "inserts": 3580.07
      },
      "15": {
        "solid": 2430.74,
        "glass": 3050.47,
        "inserts": 3219.49
      },
      "15.2": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "15.4": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "15.6": {
        "solid": 2563.13,
        "glass": 3182.87,
        "inserts": 3351.89
      },
      "15.8": {
        "solid": 2563.13,
        "glass": 3182.87,
        "inserts": 3351.89
      },
      "15.10": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "16": {
        "solid": 2563.13,
        "glass": 3182.87,
        "inserts": 3351.89
      },
      "16.2": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.4": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.6": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.8": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.10": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "17": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "17.2": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.4": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.6": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.8": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.10": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "18": {
        "solid": 3088.5,
        "glass": 3708.24,
        "inserts": 3877.26
      }
    },
    "10": {
      "6": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.2": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.4": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.6": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.8": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "6.10": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.2": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.4": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.6": {
        "solid": 1598.31,
        "glass": 1830.72,
        "inserts": 1894.1
      },
      "7.8": {
        "solid": 1598.31,
        "glass": 1908.18,
        "inserts": 1992.69
      },
      "7.10": {
        "solid": 1598.31,
        "glass": 1908.18,
        "inserts": 1992.69
      },
      "8": {
        "solid": 1392.67,
        "glass": 1702.54,
        "inserts": 1787.05
      },
      "8.2": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.4": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.6": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.8": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "8.10": {
        "solid": 1720.85,
        "glass": 2030.72,
        "inserts": 2115.23
      },
      "9": {
        "solid": 1499.72,
        "glass": 1809.59,
        "inserts": 1894.1
      },
      "9.2": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.4": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.6": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.8": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "9.10": {
        "solid": 1987.06,
        "glass": 2296.93,
        "inserts": 2381.44
      },
      "10": {
        "solid": 1730.71,
        "glass": 2040.58,
        "inserts": 2125.09
      },
      "10.2": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.4": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.6": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.8": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "10.10": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11.2": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11.4": {
        "solid": 2378.62,
        "glass": 2688.49,
        "inserts": 2773.0
      },
      "11.6": {
        "solid": 2378.62,
        "glass": 2843.43,
        "inserts": 2970.2
      },
      "11.8": {
        "solid": 2378.62,
        "glass": 2843.43,
        "inserts": 2970.2
      },
      "11.10": {
        "solid": 2378.62,
        "glass": 2843.43,
        "inserts": 2970.2
      },
      "12": {
        "solid": 2071.57,
        "glass": 2536.38,
        "inserts": 2663.15
      },
      "12.2": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.4": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.6": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.8": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "12.10": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.2": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.4": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.6": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.8": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "13.10": {
        "solid": 2660.32,
        "glass": 3125.13,
        "inserts": 3251.9
      },
      "14": {
        "solid": 2316.65,
        "glass": 2781.46,
        "inserts": 2908.22
      },
      "14.2": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.4": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.6": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.8": {
        "solid": 2791.31,
        "glass": 3256.12,
        "inserts": 3382.89
      },
      "14.10": {
        "solid": 2791.31,
        "glass": 3411.05,
        "inserts": 3580.07
      },
      "15": {
        "solid": 2430.74,
        "glass": 3050.47,
        "inserts": 3219.49
      },
      "15.2": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "15.4": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "15.6": {
        "solid": 2563.13,
        "glass": 3182.87,
        "inserts": 3351.89
      },
      "15.8": {
        "solid": 2563.13,
        "glass": 3182.87,
        "inserts": 3351.89
      },
      "15.10": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "16": {
        "solid": 2563.13,
        "glass": 3182.87,
        "inserts": 3351.89
      },
      "16.2": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.4": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.6": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.8": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "16.10": {
        "solid": 3381.47,
        "glass": 4001.21,
        "inserts": 4170.23
      },
      "17": {
        "solid": 2943.43,
        "glass": 3563.16,
        "inserts": 3732.19
      },
      "17.2": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.4": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.6": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.8": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "17.10": {
        "solid": 3547.67,
        "glass": 4167.41,
        "inserts": 4336.43
      },
      "18": {
        "solid": 3088.5,
        "glass": 3708.24,
        "inserts": 3877.26
      }
    }
  },
  "BD1EU/BD1NU": {
    "7": {
      "6": {
        "solid": 1082.13
      },
      "6.2": {
        "solid": 1082.13
      },
      "6.4": {
        "solid": 1082.13
      },
      "6.6": {
        "solid": 1082.13
      },
      "6.8": {
        "solid": 1082.13
      },
      "6.10": {
        "solid": 1082.13
      },
      "7": {
        "solid": 1082.13
      },
      "7.2": {
        "solid": 1082.13
      },
      "7.4": {
        "solid": 1082.13
      },
      "7.6": {
        "solid": 1082.13
      },
      "7.8": {
        "solid": 1082.13,
        "glass": 1434.6,
        "inserts": 1530.72
      },
      "7.10": {
        "solid": 1082.13,
        "glass": 1434.6,
        "inserts": 1530.72
      },
      "8": {
        "solid": 937.93,
        "glass": 1290.41,
        "inserts": 1386.53
      },
      "8.2": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.4": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.6": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.8": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.10": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "9": {
        "solid": 1011.63,
        "glass": 1364.11,
        "inserts": 1460.23
      },
      "9.2": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.4": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.6": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.8": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.10": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "10": {
        "solid": 1144.61,
        "glass": 1497.08,
        "inserts": 1593.21
      },
      "10.2": {
        "solid": 1538.74
      },
      "10.4": {
        "solid": 1538.74
      },
      "10.6": {
        "solid": 1538.74
      },
      "10.8": {
        "solid": 1538.74
      },
      "10.10": {
        "solid": 1538.74
      },
      "11": {
        "solid": 1538.74
      },
      "11.2": {
        "solid": 1538.74
      },
      "11.4": {
        "solid": 1538.74
      },
      "11.6": {
        "solid": 1538.74,
        "glass": 2067.44,
        "inserts": 2211.63
      },
      "11.8": {
        "solid": 1538.74,
        "glass": 2067.44,
        "inserts": 2211.63
      },
      "11.10": {
        "solid": 1538.74,
        "glass": 2067.44,
        "inserts": 2211.63
      },
      "12": {
        "solid": 1333.66,
        "glass": 1862.36,
        "inserts": 2006.56
      },
      "12.2": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.4": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.6": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.8": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.10": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.2": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.4": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.6": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.8": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.10": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "14": {
        "solid": 1562.77,
        "glass": 2091.47,
        "inserts": 2235.66
      },
      "14.2": {
        "solid": 1889.61,
        "glass": 2418.31,
        "inserts": 2562.5
      },
      "14.4": {
        "solid": 1889.61,
        "glass": 2418.31,
        "inserts": 2562.5
      },
      "14.6": {
        "solid": 1889.61,
        "glass": 2418.31,
        "inserts": 2562.5
      },
      "14.8": {
        "solid": 1889.61
      },
      "14.10": {
        "solid": 1889.61,
        "glass": 2594.55,
        "inserts": 2786.8
      },
      "15": {
        "solid": 1638.07,
        "glass": 2343.02,
        "inserts": 2535.26
      },
      "15.2": {
        "solid": 1908.83,
        "glass": 2613.78,
        "inserts": 2806.02
      },
      "15.4": {
        "solid": 1908.83,
        "glass": 2613.78,
        "inserts": 2806.02
      },
      "15.6": {
        "solid": 1655.69,
        "glass": 2360.64,
        "inserts": 2552.89
      },
      "15.8": {
        "solid": 1655.69,
        "glass": 2360.64,
        "inserts": 2552.89
      },
      "15.10": {
        "solid": 1921.65,
        "glass": 2626.6,
        "inserts": 2818.84
      },
      "16": {
        "solid": 1666.91,
        "glass": 2371.86,
        "inserts": 2564.1
      },
      "16.2": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.4": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.6": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.8": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.10": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "17": {
        "solid": 1920.05,
        "glass": 2624.99,
        "inserts": 2817.24
      },
      "17.2": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.4": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.6": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.8": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.10": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "18": {
        "solid": 2008.16,
        "glass": 2713.11,
        "inserts": 2905.36
      }
    },
    "8": {
      "6": {
        "solid": 1301.62
      },
      "6.2": {
        "solid": 1301.62
      },
      "6.4": {
        "solid": 1301.62
      },
      "6.6": {
        "solid": 1301.62
      },
      "6.8": {
        "solid": 1301.62
      },
      "6.10": {
        "solid": 1301.62
      },
      "7": {
        "solid": 1301.62
      },
      "7.2": {
        "solid": 1301.62
      },
      "7.4": {
        "solid": 1301.62
      },
      "7.6": {
        "solid": 1301.62
      },
      "7.8": {
        "solid": 1301.62,
        "glass": 1654.09,
        "inserts": 1750.22
      },
      "7.10": {
        "solid": 1301.62,
        "glass": 1654.09,
        "inserts": 1750.22
      },
      "8": {
        "solid": 1128.59,
        "glass": 1481.06,
        "inserts": 1577.19
      },
      "8.2": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.4": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.6": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.8": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.10": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "9": {
        "solid": 1227.92,
        "glass": 1580.4,
        "inserts": 1676.52
      },
      "9.2": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.4": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.6": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.8": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.10": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "10": {
        "solid": 1408.96,
        "glass": 1761.44,
        "inserts": 1857.56
      },
      "10.2": {
        "solid": 1892.81
      },
      "10.4": {
        "solid": 1892.81
      },
      "10.6": {
        "solid": 1892.81
      },
      "10.8": {
        "solid": 1892.81
      },
      "10.10": {
        "solid": 1892.81
      },
      "11": {
        "solid": 1892.81
      },
      "11.2": {
        "solid": 1892.81
      },
      "11.4": {
        "solid": 1892.81
      },
      "11.6": {
        "solid": 1892.81,
        "glass": 2421.51,
        "inserts": 2565.7
      },
      "11.8": {
        "solid": 1892.81,
        "glass": 2421.51,
        "inserts": 2565.7
      },
      "11.10": {
        "solid": 1892.81,
        "glass": 2421.51,
        "inserts": 2565.7
      },
      "12": {
        "solid": 1641.27,
        "glass": 2169.98,
        "inserts": 2314.17
      },
      "12.2": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.4": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.6": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.8": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.10": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.2": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.4": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.6": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.8": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.10": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "14": {
        "solid": 1879.99,
        "glass": 2408.69,
        "inserts": 2552.89
      },
      "14.2": {
        "solid": 2312.57,
        "glass": 2841.27,
        "inserts": 2985.47
      },
      "14.4": {
        "solid": 2312.57,
        "glass": 2841.27,
        "inserts": 2985.47
      },
      "14.6": {
        "solid": 2312.57,
        "glass": 2841.27,
        "inserts": 2985.47
      },
      "14.8": {
        "solid": 2312.57
      },
      "14.10": {
        "solid": 2312.57,
        "glass": 3017.52,
        "inserts": 3209.76
      },
      "15": {
        "solid": 2006.56,
        "glass": 2711.51,
        "inserts": 2903.75
      },
      "15.2": {
        "solid": 2346.22,
        "glass": 3051.16,
        "inserts": 3243.41
      },
      "15.4": {
        "solid": 2346.22,
        "glass": 3051.16,
        "inserts": 3243.41
      },
      "15.6": {
        "solid": 2035.4,
        "glass": 2740.35,
        "inserts": 2932.59
      },
      "15.8": {
        "solid": 2035.4,
        "glass": 2740.35,
        "inserts": 2932.59
      },
      "15.10": {
        "solid": 2403.89,
        "glass": 3108.84,
        "inserts": 3301.09
      },
      "16": {
        "solid": 2085.07,
        "glass": 2790.01,
        "inserts": 2982.26
      },
      "16.2": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.4": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.6": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.8": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.10": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "17": {
        "solid": 2274.12,
        "glass": 2979.07,
        "inserts": 3171.31
      },
      "17.2": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.4": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.6": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.8": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.10": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "18": {
        "solid": 2443.95,
        "glass": 3148.89,
        "inserts": 3341.14
      }
    },
    "9": {
      "6": {
        "solid": 1814.31
      },
      "6.2": {
        "solid": 1814.31
      },
      "6.4": {
        "solid": 1814.31
      },
      "6.6": {
        "solid": 1814.31
      },
      "6.8": {
        "solid": 1814.31
      },
      "6.10": {
        "solid": 1814.31
      },
      "7": {
        "solid": 1814.31
      },
      "7.2": {
        "solid": 1814.31
      },
      "7.4": {
        "solid": 1814.31
      },
      "7.6": {
        "solid": 1814.31
      },
      "7.8": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "7.10": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "8": {
        "solid": 1580.39,
        "glass": 1932.87,
        "inserts": 2028.99
      },
      "8.2": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.4": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.6": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.8": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.10": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "9": {
        "solid": 1702.16,
        "glass": 2054.63,
        "inserts": 2150.75
      },
      "9.2": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.4": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.6": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.8": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.10": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "10": {
        "solid": 1964.91,
        "glass": 2317.38,
        "inserts": 2413.5
      },
      "10.2": {
        "solid": 2701.89
      },
      "10.4": {
        "solid": 2701.89
      },
      "10.6": {
        "solid": 2701.89
      },
      "10.8": {
        "solid": 2701.89
      },
      "10.10": {
        "solid": 2701.89
      },
      "11": {
        "solid": 2701.89
      },
      "11.2": {
        "solid": 2701.89
      },
      "11.4": {
        "solid": 2701.89
      },
      "11.6": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.8": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.10": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "12": {
        "solid": 2352.62,
        "glass": 2881.33,
        "inserts": 3025.52
      },
      "12.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "14": {
        "solid": 2631.4,
        "glass": 3160.1,
        "inserts": 3304.29
      },
      "14.2": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.4": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.6": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.8": {
        "solid": 3171.32
      },
      "14.10": {
        "solid": 3171.32,
        "glass": 3876.27,
        "inserts": 4068.51
      },
      "15": {
        "solid": 2761.17,
        "glass": 3466.12,
        "inserts": 3658.36
      },
      "15.2": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.4": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.6": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.8": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.10": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "16": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "16.2": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.4": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.6": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.8": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.10": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "17": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "17.2": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.4": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.6": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.8": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.10": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "18": {
        "solid": 3509.37,
        "glass": 4214.32,
        "inserts": 4406.56
      }
    },
    "10": {
      "6": {
        "solid": 1814.31
      },
      "6.2": {
        "solid": 1814.31
      },
      "6.4": {
        "solid": 1814.31
      },
      "6.6": {
        "solid": 1814.31
      },
      "6.8": {
        "solid": 1814.31
      },
      "6.10": {
        "solid": 1814.31
      },
      "7": {
        "solid": 1814.31
      },
      "7.2": {
        "solid": 1814.31
      },
      "7.4": {
        "solid": 1814.31
      },
      "7.6": {
        "solid": 1814.31
      },
      "7.8": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "7.10": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "8": {
        "solid": 1580.39,
        "glass": 1932.87,
        "inserts": 2028.99
      },
      "8.2": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.4": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.6": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.8": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.10": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "9": {
        "solid": 1702.16,
        "glass": 2054.63,
        "inserts": 2150.75
      },
      "9.2": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.4": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.6": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.8": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.10": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "10": {
        "solid": 1964.91,
        "glass": 2317.38,
        "inserts": 2413.5
      },
      "10.2": {
        "solid": 2701.89
      },
      "10.4": {
        "solid": 2701.89
      },
      "10.6": {
        "solid": 2701.89
      },
      "10.8": {
        "solid": 2701.89
      },
      "10.10": {
        "solid": 2701.89
      },
      "11": {
        "solid": 2701.89
      },
      "11.2": {
        "solid": 2701.89
      },
      "11.4": {
        "solid": 2701.89
      },
      "11.6": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.8": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.10": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "12": {
        "solid": 2352.62,
        "glass": 2881.33,
        "inserts": 3025.52
      },
      "12.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "14": {
        "solid": 2631.4,
        "glass": 3160.1,
        "inserts": 3304.29
      },
      "14.2": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.4": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.6": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.8": {
        "solid": 3171.32
      },
      "14.10": {
        "solid": 3171.32,
        "glass": 3876.27,
        "inserts": 4068.51
      },
      "15": {
        "solid": 2761.17,
        "glass": 3466.12,
        "inserts": 3658.36
      },
      "15.2": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.4": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.6": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.8": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.10": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "16": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "16.2": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.4": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.6": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.8": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.10": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "17": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "17.2": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.4": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.6": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.8": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.10": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "18": {
        "solid": 3509.37,
        "glass": 4214.32,
        "inserts": 4406.56
      }
    }
  },
  "BD2EU/BD2NU": {
    "7": {
      "6": {
        "solid": 1338.99
      },
      "6.2": {
        "solid": 1338.99
      },
      "6.4": {
        "solid": 1338.99
      },
      "6.6": {
        "solid": 1338.99
      },
      "6.8": {
        "solid": 1338.99
      },
      "6.10": {
        "solid": 1338.99
      },
      "7": {
        "solid": 1338.99
      },
      "7.2": {
        "solid": 1338.99
      },
      "7.4": {
        "solid": 1338.99
      },
      "7.6": {
        "solid": 1338.99
      },
      "7.8": {
        "solid": 1338.99,
        "glass": 1693.09,
        "inserts": 1789.67
      },
      "7.10": {
        "solid": 1338.99,
        "glass": 1693.09,
        "inserts": 1789.67
      },
      "8": {
        "solid": 1161.95,
        "glass": 1516.04,
        "inserts": 1612.62
      },
      "8.2": {
        "solid": 1448.44,
        "glass": 1802.54,
        "inserts": 1899.11
      },
      "8.4": {
        "solid": 1448.44,
        "glass": 1802.54,
        "inserts": 1899.11
      },
      "8.6": {
        "solid": 1448.44,
        "glass": 1802.54,
        "inserts": 1899.11
      },
      "8.8": {
        "solid": 1448.44,
        "glass": 1802.54,
        "inserts": 1899.11
      },
      "8.10": {
        "solid": 1448.44,
        "glass": 1802.54,
        "inserts": 1899.11
      },
      "9": {
        "solid": 1256.91,
        "glass": 1611.0,
        "inserts": 1707.58
      },
      "9.2": {
        "solid": 1623.88,
        "glass": 1977.97,
        "inserts": 2074.55
      },
      "9.4": {
        "solid": 1623.88,
        "glass": 1977.97,
        "inserts": 2074.55
      },
      "9.6": {
        "solid": 1623.88,
        "glass": 1977.97,
        "inserts": 2074.55
      },
      "9.8": {
        "solid": 1623.88,
        "glass": 1977.97,
        "inserts": 2074.55
      },
      "9.10": {
        "solid": 1623.88,
        "glass": 1977.97,
        "inserts": 2074.55
      },
      "10": {
        "solid": 1409.81,
        "glass": 1763.91,
        "inserts": 1860.49
      },
      "10.2": {
        "solid": 1960.27
      },
      "10.4": {
        "solid": 1960.27
      },
      "10.6": {
        "solid": 1960.27
      },
      "10.8": {
        "solid": 1960.27
      },
      "10.10": {
        "solid": 1960.27
      },
      "11": {
        "solid": 1960.27
      },
      "11.2": {
        "solid": 1960.27
      },
      "11.4": {
        "solid": 1960.27
      },
      "11.6": {
        "solid": 1960.27,
        "glass": 2491.4,
        "inserts": 2636.27
      },
      "11.8": {
        "solid": 1960.27,
        "glass": 2491.4,
        "inserts": 2636.27
      },
      "11.10": {
        "solid": 1960.27,
        "glass": 2491.4,
        "inserts": 2636.27
      },
      "12": {
        "solid": 1699.53,
        "glass": 2230.66,
        "inserts": 2375.53
      },
      "12.2": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "12.4": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "12.6": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "12.8": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "12.10": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "13": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "13.2": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "13.4": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "13.6": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "13.8": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "13.10": {
        "solid": 2216.18,
        "glass": 2747.32,
        "inserts": 2892.18
      },
      "14": {
        "solid": 1923.25,
        "glass": 2454.38,
        "inserts": 2599.25
      },
      "14.2": {
        "solid": 2332.07,
        "glass": 2863.2,
        "inserts": 3008.07
      },
      "14.4": {
        "solid": 2332.07,
        "glass": 2863.2,
        "inserts": 3008.07
      },
      "14.6": {
        "solid": 2332.07,
        "glass": 2863.2,
        "inserts": 3008.07
      },
      "14.8": {
        "solid": 2332.07
      },
      "14.10": {
        "solid": 2332.07,
        "glass": 3040.26,
        "inserts": 3233.39
      },
      "15": {
        "solid": 2023.04,
        "glass": 2731.23,
        "inserts": 2924.37
      },
      "15.2": {
        "solid": 2361.04,
        "glass": 3069.23,
        "inserts": 3262.36
      },
      "15.4": {
        "solid": 2361.04,
        "glass": 3069.23,
        "inserts": 3262.36
      },
      "15.6": {
        "solid": 2048.79,
        "glass": 2756.98,
        "inserts": 2950.12
      },
      "15.8": {
        "solid": 2048.79,
        "glass": 2756.98,
        "inserts": 2950.12
      },
      "15.10": {
        "solid": 2393.23,
        "glass": 3101.42,
        "inserts": 3294.55
      },
      "16": {
        "solid": 2076.15,
        "glass": 2784.34,
        "inserts": 2977.48
      },
      "16.2": {
        "solid": 2729.62,
        "glass": 3437.81,
        "inserts": 3630.94
      },
      "16.4": {
        "solid": 2729.62,
        "glass": 3437.81,
        "inserts": 3630.94
      },
      "16.6": {
        "solid": 2729.62,
        "glass": 3437.81,
        "inserts": 3630.94
      },
      "16.8": {
        "solid": 2729.62,
        "glass": 3437.81,
        "inserts": 3630.94
      },
      "16.10": {
        "solid": 2729.62,
        "glass": 3437.81,
        "inserts": 3630.94
      },
      "17": {
        "solid": 2369.08,
        "glass": 3077.28,
        "inserts": 3270.41
      },
      "17.2": {
        "solid": 2850.33,
        "glass": 3558.52,
        "inserts": 3751.66
      },
      "17.4": {
        "solid": 2850.33,
        "glass": 3558.52,
        "inserts": 3751.66
      },
      "17.6": {
        "solid": 2850.33,
        "glass": 3558.52,
        "inserts": 3751.66
      },
      "17.8": {
        "solid": 2850.33,
        "glass": 3558.52,
        "inserts": 3751.66
      },
      "17.10": {
        "solid": 2850.33,
        "glass": 3558.52,
        "inserts": 3751.66
      },
      "18": {
        "solid": 2473.7,
        "glass": 3181.9,
        "inserts": 3375.03
      },
      "18.2": {
        "solid": 3024.16,
        "glass": 3732.35,
        "inserts": 3925.49
      },
      "18.4": {
        "solid": 3024.16,
        "glass": 3732.35,
        "inserts": 3925.49
      },
      "18.6": {
        "solid": 3024.16,
        "glass": 3732.35,
        "inserts": 3925.49
      },
      "18.8": {
        "solid": 3024.16,
        "glass": 3732.35,
        "inserts": 3925.49
      },
      "18.10": {
        "solid": 3024.16,
        "glass": 3732.35,
        "inserts": 3925.49
      },
      "19": {
        "solid": 2625.0,
        "glass": 3333.19,
        "inserts": 3526.32
      },
      "19.2": {
        "solid": 3206.03,
        "glass": 4091.26,
        "inserts": 4332.69
      },
      "19.4": {
        "solid": 3206.03,
        "glass": 4091.26,
        "inserts": 4332.69
      },
      "19.6": {
        "solid": 3206.03,
        "glass": 4091.26,
        "inserts": 4332.69
      },
      "19.8": {
        "solid": 3206.03,
        "glass": 4091.26,
        "inserts": 4332.69
      },
      "19.10": {
        "solid": 3206.03,
        "glass": 4091.26,
        "inserts": 4332.69
      },
      "20": {
        "solid": 2782.73,
        "glass": 3667.96,
        "inserts": 3909.38
      }
    },
    "8": {
      "6": {
        "solid": 1601.34
      },
      "6.2": {
        "solid": 1601.34
      },
      "6.4": {
        "solid": 1601.34
      },
      "6.6": {
        "solid": 1601.34
      },
      "6.8": {
        "solid": 1601.34
      },
      "6.10": {
        "solid": 1601.34
      },
      "7": {
        "solid": 1601.34
      },
      "7.2": {
        "solid": 1601.34
      },
      "7.4": {
        "solid": 1601.34
      },
      "7.6": {
        "solid": 1601.34
      },
      "7.8": {
        "solid": 1601.34,
        "glass": 1955.44,
        "inserts": 2052.02
      },
      "7.10": {
        "solid": 1601.34,
        "glass": 1955.44,
        "inserts": 2052.02
      },
      "8": {
        "solid": 1390.5,
        "glass": 1744.59,
        "inserts": 1841.17
      },
      "8.2": {
        "solid": 1736.54,
        "glass": 2090.64,
        "inserts": 2187.22
      },
      "8.4": {
        "solid": 1736.54,
        "glass": 2090.64,
        "inserts": 2187.22
      },
      "8.6": {
        "solid": 1736.54,
        "glass": 2090.64,
        "inserts": 2187.22
      },
      "8.8": {
        "solid": 1736.54,
        "glass": 2090.64,
        "inserts": 2187.22
      },
      "8.10": {
        "solid": 1736.54,
        "glass": 2090.64,
        "inserts": 2187.22
      },
      "9": {
        "solid": 1507.99,
        "glass": 1862.09,
        "inserts": 1958.67
      },
      "9.2": {
        "solid": 1998.9,
        "glass": 2352.99,
        "inserts": 2449.57
      },
      "9.4": {
        "solid": 1998.9,
        "glass": 2352.99,
        "inserts": 2449.57
      },
      "9.6": {
        "solid": 1998.9,
        "glass": 2352.99,
        "inserts": 2449.57
      },
      "9.8": {
        "solid": 1998.9,
        "glass": 2352.99,
        "inserts": 2449.57
      },
      "9.10": {
        "solid": 1998.9,
        "glass": 2352.99,
        "inserts": 2449.57
      },
      "10": {
        "solid": 1734.93,
        "glass": 2089.03,
        "inserts": 2185.61
      },
      "10.2": {
        "solid": 2333.68
      },
      "10.4": {
        "solid": 2333.68
      },
      "10.6": {
        "solid": 2333.68
      },
      "10.8": {
        "solid": 2333.68
      },
      "10.10": {
        "solid": 2333.68
      },
      "11": {
        "solid": 2333.68
      },
      "11.2": {
        "solid": 2333.68
      },
      "11.4": {
        "solid": 2333.68
      },
      "11.6": {
        "solid": 2333.68,
        "glass": 2864.81,
        "inserts": 3009.68
      },
      "11.8": {
        "solid": 2333.68,
        "glass": 2864.81,
        "inserts": 3009.68
      },
      "11.10": {
        "solid": 2333.68,
        "glass": 2864.81,
        "inserts": 3009.68
      },
      "12": {
        "solid": 2024.65,
        "glass": 2555.78,
        "inserts": 2700.65
      },
      "12.2": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "12.4": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "12.6": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "12.8": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "12.10": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "13": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "13.2": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "13.4": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "13.6": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "13.8": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "13.10": {
        "solid": 2671.67,
        "glass": 3202.81,
        "inserts": 3347.67
      },
      "14": {
        "solid": 2319.19,
        "glass": 2850.32,
        "inserts": 2995.19
      },
      "14.2": {
        "solid": 2848.72,
        "glass": 3379.86,
        "inserts": 3524.72
      },
      "14.4": {
        "solid": 2848.72,
        "glass": 3379.86,
        "inserts": 3524.72
      },
      "14.6": {
        "solid": 2848.72,
        "glass": 3379.86,
        "inserts": 3524.72
      },
      "14.8": {
        "solid": 2848.72
      },
      "14.10": {
        "solid": 2848.72,
        "glass": 3556.91,
        "inserts": 3750.05
      },
      "15": {
        "solid": 2472.09,
        "glass": 3180.29,
        "inserts": 3373.42
      },
      "15.2": {
        "solid": 2901.84,
        "glass": 3610.03,
        "inserts": 3803.16
      },
      "15.4": {
        "solid": 2901.84,
        "glass": 3610.03,
        "inserts": 3803.16
      },
      "15.6": {
        "solid": 2518.77,
        "glass": 3226.96,
        "inserts": 3420.1
      },
      "15.8": {
        "solid": 2518.77,
        "glass": 3226.96,
        "inserts": 3420.1
      },
      "15.10": {
        "solid": 2956.56,
        "glass": 3664.75,
        "inserts": 3857.89
      },
      "16": {
        "solid": 2567.06,
        "glass": 3275.25,
        "inserts": 3468.38
      },
      "16.2": {
        "solid": 3231.79,
        "glass": 3939.98,
        "inserts": 4133.11
      },
      "16.4": {
        "solid": 3231.79,
        "glass": 3939.98,
        "inserts": 4133.11
      },
      "16.6": {
        "solid": 3231.79,
        "glass": 3939.98,
        "inserts": 4133.11
      },
      "16.8": {
        "solid": 3231.79,
        "glass": 3939.98,
        "inserts": 4133.11
      },
      "16.10": {
        "solid": 3231.79,
        "glass": 3939.98,
        "inserts": 4133.11
      },
      "17": {
        "solid": 2805.26,
        "glass": 3513.46,
        "inserts": 3706.59
      },
      "17.2": {
        "solid": 3468.39,
        "glass": 4176.58,
        "inserts": 4369.71
      },
      "17.4": {
        "solid": 3468.39,
        "glass": 4176.58,
        "inserts": 4369.71
      },
      "17.6": {
        "solid": 3468.39,
        "glass": 4176.58,
        "inserts": 4369.71
      },
      "17.8": {
        "solid": 3468.39,
        "glass": 4176.58,
        "inserts": 4369.71
      },
      "17.10": {
        "solid": 3468.39,
        "glass": 4176.58,
        "inserts": 4369.71
      },
      "18": {
        "solid": 3011.28,
        "glass": 3719.47,
        "inserts": 3912.61
      },
      "18.2": {
        "solid": 3679.23,
        "glass": 4387.42,
        "inserts": 4580.56
      },
      "18.4": {
        "solid": 3679.23,
        "glass": 4387.42,
        "inserts": 4580.56
      },
      "18.6": {
        "solid": 3679.23,
        "glass": 4387.42,
        "inserts": 4580.56
      },
      "18.8": {
        "solid": 3679.23,
        "glass": 4387.42,
        "inserts": 4580.56
      },
      "18.10": {
        "solid": 3679.23,
        "glass": 4387.42,
        "inserts": 4580.56
      },
      "19": {
        "solid": 3194.77,
        "glass": 3902.96,
        "inserts": 4096.09
      },
      "19.2": {
        "solid": 3901.35,
        "glass": 4786.58,
        "inserts": 5028.0
      },
      "19.4": {
        "solid": 3901.35,
        "glass": 4786.58,
        "inserts": 5028.0
      },
      "19.6": {
        "solid": 3901.35,
        "glass": 4786.58,
        "inserts": 5028.0
      },
      "19.8": {
        "solid": 3901.35,
        "glass": 4786.58,
        "inserts": 5028.0
      },
      "19.10": {
        "solid": 3901.35,
        "glass": 4786.58,
        "inserts": 5028.0
      },
      "20": {
        "solid": 3387.91,
        "glass": 4273.14,
        "inserts": 4514.56
      }
    },
    "9": {
      "6": {
        "solid": 2140.53
      },
      "6.2": {
        "solid": 2140.53
      },
      "6.4": {
        "solid": 2140.53
      },
      "6.6": {
        "solid": 2140.53
      },
      "6.8": {
        "solid": 2140.53
      },
      "6.10": {
        "solid": 2140.53
      },
      "7": {
        "solid": 2140.53
      },
      "7.2": {
        "solid": 2140.53
      },
      "7.4": {
        "solid": 2140.53
      },
      "7.6": {
        "solid": 2140.53
      },
      "7.8": {
        "solid": 2140.53,
        "glass": 2494.63,
        "inserts": 2591.21
      },
      "7.10": {
        "solid": 2140.53,
        "glass": 2494.63,
        "inserts": 2591.21
      },
      "8": {
        "solid": 1865.31,
        "glass": 2219.4,
        "inserts": 2315.98
      },
      "8.2": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.4": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.6": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.8": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.10": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "9": {
        "solid": 1981.19,
        "glass": 2335.29,
        "inserts": 2431.86
      },
      "9.2": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.4": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.6": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.8": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.10": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "10": {
        "solid": 2171.11,
        "glass": 2525.21,
        "inserts": 2621.79
      },
      "10.2": {
        "solid": 2985.53
      },
      "10.4": {
        "solid": 2985.53
      },
      "10.6": {
        "solid": 2985.53
      },
      "10.8": {
        "solid": 2985.53
      },
      "10.10": {
        "solid": 2985.53
      },
      "11": {
        "solid": 2985.53
      },
      "11.2": {
        "solid": 2985.53
      },
      "11.4": {
        "solid": 2985.53
      },
      "11.6": {
        "solid": 2985.53,
        "glass": 3516.66,
        "inserts": 3661.53
      },
      "11.8": {
        "solid": 2985.53,
        "glass": 3516.66,
        "inserts": 3661.53
      },
      "11.10": {
        "solid": 2985.53,
        "glass": 3516.66,
        "inserts": 3661.53
      },
      "12": {
        "solid": 2599.25,
        "glass": 3130.38,
        "inserts": 3275.25
      },
      "12.2": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.4": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.6": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.8": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.10": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.2": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.4": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.6": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.8": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.10": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "14": {
        "solid": 2908.27,
        "glass": 3439.41,
        "inserts": 3584.27
      },
      "14.2": {
        "solid": 3505.4,
        "glass": 4036.54,
        "inserts": 4181.4
      },
      "14.4": {
        "solid": 3505.4,
        "glass": 4036.54,
        "inserts": 4181.4
      },
      "14.6": {
        "solid": 3505.4,
        "glass": 4036.54,
        "inserts": 4181.4
      },
      "14.8": {
        "solid": 3505.4
      },
      "14.10": {
        "solid": 3505.4,
        "glass": 4213.6,
        "inserts": 4406.73
      },
      "15": {
        "solid": 3051.52,
        "glass": 3759.71,
        "inserts": 3952.85
      },
      "15.2": {
        "solid": 3902.96,
        "glass": 4611.15,
        "inserts": 4804.28
      },
      "15.4": {
        "solid": 3902.96,
        "glass": 4611.15,
        "inserts": 4804.28
      },
      "15.6": {
        "solid": 3397.57,
        "glass": 4105.76,
        "inserts": 4298.89
      },
      "15.8": {
        "solid": 3397.57,
        "glass": 4105.76,
        "inserts": 4298.89
      },
      "15.10": {
        "solid": 3902.96,
        "glass": 4611.15,
        "inserts": 4804.28
      },
      "16": {
        "solid": 3397.57,
        "glass": 4105.76,
        "inserts": 4298.89
      },
      "16.2": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.4": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.6": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.8": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.10": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "17": {
        "solid": 3867.55,
        "glass": 4575.74,
        "inserts": 4768.87
      },
      "17.2": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.4": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.6": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.8": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.10": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "18": {
        "solid": 4059.08,
        "glass": 4767.27,
        "inserts": 4960.41
      },
      "18.2": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.4": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.6": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.8": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.10": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "19": {
        "solid": 4300.51,
        "glass": 5008.7,
        "inserts": 5201.83
      },
      "19.2": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.4": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.6": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.8": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.10": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "20": {
        "solid": 4556.42,
        "glass": 5441.65,
        "inserts": 5683.07
      }
    },
    "10": {
      "6": {
        "solid": 2140.53
      },
      "6.2": {
        "solid": 2140.53
      },
      "6.4": {
        "solid": 2140.53
      },
      "6.6": {
        "solid": 2140.53
      },
      "6.8": {
        "solid": 2140.53
      },
      "6.10": {
        "solid": 2140.53
      },
      "7": {
        "solid": 2140.53
      },
      "7.2": {
        "solid": 2140.53
      },
      "7.4": {
        "solid": 2140.53
      },
      "7.6": {
        "solid": 2140.53
      },
      "7.8": {
        "solid": 2140.53,
        "glass": 2494.63,
        "inserts": 2591.21
      },
      "7.10": {
        "solid": 2140.53,
        "glass": 2494.63,
        "inserts": 2591.21
      },
      "8": {
        "solid": 1865.31,
        "glass": 2219.4,
        "inserts": 2315.98
      },
      "8.2": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.4": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.6": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.8": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "8.10": {
        "solid": 2274.12,
        "glass": 2628.22,
        "inserts": 2724.8
      },
      "9": {
        "solid": 1981.19,
        "glass": 2335.29,
        "inserts": 2431.86
      },
      "9.2": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.4": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.6": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.8": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "9.10": {
        "solid": 2493.02,
        "glass": 2847.11,
        "inserts": 2943.69
      },
      "10": {
        "solid": 2171.11,
        "glass": 2525.21,
        "inserts": 2621.79
      },
      "10.2": {
        "solid": 2985.53
      },
      "10.4": {
        "solid": 2985.53
      },
      "10.6": {
        "solid": 2985.53
      },
      "10.8": {
        "solid": 2985.53
      },
      "10.10": {
        "solid": 2985.53
      },
      "11": {
        "solid": 2985.53
      },
      "11.2": {
        "solid": 2985.53
      },
      "11.4": {
        "solid": 2985.53
      },
      "11.6": {
        "solid": 2985.53,
        "glass": 3516.66,
        "inserts": 3661.53
      },
      "11.8": {
        "solid": 2985.53,
        "glass": 3516.66,
        "inserts": 3661.53
      },
      "11.10": {
        "solid": 2985.53,
        "glass": 3516.66,
        "inserts": 3661.53
      },
      "12": {
        "solid": 2599.25,
        "glass": 3130.38,
        "inserts": 3275.25
      },
      "12.2": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.4": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.6": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.8": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "12.10": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.2": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.4": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.6": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.8": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "13.10": {
        "solid": 3339.62,
        "glass": 3870.76,
        "inserts": 4015.62
      },
      "14": {
        "solid": 2908.27,
        "glass": 3439.41,
        "inserts": 3584.27
      },
      "14.2": {
        "solid": 3505.4,
        "glass": 4036.54,
        "inserts": 4181.4
      },
      "14.4": {
        "solid": 3505.4,
        "glass": 4036.54,
        "inserts": 4181.4
      },
      "14.6": {
        "solid": 3505.4,
        "glass": 4036.54,
        "inserts": 4181.4
      },
      "14.8": {
        "solid": 3505.4
      },
      "14.10": {
        "solid": 3505.4,
        "glass": 4213.6,
        "inserts": 4406.73
      },
      "15": {
        "solid": 3051.52,
        "glass": 3759.71,
        "inserts": 3952.85
      },
      "15.2": {
        "solid": 3902.96,
        "glass": 4611.15,
        "inserts": 4804.28
      },
      "15.4": {
        "solid": 3902.96,
        "glass": 4611.15,
        "inserts": 4804.28
      },
      "15.6": {
        "solid": 3397.57,
        "glass": 4105.76,
        "inserts": 4298.89
      },
      "15.8": {
        "solid": 3397.57,
        "glass": 4105.76,
        "inserts": 4298.89
      },
      "15.10": {
        "solid": 3902.96,
        "glass": 4611.15,
        "inserts": 4804.28
      },
      "16": {
        "solid": 3397.57,
        "glass": 4105.76,
        "inserts": 4298.89
      },
      "16.2": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.4": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.6": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.8": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "16.10": {
        "solid": 4443.75,
        "glass": 5151.95,
        "inserts": 5345.08
      },
      "17": {
        "solid": 3867.55,
        "glass": 4575.74,
        "inserts": 4768.87
      },
      "17.2": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.4": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.6": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.8": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "17.10": {
        "solid": 4664.26,
        "glass": 5372.45,
        "inserts": 5565.58
      },
      "18": {
        "solid": 4059.08,
        "glass": 4767.27,
        "inserts": 4960.41
      },
      "18.2": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.4": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.6": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.8": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "18.10": {
        "solid": 4941.09,
        "glass": 5649.29,
        "inserts": 5842.42
      },
      "19": {
        "solid": 4300.51,
        "glass": 5008.7,
        "inserts": 5201.83
      },
      "19.2": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.4": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.6": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.8": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "19.10": {
        "solid": 5235.64,
        "glass": 6120.87,
        "inserts": 6362.29
      },
      "20": {
        "solid": 4556.42,
        "glass": 5441.65,
        "inserts": 5683.07
      }
    }
  },
  "BD1CU": {
    "7": {
      "7.8": {
        "solid": 2040.58,
        "glass": 2447.39,
        "inserts": 2558.34
      },
      "7.10": {
        "solid": 2040.58,
        "glass": 2447.39,
        "inserts": 2558.34
      },
      "8": {
        "solid": 1874.15,
        "glass": 2280.97,
        "inserts": 2391.92
      },
      "8.2": {
        "solid": 2138.58,
        "glass": 2545.4,
        "inserts": 2656.35
      },
      "8.4": {
        "solid": 2138.58,
        "glass": 2545.4,
        "inserts": 2656.35
      },
      "8.6": {
        "solid": 2138.58,
        "glass": 2545.4,
        "inserts": 2656.35
      },
      "8.8": {
        "solid": 2138.58,
        "glass": 2545.4,
        "inserts": 2656.35
      },
      "8.10": {
        "solid": 2138.58,
        "glass": 2545.4,
        "inserts": 2656.35
      },
      "9": {
        "solid": 1959.21,
        "glass": 2366.03,
        "inserts": 2476.98
      },
      "9.2": {
        "solid": 2314.25,
        "glass": 2721.07,
        "inserts": 2832.02
      },
      "9.4": {
        "solid": 2314.25,
        "glass": 2721.07,
        "inserts": 2832.02
      },
      "9.6": {
        "solid": 2314.25,
        "glass": 2721.07,
        "inserts": 2832.02
      },
      "9.8": {
        "solid": 2314.25,
        "glass": 2721.07,
        "inserts": 2832.02
      },
      "9.10": {
        "solid": 2314.25,
        "glass": 2721.07,
        "inserts": 2832.02
      },
      "10": {
        "solid": 2112.69,
        "glass": 2519.51,
        "inserts": 2630.46
      },
      "10.2": {
        "solid": 3296.15
      },
      "10.4": {
        "solid": 3296.15
      },
      "10.6": {
        "solid": 3296.15
      },
      "10.8": {
        "solid": 3296.15
      },
      "10.10": {
        "solid": 3296.15
      },
      "11": {
        "solid": 3296.15
      },
      "11.2": {
        "solid": 3296.15
      },
      "11.4": {
        "solid": 3296.15
      },
      "11.6": {
        "solid": 3296.15,
        "glass": 3906.37,
        "inserts": 4072.8
      },
      "11.8": {
        "solid": 3296.15,
        "glass": 3906.37,
        "inserts": 4072.8
      },
      "11.10": {
        "solid": 3296.15,
        "glass": 3906.37,
        "inserts": 4072.8
      },
      "12": {
        "solid": 3114.93,
        "glass": 3725.15,
        "inserts": 3891.58
      },
      "12.2": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "12.4": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "12.6": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "12.8": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "12.10": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "13": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "13.2": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "13.4": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "13.6": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "13.8": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "13.10": {
        "solid": 3601.26,
        "glass": 4211.48,
        "inserts": 4377.91
      },
      "14": {
        "solid": 3323.89,
        "glass": 3934.1,
        "inserts": 4100.54
      },
      "14.2": {
        "solid": 3701.12,
        "glass": 4311.33,
        "inserts": 4477.77
      },
      "14.4": {
        "solid": 3701.12,
        "glass": 4311.33,
        "inserts": 4477.77
      },
      "14.6": {
        "solid": 3701.12,
        "glass": 4311.33,
        "inserts": 4477.77
      },
      "14.8": {
        "solid": 3701.12
      },
      "14.10": {
        "solid": 3701.12,
        "glass": 4514.75,
        "inserts": 4736.65
      },
      "15": {
        "solid": 3410.8,
        "glass": 4224.43,
        "inserts": 4446.33
      },
      "15.2": {
        "solid": 3723.31,
        "glass": 4536.94,
        "inserts": 4758.84
      },
      "15.4": {
        "solid": 3723.31,
        "glass": 4536.94,
        "inserts": 4758.84
      },
      "15.6": {
        "solid": 3431.14,
        "glass": 4244.77,
        "inserts": 4466.67
      },
      "15.8": {
        "solid": 3431.14,
        "glass": 4244.77,
        "inserts": 4466.67
      },
      "15.10": {
        "solid": 3738.1,
        "glass": 4551.73,
        "inserts": 4773.63
      },
      "16": {
        "solid": 3444.08,
        "glass": 4257.72,
        "inserts": 4479.62
      },
      "16.2": {
        "solid": 4074.64,
        "glass": 4888.28,
        "inserts": 5110.18
      },
      "16.4": {
        "solid": 4074.64,
        "glass": 4888.28,
        "inserts": 5110.18
      },
      "16.6": {
        "solid": 4074.64,
        "glass": 4888.28,
        "inserts": 5110.18
      },
      "16.8": {
        "solid": 4074.64,
        "glass": 4888.28,
        "inserts": 5110.18
      },
      "16.10": {
        "solid": 4074.64,
        "glass": 4888.28,
        "inserts": 5110.18
      },
      "17": {
        "solid": 3736.25,
        "glass": 4549.88,
        "inserts": 4771.78
      },
      "17.2": {
        "solid": 4191.14,
        "glass": 5004.77,
        "inserts": 5226.67
      },
      "17.4": {
        "solid": 4191.14,
        "glass": 5004.77,
        "inserts": 5226.67
      },
      "17.6": {
        "solid": 4191.14,
        "glass": 5004.77,
        "inserts": 5226.67
      },
      "17.8": {
        "solid": 4191.14,
        "glass": 5004.77,
        "inserts": 5226.67
      },
      "17.10": {
        "solid": 4191.14,
        "glass": 5004.77,
        "inserts": 5226.67
      },
      "18": {
        "solid": 3837.95,
        "glass": 4651.59,
        "inserts": 4873.49
      }
    },
    "8": {
      "7.8": {
        "solid": 2301.31,
        "glass": 2708.12,
        "inserts": 2819.07
      },
      "7.10": {
        "solid": 2301.31,
        "glass": 2708.12,
        "inserts": 2819.07
      },
      "8": {
        "solid": 2101.6,
        "glass": 2508.41,
        "inserts": 2619.36
      },
      "8.2": {
        "solid": 2432.6,
        "glass": 2839.41,
        "inserts": 2950.36
      },
      "8.4": {
        "solid": 2432.6,
        "glass": 2839.41,
        "inserts": 2950.36
      },
      "8.6": {
        "solid": 2432.6,
        "glass": 2839.41,
        "inserts": 2950.36
      },
      "8.8": {
        "solid": 2432.6,
        "glass": 2839.41,
        "inserts": 2950.36
      },
      "8.10": {
        "solid": 2432.6,
        "glass": 2839.41,
        "inserts": 2950.36
      },
      "9": {
        "solid": 2216.25,
        "glass": 2623.06,
        "inserts": 2734.01
      },
      "9.2": {
        "solid": 2672.99,
        "glass": 3079.8,
        "inserts": 3190.75
      },
      "9.4": {
        "solid": 2672.99,
        "glass": 3079.8,
        "inserts": 3190.75
      },
      "9.6": {
        "solid": 2672.99,
        "glass": 3079.8,
        "inserts": 3190.75
      },
      "9.8": {
        "solid": 2672.99,
        "glass": 3079.8,
        "inserts": 3190.75
      },
      "9.10": {
        "solid": 2672.99,
        "glass": 3079.8,
        "inserts": 3190.75
      },
      "10": {
        "solid": 2425.2,
        "glass": 2832.02,
        "inserts": 2942.97
      },
      "10.2": {
        "solid": 3719.61
      },
      "10.4": {
        "solid": 3719.61
      },
      "10.6": {
        "solid": 3719.61
      },
      "10.8": {
        "solid": 3719.61
      },
      "10.10": {
        "solid": 3719.61
      },
      "11": {
        "solid": 3719.61
      },
      "11.2": {
        "solid": 3719.61
      },
      "11.4": {
        "solid": 3719.61
      },
      "11.6": {
        "solid": 3719.61,
        "glass": 4329.82,
        "inserts": 4496.26
      },
      "11.8": {
        "solid": 3719.61,
        "glass": 4329.82,
        "inserts": 4496.26
      },
      "11.10": {
        "solid": 3719.61,
        "glass": 4329.82,
        "inserts": 4496.26
      },
      "12": {
        "solid": 3429.29,
        "glass": 4039.51,
        "inserts": 4205.94
      },
      "12.2": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "12.4": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "12.6": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "12.8": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "12.10": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "13": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "13.2": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "13.4": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "13.6": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "13.8": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "13.10": {
        "solid": 4035.81,
        "glass": 4646.03,
        "inserts": 4812.46
      },
      "14": {
        "solid": 3704.81,
        "glass": 4315.03,
        "inserts": 4481.46
      },
      "14.2": {
        "solid": 4204.08,
        "glass": 4814.3,
        "inserts": 4980.73
      },
      "14.4": {
        "solid": 4204.08,
        "glass": 4814.3,
        "inserts": 4980.73
      },
      "14.6": {
        "solid": 4204.08,
        "glass": 4814.3,
        "inserts": 4980.73
      },
      "14.8": {
        "solid": 4204.08
      },
      "14.10": {
        "solid": 4204.08,
        "glass": 5017.72,
        "inserts": 5239.62
      },
      "15": {
        "solid": 3850.9,
        "glass": 4664.53,
        "inserts": 4886.43
      },
      "15.2": {
        "solid": 4242.92,
        "glass": 5056.55,
        "inserts": 5278.45
      },
      "15.4": {
        "solid": 4242.92,
        "glass": 5056.55,
        "inserts": 5278.45
      },
      "15.6": {
        "solid": 3884.18,
        "glass": 4697.81,
        "inserts": 4919.71
      },
      "15.8": {
        "solid": 3884.18,
        "glass": 4697.81,
        "inserts": 4919.71
      },
      "15.10": {
        "solid": 4309.49,
        "glass": 5123.12,
        "inserts": 5345.02
      },
      "16": {
        "solid": 3941.51,
        "glass": 4755.14,
        "inserts": 4977.04
      },
      "16.2": {
        "solid": 4559.12,
        "glass": 5372.76,
        "inserts": 5594.66
      },
      "16.4": {
        "solid": 4559.12,
        "glass": 5372.76,
        "inserts": 5594.66
      },
      "16.6": {
        "solid": 4559.12,
        "glass": 5372.76,
        "inserts": 5594.66
      },
      "16.8": {
        "solid": 4559.12,
        "glass": 5372.76,
        "inserts": 5594.66
      },
      "16.10": {
        "solid": 4559.12,
        "glass": 5372.76,
        "inserts": 5594.66
      },
      "17": {
        "solid": 4159.71,
        "glass": 4973.34,
        "inserts": 5195.24
      },
      "17.2": {
        "solid": 4784.72,
        "glass": 5598.35,
        "inserts": 5820.25
      },
      "17.4": {
        "solid": 4784.72,
        "glass": 5598.35,
        "inserts": 5820.25
      },
      "17.6": {
        "solid": 4784.72,
        "glass": 5598.35,
        "inserts": 5820.25
      },
      "17.8": {
        "solid": 4784.72,
        "glass": 5598.35,
        "inserts": 5820.25
      },
      "17.10": {
        "solid": 4784.72,
        "glass": 5598.35,
        "inserts": 5820.25
      },
      "18": {
        "solid": 4355.72,
        "glass": 5169.35,
        "inserts": 5391.25
      }
    }
  },
  "BD2CU": {
    "7": {
      "7.8": {
        "solid": 2447.39,
        "glass": 2854.21,
        "inserts": 2965.16
      },
      "7.10": {
        "solid": 2447.39,
        "glass": 2854.21,
        "inserts": 2965.16
      },
      "8": {
        "solid": 2123.79,
        "glass": 2530.6,
        "inserts": 2641.55
      },
      "8.2": {
        "solid": 2573.13,
        "glass": 2979.95,
        "inserts": 3090.9
      },
      "8.4": {
        "solid": 2573.13,
        "glass": 2979.95,
        "inserts": 3090.9
      },
      "8.6": {
        "solid": 2573.13,
        "glass": 2979.95,
        "inserts": 3090.9
      },
      "8.8": {
        "solid": 2573.13,
        "glass": 2979.95,
        "inserts": 3090.9
      },
      "8.10": {
        "solid": 2573.13,
        "glass": 2979.95,
        "inserts": 3090.9
      },
      "9": {
        "solid": 2232.89,
        "glass": 2639.7,
        "inserts": 2750.65
      },
      "9.2": {
        "solid": 2774.69,
        "glass": 3181.51,
        "inserts": 3292.46
      },
      "9.4": {
        "solid": 2774.69,
        "glass": 3181.51,
        "inserts": 3292.46
      },
      "9.6": {
        "solid": 2774.69,
        "glass": 3181.51,
        "inserts": 3292.46
      },
      "9.8": {
        "solid": 2774.69,
        "glass": 3181.51,
        "inserts": 3292.46
      },
      "9.10": {
        "solid": 2774.69,
        "glass": 3181.51,
        "inserts": 3292.46
      },
      "10": {
        "solid": 2408.56,
        "glass": 2815.37,
        "inserts": 2926.32
      },
      "10.2": {
        "solid": 3996.98
      },
      "10.4": {
        "solid": 3996.98
      },
      "10.6": {
        "solid": 3996.98
      },
      "10.8": {
        "solid": 3996.98
      },
      "10.10": {
        "solid": 3996.98
      },
      "11": {
        "solid": 3996.98
      },
      "11.2": {
        "solid": 3996.98
      },
      "11.4": {
        "solid": 3996.98
      },
      "11.6": {
        "solid": 3996.98,
        "glass": 4607.2,
        "inserts": 4773.63
      },
      "11.8": {
        "solid": 3996.98,
        "glass": 4607.2,
        "inserts": 4773.63
      },
      "11.10": {
        "solid": 3996.98,
        "glass": 4607.2,
        "inserts": 4773.63
      },
      "12": {
        "solid": 3469.97,
        "glass": 4080.19,
        "inserts": 4246.62
      },
      "12.2": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "12.4": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "12.6": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "12.8": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "12.10": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "13": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "13.2": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "13.4": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "13.6": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "13.8": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "13.10": {
        "solid": 4292.84,
        "glass": 4903.06,
        "inserts": 5069.49
      },
      "14": {
        "solid": 3727.0,
        "glass": 4337.22,
        "inserts": 4503.65
      },
      "14.2": {
        "solid": 4459.27,
        "glass": 5069.48,
        "inserts": 5235.92
      },
      "14.4": {
        "solid": 4459.27,
        "glass": 5069.48,
        "inserts": 5235.92
      },
      "14.6": {
        "solid": 4459.27,
        "glass": 5069.48,
        "inserts": 5235.92
      },
      "14.8": {
        "solid": 4459.27
      },
      "14.10": {
        "solid": 4459.27,
        "glass": 5272.9,
        "inserts": 5494.8
      },
      "15": {
        "solid": 3841.65,
        "glass": 4655.28,
        "inserts": 4877.18
      },
      "15.2": {
        "solid": 4494.4,
        "glass": 5308.04,
        "inserts": 5529.94
      },
      "15.4": {
        "solid": 4494.4,
        "glass": 5308.04,
        "inserts": 5529.94
      },
      "15.6": {
        "solid": 3871.24,
        "glass": 4684.87,
        "inserts": 4906.77
      },
      "15.8": {
        "solid": 3871.24,
        "glass": 4684.87,
        "inserts": 4906.77
      },
      "15.10": {
        "solid": 4494.4,
        "glass": 5308.04,
        "inserts": 5529.94
      },
      "16": {
        "solid": 3902.67,
        "glass": 4716.31,
        "inserts": 4938.21
      },
      "16.2": {
        "solid": 4882.72,
        "glass": 5696.36,
        "inserts": 5918.26
      },
      "16.4": {
        "solid": 4882.72,
        "glass": 5696.36,
        "inserts": 5918.26
      },
      "16.6": {
        "solid": 4882.72,
        "glass": 5696.36,
        "inserts": 5918.26
      },
      "16.8": {
        "solid": 4882.72,
        "glass": 5696.36,
        "inserts": 5918.26
      },
      "16.10": {
        "solid": 4882.72,
        "glass": 5696.36,
        "inserts": 5918.26
      },
      "17": {
        "solid": 4239.22,
        "glass": 5052.85,
        "inserts": 5274.75
      },
      "17.2": {
        "solid": 5019.56,
        "glass": 5833.19,
        "inserts": 6055.09
      },
      "17.4": {
        "solid": 5019.56,
        "glass": 5833.19,
        "inserts": 6055.09
      },
      "17.6": {
        "solid": 5019.56,
        "glass": 5833.19,
        "inserts": 6055.09
      },
      "17.8": {
        "solid": 5019.56,
        "glass": 5833.19,
        "inserts": 6055.09
      },
      "17.10": {
        "solid": 5019.56,
        "glass": 5833.19,
        "inserts": 6055.09
      },
      "18": {
        "solid": 4359.41,
        "glass": 5173.05,
        "inserts": 5394.95
      },
      "18.2": {
        "solid": 5221.12,
        "glass": 6034.75,
        "inserts": 6256.65
      },
      "18.4": {
        "solid": 5221.12,
        "glass": 6034.75,
        "inserts": 6256.65
      },
      "18.6": {
        "solid": 5221.12,
        "glass": 6034.75,
        "inserts": 6256.65
      },
      "18.8": {
        "solid": 5221.12,
        "glass": 6034.75,
        "inserts": 6256.65
      },
      "18.10": {
        "solid": 5221.12,
        "glass": 6034.75,
        "inserts": 6256.65
      },
      "19": {
        "solid": 4533.23,
        "glass": 5346.87,
        "inserts": 5568.77
      },
      "19.2": {
        "solid": 5428.22,
        "glass": 6445.26,
        "inserts": 6722.62
      },
      "19.4": {
        "solid": 5428.22,
        "glass": 6445.26,
        "inserts": 6722.62
      },
      "19.6": {
        "solid": 5428.22,
        "glass": 6445.26,
        "inserts": 6722.62
      },
      "19.8": {
        "solid": 5428.22,
        "glass": 6445.26,
        "inserts": 6722.62
      },
      "19.10": {
        "solid": 5428.22,
        "glass": 6445.26,
        "inserts": 6722.62
      },
      "20": {
        "solid": 4714.45,
        "glass": 5731.48,
        "inserts": 6008.85
      }
    },
    "8": {
      "7.8": {
        "solid": 2758.05,
        "glass": 3164.86,
        "inserts": 3275.81
      },
      "7.10": {
        "solid": 2758.05,
        "glass": 3164.86,
        "inserts": 3275.81
      },
      "8": {
        "solid": 2393.76,
        "glass": 2800.58,
        "inserts": 2911.53
      },
      "8.2": {
        "solid": 2913.38,
        "glass": 3320.19,
        "inserts": 3431.14
      },
      "8.4": {
        "solid": 2913.38,
        "glass": 3320.19,
        "inserts": 3431.14
      },
      "8.6": {
        "solid": 2913.38,
        "glass": 3320.19,
        "inserts": 3431.14
      },
      "8.8": {
        "solid": 2913.38,
        "glass": 3320.19,
        "inserts": 3431.14
      },
      "8.10": {
        "solid": 2913.38,
        "glass": 3320.19,
        "inserts": 3431.14
      },
      "9": {
        "solid": 2528.75,
        "glass": 2935.57,
        "inserts": 3046.52
      },
      "9.2": {
        "solid": 3212.94,
        "glass": 3619.76,
        "inserts": 3730.71
      },
      "9.4": {
        "solid": 3212.94,
        "glass": 3619.76,
        "inserts": 3730.71
      },
      "9.6": {
        "solid": 3212.94,
        "glass": 3619.76,
        "inserts": 3730.71
      },
      "9.8": {
        "solid": 3212.94,
        "glass": 3619.76,
        "inserts": 3730.71
      },
      "9.10": {
        "solid": 3212.94,
        "glass": 3619.76,
        "inserts": 3730.71
      },
      "10": {
        "solid": 2789.48,
        "glass": 3196.3,
        "inserts": 3307.25
      },
      "10.2": {
        "solid": 4444.47
      },
      "10.4": {
        "solid": 4444.47
      },
      "10.6": {
        "solid": 4444.47
      },
      "10.8": {
        "solid": 4444.47
      },
      "10.10": {
        "solid": 4444.47
      },
      "11": {
        "solid": 4444.47
      },
      "11.2": {
        "solid": 4444.47
      },
      "11.4": {
        "solid": 4444.47
      },
      "11.6": {
        "solid": 4444.47,
        "glass": 5054.69,
        "inserts": 5221.12
      },
      "11.8": {
        "solid": 4444.47,
        "glass": 5054.69,
        "inserts": 5221.12
      },
      "11.10": {
        "solid": 4444.47,
        "glass": 5054.69,
        "inserts": 5221.12
      },
      "12": {
        "solid": 3858.29,
        "glass": 4468.51,
        "inserts": 4634.94
      },
      "12.2": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "12.4": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "12.6": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "12.8": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "12.10": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "13": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "13.2": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "13.4": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "13.6": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "13.8": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "13.10": {
        "solid": 4832.8,
        "glass": 5443.01,
        "inserts": 5609.45
      },
      "14": {
        "solid": 4196.69,
        "glass": 4806.9,
        "inserts": 4973.34
      },
      "14.2": {
        "solid": 5036.2,
        "glass": 5646.42,
        "inserts": 5812.85
      },
      "14.4": {
        "solid": 5036.2,
        "glass": 5646.42,
        "inserts": 5812.85
      },
      "14.6": {
        "solid": 5036.2,
        "glass": 5646.42,
        "inserts": 5812.85
      },
      "14.8": {
        "solid": 5036.2
      },
      "14.10": {
        "solid": 5036.2,
        "glass": 5849.84,
        "inserts": 6071.74
      },
      "15": {
        "solid": 4372.36,
        "glass": 5185.99,
        "inserts": 5407.89
      },
      "15.2": {
        "solid": 5097.23,
        "glass": 5910.86,
        "inserts": 6132.76
      },
      "15.4": {
        "solid": 5097.23,
        "glass": 5910.86,
        "inserts": 6132.76
      },
      "15.6": {
        "solid": 4425.98,
        "glass": 5239.62,
        "inserts": 5461.52
      },
      "15.8": {
        "solid": 4425.98,
        "glass": 5239.62,
        "inserts": 5461.52
      },
      "15.10": {
        "solid": 5160.1,
        "glass": 5973.73,
        "inserts": 6195.63
      },
      "16": {
        "solid": 4481.46,
        "glass": 5295.09,
        "inserts": 5516.99
      },
      "16.2": {
        "solid": 5476.3,
        "glass": 6289.94,
        "inserts": 6511.84
      },
      "16.4": {
        "solid": 5476.3,
        "glass": 6289.94,
        "inserts": 6511.84
      },
      "16.6": {
        "solid": 5476.3,
        "glass": 6289.94,
        "inserts": 6511.84
      },
      "16.8": {
        "solid": 5476.3,
        "glass": 6289.94,
        "inserts": 6511.84
      },
      "16.10": {
        "solid": 5476.3,
        "glass": 6289.94,
        "inserts": 6511.84
      },
      "17": {
        "solid": 4755.13,
        "glass": 5568.77,
        "inserts": 5790.67
      },
      "17.2": {
        "solid": 5748.13,
        "glass": 6561.76,
        "inserts": 6783.66
      },
      "17.4": {
        "solid": 5748.13,
        "glass": 6561.76,
        "inserts": 6783.66
      },
      "17.6": {
        "solid": 5748.13,
        "glass": 6561.76,
        "inserts": 6783.66
      },
      "17.8": {
        "solid": 5748.13,
        "glass": 6561.76,
        "inserts": 6783.66
      },
      "17.10": {
        "solid": 5748.13,
        "glass": 6561.76,
        "inserts": 6783.66
      },
      "18": {
        "solid": 4991.82,
        "glass": 5805.46,
        "inserts": 6027.36
      },
      "18.2": {
        "solid": 5990.37,
        "glass": 6804.0,
        "inserts": 7025.9
      },
      "18.4": {
        "solid": 5990.37,
        "glass": 6804.0,
        "inserts": 7025.9
      },
      "18.6": {
        "solid": 5990.37,
        "glass": 6804.0,
        "inserts": 7025.9
      },
      "18.8": {
        "solid": 5990.37,
        "glass": 6804.0,
        "inserts": 7025.9
      },
      "18.10": {
        "solid": 5990.37,
        "glass": 6804.0,
        "inserts": 7025.9
      },
      "19": {
        "solid": 5202.63,
        "glass": 6016.26,
        "inserts": 6238.16
      },
      "19.2": {
        "solid": 6245.55,
        "glass": 7262.58,
        "inserts": 7539.95
      },
      "19.4": {
        "solid": 6245.55,
        "glass": 7262.58,
        "inserts": 7539.95
      },
      "19.6": {
        "solid": 6245.55,
        "glass": 7262.58,
        "inserts": 7539.95
      },
      "19.8": {
        "solid": 6245.55,
        "glass": 7262.58,
        "inserts": 7539.95
      },
      "19.10": {
        "solid": 6245.55,
        "glass": 7262.58,
        "inserts": 7539.95
      },
      "20": {
        "solid": 5424.53,
        "glass": 6441.56,
        "inserts": 6718.93
      }
    }
  },
  "GD2LP/GD2SP": {
    "7": {
      "6": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "6.2": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "6.4": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "6.6": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "6.8": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "6.10": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "7": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "7.2": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "7.4": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "7.6": {
        "solid": 1101.9,
        "glass": 1319.74,
        "inserts": 1379.14
      },
      "7.8": {
        "solid": 1101.9,
        "glass": 1392.34,
        "inserts": 1471.56
      },
      "7.10": {
        "solid": 1101.9,
        "glass": 1392.34,
        "inserts": 1471.56
      },
      "8": {
        "solid": 956.68,
        "glass": 1247.12,
        "inserts": 1326.34
      },
      "8.2": {
        "solid": 1191.68,
        "glass": 1482.11,
        "inserts": 1561.33
      },
      "8.4": {
        "solid": 1191.68,
        "glass": 1482.11,
        "inserts": 1561.33
      },
      "8.6": {
        "solid": 1191.68,
        "glass": 1482.11,
        "inserts": 1561.33
      },
      "8.8": {
        "solid": 1191.68,
        "glass": 1482.11,
        "inserts": 1561.33
      },
      "8.10": {
        "solid": 1191.68,
        "glass": 1482.11,
        "inserts": 1561.33
      },
      "9": {
        "solid": 1034.57,
        "glass": 1325.01,
        "inserts": 1404.23
      },
      "9.2": {
        "solid": 1335.58,
        "glass": 1626.01,
        "inserts": 1705.23
      },
      "9.4": {
        "solid": 1335.58,
        "glass": 1626.01,
        "inserts": 1705.23
      },
      "9.6": {
        "solid": 1335.58,
        "glass": 1626.01,
        "inserts": 1705.23
      },
      "9.8": {
        "solid": 1335.58,
        "glass": 1626.01,
        "inserts": 1705.23
      },
      "9.10": {
        "solid": 1335.58,
        "glass": 1626.01,
        "inserts": 1705.23
      },
      "10": {
        "solid": 1159.99,
        "glass": 1450.43,
        "inserts": 1529.65
      },
      "10.2": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "10.4": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "10.6": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "10.8": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "10.10": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "11": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "11.2": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "11.4": {
        "solid": 1611.49,
        "glass": 1901.93,
        "inserts": 1981.15
      },
      "11.6": {
        "solid": 1611.49,
        "glass": 2047.15,
        "inserts": 2165.97
      },
      "11.8": {
        "solid": 1611.49,
        "glass": 2047.15,
        "inserts": 2165.97
      },
      "11.10": {
        "solid": 1611.49,
        "glass": 2047.15,
        "inserts": 2165.97
      },
      "12": {
        "solid": 1397.62,
        "glass": 1833.28,
        "inserts": 1952.1
      },
      "12.2": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "12.4": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "12.6": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "12.8": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "12.10": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "13": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "13.2": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "13.4": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "13.6": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "13.8": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "13.10": {
        "solid": 1821.4,
        "glass": 2257.06,
        "inserts": 2375.88
      },
      "14": {
        "solid": 1581.13,
        "glass": 2016.78,
        "inserts": 2135.6
      },
      "14.2": {
        "solid": 1916.46,
        "glass": 2352.11,
        "inserts": 2470.93
      },
      "14.4": {
        "solid": 1916.46,
        "glass": 2352.11,
        "inserts": 2470.93
      },
      "14.6": {
        "solid": 1916.46,
        "glass": 2352.11,
        "inserts": 2470.93
      },
      "14.8": {
        "solid": 1916.46,
        "glass": 2352.11,
        "inserts": 2470.93
      },
      "14.10": {
        "solid": 1916.46,
        "glass": 2497.33,
        "inserts": 2655.77
      },
      "15": {
        "solid": 1662.98,
        "glass": 2243.85,
        "inserts": 2402.29
      },
      "15.2": {
        "solid": 1940.22,
        "glass": 2521.09,
        "inserts": 2679.53
      },
      "15.4": {
        "solid": 1940.22,
        "glass": 2521.09,
        "inserts": 2679.53
      },
      "15.6": {
        "solid": 1684.1,
        "glass": 2264.98,
        "inserts": 2423.41
      },
      "15.8": {
        "solid": 1684.1,
        "glass": 2264.98,
        "inserts": 2423.41
      },
      "15.10": {
        "solid": 1966.62,
        "glass": 2547.5,
        "inserts": 2705.93
      },
      "16": {
        "solid": 1706.55,
        "glass": 2287.42,
        "inserts": 2445.86
      },
      "16.2": {
        "solid": 2242.54,
        "glass": 2823.42,
        "inserts": 2981.85
      },
      "16.4": {
        "solid": 2242.54,
        "glass": 2823.42,
        "inserts": 2981.85
      },
      "16.6": {
        "solid": 2242.54,
        "glass": 2823.42,
        "inserts": 2981.85
      },
      "16.8": {
        "solid": 2242.54,
        "glass": 2823.42,
        "inserts": 2981.85
      },
      "16.10": {
        "solid": 2242.54,
        "glass": 2823.42,
        "inserts": 2981.85
      },
      "17": {
        "solid": 1946.82,
        "glass": 2527.69,
        "inserts": 2686.13
      },
      "17.2": {
        "solid": 2341.56,
        "glass": 2922.43,
        "inserts": 3080.87
      },
      "17.4": {
        "solid": 2341.56,
        "glass": 2922.43,
        "inserts": 3080.87
      },
      "17.6": {
        "solid": 2341.56,
        "glass": 2922.43,
        "inserts": 3080.87
      },
      "17.8": {
        "solid": 2341.56,
        "glass": 2922.43,
        "inserts": 3080.87
      },
      "17.10": {
        "solid": 2341.56,
        "glass": 2922.43,
        "inserts": 3080.87
      },
      "18": {
        "solid": 2032.63,
        "glass": 2613.51,
        "inserts": 2771.94
      },
      "18.2": {
        "solid": 2484.14,
        "glass": 3065.01,
        "inserts": 3223.45
      },
      "18.4": {
        "solid": 2484.14,
        "glass": 3065.01,
        "inserts": 3223.45
      },
      "18.6": {
        "solid": 2484.14,
        "glass": 3065.01,
        "inserts": 3223.45
      },
      "18.8": {
        "solid": 2484.14,
        "glass": 3065.01,
        "inserts": 3223.45
      },
      "18.10": {
        "solid": 2484.14,
        "glass": 3065.01,
        "inserts": 3223.45
      },
      "19": {
        "solid": 2156.73,
        "glass": 2737.6,
        "inserts": 2896.04
      },
      "19.2": {
        "solid": 2633.32,
        "glass": 3359.43,
        "inserts": 3557.44
      },
      "19.4": {
        "solid": 2633.32,
        "glass": 3359.43,
        "inserts": 3557.44
      },
      "19.6": {
        "solid": 2633.32,
        "glass": 3359.43,
        "inserts": 3557.44
      },
      "19.8": {
        "solid": 2633.32,
        "glass": 3359.43,
        "inserts": 3557.44
      },
      "19.10": {
        "solid": 2633.32,
        "glass": 3359.43,
        "inserts": 3557.44
      },
      "20": {
        "solid": 2286.11,
        "glass": 3012.22,
        "inserts": 3210.24
      }
    },
    "8": {
      "6": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "6.2": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "6.4": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "6.6": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "6.8": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "6.10": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "7": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "7.2": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "7.4": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "7.6": {
        "solid": 1317.09,
        "glass": 1534.93,
        "inserts": 1594.33
      },
      "7.8": {
        "solid": 1317.09,
        "glass": 1607.53,
        "inserts": 1686.75
      },
      "7.10": {
        "solid": 1317.09,
        "glass": 1607.53,
        "inserts": 1686.75
      },
      "8": {
        "solid": 1144.15,
        "glass": 1434.59,
        "inserts": 1513.8
      },
      "8.2": {
        "solid": 1427.99,
        "glass": 1718.43,
        "inserts": 1797.64
      },
      "8.4": {
        "solid": 1427.99,
        "glass": 1718.43,
        "inserts": 1797.64
      },
      "8.6": {
        "solid": 1427.99,
        "glass": 1718.43,
        "inserts": 1797.64
      },
      "8.8": {
        "solid": 1427.99,
        "glass": 1718.43,
        "inserts": 1797.64
      },
      "8.10": {
        "solid": 1427.99,
        "glass": 1718.43,
        "inserts": 1797.64
      },
      "9": {
        "solid": 1240.52,
        "glass": 1530.96,
        "inserts": 1610.18
      },
      "9.2": {
        "solid": 1643.18,
        "glass": 1933.62,
        "inserts": 2012.83
      },
      "9.4": {
        "solid": 1643.18,
        "glass": 1933.62,
        "inserts": 2012.83
      },
      "9.6": {
        "solid": 1643.18,
        "glass": 1933.62,
        "inserts": 2012.83
      },
      "9.8": {
        "solid": 1643.18,
        "glass": 1933.62,
        "inserts": 2012.83
      },
      "9.10": {
        "solid": 1643.18,
        "glass": 1933.62,
        "inserts": 2012.83
      },
      "10": {
        "solid": 1426.67,
        "glass": 1717.11,
        "inserts": 1796.32
      },
      "10.2": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "10.4": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "10.6": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "10.8": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "10.10": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "11": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "11.2": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "11.4": {
        "solid": 1917.78,
        "glass": 2208.21,
        "inserts": 2287.43
      },
      "11.6": {
        "solid": 1917.78,
        "glass": 2353.43,
        "inserts": 2472.25
      },
      "11.8": {
        "solid": 1917.78,
        "glass": 2353.43,
        "inserts": 2472.25
      },
      "11.10": {
        "solid": 1917.78,
        "glass": 2353.43,
        "inserts": 2472.25
      },
      "12": {
        "solid": 1664.3,
        "glass": 2099.96,
        "inserts": 2218.77
      },
      "12.2": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "12.4": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "12.6": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "12.8": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "12.10": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "13": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "13.2": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "13.4": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "13.6": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "13.8": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "13.10": {
        "solid": 2195.02,
        "glass": 2630.67,
        "inserts": 2749.49
      },
      "14": {
        "solid": 1905.9,
        "glass": 2341.55,
        "inserts": 2460.37
      },
      "14.2": {
        "solid": 2340.24,
        "glass": 2775.89,
        "inserts": 2894.71
      },
      "14.4": {
        "solid": 2340.24,
        "glass": 2775.89,
        "inserts": 2894.71
      },
      "14.6": {
        "solid": 2340.24,
        "glass": 2775.89,
        "inserts": 2894.71
      },
      "14.8": {
        "solid": 2340.24,
        "glass": 2775.89,
        "inserts": 2894.71
      },
      "14.10": {
        "solid": 2340.24,
        "glass": 2921.11,
        "inserts": 3079.55
      },
      "15": {
        "solid": 2031.31,
        "glass": 2612.19,
        "inserts": 2770.62
      },
      "15.2": {
        "solid": 2383.8,
        "glass": 2964.68,
        "inserts": 3123.11
      },
      "15.4": {
        "solid": 2383.8,
        "glass": 2964.68,
        "inserts": 3123.11
      },
      "15.6": {
        "solid": 2069.6,
        "glass": 2650.47,
        "inserts": 2808.91
      },
      "15.8": {
        "solid": 2069.6,
        "glass": 2650.47,
        "inserts": 2808.91
      },
      "15.10": {
        "solid": 2428.69,
        "glass": 3009.56,
        "inserts": 3168.0
      },
      "16": {
        "solid": 2109.2,
        "glass": 2690.08,
        "inserts": 2848.51
      },
      "16.2": {
        "solid": 2654.44,
        "glass": 3235.31,
        "inserts": 3393.75
      },
      "16.4": {
        "solid": 2654.44,
        "glass": 3235.31,
        "inserts": 3393.75
      },
      "16.6": {
        "solid": 2654.44,
        "glass": 3235.31,
        "inserts": 3393.75
      },
      "16.8": {
        "solid": 2654.44,
        "glass": 3235.31,
        "inserts": 3393.75
      },
      "16.10": {
        "solid": 2654.44,
        "glass": 3235.31,
        "inserts": 3393.75
      },
      "17": {
        "solid": 2304.59,
        "glass": 2885.46,
        "inserts": 3043.9
      },
      "17.2": {
        "solid": 2848.51,
        "glass": 3429.38,
        "inserts": 3587.82
      },
      "17.4": {
        "solid": 2848.51,
        "glass": 3429.38,
        "inserts": 3587.82
      },
      "17.6": {
        "solid": 2848.51,
        "glass": 3429.38,
        "inserts": 3587.82
      },
      "17.8": {
        "solid": 2848.51,
        "glass": 3429.38,
        "inserts": 3587.82
      },
      "17.10": {
        "solid": 2848.51,
        "glass": 3429.38,
        "inserts": 3587.82
      },
      "18": {
        "solid": 2473.58,
        "glass": 3054.45,
        "inserts": 3212.88
      },
      "18.2": {
        "solid": 3021.45,
        "glass": 3602.32,
        "inserts": 3760.76
      },
      "18.4": {
        "solid": 3021.45,
        "glass": 3602.32,
        "inserts": 3760.76
      },
      "18.6": {
        "solid": 3021.45,
        "glass": 3602.32,
        "inserts": 3760.76
      },
      "18.8": {
        "solid": 3021.45,
        "glass": 3602.32,
        "inserts": 3760.76
      },
      "18.10": {
        "solid": 3021.45,
        "glass": 3602.32,
        "inserts": 3760.76
      },
      "19": {
        "solid": 2624.08,
        "glass": 3204.95,
        "inserts": 3363.39
      },
      "19.2": {
        "solid": 3203.64,
        "glass": 3929.75,
        "inserts": 4127.76
      },
      "19.4": {
        "solid": 3203.64,
        "glass": 3929.75,
        "inserts": 4127.76
      },
      "19.6": {
        "solid": 3203.64,
        "glass": 3929.75,
        "inserts": 4127.76
      },
      "19.8": {
        "solid": 3203.64,
        "glass": 3929.75,
        "inserts": 4127.76
      },
      "19.10": {
        "solid": 3203.64,
        "glass": 3929.75,
        "inserts": 4127.76
      },
      "20": {
        "solid": 2782.5,
        "glass": 3508.61,
        "inserts": 3706.63
      }
    },
    "9": {
      "6": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.2": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.4": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.6": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.8": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.10": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.2": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.4": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.6": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.8": {
        "solid": 1759.36,
        "glass": 2049.79,
        "inserts": 2129.01
      },
      "7.10": {
        "solid": 1759.36,
        "glass": 2049.79,
        "inserts": 2129.01
      },
      "8": {
        "solid": 1533.6,
        "glass": 1824.04,
        "inserts": 1903.26
      },
      "8.2": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.4": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.6": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.8": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.10": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "9": {
        "solid": 1628.66,
        "glass": 1919.09,
        "inserts": 1998.31
      },
      "9.2": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.4": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.6": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.8": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.10": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "10": {
        "solid": 1784.44,
        "glass": 2074.88,
        "inserts": 2154.09
      },
      "10.2": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.4": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.6": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.8": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.10": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11.2": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11.4": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11.6": {
        "solid": 2452.45,
        "glass": 2888.11,
        "inserts": 3006.93
      },
      "11.8": {
        "solid": 2452.45,
        "glass": 2888.11,
        "inserts": 3006.93
      },
      "11.10": {
        "solid": 2452.45,
        "glass": 2888.11,
        "inserts": 3006.93
      },
      "12": {
        "solid": 2135.61,
        "glass": 2571.26,
        "inserts": 2690.08
      },
      "12.2": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.4": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.6": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.8": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.10": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.2": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.4": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.6": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.8": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.10": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "14": {
        "solid": 2389.08,
        "glass": 2824.74,
        "inserts": 2943.56
      },
      "14.2": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.4": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.6": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.8": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.10": {
        "solid": 2878.87,
        "glass": 3459.74,
        "inserts": 3618.18
      },
      "15": {
        "solid": 2506.58,
        "glass": 3087.45,
        "inserts": 3245.89
      },
      "15.2": {
        "solid": 3204.96,
        "glass": 3785.83,
        "inserts": 3944.27
      },
      "15.4": {
        "solid": 3204.96,
        "glass": 3785.83,
        "inserts": 3944.27
      },
      "15.6": {
        "solid": 2790.42,
        "glass": 3371.29,
        "inserts": 3529.73
      },
      "15.8": {
        "solid": 2790.42,
        "glass": 3371.29,
        "inserts": 3529.73
      },
      "15.10": {
        "solid": 3204.96,
        "glass": 3785.83,
        "inserts": 3944.27
      },
      "16": {
        "solid": 2790.42,
        "glass": 3371.29,
        "inserts": 3529.73
      },
      "16.2": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.4": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.6": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.8": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.10": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "17": {
        "solid": 3175.91,
        "glass": 3756.79,
        "inserts": 3915.22
      },
      "17.2": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.4": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.6": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.8": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.10": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "18": {
        "solid": 3333.02,
        "glass": 3913.89,
        "inserts": 4072.32
      },
      "18.2": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.4": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.6": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.8": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.10": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "19": {
        "solid": 3531.04,
        "glass": 4111.92,
        "inserts": 4270.35
      },
      "19.2": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.4": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.6": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.8": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.10": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "20": {
        "solid": 3740.95,
        "glass": 4467.06,
        "inserts": 4665.08
      }
    },
    "10": {
      "6": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.2": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.4": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.6": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.8": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "6.10": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.2": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.4": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.6": {
        "solid": 1759.36,
        "glass": 1977.19,
        "inserts": 2036.59
      },
      "7.8": {
        "solid": 1759.36,
        "glass": 2049.79,
        "inserts": 2129.01
      },
      "7.10": {
        "solid": 1759.36,
        "glass": 2049.79,
        "inserts": 2129.01
      },
      "8": {
        "solid": 1533.6,
        "glass": 1824.04,
        "inserts": 1903.26
      },
      "8.2": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.4": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.6": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.8": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "8.10": {
        "solid": 1868.93,
        "glass": 2159.37,
        "inserts": 2238.59
      },
      "9": {
        "solid": 1628.66,
        "glass": 1919.09,
        "inserts": 1998.31
      },
      "9.2": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.4": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.6": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.8": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "9.10": {
        "solid": 2048.48,
        "glass": 2338.91,
        "inserts": 2418.13
      },
      "10": {
        "solid": 1784.44,
        "glass": 2074.88,
        "inserts": 2154.09
      },
      "10.2": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.4": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.6": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.8": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "10.10": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11.2": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11.4": {
        "solid": 2452.45,
        "glass": 2742.89,
        "inserts": 2822.11
      },
      "11.6": {
        "solid": 2452.45,
        "glass": 2888.11,
        "inserts": 3006.93
      },
      "11.8": {
        "solid": 2452.45,
        "glass": 2888.11,
        "inserts": 3006.93
      },
      "11.10": {
        "solid": 2452.45,
        "glass": 2888.11,
        "inserts": 3006.93
      },
      "12": {
        "solid": 2135.61,
        "glass": 2571.26,
        "inserts": 2690.08
      },
      "12.2": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.4": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.6": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.8": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "12.10": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.2": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.4": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.6": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.8": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "13.10": {
        "solid": 2742.89,
        "glass": 3178.55,
        "inserts": 3297.37
      },
      "14": {
        "solid": 2389.08,
        "glass": 2824.74,
        "inserts": 2943.56
      },
      "14.2": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.4": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.6": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.8": {
        "solid": 2878.87,
        "glass": 3314.53,
        "inserts": 3433.34
      },
      "14.10": {
        "solid": 2878.87,
        "glass": 3459.74,
        "inserts": 3618.18
      },
      "15": {
        "solid": 2506.58,
        "glass": 3087.45,
        "inserts": 3245.89
      },
      "15.2": {
        "solid": 3204.96,
        "glass": 3785.83,
        "inserts": 3944.27
      },
      "15.4": {
        "solid": 3204.96,
        "glass": 3785.83,
        "inserts": 3944.27
      },
      "15.6": {
        "solid": 2790.42,
        "glass": 3371.29,
        "inserts": 3529.73
      },
      "15.8": {
        "solid": 2790.42,
        "glass": 3371.29,
        "inserts": 3529.73
      },
      "15.10": {
        "solid": 3204.96,
        "glass": 3785.83,
        "inserts": 3944.27
      },
      "16": {
        "solid": 2790.42,
        "glass": 3371.29,
        "inserts": 3529.73
      },
      "16.2": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.4": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.6": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.8": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "16.10": {
        "solid": 3648.54,
        "glass": 4229.41,
        "inserts": 4387.85
      },
      "17": {
        "solid": 3175.91,
        "glass": 3756.79,
        "inserts": 3915.22
      },
      "17.2": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.4": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.6": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.8": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "17.10": {
        "solid": 3829.41,
        "glass": 4410.28,
        "inserts": 4568.71
      },
      "18": {
        "solid": 3333.02,
        "glass": 3913.89,
        "inserts": 4072.32
      },
      "18.2": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.4": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.6": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.8": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "18.10": {
        "solid": 4056.48,
        "glass": 4637.35,
        "inserts": 4795.79
      },
      "19": {
        "solid": 3531.04,
        "glass": 4111.92,
        "inserts": 4270.35
      },
      "19.2": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.4": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.6": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.8": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "19.10": {
        "solid": 4298.07,
        "glass": 5024.18,
        "inserts": 5222.2
      },
      "20": {
        "solid": 3740.95,
        "glass": 4467.06,
        "inserts": 4665.08
      }
    }
  },
  "GD1LU/GD1SU": {
    "7": {
      "6": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "6.2": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "6.4": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "6.6": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "6.8": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "6.10": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "7": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "7.2": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "7.4": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "7.6": {
        "solid": 1082.13,
        "glass": 1346.48,
        "inserts": 1418.58
      },
      "7.8": {
        "solid": 1082.13,
        "glass": 1434.6,
        "inserts": 1530.72
      },
      "7.10": {
        "solid": 1082.13,
        "glass": 1434.6,
        "inserts": 1530.72
      },
      "8": {
        "solid": 937.93,
        "glass": 1290.41,
        "inserts": 1386.53
      },
      "8.2": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.4": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.6": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.8": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "8.10": {
        "solid": 1167.04,
        "glass": 1519.51,
        "inserts": 1615.64
      },
      "9": {
        "solid": 1011.63,
        "glass": 1364.11,
        "inserts": 1460.23
      },
      "9.2": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.4": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.6": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.8": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "9.10": {
        "solid": 1319.24,
        "glass": 1671.72,
        "inserts": 1767.84
      },
      "10": {
        "solid": 1144.61,
        "glass": 1497.08,
        "inserts": 1593.21
      },
      "10.2": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "10.4": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "10.6": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "10.8": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "10.10": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "11": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "11.2": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "11.4": {
        "solid": 1538.74,
        "glass": 1891.21,
        "inserts": 1987.33
      },
      "11.6": {
        "solid": 1538.74,
        "glass": 2067.44,
        "inserts": 2211.63
      },
      "11.8": {
        "solid": 1538.74,
        "glass": 2067.44,
        "inserts": 2211.63
      },
      "11.10": {
        "solid": 1538.74,
        "glass": 2067.44,
        "inserts": 2211.63
      },
      "12": {
        "solid": 1333.66,
        "glass": 1862.36,
        "inserts": 2006.56
      },
      "12.2": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.4": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.6": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.8": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "12.10": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.2": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.4": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.6": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.8": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "13.10": {
        "solid": 1803.09,
        "glass": 2331.79,
        "inserts": 2475.98
      },
      "14": {
        "solid": 1562.77,
        "glass": 2091.47,
        "inserts": 2235.66
      },
      "14.2": {
        "solid": 1889.61,
        "glass": 2418.31,
        "inserts": 2562.5
      },
      "14.4": {
        "solid": 1889.61,
        "glass": 2418.31,
        "inserts": 2562.5
      },
      "14.6": {
        "solid": 1889.61,
        "glass": 2418.31,
        "inserts": 2562.5
      },
      "14.8": {
        "solid": 1889.61,
        "glass": 2418.31,
        "inserts": 2562.5
      },
      "14.10": {
        "solid": 1889.61,
        "glass": 2594.55,
        "inserts": 2786.8
      },
      "15": {
        "solid": 1638.07,
        "glass": 2343.02,
        "inserts": 2535.26
      },
      "15.2": {
        "solid": 1908.83,
        "glass": 2613.78,
        "inserts": 2806.02
      },
      "15.4": {
        "solid": 1908.83,
        "glass": 2613.78,
        "inserts": 2806.02
      },
      "15.6": {
        "solid": 1655.69,
        "glass": 2360.64,
        "inserts": 2552.89
      },
      "15.8": {
        "solid": 1655.69,
        "glass": 2360.64,
        "inserts": 2552.89
      },
      "15.10": {
        "solid": 1921.65,
        "glass": 2626.6,
        "inserts": 2818.84
      },
      "16": {
        "solid": 1666.91,
        "glass": 2371.86,
        "inserts": 2564.1
      },
      "16.2": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.4": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.6": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.8": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "16.10": {
        "solid": 2213.24,
        "glass": 2918.19,
        "inserts": 3110.43
      },
      "17": {
        "solid": 1920.05,
        "glass": 2624.99,
        "inserts": 2817.24
      },
      "17.2": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.4": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.6": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.8": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "17.10": {
        "solid": 2314.17,
        "glass": 3019.12,
        "inserts": 3211.37
      },
      "18": {
        "solid": 2008.16,
        "glass": 2713.11,
        "inserts": 2905.36
      }
    },
    "8": {
      "6": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "6.2": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "6.4": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "6.6": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "6.8": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "6.10": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "7": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "7.2": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "7.4": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "7.6": {
        "solid": 1301.62,
        "glass": 1565.97,
        "inserts": 1638.08
      },
      "7.8": {
        "solid": 1301.62,
        "glass": 1654.09,
        "inserts": 1750.22
      },
      "7.10": {
        "solid": 1301.62,
        "glass": 1654.09,
        "inserts": 1750.22
      },
      "8": {
        "solid": 1128.59,
        "glass": 1481.06,
        "inserts": 1577.19
      },
      "8.2": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.4": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.6": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.8": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "8.10": {
        "solid": 1415.37,
        "glass": 1767.85,
        "inserts": 1863.97
      },
      "9": {
        "solid": 1227.92,
        "glass": 1580.4,
        "inserts": 1676.52
      },
      "9.2": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.4": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.6": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.8": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "9.10": {
        "solid": 1623.65,
        "glass": 1976.12,
        "inserts": 2072.25
      },
      "10": {
        "solid": 1408.96,
        "glass": 1761.44,
        "inserts": 1857.56
      },
      "10.2": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "10.4": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "10.6": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "10.8": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "10.10": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "11": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "11.2": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "11.4": {
        "solid": 1892.81,
        "glass": 2245.28,
        "inserts": 2341.41
      },
      "11.6": {
        "solid": 1892.81,
        "glass": 2421.51,
        "inserts": 2565.7
      },
      "11.8": {
        "solid": 1892.81,
        "glass": 2421.51,
        "inserts": 2565.7
      },
      "11.10": {
        "solid": 1892.81,
        "glass": 2421.51,
        "inserts": 2565.7
      },
      "12": {
        "solid": 1641.27,
        "glass": 2169.98,
        "inserts": 2314.17
      },
      "12.2": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.4": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.6": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.8": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "12.10": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.2": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.4": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.6": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.8": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "13.10": {
        "solid": 2166.78,
        "glass": 2695.48,
        "inserts": 2839.67
      },
      "14": {
        "solid": 1879.99,
        "glass": 2408.69,
        "inserts": 2552.89
      },
      "14.2": {
        "solid": 2312.57,
        "glass": 2841.27,
        "inserts": 2985.47
      },
      "14.4": {
        "solid": 2312.57,
        "glass": 2841.27,
        "inserts": 2985.47
      },
      "14.6": {
        "solid": 2312.57,
        "glass": 2841.27,
        "inserts": 2985.47
      },
      "14.8": {
        "solid": 2312.57,
        "glass": 2841.27,
        "inserts": 2985.47
      },
      "14.10": {
        "solid": 2312.57,
        "glass": 3017.52,
        "inserts": 3209.76
      },
      "15": {
        "solid": 2006.56,
        "glass": 2711.51,
        "inserts": 2903.75
      },
      "15.2": {
        "solid": 2346.22,
        "glass": 3051.16,
        "inserts": 3243.41
      },
      "15.4": {
        "solid": 2346.22,
        "glass": 3051.16,
        "inserts": 3243.41
      },
      "15.6": {
        "solid": 2035.4,
        "glass": 2740.35,
        "inserts": 2932.59
      },
      "15.8": {
        "solid": 2035.4,
        "glass": 2740.35,
        "inserts": 2932.59
      },
      "15.10": {
        "solid": 2403.89,
        "glass": 3108.84,
        "inserts": 3301.09
      },
      "16": {
        "solid": 2085.07,
        "glass": 2790.01,
        "inserts": 2982.26
      },
      "16.2": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.4": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.6": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.8": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "16.10": {
        "solid": 2620.18,
        "glass": 3325.13,
        "inserts": 3517.37
      },
      "17": {
        "solid": 2274.12,
        "glass": 2979.07,
        "inserts": 3171.31
      },
      "17.2": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.4": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.6": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.8": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "17.10": {
        "solid": 2815.64,
        "glass": 3520.59,
        "inserts": 3712.84
      },
      "18": {
        "solid": 2443.95,
        "glass": 3148.89,
        "inserts": 3341.14
      }
    },
    "9": {
      "6": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.2": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.4": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.6": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.8": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.10": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.2": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.4": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.6": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.8": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "7.10": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "8": {
        "solid": 1580.39,
        "glass": 1932.87,
        "inserts": 2028.99
      },
      "8.2": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.4": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.6": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.8": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.10": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "9": {
        "solid": 1702.16,
        "glass": 2054.63,
        "inserts": 2150.75
      },
      "9.2": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.4": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.6": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.8": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.10": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "10": {
        "solid": 1964.91,
        "glass": 2317.38,
        "inserts": 2413.5
      },
      "10.2": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.4": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.6": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.8": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.10": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11.2": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11.4": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11.6": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.8": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.10": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "12": {
        "solid": 2352.62,
        "glass": 2881.33,
        "inserts": 3025.52
      },
      "12.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "14": {
        "solid": 2631.4,
        "glass": 3160.1,
        "inserts": 3304.29
      },
      "14.2": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.4": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.6": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.8": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.10": {
        "solid": 3171.32,
        "glass": 3876.27,
        "inserts": 4068.51
      },
      "15": {
        "solid": 2761.17,
        "glass": 3466.12,
        "inserts": 3658.36
      },
      "15.2": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.4": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.6": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.8": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.10": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "16": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "16.2": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.4": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.6": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.8": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.10": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "17": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "17.2": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.4": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.6": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.8": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.10": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "18": {
        "solid": 3509.37,
        "glass": 4214.32,
        "inserts": 4406.56
      }
    },
    "10": {
      "6": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.2": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.4": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.6": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.8": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "6.10": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.2": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.4": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.6": {
        "solid": 1814.31,
        "glass": 2078.66,
        "inserts": 2150.76
      },
      "7.8": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "7.10": {
        "solid": 1814.31,
        "glass": 2166.78,
        "inserts": 2262.9
      },
      "8": {
        "solid": 1580.39,
        "glass": 1932.87,
        "inserts": 2028.99
      },
      "8.2": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.4": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.6": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.8": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "8.10": {
        "solid": 1953.69,
        "glass": 2306.17,
        "inserts": 2402.29
      },
      "9": {
        "solid": 1702.16,
        "glass": 2054.63,
        "inserts": 2150.75
      },
      "9.2": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.4": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.6": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.8": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "9.10": {
        "solid": 2256.5,
        "glass": 2608.97,
        "inserts": 2705.09
      },
      "10": {
        "solid": 1964.91,
        "glass": 2317.38,
        "inserts": 2413.5
      },
      "10.2": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.4": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.6": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.8": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "10.10": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11.2": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11.4": {
        "solid": 2701.89,
        "glass": 3054.36,
        "inserts": 3150.49
      },
      "11.6": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.8": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "11.10": {
        "solid": 2701.89,
        "glass": 3230.59,
        "inserts": 3374.79
      },
      "12": {
        "solid": 2352.62,
        "glass": 2881.33,
        "inserts": 3025.52
      },
      "12.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "12.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.2": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.4": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.6": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.8": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "13.10": {
        "solid": 3022.32,
        "glass": 3551.02,
        "inserts": 3695.21
      },
      "14": {
        "solid": 2631.4,
        "glass": 3160.1,
        "inserts": 3304.29
      },
      "14.2": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.4": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.6": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.8": {
        "solid": 3171.32,
        "glass": 3700.02,
        "inserts": 3844.21
      },
      "14.10": {
        "solid": 3171.32,
        "glass": 3876.27,
        "inserts": 4068.51
      },
      "15": {
        "solid": 2761.17,
        "glass": 3466.12,
        "inserts": 3658.36
      },
      "15.2": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.4": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "15.6": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.8": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "15.10": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "16": {
        "solid": 2911.77,
        "glass": 3616.72,
        "inserts": 3808.96
      },
      "16.2": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.4": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.6": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.8": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "16.10": {
        "solid": 3842.62,
        "glass": 4547.56,
        "inserts": 4739.81
      },
      "17": {
        "solid": 3344.35,
        "glass": 4049.3,
        "inserts": 4241.54
      },
      "17.2": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.4": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.6": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.8": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "17.10": {
        "solid": 4031.67,
        "glass": 4736.62,
        "inserts": 4928.86
      },
      "18": {
        "solid": 3509.37,
        "glass": 4214.32,
        "inserts": 4406.56
      }
    }
  },
  "GD2LU/GD2SU": {
    "7": {
      "6": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "6.2": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "6.4": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "6.6": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "6.8": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "6.10": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "7": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "7.2": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "7.4": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "7.6": {
        "solid": 1265.96,
        "glass": 1517.05,
        "inserts": 1585.52
      },
      "7.8": {
        "solid": 1265.96,
        "glass": 1600.74,
        "inserts": 1692.05
      },
      "7.10": {
        "solid": 1265.96,
        "glass": 1600.74,
        "inserts": 1692.05
      },
      "8": {
        "solid": 1098.57,
        "glass": 1433.35,
        "inserts": 1524.66
      },
      "8.2": {
        "solid": 1369.43,
        "glass": 1704.22,
        "inserts": 1795.53
      },
      "8.4": {
        "solid": 1369.43,
        "glass": 1704.22,
        "inserts": 1795.53
      },
      "8.6": {
        "solid": 1369.43,
        "glass": 1704.22,
        "inserts": 1795.53
      },
      "8.8": {
        "solid": 1369.43,
        "glass": 1704.22,
        "inserts": 1795.53
      },
      "8.10": {
        "solid": 1369.43,
        "glass": 1704.22,
        "inserts": 1795.53
      },
      "9": {
        "solid": 1188.35,
        "glass": 1523.13,
        "inserts": 1614.44
      },
      "9.2": {
        "solid": 1535.3,
        "glass": 1870.08,
        "inserts": 1961.39
      },
      "9.4": {
        "solid": 1535.3,
        "glass": 1870.08,
        "inserts": 1961.39
      },
      "9.6": {
        "solid": 1535.3,
        "glass": 1870.08,
        "inserts": 1961.39
      },
      "9.8": {
        "solid": 1535.3,
        "glass": 1870.08,
        "inserts": 1961.39
      },
      "9.10": {
        "solid": 1535.3,
        "glass": 1870.08,
        "inserts": 1961.39
      },
      "10": {
        "solid": 1332.91,
        "glass": 1667.7,
        "inserts": 1759.0
      },
      "10.2": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "10.4": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "10.6": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "10.8": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "10.10": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "11": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "11.2": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "11.4": {
        "solid": 1853.34,
        "glass": 2188.13,
        "inserts": 2279.43
      },
      "11.6": {
        "solid": 1853.34,
        "glass": 2355.51,
        "inserts": 2492.47
      },
      "11.8": {
        "solid": 1853.34,
        "glass": 2355.51,
        "inserts": 2492.47
      },
      "11.10": {
        "solid": 1853.34,
        "glass": 2355.51,
        "inserts": 2492.47
      },
      "12": {
        "solid": 1606.82,
        "glass": 2108.99,
        "inserts": 2245.95
      },
      "12.2": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "12.4": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "12.6": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "12.8": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "12.10": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "13": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "13.2": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "13.4": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "13.6": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "13.8": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "13.10": {
        "solid": 2095.3,
        "glass": 2597.46,
        "inserts": 2734.43
      },
      "14": {
        "solid": 1818.34,
        "glass": 2320.51,
        "inserts": 2457.47
      },
      "14.2": {
        "solid": 2204.86,
        "glass": 2707.03,
        "inserts": 2843.99
      },
      "14.4": {
        "solid": 2204.86,
        "glass": 2707.03,
        "inserts": 2843.99
      },
      "14.6": {
        "solid": 2204.86,
        "glass": 2707.03,
        "inserts": 2843.99
      },
      "14.8": {
        "solid": 2204.86,
        "glass": 2707.03,
        "inserts": 2843.99
      },
      "14.10": {
        "solid": 2204.86,
        "glass": 2874.43,
        "inserts": 3057.03
      },
      "15": {
        "solid": 1912.69,
        "glass": 2582.25,
        "inserts": 2764.85
      },
      "15.2": {
        "solid": 2232.25,
        "glass": 2901.82,
        "inserts": 3084.42
      },
      "15.4": {
        "solid": 2232.25,
        "glass": 2901.82,
        "inserts": 3084.42
      },
      "15.6": {
        "solid": 1937.04,
        "glass": 2606.6,
        "inserts": 2789.2
      },
      "15.8": {
        "solid": 1937.04,
        "glass": 2606.6,
        "inserts": 2789.2
      },
      "15.10": {
        "solid": 2262.69,
        "glass": 2932.25,
        "inserts": 3114.85
      },
      "16": {
        "solid": 1962.91,
        "glass": 2632.47,
        "inserts": 2815.07
      },
      "16.2": {
        "solid": 2580.73,
        "glass": 3250.29,
        "inserts": 3432.89
      },
      "16.4": {
        "solid": 2580.73,
        "glass": 3250.29,
        "inserts": 3432.89
      },
      "16.6": {
        "solid": 2580.73,
        "glass": 3250.29,
        "inserts": 3432.89
      },
      "16.8": {
        "solid": 2580.73,
        "glass": 3250.29,
        "inserts": 3432.89
      },
      "16.10": {
        "solid": 2580.73,
        "glass": 3250.29,
        "inserts": 3432.89
      },
      "17": {
        "solid": 2239.86,
        "glass": 2909.43,
        "inserts": 3092.03
      },
      "17.2": {
        "solid": 2694.86,
        "glass": 3364.42,
        "inserts": 3547.02
      },
      "17.4": {
        "solid": 2694.86,
        "glass": 3364.42,
        "inserts": 3547.02
      },
      "17.6": {
        "solid": 2694.86,
        "glass": 3364.42,
        "inserts": 3547.02
      },
      "17.8": {
        "solid": 2694.86,
        "glass": 3364.42,
        "inserts": 3547.02
      },
      "17.10": {
        "solid": 2694.86,
        "glass": 3364.42,
        "inserts": 3547.02
      },
      "18": {
        "solid": 2338.77,
        "glass": 3008.34,
        "inserts": 3190.94
      },
      "18.2": {
        "solid": 2859.2,
        "glass": 3528.77,
        "inserts": 3711.37
      },
      "18.4": {
        "solid": 2859.2,
        "glass": 3528.77,
        "inserts": 3711.37
      },
      "18.6": {
        "solid": 2859.2,
        "glass": 3528.77,
        "inserts": 3711.37
      },
      "18.8": {
        "solid": 2859.2,
        "glass": 3528.77,
        "inserts": 3711.37
      },
      "18.10": {
        "solid": 2859.2,
        "glass": 3528.77,
        "inserts": 3711.37
      },
      "19": {
        "solid": 2481.82,
        "glass": 3151.38,
        "inserts": 3333.98
      },
      "19.2": {
        "solid": 3031.16,
        "glass": 3868.1,
        "inserts": 4096.36
      },
      "19.4": {
        "solid": 3031.16,
        "glass": 3868.1,
        "inserts": 4096.36
      },
      "19.6": {
        "solid": 3031.16,
        "glass": 3868.1,
        "inserts": 4096.36
      },
      "19.8": {
        "solid": 3031.16,
        "glass": 3868.1,
        "inserts": 4096.36
      },
      "19.10": {
        "solid": 3031.16,
        "glass": 3868.1,
        "inserts": 4096.36
      },
      "20": {
        "solid": 2630.95,
        "glass": 3467.89,
        "inserts": 3696.15
      }
    },
    "8": {
      "6": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "6.2": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "6.4": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "6.6": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "6.8": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "6.10": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "7": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "7.2": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "7.4": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "7.6": {
        "solid": 1514.0,
        "glass": 1765.09,
        "inserts": 1833.56
      },
      "7.8": {
        "solid": 1514.0,
        "glass": 1848.78,
        "inserts": 1940.09
      },
      "7.10": {
        "solid": 1514.0,
        "glass": 1848.78,
        "inserts": 1940.09
      },
      "8": {
        "solid": 1314.65,
        "glass": 1649.43,
        "inserts": 1740.74
      },
      "8.2": {
        "solid": 1641.82,
        "glass": 1976.61,
        "inserts": 2067.91
      },
      "8.4": {
        "solid": 1641.82,
        "glass": 1976.61,
        "inserts": 2067.91
      },
      "8.6": {
        "solid": 1641.82,
        "glass": 1976.61,
        "inserts": 2067.91
      },
      "8.8": {
        "solid": 1641.82,
        "glass": 1976.61,
        "inserts": 2067.91
      },
      "8.10": {
        "solid": 1641.82,
        "glass": 1976.61,
        "inserts": 2067.91
      },
      "9": {
        "solid": 1425.74,
        "glass": 1760.52,
        "inserts": 1851.83
      },
      "9.2": {
        "solid": 1889.87,
        "glass": 2224.65,
        "inserts": 2315.96
      },
      "9.4": {
        "solid": 1889.87,
        "glass": 2224.65,
        "inserts": 2315.96
      },
      "9.6": {
        "solid": 1889.87,
        "glass": 2224.65,
        "inserts": 2315.96
      },
      "9.8": {
        "solid": 1889.87,
        "glass": 2224.65,
        "inserts": 2315.96
      },
      "9.10": {
        "solid": 1889.87,
        "glass": 2224.65,
        "inserts": 2315.96
      },
      "10": {
        "solid": 1640.3,
        "glass": 1975.08,
        "inserts": 2066.39
      },
      "10.2": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "10.4": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "10.6": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "10.8": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "10.10": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "11": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "11.2": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "11.4": {
        "solid": 2206.38,
        "glass": 2541.17,
        "inserts": 2632.47
      },
      "11.6": {
        "solid": 2206.38,
        "glass": 2708.55,
        "inserts": 2845.51
      },
      "11.8": {
        "solid": 2206.38,
        "glass": 2708.55,
        "inserts": 2845.51
      },
      "11.10": {
        "solid": 2206.38,
        "glass": 2708.55,
        "inserts": 2845.51
      },
      "12": {
        "solid": 1914.21,
        "glass": 2416.38,
        "inserts": 2553.34
      },
      "12.2": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "12.4": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "12.6": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "12.8": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "12.10": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "13": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "13.2": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "13.4": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "13.6": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "13.8": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "13.10": {
        "solid": 2525.95,
        "glass": 3028.11,
        "inserts": 3165.07
      },
      "14": {
        "solid": 2192.69,
        "glass": 2694.85,
        "inserts": 2831.82
      },
      "14.2": {
        "solid": 2693.34,
        "glass": 3195.5,
        "inserts": 3332.46
      },
      "14.4": {
        "solid": 2693.34,
        "glass": 3195.5,
        "inserts": 3332.46
      },
      "14.6": {
        "solid": 2693.34,
        "glass": 3195.5,
        "inserts": 3332.46
      },
      "14.8": {
        "solid": 2693.34,
        "glass": 3195.5,
        "inserts": 3332.46
      },
      "14.10": {
        "solid": 2693.34,
        "glass": 3362.9,
        "inserts": 3545.5
      },
      "15": {
        "solid": 2337.25,
        "glass": 3006.82,
        "inserts": 3189.42
      },
      "15.2": {
        "solid": 2743.55,
        "glass": 3413.12,
        "inserts": 3595.72
      },
      "15.4": {
        "solid": 2743.55,
        "glass": 3413.12,
        "inserts": 3595.72
      },
      "15.6": {
        "solid": 2381.38,
        "glass": 3050.95,
        "inserts": 3233.55
      },
      "15.8": {
        "solid": 2381.38,
        "glass": 3050.95,
        "inserts": 3233.55
      },
      "15.10": {
        "solid": 2795.29,
        "glass": 3464.86,
        "inserts": 3647.46
      },
      "16": {
        "solid": 2427.03,
        "glass": 3096.6,
        "inserts": 3279.2
      },
      "16.2": {
        "solid": 3055.51,
        "glass": 3725.07,
        "inserts": 3907.67
      },
      "16.4": {
        "solid": 3055.51,
        "glass": 3725.07,
        "inserts": 3907.67
      },
      "16.6": {
        "solid": 3055.51,
        "glass": 3725.07,
        "inserts": 3907.67
      },
      "16.8": {
        "solid": 3055.51,
        "glass": 3725.07,
        "inserts": 3907.67
      },
      "16.10": {
        "solid": 3055.51,
        "glass": 3725.07,
        "inserts": 3907.67
      },
      "17": {
        "solid": 2652.25,
        "glass": 3321.81,
        "inserts": 3504.41
      },
      "17.2": {
        "solid": 3279.2,
        "glass": 3948.76,
        "inserts": 4131.36
      },
      "17.4": {
        "solid": 3279.2,
        "glass": 3948.76,
        "inserts": 4131.36
      },
      "17.6": {
        "solid": 3279.2,
        "glass": 3948.76,
        "inserts": 4131.36
      },
      "17.8": {
        "solid": 3279.2,
        "glass": 3948.76,
        "inserts": 4131.36
      },
      "17.10": {
        "solid": 3279.2,
        "glass": 3948.76,
        "inserts": 4131.36
      },
      "18": {
        "solid": 2847.03,
        "glass": 3516.59,
        "inserts": 3699.19
      },
      "18.2": {
        "solid": 3478.55,
        "glass": 4148.11,
        "inserts": 4330.71
      },
      "18.4": {
        "solid": 3478.55,
        "glass": 4148.11,
        "inserts": 4330.71
      },
      "18.6": {
        "solid": 3478.55,
        "glass": 4148.11,
        "inserts": 4330.71
      },
      "18.8": {
        "solid": 3478.55,
        "glass": 4148.11,
        "inserts": 4330.71
      },
      "18.10": {
        "solid": 3478.55,
        "glass": 4148.11,
        "inserts": 4330.71
      },
      "19": {
        "solid": 3020.51,
        "glass": 3690.07,
        "inserts": 3872.67
      },
      "19.2": {
        "solid": 3688.54,
        "glass": 4525.49,
        "inserts": 4753.74
      },
      "19.4": {
        "solid": 3688.54,
        "glass": 4525.49,
        "inserts": 4753.74
      },
      "19.6": {
        "solid": 3688.54,
        "glass": 4525.49,
        "inserts": 4753.74
      },
      "19.8": {
        "solid": 3688.54,
        "glass": 4525.49,
        "inserts": 4753.74
      },
      "19.10": {
        "solid": 3688.54,
        "glass": 4525.49,
        "inserts": 4753.74
      },
      "20": {
        "solid": 3203.11,
        "glass": 4040.06,
        "inserts": 4268.31
      }
    },
    "9": {
      "6": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.2": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.4": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.6": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.8": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.10": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.2": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.4": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.6": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.8": {
        "solid": 2023.78,
        "glass": 2358.56,
        "inserts": 2449.87
      },
      "7.10": {
        "solid": 2023.78,
        "glass": 2358.56,
        "inserts": 2449.87
      },
      "8": {
        "solid": 1763.56,
        "glass": 2098.34,
        "inserts": 2189.65
      },
      "8.2": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.4": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.6": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.8": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.10": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "9": {
        "solid": 1873.13,
        "glass": 2207.91,
        "inserts": 2299.22
      },
      "9.2": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.4": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.6": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.8": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.10": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "10": {
        "solid": 2052.69,
        "glass": 2387.47,
        "inserts": 2478.78
      },
      "10.2": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.4": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.6": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.8": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.10": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11.2": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11.4": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11.6": {
        "solid": 2822.68,
        "glass": 3324.85,
        "inserts": 3461.81
      },
      "11.8": {
        "solid": 2822.68,
        "glass": 3324.85,
        "inserts": 3461.81
      },
      "11.10": {
        "solid": 2822.68,
        "glass": 3324.85,
        "inserts": 3461.81
      },
      "12": {
        "solid": 2457.47,
        "glass": 2959.63,
        "inserts": 3096.6
      },
      "12.2": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.4": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.6": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.8": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.10": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.2": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.4": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.6": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.8": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.10": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "14": {
        "solid": 2749.64,
        "glass": 3251.8,
        "inserts": 3388.77
      },
      "14.2": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.4": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.6": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.8": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.10": {
        "solid": 3314.2,
        "glass": 3983.76,
        "inserts": 4166.36
      },
      "15": {
        "solid": 2885.07,
        "glass": 3554.64,
        "inserts": 3737.24
      },
      "15.2": {
        "solid": 3690.07,
        "glass": 4359.63,
        "inserts": 4542.23
      },
      "15.4": {
        "solid": 3690.07,
        "glass": 4359.63,
        "inserts": 4542.23
      },
      "15.6": {
        "solid": 3212.24,
        "glass": 3881.81,
        "inserts": 4064.41
      },
      "15.8": {
        "solid": 3212.24,
        "glass": 3881.81,
        "inserts": 4064.41
      },
      "15.10": {
        "solid": 3690.07,
        "glass": 4359.63,
        "inserts": 4542.23
      },
      "16": {
        "solid": 3212.24,
        "glass": 3881.81,
        "inserts": 4064.41
      },
      "16.2": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.4": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.6": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.8": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.10": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "17": {
        "solid": 3656.59,
        "glass": 4326.15,
        "inserts": 4508.75
      },
      "17.2": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.4": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.6": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.8": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.10": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "18": {
        "solid": 3837.67,
        "glass": 4507.24,
        "inserts": 4689.84
      },
      "18.2": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.4": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.6": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.8": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.10": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "19": {
        "solid": 4065.93,
        "glass": 4735.5,
        "inserts": 4918.1
      },
      "19.2": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.4": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.6": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.8": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.10": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "20": {
        "solid": 4307.89,
        "glass": 5144.83,
        "inserts": 5373.09
      }
    },
    "10": {
      "6": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.2": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.4": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.6": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.8": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "6.10": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.2": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.4": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.6": {
        "solid": 2023.78,
        "glass": 2274.87,
        "inserts": 2343.34
      },
      "7.8": {
        "solid": 2023.78,
        "glass": 2358.56,
        "inserts": 2449.87
      },
      "7.10": {
        "solid": 2023.78,
        "glass": 2358.56,
        "inserts": 2449.87
      },
      "8": {
        "solid": 1763.56,
        "glass": 2098.34,
        "inserts": 2189.65
      },
      "8.2": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.4": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.6": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.8": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "8.10": {
        "solid": 2150.08,
        "glass": 2484.86,
        "inserts": 2576.17
      },
      "9": {
        "solid": 1873.13,
        "glass": 2207.91,
        "inserts": 2299.22
      },
      "9.2": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.4": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.6": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.8": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "9.10": {
        "solid": 2357.03,
        "glass": 2691.82,
        "inserts": 2783.13
      },
      "10": {
        "solid": 2052.69,
        "glass": 2387.47,
        "inserts": 2478.78
      },
      "10.2": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.4": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.6": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.8": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "10.10": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11.2": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11.4": {
        "solid": 2822.68,
        "glass": 3157.46,
        "inserts": 3248.77
      },
      "11.6": {
        "solid": 2822.68,
        "glass": 3324.85,
        "inserts": 3461.81
      },
      "11.8": {
        "solid": 2822.68,
        "glass": 3324.85,
        "inserts": 3461.81
      },
      "11.10": {
        "solid": 2822.68,
        "glass": 3324.85,
        "inserts": 3461.81
      },
      "12": {
        "solid": 2457.47,
        "glass": 2959.63,
        "inserts": 3096.6
      },
      "12.2": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.4": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.6": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.8": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "12.10": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.2": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.4": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.6": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.8": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "13.10": {
        "solid": 3157.46,
        "glass": 3659.63,
        "inserts": 3796.59
      },
      "14": {
        "solid": 2749.64,
        "glass": 3251.8,
        "inserts": 3388.77
      },
      "14.2": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.4": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.6": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.8": {
        "solid": 3314.2,
        "glass": 3816.36,
        "inserts": 3953.33
      },
      "14.10": {
        "solid": 3314.2,
        "glass": 3983.76,
        "inserts": 4166.36
      },
      "15": {
        "solid": 2885.07,
        "glass": 3554.64,
        "inserts": 3737.24
      },
      "15.2": {
        "solid": 3690.07,
        "glass": 4359.63,
        "inserts": 4542.23
      },
      "15.4": {
        "solid": 3690.07,
        "glass": 4359.63,
        "inserts": 4542.23
      },
      "15.6": {
        "solid": 3212.24,
        "glass": 3881.81,
        "inserts": 4064.41
      },
      "15.8": {
        "solid": 3212.24,
        "glass": 3881.81,
        "inserts": 4064.41
      },
      "15.10": {
        "solid": 3690.07,
        "glass": 4359.63,
        "inserts": 4542.23
      },
      "16": {
        "solid": 3212.24,
        "glass": 3881.81,
        "inserts": 4064.41
      },
      "16.2": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.4": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.6": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.8": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "16.10": {
        "solid": 4201.37,
        "glass": 4870.93,
        "inserts": 5053.53
      },
      "17": {
        "solid": 3656.59,
        "glass": 4326.15,
        "inserts": 4508.75
      },
      "17.2": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.4": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.6": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.8": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "17.10": {
        "solid": 4409.84,
        "glass": 5079.41,
        "inserts": 5262.01
      },
      "18": {
        "solid": 3837.67,
        "glass": 4507.24,
        "inserts": 4689.84
      },
      "18.2": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.4": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.6": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.8": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "18.10": {
        "solid": 4671.58,
        "glass": 5341.14,
        "inserts": 5523.74
      },
      "19": {
        "solid": 4065.93,
        "glass": 4735.5,
        "inserts": 4918.1
      },
      "19.2": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.4": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.6": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.8": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "19.10": {
        "solid": 4950.06,
        "glass": 5787.0,
        "inserts": 6015.26
      },
      "20": {
        "solid": 4307.89,
        "glass": 5144.83,
        "inserts": 5373.09
      }
    }
  },
  "CD": {
    "7": {
      "6.2": {
        "solid": 2359.33,
        "glass": 2807.6
      },
      "6.4": {
        "solid": 2359.33,
        "glass": 2807.6
      },
      "7": {
        "solid": 2359.33,
        "glass": 2807.6
      },
      "7.2": {
        "solid": 2359.33,
        "glass": 2807.6
      },
      "7.6": {
        "solid": 2359.33,
        "glass": 2807.6
      },
      "7.8": {
        "solid": 2359.33,
        "glass": 2807.6
      },
      "8": {
        "solid": 2359.33,
        "glass": 2807.6
      },
      "8.2": {
        "solid": 2460.09,
        "glass": 2926.87
      },
      "8.6": {
        "solid": 2460.09,
        "glass": 2926.87
      },
      "9": {
        "solid": 2460.09,
        "glass": 2926.87
      },
      "9.2": {
        "solid": 3060.53,
        "glass": 3656.85
      },
      "10": {
        "solid": 3060.53,
        "glass": 3656.85
      },
      "12": {
        "solid": 3350.47,
        "glass": 4022.88,
        "inserts": 4695.3
      },
      "12.2": {
        "solid": 3852.21,
        "glass": 4524.62,
        "inserts": 5197.04
      },
      "13": {
        "solid": 3852.21,
        "glass": 4524.62,
        "inserts": 5197.04
      },
      "13.8": {
        "solid": 3852.21,
        "glass": 4524.62,
        "inserts": 5197.04
      },
      "14": {
        "solid": 3852.21
      },
      "14.2": {
        "solid": 4399.19
      },
      "15": {
        "solid": 4399.19,
        "glass": 5293.68,
        "inserts": 6188.17
      },
      "15.2": {
        "solid": 4399.19,
        "glass": 5293.68,
        "inserts": 6188.17
      },
      "15.6": {
        "solid": 4399.19,
        "glass": 5293.68,
        "inserts": 6188.17
      },
      "15.8": {
        "solid": 4399.19,
        "glass": 5293.68,
        "inserts": 6188.17
      },
      "16": {
        "solid": 4399.19,
        "glass": 5293.68,
        "inserts": 6188.17
      },
      "16.2": {
        "solid": 4473.21,
        "glass": 5406.77,
        "inserts": 6262.2
      },
      "17": {
        "solid": 4473.21,
        "glass": 5406.77,
        "inserts": 6262.2
      },
      "18": {
        "solid": 4734.36,
        "glass": 5667.92,
        "inserts": 6523.35
      }
    },
    "8": {
      "6.2": {
        "solid": 2421.02,
        "glass": 2869.29
      },
      "6.4": {
        "solid": 2421.02,
        "glass": 2869.29
      },
      "7": {
        "solid": 2421.02,
        "glass": 2869.29
      },
      "7.2": {
        "solid": 2421.02,
        "glass": 2869.29
      },
      "7.6": {
        "solid": 2421.02,
        "glass": 2869.29
      },
      "7.8": {
        "solid": 2421.02,
        "glass": 2869.29
      },
      "8": {
        "solid": 2421.02,
        "glass": 2869.29
      },
      "8.2": {
        "solid": 2523.84,
        "glass": 2990.61
      },
      "8.6": {
        "solid": 2523.84,
        "glass": 2990.61
      },
      "9": {
        "solid": 2523.84,
        "glass": 2990.61
      },
      "9.2": {
        "solid": 3140.73,
        "glass": 3737.05
      },
      "10": {
        "solid": 3140.73,
        "glass": 3737.05
      },
      "12": {
        "solid": 3447.12,
        "glass": 4119.52,
        "inserts": 4791.95
      },
      "12.2": {
        "solid": 3963.25,
        "glass": 4635.66,
        "inserts": 5308.08
      },
      "13": {
        "solid": 3963.25,
        "glass": 4635.66,
        "inserts": 5308.08
      },
      "13.8": {
        "solid": 3963.25,
        "glass": 4635.66,
        "inserts": 5308.08
      },
      "14": {
        "solid": 3963.25
      },
      "14.2": {
        "solid": 4524.62
      },
      "15": {
        "solid": 4524.62,
        "glass": 5419.11,
        "inserts": 6313.6
      },
      "15.2": {
        "solid": 4524.62,
        "glass": 5419.11,
        "inserts": 6313.6
      },
      "15.6": {
        "solid": 4524.62,
        "glass": 5419.11,
        "inserts": 6313.6
      },
      "15.8": {
        "solid": 4524.62,
        "glass": 5419.11,
        "inserts": 6313.6
      },
      "16": {
        "solid": 4524.62,
        "glass": 5419.11,
        "inserts": 6313.6
      },
      "16.2": {
        "solid": 4598.65,
        "glass": 5532.21,
        "inserts": 6387.63
      },
      "17": {
        "solid": 4598.65,
        "glass": 5532.21,
        "inserts": 6387.63
      },
      "18": {
        "solid": 4868.02,
        "glass": 5801.58,
        "inserts": 6657.01
      }
    },
    "9": {
      "6.2": {
        "solid": 3132.5,
        "glass": 3580.77
      },
      "6.4": {
        "solid": 3132.5,
        "glass": 3580.77
      },
      "7": {
        "solid": 3132.5,
        "glass": 3580.77
      },
      "7.2": {
        "solid": 3132.5,
        "glass": 3580.77
      },
      "7.6": {
        "solid": 3132.5,
        "glass": 3580.77
      },
      "7.8": {
        "solid": 3132.5,
        "glass": 3580.77
      },
      "8": {
        "solid": 3132.5,
        "glass": 3580.77
      },
      "8.2": {
        "solid": 3255.88,
        "glass": 3722.66
      },
      "8.6": {
        "solid": 3255.88,
        "glass": 3722.66
      },
      "9": {
        "solid": 3255.88,
        "glass": 3722.66
      },
      "9.2": {
        "solid": 4064.01,
        "glass": 4660.33
      },
      "10": {
        "solid": 4064.01,
        "glass": 4660.33
      },
      "12": {
        "solid": 4306.65,
        "glass": 4979.06,
        "inserts": 5651.48
      },
      "12.2": {
        "solid": 4882.42,
        "glass": 5554.82,
        "inserts": 6227.25
      },
      "13": {
        "solid": 4882.42,
        "glass": 5554.82,
        "inserts": 6227.25
      },
      "13.8": {
        "solid": 4882.42,
        "glass": 5554.82,
        "inserts": 6227.25
      },
      "14": {
        "solid": 4882.42
      },
      "14.2": {
        "solid": 5575.39
      },
      "15": {
        "solid": 5575.39,
        "glass": 6469.88,
        "inserts": 7364.38
      },
      "15.2": {
        "solid": 5575.39,
        "glass": 6469.88,
        "inserts": 7364.38
      },
      "15.6": {
        "solid": 5575.39,
        "glass": 6469.88,
        "inserts": 7364.38
      },
      "15.8": {
        "solid": 5575.39,
        "glass": 6469.88,
        "inserts": 7364.38
      },
      "16": {
        "solid": 5575.39,
        "glass": 6469.88,
        "inserts": 7364.38
      },
      "16.2": {
        "solid": 6013.39,
        "glass": 6946.95,
        "inserts": 7802.37
      },
      "17": {
        "solid": 6013.39,
        "glass": 6946.95,
        "inserts": 7802.37
      },
      "18": {
        "solid": 6365.01,
        "glass": 7298.57,
        "inserts": 8154.0
      }
    },
    "10": {
      "6.2": {
        "solid": 3210.64,
        "glass": 3658.91
      },
      "6.4": {
        "solid": 3210.64,
        "glass": 3658.91
      },
      "7": {
        "solid": 3210.64,
        "glass": 3658.91
      },
      "7.2": {
        "solid": 3210.64,
        "glass": 3658.91
      },
      "7.6": {
        "solid": 3210.64,
        "glass": 3658.91
      },
      "7.8": {
        "solid": 3210.64,
        "glass": 3658.91
      },
      "8": {
        "solid": 3210.64,
        "glass": 3658.91
      },
      "8.2": {
        "solid": 3344.3,
        "glass": 3811.08
      },
      "8.6": {
        "solid": 3344.3,
        "glass": 3811.08
      },
      "9": {
        "solid": 3344.3,
        "glass": 3811.08
      },
      "9.2": {
        "solid": 4170.94,
        "glass": 4767.26
      },
      "10": {
        "solid": 4170.94,
        "glass": 4767.26
      },
      "12": {
        "solid": 4506.11,
        "glass": 5178.52,
        "inserts": 5850.94
      },
      "12.2": {
        "solid": 5160.02,
        "glass": 5832.43,
        "inserts": 6504.85
      },
      "13": {
        "solid": 5160.02,
        "glass": 5832.43,
        "inserts": 6504.85
      },
      "13.8": {
        "solid": 5160.02,
        "glass": 5832.43,
        "inserts": 6504.85
      },
      "14": {
        "solid": 5160.02
      },
      "14.2": {
        "solid": 5894.12
      },
      "15": {
        "solid": 5894.12,
        "glass": 6788.61,
        "inserts": 7683.1
      },
      "15.2": {
        "solid": 5894.12,
        "glass": 6788.61,
        "inserts": 7683.1
      },
      "15.6": {
        "solid": 5894.12,
        "glass": 6788.61,
        "inserts": 7683.1
      },
      "15.8": {
        "solid": 5894.12,
        "glass": 6788.61,
        "inserts": 7683.1
      },
      "16": {
        "solid": 5894.12,
        "glass": 6788.61,
        "inserts": 7683.1
      },
      "16.2": {
        "solid": 6200.51,
        "glass": 7134.07,
        "inserts": 7989.49
      },
      "17": {
        "solid": 6200.51,
        "glass": 7134.07,
        "inserts": 7989.49
      },
      "18": {
        "solid": 6564.48,
        "glass": 7498.04,
        "inserts": 8353.46
      }
    }
  }
};
