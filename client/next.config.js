/** @type {import('next').NextConfig} */

const withVideos = require('next-videos')
 

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = withVideos()
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/api/v1/**',
      },
    ],
  },
}