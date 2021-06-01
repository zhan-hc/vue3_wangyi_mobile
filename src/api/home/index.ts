import { Request } from '@/utils/request';
// 首页信息
export function home_page ()  {
    return Request.axiosInstance({
        url: '/homepage/block/page',
        method: 'post'
    })
}
// 首页banner
export function home_banner ()  {
    return Request.axiosInstance({
        url: '/banner',
        method: 'post'
    })
}
// 首页icon
export function home_icon ()  {
    return Request.axiosInstance({
        url: '/homepage/dragon/ball',
        method: 'post'
    })
}
// 首页推荐歌单
export function home_recommend ()  {
    return Request.axiosInstance({
        url: '/personalized',
        method: 'post'
    })
}