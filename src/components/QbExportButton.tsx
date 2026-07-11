"use client";

import { useState } from "react";
import { buildEstimateIif, QB_ITEMS } from "@/lib/qb/iif";
import { useCustomerJob } from "@/components/CustomerJobFields";

/** "QuickBooks file" button for the quote panel: downloads a one-estimate
 *  .iif that QuickBooks Desktop imports via File → Utilities → Import →
 *  IIF Files. Uses the selected customer's exact QB name, PO, job (in the
 *  memo), rep TC, and the priced line. */
export function QbExportButton({
  quoteType, description, qty, rate,
}: {
  quoteType: keyof typeof QB_ITEMS;
  description: string;
  qty: number;
  rate: number;
}) {
  const { custName, custPo, custJob } = useCustomerJob();
  const [done, setDone] = useState(false);

  function download() {
    const iif = buildEstimateIif({
      customer: custName,
      rep: "TC",
      po: custPo,
      job: custJob,
      lines: [{ item: QB_ITEMS[quoteType], desc: description.toUpperCase(), qty: Math.max(1, qty), rate }],
    });
    const blob = new Blob([iif], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    a.href = url;
    a.download = `qb-estimate-${stamp}.iif`;
    a.click();
    URL.revokeObjectURL(url);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  }

  return (
    <button className={`btn ${done ? "ok" : ""}`} type="button" onClick={download} disabled={!custName}>
      {done ? "Downloaded ✓" : "QuickBooks file"}
    </button>
  );
}
