<template>
  <div class="container">
    <WYHeader :status='1' :tel='tel'/>
    <p class="desc">请输入验证码</p>
    <div class="text">
      <span>已发送至+86 {{formatTel}}</span>
      <span class="timer">
        <i v-show="state.timer === 0" class='timer-text' @click="handleSendCode">{{state.text}}</i>
        <i v-show="state.timer !== 0">{{state.timer}}S</i>
        </span>
    </div>
    <div class="codeInput" ref="codeInput">
      <input type="tel" maxLength='1' @keyup="handleInput"/>
      <input type="tel" maxLength='1' @keyup="handleInput"/>
      <input type="tel" maxLength='1' @keyup="handleInput"/>
      <input type="tel" maxLength='1' @keyup="handleInput"/>
    </div>
  </div>
</template>

<script>
import WYHeader from 'components/WYHeader'
import {useToast} from 'components/IndexToast'
import {useRouter} from 'vue-router'
import { login_cellphone, login_verifycode } from "@/api/login/index";
import {ref, computed, reactive, onMounted, getCurrentInstance} from 'vue'
export default {
  name: 'CodeLogin',
  components: {
    WYHeader
  },
  setup () {
    const route = useRouter()
    const {ctx} = getCurrentInstance()
    const Toast = useToast()
    const tel = route.currentRoute.value.params.tel
    const state = reactive({
      timer: 59,
      text: '重新获取',
      code: ''
    })
    const formatTel = computed(() => {
      return tel.substr(0,3)+'****'+tel.substr(7)
    })
    const code = computed(() => {
      let codesum = ''
      const node = ctx.$refs.codeInput
      for (var i = 0; i < node.childNodes.length; i++) {
        codesum += node.childNodes[i].value.toString()
      }
      return  codesum
    })
    const handleSendCode = () => { // 获取验证码倒计时
      sendCode()
      if (state.timer === 0) {
        state.timer = 59
      }
      let siv = setInterval(() => {
        state.timer = state.timer - 1
        if (state.timer === 0) {
          clearInterval(siv)
        }
      },1000)
    }
    const sendCode = () => {
      const params = {
        phone: tel
      }
      login_cellphone(params).then(res => {
        console.log('发送验证码')
      }).catch((err) => {
        console.log(err,'err')
        Toast(err.message)
      })
    }
    const handleBindIndex = () => {
      const node = ctx.$refs.codeInput
      for (var i = 0; i < node.childNodes.length; i++) {
        node.childNodes[i].index = i
      }
    }
    const handleInput = (e) => {
      const {value,index} = e.target
      const node = ctx.$refs.codeInput.childNodes
      if(e.keyCode === 8 && index > 0) { // 监听退格事件
        node[index - 1].focus()
      }
      if (index < 3 && value) {// 自动跳到下一个input
        node[index + 1].focus()
      }
      if (index === 3 && value) {// 焦点到最后一个输入框监听事件
        const params = {
          phone: tel,
          captcha: code.value
        }
        login_verifycode(params).then((res => {
          if (res.data.code === 200) {
             route.push('/')
          }
        })).catch((err) => {
          Toast(err.message)
        })
      }
    }
    onMounted(() => {
      handleSendCode()
      handleBindIndex()
    })
    return {
      tel,
      state,
      formatTel,
      sendCode,
      handleSendCode,
      handleInput
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 24px;
  .desc{
    font-size: 28px;
  }
  .text{
    color: #C0C0C0;
    font-size: 24px;
    margin-bottom: 60px;
  }
  .timer{
    float: right;
    margin-right: 40px;
    font-size: 24px;
    &-text{
      color: royalblue;
    }
  }
  .codeInput{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 650px;
    margin: 0 auto;
    input{
      width: 120px;
      border: none;
      outline: none;
      font-size: 36px;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 1px solid #C0C0C0;
    }
  }
}
</style>
