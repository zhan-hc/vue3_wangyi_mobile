<template>
  <!-- 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音 -->
  <van-tabs v-model:active="active">
    <van-tab v-for="item in tabList " :title="item.title" :name="item.value">
      <component :is="item.com"></component>
    </van-tab>
  </van-tabs>

</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
import singleList from './singleList.vue'
import albumList from './albumList.vue'
import lyricList from './lyricList.vue'
import singerList from './singerList.vue'
import songList from './songList.vue'
import userList from './userList.vue'
import videoList from './videoList.vue'
import voiceList from './voiceList.vue'
import mix from './mix.vue'
export default defineComponent({
  name: 'searchResult',
  props: {
  },
  components: {
    singleList,
    albumList,
    lyricList,
    singerList,
    songList,
    userList,
    videoList,
    voiceList,
  },
  setup() {
    const state = reactive({
      tabList: [
        {title: '综合', value: '1018', com: singleList}, 
        {title: '单曲', value: '1', com: singleList},
        {title: '歌单', value: '1000', com: songList},
        {title: '视频', value: '1014', com: videoList},
        {title: '歌手', value: '100', com: singerList},
        {title: '歌词', value: '1006', com: lyricList},
        {title: '专辑', value: '10', com: albumList},
        {title: '声音', value: '2000', com: voiceList},
        {title: '用户', value: '1002', com: userList}
      ],
      active: '1018'
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang='scss'>
  
</style>