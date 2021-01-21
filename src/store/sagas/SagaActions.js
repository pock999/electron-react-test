import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
} from './AccountSaga';

import {
  IPC_ASYNC_TEST,
  IPC_SYNC_TEST,
} from './IpcRendererSaga';

const fileName = 'sagas/SagaActions/';

export const passToAccountSagaLoginAction = (payload) => {
  console.log(`${fileName}passToAccountSagaLoginAction`);
  return {
    type: LOGIN_ACTION,
    payload,
  };
};

export const passToAccountSagaLogoutAction = (payload) => {
  console.log(`${fileName}passToAccountSagaLogoutAction`);
  return {
    type: LOGOUT_ACTION,
    payload,
  };
};

export const passToIpcRendererSagaAsyncTestMsgAction = (payload) => {
  console.log('--- SEND SagaAction => IpcAsyncTest ---');
  console.log(`${fileName}passToIpcRendererSagaAsyncTestMsgAction`);
  return {
    type: IPC_ASYNC_TEST,
    payload,
  };
};

export const passToIpcRendererSagaSyncTestMsgAction = (payload) => {
  console.log('--- SEND SagaAction => IpcSyncTest ---');
  console.log(`${fileName}passToIpcRendererSagaSyncTestMsgAction`);
  return {
    type: IPC_SYNC_TEST,
    payload,
  };
};