'use client';

import { GlassButton } from '@/components/ui/GlassButton';
import { EventPoster, LocationChip, StatusBadge, type EventPosterSource } from './shared';

interface UpcomingEventCardProps {
  poster: EventPosterSource;
  title: string;
  location?: string;
  status?: string;
  desc: string;
  detailsLabel: string;
  ctaLabel: string;
  ctaHref: string;
  onOpen: () => void;
  priority?: boolean;
}

/**
 * Fixed-size upcoming-event card. The description is clamped to two lines and
 * the full story (photos included) lives in the detail sheet, so the card never
 * grows with its content.
 */
export function UpcomingEventCard({
  poster,
  title,
  location,
  status,
  desc,
  detailsLabel,
  ctaLabel,
  ctaHref,
  onOpen,
  priority = false,
}: UpcomingEventCardProps) {
  // Plain-text teaser (mentions stay as text inside the clamp).
  const teaser = desc.replace(/\s*\n\s*/g, ' ');

  return (
    <article className="group flex h-full flex-col overflow-hidden md:flex-row rounded-[1.75rem] glass-panel transition-shadow duration-500 [@media(hover:hover)]:hover:shadow-glass-lg">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${title} — ${detailsLabel}`}
        className="pressable relative block aspect-[4/5] w-full shrink-0 overflow-hidden text-start md:w-[46%]"
      >
        <span className="absolute inset-0 transition-transform duration-700 ease-out-expo [@media(hover:hover)]:group-hover:scale-105">
          <EventPoster poster={poster} alt={title} priority={priority} />
        </span>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        {status && (
          <span className="absolute start-4 top-4">
            <StatusBadge status={status} />
          </span>
        )}
        <span className="absolute inset-x-4 bottom-4 flex flex-col items-start gap-2 text-white">
          {location && <LocationChip location={location} />}
          <span dir="auto" className="text-2xl font-black leading-tight tracking-tight">{title}</span>
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5 md:p-6">
        <p dir="auto" className="line-clamp-2 text-sm leading-relaxed md:line-clamp-[8] text-ink-500 dark:text-ink-400">{teaser}</p>
        <div className="mt-auto grid grid-cols-2 gap-2 md:grid-cols-1 xl:grid-cols-2">
          <GlassButton onClick={onOpen} size="sm" variant="ghost" className="w-full !px-3">
            {detailsLabel}
          </GlassButton>
          <GlassButton href={ctaHref} size="sm" variant="solid" className="w-full whitespace-nowrap !px-3">
            {ctaLabel}
          </GlassButton>
        </div>
      </div>
    </article>
  );
}
