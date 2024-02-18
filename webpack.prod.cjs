const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');
var ZipPlugin = require('zip-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ZipPlugin({
      filename: 'eds-checker.zip',
      path: path.resolve(__dirname, 'chrome-deploy')
    }),
  ]
});
