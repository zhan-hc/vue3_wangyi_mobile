<template>
  <router-view/>
</template>

<script>
import { provideToast } from '@/components/IndexToast';
export default {
  name: 'App',
  setup() {
    provideToast({})
  }
}
</script>

<style scoped lang="scss">
</style>
