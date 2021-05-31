import { Request } from '@/utils/request';
function addParamsTime (params: Object) {
  return {
    ...params,
    timestamp: +new Date()
  }
}
// 首页banner
export function home_banner (parameter: any)  {
    return Request.axiosInstance({
        url: '/banner',
        method: 'post',
        data: addParamsTime(parameter)
    })
}
// 首页banner
export function home_icon (parameter: any)  {
    return Request.axiosInstance({
        url: '/homepage/dragon/ball',
        method: 'post',
        data: addParamsTime(parameter)
    })
}