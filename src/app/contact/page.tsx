'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { Reveal } from '@/components/animations/Reveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { galleryImages } from '@/lib/images';

export default function ContactPage() {
  const { dict } = useI18n();
  const c = dict.contact;

  const hoursLines = c.hours.split('\n');

  // Core contact info cards (address / phone / email / hours).
  const info = [
    { label: c.addressLabel, value: c.address, icon: <PinIcon /> },
    { label: c.phoneLabel, value: '+98 914 030 0963', href: 'tel:+989140300963', icon: <PhoneIcon /> },
    { label: c.emailLabel, value: '963runningclub@outlook.com', href: 'mailto:963runningclub@outlook.com', icon: <MailIcon /> },
    {
      label: c.hoursLabel,
      value: null,
      render: () => (
        <div className="mt-1 flex flex-col gap-1 font-medium">
          {hoursLines.map((line, i) => (
            <span key={i} className="text-pretty">{line}</span>
          ))}
        </div>
      ),
      icon: <ClockIcon />,
    },
  ];

  return (
    <>
      <PageHero
        image={galleryImages[1] ?? galleryImages[0]}
        eyebrow={c.infoTitle}
        title={c.title}
        subtitle={c.subtitle}
      />

      <section className="section">
        <div className="container">
          <Reveal direction="up" className="mb-10">
            <div className="text-center">
              <span className="eyebrow">{c.infoTitle}</span>
              <h2 className="heading-display mx-auto mt-3 max-w-2xl text-2xl font-black md:text-3xl">
                <TextReveal text={c.infoTitle} />
              </h2>
            </div>
          </Reveal>

          {/* Core contact cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((item, i) => (
              <Reveal key={item.label} direction="up" delay={i * 0.08}>
                <div className="flex h-full flex-col gap-3 rounded-2xl glass-panel p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-950">
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{item.label}</div>
                    {item.render ? (
                      item.render()
                    ) : item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block break-words font-medium transition-colors hover:text-ink-900 dark:hover:text-white"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="mt-1 break-words font-medium">{item.value}</div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Messaging contact cards — Strava / Instagram / Telegram */}
          <Reveal direction="up" delay={0.1} className="mt-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Strava */}
              <div className="flex h-full flex-col gap-3 rounded-2xl glass-panel p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-950">
                  <StravaIcon />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{c.stravaTitle}</div>
                  <a
                    href={c.stravaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all font-medium transition-colors hover:text-ink-900 dark:hover:text-white"
                  >
                    {c.stravaTitle}
                  </a>
                </div>
                <a
                  href={c.stravaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid mt-2 w-fit rounded-2xl px-6 py-3 text-sm font-semibold"
                >
                  {c.stravaTitle}
                </a>
              </div>

              {/* Instagram */}
              <div className="flex h-full flex-col gap-3 rounded-2xl glass-panel p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-950">
                  <IgIcon />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{c.instagramTitle}</div>
                  <div className="mt-1 font-medium">{c.instagramHandle}</div>
                </div>
                <a
                  href="https://ig.me/m/963runningclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid mt-2 w-fit rounded-2xl px-6 py-3 text-sm font-semibold"
                >
                  {c.sendMessage}
                </a>
              </div>

              {/* Telegram */}
              <div className="flex h-full flex-col gap-3 rounded-2xl glass-panel p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-950">
                  <TelegramIcon />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{c.telegramTitle}</div>
                  <a
                    href="https://t.me/runwith963"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-medium transition-colors hover:text-ink-900 dark:hover:text-white"
                  >
                    {c.telegramHandle}
                  </a>
                </div>
                <a
                  href="https://t.me/runwith963"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid mt-2 w-fit rounded-2xl px-6 py-3 text-sm font-semibold"
                >
                  {c.sendMessage}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map + Follow Us row */}
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* LOCAL MAP (fully self-contained — no external requests) */}
            <Reveal direction="up" delay={0.1}>
              <div className="relative h-72 overflow-hidden rounded-3xl glass-panel lg:h-full">
                <LocalMap />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-80">{c.addressLabel}</div>
                    <div className="truncate font-medium">{c.address}</div>
                  </div>
                  <PinIcon />
                </div>
              </div>
            </Reveal>

            {/* SOCIALS */}
            <Reveal direction="up" delay={0.2}>
              <div className="flex h-full flex-col justify-center gap-4 rounded-3xl glass-panel p-6 md:p-8">
                <span className="font-bold">{c.followTitle}</span>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-10 w-10 place-items-center rounded-full bg-ink-900/5 transition-colors hover:bg-ink-900 hover:text-white dark:bg-white/10 dark:hover:bg-white dark:hover:text-ink-950"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}
function StravaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}
function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.6 18.9 19.05c-.23 1.01-.83 1.26-1.68.79l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.34-4.73 8.62-7.79c.37-.33-.08-.52-.58-.18L7.46 13.2 2.9 11.77c-.99-.31-1.01-.99.21-1.47l17.86-6.88c.83-.31 1.55.18 1.28 1.18z" />
    </svg>
  );
}

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/963runningclub', icon: <IgIcon /> },
  { label: 'Telegram', href: 'https://t.me/runwith963', icon: <TelegramIcon /> },
  { label: 'Strava', href: 'https://strava.app.link/6Re7E7g1v5b', icon: <StravaIcon /> },
];

