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
