#!/usr/bin/env python3
"""
Load a Clopay "3 layer" pricing workbook — one sheet per model group — into
the app.

    python scripts/apply_sheet_workbook.py BRIDGEPORT_3_LAYER.xlsx --family bridgeport

The Coachman workbook is laid out differently (read_coachman_sheet, below —
the solid grid by width, the window sections by design, the glass by window
count) but loads the same way:

    python scripts/apply_sheet_workbook.py COACHMAN.xlsx --family coachman

A workbook of this shape (Brandon's coworker, 9/10/2026) carries, per sheet:

  A1          the group: "BD1NU/BD1EU", or a single model "BD1CU"
  C1, E1      each member's narrowest width: "BD1NU - 7'8\" MIN"
  A2          "MULTIPLER .898" — DDS cost is Clopay list x this x 0.99 / (1 - 0.0265)
              (plus the flat $15 every Coachman carries — Brandon, 12/10/2026)
  A3..A7      notes: the two ULTRA GRAIN lines (single / double, up to 8ft and
              8'2" and up), "10'2 AND UP DOUBLE DOOR", "ONLY AVAILABLE UP TO
              8FT" on the C models, and "NOT AVAILABLE IN THE FOLLOWING WIDTHS"
  heading row D = 7FT, F = 8FT, and H = 9FT AND 10FT where the model goes that
              high; LIST in C/E/G and COST in D/F/H, one row per width band
  below it    "WINDOWS NOT AVAILABLE" — SHORT and LONG rows naming the widths
              a door is built solid only
  glass       fifteen blocks laid out four across, a type name on the block's
              first row, then SHORT bands (label | windows | plain list | plain
              cost | with inserts list | cost) and LONG bands under a "LONG"
              row. The per-window rate is on the header row ("55 PER").

What gets written:

  * the door grid of every group into src/lib/pricing/data/special-doors.ts as
    SELL — cost / (1 - margin), the group's door margin read from
    special-orders.ts — because that grid holds sell figures for every model;
  * the glass bands and Ultra-Grain adders into src/lib/pricing/data/
    <family>-glass.ts as COST, lifted by the margin at quote time, the way the
    Gallery's tables are.

Checks before anything is written: every cost cell against its formula, every
glass line against its per-window rate, and the bands against each other.
Anything that disagrees stops the script, so a typo never reaches the app
silently — unless it is listed in KNOWN_TYPOS or GRID_TYPOS (a glass or door
figure the sheet has wrong, with the right one — today, CJ's own corrections
carried to the sheets he missed) or HOLD (a cell left off the grid until the
sheet is fixed; the counter types the Clopay total there). All three are
dated, and the script says when a sheet no longer needs them.

The width notes (minimums, widths not built, solid-only widths) are NOT
written here: they are small, hand-kept tables in special-door-pricing.ts,
where they can be read and corrected without a regeneration. The script
prints what the sheet says so the two can be compared.
"""
import argparse
import json
import re
import sys
from pathlib import Path

from openpyxl import load_workbook
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parent.parent
SPECIAL_DOORS = ROOT / "src/lib/pricing/data/special-doors.ts"
SPECIAL_ORDERS = ROOT / "src/lib/pricing/data/special-orders.ts"

K = 0.99 / (1 - 0.0265)  # the freight and surcharge factor on every cost formula
# The flat figure DDS adds to a door on top of list x multiplier x k, per
# family ("flat" below) — Brandon, 12/10/2026: $15 on the Coachman only. CJ's
# Coachman sheet carries it in its formulas, and a column that leaves it off
# is loaded with it; the Gallery and Bridgeport sheets carry none and get
# none. A sheet that carries some other flat figure stops the script.
DOOR_FLAT = 0.0   # set per family by main()

FAMILIES = {
    "bridgeport": {
        "collection": "Bridgeport Collection",
        "const": "BRIDGEPORT",
        "out": ROOT / "src/lib/pricing/data/bridgeport-glass.ts",
        "title": "Bridgeport Steel",
        "layout": "3layer",
        "flat": 0.0,
    },
    "gallery": {
        "collection": "Gallery Collection",
        "const": "GALLERY",
        "out": ROOT / "src/lib/pricing/data/gallery-glass.ts",
        "title": "Gallery Steel",
        "layout": "3layer",
        "flat": 0.0,
    },
    # The Coachman workbook (CJ, 13/10/2026) is laid out differently — see
    # read_coachman_sheet — but lands in the same two places.
    "coachman": {
        "collection": "Coachman Collection",
        "const": "COACHMAN",
        "out": ROOT / "src/lib/pricing/data/coachman-glass.ts",
        "title": "Coachman",
        "layout": "coachman",
        "flat": 15.0,
    },
}

# Sheet block names -> app ids and labels, in the order the counter reads them.
# The ids match GALLERY_GLASS_TYPES in gallery-glass.ts, which so-glass.ts
# lists for every sheet-priced group.
GLASS_IDS = [
    ("DOUBLE STRENGTH", "dsb", "Double strength"),
    # The block CJ's sheets labelled ACRYLIC carries the books' WROUGHT IRON
    # rates (141 / 282 a window, no inserts); the corrected sheets say so.
    ("WROUGHT IRON", "wrought_iron", "Wrought iron"),
    ("ACRYLIC", "acrylic", "Acrylic"),
    ("OBSCURE", "obscure", "Obscure"),
    ('1/8" TEMPERED', "tempered", "Tempered DSB"),
    ("INSULATED", "insulated", "Insulated"),
    ("INSULATED OBSCURE", "insulated_obscure", "Insulated obscure"),
    ('1/8" FROSTED DSB', "frosted", "Frosted DSB"),
    ("INSULATED FROSTED", "insulated_frosted", "Insulated frosted"),
    ('1/8" RAIN DSB', "rain", "Rain DSB"),
    ("INSULATED RAIN", "insulated_rain", "Insulated rain"),
    ('1/8" SEEDED DSB', "seeded", "Seeded DSB"),
    ("INSULATED SEEDED", "insulated_seeded", "Insulated seeded"),
    ('1/8" DSB MIDNIGHT GRAY', "midnight_gray", "Midnight gray DSB"),
    ('3/4" INSULATED MIDNIGHT GRAY', "insulated_midnight_gray", "Insulated midnight gray"),
    ('1/8" TEMPERED MIDNIGHT GRAY', "tempered_midnight_gray", "Tempered midnight gray"),
    ('3/4" INSULATED TEMPERED MIDNIGHT GRAY', "insulated_tempered_midnight_gray", "Insulated tempered midnight gray"),
]
GLASS_BY_NAME = {name: gid for name, gid, _ in GLASS_IDS}

# Figures the sheet has wrong, and what they should be — (glass block, panel,
# window count) -> plain list. Each one is checked against the per-window rate
# the sheet itself states on the block header, which is what makes it a typo
# rather than a price. Delete an entry once the sheet is corrected; the script
# says when that is.
KNOWN_TYPOS = {
    # CJ corrected the OBSCURE 6-window short line from 260 (the 4-window
    # figure copied down) to 390 = 6 x 65 on every sheet (12/10/2026) but not
    # the 1/8" TEMPERED block on the Bridgeport sheets, which copies OBSCURE
    # line for line. His own correction, carried over.
    ('1/8" TEMPERED', "short", 6): 390,
}

