<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
  <index-player />
  <music-player />
</template>

<script setup>
  import { ref, provide } from 'vue'
  import { useStore } from 'vuex'
  import indexPlayer from '@/components/musicPlayer/indexPlayer.vue'
  import musicPlayer from '@/components/musicPlayer/index.vue'

  const store = useStore()
  // 设置背景色
  const themeType = store.state.setupInfo.isThemeDrak ? 'dark' : 'light'
  window.document.documentElement.setAttribute('data-theme', themeType)
</script>

<style scoped lang="scss"></style>
