// AUTO-GENERATED from NEW_PARTS_LIST.xlsx by scripts/gen_parts.py.
// Do not edit by hand — re-run the script when the sheet changes.
//
// perFoot items bill as QUANTITY 1 with the footage multiplied into the
// rate, so the per-foot figure never lands on the QuickBooks line.
// Vinyl stop molding is deliberately absent: it takes a door size rather
// than a footage and bills the other way round. See data/vinyl.ts.

import { handSuffix } from "./torsion";

export interface Part {
  name: string;
  /** Verbiage copied into the QuickBooks description column. */
  desc: string;
  /** Each price, or the per-foot rate when perFoot is set. */
  price: number;
  /** Heading this item sits under inside its category. */
  sub?: string;
  /** Sold by the linear foot — the counter enters how many. */
  perFoot?: boolean;
  /** Ordered by hand — the counter sets how many rights and lefts. */
  hands?: boolean;
}

export interface PartCategory {
  /** Also the QuickBooks item name for everything inside it. */
  name: string;
  items: Part[];
}

export const PART_CATEGORIES: PartCategory[] = [
  {
    "name": "DRUMS",
    "items": [
      {"desc": "1100-18 DRUMS", "name": "1100-18", "price": 59.95},
      {"desc": "400-12 DRUMS", "name": "400-12", "price": 19.95},
      {"desc": "400-54 DRUMS", "name": "400-54", "price": 24.95},
      {"desc": "400-8 DRUMS", "name": "400-8", "price": 12.95},
      {"desc": "5250-18 DRUMS", "name": "5250-18", "price": 39.95},
      {"desc": "5250-54 DRUMS", "name": "5250-54", "price": 39.95},
      {"desc": "5750-120 DRUMS", "name": "5750-120", "price": 49.95},
      {"desc": "850-11 DRUMS", "name": "850-11", "price": 39.95},
    ],
  },
  {
    "name": "ANGLE",
    "items": [
      {"desc": "2\" X 2\" X 10'  ANGLE", "name": "2\" X 2\" X 10'  ANGLE", "price": 26.95},
      {"desc": "GALVANIZED ANGLE IRON", "name": "GALV ANGLE IRON", "price": 11.95},
      {"desc": "WHITE ANGLE IRON", "name": "WHITE ANGLE IRON", "price": 11.95},
    ],
  },
  {
    "name": "ARB",
    "items": [
      {"desc": "ARB BRACKET", "name": "ARB", "price": 12.95},
      {"desc": "ORB BRACKET", "name": "ORB", "price": 10.95},
    ],
  },
  {
    "name": "BATTERIES",
    "items": [
      {"desc": "12 VOLT BATTERY", "name": "12 VOLT", "price": 2.25},
      {"desc": "3 VOLT BATTERY", "name": "3 VOLT", "price": 2.0},
    ],
  },
  {
    "name": "BRUSH SEAL / RETAINERS",
    "items": [
      {"desc": "1\" BRUSH SEAL", "name": "1\" BRUSH SEAL", "perFoot": true, "price": 2.75},
      {"desc": "2\" BRUSH SEAL", "name": "2\" BRUSH SEAL", "perFoot": true, "price": 3.25},
      {"desc": "3\" BRUSH SEAL", "name": "3\" BRUSH SEAL", "perFoot": true, "price": 3.75},
      {"desc": "ALUMINUM RETAINER,  1\",  90 DEGREE,  10FT", "name": "ALUM 1\", 90 DEGREE", "price": 25.95},
      {"desc": "ALUMINUM RETAINER,  1\",  STRAIGHT,  10FT", "name": "ALUM 1\", STRAIGHT", "price": 25.95},
      {"desc": "ALUMINUM RETAINER,  2\",  45 DEGREE,  10FT", "name": "ALUM 2\", 45 DEGREE", "price": 25.95},
    ],
  },
  {
    "name": "CABLES",
    "items": [
      {"desc": "CABLE KEEPERS,  PAIR", "name": "CABLE KEEPERS", "price": 14.95},
      {"desc": "7FT EXTENSION CABLES,  PAIR", "name": "7FT EXT CABLE", "price": 6.6, "sub": "EXTENSION CABLES"},
      {"desc": "8FT EXTENSION CABLES,  PAIR", "name": "8FT EXT CABLE", "price": 6.6, "sub": "EXTENSION CABLES"},
      {"desc": "8FT CC CLIP EXTENSION CABLES,  PAIR", "name": "8FT EXT CC CLIP CABLE", "price": 7.6, "sub": "EXTENSION CABLES"},
      {"desc": "9FT EXTENSION CABLES,  PAIR", "name": "9FT EXT CABLE", "price": 10.95, "sub": "EXTENSION CABLES"},
      {"desc": "7FT TORSION CABLES,  PAIR", "name": "7FT TOR CABLE", "price": 7.6, "sub": "TORSION CABLES"},
      {"desc": "8FT TORSION CABLES,  PAIR", "name": "8FT TOR CABLE", "price": 7.6, "sub": "TORSION CABLES"},
    ],
  },
  {
    "name": "CENTER PLATES / BEARINGS",
    "items": [
      {"desc": "1-1/4\" STEEL BEARING", "name": "1-1/4\" STEEL BEARING", "price": 4.95},
      {"desc": "1\" FOOTBALL BEARING", "name": "1\" FOOTBALL", "price": 5.95},
      {"desc": "1\" PLASTIC BEARING", "name": "1\" PLASTIC BEARING", "price": 1.95},
      {"desc": "1\" STEEL BEARING", "name": "1\" STEEL BEARING", "price": 2.95},
      {"desc": "6\" UNIVERSAL SPRING ANCHOR PLATE", "name": "6\" UNIVERSAL ANCHOR PLATE", "price": 14.95},
      {"desc": "USA MINI SPRING ANCHOR PLATE", "name": "USA MINI ANCHOR PLATE", "price": 4.95},
    ],
  },
  {
    "name": "CHAIN HOIST",
    "items": [
      {"desc": "CHAIN HOIST 4:1,  1-1/4\" BORE,  BOLT ON WALL", "name": "CH, 1-1/4\" BORE, BOLT ON WALL", "price": 159.95},
      {"desc": "CHAIN HOIST 4:1,  1\" BORE,  BOLT ON WALL", "name": "CH, 1\" BORE, BOLT ON WALL", "price": 129.95},
      {"desc": "CHAIN HOIST 3:1,  1\" BORE,  SLIDE ON SHAFT", "name": "CH, 1\" BORE, SLIDE ON", "price": 139.95},
    ],
  },
  {
    "name": "COLLAR / COUPLING",
    "items": [
      {"desc": "1-1/4\" COLLAR", "name": "1-1/4\" COLLAR", "price": 4.95},
      {"desc": "1-1/4\" COUPLING", "name": "1-1/4\" COUPLING", "price": 29.95},
      {"desc": "1\" COLLAR", "name": "1\" COLLAR", "price": 2.95},
      {"desc": "1\" COUPLING", "name": "1\" COUPLING", "price": 19.95},
    ],
  },
  {
    "name": "DECORATIVE HARDWARE",
    "items": [
      {"desc": "BLACK CRINKLE FINISH COLONIAL STRAP HANDLES [2PCS]", "name": "COLONIAL HANDLES [2PCS]", "price": 44.95},
      {"desc": "BLACK CRINKLE FINISH COLONIAL STRAP HINGES [4PCS] AND HANDLES [2PCS]", "name": "COLONIAL HDW SET", "price": 129.95},
      {"desc": "BLACK CRINKLE FINISH COLONIAL STRAP HINGES [4PCS]", "name": "COLONIAL HINGES [4PCS]", "price": 74.95},
      {"desc": "DUMMY HANDLES [2PCS] WITH KEYHOLE", "name": "DUMMY HANDLES [2PCS]", "price": 39.95},
      {"desc": "ESCUTCHEON PLATE [1PC]", "name": "ESCUTCHEON PLATE [1PC]", "price": 9.95},
      {"desc": "MAGNETIC SPADE STRAP HANDLES [2PCS]", "name": "MAGNETIC HANDLES [2PS]", "price": 19.95},
      {"desc": "MAGNETIC SPADE STRAP HINGES [4PCS] AND HANDLES [2PCS]", "name": "MAGNETIC HDW SET", "price": 54.95},
      {"desc": "MAGNETIC SPADE STRAP HINGES [4PCS]", "name": "MAGNETIC HINGES [4PS]", "price": 34.95},
      {"desc": "BLACK CRINKLE FINISH SPADE HANDLES [2PCS]", "name": "SPADE HANDLES [2PCS]", "price": 9.95},
      {"desc": "BLACK CRINKLE FINISH SPADE STRAP HINGES [4PCS] AND HANDLES [2PCS]", "name": "SPADE HDW SET", "price": 29.95},
      {"desc": "BLACK CRINKLE FINISH SPADE STRAP HINGES [4PCS]", "name": "SPADE HINGES [4PCS]", "price": 19.95},
      {"desc": "BLACK CRINKLE FINISH SPEAR STRAP HANDLES [2PCS]", "name": "SPEAR HANDLES [2PCS]", "price": 44.95},
      {"desc": "BLACK CRINKLE FINISH SPEAR STRAP HINGES [4PCS] AND HANDLES [2PCS]", "name": "SPEAR HDW SET", "price": 129.95},
      {"desc": "BLACK CRINKLE FINISH SPEAR STRAP HINGES [4PCS]", "name": "SPEAR HINGES [4PCS]", "price": 74.95},
      {"desc": "TWISTED L HANDLES [2PCS], NO LOCK", "name": "TWISTED L HANDLES NO LOCK", "price": 45.95},
      {"desc": "TWISTED L HANDLES [2PCS] WITH OPERABLE LOCK SET", "name": "TWISTED L HANDLES WITH LOCK", "price": 74.95},
      {"desc": "TWISTED L HANDLES [2PCS] WITH OPERABLE LOCK SET,  INSTALLED", "name": "TWISTED L, INSTALLED", "price": 125.0},
      {"desc": "TWISTED T HANDLE [1PC], NO LOCK", "name": "TWISTED T HANDLE NO LOCK", "price": 45.95},
      {"desc": "TWISTED T HANDLE [1PC] WITH OPERABLE LOCK SET", "name": "TWISTED T HANDLE WITH LOCK", "price": 74.95},
      {"desc": "TWISTED T HANDLE [1PC] WITH OPERABLE LOCK SET,  INSTALLED", "name": "TWISTED T, INSTALLED", "price": 125.0},
    ],
  },
  {
    "name": "END BEARING PLATES",
    "items": [
      {"desc": "4-3/8\" END BEARING PLATE,  PAIR", "name": "4-3/8\" END BEARING PLATE", "price": 24.95},
      {"desc": "5\" END BEARING PLATE,  PAIR", "name": "5\" END BEARING PLATE", "price": 28.95},
      {"desc": "6\" END BEARING PLATE,  PAIR", "name": "6\" END BEARING PLATE", "price": 29.95},
      {"desc": "3-3/8\" END BEARING PLATE,  COMMERCIAL,  PAIR", "name": "COMM END BEARING PLATES", "price": 16.95},
      {"desc": "3-3/8\" END BEARING PLATE,  RESIDENTIAL,  PAIR", "name": "RES END BEARING PLATES", "price": 12.95},
    ],
  },
  {
    "name": "FASTENERS",
    "items": [
      {"desc": "1/4\" X 1\" TEK,  BAG OF 100", "name": "1/4\" X 1\" TEK", "price": 10.95},
      {"desc": "1/4\" X 1\" WOOD LAGS,  BAG OF 100", "name": "1/4\" X 1\" WOOD LAGS", "price": 9.95},
      {"desc": "1/4\" X 3/4\" TEK,  BAG OF 100", "name": "1/4\" X 3/4\" TEK", "price": 10.95},
      {"desc": "3/8\" FLAT WASHERS,  BAG OF 100", "name": "3/8\" FLAT WASHERS", "price": 4.95},
      {"desc": "3/8\" NUTS,  BAG OF 100", "name": "3/8\" NUTS", "price": 7.95},
      {"desc": "3/8\" X 1-1/2\" BOLTS,  BAG OF 100", "name": "3/8\" X 1-1/2\" BOLTS", "price": 17.95},
      {"desc": "3/8\" X 1\" BOLTS,  BAG OF 100", "name": "3/8\" X 1\" BOLTS", "price": 16.95},
      {"desc": "3/8\" X 3/4\" CARRIAGE BOLTS,  BAG OF 100", "name": "3/8\" X 3/4\" CARRIAGE BOLTS", "price": 17.95},
      {"desc": "5/16\" FLAT WASHERS,  BAG OF 100", "name": "5/16\" FLAT WASHERS", "price": 4.95},
      {"desc": "5/16\" NUTS,  BAG OF 100", "name": "5/16\" NUTS", "price": 6.95},
      {"desc": "5/16\" X 1-5/8\" LAGS,  BAG OF 100", "name": "5/16\" X 1-5/8\" LAGS", "price": 17.95},
      {"desc": "5/16\" X 1\" BOLTS,  BAG OF 100", "name": "5/16\" X 1\" BOLTS", "price": 15.5},
      {"desc": "5/16\" X 1\" TEK,  BAG OF 100", "name": "5/16\" X 1\" TEK", "price": 17.95},
      {"desc": "5/16\" X 3\" LAGS,  BAG OF 50", "name": "5/16\" X 3\" LAGS", "price": 17.95},
      {"desc": "TRACK BOLTS,  BAG OF 100", "name": "TRACK BOLTS", "price": 8.95},
      {"desc": "TRACK NUTS,  BAG OF 100", "name": "TRACK NUTS", "price": 5.95},
      {"desc": "5/16\" X 3-1/2\" EYEBOLTS,  BAG OF 25", "name": "5/16\" X 3-1/2\" EYEBOLTS", "price": 20.95},
      {"desc": "S-HOOKS,  BAG OF 25", "name": "S-HOOKS", "price": 8.95},
    ],
  },
  {
    "name": "FIXTURES",
    "items": [
      {"desc": "COMMERCIAL BOTTOM FIXTURES,  BB120,  PAIR", "name": "COMM BTM FIX BB120", "price": 24.95},
      {"desc": "COMMERCIAL BOTTOM FIXTURES, 2\" AND 3\" TRACK,  BB6,  PAIR", "name": "COMM BTM FIX BB6", "price": 44.95},
      {"desc": "COMMERCIAL LOW HEADROOM BOTTOM FIXTURES,  BB5,  PAIR", "name": "COMM LHR BTM FIX BB5", "price": 29.95},
      {"desc": "COMMERCIAL LOW HEADROOM BOTTOM FIXTURES,  BB6,  PAIR", "name": "COMM LHR BTM FIX BB6", "price": 64.95},
      {"desc": "COMMERCIAL LOW HEADROOM TOP FIXTURES,  [1PC]", "name": "COMM LHR TOP FIX", "price": 7.95},
      {"desc": "COMMERCIAL TOP FIXTURES,  [1PC]", "name": "COMM TOP FIX", "price": 6.95},
      {"desc": "RESIDENTIAL BOTTOM FIXTURES, BB100,  PAIR", "name": "RES BTM BB100", "price": 7.95},
      {"desc": "RESIDENTIAL BOTTOM FIXTURES, BB90,  PAIR", "name": "RES BTM BB90", "price": 9.95},
      {"desc": "RESIDENTIAL LOW HEADROOM BOTTOM FIXTURES,  PAIR", "name": "RES LHR BTM FIX", "price": 19.95},
      {"desc": "RESIDENTIAL LOW HEADROOM TOP FIXTURES,  [1PC]", "name": "RES LHR TOP FIX", "price": 7.95},
      {"desc": "RESIDENTIAL TOP FIXTURES,  [1PC]", "name": "RES TOP FIX", "price": 5.95},
      {"desc": "WAYNE DALTON COMMERCIAL BOTTOM FIXTURES,  PAIR", "name": "WD COMM BTM FIX", "price": 24.95},
    ],
  },
  {
    "name": "HINGES",
    "items": [
      {"desc": "# 1 HINGE,  11GA", "name": "# 1 HINGE,  11GA", "price": 3.45},
      {"desc": "# 1 HINGE,  14GA", "name": "# 1 HINGE,  14GA", "price": 1.72},
      {"desc": "# 2 HINGE,  11GA", "name": "# 2 HINGE,  11GA", "price": 3.55},
      {"desc": "# 2 HINGE,  14GA", "name": "# 2 HINGE,  14GA", "price": 1.76},
      {"desc": "# 3 HINGE,  11GA", "name": "# 3 HINGE,  11GA", "price": 3.65},
      {"desc": "# 3 HINGE,  14GA", "name": "# 3 HINGE,  14GA", "price": 1.82},
      {"desc": "# 4 HINGE,  11GA", "name": "# 4 HINGE,  11GA", "price": 3.75},
      {"desc": "# 4 HINGE,  14GA", "name": "# 4 HINGE,  14GA", "price": 1.9},
      {"desc": "# 5 HINGE,  11GA", "name": "# 5 HINGE,  11GA", "price": 3.85},
      {"desc": "# 5 HINGE,  14GA", "name": "# 5 HINGE,  14GA", "price": 1.98},
      {"desc": "# 6 HINGE,  11GA", "name": "# 6 HINGE,  11GA", "price": 3.95},
      {"desc": "# 6 HINGE,  14GA", "name": "# 6 HINGE,  14GA", "price": 2.06},
      {"desc": "# 7 HINGE,  11GA", "name": "# 7 HINGE,  11GA", "price": 4.05},
      {"desc": "# 7 HINGE,  14GA", "name": "# 7 HINGE,  14GA", "price": 2.14},
      {"desc": "1/2 HINGES,  14GA", "name": "1/2 HINGES", "price": 1.96},
      {"desc": "QUICK CLOSURE TOP FIXTURES", "name": "QUICK CLOSE TOP FIX", "price": 12.95},
    ],
  },
  {
    "name": "JAMB BRACKETS",
    "items": [
      {"desc": "#1 JAMB BRACKET", "name": "#1 JAMB BRACKET", "price": 2.95},
      {"desc": "#10 JAMB BRACKET", "name": "#10 JAMB BRACKET", "price": 3.95},
      {"desc": "#2 JAMB BRACKET", "name": "#2 JAMB BRACKET", "price": 2.95},
      {"desc": "#3 JAMB BRACKET", "name": "#3 JAMB BRACKET", "price": 2.95},
      {"desc": "#4 JAMB BRACKET", "name": "#4 JAMB BRACKET", "price": 2.95},
      {"desc": "#5 JAMB BRACKET", "name": "#5 JAMB BRACKET", "price": 2.95},
      {"desc": "#6 JAMB BRACKET", "name": "#6 JAMB BRACKET", "price": 2.95},
      {"desc": "#7 JAMB BRACKET", "name": "#7 JAMB BRACKET", "price": 2.95},
      {"desc": "#8 JAMB BRACKET", "name": "#8 JAMB BRACKET", "price": 2.95},
      {"desc": "#9 JAMB BRACKET", "name": "#9 JAMB BRACKET", "price": 2.95},
    ],
  },
  {
    "name": "LOCKS",
    "items": [
      {"desc": "INSIDE SLIDE LOCK", "name": "INSIDE SLIDE LOCK", "price": 4.95},
      {"desc": "LOCK BAG ASSEMBLY", "name": "LOCK BAG", "price": 24.95},
      {"desc": "8FT LOCKBAR ASSEMBLY", "name": "LOCK BAR ASSEMBLY", "price": 45.0},
      {"desc": "8FT LOCKBAR", "name": "LOCKBAR", "price": 19.95},
    ],
  },
  {
    "name": "PULLEYS",
    "items": [
      {"desc": "3 HOLE CLIP,  BAG OF 25", "name": "3 HOLE CLIP", "price": 7.95},
      {"desc": "3\" CAST IRON PULLEYS", "name": "3\" CAST IRON PULLEYS", "price": 8.75},
      {"desc": "3\" FORK", "name": "3\" FORK", "price": 0.95},
      {"desc": "3\" GOLD PULLEYS", "name": "3\" GOLD PULLEYS", "price": 1.95},
      {"desc": "3\" SILVER PULLEYS", "name": "3\" SILVER PULLEYS", "price": 1.75},
      {"desc": "4\" CAST IRON PULLEYS", "name": "4\" CAST IRON PULLEYS", "price": 12.75},
      {"desc": "4\" FORK", "name": "4\" FORK", "price": 1.5},
      {"desc": "4\" SILVER PULLEYS", "name": "4\" SILVER PULLEY", "price": 3.95},
      {"desc": "4\" SILVER STUD PULLEYS", "name": "4\" SILVER STUD PULLEY", "price": 4.5},
      {"desc": "5\" SILVER STUD PULLEYS", "name": "5\" SILVER STUD PULLEY", "price": 10.3},
    ],
  },
  {
    "name": "QUICK DISCONNECT",
    "items": [
      {"desc": "EMERGENCY QUICK DISCONNECT", "name": "QUICK DISCONNECT", "price": 14.95},
      {"desc": "EMERGENCY QUICK DISCONNECT INSTALLED", "name": "QUICK DISCONNECT INSTALL", "price": 40.0},
    ],
  },
  {
    "name": "RETAINERS",
    "items": [
      {"desc": "1-3/4\"  L  RETAINER,", "name": "1-3/4\" L RETAINER", "perFoot": true, "price": 2.75},
      {"desc": "1-3/8\"  L  RETAINER,", "name": "1-3/8\" L RETAINER", "perFoot": true, "price": 2.75},
      {"desc": "1-3/8\"  U  RETAINER,", "name": "1-3/8\" U RETAINER", "perFoot": true, "price": 3.75},
      {"desc": "2\"  L  RETAINER,", "name": "2\" L RETAINER", "perFoot": true, "price": 2.75},
      {"desc": "2\"  U  RETAINER,", "name": "2\" U RETAINER", "perFoot": true, "price": 3.75},
      {"desc": "4\" BOTTOM T RUBBER,", "name": "4\" BOTTOM T RUBBER", "perFoot": true, "price": 1.25},
      {"desc": "5\" BOTTOM T RUBBER,", "name": "5\" BOTTOM T RUBBER", "perFoot": true, "price": 1.5},
      {"desc": "6\" BOTTOM T RUBBER,", "name": "6\" BOTTOM T RUBBER", "perFoot": true, "price": 1.75},
      {"desc": "WHITE JAMB SEAL,", "name": "JAMB SEAL", "perFoot": true, "price": 1.25},
      {"desc": "ROLLING STEEL BOTTOM SEAL,", "name": "ROLLING STEEL SEAL", "perFoot": true, "price": 2.25},
      {"desc": "THRESHOLD SEAL,", "name": "THRESHOLD SEAL", "perFoot": true, "price": 3.95},
      {"desc": "2\" TOP HEADER SEAL,", "name": "TOP HEADER SEAL", "perFoot": true, "price": 3.75},
      {"desc": "UNIVERSAL BOTTOM RETAINER,", "name": "UNIVERSAL BTM", "perFoot": true, "price": 3.5},
      {"desc": "NAIL ON BOTTOM WOOD RUBBER,", "name": "WOOD RUBBER", "perFoot": true, "price": 1.25},
    ],
  },
  {
    "name": "ROLLERS",
    "items": [
      {"desc": "2\" LONG STEM NYLON ROLLERS", "name": "2\" LS NYLON", "price": 1.95},
      {"desc": "2\" LONG STEM STEEL ROLLERS", "name": "2\" LS STEEL", "price": 1.95},
      {"desc": "2\" SHORT STEM NYLON ROLLERS", "name": "2\" SS NYLON", "price": 1.5},
      {"desc": "2\" SHORT STEM STEEL ROLLERS", "name": "2\" SS STEEL", "price": 1.75},
      {"desc": "3\" LONG STEM STEEL ROLLERS", "name": "3\" LS STEEL", "price": 4.5},
    ],
  },
  {
    "name": "SPRING BUMPERS",
    "items": [
      {"desc": "15\" PUSH DOWN BUMPERS,  PAIR", "name": "15\" BUMPERS", "price": 36.95},
      {"desc": "27\" PUSH DOWN BUMPERS,  PAIR", "name": "27\" BUMPERS", "price": 46.95},
      {"desc": "LEAF BUMPERS WITH BRACKETS,  PAIR", "name": "LEAF BUMPERS", "price": 27.72},
      {"desc": "STARTER PACK,  18GA HINGES,  10 PLASTIC SHORT STEM ROLLERS,  BOTTOM AND TOP FIXTURES", "name": "STARTER PACK", "price": 39.95},
    ],
  },
  {
    "name": "STRUTS",
    "items": [
      {"desc": "10FT STRUT", "name": "10FT STRUT", "price": 20.95},
      {"desc": "12FT STRUT", "name": "12FT STRUT", "price": 23.95},
      {"desc": "14FT STRUT", "name": "14FT STRUT", "price": 25.95},
      {"desc": "15FT STRUT", "name": "15FT STRUT", "price": 34.95},
      {"desc": "16FT STRUT", "name": "16FT STRUT", "price": 34.95},
      {"desc": "3\",  16FT STRUT", "name": "16FT STRUT - 3\"", "price": 49.95},
      {"desc": "18FT STRUT", "name": "18FT STRUT", "price": 39.95},
      {"desc": "3\",  18FT STRUT", "name": "18FT STRUT - 3\"", "price": 54.95},
      {"desc": "3\",  20FT STRUT", "name": "20FT STRUT - 3\"", "price": 59.95},
      {"desc": "3\",  24FT STRUT", "name": "24FT STRUT - 3\"", "price": 69.95},
      {"desc": "8FT STRUT", "name": "8FT STRUT", "price": 15.95},
      {"desc": "9FT STRUT", "name": "9FT STRUT", "price": 17.95},
    ],
  },
  {
    "name": "TOOLS",
    "items": [
      {"desc": "FELCO CABLE CUTTER", "name": "CABLE CUTTER", "price": 74.95},
      {"desc": "RONAN MULTI CUT", "name": "MULTI CUT", "price": 30.95},
      {"desc": "RONAN MULTI CUT REPLACEMENT BLADES", "name": "MULTI CUT BLADES", "price": 9.95},
      {"desc": "TORSION SPRING POCKET GAUGE", "name": "POCKET GAUGE", "price": 42.95},
      {"desc": "TORSION SPRING RULER", "name": "RULER", "price": 19.95},
      {"desc": "SPRAY LUBE", "name": "SPRAY LUBE", "price": 7.95},
      {"desc": "PACK OF STAPLES", "name": "STAPLES", "price": 6.95},
    ],
  },
  {
    "name": "TRACKS",
    "items": [
      {"desc": "2\" RAW TRACK,", "name": "2\" RAW TRACK", "perFoot": true, "price": 3.75},
      {"desc": "3\" RAW TRACK,", "name": "3\" RAW TRACK", "perFoot": true, "price": 8.5},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  10FT HIGH,  15\" RADIUS", "name": "COMMERCIAL TRACKS:10FT,  15R", "price": 399.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  10FT HIGH,  FULL VERTICAL LIFT", "name": "COMMERCIAL TRACKS:10FT,  FV", "price": 649.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  12FT HIGH,  15\" RADIUS", "name": "COMMERCIAL TRACKS:12FT,  15R", "price": 499.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  12FT HIGH,  FULL VERTICAL LIFT", "name": "COMMERCIAL TRACKS:12FT,  FV", "price": 799.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  14FT HIGH,  15\" RADIUS", "name": "COMMERCIAL TRACKS:14FT,  15R", "price": 599.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  14FT HIGH,  FULL VERTICAL LIFT", "name": "COMMERCIAL TRACKS:14FT,  FV", "price": 899.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  8FT HIGH,  15\" RADIUS", "name": "COMMERCIAL TRACKS:8FT,  15R", "price": 299.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF ANGLE MOUNT TRACK TO WOOD,  8FT HIGH,  FULL VERTICAL LIFT", "name": "COMMERCIAL TRACKS:8FT,  FV", "price": 549.95, "sub": "COMMERCIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  20\" RADIUS", "name": "20R,  12' AND UP", "price": 318.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  20\" RADIUS", "name": "20R,  7' TO 10' WIDE", "price": 287.95, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  32\" RADIUS", "name": "32R,  12' AND UP", "price": 318.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  32\" RADIUS", "name": "32R,  7' TO 10' WIDE", "price": 287.95, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  7FT HIGH,  12\" RADIUS", "name": "7',  10/12/15R,  12' AND UP", "price": 156.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  7FT HIGH,  12\" RADIUS", "name": "7',  10/12/15R,  7' TO 10' WIDE", "price": 114.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  7FT HIGH,  LOW HEADROOM", "name": "7',  LHR,  12' WIDE AND UP", "price": 207.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  7FT HIGH,  LOW HEADROOM", "name": "7',  LHR,  7' TO 10' WIDE", "price": 166.5, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  12\" RADIUS", "name": "8',  10/12/15R,  12' AND UP", "price": 183.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  12\" RADIUS", "name": "8',  10/12/15R,  7' TO 10' WIDE", "price": 132.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  LOW HEADROOM", "name": "8',  LHR,  12' WIDE AND UP", "price": 235.5, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  8FT HIGH,  LOW HEADROOM", "name": "8',  LHR,  7' TO 10' WIDE", "price": 183.0, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  9FT HIGH,  15\" RADIUS", "name": "9',  12/15R,  12' AND UP", "price": 238.5, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  9FT HIGH,  15\" RADIUS", "name": "9',  12/15R,  7' TO 10' WIDE", "price": 196.5, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  9FT HIGH,  LOW HEADROOM", "name": "9',  LHR,  12' WIDE AND UP", "price": 289.5, "sub": "RESIDENTIAL TRACKS"},
      {"desc": "COMPLETE SET OF BRACKET MOUNTED TRACK,  9FT HIGH,  LOW HEADROOM", "name": "9',  LHR,  7' TO 10' WIDE", "price": 249.0, "sub": "RESIDENTIAL TRACKS"},
    ],
  },
  {
    "name": "TRIM NAILS",
    "items": [
      {"desc": "ALMOND TRIM NAILS", "name": "ALMOND", "price": 12.95},
      {"desc": "BLACK TRIM NAILS", "name": "BLACK", "price": 12.95},
      {"desc": "BROWN TRIM NAILS", "name": "BROWN", "price": 12.95},
      {"desc": "SANDTONE TRIM NAILS", "name": "SANDTONE", "price": 12.95},
      {"desc": "WHITE TRIM NAILS", "name": "WHITE", "price": 12.95},
    ],
  },
  {
    "name": "TUBE SHAFT",
    "items": [
      {"desc": "1-1/4\" SOLID SHAFT", "name": "1-1/4\" SOLID SHAFT", "price": 11.5},
      {"desc": "1\" SOLID SHAFT", "name": "1\" SOLID SHAFT", "price": 8.5},
      {"desc": "10FT TUBE SHAFT", "name": "10FT TUBE SHAFT", "price": 22.95},
      {"desc": "12FT TUBE SHAFT", "name": "12FT TUBE SHAFT", "price": 29.95},
      {"desc": "14FT TUBE SHAFT", "name": "14FT TUBE SHAFT", "price": 32.95},
      {"desc": "15FT TUBE SHAFT", "name": "15FT TUBE SHAFT", "price": 34.95},
      {"desc": "16FT TUBE SHAFT", "name": "16FT TUBE SHAFT", "price": 34.95},
      {"desc": "16FT TUBE SHAFT - HEAVY", "name": "16FT TUBE SHAFT - HEAVY", "price": 44.95},
      {"desc": "18FT TUBE SHAFT", "name": "18FT TUBE SHAFT", "price": 54.95},
      {"desc": "8FT TUBE SHAFT", "name": "8FT TUBE SHAFT", "price": 15.95},
      {"desc": "9FT TUBE SHAFT", "name": "9FT TUBE SHAFT", "price": 17.95},
    ],
  },
  {
    "name": "WINDING BARS",
    "items": [
      {"desc": "18\" WINDING BARS,  1 PAIR", "name": "18\" WINDING BARS", "price": 24.95},
      {"desc": "24\" WINDING BARS,  1 PAIR", "name": "24\" WINDING BARS", "price": 29.95},
      {"desc": "36\" WINDING BARS,  1 PAIR", "name": "36\" WINDING BARS", "price": 49.95},
    ],
  },
  {
    "name": "EXTENSION SPRINGS",
    "items": [
      {"desc": "7FT EXTENSION KIT", "name": "7FT EXT KIT", "price": 24.95},
      {"desc": "8FT EXTENSION KIT", "name": "8FT EXT KIT", "price": 28.95},
      {"desc": "EXTENSION SPRINGS,  25-42-100", "name": "25-42-100,  TAN", "price": 15.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-110", "name": "25-42-110,  WHITE", "price": 16.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-120", "name": "25-42-120,  GREEN", "price": 17.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-130", "name": "25-42-130,  YELLOW", "price": 19.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-140", "name": "25-42-140,  BLUE", "price": 21.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-150", "name": "25-42-150,  RED", "price": 23.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-160", "name": "25-42-160,  BROWN", "price": 24.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-170", "name": "25-42-170,  ORANGE", "price": 26.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-180", "name": "25-42-180,  GOLD", "price": 28.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-190", "name": "25-42-190,  LIGHT BLUE", "price": 30.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-200", "name": "25-42-200,  TAN", "price": 33.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-210", "name": "25-42-210,  WHITE", "price": 35.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-220", "name": "25-42-220,  GREEN", "price": 37.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-80", "name": "25-42-80,  GOLD", "price": 14.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  25-42-90", "name": "25-42-90,  LIGHT BLUE", "price": 15.95, "sub": "EXTENSION SPRINGS, 7FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-100", "name": "27-48-100,  TAN", "price": 17.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-110", "name": "27-48-110,  WHITE", "price": 18.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-120", "name": "27-48-120,  GREEN", "price": 19.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-130", "name": "27-48-130,  YELLOW", "price": 21.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-140", "name": "27-48-140,  BLUE", "price": 23.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-150", "name": "27-48-150,  RED", "price": 25.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-160", "name": "27-48-160,  BROWN", "price": 27.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-170", "name": "27-48-170,  ORANGE", "price": 29.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-180", "name": "27-48-180,  GOLD", "price": 31.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-190", "name": "27-48-190,  LIGHT BLUE", "price": 33.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-200", "name": "27-48-200,  TAN", "price": 35.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-210", "name": "27-48-210,  WHITE", "price": 37.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-220", "name": "27-48-220,  GREEN", "price": 39.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-240", "name": "27-48-240,  BLUE", "price": 43.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-260", "name": "27-48-260,  BROWN", "price": 47.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-280", "name": "27-48-280,  GOLD", "price": 51.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-300", "name": "27-48-300,  TAN", "price": 55.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-320", "name": "27-48-320,  GREEN", "price": 57.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-340", "name": "27-48-340,  BLUE", "price": 59.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-360", "name": "27-48-360,  BROWN", "price": 61.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-380", "name": "27-48-380,  GOLD", "price": 63.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-400", "name": "27-48-400,  TAN", "price": 65.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-80", "name": "27-48-80,  GOLD", "price": 15.95, "sub": "EXTENSION SPRINGS, 8FT"},
      {"desc": "EXTENSION SPRINGS,  27-48-90", "name": "27-48-90,  LIGHT BLUE", "price": 16.95, "sub": "EXTENSION SPRINGS, 8FT"},
    ],
  },
  {
    "name": "TORSION SPRINGS",
    "items": [
      {"desc": "7FT TORSION KIT", "name": "7FT TOR KIT", "price": 39.95},
      {"desc": "8FT TORSION KIT", "name": "8FT TOR KIT", "price": 44.95},
      {"desc": "TORSION SPRINGS,  2\" ID,  218 WIRE,  23-1/4\" LONG", "hands": true, "name": "100LBS,  2 X 218 X 23-1/4\"", "price": 46.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  225 WIRE,  24-1/2\" LONG", "hands": true, "name": "110LBS,  2 X 225 X 24-1/2\"", "price": 49.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  234 WIRE,  27-1/4\" LONG", "hands": true, "name": "120LBS,  2 X 234 X 27-1/4\"", "price": 55.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  234 WIRE,  25-1/4\" LONG", "hands": true, "name": "130LBS,  2 X 234 X 25-1/4\"", "price": 52.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  243 WIRE,  28-1/4\" LONG", "hands": true, "name": "140LBS,  2 X 243 X 28-1/4\"", "price": 59.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  250 WIRE,  29-3/4\" LONG", "hands": true, "name": "150LBS,  2 X 250 X 29-3/4\"", "price": 63.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  262 WIRE, 35-1/4\" LONG", "hands": true, "name": "160LBS,  2 X 262 X 35-1/4\"", "price": 77.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  262 WIRE, 33-1/4\" LONG", "hands": true, "name": "170LBS,  2 X 262 X 33-1/4\"", "price": 73.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  262 WIRE, 31-1/2\" LONG", "hands": true, "name": "180LBS,  2 X 262 X 31-1/2\"", "price": 69.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  207 WIRE,  22-1/4\" LONG", "hands": true, "name": "80LBS,  2 X 207 X 22-1/4\"", "price": 42.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  207 WIRE,  20\" LONG", "hands": true, "name": "90LBS,  2 X 207 X 20\"", "price": 39.95, "sub": "TORSION SPRINGS, 7FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  218 WIRE,  26\" LONG", "hands": true, "name": "100LBS,  2 X 218 X 26\"", "price": 50.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  225 WIRE,  27-1/4\" LONG", "hands": true, "name": "110LBS,  2 X 225 X 27-1/4\"", "price": 53.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  234 WIRE,  30-1/4\" LONG", "hands": true, "name": "120LBS,  2 X 234 X 30-1/4\"", "price": 60.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  234 WIRE,  28\" LONG", "hands": true, "name": "130LBS,  2 X 234 X 28\"", "price": 56.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  243 WIRE,  31-1/2\" LONG", "hands": true, "name": "140LBS,  2 X 243 X 31-1/2\"", "price": 65.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  250 WIRE,  33-1/4\" LONG", "hands": true, "name": "150LBS,  2 X 250 X 33-1/4\"", "price": 69.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  262 WIRE,  39-1/4\" LONG", "hands": true, "name": "160LBS,  2 X 262 X 39-1/4\"", "price": 85.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  207 WIRE,  24-3/4\" LONG", "hands": true, "name": "80LBS,  2 X 207 X 24-3/4\"", "price": 46.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  207 WIRE,  22-1/4\" LONG", "hands": true, "name": "90LBS,  2 X 207 X 22-1/4\"", "price": 42.95, "sub": "TORSION SPRINGS, 8FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  218 WIRE,  28-1/4\" LONG", "hands": true, "name": "100LBS,  2 X 218 X 28-1/4\"", "price": 54.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  225 WIRE,  29-3/4\" LONG", "hands": true, "name": "110LBS,  2 X 225 X 29-3/4\"", "price": 57.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  234 WIRE,  32-3/4\" LONG", "hands": true, "name": "120LBS,  2 X 234 X 32-3/4\"", "price": 64.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  234 WIRE,  30-1/4\" LONG", "hands": true, "name": "130LBS,  2 X 234 X 30-1/4\"", "price": 60.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  243 WIRE,  34\" LONG", "hands": true, "name": "140LBS,  2 X 243 X 34\"", "price": 70.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  250 WIRE,  36\" LONG", "hands": true, "name": "150LBS,  2 X 250 X 36\"", "price": 74.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  262 WIRE,  42-3/4\" LONG", "hands": true, "name": "160LBS,  2 X 262 X 42-3/4\"", "price": 92.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  207 WIRE,  27\" LONG", "hands": true, "name": "80LBS,  2 X 207 X 27\"", "price": 49.95, "sub": "TORSION SPRINGS, 9FT"},
      {"desc": "TORSION SPRINGS,  2\" ID,  207 WIRE,  24\" LONG", "hands": true, "name": "90LBS,  2 X 207 X 24\"", "price": 45.95, "sub": "TORSION SPRINGS, 9FT"},
    ],
  },
];

