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
        <component :is='navList[activeTab]'/>
      </keep-alive>
      <player-detail v-show="isShowPlayer"/>
      <bottom-player/>
      <bottom-nav/>
  </div>
</template>

<script setup>
import IndexHeader from "./components/IndexHeader";
import DrawerInfo from "./components/DrawerInfo";
import BottomNav from "./components/BottomNav";
import PlayerDetail from "./components/PlayerDetail";
import BottomPlayer from "./components/BottomPlayer";
import find from "@/views/find/index";
import podcast from "@/views/podcast/index";
import my from "@/views/my/index";
import sing from "@/views/sing/index";
import village from "@/views/village/index";
import { ref, provide, onMounted, reactive, toRefs } from "vue";
import {useStore} from 'vuex';
// import { useToast } from "@/components/Toast/toast";
import { user_account, user_level } from '@/api/user/index'


    const state = reactive({
      visible: false,
      navList: [find,podcast,my,sing,village],
      activeTab: 0,
      isShowPlayer: false
    })

    // const vm = getCurrentInstance()
    // const {proxy} = getCurrentInstance()
    // const Toast = useToast()
    // Toast('aaaaaaa')
    const store = useStore()

    provide('visible', visible)
    provide('activeTab', activeTab)
    provide('isShowPlayer',isShowPlayer)

    onMounted(() => {
      user_account().then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem('uid',res.data.profile.userId)
          store.commit('setUserInfo', res.data.profile)
        }
      }).catch((err) => {
        console.log(err, 'err')
      })
      user_level().then((res) => {
        if (res.data.code === 200) {
          localStorage.setItem('level',res.data.data.level)
          store.commit('setUserLevel', res.data.level)
        }
      }).catch((err) => {
        console.log(err, 'err')
      })
    })
    
    const onClose = () => {
      visible = false
    }

    const {visible, navList, activeTab, isShowPlayer} = toRefs(state)
</script>

<style lang="scss">
.ant-drawer-wrapper-body{
    background: #f5f5f5;
  }
</style>
<style scoped lang="scss">
.index-wrapper {
  background-color: #f5f5f5;
  padding: 120px 0 150px;
  box-sizing: border-box;
}
</style>