# Door-grid cells the sheet has wrong, and the list they should carry:
# (group, tier, lo", hi") -> list. The cost is recomputed from the corrected
# list with the sheet's own formula. Delete an entry once the sheet is
# corrected; the script says when that is.
GRID_TYPOS = {
    # CJ corrected the 7FT list at 9'2"-9'10" from 882 (the row above copied
    # down) to 991 on the GD2SU/GD2LU and BD2NU/BD2EU sheets (12/10/2026),
    # whose list columns match this sheet's cell for cell, and missed this one.
    # His own correction, carried over.
    ("GD2LP/GD2SP", "7", 110, 118): 991,
}

# Cells left OFF the grid until the sheet is confirmed: (group, tier, lo", hi").
# A width in a held band quotes through the typed Clopay total instead.
# Empty since the second workbook of 12/10/2026: the BD1 12'0" row's 7FT list
# (846) was corrected to 816, as the GD1 row has it.
HOLD = []

# The Coachman's window designs, as the app names them (inserts.ts:
# COACHMAN_GLASS_DESIGNS, then COACHMAN_ARCH). A design on the sheet that is
# not here stops the script — the app would have no name for it.
COACHMAN_WINDOW_DESIGNS = ["ARCH1", "ARCH3", "ARCH4", "ARCH13", "ARCH14", "REC11", "REC13", "REC14", "SQ23", "SQ24",
                           "ARC13A", "ARC14A", "ARC1A", "ARC3A", "ARC4A"]

# Door-grid columns whose cost cells add something other than the family's
# flat, and what they add: (group, block, tier) -> the figures. The column is
# loaded with the family's flat like every other, and the script says when
# the sheet no longer adds them. Dated, like the typo lists.
FLAT_ASIDE = {
    # CJ's Coachman workbook of 13/10/2026 adds 5 (single door) and 10 (double)
    # on the solid 7FT column — the galvanized torsion adder, which the app
    # charges at quote time; the +15 every Coachman carries is Brandon's.
    ("CD", "solid", "7"): {5.0, 10.0},
}


def inches(label: str) -> int:
    m = re.match(r"\s*(\d+)'\s*(\d+)?", str(label))
    if not m:
        raise ValueError(f"not a width: {label!r}")
    return int(m.group(1)) * 12 + int(m.group(2) or 0)


def band_range(label: str) -> tuple[int, int]:
    """'8\\'2" to 8\\'10"' -> (98, 106); '8\\'0"' -> (96, 96); 'UP TO 7\\'6"' -> (0, 90)."""
    s = str(label).strip().upper()
    if s.startswith("UP TO"):
        return 0, inches(s[5:])
    parts = [p for p in re.split(r"\bTO\b", s) if p.strip()]
    lo = inches(parts[0])
    hi = inches(parts[1]) if len(parts) > 1 else lo
    return lo, hi


def width_label(total_inches: int) -> str:
    ft, inch = divmod(total_inches, 12)
    return f"{ft}'{inch}\""


def width_key(total_inches: int) -> str:
    ft, inch = divmod(total_inches, 12)
    return f"{ft}" if inch == 0 else f"{ft}.{inch}"


def width_keys(lo_in: int, hi_in: int) -> list[str]:
    return [width_key(w) for w in range(lo_in, hi_in + 1, 2)]


def money(x: float) -> float:
    return round(x + 1e-9, 2)


def margins_for(collection: str) -> dict[str, float]:
    """Door margins of a collection's model groups, read out of special-orders.ts."""
    src = SPECIAL_ORDERS.read_text()
    m = re.search(r'"' + re.escape(collection) + r'":\s*\{.*?"models":\s*\{(.*?)\n    \}', src, re.S)
    if not m:
        sys.exit(f"could not find the {collection} models in {SPECIAL_ORDERS.name}")
    out = {}
    for g, door in re.findall(r'"([^"]+)":\s*\{\s*"door":\s*([\d.]+)', m.group(1)):
        out[g] = float(door)
    return out


class Problems(list):
    def add(self, msg):
        self.append(msg)


