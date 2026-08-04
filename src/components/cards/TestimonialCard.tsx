'use client';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <figure className="relative flex h-full flex-col justify-between rounded-3xl glass-panel p-8 md:p-10">
      <svg
        className="mb-4 h-10 w-10 text-ink-900/15 dark:text-white/20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.5 7H6a3 3 0 0 0-3 3v7h7v-7H5.5a1 1 0 0 1 1-1h3V7zm9 0H15a3 3 0 0 0-3 3v7h7v-7h-4.5a1 1 0 0 1 1-1h3V7z" />
      </svg>
      <blockquote className="text-pretty text-lg leading-relaxed text-ink-800 dark:text-ink-100 md:text-xl">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ink-900 text-sm font-bold text-white dark:bg-white dark:text-ink-950">
          {author.charAt(0)}
        </span>
        <span>
          <span className="block text-sm font-bold">{author}</span>
          <span className="block text-xs text-ink-500 dark:text-ink-400">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
