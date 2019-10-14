import { asyncRoutes, constantRoutes } from '@/router'
import { actions as userAction } from './user'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTERS: (state, routes) => {
    state.routes = routes
    state.routers = constantRoutes.concat(routes)
  }
}

const actions = {
  // generateRoutes({ commit }, roles) {
  //   return new Promise(resolve => {
  //     let accessedRoutes
  //     if (roles.includes('admin')) {
  //       accessedRoutes = asyncRoutes || []
  //     } else {
  //       accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  //     }
  //     commit('SET_ROUTES', accessedRoutes)
  //     resolve(accessedRoutes)
  //   })
  // }
  GenerateRoutes({ commit }) {
    let routerData = JSON.parse(sessionStorage.getItem('router')) // 获取当前角色的菜单（即路由）
    console.log('session:', routerData)
    // 当 routerData = null 时，路由导航不到页面
    if (routerData === null) { // 如果路由为空，跳转登录页面
      userAction.logout().then(() => {
        this.$router.push({ path: '/login' })
      })
    }
    routerData = [{
      'name': 'dolore voluptate est cupidatat',
      'path': 'aliquip voluptate est aute',
      'alwaysShow': false,
      'parentId': 0,
      'meta': {
        'title': 'laboris incididunt',
        'icon': 'est nostrud'
      },
      'children': [{
        'parentId': 1,
        'name': 'in irure',
        'path': 'eu ullamco fugiat quis',
        'meta': {
          'title': 'exercitation qui',
          'icon': 'd'
        },
        'alwaysShow': false,
        'children': [{
          'parentId ': 1,
          'name': 'do',
          'path': 'ullamco velit consectetur sunt enim',
          'meta': {
            'title': 'eiusmod ut',
            'icon': 'mollit'
          }
        }, {
          'parentId ': 1,
          'name': 'laborum magna',
          'path': 'aliqua irure ',
          'meta': {
            'title': 'laborum incididunt in',
            'icon': 'incididunt commodo eiusmod '
          }
        }, {
          'parentId': 1,
          'name': 'sit quis eiusmod ipsum',
          'path': 'labore',
          'meta': {
            'title': 'in amet magna labore',
            'icon': 'eu ad'
          }
        }, {
          'parentId': 1,
          'name': 'ut et',
          'path': 'pariatur non qui cillum',
          'meta': {
            'title': 'deserunt cupidatat ad laborum',
            'icon': 'adipisicing dolor'
          }
        }]
      }, {
        'parentId': 0,
        'name': 'laboris ut ipsum elit',
        'path': 'o',
        'meta': {
          'title': 'proident sint',
          'icon': 'non officia'
        },
        'alwaysShow': true,
        'children': [{
          'parentId': 1,
          'name': 'ea sunt',
          'path': 'do Ut enim quis',
          'meta': {
            'title': 'sint eiusmod aliquip sunt elit',
            'icon': 'laborum in ex'
          }
        }, {
          'parentId ': 1,
          'name': 'ex aliqua',
          'path': 'velit magna aliquip cupidatat',
          'meta': {
            'title': 'minim nostrud tempor',
            'icon': 'officia minim'
          }
        }, {
          'parentId ': 1,
          'name': 'dolore nostrud',
          'path': 'fugiat cillum',
          'meta': {
            'title': 'dolore qui',
            'icon': 'esse deserunt proident no'
          }
        }, {
          'parentId ': 1,
          'name': 'eiusmod veniam',
          'path': 'mollit consequat',
          'meta': {
            'title': 'officia',
            'icon': 'laborum quis '
          }
        }]
      }]
    }, {
      'parentId ': 0,
      'name': 'deserunt nisi',
      'path': 'est Duis nisi commodo',
      'alwaysShow': false,
      'meta': {
        'title': 'dolor Excepteur ullamco veniam',
        'icon': 'labore minim'
      },
      'children': [{
        'parentId ': 1,
        'name': 'deserunt adipisicing laborum',
        'path': 'enim quis ea aliqua pariatur',
        'meta': {
          'title': 'exercitation in ad eiusmod commodo',
          'icon': 'dolore amet mollit'
        },
        'alwaysShow': false,
        'children': [{
          'parentId ': 1,
          'name': 'ad Ut sed nulla',
          'path': 'est eu',
          'meta': {
            'title': 'amet',
            'icon': 'enim minim'
          }
        }, {
          'name': 'in exercitation dolor incididunt consectetur',
          'path': 'ipsum sed eu reprehenderit',
          'meta': {
            'title': 'aute magna id do incididunt',
            'icon': 'nulla velit ut'
          }
        }]
      }, {
        'parentId': 1,
        'name': 'Excepteur sed aliquip dolore ipsum',
        'path': 'in est qui',
        'meta': {
          'title': 'Ut ut nulla',
          'icon': 'nulla Lorem'
        },
        'alwaysShow': true,
        'children': [{
          'parentId ': 1,
          'name': 'in',
          'path': 'anim sint magna Ut n',
          'meta': {
            'title': 'sit pariatur amet',
            'icon': 'esse in'
          }
        }]
      }]
    }]
    const first_menus = routerData.filter((item, index) => item.parentId === 0)// 获取当前角色的一级菜单
    const second_menus = routerData.filter((item, index) => item.parentId !== 0)// 获取当前角色的二级菜单
    // console.log('first_menus:', first_menus)
    // console.log('second_menus:', second_menus)
    this.allMenuIds = second_menus.map(item => { // 二级菜单的parentId
      return item.parentId
    })
    const testRouter = first_menus.map((item, index) => { // 正式菜单
      item.children = second_menus.filter((sitem, sindex) => sitem.parentId === item.id)
      return item
    })

    return new Promise(resolve => {
      const accessedRouters = asyncRoutes
      const reBuildRouter = (arr1, arr2) => {
        for (let i = 0; i < arr1.length; i++) {
          for (let j = 0; j < arr2.length; j++) {
            if (arr1[i].resourceName !== arr2[j].name) { // ===
              arr2[j].hidden = false
              if (arr1[i].children && arr2[j].children) {
                reBuildRouter(arr1[i].children, arr2[j].children)
              }
            }
          }
        }
      }
      reBuildRouter(testRouter, accessedRouters)
      console.log('accessedRouters:', accessedRouters)
      commit('SET_ROUTERS', accessedRouters)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
