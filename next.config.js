/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'cahramel-staging.sgp1.digitaloceanspaces.com',
      'cahramel-staging.sgp1.cdn.digitaloceanspaces.com',
      'cahramel.sgp1.digitaloceanspaces.com',
      'cahramel.sgp1.cdn.digitaloceanspaces.com',
      'cahramel-be-staging-n92zi.ondigitalocean.app/',
      'cms-stage.cahramel.com',
      'cms.cahramel.com',
      'cahramel.com'
    ],
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
