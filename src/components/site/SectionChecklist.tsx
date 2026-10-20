"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { lessonMeta } from "@/content/lessons/meta";
import { useProgress } from "@/lib/progress";

// The lesson's table of contents, with the student's place marked.
export function SectionChecklist({ slug }: { slug: string }) {
  const state = useProgress();
  const meta = lessonMeta[slug];
  if (!meta) return null;
  const last = state.lessons[slug]?.lastSection?.id;
  const lastIndex = meta.sections.findIndex((s) => s.id === last);

  return (
    <div>
      <p className="text-sm font-semibold text-ink-3">Inside the lesson</p>
      <ol className="mt-4 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {meta.sections.map((s, i) => {
          const passed = lastIndex >= 0 && i < lastIndex;
          const here = i === lastIndex;
          return (
            <li key={s.id}>
              <Link
                href={`/topics/${slug}#${s.id}`}
                className="group flex items-center gap-3 border-b border-line py-2.5 text-[15px] text-ink-2 transition-colors hover:text-ink"
              >
                <span
                  className={
                    "flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] tabular " +
                    (passed
                      ? "border-good bg-good text-white"
                      : here
                        ? "border-accent bg-accent text-white"
                        : "border-line-strong text-ink-3")
                  }
                >
                  {passed ? <Check className="size-3" strokeWidth={3} aria-label="seen" /> : here ? <span className="size-1.5 rounded-full bg-white" /> : null}
                </span>
                <span className={here ? "font-semibold text-ink" : ""}>{s.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
