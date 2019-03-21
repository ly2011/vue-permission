/* 路由动态处理函数 */

/**
 * 递归处理路由，找出当前登录用户权限下的路由
 * @param {Array} userRouter 后台返回的用户权限json
 * @param {Array} allRouter 前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recursionRouter (userRouter = [], allRouter = []) {
  let realRoutes = []
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      if (item.name === v.meta.name) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children)
        }
        realRoutes.push(v)
      }
    })
  })

  return realRoutes
}

/**
 * 递归为所有子路由的路由设置第一个children.path为默认路由
 * @param {Array} routes 用户过滤后的路由
 */
export function setDefaultRoute (routes = []) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = { name: v.children[0].name }
      setDefaultRoute(v.children)
    }
  })
}
