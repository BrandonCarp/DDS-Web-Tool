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
//   Collection's 45% door margin, checked on every row. Both replaced on
//   19/10/2026 by CJ's sheets (below).
// 30/9/2026, applied by hand from "Copy of UPDATED PRICING 9-8 (002).xlsx":
//   4300/4301/4310 at 8ft gained 15'0" to 20'0" (it stopped at 14'10"). 19'0"
//   solid is the sheet's own TOTAL at 44M, $2318.41, not the $2266.63 typed.
//   T52S/T52L at 7ft had 11'0" to 11'8" under broken keys ("11.00", "11.02"…)
//   the configurator could not find; same prices, proper keys.
//   Kept the app's price where the sheet disagrees with its own TOTAL: 4300
//   8ft 9'2" to 9'10" inserts ($1679.91, not $1326.27) and T52S 7ft 14'0"
//   glass ($1357.54, not $1375.54).
// 16/10/2026, by scripts/apply_sheet_workbook.py --family premium from CJ's
//   "pricing_10-16.xlsx": the 9130/9131/9132/9133, 9200/9201/9202/9203/9205,
//   4300/4301/4302/4305/4310 and 4050/4051/4053/4132 groups, at four heights
//   (7FT and 8FT extension, 9FT and 10FT torsion), SELL at each family's
//   margin. They replace the 4050/4051/4053, 4300/4301/4310 and 9200/9203
//   grids of the older books. GLASS and INSERTS are the solid door plus the
//   short single strength windows; the sheet's glass is in premium-glass.ts.
// 19/10/2026, by scripts/apply_sheet_workbook.py --family modern from the
//   Modern Steel sheets CJ added to "pricing_10-16.xlsx": the 9208/9209 and
//   4308/4309 pairs and the 4138, solid alone at four heights (7FT and 8FT
//   extension, 9FT and 10FT torsion — one torsion column on the sheet, so
//   9FT and 10FT are the same figure), SELL at the Modern Collection's 45%.
//   They replace the 4308 and 4138 grids of 5/10/2026. The 4138's sheet
//   prices 9FT and 10FT at the whole feet alone, 8'0" to 18'0" — an odd
//   width there is the whole-foot door below it and 200 at quote time — and
//   nothing over 18'0". A window on these doors is pressed into the door
//   drawing and priced a window from modern-windows.ts, so the grid carries
//   no GLASS or INSERTS column.
import type { PriceTriple } from "../types";

