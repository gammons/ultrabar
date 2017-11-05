import { ipcMain } from 'electron'
import Logger from './logger'
import _ from 'lodash'

export default class Store {
  constructor(webContents) {
    this.state = {}
    this.logger = new Logger()
    this.listeners = []
    this.webContents = webContents

    ipcMain.on('state-change', (_, state) => {
      this.logger.info('backend state change to ', state)
      this.setState(state)
    })
  }

  setState(state) {
    const oldState = _.cloneDeep(this.state)
    this.state = state

    this.listeners.forEach(l => { l(oldState, state) })
  }

  dispatch(action) {
    this.webContents.send('dispatch', action)
  }

  addListener(listener) {
    this.listeners.push(listener)
  }
}
