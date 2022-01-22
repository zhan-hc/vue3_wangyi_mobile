<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <div class="icon-item" v-for="item in iconList" :key="item.id">
        <div class="icon-img">
          <img :src="item.iconUrl" alt="icon图标">
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import BScroll from "better-scroll";

  const props = defineProps({
    iconList: {
      type: Array,
      default: []
    }
  })

  const iconList = reactive(props.iconList)
  const wrapper = ref(null)
  const content = ref(null)

  onMounted(() => {
    let recWidth = 100 // icon宽度
    let margin = 30 // margin-right
    let width = ((recWidth + margin) * iconList.length)/2
    content.value.style.width = width + 'px' // 给container设置了宽度
    new BScroll(wrapper.value, {
      click: true,
      scrollX: true,
      bounce: true,
      eventPassthrough: 'vertical'
    })
  })
</script>

<style scoped lang="scss">
.wrapper{
  font-size: 24px;
  width: 750px;
  box-sizing: border-box;
  padding: 20px 30px;
  border-bottom: 1px solid #ccc;
  background: #fff;
  overflow: hidden;
  .content{
    touch-action: none;
    .icon-item{
      display: inline-block;
      margin-right: 30px;
      text-align: center;
      .icon-img{
        background: #FFF1F1;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
}
</style>
