<template>
  <div class="first-page">
    <div clasS="first-page__button">
      <button class="first-page__button_default" @click="handleRouterJump('/login')">
        登录
      </button>
      <button class="first-page__button_primary">立即体验</button>
    </div>
  </div>
</template>

<script setup>
  import useRouteFun from '@/hooks/router/useRouteFun'

  const { handleRouterJump } = useRouteFun()
</script>

<style scoped lang="scss">
  .first-page {
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
    &__button {
      position: fixed;
      bottom: 0.3125rem;
      left: 0;
      right: 0;
      &_default {
        color: #dc2c1f;
        background-color: #fff;
        border-style: none;
      }
      &_primary {
        background-color: #dc2c1f;
        color: #fff;
        border-style: solid;
        border: 1px solid#FFF5EE;
      }
    }
  }
</style>
