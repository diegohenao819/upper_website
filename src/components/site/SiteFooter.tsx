import { course } from "@/content/topics";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {course.name} ({course.code}), {course.program}, {course.university}.
        </p>
        <p>Your progress is saved in this browser only. No account needed.</p>
      </div>
    </footer>
  );
}
