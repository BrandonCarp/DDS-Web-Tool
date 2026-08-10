#!/usr/bin/env python3
"""
Extract every residential door price grid from the Clopay NET price books.

Reads the dealer PDFs and emits one record per (model-group, width, height band,
spring) with the printed NET figure stored verbatim. Nothing is computed here --
per the Bridgeport findings, Clopay's own net column does not round-trip from
list x multiplier under any consistent rounding rule, so printed values are the
source of truth.

Usage:  python3 scripts/parse_clopay_books.py <book.pdf> [<book.pdf> ...]
Output: JSON on stdout -> data/clopay-net.json
"""
import json
import re
import sys

import pdfplumber

# Height-band headers as they appear across the two books. Bridgeport uses a
# different set from Classic/Modern Steel: it has no separate 8'3"-9' and
# 9'3"-10' columns (one 8'3"-10' band instead) and breaks at 7'3" not 7'6".
# NB: pdfplumber returns these with all whitespace stripped, so match squashed.
BAND_KEY = {
    "6'0\"to7'": "7",
    "7'3\"to8'": "8",
    "7'6\"to8'": "8",
    "8'3\"to9'": "9",
    "8'3\"to10'": "9-10",   # Bridgeport merges 9' and 10' into one band
    "9'3\"to10'": "10",
    "10'3\"to12'": "12",
    "12'3\"to14'": "14",
    "14'3\"to16'": "16",
    "14'3\"to16": "16",
}

GRID_HEAD = re.compile(r"^MODELS?(.+)$")
MONEY = re.compile(r"^\d[\d,]*\.\d\d$")


def norm(s):
    """Normalise the PDF's curly quotes and whitespace to plain ASCII."""
    if s is None:
        return ""
    return (
        s.replace("\u2019", "'").replace("\u2018", "'")
        .replace("\u201d", '"').replace("\u201c", '"')
        .replace("\n", " ").strip()
    )


def squash(s):
    """Normalised AND whitespace-free -- pdfplumber drops spaces inside cells."""
    return re.sub(r"\s+", "", norm(s))


def width_key(raw):
    """'15'6", 15'8"' -> '15.6';  '6'2", 8'' -> ['6.2','8'];  '16'' -> '16'."""
    out = []
    for part in squash(raw).split(","):
        part = part.strip()
        # NB: the 4300 grid prints its first row as: 6'2", 8   -- the foot mark
        # on the 8 is missing in the source PDF. Accept a bare integer as feet.
        m = re.match(r"^(\d+)(?:'(?:(\d+)\")?)?$", part)
        if not m:
            continue
        ft, inch = m.group(1), m.group(2)
        out.append(ft if not inch or inch == "0" else f"{ft}.{inch}")
    # 15'6"/15'8" and 6'2"/8' rows share one price; keep the first as canonical
    return out


def parse_grid_table(tbl, models_label):
    """Turn one extracted door-grid table into records."""
    rows = [[squash(c) for c in r] for r in tbl]
    hdr_i = next((i for i, r in enumerate(rows) if any(c == "DoorHeight" for c in r)), None)
    if hdr_i is None:
        return []

    bands = [BAND_KEY.get(c) for c in rows[hdr_i]]
    spring_i = next((i for i, r in enumerate(rows) if any(c == "Torsion" for c in r)), None)
    if spring_i is None:
        return []
    springs = [c.lower() if c in ("Torsion", "Extension") else None for c in rows[spring_i]]

    recs = []
    for r in rows[spring_i + 1:]:
        if not r or not r[0]:
            continue
        widths = width_key(r[0])
        if not widths:
            continue
        for ci, cell in enumerate(r):
            if ci >= len(bands) or bands[ci] is None or springs[ci] is None:
                continue
            if not MONEY.match(cell.replace(" ", "")):
                continue
            net = float(cell.replace(",", ""))
            for w in widths:
                recs.append({
                    "models": models_label,
                    "width": w,
                    "tier": bands[ci],
                    "spring": springs[ci],
                    "net": net,
                })
    return recs


