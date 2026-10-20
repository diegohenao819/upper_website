"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, CircleX, RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

// The frame every practice block sits in.
export function Activity({
  title,
  instructions,
  children,
  className,
}: {
  title: string;
  instructions?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-line bg-white p-5 sm:p-7", className)}>
      <div className="mb-5">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
        {instructions && <p className="mt-1 text-[15px] text-ink-3">{instructions}</p>}
      </div>
      {children}
    </div>
  );
}

export function Feedback({
  show,
  correct,
  title,
  children,
}: {
  show: boolean;
  correct: boolean;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
          role="status"
        >
          <div
            className={cn(
              "mt-4 flex gap-3 rounded-xl px-4 py-3.5 text-[15px] leading-relaxed",
              correct ? "bg-good-soft text-[#0b5a3a]" : "bg-bad-soft text-[#8f1d27]",
            )}
          >
            {correct ? (
              <CircleCheck className="mt-0.5 size-5 shrink-0 text-good" aria-hidden="true" />
            ) : (
              <CircleX className="mt-0.5 size-5 shrink-0 text-bad" aria-hidden="true" />
            )}
            <div>
              <p className="font-semibold">{title ?? (correct ? "Correct!" : "Not quite.")}</p>
              {children && <div className="mt-0.5">{children}</div>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PrimaryButton({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-semibold text-white transition-[background-color,opacity,transform] duration-200 hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-ink-3"
    >
      {children}
    </button>
  );
}

export function ResetButton({ onClick, label = "Try again" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-[15px] font-semibold text-ink-2 transition-colors hover:bg-surface hover:text-ink"
    >
      <RotateCcw className="size-4" aria-hidden="true" />
      {label}
    </button>
  );
}

export function Score({ correct, total }: { correct: number; total: number }) {
  const all = correct === total;
  return (
    <p className="text-[15px] font-semibold text-ink tabular" role="status">
      <span className={all ? "text-good" : "text-ink"}>
        {correct}/{total}
      </span>{" "}
      <span className="font-normal text-ink-3">{all ? "All correct. Well done!" : "correct"}</span>
    </p>
  );
}

export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/[.!?,;:]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
