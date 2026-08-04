'use client';

import { useEffect, useRef, useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  /** Required when `fill` is false; ignored otherwise. */
  width?: number;
  /** Required when `fill` is false; ignored otherwise. */
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
  imgClassName?: string;
  /** Apply a slow zoom-out/zoom on hover (for cards). */
  zoomOnHover?: boolean;
  /** Render the image as a background cover (object-cover) filling its parent. */
  fill?: boolean;
  /** Optional low-res thumb to blur-up first (LQIP). */
  blurSrc?: string;
}

/**
 * Plain `<img>` wrapper that loads local images directly from `/public` as
 * static assets (bypassing the Next.js `/_next/image` optimizer), with a
 * built-in skeleton shimmer while loading and an optional hover zoom.
 *
 * `sizes`, `quality` and `blurSrc` are still accepted on the props interface
 * for API compatibility with call sites, but are intentionally ignored — the
 * browser fetches the original file with zero server-side processing.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  imgClassName = '',
  zoomOnHover = false,
  fill = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // An image can finish loading *before* React attaches its onLoad handler
  // (e.g. it was served from the disk cache, preloaded via <link rel=preload>,
  // or decoded synchronously during hydration). In that case onLoad never fires
  // and the img would be stuck at opacity-0 forever. Detect that case here.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0 && !loaded) {
      setLoaded(true);
    }
  }, [src, loaded]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        fill
          ? undefined
          : { aspectRatio: `${width ?? 1} / ${height ?? 1}` }
      }
    >
      {/* Skeleton */}
      {!loaded && <div className="skeleton absolute inset-0" aria-hidden="true" />}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        // Hint the browser so the LCP image loads sooner and far-below-the-fold
        // images don't compete for bandwidth.
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'low'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full select-none object-cover transition-opacity duration-500 ease-out-expo will-change-[opacity] ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${zoomOnHover ? 'transition-transform duration-700 ease-out-expo group-hover:scale-110' : ''} ${imgClassName}`}
        draggable={false}
      />
    </div>
  );
}
