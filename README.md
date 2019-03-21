# vue-permission

> 该demo展示了如何在 vue 中添加权限控制

## 运行
```
yarn install
```

### 开发环境
```
yarn run serve
```

### 编译
```
yarn run build
```

## 流程

---

1. 如何获取用户权限？

后端(当前用户拥有的权限列表) -> 前端(通过后端的接口获取到，下文我们把当前用户的权限列表叫做 permissionList)

2. 前端如何做限制？

通过产品的需求，在项目中进行权限点的配置，然后通过 permissionList 寻找是否有配置的权限点，有就显示，没有就不显示。

3. 然后呢？

没了。

## 真正的问题

---

上面的需求有提到我们主要解决两个问题，侧边菜单栏的显示 & 页面内操作。

假设我们有这样一个路由的设置（以下只是一个例子）：

```js
const dynamicRoutes = [
  {
    path: '/order',
    name: 'order-manage',
    meta: {
      name: '订单管理',
      icon: 'icon-email'
    },
    component: Order,
    children: [
      {
        path: 'list',
        name: 'order-list',
        meta: {
          name: '订单列表',
          icon: 'icon-quit'
        },
        component: OrderList
      },
      {
        path: 'product',
        name: 'product-manage',
        meta: {
          name: '生产管理',
          icon: 'icon-service'
        },
        component: ProductManage,
        children: [
          {
            path: 'list',
            name: 'product-list',
            meta: {
              name: '生产列表',
              icon: 'icon-nav'
            },
            component: ProductList
          },
          {
            path: 'review',
            name: 'review-manage',
            meta: {
              name: '审核管理',
              icon: 'icon-finance-manage'
            },
            component: ReviewManage
          }
        ]
      },
      {
        path: 'returnGoods',
        name: 'return-goods',
        meta: {
          name: '退货管理',
          icon: 'icon-product-manage'
        },
        component: ReturnGoods
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {
      name: '产品管理',
      icon: 'icon-order-manage'
    },
    component: Goods,
    children: [
      {
        path: 'list',
        name: 'goods-list',
        meta: {
          name: '产品列表',
          icon: 'icon-home'
        },
        component: GoodsList
      },
      {
        path: 'classify',
        name: 'goods-classify',
        meta: {
          name: '产品分类',
          icon: 'icon-product-manage'
        },
        component: GoodsClassify
      }
    ]
  }
]

export default dynamicRoutes
```

页面内操作的权限设置不需要考虑很多其他东西，我们主要针对侧边栏以及路由进行问题的分析，通过分析，主要有以下几个问题：

1. 什么时候获取 permissionList, 如何存储 permissionList
2. 子路由有全部都没权限时不应该显示本身(例: 当产品列表和产品分类都没有权限时， 产品管理也不应该显示在侧边栏)
3. 默认重定向的路由没有权限时，应寻找 children 中有权限的一组重定向(例: 产品管理路由重定向到产品列表路由，若产品列表没有权限，则应该重定向到产品分类路由)
4. 当用户直接输入没有权限的 url 时需要跳转到没有权限的页面或其他操作。(路由限制)

下面我们针对以上问题一个一个解决。

### 什么时候获取权限，存储在哪 & 路由限制

这里的demo是在 `router` 的 `beforeEach` 中获取，获取的 permissionList 是存放在 `vuex` 中。

原因是考虑到要做路由的限制，以及方便后面项目中对权限列表的使用，以下是实现的示例：

首先我们需要权限控制的页面路由配置到 `dynamic-router.js` 上：

