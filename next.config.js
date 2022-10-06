// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

const composer = require('next-compose-plugins');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  // disabled has bug, will fix on next version
  disable: process.env.NODE_ENV === 'development',
  register: true,
  runtimeCaching,
});

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
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
  typescript: {
    ignoreBuildErrors: false,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
  // env: {
  //   APP_NAME: process.env.APP_NAME,
  //   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  //   STRAPI_URL: process.env.STRAPI_URL,
  //   STRAPI_TOKEN_NAME: process.env.STRAPI_TOKEN_NAME,
  // },
};

module.exports = composer(
	[
		withPWA,
	],
	nextConfig,
);

// module.exports = nextConfig;
