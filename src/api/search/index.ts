import myRequest from '@/utils/http/axios/index'

interface searchData {
  keywords: string,
  limit?: string | number,
  type?: string | number
}

// 搜索建议
export function search_suggest (parameter:string)  {
    return myRequest.request({
      url: '/search/suggest',
      method: 'post',
      data: {
        'keywords': parameter,
        'type':'mobile'
      },
      showLoading: false
    })
}

// 默认搜索关键词
export function search_default()  {
    return myRequest.request({
      url: '/search/default',
      method: 'post'
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
export function search_result (data: searchData)  {
    return myRequest.request({
      url: '/search',
      method: 'post',
      data,
      loadingType: 'music'
    })
}