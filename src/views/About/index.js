import React from 'react';

import {
  Link,
} from 'react-router-dom';

import {
  checkAuthPass,
} from '../../utility';

export default (props) => {
  console.log('About props => ');
  console.log(props);

  console.log('checkAuthPass => ', checkAuthPass());

  console.log('route => ', window.location.href);

  return (
    <>
      About
      <Link to='/'>前往Home</Link>
    </>
  );
};
