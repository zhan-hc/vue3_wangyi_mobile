<template>
  <div class='Login'>
    <WYHeader/>
    <p>登录体验更多精彩</p>
    <p>未注册手机号登录后将自动创建账号</p>
    <div class="Login-input">
      <input v-model="tel" type="tel" maxLength='11' class='Login-input-tel'/>
      <van-icon name="cross" class='Login-input-icon' @click="handleDelete"/>
    </div>
    <button @click="handleCheckTel">下一步</button>
  </div>
</template>

<script setup>
import WYHeader from 'components/WYHeader'
import {ref, getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'

  const {proxy} = getCurrentInstance()
  const toast = proxy.$toast

  const route = useRouter()
  const tel = ref('')
  const handleCheckTel = () => {
    if (tel.value.length < 11) {
      toast('请输入11位数字的手机号')
    } else {
      route.push(`/CodeLogin/${tel.value}`)
    }
  }
  const handleDelete = () => {
    tel.value = ''
  }
</script>

<style scoped lang="scss">
.Login{
  padding: 0 .3125rem;
  box-sizing: border-box;
  font-size: 14px;
  p{
    color: #A9A9A9;
    margin-bottom: .625rem;
    &:first-of-type{
      font-size: 14px;
      color: #000;
      margin-bottom: .3125rem;
    }
  }
  button{
    display: block;
    width: 260px;
    height: 1rem;
    font-size: 14px;
    letter-spacing: .0625rem;
    margin: 0 auto;
    border-radius: 50px;
    margin-bottom: .3125rem;
    background-color: #DC2C1F;
    color: #fff;
    border-style: none;
    &:focus {
      outline: none;
      border: none;
    }
  }
  &-input{
    border-bottom: 1px solid #A9A9A9;
    padding: .125rem 0;
    display: flex;
    margin-bottom: 100px;
    font-size: 14px;
    &-tel{
      flex: 1;
      background:none;  
      outline:none;
      border: none;
      font-size: 14px;
      &:focus{
        border: none;
      }
    }
    &-icon{
      font-size: 16px;
      margin-left: .3125rem;
      color: #A9A9A9;
    }
  }
}
</style>
