import { app, BrowserWindow } from 'electron'

import mountAsDock from './system/x11-mounter'
import ConfigManager from './system/config'
import Store from './system/store'

import { loadConfig } from './src/actions/config-actions'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 200,
    frame: false,
    title: 'Ultrabar',
  })

  win.setTitle('ultrabar')

  win.loadURL('file://' + __dirname + '/public/index.html')
  win.webContents.openDevTools()

  //mountAsDock()
  const store = new Store(win.webContents)
  const configManager = new ConfigManager()

  win.webContents.on('did-finish-load', () => {
    store.dispatch(loadConfig(configManager.getConfig()))
  })
}

app.on('ready', createWindow)
app.setName('Ultrabar')

