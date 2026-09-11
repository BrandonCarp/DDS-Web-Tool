#!/usr/bin/env python3
"""
Apply a stock-size price sheet (Remaining_Stock_Prices.xlsx shape).

Different from apply_pricing_workbook.py in two ways that matter:

  * it carries only the sizes DDS floors, not all 73 widths, so it updates the
    prices that already exist rather than rebuilding a grid
  * some tabs carry a SECTIONS block in a second set of columns to the right

Doors take the model's own margin, sections take 49. That is verified, not
assumed — a row whose SELL does not reproduce from TOTAL is reported and the
value is still taken as written, because SELL is the column DDS quotes.

Only stock-prices.ts is written. The standard grid in residential-prices.ts
keys whole feet to the ODD-width price — an exact 8'0" comes from the stock
grid, so "8x7" there prices 8'2" through 8'10". A stock sheet must not touch
it; doing so underprices every odd width.

Usage: python3 scripts/apply_stock_price_sheet.py <workbook.xlsx>
"""
import re
import sys
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src/lib/pricing/data"
SIZE = re.compile(r"^(\d+)'(\d+)\"?\s*X\s*(\d+)'(\d+)\"?$", re.I)
STYLES = ("solid", "glass", "inserts")

# tab -> (models it covers, door margin). Sections are always 49.
TABS = {
    "GD1SP & GD1LP": (["GD1LP-GD1SP"], 43),
    "T52S": (["T52S"], 44),
    "9130 & 9133": (["9130-9133"], 43),
}
SECTION_MARGIN = 49


def width_key(ft: int, inch: int) -> str:
    return str(ft) if inch == 0 else f"{ft}.{inch}"


def read_doors(ws):
    """-> {(width_key, tier): {style: sell}}, [rows that fail the margin check]"""
    out, bad = {}, []
    for r in ws.iter_rows(values_only=True):
        head = str(r[0]).strip().upper().replace("  ", " ") if r[0] else ""
        m = SIZE.match(head)
        if not m or len(r) < 7:
            continue
        total, sell = r[4], r[6]
        if not isinstance(sell, (int, float)) or not isinstance(total, (int, float)):
            continue
        style = str(r[1]).strip().lower()
        if style not in STYLES:
            continue
        key = (width_key(int(m.group(1)), int(m.group(2))), m.group(3))
        out.setdefault(key, {})[style] = round(float(sell), 2)
        out[key][f"_total_{style}"] = round(float(total), 2)
    return out, bad


def verify(doors, margin, label):
    off = []
    for (w, t), styles in doors.items():
        for s in STYLES:
            if s not in styles:
                continue
            total = styles.get(f"_total_{s}")
            if total is None:
                continue
            expect = total / (1 - margin / 100)
            if abs(expect - styles[s]) > 1.00:
                off.append(f"{w}x{t} {s}: {styles[s]} vs {expect:.2f} at {margin}M")
    if off:
        print(f"    {label}: {len(off)} row(s) off margin, taken as written")
        for o in off[:5]:
            print(f"      {o}")
    return len(off)



def main():
    if len(sys.argv) != 2:
        sys.exit("usage: apply_stock_price_sheet.py <workbook.xlsx>")
    wb = load_workbook(sys.argv[1], data_only=True)

    stock = (DATA / "stock-prices.ts").read_text(encoding="utf-8")
    total_off = 0

    for tab, (keys, margin) in TABS.items():
        if tab not in wb.sheetnames:
            print(f"  {tab}: not in this workbook, skipped")
            continue
        doors, _ = read_doors(wb[tab])
        total_off += verify(doors, margin, tab)
        clean = {k: {s: v for s, v in d.items() if not s.startswith("_")} for k, d in doors.items()}
        for key in keys:
            # ONLY the stock grid. The standard grid's whole-foot keys hold the
            # ODD-width price — an exact 8'0" is served by stock-prices, so
            # "8x7" there prices 8'2" through 8'10". Writing a stock price into
            # it underprices every odd width by the difference between the two,
            # about $140 on a T52S.
            if f'"{key}": {{' in stock:
                start = stock.index(f'"{key}": {{')
                end = stock.index("\n  },", start)
                blk = stock[start:end]
                n = 0

                def fix_w(wm):
                    nonlocal n
                    w, body = wm.group(1), wm.group(2)

                    def fix_t(tm):
                        nonlocal n
                        t = tm.group(1)
                        new = clean.get((w, t))
                        if not new:
                            return tm.group(0)
                        cur = {k: float(v) for k, v in re.findall(r'"(\w+)": ([\d.]+)', tm.group(2))}
                        merged = {k: new.get(k, v) for k, v in cur.items()}
                        n += sum(1 for k in cur if abs(cur[k] - merged[k]) > 0.005)
                        return f'"{t}": {{ ' + ", ".join(f'"{k}": {merged[k]}' for k in STYLES if k in merged) + " }"

                    return wm.group(0).replace(body, re.sub(r'"(\d+)": \{([^}]*)\}', fix_t, body))

                blk = re.sub(r'(?s)\n    "([\d.]+)": \{(.*?)\n    \}', fix_w, blk)
                stock = stock[:start] + blk + stock[end:]
                print(f"  {tab:16s} -> stock-prices.ts[{key}]        {n} price(s) changed")

    (DATA / "stock-prices.ts").write_text(stock, encoding="utf-8")
    print(f"\n  rows off their stated margin (taken as written): {total_off}")


if __name__ == "__main__":
    main()
