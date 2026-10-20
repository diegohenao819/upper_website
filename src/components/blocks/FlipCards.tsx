"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/cn";

export type FlipRow = {
  verb: string;
  to: { example: string; meaning: string };
  ing: { example: string; meaning: string };
};

// Examples use [brackets] for the verb pattern part.
function Example({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) =>
        p.startsWith("[") ? (
          <span key={i} className="font-semibold" style={{ color: "var(--p6)" }}>
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function FlipCards({ rows }: { rows: FlipRow[] }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const all = rows.length * 2;
  const count = Object.values(flipped).filter(Boolean).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-ink-3">Read the sentence, guess the meaning, then tap the card.</p>
        <button
          type="button"
          onClick={() => {
            const show = count < all;
            setFlipped(Object.fromEntries(rows.flatMap((r) => [[`${r.verb}-to`, show], [`${r.verb}-ing`, show]])));
          }}
          className="text-sm font-semibold text-accent hover:text-accent-hover"
        >
          {count < all ? "Show all meanings" : "Hide all meanings"}
        </button>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.verb} className="grid gap-3 sm:grid-cols-[110px_1fr_1fr] sm:items-stretch">
            <p className="pt-1 text-lg font-semibold text-ink sm:pt-5">{r.verb}</p>
            {(["to", "ing"] as const).map((k) => {
              const key = `${r.verb}-${k}`;
              return (
                <Card
                  key={key}
                  label={k === "to" ? `${r.verb} + TO` : `${r.verb} + -ING`}
                  front={<Example text={r[k].example} />}
                  back={r[k].meaning}
                  flipped={!!flipped[key]}
                  onFlip={() => setFlipped((f) => ({ ...f, [key]: !f[key] }))}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({
  label,
  front,
  back,
  flipped,
  onFlip,
}: {
  label: string;
  front: React.ReactNode;
  back: string;
  flipped: boolean;
  onFlip: () => void;
}) {
  const reduce = useReducedMotion();
  const face = "absolute inset-0 flex flex-col justify-between rounded-xl p-4 [backface-visibility:hidden]";
  return (
    <button
      type="button"
      onClick={onFlip}
      aria-pressed={flipped}
      aria-label={`${label}. ${flipped ? `Meaning: ${back}` : "Tap to see the meaning"}`}
      className="group relative h-[124px] w-full text-left [perspective:900px]"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={reduce ? {} : { rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <div className={cn(face, "border border-line bg-white transition-colors group-hover:border-line-strong", reduce && flipped && "invisible")}>
          <span className="text-xs font-semibold text-ink-3">{label}</span>
          <span className="text-[16px] leading-snug text-ink">{front}</span>
          <RotateCw className="absolute right-3.5 top-3.5 size-3.5 text-ink-3" aria-hidden="true" />
        </div>
        <div
          className={cn(face, "bg-[var(--p6-soft)]", !reduce && "[transform:rotateY(180deg)]", reduce && !flipped && "invisible")}
        >
          <span className="text-xs font-semibold" style={{ color: "var(--p6)" }}>
            Meaning
          </span>
          <span className="text-[16px] font-medium leading-snug text-ink">{back}</span>
        </div>
      </motion.div>
    </button>
  );
}
