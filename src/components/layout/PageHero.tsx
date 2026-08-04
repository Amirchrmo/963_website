'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { TextReveal } from '@/components/animations/TextReveal';
import { Reveal } from '@/components/animations/Reveal';
import type { ImageItem } from '@/lib/images';

interface PageHeroProps {
  image: ImageItem;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/**
 * Cinematic inner-page hero: full-bleed background image with gradient,
 * animated headline, and subtitle. Used on About / Events / Gallery /
 * Products / Sponsors / Contact.
 */
export function PageHero({ image, eyebrow, title, subtitle }: PageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-28 md:min-h-[70vh]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={image.full}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className={`absolute inset-0 h-full w-full object-cover ${
            reduce ? '' : 'animate-ken-burns'
          }`}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pb-14 text-white md:pb-20">
        {eyebrow && (
          <motion.span
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {eyebrow}
          </motion.span>
        )}
        <h1 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
          <TextReveal text={title} delay={0.2} stagger={0.06} />
        </h1>
        {subtitle && (
          <Reveal
            direction="up"
            delay={0.4}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/80 md:text-lg"
          >
            {subtitle}
          </Reveal>
        )}
      </div>
    </section>
  );
}
