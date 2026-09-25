import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allowedDevOrigins: ['172.16.16.166', '172.16.16.220'],
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
            {
        source: "/studio-apartments",
        destination: "/apartments-for-sale-in-dubai/studio-apartments",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
