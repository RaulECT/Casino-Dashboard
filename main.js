const { app, BrowserWindow } = require('electron')
const path = require('path');

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})
  win.openDevTools()
  win.loadFile(path.join(__dirname, 'development/index.html'));
}

app.on('ready', createWindow)