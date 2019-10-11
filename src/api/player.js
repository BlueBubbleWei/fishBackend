import request from '@/utils/request'

export function getItemLog(params) {
  return request({
    url: '/api/getItemLog',
    method: 'post',
    params
  })
}
