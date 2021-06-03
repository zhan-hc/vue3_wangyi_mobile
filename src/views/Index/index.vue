<template>
  <div class="index-wrapper">
      <IndexHeader />
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
      <BottomNav/>
  </div>
</template>

<script>
import IndexHeader from "@/components/IndexHeader";
import DrawerInfo from "@/components/DrawerInfo";
import BottomNav from "@/components/BottomNav";
import find from "@/views/find/index";
import podcast from "@/views/podcast/index";
import my from "@/views/my/index";
import sing from "@/views/sing/index";
import village from "@/views/village/index";
import { ref, provide, getCurrentInstance, onMounted } from "vue";
import { login_status } from '@/api/login/index'
export default {
  name: 'Index',
  components: {
    my,
    find,
    sing,
    podcast,
    village,
    BottomNav,
    DrawerInfo,
    IndexHeader
  },
  setup () {
    const visible = ref(false)
    const navList = ref(['find','podcast','my','sing','village'])
    const activeTab = ref(0)
    const vm = getCurrentInstance()
    provide('visible', visible)
    provide('activeTab', activeTab)
    // console.log(vm.ctx.$store.state.uid, 333)
    onMounted(() => {
      login_status().then((res) => {
        if (res.data.code === 200) {
          console.log(res)
          localStorage.setItem('uid',res.data.profile.userId)
          vm.ctx.$store.state.userinfo = res.data.profile
        }
      }).catch((err) => {
        console.log(err, 'err')
      })
    })
    
    const onClose = () => {
      visible.value = false
    }

    return {
      visible,
      onClose,
      navList,
      activeTab
    }
  }
}
</script>

<style lang="scss">
.ant-drawer-wrapper-body{
    background: #f5f5f5;
  }
</style>
<style scoped lang="scss">
</style>
