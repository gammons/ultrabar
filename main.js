import { app, BrowserWindow } from 'electron'

import mountAsDock from './system/x11-mounter'
import ConfigManager from './system/config'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 200,
    frame: false,
    title: 'Ultrabar',
  })

  win.setTitle('ultrabar')

  win.loadURL('http://localhost:3000')

  mountAsDock()
}

app.on('ready', createWindow)
app.setName('Ultrabar')

const configManager = new ConfigManager()
console.log(configManager.getConfig())

