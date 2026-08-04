'use client';

import { TextReveal } from '@/components/animations/TextReveal';
import { Reveal } from '@/components/animations/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Render the title with the animated word-by-word reveal. */
  animated?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  animated = true,
}: SectionHeadingProps) {
  const alignClasses = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClasses} ${className}`}>
      {eyebrow && (
        <Reveal direction="fade" duration={0.6}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <h2 className="heading-display text-balance">
        {animated ? <TextReveal text={title} /> : title}
      </h2>
      {subtitle && (
        <Reveal direction="up" delay={0.15} className="text-pretty text-base leading-relaxed text-ink-500 dark:text-ink-400 md:text-lg">
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}
