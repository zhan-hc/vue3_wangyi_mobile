<template>
  <div class="userInfo-wrap" v-if="userInfo">
    <a-avatar size="large" :src="userInfo.avatarUrl" />
    <div class="user">
      <div class="user-name">{{userInfo.nickname}}</div>
      <span class="user-vip"><i class="iconfont icon-vip"></i> 开通></span>
      <span class="user-grade">Lv.{{level}}</span>
    </div>
    <RightOutlined/>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import { ref, computed} from "vue"

    const store = useStore()
    const userInfo = ref(store.state.userInfo)
    const level = computed(() => {
      return sessionStorage.getItem('level')
    })
</script>

<style scoped lang="scss">
.userInfo-wrap{
  height: 2rem;
  display: flex;
  margin-bottom: .3125rem;
  .ant-avatar{
    width: 1rem;
    height: 1rem;
    margin: .3125rem;
    border: 1px solid #fff;
    margin: .0625rem .3125rem;
  }
  .user{
    flex: 1;
    .user-name {
      font-size: 18px;
      font-weight: bold;
    }
    .user-vip {
      color: #fff;
      padding: .0625rem .3125rem;
      margin-right: .3125rem;
      background: #bbb;
      border-radius: 20px;
        .icon-vip{
          color: #fff;
        }
    }
    .user-grade{
      padding: .0625rem .3125rem;
      background: #fff;
      border-radius: 20px;
    }
  }
  .anticon-right {
    font-size: 16px;
    line-height: 2rem;
  }
}
</style>
