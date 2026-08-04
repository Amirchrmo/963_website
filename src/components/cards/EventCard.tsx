'use client';

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
  return (
    <article className="group relative overflow-hidden rounded-3xl glass-panel transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glass-lg">
      <div className="relative aspect-[4/5] overflow-hidden">
        <SmartImage
          src={image.thumb}
          alt={title}
          width={image.thumbW}
          height={image.thumbH}
          zoomOnHover
          priority={priority}
          className="h-full w-full"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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
        {/* content */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          {(date || location) && (
            <div className="mb-2 flex flex-wrap items-center gap-3 text-xs font-medium text-white/70">
              {date && (
                <span className="inline-flex items-center gap-1">
                  <CalIcon /> {date}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <PinIcon /> {location}
              </span>
            </div>
          )}
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-white/70">{desc}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            {distance ? (
              <span className="text-sm font-semibold text-white">{distance}</span>
            ) : (
              <span />
            )}
            <GlassButton href={ctaHref} size="sm" variant="glass">
              {ctaLabel}
            </GlassButton>
          </div>
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
