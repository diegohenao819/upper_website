"use client";

import { useMemo, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Activity, Feedback, PrimaryButton, ResetButton, Score } from "./shared";
import { useRecord } from "@/components/lesson/LessonContext";
import { cn } from "@/lib/cn";

export type BuildItem = { tiles: string[]; why: string }; // tiles in the correct order

function shuffle<T>(arr: T[], seed: number) {
  const a = arr.map((v, i) => ({ v, k: Math.sin(seed * 9301 + i * 49297) }));
  a.sort((x, y) => x.k - y.k);
  const out = a.map((x) => x.v);
  // never start already solved
  return out.every((v, i) => v === arr[i]) ? [...out.slice(1), out[0]] : out;
}

export function SentenceBuilder({
  id,
  title = "Build the sentence",
  instructions = "Tap the pieces in the right order. Tap a placed piece to send it back.",
  items,
}: {
  id: string;
  title?: string;
  instructions?: string;
  items: BuildItem[];
}) {
  const record = useRecord(id);
  const [step, setStep] = useState(0);
  const [built, setBuilt] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const finished = step >= items.length;
  const item = items[Math.min(step, items.length - 1)];
  const order = useMemo(() => shuffle(item.tiles.map((_, i) => i), step + 3), [item, step]);
  const right = built.length === item.tiles.length && built.every((t, i) => item.tiles[t] === item.tiles[i]);

  function check() {
    setChecked(true);
    if (right) setScore((s) => s + 1);
  }
  function next() {
    if (step + 1 >= items.length) record({ correct: score, total: items.length, done: true });
    setStep((s) => s + 1);
    setBuilt([]);
    setChecked(false);
  }
  function reset() {
    setStep(0);
    setBuilt([]);
    setChecked(false);
    setScore(0);
  }

  return (
    <Activity title={title} instructions={instructions}>
      {finished ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Score correct={score} total={items.length} />
          <ResetButton onClick={reset} />
        </div>
      ) : (
        <LayoutGroup id={`${id}-${step}`}>
          <div
            className={cn(
              "flex min-h-[64px] flex-wrap items-center gap-2 rounded-xl border-2 border-dashed p-3 transition-colors",
              checked ? (right ? "border-good bg-good-soft" : "border-bad bg-bad-soft") : "border-line-strong",
            )}
            aria-label="Your sentence"
          >
            {built.length === 0 && <span className="px-1 text-[15px] text-ink-3">Your sentence appears here.</span>}
            {built.map((t) => (
              <Tile key={t} layoutId={`${id}-${step}-${t}`} text={item.tiles[t]} disabled={checked} onClick={() => setBuilt((b) => b.filter((x) => x !== t))} placed />
            ))}
          </div>
          <div className="mt-4 flex min-h-12 flex-wrap gap-2">
            {order
              .filter((t) => !built.includes(t))
              .map((t) => (
                <Tile key={t} layoutId={`${id}-${step}-${t}`} text={item.tiles[t]} disabled={checked} onClick={() => setBuilt((b) => [...b, t])} />
              ))}
          </div>

          {checked && !right && (
            <p className="mt-4 text-[16px] text-ink-2">
              Correct order: <span className="font-semibold text-good">{item.tiles.join(" ")}</span>
            </p>
          )}
          <Feedback show={checked} correct={right}>
            {item.why}
          </Feedback>

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-sm text-ink-3 tabular">
              {step + 1}/{items.length}
            </span>
            {checked ? (
              <PrimaryButton onClick={next}>
                {step + 1 < items.length ? "Next" : "See score"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={check} disabled={built.length !== item.tiles.length}>
                Check
              </PrimaryButton>
            )}
          </div>
        </LayoutGroup>
      )}
    </Activity>
  );
}

function Tile({
  text,
  layoutId,
  onClick,
  disabled,
  placed,
}: {
  text: string;
  layoutId: string;
  onClick: () => void;
  disabled: boolean;
  placed?: boolean;
}) {
  return (
    <motion.button
      layout
      layoutId={layoutId}
      transition={{ type: "spring", stiffness: 520, damping: 38 }}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "min-h-11 rounded-lg border px-3.5 text-[16px] font-medium shadow-[0_1px_0_rgb(20_22_27/0.06)] transition-colors",
        placed ? "border-ink bg-ink text-white" : "border-line-strong bg-white text-ink hover:border-ink-3",
        disabled && "cursor-default",
      )}
    >
      {text}
    </motion.button>
  );
}
