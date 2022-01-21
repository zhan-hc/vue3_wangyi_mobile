<template>
  <div class="pswLogin">
    <WYHeader/>
    <div class="pswLogin-input">
      <input v-model="password" type="password" class='pswLogin-input-password'/>
      <CloseOutlined class='pswLogin-input-icon' @click="handleDelete"/>
    </div>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import WYHeader from 'components/WYHeader'
import { useRouter } from "vue-router";
import { login_phonePsw } from "@/api/login/index";

    const route = useRouter()
    const password = ref('')
    const tel = route.currentRoute.value.params.tel
    const handleDelete = () => {
      password.value = ''
    }
    
    const handleLogin = () => {
      const params = {
        phone: tel,
        password: password.value
      }
      login_phonePsw(params).then((res) => {
        if (res.data.code) {
          route.push('/')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
</script>

<style scoped lang="scss">
.pswLogin{
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 24px;
  &-input{
    margin-top: 50px;
    border-bottom: 1px solid #A9A9A9;
    padding: 10px 0;
    display: flex;
    margin-bottom: 100px;
    font-size: 24px;
    &-password{
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
}
</style>
