<template>
  <bottom-player />
  <player-detail v-show="isShowPlayer" />
</template>

<script lang='ts'>
import {defineComponent, ref, provide, watch} from 'vue'
import BottomPlayer from './BottomPlayer.vue'
import PlayerDetail from './PlayerDetail.vue' 
export default defineComponent({
  name: 'musicPlayer',
  components: {
    BottomPlayer,
    PlayerDetail
  },
  setup() {
    const isShowPlayer = ref(false)
    provide('isShowPlayer', isShowPlayer)
    
    return {
      isShowPlayer
    }
  }
})
</script>

<style scoped lang='scss'>
  
</style>