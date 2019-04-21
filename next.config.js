const withPlugins = require('next-compose-plugins');
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps')({
  devtool: 'hidden-source-map'
})

const nextConfig = {
  webpack: (config, options) => {

    // modify the `config` here

    return config;
  },
};


module.exports = withPlugins([
  withSourceMaps,
  withCSS,
  withTypescript
], nextConfig)
