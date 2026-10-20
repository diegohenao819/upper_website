"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Lightbulb, Search, TriangleAlert } from "lucide-react";
import { findVerb, patterns, type PatternId } from "@/content/verb-patterns/data";
import { cn } from "@/lib/cn";

// Example sentences. [brackets] = the verb pattern part, **double stars** = the object.
export function Examples({ pattern, items }: { pattern: PatternId; items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((s) => (
        <li key={s} className="flex gap-3 text-[18px] leading-relaxed text-ink">
          <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full" style={{ backgroundColor: `var(--p${pattern})` }} aria-hidden="true" />
          <span>
            <Marked text={s} pattern={pattern} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Marked({ text, pattern }: { text: string; pattern: PatternId }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]|\*\*[^*]+\*\*)/g).filter(Boolean).map((p, i) => {
        if (p.startsWith("["))
          return (
            <span key={i} className="rounded px-0.5 font-semibold" style={{ color: `var(--p${pattern})`, backgroundColor: `var(--p${pattern}-soft)` }}>
              {p.slice(1, -1)}
            </span>
          );
        if (p.startsWith("**"))
          return (
            <span key={i} className="font-semibold underline decoration-ink-3 decoration-dotted underline-offset-4">
              {p.slice(2, -2)}
            </span>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

// The verbs of one pattern, collapsed by default on phones.
export function VerbList({ pattern }: { pattern: PatternId }) {
  const p = patterns.find((x) => x.id === pattern)!;
  const [open, setOpen] = useState(p.verbs.length <= 10);
  const shown = open ? p.verbs : p.verbs.slice(0, 10);
  return (
    <div className="rounded-xl bg-surface p-4 sm:p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-ink">
          Verbs to learn <span className="font-normal text-ink-3 tabular">({p.verbs.length})</span>
        </p>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        <AnimatePresence initial={false}>
          {shown.map((v) => (
            <motion.li
              key={v}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="rounded-md border border-line bg-white px-2.5 py-1 text-[15px] text-ink"
            >
              {v}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {p.verbs.length > 10 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
        >
          {open ? "Show fewer" : `Show all ${p.verbs.length}`}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export function Tip({ children, kind = "tip", title }: { children: React.ReactNode; kind?: "tip" | "careful"; title?: string }) {
  const Icon = kind === "tip" ? Lightbulb : TriangleAlert;
  return (
    <div className={cn("flex gap-3.5 rounded-xl px-4 py-4 sm:px-5", "bg-surface")}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", "text-ink")} aria-hidden="true" />
      <div className="text-[16px] leading-relaxed text-ink-2 [&_strong]:text-ink">
        {title && <p className="mb-0.5 font-semibold text-ink">{title}</p>}
        {children}
      </div>
    </div>
  );
}

// Spanish vs English, side by side.
export function Contrast({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="grid grid-cols-2 bg-surface text-sm font-semibold text-ink-3">
        <p className="px-4 py-2.5">Español</p>
        <p className="border-l border-line px-4 py-2.5">English</p>
      </div>
      {rows.map(([es, en]) => (
        <div key={es} className="grid grid-cols-2 border-t border-line text-[17px]">
          <p className="px-4 py-3 text-ink-2" lang="es">
            {es.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) =>
              p.startsWith("[") ? (
                <span key={i} className="font-semibold text-ink">
                  {p.slice(1, -1)}
                </span>
              ) : (
                <span key={i}>{p}</span>
              ),
            )}
          </p>
          <p className="border-l border-line px-4 py-3 text-ink">
            <Marked text={en} pattern={1} />
          </p>
        </div>
      ))}
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  credit,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  credit?: string;
  width: number;
  height: number;
}) {
  return (
    <figure>
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 768px) 200px, 100vw" className="w-full rounded-xl object-cover" />
      <figcaption className="mt-2 text-[13px] leading-snug text-ink-3">
        {caption}
        {credit && <span className="block text-[12px]">{credit}</span>}
      </figcaption>
    </figure>
  );
}

// Type any verb, see its pattern.
export function VerbFinder() {
  const [q, setQ] = useState("");
  const results = findVerb(q);
  return (
    <div className="rounded-xl border border-line bg-white p-5 sm:p-7">
      <h3 className="text-lg font-semibold tracking-tight text-ink">Verb finder</h3>
      <p className="mt-1 text-[15px] text-ink-3">Not sure about a verb? Type it and see its pattern.</p>
      <label className="relative mt-4 block">
        <span className="sr-only">Search a verb</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-ink-3" aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. avoid, decide, let"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="h-12 w-full rounded-xl border-2 border-line-strong bg-white pl-10 pr-4 text-[16px] outline-none transition-colors placeholder:text-ink-3/70 focus:border-accent"
        />
      </label>
      <div aria-live="polite" className="mt-4 min-h-6">
        {q.trim() && results.length === 0 && (
          <p className="text-[15px] text-ink-3">That verb is not on the course lists. Check the spelling, or ask your teacher.</p>
        )}
        <ul className="space-y-2">
          {results.map(({ pattern, matches }) => (
            <motion.li
              key={pattern.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-xl bg-surface px-4 py-3"
            >
              <span
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold text-white tabular"
                style={{ backgroundColor: `var(--p${pattern.id})` }}
              >
                {pattern.id}
              </span>
              <div className="text-[15px]">
                <p className="font-semibold text-ink">
                  {matches.join(", ")}: <span style={{ color: `var(--p${pattern.id})` }}>{pattern.name}</span>
                </p>
                <p className="text-ink-3">{pattern.example}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
