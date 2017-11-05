import { app, BrowserWindow } from 'electron'

import mountAsDock from './system/x11-mounter'
import ConfigManager from './system/config'
import ModuleRunner from './system/module-runner'
import Store from './system/store'

import I3Client from './system/internal_modules/i3'

import * as constants from './src/constants'

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

  const store = new Store(win.webContents)
  const config = new ConfigManager().getConfig()

  //mountAsDock({height: config.height})

  const moduleRunner = new ModuleRunner(config, store)


  win.webContents.on('did-finish-load', () => {
    store.dispatch({ type: constants.LOAD_CONFIG, config })
    moduleRunner.startProcessing()
    const i3Client = new I3Client(store)
  })
}

app.on('ready', createWindow)
app.setName('Ultrabar')

