'use client';

import { useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { GlassButton } from '@/components/ui/GlassButton';
import type { ProductShots } from '@/lib/images';

interface ProductCardProps {
  shots: ProductShots;
  name: string;
  price: string;
  desc: string;
  buyLabel: string;
  frontLabel: string;
  backLabel: string;
  priority?: boolean;
}

/**
 * Product card with a front/back photo switch.
 *
 * - Pointer devices: hovering the photo shows the back; the buy button slides
 *   up over the photo.
 * - Touch devices: tapping the photo (or the Front/Back pill) flips it, and the
 *   buy button sits in the card body so it is always reachable.
 */
export function ProductCard({
  shots,
  name,
  price,
  desc,
  buyLabel,
  frontLabel,
  backLabel,
  priority = false,
}: ProductCardProps) {
  const [showBack, setShowBack] = useState(false);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-panel transition-all duration-500 [@media(hover:hover)]:hover:-translate-y-1.5 [@media(hover:hover)]:hover:shadow-glass-lg">
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        <button
          type="button"
          onClick={() => setShowBack((v) => !v)}
          aria-label={`${name}: ${showBack ? frontLabel : backLabel}`}
          aria-pressed={showBack}
          className="absolute inset-0 block h-full w-full"
        >
          <span
            className={`absolute inset-0 transition-opacity duration-500 ease-out-expo ${
              showBack ? 'opacity-0' : 'opacity-100 [@media(hover:hover)]:group-hover:opacity-0'
            }`}
          >
            <SmartImage src={shots.front.thumb} alt={`${name} — ${frontLabel}`} fill priority={priority} className="h-full w-full" />
          </span>
          <span
            className={`absolute inset-0 transition-opacity duration-500 ease-out-expo ${
              showBack ? 'opacity-100' : 'opacity-0 [@media(hover:hover)]:group-hover:opacity-100'
            }`}
          >
            <SmartImage src={shots.back.thumb} alt={`${name} — ${backLabel}`} fill className="h-full w-full" />
          </span>
        </button>

        {/* Front / Back indicator — also a tap target on touch screens. */}
        <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
          <span className="inline-flex rounded-full bg-black/45 p-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <span className={`rounded-full px-2.5 py-1 transition-colors ${showBack ? '' : 'bg-white text-black'}`}>
              {frontLabel}
            </span>
            <span className={`rounded-full px-2.5 py-1 transition-colors ${showBack ? 'bg-white text-black' : ''}`}>
              {backLabel}
            </span>
          </span>
        </div>

        {/* Quick buy — pointer devices only (slides up on hover). */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full p-4 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:hover)]:block">
          <GlassButton href="/contact" size="sm" variant="solid" className="w-full">
            {buyLabel}
          </GlassButton>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
          <h3 className="text-base font-bold leading-snug tracking-tight sm:text-lg">{name}</h3>
          <span className="shrink-0 whitespace-nowrap text-base font-bold sm:ml-auto sm:text-lg">{price}</span>
        </div>
        <p className="mt-1.5 text-xs text-ink-500 dark:text-ink-400 sm:text-sm">{desc}</p>
        {/* Touch devices: always-visible buy button. */}
        <div className="mt-auto pt-4 [@media(hover:hover)]:hidden">
          <GlassButton href="/contact" size="sm" variant="glass" className="w-full">
            {buyLabel}
          </GlassButton>
        </div>
      </div>
    </article>
  );
}
