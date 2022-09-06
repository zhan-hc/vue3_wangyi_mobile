<template>
  <div class="user-info" v-if="userInfo">
    <a-avatar size="large" :src="userInfo.avatarUrl" />
    <div class="user-info__content">
      <div class="user-info__name">{{ userInfo.nickname }}</div>
      <span class="user-info__vip"><i class="iconfont icon-vip"></i> 开通></span>
      <span class="user-info__level">Lv.{{ level }}</span>
    </div>
    <van-icon name="arrow" />
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { ref, computed } from 'vue'

  const store = useStore()
  const userInfo = ref(store.state.userInfo)
  const level = computed(() => {
    return localStorage.getItem('level')
  })
</script>

<style scoped lang="scss">
  .user-info {
    height: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.3125rem;
    .ant-avatar {
      width: 1rem;
      height: 1rem;
      margin: 0.3125rem;
      border: 1px solid #fff;
      margin: 0.0625rem 0.3125rem;
    }
    &__content {
      flex: 1;
      .user-info__name {
        margin-bottom: 0.3125rem;
        font-size: 18px;
        font-weight: bold;
      }
      .user-info__vip {
        color: #fff;
        padding: 0.0625rem 0.3125rem;
        margin-right: 0.3125rem;
        background: #bbb;
        border-radius: 20px;
        .icon-vip {
          font-size: 12px;
          color: #fff;
        }
      }
      .user-info__level {
        padding: 0.0625rem 0.3125rem;
        background: #fff;
        border-radius: 20px;
      }
    }
    .van-icon-arrow {
      font-size: 16px;
      line-height: 2rem;
    }
  }
</style>
