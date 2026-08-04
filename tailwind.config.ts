import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem', xl: '2.5rem' },
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0a',
          50: '#f7f7f7',
          100: '#ededed',
          200: '#d9d9d9',
          300: '#bfbfbf',
          400: '#9a9a9a',
          500: '#757575',
          600: '#525252',
          700: '#3d3d3d',
          800: '#262626',
          900: '#161616',
          950: '#0a0a0a',
        },
        accent: '#ffffff',
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        fa: ['var(--font-fa)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        display: ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at center, rgba(255,255,255,0.08), transparent 70%)',
        'grain':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.25)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.35)',
        glow: '0 0 60px rgba(255,255,255,0.15)',
      },
      backdropBlur: { xs: '2px' },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.08)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0,0)' },
          '100%': { transform: 'scale(1.12) translate(-1%, -1.5%)' },
        },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-rtl': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'spin-slow': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        // Hero slider active-button progress fill. Scales from 0 → 1 over the
        // autoplay interval; duration is overridden inline per slide.
        'hero-progress-fill': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.8s ease both',
        'scale-in': 'scale-in 1.2s cubic-bezier(0.16,1,0.3,1) both',
        'ken-burns': 'ken-burns 12s ease-out both',
        marquee: 'marquee 40s linear infinite',
        'marquee-rtl': 'marquee-rtl 40s linear infinite',
        shimmer: 'shimmer 1.6s infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 28s linear infinite',
        'hero-progress-fill': 'hero-progress-fill 7s linear forwards',
      },
    },
  },
  plugins: [],
};

export default config;
