import { Request } from '@/utils/request';
// 获取账号信息
export function user_account ()  {
  return Request.axiosInstance({
      url: '/user/account',
      method: 'post'
  })
}