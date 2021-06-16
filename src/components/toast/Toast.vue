<template>
  <div class="toast-wrap" v-show="state.show">
    {{state.msg}}
  </div>
</template>

<script>
import { reactive} from "vue";
export default {
  name: 'Toast',
  props: {
    msg: {
      type: Object
    },
    isShow: {
      type: Object
    }
  },
  setup (props) {
    const state = reactive({
      show: props.isShow,
      msg: props.msg
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
.toast-wrap{
  position: fixed;
  display: inline-block;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  color: #000;
  padding: 15px 30px;
  border-radius: 30px;
  background-color: #F5F5F5;
  z-index: 9;
}
</style>
