/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Frontend-only static export.
  // Produces a fully static `out/` directory (HTML + JS + CSS + public assets)
  // that Nginx serves directly. NO Node server, NO backend, NO API.
  output: 'export',

  // Generate `/<route>/index.html` for every route so Nginx's
  // `try_files $uri $uri/` resolves each static page correctly.
  trailingSlash: true,

  // Production build optimizations
  productionBrowserSourceMaps: false,
  images: {
    // Fully disable the Next.js `/_next/image` optimizer. Every image in the
    // app is rendered with a plain `<img>` pointing at a local file in
    // `/public/images/...`, so the browser fetches it directly as a static
    // asset — no on-demand resize/encode, no per-request processing.
    unoptimized: true,
    // HARD block on any remote image source — all images are local only.
    remotePatterns: [],
  },

  // NOTE: The `headers()` function is intentionally removed. Static export
  // (`output: 'export'`) does not support custom route headers at the Next.js
  // layer. All caching / content-type headers are instead enforced by the
  // Nginx `default.conf` that serves the exported `out/` directory.
};

module.exports = nextConfig;
