import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import Ops from '@/views/Ops/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: homePage,
      redirect: 'home',
      children: [{
        path: 'home',
        component: () => import('@/views/homePage'),
        name: '首页',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true,
          hidden: false
        },
        hidden: false
      }]
    },
    {
      path: '/OpsData',
      component: Ops,
      redirect: 'noredirect',
      hidden: true,
      name: '运营数据',
      meta: {
        title: '运营数据',
        icon: 'statistical'
      },
      children: [{
        path: '/profit',
        component: () => import('@/views/Ops/profit'),
        name: '内容热度',
        meta: {
          title: '内容热度',
          noCache: true,
          hidden: false
        },
        hidden: false
      }]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/authredirect',
      component: () => import('@/views/login/auth-redirect'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/errorPage/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/views/errorPage/401'),
      hidden: true
    }
  ]
})
