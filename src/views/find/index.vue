<template>
  <div class="find-wrapper">
    <Carousel v-if="status" :bannerList='bannerList'/>
    <IndexIcon v-if="status" :iconList='iconList'/>
    <Recommend v-if="status" :recommendInfo='recommendInfo'/>
    <IndexSong v-if="status" :songInfo='songInfo'/>
    <IndexVideo  v-if="status" :videoInfo='videoInfo'/>
  </div>
</template>

<script>
import Carousel from "./components/Carousel"
import IndexIcon from "./components/IndexIcon"
import Recommend from "./components/Recommend"
import IndexSong from "./components/IndexSong"
import IndexVideo from "./components/IndexVideo"
import { home_icon, home_page } from "@/api/home/index";
import { onMounted,ref } from "vue";
export default {
  name: 'Find',
  components: {
    Carousel,
    IndexIcon,
    Recommend,
    IndexSong,
    IndexVideo
  },
  setup () {
    const bannerList = ref([])
    const iconList = ref([])
    const recommendInfo = ref({})
    const songInfo = ref({})
    const videoInfo = ref({})
    const status = ref(false)
    onMounted(async () => {
      try {
        const result =  await home_page()
        const iconResult = await home_icon()
        bannerList.value = result.data.data.blocks[0].extInfo.banners
        iconList.value = iconResult.data.data
        recommendInfo.value = result.data.data.blocks[1]
        songInfo.value = result.data.data.blocks[2]
        videoInfo.value = result.data.data.blocks[3]
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
      recommendInfo
    }
  }
}
</script>

<style scoped lang="scss">
.find-wrapper{
  background-color: #f5f5f5;
  padding-bottom: 150px;
}
</style>
