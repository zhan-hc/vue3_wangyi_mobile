import myRequest from '@/utils/http/axios/index'
// 获取账号信息
export function user_account ()  {
  return myRequest.request({
    url: 'user/account',
    method: 'post',
    hasCookie: true
  })
}
// 获取用户的等级信息
export function user_level ()  {
  return myRequest.request({
    url: 'user/level',
    method: 'post',
    hasCookie: true
  })
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function user_subcount ()  {
  return myRequest.request({
    url: 'user/subcount',
    method: 'post',
    hasCookie: true
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function user_detail (userId: number)  {
  return myRequest.request({
    url: 'user/detail',
    method: 'post',
    hasCookie: true,
    data: {
      uid: userId
    }
  })
}

// 获取用户喜欢音乐的列表
export function user_likeList (userId: number)  {
  return myRequest.request({
    url: '/likelist',
    method: 'post',
    hasCookie: true,
    data: {
      uid: userId
    }
  })
}

// 获取用户的歌单
export function user_playList (userId: number)  {
  return myRequest.request({
    url: '/user/playlist',
    method: 'post',
    hasCookie: true,
    data: {
      uid: userId
    }
  })
}