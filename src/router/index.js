import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/home/index'),
    // component: () => import('@/views/dashboard/index'),
    name: 'H5捕鱼后台',
    meta: {
      title: 'H5捕鱼后台',
      affix: true
    }
  }
  ]
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    // 显示主页面的详情页
    path: '/home',
    component: Layout,
    name: '详情',
    meta: {
      title: '详情'
    },
    children: [{
      path: '/home/detail',
      component: () => import('@/views/home/detail'),
      name: '数据详情',
      meta: {
        title: '数据详情'
      }
    }],
    hidden: true
  },
  {
    path: '/OpsData',
    component: Layout,
    redirect: '/OpsData/index',
    name: '运营数据',
    meta: {
      title: '运营数据',
      icon: 'el-icon-tickets'
    },
    children: [
      // {
      //   path: 'index',
      //   name: '收益信息',
      //   component: () =>
      //       import('@/views/Ops/index'),
      //   meta: {
      //     title: '收益信息'
      //   }
      // },
      // {
      //   path: 'retention',
      //   name: '留存相关',
      //   component: () =>
      //       import('@/views/Ops/retention'),
      //   meta: {
      //     title: '留存相关'
      //   }
      // },
      // {
      //   path: 'recharge',
      //   name: '充值统计',
      //   component: () =>
      //         import('@/views/Ops/recharge'),
      //   meta: {
      //     title: '充值统计'
      //   }
      // },
      {
        path: 'cannon',
        name: '炮倍留存',
        component: () =>
            import('@/views/Ops/cannon'),
        meta: {
          title: '炮倍留存'
        }
      },
      {
        path: 'payStatistics',
        name: '付费点统计',
        component: () =>
            import('@/views/Ops/payStatistics'),
        meta: {
          title: '付费点统计'
        }
      },
      {
        path: 'kongTouSelect',
        name: '空投',
        component: () =>
            import('@/views/Ops/kongTouSelect'),
        meta: {
          title: '空投'
        }
      }]
  },
  {
    path: '/stats',
    component: Layout,
    redirect: '/stats/index',
    children: [{
      path: 'index',
      name: '游戏金币流动统计',
      component: () => import('@/views/stats/index'),
      meta: {
        title: '游戏金币流动统计'
      }
    }]
  },
  {
    path: '/fishery',
    component: Layout,
    redirect: '/fishery/index',
    name: '渔场',
    meta: {
      title: '渔场',
      icon: 'el-icon-tickets'
    },
    children: [{
      path: 'index',
      name: '场次信息',
      component: () => import('@/views/fishery/index'),
      meta: {
        title: '场次信息'
      }
    },
    {
      path: 'onlineInfo',
      name: '在线信息',
      component: () => import('@/views/fishery/onlineInfo'),
      meta: {
        title: '在线信息'
      }
    },
    {
      path: 'averageOnline',
      name: '平均在线游戏时间',
      component: () => import('@/views/fishery/averageOnline'),
      meta: {
        title: '平均在线游戏时间'
      }
    }]
  },
  {
    path: '/player',
    component: Layout,
    redirect: '/player/index',
    name: '玩家信息',
    meta: {
      title: '玩家信息',
      icon: 'el-icon-tickets'
    },
    children: [{
      path: 'index',
      name: '基础信息',
      component: () => import('@/views/player/index'),
      meta: {
        title: '基础信息'
      }
    },
    {
      path: 'propInfo',
      name: '道具信息',
      component: () => import('@/views/player/propInfo'),
      meta: {
        title: '道具信息'
      }
    },
    {
      path: 'coinChange',
      name: '玩家金币变化',
      component: () =>
            import('@/views/player/coinChange'),
      meta: {
        title: '玩家金币变化'
      }
    },
    {
      path: 'propChange',
      name: '玩家道具变化详情',
      component: () =>
            import('@/views/player/propChange'),
      meta: {
        title: '玩家道具变化详情'
      }
    }]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service/index',
    name: '客服相关',
    meta: {
      title: '客服相关',
      icon: 'el-icon-tickets'
    },
    children: [
      {
        path: 'index',
        name: '玩家基本信息',
        component: () => import('@/views/service/index'),
        meta: {
          title: '玩家基本信息'
        }
      },
      {
        path: 'operation',
        name: '玩家相关操作',
        component: () => import('@/views/service/operation'),
        meta: {
          title: '玩家相关操作'
        }
      },
      {
        path: 'rechargeRecords',
        name: '充值记录查询',
        component: () => import('@/views/service/rechargeRecords'),
        meta: {
          title: '充值记录查询'
        }
      },
      {
        path: 'exchange',
        name: '兑换管理',
        component: () => import('@/views/service/exchange'),
        meta: {
          title: '兑换管理'
        }
      },
      {
        path: 'playerProps',
        name: '玩家道具信息',
        component: () => import('@/views/service/playerProps'),
        meta: {
          title: '玩家道具信息'
        }
      },
      {
        path: 'account',
        name: '账号管理',
        component: () => import('@/views/service/account'),
        meta: {
          title: '账号管理'
        }
      }]
  },
  {
    path: '/OpsAd',
    component: Layout,
    redirect: '/OpsAd/index',
    name: '运营公告',
    meta: {
      title: '运营公告',
      icon: 'el-icon-tickets'
    },
    children: [
      {
        path: 'index',
        name: '新增公告',
        component: () => import('@/views/OpsAd/index'),
        meta: {
          title: '新增公告'
        }
      },
      {
        path: 'AdList',
        name: '公告列表',
        component: () => import('@/views/OpsAd/AdList'),
        meta: {
          title: '公告列表'
        }
      },
      {
        path: 'announcement',
        name: '通告消息',
        component: () => import('@/views/OpsAd/announcement'),
        meta: {
          title: '通告消息'
        }
      },
      {
        path: 'maintain',
        name: '维护公告',
        component: () => import('@/views/OpsAd/maintain'),
        meta: {
          title: '维护公告'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
