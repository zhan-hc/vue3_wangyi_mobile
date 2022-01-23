<template>
  <div class="my-wrap">
    <userInfo />
    <myIconList />
    <likeSong />
    <songList />
  </div>
</template>

<script setup>
import { onMounted, ref} from "vue"
import userInfo from "./components/userInfo"
import likeSong from "./components/likeSong"
import myIconList from "./components/myIconList"
import songList from "./components/songList"
import { user_level } from '@/api/user/index'

  onMounted(() => {
    user_level()
      .then((res) => {
        if (res.code === 200) {
          sessionStorage.setItem('level', res.data.level)
          store.commit('setUserLevel', res.level)
        }
      })
      .catch((err) => {
        console.log(err, 'err')
      })
  })
</script>

<style scoped lang="scss">
.my-wrap {
  font-size: 24px;
  padding: 30px;
  box-sizing: border-box;
}
</style>
