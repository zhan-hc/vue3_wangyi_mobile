import myRequest from '@/utils/http/axios/index'
// 歌单详细信息
export function songList_detail (parameter: Object)  {
    return myRequest.request({
      url: 'playlist/detail',
      method: 'post',
      data: parameter
    })
}