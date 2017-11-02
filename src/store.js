import { createStore, compose  } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from './reducers'
import { ipcRenderer } from 'electron'

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const initialState = {}
const middleware = []

const devTools = window.devToolsExtension || (() => noop => noop)

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
}

const enhancers = [
  //applyMiddleware(...middleware),
  devTools(),
]

const initializeStore = () => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  )

  store.subscribe(() => {
    ipcRenderer.sendSync('state-change', store.getState())
  })

  ipcRenderer.on('dispatch', (actionType, args) => {
    store.dispatch({type: actionType, args})
  })
  return store
}
export default initializeStore
