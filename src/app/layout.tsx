import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';
import { PageLoader } from '@/components/pwa/PageLoader';
import { SAMPLE_IMAGE } from '@/lib/images';

// Locally hosted fonts — fully self-contained, no network dependency.
// Sora (display), Inter (body/Latin), Vazirmatn (Farsi/RTL).
const display = localFont({
  src: '../../public/fonts/Sora.ttf',
  variable: '--font-display',
  display: 'swap',
});
const body = localFont({
  src: '../../public/fonts/Inter.ttf',
  variable: '--font-body',
  display: 'swap',
});
const fa = localFont({
  src: '../../public/fonts/Vazirmatn.ttf',
  variable: '--font-fa',
  display: 'swap',
});

const SITE = {
  name: '963 Running Club',
  url: 'https://runningclub.ir',
  description:
    '963 Running Club — an elite running community blending world-class coaching, science, and an unbreakable team spirit. Run beyond limits.',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Run Beyond Limits`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'running club',
    'marathon',
    'athletics',
    'runners',
    'coaching',
    '963',
    'endurance',
    'track and field',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
    languages: { en: '/', fa: '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fa_IR'],
    url: SITE.url,
    title: `${SITE.name} — Run Beyond Limits`,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: SAMPLE_IMAGE,
        width: 3024,
        height: 4032,
        alt: '963 Running Club athletes in action',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Run Beyond Limits`,
    description: SITE.description,
    images: [SAMPLE_IMAGE],
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: 'black-translucent',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsClub',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  sport: 'Running',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Valiasr Street',
    addressLocality: 'Tehran',
    addressCountry: 'IR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Preload the LCP image (first hero slide) so it starts fetching
            before the browser parses the <img> in the body. This is the
            single most impactful preload for Largest Contentful Paint. */}
        <link
          rel="preload"
          as="image"
          href="/images/home_section_1/home_1.jpg"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${fa.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <I18nProvider>
            <PageLoader />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
            >
              Skip to content
            </a>
            <Header />
            <main id="main" className="relative">
              {children}
            </main>
            <Footer />
            <ServiceWorkerRegister />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
