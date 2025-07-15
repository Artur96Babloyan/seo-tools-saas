import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow serving static HTML files
  async rewrites() {
    return [
      {
        source: '/google9a27825822572195.html',
        destination: '/api/google-verification',
      },
    ];
  },
};

export default nextConfig;
