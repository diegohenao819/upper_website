// Section and activity lists for each published lesson.
// Section ids must match the <Section id="..."> blocks in the lesson's MDX file;
// activity ids must match the `id` props of the practice blocks inside that section.

export type Activity = { id: string; label: string };
export type LessonSection = { id: string; title: string; activities?: Activity[] };

export type LessonMeta = {
  slug: string;
  sections: LessonSection[];
  exercises: string[];
};

function lesson(slug: string, sections: LessonSection[]): LessonMeta {
  return { slug, sections, exercises: sections.flatMap((s) => (s.activities ?? []).map((a) => a.id)) };
}

export const lessonMeta: Record<string, LessonMeta> = {
  "verb-patterns": lesson("verb-patterns", [
    { id: "idea", title: "The idea" },
    { id: "pattern-1", title: "1. Verb + -ING", activities: [{ id: "vp-check-1", label: "Quick check: verb + -ING" }] },
    { id: "pattern-2", title: "2. Verb + TO", activities: [{ id: "vp-check-2", label: "Quick check: verb + TO" }] },
    { id: "pattern-3", title: "3. Verb + object + TO", activities: [{ id: "vp-build-3", label: "Build the sentence" }] },
    { id: "pattern-4", title: "4. Verb + object + base verb", activities: [{ id: "vp-check-4", label: "Quick check: make and let" }] },
    { id: "pattern-5", title: "5. -ING or TO, same meaning", activities: [{ id: "vp-check-5", label: "Quick check: same meaning" }] },
    { id: "pattern-6", title: "6. -ING or TO, new meaning", activities: [{ id: "vp-check-6", label: "Quick check: new meaning" }] },
    { id: "mistakes", title: "Common mistakes", activities: [{ id: "vp-mistakes", label: "Find the mistake" }] },
    { id: "practice", title: "Practice", activities: [
        { id: "vp-sort", label: "-ING, TO or both?" },
        { id: "vp-text", label: "Human rights text" },
        { id: "vp-gaps", label: "Complete the sentences" },
      ] },
    { id: "finish", title: "Your results" },
  ]),
};
