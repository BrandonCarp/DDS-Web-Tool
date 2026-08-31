// Hand-entered catalogue items. NOT generated — this is the counterpart to
// operator-prices-manual.ts, and it exists for the same reason: so that
// data/operators.ts can stay strictly machine-written.
//
// gen_operators.py rewrites operators.ts in full from NEW_PARTS_LIST.xlsx. Any
// model typed directly into that file disappears the next time the script runs,
// silently, and the first sign of it is an item vanishing from the tab. Entries
// here are merged in afterwards by operator-catalogue.ts instead, so a
// regenerate cannot delete them.
//
// Everything here is waiting on an updated parts list. When one arrives with
// these models on it, gen_operators.py picks them up and
// operators-manual.test.ts fails to tell you to delete the entry from this
// file. That failure is the point: entries here are temporary by design and
// should not quietly outlive their source.
//
// The description is what prints on the QuickBooks estimate and it is also the
// join key every price file uses, so it has to read exactly the way the
// OPERATORS sheet writes it — "LIFTMASTER ELECTRIC OPERATOR MODEL 2220L,
// 7FT CHAIN RAIL", with two spaces after the comma.

export interface ManualOperator {
  /** Model number, as it reads on the box. */
  name: string;
  /** Verbiage copied into the QuickBooks description column. */
  desc: string;
  /** Section this belongs in — must be a section name operators.ts already has. */
  section: string;
  /** Who asked for it and when, so an entry with no parts-list backing has a name attached. */
  source: string;
}

const BRANDON = "Brandon, 2026-08-31 — pending an updated NEW_PARTS_LIST.xlsx";

export const MANUAL_OPERATORS: ManualOperator[] = [
  // 2240L — chain drive, same rail lengths as the 2220L above it.
  {
    name: "2240L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 2240L,  7FT CHAIN RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },
  {
    name: "2240L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 2240L,  8FT CHAIN RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },
  {
    name: "2240L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 2240L,  10FT CHAIN RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },
  // 4690L — chain drive on an I-beam rail, so it reads like the 87802 rather
  // than the 2220L. Filed with the chain models on Brandon's instruction and
  // because the price sheet lists it under CHAIN; move the section string if
  // the counter expects it under sidemount instead.
  {
    name: "4690L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 4690L,  7FT I-BEAM RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },
  {
    name: "4690L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 4690L,  8FT I-BEAM RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },
  {
    name: "4690L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 4690L,  10FT I-BEAM RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },
  {
    name: "4690L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 4690L,  12FT I-BEAM RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },
  {
    name: "4690L",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL 4690L,  14FT I-BEAM RAIL",
    section: "RESIDENTIAL CHAIN DRIVES",
    source: BRANDON,
  },

  // STILL NEEDED — five accessories on the 8-31-2026 price sheet whose product
  // wording is not derivable from the sheet. The sheet gives only a model
  // number, and the description prints on a customer's estimate, so these are
  // left out rather than guessed at. Add them here with the real wording:
  //
  //   L992U   REMOTES          37.95
  //   L932M   REMOTES          40.95
  //   L991S   REMOTES          35.95
  //   L979U   KEYPADS          53.95
  //   L995W   CONTROL PANELS   32.95
  //
  // Compare the existing rows for the shape: "LIFTMASTER L993S,  3 BUTTON
  // REMOTE CONTROL 3.0", "LIFTMASTER L979S,  WIRELESS KEYPAD 3.0",
  // "LIFTMASTER L956W,  WIRELESS CONTROL PANEL".
];
