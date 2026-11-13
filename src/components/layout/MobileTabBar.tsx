'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useI18n } from '@/components/providers/I18nProvider';
import { ThemeLogo } from '@/components/ui/ThemeLogo';

type IconName = 'about' | 'events' | 'gallery' | 'products' | 'sponsors' | 'contact';

/**
 * Native-style bottom tab bar for phones/tablets (< lg). Replaces the old
 * hamburger menu: every page is one tap away, with the 963 logo in the middle
 * as the Home tab. Floats above the iOS home indicator (safe-area aware).
 */
export function MobileTabBar() {
  const { dict } = useI18n();
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const left: { href: string; label: string; icon: IconName }[] = [
    { href: '/about', label: dict.nav.about, icon: 'about' },
    { href: '/events', label: dict.nav.events, icon: 'events' },
    { href: '/gallery', label: dict.nav.gallery, icon: 'gallery' },
  ];
  const right: { href: string; label: string; icon: IconName }[] = [
    { href: '/products', label: dict.nav.products, icon: 'products' },
    { href: '/sponsors', label: dict.nav.sponsors, icon: 'sponsors' },
    { href: '/contact', label: dict.nav.contact, icon: 'contact' },
  ];
  const homeActive = isActive('/');

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 px-2.5 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] lg:hidden"
    >
      <div className="tabbar mx-auto grid max-w-lg grid-cols-7 items-center rounded-[1.75rem] px-1 py-1">
        {left.map((l) => (
          <Tab key={l.href} {...l} active={isActive(l.href)} />
        ))}

        {/* Home — the club logo, raised in the centre. */}
        <Link
          href="/"
          aria-label={dict.nav.home}
          aria-current={homeActive ? 'page' : undefined}
          className="pressable relative mx-auto -mt-6 grid h-14 w-14 place-items-center rounded-full glass-strong"
        >
          {homeActive && (
            <motion.span
              layoutId="tab-active-home"
              className="absolute inset-0 rounded-full ring-2 ring-ink-900/70 dark:ring-white/80"
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            />
          )}
          <ThemeLogo className="h-8 w-8" />
        </Link>

        {right.map((l) => (
          <Tab key={l.href} {...l} active={isActive(l.href)} />
        ))}
      </div>
    </nav>
  );
}

function Tab({ href, label, icon, active }: { href: string; label: string; icon: IconName; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`pressable relative flex min-w-0 flex-col items-center gap-1 rounded-2xl px-0.5 py-2 transition-colors ${
        active ? 'text-ink-900 dark:text-white' : 'text-ink-400 dark:text-ink-500'
      }`}
    >
      {active && (
        <motion.span
          layoutId="tab-active"
          className="absolute inset-0 -z-10 rounded-2xl bg-ink-900/[0.07] dark:bg-white/10"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      )}
      <TabIcon name={icon} filled={active} />
      <span className="w-full truncate text-center text-[0.625rem] font-semibold leading-none">{label}</span>
    </Link>
  );
}

function TabIcon({ name, filled }: { name: IconName; filled: boolean }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: filled ? 2.2 : 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  const fill = filled ? 'currentColor' : 'none';
  switch (name) {
    case 'about':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" fill={fill} />
          <path d="M2.5 20c.6-3.6 3.3-6 6.5-6s5.9 2.4 6.5 6" />
          <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.4c1.9.8 3.2 2.9 3.5 5.6" />
        </svg>
      );
    case 'events':
      return (
        <svg {...common}>
          <rect x="3" y="4.5" width="18" height="16.5" rx="3" />
          <path d="M3 9.5h18" />
          <path d="M8 2.5v4M16 2.5v4" />
          <rect x="7" y="13" width="4" height="4" rx="1" fill={fill} />
        </svg>
      );
    case 'gallery':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="9" cy="9" r="2" fill={fill} />
          <path d="M21 15.5l-4.5-4.5L6 21" />
        </svg>
      );
    case 'products':
      return (
        <svg {...common}>
          <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8z" fill={filled ? 'currentColor' : 'none'} fillOpacity={0.15} />
          <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
        </svg>
      );
    case 'sponsors':
      return (
        <svg {...common}>
          <path d="M12 3l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.8L12 3z" fill={fill} fillOpacity={filled ? 0.9 : 0} />
        </svg>
      );
    case 'contact':
      return (
        <svg {...common}>
          <path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.4-5.4A8.5 8.5 0 1 1 21 12z" fill={filled ? 'currentColor' : 'none'} fillOpacity={0.15} />
          <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth={2.6} />
        </svg>
      );
  }
}
