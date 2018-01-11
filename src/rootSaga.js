import { fork, join } from 'redux-saga/effects'

export const prefetchServerData = sagas => function* genTasks() {
  const tasks = yield sagas.map(([saga, ...params]) => fork(saga, ...params))
  yield tasks.map(join)
}

export default function* rootSaga() {
  // yield [
  //   fork(watchNavigate),
  //   fork(watchLoadUserPage),
  //   fork(watchLoadRepoPage),
  //   fork(watchLoadMoreStarred),
  //   fork(watchLoadMoreStargazers)
  // ]
}
