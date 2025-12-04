import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@ahead/shared', '@ahead/db'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
