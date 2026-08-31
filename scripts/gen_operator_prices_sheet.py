#!/usr/bin/env python3
"""
Generate src/lib/pricing/data/operator-sheet-prices.ts from a LiftMaster price
sheet (NEW_LM_PRICING_<date>.xlsx).

Third source document for operator prices, after the OPERATORS sheet
(descriptions, gen_operators.py) and the QuickBooks estimates (rates,
gen_operator_prices.py). Same rule as every other price file in the repo:
nobody types a rate by hand.

The sheet is keyed by model number plus a length qualifier — "2220L | 7FT" —
while every price file in the repo joins on the QuickBooks DESCRIPTION. So this
script resolves model+length against the catalogue itself and writes descriptions
out, which keeps operator-pricing.ts joining on exactly one kind of key.

There is no subtotal on a price sheet, so the checksum gen_operator_prices.py
relies on does not exist here. What replaces it: every row must resolve to
exactly one catalogue description. A row that matches nothing, or matches two
things, aborts the write and prints the row. A price sheet that silently drops
rows is worse than one that refuses to run — a dropped row shows up in the tool
as "price not set", which reads as "not priced yet" rather than "parser broke".

Rows for products not in the catalogue are listed and skipped. Those are not
parser failures — they are models DDS has not added to NEW_PARTS_LIST.xlsx yet,
and they cannot be priced until gen_operators.py has emitted a description for
them to join to.

Usage: python3 scripts/gen_operator_prices_sheet.py <NEW_LM_PRICING.xlsx>
"""
import re
import sys
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent.parent
CATALOGUE = ROOT / "src/lib/pricing/data/operators.ts"
CATALOGUE_MANUAL = ROOT / "src/lib/pricing/data/operators-manual.ts"
OUT = ROOT / "src/lib/pricing/data/operator-sheet-prices.ts"

# Bare words that head a block rather than name a product.
HEADINGS = {
    "LIFTMASTER", "CHAIN", "BELT", "JACKSHAFT", "REMOTES",
    "KEYPADS", "CONTROL PANEL", "BATTERY BACKUP",
}
LENGTH = re.compile(r"\b(\d{1,2})\s*FT\b")
# The sheet writes "I BEAM", the catalogue writes "I-BEAM". Collapsing hyphens
# into spaces makes the two comparable without touching the stored description.
def norm(text: str) -> str:
    return re.sub(r"[\s\-]+", " ", text).strip().upper()


def price_key(desc: str) -> str:
    """The join key, byte-identical to priceKey() in operator-pricing.ts.

    Deliberately NOT norm(): norm() also folds hyphens so that the sheet's
    "I BEAM" can be compared against the catalogue's "I-BEAM", and that folding
    must never reach a stored key. A key written as "I BEAM" would not match
    anything the TypeScript side computes, and the tab would read "price not
    set" for every I-beam rail with no error anywhere to say why.
    """
    return re.sub(r"\s+", " ", desc).strip().upper()


def model_text(value) -> str:
    """Model numbers arrive as text or as numbers.

    98022 is stored numerically, so a bare str() on a float cell would yield
    "98022.0" and the join would miss silently. Integral numbers are coerced
    back to an integer before they become text.
    """
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        return str(int(value))
    return str(value).strip()


def read_sheet(path: Path):
    ws = load_workbook(path, data_only=True)["Sheet1"]
    rows, section = [], None
    for i, raw in enumerate(ws.iter_rows(values_only=True), 1):
        model = model_text(raw[0])
        qual = model_text(raw[1]) if len(raw) > 1 else ""
        price = raw[2] if len(raw) > 2 else None
        if price is None:
            if model.upper() in HEADINGS:
                section = model.upper()
            continue
        rows.append({
            "row": i,
            "section": section,
            "model": model,
            "qual": qual,
            # Excel hands back 575.95000000000005 for a cell that reads 575.95.
            "price": round(float(price), 2),
        })
    return rows


