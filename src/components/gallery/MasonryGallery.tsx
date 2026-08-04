'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import { Lightbox } from '@/components/ui/Lightbox';
import type { ImageItem } from '@/lib/images';
import { useI18n } from '@/components/providers/I18nProvider';

type Filter = 'all' | 'portrait' | 'landscape';
type Layout = 'masonry' | 'grid';

interface MasonryGalleryProps {
  images: ImageItem[];
  /** how many columns the masonry uses at the lg breakpoint */
  columns?: number;
  showControls?: boolean;
  idPrefix?: string;
}

export function MasonryGallery({
  images,
  columns = 3,
  showControls = true,
  idPrefix = 'g',
}: MasonryGalleryProps) {
  const { dict } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const [layout, setLayout] = useState<Layout>('masonry');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return images;
    return images.filter((img) =>
      filter === 'portrait' ? img.ratio < 1 : img.ratio >= 1,
    );
  }, [images, filter]);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: dict.gallery.filterAll },
    { key: 'portrait', label: dict.gallery.filterPortrait },
    { key: 'landscape', label: dict.gallery.filterLandscape },
  ];

  const colClass =
    columns === 4
      ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4'
      : 'columns-1 sm:columns-2 lg:columns-3';

  // CSS-only filtering: keep every item mounted and transition opacity/scale.
  // This avoids the expensive AnimatePresence + layout re-calculation that
  // caused tab switching to feel slow on larger galleries.
  const gridClass =
    layout === 'masonry'
      ? `${colClass} gap-4 [&>*]:mb-4`
      : 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div>
      {showControls && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter">
            {filters.map((f) => {
              const isActive = filter === f.key;
              return (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={isActive}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => setFilter(f.key)}
                  className={`relative isolate rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-ink-950 dark:text-white'
                      : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={`${idPrefix}-filter-bg`}
                      className="absolute inset-0 -z-10 rounded-full bg-ink-900/10 ring-1 ring-ink-900/10 dark:bg-white/15 dark:ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Layout toggle */}
          <div className="flex gap-1 rounded-full glass-panel p-1">
            {(['masonry', 'grid'] as Layout[]).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                aria-pressed={layout === l}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  layout === l ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-950' : 'text-ink-500'
                }`}
              >
                {l === 'masonry' ? dict.gallery.layoutMasonry : dict.gallery.layoutGrid}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid / Masonry — rendered items stay mounted for instant filtering */}
      <div className={gridClass}>
        {images.map((img, i) => {
          const visible = filtered.includes(img);
          return (
            <button
              key={img.id}
              data-visible={visible}
              onClick={() => setLightboxIndex(filtered.indexOf(img))}
              className={`group relative block w-full overflow-hidden rounded-2xl glass-panel transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                layout === 'masonry' ? 'break-inside-avoid' : ''
              } ${
                visible
                  ? 'pointer-events-auto scale-100 opacity-100'
                  : 'pointer-events-none hidden scale-95 opacity-0'
              }`}
              aria-hidden={!visible}
              aria-label={`${dict.common.fullscreen} ${i + 1}`}
            >
              <SmartImage
                src={img.thumb}
                alt={`${idPrefix}-${i + 1}`}
                width={img.thumbW}
                height={img.thumbH}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                zoomOnHover
                className="w-full"
              />
              {/* hover overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white">
                  <ExpandIcon /> {dict.common.fullscreen}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}
