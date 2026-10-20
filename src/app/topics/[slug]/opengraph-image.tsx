import { notFound } from "next/navigation";
import { ogSize, renderOg } from "@/lib/og";
import { getTopic, publishedTopics } from "@/content/topics";

export const alt = "Interactive lesson, Upper-Intermediate English";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return publishedTopics.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  return renderOg({ title: topic.title, subtitle: topic.summary, label: "Interactive lesson" });
}
