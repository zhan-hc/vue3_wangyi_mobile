<template>
  <div class="header-wrapper">
    <MenuOutlined @click="onOpen"/>
    <div class="header-content">
      <SearchOutlined />
    </div>
    <AudioFilled />
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  name: 'IndexHeader',
  setup () {
    const visible = inject('visible')
    const onOpen = () => {
      visible.value = true
    }
    return {
      visible,
      onOpen
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  background-color: #f5f5f5;
  box-sizing: border-box;
  padding: 20px 30px;
  margin-bottom: 10px;
  z-index: 2;
  .anticon-menu{
    font-size: 48px;
    margin-right: 20px;
  }
  .anticon-audio{
    font-size: 48px;
  }
  .header-content{
    flex: 1;
    height: 80px;
    margin-right: 10px;
    padding: 0 20px;
    background-color: #fff;
    border-radius: 40px;
    .anticon-search{
      color: #bababa;
      font-size: 42px;
    }
  }
}
</style>
