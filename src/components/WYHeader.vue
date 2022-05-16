<template>
  <div className="header-wrap">
    <van-icon name="arrow-left" class="header-icon" @click="handleRouterBack" />
    <span class="header-tellogin">手机号登录</span>
    <span
      v-if="status === 1"
      className="header-pswlogin"
      @click="handleRouterJump(`/pswLogin/${tel}`)"
      >密码登录</span
    >
  </div>
</template>

<script>
  import { reactive } from 'vue'
  import useRouteFun from '@/hooks/router/useRouteFun'

  export default {
    props: {
      status: {
        type: Number,
        default: () => 0,
      },
    },
    setup(props) {
      const { getUrlParams, handleRouterJump, handleRouterBack } = useRouteFun()
      const tel = getUrlParams('tel')

      const pswLogin = () => {
        handleRouterJump(`/pswLogin/${tel}`)
      }
      return {
        tel,
        pswLogin,
        handleRouterJump,
        handleRouterBack,
      }
    },
  }
</script>

<style scoped lang="scss">
  .header-wrap {
    position: relative;
    box-sizing: border-box;
    height: 1rem;
    padding: 0.3125rem 0;
    margin-bottom: 0.3125rem;
    .van-icon-arrow-left {
      margin-right: 0.3125rem;
      font-size: 18px;
      vertical-align: middle;
    }
    span {
      // font-size: 32px;
      vertical-align: middle;
      font-weight: 600;
    }
    .header-pswlogin {
      position: absolute;
      right: 0.3125rem;
      font-size: 12px;
      border: 1px solid #ccc;
      border-radius: 30px;
      padding: 0.0625rem 0.3125rem;
    }
  }
</style>
