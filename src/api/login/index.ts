import { Request } from '@/utils/request';

// 发送验证码
export function login_cellphone (parameter: any)  {
    return Request.axiosInstance({
        url: '/captcha/sent',
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