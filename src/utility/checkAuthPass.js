import _ from 'lodash';

import AccessStorage from './AccessStorage';

export default function checkAuthPass() {
  const {
    email,
    token,
  } = AccessStorage.get();
  return (!_.isEmpty(email) && !_.isEmpty(token));
}