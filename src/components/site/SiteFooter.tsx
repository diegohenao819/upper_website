import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>Upper-Intermediate English</p>
        <p className="flex flex-wrap items-center gap-x-1.5">
          Made with
          <Heart className="size-4 fill-[#e8325a] text-[#e8325a]" aria-label="love" />
          by <span className="font-medium text-ink-2">Diego Henao</span> (professor at UTP)
        </p>
      </div>
    </footer>
  );
}
