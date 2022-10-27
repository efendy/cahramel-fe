// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

// @ts-ignore
const nextConfig = withPWA({
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
});

module.exports = nextConfig;
