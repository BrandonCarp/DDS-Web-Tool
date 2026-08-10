#!/usr/bin/env python3
"""
Add the Bridgeport 3-layer steel series (BD1NU/BD1EU/BD2NU/BD2EU) to the
residential grid.

Bridgeport is not stocked by DDS, so there is no workbook to defer to -- every
cell is derived from the 07/20/2026 Clopay net book at the margins already
recorded for the series in special-orders.ts (BD1 43, BD2 48):

    solid   = round_half_up( book_net x 0.99 / (1 - margin) )
    glass   = solid + DSB "No Inserts"  for the door's width band, same chain
    inserts = solid + DSB "w/ Inserts"  for the door's width band, same chain

Two things about this book differ from Classic/Modern Steel:

  * Heights. Bridgeport merges 8'3"-10' into ONE column where Classic Steel has
    separate 8'3"-9' and 9'3"-10' bands. Tiers 9 and 10 therefore get the same
    figure, which is what iStore returns.
  * Glass. There is no SSB column -- DSB is the base grade -- and the window
    table is laid out as No Inserts / w Inserts per glass type rather than a
    separate decorative-insert adder. That maps onto solid/glass/inserts
    directly, with no insert adder to add on top.

Widths not printed in the grid use the book's custom-width rule (next larger
size + 15%). The widths BDS10 lists as unavailable are skipped entirely so they
fall through to Special Order rather than quoting a size Clopay will not build.

Usage: python3 scripts/gen_bridgeport.py
Rewrites: src/lib/pricing/data/residential-prices.ts
"""
import json
import re
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src/lib/pricing/data"
GRID = DATA / "residential-prices.ts"
NET = DATA / "clopay-net.json"
WIN = DATA / "clopay-windows.json"

ISTORE_DISCOUNT = Decimal("0.99")
CUSTOM_WIDTH_UPLIFT = Decimal("1.15")

# app catalog key -> (book grid label, margin %, max width in feet)
SERIES = {
    "BD1NU-BD1EU": ("BD1NU|BD1EU", 43, 18.0),
    "BD2NU-BD2EU": ("BD2NU|BD2EU", 48, 20.0),
}

# BDS10: "Not available in the following widths"
UNAVAILABLE = {"10.2", "10.4", "10.6", "10.10", "11", "11.2", "11.4", "14.8"}

# Bridgeport tiers 9 and 10 both read the merged 8'3"-10' column.
TIER_SOURCE = {"7": "7", "8": "8", "9": "9-10", "10": "9-10", "12": "12", "14": "14", "16": "16"}


def money(x):
    return Decimal(str(x)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def wnum(code):
    """Grid width key: '15.6' = 15'6"."""
    ft, _, inch = code.partition(".")
    return int(ft) + (int(inch) / 12.0 if inch else 0.0)


def ftin(label):
    """Window-band label: \"14'10\"\" -> 14.833. Different notation from wnum."""
    m = re.match(r"(\d+)'(\d*)", label)
    return int(m.group(1)) + (int(m.group(2)) / 12.0 if m.group(2) else 0.0)


def width_keys(max_ft):
    """Every 2" increment the book allows, 7'8" up to the model's max."""
    out = []
    ft, inch = 7, 8
    while ft + inch / 12.0 <= max_ft + 1e-9:
        code = str(ft) if inch == 0 else f"{ft}.{inch}"
        if code not in UNAVAILABLE:
            out.append(code)
        inch += 2
        if inch >= 12:
            ft, inch = ft + 1, 0
    return out


def band_for(width, bands):
    for lo, hi, key in bands:
        if lo - 1e-9 <= wnum(width) <= hi + 1e-9:
            return key
    return None


def parse_grid(text):
    out, order, cur = {}, [], None
    for line in text.splitlines():
        m = re.match(r'\s{2}"([^"]+)": \{\s*$', line)
        if m:
            cur = m.group(1)
            out[cur] = {}
            order.append(cur)
            continue
        m = re.match(
            r'\s*"([^"]+)": \{ "solid": ([\d.]+), "glass": ([\d.]+), "inserts": ([\d.]+) \}', line
        )
        if m and cur:
            out[cur][m.group(1)] = tuple(Decimal(m.group(i)) for i in (2, 3, 4))
    return out, order


def main():
    text = GRID.read_text()
    grid, order = parse_grid(text)

    net = {}
    for r in json.loads(NET.read_text()):
        if r["spring"] == "torsion":
            net.setdefault(r["models"], {}).setdefault(r["tier"], {})[r["width"]] = r["net"]

    windows = json.loads(WIN.read_text())

    for key, (label, margin, max_ft) in SERIES.items():
        divisor = Decimal(1) - Decimal(margin) / 100
        rows = net[label]
        wins = windows[label]
        bands = [(ftin(b["from"]), ftin(b["to"]), b["from"]) for b in wins["bands"]]
        grid.setdefault(key, {})
        if key not in order:
            order.append(key)

        for tier, src_tier in TIER_SOURCE.items():
            book = rows.get(src_tier, {})
            if not book:
                continue
            ordered = sorted(book, key=wnum)
            for w in width_keys(max_ft):
                if w in book:
                    src, uplift = w, Decimal(1)
                else:
                    bigger = [b for b in ordered if wnum(b) > wnum(w)]
                    if not bigger:
                        continue
                    src, uplift = bigger[0], CUSTOM_WIDTH_UPLIFT
                solid = money(Decimal(str(book[src])) * uplift * ISTORE_DISCOUNT / divisor)

                band = band_for(w, bands)
                cell = wins["bands_by_key"].get(band, {}) if band else {}
                dsb_plain = cell.get("DSB", {}).get("plain")
                dsb_ins = cell.get("DSB", {}).get("inserts")
                if dsb_plain is None:
                    continue
                glass = money(solid + Decimal(str(dsb_plain)) * ISTORE_DISCOUNT / divisor)
                inserts = money(solid + Decimal(str(dsb_ins)) * ISTORE_DISCOUNT / divisor)
                grid[key][f"{w}x{tier}"] = (solid, glass, inserts)
        print(f"  {key:<14} {len(grid[key]):>4} cells")

    header = text.split("import type", 1)[0].rstrip()
    if "Bridgeport" not in header:
        header += (
            "\n// Bridgeport (BD1NU/BD1EU/BD2NU/BD2EU) is generated by scripts/gen_bridgeport.py.\n"
            "// It is not stocked, so every cell is book-derived; tiers 9 and 10 are equal because\n"
            "// the Bridgeport book merges 8'3\"-10' into a single column."
        )

    body = []
    for k in order:
        body.append(f'  "{k}": {{')
        for c in sorted(grid[k], key=lambda x: (int(x.split("x")[1]), wnum(x.split("x")[0]))):
            s, g, i = grid[k][c]
            body.append(f'    "{c}": {{ "solid": {s}, "glass": {g}, "inserts": {i} }},')
        body.append("  },")

    GRID.write_text(
        header
        + '\nimport type { PriceTriple } from "../types";\n\n'
        + "export const RESIDENTIAL_PRICES: Record<string, Record<string, PriceTriple>> = {\n"
        + "\n".join(body)
        + "\n};\n"
    )


if __name__ == "__main__":
    main()
