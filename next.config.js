const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')()
const SentryPlugin = require('webpack-sentry-plugin');

const nextConfig = {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  webpack: (config, options) => {
    const { buildId, dev } = options
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(process.env.COMMIT_REF)
      })
    )
    
    if (isServer) { 
      config.plugins.push(
        new SentryPlugin({
          release: process.env.COMMIT_REF,
          include: './.next/server/bundles/pages',
          urlPrefix:`~/_next/${buildId}/page`,
        })
      )
    }

    config.plugins.push(
      new SentryPlugin({
        release: process.env.COMMIT_REF,
        include: './.next/static',
        urlPrefix: `~/_next/static`,
      })
    )

    return config;
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    }
  },
  target: 'server',
  generateBuildId: async () => {
    if (process.env.COMMIT_REF) {
      return process.env.COMMIT_REF
    }

    return null
  }
};


module.exports = withPlugins([
  withSourceMaps,
  withCSS,
  withTypescript
], nextConfig)
