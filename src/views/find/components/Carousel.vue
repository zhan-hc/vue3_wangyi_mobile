<template>
  <a-carousel autoplay>
    <div class="slide-item" v-for="(item, i) in data" :key="i">
      <img :src="item.pic" alt="">
      <span class="tag" :style="{'background-color': item.titleColor}">{{item.typeTitle}}</span>
    </div>
  </a-carousel>
</template>

<script>
import { reactive, defineComponent } from "vue";
export default defineComponent({
  name: 'Carousel',
  props: {
    data: {
      type: Array
    }
  },
  setup (props) {
    const data = reactive(props.data)
    return {
      data
    }
  }
})
</script>

<style scoped lang="scss">
.ant-carousel /deep/ .slick-dots-bottom {
  bottom: 40px;
}
.ant-carousel{
  font-size: 24px;
  background: #fff;
  // margin-top: 120px;
  .slide-item{
    position: relative;
    padding: 20px 30px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
    .tag{
      position: absolute;
      bottom: 20px;
      right: 30px;
      color: #fff;
      padding: 5px 15px;
      border-bottom-right-radius: 20px;
      border-top-left-radius: 20px;
    }
  }
}
</style>
