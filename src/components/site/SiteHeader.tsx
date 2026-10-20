import Image from "next/image";
import Link from "next/link";
import badge from "@/assets/brand/course-badge.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3 rounded-md">
          <Image src={badge} alt="" width={36} height={36} priority className="size-9 shrink-0" />
          <span className="text-[15px] font-semibold tracking-tight text-ink">Upper-Intermediate English</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          <Link
            href="/topics"
            className="rounded-lg px-3 py-2 font-medium text-ink-2 transition-colors hover:bg-surface hover:text-ink"
          >
            Topics
          </Link>
        </nav>
      </div>
    </header>
  );
}
