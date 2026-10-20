"use client";

import { Fragment, useState } from "react";
import { motion } from "motion/react";
import { Activity, Feedback, PrimaryButton, ResetButton, Score } from "./shared";
import { useRecord } from "@/components/lesson/LessonContext";
import { cn } from "@/lib/cn";

// text: "Everyone deserves {to live|living*} with dignity." (* marks the answer)
type Slot = { options: string[]; answer: number; why?: string };

function parse(text: string) {
  const parts: Array<string | Slot> = [];
  const re = /\{([^}]+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [opts, why] = m[1].split("::");
    const raw = opts.split("|");
    const answer = raw.findIndex((o) => o.endsWith("*"));
    parts.push({ options: raw.map((o) => o.replace(/\*$/, "")), answer, why });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function InlineChoice({
  id,
  title = "Choose the correct option",
  instructions = "Tap the correct form in each gap.",
  text,
  aside,
}: {
  id: string;
  title?: string;
  instructions?: string;
  text: string;
  aside?: React.ReactNode;
}) {
  const record = useRecord(id);
  const parts = parse(text);
  const slots = parts.filter((p): p is Slot => typeof p !== "string");
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const correct = slots.filter((s, i) => picks[i] === s.answer).length;
  const complete = Object.keys(picks).length === slots.length;

  function check() {
    setChecked(true);
    record({ correct, total: slots.length, done: true });
  }
  function reset() {
    setPicks({});
    setChecked(false);
  }

  let slotIndex = -1;

  return (
    <Activity title={title} instructions={instructions}>
      <div className={cn(!!aside && "grid gap-6 md:grid-cols-[minmax(0,1fr)_200px]")}>
        <p className="text-[17px] leading-[2.1] text-ink">
          {parts.map((p, i) => {
            if (typeof p === "string") return <Fragment key={i}>{p}</Fragment>;
            slotIndex++;
            const si = slotIndex;
            const ok = checked && picks[si] === p.answer;
            return (
              <span key={i} role="radiogroup" aria-label={`Gap ${si + 1}`} className="mx-1 inline-flex items-center gap-1.5 align-middle leading-none">
                <span className="sr-only">Gap {si + 1}:</span>
                {p.options.map((o, oi) => {
                  const chosen = picks[si] === oi;
                  const isAnswer = oi === p.answer;
                  return (
                    <motion.button
                      key={o}
                      type="button"
                      role="radio"
                      aria-checked={chosen}
                      disabled={checked}
                      onClick={() => setPicks((s) => ({ ...s, [si]: oi }))}
                      animate={checked && chosen && !isAnswer ? { x: [0, -4, 4, -2, 0] } : {}}
                      className={cn(
                        "relative my-0.5 h-8 rounded-lg border px-2.5 text-[15px] font-medium leading-none transition-[background-color,border-color,color,opacity] duration-200 before:absolute before:-inset-x-0.5 before:-inset-y-1.5 before:content-['']",
                        !checked && chosen && "border-accent bg-accent text-white",
                        !checked && !chosen && "border-line-strong bg-white text-ink hover:border-ink-3",
                        checked && isAnswer && "border-good bg-good text-white",
                        checked && chosen && !isAnswer && "border-bad bg-bad text-white line-through",
                        checked && !chosen && !isAnswer && "border-line text-ink-3 opacity-40",
                      )}
                    >
                      {o}
                    </motion.button>
                  );
                })}
                {checked && <span className="sr-only">{ok ? "correct" : `incorrect, the answer is ${p.options[p.answer]}`}</span>}
              </span>
            );
          })}
        </p>
        {aside}
      </div>

      <Feedback show={checked} correct={correct === slots.length} title={correct === slots.length ? "All correct!" : `${correct} of ${slots.length} correct.`}>
        {correct === slots.length ? (
          "You chose the right form every time."
        ) : (
          <ul className="mt-1 space-y-1">
            {slots.map((s, i) =>
              picks[i] !== s.answer ? (
                <li key={i}>
                  <span className="font-semibold">{s.options[s.answer]}</span>
                  {s.why ? `: ${s.why}` : ""}
                </li>
              ) : null,
            )}
          </ul>
        )}
      </Feedback>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {checked ? <Score correct={correct} total={slots.length} /> : <span className="text-sm text-ink-3 tabular">{Object.keys(picks).length}/{slots.length} chosen</span>}
        {checked ? (
          <ResetButton onClick={reset} />
        ) : (
          <PrimaryButton onClick={check} disabled={!complete}>
            Check
          </PrimaryButton>
        )}
      </div>
    </Activity>
  );
}
