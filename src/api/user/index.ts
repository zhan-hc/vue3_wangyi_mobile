import { Request } from '@/utils/request';
// 获取账号信息
export function user_account ()  {
  return Request.axiosInstance({
      url: '/user/account',
      method: 'post'
  })
}
// 获取用户的等级信息
export function user_level ()  {
  return Request.axiosInstance({
      url: '/user/level',
      method: 'post'
  })
}