'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Premium first-paint loader.
 *
 * - Shows only once per session (guarded by `sessionStorage`) on the very
 *   first navigation, so it never blocks returning visitors.
 * - Renders a minimal monochrome mark + sweeping shimmer to mask the initial
 *   font/asset hydration, then fades out cleanly.
 * - Respects `prefers-reduced-motion` (no shimmer spin).
 */
export function PageLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const KEY = '963-loader-seen';
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      /* ignore */
    }

    // Don't show for returning visitors in the same session.
    if (seen) return;

    setShow(true);

    // Mark as seen only after the loader actually dismisses. Writing the key
    // up-front breaks React Strict Mode (dev): the effect cleanup clears the
    // hide timeout, then the remount sees the key and skips scheduling a new
    // one — leaving the overlay stuck forever.
    const t = window.setTimeout(() => {
      setShow(false);
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* ignore */
      }
    }, 800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgb(var(--bg))]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative flex h-20 w-20 items-center justify-center"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Monogram mark */}
              <span className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[rgb(var(--fg))]">
                963
              </span>
              {/* Sweeping ring */}
              <motion.span
                className="absolute inset-0 rounded-full border border-[rgb(var(--fg)/0.15)]"
                style={{ borderTopColor: 'rgb(var(--fg))' }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.1,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Progress bar */}
            <div className="h-px w-40 overflow-hidden rounded-full bg-[rgb(var(--fg)/0.1)]">
              <motion.div
                className="h-full bg-[rgb(var(--fg))]"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
