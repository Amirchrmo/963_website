'use client';

import { useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { Lightbox } from '@/components/ui/Lightbox';
import type { ImageItem } from '@/lib/images';
import { useI18n } from '@/components/providers/I18nProvider';

interface PhotoRowsProps {
  /** Each inner array is rendered as one row (1–4 photos per row). */
  rows: ImageItem[][];
  /** Unique prefix for aria labels / keys. */
  idPrefix: string;
}

// Literal class names so Tailwind keeps them in the build.
const COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

/**
 * Compact photo grid with a fixed number of photos per row (e.g. 2 then 4).
 * Square, object-cover tiles keep every row aligned; clicking a photo opens
 * the shared Lightbox across all rows.
 */
export function PhotoRows({ rows, idPrefix }: PhotoRowsProps) {
  const { dict } = useI18n();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const all = rows.flat();

  if (!all.length) return null;

  let offset = 0;
  return (
    <div className="space-y-2 sm:space-y-3">
      {rows.map((row, r) => {
        const start = offset;
        offset += row.length;
        return (
          <div key={`${idPrefix}-row-${r}`} className={`grid gap-2 sm:gap-3 ${COLS[row.length] ?? COLS[4]}`}>
            {row.map((img, i) => (
              <button
                key={`${idPrefix}-${img.id}`}
                type="button"
                onClick={() => setLightboxIndex(start + i)}
                aria-label={`${dict.common.fullscreen} ${start + i + 1}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl glass-panel"
              >
                <SmartImage
                  src={img.thumb}
                  alt={`${idPrefix} ${start + i + 1}`}
                  width={img.thumbW}
                  height={img.thumbH}
                  zoomOnHover
                  className="h-full w-full"
                  imgClassName="object-cover"
                />
              </button>
            ))}
          </div>
        );
      })}

      <Lightbox
        images={all}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
