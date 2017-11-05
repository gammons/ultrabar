import { combineReducers  } from 'redux'
import config from './config'
import modules from './modules'
import dock from './dock'

export default combineReducers({
  config,
  modules,
  dock,
})
