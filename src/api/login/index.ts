import { Request } from '@/utils/request';
function addParamsTime (params: Object) {
  return {
    ...params,
    timestamp: +new Date()
  }
}
// 发送验证码
export function login_cellphone (parameter: any)  {
    return Request.axiosInstance({
        url: '/captcha/sent',
        method: 'post',
        data: addParamsTime(parameter)
    })
}
// 手机密码登录
export function login_phonePsw (parameter: any)  {
    return Request.axiosInstance({
        url: '/login/cellphone',
        method: 'post',
        data: addParamsTime(parameter)
    })
}
// 检查验证码
export function login_verifycode (parameter: any)  {
  return Request.axiosInstance({
      url: '/captcha/verify',
      method: 'post',
      data: addParamsTime(parameter)
  })
}
// 检查登陆状态
export function login_status ()  {
  return Request.axiosInstance({
      url: '/login/status',
      method: 'post'
  })
}