'use client';

import type { ImageItem } from '@/lib/images';
import { ChevronIcon, EventPoster, PhotoIcon } from './shared';

interface PastEventCardProps {
  cover: ImageItem;
  title: string;
  name: string;
  photos: ImageItem[];
  photosLabel: string;
  onOpen: () => void;
}

/**
 * Compact past-event entry: a list row on phones (cover, title, photo count,
 * chevron — like a native list cell) and a vertical card from md up. Tapping
 * opens the event's detail sheet with its story and full gallery.
 */
export function PastEventCard({ cover, title, name, photos, photosLabel, onOpen }: PastEventCardProps) {
  const preview = photos.filter((p) => p.id !== cover.id).slice(0, 3);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="pressable group flex h-full w-full items-center gap-4 overflow-hidden rounded-[1.75rem] p-3 text-start glass-panel md:flex-col md:items-stretch md:gap-0 md:p-0 [@media(hover:hover)]:hover:shadow-glass-lg"
    >
      {/* Cover */}
      <span className="relative block aspect-square w-24 shrink-0 overflow-hidden rounded-2xl xs:w-28 md:aspect-[4/3] md:w-full md:rounded-none">
        <span className="absolute inset-0 transition-transform duration-700 ease-out-expo [@media(hover:hover)]:group-hover:scale-105">
          <EventPoster poster={cover} alt={title} />
        </span>
      </span>

      {/* Text */}
      <span className="flex min-w-0 flex-1 flex-col gap-1 md:p-5">
        <span className="truncate text-lg font-black tracking-tight md:text-xl">{title}</span>
        <span className="line-clamp-2 text-xs font-medium uppercase tracking-wider text-ink-400 md:text-[0.7rem]">{name}</span>
        <span className="mt-2 flex items-center gap-2">
          {/* stacked mini thumbs */}
          <span className="flex -space-x-2 rtl:space-x-reverse">
            {preview.map((p) => (
              <img
                key={p.id}
                src={p.thumb}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-6 w-6 rounded-full border-2 border-[rgb(var(--bg))] object-cover"
                draggable={false}
              />
            ))}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink-500 dark:text-ink-400">
            <PhotoIcon /> {photos.length} {photosLabel}
          </span>
        </span>
      </span>

      <ChevronIcon className="shrink-0 text-ink-400 md:hidden" />
    </button>
  );
}
