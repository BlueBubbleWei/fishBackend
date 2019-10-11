import request from '@/utils/request'

export function login(data) {
  console.log('####', data)
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/api/menus/build',
    method: 'get',
    params: params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
