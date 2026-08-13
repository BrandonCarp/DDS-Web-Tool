"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { QbLineDemo } from "@/components/QbLineDemo";
import { SpringPicker } from "@/components/SpringPicker";
import { QB_ITEMS } from "@/lib/qb/iif";
import { EXTENSION_SPRINGS } from "@/lib/pricing/data/springs";
import { partDescription, partPrice, partQuantity } from "@/lib/pricing/data/parts";

const fmt = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Extension springs.
 *
 * Lifted off the bottom of the parts shelf and given a tab, because nobody
 * looking for a 25-42-140 thinks of it as a part — they think of it as a
 * spring, and they arrive knowing the door height and the colour code.
 *
 * Nothing about the pricing moved with it. Every row is a fixed each-price and
 * still bills to the PARTS item; springs.test.ts holds that shape, so if the
 * sheet ever grows a per-foot or handed extension row, CI says so before the
 * counter finds out.
 */
export function ExtensionTool() {
  const [pickedName, setPickedName] = useState<string | null>(null);

  const part = pickedName
    ? (EXTENSION_SPRINGS.items.find((p) => p.name === pickedName) ?? null)
    : null;

  const description = part ? partDescription(part) : "";
  const price = part ? partPrice(part) : 0;
  const qtyText = part ? String(partQuantity(part)) : "1";

  return (
    <>
      <div className="wrap two">
        <section className="config-col">
          <div className="panel">
            <SpringPicker
              category={EXTENSION_SPRINGS}
              picked={pickedName}
              onPick={setPickedName}
              testId="ext"
              heading="Find an extension spring"
            />
          </div>
        </section>

        <aside className="quote">
          <div className="qcard">
            <div className="qhead">
              <div className="qeyebrow">Extension spring</div>
              <div className="qtitle">{part ? part.name : "No spring selected"}</div>
              {part && <div className="qsub">QuickBooks item: {QB_ITEMS.parts}</div>}
            </div>

            {!part ? (
              <div className="empty">
                <div className="emptymsg">Pick a spring from the list</div>
              </div>
            ) : (
              <>
                <div className="descbox no-print">
                  <div className="desclbl">Spring description</div>
                  <div className="desctext" data-testid="ext-desc">
                    {description}
                  </div>
                </div>
                <div className="total">
                  <span>Quantity {qtyText}</span>
                  <b data-testid="ext-price">{fmt(price)}</b>
                </div>
                <div className="qfoot">
                  <CopyButton text={description} label="Copy description" primary testId="ext-copy-desc" />
                  <CopyButton text={fmt(price)} label="Copy price" testId="ext-copy-price" />
                  <button className="btn" type="button" onClick={() => setPickedName(null)}>
                    Clear
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      {part && (
        <QbLineDemo
          model={part.name}
          size={part.sub ?? EXTENSION_SPRINGS.name}
          item={QB_ITEMS.parts}
          typed="PAR"
          description={description}
          qty={qtyText}
          rate={fmt(price).replace("$", "")}
        />
      )}
    </>
  );
}
