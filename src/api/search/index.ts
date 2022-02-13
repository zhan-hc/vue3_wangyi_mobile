import myRequest from '@/utils/http/axios/index'


// 搜索建议
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

// 热搜
export function search_hot ()  {
    return myRequest.request({
      url: '/search/hot/detail',
      method: 'post'
    })
}

// 搜索结果
export function search_multimatch (parameter:string)  {
    return myRequest.request({
      url: '/search/multimatch',
      method: 'post',
      data: {
        'keywords': parameter,
        'type':'mobile'
      }
    })
}