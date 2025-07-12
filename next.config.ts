import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/_next/static/chunks/app/:folder*/@:slotName/:path*',
        destination: '/_next/static/chunks/app/:folder*/%40:slotName/:path*',
      },
    ],
    afterFiles: [],
    fallback: [],
  }),
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
