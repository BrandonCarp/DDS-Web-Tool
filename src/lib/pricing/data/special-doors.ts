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
  }
};
