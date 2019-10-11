import request from '@/utils/request'
export function getAccounts(params) {
  // 查询账户信息
  return request({
    url: '/api/getAccounts',
    method: 'post',
    params
  })
}

export function suspendAccount(params) {
  // 停封用户
  return request({
    url: '/api/suspendAccount',
    method: 'post',
    params
  })
}

export function unblockAccount(params) {
  // 解封用户
  return request({
    url: '/api/unblockAccount',
    method: 'post',
    params
  })
}

export function getSuspendAccount(params) {
  // 查询用户封停原因
  return request({
    url: '/api/getSuspendAccount',
    method: 'post',
    params
  })
}

export function getMemberBackpackInfo(params) {
  // 根据玩家id查询玩家背包信息
  return request({
    url: '/api/getMemberBackpackInfo',
    method: 'post',
    params
  })
}

export function resetMemberPassword(params) {
  // 重置密码
  return request({
    url: '/api/resetMemberPassword',
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
