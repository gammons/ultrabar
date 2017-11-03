import { ipcMain } from 'electron'
import Logger from './logger'

export default class Store {
  constructor(webContents) {
    this.state = {}
    this.logger = new Logger()
    this.initialized = false
    this.listeners = []
    this.readyListeners = []
    this.webContents = webContents

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

  dispatch(action) {
    this.webContents.send('dispatch', action)
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  ready(listener) {
    this.readyListeners.push(listener)
  }
}
