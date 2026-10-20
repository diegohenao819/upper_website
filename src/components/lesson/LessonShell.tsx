"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { LessonProvider } from "./LessonContext";
import { lessonMeta } from "@/content/lessons/meta";
import { lessonSummary, useProgress } from "@/lib/progress";
import { cn } from "@/lib/cn";

export function LessonShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const meta = lessonMeta[slug];
  const state = useProgress();
  const summary = lessonSummary(state, slug, meta.exercises.length);
  const active = useActiveSection(meta.sections.map((s) => s.id));
  const pct = Math.round(summary.ratio * 100);

  return (
    <LessonProvider slug={slug}>
      {/* progress strip, stays at the top of the screen while reading */}
      <div className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex h-11 max-w-6xl items-center gap-4 px-5 sm:px-8">
          <Link href="/topics" className="flex items-center gap-1.5 text-sm font-medium text-ink-3 hover:text-ink">
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Topics</span>
          </Link>
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"
            role="progressbar"
            aria-label="Activities completed"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-700 ease-[var(--ease-out)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-ink-3 tabular">
            {summary.done}/{summary.exerciseCount}
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Lesson sections" className="hidden lg:block">
          <ol className="sticky top-16 space-y-0.5 pt-14 text-sm">
            {meta.sections.map((s) => {
              const done = isSectionDone(s.activities, state.lessons[slug]?.exercises ?? {});
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "location" : undefined}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 transition-colors",
                      active === s.id ? "bg-surface font-semibold text-ink" : "text-ink-3 hover:text-ink",
                    )}
                  >
                    <span>{s.title}</span>
                    {done && <Check className="size-3.5 shrink-0 text-good" strokeWidth={3} aria-label="activity done" />}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
        <article className="min-w-0 pb-10">{children}</article>
      </div>
    </LessonProvider>
  );
}

function isSectionDone(activities: { id: string }[] | undefined, ex: Record<string, { done: boolean }>) {
  return !!activities?.length && activities.every((a) => ex[a.id]?.done);
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join("|")]);
  return active;
}
