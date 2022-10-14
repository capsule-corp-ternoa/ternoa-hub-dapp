/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['ipfs-dev.trnnfr.com'],
  },
}

module.exports = nextConfig
