/** @type {import('next').NextConfig} */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const isDevelopment = process.env.NODE_ENV === 'development'

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost'],
    },
  },
  env: {
    BACK_API_URL: isDevelopment
      ? `https://localhost/api`
      : `http://backend:8080/api`,
    JWT_ACCESS_DURATION: '216000000',
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  images: {
    formats: ['image/webp'], // WebP 형식으로도 최적화하여 지원
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com', 'localhost'],
  },
  reactStrictMode: false,
}

export default nextConfig
