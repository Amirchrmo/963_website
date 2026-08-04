/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Production build optimizations
  productionBrowserSourceMaps: false,
  images: {
    // Fully disable the Next.js `/_next/image` optimizer. Every image in the
    // app is rendered with a plain `<img>` pointing at a local file in
    // `/public/images/...`, so the browser fetches it directly as a static
    // asset — no on-demand resize/encode, no per-request processing, and the
    // long-cache `Cache-Control` header below applies as-is.
    unoptimized: true,
    // HARD block on any remote image source — all images are local only.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [{ key: 'Content-Type', value: 'application/manifest+json' }],
      },
      {
        source: '/icons/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Locally hosted fonts — immutable long cache.
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Pre-built optimized images — immutable long cache.
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

module.exports = nextConfig;
