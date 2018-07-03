/**
 * Override create-react-app default config 
 */

const rewireLess = require('react-app-rewire-less');
const path = require('path');
/* config-overrides.js */
module.exports = {
  webpack: function override(config, env) {
    config = rewireLess(config, env);

    /**
     * Remove minify plugin for production build
     */
    if (env === 'production') {
      config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');
    }

    return config;
  }
}