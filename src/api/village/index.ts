import myRequest from '@/utils/http/axios/index'
// 云村
export function village_video ()  {
    return myRequest.request({
      url: '/video/timeline/recommend',
      method: 'post'
    })
}