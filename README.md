### TODO:

 - sqlite
 - sequelize
 - saga with ipc
 - ipc methods encapsulation（local api = like ajax methods）

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
    mainWindow = new BrowserWindow({
      width: 900,
      height: 680,
      webPreferences: {
        enableRemoteModule: true
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
## 踩雷點

 - react-router要用HashRouter，不能用BrowserRouter
 - 監聽的Saga要用fork，除此之外，在fork的監聽Saga function裡面，還要使用eventChannel，並將ipcRenderer.on放在eventChannel內，然後在while true裡面dispatch至reducer
 ```
  function* IpcAsyncReply() {
    console.log(`${sagaName}IpcAsyncReply`);

    // 先建立eventChannel的生成方法，內含ipc的非同步接收事件
    const myChannel = () => {
      return eventChannel(emit => {
        ipcRenderer.on('async-reply', (event, arg) => {
          console.log(`--- async-reply 從ipc收到${arg} ---`);
          emit({
            message: arg,
          });
        })
        return () => {};
      });
    }
    
    try {
      const channel = yield call(myChannel);
      while (true) {
        // 取得待更改的payload
        const payload = yield take(channel);

        // 更動redux
        yield put(showDebugStore(payload));
      }
    } catch(e) {
      console.error("ipc connection disconnected with unknown error");
    }
  }

  // ...

  export default [
    // 因為要被動接收，所以必須要fork出去，避免阻塞
    fork(IpcAsyncReply),
    // ...
  ];

 ```

## ipc

參考：
https://www.electronjs.org/docs/api/ipc-main

https://dev.to/origamium/reactelectron-2gdo

https://qiita.com/r-nouchi/items/c5ebfa42dca23e559ce2