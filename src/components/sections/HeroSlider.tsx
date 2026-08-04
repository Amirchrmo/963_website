'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useI18n } from '@/components/providers/I18nProvider';
import { GlassButton } from '@/components/ui/GlassButton';
import { TextReveal } from '@/components/animations/TextReveal';
import { heroSliderImages } from '@/lib/images';

const AUTOPLAY_MS = 7000;

export function HeroSlider() {
  const { dict } = useI18n();
  const slides = dict.hero.slides;
  const reduce = useReducedMotion();

  // Full-screen hero slider uses the dedicated local hero section images.
  // There are exactly 5 hero images, so the carousel cycles through 5
  // positions (one button per image). The text slides are cycled via modulo
  // so each of the 5 image positions is navigable on its own.
  const heroImages = heroSliderImages;
  const count = heroImages.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((p) => (p + 1) % count),
    [count],
  );
  const goTo = (i: number) => setActive(i);

  // The 3 text slides cycle (modulo) across the 5 image positions so every
  // hero image is navigable on its own and the copy never reads as undefined.
  const currentSlide = slides[active % slides.length];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured"
    >
      {/* Slides — one per hero image (5 total) */}
      <AnimatePresence mode="sync">
        {heroImages.map((image, i) =>
          i === active ? (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden={i !== active}
            >
              <div className="absolute inset-0">
                <img
                  src={image.full}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  className={`absolute inset-0 h-full w-full object-cover ${
                    reduce ? '' : 'animate-ken-burns'
                  }`}
                  draggable={false}
                />
              </div>
              {/* Cinematic gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="container relative z-10 flex h-full flex-col justify-center">
        <div className="max-w-3xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {currentSlide.eyebrow}
              </motion.span>

              <h1 className="text-hero font-black leading-[0.95] tracking-tight">
                <TextReveal text={currentSlide.title} delay={0.3} stagger={0.08} />
              </h1>

              <motion.p
                className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/80 md:text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentSlide.subtitle}
              </motion.p>

              <motion.div
                className="mt-9 flex flex-wrap items-center gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassButton href="/about" variant="solid" size="lg">
                  {dict.common.explore}
                </GlassButton>
                <GlassButton href="/events" variant="glass" size="lg" className="text-white">
                  {dict.nav.events}
                </GlassButton>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute inset-x-0 bottom-8 z-10">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-3" role="tablist" aria-label="Slides">
            {heroImages.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="group relative h-1 overflow-hidden rounded-full bg-white/20 transition-all duration-500"
                style={{ width: i === active ? 56 : 24 }}
              >
                {i === active && (
                  <span
                    key={active}
                    className="animate-hero-progress-fill absolute inset-0 origin-left bg-white"
                    style={{
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Scroll cue */}
          <a
            href="#intro"
            className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white md:flex"
          >
            {dict.hero.scroll}
            <span className="relative flex h-8 w-5 justify-center rounded-full border border-white/30">
              <motion.span
                className="mt-1.5 h-1.5 w-1 rounded-full bg-white"
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
