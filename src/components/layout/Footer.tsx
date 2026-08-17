'use client';

import Link from 'next/link';
import { useI18n } from '@/components/providers/I18nProvider';
import { ThemeLogo } from '@/components/ui/ThemeLogo';
import { stravaLogo } from '@/lib/images';

export function Footer() {
  const { dict } = useI18n();

  const exploreLinks = [
    { href: '/about', label: dict.nav.about },
    { href: '/events', label: dict.nav.events },
    { href: '/gallery', label: dict.nav.gallery },
    { href: '/products', label: dict.nav.products },
    { href: '/sponsors', label: dict.nav.sponsors },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-ink-900/10 bg-ink-50 dark:border-white/10 dark:bg-ink-950">
      {/* Decorative top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-ink-900/30 to-transparent dark:via-white/30" />

      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <ThemeLogo className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight">963 Running Club</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            {dict.footer.tagline}
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
            {dict.footer.explore}
          </h3>
          <ul className="space-y-3">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="link-underline text-sm text-ink-600 transition-colors hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
                >
                  {l.label}
                </Link>
                {l.href === '/gallery' && (
                  <span className="ms-2 text-sm text-ink-400 dark:text-ink-500">
                    {dict.gallery.photoCredit}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + social */}
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-400">
            {dict.footer.contactTitle}
          </h3>
          <ul className="space-y-3 text-sm text-ink-600 dark:text-ink-300">
            <li>Located in Ardebil/Shorabil</li>
            <li>
              <a
                href="mailto:963runningclub@outlook.com"
                className="link-underline transition-colors hover:text-ink-900 dark:hover:text-white"
              >
                963runningclub@outlook.com
              </a>
            </li>
            <li>
              <a
                href="tel:+989140300963"
                className="link-underline transition-colors hover:text-ink-900 dark:hover:text-white"
              >
                +98 914 030 0963
              </a>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="glass grid h-10 w-10 place-items-center rounded-full text-ink-600 transition-transform hover:-translate-y-0.5 hover:text-ink-900 dark:text-ink-300 dark:hover:text-white"
              >
                {s.icon}
              </a>
            ))}
            {/* Strava — uses the brand PNG logo. */}
            <a
              href="https://strava.app.link/iQoyf0Dvk5b"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Strava"
              className="glass grid h-10 w-10 place-items-center rounded-full transition-transform hover:-translate-y-0.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stravaLogo.src}
                alt="Strava"
                width={stravaLogo.width}
                height={stravaLogo.height}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-[18px] w-[18px] object-contain sm:h-5 sm:w-5"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-900/10 dark:border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-400 sm:flex-row">
          <p>© {new Date().getFullYear()} 963 Running Club. {dict.footer.rights}</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Designed by Arisan
          </p>
        </div>
      </div>
    </footer>
  );
}

const socials = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/963runningclub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/963runningclub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.94 4.6 18.9 19.05c-.23 1.01-.83 1.26-1.68.79l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.34-4.73 8.62-7.79c.37-.33-.08-.52-.58-.18L7.46 13.2 2.9 11.77c-.99-.31-1.01-.99.21-1.47l17.86-6.88c.83-.31 1.55.18 1.28 1.18z" />
      </svg>
    ),
  },
];
