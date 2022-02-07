import myRequest from '@/utils/http/axios/index'


// 首页信息
export function search_suggest (parameter:string)  {
    return myRequest.request({
      url: '/search/suggest',
      method: 'post',
      data: {
        'keywords': parameter,
        'type':'mobile'
      }
    })
}