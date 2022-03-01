import { computed} from "vue"
import { useStore } from 'vuex'
import { playMusic } from "@/assets/ts/common"
import {songData} from '@/hooks/song/type'
export default function useAudioFun(){

  const store = useStore()

  const songInfo = computed(() => store.state.currentSongInfo)
  const currentPlayList = computed(() => store.state.currentPlayList)
  const playStatus = computed(() => store.state.currentPlayStatus)


  // 改变播放状态
  const changePlayStatus = () => {
    store.commit('changePlayStatus', !playStatus.value)
  }
  // type 1:上一首;2:下一首
  const nextOrPrevPlay = (type: number) => {
    const currSongIndex = currentPlayList.value.findIndex((item:songData)=> item.id === songInfo.value.id)
    if (currSongIndex !== -1) {
      let startIndex = -1
      if (type === 1) {
        startIndex = currSongIndex - 1 === -1 ? currentPlayList.value.length - 1 : currSongIndex - 1
      }else {
        startIndex = currSongIndex + 1 === currentPlayList.value.length ? 0 : currSongIndex + 1
      }
      playMusic(currentPlayList.value[startIndex])
    }
  }

  return {
    songInfo,
    playStatus,
    currentPlayList,
    changePlayStatus,
    nextOrPrevPlay
  }
  
}