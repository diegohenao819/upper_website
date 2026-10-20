"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { Activity, Feedback, PrimaryButton, ResetButton, Score } from "./shared";
import { useRecord } from "@/components/lesson/LessonContext";
import { cn } from "@/lib/cn";

export type ChoiceQuestion = {
  prompt: string; // use ___ for the gap
  options: string[];
  answer: number;
  explain: string;
};

export function ChoiceSet({
  id,
  title = "Quick check",
  questions,
}: {
  id: string;
  title?: string;
  questions: ChoiceQuestion[];
}) {
  const record = useRecord(id);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const finished = step >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)];
  const isRight = picked === q.answer;

  function check() {
    if (picked === null) return;
    setChecked(true);
    if (picked === q.answer) setScore((s) => s + 1);
  }

  function next() {
    const nextStep = step + 1;
    if (nextStep >= questions.length) {
      record({ correct: score, total: questions.length, done: true });
    }
    setStep(nextStep);
    setPicked(null);
    setChecked(false);
  }

  function reset() {
    setStep(0);
    setPicked(null);
    setChecked(false);
    setScore(0);
  }

  return (
    <Activity title={title}>
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        {questions.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-500",
              i < step ? "bg-accent" : i === step && !finished ? "bg-accent/35" : "bg-surface-2",
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {finished ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <Score correct={score} total={questions.length} />
            <ResetButton onClick={reset} />
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[clamp(1.15rem,2.4vw,1.35rem)] font-medium leading-snug text-ink">
              <span className="sr-only">
                Question {step + 1} of {questions.length}.{" "}
              </span>
              <Gap text={q.prompt} fill={checked ? q.options[q.answer] : picked !== null ? q.options[picked] : null} right={checked ? true : null} />
            </p>

            <div role="radiogroup" aria-label="Options" className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {q.options.map((o, i) => {
                const chosen = picked === i;
                const correct = checked && i === q.answer;
                const wrong = checked && chosen && i !== q.answer;
                const ghost = checked && !correct && !wrong;
                return (
                  <motion.button
                    key={o}
                    type="button"
                    role="radio"
                    aria-checked={chosen}
                    disabled={checked}
                    onClick={() => setPicked(i)}
                    animate={wrong ? { x: [0, -6, 6, -3, 3, 0] } : correct ? { scale: [1, 1.03, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      "flex min-h-12 items-center justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left text-[16px] font-medium transition-[border-color,background-color,opacity,color] duration-200",
                      correct && "border-good bg-good-soft text-[#0b5a3a]",
                      wrong && "border-bad bg-bad-soft text-[#8f1d27]",
                      ghost && "border-line opacity-45",
                      !checked && chosen && "border-accent bg-accent-soft text-accent-ink",
                      !checked && !chosen && "border-line bg-white text-ink hover:border-line-strong hover:bg-surface",
                    )}
                  >
                    <span>{o}</span>
                    {correct && <Check className="size-5 text-good" strokeWidth={3} aria-label="correct answer" />}
                    {wrong && <X className="size-5 text-bad" strokeWidth={3} aria-label="your answer, incorrect" />}
                  </motion.button>
                );
              })}
            </div>

            <Feedback show={checked} correct={isRight}>
              {q.explain}
            </Feedback>

            <div className="mt-5 flex justify-end">
              {checked ? (
                <PrimaryButton onClick={next}>
                  {step + 1 < questions.length ? "Next" : "See score"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={check} disabled={picked === null}>
                  Check
                </PrimaryButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Activity>
  );
}

// Renders "I enjoy ___ out." with the chosen answer dropped into the gap.
export function Gap({ text, fill, right }: { text: string; fill: string | null; right: boolean | null }) {
  const [before, after] = text.split("___");
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <span
        className={cn(
          "mx-0.5 inline-block min-w-[4.5ch] border-b-2 px-1.5 text-center transition-colors duration-200",
          fill === null && "border-line-strong text-transparent",
          fill !== null && right === null && "border-accent bg-accent-soft text-accent-ink",
          right === true && "border-good bg-good-soft text-[#0b5a3a]",
        )}
      >
        {fill ?? "____"}
      </span>
      {after}
    </>
  );
}
