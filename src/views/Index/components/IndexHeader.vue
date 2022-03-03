<template>
  <div class="header-wrapper">
    <van-icon name="wap-nav"  @click="onOpen" />
    <div class="header-content" @click="handleRouterJump('/search')">
      <van-icon name="search" />
    </div>
    <i class="iconfont icon-yuyin" />
  </div>
</template>

<script setup>
  import { inject } from 'vue'
  import useRouteFun from '@/hooks/router/useRouteFun'
  const {handleRouterJump} = useRouteFun()

  const visible = inject('visible')

  const onOpen = () => {
    visible.value = true
  }
</script>

<style scoped lang="scss">
  .header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    background-color: #f5f5f5;
    box-sizing: border-box;
    padding: .3125rem .4375rem;
    z-index: 2;
    font-size: 28px;
    .van-icon-wap-nav {
      margin-right: .3125rem;
    }
    .header-content {
      flex: 1;
      display: flex;
      align-items: center;
      height: 1rem;
      margin-right: .3125rem;
      padding: 0 .3125rem;
      background-color: #fff;
      border-radius: 40px;
      box-sizing: border-box;
      .van-icon-search {
        font-size: 24px;
        color: #bababa;
        vertical-align: middle;
      }
    }
    .icon-yuyin{
      font-size: 30px;
    }
  }
</style>
