'use client';

import { useEffect, useRef, useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { GlassButton } from '@/components/ui/GlassButton';
import type { ImageItem } from '@/lib/images';

interface EventCardProps {
  image: ImageItem;
  title: string;
  location: string;
  /** Optional — when omitted the date row is hidden. */
  date?: string;
  /** Optional — when omitted no distance is shown. */
  distance?: string;
  /** Optional — when omitted the status badge is not rendered. */
  status?: string;
  desc: string;
  ctaLabel: string;
  /** Where the CTA button links. Defaults to `/events`. */
  ctaHref?: string;
  priority?: boolean;
}

/**
 * Stable, fully responsive event card.
 *
 * - Fixed image aspect ratio (4/5) so card height is deterministic and never
 *   jumps between items.
 * - The meta + description live in a separate body panel below the image so the
 *   card never shifts/clips on hover.
 * - On touch devices the CTA is always visible (no reliance on hover), and
 *   hover-driven transforms are disabled to avoid layout shift / overflow.
 */
export function EventCard({
  image,
  title,
  location,
  date,
  distance,
  status,
  desc,
  ctaLabel,
  ctaHref = '/events',
  priority = false,
}: EventCardProps) {
  const statusText = status ?? '';
  const isOpen = statusText.toLowerCase().includes('open') || statusText.includes('باز');

  // Detect coarse pointer (touch) once on mount to neutralize hover transforms.
  const [isTouch, setIsTouch] = useState(false);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const apply = () => mounted.current && setIsTouch(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl glass-panel ${
        isTouch
          ? // No transform on touch to prevent layout shift / overflow on mobile.
            'transition-shadow duration-500'
          : 'transition-all duration-500 ease-out-expo [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-glass-lg'
      }`}
    >
      {/* Image — fixed 4/5 ratio keeps the card height stable across items. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <SmartImage
          src={image.thumb}
          alt={title}
          width={image.thumbW}
          height={image.thumbH}
          zoomOnHover={!isTouch}
          priority={priority}
          className="h-full w-full"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {/* status badge — only when a status is provided */}
        {statusText && (
          <span
            className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
              isOpen ? 'bg-white/90 text-black' : 'border border-white/30 bg-white/10 text-white'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-amber-400'}`} />
            {statusText}
          </span>
        )}
        {/* location chip overlaid on the image bottom-left */}
        {location && (
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
            <PinIcon /> {location}
          </span>
        )}
      </div>

      {/* Body panel — stable, below the image, no hover-driven shift. */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {date && (
          <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-ink-400">
            <CalIcon /> {date}
          </div>
        )}
        <h3 className="text-lg font-bold leading-snug tracking-tight sm:text-xl">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{desc}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          {distance ? (
            <span className="text-sm font-semibold">{distance}</span>
          ) : (
            <span className="hidden sm:inline" />
          )}
          <GlassButton href={ctaHref} size="sm" variant="glass">
            {ctaLabel}
          </GlassButton>
        </div>
      </div>
    </article>
  );
}

function CalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
