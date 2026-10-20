"use client";

import { createContext, useContext } from "react";
import { recordResult, type Result } from "@/lib/progress";

const LessonContext = createContext<string>("");

export function LessonProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  return <LessonContext.Provider value={slug}>{children}</LessonContext.Provider>;
}

export function useLesson() {
  return useContext(LessonContext);
}

// Practice blocks call this when the student checks their answers.
export function useRecord(id: string) {
  const slug = useLesson();
  return (r: Result) => {
    if (slug) recordResult(slug, id, r);
  };
}
