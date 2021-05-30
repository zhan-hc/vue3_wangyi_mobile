<template>
  <div class="Index-wrapper">
    <IndexHeader/>
    <Carousel v-if="status" :bannerList='bannerList'/>
  </div>
</template>

<script>
import IndexHeader from './components/IndexHeader'
import Carousel from "./components/Carousel/index";
import { home_banner } from "@/api/home/index";
import { onMounted,ref } from "vue";
export default {
  name: 'Index',
  components: {
    Carousel,
    IndexHeader
  },
  setup () {
    const bannerList = ref([])
    const status = ref(false)
    onMounted(() => {
      home_banner().then((res) => {
        if (res.data.code === 200) {
          console.log(res.data)
          bannerList.value = res.data.banners
          status.value = true
        }
      })
    })
    return {
      status,
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