def read_sheet(ws, wsf, margins):
    """One sheet -> dict describing its group: grid (cost), glass (cost), notes."""
    problems = Problems()
    title = str(ws["A1"].value or "").strip()
    members = [m.strip() for m in title.split("/") if m.strip()]
    if not members:
        sys.exit(f"{ws.title}: A1 should name the group, got {title!r}")
    group = next((g for g in margins if set(g.split("/")) == set(members)), None)
    if group is None:
        sys.exit(f"{ws.title}: no margin group for {members} in {SPECIAL_ORDERS.name}")

    mult_text = str(ws["A2"].value or "")
    mm = re.search(r"([\d.]+)", mult_text)
    if not mm or "MULTIPL" not in mult_text.upper():
        sys.exit(f"{ws.title}: A2 should be the multiplier, got {mult_text!r}")
    mult = float(mm.group(1))

    # Member minimums from row 1: "BD1NU - 7'8\" MIN", "BD1CU 7'8\" MIN".
    min_width = {}
    for c in range(2, 9):
        v = ws.cell(1, c).value
        if isinstance(v, str) and "MIN" in v.upper():
            m = re.match(r"\s*([A-Z0-9]+)\s*-?\s*(\d+'\d+)", v)
            if m:
                min_width[m.group(1)] = width_key(inches(m.group(2)))

    # The notes above the grid.
    ug = {}
    only_to_8 = False
    unavailable = []
    hdr = None
    for r in range(2, 15):
        a = ws.cell(r, 1).value
        if ws.cell(r, 4).value == "7FT":
            hdr = r
            break
        if not isinstance(a, str):
            continue
        up = a.upper()
        if "ULTRA GRAIN" in up:
            text = str(ws.cell(r, 2).value or "")
            nums = [float(x.replace(",", "")) for x in re.findall(r"\$\s*([\d,]+\.\d+)", text)]
            if len(nums) != 2:
                sys.exit(f"{ws.title}: could not read the Ultra-Grain line in B{r}: {text!r}")
            ug["low" if "UP TO" in text.upper() else "high"] = {"single": nums[0], "double": nums[1]}
        elif "ONLY AVAILABLE UP TO 8FT" in up:
            only_to_8 = True
        elif "NOT AVAILABLE IN THE FOLLOWING WIDTHS" in up:
            unavailable = [width_key(inches(w)) for w in re.findall(r"\d+'\d+", a)]
    if hdr is None:
        sys.exit(f"{ws.title}: no 7FT heading row")
    if "low" not in ug or ("high" not in ug and not only_to_8):
        sys.exit(f"{ws.title}: expected one 'UP TO 8FT HIGH' and one '8FT AND UP' Ultra-Grain line, got {ug}")
    if "high" not in ug:
        # Built to 8'0" only, so the sheet gives one band; the taller band is
        # never reached and carries the same figure.
        ug["high"] = ug["low"]
    heads = (ws.cell(hdr, 4).value, ws.cell(hdr, 6).value, ws.cell(hdr, 8).value)
    if heads[:2] != ("7FT", "8FT"):
        sys.exit(f"{ws.title}: heading row {hdr} reads {heads}")
    tall = heads[2] == "9FT AND 10FT"
    if only_to_8 and tall:
        sys.exit(f"{ws.title}: says only to 8FT but has a 9FT AND 10FT column")
    tiers = {"7": 4, "8": 6} | ({"9": 8, "10": 8} if tall else {})

    # The grid: list in C/E/G, cost in D/F/H, until the width labels stop.
    bands = []
    flats = {}   # tier -> the flat figures its cost cells add
    r = hdr + 1
    while True:
        label = ws.cell(r, 1).value
        if not (isinstance(label, str) and re.match(r"\s*\d+'", label)):
            break
        lo, hi = band_range(label)
        prices = {}
        for tier, cc in tiers.items():
            lst, cost = ws.cell(r, cc - 1).value, ws.cell(r, cc).value
            if isinstance(lst, str) and lst.strip().lower() == "n/a":
                continue
            if lst is None and cost is None:
                continue
            f = wsf.cell(r, cc).value
            col = get_column_letter(cc)
            # The cost formula: list x multiplier x 0.99 / (1 - 0.0265), plus
            # any flat figure the family carries (DOOR_FLAT). A typed figure is
            # accepted when it matches (the Gallery sheet from the 8th is all
            # typed).
            exp = f"={get_column_letter(cc - 1)}{r}*{mult}*0.99/(1-0.0265)"
            if isinstance(f, str) and f.replace(" ", "").startswith(exp):
                flat = flat_from_formula(f)
                if flat is None or (f.replace(" ", "") != exp and not re.fullmatch(re.escape(exp) + r"\+[\d.]+", f.replace(" ", ""))):
                    problems.add(f"{ws.title} {col}{r}: the cost formula is not list x {mult} x k (+ flat): {f!r}")
                    flat = 0.0
            elif isinstance(cost, (int, float)) and not (isinstance(f, str) and f.startswith("=")):
                flat = None   # typed: the flat is whatever the figure carries
            else:
                problems.add(f"{ws.title} {col}{r}: cost is not a number or the formula ({f!r})")
                flat = 0.0
            if not isinstance(lst, (int, float)) or not isinstance(cost, (int, float)):
                problems.add(f"{ws.title} {col}{r} ({label}): list {lst!r} / cost {cost!r}")
                continue
            if flat is None:
                flat = round(cost - lst * mult * K, 2)
                if abs(flat) < 0.06:
                    flat = 0.0
            if abs(lst * mult * K + flat - cost) > 0.06:
                problems.add(f"{ws.title} {col}{r} ({label}): cost {cost} is not list {lst} x {mult} x k + {flat:g} = {lst * mult * K + flat:.2f}")
            flats.setdefault(tier, set()).add(flat)
            fix = GRID_TYPOS.get((group, tier, lo, hi))
            if fix is not None:
                if lst == fix:
                    problems.add(f"{ws.title} {get_column_letter(cc - 1)}{r} ({label}): the GRID_TYPOS entry is no longer needed — the sheet reads {fix} now")
                else:
                    print(f"  fixing {ws.title} {get_column_letter(cc - 1)}{r} ({label}, {tier}FT): list {lst} -> {fix}")
                    lst = fix
            # What the app carries: the sheet's list at its multiplier, plus the
            # family's flat, whether the sheet's own formula adds it or not.
            prices[tier] = float(lst * mult * K + DOOR_FLAT)
        bands.append((lo, hi, label.strip(), prices))
        r += 1
    if not bands:
        sys.exit(f"{ws.title}: no width rows under the heading")
    all_flats = sorted({x for v in flats.values() for x in v})
    if any(x not in (0.0, DOOR_FLAT) for x in all_flats):
        problems.add(f"{ws.title}: the door cost cells add {all_flats} — this family carries {DOOR_FLAT:g}, or the sheet leaves it off and the script adds it")
    if DOOR_FLAT and 0.0 in all_flats:
        print(f"  note: {ws.title}: the sheet's cost cells carry no flat figure; every door loaded with the +{DOOR_FLAT:g} the family gets")
    flat = DOOR_FLAT

    # Solid-only widths: the SHORT / LONG note rows after the grid.
    no_windows = {}
    for rr in range(r, r + 12):
        a = ws.cell(rr, 1).value
        if isinstance(a, str) and a.strip().upper() in ("SHORT", "LONG"):
            no_windows[a.strip().lower()] = [width_key(inches(w)) for w in re.findall(r"\d+'\d*", str(ws.cell(rr, 2).value or ""))]

    # Gaps and overlaps in the band coverage, between the first and last band.
    covered = {}
    for lo, hi, label, _ in bands:
        for w in range(lo, hi + 1, 2):
            if w in covered:
                problems.add(f"{ws.title}: {label} overlaps {covered[w]} at {width_key(w)}")
            covered[w] = label
    first, last = bands[0][0], bands[-1][1]
    gaps = [width_key(w) for w in range(first, last + 1, 2) if w not in covered]

    # Glass blocks, four across; the first block column is where row 1 carries
    # a type name (J on a pair sheet, H where the grid has no 9-10FT column).
    c0 = next((c for c in range(8, 14) if ws.cell(1, c).value in GLASS_BY_NAME), None)
    if c0 is None:
        sys.exit(f"{ws.title}: no glass block on row 1")
    glass_mult = None
    glass = {}
    for top in range(1, ws.max_row + 1):
        for c in (c0, c0 + 7, c0 + 14, c0 + 21):
            name = ws.cell(top, c).value
            if name not in GLASS_BY_NAME:
                continue
            gid = GLASS_BY_NAME[name]
            if gid in glass:
                problems.add(f"{ws.title}: {name} appears twice")
            table = {"short": [], "long": []}
            rate = lambda v: float(re.search(r"[\d.]+", str(v)).group()) if isinstance(v, str) and re.search(r"[\d.]+", v) else None
            # The SHORT header is the row under the name; the LONG header is the
            # row that says so — or, where its label was left blank, the row
            # that carries per-window rates again.
            per, per_i = rate(ws.cell(top + 1, c + 2).value), rate(ws.cell(top + 1, c + 4).value)
            panel = "short"
            rr = top + 2
            while rr <= ws.max_row:
                lab = ws.cell(rr, c).value
                v2 = ws.cell(rr, c + 2).value
                if (isinstance(lab, str) and lab.strip().upper() == "LONG") or (isinstance(v2, str) and "PER" in v2.upper()):
                    panel = "long"
                    per, per_i = rate(v2), rate(ws.cell(rr, c + 4).value)
                    rr += 1
                    continue
                n = ws.cell(rr, c + 1).value
                pl, pc, il, ic = (ws.cell(rr, c + i).value for i in (2, 3, 4, 5))
                if not (isinstance(lab, str) and re.match(r"\s*(UP TO|\d+')", lab.strip().upper())):
                    # A band row whose label (and count) were left blank — the
                    # GD2SP sheet's first long INSULATED row. The figures are
                    # there, so the band is the DOUBLE STRENGTH block's at the
                    # same place; a blank row with no figures ends the block.
                    ref = glass.get("dsb", {}).get(panel) or []
                    at = len(table[panel])
                    if isinstance(pl, (int, float)) and at < len(ref):
                        lab = f"{width_label(ref[at]['lo'])} TO {width_label(ref[at]['hi'])}" if ref[at]["lo"] else f"UP TO {width_label(ref[at]['hi'])}"
                        print(f"  note: {ws.title} {name} {panel} row {rr} has no band label; taken as {lab} from the DOUBLE STRENGTH block")
                    else:
                        break
                if pl is None and pc is None:
                    break
                if n is None and per and isinstance(pl, (int, float)) and abs(pl / per - round(pl / per)) < 1e-6:
                    n = int(round(pl / per))  # the window count cell is blank; the list says
                n = int(n)
                lo, hi = band_range(lab)
                where = f"{ws.title} {name} {panel} {lab.strip()}"
                # A cost cell holding text (a stray "\\" on the GD1SP sheet,
                # 12/10/2026) is treated as blank: the list and the block's
                # multiplier give the figure, and the cell is reported.
                for label_, val in (("plain cost", pc), ("inserts cost", ic)):
                    if val is not None and not isinstance(val, (int, float)):
                        print(f"  note: {where}: {label_} cell holds {val!r}, computed from the list instead")
                if not isinstance(pc, (int, float)): pc = None
                if not isinstance(ic, (int, float)): ic = None
                if not isinstance(pl, (int, float)):
                    problems.add(f"{where}: plain list {pl!r} is not a number"); rr += 1; continue
                if il is not None and not isinstance(il, (int, float)):
                    problems.add(f"{where}: inserts list {il!r} is not a number"); il = None
                # the glass multiplier, from the formula on the cost cell
                gm = mult_from_formula(wsf.cell(rr, c + 3).value) or mult_from_formula(wsf.cell(rr, c + 5).value)
                if gm is not None:
                    if glass_mult is None:
                        glass_mult = gm
                    elif abs(gm - glass_mult) > 1e-9:
                        problems.add(f"{where}: glass multiplier changes to {gm} at {get_column_letter(c + 3)}{rr}")
                fix = KNOWN_TYPOS.get((name, panel, n))
                if fix is not None:
                    if pl == fix:
                        problems.add(f"{where}: the KNOWN_TYPOS entry is no longer needed — the sheet reads {fix} now")
                    else:
                        print(f"  fixing {where}: sheet {pl} -> {fix} ({n} x {per:g})")
                        pl = fix
                        pc = None
                if per is not None and abs(n * per - pl) > 0.01:
                    problems.add(f"{where} ({get_column_letter(c + 2)}{rr}): plain list {pl} is not {n} x {per:g} = {n * per:g}")
                if pc is not None and gm is not None and abs(pl * gm * K - pc) > 0.06:
                    problems.add(f"{where}: plain cost {pc} is not list x {gm} x k")
                if il is not None:
                    if per_i is not None and abs(n * per_i - il) > 0.01:
                        problems.add(f"{where} ({get_column_letter(c + 4)}{rr}): inserts list {il} is not {n} x {per_i:g}")
                    if ic is not None and gm is not None and abs(il * gm * K - ic) > 0.06:
                        problems.add(f"{where}: inserts cost {ic} is not list x {gm} x k")
                g_cost = money(pl * gm * K) if gm is not None else (money(pc) if pc is not None else None)
                i_cost = None if il is None else (money(il * gm * K) if gm is not None else money(ic))
                if g_cost is None:
                    problems.add(f"{where}: no cost and no formula to compute one")
                    g_cost = 0.0
                table[panel].append({"lo": lo, "hi": hi, "windows": n, "glass": g_cost, "inserts": i_cost})
                rr += 1
            glass[gid] = table
    missing = [gid for _, gid, _ in GLASS_IDS if gid not in glass]
    if missing:
        print(f"  note: {ws.title} has no block for {missing}; those types are not offered on it")
    for gid, table in glass.items():
        for panel in ("short", "long"):
            if not table[panel]:
                problems.add(f"{ws.title}: {gid} has no {panel} bands")

    return {
        "sheet": ws.title, "group": group, "members": members, "mult": mult, "glass_mult": glass_mult, "flat": flat,
        "min_width": min_width, "ug": ug, "only_to_8": only_to_8, "unavailable": unavailable,
        "tiers": list(tiers), "bands": bands, "gaps": gaps, "no_windows": no_windows, "glass": glass,
        "problems": problems,
    }


