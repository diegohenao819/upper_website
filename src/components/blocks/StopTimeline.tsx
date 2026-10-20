"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";

type Mode = "to" | "ing";

const COPY: Record<Mode, { sentence: [string, string, string]; rule: string; steps: [string, string] }> = {
  to: {
    sentence: ["I stopped ", "to help", " her."],
    rule: "TO: verb 2 happens AFTER verb 1.",
    steps: ["1. I was walking, and I stopped", "2. Then I helped her"],
  },
  ing: {
    sentence: ["I stopped ", "helping", " her."],
    rule: "-ING: verb 2 was happening BEFORE verb 1.",
    steps: ["1. I helped her for a long time", "2. Then I stopped. No more helping."],
  },
};

const ease = [0.16, 1, 0.3, 1] as const;

export function StopTimeline() {
  const [mode, setMode] = useState<Mode>("to");
  const c = COPY[mode];

  return (
    <div className="rounded-xl border border-line bg-white p-5 sm:p-7">
      <div role="tablist" aria-label="Compare" className="inline-flex rounded-xl bg-surface p-1">
        {(["to", "ing"] as Mode[]).map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "relative rounded-lg px-4 py-2 text-[15px] font-semibold transition-colors",
              mode === m ? "text-ink" : "text-ink-3 hover:text-ink",
            )}
          >
            {mode === m && (
              <motion.span layoutId="stop-tab" className="absolute inset-0 rounded-lg bg-white ring-1 ring-line-strong" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
            )}
            <span className="relative">{m === "to" ? "stopped + TO" : "stopped + -ING"}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <p className="mt-6 text-[clamp(1.5rem,3.4vw,2.1rem)] font-semibold tracking-[-0.02em] text-ink">
            {c.sentence[0]}
            <span className="rounded-md px-1" style={{ color: "var(--p6)", backgroundColor: "var(--p6-soft)" }}>
              {c.sentence[1]}
            </span>
            {c.sentence[2]}
          </p>
          <p className="mt-2 text-[15px] font-medium text-ink-2">{c.rule}</p>

          {/* the timeline */}
          <div className="relative mt-8 h-16" aria-hidden="true">
            <div className="absolute left-0 right-3 top-1/2 h-0.5 -translate-y-1/2 bg-line-strong" />
            <div className="absolute right-0 top-1/2 size-0 -translate-y-1/2 border-y-[6px] border-l-[10px] border-y-transparent border-l-line-strong" />

            {/* before the stop */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease }}
              style={{ originX: 0 }}
              className={cn(
                "absolute left-[1%] top-1/2 h-9 w-[37%] -translate-y-1/2 rounded-lg",
                mode === "ing" ? "bg-[var(--p6)]" : "bg-surface-2",
              )}
            />
            {/* the stop sign */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 18 }}
              className="absolute left-[47.5%] top-1/2 size-12 -translate-x-1/2 -translate-y-1/2"
            >
              <svg viewBox="0 0 48 48" className="size-full">
                <path d="M15 2h18l13 13v18L33 46H15L2 33V15z" fill="var(--ink)" />
                <path d="M15.8 4h16.4L44 15.8v16.4L32.2 44H15.8L4 32.2V15.8z" fill="none" stroke="#fff" strokeWidth="1.5" />
                <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="inherit">
                  STOP
                </text>
              </svg>
            </motion.div>
            {/* after the stop */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.6, ease }}
              style={{ originX: 0 }}
              className={cn(
                "absolute left-[57%] top-1/2 h-9 w-[37%] -translate-y-1/2 rounded-lg",
                mode === "to" ? "bg-[var(--p6)]" : "border-2 border-dashed border-line-strong bg-white",
              )}
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-ink-2">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              {c.steps[0]}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-right sm:text-left">
              {c.steps[1]}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
