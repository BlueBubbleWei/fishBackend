import request from '@/utils/request'

export function getItemLog(params) {
  // 玩家道具变化详情
  return request({
    url: '/api/getItemLog',
    method: 'post',
    params
  })
}
