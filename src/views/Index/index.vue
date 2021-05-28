<template>
  <div class="Index-wrapper">
    <IndexHeader/>
    <Carousel />
  </div>
</template>

<script>
import IndexHeader from './components/IndexHeader'
import Carousel from "./components/Carousel/index";
export default {
  name: 'Index',
  components: {
    Carousel,
    IndexHeader
  }
}
</script>

<style scoped lang="scss">
.Index-wrapper{
  background-color: #f5f5f5;
  padding: 20px 30px;
  box-sizing: border-box;
}
</style>