def read_catalogue():
    """Generated rows plus the hand-added ones.

    A price sheet row must be able to resolve against a model that DDS sells
    but NEW_PARTS_LIST.xlsx has not listed yet — otherwise adding the model to
    operators-manual.ts still leaves it reading "price not set". Both files feed
    the same join, exactly as operator-catalogue.ts merges them at runtime.
    """
    generated = re.findall(
        r'\{"desc":\s*"([^"]+)",\s*"name":\s*"([^"]+)"\}',
        CATALOGUE.read_text(encoding="utf-8"),
    )
    manual = [
        (desc, "")
        for desc in re.findall(
            r'^\s*desc:\s*"([^"]+)"',
            CATALOGUE_MANUAL.read_text(encoding="utf-8"),
            re.M,
        )
    ]
    return generated + manual


def candidates(row, catalogue):
    model = row["model"].upper()
    blob = norm(f"{model} {row['qual']}")
    want_len = LENGTH.search(blob)
    want_len = want_len.group(1) if want_len else None
    kind = next((k for k in ("I BEAM", "CHAIN", "BELT") if k in blob), None)
    # "7FT CHAIN RAIL" with nothing in the model column is the rail sold on its
    # own. The catalogue also lists operator-plus-rail bundles whose text ends
    # the same way, so the bundles have to be excluded explicitly or every rail
    # row matches three items.
    rail_only = model.upper().endswith("RAIL")

    out = []
    for desc, _name in catalogue:
        nd = norm(desc)
        if rail_only:
            if "RAIL" not in nd or "ELECTRIC OPERATOR MODEL" in nd:
                continue
        elif not re.search(rf"\b{re.escape(model)}\b", nd):
            continue
        if want_len:
            found = LENGTH.search(nd)
            if not found or found.group(1) != want_len:
                continue
        elif LENGTH.search(nd):
            # Sheet row names no length, catalogue entry does — different rows.
            continue
        if kind and kind not in nd:
            continue
        out.append(desc)
    return out


def main():
    if len(sys.argv) != 2:
        sys.exit("usage: gen_operator_prices_sheet.py <NEW_LM_PRICING.xlsx>")
    sheet_path = Path(sys.argv[1])
    rows = read_sheet(sheet_path)
    catalogue = read_catalogue()

    resolved, missing, ambiguous = {}, [], []
    for row in rows:
        found = candidates(row, catalogue)
        if len(found) == 1:
            key = price_key(found[0])
            if key in resolved and resolved[key] != row["price"]:
                ambiguous.append((row, [f"already set to {resolved[key]}"]))
                continue
            resolved[key] = row["price"]
        elif not found:
            missing.append(row)
        else:
            ambiguous.append((row, found))

    if ambiguous:
        print("ABORT — rows that matched more than one catalogue entry:", file=sys.stderr)
        for row, found in ambiguous:
            print(f"  row {row['row']}: {row['model']} {row['qual']} -> {found}", file=sys.stderr)
        sys.exit(1)

    if missing:
        print(f"{len(missing)} row(s) name a product that is not in the catalogue.")
        print("These need adding to NEW_PARTS_LIST.xlsx and a gen_operators.py run")
        print("before they can carry a price:")
        for row in missing:
            qual = f" {row['qual']}" if row["qual"] else ""
            print(f"  row {row['row']:3d}  [{row['section']}]  {row['model']}{qual}  {row['price']:.2f}")
        print()

    lines = [
        "// AUTO-GENERATED from the LiftMaster price sheet by",
        "// scripts/gen_operator_prices_sheet.py. Do not edit by hand — re-run the",
        "// script against a newer sheet when prices change.",
        "//",
        f"// Source: {sheet_path.name}",
        "//",
        "// The sheet is keyed by model number and rail length; these keys are the",
        "// catalogue DESCRIPTION the script resolved each row to, so this file joins",
        "// the same way operator-prices.ts does. See operator-pricing.ts for which",
        "// source wins when both carry the same item.",
        "//",
        "// Counter sell prices, tax excluded.",
        "",
        "export const SHEET_OPERATOR_PRICES: Record<string, number> = {",
    ]
    for key in sorted(resolved):
        lines.append(f'  "{key}": {resolved[key]},')
    lines.append("};")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)} — {len(resolved)} price(s) from {len(rows)} sheet row(s)")


if __name__ == "__main__":
    main()
