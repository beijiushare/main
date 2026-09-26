import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'doubanio.viki.moe',
      },
    ],
  },
}

export default nextConfig
