const electron = require("electron");
const { ipcMain } = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  if(isDev) {
    mainWindow.webContents.openDevTools();
  }
  mainWindow.on("closed", () => (mainWindow = null));
}

global.MyGlobalObject = {
  test_vvv: 'test_vvv => 12345',
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('async-test-msg', (event, arg) => {
  console.log('electron.js, async-test-msg === arg ==> ');
  console.log(arg);
  event.reply('async-reply', `回應 async-test-msg ${arg}`)
});

ipcMain.on('sync-test-msg', (event, arg) => {
  console.log('electron.js, sync-test-msg === arg ==> ');
  console.log(arg);
  event.returnValue = `回應 sync-test-msg ${arg}`;
});