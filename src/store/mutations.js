export default {
  LOGIN_IN (state, token) {
    state.userToken = token
  },
  LOGIN_OUT (state) {
    state.userToken = ''
  },
  toggleNavCollapse (state) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse
  },
  setCrumbList (state, list) {
    state.crumbList = list
  }
}
