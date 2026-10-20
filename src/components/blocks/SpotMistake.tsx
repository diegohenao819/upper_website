"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Activity, Feedback, PrimaryButton, ResetButton, Score } from "./shared";
import { useRecord } from "@/components/lesson/LessonContext";
import { cn } from "@/lib/cn";

// sentence: "She suggested [to go] to the beach." (brackets mark the mistake)
// A sentence without brackets is correct.
export type MistakeItem = { sentence: string; fix?: string; why: string };

function tokens(sentence: string) {
  const out: { text: string; wrong: boolean }[] = [];
  sentence.split(/(\[[^\]]+\])/g).filter(Boolean).forEach((part) => {
    if (part.startsWith("[")) out.push({ text: part.slice(1, -1), wrong: true });
    else part.split(/(\s+)/).filter((w) => w.trim()).forEach((w) => out.push({ text: w, wrong: false }));
  });
  return out;
}

export function SpotMistake({
  id,
  title = "Find the mistake",
  instructions = "Tap the wrong words. If the sentence is fine, tap \"It's correct\".",
  items,
}: {
  id: string;
  title?: string;
  instructions?: string;
  items: MistakeItem[];
}) {
  const record = useRecord(id);
  const [step, setStep] = useState(0);
  const [tapped, setTapped] = useState<number | "ok" | null>(null);
  const [score, setScore] = useState(0);
  const finished = step >= items.length;
  const item = items[Math.min(step, items.length - 1)];
  const toks = tokens(item.sentence);
  const hasMistake = toks.some((t) => t.wrong);
  const answered = tapped !== null;
  const right = tapped === "ok" ? !hasMistake : typeof tapped === "number" && toks[tapped].wrong;

  function answer(t: number | "ok") {
    if (answered) return;
    setTapped(t);
    const ok = t === "ok" ? !hasMistake : toks[t].wrong;
    if (ok) setScore((s) => s + 1);
  }
  function next() {
    if (step + 1 >= items.length) record({ correct: score, total: items.length, done: true });
    setStep((s) => s + 1);
    setTapped(null);
  }
  function reset() {
    setStep(0);
    setTapped(null);
    setScore(0);
  }

  return (
    <Activity title={title} instructions={instructions}>
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        {items.map((_, i) => (
          <span key={i} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i < step ? "bg-accent" : i === step && !finished ? "bg-accent/35" : "bg-surface-2")} />
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {finished ? (
          <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-3">
            <Score correct={score} total={items.length} />
            <ResetButton onClick={reset} />
          </motion.div>
        ) : (
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
            <p className="sr-only">Sentence {step + 1} of {items.length}.</p>
            <div className="flex flex-wrap gap-x-1 gap-y-2 text-[clamp(1.15rem,2.4vw,1.4rem)] font-medium leading-snug">
              {toks.map((t, i) => {
                const isTapped = tapped === i;
                return (
                  <motion.button
                    key={i}
                    type="button"
                    disabled={answered}
                    onClick={() => answer(i)}
                    animate={isTapped && !t.wrong ? { x: [0, -5, 5, -2, 0] } : {}}
                    className={cn(
                      "rounded-md px-1.5 py-0.5 transition-colors duration-200",
                      !answered && "text-ink hover:bg-accent-soft hover:text-accent-ink",
                      answered && t.wrong && "bg-bad-soft text-[#8f1d27] line-through decoration-2",
                      answered && isTapped && !t.wrong && "bg-surface-2 text-ink-2",
                      answered && !t.wrong && !isTapped && "text-ink-2",
                    )}
                  >
                    {t.text}
                  </motion.button>
                );
              })}
            </div>
            {answered && item.fix && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[17px] text-ink-2">
                Correct version: <span className="font-semibold text-good">{item.fix}</span>
              </motion.p>
            )}

            <Feedback show={answered} correct={right} title={right ? (hasMistake ? "You found it!" : "Yes, it's correct!") : hasMistake ? "Look again." : "This one was correct."}>
              {item.why}
            </Feedback>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                disabled={answered}
                onClick={() => answer("ok")}
                className={cn(
                  "min-h-11 rounded-xl border-2 px-4 text-[15px] font-semibold transition-colors",
                  answered && tapped === "ok" ? (right ? "border-good bg-good-soft text-[#0b5a3a]" : "border-bad bg-bad-soft text-[#8f1d27]") : "border-line-strong text-ink hover:border-ink-3 disabled:opacity-40",
                )}
              >
                It&apos;s correct
              </button>
              {answered && (
                <PrimaryButton onClick={next}>
                  {step + 1 < items.length ? "Next" : "See score"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </PrimaryButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Activity>
  );
}
