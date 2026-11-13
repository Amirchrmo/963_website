'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/components/providers/I18nProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { ThemeLogo } from '@/components/ui/ThemeLogo';
import { GlassButton } from '@/components/ui/GlassButton';

export function Header() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
        <div
          className={`container transition-all duration-500 ease-out-expo ${
            scrolled ? 'py-2.5 lg:py-3' : 'py-3 lg:py-5'
          }`}
        >
          <div
            className={`flex items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 ease-out-expo md:px-6 ${
              scrolled ? 'glass-strong py-2.5' : 'py-2'
            }`}
          >
            {/* On phones the logo lives in the bottom tab bar; the top bar keeps the wordmark. */}
            <Link href="/" className="flex items-center gap-2" aria-label="963 Running Club home">
              <span className="hidden lg:block">
                <ThemeLogo />
              </span>
              <span dir="ltr" className="text-lg font-bold tracking-tight">
                963<span className="ms-1.5 text-sm font-semibold text-ink-500 dark:text-ink-400 lg:hidden">Running Club</span>
              </span>
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
              <LanguageToggle />
              <ThemeToggle />
              <div className="hidden md:block">
                <GlassButton href="/contact" size="sm" variant="solid">
                  {dict.nav.cta}
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
