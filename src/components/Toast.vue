<template>
  <div class="Toast">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    msg: {
      type: String,
      default: () => {return ''}
    }
  },
  setup () {

  }
}
</script>

<style scoped lang="scss">
.Toast{
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
