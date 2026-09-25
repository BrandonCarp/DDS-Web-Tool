"use client";

import { Icon, type IconName } from "./Icon";

export type ButtonOption<T extends string> = { value: T; label: string; icon?: IconName };

/**
 * Two or three either/or choices shown as buttons instead of a dropdown — the
 * assembly type, for one. All the options stay on screen, so the choice made
 * is visible at a glance and changing it is one click.
 */
export function OptionButtons<T extends string>({
  label,
  options,
  value,
  onChange,
  testid,
}: {
  label: string;
  options: readonly ButtonOption<T>[];
  /** null: nothing chosen yet, as in a yes/no question just asked. */
  value: T | null;
  onChange: (v: T) => void;
  testid: string;
}) {
  return (
    <div className="optbtns" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          data-testid={`${testid}-${o.value}`}
          className={`optbtn${value === o.value ? " sel" : ""}`}
          onClick={() => onChange(o.value)}
        >
          {o.icon && <Icon name={o.icon} size={18} />}
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
