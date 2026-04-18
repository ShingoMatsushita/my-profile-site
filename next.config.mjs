import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.st-note.com',
      },
      {
        protocol: 'https',
        hostname: 'd2l930y2yx77uc.cloudfront.net',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
