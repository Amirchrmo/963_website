'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { SponsorMarquee } from '@/components/sections/SponsorMarquee';
import { CTABanner } from '@/components/sections/CTABanner';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassButton } from '@/components/ui/GlassButton';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal, RevealStagger, revealItem } from '@/components/animations/Reveal';
import { TextReveal } from '@/components/animations/TextReveal';
import { EventCard } from '@/components/cards/EventCard';
import { StatisticCard } from '@/components/cards/StatisticCard';
import { motion } from 'framer-motion';
import {
  galleryImages,
  galleryChampImages,
  introCollageImages,
  homeEventImages,
} from '@/lib/images';

export default function HomePage() {
  const { dict } = useI18n();
  const h = dict.home;

  // CTA banner image — uses the unified local sample pool.
  const ctaImage = galleryChampImages[1] ?? galleryImages[10];

  // Intro collage uses the dedicated 3 local images.
  const collage = introCollageImages;

  return (
    <>
      {/* ===== HERO ===== */}
      <HeroSlider />

      {/* ===== INTRO ===== */}
      <section id="intro" className="section scroll-mt-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <span className="eyebrow">{h.introEyebrow}</span>
            <h2 className="heading-display mt-4 text-balance">
              <TextReveal text={h.introTitle} />
            </h2>
            <Reveal direction="up" delay={0.2} className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-500 dark:text-ink-400 md:text-lg">
              {h.introBody}
            </Reveal>
            <Reveal direction="up" delay={0.35} className="mt-8 flex flex-wrap gap-3">
              <GlassButton href="/about" variant="solid" size="lg">
                {dict.common.learnMore}
              </GlassButton>
              <GlassButton href="/contact" variant="ghost" size="lg">
                {dict.nav.cta}
              </GlassButton>
            </Reveal>
          </div>

          {/* Image collage — 3 dedicated local images */}
          <Reveal direction="scale" delay={0.2} className="relative">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl glass-panel">
                <SmartImage
                  src={collage[0].thumb}
                  alt="963 runners in action"
                  fill
                  zoomOnHover
                  priority
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-12 grid gap-4">
                <div className="relative aspect-square overflow-hidden rounded-3xl glass-panel">
                  <SmartImage
                    src={collage[1].thumb}
                    alt="Champion athlete"
                    fill
                    zoomOnHover
                    priority
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass-panel">
                  <SmartImage
                    src={collage[2].thumb}
                    alt="Training session"
                    fill
                    zoomOnHover
                    priority
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              {/* Floating stat chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-2xl glass-strong px-6 py-4 text-center shadow-glass-lg"
              >
                <div className="text-2xl font-black tracking-tight">963</div>
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-400">
                  Running Club
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={h.statsTitle}
            title={h.statsTitle}
            align="center"
            className="mb-12"
          />
          <RevealStagger
            className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4"
            staggerChildren={0.1}
          >
            {h.stats.map((stat, i) => (
              <motion.div key={i} variants={revealItem}>
                <StatisticCard value={stat.value} label={stat.label} index={i} />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===== EVENTS PREVIEW ===== */}
      <section className="section">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={h.eventsEyebrow}
              title={h.eventsTitle}
            />
            <Reveal direction="fade">
              <GlassButton href="/events" variant="ghost" size="md">
                {dict.common.viewAll} →
              </GlassButton>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {h.homeEvents.map((ev, i) => (
              <Reveal key={i} direction="up" delay={i * 0.1}>
                <EventCard
                  image={homeEventImages[i] ?? homeEventImages[0]}
                  title={ev.title}
                  location={ev.location}
                  date={ev.date}
                  distance={ev.distance}
                  desc={ev.desc}
                  ctaLabel={dict.common.register}
                  ctaHref="/contact"
                  priority={i === 0}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <SponsorMarquee />

      {/* ===== FINAL CTA ===== */}
      <CTABanner
        image={ctaImage}
        eyebrow={dict.nav.cta}
        title={dict.hero.slides[0].title}
        body={dict.hero.slides[0].subtitle}
        primary={{ label: dict.nav.contact, href: '/contact' }}
        secondary={{ label: dict.nav.events, href: '/events' }}
      />
    </>
  );
}
