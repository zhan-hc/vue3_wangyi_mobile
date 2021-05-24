<template>
  <div className='header'>
    <LeftOutlined class='header-icon' @click="goback"/>
    <span class='header-tellogin'>手机号登录</span>
    <!-- {codelogin === 1 ? <span className='header-pswlogin' onClick={() => this.props.history.push('/passwordLogin')}>密码登录</span> : null} -->
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup () {
    const route = useRouter()
    const goback = () => {
      route.go(-1)
    }
    return{
      goback
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
    bottom: 10px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 5px 20px;
  }
}
</style>