/**
 * Fully self-contained, offline-capable decorative map panel.
 * Renders a stylized lake + street-grid with a pulsing location pin over
 * Shorabil Lake, Ardebil. No external tiles, no network requests — adapts
 * to light/dark theme.
 */
function LocalMap() {
  return (
    <svg
      viewBox="0 0 400 256"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Shorabil Lake, Ardebil — 963 Running Club location map"
    >
      <defs>
        <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="[stop-color:rgb(var(--fg))] [stop-opacity:0.04]" />
          <stop offset="100%" className="[stop-color:rgb(var(--fg))] [stop-opacity:0.08]" />
        </linearGradient>
        <radialGradient id="lake-fill" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" className="[stop-color:rgb(var(--fg))]" stopOpacity="0.16" />
          <stop offset="70%" className="[stop-color:rgb(var(--fg))]" stopOpacity="0.08" />
          <stop offset="100%" className="[stop-color:rgb(var(--fg))]" stopOpacity="0.02" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="256" fill="url(#map-bg)" />

      {/* Grid lines */}
      <g className="[stroke:rgb(var(--fg))] [stroke-opacity:0.07]" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="256" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>

      {/* Shorabil Lake — organic blob */}
      <path
        d="M150 70 C 110 75, 90 115, 110 150 C 125 185, 180 200, 220 185 C 265 170, 280 130, 265 100 C 250 70, 195 60, 150 70 Z"
        fill="url(#lake-fill)"
        className="[stroke:rgb(var(--fg))]"
        strokeOpacity="0.22"
        strokeWidth="2"
      />

      {/* Major "roads" around the lake */}
      <g fill="none" className="[stroke:rgb(var(--fg))] [stroke-opacity:0.14]" strokeWidth="6" strokeLinecap="round">
        <path d="M-10 40 Q 100 40 130 90 T 200 220" />
        <path d="M300 -10 Q 290 60 260 110 T 280 270" strokeWidth="4" />
        <path d="M-10 230 Q 120 220 150 180" strokeWidth="4" />
      </g>

      {/* Location pin — on the lake */}
      <g transform="translate(180 120)">
        <circle r="34" className="fill-[rgb(var(--fg))]" fillOpacity="0.06">
          <animate attributeName="r" values="22;40;22" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.12;0.02;0.12" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="9" className="fill-[rgb(var(--fg))]" />
        <circle r="3.5" className="fill-[rgb(var(--bg))]" />
      </g>
    </svg>
  );
}
