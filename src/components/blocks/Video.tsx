"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// YouTube video. Shows the thumbnail first and loads YouTube only when the student presses play.
export function Video({ id, title, credit }: { id: string; title: string; credit?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-line bg-ink">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_8px_24px_rgb(20_22_27/0.3)] transition-transform duration-300 group-hover:scale-105 sm:size-20">
              <Play className="ml-1 size-7 fill-ink text-ink sm:size-8" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-[15px] text-ink-3">
        <span className="font-medium text-ink-2">{title}</span>
        {credit && <> | {credit}, YouTube</>}
      </figcaption>
    </figure>
  );
}
