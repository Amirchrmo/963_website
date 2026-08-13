'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealStagger, revealItem } from '@/components/animations/Reveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { EventCard } from '@/components/cards/EventCard';
import { EventGallery } from '@/components/gallery/EventGallery';
import { motion } from 'framer-motion';
import {
  eventImages,
  galleryImages,
  caveRunImages,
  coffeeRunImages,
} from '@/lib/images';

/** Render a multi-line string as separated paragraphs. */
function MultiLine({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {text.split('\n').map((line, i) =>
        line.trim() === '' ? (
          <span key={i} className="block h-3" aria-hidden="true" />
        ) : (
          <span key={i} className={`block ${className}`}>
            {line}
          </span>
        ),
      )}
    </>
  );
}

// Upcoming events displayed at the top of the Events page.
const UPCOMING = [
  {
    title: 'Coffee + Night Run',
    location: 'Shorabil Lake',
    distance: '3km',
    status: 'Open',
    desc: 'Lace up as the sun goes down and join us for a relaxed 3km loop around Shorabil Lake, capped off with warm coffee and good company under the stars.',
  },
  {
    title: 'Breakfast + Coffee Run',
    location: 'Nature',
    status: 'Open',
    desc: 'A refreshing morning run through nature followed by coffee and breakfast together. Start your day moving, then refuel and connect with fellow runners.',
  },
];

export default function EventsPage() {
  const { dict } = useI18n();
  const e = dict.events;

  const ctaImg = eventImages[eventImages.length - 2] ?? eventImages[0];
  // Map each past event to its own gallery.
  const pastGalleries = [caveRunImages, coffeeRunImages];

  return (
    <>
      <PageHero
        image={eventImages[0] ?? galleryImages[0]}
        eyebrow={e.upcomingEyebrow}
        title={e.title}
        subtitle={e.subtitle}
      />

      {/* ===== UPCOMING (visually prioritized at the top) ===== */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={e.upcomingEyebrow} title={e.upcomingTitle} className="mb-12" />
          <RevealStagger className="grid gap-6 md:grid-cols-2" staggerChildren={0.12}>
            {UPCOMING.map((ev, i) => (
              <motion.div key={i} variants={revealItem}>
                <EventCard
                  image={eventImages[i] ?? eventImages[0]}
                  title={ev.title}
                  location={ev.location}
                  distance={ev.distance}
                  status={ev.status}
                  desc={ev.desc}
                  ctaLabel={e.registerCta}
                  ctaHref="/contact"
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===== PAST EVENTS (each with bilingual desc + gallery) ===== */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={e.pastEyebrow} title={e.pastTitle} className="mb-14" />

          <div className="space-y-20">
            {e.pastEvents.map((ev, i) => (
              <Reveal key={i} direction="up">
                <article className="overflow-hidden rounded-[2rem] glass-panel">
                  {/* Header */}
                  <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center md:gap-8 lg:p-10">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[4/3] md:w-64 lg:w-72">
                      <img
                        src={(pastGalleries[i]?.[0] ?? eventImages[0]).thumb}
                        alt={ev.title}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight sm:text-3xl">{ev.title}</h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink-400">
                        {ev.name}
                      </p>
                    </div>
                  </div>

                  {/* Descriptions — Persian first, English below */}
                  <div className="grid gap-6 px-6 pb-6 sm:px-8 md:grid-cols-2 md:gap-10 lg:px-10 lg:pb-8">
                    <div className="font-fa text-pretty text-base leading-loose text-ink-600 dark:text-ink-300" dir="rtl">
                      <MultiLine text={ev.faDesc} />
                    </div>
                    <div className="text-pretty text-sm leading-relaxed text-ink-500 dark:text-ink-400 md:text-base">
                      <MultiLine text={ev.enDesc} />
                    </div>
                  </div>

                  {/* Gallery */}
                  <div className="border-t border-ink-900/10 p-6 dark:border-white/10 sm:p-8 lg:p-10">
                    <EventGallery images={pastGalleries[i] ?? []} idPrefix={`event-${i}`} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        image={ctaImg}
        eyebrow={e.registerCta}
        title={e.title}
        body={e.subtitle}
        primary={{ label: e.registerCta, href: '/contact' }}
        secondary={{ label: dict.nav.gallery, href: '/gallery' }}
      />
    </>
  );
}
