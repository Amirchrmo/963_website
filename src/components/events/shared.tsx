'use client';

import { SmartImage } from '@/components/ui/SmartImage';
import { logoWhite, type ImageItem } from '@/lib/images';
import { instagramProfileUrl } from '@/lib/links';

/** An event poster is either a photo or the 963 logo on a dark glass field. */
export type EventPosterSource = ImageItem | 'logo';

/** Fills its (positioned, sized) parent with the poster. */
export function EventPoster({
  poster,
  alt,
  priority = false,
  full = false,
}: {
  poster: EventPosterSource;
  alt: string;
  priority?: boolean;
  /** Load the full-size file instead of the thumb (detail sheets). */
  full?: boolean;
}) {
  if (poster === 'logo') {
    return (
      <div className="absolute inset-0 grid place-items-center overflow-hidden bg-ink-950" role="img" aria-label={alt}>
        {/* soft glow + grain so the mark sits on a "liquid glass" field */}
        <div className="absolute -inset-1/4 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.18),transparent_55%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay" aria-hidden="true" />
        <div className="relative flex -translate-y-[14%] flex-col items-center gap-4">
          <img
            src={logoWhite.full}
            alt=""
            width={logoWhite.width}
            height={logoWhite.height}
            className="w-[38%] min-w-[96px] max-w-[176px] select-none"
            draggable={false}
          />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">963 Running Club</span>
        </div>
      </div>
    );
  }
  return (
    <SmartImage
      src={full ? poster.full : poster.thumb}
      alt={alt}
      fill
      priority={priority}
      className="absolute inset-0 h-full w-full"
    />
  );
}

/** Splits text into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

/** Renders text with `@handle` mentions linked to their Instagram profiles. */
export function LinkedText({ text }: { text: string }) {
  const parts = text.split(/(@[A-Za-z0-9_](?:[A-Za-z0-9_.]*[A-Za-z0-9_])?)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={instagramProfileUrl(part.slice(1))}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink-900 underline-offset-4 hover:underline dark:text-white"
          >
            {part}
          </a>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isOpen = status.toLowerCase().includes('open') || status.includes('باز');
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md ${
        isOpen ? 'bg-white/90 text-black' : 'border border-white/30 bg-white/10 text-white'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-amber-400'}`} />
      {status}
    </span>
  );
}

export function LocationChip({ location }: { location: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
      <PinIcon /> {location}
    </span>
  );
}

export function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`rtl-flip ${className}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function PhotoIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="9" cy="9" r="2" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}
