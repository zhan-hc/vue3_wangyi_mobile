import myRequest from '@/utils/http/axios/index'

// 发送验证码
export function login_cellphone (parameter: Object)  {
    return myRequest.request({
      url: 'captcha/sent',
      method: 'post',
      data: parameter
    })
}
// 手机密码登录
export function login_phonePsw (parameter: Object)  {
    return myRequest.request({
      url: 'login/cellphone',
      method: 'post',
      data: parameter
    })
}
// 检查验证码
export function login_verifycode (parameter: Object)  {
  return myRequest.request({
    url: 'captcha/verify',
    method: 'post',
    data: parameter
  })
}

// 检查验证码
export function login_refresh ()  {
  return myRequest.request({
    url: 'login/refresh',
    method: 'post'
  })
}