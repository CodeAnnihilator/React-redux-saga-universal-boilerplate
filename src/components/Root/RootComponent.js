import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, RouterContext } from 'react-router-dom'

const App = () => (
  <div>!!!!!!!!!!</div>
)

export default class RootComponent extends Component {
  render() {
    const { store, history, routes, type, renderProps } = this.props
    return (
      <Provider store={store}>
        <div>
          { console.log(routes) }
          {
            type === 'server'
              ? <RouterContext {...renderProps} />
              : (
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              )
          }
        </div>
      </Provider>
    )
  }
}
