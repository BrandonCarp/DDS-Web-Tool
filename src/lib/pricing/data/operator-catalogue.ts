// The catalogue the app actually reads: the generated OPERATORS sheet with the
// hand-added entries merged in.
//
// operators.ts is rewritten wholesale by gen_operators.py, so nothing may be
// typed into it. operators-manual.ts holds the models DDS sells that the parts
// list has not caught up with yet. Merging here rather than in either file
// keeps the generated one machine-written and the manual one deletable.
//
// Every consumer imports OPERATOR_CATALOGUE. Importing OPERATOR_SECTIONS
// directly still works and still returns only the generated rows — that is what
// operators.test.ts checks, and it is not what the tab should render.

import {
  OPERATOR_SECTIONS,
  type Operator,
  type OperatorSection,
} from "./operators";
import { MANUAL_OPERATORS, SUPPRESSED_OPERATORS } from "./operators-manual";
import { deriveHeadOnly } from "./operator-head-only";

/** Descriptions a manual entry supersedes, so the generated row drops out. */
const REPLACED = new Set(
  MANUAL_OPERATORS.map((m) => m.replaces).filter((d): d is string => Boolean(d)),
);

/** Descriptions removed outright, with nothing taking their place. */
const SUPPRESSED = new Set(SUPPRESSED_OPERATORS.map((s) => s.desc));

/** Both reasons a generated row does not reach the catalogue. */
const DROPPED = new Set([...REPLACED, ...SUPPRESSED]);

/** Generated sections, with superseded rows removed and hand-added ones appended. */
const BASE_CATALOGUE: OperatorSection[] = OPERATOR_SECTIONS.map(
  (section) => {
    const kept = section.items.filter((o) => !DROPPED.has(o.desc));
    const extra: Operator[] = MANUAL_OPERATORS.filter(
      (m) => m.section === section.name,
    ).map(({ name, desc }) => ({ name, desc }));
    return kept.length === section.items.length && extra.length === 0
      ? section
      : { ...section, items: [...kept, ...extra] };
  },
);

const HEAD_ONLY = deriveHeadOnly(BASE_CATALOGUE);

/** Derived HEAD ONLY prices, keyed the same way every price file is. */
export const HEAD_ONLY_PRICES: Record<string, number> = HEAD_ONLY.prices;

/** Models with a rail but no price on the shortest one, so no head-only row. */
export const HEAD_ONLY_SKIPPED: string[] = HEAD_ONLY.skipped;

/** Generated + manual + derived head-only rows: what the tab renders. */
export const OPERATOR_CATALOGUE: OperatorSection[] = BASE_CATALOGUE.map(
  (section) => {
    const extra = HEAD_ONLY.items.get(section.name);
    return extra ? { ...section, items: [...section.items, ...extra] } : section;
  },
);

/** Every item in the merged catalogue, flattened. */
export const ALL_OPERATORS: Operator[] = OPERATOR_CATALOGUE.flatMap(
  (s) => s.items,
);
