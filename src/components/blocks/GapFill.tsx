"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Activity, Feedback, PrimaryButton, ResetButton, Score, normalize } from "./shared";
import { useRecord } from "@/components/lesson/LessonContext";
import { cn } from "@/lib/cn";

export type GapItem = {
  before: string;
  verb: string; // the hint in parentheses, e.g. "not / tell"
  after: string;
  answers: string[]; // every accepted answer
  why: string;
};

export function GapFill({
  id,
  title = "Complete the sentences",
  instructions = "Write the verb in parentheses with the correct pattern.",
  items,
}: {
  id: string;
  title?: string;
  instructions?: string;
  items: GapItem[];
}) {
  const record = useRecord(id);
  const [values, setValues] = useState<string[]>(() => items.map(() => ""));
  const [checked, setChecked] = useState(false);
  const right = items.map((it, i) => it.answers.some((a) => normalize(a) === normalize(values[i])));
  const correct = right.filter(Boolean).length;
  const filled = values.filter((v) => v.trim()).length;

  function check(e?: React.FormEvent) {
    e?.preventDefault();
    setChecked(true);
    record({ correct, total: items.length, done: true });
  }
  function reset() {
    setValues(items.map(() => ""));
    setChecked(false);
  }

  return (
    <Activity title={title} instructions={instructions}>
      <form onSubmit={check} noValidate>
        <ol className="divide-y divide-line border-y border-line">
          {items.map((it, i) => (
            <li key={i} className="py-4">
              <div className="flex gap-3">
                <span className="w-5 shrink-0 pt-2 text-sm font-semibold text-ink-3 tabular">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <label className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[16px] leading-relaxed text-ink">
                    <span>{it.before}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <input
                        value={values[i]}
                        onChange={(e) => setValues((v) => v.map((x, j) => (j === i ? e.target.value : x)))}
                        readOnly={checked}
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        aria-label={`Answer ${i + 1}, verb: ${it.verb}`}
                        className={cn(
                          "h-10 w-36 rounded-lg border-2 bg-white px-2.5 text-[16px] font-medium outline-none transition-colors placeholder:text-ink-3/60 focus:border-accent",
                          !checked && "border-line-strong",
                          checked && right[i] && "border-good bg-good-soft text-[#0b5a3a]",
                          checked && !right[i] && "border-bad bg-bad-soft text-[#8f1d27]",
                        )}
                        placeholder="..."
                      />
                      <span className="text-[15px] text-ink-3">({it.verb})</span>
                      {checked && (right[i] ? <Check className="size-5 text-good" strokeWidth={3} aria-label="correct" /> : <X className="size-5 text-bad" strokeWidth={3} aria-label="incorrect" />)}
                    </span>
                    <span>{it.after}</span>
                  </label>
                  {checked && (
                    <p className={cn("mt-2 text-sm", right[i] ? "text-good" : "text-[#8f1d27]")}>
                      {!right[i] && (
                        <>
                          Answer: <span className="font-semibold">{it.answers.join(" or ")}</span>.{" "}
                        </>
                      )}
                      <span className="text-ink-2">{it.why}</span>
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Feedback show={checked} correct={correct === items.length} title={correct === items.length ? "All correct!" : `${correct} of ${items.length} correct.`}>
          {correct === items.length ? "Excellent work." : "Read each explanation under the red answers."}
        </Feedback>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {checked ? <Score correct={correct} total={items.length} /> : <span className="text-sm text-ink-3 tabular">{filled}/{items.length} written</span>}
          {checked ? (
            <ResetButton onClick={reset} />
          ) : (
            <PrimaryButton type="submit" disabled={filled < items.length}>
              Check
            </PrimaryButton>
          )}
        </div>
      </form>
    </Activity>
  );
}
