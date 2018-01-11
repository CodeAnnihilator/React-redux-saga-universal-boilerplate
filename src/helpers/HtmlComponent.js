import React, { Component } from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

export default class Html extends Component {
  render() {
    const { assets, component, store } = this.props
    const content = component ? ReactDOM.renderToStaticMarkup(component) : ''
    const head = Helmet.rewind()
    return (
      <html lang='en-us'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {Object.keys(assets.styles).map((style, key) =>
            <link key={key} href={assets.styles[style]}
              media='screen, projection'
              rel='stylesheet'
              charSet='UTF-8'
              type='text/css'
            />
          )}
        </head>
        <body>
          <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())}` }} charSet='UTF-8' />
          <script src={assets.javascript.main} charSet='UTF-8' />
        </body>
      </html>
    )
  }
}
