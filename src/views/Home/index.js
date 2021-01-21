import React from 'react';

import { connect } from 'react-redux';

import {
  Link,
} from 'react-router-dom';

import {
  checkAuthPass,
} from '../../utility';

import {
  passToAccountSagaLoginAction,
  passToAccountSagaLogoutAction,

  passToIpcRendererSagaAsyncTestMsgAction,
  passToIpcRendererSagaSyncTestMsgAction,
} from '../../store/sagas/SagaActions';

const component = (props) => {
  console.log('Home props => ');
  console.log(props);

  console.log('checkAuthPass => ', checkAuthPass());

  console.log('route => ', window.location.href);

  const loginTest = () => {
    props.loginTestAction({});
  };

  const logoutTest = () => {
    props.logoutTestAction({});
  };

  const IpcAsyncTest = () => {
    console.log('--- SEND view => IpcAsyncTest ---');
    props.ipcAsyncMsgAction('從view發送的Async Msg');
  };

  const IpcSyncTest = () => {
    console.log('--- SEND view => IpcSyncTest ---');
    props.ipcSyncMsgAction('從view發送的Sync Msg');
  };

  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
        Home
        <Link to='/about'>前往About</Link>
        <button onClick={loginTest}>測試登入按鈕saga</button>
        <button onClick={logoutTest}>測試登出按鈕saga</button>
        <button onClick={IpcAsyncTest}>測試ipc async saga</button>
        <button onClick={IpcSyncTest}>測試ipc sync saga</button>
      </div>
    </>
  );
};

const mapStateToProps = ({
  AuthStore,
}) => ({
  AuthStore,
});

const mapDispatchToProps = (dispatch) => ({
  loginTestAction(payload) {
    dispatch(passToAccountSagaLoginAction(payload));
  },
  logoutTestAction(payload) {
    dispatch(passToAccountSagaLogoutAction(payload));
  },
  ipcAsyncMsgAction(payload) {
    dispatch(passToIpcRendererSagaAsyncTestMsgAction(payload));
  },
  ipcSyncMsgAction(payload) {
    dispatch(passToIpcRendererSagaSyncTestMsgAction(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(component);