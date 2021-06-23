<template>
  <div class="village-wrap">
    <video-list/>
  </div>
</template>

<script>
import videoList from "./components/videoList.vue";
import { ref, reactive } from "vue"
export default {
  name: 'village',
  components: {
    videoList
  },
  setup (props, context) {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.village-wrap{
  padding: 30px;
  box-sizing: border-box;
}
</style>
