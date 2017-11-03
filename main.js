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

  // ipcRenderer.on('dispatch', (actionType, args) => {
  //   console.log("ipcRenderer dispatch = ", actionType, args)
  //   store.dispatch({type: actionType, args})
  // })


  win.webContents.on('did-finish-load', () => {
    console.log("did finish load event")
    store.dispatch(loadConfig(configManager.getConfig()))
  })

  // win.webContents.on('did-finish-load', () => { })
  // store.ready(() => {
  //   console.log("store is ready")
  //})
}

app.on('ready', createWindow)
app.setName('Ultrabar')

