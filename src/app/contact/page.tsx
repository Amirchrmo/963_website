'use client';

import { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { galleryImages } from '@/lib/images';

export default function ContactPage() {
  const { dict } = useI18n();
  const c = dict.contact;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const info = [
    { label: c.addressLabel, value: c.address, icon: <PinIcon /> },
    { label: c.phoneLabel, value: '+98 21 963 0000', icon: <PhoneIcon /> },
    { label: c.emailLabel, value: 'hello@963run.com', icon: <MailIcon /> },
    { label: c.hoursLabel, value: c.hours, icon: <ClockIcon /> },
  ];

  return (
    <>
      <PageHero
        image={galleryImages[1] ?? galleryImages[0]}
        eyebrow={c.formTitle}
        title={c.title}
        subtitle={c.subtitle}
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* FORM */}
          <Reveal direction="up">
            <div className="rounded-3xl glass-panel p-8 md:p-10">
              <h2 className="text-2xl font-black tracking-tight md:text-3xl">{c.formTitle}</h2>
              <form onSubmit={onSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={c.name}>
                    <input required value={form.name} onChange={set('name')} className={inputCls} />
                  </Field>
                  <Field label={c.email}>
                    <input type="email" required value={form.email} onChange={set('email')} className={inputCls} />
                  </Field>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={c.phone}>
                    <input value={form.phone} onChange={set('phone')} className={inputCls} />
                  </Field>
                  <Field label={c.subject}>
                    <input required value={form.subject} onChange={set('subject')} className={inputCls} />
                  </Field>
                </div>
                <Field label={c.message}>
                  <textarea required rows={5} value={form.message} onChange={set('message')} className={`${inputCls} resize-none`} />
                </Field>
                <button
                  type="submit"
                  className="btn-solid w-full rounded-2xl px-8 py-4 text-sm font-semibold transition-transform hover:scale-[1.01]"
                >
                  {sent ? c.success : c.send}
                </button>
              </form>
            </div>
          </Reveal>

          {/* INFO */}
          <div className="flex flex-col gap-6">
            <Reveal direction="up" delay={0.1}>
              <div>
                <span className="eyebrow">{c.infoTitle}</span>
                <h2 className="heading-display mt-3 text-2xl font-black md:text-3xl">
                  <TextReveal text={c.infoTitle} />
                </h2>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {info.map((item, i) => (
                <Reveal key={item.label} direction="up" delay={0.15 + i * 0.08}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl glass-panel p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-950">
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{item.label}</div>
                      <div className="mt-1 font-medium">{item.value}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* LOCAL MAP (fully self-contained — no external requests) */}
            <Reveal direction="up" delay={0.4}>
              <div className="relative h-64 overflow-hidden rounded-3xl glass-panel">
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
            <Reveal direction="up" delay={0.5}>
              <div className="flex items-center justify-between rounded-2xl glass-panel p-6">
                <span className="font-bold">{c.followTitle}</span>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
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

const inputCls =
  'w-full rounded-2xl border border-ink-900/10 bg-ink-50/60 px-5 py-3.5 text-sm outline-none transition-all focus:ring-2 focus:ring-ink-900/30 dark:border-white/10 dark:bg-ink-900/50 dark:focus:ring-white/30';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">{label}</span>
      {children}
    </label>
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

const socials = [
  { label: 'Instagram', href: 'https://instagram.com', icon: <IgIcon /> },
  { label: 'X', href: 'https://x.com', icon: <XIcon /> },
  { label: 'YouTube', href: 'https://youtube.com', icon: <YtIcon /> },
  { label: 'Strava', href: 'https://strava.com', icon: <StravaIcon /> },
];
function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function YtIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><path d="m9.75 15.02 5.75-3.27-5.75-3.27z" fill="currentColor" />
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

/**
 * Fully self-contained, offline-capable decorative map panel.
 * Renders a stylized street-grid + gridlines with a pulsing location pin.
 * No external tiles, no network requests — adapts to light/dark theme.
 */
function LocalMap() {
  return (
    <svg
      viewBox="0 0 400 256"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="963 Running Club location map"
    >
      <defs>
        <linearGradient id="map-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" className="[stop-color:rgb(var(--fg))] [stop-opacity:0.04]" />
          <stop offset="100%" className="[stop-color:rgb(var(--fg))] [stop-opacity:0.08]" />
        </linearGradient>
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

      {/* Major "roads" */}
      <g fill="none" className="[stroke:rgb(var(--fg))] [stroke-opacity:0.14]" strokeWidth="6" strokeLinecap="round">
        <path d="M-10 70 Q 120 60 220 140 T 420 120" />
        <path d="M60 -10 Q 90 120 200 150 T 250 270" />
        <path d="M-10 200 Q 140 180 210 210 T 420 230" strokeWidth="4" />
        <path d="M300 -10 Q 280 100 320 160 T 360 270" strokeWidth="4" />
      </g>

      {/* A "park" / green-ish block (kept monochrome to match brand) */}
      <rect x="250" y="40" width="90" height="60" rx="8" className="fill-[rgb(var(--fg))]" fillOpacity="0.05" />

      {/* Location pin */}
      <g transform="translate(200 110)">
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
