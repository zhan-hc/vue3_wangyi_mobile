<template>
  <div class="userinfo-wrap">
    <a-avatar size="large" :src="userinfo.avatarUrl" />
    <div class="user">
      <div class="user-name">{{userinfo.nickname}}</div>
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
    const userinfo = ref(store.state.userInfo)
    const level = computed(() => {
      return localStorage.getItem('level')
    })
</script>

<style scoped lang="scss">
.userinfo-wrap{
  height: 100px;
  display: flex;
  margin-bottom: 30px;
  .ant-avatar{
    width: 90px;
    height: 90px;
    margin-right: 30px;
    border: 2px solid #fff;
    margin: 5px 20px;
  }
  .user{
    flex: 1;
    .user-name {
      font-size: 36px;
      font-weight: bold;
    }
    .user-vip {
      color: #fff;
      padding: 3px 15px;
      margin-right: 20px;
      background: #bbb;
      border-radius: 20px;
        .icon-vip{
          color: #fff;
        }
    }
    .user-grade{
      padding: 3px 15px;
      background: #fff;
      border-radius: 20px;
    }
  }
  .anticon-right {
    font-size: 38px;
    line-height: 100px;
  }
}
</style>
