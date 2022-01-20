<template>
  <div class="toast-wrap" v-show="isShow">
    {{msg}}
  </div>
</template>

<script>
import { reactive,ref,watch } from "vue";
export default {
  name: 'Toast',
  props: {
    msg: {
      type: String
    }
    // ,
    // isShow: {
    //   type: Boolean
    // }
  },
  setup (props) {
    const isShow = ref(props.isShow)
    const msg = ref(props.msg)
    // console.log('isShow',isShow)
    watch(isShow,(newValue, old) => {
       console.log(isShow,newValue,old)
     });
    return {
      isShow,
      msg
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
  z-index: 2;
}
</style>
