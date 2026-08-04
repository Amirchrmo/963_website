'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Dictionary, Locale } from '@/lib/i18n-types';
import { defaultLocale, localeMeta, locales } from '@/lib/i18n-types';
import { getDictionary } from '@/lib/i18n';

const STORAGE_KEY = '963-locale';

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isClient: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) return stored;
  } catch {
    /* ignore */
  }
  const nav = window.navigator.language?.slice(0, 2).toLowerCase();
  return (nav === 'fa' ? 'fa' : defaultLocale);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Start with defaultLocale so SSR and first client render match (no hydration flash).
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isClient, setIsClient] = useState(false);

  // On mount, hydrate the real preference.
  useEffect(() => {
    const detected = detectInitialLocale();
    setLocaleState(detected);
    setIsClient(true);
  }, []);

  // Reflect locale onto <html> for direction + lang.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const meta = localeMeta[locale];
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === 'en' ? 'fa' : 'en';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dict: getDictionary(locale),
      dir: localeMeta[locale].dir,
      setLocale,
      toggleLocale,
      isClient,
    }),
    [locale, setLocale, toggleLocale, isClient],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider');
  return ctx;
}

/** Convenience selector returning just the dictionary (most components only need copy). */
export function useDict(): Dictionary {
  return useI18n().dict;
}
