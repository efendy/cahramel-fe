// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

 const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://client-stage.cahramel.com/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://client.cahramel.com/:path*',
      },
    ]
  },
};

module.exports = nextConfig;