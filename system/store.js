import { ipcMain } from 'electron'
import Logger from './logger'

export default class Store {
  constructor() {
    this.state = {}
    this.logger = new Logger()
    this.initialized = false
    this.listeners = []
    this.readyListeners = []

    ipcMain.on('state-change', (state) => {
      this.logger.info('backend state change to ', state)
      this.setState(state)
    })
  }

  setState(state) {
    if (!this.initialized) {
      this.readyListeners.forEach(l => {
        l()
      })
    }

    this.initialized = true
    this.state = state

    this.listeners.forEach(l => {
      l()
    })
  }

  dispatch(actionType, args) {
    this.logger.info('backend dispatch', actionType, args)
    ipcMain.send('dispatch', actionType, args)
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  ready(listener) {
    this.readyListeners.push(listener)
  }
}
