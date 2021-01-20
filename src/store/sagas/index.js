import { call, put, cancelled, takeLatest, all } from 'redux-saga/effects';

import AccountSaga from './AccountSaga';

export default function* rootSagas() {
  yield all([
    ...AccountSaga,
  ]);
}