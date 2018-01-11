import express from 'express'
import http from 'http'
import path from 'path'
import compression from 'compression'
import favicon from 'serve-favicon'
import PrettyError from 'pretty-error'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createMemoryHistory } from 'history'

import configureStore from '../store/configureStoreDevelopment'
import Routes from '../routes'
import HtmlComponent from '../helpers/HtmlComponent'
import rootSaga from '../rootSaga'

const pretty = new PrettyError()
const app = new express()
const server = new http.Server(app)

app.disable('x-powered-by')
app.use(compression())
app.use(favicon(path.join(__dirname, '../..', 'static', 'favicon.ico')))
app.use(express.static(path.join(__dirname, '../..', 'static')))

app.use((req, res) => {
  webpackIsomorphicTools.refresh()
  const assets = webpackIsomorphicTools.assets()
  const history = createMemoryHistory()
  const store = configureStore(history)
  store.runSaga(rootSaga).done.then(() => {
    const context = {}
    const rootComponent = (
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    )
    const htmlComponent = <HtmlComponent assets={assets} component={rootComponent} store={store} />
    const renderedDomString = ReactDOMServer.renderToString(htmlComponent)
    res.status(200).send(`<!doctype html>\n ${renderedDomString}`)
  })
})

server.listen(3000, err => {
  if (err) {
    return console.error(err)
  } else {
    console.info('App is waiting for requests on http://%s:%s in a browser', 'localhost', 3000)
  }
})
