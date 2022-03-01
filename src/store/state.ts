

export const state: Object = {
  uid: sessionStorage.getItem('wangyi_uid') ?? 0,
  userInfo: JSON.parse(sessionStorage.getItem('wangyi_userInfo') || '0') || {},
  level: 0,
  homeInfo: {},
  currentSongId: null,
  currentSongInfo: { // 当前歌曲的信息
    id: '1497529315',
    imageUrl:'https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg', 
    title: '阿拉斯加海湾',
    authors: '袁潇崴'
  },
  // 当前的播放音乐列表
  currentPlayList: [
    {
      id: '1497529315',
      imageUrl:'https://p2.music.126.net/s6zFxvXe5kOxub4_x4rZhQ==/109951163052847567.jpg', 
      title: '阿拉斯加海湾',
      authors: '袁潇崴'
    },
    {
      id: '1472581727',
      imageUrl:'http://p1.music.126.net/cWt6z6bhPPmQKd-qOzThnA==/109951165252977844.jpg', 
      title: '月亮鲸鱼',
      authors: '房东的猫-陆宇鹏'
    }
  ],
  // 当前歌词
  currentLyric: [],
  currentPlayStatus: false, // 播放器的状态
  currentTime: 0,
  likeIds: []
}