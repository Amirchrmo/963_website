'use client';

import { useEffect, useState } from 'react';
import { Sheet } from '@/components/ui/Sheet';
import { GlassButton } from '@/components/ui/GlassButton';
import { EventGallery } from '@/components/gallery/EventGallery';
import { PhotoRows } from '@/components/gallery/PhotoRows';
import { useI18n } from '@/components/providers/I18nProvider';
import type { ImageItem } from '@/lib/images';
import {
  EventPoster,
  LinkedText,
  LocationChip,
  PhotoIcon,
  StatusBadge,
  paragraphs,
  type EventPosterSource,
} from './shared';

export interface UpcomingEventData {
  title: string;
  location?: string;
  status?: string;
  desc: string;
  poster: EventPosterSource;
  /** Optional photo rows shown in the detail sheet. */
  photoRows?: ImageItem[][];
}

export function UpcomingEventSheet({
  event,
  onClose,
  ctaLabel,
  ctaHref,
}: {
  event: UpcomingEventData | null;
  onClose: () => void;
  ctaLabel: string;
  ctaHref: string;
}) {
  // Keep the last event while the exit animation runs.
  const ev = useLastNonNull(event);
  return (
    <Sheet
      open={event !== null}
      onClose={onClose}
      label={ev?.title ?? ''}
      footer={
        <GlassButton href={ctaHref} variant="solid" size="md" className="w-full">
          {ctaLabel}
        </GlassButton>
      }
    >
      {ev && (
        <div className="px-5 pb-6 md:px-8 md:pb-8">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
            <EventPoster poster={ev.poster} alt={ev.title} full />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute inset-x-4 bottom-4 flex flex-wrap items-center gap-2">
              {ev.status && <StatusBadge status={ev.status} />}
              {ev.location && <LocationChip location={ev.location} />}
            </span>
          </div>

          <h2 dir="auto" className="mt-6 text-3xl font-black tracking-tight">{ev.title}</h2>
          <div dir="auto" className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-ink-600 dark:text-ink-300">
            {paragraphs(ev.desc).map((p, i) => (
              <p key={i}>
                <LinkedText text={p} />
              </p>
            ))}
          </div>

          {ev.photoRows && (
            <div className="mt-6">
              <PhotoRows rows={ev.photoRows} idPrefix={ev.title} />
            </div>
          )}
        </div>
      )}
    </Sheet>
  );
}

export interface PastEventData {
  title: string;
  name: string;
  faDesc: string;
  enDesc: string;
  cover: ImageItem;
  photos: ImageItem[];
}

export function PastEventSheet({
  event,
  onClose,
  photosLabel,
}: {
  event: PastEventData | null;
  onClose: () => void;
  photosLabel: string;
}) {
  const { locale } = useI18n();
  const ev = useLastNonNull(event);
  const [lang, setLang] = useState<'fa' | 'en'>(locale === 'fa' ? 'fa' : 'en');
  // Each time a sheet opens, start in the site language.
  useEffect(() => {
    if (event) setLang(locale === 'fa' ? 'fa' : 'en');
  }, [event, locale]);

  return (
    <Sheet open={event !== null} onClose={onClose} label={ev?.title ?? ''}>
      {ev && (
        <div className="pb-6 md:pb-8">
          {/* Cover */}
          <div className="px-5 md:px-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
              <EventPoster poster={ev.cover} alt={ev.title} full />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute inset-x-5 bottom-4 text-white">
                <span className="block text-3xl font-black tracking-tight">{ev.title}</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-white/75">{ev.name}</span>
              </span>
            </div>
          </div>

          {/* Story — segmented language switch */}
          <div className="mt-6 px-5 md:px-8">
            <div className="inline-flex rounded-full p-1 glass" role="tablist" aria-label="Language">
              {(
                [
                  ['fa', 'فارسی'],
                  ['en', 'English'],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={lang === key}
                  onClick={() => setLang(key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    key === 'fa' ? 'font-fa' : ''
                  } ${lang === key ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-950' : 'text-ink-500 dark:text-ink-400'}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div
              dir={lang === 'fa' ? 'rtl' : 'ltr'}
              className={`mt-4 space-y-3 text-pretty text-ink-600 dark:text-ink-300 ${
                lang === 'fa' ? 'font-fa text-base leading-loose' : 'text-[0.95rem] leading-relaxed'
              }`}
            >
              {paragraphs(lang === 'fa' ? ev.faDesc : ev.enDesc).map((p, i) => (
                <p key={i} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-8 border-t border-ink-900/10 px-5 pt-6 dark:border-white/10 md:px-8">
            <div className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
              <PhotoIcon /> {ev.photos.length} {photosLabel}
            </div>
            <EventGallery images={ev.photos} idPrefix={ev.title} />
          </div>
        </div>
      )}
    </Sheet>
  );
}

/** Returns the latest non-null value, so content stays during exit animations. */
function useLastNonNull<T>(value: T | null): T | null {
  const [last, setLast] = useState<T | null>(value);
  useEffect(() => {
    if (value !== null) setLast(value);
  }, [value]);
  return value ?? last;
}
