import React from 'react';

import { withRouter } from "react-router-dom";

import './App.css';

import _ from 'lodash';

import {
  AccessStorage,
} from './utility';

import {
  Routers,
} from './routers';

function App() {

  // 判斷登入狀態，基本上以localStorage為準
  const checkAuthPass = () => {
    const {
      email,
      token,
    } = AccessStorage.get();
    return (!_.isEmpty(email) && !_.isEmpty(token));
  };

  // 判定登入狀態與路由設置登入狀態是否一致
  const checkRoutePass = (routeAuth) => {
    const hasAuth = checkAuthPass();
    // null 表示路由設定沒有限制是否要登入
    if(routeAuth === null) {
      return true;
    }
    return hasAuth === routeAuth;
  };


  return (
    <Routers checkRoutePass={checkRoutePass} />
  );
}

export default withRouter(App);
