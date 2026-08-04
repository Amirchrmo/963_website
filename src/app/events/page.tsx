'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealStagger, revealItem } from '@/components/animations/Reveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { EventCard } from '@/components/cards/EventCard';
import { motion } from 'framer-motion';
import { eventImages, galleryImages } from '@/lib/images';

export default function EventsPage() {
  const { dict } = useI18n();
  const e = dict.events;

  // Split items into upcoming (first 2) and past (last 2) for the demo layout.
  const upcoming = e.items.slice(0, 2);
  const past = e.items.slice(2);
  const ctaImg = eventImages[eventImages.length - 2] ?? eventImages[0];

  return (
    <>
      <PageHero
        image={eventImages[0] ?? galleryImages[0]}
        eyebrow={e.upcomingEyebrow}
        title={e.title}
        subtitle={e.subtitle}
      />

      {/* UPCOMING */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={e.upcomingEyebrow} title={e.upcomingTitle} className="mb-12" />
          <RevealStagger className="grid gap-6 md:grid-cols-2" staggerChildren={0.12}>
            {upcoming.map((ev, i) => (
              <motion.div key={i} variants={revealItem}>
                <EventCard
                  image={eventImages[i] ?? eventImages[0]}
                  title={ev.title}
                  location={ev.location}
                  date={ev.date}
                  distance={ev.distance}
                  status={ev.status}
                  desc={ev.desc}
                  ctaLabel={e.registerCta}
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* PAST */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={e.pastEyebrow} title={e.pastTitle} className="mb-12" />
          <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-2" staggerChildren={0.12}>
            {past.map((ev, i) => (
              <motion.div key={i} variants={revealItem}>
                <EventCard
                  image={eventImages[i + 2] ?? eventImages[0]}
                  title={ev.title}
                  location={ev.location}
                  date={ev.date}
                  distance={ev.distance}
                  status={ev.status}
                  desc={ev.desc}
                  ctaLabel={e.registerCta}
                />
              </motion.div>
            ))}
          </RevealStagger>
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
