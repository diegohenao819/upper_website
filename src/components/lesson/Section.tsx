"use client";

import { useEffect, useRef } from "react";
import { recordPlace } from "@/lib/progress";
import { lessonMeta } from "@/content/lessons/meta";
import { useLesson } from "./LessonContext";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  title?: string;
  pattern?: 1 | 2 | 3 | 4 | 5 | 6;
  formula?: string;
  children: React.ReactNode;
};

export function Section({ id, title, pattern, formula, children }: Props) {
  const slug = useLesson();
  const ref = useRef<HTMLElement>(null);

  // Remember the last section the student reached (the "flag").
  useEffect(() => {
    const el = ref.current;
    if (!el || !slug) return;
    const label = lessonMeta[slug]?.sections.find((s) => s.id === id)?.title ?? title ?? id;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) recordPlace(slug, { id, label, at: Date.now() });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, slug, title]);

  return (
    <section ref={ref} id={id} aria-labelledby={title ? `${id}-title` : undefined} className="scroll-mt-28 py-14 first:pt-4 sm:py-16">
      {title && (
        <header className="mb-8">
          {pattern ? (
            <div className="flex items-start gap-4">
              <span
                className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl text-lg font-semibold text-white tabular"
                style={{ backgroundColor: `var(--p${pattern})` }}
                aria-hidden="true"
              >
                {pattern}
              </span>
              <div>
                <h2 id={`${id}-title`} className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-ink text-balance">
                  <span className="sr-only">Pattern {pattern}: </span>
                  {title}
                </h2>
                {formula && <Formula pattern={pattern} text={formula} />}
              </div>
            </div>
          ) : (
            <h2 id={`${id}-title`} className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-ink text-balance">
              {title}
            </h2>
          )}
        </header>
      )}
      <div className="space-y-8">{children}</div>
    </section>
  );
}

// "verb 1 + [to + verb]": the part in brackets takes the pattern color.
function Formula({ pattern, text }: { pattern: number; text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[17px] text-ink-2">
      {parts.map((p, i) =>
        p.startsWith("[") ? (
          <span
            key={i}
            className={cn("rounded-md px-2 py-0.5 font-semibold")}
            style={{ color: `var(--p${pattern})`, backgroundColor: `var(--p${pattern}-soft)` }}
          >
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </p>
  );
}
