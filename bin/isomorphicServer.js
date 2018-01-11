import path from 'path'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'

import isomorphicConfig from '../webpack/webpack-isomorphic-tools'
import server from '../src/rendering/server'

const rootDir = path.resolve(__dirname, '..')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .server(rootDir, () => server)
