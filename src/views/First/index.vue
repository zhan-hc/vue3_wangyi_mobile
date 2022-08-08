<template>
  <div class="first">
    <div clasS="first-button">
      <button class="first-button-default" @click="handleRouterJump('/login')">
        登录
      </button>
      <button class="first-button-primary">立即体验</button>
    </div>
  </div>
</template>

<script setup>
  import useRouteFun from '@/hooks/router/useRouteFun'

  const { handleRouterJump } = useRouteFun()
</script>

<style scoped lang="scss">
  .first {
    background-color: #dc2c1f;
    height: 100vh;
    // width: 750px;
    font-size: 14px;
    button {
      display: block;
      width: 260px;
      height: 1rem;
      margin: 0 auto;
      border-radius: 20px;
      margin-bottom: 0.3125rem;
      &:focus {
        outline: none;
      }
    }
    &-button {
      position: fixed;
      bottom: 0.3125rem;
      left: 0;
      right: 0;
      &-default {
        color: #dc2c1f;
        background-color: #fff;
        border-style: none;
      }
      &-primary {
        background-color: #dc2c1f;
        color: #fff;
        border-style: solid;
        border: 1px solid#FFF5EE;
      }
    }
  }
</style>
