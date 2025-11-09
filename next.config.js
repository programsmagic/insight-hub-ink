/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'hooks'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  // Note: Custom headers cannot be used with static export (output: 'export')
  // Headers must be configured at the CDN/hosting level (see PRODUCTION.md)
};

module.exports = nextConfig;
