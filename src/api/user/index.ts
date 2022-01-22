import myRequest from '@/utils/http/axios/index'
// 获取账号信息
export function user_account ()  {
  return myRequest.request({
    url: 'user/account',
    method: 'post'
  })
}
// 获取用户的等级信息
export function user_level ()  {
  return myRequest.request({
    url: 'user/level',
    method: 'post'
  })
}