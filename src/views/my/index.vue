<template>
  <div class="my-wrap">
    <userInfo />
    <myIconList />
    <likeSong/>
    <songList />
  </div>
</template>

<script setup>
import userInfo from "./components/userInfo"
import likeSong from "./components/likeSong"
import myIconList from "./components/myIconList"
import songList from "./components/songList"
import useMyInfo from '@/hooks/my/useMyInfo'

  useMyInfo()
  
</script>

<style scoped lang="scss">
.my-wrap {
  font-size: 12px;
  padding: .3125rem;
  box-sizing: border-box;
}
</style>
