'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useDragControls, useReducedMotion, type PanInfo } from 'framer-motion';
import { lockScroll } from '@/lib/scroll-lock';
import { useI18n } from '@/components/providers/I18nProvider';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name of the dialog. */
  label: string;
  children: React.ReactNode;
  /** Sticky bottom area (e.g. a primary action). */
  footer?: React.ReactNode;
}

/**
 * Liquid-glass sheet.
 *
 * - Phones: a bottom sheet that slides up, with a grab handle; drag it down
 *   (or tap the backdrop) to dismiss. Content scrolls inside the sheet.
 * - md+: a centered glass modal.
 * - The hardware/browser Back button closes it (a history entry is pushed
 *   while it is open), and Escape closes it unless a lightbox is on top.
 */
export function Sheet({ open, onClose, label, children, footer }: SheetProps) {
  const { dict } = useI18n();
  const reduce = useReducedMotion();
  const dragControls = useDragControls();
  const [mounted, setMounted] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const pushed = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(min-width: 768px)');
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  // Back button closes the sheet. The pushed entry copies the current
  // history state so the Next.js router keeps treating it as its own.
  useEffect(() => {
    if (!open) return;
    window.history.pushState({ ...(window.history.state ?? {}), sheet: true }, '');
    pushed.current = true;
    const onPop = () => {
      // Landed on a sheet entry (e.g. dev StrictMode double effect): stay open.
      if (window.history.state?.sheet) return;
      pushed.current = false;
      onCloseRef.current();
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      // Closed some other way (route change, unmount): drop our entry.
      // Only step back while still on our own entry, never undo a navigation.
      if (pushed.current && window.history.state?.sheet) window.history.back();
      pushed.current = false;
    };
  }, [open]);

  const requestClose = useCallback(() => {
    if (pushed.current) window.history.back(); // popstate -> onClose
    else onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('[data-lightbox]')) requestClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      unlock();
    };
  }, [open, requestClose]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 600) requestClose();
  };

  if (!mounted) return null;

  const hidden = desktop ? { opacity: 0, y: 24, scale: 0.98 } : { y: '100%' };
  const shown = desktop ? { opacity: 1, y: 0, scale: 1 } : { y: 0 };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center md:items-center md:p-6" role="presentation">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            onClick={requestClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="sheet-panel relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[2rem] md:max-h-[88vh] md:max-w-3xl md:rounded-[2rem]"
            initial={reduce ? { opacity: 0 } : hidden}
            animate={reduce ? { opacity: 1 } : shown}
            exit={reduce ? { opacity: 0 } : hidden}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 38, mass: 0.9 }}
            drag={desktop ? false : 'y'}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onDragEnd}
          >
            {/* Grab handle (phones) + close button. Dragging starts here so the
                content below can scroll freely. */}
            <div
              className="relative h-14 shrink-0 touch-none md:h-16"
              onPointerDown={(e) => !desktop && dragControls.start(e)}
            >
              <span className="absolute left-1/2 top-2.5 h-1.5 w-11 -translate-x-1/2 rounded-full bg-ink-900/20 dark:bg-white/25 md:hidden" aria-hidden="true" />
              <button
                type="button"
                onClick={requestClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label={dict.common.close}
                className="glass absolute end-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full md:end-6"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>

            {footer && (
              <div className="shrink-0 border-t border-ink-900/10 px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 dark:border-white/10 md:px-8 md:pb-6">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
