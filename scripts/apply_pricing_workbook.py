#!/usr/bin/env python3
"""
Apply a multi-tab Clopay pricing workbook to all three residential price files.

UPDATED_PRICING_9-8.xlsx is one tab per model+height ("4050 7ft full list"),
each carrying every width at 2-inch steps. That supersedes the older one-model
sheets and the ALL/STOCK split they used.

Writes three files from one source, because the same price has to reach the
counter by three different routes:

  special-doors.ts     the special order configurator's size grid
  stock-prices.ts      exact stocked sizes, which beat everything else
  residential-prices.ts  the standard grid, used for any size not stocked

SELL is the only column read. PRICE, FUEL, TOTAL and MPQ are Clopay's working
columns; SELL is what DDS quotes and is taken verbatim, including rows that do
not divide cleanly by the stated margin. Those are reported, not corrected.

WIDTH GRANULARITY. The standard grid used whole-foot keys as bands, so 8'2"
fell back to "8". That cannot represent both 8'0" (stocked, cheap) and 8'2"
(dear) — on the 4050 they are $182 apart. The workbook has every 2-inch width,
so the tiers it covers are written at full granularity and the ambiguity goes
away. Tiers it does not cover keep their existing band keys.

Usage: python3 scripts/apply_pricing_workbook.py <workbook.xlsx>
"""
import json
import re
import sys
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src/lib/pricing/data"
SIZE = re.compile(r"^(\d+)'(\d+)\"?\s*X\s*(\d+)'(\d+)\"?$", re.I)
STYLES = ("solid", "glass", "inserts")

# Sheet model label -> the key each file uses for it.
MODEL_KEYS = {
    "4050/4053/4051": {"special": "4050/4051/4053", "grid": "4050-4051-4053"},
    "4050/4051/4053": {"special": "4050/4051/4053", "grid": "4050-4051-4053"},
    "T50S/T50L": {"special": "T50S/T50L", "grid": "T50S"},
}


def width_key(feet: int, inches: int) -> str:
    return str(feet) if inches == 0 else f"{feet}.{inches}"


def width_order(key: str):
    """Feet then inches. Not float(): "6.10" is 6'10", which float reads as 6.1."""
    ft, _, inch = key.partition(".")
    return (int(ft), int(inch or 0))


def read_tab(ws):
    """-> (model label, height tier, {width: {style: sell}}, margin, [off-margin])"""
    model, marker, grid = None, None, {}
    heights, offs = set(), []
    for r in ws.iter_rows(values_only=True):
        for c in r:
            if isinstance(c, str) and re.fullmatch(r"\d+M", c.strip()):
                marker = c.strip()
        if r[0] and str(r[0]).strip().upper() == "MODEL" and len(r) > 1:
            model = str(r[1]).strip()
        head = str(r[0]).strip().upper().replace("  ", " ") if r[0] else ""
        m = SIZE.match(head)
        if not m or len(r) < 7:
            continue
        total, sell = r[4], r[6]
        if not isinstance(sell, (int, float)):
            continue
        style = str(r[1]).strip().lower()
        if style not in STYLES:
            continue
        heights.add(m.group(3))
        grid.setdefault(width_key(int(m.group(1)), int(m.group(2))), {})[style] = round(float(sell), 2)
        if isinstance(total, (int, float)) and marker:
            mg = int(marker[:-1]) / 100
            if abs(float(total) / (1 - mg) - round(float(sell), 2)) > 1.00:
                offs.append(f"{head} {style}: {round(float(sell),2)} vs {float(total)/(1-mg):.2f} at {marker}")
    if len(heights) != 1:
        raise SystemExit(f"ABORT — tab '{ws.title}' has heights {sorted(heights)}; expected exactly one")
    return model, heights.pop(), grid, marker, offs