def mult_from_formula(f):
    if not isinstance(f, str):
        return None
    m = re.search(r"\*\s*([\d.]+)\s*\*\s*0\.99", f)
    return float(m.group(1)) if m else None


def flat_from_formula(f):
    """The flat figure a cost formula adds after the multiplier: '...+15' -> 15, else 0."""
    if not isinstance(f, str):
        return None
    m = re.search(r"\)\s*\+\s*([\d.]+)\s*$", f.replace(" ", ""))
    return float(m.group(1)) if m else 0.0


def read_coachman_sheet(ws, wsf, margins):
    """
    The Coachman workbook (CJ, 13/10/2026): one sheet, one group, and a
    different shape from the 3-layer workbooks:

      A1              the group: "CD"
      A2              "MULTIPLER 1.193"
      E2..E4          the window count by door width: "UP TO 12FT - 2 WINDOWS",
                      "12FT TO 15FT - 3 WINDOWS", "15FT AND UP - 4 WINDOWS"
      A4              "ALL TORSION SPRING PRICES": torsion is in every figure
      A6              SOLID TOP SECTION: the door grid, one row per width Clopay
                      builds (not a band: the Coachman comes in 26 widths),
                      7FT, 8FT, 9FT and 10FT each with LIST then COST
      K6              DOUBLE STRENGTH TOP SECTION: four tables, one per height
                      ("7FT HIGH" in column K, then 8FT, 9FT and 10FT), each a
                      row per window design — ARCH1 to SQ24, then the arched
                      sections ARC13A to ARC4A — and a column per width group,
                      the widths named on the heading row and the row under it
                      (6'2" to 8'0", 8'2" to 9'0", 9'2" to 10'0", 12'0", 12'2"
                      to 13'8", 14'2" to 16'0", 16'2", 17'0", 18'0"), LIST then
                      COST. The LIST is the section's adder over the solid
                      door; the COST is its formula, list x multiplier x k plus
                      the solid door's own cost cell for a width in the group
                      at that height. "N/A" where the design is not built.
      below the grid  ADD ON TO DOUBLE STRENGTH DOOR PRICE: the special glass
                      (rain, frosted, seeded, obscure), a block each with a row
                      per window count, LIST then COST (list x multiplier x k)

    Every cost cell is checked against its formula, and the four design tables
    against each other: the section adder does not change with height, so one
    band table serves every height. What lands in the app: the solid grid as
    SELL in special-doors.ts; the section adders by design and width band, and
    the glass by window count, as COST in coachman-glass.ts. A window door is
    priced solid + section + glass at quote time (coachman-windows.ts).

    (The workbook of 12/10/2026 priced one double strength top section for
    every design, as a second grid beside the solid one; this one prices each
    design on its own, as iStore does.)
    """
    problems = Problems()
    title = str(ws["A1"].value or "").strip()
    group = next((g for g in margins if g == title), None)
    if group is None:
        sys.exit(f"{ws.title}: no margin group for {title!r} in {SPECIAL_ORDERS.name}")
    mult_text = str(ws["A2"].value or "")
    mm = re.search(r"([\d.]+)", mult_text)
    if not mm or "MULTIPL" not in mult_text.upper():
        sys.exit(f"{ws.title}: A2 should be the multiplier, got {mult_text!r}")
    mult = float(mm.group(1))

    # The notes: window counts, torsion.
    count_rules = []   # (lo_in, hi_in, windows)
    torsion_in = False
    hdr = None
    for r in range(2, 12):
        for c in range(1, 14):
            v = ws.cell(r, c).value
            if not isinstance(v, str):
                continue
            up = v.strip().upper()
            m = re.match(r"UP TO (\d+)FT\s*-\s*(\d+) WINDOWS", up)
            if m:
                count_rules.append((0, int(m.group(1)) * 12 - 1, int(m.group(2))))
            m = re.match(r"(\d+)FT TO (\d+)FT\s*-\s*(\d+) WINDOWS", up)
            if m:
                count_rules.append((int(m.group(1)) * 12, int(m.group(2)) * 12 - 1, int(m.group(3))))
            m = re.match(r"(\d+)FT AND UP\s*-\s*(\d+) WINDOWS", up)
            if m:
                count_rules.append((int(m.group(1)) * 12, 10 ** 6, int(m.group(2))))
            if "ALL TORSION SPRING" in up:
                torsion_in = True
        if ws.cell(r, 3).value == "7FT":
            hdr = r
            break
    if hdr is None:
        sys.exit(f"{ws.title}: no 7FT heading row")
    if len(count_rules) != 3:
        sys.exit(f"{ws.title}: expected three window-count lines, read {count_rules}")
    if not torsion_in:
        problems.add(f"{ws.title}: no 'ALL TORSION SPRING PRICES' line — the app prices the Coachman with torsion included")
    heads = tuple(ws.cell(hdr, c).value for c in (3, 5, 7, 9))
    if heads != ("7FT", "8FT", "9FT", "10FT"):
        sys.exit(f"{ws.title}: heading row {hdr} reads {heads}")
    solid_cols = {"7": 3, "8": 5, "9": 7, "10": 9}   # the tier's COST column in the solid grid

    def windows_at(w):
        for lo, hi, n in count_rules:
            if lo <= w <= hi:
                return n
        problems.add(f"{ws.title}: no window-count rule covers {width_label(w)}")
        return None

    flats = {}

    def read_cell(r, lc, cc, tier, w):
        """A (list, cost) pair of the solid grid -> cost, checked against its formula; None for N/A or blank."""
        lst, cost = ws.cell(r, lc).value, ws.cell(r, cc).value
        if isinstance(lst, str) and lst.strip().lower() == "n/a":
            return None
        if lst is None and cost is None:
            return None
        col = get_column_letter(cc)
        f = wsf.cell(r, cc).value
        fm, flat = mult_from_formula(f), flat_from_formula(f)
        if not isinstance(lst, (int, float)) or not isinstance(cost, (int, float)):
            problems.add(f"{ws.title} {col}{r}: list {lst!r} / cost {cost!r}")
            return None
        if fm is None:
            problems.add(f"{ws.title} {col}{r}: cost is typed, not the formula ({f!r})")
            return {"list": float(lst), "cost": float(cost), "flat": 0.0}
        if abs(fm - mult) > 1e-9:
            problems.add(f"{ws.title} {col}{r}: multiplier {fm} differs from A2's {mult}")
        if abs(lst * mult * K + flat - cost) > 0.06:
            problems.add(f"{ws.title} {col}{r}: cost {cost} is not list {lst} x {mult} x k + {flat:g}")
        flats.setdefault(tier, set()).add(flat)
        fix = next((v for (g, t, lo, hi), v in GRID_TYPOS.items() if g == group and t == tier and lo <= w <= hi), None)
        if fix is not None:
            if lst == fix:
                problems.add(f"{ws.title} {get_column_letter(lc)}{r}: the GRID_TYPOS entry is no longer needed — the sheet reads {fix} now")
            else:
                print(f"  fixing {ws.title} {get_column_letter(lc)}{r} ({width_label(w)}, {tier}FT): list {lst} -> {fix}")
                lst, cost = fix, fix * mult * K + flat
        return {"list": float(lst), "cost": float(cost), "flat": flat}

    # The solid grid: one row per width.
    rows = []   # (inches, label, {tier: cell})
    row_of = {}   # inches -> sheet row
    r = hdr + 1
    while True:
        label = ws.cell(r, 1).value
        if not (isinstance(label, str) and re.match(r"\s*\d+'", label)):
            break
        w = inches(label)
        rows.append((w, label.strip(), {t: read_cell(r, c - 1, c, t, w) for t, c in solid_cols.items()}))
        row_of[w] = r
        r += 1
    grid_end = r
    if not rows:
        sys.exit(f"{ws.title}: no width rows under the heading")
    widths = [w for w, *_ in rows]
    if widths != sorted(widths):
        problems.add(f"{ws.title}: the widths are not in order")

    # Every Coachman carries DOOR_FLAT. A column whose formula leaves it off
    # (the 10FT column) is loaded with it; a column that adds something else is
    # listed in FLAT_ASIDE with what it adds, or stops the script.
    flat = DOOR_FLAT
    for tier, seen in sorted(flats.items()):
        aside = FLAT_ASIDE.get((group, "solid", tier), set())
        odd = {x for x in seen if x not in (0.0, DOOR_FLAT)}
        if odd - aside:
            problems.add(f"{ws.title}: the solid {tier}FT column adds {sorted(odd)} — every Coachman carries {DOOR_FLAT:g}")
        elif odd:
            print(f"  note: {ws.title}: the solid {tier}FT column adds {sorted(odd)} (FLAT_ASIDE); loaded with the +{DOOR_FLAT:g} every Coachman gets")
        if aside and not (aside & seen):
            problems.add(f"{ws.title}: the FLAT_ASIDE entry for the solid {tier}FT column is no longer needed — it adds {sorted(seen)} now")
        if DOOR_FLAT and 0.0 in seen:
            print(f"  note: {ws.title}: the solid {tier}FT column carries no flat figure; loaded with the +{DOOR_FLAT:g} every Coachman gets")
    for w, label, cells in rows:
        for t, cell in cells.items():
            if cell and cell["flat"] != flat:
                cell["cost"] = cell["list"] * mult * K + flat
    bands = []
    for w, label, cells in rows:
        prices = {t: c["cost"] for t, c in cells.items() if c}
        if len(prices) != 4:
            problems.add(f"{ws.title} {label}: the solid door is not priced at every height ({sorted(prices)})")
        bands.append((w, w, label, prices))

    # The design tables: one per height, headed "<N>FT HIGH" in column K.
    def widths_in(text):
        s = str(text or "").upper().replace("FT", "'0\"")
        return [inches(x) for x in re.findall(r"\d+'\s*\d*", s)]

    tables = {}        # tier -> {design: {column index: list adder | None}}
    orders = {}        # tier -> designs in sheet order
    col_widths = None  # column index -> set of widths, from the first table
    formula_re = re.compile(r"^=([A-Z]+)(\d+)\*([\d.]+)\*0\.99/\(1-0\.0265\)\+([A-Z]+)(\d+)$")
    for t in range(hdr, ws.max_row + 1):
        head = ws.cell(t, 11).value
        m = re.match(r"\s*(\d+)FT HIGH\s*$", str(head or ""), re.I)
        if not m:
            continue
        tier = m.group(1)
        if tier not in solid_cols:
            problems.add(f"{ws.title} K{t}: a design table for {tier}FT, which the solid grid has no column for")
            continue
        groups = {}
        for lc in range(12, 30, 2):
            named = widths_in(ws.cell(t, lc + 1).value) + widths_in(ws.cell(t + 1, lc + 1).value)
            if named:
                groups[lc] = set(named)
        if not groups:
            problems.add(f"{ws.title} K{t}: the {tier}FT HIGH table names no widths on its heading row")
            continue
        for lc, ws_ in groups.items():
            for w in ws_:
                if w not in row_of:
                    problems.add(f"{ws.title} {get_column_letter(lc + 1)}{t}: {width_label(w)} is not a width on the solid grid")
        seen = [w for ws_ in groups.values() for w in ws_]
        if len(seen) != len(set(seen)):
            problems.add(f"{ws.title} K{t}: a width is named in two columns of the {tier}FT HIGH table")
        if col_widths is None:
            col_widths = groups
        elif groups != col_widths:
            problems.add(f"{ws.title} K{t}: the {tier}FT HIGH table's width groups differ from the 7FT table's")
        table, order = {}, []
        r2 = t + 2
        while r2 <= ws.max_row:
            name = ws.cell(r2, 11).value
            if not isinstance(name, str) or not name.strip() or re.match(r"\s*\d+FT HIGH", name, re.I):
                break
            name = name.strip().upper()
            if name in table:
                problems.add(f"{ws.title} K{r2}: {name} appears twice in the {tier}FT HIGH table")
            adders = {}
            for lc in groups:
                lst, cost = ws.cell(r2, lc).value, ws.cell(r2, lc + 1).value
                na = lambda v: isinstance(v, str) and v.strip().upper() == "N/A"
                if na(lst) or na(cost) or (lst is None and cost is None):
                    if (na(lst) or lst is None) != (na(cost) or cost is None):
                        problems.add(f"{ws.title} {get_column_letter(lc)}{r2}: {name} has a list or a cost but not both")
                    adders[lc] = None
                    continue
                where = f"{ws.title} {get_column_letter(lc + 1)}{r2} ({name}, {tier}FT)"
                if not isinstance(lst, (int, float)) or not isinstance(cost, (int, float)):
                    problems.add(f"{where}: list {lst!r} / cost {cost!r}")
                    adders[lc] = None
                    continue
                f = str(wsf.cell(r2, lc + 1).value or "").replace(" ", "")
                fm = formula_re.match(f)
                if not fm:
                    problems.add(f"{where}: the cost is not list x {mult} x k + a solid door cell ({f!r})")
                    adders[lc] = float(lst)
                    continue
                lcol, lrow, fmult, scol, srow = fm.groups()
                if (lcol, int(lrow)) != (get_column_letter(lc), r2):
                    problems.add(f"{where}: the formula reads its list from {lcol}{lrow}, not {get_column_letter(lc)}{r2}")
                if abs(float(fmult) - mult) > 1e-9:
                    problems.add(f"{where}: multiplier {fmult} differs from A2's {mult}")
                # The solid door cell: this height's cost column, at a width of this column's group.
                if scol != get_column_letter(solid_cols[tier]):
                    problems.add(f"{where}: adds the solid door at {scol}{srow}, which is not the {tier}FT column")
                srow_w = next((w for w, rr in row_of.items() if rr == int(srow)), None)
                if srow_w is None or srow_w not in groups[lc]:
                    problems.add(f"{where}: adds the solid door at {scol}{srow}, which is not a width of this column's group")
                solid_cost = ws.cell(int(srow), solid_cols[tier]).value
                if isinstance(solid_cost, (int, float)) and abs(lst * mult * K + solid_cost - cost) > 0.06:
                    problems.add(f"{where}: cost {cost} is not list {lst} x {mult} x k + the solid door's {solid_cost}")
                adders[lc] = float(lst)
            table[name] = adders
            order.append(name)
            r2 += 1
        if not table:
            problems.add(f"{ws.title} K{t}: the {tier}FT HIGH table has no design rows")
        tables[tier] = table
        orders[tier] = order
    if set(tables) != set(solid_cols):
        sys.exit(f"{ws.title}: design tables for {sorted(tables)}, expected one per height {sorted(solid_cols)}")
    order = orders["7"]
    for tier, o in orders.items():
        if o != order:
            problems.add(f"{ws.title}: the {tier}FT HIGH table lists {o}, the 7FT table {order}")
    if set(order) != set(COACHMAN_WINDOW_DESIGNS):
        problems.add(f"{ws.title}: the design tables name {sorted(set(order) ^ set(COACHMAN_WINDOW_DESIGNS))} differently from "
                     f"COACHMAN_WINDOW_DESIGNS (inserts.ts names the app's)")
    # The adder is the same at every height.
    for name in order:
        for tier, table in tables.items():
            if table.get(name) != tables["7"].get(name):
                problems.add(f"{ws.title}: {name}'s adders differ between the 7FT and {tier}FT tables: {tables['7'].get(name)} / {table.get(name)}")

    # Width -> its column group, and the section adder (cost) of each design there.
    col_of = {w: lc for lc, ws_ in (col_widths or {}).items() for w in ws_}
    section_at = {}   # design -> {width: cost | None}
    for name in order:
        section_at[name] = {}
        for w in widths:
            lc = col_of.get(w)
            lst = tables["7"][name].get(lc) if lc is not None else None
            section_at[name][w] = None if lst is None else money(lst * mult * K)
    has_section = {w: any(section_at[n][w] is not None for n in order) for w in widths}

    # The special glass: ADD ON TO DOUBLE STRENGTH DOOR PRICE, a block per glass
    # with a row per window count — list under the name, cost beside it.
    header = next(((rr, c) for rr in range(grid_end, ws.max_row + 1) for c in range(1, 12)
                   if isinstance(ws.cell(rr, c).value, str) and "ADD ON TO DOUBLE STRENGTH DOOR PRICE" in ws.cell(rr, c).value.upper()), None)
    if header is None:
        problems.add(f"{ws.title}: no 'ADD ON TO DOUBLE STRENGTH DOOR PRICE' line under the grid — the glass is loaded as an add-on over the "
                     "double strength door, and the sheet should say so")
    glass_up = {}   # gid -> {windows: cost}
    for rr in range(grid_end, ws.max_row + 1):
        for c in range(1, 11):
            name = ws.cell(rr, c).value
            if name not in GLASS_BY_NAME:
                continue
            gid = GLASS_BY_NAME[name]
            if gid in glass_up:
                problems.add(f"{ws.title}: {name} appears twice below the grid")
            by_count = {}
            for r2 in range(rr + 1, rr + 6):
                lst = ws.cell(r2, c).value
                if not isinstance(lst, (int, float)):
                    break
                cost = ws.cell(r2, c + 1).value
                where = f"{ws.title} {get_column_letter(c + 1)}{r2} ({name})"
                lab = next((str(ws.cell(r2, cl).value) for cl in range(c - 1, 0, -1)
                            if isinstance(ws.cell(r2, cl).value, str) and re.match(r"\s*\d+\s*WINDOWS", ws.cell(r2, cl).value, re.I)), None)
                if lab is None:
                    problems.add(f"{where}: no window-count label to the left")
                    continue
                n = int(re.match(r"\s*(\d+)", lab).group(1))
                f = str(wsf.cell(r2, c + 1).value or "").replace(" ", "")
                exp = f"={get_column_letter(c)}{r2}*{mult}*0.99/(1-0.0265)"
                if f != exp:
                    problems.add(f"{where}: the cost is not list x {mult} x k ({f!r})")
                if not isinstance(cost, (int, float)) or abs(lst * mult * K - cost) > 0.06:
                    problems.add(f"{where}: cost {cost!r} is not list {lst} x {mult} x k")
                by_count[n] = money(lst * mult * K)
            if not by_count:
                problems.add(f"{ws.title}: {name} at {get_column_letter(c)}{rr} has no figures under it")
                continue
            glass_up[gid] = by_count
    if not glass_up:
        problems.add(f"{ws.title}: no special glass blocks below the grid")
    counts = sorted({windows_at(w) for w in widths if has_section[w]} - {None})
    for gid, by_count in glass_up.items():
        for n in counts:
            if n not in by_count:
                problems.add(f"{ws.title}: {gid} has no figure for {n}-window doors")

    # Bands: contiguous grid widths with the same figures; a width without a
    # section (14'0") breaks the run, so it falls outside every band.
    def runs(value_at):
        out = []
        for w in widths:
            v = value_at(w)
            if v is None:
                out.append(None)
                continue
            if out and out[-1] is not None and out[-1][2] == v:
                out[-1] = (out[-1][0], w, v)
            else:
                out.append((w, w, v))
        return [b for b in out if b]

    glass = {"dsb": {"short": [{"lo": lo, "hi": hi, "windows": n, "glass": 0.0, "inserts": None}
                               for lo, hi, n in runs(lambda w: windows_at(w) if has_section[w] else None)], "long": []}}
    for gid, by_count in glass_up.items():
        glass[gid] = {"short": [{"lo": lo, "hi": hi, "windows": n, "glass": cost, "inserts": None}
                                for lo, hi, (n, cost) in runs(lambda w: (windows_at(w), by_count.get(windows_at(w))) if has_section[w] and windows_at(w) in by_count else None)],
                      "long": []}
    sections = {name: [{"lo": lo, "hi": hi, "cost": cost} for lo, hi, cost in runs(lambda w: section_at[name][w])] for name in order}
    print(f"  note: {ws.title} prices {sorted(glass)}; no block for the other types")
    print(f"  note: {ws.title} window counts {count_rules}; {len(order)} window designs: {order}")
    for name in order:
        print(f"    {name}: " + ", ".join(f"{width_label(b['lo'])}-{width_label(b['hi'])} {b['cost']:.2f}" for b in sections[name]))

    return {
        "sheet": ws.title, "group": group, "members": [group], "mult": mult, "glass_mult": mult, "flat": flat,
        "min_width": {}, "ug": None, "only_to_8": False, "unavailable": [],
        "tiers": list(solid_cols), "bands": bands, "gaps": [], "no_windows": {}, "glass": glass,
        "sections": sections, "section_order": order, "solid_grid_only": True,
        "solid_only": [width_key(w) for w in widths if not has_section[w]],
        "problems": problems,
    }


