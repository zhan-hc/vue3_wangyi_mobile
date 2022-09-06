<template>
  <div class="myself">
    <unLogin v-if="!uid" />
    <userInfo v-else />
    <myIconList />
    <likeSong />
    <songList />
  </div>
</template>

<script setup>
  import userInfo from './components/userInfo'
  import likeSong from './components/likeSong'
  import myIconList from './components/myIconList'
  import songList from './components/songList'
  import unLogin from './components/unLogin'

  import useMyInfo from '@/hooks/my/useMyInfo'

  const { uid } = useMyInfo()
</script>

<style scoped lang="scss">
  .myself {
    font-size: 12px;
    padding: 0.3125rem;
    box-sizing: border-box;
  }
</style>
