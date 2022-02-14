<template>
  <div className='header-wrap'>
    <LeftOutlined class='header-icon' @click="handleRouterBack"/>
    <span class='header-tellogin'>手机号登录</span>
    <span v-if="status===1" className='header-pswlogin' @click='pswLogin'>密码登录</span>
  </div>
</template>

<script>
import { reactive } from "vue";
import useRouteFun from '@/hooks/router/useRouteFun'

export default {
  props: {
    status: {
      type: Number
    }
  },
  setup (props) {
    const {getUrlParams, handleRouterJump, handleRouterBack} = useRouteFun()
    const status =reactive(props.status)
    const tel = getUrlParams('tel')

    const pswLogin = () => {
      handleRouterJump(`/pswLogin/${tel}`)
    }
    return{
      tel,
      status,
      pswLogin,
      handleRouterBack
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrap{
  position: relative;
  box-sizing: border-box;
  height: 75px;
  padding: 25px 0;
  margin-bottom: 20px;
  &-icon{
    margin-right: 20px;
    font-size: 18px;
    vertical-align: middle;
  }
  span{
    // font-size: 32px;
    vertical-align: middle;
    font-weight: 600;
  }
  &-tellogin{
    // font-size: 32px;
  }
  &-pswlogin{
    position: absolute;
    right: 40px;
    // font-size: 24px;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 5px 20px;
  }
}
</style>
