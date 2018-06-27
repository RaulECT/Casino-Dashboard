const { app, BrowserWindow } = require('electron')
const path = require('path');

function createWindow () {
  win = new BrowserWindow({fullscreen: true})
  //win.openDevTools()
  win.loadFile(path.join(__dirname, 'development/index.html'));
}

app.on('ready', createWindow)