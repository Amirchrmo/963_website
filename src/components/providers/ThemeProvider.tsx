'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

/**
 * Wraps next-themes with sensible defaults:
 * - class strategy (works with Tailwind `darkMode: 'class'`)
 * - persists preference
 * - respects system preference on first visit
 * - the `.theme-transition` class is added on <html> for smooth color fades
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="963-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
