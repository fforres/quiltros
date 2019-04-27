const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const withSourceMaps = require('@zeit/next-source-maps')()

const nextConfig = {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  webpack: (config, options) => {
    const { buildId, dev } = options
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SENTRY_RELEASE': JSON.stringify(buildId)
      })
    )
    // if (!dev) { 
      // config.plugins.push( 
      //   new SentryPlugin({ 
      //     release: process.env.RELEASE,
      //     include: './.next/server/static',
      //     urlPrefix: `~/_next/${buildId}/page`,
      //   })
      // )
      // config.plugins.push(
      //   new SentryPlugin({
      //     release: process.env.RELEASE,
      //     include: './.next/static',
      //     urlPrefix: `~/_next/static`,
      //   })
      // )
    // }
    return config;
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' }
    }
  },
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
