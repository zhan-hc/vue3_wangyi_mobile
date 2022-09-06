<template>
  <div class="psw-login">
    <WYHeader />
    <div class="psw-login__content">
      <input
        v-model="password"
        type="password"
        class="psw-login__input"
      />
      <van-icon
        name="cross"
        class="psw-login__icon"
        @click="handleDelete"
      />
    </div>
    <wym-button class="psw-login__btn" size="large" @click="handleLogin" round >登录</wym-button>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import WYHeader from 'components/WYHeader'
  import { useRouter } from 'vue-router'
  import { login_phonePsw } from '@/api/login/index'

  const route = useRouter()
  const password = ref('')
  const tel = route.currentRoute.value.params.tel
  const handleDelete = () => {
    password.value = ''
  }

  const handleLogin = () => {
    const params = {
      phone: tel,
      password: password.value,
    }
    login_phonePsw(params)
      .then((res) => {
        if (res.code === 200) {
          localStorage.setItem('wangyi_uid', res.account.id)
          localStorage.setItem('wangyi_userInfo', res.profile)
          localStorage.setItem('wangyi_cookie', res.cookie)
          localStorage.setItem('wangyi_userInfo', JSON.stringify(res.profile))
          // store.commit('setUserInfo', res.profile)
          route.push('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
</script>

<style scoped lang="scss">
  .psw-login {
    padding: 0 0.3125rem;
    box-sizing: border-box;
    font-size: 14px;
    &__content {
      margin-top: 0.3125rem;
      border-bottom: 1px solid #a9a9a9;
      padding: 0.125rem 0;
      display: flex;
      margin-bottom: 0.625rem;
      font-size: 14px;
      .psw-login__input {
        flex: 1;
        background: none;
        outline: none;
        border: none;
        font-size: 14px;
        &:focus {
          border: none;
        }
      }
      .psw-login__icon {
        font-size: 16px;
        margin-left: 0.3125rem;
        color: #a9a9a9;
      }
    }
    .psw-login__btn {
      display: block;
      height: 1rem;
      margin: 0 auto;
    }
  }
</style>
