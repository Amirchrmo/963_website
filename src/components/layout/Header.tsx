'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/components/providers/I18nProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeLogo } from '@/components/ui/ThemeLogo';
import { GlassButton } from '@/components/ui/GlassButton';

export function Header() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const links = [
    { href: '/', label: dict.nav.home },
    { href: '/about', label: dict.nav.about },
    { href: '/events', label: dict.nav.events },
    { href: '/gallery', label: dict.nav.gallery },
    { href: '/products', label: dict.nav.products },
    { href: '/sponsors', label: dict.nav.sponsors },
    { href: '/contact', label: dict.nav.contact },
  ] as const;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container">
          <div
            className={`flex items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 ease-out-expo md:px-6 ${
              scrolled ? 'glass-strong py-2.5' : 'py-2'
            }`}
          >
            <Link href="/" className="flex items-center gap-2" aria-label="963 Running Club home">
              <ThemeLogo />
              <span className="text-lg font-bold tracking-tight">963</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`link-underlin relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(l.href)
                      ? 'text-ink-900 dark:text-white'
                      : 'text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white'
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-ink-900/5 dark:bg-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <LanguageToggle />
              </div>
              <ThemeToggle />
              <div className="hidden md:block">
                <GlassButton href="/contact" size="sm" variant="solid">
                  {dict.nav.cta}
                </GlassButton>
              </div>
              {/* Mobile menu trigger */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={dict.common.menu}
                aria-expanded={menuOpen}
                className="glass grid h-10 w-10 place-items-center rounded-full lg:hidden"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu links={links} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  links,
  onClose,
}: {
  links: readonly { href: string; label: string }[];
  onClose: () => void;
}) {
  const { dict } = useI18n();
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col bg-ink-950/95 backdrop-blur-2xl lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container flex items-center justify-between py-5">
        <span className="text-lg font-bold tracking-tight text-white">963</span>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.common.close}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      <nav className="container flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
        {links.map((l, i) => (
          <motion.div
            key={l.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={l.href}
              className="block border-b border-white/10 py-4 text-4xl font-bold tracking-tight text-white"
            >
              {l.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="container py-8">
        <GlassButton href="/contact" variant="solid" size="lg" className="w-full">
          {dict.nav.cta}
        </GlassButton>
      </div>
    </motion.div>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
