import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/llm-genealogy",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
