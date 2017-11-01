import { app, BrowserWindow } from 'electron'
import path from 'path'
import url from 'url'

import mountAsDock from './x11-mounter'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 200,
    frame: false,
    title: "Ultrabar",
  })

  win.setTitle("ultrabar")

  win.loadURL('http://localhost:3000');
}

app.on('ready', createWindow)
app.setName('Ultrabar')

mountAsDock()

