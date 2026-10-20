"use client";

import { lessonSummary, useProgress } from "@/lib/progress";
import { lessonMeta } from "@/content/lessons/meta";

export function useLessonSummary(slug: string) {
  const state = useProgress();
  const meta = lessonMeta[slug];
  return lessonSummary(state, slug, meta?.exercises.length ?? 0);
}
