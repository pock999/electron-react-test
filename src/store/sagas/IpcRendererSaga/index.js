import {
  all,
  fork,
  put,
  takeLatest,
  call,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';

import { eventChannel, buffers } from "redux-saga";

import {
  UserException,
} from '../../../exception';

import {
  ajax,
  AccessStorage,
} from '../../../utility';

import {
  showDebugStore,
  clearDebugStore,
} from '../../reducers';

const { ipcRenderer, remote } = window.require("electron");

const sagaName = 'sagas/TestSaga/';

export const IPC_ASYNC_TEST = 'IPC_RENDERER_SAGA/IPC_ASYNC_TEST';
export const IPC_SYNC_TEST = 'IPC_RENDERER_SAGA/IPC_SYNC_TEST'; 

// 被動接收AsyncReply
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

// 主動寄出的AsyncMsg，但不會回傳東西，需要依靠 被動接收AsyncReply
function* IpcAsyncTestMsg(action) {
  console.log(`--- 從SagaActio接收${action.payload}，並從Saga發送 ---`);
  console.log(`${sagaName}IpcAsyncTestMsg`);
  const { payload } = action;

  // alert(remote.getGlobal('MyGlobalObject').test_vvv)

  yield put(clearDebugStore({}));

  const ipcSender = () => {
    ipcRenderer.send('async-test-msg', payload);
  };

  yield call(ipcSender);

}

// 主動寄出的Sync
function* IpcSyncTestMsg(action) {
  console.log(`--- 從SagaActio接收${action.payload}，並從Saga發送 ---`);
  console.log(`${sagaName}IpcSyncTestMsg`);

  const { payload } = action;

  yield put(clearDebugStore({}));

  const ipcSender = () => {
    const res = ipcRenderer.sendSync('sync-test-msg', payload);
    console.log(`--- async-reply 從ipc收到${res} ---`);
    return res;
  };

  const reply = yield call(ipcSender);

  console.log('result reply ==> ', reply);

  yield put(showDebugStore({
    message: reply,
  }));

}

export default [
  // 因為要被動接收，所以必須要fork出去，避免阻塞
  fork(IpcAsyncReply),
  takeLatest(IPC_ASYNC_TEST, IpcAsyncTestMsg),
  takeLatest(IPC_SYNC_TEST, IpcSyncTestMsg),
];