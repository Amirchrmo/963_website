'use client';

import { GlassButton } from '@/components/ui/GlassButton';
import { TextReveal } from '@/components/animations/TextReveal';
import { Reveal } from '@/components/animations/Reveal';
import type { ImageItem } from '@/lib/images';

interface CTABannerProps {
  image: ImageItem;
  eyebrow?: string;
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Full-width parallax-ish CTA banner with a background image and glass content. */
export function CTABanner({ image, eyebrow, title, body, primary, secondary }: CTABannerProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={image.full}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-start gap-6 px-6 py-20 text-white md:px-14 md:py-28 lg:py-32">
            {eyebrow && (
              <Reveal direction="fade">
                <span className="eyebrow text-white/70">{eyebrow}</span>
              </Reveal>
            )}
            <h2 className="max-w-3xl text-balance text-3xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              <TextReveal text={title} />
            </h2>
            {body && (
              <Reveal direction="up" delay={0.15} className="max-w-xl text-pretty text-base text-white/80 md:text-lg">
                {body}
              </Reveal>
            )}
            <Reveal direction="up" delay={0.3} className="flex flex-wrap gap-3 pt-2">
              <GlassButton href={primary.href} variant="solid" size="lg">
                {primary.label}
              </GlassButton>
              {secondary && (
                <GlassButton href={secondary.href} variant="glass" size="lg" className="text-white">
                  {secondary.label}
                </GlassButton>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
