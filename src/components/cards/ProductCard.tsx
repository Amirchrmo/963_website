'use client';

import { SmartImage } from '@/components/ui/SmartImage';
import { GlassButton } from '@/components/ui/GlassButton';
import type { ImageItem } from '@/lib/images';

interface ProductCardProps {
  image: ImageItem;
  name: string;
  price: string;
  desc: string;
  buyLabel: string;
  priority?: boolean;
  index?: number;
}

export function ProductCard({
  image,
  name,
  price,
  desc,
  buyLabel,
  priority = false,
}: ProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl glass-panel transition-all duration-500 hover:-translate-y-1.5 hover:shadow-glass-lg">
      <div className="relative aspect-square overflow-hidden">
        <SmartImage
          src={image.thumb}
          alt={name}
          width={image.thumbW}
          height={image.thumbH}
          zoomOnHover
          priority={priority}
          sizes="(max-width: 768px) 50vw, 25vw"
          quality={75}
          className="h-full w-full"
        />
        {/* quick action */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <GlassButton href="/contact" size="sm" variant="glass" className="w-full text-white">
            {buyLabel}
          </GlassButton>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug tracking-tight">{name}</h3>
          <span className="shrink-0 whitespace-nowrap text-lg font-bold">{price}</span>
        </div>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">{desc}</p>
      </div>
    </article>
  );
}
