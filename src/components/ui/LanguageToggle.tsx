'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { motion, AnimatePresence } from 'framer-motion';

/** Compact language switch (EN ⇄ FA) with animated label. */
export function LanguageToggle() {
  const { locale, toggleLocale } = useI18n();
  const label = locale === 'en' ? 'فا' : 'EN';

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Switch language"
      className="glass grid h-10 min-w-10 place-items-center rounded-full px-3 text-xs font-bold uppercase tracking-wider text-ink-700 dark:text-ink-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="font-sans"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
