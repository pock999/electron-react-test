import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardRoute = ({
  component: Component, auth, failPath, authArray, ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        auth === true
          ? <Component {...props} />
          : <Redirect to={failPath} />
      )}
    />
  );
};

export default GuardRoute;
