import {songData, lyricData} from '@/hooks/song/type'
export default {
  setUserLevel: (state: any, data: Object) => {
    state.level = data
  },
  setUserInfo: (state: any, data: Object) => {
    state.userInfo = data
  },
  setHomeInfo: (state: any, data: Object) => {
    state.homeInfo = data
  },
  changeSongUrl: (state: any, url: string) => {
    state.songUrl = url
  },
  changeSongId: (state: any, id: number) => {
    state.currentSongId = id
  },
  changeSongInfo: (state: any, data: Object) => {
    state.currentSongInfo = data
  },
  changeTranDuration: (state: any, data: string) => {
    state.currentSongInfo.duration = data
  },
  changeSongDuration: (state: any, data: string) => {
    state.currentSongInfo.sumTime = data
  },
  changePlayStatus: (state: any, status: boolean) => {
    state.currentPlayStatus = status
  },
  changePlayTime: (state: any, time: number) => {
    state.currentTime = time
  },
  setLikeIds:  (state: any, ids: Array<Number>) => {
    state.likeIds = ids
  },
  setCurrentPlayList:  (state: any, data: Array<songData>) => {
    state.currentPlayList = data
  },
  setCurrentLyric:  (state: any, data: Array<lyricData>) => {
    state.currentLyric = data
  },
  changeSetupInfo: (state: any, data: Object) => {
    state.setupInfo = data
  },
}
