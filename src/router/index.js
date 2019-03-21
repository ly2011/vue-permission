// 固定的路由
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/login'
import NotFound from '@/views/errorPage/404'
import Forbidden from '@/views/errorPage/403'
import Layout from '@/views/layout/index'
import Home from '@/views/home/index'

Vue.use(Router)

/* 初始路由 */

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{ path: '/login', name: 'login', component: Login }]
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [
  {
    path: '',
    name: 'container',
    redirect: 'home',
    meta: {
      requiresAuth: true,
      name: '首页'
    },
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          name: '首页',
          icon: 'icon-home'
        },
        component: Home
      }
    ]
  },
  {
    path: '/403',
    name: 'notauth',
    component: Forbidden
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  }
]
