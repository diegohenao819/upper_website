"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type Option = {
  verb1: string;
  verb2: string[]; // more than one = both forms are correct
  pattern: 1 | 2 | 3 | 4 | 5;
  label: string;
};

const OPTIONS: Option[] = [
  { verb1: "enjoy", verb2: ["going"], pattern: 1, label: "verb + -ING" },
  { verb1: "decided", verb2: ["to go"], pattern: 2, label: "verb + TO + verb" },
  { verb1: "told me", verb2: ["to go"], pattern: 3, label: "verb + object + TO + verb" },
  { verb1: "made me", verb2: ["go"], pattern: 4, label: "verb + object + base verb" },
  { verb1: "like", verb2: ["going", "to go"], pattern: 5, label: "-ING or TO, same meaning" },
];

const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;

export function PatternMorph({
  autoplay = false,
  size = "hero",
}: {
  autoplay?: boolean;
  size?: "hero" | "display";
}) {
  const [index, setIndex] = useState(0);
  const [alt, setAlt] = useState(0);
  const [playing, setPlaying] = useState(autoplay);
  const reduce = useReducedMotion();
  const stopped = useRef(false);
  const option = OPTIONS[index];
  const verb2 = option.verb2[alt % option.verb2.length];

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setAlt(0);
      setIndex((i) => (i + 1) % OPTIONS.length);
    }, 2800);
    return () => clearInterval(t);
  }, [playing]);

  // "like" shows both correct forms, one after the other.
  useEffect(() => {
    if (option.verb2.length < 2) return;
    const t = setInterval(() => setAlt((a) => a + 1), 1300);
    return () => clearInterval(t);
  }, [option]);

  function choose(i: number) {
    stopped.current = true;
    setPlaying(false);
    setAlt(0);
    setIndex(i);
  }

  const word = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 18, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -18, filter: "blur(6px)" },
      };

  return (
    <div
      onPointerEnter={() => setPlaying(false)}
      onPointerLeave={() => !stopped.current && autoplay && setPlaying(true)}
    >
      <div
        role="radiogroup"
        aria-label="Choose verb 1"
        className="mb-6 flex flex-wrap gap-2"
      >
        {OPTIONS.map((o, i) => (
          <button
            key={o.verb1}
            type="button"
            role="radio"
            aria-checked={i === index}
            onClick={() => choose(i)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
              i === index
                ? "border-ink bg-ink text-white"
                : "border-line-strong bg-white text-ink-2 hover:border-ink-3 hover:text-ink",
            )}
          >
            {o.verb1}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <p
          aria-live="polite"
          className={cn(
            "flex flex-wrap items-baseline gap-x-[0.28em] font-semibold leading-[1.15] tracking-[-0.03em] text-ink",
            size === "hero" ? "text-[clamp(2rem,5vw,3.25rem)]" : "text-[clamp(2.25rem,6vw,4rem)]",
          )}
        >
          <motion.span layout transition={spring}>They</motion.span>
          <span className="relative inline-flex overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={option.verb1} {...word} transition={spring} className="inline-block">
                {option.verb1}
              </motion.span>
            </AnimatePresence>
          </span>
          <motion.span
            layout
            transition={spring}
            className="relative inline-flex overflow-hidden rounded-md px-[0.12em]"
            style={{ backgroundColor: `var(--p${option.pattern}-soft)` }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={verb2}
                {...word}
                transition={spring}
                className="inline-block"
                style={{ color: `var(--p${option.pattern})` }}
              >
                {verb2}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          <motion.span layout transition={spring}>
            out.
          </motion.span>
        </p>
      </LayoutGroup>

      <div className="mt-5 flex min-h-7 items-center gap-2.5 text-sm">
        <span
          className="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-xs font-semibold text-white tabular"
          style={{ backgroundColor: `var(--p${option.pattern})` }}
        >
          {option.pattern}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={option.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.2 }}
            className="font-medium text-ink-2"
          >
            Pattern {option.pattern}: {option.label}
            {option.verb2.length > 1 && <span className="text-ink-3"> (both are correct)</span>}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
