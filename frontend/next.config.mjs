/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost'],
    },
  },
  env: {
    BACKEND: 'backend',
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com'],
  },
}

export default nextConfig