def grid_for(info, margin):
    """The SELL grid for one group: tier -> width key -> {solid, glass?, inserts?}."""
    sell = lambda cost: money(cost / (1 - margin / 100))
    dsb = info["glass"]["dsb"]["short"]
    held = [(t, lo, hi) for g, t, lo, hi, _ in HOLD if g == info["group"]]
    grid = {t: {} for t in info["tiers"]}
    for lo, hi, label, prices in info["bands"]:
        for w in range(lo, hi + 1, 2):
            wk = width_key(w)
            band = next((b for b in dsb if b["lo"] <= w <= b["hi"]), None)
            for tier, cost in prices.items():
                if any(t == tier and hlo <= w <= hhi for t, hlo, hhi in held):
                    continue
                cell = {"solid": sell(cost)}
                # The Coachman's windows are a section priced by design over
                # the solid door (coachman-windows.ts): no GLASS column.
                if band and not info.get("solid_grid_only"):
                    # DSB is the base glass: GLASS and INSERTS are the solid door
                    # plus the short DSB adder, as the Gallery grid is built.
                    cell["glass"] = sell(cost + band["glass"])
                    if band["inserts"] is not None:
                        cell["inserts"] = sell(cost + band["inserts"])
                grid[tier][wk] = cell
    return grid


def write_grid(group, grid):
    src = SPECIAL_DOORS.read_text()
    block = f'  "{group}": ' + json.dumps(grid, indent=2).replace("\n", "\n  ")
    pat = re.compile(r'  "' + re.escape(group) + r'": \{.*?\n  \}(,?)\n', re.S)
    if pat.search(src):
        src = pat.sub(lambda m: block + m.group(1) + "\n", src, count=1)
    else:
        i = src.rindex("\n};")
        src = src[:i].rstrip() + ",\n" + block + "\n};" + src[i + 3:]
    SPECIAL_DOORS.write_text(src)


