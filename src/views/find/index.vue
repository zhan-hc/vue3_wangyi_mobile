<template>
  <div class="find-wrapper"  v-if="status">
    <Carousel :data='bannerList'/>
    <IndexIcon :iconList='iconList'/>
    <!-- <Recommend v-if="status" :recommendInfo='recommendInfo'/>
    <IndexSong v-if="status" :songInfo='songInfo'/>
    <IndexVideo  v-if="status" :videoInfo='videoInfo'/> -->
    <!-- <component v-for="item in homeList.slice(1, 5)" :is="homeComMap[item.blockCode]" :key="item.blockCode" :data="item"></component> -->
    <component v-for="item in homeList" :is="homeComMap[item.blockCode]" :key="item.blockCode" :data="item"></component>
  </div>
</template>

<script>
import Carousel from "./components/Carousel"
import IndexIcon from "./components/IndexIcon"
import Recommend from "./components/Recommend"
import IndexSong from "./components/IndexSong"
import IndexVideo from "./components/IndexVideo"
import IndexCalendar from "./components/IndexCalendar"
import IndexNewSong from "./components/IndexNewSong"
import IndexBroadcast from "./components/IndexBroadcast"
import { home_icon, home_page } from "@/api/home/index";
import { onMounted,ref,reactive, toRefs } from "vue";
export default {
  name: 'Find',
  components: {
    Carousel,
    IndexIcon,
    Recommend,
    IndexSong,
    IndexVideo,
    IndexCalendar,
    IndexNewSong,
    IndexBroadcast
  },
  setup () {
    const bannerList = ref([])
    const iconList = ref([])
    const recommendInfo = ref({})
    const songInfo = ref({})
    const videoInfo = ref({})
    const status = ref(false)
    const state = reactive({
      homeList: [],
      homeComMap: {
        'HOMEPAGE_BANNER': Carousel,
        'HOMEPAGE_BLOCK_PLAYLIST_RCMD': Recommend,
        'HOMEPAGE_BLOCK_STYLE_RCMD': IndexSong,
        'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG': IndexNewSong,
        'HOMEPAGE_MUSIC_CALENDAR': IndexCalendar,
        'HOMEPAGE_MUSIC_MLOG': IndexSong, //
        'HOMEPAGE_BLOCK_MGC_PLAYLIST': Recommend,
        'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST': Recommend,
        'HOMEPAGE_VOICELIST_RCMD': IndexNewSong,
        'HOMEPAGE_PODCAST24': IndexBroadcast,
        'HOMEPAGE_BLOCK_VIDEO_PLAYLIST': Recommend
      }
    })
    onMounted(async () => {
      try {
        let homeData =  await home_page()
        const iconResult = await home_icon()
        state.homeList  = homeData.data.data.blocks.filter(item => !['HOMEPAGE_BANNER', 'HOMEPAGE_MUSIC_MLOG'].includes(item.blockCode))
        bannerList.value = homeData.data.data.blocks[0].extInfo.banners
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
      bannerList,
      // homeList,
      ...toRefs(state),
      recommendInfo
    }
  }
}
</script>

<style scoped lang="scss">
// .find-wrapper{
  // background-color: #f5f5f5;
// }
</style>
