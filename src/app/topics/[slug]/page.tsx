import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Clock, Download } from "lucide-react";
import { LessonShell } from "@/components/lesson/LessonShell";
import { getTopic, publishedTopics } from "@/content/topics";
import { lessonContent } from "@/content/lessons";

// Only published topics get a page, so every shared link points to a real lesson.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedTopics.filter((t) => lessonContent[t.slug]).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/topics/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.summary,
    alternates: { canonical: `/topics/${slug}` },
    openGraph: {
      siteName: "Upper-Intermediate English",
      type: "website",
      title: `${topic.title} | Upper-Intermediate English`,
      description: topic.summary,
      url: `/topics/${slug}`,
    },
  };
}

export default async function TopicPage({ params }: PageProps<"/topics/[slug]">) {
  const { slug } = await params;
  const topic = getTopic(slug);
  const load = lessonContent[slug];
  if (!topic || !load) notFound();

  const { default: Content } = await load();

  return (
    <LessonShell slug={slug}>
      <header className="pb-2 pt-10 sm:pb-6 sm:pt-16">
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
          {topic.title}
        </h1>
        <p className="mt-4 max-w-[52ch] text-xl leading-relaxed text-ink-2">{topic.summary}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-3">
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
