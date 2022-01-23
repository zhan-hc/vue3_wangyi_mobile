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
    <player-detail v-show="isShowPlayer" />
    <bottom-player />
    <bottom-nav />
  </div>
</template>

<script setup>
  import IndexHeader from './components/IndexHeader'
  import DrawerInfo from './components/DrawerInfo'
  import BottomNav from './components/BottomNav'
  import PlayerDetail from './components/PlayerDetail'
  import BottomPlayer from './components/BottomPlayer'
  import find from '@/views/find/index'
  import podcast from '@/views/podcast/index'
  import my from '@/views/my/index'
  import sing from '@/views/sing/index'
  import village from '@/views/village/index'
  import { ref, provide, onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import { user_account, user_level, user_detail } from '@/api/user/index'

  const state = reactive({
    navList: [find, podcast, my, sing, village],
  })
  const isShowPlayer = ref(false)
  const visible = ref(false)
  const activeTab = ref(0)
  const {proxy} = getCurrentInstance()
  const toast = proxy.$toast

  const store = useStore()

  provide('visible', visible)
  provide('activeTab', activeTab)
  provide('isShowPlayer', isShowPlayer)

  const onClose = () => {
    visible.value = false
  }

  const { navList } = toRefs(state)
</script>

<style lang="scss">
  .ant-drawer-wrapper-body {
    background: #f5f5f5;
  }
</style>
<style scoped lang="scss">
  .index-wrapper {
    background-color: #f5f5f5;
    padding: 120px 0 250px;
    box-sizing: border-box;
  }
</style>
