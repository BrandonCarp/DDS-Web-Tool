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
import { MANUAL_OPERATORS } from "./operators-manual";

/** Generated sections, with hand-added items appended to their section. */
export const OPERATOR_CATALOGUE: OperatorSection[] = OPERATOR_SECTIONS.map(
  (section) => {
    const extra: Operator[] = MANUAL_OPERATORS.filter(
      (m) => m.section === section.name,
    ).map(({ name, desc }) => ({ name, desc }));
    return extra.length === 0
      ? section
      : { ...section, items: [...section.items, ...extra] };
  },
);

/** Every item in the merged catalogue, flattened. */
export const ALL_OPERATORS: Operator[] = OPERATOR_CATALOGUE.flatMap(
  (s) => s.items,
);
