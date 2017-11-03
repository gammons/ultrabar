import { createStore, applyMiddleware, compose  } from 'redux'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { ipcRenderer } from 'electron'
import { reset } from './actions/reset-actions'

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const initialState = {}
const middleware = []

const devTools = window.devToolsExtension || (() => noop => noop)

middleware.push(logger)

const enhancers = [
  applyMiddleware(...middleware),
  devTools(),
]

const initializeStore = () => {
  console.log("initializing store")
  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  )

  store.subscribe(() => {
    console.log("STORE UPDATE EVENT")
    ipcRenderer.send('state-change', store.getState())
  })

  ipcRenderer.on('dispatch', (event, action) => {
    console.log("DISPATCH EVENT action = ", action)
    store.dispatch(action)
  })

  return store
}
export default initializeStore
