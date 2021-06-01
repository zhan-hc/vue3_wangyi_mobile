import { Request } from '@/utils/request';
// 首页banner
export function home_banner (parameter: any)  {
    return Request.axiosInstance({
        url: '/banner',
        method: 'post'
    })
}
// 首页icon
export function home_icon (parameter: any)  {
    return Request.axiosInstance({
        url: '/homepage/dragon/ball',
        method: 'post'
    })
}
// 首页推荐歌单
export function home_recommend (parameter: any)  {
    return Request.axiosInstance({
        url: '/recommend/resource',
        method: 'post'
    })
}