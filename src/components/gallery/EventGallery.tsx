'use client';

import { useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { Lightbox } from '@/components/ui/Lightbox';
import type { ImageItem } from '@/lib/images';
import { useI18n } from '@/components/providers/I18nProvider';

interface EventGalleryProps {
  images: ImageItem[];
  /** Unique prefix for aria labels / keys. */
  idPrefix: string;
}

/**
 * Responsive photo grid for past events. Images use a fixed square aspect
 * ratio with object-cover so there is no stretching/distortion and the grid
 * stays perfectly aligned on every breakpoint. Clicking a photo opens the
 * shared Lightbox viewer.
 */
export function EventGallery({ images, idPrefix }: EventGalleryProps) {
  const { dict } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((img, i) => (
          <button
            key={`${idPrefix}-${img.id}-${i}`}
            type="button"
            onClick={() => setLightboxIndex(i)}
            aria-label={`${dict.common.fullscreen} ${i + 1}`}
            className="group relative block aspect-square w-full overflow-hidden rounded-2xl glass-panel"
          >
            <SmartImage
              src={img.thumb}
              alt={`${idPrefix} ${i + 1}`}
              width={img.thumbW}
              height={img.thumbH}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              zoomOnHover
              className="h-full w-full"
              imgClassName="object-cover"
            />
            {/* hover overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white">
                <ExpandIcon /> {dict.common.fullscreen}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}
