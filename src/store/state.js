export default {
  get userToken () {
    return localStorage.getItem('token')
  },
  set userToken (value) {
    localStorage.setItem('token', value)
  },
  /* 导航菜单是否折叠 */
  isSidebarNavCollapse: false,
  /* 面包屑导航列表 */
  crumbList: []
}
