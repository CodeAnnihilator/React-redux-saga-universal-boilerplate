import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from '../rootReducer'

const configureStore = (history, initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        createLogger()
      )
    )
  )
  if (module.hot) {
    module.hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore
