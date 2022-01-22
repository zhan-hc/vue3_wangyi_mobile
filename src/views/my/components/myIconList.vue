<template>
  <div class="iconList-wrap">
    <div class="iconList-item" v-for="item in iconList" :key="item.id">
      <div class="item-icon iconfont" :class="item.icon"></div>
      <span>{{item.text}}</span>
    </div>
    <div class="iconList-item">
      <div class="item-icon iconfont"><PlusOutlined/></div>
      <span>添加应用</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { iconList } from "@/assets/ts/my_Data";
</script>

<style scoped lang="scss">
.iconList-wrap{
  background: #fff;
  font-size: 24px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 20px;
  margin-bottom: 20px;
  .iconList-item{
    width: 162px;
    text-align: center;
    color: #666;
    padding: 20px 0;
    .iconfont {
      font-size: 48px;
      color: #FF4E4E;
    }
    .anticon-plus {
      background: #F5F5F5;
      color: #b8b8b8;
      padding: 10px 12px;
      border-radius: 50%;
    }
  }
  &::after{
    content: '';
    width: 150px;
  }
}
</style>