def write_glass(fam, infos, workbook_name):
    const = fam["const"]
    present = [(name, gid, label) for name, gid, label in GLASS_IDS if any(gid in i["glass"] for i in infos)]
    out = [f"// AUTO-GENERATED by scripts/apply_sheet_workbook.py from the {fam['title']}",
           f"// workbook ({workbook_name}). Do not edit by hand — re-run the script",
           "// against a newer workbook.",
           "//",
           "// Everything here is DDS COST, before margin. The special order quote lifts",
           "// it by the group's door margin at quote time (so-glass.ts). Width bands are",
           "// in inches. The groups are keyed as special-orders.ts keys them.",
           *(["//",
              "// The Coachman's windows are a top section priced by design (CJ's workbook",
              "// of 13/10/2026): SECTIONS below is each design's adder over the solid",
              "// door by width band, and a design is not built at a width outside its",
              "// bands. The glass is an ADD ON TO DOUBLE STRENGTH DOOR PRICE by window",
              "// count, so the bands here hold that add-on (double strength itself is",
              "// 0) on the widths some section is priced; a width in no band is solid",
              "// only. One window layout, so every band is 'short' and 'long' is empty.",
              "// coachman-windows.ts puts the two together."]
             if fam["layout"] == "coachman" else []),
           "",
           'import type { GlassOption, SectionBand, SheetBand } from "./sheet-band";' if fam["layout"] == "coachman"
           else 'import type { GlassOption, SheetBand } from "./sheet-band";',
           "",
           f"/** The groups this workbook prices. */",
           f"export const {const}_GROUPS = [" + ", ".join(f'"{i["group"]}"' for i in infos) + "] as const;",
           "",
           "/** The glass types the workbook prices, in the order the counter reads them. */",
           f"export const {const}_GLASS_TYPES: GlassOption[] = [",
           *[f'  {{ id: "{gid}", label: "{label}" }},' for _, gid, label in present],
           "];",
           "",
           "/** group -> glass id -> short or long windows -> bands, narrowest first. */",
           f"export const {const}_GLASS: Record<string, Record<string, Record<\"short\" | \"long\", SheetBand[]>>> = {{"]
    for info in infos:
        out.append(f'  "{info["group"]}": {{')
        for _, gid, _ in present:
            if gid not in info["glass"]:
                continue
            out.append(f'    "{gid}": {{')
            for panel in ("short", "long"):
                if not info["glass"][gid][panel]:
                    out.append(f"      {panel}: [],")
                    continue
                out.append(f"      {panel}: [")
                for b in info["glass"][gid][panel]:
                    ins = "null" if b["inserts"] is None else f"{b['inserts']:.2f}"
                    out.append(f'        {{ lo: {b["lo"]}, hi: {b["hi"]}, windows: {b["windows"]}, glass: {b["glass"]:.2f}, inserts: {ins} }},')
                out.append("      ],")
            out.append("    },")
        out.append("  },")
    out += ["};", ""]
    if fam["layout"] == "coachman":
        out += ["/**",
                " * The window sections by design: the cost adder over the solid door, by",
                " * width band (inches), in the order the sheet lists the designs. A design",
                " * with no band at a width is not built there.",
                " */",
                f"export const {const}_SECTIONS: Record<string, Record<string, SectionBand[]>> = {{"]
        for info in infos:
            out.append(f'  "{info["group"]}": {{')
            for name in info["section_order"]:
                bands = ", ".join(f"{{ lo: {b['lo']}, hi: {b['hi']}, cost: {b['cost']:.2f} }}" for b in info["sections"][name])
                out.append(f'    "{name}": [{bands}],')
            out.append("  },")
        out += ["};", ""]
    out += ["/**",
            " * Ultra-Grain (and the other premium finishes): a flat adder by door, single",
            " * or double (10'2\" and up), in two height bands — up to 8'0\", and 8'2\" and",
            " * up. Cost, before margin. A group built to 8'0\" only carries one band twice.",
            " */",
            f"export const {const}_ULTRA_GRAIN: Record<string, {{ upTo8ft: {{ single: number; double: number }}; over8ft: {{ single: number; double: number }} }}> = {{"]
    for info in infos:
        ug = info["ug"]
        if ug is None:
            out.append(f'  // "{info["group"]}": the workbook prices no premium finish.')
            continue
        out.append(f'  "{info["group"]}": {{ upTo8ft: {{ single: {ug["low"]["single"]:.2f}, double: {ug["low"]["double"]:.2f} }}, '
                   f'over8ft: {{ single: {ug["high"]["single"]:.2f}, double: {ug["high"]["double"]:.2f} }} }},')
    out += ["};", ""]
    fam["out"].write_text("\n".join(out))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("workbook")
    ap.add_argument("--family", choices=sorted(FAMILIES), required=True)
    ap.add_argument("--check", action="store_true", help="validate and report, write nothing")
    args = ap.parse_args()
    fam = FAMILIES[args.family]
    global DOOR_FLAT
    DOOR_FLAT = fam["flat"]
    margins = margins_for(fam["collection"])
    wb = load_workbook(args.workbook, data_only=True)
    wbf = load_workbook(args.workbook, data_only=False)
    reader = read_coachman_sheet if fam["layout"] == "coachman" else read_sheet
    infos = []
    for ws in wb.worksheets:
        # A sheet without a multiplier in A2 is not a price page — the CHANGES
        # sheet on a corrected workbook, say.
        if "MULTIPL" not in str(ws["A2"].value or "").upper():
            print(f"  note: skipping sheet {ws.title!r} (no multiplier in A2)")
            continue
        info = reader(ws, wbf[ws.title], margins)
        infos.append(info)
    problems = [p for i in infos for p in i["problems"]]
    for info in infos:
        g = info["group"]
        flat = f" + {info['flat']:g}" if info.get("flat") else ""
        print(f"{info['sheet']}: {g} — door x{info['mult']}{flat}, glass x{info['glass_mult']}, tiers {info['tiers']}, "
              f"{len(info['bands'])} {'widths' if fam['layout'] == 'coachman' else 'bands'} {info['bands'][0][2]} .. {info['bands'][-1][2]}, margin {margins[g]}%")
        if fam["layout"] == "coachman":
            print(f"   solid only (no glass top section on the sheet): {info['solid_only']}")
        else:
            print(f"   minimums {info['min_width']}; not built {info['unavailable']}; solid only {info['no_windows']}")
        if info["gaps"]:
            print(f"   NO ROW for {', '.join(info['gaps'])} — those widths get no grid price")
        for hg, t, lo, hi, why in HOLD:
            if hg == g:
                print(f"   HELD off the grid: {t}FT, {width_key(lo)} to {width_key(hi)} — {why}")
    if problems:
        print("\nThe workbook disagrees with itself — fix these (or list them) before loading:", file=sys.stderr)
        for p in problems:
            print("  -", p, file=sys.stderr)
        sys.exit(1)
    if args.check:
        print("\ncheck only — nothing written")
        return
    for info in infos:
        grid = grid_for(info, margins[info["group"]])
        write_grid(info["group"], grid)
        n = sum(len(t) for t in grid.values())
        print(f"wrote {n} grid cells for {info['group']} at {margins[info['group']]:g}% into {SPECIAL_DOORS.name}")
    write_glass(fam, infos, Path(args.workbook).name)
    print(f"wrote glass and Ultra-Grain for {len(infos)} groups into {fam['out'].name}")


if __name__ == "__main__":
    main()
