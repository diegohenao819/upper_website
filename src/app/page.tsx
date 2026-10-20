import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroBadge } from "@/components/home/HeroBadge";

export default function Home() {
  return (
    <section className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:py-16">
      <div className="order-2 lg:order-1">
        <h1 className="max-w-[12ch] text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-ink text-balance">
          Learn English by doing it.
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2 text-pretty sm:text-xl">
          Short explanations, then activities you can touch: choose, drag, build and write. Every answer tells you
          right away what you got right, and why.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/topics"
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Explore topics
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <HeroBadge />
      </div>
    </section>
  );
}
