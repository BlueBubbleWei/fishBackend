import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  console.log('to:', to)
  console.log('from:', from)
  console.log('next:', next())
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 根据cookie判断是否登录
  const hasToken = getToken()
  console.log('hasToken:', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // 通过用户角色获取相应的权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log('hasRoles:', hasRoles, store.getters.roles)
      // 当有用户权限的时候，生成所有可访问路由  但由于该接口的权限和路由不是同一接口返回的，所以代码要做相应改动
      try {
        // get user info
        await store.dispatch('user/getInfo').then(res => { // 拉取用户列表
          store.dispatch('permission/GenerateRoutes').then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
            // next({ ...to })
          })
        }).catch(() => {
          store.dispatch('user/logout').then(() => {
            Message.error('验证失败，请重新登录')
            next(`/login?redirect=${to.path}`)
          })
        })
        next()
      } catch (error) {
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error(error || 'Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
