import { app, BrowserWindow } from 'electron'

//import mountAsDock from './system/x11-mounter'
// import ConfigManager from './system/config'
// import Store from './system/store'
//import * as constants from './src/constants'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 200,
    frame: false,
    title: 'Ultrabar',
  })

  win.setTitle('ultrabar')

  win.loadURL('file://' + __dirname + '/public/index.html')
  win.webContents.openDevTools();

  //mountAsDock()
}

app.on('ready', createWindow)
app.setName('Ultrabar')

// const store = new Store()
// const configManager = new ConfigManager()
//
// store.ready(() => {
//   store.dispatch(constants.LOAD_CONFIG, configManager.getConfig())
// })
