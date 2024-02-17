/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost'],
    },
  },
  env: {
    BACKEND: process.env.BACKEND,
    TMBD_API_KEY: process.env.TMBD_API_KEY,
  },
}

export default nextConfig
