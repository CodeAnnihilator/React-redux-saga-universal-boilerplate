import React from 'react'
import merge from 'lodash/merge'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

import Routes from '../routes'
import { BrowserRouter } from 'react-router-dom'

import RootComponent from '../components/Root/RootComponent'

import configureStore from '../store/configureStoreDevelopment'
import getRoutes from '../routes'
import rootSaga from '../rootSaga'

async function renderClient() {
  let initialState = window.__data
  const dest = document.getElementById('content')
  const store = configureStore(history, initialState)
  store.runSaga(rootSaga)
  render(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>,
    dest
  )
  if (process.env.NODE_ENV !== 'production') {
    window.React = React // enable debugger
  }
}

renderClient()
