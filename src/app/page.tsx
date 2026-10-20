import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Download, Lock } from "lucide-react";
import { PatternMorph } from "@/components/blocks/PatternMorph";
import { ContinueButton, ProgressBar } from "@/components/site/LessonProgress";
import { SectionChecklist } from "@/components/site/SectionChecklist";
import { course, getTopic, periods, type Topic } from "@/content/topics";

export default function Home() {
  const current = getTopic("verb-patterns")!;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-24">
        <div>
          <h1 className="max-w-[14ch] text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink text-balance">
            Learn English by doing it.
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-2 text-pretty">
            Interactive lessons for {course.name} ({course.code}). Each topic of the course,
            explained from zero, with activities that tell you right away what you got right and why.
          </p>
          <div className="mt-9">
            <ContinueButton slug={current.slug} title={current.title} />
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-6 sm:p-9">
          <p className="mb-5 text-sm font-medium text-ink-3">
            This week: change verb 1 and watch verb 2.
          </p>
          <PatternMorph autoplay />
        </div>
      </section>

      {/* This week */}
      <section aria-labelledby="this-week" className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <h2 id="this-week" className="text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                {current.title}
              </h2>
              <p className="mt-3 max-w-[44ch] text-lg text-ink-2">{current.summary}</p>
              <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-3">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  <dt className="sr-only">This week</dt>
                  <dd>This week, {current.week}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Type</dt>
                  <dd>{current.kind}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden="true" />
                  <dt className="sr-only">Time</dt>
                  <dd>About {current.minutes} minutes</dd>
                </div>
                <div>
                  <dt className="sr-only">Period</dt>
                  <dd>Period {current.period.number}: {current.period.theme}</dd>
                </div>
              </dl>
              <ProgressBar slug={current.slug} className="mt-8 max-w-md" />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/topics/${current.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Open the lesson
                </Link>
                {current.guidePdf && (
                  <a
                    href={current.guidePdf}
                    className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-white px-5 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink-3"
                    download
                  >
                    <Download className="size-4" aria-hidden="true" />
                    Learning guide (PDF)
                  </a>
                )}
              </div>
            </div>
            <SectionChecklist slug={current.slug} />
          </div>
        </div>
      </section>

      {/* Semester */}
      <section id="topics" aria-labelledby="semester" className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
        <div className="max-w-2xl">
          <h2 id="semester" className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-ink">
            The semester
          </h2>
          <p className="mt-3 text-lg text-ink-2">
            Every language topic of the course, in order. New entries open as the course advances.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
          {periods.map((period) => (
            <div key={period.id}>
              <div className="flex items-baseline justify-between border-b border-ink pb-3">
                <h3 className="text-xl font-semibold tracking-tight text-ink">
                  Period {period.number}: {period.theme}
                </h3>
                <span className="text-sm text-ink-3 tabular">{period.weight} of the grade</span>
              </div>
              <ol className="divide-y divide-line">
                {period.topics.map((t) => (
                  <TopicRow key={t.slug} topic={t} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function TopicRow({ topic }: { topic: Topic }) {
  const open = topic.status === "published";
  const body = (
    <>
      <span className="hidden w-[7.5rem] shrink-0 pt-0.5 text-sm text-ink-3 tabular sm:block">{topic.week}</span>
      <span className="min-w-0 flex-1">
        <span className="mb-0.5 block text-[13px] text-ink-3 tabular sm:hidden">{topic.week}</span>
        <span className={open ? "block font-semibold text-ink" : "block font-medium text-ink-2"}>
          {topic.title}
        </span>
        <span className="mt-0.5 block text-sm text-ink-3">{topic.kind}</span>
      </span>
      {open ? (
        <span className="flex shrink-0 items-center gap-1 pt-0.5 text-sm font-semibold text-accent">
          Open
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      ) : (
        <span className="flex shrink-0 items-center gap-1.5 pt-0.5 text-sm text-ink-3">
          <Lock className="size-3.5" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Coming soon</span>
        </span>
      )}
    </>
  );

  return (
    <li>
      <Link
        href={`/topics/${topic.slug}`}
        className={
          "group -mx-3 flex items-start gap-4 rounded-lg px-3 py-4 transition-colors " +
          (open ? "hover:bg-accent-soft" : "hover:bg-surface")
        }
      >
        {body}
      </Link>
    </li>
  );
}
