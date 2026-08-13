'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { Reveal, RevealStagger, revealItem } from '@/components/animations/Reveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { motion } from 'framer-motion';
import { galleryImages, galleryChampImages } from '@/lib/images';

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

export default function AboutPage() {
  const { dict } = useI18n();
  const a = dict.about;

  const identityImg = galleryChampImages[8] ?? galleryChampImages[0];
  const shorabilImg = galleryImages[0] ?? galleryChampImages[0];
  const takhtiImg = galleryChampImages[3] ?? galleryChampImages[0];
  const genesisImg = galleryImages[9] ?? galleryImages[0];
  const timelineImgs = [galleryImages[2], galleryImages[9], galleryChampImages[3]];
  const ctaImg = galleryImages[14] ?? galleryImages[0];

  return (
    <>
      <PageHero
        image={galleryChampImages[0] ?? galleryImages[0]}
        eyebrow={a.pageEyebrow}
        title={a.title}
        subtitle={a.subtitle}
      />

      {/* ===== IDENTITY (formerly "Our roots") ===== */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass-panel">
              <SmartImage src={identityImg.full} alt={a.identityTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="h-full w-full" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow={a.identityEyebrow} title={a.identityTitle} animated={false} />
            <Reveal direction="up" delay={0.1}>
              <p className="mt-4 text-2xl font-black tracking-tight md:text-3xl">
                {a.identityLead}
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2} className="mt-6 text-pretty text-base leading-relaxed text-ink-500 dark:text-ink-400 md:text-lg">
              <MultiLine text={a.identityBody} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== SHORABIL LAKE — Persian first, English below ===== */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] glass-panel lg:sticky lg:top-28">
              <SmartImage src={shorabilImg.full} alt={a.shorabilEyebrow} fill sizes="(max-width: 1024px) 100vw, 50vw" className="h-full w-full" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow={a.shorabilEyebrow} title={a.shorabilTitle} animated={false} />
            {/* Persian */}
            <Reveal direction="up" delay={0.15} className="mt-6 text-base leading-loose md:text-lg">
              <div className="font-fa text-pretty text-ink-600 dark:text-ink-300" dir="rtl">
                <MultiLine text={a.shorabilFa} />
              </div>
            </Reveal>
            {/* English */}
            <Reveal direction="up" delay={0.25} className="mt-6 border-t border-ink-900/10 pt-6 text-pretty text-sm leading-relaxed text-ink-500 dark:border-white/10 dark:text-ink-400 md:text-base">
              <MultiLine text={a.shorabilEn} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== TAKHTI STADIUM — Persian first, English below ===== */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          <div className="lg:order-2">
            <Reveal direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] glass-panel lg:sticky lg:top-28">
                <SmartImage src={takhtiImg.full} alt={a.takhtiEyebrow} fill sizes="(max-width: 1024px) 100vw, 50vw" className="h-full w-full" />
              </div>
            </Reveal>
          </div>
          <div className="lg:order-1">
            <SectionHeading eyebrow={a.takhtiEyebrow} title={a.takhtiTitle} animated={false} />
            {/* Persian */}
            <Reveal direction="up" delay={0.15} className="mt-6 text-base leading-loose md:text-lg">
              <div className="font-fa text-pretty text-ink-600 dark:text-ink-300" dir="rtl">
                <MultiLine text={a.takhtiFa} />
              </div>
            </Reveal>
            {/* English */}
            <Reveal direction="up" delay={0.25} className="mt-6 border-t border-ink-900/10 pt-6 text-pretty text-sm leading-relaxed text-ink-500 dark:border-white/10 dark:text-ink-400 md:text-base">
              <MultiLine text={a.takhtiEn} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== GENESIS (formerly "How we train") ===== */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow={a.genesisEyebrow} title={a.genesisTitle} animated={false} />
            <RevealStagger className="mt-8 space-y-6" staggerChildren={0.1}>
              {a.genesisPoints.map((p, i) => (
                <motion.div key={i} variants={revealItem} className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-900 text-sm font-bold text-white dark:bg-white dark:text-ink-950">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5">
                    <p className="text-pretty text-base font-bold leading-snug md:text-lg">{p.line1}</p>
                    <p className="mt-1 text-pretty text-sm leading-relaxed text-ink-500 dark:text-ink-400 md:text-base">{p.line2}</p>
                  </div>
                </motion.div>
              ))}
            </RevealStagger>
          </div>
          <Reveal direction="right" delay={0.2}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] glass-panel">
              <SmartImage src={genesisImg.full} alt={a.genesisTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={a.achievementsEyebrow} title={a.achievementsTitle} align="center" className="mb-12" />
          <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.1}>
            {a.achievements.map((ach, i) => (
              <motion.div key={i} variants={revealItem} className="flex h-full flex-col rounded-3xl glass-panel p-7">
                <div className="text-5xl font-black text-ink-900/10 dark:text-white/10">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 text-lg font-bold tracking-tight">{ach.title}</h3>
                {ach.desc && (
                  <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">{ach.desc}</p>
                )}
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
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
        title={a.identityTitle}
        primary={{ label: dict.nav.contact, href: '/contact' }}
        secondary={{ label: dict.nav.events, href: '/events' }}
      />
    </>
  );
}
