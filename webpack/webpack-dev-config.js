import path from 'path'
import webpack from 'webpack'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

import isomorphicConfig from './webpack-isomorphic-tools'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig)

export default {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${'localhost'}:${3001}/__webpack_hmr`,
      'babel-polyfill',
      './src/rendering/client.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${'localhost'}:${3001}/dist/`
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{ loader: 'babel-loader' }]
    }, { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
}
