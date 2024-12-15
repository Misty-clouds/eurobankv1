import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'ar'], // Supported locales
    defaultLocale: 'en',   // Default locale
  },
};

export default nextConfig;
