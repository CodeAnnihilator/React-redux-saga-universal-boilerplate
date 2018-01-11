import React from 'react'
import { Route, Switch } from 'react-router-dom'

import App from './components/App'
import Appp from './components/Appp'

const routes = () => (
  <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/a' component={Appp} />
  </Switch>
)

export default routes
