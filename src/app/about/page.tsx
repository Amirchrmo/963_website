'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassButton } from '@/components/ui/GlassButton';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal, RevealStagger, revealItem } from '@/components/animations/Reveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { motion } from 'framer-motion';
import { galleryImages, galleryChampImages } from '@/lib/images';

export default function AboutPage() {
  const { dict } = useI18n();
  const a = dict.about;

  const historyImg = galleryImages[5] ?? galleryImages[0];
  const philosophyImg = galleryChampImages[8] ?? galleryChampImages[0];
  const timelineImgs = [galleryImages[2], galleryImages[9], galleryImages[18], galleryChampImages[3], galleryImages[25]];
  const ctaImg = galleryImages[14] ?? galleryImages[0];

  return (
    <>
      <PageHero
        image={galleryChampImages[0] ?? galleryImages[0]}
        eyebrow={a.historyEyebrow}
        title={a.title}
        subtitle={a.subtitle}
      />

      {/* HISTORY */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass-panel">
              <SmartImage src={historyImg.full} alt={a.historyTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="h-full w-full" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow={a.historyEyebrow} title={a.historyTitle} animated={false} />
            <Reveal direction="up" delay={0.15} className="mt-6 text-pretty text-base leading-relaxed text-ink-500 dark:text-ink-400 md:text-lg">
              {a.historyBody}
            </Reveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <Reveal direction="up">
            <div className="flex h-full flex-col rounded-3xl glass-panel p-8 md:p-10">
              <span className="eyebrow">{a.missionEyebrow}</span>
              <h3 className="heading-display mt-3 text-2xl font-black md:text-3xl">{a.missionTitle}</h3>
              <p className="mt-4 text-pretty leading-relaxed text-ink-500 dark:text-ink-400">{a.missionBody}</p>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl glass-panel p-8 md:p-10">
              <span className="eyebrow">{a.visionEyebrow}</span>
              <h3 className="heading-display mt-3 text-2xl font-black md:text-3xl">{a.visionTitle}</h3>
              <p className="mt-4 text-pretty leading-relaxed text-ink-500 dark:text-ink-400">{a.visionBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow={a.philosophyEyebrow} title={a.philosophyTitle} animated={false} />
            <Reveal direction="up" delay={0.15} className="mt-6 text-pretty text-ink-500 dark:text-ink-400 md:text-lg">
              {a.philosophyBody}
            </Reveal>
            <RevealStagger className="mt-8 space-y-4" staggerChildren={0.1}>
              {a.philosophyPoints.map((p, i) => (
                <motion.div key={i} variants={revealItem} className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-900 text-sm font-bold text-white dark:bg-white dark:text-ink-950">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="pt-1.5 text-pretty text-sm leading-relaxed md:text-base">{p}</p>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
          <Reveal direction="right" delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] glass-panel">
              <SmartImage src={philosophyImg.full} alt={a.philosophyTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={a.achievementsEyebrow} title={a.achievementsTitle} align="center" className="mb-12" />
          <RevealStagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" staggerChildren={0.1}>
            {a.achievements.map((ach, i) => (
              <motion.div key={i} variants={revealItem} className="rounded-3xl glass-panel p-7">
                <div className="text-5xl font-black text-ink-900/10 dark:text-white/10">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 text-lg font-bold tracking-tight">{ach.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{ach.desc}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={a.timelineEyebrow} title={a.timelineTitle} align="center" className="mb-14" />
          <div className="relative mx-auto max-w-3xl">
            {/* center line */}
            <div className="absolute inset-y-0 left-4 w-px bg-ink-900/10 dark:bg-white/10 md:left-1/2 md:-translate-x-1/2" />
            <RevealStagger className="space-y-10" staggerChildren={0.12}>
              {a.timeline.map((t, i) => (
                <motion.div
                  key={i}
                  variants={revealItem}
                  className={`relative flex flex-col gap-4 pl-12 md:flex-row md:items-center md:gap-8 md:pl-0 ${
                    i % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-4 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-ink-900 ring-4 ring-[rgb(var(--bg))] dark:bg-white md:left-1/2" />
                  <div className="md:w-1/2" />
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-8 md:text-left' : 'md:pr-8 md:text-right'}`}>
                    <div className="overflow-hidden rounded-2xl glass-panel">
                      {timelineImgs[i] && (
                        <SmartImage src={timelineImgs[i].thumb} alt={t.title} width={timelineImgs[i].thumbW} height={timelineImgs[i].thumbH} className="h-32 w-full" />
                      )}
                    </div>
                    <div className="mt-4 text-3xl font-black tracking-tight">{t.year}</div>
                    <h3 className="mt-1 text-lg font-bold">{t.title}</h3>
                    <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      <CTABanner
        image={ctaImg}
        eyebrow={dict.nav.cta}
        title={a.missionTitle}
        primary={{ label: dict.nav.contact, href: '/contact' }}
        secondary={{ label: dict.nav.events, href: '/events' }}
      />
    </>
  );
}