export const SPECIAL_DOORS: Record<string, Record<string, Record<string, Partial<PriceTriple>>>> =
  {
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
  "4138": {
    "7": {
      "6.2": {
        "solid": 945.55
      },
      "6.4": {
        "solid": 945.55
      },
      "6.6": {
        "solid": 945.55
      },
      "6.8": {
        "solid": 945.55
      },
      "6.10": {
        "solid": 945.55
      },
      "7": {
        "solid": 945.55
      },
      "7.2": {
        "solid": 945.55
      },
      "7.4": {
        "solid": 945.55
      },
      "7.6": {
        "solid": 945.55
      },
      "7.8": {
        "solid": 945.55
      },
      "7.10": {
        "solid": 945.55
      },
      "8": {
        "solid": 816.41
      },
      "8.2": {
        "solid": 1021.59
      },
      "8.4": {
        "solid": 1021.59
      },
      "8.6": {
        "solid": 1021.59
      },
      "8.8": {
        "solid": 1021.59
      },
      "8.10": {
        "solid": 1021.59
      },
      "9": {
        "solid": 882.42
      },
      "9.2": {
        "solid": 1157.9
      },
      "9.4": {
        "solid": 1157.9
      },
      "9.6": {
        "solid": 1157.9
      },
      "9.8": {
        "solid": 1157.9
      },
      "9.10": {
        "solid": 1157.9
      },
      "10": {
        "solid": 1001.51
      },
      "10.2": {
        "solid": 1354.47
      },
      "10.4": {
        "solid": 1354.47
      },
      "10.6": {
        "solid": 1354.47
      },
      "10.8": {
        "solid": 1354.47
      },
      "10.10": {
        "solid": 1354.47
      },
      "11": {
        "solid": 1354.47
      },
      "11.2": {
        "solid": 1354.47
      },
      "11.4": {
        "solid": 1354.47
      },
      "11.6": {
        "solid": 1354.47
      },
      "11.8": {
        "solid": 1354.47
      },
      "11.10": {
        "solid": 1354.47
      },
      "12": {
        "solid": 1170.82
      },
      "12.2": {
        "solid": 1591.22
      },
      "12.4": {
        "solid": 1591.22
      },
      "12.6": {
        "solid": 1591.22
      },
      "12.8": {
        "solid": 1591.22
      },
      "12.10": {
        "solid": 1591.22
      },
      "13": {
        "solid": 1591.22
      },
      "13.2": {
        "solid": 1591.22
      },
      "13.4": {
        "solid": 1591.22
      },
      "13.6": {
        "solid": 1591.22
      },
      "13.8": {
        "solid": 1591.22
      },
      "13.10": {
        "solid": 1591.22
      },
      "14": {
        "solid": 1376.0
      },
      "14.2": {
        "solid": 1668.7
      },
      "14.4": {
        "solid": 1668.7
      },
      "14.6": {
        "solid": 1668.7
      },
      "14.8": {
        "solid": 1668.7
      },
      "14.10": {
        "solid": 1668.7
      },
      "15": {
        "solid": 1443.43
      },
      "15.2": {
        "solid": 1697.4
      },
      "15.4": {
        "solid": 1697.4
      },
      "15.6": {
        "solid": 1697.4
      },
      "15.8": {
        "solid": 1697.4
      },
      "15.10": {
        "solid": 1697.4
      },
      "16": {
        "solid": 1469.26
      },
      "16.2": {
        "solid": 1958.53
      },
      "16.4": {
        "solid": 1958.53
      },
      "16.6": {
        "solid": 1958.53
      },
      "16.8": {
        "solid": 1958.53
      },
      "16.10": {
        "solid": 1958.53
      },
      "17": {
        "solid": 1695.96
      },
      "17.2": {
        "solid": 2048.93
      },
      "17.4": {
        "solid": 2048.93
      },
      "17.6": {
        "solid": 2048.93
      },
      "17.8": {
        "solid": 2048.93
      },
      "17.10": {
        "solid": 2048.93
      },
      "18": {
        "solid": 1774.88
      }
    },
    "8": {
      "6.2": {
        "solid": 1142.12
      },
      "6.4": {
        "solid": 1142.12
      },
      "6.6": {
        "solid": 1142.12
      },
      "6.8": {
        "solid": 1142.12
      },
      "6.10": {
        "solid": 1142.12
      },
      "7": {
        "solid": 1142.12
      },
      "7.2": {
        "solid": 1142.12
      },
      "7.4": {
        "solid": 1142.12
      },
      "7.6": {
        "solid": 1142.12
      },
      "7.8": {
        "solid": 1142.12
      },
      "7.10": {
        "solid": 1142.12
      },
      "8": {
        "solid": 987.16
      },
      "8.2": {
        "solid": 1243.99
      },
      "8.4": {
        "solid": 1243.99
      },
      "8.6": {
        "solid": 1243.99
      },
      "8.8": {
        "solid": 1243.99
      },
      "8.10": {
        "solid": 1243.99
      },
      "9": {
        "solid": 1076.12
      },
      "9.2": {
        "solid": 1430.52
      },
      "9.4": {
        "solid": 1430.52
      },
      "9.6": {
        "solid": 1430.52
      },
      "9.8": {
        "solid": 1430.52
      },
      "9.10": {
        "solid": 1430.52
      },
      "10": {
        "solid": 1238.25
      },
      "10.2": {
        "solid": 1671.57
      },
      "10.4": {
        "solid": 1671.57
      },
      "10.6": {
        "solid": 1671.57
      },
      "10.8": {
        "solid": 1671.57
      },
      "10.10": {
        "solid": 1671.57
      },
      "11": {
        "solid": 1671.57
      },
      "11.2": {
        "solid": 1671.57
      },
      "11.4": {
        "solid": 1671.57
      },
      "11.6": {
        "solid": 1671.57
      },
      "11.8": {
        "solid": 1671.57
      },
      "11.10": {
        "solid": 1671.57
      },
      "12": {
        "solid": 1446.3
      },
      "12.2": {
        "solid": 1916.92
      },
      "12.4": {
        "solid": 1916.92
      },
      "12.6": {
        "solid": 1916.92
      },
      "12.8": {
        "solid": 1916.92
      },
      "12.10": {
        "solid": 1916.92
      },
      "13": {
        "solid": 1916.92
      },
      "13.2": {
        "solid": 1916.92
      },
      "13.4": {
        "solid": 1916.92
      },
      "13.6": {
        "solid": 1916.92
      },
      "13.8": {
        "solid": 1916.92
      },
      "13.10": {
        "solid": 1916.92
      },
      "14": {
        "solid": 1660.09
      },
      "14.2": {
        "solid": 2047.49
      },
      "14.4": {
        "solid": 2047.49
      },
      "14.6": {
        "solid": 2047.49
      },
      "14.8": {
        "solid": 2047.49
      },
      "14.10": {
        "solid": 2047.49
      },
      "15": {
        "solid": 1773.44
      },
      "15.2": {
        "solid": 2129.28
      },
      "15.4": {
        "solid": 2129.28
      },
      "15.6": {
        "solid": 2129.28
      },
      "15.8": {
        "solid": 2129.28
      },
      "15.10": {
        "solid": 2129.28
      },
      "16": {
        "solid": 1843.75
      },
      "16.2": {
        "solid": 2322.98
      },
      "16.4": {
        "solid": 2322.98
      },
      "16.6": {
        "solid": 2322.98
      },
      "16.8": {
        "solid": 2322.98
      },
      "16.10": {
        "solid": 2322.98
      },
      "17": {
        "solid": 2013.06
      },
      "17.2": {
        "solid": 2498.03
      },
      "17.4": {
        "solid": 2498.03
      },
      "17.6": {
        "solid": 2498.03
      },
      "17.8": {
        "solid": 2498.03
      },
      "17.10": {
        "solid": 2498.03
      },
      "18": {
        "solid": 2165.15
      }
    },
    "9": {
      "6.2": {
        "solid": 1601.26
      },
      "6.4": {
        "solid": 1601.26
      },
      "6.6": {
        "solid": 1601.26
      },
      "6.8": {
        "solid": 1601.26
      },
      "6.10": {
        "solid": 1601.26
      },
      "7": {
        "solid": 1601.26
      },
      "7.2": {
        "solid": 1601.26
      },
      "7.4": {
        "solid": 1601.26
      },
      "7.6": {
        "solid": 1601.26
      },
      "7.8": {
        "solid": 1601.26
      },
      "7.10": {
        "solid": 1601.26
      },
      "8": {
        "solid": 1391.78
      },
      "8.2": {
        "solid": 1726.09
      },
      "8.4": {
        "solid": 1726.09
      },
      "8.6": {
        "solid": 1726.09
      },
      "8.8": {
        "solid": 1726.09
      },
      "8.10": {
        "solid": 1726.09
      },
      "9": {
        "solid": 1500.82
      },
      "9.2": {
        "solid": 1997.27
      },
      "9.4": {
        "solid": 1997.27
      },
      "9.6": {
        "solid": 1997.27
      },
      "9.8": {
        "solid": 1997.27
      },
      "9.10": {
        "solid": 1997.27
      },
      "10": {
        "solid": 1736.14
      },
      "10.2": {
        "solid": 2396.15
      },
      "10.4": {
        "solid": 2396.15
      },
      "10.6": {
        "solid": 2396.15
      },
      "10.8": {
        "solid": 2396.15
      },
      "10.10": {
        "solid": 2396.15
      },
      "11": {
        "solid": 2396.15
      },
      "11.2": {
        "solid": 2396.15
      },
      "11.4": {
        "solid": 2396.15
      },
      "11.6": {
        "solid": 2396.15
      },
      "11.8": {
        "solid": 2396.15
      },
      "11.10": {
        "solid": 2396.15
      },
      "12": {
        "solid": 2083.36
      },
      "12.2": {
        "solid": 2683.12
      },
      "12.4": {
        "solid": 2683.12
      },
      "12.6": {
        "solid": 2683.12
      },
      "12.8": {
        "solid": 2683.12
      },
      "12.10": {
        "solid": 2683.12
      },
      "13": {
        "solid": 2683.12
      },
      "13.2": {
        "solid": 2683.12
      },
      "13.4": {
        "solid": 2683.12
      },
      "13.6": {
        "solid": 2683.12
      },
      "13.8": {
        "solid": 2683.12
      },
      "13.10": {
        "solid": 2683.12
      },
      "14": {
        "solid": 2333.02
      },
      "14.2": {
        "solid": 2816.56
      },
      "14.4": {
        "solid": 2816.56
      },
      "14.6": {
        "solid": 2816.56
      },
      "14.8": {
        "solid": 2816.56
      },
      "14.10": {
        "solid": 2816.56
      },
      "15": {
        "solid": 2449.24
      },
      "15.2": {
        "solid": 2971.52
      },
      "15.4": {
        "solid": 2971.52
      },
      "15.6": {
        "solid": 2971.52
      },
      "15.8": {
        "solid": 2971.52
      },
      "15.10": {
        "solid": 2971.52
      },
      "16": {
        "solid": 2584.12
      },
      "16.2": {
        "solid": 3417.75
      },
      "16.4": {
        "solid": 3417.75
      },
      "16.6": {
        "solid": 3417.75
      },
      "16.8": {
        "solid": 3417.75
      },
      "16.10": {
        "solid": 3417.75
      },
      "17": {
        "solid": 2971.52
      },
      "17.2": {
        "solid": 3587.06
      },
      "17.4": {
        "solid": 3587.06
      },
      "17.6": {
        "solid": 3587.06
      },
      "17.8": {
        "solid": 3587.06
      },
      "17.10": {
        "solid": 3587.06
      },
      "18": {
        "solid": 3119.3
      }
    },
    "10": {
      "6.2": {
        "solid": 1601.26
      },
      "6.4": {
        "solid": 1601.26
      },
      "6.6": {
        "solid": 1601.26
      },
      "6.8": {
        "solid": 1601.26
      },
      "6.10": {
        "solid": 1601.26
      },
      "7": {
        "solid": 1601.26
      },
      "7.2": {
        "solid": 1601.26
      },
      "7.4": {
        "solid": 1601.26
      },
      "7.6": {
        "solid": 1601.26
      },
      "7.8": {
        "solid": 1601.26
      },
      "7.10": {
        "solid": 1601.26
      },
      "8": {
        "solid": 1391.78
      },
      "8.2": {
        "solid": 1726.09
      },
      "8.4": {
        "solid": 1726.09
      },
      "8.6": {
        "solid": 1726.09
      },
      "8.8": {
        "solid": 1726.09
      },
      "8.10": {
        "solid": 1726.09
      },
      "9": {
        "solid": 1500.82
      },
      "9.2": {
        "solid": 1997.27
      },
      "9.4": {
        "solid": 1997.27
      },
      "9.6": {
        "solid": 1997.27
      },
      "9.8": {
        "solid": 1997.27
      },
      "9.10": {
        "solid": 1997.27
      },
      "10": {
        "solid": 1736.14
      },
      "10.2": {
        "solid": 2396.15
      },
      "10.4": {
        "solid": 2396.15
      },
      "10.6": {
        "solid": 2396.15
      },
      "10.8": {
        "solid": 2396.15
      },
      "10.10": {
        "solid": 2396.15
      },
      "11": {
        "solid": 2396.15
      },
      "11.2": {
        "solid": 2396.15
      },
      "11.4": {
        "solid": 2396.15
      },
      "11.6": {
        "solid": 2396.15
      },
      "11.8": {
        "solid": 2396.15
      },
      "11.10": {
        "solid": 2396.15
      },
      "12": {
        "solid": 2083.36
      },
      "12.2": {
        "solid": 2683.12
      },
      "12.4": {
        "solid": 2683.12
      },
      "12.6": {
        "solid": 2683.12
      },
      "12.8": {
        "solid": 2683.12
      },
      "12.10": {
        "solid": 2683.12
      },
      "13": {
        "solid": 2683.12
      },
      "13.2": {
        "solid": 2683.12
      },
      "13.4": {
        "solid": 2683.12
      },
      "13.6": {
        "solid": 2683.12
      },
      "13.8": {
        "solid": 2683.12
      },
      "13.10": {
        "solid": 2683.12
      },
      "14": {
        "solid": 2333.02
      },
      "14.2": {
        "solid": 2816.56
      },
      "14.4": {
        "solid": 2816.56
      },
      "14.6": {
        "solid": 2816.56
      },
      "14.8": {
        "solid": 2816.56
      },
      "14.10": {
        "solid": 2816.56
      },
      "15": {
        "solid": 2449.24
      },
      "15.2": {
        "solid": 2971.52
      },
      "15.4": {
        "solid": 2971.52
      },
      "15.6": {
        "solid": 2971.52
      },
      "15.8": {
        "solid": 2971.52
      },
      "15.10": {
        "solid": 2971.52
      },
      "16": {
        "solid": 2584.12
      },
      "16.2": {
        "solid": 3417.75
      },
      "16.4": {
        "solid": 3417.75
      },
      "16.6": {
        "solid": 3417.75
      },
      "16.8": {
        "solid": 3417.75
      },
      "16.10": {
        "solid": 3417.75
      },
      "17": {
        "solid": 2971.52
      },
      "17.2": {
        "solid": 3587.06
      },
      "17.4": {
        "solid": 3587.06
      },
      "17.6": {
        "solid": 3587.06
      },
      "17.8": {
        "solid": 3587.06
      },
      "17.10": {
        "solid": 3587.06
      },
      "18": {
        "solid": 3119.3
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
        "solid": 2359.33
      },
      "6.4": {
        "solid": 2359.33
      },
      "7": {
        "solid": 2359.33
      },
      "7.2": {
        "solid": 2359.33
      },
      "7.6": {
        "solid": 2359.33
      },
      "7.8": {
        "solid": 2359.33
      },
      "8": {
        "solid": 2359.33
      },
      "8.2": {
        "solid": 2460.09
      },
      "8.6": {
        "solid": 2460.09
      },
      "9": {
        "solid": 2460.09
      },
      "9.2": {
        "solid": 3060.53
      },
      "10": {
        "solid": 3060.53
      },
      "12": {
        "solid": 3350.47
      },
      "12.2": {
        "solid": 3852.21
      },
      "13": {
        "solid": 3852.21
      },
      "13.8": {
        "solid": 3852.21
      },
      "14": {
        "solid": 3852.21
      },
      "14.2": {
        "solid": 4399.19
      },
      "15": {
        "solid": 4399.19
      },
      "15.2": {
        "solid": 4399.19
      },
      "15.6": {
        "solid": 4399.19
      },
      "15.8": {
        "solid": 4399.19
      },
      "16": {
        "solid": 4399.19
      },
      "16.2": {
        "solid": 4473.21
      },
      "17": {
        "solid": 4473.21
      },
      "18": {
        "solid": 4734.36
      }
    },
    "8": {
      "6.2": {
        "solid": 2421.02
      },
      "6.4": {
        "solid": 2421.02
      },
      "7": {
        "solid": 2421.02
      },
      "7.2": {
        "solid": 2421.02
      },
      "7.6": {
        "solid": 2421.02
      },
      "7.8": {
        "solid": 2421.02
      },
      "8": {
        "solid": 2421.02
      },
      "8.2": {
        "solid": 2523.84
      },
      "8.6": {
        "solid": 2523.84
      },
      "9": {
        "solid": 2523.84
      },
      "9.2": {
        "solid": 3140.73
      },
      "10": {
        "solid": 3140.73
      },
      "12": {
        "solid": 3447.12
      },
      "12.2": {
        "solid": 3963.25
      },
      "13": {
        "solid": 3963.25
      },
      "13.8": {
        "solid": 3963.25
      },
      "14": {
        "solid": 3963.25
      },
      "14.2": {
        "solid": 4524.62
      },
      "15": {
        "solid": 4524.62
      },
      "15.2": {
        "solid": 4524.62
      },
      "15.6": {
        "solid": 4524.62
      },
      "15.8": {
        "solid": 4524.62
      },
      "16": {
        "solid": 4524.62
      },
      "16.2": {
        "solid": 4598.65
      },
      "17": {
        "solid": 4598.65
      },
      "18": {
        "solid": 4868.02
      }
    },
    "9": {
      "6.2": {
        "solid": 3132.5
      },
      "6.4": {
        "solid": 3132.5
      },
      "7": {
        "solid": 3132.5
      },
      "7.2": {
        "solid": 3132.5
      },
      "7.6": {
        "solid": 3132.5
      },
      "7.8": {
        "solid": 3132.5
      },
      "8": {
        "solid": 3132.5
      },
      "8.2": {
        "solid": 3255.88
      },
      "8.6": {
        "solid": 3255.88
      },
      "9": {
        "solid": 3255.88
      },
      "9.2": {
        "solid": 4064.01
      },
      "10": {
        "solid": 4064.01
      },
      "12": {
        "solid": 4306.65
      },
      "12.2": {
        "solid": 4882.42
      },
      "13": {
        "solid": 4882.42
      },
      "13.8": {
        "solid": 4882.42
      },
      "14": {
        "solid": 4882.42
      },
      "14.2": {
        "solid": 5575.39
      },
      "15": {
        "solid": 5575.39
      },
      "15.2": {
        "solid": 5575.39
      },
      "15.6": {
        "solid": 5575.39
      },
      "15.8": {
        "solid": 5575.39
      },
      "16": {
        "solid": 5575.39
      },
      "16.2": {
        "solid": 6013.39
      },
      "17": {
        "solid": 6013.39
      },
      "18": {
        "solid": 6365.01
      }
    },
    "10": {
      "6.2": {
        "solid": 3210.64
      },
      "6.4": {
        "solid": 3210.64
      },
      "7": {
        "solid": 3210.64
      },
      "7.2": {
        "solid": 3210.64
      },
      "7.6": {
        "solid": 3210.64
      },
      "7.8": {
        "solid": 3210.64
      },
      "8": {
        "solid": 3210.64
      },
      "8.2": {
        "solid": 3344.3
      },
      "8.6": {
        "solid": 3344.3
      },
      "9": {
        "solid": 3344.3
      },
      "9.2": {
        "solid": 4170.94
      },
      "10": {
        "solid": 4170.94
      },
      "12": {
        "solid": 4506.11
      },
      "12.2": {
        "solid": 5160.02
      },
      "13": {
        "solid": 5160.02
      },
      "13.8": {
        "solid": 5160.02
      },
      "14": {
        "solid": 5160.02
      },
      "14.2": {
        "solid": 5894.12
      },
      "15": {
        "solid": 5894.12
      },
      "15.2": {
        "solid": 5894.12
      },
      "15.6": {
        "solid": 5894.12
      },
      "15.8": {
        "solid": 5894.12
      },
      "16": {
        "solid": 5894.12
      },
      "16.2": {
        "solid": 6200.51
      },
      "17": {
        "solid": 6200.51
      },
      "18": {
        "solid": 6564.48
      }
    }
  },
  "9130/9131/9132/9133": {
    "7": {
      "6.2": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "6.4": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "6.6": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "6.8": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "6.10": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "7": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "7.2": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "7.4": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "7.6": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "7.8": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "7.10": {
        "solid": 1017.76,
        "glass": 1178.85,
        "inserts": 1256.96
      },
      "8": {
        "solid": 878.64,
        "glass": 1093.42,
        "inserts": 1197.56
      },
      "8.2": {
        "solid": 1100.09,
        "glass": 1314.87,
        "inserts": 1419.01
      },
      "8.4": {
        "solid": 1100.09,
        "glass": 1314.87,
        "inserts": 1419.01
      },
      "8.6": {
        "solid": 1100.09,
        "glass": 1314.87,
        "inserts": 1419.01
      },
      "8.8": {
        "solid": 1100.09,
        "glass": 1314.87,
        "inserts": 1419.01
      },
      "8.10": {
        "solid": 1100.09,
        "glass": 1314.87,
        "inserts": 1419.01
      },
      "9": {
        "solid": 950.24,
        "glass": 1165.01,
        "inserts": 1269.15
      },
      "9.2": {
        "solid": 1247.92,
        "glass": 1462.69,
        "inserts": 1566.83
      },
      "9.4": {
        "solid": 1247.92,
        "glass": 1462.69,
        "inserts": 1566.83
      },
      "9.6": {
        "solid": 1247.92,
        "glass": 1462.69,
        "inserts": 1566.83
      },
      "9.8": {
        "solid": 1247.92,
        "glass": 1462.69,
        "inserts": 1566.83
      },
      "9.10": {
        "solid": 1247.92,
        "glass": 1462.69,
        "inserts": 1566.83
      },
      "10": {
        "solid": 1078.78,
        "glass": 1347.25,
        "inserts": 1477.43
      },
      "10.2": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "10.4": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "10.6": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "10.8": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "10.10": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "11": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "11.2": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "11.4": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "11.6": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "11.8": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "11.10": {
        "solid": 1513.95,
        "glass": 1782.43,
        "inserts": 1912.6
      },
      "12": {
        "solid": 1308.2,
        "glass": 1630.38,
        "inserts": 1786.57
      },
      "12.2": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "12.4": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "12.6": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "12.8": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "12.10": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "13": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "13.2": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "13.4": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "13.6": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "13.8": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "13.10": {
        "solid": 1714.17,
        "glass": 2036.34,
        "inserts": 2192.54
      },
      "14": {
        "solid": 1482.31,
        "glass": 1858.16,
        "inserts": 2040.41
      },
      "14.2": {
        "solid": 1798.37,
        "glass": 2174.23,
        "inserts": 2356.48
      },
      "14.4": {
        "solid": 1798.37,
        "glass": 2174.23,
        "inserts": 2356.48
      },
      "14.6": {
        "solid": 1798.37,
        "glass": 2174.23,
        "inserts": 2356.48
      },
      "14.8": {
        "solid": 1798.37,
        "glass": 2174.23,
        "inserts": 2356.48
      },
      "14.10": {
        "solid": 1798.37,
        "glass": 2174.23,
        "inserts": 2356.48
      },
      "15": {
        "solid": 1555.53,
        "glass": 1931.39,
        "inserts": 2113.63
      },
      "15.2": {
        "solid": 1830.18,
        "glass": 2206.04,
        "inserts": 2388.29
      },
      "15.4": {
        "solid": 1830.18,
        "glass": 2206.04,
        "inserts": 2388.29
      },
      "15.6": {
        "solid": 1830.18,
        "glass": 2206.04,
        "inserts": 2388.29
      },
      "15.8": {
        "solid": 1830.18,
        "glass": 2206.04,
        "inserts": 2388.29
      },
      "15.10": {
        "solid": 1830.18,
        "glass": 2206.04,
        "inserts": 2388.29
      },
      "16": {
        "solid": 1583.19,
        "glass": 2012.75,
        "inserts": 2221.01
      },
      "16.2": {
        "solid": 2112.73,
        "glass": 2542.29,
        "inserts": 2750.56
      },
      "16.4": {
        "solid": 2112.73,
        "glass": 2542.29,
        "inserts": 2750.56
      },
      "16.6": {
        "solid": 2112.73,
        "glass": 2542.29,
        "inserts": 2750.56
      },
      "16.8": {
        "solid": 2112.73,
        "glass": 2542.29,
        "inserts": 2750.56
      },
      "16.10": {
        "solid": 2112.73,
        "glass": 2542.29,
        "inserts": 2750.56
      },
      "17": {
        "solid": 1828.88,
        "glass": 2258.44,
        "inserts": 2466.71
      },
      "17.2": {
        "solid": 2210.03,
        "glass": 2639.6,
        "inserts": 2847.86
      },
      "17.4": {
        "solid": 2210.03,
        "glass": 2639.6,
        "inserts": 2847.86
      },
      "17.6": {
        "solid": 2210.03,
        "glass": 2639.6,
        "inserts": 2847.86
      },
      "17.8": {
        "solid": 2210.03,
        "glass": 2639.6,
        "inserts": 2847.86
      },
      "17.10": {
        "solid": 2210.03,
        "glass": 2639.6,
        "inserts": 2847.86
      },
      "18": {
        "solid": 1913.49,
        "glass": 2343.05,
        "inserts": 2551.32
      }
    },
    "8": {
      "6.2": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "6.4": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "6.6": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "6.8": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "6.10": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "7": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "7.2": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "7.4": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "7.6": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "7.8": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "7.10": {
        "solid": 1231.08,
        "glass": 1392.17,
        "inserts": 1470.27
      },
      "8": {
        "solid": 1064.14,
        "glass": 1278.91,
        "inserts": 1383.05
      },
      "8.2": {
        "solid": 1341.48,
        "glass": 1556.25,
        "inserts": 1660.39
      },
      "8.4": {
        "solid": 1341.48,
        "glass": 1556.25,
        "inserts": 1660.39
      },
      "8.6": {
        "solid": 1341.48,
        "glass": 1556.25,
        "inserts": 1660.39
      },
      "8.8": {
        "solid": 1341.48,
        "glass": 1556.25,
        "inserts": 1660.39
      },
      "8.10": {
        "solid": 1341.48,
        "glass": 1556.25,
        "inserts": 1660.39
      },
      "9": {
        "solid": 1160.14,
        "glass": 1374.91,
        "inserts": 1479.05
      },
      "9.2": {
        "solid": 1541.69,
        "glass": 1756.47,
        "inserts": 1860.61
      },
      "9.4": {
        "solid": 1541.69,
        "glass": 1756.47,
        "inserts": 1860.61
      },
      "9.6": {
        "solid": 1541.69,
        "glass": 1756.47,
        "inserts": 1860.61
      },
      "9.8": {
        "solid": 1541.69,
        "glass": 1756.47,
        "inserts": 1860.61
      },
      "9.10": {
        "solid": 1541.69,
        "glass": 1756.47,
        "inserts": 1860.61
      },
      "10": {
        "solid": 1334.24,
        "glass": 1602.71,
        "inserts": 1732.89
      },
      "10.2": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "10.4": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "10.6": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "10.8": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "10.10": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "11": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "11.2": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "11.4": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "11.6": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "11.8": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "11.10": {
        "solid": 1802.12,
        "glass": 2070.59,
        "inserts": 2200.76
      },
      "12": {
        "solid": 1558.78,
        "glass": 1880.96,
        "inserts": 2037.15
      },
      "12.2": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "12.4": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "12.6": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "12.8": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "12.10": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "13": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "13.2": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "13.4": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "13.6": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "13.8": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "13.10": {
        "solid": 2067.82,
        "glass": 2390.0,
        "inserts": 2546.19
      },
      "14": {
        "solid": 1789.83,
        "glass": 2165.69,
        "inserts": 2347.94
      },
      "14.2": {
        "solid": 2208.16,
        "glass": 2584.02,
        "inserts": 2766.27
      },
      "14.4": {
        "solid": 2208.16,
        "glass": 2584.02,
        "inserts": 2766.27
      },
      "14.6": {
        "solid": 2208.16,
        "glass": 2584.02,
        "inserts": 2766.27
      },
      "14.8": {
        "solid": 2208.16,
        "glass": 2584.02,
        "inserts": 2766.27
      },
      "14.10": {
        "solid": 2208.16,
        "glass": 2584.02,
        "inserts": 2766.27
      },
      "15": {
        "solid": 1911.86,
        "glass": 2287.72,
        "inserts": 2469.97
      },
      "15.2": {
        "solid": 2296.11,
        "glass": 2671.97,
        "inserts": 2854.21
      },
      "15.4": {
        "solid": 2296.11,
        "glass": 2671.97,
        "inserts": 2854.21
      },
      "15.6": {
        "solid": 2296.11,
        "glass": 2671.97,
        "inserts": 2854.21
      },
      "15.8": {
        "solid": 2296.11,
        "glass": 2671.97,
        "inserts": 2854.21
      },
      "15.10": {
        "solid": 2296.11,
        "glass": 2671.97,
        "inserts": 2854.21
      },
      "16": {
        "solid": 1988.34,
        "glass": 2417.9,
        "inserts": 2626.16
      },
      "16.2": {
        "solid": 2505.68,
        "glass": 2935.24,
        "inserts": 3143.51
      },
      "16.4": {
        "solid": 2505.68,
        "glass": 2935.24,
        "inserts": 3143.51
      },
      "16.6": {
        "solid": 2505.68,
        "glass": 2935.24,
        "inserts": 3143.51
      },
      "16.8": {
        "solid": 2505.68,
        "glass": 2935.24,
        "inserts": 3143.51
      },
      "16.10": {
        "solid": 2505.68,
        "glass": 2935.24,
        "inserts": 3143.51
      },
      "17": {
        "solid": 2170.58,
        "glass": 2600.14,
        "inserts": 2808.4
      },
      "17.2": {
        "solid": 2694.67,
        "glass": 3124.23,
        "inserts": 3332.5
      },
      "17.4": {
        "solid": 2694.67,
        "glass": 3124.23,
        "inserts": 3332.5
      },
      "17.6": {
        "solid": 2694.67,
        "glass": 3124.23,
        "inserts": 3332.5
      },
      "17.8": {
        "solid": 2694.67,
        "glass": 3124.23,
        "inserts": 3332.5
      },
      "17.10": {
        "solid": 2694.67,
        "glass": 3124.23,
        "inserts": 3332.5
      },
      "18": {
        "solid": 2334.92,
        "glass": 2764.48,
        "inserts": 2972.74
      }
    },
    "9": {
      "6.2": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "6.4": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "6.6": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "6.8": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "6.10": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "7": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "7.2": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "7.4": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "7.6": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "7.8": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "7.10": {
        "solid": 1667.23,
        "glass": 1828.31,
        "inserts": 1906.42
      },
      "8": {
        "solid": 1449.76,
        "glass": 1664.53,
        "inserts": 1768.67
      },
      "8.2": {
        "solid": 1805.69,
        "glass": 2020.47,
        "inserts": 2124.61
      },
      "8.4": {
        "solid": 1805.69,
        "glass": 2020.47,
        "inserts": 2124.61
      },
      "8.6": {
        "solid": 1805.69,
        "glass": 2020.47,
        "inserts": 2124.61
      },
      "8.8": {
        "solid": 1805.69,
        "glass": 2020.47,
        "inserts": 2124.61
      },
      "8.10": {
        "solid": 1805.69,
        "glass": 2020.47,
        "inserts": 2124.61
      },
      "9": {
        "solid": 1570.17,
        "glass": 1784.94,
        "inserts": 1889.08
      },
      "9.2": {
        "solid": 2091.99,
        "glass": 2306.76,
        "inserts": 2410.9
      },
      "9.4": {
        "solid": 2091.99,
        "glass": 2306.76,
        "inserts": 2410.9
      },
      "9.6": {
        "solid": 2091.99,
        "glass": 2306.76,
        "inserts": 2410.9
      },
      "9.8": {
        "solid": 2091.99,
        "glass": 2306.76,
        "inserts": 2410.9
      },
      "9.10": {
        "solid": 2091.99,
        "glass": 2306.76,
        "inserts": 2410.9
      },
      "10": {
        "solid": 1819.12,
        "glass": 2087.59,
        "inserts": 2217.77
      },
      "10.2": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "10.4": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "10.6": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "10.8": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "10.10": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "11": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "11.2": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "11.4": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "11.6": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "11.8": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "11.10": {
        "solid": 2509.26,
        "glass": 2777.73,
        "inserts": 2907.91
      },
      "12": {
        "solid": 2181.97,
        "glass": 2504.14,
        "inserts": 2660.33
      },
      "12.2": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "12.4": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "12.6": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "12.8": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "12.10": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "13": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "13.2": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "13.4": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "13.6": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "13.8": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "13.10": {
        "solid": 2810.52,
        "glass": 3132.7,
        "inserts": 3288.89
      },
      "14": {
        "solid": 2443.93,
        "glass": 2819.79,
        "inserts": 3002.04
      },
      "14.2": {
        "solid": 2950.86,
        "glass": 3326.72,
        "inserts": 3508.97
      },
      "14.4": {
        "solid": 2950.86,
        "glass": 3326.72,
        "inserts": 3508.97
      },
      "14.6": {
        "solid": 2950.86,
        "glass": 3326.72,
        "inserts": 3508.97
      },
      "14.8": {
        "solid": 2950.86,
        "glass": 3326.72,
        "inserts": 3508.97
      },
      "14.10": {
        "solid": 2950.86,
        "glass": 3326.72,
        "inserts": 3508.97
      },
      "15": {
        "solid": 2565.97,
        "glass": 2941.83,
        "inserts": 3124.07
      },
      "15.2": {
        "solid": 3113.65,
        "glass": 3489.51,
        "inserts": 3671.76
      },
      "15.4": {
        "solid": 3113.65,
        "glass": 3489.51,
        "inserts": 3671.76
      },
      "15.6": {
        "solid": 3113.65,
        "glass": 3489.51,
        "inserts": 3671.76
      },
      "15.8": {
        "solid": 3113.65,
        "glass": 3489.51,
        "inserts": 3671.76
      },
      "15.10": {
        "solid": 3113.65,
        "glass": 3489.51,
        "inserts": 3671.76
      },
      "16": {
        "solid": 2707.53,
        "glass": 3137.09,
        "inserts": 3345.35
      },
      "16.2": {
        "solid": 3581.45,
        "glass": 4011.01,
        "inserts": 4219.28
      },
      "16.4": {
        "solid": 3581.45,
        "glass": 4011.01,
        "inserts": 4219.28
      },
      "16.6": {
        "solid": 3581.45,
        "glass": 4011.01,
        "inserts": 4219.28
      },
      "16.8": {
        "solid": 3581.45,
        "glass": 4011.01,
        "inserts": 4219.28
      },
      "16.10": {
        "solid": 3581.45,
        "glass": 4011.01,
        "inserts": 4219.28
      },
      "17": {
        "solid": 3114.31,
        "glass": 3543.87,
        "inserts": 3752.13
      },
      "17.2": {
        "solid": 3759.21,
        "glass": 4188.77,
        "inserts": 4397.04
      },
      "17.4": {
        "solid": 3759.21,
        "glass": 4188.77,
        "inserts": 4397.04
      },
      "17.6": {
        "solid": 3759.21,
        "glass": 4188.77,
        "inserts": 4397.04
      },
      "17.8": {
        "solid": 3759.21,
        "glass": 4188.77,
        "inserts": 4397.04
      },
      "17.10": {
        "solid": 3759.21,
        "glass": 4188.77,
        "inserts": 4397.04
      },
      "18": {
        "solid": 3268.88,
        "glass": 3698.44,
        "inserts": 3906.71
      }
    },
    "10": {
      "6.2": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "6.4": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "6.6": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "6.8": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "6.10": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "7": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "7.2": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "7.4": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "7.6": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "7.8": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "7.10": {
        "solid": 1788.85,
        "glass": 1949.94,
        "inserts": 2028.05
      },
      "8": {
        "solid": 1555.53,
        "glass": 1770.3,
        "inserts": 1874.44
      },
      "8.2": {
        "solid": 1923.58,
        "glass": 2138.35,
        "inserts": 2242.49
      },
      "8.4": {
        "solid": 1923.58,
        "glass": 2138.35,
        "inserts": 2242.49
      },
      "8.6": {
        "solid": 1923.58,
        "glass": 2138.35,
        "inserts": 2242.49
      },
      "8.8": {
        "solid": 1923.58,
        "glass": 2138.35,
        "inserts": 2242.49
      },
      "8.10": {
        "solid": 1923.58,
        "glass": 2138.35,
        "inserts": 2242.49
      },
      "9": {
        "solid": 1672.68,
        "glass": 1887.45,
        "inserts": 1991.59
      },
      "9.2": {
        "solid": 2221.1,
        "glass": 2435.87,
        "inserts": 2540.01
      },
      "9.4": {
        "solid": 2221.1,
        "glass": 2435.87,
        "inserts": 2540.01
      },
      "9.6": {
        "solid": 2221.1,
        "glass": 2435.87,
        "inserts": 2540.01
      },
      "9.8": {
        "solid": 2221.1,
        "glass": 2435.87,
        "inserts": 2540.01
      },
      "9.10": {
        "solid": 2221.1,
        "glass": 2435.87,
        "inserts": 2540.01
      },
      "10": {
        "solid": 1931.39,
        "glass": 2199.86,
        "inserts": 2330.04
      },
      "10.2": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "10.4": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "10.6": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "10.8": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "10.10": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "11": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "11.2": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "11.4": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "11.6": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "11.8": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "11.10": {
        "solid": 2664.57,
        "glass": 2933.04,
        "inserts": 3063.22
      },
      "12": {
        "solid": 2317.02,
        "glass": 2639.19,
        "inserts": 2795.39
      },
      "12.2": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "12.4": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "12.6": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "12.8": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "12.10": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "13": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "13.2": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "13.4": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "13.6": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "13.8": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "13.10": {
        "solid": 2984.54,
        "glass": 3306.72,
        "inserts": 3462.91
      },
      "14": {
        "solid": 2595.25,
        "glass": 2971.11,
        "inserts": 3153.36
      },
      "14.2": {
        "solid": 3134.24,
        "glass": 3510.1,
        "inserts": 3692.34
      },
      "14.4": {
        "solid": 3134.24,
        "glass": 3510.1,
        "inserts": 3692.34
      },
      "14.6": {
        "solid": 3134.24,
        "glass": 3510.1,
        "inserts": 3692.34
      },
      "14.8": {
        "solid": 3134.24,
        "glass": 3510.1,
        "inserts": 3692.34
      },
      "14.10": {
        "solid": 3134.24,
        "glass": 3510.1,
        "inserts": 3692.34
      },
      "15": {
        "solid": 2725.42,
        "glass": 3101.28,
        "inserts": 3283.53
      },
      "15.2": {
        "solid": 3304.52,
        "glass": 3680.37,
        "inserts": 3862.62
      },
      "15.4": {
        "solid": 3304.52,
        "glass": 3680.37,
        "inserts": 3862.62
      },
      "15.6": {
        "solid": 3304.52,
        "glass": 3680.37,
        "inserts": 3862.62
      },
      "15.8": {
        "solid": 3304.52,
        "glass": 3680.37,
        "inserts": 3862.62
      },
      "15.10": {
        "solid": 3304.52,
        "glass": 3680.37,
        "inserts": 3862.62
      },
      "16": {
        "solid": 2873.49,
        "glass": 3303.05,
        "inserts": 3511.32
      },
      "16.2": {
        "solid": 3800.38,
        "glass": 4229.94,
        "inserts": 4438.2
      },
      "16.4": {
        "solid": 3800.38,
        "glass": 4229.94,
        "inserts": 4438.2
      },
      "16.6": {
        "solid": 3800.38,
        "glass": 4229.94,
        "inserts": 4438.2
      },
      "16.8": {
        "solid": 3800.38,
        "glass": 4229.94,
        "inserts": 4438.2
      },
      "16.10": {
        "solid": 3800.38,
        "glass": 4229.94,
        "inserts": 4438.2
      },
      "17": {
        "solid": 3304.68,
        "glass": 3734.24,
        "inserts": 3942.5
      },
      "17.2": {
        "solid": 3989.37,
        "glass": 4418.93,
        "inserts": 4627.19
      },
      "17.4": {
        "solid": 3989.37,
        "glass": 4418.93,
        "inserts": 4627.19
      },
      "17.6": {
        "solid": 3989.37,
        "glass": 4418.93,
        "inserts": 4627.19
      },
      "17.8": {
        "solid": 3989.37,
        "glass": 4418.93,
        "inserts": 4627.19
      },
      "17.10": {
        "solid": 3989.37,
        "glass": 4418.93,
        "inserts": 4627.19
      },
      "18": {
        "solid": 3469.02,
        "glass": 3898.58,
        "inserts": 4106.84
      }
    }
  },
  "9200/9201/9202/9203/9205": {
    "7": {
      "6.2": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "6.4": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "6.6": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "6.8": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "6.10": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "7": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "7.2": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "7.4": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "7.6": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "7.8": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "7.10": {
        "solid": 1194.26,
        "glass": 1347.05,
        "inserts": 1421.12
      },
      "8": {
        "solid": 1032.44,
        "glass": 1236.16,
        "inserts": 1334.92
      },
      "8.2": {
        "solid": 1293.64,
        "glass": 1497.36,
        "inserts": 1596.12
      },
      "8.4": {
        "solid": 1293.64,
        "glass": 1497.36,
        "inserts": 1596.12
      },
      "8.6": {
        "solid": 1293.64,
        "glass": 1497.36,
        "inserts": 1596.12
      },
      "8.8": {
        "solid": 1293.64,
        "glass": 1497.36,
        "inserts": 1596.12
      },
      "8.10": {
        "solid": 1293.64,
        "glass": 1497.36,
        "inserts": 1596.12
      },
      "9": {
        "solid": 1118.87,
        "glass": 1322.59,
        "inserts": 1421.34
      },
      "9.2": {
        "solid": 1455.14,
        "glass": 1658.86,
        "inserts": 1757.62
      },
      "9.4": {
        "solid": 1455.14,
        "glass": 1658.86,
        "inserts": 1757.62
      },
      "9.6": {
        "solid": 1455.14,
        "glass": 1658.86,
        "inserts": 1757.62
      },
      "9.8": {
        "solid": 1455.14,
        "glass": 1658.86,
        "inserts": 1757.62
      },
      "9.10": {
        "solid": 1455.14,
        "glass": 1658.86,
        "inserts": 1757.62
      },
      "10": {
        "solid": 1259.3,
        "glass": 1513.94,
        "inserts": 1637.41
      },
      "10.2": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "10.4": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "10.6": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "10.8": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "10.10": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "11": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "11.2": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "11.4": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "11.6": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "11.8": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "11.10": {
        "solid": 1760.71,
        "glass": 2015.34,
        "inserts": 2138.82
      },
      "12": {
        "solid": 1523.2,
        "glass": 1828.76,
        "inserts": 1976.92
      },
      "12.2": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "12.4": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "12.6": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "12.8": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "12.10": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "13": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "13.2": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "13.4": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "13.6": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "13.8": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "13.10": {
        "solid": 1994.98,
        "glass": 2300.54,
        "inserts": 2448.7
      },
      "14": {
        "solid": 1726.91,
        "glass": 2083.4,
        "inserts": 2256.25
      },
      "14.2": {
        "solid": 2099.69,
        "glass": 2456.18,
        "inserts": 2629.02
      },
      "14.4": {
        "solid": 2099.69,
        "glass": 2456.18,
        "inserts": 2629.02
      },
      "14.6": {
        "solid": 2099.69,
        "glass": 2456.18,
        "inserts": 2629.02
      },
      "14.8": {
        "solid": 2099.69,
        "glass": 2456.18,
        "inserts": 2629.02
      },
      "14.10": {
        "solid": 2099.69,
        "glass": 2456.18,
        "inserts": 2629.02
      },
      "15": {
        "solid": 1817.97,
        "glass": 2174.46,
        "inserts": 2347.3
      },
      "15.2": {
        "solid": 2156.48,
        "glass": 2512.97,
        "inserts": 2685.81
      },
      "15.4": {
        "solid": 2156.48,
        "glass": 2512.97,
        "inserts": 2685.81
      },
      "15.6": {
        "solid": 2156.48,
        "glass": 2512.97,
        "inserts": 2685.81
      },
      "15.8": {
        "solid": 2156.48,
        "glass": 2512.97,
        "inserts": 2685.81
      },
      "15.10": {
        "solid": 2156.48,
        "glass": 2512.97,
        "inserts": 2685.81
      },
      "16": {
        "solid": 1867.35,
        "glass": 2274.77,
        "inserts": 2472.32
      },
      "16.2": {
        "solid": 2463.51,
        "glass": 2870.93,
        "inserts": 3068.48
      },
      "16.4": {
        "solid": 2463.51,
        "glass": 2870.93,
        "inserts": 3068.48
      },
      "16.6": {
        "solid": 2463.51,
        "glass": 2870.93,
        "inserts": 3068.48
      },
      "16.8": {
        "solid": 2463.51,
        "glass": 2870.93,
        "inserts": 3068.48
      },
      "16.10": {
        "solid": 2463.51,
        "glass": 2870.93,
        "inserts": 3068.48
      },
      "17": {
        "solid": 2134.34,
        "glass": 2541.76,
        "inserts": 2739.3
      },
      "17.2": {
        "solid": 2573.55,
        "glass": 2980.97,
        "inserts": 3178.51
      },
      "17.4": {
        "solid": 2573.55,
        "glass": 2980.97,
        "inserts": 3178.51
      },
      "17.6": {
        "solid": 2573.55,
        "glass": 2980.97,
        "inserts": 3178.51
      },
      "17.8": {
        "solid": 2573.55,
        "glass": 2980.97,
        "inserts": 3178.51
      },
      "17.10": {
        "solid": 2573.55,
        "glass": 2980.97,
        "inserts": 3178.51
      },
      "18": {
        "solid": 2230.02,
        "glass": 2637.44,
        "inserts": 2834.98
      },
      "18.2": {
        "solid": 2731.5
      },
      "18.4": {
        "solid": 2731.5
      },
      "18.6": {
        "solid": 2731.5
      },
      "18.8": {
        "solid": 2731.5
      },
      "18.10": {
        "solid": 2731.5
      },
      "19": {
        "solid": 2367.37
      },
      "19.2": {
        "solid": 2898.33
      },
      "19.4": {
        "solid": 2898.33
      },
      "19.6": {
        "solid": 2898.33
      },
      "19.8": {
        "solid": 2898.33
      },
      "19.10": {
        "solid": 2898.33
      },
      "20": {
        "solid": 2512.44
      }
    },
    "8": {
      "6.2": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "6.4": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "6.6": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "6.8": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "6.10": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "7": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "7.2": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "7.4": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "7.6": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "7.8": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "7.10": {
        "solid": 1433.85,
        "glass": 1586.64,
        "inserts": 1660.71
      },
      "8": {
        "solid": 1240.79,
        "glass": 1444.5,
        "inserts": 1543.26
      },
      "8.2": {
        "solid": 1558.08,
        "glass": 1761.8,
        "inserts": 1860.55
      },
      "8.4": {
        "solid": 1558.08,
        "glass": 1761.8,
        "inserts": 1860.55
      },
      "8.6": {
        "solid": 1558.08,
        "glass": 1761.8,
        "inserts": 1860.55
      },
      "8.8": {
        "solid": 1558.08,
        "glass": 1761.8,
        "inserts": 1860.55
      },
      "8.10": {
        "solid": 1558.08,
        "glass": 1761.8,
        "inserts": 1860.55
      },
      "9": {
        "solid": 1348.81,
        "glass": 1552.53,
        "inserts": 1651.29
      },
      "9.2": {
        "solid": 1795.9,
        "glass": 1999.62,
        "inserts": 2098.37
      },
      "9.4": {
        "solid": 1795.9,
        "glass": 1999.62,
        "inserts": 2098.37
      },
      "9.6": {
        "solid": 1795.9,
        "glass": 1999.62,
        "inserts": 2098.37
      },
      "9.8": {
        "solid": 1795.9,
        "glass": 1999.62,
        "inserts": 2098.37
      },
      "9.10": {
        "solid": 1795.9,
        "glass": 1999.62,
        "inserts": 2098.37
      },
      "10": {
        "solid": 1555.61,
        "glass": 1810.24,
        "inserts": 1933.72
      },
      "10.2": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "10.4": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "10.6": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "10.8": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "10.10": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "11": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "11.2": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "11.4": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "11.6": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "11.8": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "11.10": {
        "solid": 2101.46,
        "glass": 2356.1,
        "inserts": 2479.57
      },
      "12": {
        "solid": 1819.51,
        "glass": 2125.07,
        "inserts": 2273.23
      },
      "12.2": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "12.4": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "12.6": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "12.8": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "12.10": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "13": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "13.2": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "13.4": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "13.6": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "13.8": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "13.10": {
        "solid": 2410.27,
        "glass": 2715.83,
        "inserts": 2863.99
      },
      "14": {
        "solid": 2088.04,
        "glass": 2444.53,
        "inserts": 2617.37
      },
      "14.2": {
        "solid": 2571.77,
        "glass": 2928.27,
        "inserts": 3101.11
      },
      "14.4": {
        "solid": 2571.77,
        "glass": 2928.27,
        "inserts": 3101.11
      },
      "14.6": {
        "solid": 2571.77,
        "glass": 2928.27,
        "inserts": 3101.11
      },
      "14.8": {
        "solid": 2571.77,
        "glass": 2928.27,
        "inserts": 3101.11
      },
      "14.10": {
        "solid": 2571.77,
        "glass": 2928.27,
        "inserts": 3101.11
      },
      "15": {
        "solid": 2228.47,
        "glass": 2584.97,
        "inserts": 2757.81
      },
      "15.2": {
        "solid": 2671.16,
        "glass": 3027.65,
        "inserts": 3200.49
      },
      "15.4": {
        "solid": 2671.16,
        "glass": 3027.65,
        "inserts": 3200.49
      },
      "15.6": {
        "solid": 2671.16,
        "glass": 3027.65,
        "inserts": 3200.49
      },
      "15.8": {
        "solid": 2671.16,
        "glass": 3027.65,
        "inserts": 3200.49
      },
      "15.10": {
        "solid": 2671.16,
        "glass": 3027.65,
        "inserts": 3200.49
      },
      "16": {
        "solid": 2314.9,
        "glass": 2722.32,
        "inserts": 2919.86
      },
      "16.2": {
        "solid": 2921.4,
        "glass": 3328.82,
        "inserts": 3526.37
      },
      "16.4": {
        "solid": 2921.4,
        "glass": 3328.82,
        "inserts": 3526.37
      },
      "16.6": {
        "solid": 2921.4,
        "glass": 3328.82,
        "inserts": 3526.37
      },
      "16.8": {
        "solid": 2921.4,
        "glass": 3328.82,
        "inserts": 3526.37
      },
      "16.10": {
        "solid": 2921.4,
        "glass": 3328.82,
        "inserts": 3526.37
      },
      "17": {
        "solid": 2532.5,
        "glass": 2939.92,
        "inserts": 3137.46
      },
      "17.2": {
        "solid": 3137.92,
        "glass": 3545.34,
        "inserts": 3742.89
      },
      "17.4": {
        "solid": 3137.92,
        "glass": 3545.34,
        "inserts": 3742.89
      },
      "17.6": {
        "solid": 3137.92,
        "glass": 3545.34,
        "inserts": 3742.89
      },
      "17.8": {
        "solid": 3137.92,
        "glass": 3545.34,
        "inserts": 3742.89
      },
      "17.10": {
        "solid": 3137.92,
        "glass": 3545.34,
        "inserts": 3742.89
      },
      "18": {
        "solid": 2720.78,
        "glass": 3128.2,
        "inserts": 3325.74
      },
      "18.2": {
        "solid": 3329.59
      },
      "18.4": {
        "solid": 3329.59
      },
      "18.6": {
        "solid": 3329.59
      },
      "18.8": {
        "solid": 3329.59
      },
      "18.10": {
        "solid": 3329.59
      },
      "19": {
        "solid": 2887.45
      },
      "19.2": {
        "solid": 3533.69
      },
      "19.4": {
        "solid": 3533.69
      },
      "19.6": {
        "solid": 3533.69
      },
      "19.8": {
        "solid": 3533.69
      },
      "19.10": {
        "solid": 3533.69
      },
      "20": {
        "solid": 3064.92
      }
    },
    "9": {
      "6.2": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "6.4": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "6.6": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "6.8": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "6.10": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "7": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "7.2": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "7.4": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "7.6": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "7.8": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "7.10": {
        "solid": 1881.24,
        "glass": 2034.03,
        "inserts": 2108.1
      },
      "8": {
        "solid": 1635.86,
        "glass": 1839.58,
        "inserts": 1938.33
      },
      "8.2": {
        "solid": 2005.47,
        "glass": 2209.19,
        "inserts": 2307.95
      },
      "8.4": {
        "solid": 2005.47,
        "glass": 2209.19,
        "inserts": 2307.95
      },
      "8.6": {
        "solid": 2005.47,
        "glass": 2209.19,
        "inserts": 2307.95
      },
      "8.8": {
        "solid": 2005.47,
        "glass": 2209.19,
        "inserts": 2307.95
      },
      "8.10": {
        "solid": 2005.47,
        "glass": 2209.19,
        "inserts": 2307.95
      },
      "9": {
        "solid": 1743.89,
        "glass": 1947.61,
        "inserts": 2046.36
      },
      "9.2": {
        "solid": 2239.74,
        "glass": 2443.46,
        "inserts": 2542.21
      },
      "9.4": {
        "solid": 2239.74,
        "glass": 2443.46,
        "inserts": 2542.21
      },
      "9.6": {
        "solid": 2239.74,
        "glass": 2443.46,
        "inserts": 2542.21
      },
      "9.8": {
        "solid": 2239.74,
        "glass": 2443.46,
        "inserts": 2542.21
      },
      "9.10": {
        "solid": 2239.74,
        "glass": 2443.46,
        "inserts": 2542.21
      },
      "10": {
        "solid": 1947.6,
        "glass": 2202.23,
        "inserts": 2325.71
      },
      "10.2": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "10.4": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "10.6": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "10.8": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "10.10": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "11": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "11.2": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "11.4": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "11.6": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "11.8": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "11.10": {
        "solid": 2686.98,
        "glass": 2941.61,
        "inserts": 3065.08
      },
      "12": {
        "solid": 2336.5,
        "glass": 2642.06,
        "inserts": 2790.22
      },
      "12.2": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "12.4": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "12.6": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "12.8": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "12.10": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "13": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "13.2": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "13.4": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "13.6": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "13.8": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "13.10": {
        "solid": 3009.98,
        "glass": 3315.55,
        "inserts": 3463.7
      },
      "14": {
        "solid": 2617.38,
        "glass": 2973.87,
        "inserts": 3146.71
      },
      "14.2": {
        "solid": 3160.84,
        "glass": 3517.33,
        "inserts": 3690.17
      },
      "14.4": {
        "solid": 3160.84,
        "glass": 3517.33,
        "inserts": 3690.17
      },
      "14.6": {
        "solid": 3160.84,
        "glass": 3517.33,
        "inserts": 3690.17
      },
      "14.8": {
        "solid": 3160.84,
        "glass": 3517.33,
        "inserts": 3690.17
      },
      "14.10": {
        "solid": 3160.84,
        "glass": 3517.33,
        "inserts": 3690.17
      },
      "15": {
        "solid": 2748.55,
        "glass": 3105.05,
        "inserts": 3277.89
      },
      "15.2": {
        "solid": 3439.47,
        "glass": 3795.97,
        "inserts": 3968.81
      },
      "15.4": {
        "solid": 3439.47,
        "glass": 3795.97,
        "inserts": 3968.81
      },
      "15.6": {
        "solid": 3439.47,
        "glass": 3795.97,
        "inserts": 3968.81
      },
      "15.8": {
        "solid": 3439.47,
        "glass": 3795.97,
        "inserts": 3968.81
      },
      "15.10": {
        "solid": 3439.47,
        "glass": 3795.97,
        "inserts": 3968.81
      },
      "16": {
        "solid": 2990.85,
        "glass": 3398.27,
        "inserts": 3595.81
      },
      "16.2": {
        "solid": 3920.43,
        "glass": 4327.85,
        "inserts": 4525.4
      },
      "16.4": {
        "solid": 3920.43,
        "glass": 4327.85,
        "inserts": 4525.4
      },
      "16.6": {
        "solid": 3920.43,
        "glass": 4327.85,
        "inserts": 4525.4
      },
      "16.8": {
        "solid": 3920.43,
        "glass": 4327.85,
        "inserts": 4525.4
      },
      "16.10": {
        "solid": 3920.43,
        "glass": 4327.85,
        "inserts": 4525.4
      },
      "17": {
        "solid": 3409.07,
        "glass": 3816.49,
        "inserts": 4014.04
      },
      "17.2": {
        "solid": 4115.66,
        "glass": 4523.08,
        "inserts": 4720.62
      },
      "17.4": {
        "solid": 4115.66,
        "glass": 4523.08,
        "inserts": 4720.62
      },
      "17.6": {
        "solid": 4115.66,
        "glass": 4523.08,
        "inserts": 4720.62
      },
      "17.8": {
        "solid": 4115.66,
        "glass": 4523.08,
        "inserts": 4720.62
      },
      "17.10": {
        "solid": 4115.66,
        "glass": 4523.08,
        "inserts": 4720.62
      },
      "18": {
        "solid": 3578.83,
        "glass": 3986.25,
        "inserts": 4183.8
      },
      "18.2": {
        "solid": 4362.35
      },
      "18.4": {
        "solid": 4362.35
      },
      "18.6": {
        "solid": 4362.35
      },
      "18.8": {
        "solid": 4362.35
      },
      "18.10": {
        "solid": 4362.35
      },
      "19": {
        "solid": 3793.35
      },
      "19.2": {
        "solid": 4625.01
      },
      "19.4": {
        "solid": 4625.01
      },
      "19.6": {
        "solid": 4625.01
      },
      "19.8": {
        "solid": 4625.01
      },
      "19.10": {
        "solid": 4625.01
      },
      "20": {
        "solid": 4021.75
      }
    },
    "10": {
      "6.2": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "6.4": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "6.6": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "6.8": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "6.10": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "7": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "7.2": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "7.4": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "7.6": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "7.8": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "7.10": {
        "solid": 1977.08,
        "glass": 2129.87,
        "inserts": 2203.94
      },
      "8": {
        "solid": 1719.2,
        "glass": 1922.92,
        "inserts": 2021.67
      },
      "8.2": {
        "solid": 2094.21,
        "glass": 2297.93,
        "inserts": 2396.68
      },
      "8.4": {
        "solid": 2094.21,
        "glass": 2297.93,
        "inserts": 2396.68
      },
      "8.6": {
        "solid": 2094.21,
        "glass": 2297.93,
        "inserts": 2396.68
      },
      "8.8": {
        "solid": 2094.21,
        "glass": 2297.93,
        "inserts": 2396.68
      },
      "8.10": {
        "solid": 2094.21,
        "glass": 2297.93,
        "inserts": 2396.68
      },
      "9": {
        "solid": 1821.05,
        "glass": 2024.77,
        "inserts": 2123.53
      },
      "9.2": {
        "solid": 2259.26,
        "glass": 2462.98,
        "inserts": 2561.74
      },
      "9.4": {
        "solid": 2259.26,
        "glass": 2462.98,
        "inserts": 2561.74
      },
      "9.6": {
        "solid": 2259.26,
        "glass": 2462.98,
        "inserts": 2561.74
      },
      "9.8": {
        "solid": 2259.26,
        "glass": 2462.98,
        "inserts": 2561.74
      },
      "9.10": {
        "solid": 2259.26,
        "glass": 2462.98,
        "inserts": 2561.74
      },
      "10": {
        "solid": 1964.58,
        "glass": 2219.21,
        "inserts": 2342.68
      },
      "10.2": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "10.4": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "10.6": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "10.8": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "10.10": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "11": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "11.2": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "11.4": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "11.6": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "11.8": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "11.10": {
        "solid": 2711.83,
        "glass": 2966.46,
        "inserts": 3089.93
      },
      "12": {
        "solid": 2358.11,
        "glass": 2663.67,
        "inserts": 2811.83
      },
      "12.2": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "12.4": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "12.6": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "12.8": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "12.10": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "13": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "13.2": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "13.4": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "13.6": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "13.8": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "13.10": {
        "solid": 3036.61,
        "glass": 3342.17,
        "inserts": 3490.32
      },
      "14": {
        "solid": 2640.53,
        "glass": 2997.02,
        "inserts": 3169.86
      },
      "14.2": {
        "solid": 3187.46,
        "glass": 3543.95,
        "inserts": 3716.79
      },
      "14.4": {
        "solid": 3187.46,
        "glass": 3543.95,
        "inserts": 3716.79
      },
      "14.6": {
        "solid": 3187.46,
        "glass": 3543.95,
        "inserts": 3716.79
      },
      "14.8": {
        "solid": 3187.46,
        "glass": 3543.95,
        "inserts": 3716.79
      },
      "14.10": {
        "solid": 3187.46,
        "glass": 3543.95,
        "inserts": 3716.79
      },
      "15": {
        "solid": 2771.7,
        "glass": 3128.2,
        "inserts": 3301.04
      },
      "15.2": {
        "solid": 3634.7,
        "glass": 3991.19,
        "inserts": 4164.03
      },
      "15.4": {
        "solid": 3634.7,
        "glass": 3991.19,
        "inserts": 4164.03
      },
      "15.6": {
        "solid": 3634.7,
        "glass": 3991.19,
        "inserts": 4164.03
      },
      "15.8": {
        "solid": 3634.7,
        "glass": 3991.19,
        "inserts": 4164.03
      },
      "15.10": {
        "solid": 3634.7,
        "glass": 3991.19,
        "inserts": 4164.03
      },
      "16": {
        "solid": 3160.61,
        "glass": 3568.03,
        "inserts": 3765.57
      },
      "16.2": {
        "solid": 4142.28,
        "glass": 4549.7,
        "inserts": 4747.24
      },
      "16.4": {
        "solid": 4142.28,
        "glass": 4549.7,
        "inserts": 4747.24
      },
      "16.6": {
        "solid": 4142.28,
        "glass": 4549.7,
        "inserts": 4747.24
      },
      "16.8": {
        "solid": 4142.28,
        "glass": 4549.7,
        "inserts": 4747.24
      },
      "16.10": {
        "solid": 4142.28,
        "glass": 4549.7,
        "inserts": 4747.24
      },
      "17": {
        "solid": 3601.98,
        "glass": 4009.4,
        "inserts": 4206.95
      },
      "17.2": {
        "solid": 4348.15,
        "glass": 4755.57,
        "inserts": 4953.11
      },
      "17.4": {
        "solid": 4348.15,
        "glass": 4755.57,
        "inserts": 4953.11
      },
      "17.6": {
        "solid": 4348.15,
        "glass": 4755.57,
        "inserts": 4953.11
      },
      "17.8": {
        "solid": 4348.15,
        "glass": 4755.57,
        "inserts": 4953.11
      },
      "17.10": {
        "solid": 4348.15,
        "glass": 4755.57,
        "inserts": 4953.11
      },
      "18": {
        "solid": 3781.0,
        "glass": 4188.42,
        "inserts": 4385.96
      },
      "18.2": {
        "solid": 4609.04
      },
      "18.4": {
        "solid": 4609.04
      },
      "18.6": {
        "solid": 4609.04
      },
      "18.8": {
        "solid": 4609.04
      },
      "18.10": {
        "solid": 4609.04
      },
      "19": {
        "solid": 4007.86
      },
      "19.2": {
        "solid": 4885.9
      },
      "19.4": {
        "solid": 4885.9
      },
      "19.6": {
        "solid": 4885.9
      },
      "19.8": {
        "solid": 4885.9
      },
      "19.10": {
        "solid": 4885.9
      },
      "20": {
        "solid": 4248.61
      }
    }
  },
  "4300/4301/4302/4305/4310": {
    "7": {
      "6.2": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "6.4": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "6.6": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "6.8": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "6.10": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "7": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "7.2": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "7.4": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "7.6": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "7.8": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "7.10": {
        "solid": 989.33,
        "glass": 1115.9,
        "inserts": 1177.26
      },
      "8": {
        "solid": 855.28,
        "glass": 1024.03,
        "inserts": 1105.85
      },
      "8.2": {
        "solid": 1071.66,
        "glass": 1240.41,
        "inserts": 1322.23
      },
      "8.4": {
        "solid": 1071.66,
        "glass": 1240.41,
        "inserts": 1322.23
      },
      "8.6": {
        "solid": 1071.66,
        "glass": 1240.41,
        "inserts": 1322.23
      },
      "8.8": {
        "solid": 1071.66,
        "glass": 1240.41,
        "inserts": 1322.23
      },
      "8.10": {
        "solid": 1071.66,
        "glass": 1240.41,
        "inserts": 1322.23
      },
      "9": {
        "solid": 926.88,
        "glass": 1095.63,
        "inserts": 1177.45
      },
      "9.2": {
        "solid": 1205.45,
        "glass": 1374.2,
        "inserts": 1456.02
      },
      "9.4": {
        "solid": 1205.45,
        "glass": 1374.2,
        "inserts": 1456.02
      },
      "9.6": {
        "solid": 1205.45,
        "glass": 1374.2,
        "inserts": 1456.02
      },
      "9.8": {
        "solid": 1205.45,
        "glass": 1374.2,
        "inserts": 1456.02
      },
      "9.10": {
        "solid": 1205.45,
        "glass": 1374.2,
        "inserts": 1456.02
      },
      "10": {
        "solid": 1043.22,
        "glass": 1254.16,
        "inserts": 1356.43
      },
      "10.2": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "10.4": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "10.6": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "10.8": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "10.10": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "11": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "11.2": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "11.4": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "11.6": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "11.8": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "11.10": {
        "solid": 1458.58,
        "glass": 1669.53,
        "inserts": 1771.8
      },
      "12": {
        "solid": 1261.83,
        "glass": 1514.96,
        "inserts": 1637.69
      },
      "12.2": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "12.4": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "12.6": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "12.8": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "12.10": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "13": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "13.2": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "13.4": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "13.6": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "13.8": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "13.10": {
        "solid": 1652.65,
        "glass": 1905.78,
        "inserts": 2028.51
      },
      "14": {
        "solid": 1430.59,
        "glass": 1725.91,
        "inserts": 1869.09
      },
      "14.2": {
        "solid": 1739.4,
        "glass": 2034.72,
        "inserts": 2177.9
      },
      "14.4": {
        "solid": 1739.4,
        "glass": 2034.72,
        "inserts": 2177.9
      },
      "14.6": {
        "solid": 1739.4,
        "glass": 2034.72,
        "inserts": 2177.9
      },
      "14.8": {
        "solid": 1739.4,
        "glass": 2034.72,
        "inserts": 2177.9
      },
      "14.10": {
        "solid": 1739.4,
        "glass": 2034.72,
        "inserts": 2177.9
      },
      "15": {
        "solid": 1506.01,
        "glass": 1801.34,
        "inserts": 1944.51
      },
      "15.2": {
        "solid": 1786.44,
        "glass": 2081.76,
        "inserts": 2224.94
      },
      "15.4": {
        "solid": 1786.44,
        "glass": 2081.76,
        "inserts": 2224.94
      },
      "15.6": {
        "solid": 1786.44,
        "glass": 2081.76,
        "inserts": 2224.94
      },
      "15.8": {
        "solid": 1786.44,
        "glass": 2081.76,
        "inserts": 2224.94
      },
      "15.10": {
        "solid": 1786.44,
        "glass": 2081.76,
        "inserts": 2224.94
      },
      "16": {
        "solid": 1546.92,
        "glass": 1884.44,
        "inserts": 2048.09
      },
      "16.2": {
        "solid": 2040.79,
        "glass": 2378.31,
        "inserts": 2541.95
      },
      "16.4": {
        "solid": 2040.79,
        "glass": 2378.31,
        "inserts": 2541.95
      },
      "16.6": {
        "solid": 2040.79,
        "glass": 2378.31,
        "inserts": 2541.95
      },
      "16.8": {
        "solid": 2040.79,
        "glass": 2378.31,
        "inserts": 2541.95
      },
      "16.10": {
        "solid": 2040.79,
        "glass": 2378.31,
        "inserts": 2541.95
      },
      "17": {
        "solid": 1768.1,
        "glass": 2105.61,
        "inserts": 2269.26
      },
      "17.2": {
        "solid": 2131.94,
        "glass": 2469.46,
        "inserts": 2633.1
      },
      "17.4": {
        "solid": 2131.94,
        "glass": 2469.46,
        "inserts": 2633.1
      },
      "17.6": {
        "solid": 2131.94,
        "glass": 2469.46,
        "inserts": 2633.1
      },
      "17.8": {
        "solid": 2131.94,
        "glass": 2469.46,
        "inserts": 2633.1
      },
      "17.10": {
        "solid": 2131.94,
        "glass": 2469.46,
        "inserts": 2633.1
      },
      "18": {
        "solid": 1847.36,
        "glass": 2184.88,
        "inserts": 2348.52
      },
      "18.2": {
        "solid": 2262.79
      },
      "18.4": {
        "solid": 2262.79
      },
      "18.6": {
        "solid": 2262.79
      },
      "18.8": {
        "solid": 2262.79
      },
      "18.10": {
        "solid": 2262.79
      },
      "19": {
        "solid": 1961.14
      },
      "19.2": {
        "solid": 2400.99
      },
      "19.4": {
        "solid": 2400.99
      },
      "19.6": {
        "solid": 2400.99
      },
      "19.8": {
        "solid": 2400.99
      },
      "19.10": {
        "solid": 2400.99
      },
      "20": {
        "solid": 2081.32
      }
    },
    "8": {
      "6.2": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "6.4": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "6.6": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "6.8": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "6.10": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "7": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "7.2": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "7.4": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "7.6": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "7.8": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "7.10": {
        "solid": 1187.81,
        "glass": 1314.38,
        "inserts": 1375.74
      },
      "8": {
        "solid": 1027.87,
        "glass": 1196.62,
        "inserts": 1278.45
      },
      "8.2": {
        "solid": 1290.72,
        "glass": 1459.47,
        "inserts": 1541.29
      },
      "8.4": {
        "solid": 1290.72,
        "glass": 1459.47,
        "inserts": 1541.29
      },
      "8.6": {
        "solid": 1290.72,
        "glass": 1459.47,
        "inserts": 1541.29
      },
      "8.8": {
        "solid": 1290.72,
        "glass": 1459.47,
        "inserts": 1541.29
      },
      "8.10": {
        "solid": 1290.72,
        "glass": 1459.47,
        "inserts": 1541.29
      },
      "9": {
        "solid": 1117.37,
        "glass": 1286.12,
        "inserts": 1367.94
      },
      "9.2": {
        "solid": 1487.73,
        "glass": 1656.48,
        "inserts": 1738.3
      },
      "9.4": {
        "solid": 1487.73,
        "glass": 1656.48,
        "inserts": 1738.3
      },
      "9.6": {
        "solid": 1487.73,
        "glass": 1656.48,
        "inserts": 1738.3
      },
      "9.8": {
        "solid": 1487.73,
        "glass": 1656.48,
        "inserts": 1738.3
      },
      "9.10": {
        "solid": 1487.73,
        "glass": 1656.48,
        "inserts": 1738.3
      },
      "10": {
        "solid": 1288.68,
        "glass": 1499.62,
        "inserts": 1601.89
      },
      "10.2": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "10.4": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "10.6": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "10.8": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "10.10": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "11": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "11.2": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "11.4": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "11.6": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "11.8": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "11.10": {
        "solid": 1740.87,
        "glass": 1951.81,
        "inserts": 2054.08
      },
      "12": {
        "solid": 1507.29,
        "glass": 1760.42,
        "inserts": 1883.15
      },
      "12.2": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "12.4": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "12.6": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "12.8": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "12.10": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "13": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "13.2": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "13.4": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "13.6": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "13.8": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "13.10": {
        "solid": 1996.68,
        "glass": 2249.81,
        "inserts": 2372.54
      },
      "14": {
        "solid": 1729.74,
        "glass": 2025.06,
        "inserts": 2168.24
      },
      "14.2": {
        "solid": 2130.47,
        "glass": 2425.8,
        "inserts": 2568.97
      },
      "14.4": {
        "solid": 2130.47,
        "glass": 2425.8,
        "inserts": 2568.97
      },
      "14.6": {
        "solid": 2130.47,
        "glass": 2425.8,
        "inserts": 2568.97
      },
      "14.8": {
        "solid": 2130.47,
        "glass": 2425.8,
        "inserts": 2568.97
      },
      "14.10": {
        "solid": 2130.47,
        "glass": 2425.8,
        "inserts": 2568.97
      },
      "15": {
        "solid": 1846.08,
        "glass": 2141.4,
        "inserts": 2284.58
      },
      "15.2": {
        "solid": 2212.81,
        "glass": 2508.13,
        "inserts": 2651.31
      },
      "15.4": {
        "solid": 2212.81,
        "glass": 2508.13,
        "inserts": 2651.31
      },
      "15.6": {
        "solid": 2212.81,
        "glass": 2508.13,
        "inserts": 2651.31
      },
      "15.8": {
        "solid": 2212.81,
        "glass": 2508.13,
        "inserts": 2651.31
      },
      "15.10": {
        "solid": 2212.81,
        "glass": 2508.13,
        "inserts": 2651.31
      },
      "16": {
        "solid": 1917.68,
        "glass": 2255.19,
        "inserts": 2418.84
      },
      "16.2": {
        "solid": 2420.11,
        "glass": 2757.62,
        "inserts": 2921.27
      },
      "16.4": {
        "solid": 2420.11,
        "glass": 2757.62,
        "inserts": 2921.27
      },
      "16.6": {
        "solid": 2420.11,
        "glass": 2757.62,
        "inserts": 2921.27
      },
      "16.8": {
        "solid": 2420.11,
        "glass": 2757.62,
        "inserts": 2921.27
      },
      "16.10": {
        "solid": 2420.11,
        "glass": 2757.62,
        "inserts": 2921.27
      },
      "17": {
        "solid": 2097.94,
        "glass": 2435.45,
        "inserts": 2599.1
      },
      "17.2": {
        "solid": 2599.47,
        "glass": 2936.99,
        "inserts": 3100.63
      },
      "17.4": {
        "solid": 2599.47,
        "glass": 2936.99,
        "inserts": 3100.63
      },
      "17.6": {
        "solid": 2599.47,
        "glass": 2936.99,
        "inserts": 3100.63
      },
      "17.8": {
        "solid": 2599.47,
        "glass": 2936.99,
        "inserts": 3100.63
      },
      "17.10": {
        "solid": 2599.47,
        "glass": 2936.99,
        "inserts": 3100.63
      },
      "18": {
        "solid": 2253.91,
        "glass": 2591.43,
        "inserts": 2755.07
      },
      "18.2": {
        "solid": 2758.26
      },
      "18.4": {
        "solid": 2758.26
      },
      "18.6": {
        "solid": 2758.26
      },
      "18.8": {
        "solid": 2758.26
      },
      "18.10": {
        "solid": 2758.26
      },
      "19": {
        "solid": 2391.98
      },
      "19.2": {
        "solid": 2927.33
      },
      "19.4": {
        "solid": 2927.33
      },
      "19.6": {
        "solid": 2927.33
      },
      "19.8": {
        "solid": 2927.33
      },
      "19.10": {
        "solid": 2927.33
      },
      "20": {
        "solid": 2539.0
      }
    },
    "9": {
      "6.2": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "6.4": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "6.6": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "6.8": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "6.10": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "7": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "7.2": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "7.4": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "7.6": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "7.8": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "7.10": {
        "solid": 1558.43,
        "glass": 1685.0,
        "inserts": 1746.36
      },
      "8": {
        "solid": 1355.16,
        "glass": 1523.91,
        "inserts": 1605.73
      },
      "8.2": {
        "solid": 1661.35,
        "glass": 1830.1,
        "inserts": 1911.92
      },
      "8.4": {
        "solid": 1661.35,
        "glass": 1830.1,
        "inserts": 1911.92
      },
      "8.6": {
        "solid": 1661.35,
        "glass": 1830.1,
        "inserts": 1911.92
      },
      "8.8": {
        "solid": 1661.35,
        "glass": 1830.1,
        "inserts": 1911.92
      },
      "8.10": {
        "solid": 1661.35,
        "glass": 1830.1,
        "inserts": 1911.92
      },
      "9": {
        "solid": 1444.65,
        "glass": 1613.4,
        "inserts": 1695.22
      },
      "9.2": {
        "solid": 1855.42,
        "glass": 2024.17,
        "inserts": 2105.99
      },
      "9.4": {
        "solid": 1855.42,
        "glass": 2024.17,
        "inserts": 2105.99
      },
      "9.6": {
        "solid": 1855.42,
        "glass": 2024.17,
        "inserts": 2105.99
      },
      "9.8": {
        "solid": 1855.42,
        "glass": 2024.17,
        "inserts": 2105.99
      },
      "9.10": {
        "solid": 1855.42,
        "glass": 2024.17,
        "inserts": 2105.99
      },
      "10": {
        "solid": 1613.4,
        "glass": 1824.35,
        "inserts": 1926.62
      },
      "10.2": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "10.4": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "10.6": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "10.8": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "10.10": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "11": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "11.2": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "11.4": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "11.6": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "11.8": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "11.10": {
        "solid": 2225.91,
        "glass": 2436.86,
        "inserts": 2539.12
      },
      "12": {
        "solid": 1935.57,
        "glass": 2188.7,
        "inserts": 2311.43
      },
      "12.2": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "12.4": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "12.6": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "12.8": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "12.10": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "13": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "13.2": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "13.4": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "13.6": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "13.8": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "13.10": {
        "solid": 2493.49,
        "glass": 2746.61,
        "inserts": 2869.35
      },
      "14": {
        "solid": 2168.25,
        "glass": 2463.57,
        "inserts": 2606.75
      },
      "14.2": {
        "solid": 2618.46,
        "glass": 2913.78,
        "inserts": 3056.96
      },
      "14.4": {
        "solid": 2618.46,
        "glass": 2913.78,
        "inserts": 3056.96
      },
      "14.6": {
        "solid": 2618.46,
        "glass": 2913.78,
        "inserts": 3056.96
      },
      "14.8": {
        "solid": 2618.46,
        "glass": 2913.78,
        "inserts": 3056.96
      },
      "14.10": {
        "solid": 2618.46,
        "glass": 2913.78,
        "inserts": 3056.96
      },
      "15": {
        "solid": 2276.92,
        "glass": 2572.24,
        "inserts": 2715.42
      },
      "15.2": {
        "solid": 2849.28,
        "glass": 3144.6,
        "inserts": 3287.78
      },
      "15.4": {
        "solid": 2849.28,
        "glass": 3144.6,
        "inserts": 3287.78
      },
      "15.6": {
        "solid": 2849.28,
        "glass": 3144.6,
        "inserts": 3287.78
      },
      "15.8": {
        "solid": 2849.28,
        "glass": 3144.6,
        "inserts": 3287.78
      },
      "15.10": {
        "solid": 2849.28,
        "glass": 3144.6,
        "inserts": 3287.78
      },
      "16": {
        "solid": 2477.64,
        "glass": 2815.15,
        "inserts": 2978.8
      },
      "16.2": {
        "solid": 3247.71,
        "glass": 3585.23,
        "inserts": 3748.87
      },
      "16.4": {
        "solid": 3247.71,
        "glass": 3585.23,
        "inserts": 3748.87
      },
      "16.6": {
        "solid": 3247.71,
        "glass": 3585.23,
        "inserts": 3748.87
      },
      "16.8": {
        "solid": 3247.71,
        "glass": 3585.23,
        "inserts": 3748.87
      },
      "16.10": {
        "solid": 3247.71,
        "glass": 3585.23,
        "inserts": 3748.87
      },
      "17": {
        "solid": 2824.1,
        "glass": 3161.61,
        "inserts": 3325.26
      },
      "17.2": {
        "solid": 3409.44,
        "glass": 3746.95,
        "inserts": 3910.6
      },
      "17.4": {
        "solid": 3409.44,
        "glass": 3746.95,
        "inserts": 3910.6
      },
      "17.6": {
        "solid": 3409.44,
        "glass": 3746.95,
        "inserts": 3910.6
      },
      "17.8": {
        "solid": 3409.44,
        "glass": 3746.95,
        "inserts": 3910.6
      },
      "17.10": {
        "solid": 3409.44,
        "glass": 3746.95,
        "inserts": 3910.6
      },
      "18": {
        "solid": 2964.73,
        "glass": 3302.24,
        "inserts": 3465.89
      },
      "18.2": {
        "solid": 3613.8
      },
      "18.4": {
        "solid": 3613.8
      },
      "18.6": {
        "solid": 3613.8
      },
      "18.8": {
        "solid": 3613.8
      },
      "18.10": {
        "solid": 3613.8
      },
      "19": {
        "solid": 3142.43
      },
      "19.2": {
        "solid": 3831.39
      },
      "19.4": {
        "solid": 3831.39
      },
      "19.6": {
        "solid": 3831.39
      },
      "19.8": {
        "solid": 3831.39
      },
      "19.10": {
        "solid": 3831.39
      },
      "20": {
        "solid": 3331.64
      }
    },
    "10": {
      "6.2": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "6.4": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "6.6": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "6.8": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "6.10": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "7": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "7.2": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "7.4": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "7.6": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "7.8": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "7.10": {
        "solid": 1637.82,
        "glass": 1764.39,
        "inserts": 1825.75
      },
      "8": {
        "solid": 1424.19,
        "glass": 1592.94,
        "inserts": 1674.77
      },
      "8.2": {
        "solid": 1734.86,
        "glass": 1903.61,
        "inserts": 1985.43
      },
      "8.4": {
        "solid": 1734.86,
        "glass": 1903.61,
        "inserts": 1985.43
      },
      "8.6": {
        "solid": 1734.86,
        "glass": 1903.61,
        "inserts": 1985.43
      },
      "8.8": {
        "solid": 1734.86,
        "glass": 1903.61,
        "inserts": 1985.43
      },
      "8.10": {
        "solid": 1734.86,
        "glass": 1903.61,
        "inserts": 1985.43
      },
      "9": {
        "solid": 1508.57,
        "glass": 1677.32,
        "inserts": 1759.14
      },
      "9.2": {
        "solid": 1871.59,
        "glass": 2040.34,
        "inserts": 2122.16
      },
      "9.4": {
        "solid": 1871.59,
        "glass": 2040.34,
        "inserts": 2122.16
      },
      "9.6": {
        "solid": 1871.59,
        "glass": 2040.34,
        "inserts": 2122.16
      },
      "9.8": {
        "solid": 1871.59,
        "glass": 2040.34,
        "inserts": 2122.16
      },
      "9.10": {
        "solid": 1871.59,
        "glass": 2040.34,
        "inserts": 2122.16
      },
      "10": {
        "solid": 1627.47,
        "glass": 1838.41,
        "inserts": 1940.68
      },
      "10.2": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "10.4": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "10.6": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "10.8": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "10.10": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "11": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "11.2": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "11.4": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "11.6": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "11.8": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "11.10": {
        "solid": 2246.49,
        "glass": 2457.44,
        "inserts": 2559.71
      },
      "12": {
        "solid": 1953.47,
        "glass": 2206.6,
        "inserts": 2329.33
      },
      "12.2": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "12.4": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "12.6": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "12.8": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "12.10": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "13": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "13.2": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "13.4": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "13.6": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "13.8": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "13.10": {
        "solid": 2515.54,
        "glass": 2768.67,
        "inserts": 2891.4
      },
      "14": {
        "solid": 2187.43,
        "glass": 2482.75,
        "inserts": 2625.93
      },
      "14.2": {
        "solid": 2640.51,
        "glass": 2935.83,
        "inserts": 3079.01
      },
      "14.4": {
        "solid": 2640.51,
        "glass": 2935.83,
        "inserts": 3079.01
      },
      "14.6": {
        "solid": 2640.51,
        "glass": 2935.83,
        "inserts": 3079.01
      },
      "14.8": {
        "solid": 2640.51,
        "glass": 2935.83,
        "inserts": 3079.01
      },
      "14.10": {
        "solid": 2640.51,
        "glass": 2935.83,
        "inserts": 3079.01
      },
      "15": {
        "solid": 2296.1,
        "glass": 2591.42,
        "inserts": 2734.6
      },
      "15.2": {
        "solid": 3011.01,
        "glass": 3306.33,
        "inserts": 3449.51
      },
      "15.4": {
        "solid": 3011.01,
        "glass": 3306.33,
        "inserts": 3449.51
      },
      "15.6": {
        "solid": 3011.01,
        "glass": 3306.33,
        "inserts": 3449.51
      },
      "15.8": {
        "solid": 3011.01,
        "glass": 3306.33,
        "inserts": 3449.51
      },
      "15.10": {
        "solid": 3011.01,
        "glass": 3306.33,
        "inserts": 3449.51
      },
      "16": {
        "solid": 2618.27,
        "glass": 2955.78,
        "inserts": 3119.43
      },
      "16.2": {
        "solid": 3431.49,
        "glass": 3769.01,
        "inserts": 3932.65
      },
      "16.4": {
        "solid": 3431.49,
        "glass": 3769.01,
        "inserts": 3932.65
      },
      "16.6": {
        "solid": 3431.49,
        "glass": 3769.01,
        "inserts": 3932.65
      },
      "16.8": {
        "solid": 3431.49,
        "glass": 3769.01,
        "inserts": 3932.65
      },
      "16.10": {
        "solid": 3431.49,
        "glass": 3769.01,
        "inserts": 3932.65
      },
      "17": {
        "solid": 2983.9,
        "glass": 3321.42,
        "inserts": 3485.06
      },
      "17.2": {
        "solid": 3602.03,
        "glass": 3939.55,
        "inserts": 4103.19
      },
      "17.4": {
        "solid": 3602.03,
        "glass": 3939.55,
        "inserts": 4103.19
      },
      "17.6": {
        "solid": 3602.03,
        "glass": 3939.55,
        "inserts": 4103.19
      },
      "17.8": {
        "solid": 3602.03,
        "glass": 3939.55,
        "inserts": 4103.19
      },
      "17.10": {
        "solid": 3602.03,
        "glass": 3939.55,
        "inserts": 4103.19
      },
      "18": {
        "solid": 3132.2,
        "glass": 3469.72,
        "inserts": 3633.36
      },
      "18.2": {
        "solid": 3818.16
      },
      "18.4": {
        "solid": 3818.16
      },
      "18.6": {
        "solid": 3818.16
      },
      "18.8": {
        "solid": 3818.16
      },
      "18.10": {
        "solid": 3818.16
      },
      "19": {
        "solid": 3320.14
      },
      "19.2": {
        "solid": 4047.51
      },
      "19.4": {
        "solid": 4047.51
      },
      "19.6": {
        "solid": 4047.51
      },
      "19.8": {
        "solid": 4047.51
      },
      "19.10": {
        "solid": 4047.51
      },
      "20": {
        "solid": 3519.57
      }
    }
  },
  "4050/4051/4053/4132": {
    "7": {
      "6.2": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "6.4": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "6.6": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "6.8": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "6.10": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "7": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "7.2": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "7.4": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "7.6": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "7.8": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "7.10": {
        "solid": 865.99,
        "glass": 1003.06,
        "inserts": 1069.52
      },
      "8": {
        "solid": 747.62,
        "glass": 930.37,
        "inserts": 1018.97
      },
      "8.2": {
        "solid": 936.05,
        "glass": 1118.8,
        "inserts": 1207.4
      },
      "8.4": {
        "solid": 936.05,
        "glass": 1118.8,
        "inserts": 1207.4
      },
      "8.6": {
        "solid": 936.05,
        "glass": 1118.8,
        "inserts": 1207.4
      },
      "8.8": {
        "solid": 936.05,
        "glass": 1118.8,
        "inserts": 1207.4
      },
      "8.10": {
        "solid": 936.05,
        "glass": 1118.8,
        "inserts": 1207.4
      },
      "9": {
        "solid": 808.54,
        "glass": 991.29,
        "inserts": 1079.89
      },
      "9.2": {
        "solid": 1061.83,
        "glass": 1244.58,
        "inserts": 1333.18
      },
      "9.4": {
        "solid": 1061.83,
        "glass": 1244.58,
        "inserts": 1333.18
      },
      "9.6": {
        "solid": 1061.83,
        "glass": 1244.58,
        "inserts": 1333.18
      },
      "9.8": {
        "solid": 1061.83,
        "glass": 1244.58,
        "inserts": 1333.18
      },
      "9.10": {
        "solid": 1061.83,
        "glass": 1244.58,
        "inserts": 1333.18
      },
      "10": {
        "solid": 917.91,
        "glass": 1146.35,
        "inserts": 1257.1
      },
      "10.2": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "10.4": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "10.6": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "10.8": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "10.10": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "11": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "11.2": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "11.4": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "11.6": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "11.8": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "11.10": {
        "solid": 1288.19,
        "glass": 1516.63,
        "inserts": 1627.38
      },
      "12": {
        "solid": 1113.12,
        "glass": 1387.24,
        "inserts": 1520.16
      },
      "12.2": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "12.4": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "12.6": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "12.8": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "12.10": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "13": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "13.2": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "13.4": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "13.6": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "13.8": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "13.10": {
        "solid": 1458.55,
        "glass": 1732.67,
        "inserts": 1865.58
      },
      "14": {
        "solid": 1261.26,
        "glass": 1581.07,
        "inserts": 1736.14
      },
      "14.2": {
        "solid": 1530.19,
        "glass": 1850.0,
        "inserts": 2005.07
      },
      "14.4": {
        "solid": 1530.19,
        "glass": 1850.0,
        "inserts": 2005.07
      },
      "14.6": {
        "solid": 1530.19,
        "glass": 1850.0,
        "inserts": 2005.07
      },
      "14.8": {
        "solid": 1530.19,
        "glass": 1850.0,
        "inserts": 2005.07
      },
      "14.10": {
        "solid": 1530.19,
        "glass": 1850.0,
        "inserts": 2005.07
      },
      "15": {
        "solid": 1323.56,
        "glass": 1643.37,
        "inserts": 1798.44
      },
      "15.2": {
        "solid": 1557.26,
        "glass": 1877.07,
        "inserts": 2032.14
      },
      "15.4": {
        "solid": 1557.26,
        "glass": 1877.07,
        "inserts": 2032.14
      },
      "15.6": {
        "solid": 1557.26,
        "glass": 1877.07,
        "inserts": 2032.14
      },
      "15.8": {
        "solid": 1557.26,
        "glass": 1877.07,
        "inserts": 2032.14
      },
      "15.10": {
        "solid": 1557.26,
        "glass": 1877.07,
        "inserts": 2032.14
      },
      "16": {
        "solid": 1347.1,
        "glass": 1712.61,
        "inserts": 1889.82
      },
      "16.2": {
        "solid": 1797.68,
        "glass": 2163.18,
        "inserts": 2340.39
      },
      "16.4": {
        "solid": 1797.68,
        "glass": 2163.18,
        "inserts": 2340.39
      },
      "16.6": {
        "solid": 1797.68,
        "glass": 2163.18,
        "inserts": 2340.39
      },
      "16.8": {
        "solid": 1797.68,
        "glass": 2163.18,
        "inserts": 2340.39
      },
      "16.10": {
        "solid": 1797.68,
        "glass": 2163.18,
        "inserts": 2340.39
      },
      "17": {
        "solid": 1556.15,
        "glass": 1921.66,
        "inserts": 2098.87
      },
      "17.2": {
        "solid": 1880.47,
        "glass": 2245.98,
        "inserts": 2423.19
      },
      "17.4": {
        "solid": 1880.47,
        "glass": 2245.98,
        "inserts": 2423.19
      },
      "17.6": {
        "solid": 1880.47,
        "glass": 2245.98,
        "inserts": 2423.19
      },
      "17.8": {
        "solid": 1880.47,
        "glass": 2245.98,
        "inserts": 2423.19
      },
      "17.10": {
        "solid": 1880.47,
        "glass": 2245.98,
        "inserts": 2423.19
      },
      "18": {
        "solid": 1628.15,
        "glass": 1993.66,
        "inserts": 2170.87
      }
    },
    "8": {
      "6.2": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "6.4": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "6.6": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "6.8": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "6.10": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "7": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "7.2": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "7.4": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "7.6": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "7.8": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "7.10": {
        "solid": 1047.5,
        "glass": 1184.57,
        "inserts": 1251.02
      },
      "8": {
        "solid": 905.45,
        "glass": 1088.2,
        "inserts": 1176.8
      },
      "8.2": {
        "solid": 1141.43,
        "glass": 1324.19,
        "inserts": 1412.78
      },
      "8.4": {
        "solid": 1141.43,
        "glass": 1324.19,
        "inserts": 1412.78
      },
      "8.6": {
        "solid": 1141.43,
        "glass": 1324.19,
        "inserts": 1412.78
      },
      "8.8": {
        "solid": 1141.43,
        "glass": 1324.19,
        "inserts": 1412.78
      },
      "8.10": {
        "solid": 1141.43,
        "glass": 1324.19,
        "inserts": 1412.78
      },
      "9": {
        "solid": 987.13,
        "glass": 1169.89,
        "inserts": 1258.48
      },
      "9.2": {
        "solid": 1311.79,
        "glass": 1494.55,
        "inserts": 1583.14
      },
      "9.4": {
        "solid": 1311.79,
        "glass": 1494.55,
        "inserts": 1583.14
      },
      "9.6": {
        "solid": 1311.79,
        "glass": 1494.55,
        "inserts": 1583.14
      },
      "9.8": {
        "solid": 1311.79,
        "glass": 1494.55,
        "inserts": 1583.14
      },
      "9.10": {
        "solid": 1311.79,
        "glass": 1494.55,
        "inserts": 1583.14
      },
      "10": {
        "solid": 1135.27,
        "glass": 1363.71,
        "inserts": 1474.47
      },
      "10.2": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "10.4": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "10.6": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "10.8": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "10.10": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "11": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "11.2": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "11.4": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "11.6": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "11.8": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "11.10": {
        "solid": 1533.38,
        "glass": 1761.82,
        "inserts": 1872.57
      },
      "12": {
        "solid": 1326.33,
        "glass": 1600.45,
        "inserts": 1733.37
      },
      "12.2": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "12.4": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "12.6": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "12.8": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "12.10": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "13": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "13.2": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "13.4": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "13.6": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "13.8": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "13.10": {
        "solid": 1759.46,
        "glass": 2033.59,
        "inserts": 2166.5
      },
      "14": {
        "solid": 1522.93,
        "glass": 1842.73,
        "inserts": 1997.8
      },
      "14.2": {
        "solid": 1878.88,
        "glass": 2198.68,
        "inserts": 2353.75
      },
      "14.4": {
        "solid": 1878.88,
        "glass": 2198.68,
        "inserts": 2353.75
      },
      "14.6": {
        "solid": 1878.88,
        "glass": 2198.68,
        "inserts": 2353.75
      },
      "14.8": {
        "solid": 1878.88,
        "glass": 2198.68,
        "inserts": 2353.75
      },
      "14.10": {
        "solid": 1878.88,
        "glass": 2198.68,
        "inserts": 2353.75
      },
      "15": {
        "solid": 1626.76,
        "glass": 1946.57,
        "inserts": 2101.64
      },
      "15.2": {
        "solid": 1953.71,
        "glass": 2273.51,
        "inserts": 2428.58
      },
      "15.4": {
        "solid": 1953.71,
        "glass": 2273.51,
        "inserts": 2428.58
      },
      "15.6": {
        "solid": 1953.71,
        "glass": 2273.51,
        "inserts": 2428.58
      },
      "15.8": {
        "solid": 1953.71,
        "glass": 2273.51,
        "inserts": 2428.58
      },
      "15.10": {
        "solid": 1953.71,
        "glass": 2273.51,
        "inserts": 2428.58
      },
      "16": {
        "solid": 1691.83,
        "glass": 2057.34,
        "inserts": 2234.55
      },
      "16.2": {
        "solid": 2132.03,
        "glass": 2497.54,
        "inserts": 2674.75
      },
      "16.4": {
        "solid": 2132.03,
        "glass": 2497.54,
        "inserts": 2674.75
      },
      "16.6": {
        "solid": 2132.03,
        "glass": 2497.54,
        "inserts": 2674.75
      },
      "16.8": {
        "solid": 2132.03,
        "glass": 2497.54,
        "inserts": 2674.75
      },
      "16.10": {
        "solid": 2132.03,
        "glass": 2497.54,
        "inserts": 2674.75
      },
      "17": {
        "solid": 1846.89,
        "glass": 2212.4,
        "inserts": 2389.61
      },
      "17.2": {
        "solid": 2292.83,
        "glass": 2658.34,
        "inserts": 2835.55
      },
      "17.4": {
        "solid": 2292.83,
        "glass": 2658.34,
        "inserts": 2835.55
      },
      "17.6": {
        "solid": 2292.83,
        "glass": 2658.34,
        "inserts": 2835.55
      },
      "17.8": {
        "solid": 2292.83,
        "glass": 2658.34,
        "inserts": 2835.55
      },
      "17.10": {
        "solid": 2292.83,
        "glass": 2658.34,
        "inserts": 2835.55
      },
      "18": {
        "solid": 1986.73,
        "glass": 2352.23,
        "inserts": 2529.45
      }
    },
    "9": {
      "6.2": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "6.4": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "6.6": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "6.8": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "6.10": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "7": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "7.2": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "7.4": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "7.6": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "7.8": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "7.10": {
        "solid": 1418.61,
        "glass": 1555.68,
        "inserts": 1622.13
      },
      "8": {
        "solid": 1233.57,
        "glass": 1416.32,
        "inserts": 1504.92
      },
      "8.2": {
        "solid": 1536.42,
        "glass": 1719.18,
        "inserts": 1807.78
      },
      "8.4": {
        "solid": 1536.42,
        "glass": 1719.18,
        "inserts": 1807.78
      },
      "8.6": {
        "solid": 1536.42,
        "glass": 1719.18,
        "inserts": 1807.78
      },
      "8.8": {
        "solid": 1536.42,
        "glass": 1719.18,
        "inserts": 1807.78
      },
      "8.10": {
        "solid": 1536.42,
        "glass": 1719.18,
        "inserts": 1807.78
      },
      "9": {
        "solid": 1336.02,
        "glass": 1518.78,
        "inserts": 1607.37
      },
      "9.2": {
        "solid": 1780.02,
        "glass": 1962.78,
        "inserts": 2051.37
      },
      "9.4": {
        "solid": 1780.02,
        "glass": 1962.78,
        "inserts": 2051.37
      },
      "9.6": {
        "solid": 1780.02,
        "glass": 1962.78,
        "inserts": 2051.37
      },
      "9.8": {
        "solid": 1780.02,
        "glass": 1962.78,
        "inserts": 2051.37
      },
      "9.10": {
        "solid": 1780.02,
        "glass": 1962.78,
        "inserts": 2051.37
      },
      "10": {
        "solid": 1547.85,
        "glass": 1776.29,
        "inserts": 1887.04
      },
      "10.2": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "10.4": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "10.6": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "10.8": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "10.10": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "11": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "11.2": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "11.4": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "11.6": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "11.8": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "11.10": {
        "solid": 2135.07,
        "glass": 2363.51,
        "inserts": 2474.27
      },
      "12": {
        "solid": 1856.59,
        "glass": 2130.71,
        "inserts": 2263.62
      },
      "12.2": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "12.4": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "12.6": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "12.8": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "12.10": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "13": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "13.2": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "13.4": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "13.6": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "13.8": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "13.10": {
        "solid": 2391.41,
        "glass": 2665.53,
        "inserts": 2798.44
      },
      "14": {
        "solid": 2079.49,
        "glass": 2399.29,
        "inserts": 2554.36
      },
      "14.2": {
        "solid": 2510.82,
        "glass": 2830.63,
        "inserts": 2985.7
      },
      "14.4": {
        "solid": 2510.82,
        "glass": 2830.63,
        "inserts": 2985.7
      },
      "14.6": {
        "solid": 2510.82,
        "glass": 2830.63,
        "inserts": 2985.7
      },
      "14.8": {
        "solid": 2510.82,
        "glass": 2830.63,
        "inserts": 2985.7
      },
      "14.10": {
        "solid": 2510.82,
        "glass": 2830.63,
        "inserts": 2985.7
      },
      "15": {
        "solid": 2183.32,
        "glass": 2503.13,
        "inserts": 2658.2
      },
      "15.2": {
        "solid": 2649.34,
        "glass": 2969.14,
        "inserts": 3124.21
      },
      "15.4": {
        "solid": 2649.34,
        "glass": 2969.14,
        "inserts": 3124.21
      },
      "15.6": {
        "solid": 2649.34,
        "glass": 2969.14,
        "inserts": 3124.21
      },
      "15.8": {
        "solid": 2649.34,
        "glass": 2969.14,
        "inserts": 3124.21
      },
      "15.10": {
        "solid": 2649.34,
        "glass": 2969.14,
        "inserts": 3124.21
      },
      "16": {
        "solid": 2303.77,
        "glass": 2669.28,
        "inserts": 2846.49
      },
      "16.2": {
        "solid": 3047.37,
        "glass": 3412.88,
        "inserts": 3590.09
      },
      "16.4": {
        "solid": 3047.37,
        "glass": 3412.88,
        "inserts": 3590.09
      },
      "16.6": {
        "solid": 3047.37,
        "glass": 3412.88,
        "inserts": 3590.09
      },
      "16.8": {
        "solid": 3047.37,
        "glass": 3412.88,
        "inserts": 3590.09
      },
      "16.10": {
        "solid": 3047.37,
        "glass": 3412.88,
        "inserts": 3590.09
      },
      "17": {
        "solid": 2649.89,
        "glass": 3015.4,
        "inserts": 3192.61
      },
      "17.2": {
        "solid": 3198.63,
        "glass": 3564.14,
        "inserts": 3741.35
      },
      "17.4": {
        "solid": 3198.63,
        "glass": 3564.14,
        "inserts": 3741.35
      },
      "17.6": {
        "solid": 3198.63,
        "glass": 3564.14,
        "inserts": 3741.35
      },
      "17.8": {
        "solid": 3198.63,
        "glass": 3564.14,
        "inserts": 3741.35
      },
      "17.10": {
        "solid": 3198.63,
        "glass": 3564.14,
        "inserts": 3741.35
      },
      "18": {
        "solid": 2781.42,
        "glass": 3146.93,
        "inserts": 3324.14
      }
    },
    "10": {
      "6.2": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "6.4": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "6.6": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "6.8": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "6.10": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "7": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "7.2": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "7.4": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "7.6": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "7.8": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "7.10": {
        "solid": 1522.1,
        "glass": 1659.17,
        "inserts": 1725.62
      },
      "8": {
        "solid": 1323.56,
        "glass": 1506.32,
        "inserts": 1594.91
      },
      "8.2": {
        "solid": 1636.73,
        "glass": 1819.48,
        "inserts": 1908.08
      },
      "8.4": {
        "solid": 1636.73,
        "glass": 1819.48,
        "inserts": 1908.08
      },
      "8.6": {
        "solid": 1636.73,
        "glass": 1819.48,
        "inserts": 1908.08
      },
      "8.8": {
        "solid": 1636.73,
        "glass": 1819.48,
        "inserts": 1908.08
      },
      "8.10": {
        "solid": 1636.73,
        "glass": 1819.48,
        "inserts": 1908.08
      },
      "9": {
        "solid": 1423.24,
        "glass": 1606.0,
        "inserts": 1694.59
      },
      "9.2": {
        "solid": 1889.88,
        "glass": 2072.64,
        "inserts": 2161.23
      },
      "9.4": {
        "solid": 1889.88,
        "glass": 2072.64,
        "inserts": 2161.23
      },
      "9.6": {
        "solid": 1889.88,
        "glass": 2072.64,
        "inserts": 2161.23
      },
      "9.8": {
        "solid": 1889.88,
        "glass": 2072.64,
        "inserts": 2161.23
      },
      "9.10": {
        "solid": 1889.88,
        "glass": 2072.64,
        "inserts": 2161.23
      },
      "10": {
        "solid": 1643.38,
        "glass": 1871.81,
        "inserts": 1982.57
      },
      "10.2": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "10.4": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "10.6": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "10.8": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "10.10": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "11": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "11.2": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "11.4": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "11.6": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "11.8": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "11.10": {
        "solid": 2267.22,
        "glass": 2495.66,
        "inserts": 2606.41
      },
      "12": {
        "solid": 1971.5,
        "glass": 2245.62,
        "inserts": 2378.53
      },
      "12.2": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "12.4": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "12.6": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "12.8": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "12.10": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "13": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "13.2": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "13.4": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "13.6": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "13.8": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "13.10": {
        "solid": 2539.48,
        "glass": 2813.6,
        "inserts": 2946.51
      },
      "14": {
        "solid": 2208.24,
        "glass": 2528.05,
        "inserts": 2683.12
      },
      "14.2": {
        "solid": 2666.85,
        "glass": 2986.66,
        "inserts": 3141.73
      },
      "14.4": {
        "solid": 2666.85,
        "glass": 2986.66,
        "inserts": 3141.73
      },
      "14.6": {
        "solid": 2666.85,
        "glass": 2986.66,
        "inserts": 3141.73
      },
      "14.8": {
        "solid": 2666.85,
        "glass": 2986.66,
        "inserts": 3141.73
      },
      "14.10": {
        "solid": 2666.85,
        "glass": 2986.66,
        "inserts": 3141.73
      },
      "15": {
        "solid": 2319.0,
        "glass": 2638.81,
        "inserts": 2793.88
      },
      "15.2": {
        "solid": 2811.74,
        "glass": 3131.54,
        "inserts": 3286.61
      },
      "15.4": {
        "solid": 2811.74,
        "glass": 3131.54,
        "inserts": 3286.61
      },
      "15.6": {
        "solid": 2811.74,
        "glass": 3131.54,
        "inserts": 3286.61
      },
      "15.8": {
        "solid": 2811.74,
        "glass": 3131.54,
        "inserts": 3286.61
      },
      "15.10": {
        "solid": 2811.74,
        "glass": 3131.54,
        "inserts": 3286.61
      },
      "16": {
        "solid": 2444.99,
        "glass": 2810.5,
        "inserts": 2987.71
      },
      "16.2": {
        "solid": 3233.66,
        "glass": 3599.17,
        "inserts": 3776.38
      },
      "16.4": {
        "solid": 3233.66,
        "glass": 3599.17,
        "inserts": 3776.38
      },
      "16.6": {
        "solid": 3233.66,
        "glass": 3599.17,
        "inserts": 3776.38
      },
      "16.8": {
        "solid": 3233.66,
        "glass": 3599.17,
        "inserts": 3776.38
      },
      "16.10": {
        "solid": 3233.66,
        "glass": 3599.17,
        "inserts": 3776.38
      },
      "17": {
        "solid": 2811.88,
        "glass": 3177.38,
        "inserts": 3354.59
      },
      "17.2": {
        "solid": 3394.46,
        "glass": 3759.97,
        "inserts": 3937.18
      },
      "17.4": {
        "solid": 3394.46,
        "glass": 3759.97,
        "inserts": 3937.18
      },
      "17.6": {
        "solid": 3394.46,
        "glass": 3759.97,
        "inserts": 3937.18
      },
      "17.8": {
        "solid": 3394.46,
        "glass": 3759.97,
        "inserts": 3937.18
      },
      "17.10": {
        "solid": 3394.46,
        "glass": 3759.97,
        "inserts": 3937.18
      },
      "18": {
        "solid": 2951.71,
        "glass": 3317.22,
        "inserts": 3494.43
      }
    }
  },
  "9208/9209": {
    "7": {
      "6": {
        "solid": 1301.9
      },
      "6.2": {
        "solid": 1301.9
      },
      "6.4": {
        "solid": 1301.9
      },
      "6.6": {
        "solid": 1301.9
      },
      "6.8": {
        "solid": 1301.9
      },
      "6.10": {
        "solid": 1301.9
      },
      "7": {
        "solid": 1301.9
      },
      "7.2": {
        "solid": 1301.9
      },
      "7.4": {
        "solid": 1301.9
      },
      "7.6": {
        "solid": 1301.9
      },
      "7.8": {
        "solid": 1301.9
      },
      "7.10": {
        "solid": 1301.9
      },
      "8": {
        "solid": 1125.97
      },
      "8.2": {
        "solid": 1410.66
      },
      "8.4": {
        "solid": 1410.66
      },
      "8.6": {
        "solid": 1410.66
      },
      "8.8": {
        "solid": 1410.66
      },
      "8.10": {
        "solid": 1410.66
      },
      "9": {
        "solid": 1220.33
      },
      "9.2": {
        "solid": 1584.99
      },
      "9.4": {
        "solid": 1584.99
      },
      "9.6": {
        "solid": 1584.99
      },
      "9.8": {
        "solid": 1584.99
      },
      "9.10": {
        "solid": 1584.99
      },
      "10": {
        "solid": 1372.27
      },
      "10.2": {
        "solid": 1919.26
      },
      "10.4": {
        "solid": 1919.26
      },
      "10.6": {
        "solid": 1919.26
      },
      "10.8": {
        "solid": 1919.26
      },
      "10.10": {
        "solid": 1919.26
      },
      "11": {
        "solid": 1919.26
      },
      "11.2": {
        "solid": 1919.26
      },
      "11.4": {
        "solid": 1919.26
      },
      "11.6": {
        "solid": 1919.26
      },
      "11.8": {
        "solid": 1919.26
      },
      "11.10": {
        "solid": 1919.26
      },
      "12": {
        "solid": 1660.16
      },
      "12.2": {
        "solid": 2173.56
      },
      "12.4": {
        "solid": 2173.56
      },
      "12.6": {
        "solid": 2173.56
      },
      "12.8": {
        "solid": 2173.56
      },
      "12.10": {
        "solid": 2173.56
      },
      "13": {
        "solid": 2173.56
      },
      "13.2": {
        "solid": 2173.56
      },
      "13.4": {
        "solid": 2173.56
      },
      "13.6": {
        "solid": 2173.56
      },
      "13.8": {
        "solid": 2173.56
      },
      "13.10": {
        "solid": 2173.56
      },
      "14": {
        "solid": 1882.47
      },
      "14.2": {
        "solid": 2288.72
      },
      "14.4": {
        "solid": 2288.72
      },
      "14.6": {
        "solid": 2288.72
      },
      "14.8": {
        "solid": 2288.72
      },
      "14.10": {
        "solid": 2288.72
      },
      "15": {
        "solid": 1981.64
      },
      "15.2": {
        "solid": 2349.49
      },
      "15.4": {
        "solid": 2349.49
      },
      "15.6": {
        "solid": 2349.49
      },
      "15.8": {
        "solid": 2349.49
      },
      "15.10": {
        "solid": 2349.49
      },
      "16": {
        "solid": 2034.42
      },
      "16.2": {
        "solid": 2683.77
      },
      "16.4": {
        "solid": 2683.77
      },
      "16.6": {
        "solid": 2683.77
      },
      "16.8": {
        "solid": 2683.77
      },
      "16.10": {
        "solid": 2683.77
      },
      "17": {
        "solid": 2325.5
      },
      "17.2": {
        "solid": 2803.72
      },
      "17.4": {
        "solid": 2803.72
      },
      "17.6": {
        "solid": 2803.72
      },
      "17.8": {
        "solid": 2803.72
      },
      "17.10": {
        "solid": 2803.72
      },
      "18": {
        "solid": 2429.46
      },
      "18.2": {
        "solid": 2976.45
      },
      "18.4": {
        "solid": 2976.45
      },
      "18.6": {
        "solid": 2976.45
      },
      "18.8": {
        "solid": 2976.45
      },
      "18.10": {
        "solid": 2976.45
      },
      "19": {
        "solid": 2579.81
      },
      "19.2": {
        "solid": 3157.18
      },
      "19.4": {
        "solid": 3157.18
      },
      "19.6": {
        "solid": 3157.18
      },
      "19.8": {
        "solid": 3157.18
      },
      "19.10": {
        "solid": 3157.18
      },
      "20": {
        "solid": 2736.55
      }
    },
    "8": {
      "6": {
        "solid": 1562.6
      },
      "6.2": {
        "solid": 1562.6
      },
      "6.4": {
        "solid": 1562.6
      },
      "6.6": {
        "solid": 1562.6
      },
      "6.8": {
        "solid": 1562.6
      },
      "6.10": {
        "solid": 1562.6
      },
      "7": {
        "solid": 1562.6
      },
      "7.2": {
        "solid": 1562.6
      },
      "7.4": {
        "solid": 1562.6
      },
      "7.6": {
        "solid": 1562.6
      },
      "7.8": {
        "solid": 1562.6
      },
      "7.10": {
        "solid": 1562.6
      },
      "8": {
        "solid": 1353.08
      },
      "8.2": {
        "solid": 1696.95
      },
      "8.4": {
        "solid": 1696.95
      },
      "8.6": {
        "solid": 1696.95
      },
      "8.8": {
        "solid": 1696.95
      },
      "8.10": {
        "solid": 1696.95
      },
      "9": {
        "solid": 1469.83
      },
      "9.2": {
        "solid": 1957.65
      },
      "9.4": {
        "solid": 1957.65
      },
      "9.6": {
        "solid": 1957.65
      },
      "9.8": {
        "solid": 1957.65
      },
      "9.10": {
        "solid": 1957.65
      },
      "10": {
        "solid": 1695.35
      },
      "10.2": {
        "solid": 2290.32
      },
      "10.4": {
        "solid": 2290.32
      },
      "10.6": {
        "solid": 2290.32
      },
      "10.8": {
        "solid": 2290.32
      },
      "10.10": {
        "solid": 2290.32
      },
      "11": {
        "solid": 2290.32
      },
      "11.2": {
        "solid": 2290.32
      },
      "11.4": {
        "solid": 2290.32
      },
      "11.6": {
        "solid": 2290.32
      },
      "11.8": {
        "solid": 2290.32
      },
      "11.10": {
        "solid": 2290.32
      },
      "12": {
        "solid": 1983.24
      },
      "12.2": {
        "solid": 2626.19
      },
      "12.4": {
        "solid": 2626.19
      },
      "12.6": {
        "solid": 2626.19
      },
      "12.8": {
        "solid": 2626.19
      },
      "12.10": {
        "solid": 2626.19
      },
      "13": {
        "solid": 2626.19
      },
      "13.2": {
        "solid": 2626.19
      },
      "13.4": {
        "solid": 2626.19
      },
      "13.6": {
        "solid": 2626.19
      },
      "13.8": {
        "solid": 2626.19
      },
      "13.10": {
        "solid": 2626.19
      },
      "14": {
        "solid": 2275.92
      },
      "14.2": {
        "solid": 2802.12
      },
      "14.4": {
        "solid": 2802.12
      },
      "14.6": {
        "solid": 2802.12
      },
      "14.8": {
        "solid": 2802.12
      },
      "14.10": {
        "solid": 2802.12
      },
      "15": {
        "solid": 2427.86
      },
      "15.2": {
        "solid": 2909.28
      },
      "15.4": {
        "solid": 2909.28
      },
      "15.6": {
        "solid": 2909.28
      },
      "15.8": {
        "solid": 2909.28
      },
      "15.10": {
        "solid": 2909.28
      },
      "16": {
        "solid": 2522.23
      },
      "16.2": {
        "solid": 3182.77
      },
      "16.4": {
        "solid": 3182.77
      },
      "16.6": {
        "solid": 3182.77
      },
      "16.8": {
        "solid": 3182.77
      },
      "16.10": {
        "solid": 3182.77
      },
      "17": {
        "solid": 2758.94
      },
      "17.2": {
        "solid": 3417.88
      },
      "17.4": {
        "solid": 3417.88
      },
      "17.6": {
        "solid": 3417.88
      },
      "17.8": {
        "solid": 3417.88
      },
      "17.10": {
        "solid": 3417.88
      },
      "18": {
        "solid": 2963.66
      },
      "18.2": {
        "solid": 3627.4
      },
      "18.4": {
        "solid": 3627.4
      },
      "18.6": {
        "solid": 3627.4
      },
      "18.8": {
        "solid": 3627.4
      },
      "18.10": {
        "solid": 3627.4
      },
      "19": {
        "solid": 3145.99
      },
      "19.2": {
        "solid": 3848.12
      },
      "19.4": {
        "solid": 3848.12
      },
      "19.6": {
        "solid": 3848.12
      },
      "19.8": {
        "solid": 3848.12
      },
      "19.10": {
        "solid": 3848.12
      },
      "20": {
        "solid": 3337.91
      }
    },
    "9": {
      "6": {
        "solid": 2098.39
      },
      "6.2": {
        "solid": 2098.39
      },
      "6.4": {
        "solid": 2098.39
      },
      "6.6": {
        "solid": 2098.39
      },
      "6.8": {
        "solid": 2098.39
      },
      "6.10": {
        "solid": 2098.39
      },
      "7": {
        "solid": 2098.39
      },
      "7.2": {
        "solid": 2098.39
      },
      "7.4": {
        "solid": 2098.39
      },
      "7.6": {
        "solid": 2098.39
      },
      "7.8": {
        "solid": 2098.39
      },
      "7.10": {
        "solid": 2098.39
      },
      "8": {
        "solid": 1824.9
      },
      "8.2": {
        "solid": 2231.14
      },
      "8.4": {
        "solid": 2231.14
      },
      "8.6": {
        "solid": 2231.14
      },
      "8.8": {
        "solid": 2231.14
      },
      "8.10": {
        "solid": 2231.14
      },
      "9": {
        "solid": 1940.05
      },
      "9.2": {
        "solid": 2448.66
      },
      "9.4": {
        "solid": 2448.66
      },
      "9.6": {
        "solid": 2448.66
      },
      "9.8": {
        "solid": 2448.66
      },
      "9.10": {
        "solid": 2448.66
      },
      "10": {
        "solid": 2128.78
      },
      "10.2": {
        "solid": 2938.07
      },
      "10.4": {
        "solid": 2938.07
      },
      "10.6": {
        "solid": 2938.07
      },
      "10.8": {
        "solid": 2938.07
      },
      "10.10": {
        "solid": 2938.07
      },
      "11": {
        "solid": 2938.07
      },
      "11.2": {
        "solid": 2938.07
      },
      "11.4": {
        "solid": 2938.07
      },
      "11.6": {
        "solid": 2938.07
      },
      "11.8": {
        "solid": 2938.07
      },
      "11.10": {
        "solid": 2938.07
      },
      "12": {
        "solid": 2554.22
      },
      "12.2": {
        "solid": 3289.93
      },
      "12.4": {
        "solid": 3289.93
      },
      "12.6": {
        "solid": 3289.93
      },
      "12.8": {
        "solid": 3289.93
      },
      "12.10": {
        "solid": 3289.93
      },
      "13": {
        "solid": 3289.93
      },
      "13.2": {
        "solid": 3289.93
      },
      "13.4": {
        "solid": 3289.93
      },
      "13.6": {
        "solid": 3289.93
      },
      "13.8": {
        "solid": 3289.93
      },
      "13.10": {
        "solid": 3289.93
      },
      "14": {
        "solid": 2861.3
      },
      "14.2": {
        "solid": 3454.67
      },
      "14.4": {
        "solid": 3454.67
      },
      "14.6": {
        "solid": 3454.67
      },
      "14.8": {
        "solid": 3454.67
      },
      "14.10": {
        "solid": 3454.67
      },
      "15": {
        "solid": 3003.64
      },
      "15.2": {
        "solid": 3849.72
      },
      "15.4": {
        "solid": 3849.72
      },
      "15.6": {
        "solid": 3849.72
      },
      "15.8": {
        "solid": 3849.72
      },
      "15.10": {
        "solid": 3849.72
      },
      "16": {
        "solid": 3347.51
      },
      "16.2": {
        "solid": 4387.11
      },
      "16.4": {
        "solid": 4387.11
      },
      "16.6": {
        "solid": 4387.11
      },
      "16.8": {
        "solid": 4387.11
      },
      "16.10": {
        "solid": 4387.11
      },
      "17": {
        "solid": 3814.53
      },
      "17.2": {
        "solid": 4606.22
      },
      "17.4": {
        "solid": 4606.22
      },
      "17.6": {
        "solid": 4606.22
      },
      "17.8": {
        "solid": 4606.22
      },
      "17.10": {
        "solid": 4606.22
      },
      "18": {
        "solid": 4004.86
      },
      "18.2": {
        "solid": 4881.32
      },
      "18.4": {
        "solid": 4881.32
      },
      "18.6": {
        "solid": 4881.32
      },
      "18.8": {
        "solid": 4881.32
      },
      "18.10": {
        "solid": 4881.32
      },
      "19": {
        "solid": 4244.76
      },
      "19.2": {
        "solid": 5174.01
      },
      "19.4": {
        "solid": 5174.01
      },
      "19.6": {
        "solid": 5174.01
      },
      "19.8": {
        "solid": 5174.01
      },
      "19.10": {
        "solid": 5174.01
      },
      "20": {
        "solid": 4499.07
      }
    },
    "10": {
      "6": {
        "solid": 2098.39
      },
      "6.2": {
        "solid": 2098.39
      },
      "6.4": {
        "solid": 2098.39
      },
      "6.6": {
        "solid": 2098.39
      },
      "6.8": {
        "solid": 2098.39
      },
      "6.10": {
        "solid": 2098.39
      },
      "7": {
        "solid": 2098.39
      },
      "7.2": {
        "solid": 2098.39
      },
      "7.4": {
        "solid": 2098.39
      },
      "7.6": {
        "solid": 2098.39
      },
      "7.8": {
        "solid": 2098.39
      },
      "7.10": {
        "solid": 2098.39
      },
      "8": {
        "solid": 1824.9
      },
      "8.2": {
        "solid": 2231.14
      },
      "8.4": {
        "solid": 2231.14
      },
      "8.6": {
        "solid": 2231.14
      },
      "8.8": {
        "solid": 2231.14
      },
      "8.10": {
        "solid": 2231.14
      },
      "9": {
        "solid": 1940.05
      },
      "9.2": {
        "solid": 2448.66
      },
      "9.4": {
        "solid": 2448.66
      },
      "9.6": {
        "solid": 2448.66
      },
      "9.8": {
        "solid": 2448.66
      },
      "9.10": {
        "solid": 2448.66
      },
      "10": {
        "solid": 2128.78
      },
      "10.2": {
        "solid": 2938.07
      },
      "10.4": {
        "solid": 2938.07
      },
      "10.6": {
        "solid": 2938.07
      },
      "10.8": {
        "solid": 2938.07
      },
      "10.10": {
        "solid": 2938.07
      },
      "11": {
        "solid": 2938.07
      },
      "11.2": {
        "solid": 2938.07
      },
      "11.4": {
        "solid": 2938.07
      },
      "11.6": {
        "solid": 2938.07
      },
      "11.8": {
        "solid": 2938.07
      },
      "11.10": {
        "solid": 2938.07
      },
      "12": {
        "solid": 2554.22
      },
      "12.2": {
        "solid": 3289.93
      },
      "12.4": {
        "solid": 3289.93
      },
      "12.6": {
        "solid": 3289.93
      },
      "12.8": {
        "solid": 3289.93
      },
      "12.10": {
        "solid": 3289.93
      },
      "13": {
        "solid": 3289.93
      },
      "13.2": {
        "solid": 3289.93
      },
      "13.4": {
        "solid": 3289.93
      },
      "13.6": {
        "solid": 3289.93
      },
      "13.8": {
        "solid": 3289.93
      },
      "13.10": {
        "solid": 3289.93
      },
      "14": {
        "solid": 2861.3
      },
      "14.2": {
        "solid": 3454.67
      },
      "14.4": {
        "solid": 3454.67
      },
      "14.6": {
        "solid": 3454.67
      },
      "14.8": {
        "solid": 3454.67
      },
      "14.10": {
        "solid": 3454.67
      },
      "15": {
        "solid": 3003.64
      },
      "15.2": {
        "solid": 3849.72
      },
      "15.4": {
        "solid": 3849.72
      },
      "15.6": {
        "solid": 3849.72
      },
      "15.8": {
        "solid": 3849.72
      },
      "15.10": {
        "solid": 3849.72
      },
      "16": {
        "solid": 3347.51
      },
      "16.2": {
        "solid": 4387.11
      },
      "16.4": {
        "solid": 4387.11
      },
      "16.6": {
        "solid": 4387.11
      },
      "16.8": {
        "solid": 4387.11
      },
      "16.10": {
        "solid": 4387.11
      },
      "17": {
        "solid": 3814.53
      },
      "17.2": {
        "solid": 4606.22
      },
      "17.4": {
        "solid": 4606.22
      },
      "17.6": {
        "solid": 4606.22
      },
      "17.8": {
        "solid": 4606.22
      },
      "17.10": {
        "solid": 4606.22
      },
      "18": {
        "solid": 4004.86
      },
      "18.2": {
        "solid": 4881.32
      },
      "18.4": {
        "solid": 4881.32
      },
      "18.6": {
        "solid": 4881.32
      },
      "18.8": {
        "solid": 4881.32
      },
      "18.10": {
        "solid": 4881.32
      },
      "19": {
        "solid": 4244.76
      },
      "19.2": {
        "solid": 5174.01
      },
      "19.4": {
        "solid": 5174.01
      },
      "19.6": {
        "solid": 5174.01
      },
      "19.8": {
        "solid": 5174.01
      },
      "19.10": {
        "solid": 5174.01
      },
      "20": {
        "solid": 4499.07
      }
    }
  },
  "4308/4309": {
    "7": {
      "6": {
        "solid": 1059.58
      },
      "6.2": {
        "solid": 1059.58
      },
      "6.4": {
        "solid": 1059.58
      },
      "6.6": {
        "solid": 1059.58
      },
      "6.8": {
        "solid": 1059.58
      },
      "6.10": {
        "solid": 1059.58
      },
      "7": {
        "solid": 1059.58
      },
      "7.2": {
        "solid": 1059.58
      },
      "7.4": {
        "solid": 1059.58
      },
      "7.6": {
        "solid": 1059.58
      },
      "7.8": {
        "solid": 1059.58
      },
      "7.10": {
        "solid": 1059.58
      },
      "8": {
        "solid": 916.39
      },
      "8.2": {
        "solid": 1148.09
      },
      "8.4": {
        "solid": 1148.09
      },
      "8.6": {
        "solid": 1148.09
      },
      "8.8": {
        "solid": 1148.09
      },
      "8.10": {
        "solid": 1148.09
      },
      "9": {
        "solid": 993.19
      },
      "9.2": {
        "solid": 1289.98
      },
      "9.4": {
        "solid": 1289.98
      },
      "9.6": {
        "solid": 1289.98
      },
      "9.8": {
        "solid": 1289.98
      },
      "9.10": {
        "solid": 1289.98
      },
      "10": {
        "solid": 1116.85
      },
      "10.2": {
        "solid": 1562.03
      },
      "10.4": {
        "solid": 1562.03
      },
      "10.6": {
        "solid": 1562.03
      },
      "10.8": {
        "solid": 1562.03
      },
      "10.10": {
        "solid": 1562.03
      },
      "11": {
        "solid": 1562.03
      },
      "11.2": {
        "solid": 1562.03
      },
      "11.4": {
        "solid": 1562.03
      },
      "11.6": {
        "solid": 1562.03
      },
      "11.8": {
        "solid": 1562.03
      },
      "11.10": {
        "solid": 1562.03
      },
      "12": {
        "solid": 1351.16
      },
      "12.2": {
        "solid": 1769.0
      },
      "12.4": {
        "solid": 1769.0
      },
      "12.6": {
        "solid": 1769.0
      },
      "12.8": {
        "solid": 1769.0
      },
      "12.10": {
        "solid": 1769.0
      },
      "13": {
        "solid": 1769.0
      },
      "13.2": {
        "solid": 1769.0
      },
      "13.4": {
        "solid": 1769.0
      },
      "13.6": {
        "solid": 1769.0
      },
      "13.8": {
        "solid": 1769.0
      },
      "13.10": {
        "solid": 1769.0
      },
      "14": {
        "solid": 1532.09
      },
      "14.2": {
        "solid": 1862.73
      },
      "14.4": {
        "solid": 1862.73
      },
      "14.6": {
        "solid": 1862.73
      },
      "14.8": {
        "solid": 1862.73
      },
      "14.10": {
        "solid": 1862.73
      },
      "15": {
        "solid": 1612.8
      },
      "15.2": {
        "solid": 1912.19
      },
      "15.4": {
        "solid": 1912.19
      },
      "15.6": {
        "solid": 1912.19
      },
      "15.8": {
        "solid": 1912.19
      },
      "15.10": {
        "solid": 1912.19
      },
      "16": {
        "solid": 1655.76
      },
      "16.2": {
        "solid": 2184.24
      },
      "16.4": {
        "solid": 2184.24
      },
      "16.6": {
        "solid": 2184.24
      },
      "16.8": {
        "solid": 2184.24
      },
      "16.10": {
        "solid": 2184.24
      },
      "17": {
        "solid": 1892.66
      },
      "17.2": {
        "solid": 2281.87
      },
      "17.4": {
        "solid": 2281.87
      },
      "17.6": {
        "solid": 2281.87
      },
      "17.8": {
        "solid": 2281.87
      },
      "17.10": {
        "solid": 2281.87
      },
      "18": {
        "solid": 1977.27
      },
      "18.2": {
        "solid": 2422.45
      },
      "18.4": {
        "solid": 2422.45
      },
      "18.6": {
        "solid": 2422.45
      },
      "18.8": {
        "solid": 2422.45
      },
      "18.10": {
        "solid": 2422.45
      },
      "19": {
        "solid": 2099.63
      },
      "19.2": {
        "solid": 2569.55
      },
      "19.4": {
        "solid": 2569.55
      },
      "19.6": {
        "solid": 2569.55
      },
      "19.8": {
        "solid": 2569.55
      },
      "19.10": {
        "solid": 2569.55
      },
      "20": {
        "solid": 2227.2
      }
    },
    "8": {
      "6": {
        "solid": 1271.76
      },
      "6.2": {
        "solid": 1271.76
      },
      "6.4": {
        "solid": 1271.76
      },
      "6.6": {
        "solid": 1271.76
      },
      "6.8": {
        "solid": 1271.76
      },
      "6.10": {
        "solid": 1271.76
      },
      "7": {
        "solid": 1271.76
      },
      "7.2": {
        "solid": 1271.76
      },
      "7.4": {
        "solid": 1271.76
      },
      "7.6": {
        "solid": 1271.76
      },
      "7.8": {
        "solid": 1271.76
      },
      "7.10": {
        "solid": 1271.76
      },
      "8": {
        "solid": 1101.23
      },
      "8.2": {
        "solid": 1381.1
      },
      "8.4": {
        "solid": 1381.1
      },
      "8.6": {
        "solid": 1381.1
      },
      "8.8": {
        "solid": 1381.1
      },
      "8.10": {
        "solid": 1381.1
      },
      "9": {
        "solid": 1196.26
      },
      "9.2": {
        "solid": 1593.27
      },
      "9.4": {
        "solid": 1593.27
      },
      "9.6": {
        "solid": 1593.27
      },
      "9.8": {
        "solid": 1593.27
      },
      "9.10": {
        "solid": 1593.27
      },
      "10": {
        "solid": 1379.8
      },
      "10.2": {
        "solid": 1864.03
      },
      "10.4": {
        "solid": 1864.03
      },
      "10.6": {
        "solid": 1864.03
      },
      "10.8": {
        "solid": 1864.03
      },
      "10.10": {
        "solid": 1864.03
      },
      "11": {
        "solid": 1864.03
      },
      "11.2": {
        "solid": 1864.03
      },
      "11.4": {
        "solid": 1864.03
      },
      "11.6": {
        "solid": 1864.03
      },
      "11.8": {
        "solid": 1864.03
      },
      "11.10": {
        "solid": 1864.03
      },
      "12": {
        "solid": 1614.1
      },
      "12.2": {
        "solid": 2137.38
      },
      "12.4": {
        "solid": 2137.38
      },
      "12.6": {
        "solid": 2137.38
      },
      "12.8": {
        "solid": 2137.38
      },
      "12.10": {
        "solid": 2137.38
      },
      "13": {
        "solid": 2137.38
      },
      "13.2": {
        "solid": 2137.38
      },
      "13.4": {
        "solid": 2137.38
      },
      "13.6": {
        "solid": 2137.38
      },
      "13.8": {
        "solid": 2137.38
      },
      "13.10": {
        "solid": 2137.38
      },
      "14": {
        "solid": 1852.31
      },
      "14.2": {
        "solid": 2280.57
      },
      "14.4": {
        "solid": 2280.57
      },
      "14.6": {
        "solid": 2280.57
      },
      "14.8": {
        "solid": 2280.57
      },
      "14.10": {
        "solid": 2280.57
      },
      "15": {
        "solid": 1975.97
      },
      "15.2": {
        "solid": 2367.78
      },
      "15.4": {
        "solid": 2367.78
      },
      "15.6": {
        "solid": 2367.78
      },
      "15.8": {
        "solid": 2367.78
      },
      "15.10": {
        "solid": 2367.78
      },
      "16": {
        "solid": 2052.77
      },
      "16.2": {
        "solid": 2590.37
      },
      "16.4": {
        "solid": 2590.37
      },
      "16.6": {
        "solid": 2590.37
      },
      "16.8": {
        "solid": 2590.37
      },
      "16.10": {
        "solid": 2590.37
      },
      "17": {
        "solid": 2245.42
      },
      "17.2": {
        "solid": 2781.72
      },
      "17.4": {
        "solid": 2781.72
      },
      "17.6": {
        "solid": 2781.72
      },
      "17.8": {
        "solid": 2781.72
      },
      "17.10": {
        "solid": 2781.72
      },
      "18": {
        "solid": 2412.04
      },
      "18.2": {
        "solid": 2952.24
      },
      "18.4": {
        "solid": 2952.24
      },
      "18.6": {
        "solid": 2952.24
      },
      "18.8": {
        "solid": 2952.24
      },
      "18.10": {
        "solid": 2952.24
      },
      "19": {
        "solid": 2560.43
      },
      "19.2": {
        "solid": 3131.88
      },
      "19.4": {
        "solid": 3131.88
      },
      "19.6": {
        "solid": 3131.88
      },
      "19.8": {
        "solid": 3131.88
      },
      "19.10": {
        "solid": 3131.88
      },
      "20": {
        "solid": 2716.64
      }
    },
    "9": {
      "6": {
        "solid": 1707.82
      },
      "6.2": {
        "solid": 1707.82
      },
      "6.4": {
        "solid": 1707.82
      },
      "6.6": {
        "solid": 1707.82
      },
      "6.8": {
        "solid": 1707.82
      },
      "6.10": {
        "solid": 1707.82
      },
      "7": {
        "solid": 1707.82
      },
      "7.2": {
        "solid": 1707.82
      },
      "7.4": {
        "solid": 1707.82
      },
      "7.6": {
        "solid": 1707.82
      },
      "7.8": {
        "solid": 1707.82
      },
      "7.10": {
        "solid": 1707.82
      },
      "8": {
        "solid": 1485.23
      },
      "8.2": {
        "solid": 1815.86
      },
      "8.4": {
        "solid": 1815.86
      },
      "8.6": {
        "solid": 1815.86
      },
      "8.8": {
        "solid": 1815.86
      },
      "8.10": {
        "solid": 1815.86
      },
      "9": {
        "solid": 1578.96
      },
      "9.2": {
        "solid": 1992.89
      },
      "9.4": {
        "solid": 1992.89
      },
      "9.6": {
        "solid": 1992.89
      },
      "9.8": {
        "solid": 1992.89
      },
      "9.10": {
        "solid": 1992.89
      },
      "10": {
        "solid": 1732.56
      },
      "10.2": {
        "solid": 2391.21
      },
      "10.4": {
        "solid": 2391.21
      },
      "10.6": {
        "solid": 2391.21
      },
      "10.8": {
        "solid": 2391.21
      },
      "10.10": {
        "solid": 2391.21
      },
      "11": {
        "solid": 2391.21
      },
      "11.2": {
        "solid": 2391.21
      },
      "11.4": {
        "solid": 2391.21
      },
      "11.6": {
        "solid": 2391.21
      },
      "11.8": {
        "solid": 2391.21
      },
      "11.10": {
        "solid": 2391.21
      },
      "12": {
        "solid": 2078.81
      },
      "12.2": {
        "solid": 2677.59
      },
      "12.4": {
        "solid": 2677.59
      },
      "12.6": {
        "solid": 2677.59
      },
      "12.8": {
        "solid": 2677.59
      },
      "12.10": {
        "solid": 2677.59
      },
      "13": {
        "solid": 2677.59
      },
      "13.2": {
        "solid": 2677.59
      },
      "13.4": {
        "solid": 2677.59
      },
      "13.6": {
        "solid": 2677.59
      },
      "13.8": {
        "solid": 2677.59
      },
      "13.10": {
        "solid": 2677.59
      },
      "14": {
        "solid": 2328.73
      },
      "14.2": {
        "solid": 2811.66
      },
      "14.4": {
        "solid": 2811.66
      },
      "14.6": {
        "solid": 2811.66
      },
      "14.8": {
        "solid": 2811.66
      },
      "14.10": {
        "solid": 2811.66
      },
      "15": {
        "solid": 2444.58
      },
      "15.2": {
        "solid": 3133.18
      },
      "15.4": {
        "solid": 3133.18
      },
      "15.6": {
        "solid": 3133.18
      },
      "15.8": {
        "solid": 3133.18
      },
      "15.10": {
        "solid": 3133.18
      },
      "16": {
        "solid": 2724.45
      },
      "16.2": {
        "solid": 3570.55
      },
      "16.4": {
        "solid": 3570.55
      },
      "16.6": {
        "solid": 3570.55
      },
      "16.8": {
        "solid": 3570.55
      },
      "16.10": {
        "solid": 3570.55
      },
      "17": {
        "solid": 3104.54
      },
      "17.2": {
        "solid": 3748.88
      },
      "17.4": {
        "solid": 3748.88
      },
      "17.6": {
        "solid": 3748.88
      },
      "17.8": {
        "solid": 3748.88
      },
      "17.10": {
        "solid": 3748.88
      },
      "18": {
        "solid": 3259.44
      },
      "18.2": {
        "solid": 3972.77
      },
      "18.4": {
        "solid": 3972.77
      },
      "18.6": {
        "solid": 3972.77
      },
      "18.8": {
        "solid": 3972.77
      },
      "18.10": {
        "solid": 3972.77
      },
      "19": {
        "solid": 3454.7
      },
      "19.2": {
        "solid": 4210.98
      },
      "19.4": {
        "solid": 4210.98
      },
      "19.6": {
        "solid": 4210.98
      },
      "19.8": {
        "solid": 4210.98
      },
      "19.10": {
        "solid": 4210.98
      },
      "20": {
        "solid": 3661.67
      }
    },
    "10": {
      "6": {
        "solid": 1707.82
      },
      "6.2": {
        "solid": 1707.82
      },
      "6.4": {
        "solid": 1707.82
      },
      "6.6": {
        "solid": 1707.82
      },
      "6.8": {
        "solid": 1707.82
      },
      "6.10": {
        "solid": 1707.82
      },
      "7": {
        "solid": 1707.82
      },
      "7.2": {
        "solid": 1707.82
      },
      "7.4": {
        "solid": 1707.82
      },
      "7.6": {
        "solid": 1707.82
      },
      "7.8": {
        "solid": 1707.82
      },
      "7.10": {
        "solid": 1707.82
      },
      "8": {
        "solid": 1485.23
      },
      "8.2": {
        "solid": 1815.86
      },
      "8.4": {
        "solid": 1815.86
      },
      "8.6": {
        "solid": 1815.86
      },
      "8.8": {
        "solid": 1815.86
      },
      "8.10": {
        "solid": 1815.86
      },
      "9": {
        "solid": 1578.96
      },
      "9.2": {
        "solid": 1992.89
      },
      "9.4": {
        "solid": 1992.89
      },
      "9.6": {
        "solid": 1992.89
      },
      "9.8": {
        "solid": 1992.89
      },
      "9.10": {
        "solid": 1992.89
      },
      "10": {
        "solid": 1732.56
      },
      "10.2": {
        "solid": 2391.21
      },
      "10.4": {
        "solid": 2391.21
      },
      "10.6": {
        "solid": 2391.21
      },
      "10.8": {
        "solid": 2391.21
      },
      "10.10": {
        "solid": 2391.21
      },
      "11": {
        "solid": 2391.21
      },
      "11.2": {
        "solid": 2391.21
      },
      "11.4": {
        "solid": 2391.21
      },
      "11.6": {
        "solid": 2391.21
      },
      "11.8": {
        "solid": 2391.21
      },
      "11.10": {
        "solid": 2391.21
      },
      "12": {
        "solid": 2078.81
      },
      "12.2": {
        "solid": 2677.59
      },
      "12.4": {
        "solid": 2677.59
      },
      "12.6": {
        "solid": 2677.59
      },
      "12.8": {
        "solid": 2677.59
      },
      "12.10": {
        "solid": 2677.59
      },
      "13": {
        "solid": 2677.59
      },
      "13.2": {
        "solid": 2677.59
      },
      "13.4": {
        "solid": 2677.59
      },
      "13.6": {
        "solid": 2677.59
      },
      "13.8": {
        "solid": 2677.59
      },
      "13.10": {
        "solid": 2677.59
      },
      "14": {
        "solid": 2328.73
      },
      "14.2": {
        "solid": 2811.66
      },
      "14.4": {
        "solid": 2811.66
      },
      "14.6": {
        "solid": 2811.66
      },
      "14.8": {
        "solid": 2811.66
      },
      "14.10": {
        "solid": 2811.66
      },
      "15": {
        "solid": 2444.58
      },
      "15.2": {
        "solid": 3133.18
      },
      "15.4": {
        "solid": 3133.18
      },
      "15.6": {
        "solid": 3133.18
      },
      "15.8": {
        "solid": 3133.18
      },
      "15.10": {
        "solid": 3133.18
      },
      "16": {
        "solid": 2724.45
      },
      "16.2": {
        "solid": 3570.55
      },
      "16.4": {
        "solid": 3570.55
      },
      "16.6": {
        "solid": 3570.55
      },
      "16.8": {
        "solid": 3570.55
      },
      "16.10": {
        "solid": 3570.55
      },
      "17": {
        "solid": 3104.54
      },
      "17.2": {
        "solid": 3748.88
      },
      "17.4": {
        "solid": 3748.88
      },
      "17.6": {
        "solid": 3748.88
      },
      "17.8": {
        "solid": 3748.88
      },
      "17.10": {
        "solid": 3748.88
      },
      "18": {
        "solid": 3259.44
      },
      "18.2": {
        "solid": 3972.77
      },
      "18.4": {
        "solid": 3972.77
      },
      "18.6": {
        "solid": 3972.77
      },
      "18.8": {
        "solid": 3972.77
      },
      "18.10": {
        "solid": 3972.77
      },
      "19": {
        "solid": 3454.7
      },
      "19.2": {
        "solid": 4210.98
      },
      "19.4": {
        "solid": 4210.98
      },
      "19.6": {
        "solid": 4210.98
      },
      "19.8": {
        "solid": 4210.98
      },
      "19.10": {
        "solid": 4210.98
      },
      "20": {
        "solid": 3661.67
      }
    }
  },
  "9138/9139": {
    "7": {
      "6.2": {
        "solid": 1111.26
      },
      "6.4": {
        "solid": 1111.26
      },
      "6.6": {
        "solid": 1111.26
      },
      "6.8": {
        "solid": 1111.26
      },
      "6.10": {
        "solid": 1111.26
      },
      "7": {
        "solid": 1111.26
      },
      "7.2": {
        "solid": 1111.26
      },
      "7.4": {
        "solid": 1111.26
      },
      "7.6": {
        "solid": 1111.26
      },
      "7.8": {
        "solid": 1111.26
      },
      "7.10": {
        "solid": 1111.26
      },
      "8": {
        "solid": 959.5
      },
      "8.2": {
        "solid": 1200.64
      },
      "8.4": {
        "solid": 1200.64
      },
      "8.6": {
        "solid": 1200.64
      },
      "8.8": {
        "solid": 1200.64
      },
      "8.10": {
        "solid": 1200.64
      },
      "9": {
        "solid": 1037.07
      },
      "9.2": {
        "solid": 1360.83
      },
      "9.4": {
        "solid": 1360.83
      },
      "9.6": {
        "solid": 1360.83
      },
      "9.8": {
        "solid": 1360.83
      },
      "9.10": {
        "solid": 1360.83
      },
      "10": {
        "solid": 1177.03
      },
      "10.2": {
        "solid": 1591.85
      },
      "10.4": {
        "solid": 1591.85
      },
      "10.6": {
        "solid": 1591.85
      },
      "10.8": {
        "solid": 1591.85
      },
      "10.10": {
        "solid": 1591.85
      },
      "11": {
        "solid": 1591.85
      },
      "11.2": {
        "solid": 1591.85
      },
      "11.4": {
        "solid": 1591.85
      },
      "11.6": {
        "solid": 1591.85
      },
      "11.8": {
        "solid": 1591.85
      },
      "11.10": {
        "solid": 1591.85
      },
      "12": {
        "solid": 1376.01
      },
      "12.2": {
        "solid": 1870.09
      },
      "12.4": {
        "solid": 1870.09
      },
      "12.6": {
        "solid": 1870.09
      },
      "12.8": {
        "solid": 1870.09
      },
      "12.10": {
        "solid": 1870.09
      },
      "13": {
        "solid": 1870.09
      },
      "13.2": {
        "solid": 1870.09
      },
      "13.4": {
        "solid": 1870.09
      },
      "13.6": {
        "solid": 1870.09
      },
      "13.8": {
        "solid": 1870.09
      },
      "13.10": {
        "solid": 1870.09
      },
      "14": {
        "solid": 1617.15
      },
      "14.2": {
        "solid": 1961.15
      },
      "14.4": {
        "solid": 1961.15
      },
      "14.6": {
        "solid": 1961.15
      },
      "14.8": {
        "solid": 1961.15
      },
      "14.10": {
        "solid": 1961.15
      },
      "15": {
        "solid": 1696.4
      },
      "15.2": {
        "solid": 1994.88
      },
      "15.4": {
        "solid": 1994.88
      },
      "15.6": {
        "solid": 1994.88
      },
      "15.8": {
        "solid": 1994.88
      },
      "15.10": {
        "solid": 1994.88
      },
      "16": {
        "solid": 1726.76
      },
      "16.2": {
        "solid": 2301.78
      },
      "16.4": {
        "solid": 2301.78
      },
      "16.6": {
        "solid": 2301.78
      },
      "16.8": {
        "solid": 2301.78
      },
      "16.10": {
        "solid": 2301.78
      },
      "17": {
        "solid": 1993.19
      },
      "17.2": {
        "solid": 2408.02
      },
      "17.4": {
        "solid": 2408.02
      },
      "17.6": {
        "solid": 2408.02
      },
      "17.8": {
        "solid": 2408.02
      },
      "17.10": {
        "solid": 2408.02
      },
      "18": {
        "solid": 2085.94
      }
    },
    "8": {
      "6.2": {
        "solid": 1342.28
      },
      "6.4": {
        "solid": 1342.28
      },
      "6.6": {
        "solid": 1342.28
      },
      "6.8": {
        "solid": 1342.28
      },
      "6.10": {
        "solid": 1342.28
      },
      "7": {
        "solid": 1342.28
      },
      "7.2": {
        "solid": 1342.28
      },
      "7.4": {
        "solid": 1342.28
      },
      "7.6": {
        "solid": 1342.28
      },
      "7.8": {
        "solid": 1342.28
      },
      "7.10": {
        "solid": 1342.28
      },
      "8": {
        "solid": 1160.17
      },
      "8.2": {
        "solid": 1462.01
      },
      "8.4": {
        "solid": 1462.01
      },
      "8.6": {
        "solid": 1462.01
      },
      "8.8": {
        "solid": 1462.01
      },
      "8.10": {
        "solid": 1462.01
      },
      "9": {
        "solid": 1264.71
      },
      "9.2": {
        "solid": 1681.23
      },
      "9.4": {
        "solid": 1681.23
      },
      "9.6": {
        "solid": 1681.23
      },
      "9.8": {
        "solid": 1681.23
      },
      "9.10": {
        "solid": 1681.23
      },
      "10": {
        "solid": 1455.27
      },
      "10.2": {
        "solid": 1964.52
      },
      "10.4": {
        "solid": 1964.52
      },
      "10.6": {
        "solid": 1964.52
      },
      "10.8": {
        "solid": 1964.52
      },
      "10.10": {
        "solid": 1964.52
      },
      "11": {
        "solid": 1964.52
      },
      "11.2": {
        "solid": 1964.52
      },
      "11.4": {
        "solid": 1964.52
      },
      "11.6": {
        "solid": 1964.52
      },
      "11.8": {
        "solid": 1964.52
      },
      "11.10": {
        "solid": 1964.52
      },
      "12": {
        "solid": 1699.78
      },
      "12.2": {
        "solid": 2252.88
      },
      "12.4": {
        "solid": 2252.88
      },
      "12.6": {
        "solid": 2252.88
      },
      "12.8": {
        "solid": 2252.88
      },
      "12.10": {
        "solid": 2252.88
      },
      "13": {
        "solid": 2252.88
      },
      "13.2": {
        "solid": 2252.88
      },
      "13.4": {
        "solid": 2252.88
      },
      "13.6": {
        "solid": 2252.88
      },
      "13.8": {
        "solid": 2252.88
      },
      "13.10": {
        "solid": 2252.88
      },
      "14": {
        "solid": 1951.03
      },
      "14.2": {
        "solid": 2406.33
      },
      "14.4": {
        "solid": 2406.33
      },
      "14.6": {
        "solid": 2406.33
      },
      "14.8": {
        "solid": 2406.33
      },
      "14.10": {
        "solid": 2406.33
      },
      "15": {
        "solid": 2084.25
      },
      "15.2": {
        "solid": 2502.45
      },
      "15.4": {
        "solid": 2502.45
      },
      "15.6": {
        "solid": 2502.45
      },
      "15.8": {
        "solid": 2502.45
      },
      "15.10": {
        "solid": 2502.45
      },
      "16": {
        "solid": 2166.88
      },
      "16.2": {
        "solid": 2730.1
      },
      "16.4": {
        "solid": 2730.1
      },
      "16.6": {
        "solid": 2730.1
      },
      "16.8": {
        "solid": 2730.1
      },
      "16.10": {
        "solid": 2730.1
      },
      "17": {
        "solid": 2365.86
      },
      "17.2": {
        "solid": 2935.82
      },
      "17.4": {
        "solid": 2935.82
      },
      "17.6": {
        "solid": 2935.82
      },
      "17.8": {
        "solid": 2935.82
      },
      "17.10": {
        "solid": 2935.82
      },
      "18": {
        "solid": 2544.61
      }
    },
    "9": {
      "6.2": {
        "solid": 1881.9
      },
      "6.4": {
        "solid": 1881.9
      },
      "6.6": {
        "solid": 1881.9
      },
      "6.8": {
        "solid": 1881.9
      },
      "6.10": {
        "solid": 1881.9
      },
      "7": {
        "solid": 1881.9
      },
      "7.2": {
        "solid": 1881.9
      },
      "7.4": {
        "solid": 1881.9
      },
      "7.6": {
        "solid": 1881.9
      },
      "7.8": {
        "solid": 1881.9
      },
      "7.10": {
        "solid": 1881.9
      },
      "8": {
        "solid": 1635.7
      },
      "8.2": {
        "solid": 2028.6
      },
      "8.4": {
        "solid": 2028.6
      },
      "8.6": {
        "solid": 2028.6
      },
      "8.8": {
        "solid": 2028.6
      },
      "8.10": {
        "solid": 2028.6
      },
      "9": {
        "solid": 1763.86
      },
      "9.2": {
        "solid": 2347.31
      },
      "9.4": {
        "solid": 2347.31
      },
      "9.6": {
        "solid": 2347.31
      },
      "9.8": {
        "solid": 2347.31
      },
      "9.10": {
        "solid": 2347.31
      },
      "10": {
        "solid": 2040.41
      },
      "10.2": {
        "solid": 2816.1
      },
      "10.4": {
        "solid": 2816.1
      },
      "10.6": {
        "solid": 2816.1
      },
      "10.8": {
        "solid": 2816.1
      },
      "10.10": {
        "solid": 2816.1
      },
      "11": {
        "solid": 2816.1
      },
      "11.2": {
        "solid": 2816.1
      },
      "11.4": {
        "solid": 2816.1
      },
      "11.6": {
        "solid": 2816.1
      },
      "11.8": {
        "solid": 2816.1
      },
      "11.10": {
        "solid": 2816.1
      },
      "12": {
        "solid": 2448.49
      },
      "12.2": {
        "solid": 3153.36
      },
      "12.4": {
        "solid": 3153.36
      },
      "12.6": {
        "solid": 3153.36
      },
      "12.8": {
        "solid": 3153.36
      },
      "12.10": {
        "solid": 3153.36
      },
      "13": {
        "solid": 3153.36
      },
      "13.2": {
        "solid": 3153.36
      },
      "13.4": {
        "solid": 3153.36
      },
      "13.6": {
        "solid": 3153.36
      },
      "13.8": {
        "solid": 3153.36
      },
      "13.10": {
        "solid": 3153.36
      },
      "14": {
        "solid": 2741.9
      },
      "14.2": {
        "solid": 3310.18
      },
      "14.4": {
        "solid": 3310.18
      },
      "14.6": {
        "solid": 3310.18
      },
      "14.8": {
        "solid": 3310.18
      },
      "14.10": {
        "solid": 3310.18
      },
      "15": {
        "solid": 2878.49
      },
      "15.2": {
        "solid": 3492.3
      },
      "15.4": {
        "solid": 3492.3
      },
      "15.6": {
        "solid": 3492.3
      },
      "15.8": {
        "solid": 3492.3
      },
      "15.10": {
        "solid": 3492.3
      },
      "16": {
        "solid": 3037.0
      },
      "16.2": {
        "solid": 4016.73
      },
      "16.4": {
        "solid": 4016.73
      },
      "16.6": {
        "solid": 4016.73
      },
      "16.8": {
        "solid": 4016.73
      },
      "16.10": {
        "solid": 4016.73
      },
      "17": {
        "solid": 3492.3
      },
      "17.2": {
        "solid": 4215.72
      },
      "17.4": {
        "solid": 4215.72
      },
      "17.6": {
        "solid": 4215.72
      },
      "17.8": {
        "solid": 4215.72
      },
      "17.10": {
        "solid": 4215.72
      },
      "18": {
        "solid": 3665.99
      }
    },
    "10": {
      "6.2": {
        "solid": 1881.9
      },
      "6.4": {
        "solid": 1881.9
      },
      "6.6": {
        "solid": 1881.9
      },
      "6.8": {
        "solid": 1881.9
      },
      "6.10": {
        "solid": 1881.9
      },
      "7": {
        "solid": 1881.9
      },
      "7.2": {
        "solid": 1881.9
      },
      "7.4": {
        "solid": 1881.9
      },
      "7.6": {
        "solid": 1881.9
      },
      "7.8": {
        "solid": 1881.9
      },
      "7.10": {
        "solid": 1881.9
      },
      "8": {
        "solid": 1635.7
      },
      "8.2": {
        "solid": 2028.6
      },
      "8.4": {
        "solid": 2028.6
      },
      "8.6": {
        "solid": 2028.6
      },
      "8.8": {
        "solid": 2028.6
      },
      "8.10": {
        "solid": 2028.6
      },
      "9": {
        "solid": 1763.86
      },
      "9.2": {
        "solid": 2347.31
      },
      "9.4": {
        "solid": 2347.31
      },
      "9.6": {
        "solid": 2347.31
      },
      "9.8": {
        "solid": 2347.31
      },
      "9.10": {
        "solid": 2347.31
      },
      "10": {
        "solid": 2040.41
      },
      "10.2": {
        "solid": 2816.1
      },
      "10.4": {
        "solid": 2816.1
      },
      "10.6": {
        "solid": 2816.1
      },
      "10.8": {
        "solid": 2816.1
      },
      "10.10": {
        "solid": 2816.1
      },
      "11": {
        "solid": 2816.1
      },
      "11.2": {
        "solid": 2816.1
      },
      "11.4": {
        "solid": 2816.1
      },
      "11.6": {
        "solid": 2816.1
      },
      "11.8": {
        "solid": 2816.1
      },
      "11.10": {
        "solid": 2816.1
      },
      "12": {
        "solid": 2448.49
      },
      "12.2": {
        "solid": 3153.36
      },
      "12.4": {
        "solid": 3153.36
      },
      "12.6": {
        "solid": 3153.36
      },
      "12.8": {
        "solid": 3153.36
      },
      "12.10": {
        "solid": 3153.36
      },
      "13": {
        "solid": 3153.36
      },
      "13.2": {
        "solid": 3153.36
      },
      "13.4": {
        "solid": 3153.36
      },
      "13.6": {
        "solid": 3153.36
      },
      "13.8": {
        "solid": 3153.36
      },
      "13.10": {
        "solid": 3153.36
      },
      "14": {
        "solid": 2741.9
      },
      "14.2": {
        "solid": 3310.18
      },
      "14.4": {
        "solid": 3310.18
      },
      "14.6": {
        "solid": 3310.18
      },
      "14.8": {
        "solid": 3310.18
      },
      "14.10": {
        "solid": 3310.18
      },
      "15": {
        "solid": 2878.49
      },
      "15.2": {
        "solid": 3492.3
      },
      "15.4": {
        "solid": 3492.3
      },
      "15.6": {
        "solid": 3492.3
      },
      "15.8": {
        "solid": 3492.3
      },
      "15.10": {
        "solid": 3492.3
      },
      "16": {
        "solid": 3037.0
      },
      "16.2": {
        "solid": 4016.73
      },
      "16.4": {
        "solid": 4016.73
      },
      "16.6": {
        "solid": 4016.73
      },
      "16.8": {
        "solid": 4016.73
      },
      "16.10": {
        "solid": 4016.73
      },
      "17": {
        "solid": 3492.3
      },
      "17.2": {
        "solid": 4215.72
      },
      "17.4": {
        "solid": 4215.72
      },
      "17.6": {
        "solid": 4215.72
      },
      "17.8": {
        "solid": 4215.72
      },
      "17.10": {
        "solid": 4215.72
      },
      "18": {
        "solid": 3665.99
      }
    }
  }
};
