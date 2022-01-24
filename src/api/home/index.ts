import myRequest from '@/utils/http/axios/index'


// 首页信息
export function home_page ()  {
    return myRequest.request({
      url: 'homepage/block/page',
      method: 'post'
    })
}
// 首页icon
export function home_icon ()  {
    return myRequest.request({
      url: 'homepage/dragon/ball',
      method: 'post'
    })
}