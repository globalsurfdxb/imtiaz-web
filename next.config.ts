import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.16.16.166'],
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
    domains: ["globalsurf.digital"],
  },

  async redirects() {
    return [
      {
        source: "/communities-v2",
        destination: "/communities",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
