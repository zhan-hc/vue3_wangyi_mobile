<template>
  <audio id="musicAudio" autoplay :src="songUrl" ref="au" @canplay="handleCanplay" @timeupdate="handleTimeupdate" @ended="overAudio"/>
</template>

<script setup>
import { defineProps, onMounted, ref, watch, nextTick, computed } from 'vue'
import { useStore } from 'vuex'
import { song_url, song_lyric } from '@/api/song'
import { durationTrans } from "@/assets/ts/common";
import useAudioFun from '@/hooks/audio/useAudioFun'
import useLyricFun from '@/hooks/song/useLyricFun'
  const { nextOrPrevPlay } = useAudioFun()
  const { getLyric } = useLyricFun()

  const au = ref(null)
  const store = useStore()
  const songUrl = ref('')
  // const songInfo = computed(() => store.state.currentSongInfo)
  const currentTime = computed(() => store.state.currentTime)
  // 监听切换音乐
  watch(()=>store.state.currentSongId,(newVal,oldVal)=>{
 	  console.log('音乐id改变了',newVal,oldVal)
    nextTick(() => {
      songUrl.value = `https://music.163.com/song/media/outer/url?id=${newVal}.mp3`
      au.value.play()
      getLyric()
    })
  })
  // 监听播放状态
  watch(()=>store.state.currentPlayStatus,(newVal,oldVal)=>{
    if (newVal) {
      au.value.play()
    } else {
      au.value.pause()
    }
  })

  // 音乐加载完成时
  const handleCanplay = () => {
    store.commit('changeTranDuration', durationTrans(au.value.duration))
    store.commit('changeSongDuration', au.value.duration)
  }

  // 获取音乐的实时状态
  const handleTimeupdate = () => {
    store.commit('changePlayTime', au.value.currentTime)
  }

  const overAudio = () => {
    nextOrPrevPlay(2)
  }


  

</script>

<style scoped lang='scss'>
  
</style> 