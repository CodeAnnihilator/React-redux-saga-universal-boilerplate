import express from 'express'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import webpackDevConfig from './webpack-dev-config'

const compiler = webpack(webpackDevConfig)

const options = {
	headers: { 'Access-Control-Allow-Origin': '*' },
	publicPath: webpackDevConfig.output.publicPath,
	contentBase: 'http://localhost:3001',
	noInfo: true,
	inline: true,
	quiet: true,
	lazy: false,
	hot: true
}

const app = new express()

app.use(webpackDevMiddleware(compiler, options))
app.use(webpackHotMiddleware(compiler))

app.listen(3001, err => {
	if (err) return console.error(err)
	console.info('Webpack development server listening on port %s', 3001)
})
