'use client';

import { useTheme } from 'next-themes';
import { logoBlack, logoWhite } from '@/lib/images';

/**
 * 963 Running Club logo mark. Loads the themed logo directly from `/public`
 * (bypassing the Next.js optimizer) and automatically switches between the
 * black-on-light and white-on-dark variants based on the active theme.
 *
 * Renders a neutral placeholder until the theme has mounted to avoid
 * hydration mismatches.
 */
export function ThemeLogo({ className = 'h-8 w-8' }: { className?: string }) {
  const { resolvedTheme, systemTheme } = useTheme();
  // `resolvedTheme` is `"light"` | `"dark"` | undefined (pre-mount). When
  // unset, fall back to the system preference so the very first paint still
  // picks a sensible variant.
  const theme = resolvedTheme ?? systemTheme;
  const isDark = theme === 'dark';

  return (
    <img
      src={isDark ? logoWhite.full : logoBlack.full}
      alt="963 Running Club logo"
      width={32}
      height={32}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      className={`object-contain ${className}`}
      suppressHydrationWarning
      draggable={false}
    />
  );
}
