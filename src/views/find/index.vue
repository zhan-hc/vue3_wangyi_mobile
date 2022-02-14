<template>
  <div class="find-wrapper" v-if="status">
    <Carousel :data="bannerList" />
    <IndexIcon :iconList="iconList" />
    <component
      v-for="item in homeList"
      :is="homeComMap[item.blockCode]"
      :key="item.blockCode"
      :data="item"
    ></component>
    <div class="find-end">{{ endText }}</div>
  </div>
</template>

<script setup>
  import Carousel from './components/Carousel'
  import IndexIcon from './components/IndexIcon'
  import Recommend from './components/Recommend'
  import IndexSong from './components/IndexSong'
  import IndexVideo from './components/IndexVideo'
  import IndexCalendar from './components/IndexCalendar'
  import IndexNewSong from './components/IndexNewSong'
  import IndexBroadcast from './components/IndexBroadcast'
  import { home_icon, home_page } from '@/api/home/index'
  import { onMounted, ref, reactive, toRefs } from 'vue'
  import IndexLive from './components/IndexLive'
  import useHomeModule from '@/hooks/find/useHomepage'

  let {state} = useHomeModule() // 获取首页模块内容
  const { homeList, homeComMap, iconList, bannerList, status, endText } = toRefs(state)
</script>

<style scoped lang="scss">
  .find-wrapper {
    .find-end {
      font-size: 16px;
      text-align: center;
      height: 1rem;
      line-height: 1rem;
    }
  }
</style>
