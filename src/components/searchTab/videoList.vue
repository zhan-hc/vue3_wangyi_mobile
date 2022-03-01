<template>
  <div class="videoList-wrap">
    <div class="videoList-item" v-for="item in dataList" :key="item.id">
      <div class="item-img">
        <img v-lazy="item.coverUrl" alt="视频图片">
      </div>
      <div class="item-info">
        <div class="info-title" v-html="highLightStr(item.title, keywords)"></div>
        <div class="info-author">{{item.creator[0].userName}}</div>
        <div class="info-playCount">{{formatCount(item.playTime)}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
  import { formatCount, highLightStr } from '@/assets/ts/common'
export default defineComponent({
  name: 'videoList',
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
  .videoList-wrap{
    .videoList-item{
      display: flex;
      // align-items: center;
      height: 2.25rem;
      margin-bottom: .3125rem;
      .item-img{
        width: 4rem;
        height: 2.25rem;
        border-radius: 5px;
        margin-right: .3125rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .item-info{
        flex: 1;
        width: 160px;
        .info-title{
          font-size: 14px;
          margin-bottom: .125rem;
          @include ellipsisBasic(2);
        }
        .info-author,
        .info-playCount{
          font-size: 10px;
          color: #999;
          @include ellipsis;
        }
      }
        
    }
      
  }
    
</style>