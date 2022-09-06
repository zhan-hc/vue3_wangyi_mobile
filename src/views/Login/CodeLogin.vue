<template>
  <div class="code-login">
    <WYHeader :status="1" :tel="tel" />
    <p class="code-login__desc">请输入验证码</p>
    <div class="code-login__text">
      <span>已发送至+86 {{ formatTel }}</span>
      <span class="code-login__timer">
        <i
          v-show="state.timer === 0"
          class="code-login__timer-text"
          @click="handleSendCode"
          >{{ state.text }}</i
        >
        <i v-show="state.timer !== 0">{{ state.timer }}S</i>
      </span>
    </div>
    <div class="code-login__input" ref="codeInput">
      <input type="tel" maxLength="1" @keyup="handleInput" />
      <input type="tel" maxLength="1" @keyup="handleInput" />
      <input type="tel" maxLength="1" @keyup="handleInput" />
      <input type="tel" maxLength="1" @keyup="handleInput" />
    </div>
  </div>
</template>

<script setup>
  import WYHeader from 'components/WYHeader'
  import {
    login_cellphone,
    login_verifycode,
    login_refresh,
    login_phonePsw,
  } from '@/api/login/index'
  import { ref, computed, reactive, onMounted, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import useRouteFun from '@/hooks/router/useRouteFun'

  const { handleRouterJump, getUrlParams } = useRouteFun()
  const { proxy } = getCurrentInstance()
  const codeInput = ref(null)

  const toast = proxy.$toast

  const tel = getUrlParams('tel')
  const store = useStore()
  const state = reactive({
    timer: 59,
    text: '重新获取',
    code: '',
  })

  // 隐藏手机号
  const formatTel = computed(() => {
    return tel.substr(0, 3) + '****' + tel.substr(7)
  })

  // 获取验证码
  const code = computed(() => {
    let codesum = ''
    const node = codeInput.value
    for (var i = 0; i < node.childNodes.length; i++) {
      codesum += node.childNodes[i].value.toString()
    }
    return codesum
  })

  // 获取验证码倒计时
  const handleSendCode = () => {
    sendCode()
    if (state.timer === 0) {
      state.timer = 59
    }
    let siv = setInterval(() => {
      state.timer = state.timer - 1
      if (state.timer === 0) {
        clearInterval(siv)
      }
    }, 1000)
  }

  // 发送验证码
  const sendCode = () => {
    const params = {
      phone: tel,
    }
    login_cellphone(params)
      .then((res) => {
        console.log('发送验证码')
      })
      .catch((err) => {
        console.log(err, 'err')
        toast(err.message)
      })
  }

  // input框绑定索引
  const handleBindIndex = () => {
    const node = codeInput.value
    for (var i = 0; i < node.childNodes.length; i++) {
      node.childNodes[i].index = i
    }
  }

  const handleInput = (e) => {
    const { value, index } = e.target
    const node = codeInput.value.childNodes
    if (e.keyCode === 8 && index > 0) {
      // 监听退格事件
      node[index - 1].focus()
    }
    if (index < 3 && value) {
      // 自动跳到下一个input
      node[index + 1].focus()
    }
    if (index === 3 && value) {
      // 焦点到最后一个输入框监听事件
      const params = {
        phone: tel,
        captcha: code.value,
      }
      login_phonePsw(params)
        .then(async (res) => {
          if (res.code === 200) {
            localStorage.setItem('wangyi_uid', res.account.id)
            localStorage.setItem('wangyi_token', res.token)
            localStorage.setItem('wangyi_cookie', res.cookie)
            localStorage.setItem('wangyi_userInfo', JSON.stringify(res.profile))
            // 登陆时重置跟个人界面的等级，促使重新获取
            localStorage.removeItem('wangyi_level')
            // store.commit('setUserInfo', res.profile)
            handleRouterJump('/')
          }
        })
        .catch((err) => {
          console.log(err)
          toast(err.message)
        })
    }
  }

  onMounted(() => {
    handleSendCode()
    handleBindIndex()
  })
</script>

<style scoped lang="scss">
  .code-login {
    padding: 0 0.3125rem;
    box-sizing: border-box;
    font-size: 14px;
    .code-login__desc {
      font-size: 14px;
    }
    .code-login__text {
      color: #c0c0c0;
      font-size: 14px;
      margin-bottom: 0.625rem;
    }
    .code-login__timer {
      float: right;
      margin-right: 0.3125rem;
      font-size: 14px;
      &-text {
        color: royalblue;
      }
    }
    .code-login__input {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      width: 260px;
      margin: 0 auto;
      input {
        width: 1.5rem;
        border: none;
        outline: none;
        font-size: 16px;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 1px solid #c0c0c0;
      }
    }
  }
</style>
