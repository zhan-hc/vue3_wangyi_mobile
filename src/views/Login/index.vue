<template>
  <div class='Login'>
    <WYHeader/>
    <p>登录体验更多精彩</p>
    <p>未注册手机号登录后将自动创建账号</p>
    <div class="Login-input">
      <input v-model="tel" type="tel" maxLength='11' class='Login-input-tel'/>
      <CloseOutlined class='Login-input-icon' @click="handleDelete"/>
    </div>
    <button @click="handleCheckTel">下一步</button>
  </div>
</template>

<script setup>
import WYHeader from 'components/WYHeader'
// import {useToast} from '@/components/Toast/IndexToast'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

    const route = useRouter()
    const tel = ref('')
    // const Toast = useToast()
    const handleCheckTel = () => {
      if (tel.value.length < 11) {
        // Toast('请输入11位数字的手机号')
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
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 24px;
  p{
    color: #A9A9A9;
    margin-bottom: 50px;
    &:first-of-type{
      font-size: 28px;
      color: #000;
      margin-bottom: 20px;
    }
  }
  button{
    display: block;
    width: 500px;
    height: 75px;
    margin: 0 auto;
    border-radius: 50px;
    margin-bottom: 20px;
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
    padding: 10px 0;
    display: flex;
    margin-bottom: 100px;
    font-size: 24px;
    &-tel{
      flex: 1;
      background:none;  
      outline:none;
      border: none;
      font-size: 24px;
      &:focus{
        border: none;
      }
    }
    &-icon{
      font-size: 28px;
      margin-left: 20px;
      color: #A9A9A9;
    }
  }
}
</style>
