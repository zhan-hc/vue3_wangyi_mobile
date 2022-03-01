import {onMounted, computed} from "vue"
import {lyricData} from '@/hooks/song/type'
import { song_lyric } from '@/api/song'
import { useStore } from 'vuex'

export default function useLyricFun(){
  const store = useStore()
  const songInfo = computed(() => store.state.currentSongInfo)
  onMounted(() => {
    getLyric()
  })

  // 获取歌词
  function getLyric () {
    song_lyric(songInfo.value.id).then((res:any) => {
      const {lyric} = res.lrc
      store.commit('setCurrentLyric', getLyricData(lyric))
    })
  }

  // 获取歌词对象
  function getLyricData (lyric: string) {
    const regNewLine = /\n/
    const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
    const lineArr = lyric.split(regNewLine)
    const lyricsObjArr:Array<lyricData> = []
    lineArr.forEach(item => {
      if (item === '') return
        const obj:lyricData = {}
        const time = item.match(regTime)

        obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
        obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
      if (obj.lyric === '') {
        console.log('这一行没有歌词')
      } else {
        lyricsObjArr.push(obj)
      }
    })
    return lyricsObjArr
  }

  // 格式化歌词的时间 转换成 sss:ms
  function formatLyricTime (time: any ) {
    const regMin = /.*:/
    const regSec = /:.*\./
    const regMs = /\./

    const min = parseInt(time.match(regMin)[0].slice(0, 2))
    let sec = parseInt(time.match(regSec)[0].slice(1, 3))
    const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
    if (min !== 0) {
      sec += min * 60
    }
    return Number(sec + '.' + ms)
  }

  return {
    getLyric,
    getLyricData,
    formatLyricTime
  }
  
}