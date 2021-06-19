<template>
  <div class="find-wrap">
    <Carousel v-if="status" :bannerList='bannerList'/>
    <IndexIcon v-if="status" :iconList='iconList'/>
    <div v-if="status">
      <component
        :key='i'
        :data='item'
        :is='blockCode[item.blockCode]'
        v-for="(item, i) in result.data.data.blocks.slice(1,result.data.data.blocks.length)"
      />
      <div class="find-end">{{result.data.data.pageConfig.nodataToast}}</div>
    </div>
    <!-- <Recommend v-if="status" :data='recommendInfo'/>
    <IndexSong v-if="status" :data='songInfo'/> -->
    <!-- <IndexVideo  v-if="status" :videoInfo='videoInfo'/> -->
    <!-- <IndexLive  v-if="status" :data='liveInfo'/> -->
  </div>
</template>

<script>
import Carousel from "./components/Carousel"
import IndexIcon from "./components/IndexIcon"
import Recommend from "./components/Recommend"
import IndexSong from "./components/IndexSong"
import IndexVideo from "./components/IndexVideo"
import IndexLive from "./components/IndexLive"
import { home_icon, home_page } from "@/api/home/index";
import { onMounted, ref, reactive } from "vue";
export default {
  name: 'Find',
  components: {
    Carousel,
    IndexIcon,
    Recommend,
    IndexSong,
    IndexVideo,
    IndexLive
  },
  setup () {
    const bannerList = ref([])
    const iconList = ref([])
    const recommendInfo = ref({})
    const songInfo = ref({})
    const videoInfo = ref({})
    const liveInfo = ref({})
    let result = ref({})
    const blockCode = reactive({
      // 'HOMEPAGE_BANNER' : '',
      'HOMEPAGE_BLOCK_PLAYLIST_RCMD': 'Recommend',
      'HOMEPAGE_BLOCK_LISTEN_LIVE': 'IndexLive',
      'HOMEPAGE_BLOCK_STYLE_RCMD': 'IndexSong'
    })
    const status = ref(false)
    onMounted(async () => {
      try {
        result.value =  await home_page()
        const iconResult = await home_icon()
        bannerList.value = result.value.data.data.blocks[0].extInfo.banners
        iconList.value = iconResult.data.data
        status.value = true
      } catch(err) {
        console.log('err:',err)
      }
    })
    return {
      status,
      iconList,
      songInfo,
      videoInfo,
      liveInfo,
      result,
      blockCode,
      bannerList,
      recommendInfo
    }
  }
}
</script>

<style scoped lang="scss">
.find-wrap{
  .find-end{
    font-size: 32px;
    text-align: center;
    height: 100px;
    line-height: 100px;
  }
}
</style>
