import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GuardRoute from './GuardRoute';
import routes from './routes';

const Routers = ({ checkRoutePass }) => (
  <>
    <Switch>
      {
        routes.map((route, i) => (
          <GuardRoute
            component={route.component}
            path={route.path}
            failPath={route.failPath}
            exact={route.exact}
            auth={checkRoutePass(route.auth)}
            key={route.path}
            authArray={route.authArray}
          />
        ))
      }
    </Switch>
  </>
);

export {
  Routers,
};
