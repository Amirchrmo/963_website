'use client';

import Link from 'next/link';
import { forwardRef } from 'react';

type Variant = 'glass' | 'solid' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: undefined;
}
interface ButtonAsLink extends BaseProps {
  href: string;
  /** Pass next/link props like prefetch */
  prefetch?: boolean;
}

type GlassButtonProps = ButtonAsButton | ButtonAsLink;

const sizeMap: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
};

const variantMap: Record<Variant, string> = {
  glass: 'btn-glass',
  solid: 'btn-solid',
  ghost: 'btn-ghost',
};

/**
 * Glassmorphism button with an animated sheen. Renders as <a> (via next/link)
 * when `href` is provided, otherwise a native <button>.
 */
export const GlassButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  GlassButtonProps
>(function GlassButton(
  { variant = 'glass', size = 'md', className = '', children, iconRight, iconLeft, ...rest },
  ref,
) {
  const classes = `${variantMap[variant]} ${sizeMap[size]} ${className}`;

  const inner = (
    <>
      {/* Sheen overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        <span className="absolute -inset-y-2 -left-1/3 w-1/3 rotate-12 bg-white/30 blur-md transition-transform duration-700 ease-out-expo group-hover:translate-x-[400%]" />
      </span>
      {iconLeft && <span className="relative z-10 inline-flex">{iconLeft}</span>}
      <span className="relative z-10">{children}</span>
      {iconRight && (
        <span className="relative z-10 inline-flex rtl-flip transition-transform duration-300 group-hover:translate-x-1">
          {iconRight}
        </span>
      )}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, prefetch, ...linkRest } = rest;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        prefetch={prefetch}
        className={`group ${classes}`}
        {...(linkRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </Link>
    );
  }

  const { href: _omit, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={`group ${classes}`}
      {...buttonRest}
    >
      {inner}
    </button>
  );
});
