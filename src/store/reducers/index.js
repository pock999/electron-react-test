import { combineReducers } from 'redux';

import DebugStore, {
  showDebugStore,
  clearDebugStore,
} from './DebugStore';

import AuthStore, {
  fillInAuthStore,
  clearAuthStore,
} from './AuthStore';

export {
  showDebugStore,
  clearDebugStore,

  fillInAuthStore,
  clearAuthStore,
};

export default combineReducers({
  DebugStore,
  AuthStore,
});