<template>
  <div class="index-wrapper">
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
import DrawerInfo from "@/components/DrawerInfo";
import BottomNav from "@/components/BottomNav";
import find from "@/views/find/index";
import podcast from "@/views/podcast/index";
import my from "@/views/my/index";
import sing from "@/views/sing/index";
import village from "@/views/village/index";
import { ref, provide } from "vue";
export default {
  name: 'Index',
  components: {
    my,
    find,
    sing,
    podcast,
    village,
    BottomNav,
    DrawerInfo
  },
  setup () {
    const visible = ref(false)
    const navList = ref(['find','podcast','my','sing','village',])
    const activeTab = ref(0)
    provide('visible', visible)
    provide('activeTab', activeTab)
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
