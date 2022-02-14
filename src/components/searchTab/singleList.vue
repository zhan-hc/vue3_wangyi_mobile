<template>
  <div>单曲</div>
  <!-- <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="handleLoad"
  >
    <div
      class="songList-item van-clearfix"
      v-for="(item, i) in songList.tracks"
      :key="item.id"
    >
      <div class="item-sort">{{ i + 1 }}</div>
      <div class="item-info">
        <div class="info-name">{{ item.name }}</div>
        <div class="info-authors">
          {{ getAuthor(item.ar) }} - {{ item.al.name }}
        </div>
      </div>
      <i class="iconfont icon-mv"></i>
      <i class="iconfont icon-sandian"></i>
    </div>
  </van-list> -->
</template>

<script>
import {defineComponent, reactive, toRefs} from 'vue'
  import { getAuthor } from '@/assets/ts/common'
export default defineComponent({
  name: 'singleList',
  props: {
  },
  setup() {
    
  }
})
</script>

<style scoped lang='scss'>
  @import '@/assets/scss/mixin.scss';
  .songList-item {
    display: flex;
    align-items: center;
    height: 120px;
    color: #999;
    .item-sort {
      color: #999;
      font-size: 36px;
      width: 70px;
    }
    .item-info {
      flex: 1;
      width: 450px;
      margin-right: 30px;
      .info-name {
        font-size: 28px;
        letter-spacing: 2px;
        font-weight: 600;
        color: #000;
        @include ellipsis;
      }
      .info-authors {
        font-size: 24px;
        @include ellipsis;
      }
    }
    .iconfont {
      font-size: 48px;
    }
    .icon-mv {
      margin-right: 40px;
    }
    .icon-sandian {
      font-size: 42px;
    }
  }
</style>