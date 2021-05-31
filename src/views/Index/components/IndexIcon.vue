<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <div class="icon-item" v-for="item in iconList" :key="item.id">
        <div class="icon-img">
          <img :src="item.iconUrl" alt="">
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive,getCurrentInstance,onMounted } from "vue";
import BScroll from "better-scroll";
export default {
  name: 'IndexIcon',
  props: {
    iconList: {
      type: Array
    }
  },
  setup (props) {
    const iconList = reactive(props.iconList)
    const vm = getCurrentInstance()
    const wrapper = ref(null)
    const content = ref(null)
    onMounted(() => {
      let recWidth = 100 // 图片宽度
      let margin = 20
      let width = (recWidth + margin) * iconList.length - margin
      content.value.style.width = width + 'px' // 给ul设置了宽度
      new BScroll(wrapper.value, {
        click: true,
        scrollX: true,
        eventPassthrough: 'vertical'
      })
    })
    return {
      content,
      wrapper,
      iconList
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper{
  // display: flex;
  // flex-wrap: nowrap;
  font-size: 24px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 30px;
  height: 150px;
  overflow: hidden;
  .content{
    touch-action: none;
    .icon-item{
      // flex: 1;
      display: inline-block;
      margin-right: 30px;
      .icon-img{
        background: #FFF1F1;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
}
</style>
