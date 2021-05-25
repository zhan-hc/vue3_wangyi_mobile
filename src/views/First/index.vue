<template>
  <div class='First'>
    <div clasS="First-button">
      <button class='First-button-default' @click="handlehref">登录</button>
      <button class='First-button-primary'>立即体验</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'First',
  setup () {
    const route = useRouter()
    const handlehref = () => {
      route.push('/login')
    }
    return {
      handlehref
    }
  }
}
</script>

<style scoped lang="scss">
.First{
  background-color: #DC2C1F;
  height: 1334px;
  width: 750px;
  font-size: 24px;
  button{
    display: block;
    width: 500px;
    height: 75px;
    margin: 0 auto;
    border-radius: 50px;
    margin-bottom: 20px;
    &:focus {
      outline: none;
    }
  }
  &-button{
    position: fixed;
    bottom: 20px;
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