def replace_block(src: str, key: str, body: str) -> str:
    """Swap one top-level model block, keeping the rest of the file byte-identical."""
    start = src.index(f'"{key}": {{')
    end = src.index("\n  },", start)
    return src[:start] + f'"{key}": {{\n{body}\n  ' + src[end + 3:]


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: apply_pricing_workbook.py <workbook.xlsx>")
    wb = load_workbook(sys.argv[1], data_only=True)

    tabs = {}
    for name in wb.sheetnames:
        model, tier, grid, marker, offs = read_tab(wb[name])
        if model not in MODEL_KEYS:
            print(f"  skipped '{name}': unknown model {model!r}")
            continue
        tabs[(model, tier)] = grid
        print(f"  {name:24s} {model:16s} {tier}ft  {len(grid)} widths  {marker}")
        for o in offs:
            print(f"      off-margin (taken as written): {o}")
    if not tabs:
        sys.exit("ABORT — no usable tabs")
    print()

    # ---- special-doors.ts -------------------------------------------------
    path = DATA / "special-doors.ts"
    src = path.read_text(encoding="utf-8")
    payload = json.loads(src[src.index("{", src.index("SPECIAL_DOORS")):].rsplit(";", 1)[0])
    for (model, tier), grid in tabs.items():
        key = MODEL_KEYS[model]["special"]
        payload.setdefault(key, {})[tier] = {w: grid[w] for w in sorted(grid, key=width_order)}
    head = src[: src.index("export const SPECIAL_DOORS")]
    path.write_text(
        head
        + "export const SPECIAL_DOORS: Record<string, Record<string, Record<string, Partial<PriceTriple>>>> =\n  "
        + json.dumps(payload, indent=2) + ";\n",
        encoding="utf-8",
    )
    print(f"  special-doors.ts     {sum(len(t) for m in payload.values() for t in m.values())} widths across "
          f"{sum(len(m) for m in payload.values())} model/height grids")

    # ---- stock-prices.ts ---------------------------------------------------
    path = DATA / "stock-prices.ts"
    src = path.read_text(encoding="utf-8")
    changed = 0
    for (model, tier), grid in tabs.items():
        key = MODEL_KEYS[model]["grid"]
        start = src.index(f'"{key}": {{')
        end = src.index("\n  },", start)
        block = src[start:end]

        # One pass, no index arithmetic: mutating the block inside a loop over
        # pre-computed match offsets shifts every later offset and corrupts the
        # file. re.sub with a callback rebuilds it in a single traversal.
        def fix_width(wm):
            width, body = wm.group(1), wm.group(2)
            if width not in grid:
                return wm.group(0)
            def fix_tier(tm):
                nonlocal changed
                cur = {k: float(v) for k, v in re.findall(r'"(\w+)": ([\d.]+)', tm.group(2))}
                new = {k: grid[width].get(k, v) for k, v in cur.items()}
                changed += sum(1 for k in cur if abs(cur[k] - new[k]) > 0.005)
                return tm.group(1) + ", ".join(f'"{k}": {new[k]}' for k in STYLES if k in new) + tm.group(3)
            return wm.group(0).replace(
                body, re.sub(rf'("{tier}": \{{ )([^}}]*)( \}})', fix_tier, body)
            )

        block = re.sub(r'(?s)\n    "([\d.]+)": \{(.*?)\n    \}', fix_width, block)
        src = src[:start] + block + src[end:]
    path.write_text(src, encoding="utf-8")
    print(f"  stock-prices.ts      {changed} price(s) changed")

    # ---- residential-prices.ts --------------------------------------------
    path = DATA / "residential-prices.ts"
    src = path.read_text(encoding="utf-8")
    for model in {m for m, _ in tabs}:
        key = MODEL_KEYS[model]["grid"]
        start = src.index(f'"{key}": {{')
        end = src.index("\n  },", start)
        block = src[start:end]
        keep = {}
        for km in re.finditer(r'"([\d.]+)x(\d+)": \{([^}]*)\}', block):
            keep[(km.group(1), km.group(2))] = km.group(3).strip()
        for (m2, tier), grid in tabs.items():
            if m2 != model:
                continue
            for k in [k for k in keep if k[1] == tier]:
                del keep[k]
            for w in sorted(grid, key=width_order):
                keep[(w, tier)] = ", ".join(f'"{s}": {grid[w][s]}' for s in STYLES if s in grid[w])
        lines = [
            f'    "{w}x{t}": {{ {body} }},'
            for (w, t), body in sorted(keep.items(), key=lambda kv: (int(kv[0][1]), width_order(kv[0][0])))
        ]
        lines[-1] = lines[-1].rstrip(",")
        src = replace_block(src, key, "\n".join(lines))
    path.write_text(src, encoding="utf-8")
    print(f"  residential-prices.ts  rewritten at 2-inch granularity for the tiers covered")


if __name__ == "__main__":
    main()
