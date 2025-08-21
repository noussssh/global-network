import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore LICENSE files
    config.module.rules.push({
      test: /LICENSE$/,
      use: 'ignore-loader'
    });
    
    return config;
  },
  serverExternalPackages: ['@libsql/client']
};

export default nextConfig;
