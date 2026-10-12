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
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "6.2": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "6.4": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "6.6": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "6.8": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "6.10": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "7": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "7.2": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "7.4": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "7.6": {
        "solid": 928.2,
        "glass": 1160.6,
        "inserts": 1223.99
      },
      "7.8": {
        "solid": 928.2,
        "glass": 1238.07,
        "inserts": 1322.58
      },
      "7.10": {
        "solid": 928.2,
        "glass": 1238.07,
        "inserts": 1322.58
      },
      "8": {
        "solid": 801.43,
        "glass": 1111.3,
        "inserts": 1195.81
      },
      "8.2": {
        "solid": 1002.85,
        "glass": 1312.72,
        "inserts": 1397.23
      },
      "8.4": {
        "solid": 1002.85,
        "glass": 1312.72,
        "inserts": 1397.23
      },
      "8.6": {
        "solid": 1002.85,
        "glass": 1312.72,
        "inserts": 1397.23
      },
      "8.8": {
        "solid": 1002.85,
        "glass": 1312.72,
        "inserts": 1397.23
      },
      "8.10": {
        "solid": 1002.85,
        "glass": 1312.72,
        "inserts": 1397.23
      },
      "9": {
        "solid": 866.23,
        "glass": 1176.09,
        "inserts": 1260.6
      },
      "9.2": {
        "solid": 1136.66,
        "glass": 1446.52,
        "inserts": 1531.04
      },
      "9.4": {
        "solid": 1136.66,
        "glass": 1446.52,
        "inserts": 1531.04
      },
      "9.6": {
        "solid": 1136.66,
        "glass": 1446.52,
        "inserts": 1531.04
      },
      "9.8": {
        "solid": 1136.66,
        "glass": 1446.52,
        "inserts": 1531.04
      },
      "9.10": {
        "solid": 1136.66,
        "glass": 1446.52,
        "inserts": 1531.04
      },
      "10": {
        "solid": 983.13,
        "glass": 1293.0,
        "inserts": 1377.51
      },
      "10.2": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "10.4": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "10.6": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "10.8": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "10.10": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "11": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "11.2": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "11.4": {
        "solid": 1329.62,
        "glass": 1639.49,
        "inserts": 1724.0
      },
      "11.6": {
        "solid": 1329.62,
        "glass": 1794.43,
        "inserts": 1921.2
      },
      "11.8": {
        "solid": 1329.62,
        "glass": 1794.43,
        "inserts": 1921.2
      },
      "11.10": {
        "solid": 1329.62,
        "glass": 1794.43,
        "inserts": 1921.2
      },
      "12": {
        "solid": 1149.33,
        "glass": 1614.14,
        "inserts": 1740.91
      },
      "12.2": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "12.4": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "12.6": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "12.8": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "12.10": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "13": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "13.2": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "13.4": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "13.6": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "13.8": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "13.10": {
        "solid": 1562.02,
        "glass": 2026.83,
        "inserts": 2153.6
      },
      "14": {
        "solid": 1350.75,
        "glass": 1815.56,
        "inserts": 1942.33
      },
      "14.2": {
        "solid": 1638.08,
        "glass": 2102.89,
        "inserts": 2229.66
      },
      "14.4": {
        "solid": 1638.08,
        "glass": 2102.89,
        "inserts": 2229.66
      },
      "14.6": {
        "solid": 1638.08,
        "glass": 2102.89,
        "inserts": 2229.66
      },
      "14.8": {
        "solid": 1638.08,
        "glass": 2102.89,
        "inserts": 2229.66
      },
      "14.10": {
        "solid": 1638.08,
        "glass": 2257.82,
        "inserts": 2426.84
      },
      "15": {
        "solid": 1416.95,
        "glass": 2036.68,
        "inserts": 2205.71
      },
      "15.2": {
        "solid": 1654.98,
        "glass": 2274.72,
        "inserts": 2443.74
      },
      "15.4": {
        "solid": 1654.98,
        "glass": 2274.72,
        "inserts": 2443.74
      },
      "15.6": {
        "solid": 1432.44,
        "glass": 2052.18,
        "inserts": 2221.2
      },
      "15.8": {
        "solid": 1432.44,
        "glass": 2052.18,
        "inserts": 2221.2
      },
      "15.10": {
        "solid": 1666.25,
        "glass": 2285.99,
        "inserts": 2455.01
      },
      "16": {
        "solid": 1442.3,
        "glass": 2062.04,
        "inserts": 2231.06
      },
      "16.2": {
        "solid": 1922.6,
        "glass": 2542.33,
        "inserts": 2711.36
      },
      "16.4": {
        "solid": 1922.6,
        "glass": 2542.33,
        "inserts": 2711.36
      },
      "16.6": {
        "solid": 1922.6,
        "glass": 2542.33,
        "inserts": 2711.36
      },
      "16.8": {
        "solid": 1922.6,
        "glass": 2542.33,
        "inserts": 2711.36
      },
      "16.10": {
        "solid": 1922.6,
        "glass": 2542.33,
        "inserts": 2711.36
      },
      "17": {
        "solid": 1664.84,
        "glass": 2284.58,
        "inserts": 2453.6
      },
      "17.2": {
        "solid": 2011.33,
        "glass": 2631.07,
        "inserts": 2800.09
      },
      "17.4": {
        "solid": 2011.33,
        "glass": 2631.07,
        "inserts": 2800.09
      },
      "17.6": {
        "solid": 2011.33,
        "glass": 2631.07,
        "inserts": 2800.09
      },
      "17.8": {
        "solid": 2011.33,
        "glass": 2631.07,
        "inserts": 2800.09
      },
      "17.10": {
        "solid": 2011.33,
        "glass": 2631.07,
        "inserts": 2800.09
      },
      "18": {
        "solid": 1742.31,
        "glass": 2362.05,
        "inserts": 2531.07
      }
    },
    "8": {
      "6": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "6.2": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "6.4": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "6.6": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "6.8": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "6.10": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "7": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "7.2": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "7.4": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "7.6": {
        "solid": 1121.16,
        "glass": 1353.57,
        "inserts": 1416.95
      },
      "7.8": {
        "solid": 1121.16,
        "glass": 1431.03,
        "inserts": 1515.54
      },
      "7.10": {
        "solid": 1121.16,
        "glass": 1431.03,
        "inserts": 1515.54
      },
      "8": {
        "solid": 969.05,
        "glass": 1278.91,
        "inserts": 1363.42
      },
      "8.2": {
        "solid": 1221.17,
        "glass": 1531.03,
        "inserts": 1615.55
      },
      "8.4": {
        "solid": 1221.17,
        "glass": 1531.03,
        "inserts": 1615.55
      },
      "8.6": {
        "solid": 1221.17,
        "glass": 1531.03,
        "inserts": 1615.55
      },
      "8.8": {
        "solid": 1221.17,
        "glass": 1531.03,
        "inserts": 1615.55
      },
      "8.10": {
        "solid": 1221.17,
        "glass": 1531.03,
        "inserts": 1615.55
      },
      "9": {
        "solid": 1056.37,
        "glass": 1366.24,
        "inserts": 1450.75
      },
      "9.2": {
        "solid": 1404.27,
        "glass": 1714.14,
        "inserts": 1798.65
      },
      "9.4": {
        "solid": 1404.27,
        "glass": 1714.14,
        "inserts": 1798.65
      },
      "9.6": {
        "solid": 1404.27,
        "glass": 1714.14,
        "inserts": 1798.65
      },
      "9.8": {
        "solid": 1404.27,
        "glass": 1714.14,
        "inserts": 1798.65
      },
      "9.10": {
        "solid": 1404.27,
        "glass": 1714.14,
        "inserts": 1798.65
      },
      "10": {
        "solid": 1215.53,
        "glass": 1525.4,
        "inserts": 1609.91
      },
      "10.2": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "10.4": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "10.6": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "10.8": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "10.10": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "11": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "11.2": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "11.4": {
        "solid": 1640.9,
        "glass": 1950.77,
        "inserts": 2035.28
      },
      "11.6": {
        "solid": 1640.9,
        "glass": 2105.71,
        "inserts": 2232.48
      },
      "11.8": {
        "solid": 1640.9,
        "glass": 2105.71,
        "inserts": 2232.48
      },
      "11.10": {
        "solid": 1640.9,
        "glass": 2105.71,
        "inserts": 2232.48
      },
      "12": {
        "solid": 1419.76,
        "glass": 1884.58,
        "inserts": 2011.34
      },
      "12.2": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "12.4": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "12.6": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "12.8": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "12.10": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "13": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "13.2": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "13.4": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "13.6": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "13.8": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "13.10": {
        "solid": 1881.75,
        "glass": 2346.56,
        "inserts": 2473.33
      },
      "14": {
        "solid": 1629.63,
        "glass": 2094.44,
        "inserts": 2221.21
      },
      "14.2": {
        "solid": 2009.93,
        "glass": 2474.74,
        "inserts": 2601.5
      },
      "14.4": {
        "solid": 2009.93,
        "glass": 2474.74,
        "inserts": 2601.5
      },
      "14.6": {
        "solid": 2009.93,
        "glass": 2474.74,
        "inserts": 2601.5
      },
      "14.8": {
        "solid": 2009.93,
        "glass": 2474.74,
        "inserts": 2601.5
      },
      "14.10": {
        "solid": 2009.93,
        "glass": 2629.66,
        "inserts": 2798.68
      },
      "15": {
        "solid": 1740.9,
        "glass": 2360.64,
        "inserts": 2529.66
      },
      "15.2": {
        "solid": 2039.5,
        "glass": 2659.24,
        "inserts": 2828.26
      },
      "15.4": {
        "solid": 2039.5,
        "glass": 2659.24,
        "inserts": 2828.26
      },
      "15.6": {
        "solid": 1766.26,
        "glass": 2385.99,
        "inserts": 2555.01
      },
      "15.8": {
        "solid": 1766.26,
        "glass": 2385.99,
        "inserts": 2555.01
      },
      "15.10": {
        "solid": 2090.21,
        "glass": 2709.95,
        "inserts": 2878.97
      },
      "16": {
        "solid": 1809.92,
        "glass": 2429.65,
        "inserts": 2598.68
      },
      "16.2": {
        "solid": 2280.36,
        "glass": 2900.09,
        "inserts": 3069.11
      },
      "16.4": {
        "solid": 2280.36,
        "glass": 2900.09,
        "inserts": 3069.11
      },
      "16.6": {
        "solid": 2280.36,
        "glass": 2900.09,
        "inserts": 3069.11
      },
      "16.8": {
        "solid": 2280.36,
        "glass": 2900.09,
        "inserts": 3069.11
      },
      "16.10": {
        "solid": 2280.36,
        "glass": 2900.09,
        "inserts": 3069.11
      },
      "17": {
        "solid": 1976.12,
        "glass": 2595.86,
        "inserts": 2764.88
      },
      "17.2": {
        "solid": 2452.19,
        "glass": 3071.93,
        "inserts": 3240.95
      },
      "17.4": {
        "solid": 2452.19,
        "glass": 3071.93,
        "inserts": 3240.95
      },
      "17.6": {
        "solid": 2452.19,
        "glass": 3071.93,
        "inserts": 3240.95
      },
      "17.8": {
        "solid": 2452.19,
        "glass": 3071.93,
        "inserts": 3240.95
      },
      "17.10": {
        "solid": 2452.19,
        "glass": 3071.93,
        "inserts": 3240.95
      },
      "18": {
        "solid": 2125.42,
        "glass": 2745.16,
        "inserts": 2914.18
      }
    },
    "9": {
      "6": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.2": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.4": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.6": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.8": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.10": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.2": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.4": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.6": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.8": {
        "solid": 1571.88,
        "glass": 1881.75,
        "inserts": 1966.26
      },
      "7.10": {
        "solid": 1571.88,
        "glass": 1881.75,
        "inserts": 1966.26
      },
      "8": {
        "solid": 1366.24,
        "glass": 1676.11,
        "inserts": 1760.62
      },
      "8.2": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.4": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.6": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.8": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.10": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "9": {
        "solid": 1473.29,
        "glass": 1783.16,
        "inserts": 1867.67
      },
      "9.2": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.4": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.6": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.8": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.10": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "10": {
        "solid": 1704.28,
        "glass": 2014.15,
        "inserts": 2098.66
      },
      "10.2": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.4": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.6": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.8": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.10": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11.2": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11.4": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11.6": {
        "solid": 2352.19,
        "glass": 2817.0,
        "inserts": 2943.77
      },
      "11.8": {
        "solid": 2352.19,
        "glass": 2817.0,
        "inserts": 2943.77
      },
      "11.10": {
        "solid": 2352.19,
        "glass": 2817.0,
        "inserts": 2943.77
      },
      "12": {
        "solid": 2045.14,
        "glass": 2509.95,
        "inserts": 2636.71
      },
      "12.2": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.4": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.6": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.8": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.10": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.2": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.4": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.6": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.8": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.10": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "14": {
        "solid": 2290.22,
        "glass": 2755.03,
        "inserts": 2881.79
      },
      "14.2": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.4": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.6": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.8": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.10": {
        "solid": 2764.88,
        "glass": 3384.62,
        "inserts": 3553.64
      },
      "15": {
        "solid": 2404.3,
        "glass": 3024.04,
        "inserts": 3193.06
      },
      "15.2": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "15.4": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "15.6": {
        "solid": 2536.7,
        "glass": 3156.44,
        "inserts": 3325.46
      },
      "15.8": {
        "solid": 2536.7,
        "glass": 3156.44,
        "inserts": 3325.46
      },
      "15.10": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "16": {
        "solid": 2536.7,
        "glass": 3156.44,
        "inserts": 3325.46
      },
      "16.2": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.4": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.6": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.8": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.10": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "17": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "17.2": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.4": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.6": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.8": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.10": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "18": {
        "solid": 3062.07,
        "glass": 3681.81,
        "inserts": 3850.83
      }
    },
    "10": {
      "6": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.2": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.4": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.6": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.8": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "6.10": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.2": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.4": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.6": {
        "solid": 1571.88,
        "glass": 1804.29,
        "inserts": 1867.67
      },
      "7.8": {
        "solid": 1571.88,
        "glass": 1881.75,
        "inserts": 1966.26
      },
      "7.10": {
        "solid": 1571.88,
        "glass": 1881.75,
        "inserts": 1966.26
      },
      "8": {
        "solid": 1366.24,
        "glass": 1676.11,
        "inserts": 1760.62
      },
      "8.2": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.4": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.6": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.8": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "8.10": {
        "solid": 1694.42,
        "glass": 2004.29,
        "inserts": 2088.8
      },
      "9": {
        "solid": 1473.29,
        "glass": 1783.16,
        "inserts": 1867.67
      },
      "9.2": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.4": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.6": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.8": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "9.10": {
        "solid": 1960.63,
        "glass": 2270.5,
        "inserts": 2355.01
      },
      "10": {
        "solid": 1704.28,
        "glass": 2014.15,
        "inserts": 2098.66
      },
      "10.2": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.4": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.6": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.8": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "10.10": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11.2": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11.4": {
        "solid": 2352.19,
        "glass": 2662.06,
        "inserts": 2746.57
      },
      "11.6": {
        "solid": 2352.19,
        "glass": 2817.0,
        "inserts": 2943.77
      },
      "11.8": {
        "solid": 2352.19,
        "glass": 2817.0,
        "inserts": 2943.77
      },
      "11.10": {
        "solid": 2352.19,
        "glass": 2817.0,
        "inserts": 2943.77
      },
      "12": {
        "solid": 2045.14,
        "glass": 2509.95,
        "inserts": 2636.71
      },
      "12.2": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.4": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.6": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.8": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "12.10": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.2": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.4": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.6": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.8": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "13.10": {
        "solid": 2633.89,
        "glass": 3098.7,
        "inserts": 3225.47
      },
      "14": {
        "solid": 2290.22,
        "glass": 2755.03,
        "inserts": 2881.79
      },
      "14.2": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.4": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.6": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.8": {
        "solid": 2764.88,
        "glass": 3229.69,
        "inserts": 3356.46
      },
      "14.10": {
        "solid": 2764.88,
        "glass": 3384.62,
        "inserts": 3553.64
      },
      "15": {
        "solid": 2404.3,
        "glass": 3024.04,
        "inserts": 3193.06
      },
      "15.2": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "15.4": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "15.6": {
        "solid": 2536.7,
        "glass": 3156.44,
        "inserts": 3325.46
      },
      "15.8": {
        "solid": 2536.7,
        "glass": 3156.44,
        "inserts": 3325.46
      },
      "15.10": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "16": {
        "solid": 2536.7,
        "glass": 3156.44,
        "inserts": 3325.46
      },
      "16.2": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.4": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.6": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.8": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "16.10": {
        "solid": 3355.04,
        "glass": 3974.78,
        "inserts": 4143.8
      },
      "17": {
        "solid": 2917.0,
        "glass": 3536.73,
        "inserts": 3705.75
      },
      "17.2": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.4": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.6": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.8": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "17.10": {
        "solid": 3521.24,
        "glass": 4140.98,
        "inserts": 4310.0
      },
      "18": {
        "solid": 3062.07,
        "glass": 3681.81,
        "inserts": 3850.83
      }
    }
  },
  "BD1EU/BD1NU": {
    "7": {
      "6": {
        "solid": 1055.81
      },
      "6.2": {
        "solid": 1055.81
      },
      "6.4": {
        "solid": 1055.81
      },
      "6.6": {
        "solid": 1055.81
      },
      "6.8": {
        "solid": 1055.81
      },
      "6.10": {
        "solid": 1055.81
      },
      "7": {
        "solid": 1055.81
      },
      "7.2": {
        "solid": 1055.81
      },
      "7.4": {
        "solid": 1055.81
      },
      "7.6": {
        "solid": 1055.81
      },
      "7.8": {
        "solid": 1055.81,
        "glass": 1408.28,
        "inserts": 1504.41
      },
      "7.10": {
        "solid": 1055.81,
        "glass": 1408.28,
        "inserts": 1504.41
      },
      "8": {
        "solid": 911.62,
        "glass": 1264.09,
        "inserts": 1360.21
      },
      "8.2": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.4": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.6": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.8": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.10": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "9": {
        "solid": 985.32,
        "glass": 1337.79,
        "inserts": 1433.91
      },
      "9.2": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.4": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.6": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.8": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.10": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "10": {
        "solid": 1118.29,
        "glass": 1470.77,
        "inserts": 1566.89
      },
      "10.2": {
        "solid": 1512.42
      },
      "10.4": {
        "solid": 1512.42
      },
      "10.6": {
        "solid": 1512.42
      },
      "10.8": {
        "solid": 1512.42
      },
      "10.10": {
        "solid": 1512.42
      },
      "11": {
        "solid": 1512.42
      },
      "11.2": {
        "solid": 1512.42
      },
      "11.4": {
        "solid": 1512.42
      },
      "11.6": {
        "solid": 1512.42,
        "glass": 2041.12,
        "inserts": 2185.32
      },
      "11.8": {
        "solid": 1512.42,
        "glass": 2041.12,
        "inserts": 2185.32
      },
      "11.10": {
        "solid": 1512.42,
        "glass": 2041.12,
        "inserts": 2185.32
      },
      "12": {
        "solid": 1307.35,
        "glass": 1836.05,
        "inserts": 1980.24
      },
      "12.2": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.4": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.6": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.8": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.10": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.2": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.4": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.6": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.8": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.10": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "14": {
        "solid": 1536.45,
        "glass": 2065.15,
        "inserts": 2209.35
      },
      "14.2": {
        "solid": 1863.29,
        "glass": 2391.99,
        "inserts": 2536.18
      },
      "14.4": {
        "solid": 1863.29,
        "glass": 2391.99,
        "inserts": 2536.18
      },
      "14.6": {
        "solid": 1863.29,
        "glass": 2391.99,
        "inserts": 2536.18
      },
      "14.8": {
        "solid": 1863.29
      },
      "14.10": {
        "solid": 1863.29,
        "glass": 2568.24,
        "inserts": 2760.48
      },
      "15": {
        "solid": 1611.75,
        "glass": 2316.7,
        "inserts": 2508.95
      },
      "15.2": {
        "solid": 1882.52,
        "glass": 2587.46,
        "inserts": 2779.71
      },
      "15.4": {
        "solid": 1882.52,
        "glass": 2587.46,
        "inserts": 2779.71
      },
      "15.6": {
        "solid": 1629.38,
        "glass": 2334.32,
        "inserts": 2526.57
      },
      "15.8": {
        "solid": 1629.38,
        "glass": 2334.32,
        "inserts": 2526.57
      },
      "15.10": {
        "solid": 1895.33,
        "glass": 2600.28,
        "inserts": 2792.53
      },
      "16": {
        "solid": 1640.59,
        "glass": 2345.54,
        "inserts": 2537.79
      },
      "16.2": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.4": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.6": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.8": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.10": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "17": {
        "solid": 1893.73,
        "glass": 2598.68,
        "inserts": 2790.92
      },
      "17.2": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.4": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.6": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.8": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.10": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "18": {
        "solid": 1981.85,
        "glass": 2686.8,
        "inserts": 2879.04
      }
    },
    "8": {
      "6": {
        "solid": 1275.3
      },
      "6.2": {
        "solid": 1275.3
      },
      "6.4": {
        "solid": 1275.3
      },
      "6.6": {
        "solid": 1275.3
      },
      "6.8": {
        "solid": 1275.3
      },
      "6.10": {
        "solid": 1275.3
      },
      "7": {
        "solid": 1275.3
      },
      "7.2": {
        "solid": 1275.3
      },
      "7.4": {
        "solid": 1275.3
      },
      "7.6": {
        "solid": 1275.3
      },
      "7.8": {
        "solid": 1275.3,
        "glass": 1627.78,
        "inserts": 1723.9
      },
      "7.10": {
        "solid": 1275.3,
        "glass": 1627.78,
        "inserts": 1723.9
      },
      "8": {
        "solid": 1102.27,
        "glass": 1454.75,
        "inserts": 1550.87
      },
      "8.2": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.4": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.6": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.8": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.10": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "9": {
        "solid": 1201.61,
        "glass": 1554.08,
        "inserts": 1650.2
      },
      "9.2": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.4": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.6": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.8": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.10": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "10": {
        "solid": 1382.65,
        "glass": 1735.12,
        "inserts": 1831.24
      },
      "10.2": {
        "solid": 1866.49
      },
      "10.4": {
        "solid": 1866.49
      },
      "10.6": {
        "solid": 1866.49
      },
      "10.8": {
        "solid": 1866.49
      },
      "10.10": {
        "solid": 1866.49
      },
      "11": {
        "solid": 1866.49
      },
      "11.2": {
        "solid": 1866.49
      },
      "11.4": {
        "solid": 1866.49
      },
      "11.6": {
        "solid": 1866.49,
        "glass": 2395.2,
        "inserts": 2539.39
      },
      "11.8": {
        "solid": 1866.49,
        "glass": 2395.2,
        "inserts": 2539.39
      },
      "11.10": {
        "solid": 1866.49,
        "glass": 2395.2,
        "inserts": 2539.39
      },
      "12": {
        "solid": 1614.96,
        "glass": 2143.66,
        "inserts": 2287.85
      },
      "12.2": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.4": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.6": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.8": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.10": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.2": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.4": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.6": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.8": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.10": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "14": {
        "solid": 1853.68,
        "glass": 2382.38,
        "inserts": 2526.57
      },
      "14.2": {
        "solid": 2286.26,
        "glass": 2814.96,
        "inserts": 2959.15
      },
      "14.4": {
        "solid": 2286.26,
        "glass": 2814.96,
        "inserts": 2959.15
      },
      "14.6": {
        "solid": 2286.26,
        "glass": 2814.96,
        "inserts": 2959.15
      },
      "14.8": {
        "solid": 2286.26
      },
      "14.10": {
        "solid": 2286.26,
        "glass": 2991.2,
        "inserts": 3183.45
      },
      "15": {
        "solid": 1980.25,
        "glass": 2685.19,
        "inserts": 2877.44
      },
      "15.2": {
        "solid": 2319.9,
        "glass": 3024.85,
        "inserts": 3217.09
      },
      "15.4": {
        "solid": 2319.9,
        "glass": 3024.85,
        "inserts": 3217.09
      },
      "15.6": {
        "solid": 2009.08,
        "glass": 2714.03,
        "inserts": 2906.28
      },
      "15.8": {
        "solid": 2009.08,
        "glass": 2714.03,
        "inserts": 2906.28
      },
      "15.10": {
        "solid": 2377.58,
        "glass": 3082.52,
        "inserts": 3274.77
      },
      "16": {
        "solid": 2058.75,
        "glass": 2763.7,
        "inserts": 2955.94
      },
      "16.2": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.4": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.6": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.8": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.10": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "17": {
        "solid": 2247.8,
        "glass": 2952.75,
        "inserts": 3145.0
      },
      "17.2": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.4": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.6": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.8": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.10": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "18": {
        "solid": 2417.63,
        "glass": 3122.58,
        "inserts": 3314.82
      }
    },
    "9": {
      "6": {
        "solid": 1787.99
      },
      "6.2": {
        "solid": 1787.99
      },
      "6.4": {
        "solid": 1787.99
      },
      "6.6": {
        "solid": 1787.99
      },
      "6.8": {
        "solid": 1787.99
      },
      "6.10": {
        "solid": 1787.99
      },
      "7": {
        "solid": 1787.99
      },
      "7.2": {
        "solid": 1787.99
      },
      "7.4": {
        "solid": 1787.99
      },
      "7.6": {
        "solid": 1787.99
      },
      "7.8": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "7.10": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "8": {
        "solid": 1554.08,
        "glass": 1906.55,
        "inserts": 2002.67
      },
      "8.2": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.4": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.6": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.8": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.10": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "9": {
        "solid": 1675.84,
        "glass": 2028.31,
        "inserts": 2124.44
      },
      "9.2": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.4": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.6": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.8": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.10": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "10": {
        "solid": 1938.59,
        "glass": 2291.06,
        "inserts": 2387.19
      },
      "10.2": {
        "solid": 2675.58
      },
      "10.4": {
        "solid": 2675.58
      },
      "10.6": {
        "solid": 2675.58
      },
      "10.8": {
        "solid": 2675.58
      },
      "10.10": {
        "solid": 2675.58
      },
      "11": {
        "solid": 2675.58
      },
      "11.2": {
        "solid": 2675.58
      },
      "11.4": {
        "solid": 2675.58
      },
      "11.6": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.8": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.10": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "12": {
        "solid": 2326.31,
        "glass": 2855.01,
        "inserts": 2999.2
      },
      "12.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "14": {
        "solid": 2605.08,
        "glass": 3133.78,
        "inserts": 3277.98
      },
      "14.2": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.4": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.6": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.8": {
        "solid": 3145.0
      },
      "14.10": {
        "solid": 3145.0,
        "glass": 3849.95,
        "inserts": 4042.2
      },
      "15": {
        "solid": 2734.85,
        "glass": 3439.8,
        "inserts": 3632.05
      },
      "15.2": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.4": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.6": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.8": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.10": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "16": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "16.2": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.4": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.6": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.8": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.10": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "17": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "17.2": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.4": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.6": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.8": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.10": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "18": {
        "solid": 3483.05,
        "glass": 4188.0,
        "inserts": 4380.25
      }
    },
    "10": {
      "6": {
        "solid": 1787.99
      },
      "6.2": {
        "solid": 1787.99
      },
      "6.4": {
        "solid": 1787.99
      },
      "6.6": {
        "solid": 1787.99
      },
      "6.8": {
        "solid": 1787.99
      },
      "6.10": {
        "solid": 1787.99
      },
      "7": {
        "solid": 1787.99
      },
      "7.2": {
        "solid": 1787.99
      },
      "7.4": {
        "solid": 1787.99
      },
      "7.6": {
        "solid": 1787.99
      },
      "7.8": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "7.10": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "8": {
        "solid": 1554.08,
        "glass": 1906.55,
        "inserts": 2002.67
      },
      "8.2": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.4": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.6": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.8": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.10": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "9": {
        "solid": 1675.84,
        "glass": 2028.31,
        "inserts": 2124.44
      },
      "9.2": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.4": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.6": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.8": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.10": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "10": {
        "solid": 1938.59,
        "glass": 2291.06,
        "inserts": 2387.19
      },
      "10.2": {
        "solid": 2675.58
      },
      "10.4": {
        "solid": 2675.58
      },
      "10.6": {
        "solid": 2675.58
      },
      "10.8": {
        "solid": 2675.58
      },
      "10.10": {
        "solid": 2675.58
      },
      "11": {
        "solid": 2675.58
      },
      "11.2": {
        "solid": 2675.58
      },
      "11.4": {
        "solid": 2675.58
      },
      "11.6": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.8": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.10": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "12": {
        "solid": 2326.31,
        "glass": 2855.01,
        "inserts": 2999.2
      },
      "12.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "14": {
        "solid": 2605.08,
        "glass": 3133.78,
        "inserts": 3277.98
      },
      "14.2": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.4": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.6": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.8": {
        "solid": 3145.0
      },
      "14.10": {
        "solid": 3145.0,
        "glass": 3849.95,
        "inserts": 4042.2
      },
      "15": {
        "solid": 2734.85,
        "glass": 3439.8,
        "inserts": 3632.05
      },
      "15.2": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.4": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.6": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.8": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.10": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "16": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "16.2": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.4": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.6": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.8": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.10": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "17": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "17.2": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.4": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.6": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.8": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.10": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "18": {
        "solid": 3483.05,
        "glass": 4188.0,
        "inserts": 4380.25
      }
    }
  },
  "BD2EU/BD2NU": {
    "7": {
      "6": {
        "solid": 1310.15
      },
      "6.2": {
        "solid": 1310.15
      },
      "6.4": {
        "solid": 1310.15
      },
      "6.6": {
        "solid": 1310.15
      },
      "6.8": {
        "solid": 1310.15
      },
      "6.10": {
        "solid": 1310.15
      },
      "7": {
        "solid": 1310.15
      },
      "7.2": {
        "solid": 1310.15
      },
      "7.4": {
        "solid": 1310.15
      },
      "7.6": {
        "solid": 1310.15
      },
      "7.8": {
        "solid": 1310.15,
        "glass": 1664.24,
        "inserts": 1760.82
      },
      "7.10": {
        "solid": 1310.15,
        "glass": 1664.24,
        "inserts": 1760.82
      },
      "8": {
        "solid": 1133.1,
        "glass": 1487.2,
        "inserts": 1583.77
      },
      "8.2": {
        "solid": 1419.59,
        "glass": 1773.69,
        "inserts": 1870.27
      },
      "8.4": {
        "solid": 1419.59,
        "glass": 1773.69,
        "inserts": 1870.27
      },
      "8.6": {
        "solid": 1419.59,
        "glass": 1773.69,
        "inserts": 1870.27
      },
      "8.8": {
        "solid": 1419.59,
        "glass": 1773.69,
        "inserts": 1870.27
      },
      "8.10": {
        "solid": 1419.59,
        "glass": 1773.69,
        "inserts": 1870.27
      },
      "9": {
        "solid": 1228.06,
        "glass": 1582.16,
        "inserts": 1678.74
      },
      "9.2": {
        "solid": 1595.03,
        "glass": 1949.13,
        "inserts": 2045.71
      },
      "9.4": {
        "solid": 1595.03,
        "glass": 1949.13,
        "inserts": 2045.71
      },
      "9.6": {
        "solid": 1595.03,
        "glass": 1949.13,
        "inserts": 2045.71
      },
      "9.8": {
        "solid": 1595.03,
        "glass": 1949.13,
        "inserts": 2045.71
      },
      "9.10": {
        "solid": 1595.03,
        "glass": 1949.13,
        "inserts": 2045.71
      },
      "10": {
        "solid": 1380.97,
        "glass": 1735.06,
        "inserts": 1831.64
      },
      "10.2": {
        "solid": 1931.42
      },
      "10.4": {
        "solid": 1931.42
      },
      "10.6": {
        "solid": 1931.42
      },
      "10.8": {
        "solid": 1931.42
      },
      "10.10": {
        "solid": 1931.42
      },
      "11": {
        "solid": 1931.42
      },
      "11.2": {
        "solid": 1931.42
      },
      "11.4": {
        "solid": 1931.42
      },
      "11.6": {
        "solid": 1931.42,
        "glass": 2462.56,
        "inserts": 2607.42
      },
      "11.8": {
        "solid": 1931.42,
        "glass": 2462.56,
        "inserts": 2607.42
      },
      "11.10": {
        "solid": 1931.42,
        "glass": 2462.56,
        "inserts": 2607.42
      },
      "12": {
        "solid": 1670.68,
        "glass": 2201.81,
        "inserts": 2346.68
      },
      "12.2": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "12.4": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "12.6": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "12.8": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "12.10": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "13": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "13.2": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "13.4": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "13.6": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "13.8": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "13.10": {
        "solid": 2187.33,
        "glass": 2718.47,
        "inserts": 2863.33
      },
      "14": {
        "solid": 1894.4,
        "glass": 2425.54,
        "inserts": 2570.4
      },
      "14.2": {
        "solid": 2303.22,
        "glass": 2834.35,
        "inserts": 2979.22
      },
      "14.4": {
        "solid": 2303.22,
        "glass": 2834.35,
        "inserts": 2979.22
      },
      "14.6": {
        "solid": 2303.22,
        "glass": 2834.35,
        "inserts": 2979.22
      },
      "14.8": {
        "solid": 2303.22
      },
      "14.10": {
        "solid": 2303.22,
        "glass": 3011.41,
        "inserts": 3204.55
      },
      "15": {
        "solid": 1994.19,
        "glass": 2702.38,
        "inserts": 2895.52
      },
      "15.2": {
        "solid": 2332.19,
        "glass": 3040.38,
        "inserts": 3233.52
      },
      "15.4": {
        "solid": 2332.19,
        "glass": 3040.38,
        "inserts": 3233.52
      },
      "15.6": {
        "solid": 2019.94,
        "glass": 2728.14,
        "inserts": 2921.27
      },
      "15.8": {
        "solid": 2019.94,
        "glass": 2728.14,
        "inserts": 2921.27
      },
      "15.10": {
        "solid": 2364.38,
        "glass": 3072.57,
        "inserts": 3265.71
      },
      "16": {
        "solid": 2047.31,
        "glass": 2755.5,
        "inserts": 2948.63
      },
      "16.2": {
        "solid": 2700.77,
        "glass": 3408.96,
        "inserts": 3602.1
      },
      "16.4": {
        "solid": 2700.77,
        "glass": 3408.96,
        "inserts": 3602.1
      },
      "16.6": {
        "solid": 2700.77,
        "glass": 3408.96,
        "inserts": 3602.1
      },
      "16.8": {
        "solid": 2700.77,
        "glass": 3408.96,
        "inserts": 3602.1
      },
      "16.10": {
        "solid": 2700.77,
        "glass": 3408.96,
        "inserts": 3602.1
      },
      "17": {
        "solid": 2340.24,
        "glass": 3048.43,
        "inserts": 3241.57
      },
      "17.2": {
        "solid": 2821.48,
        "glass": 3529.68,
        "inserts": 3722.81
      },
      "17.4": {
        "solid": 2821.48,
        "glass": 3529.68,
        "inserts": 3722.81
      },
      "17.6": {
        "solid": 2821.48,
        "glass": 3529.68,
        "inserts": 3722.81
      },
      "17.8": {
        "solid": 2821.48,
        "glass": 3529.68,
        "inserts": 3722.81
      },
      "17.10": {
        "solid": 2821.48,
        "glass": 3529.68,
        "inserts": 3722.81
      },
      "18": {
        "solid": 2444.86,
        "glass": 3153.05,
        "inserts": 3346.18
      },
      "18.2": {
        "solid": 2995.31,
        "glass": 3703.5,
        "inserts": 3896.64
      },
      "18.4": {
        "solid": 2995.31,
        "glass": 3703.5,
        "inserts": 3896.64
      },
      "18.6": {
        "solid": 2995.31,
        "glass": 3703.5,
        "inserts": 3896.64
      },
      "18.8": {
        "solid": 2995.31,
        "glass": 3703.5,
        "inserts": 3896.64
      },
      "18.10": {
        "solid": 2995.31,
        "glass": 3703.5,
        "inserts": 3896.64
      },
      "19": {
        "solid": 2596.15,
        "glass": 3304.34,
        "inserts": 3497.48
      },
      "19.2": {
        "solid": 3177.19,
        "glass": 4062.42,
        "inserts": 4303.84
      },
      "19.4": {
        "solid": 3177.19,
        "glass": 4062.42,
        "inserts": 4303.84
      },
      "19.6": {
        "solid": 3177.19,
        "glass": 4062.42,
        "inserts": 4303.84
      },
      "19.8": {
        "solid": 3177.19,
        "glass": 4062.42,
        "inserts": 4303.84
      },
      "19.10": {
        "solid": 3177.19,
        "glass": 4062.42,
        "inserts": 4303.84
      },
      "20": {
        "solid": 2753.88,
        "glass": 3639.12,
        "inserts": 3880.54
      }
    },
    "8": {
      "6": {
        "solid": 1572.5
      },
      "6.2": {
        "solid": 1572.5
      },
      "6.4": {
        "solid": 1572.5
      },
      "6.6": {
        "solid": 1572.5
      },
      "6.8": {
        "solid": 1572.5
      },
      "6.10": {
        "solid": 1572.5
      },
      "7": {
        "solid": 1572.5
      },
      "7.2": {
        "solid": 1572.5
      },
      "7.4": {
        "solid": 1572.5
      },
      "7.6": {
        "solid": 1572.5
      },
      "7.8": {
        "solid": 1572.5,
        "glass": 1926.59,
        "inserts": 2023.17
      },
      "7.10": {
        "solid": 1572.5,
        "glass": 1926.59,
        "inserts": 2023.17
      },
      "8": {
        "solid": 1361.65,
        "glass": 1715.75,
        "inserts": 1812.32
      },
      "8.2": {
        "solid": 1707.7,
        "glass": 2061.79,
        "inserts": 2158.37
      },
      "8.4": {
        "solid": 1707.7,
        "glass": 2061.79,
        "inserts": 2158.37
      },
      "8.6": {
        "solid": 1707.7,
        "glass": 2061.79,
        "inserts": 2158.37
      },
      "8.8": {
        "solid": 1707.7,
        "glass": 2061.79,
        "inserts": 2158.37
      },
      "8.10": {
        "solid": 1707.7,
        "glass": 2061.79,
        "inserts": 2158.37
      },
      "9": {
        "solid": 1479.15,
        "glass": 1833.24,
        "inserts": 1929.82
      },
      "9.2": {
        "solid": 1970.05,
        "glass": 2324.15,
        "inserts": 2420.72
      },
      "9.4": {
        "solid": 1970.05,
        "glass": 2324.15,
        "inserts": 2420.72
      },
      "9.6": {
        "solid": 1970.05,
        "glass": 2324.15,
        "inserts": 2420.72
      },
      "9.8": {
        "solid": 1970.05,
        "glass": 2324.15,
        "inserts": 2420.72
      },
      "9.10": {
        "solid": 1970.05,
        "glass": 2324.15,
        "inserts": 2420.72
      },
      "10": {
        "solid": 1706.09,
        "glass": 2060.18,
        "inserts": 2156.76
      },
      "10.2": {
        "solid": 2304.83
      },
      "10.4": {
        "solid": 2304.83
      },
      "10.6": {
        "solid": 2304.83
      },
      "10.8": {
        "solid": 2304.83
      },
      "10.10": {
        "solid": 2304.83
      },
      "11": {
        "solid": 2304.83
      },
      "11.2": {
        "solid": 2304.83
      },
      "11.4": {
        "solid": 2304.83
      },
      "11.6": {
        "solid": 2304.83,
        "glass": 2835.96,
        "inserts": 2980.83
      },
      "11.8": {
        "solid": 2304.83,
        "glass": 2835.96,
        "inserts": 2980.83
      },
      "11.10": {
        "solid": 2304.83,
        "glass": 2835.96,
        "inserts": 2980.83
      },
      "12": {
        "solid": 1995.8,
        "glass": 2526.94,
        "inserts": 2671.8
      },
      "12.2": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "12.4": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "12.6": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "12.8": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "12.10": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "13": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "13.2": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "13.4": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "13.6": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "13.8": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "13.10": {
        "solid": 2642.83,
        "glass": 3173.96,
        "inserts": 3318.83
      },
      "14": {
        "solid": 2290.34,
        "glass": 2821.48,
        "inserts": 2966.34
      },
      "14.2": {
        "solid": 2819.87,
        "glass": 3351.01,
        "inserts": 3495.87
      },
      "14.4": {
        "solid": 2819.87,
        "glass": 3351.01,
        "inserts": 3495.87
      },
      "14.6": {
        "solid": 2819.87,
        "glass": 3351.01,
        "inserts": 3495.87
      },
      "14.8": {
        "solid": 2819.87
      },
      "14.10": {
        "solid": 2819.87,
        "glass": 3528.07,
        "inserts": 3721.2
      },
      "15": {
        "solid": 2443.25,
        "glass": 3151.44,
        "inserts": 3344.57
      },
      "15.2": {
        "solid": 2872.99,
        "glass": 3581.18,
        "inserts": 3774.32
      },
      "15.4": {
        "solid": 2872.99,
        "glass": 3581.18,
        "inserts": 3774.32
      },
      "15.6": {
        "solid": 2489.92,
        "glass": 3198.12,
        "inserts": 3391.25
      },
      "15.8": {
        "solid": 2489.92,
        "glass": 3198.12,
        "inserts": 3391.25
      },
      "15.10": {
        "solid": 2927.71,
        "glass": 3635.9,
        "inserts": 3829.04
      },
      "16": {
        "solid": 2538.21,
        "glass": 3246.4,
        "inserts": 3439.54
      },
      "16.2": {
        "solid": 3202.94,
        "glass": 3911.13,
        "inserts": 4104.27
      },
      "16.4": {
        "solid": 3202.94,
        "glass": 3911.13,
        "inserts": 4104.27
      },
      "16.6": {
        "solid": 3202.94,
        "glass": 3911.13,
        "inserts": 4104.27
      },
      "16.8": {
        "solid": 3202.94,
        "glass": 3911.13,
        "inserts": 4104.27
      },
      "16.10": {
        "solid": 3202.94,
        "glass": 3911.13,
        "inserts": 4104.27
      },
      "17": {
        "solid": 2776.42,
        "glass": 3484.61,
        "inserts": 3677.74
      },
      "17.2": {
        "solid": 3439.54,
        "glass": 4147.73,
        "inserts": 4340.87
      },
      "17.4": {
        "solid": 3439.54,
        "glass": 4147.73,
        "inserts": 4340.87
      },
      "17.6": {
        "solid": 3439.54,
        "glass": 4147.73,
        "inserts": 4340.87
      },
      "17.8": {
        "solid": 3439.54,
        "glass": 4147.73,
        "inserts": 4340.87
      },
      "17.10": {
        "solid": 3439.54,
        "glass": 4147.73,
        "inserts": 4340.87
      },
      "18": {
        "solid": 2982.44,
        "glass": 3690.63,
        "inserts": 3883.76
      },
      "18.2": {
        "solid": 3650.39,
        "glass": 4358.58,
        "inserts": 4551.71
      },
      "18.4": {
        "solid": 3650.39,
        "glass": 4358.58,
        "inserts": 4551.71
      },
      "18.6": {
        "solid": 3650.39,
        "glass": 4358.58,
        "inserts": 4551.71
      },
      "18.8": {
        "solid": 3650.39,
        "glass": 4358.58,
        "inserts": 4551.71
      },
      "18.10": {
        "solid": 3650.39,
        "glass": 4358.58,
        "inserts": 4551.71
      },
      "19": {
        "solid": 3165.92,
        "glass": 3874.11,
        "inserts": 4067.25
      },
      "19.2": {
        "solid": 3872.5,
        "glass": 4757.73,
        "inserts": 4999.15
      },
      "19.4": {
        "solid": 3872.5,
        "glass": 4757.73,
        "inserts": 4999.15
      },
      "19.6": {
        "solid": 3872.5,
        "glass": 4757.73,
        "inserts": 4999.15
      },
      "19.8": {
        "solid": 3872.5,
        "glass": 4757.73,
        "inserts": 4999.15
      },
      "19.10": {
        "solid": 3872.5,
        "glass": 4757.73,
        "inserts": 4999.15
      },
      "20": {
        "solid": 3359.06,
        "glass": 4244.29,
        "inserts": 4485.72
      }
    },
    "9": {
      "6": {
        "solid": 2111.69
      },
      "6.2": {
        "solid": 2111.69
      },
      "6.4": {
        "solid": 2111.69
      },
      "6.6": {
        "solid": 2111.69
      },
      "6.8": {
        "solid": 2111.69
      },
      "6.10": {
        "solid": 2111.69
      },
      "7": {
        "solid": 2111.69
      },
      "7.2": {
        "solid": 2111.69
      },
      "7.4": {
        "solid": 2111.69
      },
      "7.6": {
        "solid": 2111.69
      },
      "7.8": {
        "solid": 2111.69,
        "glass": 2465.78,
        "inserts": 2562.36
      },
      "7.10": {
        "solid": 2111.69,
        "glass": 2465.78,
        "inserts": 2562.36
      },
      "8": {
        "solid": 1836.46,
        "glass": 2190.56,
        "inserts": 2287.13
      },
      "8.2": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.4": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.6": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.8": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.10": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "9": {
        "solid": 1952.34,
        "glass": 2306.44,
        "inserts": 2403.02
      },
      "9.2": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.4": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.6": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.8": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.10": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "10": {
        "solid": 2142.27,
        "glass": 2496.36,
        "inserts": 2592.94
      },
      "10.2": {
        "solid": 2956.68
      },
      "10.4": {
        "solid": 2956.68
      },
      "10.6": {
        "solid": 2956.68
      },
      "10.8": {
        "solid": 2956.68
      },
      "10.10": {
        "solid": 2956.68
      },
      "11": {
        "solid": 2956.68
      },
      "11.2": {
        "solid": 2956.68
      },
      "11.4": {
        "solid": 2956.68
      },
      "11.6": {
        "solid": 2956.68,
        "glass": 3487.82,
        "inserts": 3632.68
      },
      "11.8": {
        "solid": 2956.68,
        "glass": 3487.82,
        "inserts": 3632.68
      },
      "11.10": {
        "solid": 2956.68,
        "glass": 3487.82,
        "inserts": 3632.68
      },
      "12": {
        "solid": 2570.4,
        "glass": 3101.53,
        "inserts": 3246.4
      },
      "12.2": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.4": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.6": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.8": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.10": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.2": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.4": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.6": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.8": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.10": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "14": {
        "solid": 2879.43,
        "glass": 3410.56,
        "inserts": 3555.43
      },
      "14.2": {
        "solid": 3476.56,
        "glass": 4007.69,
        "inserts": 4152.56
      },
      "14.4": {
        "solid": 3476.56,
        "glass": 4007.69,
        "inserts": 4152.56
      },
      "14.6": {
        "solid": 3476.56,
        "glass": 4007.69,
        "inserts": 4152.56
      },
      "14.8": {
        "solid": 3476.56
      },
      "14.10": {
        "solid": 3476.56,
        "glass": 4184.75,
        "inserts": 4377.88
      },
      "15": {
        "solid": 3022.67,
        "glass": 3730.87,
        "inserts": 3924.0
      },
      "15.2": {
        "solid": 3874.11,
        "glass": 4582.3,
        "inserts": 4775.44
      },
      "15.4": {
        "solid": 3874.11,
        "glass": 4582.3,
        "inserts": 4775.44
      },
      "15.6": {
        "solid": 3368.72,
        "glass": 4076.91,
        "inserts": 4270.05
      },
      "15.8": {
        "solid": 3368.72,
        "glass": 4076.91,
        "inserts": 4270.05
      },
      "15.10": {
        "solid": 3874.11,
        "glass": 4582.3,
        "inserts": 4775.44
      },
      "16": {
        "solid": 3368.72,
        "glass": 4076.91,
        "inserts": 4270.05
      },
      "16.2": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.4": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.6": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.8": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.10": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "17": {
        "solid": 3838.7,
        "glass": 4546.89,
        "inserts": 4740.03
      },
      "17.2": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.4": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.6": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.8": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.10": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "18": {
        "solid": 4030.23,
        "glass": 4738.42,
        "inserts": 4931.56
      },
      "18.2": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.4": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.6": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.8": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.10": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "19": {
        "solid": 4271.66,
        "glass": 4979.85,
        "inserts": 5172.99
      },
      "19.2": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.4": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.6": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.8": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.10": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "20": {
        "solid": 4527.57,
        "glass": 5412.8,
        "inserts": 5654.23
      }
    },
    "10": {
      "6": {
        "solid": 2111.69
      },
      "6.2": {
        "solid": 2111.69
      },
      "6.4": {
        "solid": 2111.69
      },
      "6.6": {
        "solid": 2111.69
      },
      "6.8": {
        "solid": 2111.69
      },
      "6.10": {
        "solid": 2111.69
      },
      "7": {
        "solid": 2111.69
      },
      "7.2": {
        "solid": 2111.69
      },
      "7.4": {
        "solid": 2111.69
      },
      "7.6": {
        "solid": 2111.69
      },
      "7.8": {
        "solid": 2111.69,
        "glass": 2465.78,
        "inserts": 2562.36
      },
      "7.10": {
        "solid": 2111.69,
        "glass": 2465.78,
        "inserts": 2562.36
      },
      "8": {
        "solid": 1836.46,
        "glass": 2190.56,
        "inserts": 2287.13
      },
      "8.2": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.4": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.6": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.8": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "8.10": {
        "solid": 2245.28,
        "glass": 2599.37,
        "inserts": 2695.95
      },
      "9": {
        "solid": 1952.34,
        "glass": 2306.44,
        "inserts": 2403.02
      },
      "9.2": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.4": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.6": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.8": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "9.10": {
        "solid": 2464.17,
        "glass": 2818.27,
        "inserts": 2914.84
      },
      "10": {
        "solid": 2142.27,
        "glass": 2496.36,
        "inserts": 2592.94
      },
      "10.2": {
        "solid": 2956.68
      },
      "10.4": {
        "solid": 2956.68
      },
      "10.6": {
        "solid": 2956.68
      },
      "10.8": {
        "solid": 2956.68
      },
      "10.10": {
        "solid": 2956.68
      },
      "11": {
        "solid": 2956.68
      },
      "11.2": {
        "solid": 2956.68
      },
      "11.4": {
        "solid": 2956.68
      },
      "11.6": {
        "solid": 2956.68,
        "glass": 3487.82,
        "inserts": 3632.68
      },
      "11.8": {
        "solid": 2956.68,
        "glass": 3487.82,
        "inserts": 3632.68
      },
      "11.10": {
        "solid": 2956.68,
        "glass": 3487.82,
        "inserts": 3632.68
      },
      "12": {
        "solid": 2570.4,
        "glass": 3101.53,
        "inserts": 3246.4
      },
      "12.2": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.4": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.6": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.8": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "12.10": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.2": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.4": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.6": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.8": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "13.10": {
        "solid": 3310.78,
        "glass": 3841.91,
        "inserts": 3986.78
      },
      "14": {
        "solid": 2879.43,
        "glass": 3410.56,
        "inserts": 3555.43
      },
      "14.2": {
        "solid": 3476.56,
        "glass": 4007.69,
        "inserts": 4152.56
      },
      "14.4": {
        "solid": 3476.56,
        "glass": 4007.69,
        "inserts": 4152.56
      },
      "14.6": {
        "solid": 3476.56,
        "glass": 4007.69,
        "inserts": 4152.56
      },
      "14.8": {
        "solid": 3476.56
      },
      "14.10": {
        "solid": 3476.56,
        "glass": 4184.75,
        "inserts": 4377.88
      },
      "15": {
        "solid": 3022.67,
        "glass": 3730.87,
        "inserts": 3924.0
      },
      "15.2": {
        "solid": 3874.11,
        "glass": 4582.3,
        "inserts": 4775.44
      },
      "15.4": {
        "solid": 3874.11,
        "glass": 4582.3,
        "inserts": 4775.44
      },
      "15.6": {
        "solid": 3368.72,
        "glass": 4076.91,
        "inserts": 4270.05
      },
      "15.8": {
        "solid": 3368.72,
        "glass": 4076.91,
        "inserts": 4270.05
      },
      "15.10": {
        "solid": 3874.11,
        "glass": 4582.3,
        "inserts": 4775.44
      },
      "16": {
        "solid": 3368.72,
        "glass": 4076.91,
        "inserts": 4270.05
      },
      "16.2": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.4": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.6": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.8": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "16.10": {
        "solid": 4414.91,
        "glass": 5123.1,
        "inserts": 5316.23
      },
      "17": {
        "solid": 3838.7,
        "glass": 4546.89,
        "inserts": 4740.03
      },
      "17.2": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.4": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.6": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.8": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "17.10": {
        "solid": 4635.41,
        "glass": 5343.6,
        "inserts": 5536.74
      },
      "18": {
        "solid": 4030.23,
        "glass": 4738.42,
        "inserts": 4931.56
      },
      "18.2": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.4": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.6": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.8": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "18.10": {
        "solid": 4912.25,
        "glass": 5620.44,
        "inserts": 5813.57
      },
      "19": {
        "solid": 4271.66,
        "glass": 4979.85,
        "inserts": 5172.99
      },
      "19.2": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.4": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.6": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.8": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "19.10": {
        "solid": 5206.79,
        "glass": 6092.02,
        "inserts": 6333.44
      },
      "20": {
        "solid": 4527.57,
        "glass": 5412.8,
        "inserts": 5654.23
      }
    }
  },
  "BD1CU": {
    "7": {
      "7.8": {
        "solid": 2015.58,
        "glass": 2422.39,
        "inserts": 2533.34
      },
      "7.10": {
        "solid": 2015.58,
        "glass": 2422.39,
        "inserts": 2533.34
      },
      "8": {
        "solid": 1849.15,
        "glass": 2255.97,
        "inserts": 2366.92
      },
      "8.2": {
        "solid": 2113.58,
        "glass": 2520.4,
        "inserts": 2631.35
      },
      "8.4": {
        "solid": 2113.58,
        "glass": 2520.4,
        "inserts": 2631.35
      },
      "8.6": {
        "solid": 2113.58,
        "glass": 2520.4,
        "inserts": 2631.35
      },
      "8.8": {
        "solid": 2113.58,
        "glass": 2520.4,
        "inserts": 2631.35
      },
      "8.10": {
        "solid": 2113.58,
        "glass": 2520.4,
        "inserts": 2631.35
      },
      "9": {
        "solid": 1934.21,
        "glass": 2341.03,
        "inserts": 2451.98
      },
      "9.2": {
        "solid": 2289.25,
        "glass": 2696.07,
        "inserts": 2807.02
      },
      "9.4": {
        "solid": 2289.25,
        "glass": 2696.07,
        "inserts": 2807.02
      },
      "9.6": {
        "solid": 2289.25,
        "glass": 2696.07,
        "inserts": 2807.02
      },
      "9.8": {
        "solid": 2289.25,
        "glass": 2696.07,
        "inserts": 2807.02
      },
      "9.10": {
        "solid": 2289.25,
        "glass": 2696.07,
        "inserts": 2807.02
      },
      "10": {
        "solid": 2087.69,
        "glass": 2494.51,
        "inserts": 2605.46
      },
      "10.2": {
        "solid": 3271.15
      },
      "10.4": {
        "solid": 3271.15
      },
      "10.6": {
        "solid": 3271.15
      },
      "10.8": {
        "solid": 3271.15
      },
      "10.10": {
        "solid": 3271.15
      },
      "11": {
        "solid": 3271.15
      },
      "11.2": {
        "solid": 3271.15
      },
      "11.4": {
        "solid": 3271.15
      },
      "11.6": {
        "solid": 3271.15,
        "glass": 3881.37,
        "inserts": 4047.8
      },
      "11.8": {
        "solid": 3271.15,
        "glass": 3881.37,
        "inserts": 4047.8
      },
      "11.10": {
        "solid": 3271.15,
        "glass": 3881.37,
        "inserts": 4047.8
      },
      "12": {
        "solid": 3089.93,
        "glass": 3700.15,
        "inserts": 3866.58
      },
      "12.2": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "12.4": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "12.6": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "12.8": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "12.10": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "13": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "13.2": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "13.4": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "13.6": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "13.8": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "13.10": {
        "solid": 3576.26,
        "glass": 4186.48,
        "inserts": 4352.91
      },
      "14": {
        "solid": 3298.89,
        "glass": 3909.1,
        "inserts": 4075.54
      },
      "14.2": {
        "solid": 3676.12,
        "glass": 4286.33,
        "inserts": 4452.77
      },
      "14.4": {
        "solid": 3676.12,
        "glass": 4286.33,
        "inserts": 4452.77
      },
      "14.6": {
        "solid": 3676.12,
        "glass": 4286.33,
        "inserts": 4452.77
      },
      "14.8": {
        "solid": 3676.12
      },
      "14.10": {
        "solid": 3676.12,
        "glass": 4489.75,
        "inserts": 4711.65
      },
      "15": {
        "solid": 3385.8,
        "glass": 4199.43,
        "inserts": 4421.33
      },
      "15.2": {
        "solid": 3698.31,
        "glass": 4511.94,
        "inserts": 4733.84
      },
      "15.4": {
        "solid": 3698.31,
        "glass": 4511.94,
        "inserts": 4733.84
      },
      "15.6": {
        "solid": 3406.14,
        "glass": 4219.77,
        "inserts": 4441.67
      },
      "15.8": {
        "solid": 3406.14,
        "glass": 4219.77,
        "inserts": 4441.67
      },
      "15.10": {
        "solid": 3713.1,
        "glass": 4526.73,
        "inserts": 4748.63
      },
      "16": {
        "solid": 3419.08,
        "glass": 4232.72,
        "inserts": 4454.62
      },
      "16.2": {
        "solid": 4049.64,
        "glass": 4863.28,
        "inserts": 5085.18
      },
      "16.4": {
        "solid": 4049.64,
        "glass": 4863.28,
        "inserts": 5085.18
      },
      "16.6": {
        "solid": 4049.64,
        "glass": 4863.28,
        "inserts": 5085.18
      },
      "16.8": {
        "solid": 4049.64,
        "glass": 4863.28,
        "inserts": 5085.18
      },
      "16.10": {
        "solid": 4049.64,
        "glass": 4863.28,
        "inserts": 5085.18
      },
      "17": {
        "solid": 3711.25,
        "glass": 4524.88,
        "inserts": 4746.78
      },
      "17.2": {
        "solid": 4166.14,
        "glass": 4979.77,
        "inserts": 5201.67
      },
      "17.4": {
        "solid": 4166.14,
        "glass": 4979.77,
        "inserts": 5201.67
      },
      "17.6": {
        "solid": 4166.14,
        "glass": 4979.77,
        "inserts": 5201.67
      },
      "17.8": {
        "solid": 4166.14,
        "glass": 4979.77,
        "inserts": 5201.67
      },
      "17.10": {
        "solid": 4166.14,
        "glass": 4979.77,
        "inserts": 5201.67
      },
      "18": {
        "solid": 3812.95,
        "glass": 4626.59,
        "inserts": 4848.49
      }
    },
    "8": {
      "7.8": {
        "solid": 2276.31,
        "glass": 2683.12,
        "inserts": 2794.07
      },
      "7.10": {
        "solid": 2276.31,
        "glass": 2683.12,
        "inserts": 2794.07
      },
      "8": {
        "solid": 2076.6,
        "glass": 2483.41,
        "inserts": 2594.36
      },
      "8.2": {
        "solid": 2407.6,
        "glass": 2814.41,
        "inserts": 2925.36
      },
      "8.4": {
        "solid": 2407.6,
        "glass": 2814.41,
        "inserts": 2925.36
      },
      "8.6": {
        "solid": 2407.6,
        "glass": 2814.41,
        "inserts": 2925.36
      },
      "8.8": {
        "solid": 2407.6,
        "glass": 2814.41,
        "inserts": 2925.36
      },
      "8.10": {
        "solid": 2407.6,
        "glass": 2814.41,
        "inserts": 2925.36
      },
      "9": {
        "solid": 2191.25,
        "glass": 2598.06,
        "inserts": 2709.01
      },
      "9.2": {
        "solid": 2647.99,
        "glass": 3054.8,
        "inserts": 3165.75
      },
      "9.4": {
        "solid": 2647.99,
        "glass": 3054.8,
        "inserts": 3165.75
      },
      "9.6": {
        "solid": 2647.99,
        "glass": 3054.8,
        "inserts": 3165.75
      },
      "9.8": {
        "solid": 2647.99,
        "glass": 3054.8,
        "inserts": 3165.75
      },
      "9.10": {
        "solid": 2647.99,
        "glass": 3054.8,
        "inserts": 3165.75
      },
      "10": {
        "solid": 2400.2,
        "glass": 2807.02,
        "inserts": 2917.97
      },
      "10.2": {
        "solid": 3694.61
      },
      "10.4": {
        "solid": 3694.61
      },
      "10.6": {
        "solid": 3694.61
      },
      "10.8": {
        "solid": 3694.61
      },
      "10.10": {
        "solid": 3694.61
      },
      "11": {
        "solid": 3694.61
      },
      "11.2": {
        "solid": 3694.61
      },
      "11.4": {
        "solid": 3694.61
      },
      "11.6": {
        "solid": 3694.61,
        "glass": 4304.82,
        "inserts": 4471.26
      },
      "11.8": {
        "solid": 3694.61,
        "glass": 4304.82,
        "inserts": 4471.26
      },
      "11.10": {
        "solid": 3694.61,
        "glass": 4304.82,
        "inserts": 4471.26
      },
      "12": {
        "solid": 3404.29,
        "glass": 4014.51,
        "inserts": 4180.94
      },
      "12.2": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "12.4": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "12.6": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "12.8": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "12.10": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "13": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "13.2": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "13.4": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "13.6": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "13.8": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "13.10": {
        "solid": 4010.81,
        "glass": 4621.03,
        "inserts": 4787.46
      },
      "14": {
        "solid": 3679.81,
        "glass": 4290.03,
        "inserts": 4456.46
      },
      "14.2": {
        "solid": 4179.08,
        "glass": 4789.3,
        "inserts": 4955.73
      },
      "14.4": {
        "solid": 4179.08,
        "glass": 4789.3,
        "inserts": 4955.73
      },
      "14.6": {
        "solid": 4179.08,
        "glass": 4789.3,
        "inserts": 4955.73
      },
      "14.8": {
        "solid": 4179.08
      },
      "14.10": {
        "solid": 4179.08,
        "glass": 4992.72,
        "inserts": 5214.62
      },
      "15": {
        "solid": 3825.9,
        "glass": 4639.53,
        "inserts": 4861.43
      },
      "15.2": {
        "solid": 4217.92,
        "glass": 5031.55,
        "inserts": 5253.45
      },
      "15.4": {
        "solid": 4217.92,
        "glass": 5031.55,
        "inserts": 5253.45
      },
      "15.6": {
        "solid": 3859.18,
        "glass": 4672.81,
        "inserts": 4894.71
      },
      "15.8": {
        "solid": 3859.18,
        "glass": 4672.81,
        "inserts": 4894.71
      },
      "15.10": {
        "solid": 4284.49,
        "glass": 5098.12,
        "inserts": 5320.02
      },
      "16": {
        "solid": 3916.51,
        "glass": 4730.14,
        "inserts": 4952.04
      },
      "16.2": {
        "solid": 4534.12,
        "glass": 5347.76,
        "inserts": 5569.66
      },
      "16.4": {
        "solid": 4534.12,
        "glass": 5347.76,
        "inserts": 5569.66
      },
      "16.6": {
        "solid": 4534.12,
        "glass": 5347.76,
        "inserts": 5569.66
      },
      "16.8": {
        "solid": 4534.12,
        "glass": 5347.76,
        "inserts": 5569.66
      },
      "16.10": {
        "solid": 4534.12,
        "glass": 5347.76,
        "inserts": 5569.66
      },
      "17": {
        "solid": 4134.71,
        "glass": 4948.34,
        "inserts": 5170.24
      },
      "17.2": {
        "solid": 4759.72,
        "glass": 5573.35,
        "inserts": 5795.25
      },
      "17.4": {
        "solid": 4759.72,
        "glass": 5573.35,
        "inserts": 5795.25
      },
      "17.6": {
        "solid": 4759.72,
        "glass": 5573.35,
        "inserts": 5795.25
      },
      "17.8": {
        "solid": 4759.72,
        "glass": 5573.35,
        "inserts": 5795.25
      },
      "17.10": {
        "solid": 4759.72,
        "glass": 5573.35,
        "inserts": 5795.25
      },
      "18": {
        "solid": 4330.72,
        "glass": 5144.35,
        "inserts": 5366.25
      }
    }
  },
  "BD2CU": {
    "7": {
      "7.8": {
        "solid": 2422.39,
        "glass": 2829.21,
        "inserts": 2940.16
      },
      "7.10": {
        "solid": 2422.39,
        "glass": 2829.21,
        "inserts": 2940.16
      },
      "8": {
        "solid": 2098.79,
        "glass": 2505.6,
        "inserts": 2616.55
      },
      "8.2": {
        "solid": 2548.13,
        "glass": 2954.95,
        "inserts": 3065.9
      },
      "8.4": {
        "solid": 2548.13,
        "glass": 2954.95,
        "inserts": 3065.9
      },
      "8.6": {
        "solid": 2548.13,
        "glass": 2954.95,
        "inserts": 3065.9
      },
      "8.8": {
        "solid": 2548.13,
        "glass": 2954.95,
        "inserts": 3065.9
      },
      "8.10": {
        "solid": 2548.13,
        "glass": 2954.95,
        "inserts": 3065.9
      },
      "9": {
        "solid": 2207.89,
        "glass": 2614.7,
        "inserts": 2725.65
      },
      "9.2": {
        "solid": 2749.69,
        "glass": 3156.51,
        "inserts": 3267.46
      },
      "9.4": {
        "solid": 2749.69,
        "glass": 3156.51,
        "inserts": 3267.46
      },
      "9.6": {
        "solid": 2749.69,
        "glass": 3156.51,
        "inserts": 3267.46
      },
      "9.8": {
        "solid": 2749.69,
        "glass": 3156.51,
        "inserts": 3267.46
      },
      "9.10": {
        "solid": 2749.69,
        "glass": 3156.51,
        "inserts": 3267.46
      },
      "10": {
        "solid": 2383.56,
        "glass": 2790.37,
        "inserts": 2901.32
      },
      "10.2": {
        "solid": 3971.98
      },
      "10.4": {
        "solid": 3971.98
      },
      "10.6": {
        "solid": 3971.98
      },
      "10.8": {
        "solid": 3971.98
      },
      "10.10": {
        "solid": 3971.98
      },
      "11": {
        "solid": 3971.98
      },
      "11.2": {
        "solid": 3971.98
      },
      "11.4": {
        "solid": 3971.98
      },
      "11.6": {
        "solid": 3971.98,
        "glass": 4582.2,
        "inserts": 4748.63
      },
      "11.8": {
        "solid": 3971.98,
        "glass": 4582.2,
        "inserts": 4748.63
      },
      "11.10": {
        "solid": 3971.98,
        "glass": 4582.2,
        "inserts": 4748.63
      },
      "12": {
        "solid": 3444.97,
        "glass": 4055.19,
        "inserts": 4221.62
      },
      "12.2": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "12.4": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "12.6": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "12.8": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "12.10": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "13": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "13.2": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "13.4": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "13.6": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "13.8": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "13.10": {
        "solid": 4267.84,
        "glass": 4878.06,
        "inserts": 5044.49
      },
      "14": {
        "solid": 3702.0,
        "glass": 4312.22,
        "inserts": 4478.65
      },
      "14.2": {
        "solid": 4434.27,
        "glass": 5044.48,
        "inserts": 5210.92
      },
      "14.4": {
        "solid": 4434.27,
        "glass": 5044.48,
        "inserts": 5210.92
      },
      "14.6": {
        "solid": 4434.27,
        "glass": 5044.48,
        "inserts": 5210.92
      },
      "14.8": {
        "solid": 4434.27
      },
      "14.10": {
        "solid": 4434.27,
        "glass": 5247.9,
        "inserts": 5469.8
      },
      "15": {
        "solid": 3816.65,
        "glass": 4630.28,
        "inserts": 4852.18
      },
      "15.2": {
        "solid": 4469.4,
        "glass": 5283.04,
        "inserts": 5504.94
      },
      "15.4": {
        "solid": 4469.4,
        "glass": 5283.04,
        "inserts": 5504.94
      },
      "15.6": {
        "solid": 3846.24,
        "glass": 4659.87,
        "inserts": 4881.77
      },
      "15.8": {
        "solid": 3846.24,
        "glass": 4659.87,
        "inserts": 4881.77
      },
      "15.10": {
        "solid": 4469.4,
        "glass": 5283.04,
        "inserts": 5504.94
      },
      "16": {
        "solid": 3877.67,
        "glass": 4691.31,
        "inserts": 4913.21
      },
      "16.2": {
        "solid": 4857.72,
        "glass": 5671.36,
        "inserts": 5893.26
      },
      "16.4": {
        "solid": 4857.72,
        "glass": 5671.36,
        "inserts": 5893.26
      },
      "16.6": {
        "solid": 4857.72,
        "glass": 5671.36,
        "inserts": 5893.26
      },
      "16.8": {
        "solid": 4857.72,
        "glass": 5671.36,
        "inserts": 5893.26
      },
      "16.10": {
        "solid": 4857.72,
        "glass": 5671.36,
        "inserts": 5893.26
      },
      "17": {
        "solid": 4214.22,
        "glass": 5027.85,
        "inserts": 5249.75
      },
      "17.2": {
        "solid": 4994.56,
        "glass": 5808.19,
        "inserts": 6030.09
      },
      "17.4": {
        "solid": 4994.56,
        "glass": 5808.19,
        "inserts": 6030.09
      },
      "17.6": {
        "solid": 4994.56,
        "glass": 5808.19,
        "inserts": 6030.09
      },
      "17.8": {
        "solid": 4994.56,
        "glass": 5808.19,
        "inserts": 6030.09
      },
      "17.10": {
        "solid": 4994.56,
        "glass": 5808.19,
        "inserts": 6030.09
      },
      "18": {
        "solid": 4334.41,
        "glass": 5148.05,
        "inserts": 5369.95
      },
      "18.2": {
        "solid": 5196.12,
        "glass": 6009.75,
        "inserts": 6231.65
      },
      "18.4": {
        "solid": 5196.12,
        "glass": 6009.75,
        "inserts": 6231.65
      },
      "18.6": {
        "solid": 5196.12,
        "glass": 6009.75,
        "inserts": 6231.65
      },
      "18.8": {
        "solid": 5196.12,
        "glass": 6009.75,
        "inserts": 6231.65
      },
      "18.10": {
        "solid": 5196.12,
        "glass": 6009.75,
        "inserts": 6231.65
      },
      "19": {
        "solid": 4508.23,
        "glass": 5321.87,
        "inserts": 5543.77
      },
      "19.2": {
        "solid": 5403.22,
        "glass": 6420.26,
        "inserts": 6697.62
      },
      "19.4": {
        "solid": 5403.22,
        "glass": 6420.26,
        "inserts": 6697.62
      },
      "19.6": {
        "solid": 5403.22,
        "glass": 6420.26,
        "inserts": 6697.62
      },
      "19.8": {
        "solid": 5403.22,
        "glass": 6420.26,
        "inserts": 6697.62
      },
      "19.10": {
        "solid": 5403.22,
        "glass": 6420.26,
        "inserts": 6697.62
      },
      "20": {
        "solid": 4689.45,
        "glass": 5706.48,
        "inserts": 5983.85
      }
    },
    "8": {
      "7.8": {
        "solid": 2733.05,
        "glass": 3139.86,
        "inserts": 3250.81
      },
      "7.10": {
        "solid": 2733.05,
        "glass": 3139.86,
        "inserts": 3250.81
      },
      "8": {
        "solid": 2368.76,
        "glass": 2775.58,
        "inserts": 2886.53
      },
      "8.2": {
        "solid": 2888.38,
        "glass": 3295.19,
        "inserts": 3406.14
      },
      "8.4": {
        "solid": 2888.38,
        "glass": 3295.19,
        "inserts": 3406.14
      },
      "8.6": {
        "solid": 2888.38,
        "glass": 3295.19,
        "inserts": 3406.14
      },
      "8.8": {
        "solid": 2888.38,
        "glass": 3295.19,
        "inserts": 3406.14
      },
      "8.10": {
        "solid": 2888.38,
        "glass": 3295.19,
        "inserts": 3406.14
      },
      "9": {
        "solid": 2503.75,
        "glass": 2910.57,
        "inserts": 3021.52
      },
      "9.2": {
        "solid": 3187.94,
        "glass": 3594.76,
        "inserts": 3705.71
      },
      "9.4": {
        "solid": 3187.94,
        "glass": 3594.76,
        "inserts": 3705.71
      },
      "9.6": {
        "solid": 3187.94,
        "glass": 3594.76,
        "inserts": 3705.71
      },
      "9.8": {
        "solid": 3187.94,
        "glass": 3594.76,
        "inserts": 3705.71
      },
      "9.10": {
        "solid": 3187.94,
        "glass": 3594.76,
        "inserts": 3705.71
      },
      "10": {
        "solid": 2764.48,
        "glass": 3171.3,
        "inserts": 3282.25
      },
      "10.2": {
        "solid": 4419.47
      },
      "10.4": {
        "solid": 4419.47
      },
      "10.6": {
        "solid": 4419.47
      },
      "10.8": {
        "solid": 4419.47
      },
      "10.10": {
        "solid": 4419.47
      },
      "11": {
        "solid": 4419.47
      },
      "11.2": {
        "solid": 4419.47
      },
      "11.4": {
        "solid": 4419.47
      },
      "11.6": {
        "solid": 4419.47,
        "glass": 5029.69,
        "inserts": 5196.12
      },
      "11.8": {
        "solid": 4419.47,
        "glass": 5029.69,
        "inserts": 5196.12
      },
      "11.10": {
        "solid": 4419.47,
        "glass": 5029.69,
        "inserts": 5196.12
      },
      "12": {
        "solid": 3833.29,
        "glass": 4443.51,
        "inserts": 4609.94
      },
      "12.2": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "12.4": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "12.6": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "12.8": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "12.10": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "13": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "13.2": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "13.4": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "13.6": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "13.8": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "13.10": {
        "solid": 4807.8,
        "glass": 5418.01,
        "inserts": 5584.45
      },
      "14": {
        "solid": 4171.69,
        "glass": 4781.9,
        "inserts": 4948.34
      },
      "14.2": {
        "solid": 5011.2,
        "glass": 5621.42,
        "inserts": 5787.85
      },
      "14.4": {
        "solid": 5011.2,
        "glass": 5621.42,
        "inserts": 5787.85
      },
      "14.6": {
        "solid": 5011.2,
        "glass": 5621.42,
        "inserts": 5787.85
      },
      "14.8": {
        "solid": 5011.2
      },
      "14.10": {
        "solid": 5011.2,
        "glass": 5824.84,
        "inserts": 6046.74
      },
      "15": {
        "solid": 4347.36,
        "glass": 5160.99,
        "inserts": 5382.89
      },
      "15.2": {
        "solid": 5072.23,
        "glass": 5885.86,
        "inserts": 6107.76
      },
      "15.4": {
        "solid": 5072.23,
        "glass": 5885.86,
        "inserts": 6107.76
      },
      "15.6": {
        "solid": 4400.98,
        "glass": 5214.62,
        "inserts": 5436.52
      },
      "15.8": {
        "solid": 4400.98,
        "glass": 5214.62,
        "inserts": 5436.52
      },
      "15.10": {
        "solid": 5135.1,
        "glass": 5948.73,
        "inserts": 6170.63
      },
      "16": {
        "solid": 4456.46,
        "glass": 5270.09,
        "inserts": 5491.99
      },
      "16.2": {
        "solid": 5451.3,
        "glass": 6264.94,
        "inserts": 6486.84
      },
      "16.4": {
        "solid": 5451.3,
        "glass": 6264.94,
        "inserts": 6486.84
      },
      "16.6": {
        "solid": 5451.3,
        "glass": 6264.94,
        "inserts": 6486.84
      },
      "16.8": {
        "solid": 5451.3,
        "glass": 6264.94,
        "inserts": 6486.84
      },
      "16.10": {
        "solid": 5451.3,
        "glass": 6264.94,
        "inserts": 6486.84
      },
      "17": {
        "solid": 4730.13,
        "glass": 5543.77,
        "inserts": 5765.67
      },
      "17.2": {
        "solid": 5723.13,
        "glass": 6536.76,
        "inserts": 6758.66
      },
      "17.4": {
        "solid": 5723.13,
        "glass": 6536.76,
        "inserts": 6758.66
      },
      "17.6": {
        "solid": 5723.13,
        "glass": 6536.76,
        "inserts": 6758.66
      },
      "17.8": {
        "solid": 5723.13,
        "glass": 6536.76,
        "inserts": 6758.66
      },
      "17.10": {
        "solid": 5723.13,
        "glass": 6536.76,
        "inserts": 6758.66
      },
      "18": {
        "solid": 4966.82,
        "glass": 5780.46,
        "inserts": 6002.36
      },
      "18.2": {
        "solid": 5965.37,
        "glass": 6779.0,
        "inserts": 7000.9
      },
      "18.4": {
        "solid": 5965.37,
        "glass": 6779.0,
        "inserts": 7000.9
      },
      "18.6": {
        "solid": 5965.37,
        "glass": 6779.0,
        "inserts": 7000.9
      },
      "18.8": {
        "solid": 5965.37,
        "glass": 6779.0,
        "inserts": 7000.9
      },
      "18.10": {
        "solid": 5965.37,
        "glass": 6779.0,
        "inserts": 7000.9
      },
      "19": {
        "solid": 5177.63,
        "glass": 5991.26,
        "inserts": 6213.16
      },
      "19.2": {
        "solid": 6220.55,
        "glass": 7237.58,
        "inserts": 7514.95
      },
      "19.4": {
        "solid": 6220.55,
        "glass": 7237.58,
        "inserts": 7514.95
      },
      "19.6": {
        "solid": 6220.55,
        "glass": 7237.58,
        "inserts": 7514.95
      },
      "19.8": {
        "solid": 6220.55,
        "glass": 7237.58,
        "inserts": 7514.95
      },
      "19.10": {
        "solid": 6220.55,
        "glass": 7237.58,
        "inserts": 7514.95
      },
      "20": {
        "solid": 5399.53,
        "glass": 6416.56,
        "inserts": 6693.93
      }
    }
  },
  "GD2LP/GD2SP": {
    "7": {
      "6": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "6.2": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "6.4": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "6.6": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "6.8": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "6.10": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "7": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "7.2": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "7.4": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "7.6": {
        "solid": 1074.63,
        "glass": 1292.47,
        "inserts": 1351.87
      },
      "7.8": {
        "solid": 1074.63,
        "glass": 1365.07,
        "inserts": 1444.29
      },
      "7.10": {
        "solid": 1074.63,
        "glass": 1365.07,
        "inserts": 1444.29
      },
      "8": {
        "solid": 929.41,
        "glass": 1219.85,
        "inserts": 1299.06
      },
      "8.2": {
        "solid": 1164.4,
        "glass": 1454.84,
        "inserts": 1534.06
      },
      "8.4": {
        "solid": 1164.4,
        "glass": 1454.84,
        "inserts": 1534.06
      },
      "8.6": {
        "solid": 1164.4,
        "glass": 1454.84,
        "inserts": 1534.06
      },
      "8.8": {
        "solid": 1164.4,
        "glass": 1454.84,
        "inserts": 1534.06
      },
      "8.10": {
        "solid": 1164.4,
        "glass": 1454.84,
        "inserts": 1534.06
      },
      "9": {
        "solid": 1007.3,
        "glass": 1297.74,
        "inserts": 1376.96
      },
      "9.2": {
        "solid": 1308.3,
        "glass": 1598.74,
        "inserts": 1677.96
      },
      "9.4": {
        "solid": 1308.3,
        "glass": 1598.74,
        "inserts": 1677.96
      },
      "9.6": {
        "solid": 1308.3,
        "glass": 1598.74,
        "inserts": 1677.96
      },
      "9.8": {
        "solid": 1308.3,
        "glass": 1598.74,
        "inserts": 1677.96
      },
      "9.10": {
        "solid": 1308.3,
        "glass": 1598.74,
        "inserts": 1677.96
      },
      "10": {
        "solid": 1132.72,
        "glass": 1423.16,
        "inserts": 1502.37
      },
      "10.2": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "10.4": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "10.6": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "10.8": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "10.10": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "11": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "11.2": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "11.4": {
        "solid": 1584.22,
        "glass": 1874.66,
        "inserts": 1953.88
      },
      "11.6": {
        "solid": 1584.22,
        "glass": 2019.88,
        "inserts": 2138.69
      },
      "11.8": {
        "solid": 1584.22,
        "glass": 2019.88,
        "inserts": 2138.69
      },
      "11.10": {
        "solid": 1584.22,
        "glass": 2019.88,
        "inserts": 2138.69
      },
      "12": {
        "solid": 1370.35,
        "glass": 1806.01,
        "inserts": 1924.82
      },
      "12.2": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "12.4": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "12.6": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "12.8": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "12.10": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "13": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "13.2": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "13.4": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "13.6": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "13.8": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "13.10": {
        "solid": 1794.13,
        "glass": 2229.79,
        "inserts": 2348.6
      },
      "14": {
        "solid": 1553.86,
        "glass": 1989.51,
        "inserts": 2108.33
      },
      "14.2": {
        "solid": 1889.18,
        "glass": 2324.84,
        "inserts": 2443.66
      },
      "14.4": {
        "solid": 1889.18,
        "glass": 2324.84,
        "inserts": 2443.66
      },
      "14.6": {
        "solid": 1889.18,
        "glass": 2324.84,
        "inserts": 2443.66
      },
      "14.8": {
        "solid": 1889.18,
        "glass": 2324.84,
        "inserts": 2443.66
      },
      "14.10": {
        "solid": 1889.18,
        "glass": 2470.06,
        "inserts": 2628.49
      },
      "15": {
        "solid": 1635.71,
        "glass": 2216.58,
        "inserts": 2375.02
      },
      "15.2": {
        "solid": 1912.95,
        "glass": 2493.82,
        "inserts": 2652.26
      },
      "15.4": {
        "solid": 1912.95,
        "glass": 2493.82,
        "inserts": 2652.26
      },
      "15.6": {
        "solid": 1656.83,
        "glass": 2237.7,
        "inserts": 2396.14
      },
      "15.8": {
        "solid": 1656.83,
        "glass": 2237.7,
        "inserts": 2396.14
      },
      "15.10": {
        "solid": 1939.35,
        "glass": 2520.22,
        "inserts": 2678.66
      },
      "16": {
        "solid": 1679.28,
        "glass": 2260.15,
        "inserts": 2418.58
      },
      "16.2": {
        "solid": 2215.27,
        "glass": 2796.14,
        "inserts": 2954.58
      },
      "16.4": {
        "solid": 2215.27,
        "glass": 2796.14,
        "inserts": 2954.58
      },
      "16.6": {
        "solid": 2215.27,
        "glass": 2796.14,
        "inserts": 2954.58
      },
      "16.8": {
        "solid": 2215.27,
        "glass": 2796.14,
        "inserts": 2954.58
      },
      "16.10": {
        "solid": 2215.27,
        "glass": 2796.14,
        "inserts": 2954.58
      },
      "17": {
        "solid": 1919.55,
        "glass": 2500.42,
        "inserts": 2658.86
      },
      "17.2": {
        "solid": 2314.28,
        "glass": 2895.16,
        "inserts": 3053.59
      },
      "17.4": {
        "solid": 2314.28,
        "glass": 2895.16,
        "inserts": 3053.59
      },
      "17.6": {
        "solid": 2314.28,
        "glass": 2895.16,
        "inserts": 3053.59
      },
      "17.8": {
        "solid": 2314.28,
        "glass": 2895.16,
        "inserts": 3053.59
      },
      "17.10": {
        "solid": 2314.28,
        "glass": 2895.16,
        "inserts": 3053.59
      },
      "18": {
        "solid": 2005.36,
        "glass": 2586.23,
        "inserts": 2744.67
      },
      "18.2": {
        "solid": 2456.86,
        "glass": 3037.74,
        "inserts": 3196.17
      },
      "18.4": {
        "solid": 2456.86,
        "glass": 3037.74,
        "inserts": 3196.17
      },
      "18.6": {
        "solid": 2456.86,
        "glass": 3037.74,
        "inserts": 3196.17
      },
      "18.8": {
        "solid": 2456.86,
        "glass": 3037.74,
        "inserts": 3196.17
      },
      "18.10": {
        "solid": 2456.86,
        "glass": 3037.74,
        "inserts": 3196.17
      },
      "19": {
        "solid": 2129.46,
        "glass": 2710.33,
        "inserts": 2868.77
      },
      "19.2": {
        "solid": 2606.04,
        "glass": 3332.15,
        "inserts": 3530.17
      },
      "19.4": {
        "solid": 2606.04,
        "glass": 3332.15,
        "inserts": 3530.17
      },
      "19.6": {
        "solid": 2606.04,
        "glass": 3332.15,
        "inserts": 3530.17
      },
      "19.8": {
        "solid": 2606.04,
        "glass": 3332.15,
        "inserts": 3530.17
      },
      "19.10": {
        "solid": 2606.04,
        "glass": 3332.15,
        "inserts": 3530.17
      },
      "20": {
        "solid": 2258.84,
        "glass": 2984.95,
        "inserts": 3182.96
      }
    },
    "8": {
      "6": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "6.2": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "6.4": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "6.6": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "6.8": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "6.10": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "7": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "7.2": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "7.4": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "7.6": {
        "solid": 1289.82,
        "glass": 1507.66,
        "inserts": 1567.06
      },
      "7.8": {
        "solid": 1289.82,
        "glass": 1580.26,
        "inserts": 1659.48
      },
      "7.10": {
        "solid": 1289.82,
        "glass": 1580.26,
        "inserts": 1659.48
      },
      "8": {
        "solid": 1116.88,
        "glass": 1407.31,
        "inserts": 1486.53
      },
      "8.2": {
        "solid": 1400.72,
        "glass": 1691.15,
        "inserts": 1770.37
      },
      "8.4": {
        "solid": 1400.72,
        "glass": 1691.15,
        "inserts": 1770.37
      },
      "8.6": {
        "solid": 1400.72,
        "glass": 1691.15,
        "inserts": 1770.37
      },
      "8.8": {
        "solid": 1400.72,
        "glass": 1691.15,
        "inserts": 1770.37
      },
      "8.10": {
        "solid": 1400.72,
        "glass": 1691.15,
        "inserts": 1770.37
      },
      "9": {
        "solid": 1213.25,
        "glass": 1503.69,
        "inserts": 1582.9
      },
      "9.2": {
        "solid": 1615.91,
        "glass": 1906.34,
        "inserts": 1985.56
      },
      "9.4": {
        "solid": 1615.91,
        "glass": 1906.34,
        "inserts": 1985.56
      },
      "9.6": {
        "solid": 1615.91,
        "glass": 1906.34,
        "inserts": 1985.56
      },
      "9.8": {
        "solid": 1615.91,
        "glass": 1906.34,
        "inserts": 1985.56
      },
      "9.10": {
        "solid": 1615.91,
        "glass": 1906.34,
        "inserts": 1985.56
      },
      "10": {
        "solid": 1399.4,
        "glass": 1689.83,
        "inserts": 1769.05
      },
      "10.2": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "10.4": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "10.6": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "10.8": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "10.10": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "11": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "11.2": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "11.4": {
        "solid": 1890.5,
        "glass": 2180.94,
        "inserts": 2260.16
      },
      "11.6": {
        "solid": 1890.5,
        "glass": 2326.16,
        "inserts": 2444.98
      },
      "11.8": {
        "solid": 1890.5,
        "glass": 2326.16,
        "inserts": 2444.98
      },
      "11.10": {
        "solid": 1890.5,
        "glass": 2326.16,
        "inserts": 2444.98
      },
      "12": {
        "solid": 1637.03,
        "glass": 2072.68,
        "inserts": 2191.5
      },
      "12.2": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "12.4": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "12.6": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "12.8": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "12.10": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "13": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "13.2": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "13.4": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "13.6": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "13.8": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "13.10": {
        "solid": 2167.74,
        "glass": 2603.4,
        "inserts": 2722.22
      },
      "14": {
        "solid": 1878.62,
        "glass": 2314.28,
        "inserts": 2433.1
      },
      "14.2": {
        "solid": 2312.96,
        "glass": 2748.62,
        "inserts": 2867.44
      },
      "14.4": {
        "solid": 2312.96,
        "glass": 2748.62,
        "inserts": 2867.44
      },
      "14.6": {
        "solid": 2312.96,
        "glass": 2748.62,
        "inserts": 2867.44
      },
      "14.8": {
        "solid": 2312.96,
        "glass": 2748.62,
        "inserts": 2867.44
      },
      "14.10": {
        "solid": 2312.96,
        "glass": 2893.84,
        "inserts": 3052.27
      },
      "15": {
        "solid": 2004.04,
        "glass": 2584.91,
        "inserts": 2743.35
      },
      "15.2": {
        "solid": 2356.53,
        "glass": 2937.4,
        "inserts": 3095.84
      },
      "15.4": {
        "solid": 2356.53,
        "glass": 2937.4,
        "inserts": 3095.84
      },
      "15.6": {
        "solid": 2042.33,
        "glass": 2623.2,
        "inserts": 2781.64
      },
      "15.8": {
        "solid": 2042.33,
        "glass": 2623.2,
        "inserts": 2781.64
      },
      "15.10": {
        "solid": 2401.42,
        "glass": 2982.29,
        "inserts": 3140.73
      },
      "16": {
        "solid": 2081.93,
        "glass": 2662.8,
        "inserts": 2821.24
      },
      "16.2": {
        "solid": 2627.17,
        "glass": 3208.04,
        "inserts": 3366.48
      },
      "16.4": {
        "solid": 2627.17,
        "glass": 3208.04,
        "inserts": 3366.48
      },
      "16.6": {
        "solid": 2627.17,
        "glass": 3208.04,
        "inserts": 3366.48
      },
      "16.8": {
        "solid": 2627.17,
        "glass": 3208.04,
        "inserts": 3366.48
      },
      "16.10": {
        "solid": 2627.17,
        "glass": 3208.04,
        "inserts": 3366.48
      },
      "17": {
        "solid": 2277.32,
        "glass": 2858.19,
        "inserts": 3016.63
      },
      "17.2": {
        "solid": 2821.24,
        "glass": 3402.11,
        "inserts": 3560.54
      },
      "17.4": {
        "solid": 2821.24,
        "glass": 3402.11,
        "inserts": 3560.54
      },
      "17.6": {
        "solid": 2821.24,
        "glass": 3402.11,
        "inserts": 3560.54
      },
      "17.8": {
        "solid": 2821.24,
        "glass": 3402.11,
        "inserts": 3560.54
      },
      "17.10": {
        "solid": 2821.24,
        "glass": 3402.11,
        "inserts": 3560.54
      },
      "18": {
        "solid": 2446.3,
        "glass": 3027.18,
        "inserts": 3185.61
      },
      "18.2": {
        "solid": 2994.18,
        "glass": 3575.05,
        "inserts": 3733.49
      },
      "18.4": {
        "solid": 2994.18,
        "glass": 3575.05,
        "inserts": 3733.49
      },
      "18.6": {
        "solid": 2994.18,
        "glass": 3575.05,
        "inserts": 3733.49
      },
      "18.8": {
        "solid": 2994.18,
        "glass": 3575.05,
        "inserts": 3733.49
      },
      "18.10": {
        "solid": 2994.18,
        "glass": 3575.05,
        "inserts": 3733.49
      },
      "19": {
        "solid": 2596.8,
        "glass": 3177.68,
        "inserts": 3336.11
      },
      "19.2": {
        "solid": 3176.36,
        "glass": 3902.47,
        "inserts": 4100.49
      },
      "19.4": {
        "solid": 3176.36,
        "glass": 3902.47,
        "inserts": 4100.49
      },
      "19.6": {
        "solid": 3176.36,
        "glass": 3902.47,
        "inserts": 4100.49
      },
      "19.8": {
        "solid": 3176.36,
        "glass": 3902.47,
        "inserts": 4100.49
      },
      "19.10": {
        "solid": 3176.36,
        "glass": 3902.47,
        "inserts": 4100.49
      },
      "20": {
        "solid": 2755.23,
        "glass": 3481.33,
        "inserts": 3679.35
      }
    },
    "9": {
      "6": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.2": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.4": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.6": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.8": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.10": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.2": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.4": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.6": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.8": {
        "solid": 1732.08,
        "glass": 2022.52,
        "inserts": 2101.74
      },
      "7.10": {
        "solid": 1732.08,
        "glass": 2022.52,
        "inserts": 2101.74
      },
      "8": {
        "solid": 1506.33,
        "glass": 1796.77,
        "inserts": 1875.99
      },
      "8.2": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.4": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.6": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.8": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.10": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "9": {
        "solid": 1601.38,
        "glass": 1891.82,
        "inserts": 1971.04
      },
      "9.2": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.4": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.6": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.8": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.10": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "10": {
        "solid": 1757.17,
        "glass": 2047.6,
        "inserts": 2126.82
      },
      "10.2": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.4": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.6": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.8": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.10": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11.2": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11.4": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11.6": {
        "solid": 2425.18,
        "glass": 2860.83,
        "inserts": 2979.65
      },
      "11.8": {
        "solid": 2425.18,
        "glass": 2860.83,
        "inserts": 2979.65
      },
      "11.10": {
        "solid": 2425.18,
        "glass": 2860.83,
        "inserts": 2979.65
      },
      "12": {
        "solid": 2108.34,
        "glass": 2543.99,
        "inserts": 2662.81
      },
      "12.2": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.4": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.6": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.8": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.10": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.2": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.4": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.6": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.8": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.10": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "14": {
        "solid": 2361.81,
        "glass": 2797.47,
        "inserts": 2916.28
      },
      "14.2": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.4": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.6": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.8": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.10": {
        "solid": 2851.6,
        "glass": 3432.47,
        "inserts": 3590.91
      },
      "15": {
        "solid": 2479.31,
        "glass": 3060.18,
        "inserts": 3218.62
      },
      "15.2": {
        "solid": 3177.69,
        "glass": 3758.56,
        "inserts": 3916.99
      },
      "15.4": {
        "solid": 3177.69,
        "glass": 3758.56,
        "inserts": 3916.99
      },
      "15.6": {
        "solid": 2763.15,
        "glass": 3344.02,
        "inserts": 3502.46
      },
      "15.8": {
        "solid": 2763.15,
        "glass": 3344.02,
        "inserts": 3502.46
      },
      "15.10": {
        "solid": 3177.69,
        "glass": 3758.56,
        "inserts": 3916.99
      },
      "16": {
        "solid": 2763.15,
        "glass": 3344.02,
        "inserts": 3502.46
      },
      "16.2": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.4": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.6": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.8": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.10": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "17": {
        "solid": 3148.64,
        "glass": 3729.51,
        "inserts": 3887.95
      },
      "17.2": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.4": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.6": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.8": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.10": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "18": {
        "solid": 3305.74,
        "glass": 3886.62,
        "inserts": 4045.05
      },
      "18.2": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.4": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.6": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.8": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.10": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "19": {
        "solid": 3503.77,
        "glass": 4084.64,
        "inserts": 4243.08
      },
      "19.2": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.4": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.6": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.8": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.10": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "20": {
        "solid": 3713.68,
        "glass": 4439.79,
        "inserts": 4637.81
      }
    },
    "10": {
      "6": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.2": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.4": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.6": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.8": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "6.10": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.2": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.4": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.6": {
        "solid": 1732.08,
        "glass": 1949.92,
        "inserts": 2009.32
      },
      "7.8": {
        "solid": 1732.08,
        "glass": 2022.52,
        "inserts": 2101.74
      },
      "7.10": {
        "solid": 1732.08,
        "glass": 2022.52,
        "inserts": 2101.74
      },
      "8": {
        "solid": 1506.33,
        "glass": 1796.77,
        "inserts": 1875.99
      },
      "8.2": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.4": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.6": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.8": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "8.10": {
        "solid": 1841.66,
        "glass": 2132.09,
        "inserts": 2211.31
      },
      "9": {
        "solid": 1601.38,
        "glass": 1891.82,
        "inserts": 1971.04
      },
      "9.2": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.4": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.6": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.8": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "9.10": {
        "solid": 2021.2,
        "glass": 2311.64,
        "inserts": 2390.86
      },
      "10": {
        "solid": 1757.17,
        "glass": 2047.6,
        "inserts": 2126.82
      },
      "10.2": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.4": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.6": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.8": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "10.10": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11.2": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11.4": {
        "solid": 2425.18,
        "glass": 2715.62,
        "inserts": 2794.83
      },
      "11.6": {
        "solid": 2425.18,
        "glass": 2860.83,
        "inserts": 2979.65
      },
      "11.8": {
        "solid": 2425.18,
        "glass": 2860.83,
        "inserts": 2979.65
      },
      "11.10": {
        "solid": 2425.18,
        "glass": 2860.83,
        "inserts": 2979.65
      },
      "12": {
        "solid": 2108.34,
        "glass": 2543.99,
        "inserts": 2662.81
      },
      "12.2": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.4": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.6": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.8": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "12.10": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.2": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.4": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.6": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.8": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "13.10": {
        "solid": 2715.62,
        "glass": 3151.27,
        "inserts": 3270.09
      },
      "14": {
        "solid": 2361.81,
        "glass": 2797.47,
        "inserts": 2916.28
      },
      "14.2": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.4": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.6": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.8": {
        "solid": 2851.6,
        "glass": 3287.25,
        "inserts": 3406.07
      },
      "14.10": {
        "solid": 2851.6,
        "glass": 3432.47,
        "inserts": 3590.91
      },
      "15": {
        "solid": 2479.31,
        "glass": 3060.18,
        "inserts": 3218.62
      },
      "15.2": {
        "solid": 3177.69,
        "glass": 3758.56,
        "inserts": 3916.99
      },
      "15.4": {
        "solid": 3177.69,
        "glass": 3758.56,
        "inserts": 3916.99
      },
      "15.6": {
        "solid": 2763.15,
        "glass": 3344.02,
        "inserts": 3502.46
      },
      "15.8": {
        "solid": 2763.15,
        "glass": 3344.02,
        "inserts": 3502.46
      },
      "15.10": {
        "solid": 3177.69,
        "glass": 3758.56,
        "inserts": 3916.99
      },
      "16": {
        "solid": 2763.15,
        "glass": 3344.02,
        "inserts": 3502.46
      },
      "16.2": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.4": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.6": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.8": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "16.10": {
        "solid": 3621.27,
        "glass": 4202.14,
        "inserts": 4360.58
      },
      "17": {
        "solid": 3148.64,
        "glass": 3729.51,
        "inserts": 3887.95
      },
      "17.2": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.4": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.6": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.8": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "17.10": {
        "solid": 3802.13,
        "glass": 4383.01,
        "inserts": 4541.44
      },
      "18": {
        "solid": 3305.74,
        "glass": 3886.62,
        "inserts": 4045.05
      },
      "18.2": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.4": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.6": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.8": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "18.10": {
        "solid": 4029.2,
        "glass": 4610.08,
        "inserts": 4768.51
      },
      "19": {
        "solid": 3503.77,
        "glass": 4084.64,
        "inserts": 4243.08
      },
      "19.2": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.4": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.6": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.8": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "19.10": {
        "solid": 4270.8,
        "glass": 4996.91,
        "inserts": 5194.93
      },
      "20": {
        "solid": 3713.68,
        "glass": 4439.79,
        "inserts": 4637.81
      }
    }
  },
  "GD1LU/GD1SU": {
    "7": {
      "6": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "6.2": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "6.4": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "6.6": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "6.8": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "6.10": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "7": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "7.2": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "7.4": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "7.6": {
        "solid": 1055.81,
        "glass": 1320.16,
        "inserts": 1392.27
      },
      "7.8": {
        "solid": 1055.81,
        "glass": 1408.28,
        "inserts": 1504.41
      },
      "7.10": {
        "solid": 1055.81,
        "glass": 1408.28,
        "inserts": 1504.41
      },
      "8": {
        "solid": 911.62,
        "glass": 1264.09,
        "inserts": 1360.21
      },
      "8.2": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.4": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.6": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.8": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "8.10": {
        "solid": 1140.72,
        "glass": 1493.2,
        "inserts": 1589.32
      },
      "9": {
        "solid": 985.32,
        "glass": 1337.79,
        "inserts": 1433.91
      },
      "9.2": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.4": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.6": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.8": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "9.10": {
        "solid": 1292.93,
        "glass": 1645.4,
        "inserts": 1741.52
      },
      "10": {
        "solid": 1118.29,
        "glass": 1470.77,
        "inserts": 1566.89
      },
      "10.2": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "10.4": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "10.6": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "10.8": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "10.10": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "11": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "11.2": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "11.4": {
        "solid": 1512.42,
        "glass": 1864.89,
        "inserts": 1961.02
      },
      "11.6": {
        "solid": 1512.42,
        "glass": 2041.12,
        "inserts": 2185.32
      },
      "11.8": {
        "solid": 1512.42,
        "glass": 2041.12,
        "inserts": 2185.32
      },
      "11.10": {
        "solid": 1512.42,
        "glass": 2041.12,
        "inserts": 2185.32
      },
      "12": {
        "solid": 1307.35,
        "glass": 1836.05,
        "inserts": 1980.24
      },
      "12.2": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.4": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.6": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.8": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "12.10": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.2": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.4": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.6": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.8": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "13.10": {
        "solid": 1776.77,
        "glass": 2305.48,
        "inserts": 2449.67
      },
      "14": {
        "solid": 1536.45,
        "glass": 2065.15,
        "inserts": 2209.35
      },
      "14.2": {
        "solid": 1863.29,
        "glass": 2391.99,
        "inserts": 2536.18
      },
      "14.4": {
        "solid": 1863.29,
        "glass": 2391.99,
        "inserts": 2536.18
      },
      "14.6": {
        "solid": 1863.29,
        "glass": 2391.99,
        "inserts": 2536.18
      },
      "14.8": {
        "solid": 1863.29,
        "glass": 2391.99,
        "inserts": 2536.18
      },
      "14.10": {
        "solid": 1863.29,
        "glass": 2568.24,
        "inserts": 2760.48
      },
      "15": {
        "solid": 1611.75,
        "glass": 2316.7,
        "inserts": 2508.95
      },
      "15.2": {
        "solid": 1882.52,
        "glass": 2587.46,
        "inserts": 2779.71
      },
      "15.4": {
        "solid": 1882.52,
        "glass": 2587.46,
        "inserts": 2779.71
      },
      "15.6": {
        "solid": 1629.38,
        "glass": 2334.32,
        "inserts": 2526.57
      },
      "15.8": {
        "solid": 1629.38,
        "glass": 2334.32,
        "inserts": 2526.57
      },
      "15.10": {
        "solid": 1895.33,
        "glass": 2600.28,
        "inserts": 2792.53
      },
      "16": {
        "solid": 1640.59,
        "glass": 2345.54,
        "inserts": 2537.79
      },
      "16.2": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.4": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.6": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.8": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "16.10": {
        "solid": 2186.92,
        "glass": 2891.87,
        "inserts": 3084.12
      },
      "17": {
        "solid": 1893.73,
        "glass": 2598.68,
        "inserts": 2790.92
      },
      "17.2": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.4": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.6": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.8": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "17.10": {
        "solid": 2287.86,
        "glass": 2992.8,
        "inserts": 3185.05
      },
      "18": {
        "solid": 1981.85,
        "glass": 2686.8,
        "inserts": 2879.04
      }
    },
    "8": {
      "6": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "6.2": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "6.4": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "6.6": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "6.8": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "6.10": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "7": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "7.2": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "7.4": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "7.6": {
        "solid": 1275.3,
        "glass": 1539.66,
        "inserts": 1611.76
      },
      "7.8": {
        "solid": 1275.3,
        "glass": 1627.78,
        "inserts": 1723.9
      },
      "7.10": {
        "solid": 1275.3,
        "glass": 1627.78,
        "inserts": 1723.9
      },
      "8": {
        "solid": 1102.27,
        "glass": 1454.75,
        "inserts": 1550.87
      },
      "8.2": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.4": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.6": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.8": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "8.10": {
        "solid": 1389.06,
        "glass": 1741.53,
        "inserts": 1837.65
      },
      "9": {
        "solid": 1201.61,
        "glass": 1554.08,
        "inserts": 1650.2
      },
      "9.2": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.4": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.6": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.8": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "9.10": {
        "solid": 1597.33,
        "glass": 1949.81,
        "inserts": 2045.93
      },
      "10": {
        "solid": 1382.65,
        "glass": 1735.12,
        "inserts": 1831.24
      },
      "10.2": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "10.4": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "10.6": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "10.8": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "10.10": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "11": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "11.2": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "11.4": {
        "solid": 1866.49,
        "glass": 2218.97,
        "inserts": 2315.09
      },
      "11.6": {
        "solid": 1866.49,
        "glass": 2395.2,
        "inserts": 2539.39
      },
      "11.8": {
        "solid": 1866.49,
        "glass": 2395.2,
        "inserts": 2539.39
      },
      "11.10": {
        "solid": 1866.49,
        "glass": 2395.2,
        "inserts": 2539.39
      },
      "12": {
        "solid": 1614.96,
        "glass": 2143.66,
        "inserts": 2287.85
      },
      "12.2": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.4": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.6": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.8": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "12.10": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.2": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.4": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.6": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.8": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "13.10": {
        "solid": 2140.46,
        "glass": 2669.16,
        "inserts": 2813.36
      },
      "14": {
        "solid": 1853.68,
        "glass": 2382.38,
        "inserts": 2526.57
      },
      "14.2": {
        "solid": 2286.26,
        "glass": 2814.96,
        "inserts": 2959.15
      },
      "14.4": {
        "solid": 2286.26,
        "glass": 2814.96,
        "inserts": 2959.15
      },
      "14.6": {
        "solid": 2286.26,
        "glass": 2814.96,
        "inserts": 2959.15
      },
      "14.8": {
        "solid": 2286.26,
        "glass": 2814.96,
        "inserts": 2959.15
      },
      "14.10": {
        "solid": 2286.26,
        "glass": 2991.2,
        "inserts": 3183.45
      },
      "15": {
        "solid": 1980.25,
        "glass": 2685.19,
        "inserts": 2877.44
      },
      "15.2": {
        "solid": 2319.9,
        "glass": 3024.85,
        "inserts": 3217.09
      },
      "15.4": {
        "solid": 2319.9,
        "glass": 3024.85,
        "inserts": 3217.09
      },
      "15.6": {
        "solid": 2009.08,
        "glass": 2714.03,
        "inserts": 2906.28
      },
      "15.8": {
        "solid": 2009.08,
        "glass": 2714.03,
        "inserts": 2906.28
      },
      "15.10": {
        "solid": 2377.58,
        "glass": 3082.52,
        "inserts": 3274.77
      },
      "16": {
        "solid": 2058.75,
        "glass": 2763.7,
        "inserts": 2955.94
      },
      "16.2": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.4": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.6": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.8": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "16.10": {
        "solid": 2593.87,
        "glass": 3298.81,
        "inserts": 3491.06
      },
      "17": {
        "solid": 2247.8,
        "glass": 2952.75,
        "inserts": 3145.0
      },
      "17.2": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.4": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.6": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.8": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "17.10": {
        "solid": 2789.33,
        "glass": 3494.27,
        "inserts": 3686.52
      },
      "18": {
        "solid": 2417.63,
        "glass": 3122.58,
        "inserts": 3314.82
      }
    },
    "9": {
      "6": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.2": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.4": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.6": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.8": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.10": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.2": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.4": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.6": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.8": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "7.10": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "8": {
        "solid": 1554.08,
        "glass": 1906.55,
        "inserts": 2002.67
      },
      "8.2": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.4": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.6": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.8": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.10": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "9": {
        "solid": 1675.84,
        "glass": 2028.31,
        "inserts": 2124.44
      },
      "9.2": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.4": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.6": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.8": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.10": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "10": {
        "solid": 1938.59,
        "glass": 2291.06,
        "inserts": 2387.19
      },
      "10.2": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.4": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.6": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.8": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.10": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11.2": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11.4": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11.6": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.8": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.10": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "12": {
        "solid": 2326.31,
        "glass": 2855.01,
        "inserts": 2999.2
      },
      "12.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "14": {
        "solid": 2605.08,
        "glass": 3133.78,
        "inserts": 3277.98
      },
      "14.2": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.4": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.6": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.8": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.10": {
        "solid": 3145.0,
        "glass": 3849.95,
        "inserts": 4042.2
      },
      "15": {
        "solid": 2734.85,
        "glass": 3439.8,
        "inserts": 3632.05
      },
      "15.2": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.4": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.6": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.8": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.10": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "16": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "16.2": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.4": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.6": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.8": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.10": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "17": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "17.2": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.4": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.6": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.8": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.10": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "18": {
        "solid": 3483.05,
        "glass": 4188.0,
        "inserts": 4380.25
      }
    },
    "10": {
      "6": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.2": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.4": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.6": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.8": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "6.10": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.2": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.4": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.6": {
        "solid": 1787.99,
        "glass": 2052.34,
        "inserts": 2124.45
      },
      "7.8": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "7.10": {
        "solid": 1787.99,
        "glass": 2140.46,
        "inserts": 2236.59
      },
      "8": {
        "solid": 1554.08,
        "glass": 1906.55,
        "inserts": 2002.67
      },
      "8.2": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.4": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.6": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.8": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "8.10": {
        "solid": 1927.38,
        "glass": 2279.85,
        "inserts": 2375.97
      },
      "9": {
        "solid": 1675.84,
        "glass": 2028.31,
        "inserts": 2124.44
      },
      "9.2": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.4": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.6": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.8": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "9.10": {
        "solid": 2230.18,
        "glass": 2582.65,
        "inserts": 2678.78
      },
      "10": {
        "solid": 1938.59,
        "glass": 2291.06,
        "inserts": 2387.19
      },
      "10.2": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.4": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.6": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.8": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "10.10": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11.2": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11.4": {
        "solid": 2675.58,
        "glass": 3028.05,
        "inserts": 3124.17
      },
      "11.6": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.8": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "11.10": {
        "solid": 2675.58,
        "glass": 3204.28,
        "inserts": 3348.47
      },
      "12": {
        "solid": 2326.31,
        "glass": 2855.01,
        "inserts": 2999.2
      },
      "12.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "12.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.2": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.4": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.6": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.8": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "13.10": {
        "solid": 2996.0,
        "glass": 3524.71,
        "inserts": 3668.9
      },
      "14": {
        "solid": 2605.08,
        "glass": 3133.78,
        "inserts": 3277.98
      },
      "14.2": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.4": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.6": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.8": {
        "solid": 3145.0,
        "glass": 3673.7,
        "inserts": 3817.9
      },
      "14.10": {
        "solid": 3145.0,
        "glass": 3849.95,
        "inserts": 4042.2
      },
      "15": {
        "solid": 2734.85,
        "glass": 3439.8,
        "inserts": 3632.05
      },
      "15.2": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.4": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "15.6": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.8": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "15.10": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "16": {
        "solid": 2885.46,
        "glass": 3590.4,
        "inserts": 3782.65
      },
      "16.2": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.4": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.6": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.8": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "16.10": {
        "solid": 3816.3,
        "glass": 4521.25,
        "inserts": 4713.49
      },
      "17": {
        "solid": 3318.03,
        "glass": 4022.98,
        "inserts": 4215.23
      },
      "17.2": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.4": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.6": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.8": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "17.10": {
        "solid": 4005.35,
        "glass": 4710.3,
        "inserts": 4902.55
      },
      "18": {
        "solid": 3483.05,
        "glass": 4188.0,
        "inserts": 4380.25
      }
    }
  },
  "GD2LU/GD2SU": {
    "7": {
      "6": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "6.2": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "6.4": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "6.6": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "6.8": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "6.10": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "7": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "7.2": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "7.4": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "7.6": {
        "solid": 1238.68,
        "glass": 1489.78,
        "inserts": 1558.25
      },
      "7.8": {
        "solid": 1238.68,
        "glass": 1573.47,
        "inserts": 1664.78
      },
      "7.10": {
        "solid": 1238.68,
        "glass": 1573.47,
        "inserts": 1664.78
      },
      "8": {
        "solid": 1071.29,
        "glass": 1406.08,
        "inserts": 1497.39
      },
      "8.2": {
        "solid": 1342.16,
        "glass": 1676.94,
        "inserts": 1768.25
      },
      "8.4": {
        "solid": 1342.16,
        "glass": 1676.94,
        "inserts": 1768.25
      },
      "8.6": {
        "solid": 1342.16,
        "glass": 1676.94,
        "inserts": 1768.25
      },
      "8.8": {
        "solid": 1342.16,
        "glass": 1676.94,
        "inserts": 1768.25
      },
      "8.10": {
        "solid": 1342.16,
        "glass": 1676.94,
        "inserts": 1768.25
      },
      "9": {
        "solid": 1161.08,
        "glass": 1495.86,
        "inserts": 1587.17
      },
      "9.2": {
        "solid": 1508.03,
        "glass": 1842.81,
        "inserts": 1934.12
      },
      "9.4": {
        "solid": 1508.03,
        "glass": 1842.81,
        "inserts": 1934.12
      },
      "9.6": {
        "solid": 1508.03,
        "glass": 1842.81,
        "inserts": 1934.12
      },
      "9.8": {
        "solid": 1508.03,
        "glass": 1842.81,
        "inserts": 1934.12
      },
      "9.10": {
        "solid": 1508.03,
        "glass": 1842.81,
        "inserts": 1934.12
      },
      "10": {
        "solid": 1305.64,
        "glass": 1640.42,
        "inserts": 1731.73
      },
      "10.2": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "10.4": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "10.6": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "10.8": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "10.10": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "11": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "11.2": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "11.4": {
        "solid": 1826.07,
        "glass": 2160.85,
        "inserts": 2252.16
      },
      "11.6": {
        "solid": 1826.07,
        "glass": 2328.23,
        "inserts": 2465.2
      },
      "11.8": {
        "solid": 1826.07,
        "glass": 2328.23,
        "inserts": 2465.2
      },
      "11.10": {
        "solid": 1826.07,
        "glass": 2328.23,
        "inserts": 2465.2
      },
      "12": {
        "solid": 1579.55,
        "glass": 2081.71,
        "inserts": 2218.68
      },
      "12.2": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "12.4": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "12.6": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "12.8": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "12.10": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "13": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "13.2": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "13.4": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "13.6": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "13.8": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "13.10": {
        "solid": 2068.03,
        "glass": 2570.19,
        "inserts": 2707.15
      },
      "14": {
        "solid": 1791.07,
        "glass": 2293.23,
        "inserts": 2430.2
      },
      "14.2": {
        "solid": 2177.59,
        "glass": 2679.75,
        "inserts": 2816.72
      },
      "14.4": {
        "solid": 2177.59,
        "glass": 2679.75,
        "inserts": 2816.72
      },
      "14.6": {
        "solid": 2177.59,
        "glass": 2679.75,
        "inserts": 2816.72
      },
      "14.8": {
        "solid": 2177.59,
        "glass": 2679.75,
        "inserts": 2816.72
      },
      "14.10": {
        "solid": 2177.59,
        "glass": 2847.15,
        "inserts": 3029.75
      },
      "15": {
        "solid": 1885.42,
        "glass": 2554.98,
        "inserts": 2737.58
      },
      "15.2": {
        "solid": 2204.98,
        "glass": 2874.54,
        "inserts": 3057.14
      },
      "15.4": {
        "solid": 2204.98,
        "glass": 2874.54,
        "inserts": 3057.14
      },
      "15.6": {
        "solid": 1909.77,
        "glass": 2579.33,
        "inserts": 2761.93
      },
      "15.8": {
        "solid": 1909.77,
        "glass": 2579.33,
        "inserts": 2761.93
      },
      "15.10": {
        "solid": 2235.42,
        "glass": 2904.98,
        "inserts": 3087.58
      },
      "16": {
        "solid": 1935.64,
        "glass": 2605.2,
        "inserts": 2787.8
      },
      "16.2": {
        "solid": 2553.46,
        "glass": 3223.02,
        "inserts": 3405.62
      },
      "16.4": {
        "solid": 2553.46,
        "glass": 3223.02,
        "inserts": 3405.62
      },
      "16.6": {
        "solid": 2553.46,
        "glass": 3223.02,
        "inserts": 3405.62
      },
      "16.8": {
        "solid": 2553.46,
        "glass": 3223.02,
        "inserts": 3405.62
      },
      "16.10": {
        "solid": 2553.46,
        "glass": 3223.02,
        "inserts": 3405.62
      },
      "17": {
        "solid": 2212.59,
        "glass": 2882.15,
        "inserts": 3064.75
      },
      "17.2": {
        "solid": 2667.59,
        "glass": 3337.15,
        "inserts": 3519.75
      },
      "17.4": {
        "solid": 2667.59,
        "glass": 3337.15,
        "inserts": 3519.75
      },
      "17.6": {
        "solid": 2667.59,
        "glass": 3337.15,
        "inserts": 3519.75
      },
      "17.8": {
        "solid": 2667.59,
        "glass": 3337.15,
        "inserts": 3519.75
      },
      "17.10": {
        "solid": 2667.59,
        "glass": 3337.15,
        "inserts": 3519.75
      },
      "18": {
        "solid": 2311.5,
        "glass": 2981.07,
        "inserts": 3163.67
      },
      "18.2": {
        "solid": 2831.93,
        "glass": 3501.5,
        "inserts": 3684.1
      },
      "18.4": {
        "solid": 2831.93,
        "glass": 3501.5,
        "inserts": 3684.1
      },
      "18.6": {
        "solid": 2831.93,
        "glass": 3501.5,
        "inserts": 3684.1
      },
      "18.8": {
        "solid": 2831.93,
        "glass": 3501.5,
        "inserts": 3684.1
      },
      "18.10": {
        "solid": 2831.93,
        "glass": 3501.5,
        "inserts": 3684.1
      },
      "19": {
        "solid": 2454.54,
        "glass": 3124.11,
        "inserts": 3306.71
      },
      "19.2": {
        "solid": 3003.89,
        "glass": 3840.83,
        "inserts": 4069.09
      },
      "19.4": {
        "solid": 3003.89,
        "glass": 3840.83,
        "inserts": 4069.09
      },
      "19.6": {
        "solid": 3003.89,
        "glass": 3840.83,
        "inserts": 4069.09
      },
      "19.8": {
        "solid": 3003.89,
        "glass": 3840.83,
        "inserts": 4069.09
      },
      "19.10": {
        "solid": 3003.89,
        "glass": 3840.83,
        "inserts": 4069.09
      },
      "20": {
        "solid": 2603.67,
        "glass": 3440.62,
        "inserts": 3668.87
      }
    },
    "8": {
      "6": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "6.2": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "6.4": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "6.6": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "6.8": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "6.10": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "7": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "7.2": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "7.4": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "7.6": {
        "solid": 1486.73,
        "glass": 1737.82,
        "inserts": 1806.29
      },
      "7.8": {
        "solid": 1486.73,
        "glass": 1821.51,
        "inserts": 1912.82
      },
      "7.10": {
        "solid": 1486.73,
        "glass": 1821.51,
        "inserts": 1912.82
      },
      "8": {
        "solid": 1287.38,
        "glass": 1622.16,
        "inserts": 1713.47
      },
      "8.2": {
        "solid": 1614.55,
        "glass": 1949.33,
        "inserts": 2040.64
      },
      "8.4": {
        "solid": 1614.55,
        "glass": 1949.33,
        "inserts": 2040.64
      },
      "8.6": {
        "solid": 1614.55,
        "glass": 1949.33,
        "inserts": 2040.64
      },
      "8.8": {
        "solid": 1614.55,
        "glass": 1949.33,
        "inserts": 2040.64
      },
      "8.10": {
        "solid": 1614.55,
        "glass": 1949.33,
        "inserts": 2040.64
      },
      "9": {
        "solid": 1398.47,
        "glass": 1733.25,
        "inserts": 1824.56
      },
      "9.2": {
        "solid": 1862.59,
        "glass": 2197.37,
        "inserts": 2288.68
      },
      "9.4": {
        "solid": 1862.59,
        "glass": 2197.37,
        "inserts": 2288.68
      },
      "9.6": {
        "solid": 1862.59,
        "glass": 2197.37,
        "inserts": 2288.68
      },
      "9.8": {
        "solid": 1862.59,
        "glass": 2197.37,
        "inserts": 2288.68
      },
      "9.10": {
        "solid": 1862.59,
        "glass": 2197.37,
        "inserts": 2288.68
      },
      "10": {
        "solid": 1613.03,
        "glass": 1947.81,
        "inserts": 2039.12
      },
      "10.2": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "10.4": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "10.6": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "10.8": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "10.10": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "11": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "11.2": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "11.4": {
        "solid": 2179.11,
        "glass": 2513.89,
        "inserts": 2605.2
      },
      "11.6": {
        "solid": 2179.11,
        "glass": 2681.27,
        "inserts": 2818.24
      },
      "11.8": {
        "solid": 2179.11,
        "glass": 2681.27,
        "inserts": 2818.24
      },
      "11.10": {
        "solid": 2179.11,
        "glass": 2681.27,
        "inserts": 2818.24
      },
      "12": {
        "solid": 1886.94,
        "glass": 2389.1,
        "inserts": 2526.07
      },
      "12.2": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "12.4": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "12.6": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "12.8": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "12.10": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "13": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "13.2": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "13.4": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "13.6": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "13.8": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "13.10": {
        "solid": 2498.67,
        "glass": 3000.84,
        "inserts": 3137.8
      },
      "14": {
        "solid": 2165.42,
        "glass": 2667.58,
        "inserts": 2804.54
      },
      "14.2": {
        "solid": 2666.06,
        "glass": 3168.23,
        "inserts": 3305.19
      },
      "14.4": {
        "solid": 2666.06,
        "glass": 3168.23,
        "inserts": 3305.19
      },
      "14.6": {
        "solid": 2666.06,
        "glass": 3168.23,
        "inserts": 3305.19
      },
      "14.8": {
        "solid": 2666.06,
        "glass": 3168.23,
        "inserts": 3305.19
      },
      "14.10": {
        "solid": 2666.06,
        "glass": 3335.63,
        "inserts": 3518.23
      },
      "15": {
        "solid": 2309.98,
        "glass": 2979.54,
        "inserts": 3162.14
      },
      "15.2": {
        "solid": 2716.28,
        "glass": 3385.84,
        "inserts": 3568.44
      },
      "15.4": {
        "solid": 2716.28,
        "glass": 3385.84,
        "inserts": 3568.44
      },
      "15.6": {
        "solid": 2354.11,
        "glass": 3023.67,
        "inserts": 3206.27
      },
      "15.8": {
        "solid": 2354.11,
        "glass": 3023.67,
        "inserts": 3206.27
      },
      "15.10": {
        "solid": 2768.02,
        "glass": 3437.58,
        "inserts": 3620.18
      },
      "16": {
        "solid": 2399.76,
        "glass": 3069.33,
        "inserts": 3251.93
      },
      "16.2": {
        "solid": 3028.23,
        "glass": 3697.8,
        "inserts": 3880.4
      },
      "16.4": {
        "solid": 3028.23,
        "glass": 3697.8,
        "inserts": 3880.4
      },
      "16.6": {
        "solid": 3028.23,
        "glass": 3697.8,
        "inserts": 3880.4
      },
      "16.8": {
        "solid": 3028.23,
        "glass": 3697.8,
        "inserts": 3880.4
      },
      "16.10": {
        "solid": 3028.23,
        "glass": 3697.8,
        "inserts": 3880.4
      },
      "17": {
        "solid": 2624.98,
        "glass": 3294.54,
        "inserts": 3477.14
      },
      "17.2": {
        "solid": 3251.93,
        "glass": 3921.49,
        "inserts": 4104.09
      },
      "17.4": {
        "solid": 3251.93,
        "glass": 3921.49,
        "inserts": 4104.09
      },
      "17.6": {
        "solid": 3251.93,
        "glass": 3921.49,
        "inserts": 4104.09
      },
      "17.8": {
        "solid": 3251.93,
        "glass": 3921.49,
        "inserts": 4104.09
      },
      "17.10": {
        "solid": 3251.93,
        "glass": 3921.49,
        "inserts": 4104.09
      },
      "18": {
        "solid": 2819.76,
        "glass": 3489.32,
        "inserts": 3671.92
      },
      "18.2": {
        "solid": 3451.27,
        "glass": 4120.84,
        "inserts": 4303.44
      },
      "18.4": {
        "solid": 3451.27,
        "glass": 4120.84,
        "inserts": 4303.44
      },
      "18.6": {
        "solid": 3451.27,
        "glass": 4120.84,
        "inserts": 4303.44
      },
      "18.8": {
        "solid": 3451.27,
        "glass": 4120.84,
        "inserts": 4303.44
      },
      "18.10": {
        "solid": 3451.27,
        "glass": 4120.84,
        "inserts": 4303.44
      },
      "19": {
        "solid": 2993.23,
        "glass": 3662.8,
        "inserts": 3845.4
      },
      "19.2": {
        "solid": 3661.27,
        "glass": 4498.22,
        "inserts": 4726.47
      },
      "19.4": {
        "solid": 3661.27,
        "glass": 4498.22,
        "inserts": 4726.47
      },
      "19.6": {
        "solid": 3661.27,
        "glass": 4498.22,
        "inserts": 4726.47
      },
      "19.8": {
        "solid": 3661.27,
        "glass": 4498.22,
        "inserts": 4726.47
      },
      "19.10": {
        "solid": 3661.27,
        "glass": 4498.22,
        "inserts": 4726.47
      },
      "20": {
        "solid": 3175.84,
        "glass": 4012.79,
        "inserts": 4241.04
      }
    },
    "9": {
      "6": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.2": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.4": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.6": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.8": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.10": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.2": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.4": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.6": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.8": {
        "solid": 1996.5,
        "glass": 2331.29,
        "inserts": 2422.6
      },
      "7.10": {
        "solid": 1996.5,
        "glass": 2331.29,
        "inserts": 2422.6
      },
      "8": {
        "solid": 1736.29,
        "glass": 2071.07,
        "inserts": 2162.38
      },
      "8.2": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.4": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.6": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.8": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.10": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "9": {
        "solid": 1845.85,
        "glass": 2180.64,
        "inserts": 2271.94
      },
      "9.2": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.4": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.6": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.8": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.10": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "10": {
        "solid": 2025.42,
        "glass": 2360.2,
        "inserts": 2451.51
      },
      "10.2": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.4": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.6": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.8": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.10": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11.2": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11.4": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11.6": {
        "solid": 2795.41,
        "glass": 3297.57,
        "inserts": 3434.54
      },
      "11.8": {
        "solid": 2795.41,
        "glass": 3297.57,
        "inserts": 3434.54
      },
      "11.10": {
        "solid": 2795.41,
        "glass": 3297.57,
        "inserts": 3434.54
      },
      "12": {
        "solid": 2430.2,
        "glass": 2932.36,
        "inserts": 3069.32
      },
      "12.2": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.4": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.6": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.8": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.10": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.2": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.4": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.6": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.8": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.10": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "14": {
        "solid": 2722.37,
        "glass": 3224.53,
        "inserts": 3361.49
      },
      "14.2": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.4": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.6": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.8": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.10": {
        "solid": 3286.93,
        "glass": 3956.49,
        "inserts": 4139.09
      },
      "15": {
        "solid": 2857.8,
        "glass": 3527.36,
        "inserts": 3709.96
      },
      "15.2": {
        "solid": 3662.79,
        "glass": 4332.36,
        "inserts": 4514.96
      },
      "15.4": {
        "solid": 3662.79,
        "glass": 4332.36,
        "inserts": 4514.96
      },
      "15.6": {
        "solid": 3184.97,
        "glass": 3854.54,
        "inserts": 4037.14
      },
      "15.8": {
        "solid": 3184.97,
        "glass": 3854.54,
        "inserts": 4037.14
      },
      "15.10": {
        "solid": 3662.79,
        "glass": 4332.36,
        "inserts": 4514.96
      },
      "16": {
        "solid": 3184.97,
        "glass": 3854.54,
        "inserts": 4037.14
      },
      "16.2": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.4": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.6": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.8": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.10": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "17": {
        "solid": 3629.32,
        "glass": 4298.88,
        "inserts": 4481.48
      },
      "17.2": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.4": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.6": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.8": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.10": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "18": {
        "solid": 3810.4,
        "glass": 4479.96,
        "inserts": 4662.56
      },
      "18.2": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.4": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.6": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.8": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.10": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "19": {
        "solid": 4038.66,
        "glass": 4708.22,
        "inserts": 4890.82
      },
      "19.2": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.4": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.6": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.8": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.10": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "20": {
        "solid": 4280.61,
        "glass": 5117.56,
        "inserts": 5345.81
      }
    },
    "10": {
      "6": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.2": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.4": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.6": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.8": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "6.10": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.2": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.4": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.6": {
        "solid": 1996.5,
        "glass": 2247.6,
        "inserts": 2316.07
      },
      "7.8": {
        "solid": 1996.5,
        "glass": 2331.29,
        "inserts": 2422.6
      },
      "7.10": {
        "solid": 1996.5,
        "glass": 2331.29,
        "inserts": 2422.6
      },
      "8": {
        "solid": 1736.29,
        "glass": 2071.07,
        "inserts": 2162.38
      },
      "8.2": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.4": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.6": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.8": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "8.10": {
        "solid": 2122.81,
        "glass": 2457.59,
        "inserts": 2548.9
      },
      "9": {
        "solid": 1845.85,
        "glass": 2180.64,
        "inserts": 2271.94
      },
      "9.2": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.4": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.6": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.8": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "9.10": {
        "solid": 2329.76,
        "glass": 2664.54,
        "inserts": 2755.85
      },
      "10": {
        "solid": 2025.42,
        "glass": 2360.2,
        "inserts": 2451.51
      },
      "10.2": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.4": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.6": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.8": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "10.10": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11.2": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11.4": {
        "solid": 2795.41,
        "glass": 3130.19,
        "inserts": 3221.5
      },
      "11.6": {
        "solid": 2795.41,
        "glass": 3297.57,
        "inserts": 3434.54
      },
      "11.8": {
        "solid": 2795.41,
        "glass": 3297.57,
        "inserts": 3434.54
      },
      "11.10": {
        "solid": 2795.41,
        "glass": 3297.57,
        "inserts": 3434.54
      },
      "12": {
        "solid": 2430.2,
        "glass": 2932.36,
        "inserts": 3069.32
      },
      "12.2": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.4": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.6": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.8": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "12.10": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.2": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.4": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.6": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.8": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "13.10": {
        "solid": 3130.19,
        "glass": 3632.35,
        "inserts": 3769.32
      },
      "14": {
        "solid": 2722.37,
        "glass": 3224.53,
        "inserts": 3361.49
      },
      "14.2": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.4": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.6": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.8": {
        "solid": 3286.93,
        "glass": 3789.09,
        "inserts": 3926.05
      },
      "14.10": {
        "solid": 3286.93,
        "glass": 3956.49,
        "inserts": 4139.09
      },
      "15": {
        "solid": 2857.8,
        "glass": 3527.36,
        "inserts": 3709.96
      },
      "15.2": {
        "solid": 3662.79,
        "glass": 4332.36,
        "inserts": 4514.96
      },
      "15.4": {
        "solid": 3662.79,
        "glass": 4332.36,
        "inserts": 4514.96
      },
      "15.6": {
        "solid": 3184.97,
        "glass": 3854.54,
        "inserts": 4037.14
      },
      "15.8": {
        "solid": 3184.97,
        "glass": 3854.54,
        "inserts": 4037.14
      },
      "15.10": {
        "solid": 3662.79,
        "glass": 4332.36,
        "inserts": 4514.96
      },
      "16": {
        "solid": 3184.97,
        "glass": 3854.54,
        "inserts": 4037.14
      },
      "16.2": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.4": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.6": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.8": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "16.10": {
        "solid": 4174.09,
        "glass": 4843.66,
        "inserts": 5026.26
      },
      "17": {
        "solid": 3629.32,
        "glass": 4298.88,
        "inserts": 4481.48
      },
      "17.2": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.4": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.6": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.8": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "17.10": {
        "solid": 4382.57,
        "glass": 5052.13,
        "inserts": 5234.73
      },
      "18": {
        "solid": 3810.4,
        "glass": 4479.96,
        "inserts": 4662.56
      },
      "18.2": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.4": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.6": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.8": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "18.10": {
        "solid": 4644.31,
        "glass": 5313.87,
        "inserts": 5496.47
      },
      "19": {
        "solid": 4038.66,
        "glass": 4708.22,
        "inserts": 4890.82
      },
      "19.2": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.4": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.6": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.8": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "19.10": {
        "solid": 4922.78,
        "glass": 5759.73,
        "inserts": 5987.98
      },
      "20": {
        "solid": 4280.61,
        "glass": 5117.56,
        "inserts": 5345.81
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
