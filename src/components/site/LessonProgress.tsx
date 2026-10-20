"use client";

import Link from "next/link";
import { ArrowRight, Flag } from "lucide-react";
import { lessonSummary, useProgress } from "@/lib/progress";
import { lessonMeta } from "@/content/lessons/meta";
import { cn } from "@/lib/cn";

export function useLessonSummary(slug: string) {
  const state = useProgress();
  const meta = lessonMeta[slug];
  return lessonSummary(state, slug, meta?.exercises.length ?? 0);
}

export function ProgressBar({ slug, className }: { slug: string; className?: string }) {
  const s = useLessonSummary(slug);
  const pct = Math.round(s.ratio * 100);
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Lesson progress"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-700 ease-[var(--ease-out)]"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-24 text-right text-xs text-ink-3 tabular">
        {s.done}/{s.exerciseCount} activities
      </span>
    </div>
  );
}

export function ContinueButton({ slug, title }: { slug: string; title: string }) {
  const s = useLessonSummary(slug);
  const started = s.done > 0 || !!s.lastSection;
  const href = s.lastSection ? `/topics/${slug}#${s.lastSection.id}` : `/topics/${slug}`;
  return (
    <div className="flex flex-col items-start gap-3">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        {started ? `Continue ${title.toLowerCase()}` : `Start ${title.toLowerCase()}`}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
      {s.lastSection && (
        <p className="flex items-center gap-1.5 text-sm text-ink-3">
          <Flag className="size-3.5 text-accent" aria-hidden="true" />
          You stopped at <span className="font-medium text-ink-2">{s.lastSection.label}</span>
        </p>
      )}
    </div>
  );
}
