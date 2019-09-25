import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import homePage from '@/components/homePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '',
      component: homePage,
      redirect: 'home',
      children: [{
        path: 'home',
        component: () => import('@/components/homePage'),
        name: '首页',
        meta: {
          title: '首页',
          icon: 'dashboard',
          noCache: true,
          hidden: true
        },
        hidden: false
      }]
    }
  ]
})
