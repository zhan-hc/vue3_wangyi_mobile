<template>
  <div class="unlogin">
    <img src="@/assets/images/user.png" alt="" width="70" height="70" />
    <h2 @click="handleRouterJump('/login')">立即登录 ></h2>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
  import useRouteFun from '@/hooks/router/useRouteFun'
  export default defineComponent({
    name: 'unLogin',
    setup() {
      const store = useStore()
      const { handleRouterJump } = useRouteFun()
      const state = reactive({})
      return {
        ...toRefs(state),
        handleRouterJump,
      }
    },
  })
</script>

<style scoped lang="scss">
  .unlogin {
    position: relative;
    height: 90px;
    border-radius: 10px;
    margin-top: 60px;
    padding: 0.625rem;
    margin-bottom: 0.3125rem;
    @include background_color('background_color1');
    img {
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
    }
    h2 {
      text-align: center;
      font-weight: bold;
      padding-top: 0.625rem;
    }
  }
</style>
