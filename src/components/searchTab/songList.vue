<template>
  <div class="songList-wrap">
    <div class="songList-item" v-for="item in dataList" :key="item.id" @click="handleClickJump(item.id)">
      <div class="item-img">
        <img v-lazy="item.coverImgUrl" alt="歌单图片">
      </div>
      <div class="item-info">
        <div class="info-title">{{item.name}}</div>
        <div class="info-desc">{{item.trackCount}}首，by {{item.creator.nickname}}，播放{{formatCount(item.playCount)}}次</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive, toRefs} from 'vue'
import { formatCount } from '@/assets/ts/common'
import useRouteFun from '@/hooks/router/useRouteFun'
export default defineComponent({
  name: 'songList',
  props: {
    dataList: {
      type: Array,
      default: () => []
    },
  },
  setup(props) {
    const { handleRouterJump } = useRouteFun()
    // 歌单详情跳转
    const handleClickJump = (id: number) => {
      handleRouterJump(`/songListDetail/${id}`)
    }
    return{
      formatCount,
      handleClickJump
    }
  }
})
</script>

<style scoped lang='scss'>
@import '@/assets/scss/mixin.scss';
  .songList-wrap{
    .songList-item{
      display: flex;
      align-items: center;
      height: 1.5rem;
      margin-bottom: .3125rem;
      .item-img{
        width: 1.5rem;
        height: 1.5rem;
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
        width: 240px;
        .info-title{
          @include ellipsis;
        }
        .info-desc{
          font-size: 10px;
          color: #999;
          @include ellipsis;
        }
      }
        
    }
      
  }
    
</style>