import request from '@/utils/request'

export function getGunLevelStatistics(params) {
  // 炮数成长分布
  return request({
    url: '/api/getGunLevelStatistics',
    method: 'post',
    params
  })
}
