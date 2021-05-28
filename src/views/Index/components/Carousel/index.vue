<template>
  <a-carousel autoplay>
    <div class="slide-item">
      <img src="@/assets/logo.png" alt="">
      <span class="tag"></span>
    </div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>

<script>
// import { Carousel } from 'ant-design-vue'
export default {
  name: 'Carousel',
  setup (props) {

  },
  components: {
  }
}
</script>

<style scoped lang="scss">
// .ant-carousel >>> .slick-slide {
//   text-align: center;
//   height: 150px;
//   line-height: 150px;
//   background: #364d79;
//   overflow: hidden;
// }
.ant-carousel{ 
  height: 250px;
  line-height: 250px;
  img {
    height: 150px;
  }
}
// .ant-carousel >>> .slick-slide h3 {
//   color: #fff;
// }
</style>
