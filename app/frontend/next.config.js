/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['images.kavak.services', 'viladoscarros.com.br', 'github.com'],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    })

    return config
  },
}

module.exports = nextConfig
