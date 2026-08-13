'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import { sponsors } from '@/lib/images';

/** Infinite horizontal logo slider. Pauses on hover, mirrors for seamless loop. */
export function SponsorMarquee() {
  const { dict, dir } = useI18n();
  const loop = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="section overflow-hidden">
      <div className="container">
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.3em] text-ink-400">
          {dict.home.sponsorsEyebrow} · {dict.home.sponsorsTitle}
        </p>
      </div>
      <div
        className="group relative flex overflow-hidden mask-fade-r"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}
      >
        <div
          className={`flex shrink-0 items-center gap-16 pe-16 ${dir === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee'} [animation-play-state:running] group-hover:[animation-play-state:paused]`}
        >
          {loop.map((s, i) => (
            <a
              key={`${s.id}-${i}`}
              href={s.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.name} on Instagram`}
              className="flex w-44 shrink-0 flex-col items-center gap-3 grayscale transition-all duration-500 hover:grayscale-0"
            >
              <div className="relative h-20 w-20 transition-transform duration-500 hover:scale-110">
                <img
                  src={s.full}
                  alt={s.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-lg"
                  draggable={false}
                />
              </div>
              <span className="text-sm font-semibold tracking-wide text-ink-500 dark:text-ink-400">
                {s.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
