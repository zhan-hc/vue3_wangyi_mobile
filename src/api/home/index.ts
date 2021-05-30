import { Request } from '@/utils/request';
function addParamsTime (params: Object) {
  return {
    ...params,
    timestamp: +new Date()
  }
}
// 发送验证码
export function home_banner (parameter: any)  {
    return Request.axiosInstance({
        url: '/banner',
        method: 'post',
        data: addParamsTime(parameter)
    })
}