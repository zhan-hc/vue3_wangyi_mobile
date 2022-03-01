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
    return {
    }
  }
})
</script>

<style scoped lang="scss">
.ant-carousel /deep/ .slick-dots-bottom {
  bottom: .625rem;
}
.ant-carousel{
  // font-size: 24px;
  background: #fff;
  // margin-top: 120px;
  .slide-item{
    position: relative;
    padding: .3125rem .625rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .tag{
      position: absolute;
      bottom: .3125rem;
      right: .625rem;
      color: #fff;
      font-size: 12px;
      padding: .125rem .4375rem;
      border-bottom-right-radius: 10px;
      border-top-left-radius: 10px;
    }
  }
}
</style>
