// AUTO-GENERATED from the 2026 stock price workbooks. Do not edit by hand.
//   Tiers 7/8: new_pricing_2026_V2.xlsx (authoritative stock-item book)
//   Tier 9:    9FT_Pricing.xlsx (strict 9-ft-high prices for the sizes listed there)
// Shape: model -> widthKey -> tier -> PriceTriple. Width keys use the catalog
// convention: whole feet as "8", half-foot sizes as "7.6".
import type { PriceTriple } from "../types";

export const STOCK_PRICES: Record<string, Record<string, Record<string, PriceTriple>>> = {
  "T50S": {
    "7.6": {
      "7": { "solid": 625.37, "glass": 761.8, "inserts": 852.75 },
      "8": { "solid": 730.99, "glass": 867.42, "inserts": 958.37 },
    },
    "8": {
      "7": { "solid": 560.37, "glass": 696.8, "inserts": 787.75 },
      "8": { "solid": 665.99, "glass": 802.42, "inserts": 893.37 },
      "9": { "solid": 978.84, "glass": 1121.53, "inserts": 1216.65 },
    },
    "9": {
      "7": { "solid": 595.58, "glass": 732.0, "inserts": 822.95 },
      "8": { "solid": 698.26, "glass": 834.69, "inserts": 925.64 },
      "9": { "solid": 1017.18, "glass": 1159.87, "inserts": 1255.0 },
    },
    "10": {
      "7": { "solid": 695.33, "glass": 865.49, "inserts": 979.92 },
      "8": { "solid": 748.14, "glass": 918.3, "inserts": 1032.73 },
      "9": { "solid": 1087.78, "glass": 1266.15, "inserts": 1385.05 },
    },
    "12": {
      "7": { "solid": 792.15, "glass": 997.52, "inserts": 1133.94 },
      "8": { "solid": 962.31, "glass": 1167.68, "inserts": 1304.11 },
      "9": { "solid": 1408.44, "glass": 1622.47, "inserts": 1765.16 },
    },
    "14": {
      "9": { "solid": 1515.84, "glass": 1765.53, "inserts": 1932.0 },
    },
    "15": {
      "7": { "solid": 912.44, "glass": 1151.55, "inserts": 1311.44 },
      "8": { "solid": 1106.07, "glass": 1345.18, "inserts": 1505.08 },
      "9": { "solid": 1618.62, "glass": 1868.31, "inserts": 2034.78 },
    },
    "16": {
      "7": { "solid": 982.85, "glass": 1255.7, "inserts": 1437.6 },
      "8": { "solid": 1144.21, "glass": 1417.06, "inserts": 1598.96 },
      "9": { "solid": 1690.73, "glass": 1976.11, "inserts": 2166.35 },
    },
    "18": {
      "9": { "solid": 2095.76, "glass": 2381.15, "inserts": 2571.38 },
    },
  },
  "T52S": {
    "8": {
      "7": { "solid": 662.42, "glass": 790.23, "inserts": 875.43 },
      "8": { "solid": 786.1, "glass": 913.9, "inserts": 999.12 },
      "9": { "solid": 1107.69, "glass": 1242.34, "inserts": 1332.1 },
    },
    "9": {
      "7": { "solid": 698.15, "glass": 852.96, "inserts": 911.17 },
      "8": { "solid": 835.58, "glass": 963.39, "inserts": 1048.6 },
      "9": { "solid": 1164.16, "glass": 1298.81, "inserts": 1388.57 },
    },
    "10": {
      "7": { "solid": 821.84, "glass": 981.26, "inserts": 1088.45 },
      "8": { "solid": 970.26, "glass": 1129.68, "inserts": 1236.88 },
      "9": { "solid": 1223.52, "glass": 1391.84, "inserts": 1504.07 },
    },
    "12": {
      "9": { "solid": 1591.29, "glass": 1793.28, "inserts": 1927.93 },
    },
    "14": {
      "9": { "solid": 1702.81, "glass": 1938.47, "inserts": 2095.55 },
    },
    "15": {
      "9": { "solid": 1822.97, "glass": 2058.62, "inserts": 2215.71 },
    },
    "16": {
      "7": { "solid": 1131.05, "glass": 1386.68, "inserts": 1557.09 },
      "8": { "solid": 1363.31, "glass": 1618.93, "inserts": 1789.35 },
      "9": { "solid": 1980.81, "glass": 2250.12, "inserts": 2429.67 },
    },
    "18": {
      "9": { "solid": 2245.79, "glass": 2515.1, "inserts": 2694.66 },
    },
  },
  "4050-4051-4053": {
    "7": {
      "7": { "solid": 775.65, "glass": 937.72, "inserts": 1015.02 },
      "8": { "solid": 917.78, "glass": 1079.85, "inserts": 1157.15 },
    },
    "7.6": {
      "7": { "solid": 775.65, "glass": 937.72, "inserts": 1015.02 },
      "8": { "solid": 917.78, "glass": 1079.85, "inserts": 1157.15 },
    },
    "8": {
      "7": { "solid": 710.65, "glass": 872.72, "inserts": 950.02 },
      "8": { "solid": 852.78, "glass": 1014.85, "inserts": 1092.15 },
      "9": { "solid": 1167.07, "glass": 1337.36, "inserts": 1418.56 },
    },
    "9": {
      "7": { "solid": 765.5, "glass": 927.58, "inserts": 1004.88 },
      "8": { "solid": 926.33, "glass": 1088.41, "inserts": 1165.71 },
      "9": { "solid": 1264.0, "glass": 1434.29, "inserts": 1515.49 },
    },
    "10": {
      "7": { "solid": 864.0, "glass": 1065.97, "inserts": 1163.22 },
      "8": { "solid": 1059.74, "glass": 1261.71, "inserts": 1358.95 },
      "9": { "solid": 1464.4, "glass": 1677.24, "inserts": 1778.73 },
    },
    "12": {
      "7": { "solid": 1051.01, "glass": 1294.12, "inserts": 1410.07 },
      "8": { "solid": 1243.01, "glass": 1486.12, "inserts": 1602.07 },
      "9": { "solid": 1756.51, "glass": 2011.93, "inserts": 2133.73 },
    },
    "14": {
      "7": { "solid": 1184.41, "glass": 1468.67, "inserts": 1604.56 },
      "8": { "solid": 1420.04, "glass": 1704.3, "inserts": 1840.2 },
      "9": { "solid": 1967.4, "glass": 2265.38, "inserts": 2407.49 },
    },
    "15": {
      "7": { "solid": 1240.51, "glass": 1524.77, "inserts": 1660.67 },
      "8": { "solid": 1513.55, "glass": 1797.81, "inserts": 1933.7 },
      "9": { "solid": 2065.64, "glass": 2363.62, "inserts": 2505.73 },
    },
    "16": {
      "7": { "solid": 1261.71, "glass": 1585.86, "inserts": 1740.46 },
      "8": { "solid": 1572.15, "glass": 1896.3, "inserts": 2050.9 },
      "9": { "solid": 2179.58, "glass": 2520.13, "inserts": 2682.55 },
    },
    "18": {
      "7": { "solid": 1514.8, "glass": 1838.95, "inserts": 1993.55 },
      "8": { "solid": 1837.71, "glass": 2161.86, "inserts": 2316.46 },
      "9": { "solid": 2631.49, "glass": 2972.04, "inserts": 3134.45 },
    },
  },
  "9130-9133": {
    "8": {
      "7": { "solid": 850.01, "glass": 1043.87, "inserts": 1136.32 },
      "8": { "solid": 1020.01, "glass": 1213.87, "inserts": 1306.32 },
      "9": { "solid": 1371.87, "glass": 1516.88, "inserts": 1609.0 },
    },
    "9": {
      "7": { "solid": 915.62, "glass": 1109.48, "inserts": 1201.94 },
      "8": { "solid": 1107.99, "glass": 1301.85, "inserts": 1394.31 },
      "9": { "solid": 1485.84, "glass": 1626.84, "inserts": 1718.96 },
    },
    "10": {
      "9": { "solid": 1721.38, "glass": 1902.4, "inserts": 2017.54 },
    },
    "12": {
      "9": { "solid": 2064.75, "glass": 2282.0, "inserts": 2420.18 },
    },
    "14": {
      "9": { "solid": 2312.64, "glass": 2569.49, "inserts": 2730.67 },
    },
    "15": {
      "9": { "solid": 2428.13, "glass": 2680.93, "inserts": 2842.11 },
    },
    "16": {
      "7": { "solid": 1509.13, "glass": 1896.85, "inserts": 2081.71 },
      "8": { "solid": 1880.45, "glass": 2268.17, "inserts": 2453.09 },
      "9": { "solid": 2562.09, "glass": 2858.47, "inserts": 3042.7 },
    },
    "18": {
      "9": { "solid": 3093.27, "glass": 3371.02, "inserts": 3555.25 },
    },
  },
  "4300": {
    "8": {
      "7": { "solid": 823.71, "glass": 976.9, "inserts": 1049.96 },
      "8": { "solid": 982.8, "glass": 1135.99, "inserts": 1209.05 },
      "9": { "solid": 1311.74, "glass": 1472.61, "inserts": 1549.33 },
    },
    "9": {
      "7": { "solid": 889.7, "glass": 1042.89, "inserts": 1115.96 },
      "8": { "solid": 1065.28, "glass": 1218.48, "inserts": 1291.54 },
      "9": { "solid": 1398.37, "glass": 1559.25, "inserts": 1635.96 },
    },
    "10": {
      "9": { "solid": 1561.72, "glass": 1762.82, "inserts": 1858.74 },
    },
    "12": {
      "9": { "solid": 1873.54, "glass": 2114.84, "inserts": 2229.93 },
    },
    "14": {
      "9": { "solid": 2098.77, "glass": 2380.3, "inserts": 2514.58 },
    },
    "15": {
      "9": { "solid": 2203.95, "glass": 2485.47, "inserts": 2619.75 },
    },
    "16": {
      "7": { "solid": 1471.84, "glass": 1778.22, "inserts": 1924.35 },
      "8": { "solid": 1813.58, "glass": 2119.96, "inserts": 2266.09 },
      "9": { "solid": 2398.25, "glass": 2719.98, "inserts": 2873.44 },
    },
    "18": {
      "9": { "solid": 2869.74, "glass": 3191.47, "inserts": 3344.93 },
    },
  },
  "GD1LP-GD1SP": {
    "8": {
      "7": { "solid": 765.77, "glass": 1047.02, "inserts": 1093.04 },
      "8": { "solid": 917.9, "glass": 1199.15, "inserts": 1245.18 },
    },
    "9": {
      "7": { "solid": 824.58, "glass": 1105.83, "inserts": 1151.85 },
      "8": { "solid": 997.16, "glass": 1278.41, "inserts": 1324.44 },
    },
    "16": {
      "7": { "solid": 1358.95, "glass": 1921.46, "inserts": 2013.5 },
      "8": { "solid": 1692.62, "glass": 2255.12, "inserts": 2347.17 },
    },
  },
};
