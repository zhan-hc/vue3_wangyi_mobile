<template>

  <div class="singleList-header">
    <i class="iconfont icon-bofang5"></i>
    <div class="all">播放全部</div>
    <i class="iconfont icon-duoxuanpt"></i>
  </div>
  <div
    class="singleList-item van-clearfix"
    v-for="(item, i) in dataList"
    :key="item.id"
    @click="playMusicParams(item)"
  >
    <div class="item-info">
      <div class="info-name">
        <span v-html="highLightStr(item.name, keywords)"></span>
        <span class="item-desc"> {{item.transNames ? `（${item.transNames}）` : ''}}</span>
      </div>
      <div class="info-authors">
        {{ getAuthor(item.artists) }} - {{ item.album.name }}
      </div>
    </div>
    <i class="iconfont icon-mv"></i>
    <i class="iconfont icon-sandian"></i>
  </div>
</template>

<script>
import {computed, defineComponent, reactive, toRefs} from 'vue'
  import { getAuthor, playMusic } from '@/assets/ts/common'
import { state } from '@/store/state'
import { highLightStr } from "@/assets/ts/common";
export default defineComponent({
  name: 'singleList',
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
    const state = reactive({
      currentPage: 1,
      pageSize: 10
    })

    // 播放音乐
    function playMusicParams(item) {
      const songInfo = {
        id: item.id,
        imageUrl: item.artists.img1v1Url,
        title: item.name,
        authors: getAuthor(item.artists)
      }
      playMusic(songInfo)
    }

    return {
      ...toRefs(state),
      getAuthor,
      highLightStr,
      playMusicParams
    }
  }
})
</script>

<style scoped lang='scss'>
  @import '@/assets/scss/mixin.scss';
  .singleList-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .all {
      flex: 1;
      font-size: 18px;
      font-weight: bold;
    }
    .iconfont {
      font-size: 22px;
    }
    .icon-bofang5 {
      margin-right: .3125rem;
      color: #ff4639;
    }
    .icon-xiazaipt {
      font-size: 24px;
      margin-right: .3125rem;
    }
  }
  .singleList-item {
    display: flex;
    align-items: center;
    height: 1rem;
    color: #999;
    margin-bottom: .3125rem;
    .item-sort {
      color: #999;
      font-size: 18px;
      width: .625rem;
    }
    .item-info {
      flex: 1;
      width: 260px;
      margin-right: .3125rem;
      .info-name {
        letter-spacing: .0625rem;
        color: #000;
        @include ellipsis;
        .item-desc{
          color: #999;
        }
      }
      .info-authors {
        font-size: 10px;
        @include ellipsis;
      }
    }
    .iconfont {
      font-size: 20px;
    }
    .icon-mv {
      margin-right: .625rem;
    }
    .icon-sandian {
      font-size: 20px;
    }
  }
</style>