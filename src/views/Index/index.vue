<template>
  <div class="index-wrapper">
    <index-header />
    <a-drawer
      placement="left"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <DrawerInfo />
    </a-drawer>
    <keep-alive>
      <component :is="navList[activeTab]" />
    </keep-alive>
    <bottom-nav />
  </div>
</template>

<script setup>
  import IndexHeader from './components/IndexHeader'
  import DrawerInfo from './components/DrawerInfo'
  import BottomNav from './components/BottomNav'
  import find from '@/views/find/index'
  import podcast from '@/views/podcast/index'
  import my from '@/views/my/index'
  import sing from '@/views/sing/index'
  import village from '@/views/village/index'
  import {
    ref,
    provide,
    onMounted,
    reactive,
    toRefs,
    getCurrentInstance,
    watch,
  } from 'vue'
  import { useStore } from 'vuex'
  import { user_account, user_detail } from '@/api/user/index'

  const data = reactive({
    navList: [find, podcast, my, sing, village],
  })

  const store = useStore()

  const visible = ref(false)
  const activeTab = ref(0)
  const { proxy } = getCurrentInstance()
  const toast = proxy.$toast

  provide('visible', visible)
  provide('activeTab', activeTab)

  const onClose = () => {
    visible.value = false
  }
  

  const { navList } = toRefs(data)
</script>

<style lang="scss">
  .ant-drawer-wrapper-body {
    background: #f5f5f5;
  }
</style>
<style scoped lang="scss">
  .index-wrapper {
    background-color: #f5f5f5;
    padding: 1.625rem 0 3rem;
    box-sizing: border-box;
    min-height: 100vh;
  }
</style>
