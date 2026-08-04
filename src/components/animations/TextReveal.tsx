'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Split mode: per-word or per-line (line splits on \n). */
  mode?: 'words' | 'lines';
}

/**
 * Animated headline: splits text into words/lines and reveals each with a
 * staggered upward motion. Produces the cinematic "headline rises" effect.
 */
export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.06,
  mode = 'words',
}: TextRevealProps) {
  const reduce = useReducedMotion();

  const units = mode === 'lines' ? text.split('\n') : text.split(' ');

  if (reduce) {
    return (
      <span className={className}>
        {mode === 'lines' ? text : text}
      </span>
    );
  }

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const child = {
    hidden: { y: '110%', opacity: 0 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.span
      className={`inline-block ${mode === 'lines' ? '' : 'whitespace-normal'}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="reveal-line align-bottom"
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={child}>
            {unit}
            {mode === 'words' && i < units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