def parse_book(path):
    recs = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for tbl in page.extract_tables():
                cells = [squash(c) for r in tbl for c in r if c]
                if "DoorHeight" not in cells or "Torsion" not in cells:
                    continue
                m = next((GRID_HEAD.match(c) for c in cells if GRID_HEAD.match(c)), None)
                if not m:
                    continue
                recs.extend(parse_grid_table(tbl, m.group(1)))
    return recs


def main():
    all_recs = []
    for p in sys.argv[1:]:
        got = parse_book(p)
        print(f"# {p}: {len(got)} cells", file=sys.stderr)
        all_recs.extend(got)
    # de-dupe (shared rows emit the same record twice)
    seen, out = set(), []
    for r in all_recs:
        k = (r["models"], r["width"], r["tier"], r["spring"])
        if k in seen:
            continue
        seen.add(k)
        out.append(r)
    # one record per line: compact enough to diff, readable enough to eyeball
    lines = ",\n".join("  " + json.dumps(r, sort_keys=True) for r in out)
    print("[\n" + lines + "\n]")
    print(f"# {len(out)} unique cells", file=sys.stderr)


if __name__ == "__main__":
    main()


# --- window tables -----------------------------------------------------------
# Emitted separately from the door grid: window prices key off a WIDTH BAND, not
# the door's width/height cell, so they need their own shape.

WIN_HEAD = re.compile(r"^(?:INSULATED)?ARCHITECTURALWINDOWS-(.+)$")
BAND_RE = re.compile(r"^(\d+'\d*\"?)to(\d+'\d*\"?)$")


def parse_window_tables(path):
    out = {}
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for tbl in page.extract_tables():
                cells = [squash(c) for r in tbl for c in r if c]
                m = next((WIN_HEAD.match(c) for c in cells if WIN_HEAD.match(c)), None)
                if not m:
                    continue
                insulated = any(c.startswith("INSULATEDARCHITECTURAL") for c in cells)
                rows = [[squash(c) for c in r] for r in tbl]
                gi = next(i for i, r in enumerate(rows) if "NoInserts" in r)
                glass, cur = [], None
                for c in rows[gi - 1]:
                    if c:
                        cur = c
                    glass.append(cur)
                entry = out.setdefault(m.group(1), {"bands": [], "bands_by_key": {}})
                for r in rows[gi + 1:]:
                    b = BAND_RE.match(r[0] or "")
                    if not b:
                        continue
                    key = b.group(1)
                    if key not in entry["bands_by_key"]:
                        entry["bands"].append({"from": b.group(1), "to": b.group(2)})
                        entry["bands_by_key"][key] = {}
                    slot = entry["bands_by_key"][key]
                    for ci, cell in enumerate(r):
                        if not MONEY.match(cell) or ci < gi:
                            continue
                        col = rows[gi][ci]
                        # Wrought Iron / Leaded are single columns with no
                        # insert variant. Without this guard they inherit the
                        # neighbouring merged header ("Obscure Glass") and
                        # overwrite that glass type's price.
                        if col == "WroughtIron":
                            slot.setdefault("WroughtIron", {})["plain"] = float(cell)
                            continue
                        if col not in ("NoInserts", "w/Inserts"):
                            continue
                        name = (glass[ci] or "").replace("Glass", "").replace("Insulated", "")
                        name = {"DSB": "DSB", "Obscure": "Obscure", "Frosted": "Frosted",
                                "Rain": "Rain", "Seeded": "Seeded", "WroughtIron": "WroughtIron"}.get(name)
                        if not name:
                            continue
                        if insulated:
                            name = "Insulated" + name
                        kind = "inserts" if rows[gi][ci] == "w/Inserts" else "plain"
                        val = float(cell.replace(",", ""))
                        if val > 0:
                            slot.setdefault(name, {})[kind] = val
    return out


def width_bands_main():
    import sys
    out = {}
    for p in sys.argv[1:]:
        got = parse_window_tables(p)
        print(f"# {p}: {len(got)} window tables", file=sys.stderr)
        for k, v in got.items():
            out.setdefault(k, v)
    print(json.dumps(out, indent=1, sort_keys=True))
