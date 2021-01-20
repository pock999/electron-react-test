import { combineReducers } from 'redux';

import AuthStore, {
  fillInAuthStore,
  clearAuthStore,
} from './AuthStore';

export {
  fillInAuthStore,
  clearAuthStore,
};

export default combineReducers({
  AuthStore,
});