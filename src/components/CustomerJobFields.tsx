"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/** Customer / P.O. / Job name for the CURRENT quote session.
 *  Lives above the tabs so it follows the user across Residential, Commercial,
 *  Special Order and Springs. The customer MUST be picked from the imported
 *  QuickBooks customer list (walk-ins use QB's own "*WALK IN" entry) — the
 *  quoting tools stay locked until one is selected, and the stored name always
 *  matches QuickBooks character-for-character. P.O. and Job name are optional. */

type CustomerJob = {
  custName: string; setCustName: (v: string) => void;
  custBill: string; setCustBill: (v: string) => void;
  custPo: string; setCustPo: (v: string) => void;
  custJob: string; setCustJob: (v: string) => void;
};
const noop = () => {};
const Ctx = createContext<CustomerJob>({
  custName: "", setCustName: noop, custBill: "", setCustBill: noop,
  custPo: "", setCustPo: noop, custJob: "", setCustJob: noop,
});

export function CustomerJobProvider({ children }: { children: ReactNode }) {
  const [custName, setCustName] = useState("");
  const [custBill, setCustBill] = useState("");
  const [custPo, setCustPo] = useState("");
  const [custJob, setCustJob] = useState("");
  return (
    <Ctx.Provider value={{ custName, setCustName, custBill, setCustBill, custPo, setCustPo, custJob, setCustJob }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCustomerJob() {
  return useContext(Ctx);
}

/** Locks the quoting tools until a customer has been selected from the list. */
export function CustomerGate({ children }: { children: ReactNode }) {
  const { custName } = useCustomerJob();
  if (custName) return <>{children}</>;
  return (
    <div className="custgate">
      <div className="panel">
        <div className="emptymsg">Select a customer above to start a quote</div>
      </div>
    </div>
  );
}

type Hit = { qb_name: string; company: string | null; phone: string | null; bill_to: string | null };

export function CustomerBar() {
  const { custName, setCustName, setCustBill, custPo, setCustPo, custJob, setCustJob } = useCustomerJob();
  const [draft, setDraft] = useState(custName);
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const picked = useRef(false);

  async function search(q: string) {
    try {
      const r = await fetch(`/api/customers?q=${encodeURIComponent(q.trim())}`);
      const d = await r.json();
      setHits(d.customers ?? []);
      setOpen(true);
    } catch { /* type-ahead is best-effort */ }
  }

  useEffect(() => {
    if (picked.current) { picked.current = false; return; }
    if (timer.current) clearTimeout(timer.current);
    if (!open) return; // only live-filter while the list is showing
    timer.current = setTimeout(() => void search(draft), 200);
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const pick = (h: Hit) => {
    picked.current = true;
    setDraft(h.qb_name);
    setCustName(h.qb_name);
    setCustBill(h.bill_to ?? "");
    setOpen(false);
  };

  return (
    <div className="custbar-outer">
      <div className="custbar">
        <div className="field cfield">
          <label className="lbl" htmlFor="custname">Customer <span className="req">*</span></label>
          <input
            id="custname"
            type="text"
            placeholder="Select a customer…"
            autoComplete="off"
            value={draft}
            onChange={(e) => { setDraft(e.target.value); setCustName(""); setCustBill(""); }}
            onFocus={() => void search(draft)}
            onBlur={() => setTimeout(() => {
              setOpen(false);
              setDraft((d) => (custName ? custName : d)); // snap back to the committed pick
            }, 150)}
            onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
          />
          {open && (
            <div className="custdrop">
              {hits.map((h) => (
                <button key={h.qb_name} type="button" onMouseDown={() => pick(h)}>
                  {h.qb_name}
                  {h.phone ? <span className="sub">{h.phone}</span> : null}
                </button>
              ))}
              {hits.length === 0 && (
                <div className="custdrop-empty">No matching customers</div>
              )}
            </div>
          )}
        </div>
        <div className="field pofield">
          <label className="lbl" htmlFor="custpo">P.O. No.</label>
          <input id="custpo" type="text" autoComplete="off" value={custPo} onChange={(e) => setCustPo(e.target.value)} />
        </div>
        <div className="field jobfield">
          <label className="lbl" htmlFor="custjob">Job name</label>
          <input id="custjob" type="text" autoComplete="off" value={custJob} onChange={(e) => setCustJob(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
