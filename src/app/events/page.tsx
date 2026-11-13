'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealStagger, revealItem } from '@/components/animations/Reveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { UpcomingEventCard } from '@/components/events/UpcomingEventCard';
import { PastEventCard } from '@/components/events/PastEventCard';
import {
  PastEventSheet,
  UpcomingEventSheet,
  type PastEventData,
  type UpcomingEventData,
} from '@/components/events/EventSheets';
import {
  eventImages,
  galleryImages,
  heroSliderImages,
  caveRunImages,
  coffeeRunImages,
  nightRunImages,
  pastEventCovers,
  walkTalkCover,
  walkTalkPhotoRows,
} from '@/lib/images';
import { INSTAGRAM_DM_URL } from '@/lib/links';

// Upcoming events displayed at the top of the Events page.
const UPCOMING: UpcomingEventData[] = [
  {
    title: 'WALK&TALK',
    location: 'Comode cafe',
    status: 'Open',
    desc: 'Enjoy a coffee experience at @comode.concept with a walking conversation in English with an international English teacher @sarasenglishcorner\n\nJoin TEAM963',
    poster: walkTalkCover,
    photoRows: walkTalkPhotoRows,
  },
  {
    title: 'Breakfast + Coffee Run',
    location: 'Nature',
    status: 'Open',
    desc: 'A refreshing morning run through nature followed by coffee and breakfast together. Start your day moving, then refuel and connect with fellow runners.',
    poster: 'logo',
  },
];

// Galleries for `dict.events.pastEvents`, in the same order.
const PAST_GALLERIES = [caveRunImages, coffeeRunImages, nightRunImages];

export default function EventsPage() {
  const { dict } = useI18n();
  const e = dict.events;

  const ctaImg = heroSliderImages[1] ?? eventImages[0];
  const past = useMemo<PastEventData[]>(
    () =>
      e.pastEvents.map((ev, i) => {
        const photos = PAST_GALLERIES[i] ?? [];
        return { ...ev, photos, cover: pastEventCovers[i] ?? photos[0] ?? eventImages[0] };
      }),
    [e.pastEvents],
  );

  const [openUpcoming, setOpenUpcoming] = useState<number | null>(null);
  const [openPast, setOpenPast] = useState<number | null>(null);

  return (
    <>
      <PageHero
        image={eventImages[0] ?? galleryImages[0]}
        eyebrow={e.upcomingEyebrow}
        title={e.title}
        subtitle={e.subtitle}
      />

      {/* ===== UPCOMING — swipeable cards on phones, grid from md ===== */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={e.upcomingEyebrow} title={e.upcomingTitle} className="mb-8 md:mb-12" />
          <RevealStagger
            className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
            staggerChildren={0.12}
          >
            {UPCOMING.map((ev, i) => (
              <motion.div
                key={ev.title}
                variants={revealItem}
                className="w-[84%] max-w-sm shrink-0 snap-start xs:w-[70%] md:w-auto md:max-w-none"
              >
                <UpcomingEventCard
                  poster={ev.poster}
                  title={ev.title}
                  location={ev.location}
                  status={ev.status}
                  desc={ev.desc}
                  detailsLabel={e.details}
                  ctaLabel={e.registerCta}
                  ctaHref={INSTAGRAM_DM_URL}
                  onOpen={() => setOpenUpcoming(i)}
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===== PAST — list rows on phones, card grid from md ===== */}
      <section className="section pt-0 md:pt-0 lg:pt-0">
        <div className="container">
          <SectionHeading eyebrow={e.pastEyebrow} title={e.pastTitle} className="mb-8 md:mb-12" />
          <RevealStagger className="grid gap-3 md:grid-cols-3 md:gap-6" staggerChildren={0.08}>
            {past.map((ev, i) => (
              <motion.div key={ev.title} variants={revealItem}>
                <PastEventCard
                  cover={ev.cover}
                  title={ev.title}
                  name={ev.name}
                  photos={ev.photos}
                  photosLabel={e.photos}
                  onOpen={() => setOpenPast(i)}
                />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <UpcomingEventSheet
        event={openUpcoming !== null ? UPCOMING[openUpcoming] : null}
        onClose={() => setOpenUpcoming(null)}
        ctaLabel={e.registerCta}
        ctaHref={INSTAGRAM_DM_URL}
      />
      <PastEventSheet
        event={openPast !== null ? past[openPast] : null}
        onClose={() => setOpenPast(null)}
        photosLabel={e.photos}
      />

      <CTABanner
        image={ctaImg}
        eyebrow={e.registerCta}
        title={e.title}
        body={e.subtitle}
        primary={{ label: e.registerCta, href: INSTAGRAM_DM_URL }}
        secondary={{ label: dict.nav.gallery, href: '/gallery' }}
      />
    </>
  );
}
