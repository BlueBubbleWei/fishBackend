import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'

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
          hidden: true
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
