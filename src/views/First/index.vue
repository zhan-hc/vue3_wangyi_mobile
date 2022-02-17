<template>
  <div class='First'>
    <div clasS="First-button">
      <button class='First-button-default' @click="handleRouterJump('/login')">登录</button>
      <button class='First-button-primary'>立即体验</button>
    </div>
  </div>
</template>

<script setup>
import useRouteFun from '@/hooks/router/useRouteFun'

const {handleRouterJump} = useRouteFun()

</script>

<style scoped lang="scss">
.First{
  background-color: #DC2C1F;
  height: 100vh;
  // width: 750px;
  font-size: 14px;
  button{
    display: block;
    width: 260px;
    height: 1rem;
    margin: 0 auto;
    border-radius: 20px;
    margin-bottom: .3125rem;
    &:focus {
      outline: none;
    }
  }
  &-button{
    position: fixed;
    bottom: .3125rem;
    left: 0;
    right: 0;
    &-default{
      color: #DC2C1F;
      background-color: #fff;
      border-style: none;
    }
    &-primary{
      background-color: #DC2C1F;
      color: #fff;
      border-style: solid;
      border: 1px solid#FFF5EE;
    }
  }
}
</style>
