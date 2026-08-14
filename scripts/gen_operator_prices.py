#!/usr/bin/env python3
"""
Generate src/lib/pricing/data/operator-prices.ts from QuickBooks estimate PDFs.

The OPERATORS sheet carries no prices — see gen_operators.py. These come from
counter estimates run in QuickBooks instead, which makes the estimate PDF the
source document and this script the thing that reads it. Same rule as every
other price file in the repo: nobody types a rate by hand.

Every estimate prints its own subtotal, so the script adds up what it parsed
and refuses to write the file if the two disagree. A dropped line, a wrapped
description that swallowed a rate, an OCR-ish misread — all of them break the
checksum instead of shipping a wrong price to the counter.

Usage: python3 scripts/gen_operator_prices.py <estimate.pdf> [estimate.pdf ...]
Requires: poppler-utils (pdftotext)
"""
import json
import re
import sys
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src/lib/pricing/data/operator-prices.ts"

# Column boundaries in PDF points. The estimate truncates the item column
# ("CONTROL PA...") and leaves only a single space before the description, so
# splitting on whitespace loses four rows out of ten. Word x-positions do not
# have that problem: the description column always begins at ~120pt and the
# numeric columns at ~440pt, whatever the item code did.
ITEM_MAX_X = 115.0
NUM_MIN_X = 440.0
SUBTOTAL = re.compile(r"Subtotal")
MONEY = re.compile(r"[\d,]+\.\d{2}T?")
# These estimates embed Arial as Identity-H, and some subsets hand back "$" as
# "(cid:36)" instead of the character. Undo that for every word rather than
# special-casing the dollar sign, because which glyphs survive varies from one
# exported estimate to the next.
CID = re.compile(r"\(cid:(\d+)\)")
# First word of any row that means the table has ended on this page.
FOOTER = {"APPROVAL", "SIGNATURE_______________________________________________________", "Phone", "Fax", "Page"}


def uncid(text: str) -> str:
    return CID.sub(lambda m: chr(int(m.group(1))), text)


def key(desc: str) -> str:
    """Join key shared with the operator catalogue.

    The OPERATORS sheet writes "LIFTMASTER 880LM,  SMART CONTROL PANEL" with
    two spaces after the comma; QuickBooks writes one. Same product, same
    words, different whitespace — so both sides collapse runs of whitespace and
    upper-case before they are compared. src/lib/pricing/data/operator-pricing.ts
    applies the identical rule on the TypeScript side.
    """
    return re.sub(r"\s+", " ", desc).strip().upper()


def money(s: str) -> float:
    return float(s.replace(",", "").replace("$", "").rstrip("T"))


def rows_of(page):
    """Group words into visual rows, keyed by rounded vertical position."""
    buckets: dict[int, list] = {}
    for w in page.extract_words():
        w = {**w, "text": uncid(w["text"])}
        buckets.setdefault(round(w["top"] / 3), []).append(w)
    for key in sorted(buckets):
        yield sorted(buckets[key], key=lambda w: w["x0"])


def parse(pdf_path: Path):
    items: list[tuple[str, float]] = []
    subtotal = None

    with pdfplumber.open(str(pdf_path)) as pdf:
        for page in pdf.pages:
            # The line-item table is a band: it opens at the column header and
            # closes at the approval boilerplate. Without the closing bound the
            # footer text ("APPROVAL BY SIGNATURE REQUIRED...") sits in the
            # description column with no figures beside it and gets glued onto
            # the last item as though it were a wrapped line — which the
            # subtotal check will NOT catch, because the rates stay correct.
            in_table = False
            for words in rows_of(page):
                texts = [w["text"] for w in words]

                if any(SUBTOTAL.fullmatch(t) for t in texts):
                    money_tokens = [t for t in texts if t.startswith("$")]
                    if money_tokens:
                        subtotal = money(money_tokens[-1])
                    in_table = False
                    continue

                if not in_table:
                    if "Item" in texts and "Description" in texts:
                        in_table = True
                    continue
                if any(t in FOOTER for t in texts):
                    in_table = False
                    continue

                desc = " ".join(
                    w["text"] for w in words if ITEM_MAX_X <= w["x0"] < NUM_MIN_X
                ).strip()
                nums = [w["text"] for w in words if w["x0"] >= NUM_MIN_X]

                if not desc:
                    continue

                # A row with a description but no figures is a wrapped tail.
                if not nums:
                    if items:
                        items[-1] = (f"{items[-1][0]} {desc}", items[-1][1])
                    continue

                if len(nums) < 2:
                    continue
                # Header bands ("P.O. No. / Rep / Job Name") also put words in
                # the right-hand columns. A real line item ends in rate and
                # amount, both money.
                if not (MONEY.fullmatch(nums[-1]) and MONEY.fullmatch(nums[-2])):
                    continue
                # qty, rate, amount — rate is second from the right.
                items.append((key(desc), money(nums[-2])))

    if not items:
        raise SystemExit(f"{pdf_path.name}: parsed no line items")
    if subtotal is None:
        raise SystemExit(f"{pdf_path.name}: no subtotal to check against")

    parsed = round(sum(rate for _, rate in items), 2)
    if abs(parsed - subtotal) > 0.005:
        raise SystemExit(
            f"{pdf_path.name}: parsed lines sum to {parsed:.2f} but the estimate "
            f"says {subtotal:.2f} — {len(items)} lines read. Refusing to write."
        )
    print(f"  {pdf_path.name}: {len(items)} lines, ${parsed:,.2f} checks out", file=sys.stderr)
    return items


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)

    prices: dict[str, float] = {}
    for arg in sys.argv[1:]:
        for desc, rate in parse(Path(arg)):
            if desc in prices and prices[desc] != rate:
                raise SystemExit(
                    f"conflicting rates for {desc!r}: {prices[desc]} vs {rate}"
                )
            prices[desc] = rate

    body = "\n".join(
        f"  {json.dumps(desc)}: {rate},"
        for desc, rate in sorted(prices.items())
    )
    OUT.write_text(
        "// AUTO-GENERATED from QuickBooks estimate PDFs by\n"
        "// scripts/gen_operator_prices.py. Do not edit by hand — re-run the\n"
        "// script against a fresh estimate when prices change.\n"
        "//\n"
        "// Keyed by the QuickBooks DESCRIPTION rather than the item code,\n"
        "// because the estimate truncates the item column (\"CONTROL PA...\")\n"
        "// while the description always prints in full. That description is\n"
        "// also exactly what OPERATOR_SECTIONS carries, so the two join\n"
        "// cleanly and operator-prices.test.ts checks that they still do.\n"
        "//\n"
        "// Counter sell prices, tax excluded.\n\n"
        "export const OPERATOR_PRICES: Record<string, number> = {\n"
        + body
        + "\n};\n"
    )
    print(f"{len(prices)} prices -> {OUT}", file=sys.stderr)


if __name__ == "__main__":
    main()
