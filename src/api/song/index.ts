import myRequest from '@/utils/http/axios/index'
// 歌单详细信息
export function songList_detail (parameter: Object)  {
    return myRequest.request({
      url: 'playlist/detail',
      method: 'post',
      data: parameter
    })
}

// 获取音乐url(多个id用逗号隔开)
export function song_url (id: string | number)  {
    return myRequest.request({
      url: 'song/url',
      method: 'post',
      data: {id}
    })
}

// 音乐是否可用
export function check_music (id: string | number)  {
    return myRequest.request({
      url: 'check/music',
      method: 'post',
      data: {id}
    })
}

// 获取歌曲详情(多个id用逗号隔开)
export function song_detail (ids: string | number)  {
    return myRequest.request({
      url: 'song/detail',
      method: 'post',
      data: {ids},
      showLoading: false
    })
}

// 获取歌曲详情(多个id用逗号隔开)
export function song_lyric (id: string | number)  {
    return myRequest.request({
      url: '/lyric',
      method: 'post',
      data: {id},
      showLoading: false
    })
}