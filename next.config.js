/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
    domains: ['digitaloceanspaces.com'],
    domains: ['ondigitalocean.app'],
    domains: ['goodii.app'],
  },
  // experimental: {
  //   images: {
  //     unoptimized: true,
  //   },
  // },
};

module.exports = nextConfig;
