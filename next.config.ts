import type {NextConfig} from 'next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // =================== WORKAROUNDS FOR PARALLEL ROUTE BUG ===================
  // The bug described in this MCVE (https://github.com/vercel/next.js/issues/71626)
  // can be worked around by using one of the following configurations.
  //
  // OPTION 1: Disable Partial Prerendering (PPR)
  // This is the recommended workaround as of Next.js 14.2.
  // experimental: {
  //   ppr: false,
  // },
  //
  // OPTION 2: Enable Trailing Slashes
  // This changes URL handling and can also resolve the issue.
  // trailingSlash: true,
  // ========================================================================
};

export default nextConfig;
