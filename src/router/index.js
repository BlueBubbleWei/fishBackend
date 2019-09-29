import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/layout'

Vue.use(Router)
// 如首页和登录页和一些不用权限的公用页面
export const commontRouterMap = [{
  path: '/login',
  hidden: true, // 不在slider显示
  component: () =>
      import('@/views/login/index')
},
{
  path: '/',
  component: Layout,
  redirect: '/home',
  name: 'Home',
  hidden: true,
  children: [{
    path: 'home',
    component: () =>
        import('@/views/Home')
  }]
}
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [{
  path: '/home',
  component: Layout,
  meta: {
    title: '捕鱼H5后台',
    icon: 'el-icon-menu'
  }
},
{
  path: '/OpsData',
  component: Layout,
  redirect: '/OpsData/index',
  name: '运营数据',
  meta: {
    title: '运营数据',
    icon: 'el-icon-tickets'
    // role: ['0', '1', '2']
  },
  children: [{
    path: 'index',
    name: '收益信息',
    component: () =>
          import('@/views/Ops/index'),
    meta: {
      title: '收益信息'
      // role: ['0']
    }
  },
  {
    path: '/OpsData/retention',
    name: '1-2',
    component: () =>
          import('@/views/Ops/retention'),
    hidden: ['0'], // 用户角色为0时，隐藏
    meta: {
      title: '1-2'
      // role: ['0', '1', '2']
    } // role 有0，可以通过某页跳转到这个路由
  }
  // {
  //   path: '1-3',
  //   name: '1-3',
  //   component: () =>
  //         import('@/views/userpower1/1-3'),
  //   meta: {
  //     title: '1-1'
  //     role: ['0']
  //   },
  //   hidden: true // 不在sidebar显示，由sidebar中的某路由跳转到这个页面,本例由1-2跳转，因此role与1-2同
  //   meta: {
  //     title: '1-3',
  //     role: ['0', '1', '2']
  //   }
  // }
  ]
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: commontRouterMap
})

const router = createRouter()
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router

// export default new Router({
//   routes: [
//     {
//       path: '',
//       component: homePage,
//       redirect: 'home',
//       children: [{
//         path: 'home',
//         component: () => import('@/views/homePage'),
//         name: '首页',
//         meta: {
//           title: '首页',
//           icon: 'dashboard',
//           noCache: true,
//           hidden: false
//         },
//         hidden: false
//       }]
//     },
//     {
//       path: '/OpsData',
//       component: Ops,
//       redirect: 'noredirect',
//       hidden: true,
//       name: '运营数据',
//       meta: {
//         title: '运营数据',
//         icon: 'statistical'
//       },
//       children: [{
//         path: '/profit',
//         component: () => import('@/views/Ops/profit'),
//         name: '内容热度',
//         meta: {
//           title: '内容热度',
//           noCache: true,
//           hidden: false
//         },
//         hidden: false
//       }]
//     },
//     {
//       path: '/login',
//       component: () => import('@/views/login/index'),
//       hidden: true
//     },
//     {
//       path: '/authredirect',
//       component: () => import('@/views/login/auth-redirect'),
//       hidden: true
//     },
//     {
//       path: '/404',
//       component: () => import('@/views/errorPage/404'),
//       hidden: true
//     },
//     {
//       path: '/401',
//       component: () => import('@/views/errorPage/401'),
//       hidden: true
//     }
//   ]
// })
