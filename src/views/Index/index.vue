<template>
  <div class="Index-wrapper">
    <IndexHeader/>
    <Carousel v-if="status" :bannerList='bannerList'/>
    <IndexIcon v-if="status" :iconList='iconList'/>
    <Recommend v-if="status" :recommendList='recommendList'/>
  </div>
</template>

<script>
import IndexHeader from './components/IndexHeader'
import Carousel from "./components/Carousel"
import IndexIcon from "./components/IndexIcon"
import Recommend from "./components/Recommend"
import { home_banner, home_icon, home_recommend } from "@/api/home/index";
import { onMounted,ref } from "vue";
export default {
  name: 'Index',
  components: {
    Carousel,
    IndexIcon,
    Recommend,
    IndexHeader
  },
  setup () {
    const bannerList = ref([])
    const iconList = ref([])
    const recommendList = ref([])
    const status = ref(false)
    onMounted(async () => {
      try {
        const bannerResult = await home_banner()
        const iconResult = await home_icon()
        const recommendResult = await home_recommend()
        bannerList.value = bannerResult.data.banners
        iconList.value = iconResult.data.data
        recommendList.value = recommendResult.data.recommend
        status.value = true
      } catch(err) {
        console.log('err:',err)
      }
    })
    return {
      status,
      iconList,
      bannerList,
      recommendList
    }
  }
}
</script>

<style scoped lang="scss">
.Index-wrapper{
  background-color: #f5f5f5;
  box-sizing: border-box;
}
</style>
