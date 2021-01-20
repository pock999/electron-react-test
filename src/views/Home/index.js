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

  return (
    <>
      <div style={{ backgroundColor: 'white' }}>
        Home
        <Link to='/about'>前往About</Link>
        <button onClick={loginTest}>測試登入按鈕saga</button>
        <button onClick={logoutTest}>測試登出按鈕saga</button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(component);