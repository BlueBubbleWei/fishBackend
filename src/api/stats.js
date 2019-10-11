import request from '@/utils/request'

export function getFlowOfGoldCoins(params) {
  // 流动金币统计
  return request({
    url: '/api/getFlowOfGoldCoins',
    method: 'post',
    params
  })
}
