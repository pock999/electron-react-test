import {
  all,
  fork,
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';

import {
  UserException,
} from '../../../exception';

import {
  ajax,
  AccessStorage,
} from '../../../utility';

import {
  fillInAuthStore,
  clearAuthStore,
} from '../../reducers';

const {
  ajaxGet,
  ajaxPost,
  ajaxPut,
  ajaxDelete,
} = ajax;

export const LOGIN_ACTION = 'ACCOUNT_SAGA/LOGIN_ACTION';
export const LOGOUT_ACTION = 'ACCOUNT_SAGA/LOGOUT_ACTION';

const sagaName = 'sagas/AccountSaga/';

function* LoginAction(action) {
  console.log(`${sagaName}LoginAction`);
  fillInAuthStore();
}

function* LogoutAction(action) {
  console.log(`${sagaName}LogoutAction`);
  clearAuthStore();
}

export default [
  takeLatest(LOGIN_ACTION, LoginAction),
  takeLatest(LOGOUT_ACTION, LogoutAction),
];