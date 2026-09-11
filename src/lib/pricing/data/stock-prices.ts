// AUTO-GENERATED from the 2026 stock price workbooks. Do not edit by hand.
//   Tiers 7/8: new_pricing_2026_V2.xlsx (authoritative stock-item book)
//   Tier 9:    9FT_Pricing.xlsx (strict 9-ft-high prices for the sizes listed there)
//   4050-4051-4053 tier 7: 4050-7FT.xlsx (STOCK tab, 43M)
// Shape: model -> widthKey -> tier -> PriceTriple. Width keys use the catalog
// convention: whole feet as "8", half-foot sizes as "7.6".
import type { PriceTriple } from "../types";

export const STOCK_PRICES: Record<string, Record<string, Record<string, PriceTriple>>> = {
  "T50S": {
    "7.6": {
      "7": { "solid": 658.18, "glass": 770.33, "inserts": 845.1 },
      "8": { "solid": 791.33, "glass": 903.49, "inserts": 978.25 },
    },
    "8": {
      "7": { "solid": 566.06, "glass": 715.61, "inserts": 815.31 },
      "8": { "solid": 681.84, "glass": 831.39, "inserts": 931.1 },
      "9": { "solid": 1025.96, "glass": 1175.51, "inserts": 1275.22 },
    },
    "9": {
      "7": { "solid": 604.63, "glass": 754.18, "inserts": 853.88 },
      "8": { "solid": 717.22, "glass": 866.76, "inserts": 966.47 },
      "9": { "solid": 1066.16, "glass": 1215.71, "inserts": 1315.41 },
    },
    "10": {
      "7": { "solid": 713.98, "glass": 900.92, "inserts": 1025.53 },
      "8": { "solid": 771.88, "glass": 958.82, "inserts": 1083.43 },
      "9": { "solid": 1140.14, "glass": 1327.08, "inserts": 1451.69 },
    },
    "12": {
      "7": { "solid": 805.65, "glass": 1029.96, "inserts": 1179.51 },
      "8": { "solid": 992.18, "glass": 1216.49, "inserts": 1366.04 },
      "9": { "solid": 1476.22, "glass": 1700.53, "inserts": 1850.08 },
    },
    "14": {
      "9": { "solid": 1588.8, "glass": 1850.53, "inserts": 2025.0 },
    },
    "15": {
      "7": { "solid": 937.53, "glass": 1199.25, "inserts": 1373.73 },
      "8": { "solid": 1149.78, "glass": 1411.51, "inserts": 1585.98 },
      "9": { "solid": 1696.53, "glass": 1958.25, "inserts": 2132.73 },
    },
    "16": {
      "7": { "solid": 1014.71, "glass": 1313.8, "inserts": 1513.22 },
      "8": { "solid": 1191.59, "glass": 1490.69, "inserts": 1690.1 },
      "9": { "solid": 1772.1, "glass": 2071.2, "inserts": 2270.61 },
    },
  },
  "T52S": {
    "8": {
      "7": { "solid": 663.27, "glass": 799.75, "inserts": 890.73 },
      "8": { "solid": 795.34, "glass": 931.82, "inserts": 1022.8 },
      "9": { "solid": 1122.55, "glass": 1259.04, "inserts": 1350.02 },
    },
    "9": {
      "7": { "solid": 701.43, "glass": 837.91, "inserts": 928.89 },
      "8": { "solid": 848.16, "glass": 984.64, "inserts": 1075.63 },
      "9": { "solid": 1179.8, "glass": 1316.29, "inserts": 1407.27 },
    },
    "10": {
      "7": { "solid": 833.48, "glass": 1004.07, "inserts": 1117.79 },
      "8": { "solid": 991.96, "glass": 1162.55, "inserts": 1276.27 },
      "9": { "solid": 1239.96, "glass": 1410.55, "inserts": 1524.27 },
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
      "7": { "solid": 1150.45, "glass": 1423.38, "inserts": 1605.34 },
      "8": { "solid": 1398.43, "glass": 1671.36, "inserts": 1853.32 },
      "9": { "solid": 2007.41, "glass": 2280.34, "inserts": 2462.3 },
    },
  },
  "4050-4051-4053": {
    "7": {
      "7": { "solid": 837.75, "glass": 968.32, "inserts": 1030.6 },
      "8": { "solid": 1013.37, "glass": 1143.93, "inserts": 1206.21 },
    },
    "7.6": {
      "7": { "solid": 837.75, "glass": 968.32, "inserts": 1030.6 },
      "8": { "solid": 1013.37, "glass": 1143.93, "inserts": 1206.21 },
    },
    "8": {
      "7": { "solid": 723.25, "glass": 897.37, "inserts": 980.4 },
      "8": { "solid": 875.95, "glass": 1050.07, "inserts": 1133.11 },
      "9": { "solid": 1193.35, "glass": 1367.47, "inserts": 1450.51 },
    },
    "9": {
      "7": { "solid": 782.19, "glass": 956.32, "inserts": 1039.35 },
      "8": { "solid": 954.95, "glass": 1129.02, "inserts": 1212.11 },
      "9": { "solid": 1292.46, "glass": 1466.58, "inserts": 1549.61 },
    },
    "10": {
      "7": { "solid": 887.98, "glass": 1105.61, "inserts": 1209.4 },
      "8": { "solid": 1098.26, "glass": 1315.89, "inserts": 1419.68 },
      "9": { "solid": 1497.39, "glass": 1715.02, "inserts": 1818.81 },
    },
    "12": {
      "7": { "solid": 1076.84, "glass": 1338.02, "inserts": 1462.58 },
      "8": { "solid": 1283.09, "glass": 1544.26, "inserts": 1668.82 },
      "9": { "solid": 1796.05, "glass": 2057.23, "inserts": 2181.79 },
    },
    "14": {
      "7": { "solid": 1220.14, "glass": 1524.82, "inserts": 1670.14 },
      "8": { "solid": 1473.28, "glass": 1777.96, "inserts": 1923.28 },
      "9": { "solid": 2011.68, "glass": 2316.37, "inserts": 2461.68 },
    },
    "15": {
      "7": { "solid": 1280.4, "glass": 1585.09, "inserts": 1730.4 },
      "8": { "solid": 1573.72, "glass": 1878.4, "inserts": 2023.72 },
      "9": { "solid": 2112.14, "glass": 2416.82, "inserts": 2562.14 },
    },
    "16": {
      "7": { "solid": 1303.18, "glass": 1651.4, "inserts": 1817.47 },
      "8": { "solid": 1636.68, "glass": 1984.91, "inserts": 2150.98 },
      "9": { "solid": 2228.67, "glass": 2576.89, "inserts": 2742.96 },
    },
    "18": {
      "7": { "solid": 1575.05, "glass": 1923.28, "inserts": 2089.35 },
      "8": { "solid": 1921.95, "glass": 2270.18, "inserts": 2436.25 },
      "9": { "solid": 2690.74, "glass": 3038.96, "inserts": 3205.04 },
    },
  },
  "9130-9133": {
    "8": {
      "7": { "solid": 851.54, "glass": 1056.54, "inserts": 1154.32 },
      "8": { "solid": 1031.32, "glass": 1236.32, "inserts": 1334.09 },
      "9": { "solid": 1405.05, "glass": 1610.05, "inserts": 1707.82 },
    },
    "9": {
      "7": { "solid": 920.93, "glass": 1125.93, "inserts": 1223.7 },
      "8": { "solid": 1124.35, "glass": 1329.35, "inserts": 1427.12 },
      "9": { "solid": 1521.74, "glass": 1726.74, "inserts": 1824.51 },
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
      "7": { "solid": 1534.35, "glass": 1944.35, "inserts": 2139.88 },
      "8": { "solid": 1927.0, "glass": 2337.0, "inserts": 2532.53 },
      "9": { "solid": 2624.0, "glass": 3034.0, "inserts": 3229.53 },
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
      "7": { "solid": 772.72, "glass": 1071.47, "inserts": 1152.95 },
      "8": { "solid": 934.3, "glass": 1233.05, "inserts": 1314.53 },
    },
    "9": {
      "7": { "solid": 835.18, "glass": 1133.93, "inserts": 1215.4 },
      "8": { "solid": 1018.51, "glass": 1317.26, "inserts": 1398.74 },
    },
    "16": {
      "7": { "solid": 1390.6, "glass": 1988.12, "inserts": 2151.09 },
      "8": { "solid": 1745.04, "glass": 2342.56, "inserts": 2505.53 },
    },
  },
};
