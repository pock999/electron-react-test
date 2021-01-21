const SHOW_DEBUG = 'DEBUG_STORE/SHOW_DEBUG';
const CLEAR_DEBUG = 'DEBUG_STORE/CLEAR_DEBUG';

const reducerName = 'reducers/DebugStore/';

const initState = {
  message: '空的',
};

export const showDebugStore = (payload) => {
  console.log(`${reducerName}showDebugStore`);
  return {
    type: SHOW_DEBUG,
    payload,
  }
};

export const clearDebugStore = (payload) => {
  console.log(`${reducerName}clearDebugStore`);
  return {
    type: CLEAR_DEBUG,
    payload,
  };
};

export default function reducer(state = initState, action) {
  const {
    payload,
    type,
  } = action;

  switch(type) {
    case SHOW_DEBUG:
      return payload;
    case CLEAR_DEBUG:
      return {
        message: '空的',
      };
    default:
      return state;
  }
}