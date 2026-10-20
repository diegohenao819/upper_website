"use client";

import Link from "next/link";
import { ArrowRight, Clock, Download, Flag } from "lucide-react";
import { useLessonSummary } from "./LessonProgress";
import { ShareLink } from "./ShareLink";
import type { Topic } from "@/content/topics";

export function TopicCard({ topic }: { topic: Topic }) {
  const s = useLessonSummary(topic.slug);
  const started = s.done > 0 || !!s.lastSection;
  const href = `/topics/${topic.slug}`;
  const pct = Math.round(s.ratio * 100);

  return (
    <article className="group/card flex flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-line-strong sm:p-8">
      {topic.teaser && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="mb-7 flex min-h-36 items-center rounded-xl bg-surface px-6 py-8 sm:px-8"
        >
          <span className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {topic.teaser.before}
            <span className="rounded-md bg-accent-soft px-1.5 text-accent-ink transition-colors duration-300 group-hover/card:bg-accent group-hover/card:text-white">
              {topic.teaser.focus}
            </span>
            {topic.teaser.after}
          </span>
        </Link>
      )}
      <div className="flex items-center gap-3 text-sm text-ink-3">
        <span className="rounded-md bg-surface px-2 py-0.5 font-medium text-ink-2">{topic.kind}</span>
        {topic.minutes && (
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden="true" />
            About {topic.minutes} minutes
          </span>
        )}
      </div>
      <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
        <Link href={href} className="rounded-md hover:text-accent-ink">
          {topic.title}
        </Link>
      </h2>
      <p className="mt-2 text-lg text-ink-2">{topic.summary}</p>

      <div className="mt-8">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink-3">{started ? "Your progress" : "Not started yet"}</span>
          <span className="text-ink-3 tabular">
            {s.done}/{s.exerciseCount} activities
          </span>
        </div>
        <div
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2"
          role="progressbar"
          aria-label={`${topic.title} progress`}
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-accent transition-[width] duration-700" style={{ width: `${pct}%` }} />
        </div>
        {s.lastSection && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-3">
            <Flag className="size-3.5 text-accent" aria-hidden="true" />
            You stopped at <span className="font-medium text-ink-2">{s.lastSection.label}</span>
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href={s.lastSection ? `${href}#${s.lastSection.id}` : href}
          className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          {started ? "Continue" : "Start"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <ShareLink path={href} title={`${topic.title} | Upper-Intermediate English`} />
        {topic.guidePdf && (
          <a
            href={topic.guidePdf}
            download
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-[15px] font-semibold text-ink-2 transition-colors hover:bg-surface hover:text-ink"
          >
            <Download className="size-4" aria-hidden="true" />
            PDF guide
          </a>
        )}
      </div>
    </article>
  );
}
