const FILL_IN_AUTH = 'AUTH_STORE/FILL_IN_AUTH';
const CLEAR_AUTH = 'AUTH_STORE/CLEAR_AUTH';

const reducerName = 'reducers/AuthStore/';

const initState = {};

export const fillInAuthStore = (payload) => {
  console.log(`${reducerName}fillInAuthStore`);
  return {
    type: FILL_IN_AUTH,
    payload,
  };
};

export const clearAuthStore = (payload) => {
  console.log(`${reducerName}clearAuthStore`);
  return {
    type: CLEAR_AUTH,
    payload,
  };
};

export default function reducer(state = initState, action) {
  const {
    payload,
    type,
  } = action;

  switch(type) {
    case FILL_IN_AUTH:
      state = Object.assign({}, payload);
      return state;
    case CLEAR_AUTH:
      return {};
    default:
      return state;
  }
}