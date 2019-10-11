import request from '@/utils/request'

export function getGunLevelStatistics(params) {
  return request({
    url: '/api/getGunLevelStatistics',
    method: 'post',
    params
  })
}
