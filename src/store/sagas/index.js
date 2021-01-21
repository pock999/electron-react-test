import { call, put, cancelled, takeLatest, all } from 'redux-saga/effects';

import AccountSaga from './AccountSaga';
import IpcRendererSaga from './IpcRendererSaga';


export default function* rootSagas() {
  yield all([
    ...AccountSaga,
    ...IpcRendererSaga,
  ]);
}