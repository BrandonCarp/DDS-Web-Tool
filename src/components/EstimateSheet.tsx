"use client";

import { useCustomerJob } from "./CustomerJobFields";

/** Print-only replica of a DOORS DIRECT SOUTH QuickBooks estimate, matched
 *  against a real printed estimate (42887). Hidden on screen; "Print quote"
 *  shows ONLY this sheet — Save as PDF in the print dialog.
 *  The Estm. No. box stays blank on purpose: real numbers come from
 *  QuickBooks (the Web Connector's job). Tax fixed at NJ 6.625%. */

const NJ_TAX = 0.06625;
const usd = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** The quote description leads with "Stock door — / Special order —" for the
 *  tool; on the printed estimate the Item column already says it, so the real
 *  QB descriptions start straight at "CLOPAY MODEL …". */
const stripStatus = (d: string) => d.replace(/^\s*(stock door|special order|stock)\s*—\s*/i, "");

function AddrBox({ label, text, fallback }: { label: string; text: string; fallback: string }) {
  const lines = text ? text.split(/,\s*/) : [fallback];
  return (
    <div className="es-addrcol">
      <div className="es-boxlbl">{label}</div>
      <div className="es-box">
        {lines.map((l, i) => (<div key={i}>{l}</div>))}
      </div>
    </div>
  );
}

export function EstimateSheet({
  lines,
}: {
  lines: { item: string; desc: string; qty: number; rate: number }[];
}) {
  const { custName, custBill, custPo, custJob } = useCustomerJob();
  const subtotal = lines.reduce((a, l) => a + l.qty * l.rate, 0);
  const tax = subtotal * NJ_TAX;
  const today = new Date().toLocaleDateString("en-US");
  return (
    <div className="estsheet">
      <div className="es-top">
        <div className="es-co">
          DOORS DIRECT SOUTH, LLC<br />
          7150 WESTFIELD AVENUE<br />
          PENNSAUKEN, NJ 08110
        </div>
        <div className="es-head">
          <h1>Estimate</h1>
          <table className="es-meta">
            <thead><tr><th>Date</th><th>ESTM. No.</th></tr></thead>
            <tbody><tr><td>{today}</td><td>&nbsp;</td></tr></tbody>
          </table>
        </div>
      </div>

      <div className="es-addr">
        <AddrBox label="Name / Address" text={custBill} fallback={custName} />
        <AddrBox label="Ship To" text={custBill} fallback={custName} />
      </div>

      <div className="es-porow">
        <table className="es-meta es-meta3">
          <thead><tr><th>P.O. No.</th><th>Rep</th><th>Job Name</th></tr></thead>
          <tbody><tr><td>{custPo || "\u00a0"}</td><td>TC</td><td>{custJob || "\u00a0"}</td></tr></tbody>
        </table>
      </div>

      <table className="es-lines">
        <thead>
          <tr>
            <th style={{ width: "13%" }}>Item</th>
            <th>Description</th>
            <th style={{ width: "6%" }}>Qty</th>
            <th style={{ width: "10%" }}>Rate</th>
            <th style={{ width: "11%" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l, i) => (
            <tr key={i}>
              <td>{l.item}</td>
              <td>{stripStatus(l.desc).toUpperCase()}</td>
              <td className="r">{l.qty}</td>
              <td className="r">{usd(l.rate)}</td>
              <td className="r">{usd(l.qty * l.rate)}T</td>
            </tr>
          ))}
          <tr className="es-fill"><td colSpan={5}>&nbsp;</td></tr>
        </tbody>
      </table>

      <div className="es-bottom">
        <div className="es-terms">
          <p>APPROVAL BY SIGNATURE REQUIRED BEFORE ORDER IS PLACED.</p>
          <p>THIS SALE SUBJECT TO DOORS DIRECT&apos;S TERMS AND CONDITIONS.</p>
          <p className="es-sig">SIGNATURE ________________________________________________</p>
        </div>
        <table className="es-tot">
          <tbody>
            <tr><td>Subtotal</td><td className="r">${usd(subtotal)}</td></tr>
            <tr><td>Sales Tax (6.625%)</td><td className="r">${usd(tax)}</td></tr>
            <tr className="es-grand"><td>Total</td><td className="r">${usd(subtotal + tax)}</td></tr>
          </tbody>
        </table>
      </div>

      <div className="es-ph">
        Phone # 856-662-6666<br />
        Fax # 856-910-1234
      </div>
    </div>
  );
}
