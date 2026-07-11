/** QuickBooks Desktop IIF export for estimates.
 *
 *  An .iif file is tab-separated text QuickBooks imports natively via
 *  File → Utilities → Import → IIF Files. Nothing connects to the company
 *  file — a person imports the file and QB's import review validates it.
 *
 *  !! VERIFY ITEM NAMES !!
 *  INVITEM must match Lists → Item List EXACTLY (colons for sub-items, e.g.
 *  "PARTS:TRACK"). "STOCK DOOR" is confirmed from real DDS estimates; the
 *  others are placeholders until Brandon supplies the real list. A wrong name
 *  is flagged by QB's import review — fix the string here and re-export.
 */
export const QB_ITEMS: Record<string, string> = {
  residential: "STOCK DOOR",
  commercial: "STOCK DOOR",
  spring: "SPRINGS",        // PLACEHOLDER — verify against the Item List
  special: "SPECIAL ORDER", // PLACEHOLDER — verify against the Item List
};

/** Non-posting account estimates live under in QuickBooks. If the company
 *  file names it differently, QB's import review will say so — change it here. */
export const QB_ESTIMATE_ACCOUNT = "Estimates";

export interface IifLine {
  item: string;
  desc: string;
  qty: number;
  rate: number;
  taxable?: boolean;
}

export interface IifEstimate {
  customer: string; // EXACT QuickBooks customer name (e.g. "*WALK IN")
  date?: Date;
  rep?: string;
  po?: string;
  job?: string; // IIF can't fill custom template fields — rides in the memo
  lines: IifLine[];
}

/** IIF is plain ANSI text: strip tabs/newlines and transliterate the few
 *  non-ASCII characters our descriptions use so nothing mangles on import. */
export function iifText(v: string): string {
  return v
    .replace(/[\t\r\n]+/g, " ")
    .replace(/\u2014/g, "-")  // — em dash
    .replace(/\u2013/g, "-")  // – en dash
    .replace(/\u2033/g, '"') // ″ double prime
    .replace(/\u2032/g, "'") // ′ prime
    .replace(/\u00b7|\u2022/g, "-") // · bullet
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[^\x20-\x7e]/g, "")
    .trim();
}

const fmtDate = (d: Date) =>
  `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}/${d.getFullYear()}`;

const money = (n: number) => n.toFixed(2);

export function buildEstimateIif(e: IifEstimate): string {
  const date = fmtDate(e.date ?? new Date());
  const total = e.lines.reduce((a, l) => a + l.rate * l.qty, 0);
  const name = iifText(e.customer);
  const memo = e.job ? iifText(`JOB: ${e.job}`) : "";

  const TRNS_COLS = ["TRNSTYPE", "DATE", "ACCNT", "NAME", "AMOUNT", "DOCNUM", "MEMO", "PONUM", "REP", "TOPRINT"];
  const SPL_COLS = ["TRNSTYPE", "DATE", "ACCNT", "NAME", "AMOUNT", "QNTY", "PRICE", "INVITEM", "MEMO", "TAXABLE"];

  const rows: string[] = [];
  rows.push(["!TRNS", ...TRNS_COLS].join("\t"));
  rows.push(["!SPL", ...SPL_COLS].join("\t"));
  rows.push("!ENDTRNS");
  rows.push([
    "TRNS", "ESTIMATES", date, QB_ESTIMATE_ACCOUNT, name,
    money(total), "", memo, iifText(e.po ?? ""), iifText(e.rep ?? ""), "N",
  ].join("\t"));
  for (const l of e.lines) {
    rows.push([
      "SPL", "ESTIMATES", date, "", name,
      money(-(l.rate * l.qty)), String(-Math.abs(l.qty)), money(l.rate),
      iifText(l.item), iifText(l.desc), l.taxable === false ? "N" : "Y",
    ].join("\t"));
  }
  rows.push("ENDTRNS");
  return rows.join("\r\n") + "\r\n";
}
