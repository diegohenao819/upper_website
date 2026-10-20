import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-20 sm:px-8 sm:pt-28">
      <h1 className="text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-tight tracking-[-0.04em] text-ink">
        This page is not here.
      </h1>
      <p className="mt-4 text-xl text-ink-2">The link may be old, or this topic is not open yet.</p>
      <Link
        href="/topics"
        className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        See all topics
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
