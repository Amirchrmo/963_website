'use client';

import { useState } from 'react';
import { useI18n } from '@/components/providers/I18nProvider';
import { Reveal } from '@/components/animations/Reveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { galleryImages } from '@/lib/images';

export function Newsletter() {
  const { dict } = useI18n();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 4000);
  };

  const bg = galleryImages[12] ?? galleryImages[0];

  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] glass-panel md:rounded-[2.5rem]">
          <div className="absolute inset-0 opacity-20">
            <img
              src={bg.thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </div>
          <div className="relative z-10 grid gap-8 px-6 py-16 md:grid-cols-2 md:items-center md:px-14 md:py-20">
            <div>
              <span className="eyebrow">{dict.home.newsletterEyebrow}</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                <TextReveal text={dict.home.newsletterTitle} />
              </h2>
              <Reveal delay={0.2} className="mt-4 max-w-md text-pretty text-ink-500 dark:text-ink-400">
                {dict.home.newsletterBody}
              </Reveal>
            </div>

            <Reveal delay={0.25} className="md:justify-self-end md:w-full md:max-w-md">
              <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={dict.home.newsletterPlaceholder}
                  aria-label={dict.home.newsletterPlaceholder}
                  className="w-full rounded-full border border-ink-900/10 bg-ink-50/80 px-6 py-4 text-sm outline-none backdrop-blur-md focus:ring-2 focus:ring-ink-900/30 dark:border-white/10 dark:bg-ink-900/60 dark:focus:ring-white/30"
                />
                <button type="submit" className="btn-solid shrink-0 rounded-full px-7 py-4 text-sm font-semibold">
                  {sent ? dict.home.newsletterSuccess : dict.home.newsletterSubmit}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
