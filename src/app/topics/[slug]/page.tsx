import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Download } from "lucide-react";
import { LessonShell } from "@/components/lesson/LessonShell";
import { allTopics, getTopic } from "@/content/topics";
import { lessonContent } from "@/content/lessons";

export const dynamicParams = false;

export function generateStaticParams() {
  return allTopics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/topics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default async function TopicPage({ params }: PageProps<"/topics/[slug]">) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();

  const load = lessonContent[slug];
  if (topic.status !== "published" || !load) return <ComingSoon slug={slug} />;

  const { default: Content } = await load();

  return (
    <LessonShell slug={slug}>
      <header className="pb-6 pt-12 sm:pt-16">
        <p className="text-sm font-medium text-ink-3">
          Period {topic.period.number}: {topic.period.theme}
        </p>
        <h1 className="mt-2 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
          {topic.title}
        </h1>
        <p className="mt-4 max-w-[52ch] text-xl leading-relaxed text-ink-2">{topic.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-3">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden="true" />
            {topic.week}
          </span>
          {topic.minutes && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              About {topic.minutes} minutes
            </span>
          )}
          {topic.guidePdf && (
            <a href={topic.guidePdf} download className="flex items-center gap-1.5 font-semibold text-accent hover:text-accent-hover">
              <Download className="size-4" aria-hidden="true" />
              Learning guide (PDF)
            </a>
          )}
        </div>
      </header>
      <div className="divide-y divide-line">
        <Content />
      </div>
    </LessonShell>
  );
}

function ComingSoon({ slug }: { slug: string }) {
  const topic = getTopic(slug)!;
  const next = allTopics.find((t) => t.status === "published");
  return (
    <div className="mx-auto max-w-2xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
      <Link href="/#topics" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-3 hover:text-ink">
        <ArrowLeft className="size-4" aria-hidden="true" />
        All topics
      </Link>
      <p className="mt-10 text-sm font-medium text-ink-3">
        Period {topic.period.number}: {topic.period.theme} | {topic.week}
      </p>
      <h1 className="mt-2 text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-tight tracking-[-0.04em] text-ink">
        {topic.title}
      </h1>
      <p className="mt-4 text-xl text-ink-2">{topic.summary}</p>
      <div className="mt-10 rounded-[20px] border border-line bg-surface p-6 sm:p-8">
        <p className="text-lg font-semibold text-ink">This entry is not published yet.</p>
        <p className="mt-2 text-[16px] text-ink-2">
          It will open here when we get to this topic. Check Kevra for this week&apos;s activities.
        </p>
        {next && (
          <Link
            href={`/topics/${next.slug}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Go to {next.title.toLowerCase()}
          </Link>
        )}
      </div>
    </div>
  );
}
