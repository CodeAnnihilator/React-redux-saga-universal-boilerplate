import React from 'react'
import merge from 'lodash/merge'
import createHistory from 'history/createBrowserHistory'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import configureStore from '../store/configureStoreDevelopment'
import getRoutes from '../routes'
import rootSaga from '../rootSaga'

import Routes from '../routes'

const history = createHistory()

let initialState = window.__data
const store = configureStore(history, initialState)
store.runSaga(rootSaga)
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('content')
)
if (process.env.NODE_ENV !== 'production') {
  window.React = React // enable debugger
}
