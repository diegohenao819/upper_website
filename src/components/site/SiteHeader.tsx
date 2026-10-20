import Link from "next/link";
import { course } from "@/content/topics";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3 rounded-md">
          <Mark />
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight text-ink">
              Upper-Intermediate English
            </span>
            <span className="text-xs text-ink-3">
              {course.code} | {course.semester}
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          <Link
            href="/#topics"
            className="rounded-lg px-3 py-2 font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
          >
            Topics
          </Link>
          <Link
            href="/topics/verb-patterns"
            className="hidden rounded-lg px-3 py-2 font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink sm:inline-flex"
          >
            This week
          </Link>
        </nav>
      </div>
    </header>
  );
}

// Course mark: two stacked bars for the two periods.
function Mark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
      <rect width="32" height="32" rx="9" fill="var(--ink)" />
      <rect x="8" y="10" width="16" height="4" rx="2" fill="#ffffff" />
      <rect x="8" y="18" width="10" height="4" rx="2" fill="var(--accent)" />
      <rect x="20" y="18" width="4" height="4" rx="2" fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
