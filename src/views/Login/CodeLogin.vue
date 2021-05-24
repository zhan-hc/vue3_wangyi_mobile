<template>
  <div class="container">
    <WYHeader/>
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
import WYHeader from '../../components/WYHeader'
import {useRouter} from 'vue-router'
import {computed, reactive, onMounted, getCurrentInstance} from 'vue'
export default {
  name: 'CodeLogin',
  components: {
    WYHeader
  },
  setup () {
    const route = useRouter()
    const {ctx} = getCurrentInstance()
    const tel = route.currentRoute.value.params.tel
    const state = reactive({
      timer: 59,
      text: '重新获取',
      code: ''
    })
    const formatTel = computed(() => {
      return tel.substr(0,3)+'****'+tel.substr(7)
    })
    const handleSendCode = () => { // 获取验证码倒计时
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
    const handleBindIndex = () => {
      const node = ctx.$refs.codeInput
      for (var i = 0; i < node.childNodes.length; i++) {
      node.childNodes[i].index = i;
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
      // this.handleCheckCode()
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
