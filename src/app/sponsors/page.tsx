'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealStagger, revealItem } from '@/components/animations/Reveal';
import { SponsorMarquee } from '@/components/sections/SponsorMarquee';
import { CTABanner } from '@/components/sections/CTABanner';
import { SmartImage } from '@/components/ui/SmartImage';
import { motion } from 'framer-motion';
import { sponsors, sponsorImages } from '@/lib/images';

export default function SponsorsPage() {
  const { dict } = useI18n();
  const s = dict.sponsors;
  const ctaImg = sponsorImages[sponsorImages.length - 1] ?? sponsorImages[0];

  return (
    <>
      <PageHero
        image={sponsorImages[0]!}
        eyebrow={s.title}
        title={s.title}
        subtitle={s.subtitle}
      />

      {/* Logo wall — each logo links to the sponsor's Instagram page */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={s.title} title={s.subtitle} align="center" animated={false} className="mb-12" />
          <RevealStagger className="mx-auto grid max-w-3xl grid-cols-2 gap-6" staggerChildren={0.1}>
            {sponsors.map((sp) => (
              <motion.a
                key={sp.id}
                href={sp.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${sp.name} on Instagram`}
                variants={revealItem}
                className="group flex aspect-[3/2] flex-col items-center justify-center gap-4 rounded-3xl glass-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-glass-lg md:p-8"
              >
                <div className="relative h-20 w-full max-w-[180px] transition-transform duration-500 group-hover:scale-105">
                  <SmartImage src={sp.full} alt={sp.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="h-full w-full object-contain" />
                </div>
                <span className="text-sm font-bold tracking-wide">{sp.name}</span>
              </motion.a>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Infinite marquee */}
      <SponsorMarquee />

      {/* Partner CTA — single "Become a Partner" */}
      <CTABanner
        image={ctaImg}
        eyebrow={s.partnerTitle}
        title={s.partnerTitle}
        body={s.partnerBody}
        primary={{ label: dict.nav.contact, href: '/contact' }}
      />
    </>
  );
}
