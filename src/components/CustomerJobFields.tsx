"use client";

import { useEffect, useRef, useState } from "react";

/** Customer / P.O. / Job name block for the quote panel.
 *  The customer field type-aheads over the imported QuickBooks customer list
 *  and stores the EXACT QB name; free-typed names are allowed too (new or
 *  walk-in customers). Everything here is optional — blank customer simply
 *  means WALK IN, same as today's workflow. */
export function CustomerJobFields({
  customer, setCustomer, po, setPo, job, setJob,
}: {
  customer: string; setCustomer: (v: string) => void;
  po: string; setPo: (v: string) => void;
  job: string; setJob: (v: string) => void;
}) {
  const [hits, setHits] = useState<{ qb_name: string; company: string | null; phone: string | null }[]>([]);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const picked = useRef(false);

  useEffect(() => {
    if (picked.current) { picked.current = false; return; }
    if (timer.current) clearTimeout(timer.current);
    const q = customer.trim();
    if (q.length < 2) { setHits([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      try {
        const r = await fetch(`/api/customers?q=${encodeURIComponent(q)}`);
        const d = await r.json();
        setHits(d.customers ?? []);
        setOpen((d.customers ?? []).length > 0);
      } catch { /* type-ahead is best-effort */ }
    }, 250);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [customer]);

  return (
    <div className="custjob" style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
      <div style={{ position: "relative" }}>
        <label htmlFor="cust">Customer</label>
        <div className="ctl">
          <input
            id="cust"
            value={customer}
            placeholder="WALK IN"
            autoComplete="off"
            onChange={(e) => setCustomer(e.target.value)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onFocus={() => setOpen(hits.length > 0)}
          />
        </div>
        {open && (
          <div
            style={{
              position: "absolute", zIndex: 30, left: 0, right: 0, top: "100%",
              background: "var(--card, #fff)", border: "1px solid var(--line, #ccc)",
              borderRadius: 6, boxShadow: "0 6px 18px rgba(0,0,0,.12)", maxHeight: 220, overflowY: "auto",
            }}
          >
            {hits.map((h) => (
              <button
                key={h.qb_name}
                type="button"
                onMouseDown={() => { picked.current = true; setCustomer(h.qb_name); setOpen(false); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "6px 10px", background: "none", border: "none", cursor: "pointer" }}
              >
                <b>{h.qb_name}</b>
                {h.phone ? <span style={{ color: "var(--muted)", fontSize: 12 }}> · {h.phone}</span> : null}
              </button>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="po">P.O. No.</label>
          <div className="ctl"><input id="po" value={po} onChange={(e) => setPo(e.target.value)} autoComplete="off" /></div>
        </div>
        <div style={{ flex: 1.4 }}>
          <label htmlFor="job">Job name</label>
          <div className="ctl"><input id="job" value={job} onChange={(e) => setJob(e.target.value)} autoComplete="off" /></div>
        </div>
      </div>
    </div>
  );
}