/**
 * Description ready for QuickBooks.
 *
 * Per-foot parts get the footage written on (`2" RAW TRACK,  10FT`).
 * Hand-ordered parts get the counts appended (`... [2] - RIGHTS AND [1] - LEFT`).
 */
export function partDescription(
  part: Part,
  feet?: number,
  right?: number,
  left?: number,
): string {
  if (part.hands) {
    const suffix = handSuffix(right ?? 0, left ?? 0);
    return suffix ? `${part.desc} ${suffix}` : part.desc;
  }
  if (!part.perFoot || !feet) return part.desc;
  const base = part.desc.replace(/,\s*$/, "");
  // The billed length, not the length asked for: a 12FT U retainer is sold as
  // a 16FT stick, and the QuickBooks line has to say what left the building.
  return `${base},  ${billedFeet(part, feet)}FT`;
}

/** Springs are priced each — the pair shows up as quantity 2, not a doubled rate. */
export function partQuantity(part: Part, right?: number, left?: number): number {
  if (!part.hands) return 1;
  return Math.max(0, Math.trunc(right ?? 0)) + Math.max(0, Math.trunc(left ?? 0));
}

/**
 * Retainers come off a stick, so past a point you are buying the long one.
 *
 * Brandon, 31/8/2026: a U retainer's longest stick is 16FT and an L retainer's
 * is 18FT. Anything over 8FT of U has to come off a 16FT stick, and anything
 * over 10FT of L off an 18FT one — the offcut is not sellable, so the customer
 * pays for the whole stick.
 *
 * Under the threshold it still bills by the foot. Brandon: nobody asks for less
 * than 7 or 8 feet in practice, so there is no minimum charge to worry about.
 *
 * Matches on " U RETAINER" / " L RETAINER" as the retainer TYPE. "UNIVERSAL
 * BOTTOM RETAINER" is not a U retainer and is deliberately not caught, nor are
 * the aluminium retainers, which are sold as fixed 10FT pieces rather than by
 * the foot.
 */
const RETAINER_STICKS: { type: RegExp; overFeet: number; billFeet: number }[] = [
  { type: /\bU\s+RETAINER/i, overFeet: 8, billFeet: 16 },
  { type: /\bL\s+RETAINER/i, overFeet: 10, billFeet: 18 },
];

/** Feet actually billed for a part, which is not always the feet asked for. */
export function billedFeet(part: Part, feet?: number): number {
  const ft = Math.max(0, Math.trunc(feet ?? 0));
  if (!part.perFoot) return ft;
  for (const stick of RETAINER_STICKS) {
    if (stick.type.test(part.desc) && ft > stick.overFeet) return stick.billFeet;
  }
  return ft;
}

/** Extended price: per-foot parts charge rate x billed footage, others each. */
export function partPrice(part: Part, feet?: number): number {
  if (!part.perFoot) return part.price;
  return Math.round(part.price * billedFeet(part, feet) * 100) / 100;
}
