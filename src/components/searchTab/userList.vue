<template>
  <div class="userList-wrap">
    <div class="userList-item" v-for="item in dataList" :key="item.id">
      <div class="item-img">
        <img v-lazy="item.avatarUrl" alt="用户头像">
      </div>
      <div class="item-title">
        <span v-html="highLightStr(item.nickname, keywords)"></span>
        <ManOutlined v-if="item.gender"/>
        <WomanOutlined v-if="!item.gender"/>
        <div class="item-desc" v-if="item.authStatus">网易音乐人</div>
      </div>
      <div class="follow-btn">
        <van-icon name="plus" />
        <span>关注</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
  import { formatCount, highLightStr } from '@/assets/ts/common'
export default defineComponent({
  name: 'userList',
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    keywords: {
      type: String,
      default: () => ''
    }
  },
  setup(props) {
    return{
      formatCount,
      highLightStr
    }
  }
})
</script>

<style scoped lang='scss'>
@import '@/assets/scss/mixin.scss';
  .userList-wrap{
    .userList-item{
      display: flex;
      align-items: center;
      height: 1.25rem;
      margin-bottom: .3125rem;
      .item-img{
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        margin-right: .3125rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .item-title{
        flex: 1;
        width: 160px;
        color: #000;
        @include ellipsis;
        .item-desc{
          color: #999;
          font-size: 10px;
        }
        .anticon-man{
          font-size: 14px;
          color: #00BFFF;
          margin-left: .0625rem;
        }
        .anticon-woman{
          font-size: 14px;
          color: #FF69B4;
          margin-left: .0625rem;
        }
      }
      .follow-btn{
        color: red;
        font-size: 10px;
        border: 1px solid red;
        border-radius: 10px;
        padding: .0625rem .125rem;
        .van-icon-plus{
          margin-right: .0625rem;
        }
      }
    }
      
  }
    
</style>