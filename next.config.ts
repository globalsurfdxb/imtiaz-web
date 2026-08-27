import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
