import React from 'react';

import { withRouter } from "react-router-dom";

import {
  Link,
} from 'react-router-dom';

import {
  checkAuthPass,
} from '../../utility';

export default (props) => {
  console.log('Home props => ');
  console.log(props);

  console.log('checkAuthPass => ', checkAuthPass());

  console.log('route => ', window.location.href);

  return (
    <>
      Home
      <Link to='/about'>前往About</Link>
    </>
  );
};
