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

import { eventChannel } from "redux-saga";

import {
  UserException,
} from '../../../exception';

import {
  ajax,
  AccessStorage,
} from '../../../utility';

const { ipcRenderer } = window.require("electron");

const sagaName = 'sagas/TestSaga/';

export const IPC_ASYNC_TEST = 'IPC_RENDERER_SAGA/IPC_ASYNC_TEST';
export const IPC_SYNC_TEST = 'IPC_RENDERER_SAGA/IPC_SYNC_TEST'; 

function* IpcAsyncReply() {

  console.log(`${sagaName}IpcAsyncReply`);

  try {
    const channel = yield eventChannel(emit => {
      ipcRenderer.on('async-reply', (event, arg) => {
        console.log('async-reply ====> ', arg);
      })
      return () => {};
    });
    while (true) {
      yield take(channel)
    }
  } catch(e) {
    console.error("ipc connection disconnected with unknown error");
  }
}

function* IpcAsyncTestMsg(action) {
  console.log('--- SEND IpcRendererSaga => IpcAsyncTest ---');
  console.log(`${sagaName}IpcAsyncTestMsg`);

  const { payload } = action;

  const ipcSender = () => {
    ipcRenderer.send('async-test-msg', payload);
  };

  yield call(ipcSender);

}

function* IpcSyncTestMsg(action) {
  console.log('--- SEND IpcRendererSaga => IpcSyncTest ---');
  console.log(`${sagaName}IpcSyncTestMsg`);

  const { payload } = action;

  const ipcSender = () => {
    return ipcRenderer.sendSync('sync-test-msg', payload);
  };

  const reply = yield call(ipcSender);

  console.log('result reply ==> ', reply);

}

export default [
  fork(IpcAsyncReply),
  takeLatest(IPC_ASYNC_TEST, IpcAsyncTestMsg),
  takeLatest(IPC_SYNC_TEST, IpcSyncTestMsg),
];