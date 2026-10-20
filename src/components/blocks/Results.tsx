"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Download, RotateCcw } from "lucide-react";
import { lessonMeta } from "@/content/lessons/meta";
import { getTopic } from "@/content/topics";
import { lessonSummary, resetLesson, useProgress } from "@/lib/progress";
import { useLesson } from "@/components/lesson/LessonContext";

// End of a lesson: score per activity, the PDF guide, and what comes next.
export function Results() {
  const slug = useLesson();
  const state = useProgress();
  const meta = lessonMeta[slug];
  const topic = getTopic(slug);
  const s = lessonSummary(state, slug, meta.exercises.length);
  const results = state.lessons[slug]?.exercises ?? {};
  const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
  const allDone = s.done === s.exerciseCount;

  return (
    <div className="rounded-[20px] border border-line bg-white p-6 shadow-[var(--shadow-1)] sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-ink-3">
            {allDone ? "You finished every activity." : `${s.done} of ${s.exerciseCount} activities done.`}
          </p>
          <p className="mt-1 text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink tabular">
            {s.total ? `${pct}%` : "0%"}
            <span className="ml-2 text-lg font-medium tracking-normal text-ink-3">
              {s.correct}/{s.total} answers correct
            </span>
          </p>
        </div>
        {s.done > 0 && (
          <button
            type="button"
            onClick={() => resetLesson(slug)}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-ink-3 transition-colors hover:bg-surface hover:text-ink"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset my progress
          </button>
        )}
      </div>

      <ul className="mt-8 divide-y divide-line border-y border-line">
        {meta.sections
          .filter((sec) => sec.activities?.length)
          .flatMap((sec) => sec.activities!.map((a) => ({ a, sec })))
          .map(({ a, sec }) => {
            const r = results[a.id];
            const ratio = r ? r.correct / r.total : 0;
            return (
              <li key={a.id} className="flex items-center gap-4 py-3">
                <a href={`#${sec.id}`} className="min-w-0 flex-1 truncate text-[15px] text-ink-2 hover:text-ink">
                  {a.label}
                </a>
                <div className="hidden h-1.5 w-32 overflow-hidden rounded-full bg-surface-2 sm:block" aria-hidden="true">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: ratio === 1 ? "var(--good)" : "var(--accent)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${ratio * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className="w-16 text-right text-sm text-ink-3 tabular">{r ? `${r.correct}/${r.total}` : "Not yet"}</span>
              </li>
            );
          })}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        {topic?.guidePdf && (
          <a
            href={topic.guidePdf}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black"
          >
            <Download className="size-4" aria-hidden="true" />
            Download the learning guide (PDF)
          </a>
        )}
        <Link
          href="/#topics"
          className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink-3"
        >
          All topics
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-6 text-sm text-ink-3">
        This score is for your own practice and is saved only in this browser. Official activities and grades are in Kevra.
      </p>
    </div>
  );
}
