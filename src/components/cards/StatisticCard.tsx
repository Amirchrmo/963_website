'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';

interface StatisticCardProps {
  /** Display value, may contain non-numeric chars (e.g. "+", "۰-۹"). */
  value: string;
  label: string;
  index?: number;
}

/** Parse the leading numeric portion of a localized value for count-up. */
function parseNumeric(value: string): { num: number; prefix: string; suffix: string; digits: string } {
  // Normalize Persian/Arabic digits to Latin for parsing.
  const toLatin = (s: string) =>
    s.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  const latin = toLatin(value);
  const match = latin.match(/(\D*)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { num: 0, prefix: '', suffix: value, digits: '' };
  return {
    num: parseFloat(match[2]),
    prefix: match[1] ?? '',
    suffix: match[3] ?? '',
    digits: match[2] ?? '',
  };
}

export function StatisticCard({ value, label, index = 0 }: StatisticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { num, prefix, suffix, digits } = parseNumeric(value);
  const isFa = /[۰-۹]/.test(value);
  const [display, setDisplay] = useState(digits ? `${prefix}0${suffix}` : value);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView || !digits) return;
    const controls = animate(mv, num, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const rounded = Number.isInteger(num) ? Math.round(v) : v.toFixed(1);
        let valStr = String(rounded);
        if (isFa) {
          valStr = valStr.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d]);
        }
        setDisplay(`${prefix}${valStr}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, num, prefix, suffix, digits, isFa, mv]);

  return (
    <div ref={ref} className="group relative overflow-hidden rounded-2xl glass-panel p-6 transition-colors hover:bg-ink-900/[0.04] dark:hover:bg-white/[0.06]">
      <div className="pointer-events-none absolute -right-6 -top-6 text-[7rem] font-black leading-none text-ink-900/[0.04] transition-all duration-500 group-hover:scale-110 dark:text-white/[0.05]">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="relative">
        <div className="text-4xl font-black tracking-tight md:text-5xl">{display}</div>
        <div className="mt-2 text-sm text-ink-500 dark:text-ink-400">{label}</div>
      </div>
    </div>
  );
}
