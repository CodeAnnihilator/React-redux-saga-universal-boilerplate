// require('../server.babel'); // babel registration (runtime transpilation for node)
// import path from 'path'
// import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
//
// import isomorphicConfig from '../webpack/webpack-isomorphic-tools'
// import server from '../src/rendering/server'
//
// const rootDir = path.resolve(__dirname, '..')
//
// global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
//   .server(rootDir, () => server)

require('../server.babel'); // babel registration (runtime transpilation for node)
var path = require('path');
var rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(rootDir, function() {
    require('../src/rendering/server');
  });
