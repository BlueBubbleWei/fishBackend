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

export function getRechargeRecord(params) {
  // 获取充值记录
  return request({
    url: '/api/getRechargeRecord',
    method: 'post',
    params
  })
}

export function downloadRechargeRecord(params) {
  // 获取充值记录导出ExceL
  return request({
    url: '/api/downloadRechargeRecord',
    method: 'post',
    params
  })
}
