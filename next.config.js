/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    swcPlugins: [],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    MODE: process.env.MODE,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
};
