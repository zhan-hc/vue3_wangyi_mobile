<template>
  <a-carousel autoplay>
    <div class="slide-item" v-for="(item, i) in data" :key="i">
      <img :src="item.pic + '?param=330y130'" alt="" />
      <span class="tag" :style="{ 'background-color': item.titleColor }">{{
        item.typeTitle
      }}</span>
    </div>
  </a-carousel>
</template>

<script>
  import { reactive, defineComponent } from 'vue'
  export default defineComponent({
    name: 'Carousel',
    props: {
      data: {
        type: Array,
      },
    },
    setup(props) {
      return {}
    },
  })
</script>

<style scoped lang="scss">
  .ant-carousel /deep/ .slick-dots-bottom {
    bottom: 0.625rem;
  }
  .ant-carousel {
    padding-top: 0.3125rem;
    width: 100%;
    height: 0;
    padding-bottom: 40%;
    @include background_color('background_color1');
    .slide-item {
      position: relative;
      padding: 0.3125rem 0.625rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
      .tag {
        position: absolute;
        bottom: 0.3125rem;
        right: 0.625rem;
        color: #fff;
        font-size: 12px;
        padding: 0.0625rem 0.125rem;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
      }
    }
  }
</style>
