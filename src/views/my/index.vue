<template>
  <div class="my-wrap">
    <userInfo />
    <myIconList />
    <likeSong />
  </div>
</template>

<script>
import { ref, getCurrentInstance} from "vue"
import userInfo from "./components/userInfo";
import likeSong from "./components/likeSong";
import myIconList from "./components/myIconList";
export default {
  name: 'my',
  components: {
    userInfo,
    likeSong,
    myIconList
  },
  setup (props, context) {
    const vm = getCurrentInstance()
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.my-wrap {
  font-size: 24px;
  padding: 30px;
  box-sizing: border-box;
}
</style>
