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
import indexPlayer from '@/components/musicPlayer/indexPlayer.vue'
import musicPlayer from '@/components/musicPlayer/index.vue'
</script>

<style scoped lang="scss"></style>
