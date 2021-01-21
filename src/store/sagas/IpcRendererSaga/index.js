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

function* IpcAsyncReply() {
  console.log(`${sagaName}IpcAsyncReply`);
  const myChannel = () => {
    return eventChannel(emit => {
      ipcRenderer.on('async-reply', (event, arg) => {
        console.log('==== async-reply ====> ', arg);
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
      const payload = yield take(channel);
      yield put(showDebugStore(payload));
    }
  } catch(e) {
    console.error("ipc connection disconnected with unknown error");
  }
}

function* IpcAsyncTestMsg(action) {
  console.log('--- SEND IpcRendererSaga => IpcAsyncTest ---');
  console.log(`${sagaName}IpcAsyncTestMsg`);
  const { payload } = action;

  // alert(remote.getGlobal('MyGlobalObject').test_vvv)

  yield put(clearDebugStore({}));

  const ipcSender = () => {
    ipcRenderer.send('async-test-msg', payload);
  };

  yield call(ipcSender);

}

function* IpcSyncTestMsg(action) {
  console.log('--- SEND IpcRendererSaga => IpcSyncTest ---');
  console.log(`${sagaName}IpcSyncTestMsg`);

  const { payload } = action;

  yield put(clearDebugStore({}));

  const ipcSender = () => {
    return ipcRenderer.sendSync('sync-test-msg', payload);
  };

  const reply = yield call(ipcSender);

  console.log('result reply ==> ', reply);

  yield put(showDebugStore({
    message: reply,
  }));

}

export default [
  fork(IpcAsyncReply),
  takeLatest(IPC_ASYNC_TEST, IpcAsyncTestMsg),
  takeLatest(IPC_SYNC_TEST, IpcSyncTestMsg),
];