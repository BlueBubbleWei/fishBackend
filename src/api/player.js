import request from '@/utils/request'

export function getItemLog(params) {
  // 玩家道具变化详情
  return request({
    url: '/api/getItemLog',
    method: 'post',
    params
  })
}

export function getMemberBaseInfo(params) {
  // 查询玩家基本信息
  return request({
    url: '/api/getMemberBaseInfo',
    method: 'post',
    params
  })
}

export function getMemberPropInfo(params) {
  // 查询玩家道具信息
  return request({
    url: '/api/getMemberPropInfo',
    method: 'post',
    params
  })
}

export function getMemberGameInfo(params) {
  // 针对玩家的相关操作数据查询
  return request({
    url: '/api/getMemberGameInfo',
    method: 'post',
    params
  })
}

export function resetMemberGiftPackage(params) {
  // 重置玩家礼包
  return request({
    url: '/api/resetMemberGiftPackage',
    method: 'post',
    params
  })
}

export function kickOffMember(params) {
  // 踢除玩家
  return request({
    url: '/api/kickOffMember',
    method: 'post',
    params
  })
}

export function updateMemberVipExp(params) {
  // vipexp修改vip经验 count=增加/减少的值
  return request({
    url: '/api/updateMemberVipExp_1570689155924',
    method: 'post',
    params
  })
}

export function updateMemberPropInfo(params) {
  // 修改金币或钻石或龙弹
  return request({
    url: '/api/updateMemberPropInfo',
    method: 'post',
    params
  })
}
