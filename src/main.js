import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import axios from './utils/request'

Vue.prototype.$http = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // console.log('beforeEach: ', to, store.state)
  // 还没登录
  if (!store.state.userToken) {
    if (to.matched.length > 0 && !to.matched.some(record => record.meta && record.meta.required)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (!store.state.permission.permissionList) {
      store.dispatch('permission/fetchPermission').then(() => {
        next({ path: to.path })
      })
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  console.info('routerList ======> ', routerList)
  // 设置菜单
  store.commit('setCrumbList', routerList)
  // 设置当前菜单
  store.commit('permission/SET_CURRENT_MENU', to.name)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
