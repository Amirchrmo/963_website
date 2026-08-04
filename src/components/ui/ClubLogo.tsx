'use client';

/**
 * 963 Running Club logo mark — a stylized monogram/runner glyph.
 * Uses `currentColor` so it adapts to both light/dark themes automatically.
 */
export function ClubLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="963 Running Club logo"
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M30.5 14.5a2.75 2.75 0 1 1-2.75-2.75 2.75 2.75 0 0 1 2.75 2.75Z"
        fill="currentColor"
      />
      <path
        d="M16.5 36.5 21 27l5 3 3.5-4.5L33 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 27l-1-7 6 1.5 3-4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
