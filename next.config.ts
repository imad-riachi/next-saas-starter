import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    ppr: true,
    newDevOverlay: true,
    mdxRs: true,
  },
};
const withMDX = createMDX({});

export default withMDX(nextConfig);
