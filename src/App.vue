<template>
  <router-view/>
</template>

<script>
import { provideToast } from './components/Toast/toast';
export default {
  name: 'App',
  setup () {
    provideToast({
      width: '200px',        // 配置toast宽度
      duration: 2000        // 配置toast持续显示时长
    });
  }
}
</script>

<style scoped lang="scss">
</style>
