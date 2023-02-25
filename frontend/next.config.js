/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const path = require('path')

const withInterceptStdout = require('next-intercept-stdout')

const nextConfig = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
      config.resolve.alias['@'] = path.join(__dirname, 'src')
      config.resolve.alias['~'] = path.join(__dirname, 'public')
      return config
    },
    compiler: {
      styledComponents: true
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'maps.gstatic.com',
          port: '',
          pathname: '/mapfiles/place_api/icons/v1/**'
        },
        {
          protocol: 'https',
          hostname: 'maps.googleapis.com',
          port: '',
          pathname: '/maps/api/place/js/**'
        },
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**'
        }
      ]
    }
  },
  text => (text.includes('Duplicate atom key') ? '' : text)
)

module.exports = nextConfig
