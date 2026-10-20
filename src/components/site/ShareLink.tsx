"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { cn } from "@/lib/cn";

// Copies the direct link to a topic (or opens the phone's share sheet).
export function ShareLink({ path, title, className }: { path: string; title: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (touch && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // share sheet closed: fall back to copying
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-strong bg-white px-4 text-[15px] font-semibold text-ink transition-colors hover:border-ink-3",
        className,
      )}
    >
      {copied ? <Check className="size-4 text-good" strokeWidth={3} aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Link copied" : "Share link"}</span>
    </button>
  );
}
