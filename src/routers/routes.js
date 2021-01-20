import {
  About,
  Home,
} from '../views';

/**
 * exac: 路由是否完全相同
 * component: 對應組件
 * auth: true(表示要登入才行), false(表示為登入才行), null(表示都行)
 * path: 本頁面代表的url
 * failPath: 失敗退回去的url
 */

const routes = [
  {
    exact: true,
    component: Home,
    path: '/',
    failPath: '/',
    auth: null,
    authArray: null,
  },
  {
    exact: true,
    component: About,
    path: '/about',
    failPath: '/',
    auth: false,
    authArray: null,
  },

];

export default routes;