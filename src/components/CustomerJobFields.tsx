"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/** Customer / P.O. / Job name for the CURRENT quote session.
 *  Lives above the tabs so it follows the user across Residential, Commercial,
 *  Special Order and Springs. Blank customer = WALK IN, exactly like today's
 *  QuickBooks workflow; P.O. and Job name are optional. The customer combobox
 *  type-aheads over the imported QuickBooks customer list and stores the EXACT
 *  QB name so later estimate generation matches cleanly. */

type CustomerJob = {
  custName: string; setCustName: (v: string) => void;
  custPo: string; setCustPo: (v: string) => void;
  custJob: string; setCustJob: (v: string) => void;
};
const noop = () => {};
const Ctx = createContext<CustomerJob>({
  custName: "", setCustName: noop, custPo: "", setCustPo: noop, custJob: "", setCustJob: noop,
});

export function CustomerJobProvider({ children }: { children: ReactNode }) {
  const [custName, setCustName] = useState("");
  const [custPo, setCustPo] = useState("");
  const [custJob, setCustJob] = useState("");
  return (
    <Ctx.Provider value={{ custName, setCustName, custPo, setCustPo, custJob, setCustJob }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCustomerJob() {
  return useContext(Ctx);
}

type Hit = { qb_name: string; company: string | null; phone: string | null };

export function CustomerBar() {
  const { custName, setCustName, custPo, setCustPo, custJob, setCustJob } = useCustomerJob();
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
    if (!open && custName === "") return; // don't pop the list on mount
    timer.current = setTimeout(() => void search(custName), 220);
    return () => { if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [custName]);

  const pick = (v: string) => {
    picked.current = true;
    setCustName(v);
    setOpen(false);
  };

  return (
    <div className="custbar">
      <div className="field cfield">
        <label className="lbl" htmlFor="custname">Select a customer</label>
        <input
          id="custname"
          type="text"
          placeholder="WALK IN"
          autoComplete="off"
          value={custName}
          onChange={(e) => setCustName(e.target.value)}
          onFocus={() => void search(custName)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
        />
        {open && (
          <div className="custdrop">
            <button type="button" onMouseDown={() => pick("")}>
              Walk in <span className="sub">default</span>
            </button>
            {hits.map((h) => (
              <button key={h.qb_name} type="button" onMouseDown={() => pick(h.qb_name)}>
                {h.qb_name}
                {h.phone ? <span className="sub">{h.phone}</span> : null}
              </button>
            ))}
            {hits.length === 0 && custName.trim().length >= 2 && (
              <button type="button" onMouseDown={() => setOpen(false)}>
                Use “{custName.trim()}” <span className="sub">new / not in the list</span>
              </button>
            )}
          </div>
        )}
      </div>
      <div className="field">
        <label className="lbl" htmlFor="custpo">P.O. No.</label>
        <input id="custpo" type="text" autoComplete="off" value={custPo} onChange={(e) => setCustPo(e.target.value)} />
      </div>
      <div className="field">
        <label className="lbl" htmlFor="custjob">Job name</label>
        <input id="custjob" type="text" autoComplete="off" value={custJob} onChange={(e) => setCustJob(e.target.value)} />
      </div>
    </div>
  );
}