```js
/* 订单管理 */

const Order = () => import('@/views/order-manage')
const OrderList = () => import('@/views/order-manage/order-list')
const ProductManage = () => import('@/views/order-manage/product-manage')
const ProductList = () => import('@/views/order-manage/product-manage/production-list')
const ReviewManage = () => import('@/views/order-manage/product-manage/review-manage')
const ReturnGoods = () => import('@/views/order-manage/return-goods')

/* 产品管理 */
const Goods = () => import('@/views/goods-manage')
const GoodsList = () => import('@/views/goods-manage/goods-list')
const GoodsClassify = () => import('@/views/goods-manage/goods-classify')

/* 需要权限判断的路由 */
const dynamicRoutes = [
  {
    path: '/order',
    name: 'order-manage',
    meta: {
      name: '订单管理',
      icon: 'icon-email'
    },
    component: Order,
    children: [
      {
        path: 'list',
        name: 'order-list',
        meta: {
          name: '订单列表',
          icon: 'icon-quit'
        },
        component: OrderList
      },
      {
        path: 'product',
        name: 'product-manage',
        meta: {
          name: '生产管理',
          icon: 'icon-service'
        },
        component: ProductManage,
        children: [
          {
            path: 'list',
            name: 'product-list',
            meta: {
              name: '生产列表',
              icon: 'icon-nav'
            },
            component: ProductList
          },
          {
            path: 'review',
            name: 'review-manage',
            meta: {
              name: '审核管理',
              icon: 'icon-finance-manage'
            },
            component: ReviewManage
          }
        ]
      },
      {
        path: 'returnGoods',
        name: 'return-goods',
        meta: {
          name: '退货管理',
          icon: 'icon-product-manage'
        },
        component: ReturnGoods
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    meta: {
      name: '产品管理',
      icon: 'icon-order-manage'
    },
    component: Goods,
    children: [
      {
        path: 'list',
        name: 'goods-list',
        meta: {
          name: '产品列表',
          icon: 'icon-home'
        },
        component: GoodsList
      },
      {
        path: 'classify',
        name: 'goods-classify',
        meta: {
          name: '产品分类',
          icon: 'icon-product-manage'
        },
        component: GoodsClassify
      }
    ]
  }
]

export default dynamicRoutes

```

接下来我们设置 `router.beforeEach`：

```js
// src/index.js
router.beforeEach((to, from, next) => {
  // 还没登录
  if (!store.state.userToken) {
    if (to.matched.length > 0 && !to.matched.some(record => record.meta && record.meta.required)) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    // 这里是为了防止重复获取权限列表
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
```
我们可以看到我们需要一个判断权限的方法 & vuex 中的 `fetchPermission` 如下：
```js
// src/store/modules/permission
  actions: {
    async fetchPermission ({ commit, state }) {
      console.log('actions fetchPermission... ')
      let permissionList = await fetchPermission()

      /* 根据权限刷选出我们设置好的路由并加入到 path='' 的children */
      let routes = recursionRouter(permissionList, dynamicRouter)
      let MainContainer = DynamicRoutes.find(v => v.path === '')
      let children = MainContainer.children
      // 将当前用户的权限路由添加到动态路由中
      children.push(...routes)

      /* 生成左侧导航菜单 */
      commit('SET_MENU', children)

      /* 为所有有children的菜单路由设置第一个children为默认路由 */
      setDefaultRoute([MainContainer])

      /* 初始化路由 */
      let initialRoutes = router.options.routes

      /* 动态路由 */
      router.addRoutes(DynamicRoutes)

      /* 完整的路由表 */
      commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
    }
  }
```

## 总结

---

针对之前的问题，有以下的总结：

1. 什么时候获取 permissionList，如何存储 permissionList
router.beforeEach 获取，存储在 vuex。

2. 子路由全都没权限时不应该显示本身（例: 当产品列表和产品分类都没有权限时， 产品管理也不应该显示在侧边栏）
通过存储路由配置到 vuex 中，生成侧边栏设置，获取权限后修改 vuex 中的配置控制显示 & 隐藏。

3. 默认重定向的路由没有权限时，应寻找 children 中有权限的一项重定向（例: 产品管理路由重定向到产品列表路由，若产品列表没有权限，则应该重定向到产品分类路由）
通过 `utils/recursion-router.js` 中的 `setDefaultRoute` 方法动态设置 vue-router 的 redirect 来实现

4. 当用户直接输入没有权限的 url 时需要跳转到没有权限的页面或其他操作。（路由限制）
在 meta 中设置权限， `router.beforeEach` 中判断权限
