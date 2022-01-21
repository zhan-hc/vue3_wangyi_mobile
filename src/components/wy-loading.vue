<template>
  <div v-if="value" class="wy-loading">
    <div class="wy-loading-round"></div>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'WyLoading',
  props: {
    value:{
      type :Boolean,
      required: true
    }
  },
  components: {
    
  },
})
</script>

<style scoped lang='scss'>
@keyframes outRound {
0% {
  transform: rotate(120deg)
}
100% {
  transform: rotate(-240deg)
}
}
.wy-loading{
  position: fixed;
  top: 30%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translate3d(-50%,-50%,0);
  background-color: #fff;
  border-radius: 50%;
  &-round {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 8px auto;
    border: 4px solid red;
    border-left: 2px solid transparent;
    animation: outRound 1s linear infinite running;
  }
}
</style>