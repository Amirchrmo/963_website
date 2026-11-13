/**
 * Reference-counted body scroll lock.
 *
 * Overlays can stack (a lightbox opened from inside an event sheet), so a
 * plain `body.style.overflow = ''` from the inner overlay would unlock the page
 * while the outer one is still open. Each caller gets its own release fn.
 */
let locks = 0;

export function lockScroll(): () => void {
  if (typeof document === 'undefined') return () => {};
  locks += 1;
  if (locks === 1) document.body.style.overflow = 'hidden';
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    if (locks === 0) document.body.style.overflow = '';
  };
}
