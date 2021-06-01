<template>
  <div class="Index-wrapper">
    <IndexHeader/>
    <Carousel v-if="status" :bannerList='bannerList'/>
    <IndexIcon v-if="status" :iconList='iconList'/>
  </div>
</template>

<script>
import IndexHeader from './components/IndexHeader'
import Carousel from "./components/Carousel"
import IndexIcon from "./components/IndexIcon"
import { home_banner, home_icon } from "@/api/home/index";
import { onMounted,ref } from "vue";
export default {
  name: 'Index',
  components: {
    Carousel,
    IndexIcon,
    IndexHeader
  },
  setup () {
    const bannerList = ref([])
    const iconList = ref([])
    const status = ref(false)
    onMounted(async () => {
      try {
        const bannerResult = await home_banner()
        const iconResult =  await home_icon()
        bannerList.value = bannerResult.data.banners
        iconList.value = iconResult.data.data
        status.value = true
      } catch(err) {
        console.log('err:',err)
      }
      
      // home_banner().then((res) => {
      //   if (res.data.code === 200) {
      //     console.log(res.data,'banner')
      //     bannerList.value = res.data.banners
      //     status.value = true
      //   }
      // })
      // home_icon().then((res) => {
      //   if (res.data.code === 200) {
      //     console.log(res.data,'icon')
      //     iconList.value = res.data.data
      //     status1.value = true
      //   }
      // })
    })
    return {
      status,
      iconList,
      bannerList
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
