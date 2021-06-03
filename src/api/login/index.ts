import { Request } from '@/utils/request';

// 发送验证码
export function login_cellphone (parameter: any)  {
    return Request.axiosInstance({
        url: '/captcha/sent',
        method: 'post',
        data: parameter
    })
}
// 手机密码登录
export function login_phonePsw (parameter: any)  {
    return Request.axiosInstance({
        url: '/login/cellphone',
        method: 'post',
        data: parameter
    })
}
// 检查验证码
export function login_verifycode (parameter: any)  {
  return Request.axiosInstance({
      url: '/captcha/verify',
      method: 'post',
      data: parameter
  })
}
// 获取账号信息
export function login_status ()  {
  return Request.axiosInstance({
      url: '/user/account',
      method: 'post'
  })
}