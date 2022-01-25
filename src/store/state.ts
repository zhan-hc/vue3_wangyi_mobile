

export const state: Object = {
  uid: sessionStorage.getItem('wangyi_uid') ?? '',
  userInfo: JSON.parse(sessionStorage.getItem('wangyi_userInfo') || '0') || {},
  level: 0,
  homeInfo: {},
  currentSongId: null,
  currentSongInfo: { // 当前歌曲的信息
    id: '',
    imageUrl:'https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg', 
    title: '阿拉斯加海湾',
    authors: '袁潇崴'
  },
  currentPlayStatus: false, // 播放器的状态
  currentTime: 0
}