import type { Metadata } from "next";
import { TopicCard } from "@/components/site/TopicCard";
import { publishedTopics } from "@/content/topics";

export const metadata: Metadata = {
  title: "Topics",
  description: "Choose a topic and learn it by doing, with instant feedback.",
};

export default function TopicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-12 sm:px-8 sm:pt-20">
      <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">Topics</h1>
      <p className="mt-4 max-w-[52ch] text-xl leading-relaxed text-ink-2 text-pretty">
        Choose a topic to start. New topics appear here as the course goes on.
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {publishedTopics.map((t) => (
          <TopicCard key={t.slug} topic={t} />
        ))}
      </div>
    </div>
  );
}
