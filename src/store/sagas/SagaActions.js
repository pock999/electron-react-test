import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
} from './AccountSaga';

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