/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    domains: [],
    unoptimized: true,
  },
  // Optimize for serverless
  output: 'standalone',
}

module.exports = nextConfig
