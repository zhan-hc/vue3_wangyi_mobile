<template>
  <div class="info-wrap">
    <div class="person-info" v-if="userInfo">
      <a-avatar size="large" :src="userInfo.avatarUrl" />
      <span>{{userInfo.nickname}} ></span>
      <i class="iconfont icon-saoma"></i>
    </div>
    <div class="info-vip">
      <div class="content-top">
        <div class="main">开通黑胶VIP</div>
        <div>立享超17项专属特权 ></div>
        <div class="content-right">会员中心</div>
      </div>
      <div class="content-bottom">
        <div>限时特惠！黑胶首月仅0.88元！</div>
      </div>
    </div>
    <div class="info-list" v-for="(list, i) in info.list" :key="i">
      <div class="list-title" v-if="list.title">{{list.title}}</div>
      <div class="list-item" v-for="item in list.data" :key="item.id" :class="{'borderBom' : i=== 0}">
        <span class="item-icon iconfont" :class="item.icon"></span>
        <span class="item-text">{{item.text}}</span>
        <RightOutlined/>
      </div>
    </div>
    <div class="info-close">关闭云音乐</div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import { reactive, ref } from "vue";
import { list } from "@/assets/ts/drawerData";
    const store = useStore()
    const info = reactive({
      list: list
    })
    const userInfo = ref(store.state.userInfo)
    console.log()
</script>

<style scoped lang="scss">
.info-wrap {
  font-size: 24px;
  .person-info {
    position: relative;
    font-size: 28px;
    margin-bottom: 20px;
    .ant-avatar{
      width: 75px;
      height: 75px;
      margin-right: 30px;
    }
    span{
      font-weight: bold;
    }
    .icon-saoma{
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      font-weight: bold;
      font-size: 36px;
    }
  }
  .info-vip {
    padding: 20px 30px;
    border-radius: 20px;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #8C8C8C , #B6B6B6);
    color: #D2D2D2;
    margin-bottom: 30px;
    .content-top{
      position: relative;
      padding-bottom: 20px;
      border-bottom: 1px solid #D2D2D2;
      .main {
        font-size: 44px;
        font-weight: bold;
        color: #fff;
      }
      .content-right{
        color: #fff;
        position: absolute;
        top: 10px;
        right: 0;
        padding: 5px 10px;
        border: 1px solid #fff;
        border-radius: 30px;
      }
    }
    .content-bottom{
      padding-top: 20px;
    }
  }
  .info-list{
    font-size: 36px;
    background: #fff;
    border-radius: 20px;
    margin-bottom: 20px;
    .list-title{
      font-size: 24px;
      color: #989898;
      padding: 20px 0 20px 30px;
      border-bottom: 1px solid #ccc;
    }
    .list-item{
      position: relative;
      margin-left: 30px;
      line-height: 100px;
      box-sizing: border-box;
      height: 100px;
      &.borderBom {
        margin-left: 30px;
        padding-left: 0;
        border-bottom: 1px solid #ccc;
      }
      .item-icon {
        font-size: 48px;
        margin-right: 20px;
      }
      .item-text{
        font-size: 30px;
        vertical-align: top;
      }
      .anticon-right{
        color: #ccc;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .info-close{
    padding: 15px 0;
    border-radius: 20px;
    color: #DC2C1F;
    background: #fff;
    text-align: center;
    font-size: 32px;

  }
}
</style>
