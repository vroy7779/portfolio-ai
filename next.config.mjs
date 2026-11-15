import path from 'node:path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config) {
    // @splinetool/react-spline only declares an "import" export condition, which Next's server
    // build does not match. Pointing at the file directly sidesteps that.
    config.resolve.alias['@splinetool/react-spline$'] = path.join(
      process.cwd(),
      'node_modules/@splinetool/react-spline/dist/react-spline.js'
    )
    return config
  },
}

export default nextConfig
