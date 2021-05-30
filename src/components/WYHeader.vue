<template>
  <div className='header'>
    <LeftOutlined class='header-icon' @click="goback"/>
    <span class='header-tellogin'>手机号登录</span>
    <span v-if="status===1" className='header-pswlogin' @click='pswLogin'>密码登录</span>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from "vue";
export default {
  setup (props) {
    const status =reactive(props.status)
    const route = useRouter()
    const tel = route.currentRoute.value.params.tel
    const goback = () => {
      route.go(-1)
    }
    const pswLogin = () => {
      route.push(`/pswLogin/${tel}`)
    }
    return{
      tel,
      status,
      goback,
      pswLogin
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  position: relative;
  box-sizing: border-box;
  height: 75px;
  padding: 25px 0;
  margin-bottom: 20px;
  &-icon{
    margin-right: 20px;
    font-size: 36px;
    vertical-align: middle;
  }
  span{
    // font-size: 32px;
    vertical-align: middle;
    font-weight: 600;
  }
  &-tellogin{
    font-size: 32px;
  }
  &-pswlogin{
    position: absolute;
    right: 40px;
    font-size: 24px;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 5px 20px;
  }
}
</style>
