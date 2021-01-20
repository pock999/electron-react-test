# react with electron
參考：https://medium.com/@devesu/how-to-build-a-react-based-electron-app-d0f27413f17f

 - step1:
  ```
  npx create-react-app <app_name>
  cd <app_name>
  ```

 - step2:
 ```
 yarn add cross-env electron-is-dev
 yarn add --dev concurrently electron electron-builder wait-on
 ```

 - step3(public/electron.js):
  => public/electron.js
 ```
  const electron = require("electron");
  const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;
  const path = require("path");
  const isDev = require("electron-is-dev");

  let mainWindow;

  function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 });
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
 ```

 - step4(package.json的script部分):
 ```
  "scripts": {
    "react-start": "react-scripts start",
    "react-build": "react-scripts build",
    "react-test": "react-scripts test --env=jsdom",
    "react-eject": "react-scripts eject",
    "electron-build": "electron-builder",
    "release": "yarn react-build && electron-builder --publish=always",
    "build": "yarn react-build && yarn electron-build",
    "start": "concurrently \"cross-env BROWSER=none yarn react-start\" \"wait-on http://localhost:3000 && electron .\""
  },
 ```