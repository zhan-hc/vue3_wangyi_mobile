<template>
  <div class="Index-wrapper">
    <IndexHeader/>
    首页
  </div>
</template>

<script>
import IndexHeader from './components/IndexHeader'
export default {
  name: 'Index',
  components: {
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
