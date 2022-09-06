<template>
  <div class="login">
    <WYHeader />
    <p>登录体验更多精彩</p>
    <p>未注册手机号登录后将自动创建账号</p>
    <div class="login__input">
      <input v-model="tel" type="tel" maxLength="11" class="login__input__tel" />
      <van-icon name="cross" class="login__input__icon" @click="handleDelete" />
    </div>
    <wym-button class="login__btn" size="large" @click="handleCheckTel" round >下一步</wym-button>
  </div>
</template>

<script setup>
  import WYHeader from 'components/WYHeader'
  import { ref, getCurrentInstance } from 'vue'
  import { useRouter } from 'vue-router'

  const { proxy } = getCurrentInstance()
  const toast = proxy.$toast

  const route = useRouter()
  const tel = ref('')
  const handleCheckTel = () => {
    console.log('asd')
    if (tel.value.length < 11) {
      toast('请输入11位数字的手机号')
    } else {
      route.push(`/codeLogin/${tel.value}`)
    }
  }
  const handleDelete = () => {
    tel.value = ''
  }
</script>

<style scoped lang="scss">
  .login {
    padding: 0 0.3125rem;
    box-sizing: border-box;
    font-size: 14px;
    p {
      color: #a9a9a9;
      margin-bottom: 0.625rem;
      &:first-of-type {
        font-size: 14px;
        @include font_color(('font_color1'));
        margin-bottom: 0.3125rem;
      }
    }
    &__input {
      border-bottom: 1px solid #a9a9a9;
      padding: 0.125rem 0;
      display: flex;
      margin-bottom: 100px;
      font-size: 14px;
      &__tel {
        flex: 1;
        background: none;
        outline: none;
        border: none;
        font-size: 14px;
        &:focus {
          border: none;
        }
      }
      &__icon {
        font-size: 16px;
        margin-left: 0.3125rem;
        color: #a9a9a9;
      }
    }
    &__btn {
      display: block;
      height: 1rem;
      margin: 0 auto;
    }
  }
</style>
