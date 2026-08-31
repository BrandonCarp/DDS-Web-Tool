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
  /**
   * Generated description this entry SUPERSEDES, verbatim.
   *
   * Set only to correct a defect in operators.ts. The merge drops the named row
   * and puts this one in its place, so the counter sees one entry rather than a
   * right one beside a wrong one. operators-manual.test.ts fails if the named
   * description is not in the generated file, which is what tells you the parts
   * list was fixed and this entry can go.
   */
  replaces?: string;
}

const SHEET =
  "Brandon, 2026-08-31 — from NEW_LM_PRICING_8-31.xlsx, pending an updated NEW_PARTS_LIST.xlsx";
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

  // --- accessories off the 8-31 RES tab -------------------------------------
  // Product wording taken from LiftMaster's own accessory listing, not guessed:
  // L992U is the 2-Button Universal Remote, L932M the 2-Button MAX Remote,
  // L991S the 1-Button Security+ 3.0 Remote, L979U the Universal Wireless
  // Keypad. Each follows the shape of the row already next to it — compare
  // 380UT for the universal remote and 387LM for the universal keypad.
  {
    name: "L992U",
    desc: "LIFTMASTER L992U,  2 BUTTON UNIVERSAL REMOTE CONTROL",
    section: "REMOTES",
    source: SHEET,
  },
  {
    name: "L932M",
    desc: "LIFTMASTER L932M,  2 BUTTON MAX REMOTE CONTROL 3.0",
    section: "REMOTES",
    source: SHEET,
  },
  {
    name: "L991S",
    desc: "LIFTMASTER L991S,  1 BUTTON REMOTE CONTROL 3.0",
    section: "REMOTES",
    source: SHEET,
  },
  {
    name: "L979U",
    desc: "LIFTMASTER L979U,  UNIVERSAL WIRELESS KEYPAD",
    section: "KEYPADS",
    source: SHEET,
  },

  // --- the extended trolley, under its real model number --------------------
  // operators.ts carries five rows reading "TDC12S1BMC,  EXTENDED,  30 CYCLES".
  // That is contradictory: S means standard. The jackshaft pair in the same
  // file settles the convention — JHDC12S1BMC is STANDARD / 20 CYCLES and
  // JHDC12X1BMC is EXTENDED / 30 CYCLES — and the price sheet sells TDC12X1BMC
  // as its own SKU about $490 above the standard unit. These replace the
  // mislabelled rows so there is one entry per product, not two.
  {
    name: "TDC12X1BMC",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12X1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  8FT TROLLEY RAIL",
    section: "MAXUM OPERATORS",
    source: "Corrects a model number in NEW_PARTS_LIST.xlsx — see note above",
    replaces:
      "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12S1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  8FT TROLLEY RAIL",
  },
  {
    name: "TDC12X1BMC",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12X1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  10FT TROLLEY RAIL",
    section: "MAXUM OPERATORS",
    source: "Corrects a model number in NEW_PARTS_LIST.xlsx — see note above",
    replaces:
      "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12S1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  10FT TROLLEY RAIL",
  },
  {
    name: "TDC12X1BMC",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12X1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  12FT TROLLEY RAIL",
    section: "MAXUM OPERATORS",
    source: "Corrects a model number in NEW_PARTS_LIST.xlsx — see note above",
    replaces:
      "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12S1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  12FT TROLLEY RAIL",
  },
  {
    name: "TDC12X1BMC",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12X1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  14FT TROLLEY RAIL",
    section: "MAXUM OPERATORS",
    source: "Corrects a model number in NEW_PARTS_LIST.xlsx — see note above",
    replaces:
      "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12S1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  14FT TROLLEY RAIL",
  },
  {
    name: "TDC12X1BMC",
    desc: "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12X1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  16FT TROLLEY RAIL",
    section: "MAXUM OPERATORS",
    source: "Corrects a model number in NEW_PARTS_LIST.xlsx — see note above",
    replaces:
      "LIFTMASTER ELECTRIC OPERATOR MODEL TDC12S1BMC,  EXTENDED,  1200 LBS,  30 CYCLES,  16FT TROLLEY RAIL",
  },

  // --- sprocket sizes the parts list does not carry -------------------------
  // The COMM tab prices ten chain sizes in two bores; operators.ts has six
  // rows. These are the twelve where the sheet prices both bores identically,
  // so the L/Q-to-bore mapping cannot put a number on the wrong item. 50B56 is
  // deliberately absent: it is the one size where the two bores differ
  // ($73.96 against $147.92), which makes the mapping load-bearing, and it has
  // not been confirmed which of L and Q is the 1'' bore.
  { name: "50B16", desc: "1'' SPROCKET,  50B16", section: "SPROCKET", source: SHEET },
  { name: "50B16", desc: "1-1/4'' SPROCKET,  50B16", section: "SPROCKET", source: SHEET },
  { name: "50B22", desc: "1-1/4'' SPROCKET,  50B22", section: "SPROCKET", source: SHEET },
  { name: "50B24", desc: "1'' SPROCKET,  50B24", section: "SPROCKET", source: SHEET },
  { name: "50B24", desc: "1-1/4'' SPROCKET,  50B24", section: "SPROCKET", source: SHEET },
  { name: "50B32", desc: "1-1/4'' SPROCKET,  50B32", section: "SPROCKET", source: SHEET },
  { name: "50B42", desc: "1'' SPROCKET,  50B42", section: "SPROCKET", source: SHEET },
  { name: "50B42", desc: "1-1/4'' SPROCKET,  50B42", section: "SPROCKET", source: SHEET },
  { name: "50B50", desc: "1'' SPROCKET,  50B50", section: "SPROCKET", source: SHEET },
  { name: "50B50", desc: "1-1/4'' SPROCKET,  50B50", section: "SPROCKET", source: SHEET },
  { name: "50B82", desc: "1'' SPROCKET,  50B82", section: "SPROCKET", source: SHEET },
  { name: "50B82", desc: "1-1/4'' SPROCKET,  50B82", section: "SPROCKET", source: SHEET },

];
